import type {
  SandboxExtensionDescriptor,
  SandboxLaunchMode,
  SandboxOrderTarget,
} from '@/scenario/types'

import { z } from 'zod'

import { isSandboxOrderTarget } from '@/scenario/predicates'
import { orderSandboxFixtures } from '@/scenario/fixtures'
import { parseSandboxExtensionDescriptorJson } from '@/scenario/descriptor'

export type DevPanelField =
  | 'contextJson'
  | 'fixture'
  | 'manifestUrl'
  | 'mode'
  | 'pageCode'
  | 'targets'

export type DevPanelValidationErrors = Partial<Record<DevPanelField, string>>

export type DevPanelValidationMessages = {
  contextJsonContextObject(context: string): string;
  contextJsonInvalidJson: string;
  contextJsonInvalidJsonAt(line: number, column: number): string;
  contextJsonRootObject: string;
  contextJsonUnknownContext(context: string): string;
  fixture: string;
  manifestUrlDescriptor: string;
  manifestUrlRequired: string;
  mode: string;
  pageCodeFormat: string;
  pageCodeRequired: string;
  targetRequired: string;
  targetUnknown(target: string): string;
}

const SANDBOX_PAGE_CODE_PATTERN = /^[A-Za-z-]+$/u

export const isValidSandboxPageCode = (value: string): boolean =>
  SANDBOX_PAGE_CODE_PATTERN.test(value)

export type LaunchConfigValidationInput = {
  fixture: string;
  manifestUrl: string;
  mode: string;
  pageCode: string;
  targets: string[];
}

export type ValidatedLaunchConfigInput = {
  descriptor?: SandboxExtensionDescriptor;
  fixture: string;
  manifestUrl: string;
  mode: SandboxLaunchMode;
  pageCode: string;
  targets: SandboxOrderTarget[];
}

export type ValidationResult<T> =
  | {
    data: T;
    success: true;
  }
  | {
    errors: DevPanelValidationErrors;
    success: false;
  }

export const validateLaunchConfigInput = (
  input: LaunchConfigValidationInput,
  messages: DevPanelValidationMessages
): ValidationResult<ValidatedLaunchConfigInput> => {
  const result = createLaunchConfigSchema(messages).safeParse(input)

  if (!result.success) {
    return {
      errors: formatDevPanelValidationErrors(result.error.issues),
      success: false,
    }
  }

  const source = validateExtensionSourceInput(result.data.manifestUrl, messages)

  if (!source.success) return source

  return {
    data: {
      ...result.data,
      ...source.data,
      mode: result.data.mode as SandboxLaunchMode,
      targets: result.data.targets as SandboxOrderTarget[],
    },
    success: true,
  }
}

export const validateContextJsonInput = (
  value: string,
  contextNames: readonly string[],
  messages: DevPanelValidationMessages
): ValidationResult<Record<string, Record<string, unknown>>> => {
  let parsed: unknown

  try {
    parsed = JSON.parse(value) as unknown
  } catch (error) {
    const location = getJsonParseErrorLocation(value, error)

    return {
      errors: {
        contextJson: location
          ? messages.contextJsonInvalidJsonAt(location.line, location.column)
          : messages.contextJsonInvalidJson,
      },
      success: false,
    }
  }

  const result = createContextJsonSchema(contextNames, messages).safeParse(parsed)

  if (!result.success) {
    return {
      errors: formatDevPanelValidationErrors(result.error.issues),
      success: false,
    }
  }

  return {
    data: result.data,
    success: true,
  }
}

const createLaunchConfigSchema = (messages: DevPanelValidationMessages) => z.object({
  fixture: z.string().transform(value => value.trim()).refine(
    value => value in orderSandboxFixtures,
    messages.fixture
  ),
  manifestUrl: z.string()
    .transform(value => value.trim())
    .refine(value => value.length > 0, messages.manifestUrlRequired),
  mode: z.enum(['page', 'widget'], {
    invalid_type_error: messages.mode,
    required_error: messages.mode,
  }),
  pageCode: z.string(),
  targets: z.array(z.string().transform(value => value.trim())).superRefine((targets, context) => {
    targets.forEach((target, index) => {
      if (isSandboxOrderTarget(target)) return

      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: messages.targetUnknown(target),
        path: ['targets', index],
      })
    })
  }),
}).superRefine((value, context) => {
  if (value.mode === 'page' && !value.pageCode.trim()) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: messages.pageCodeRequired,
      path: ['pageCode'],
    })
  } else if (value.mode === 'page' && !isValidSandboxPageCode(value.pageCode)) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: messages.pageCodeFormat,
      path: ['pageCode'],
    })
  }

  if (value.mode === 'widget' && value.targets.length === 0) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: messages.targetRequired,
      path: ['targets'],
    })
  }
})

const validateExtensionSourceInput = (
  value: string,
  messages: DevPanelValidationMessages
): ValidationResult<Pick<ValidatedLaunchConfigInput, 'descriptor' | 'manifestUrl'>> => {
  try {
    return {
      data: {
        descriptor: parseSandboxExtensionDescriptorJson(value),
        manifestUrl: '',
      },
      success: true,
    }
  } catch {
    return {
      errors: { manifestUrl: messages.manifestUrlDescriptor },
      success: false,
    }
  }
}

const createContextJsonSchema = (
  contextNames: readonly string[],
  messages: DevPanelValidationMessages
) => z.unknown().superRefine((value, context) => {
  if (!isRecord(value)) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: messages.contextJsonRootObject,
      path: ['contextJson'],
    })

    return
  }

  Object.entries(value).forEach(([contextName, contextValue]) => {
    if (!contextNames.includes(contextName)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: messages.contextJsonUnknownContext(contextName),
        path: ['contextJson'],
      })
    }

    if (!isRecord(contextValue)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: messages.contextJsonContextObject(contextName),
        path: ['contextJson'],
      })
    }
  })
}).transform(value => value as Record<string, Record<string, unknown>>)

const formatDevPanelValidationErrors = (
  issues: z.ZodIssue[]
): DevPanelValidationErrors =>
  issues.reduce<DevPanelValidationErrors>((errors, issue) => {
    const field = getIssueField(issue)

    if (!errors[field]) {
      errors[field] = issue.message
    }

    return errors
  }, {})

const getIssueField = (issue: z.ZodIssue): DevPanelField => {
  const [field] = issue.path

  if (isDevPanelField(field)) return field

  return 'contextJson'
}

const isDevPanelField = (value: unknown): value is DevPanelField =>
  value === 'contextJson'
  || value === 'fixture'
  || value === 'manifestUrl'
  || value === 'mode'
  || value === 'pageCode'
  || value === 'targets'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const getJsonParseErrorLocation = (
  value: string,
  error: unknown
): { column: number; line: number } | null => {
  if (!(error instanceof SyntaxError)) return null

  const lineAndColumn = error.message.match(/line\s+(\d+)\s+column\s+(\d+)/i)

  if (lineAndColumn) {
    return {
      column: Number(lineAndColumn[2]),
      line: Number(lineAndColumn[1]),
    }
  }

  const position = error.message.match(/position\s+(\d+)/i)

  if (!position) return null

  const offset = Number(position[1])
  const prefix = value.slice(0, offset)
  const lastLineBreak = prefix.lastIndexOf('\n')

  return {
    column: offset - lastLineBreak,
    line: prefix.split('\n').length,
  }
}
