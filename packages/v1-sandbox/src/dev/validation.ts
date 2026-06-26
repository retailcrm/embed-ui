import type { SandboxLaunchMode, SandboxOrderTarget } from '@/dev/types'

import { z } from 'zod'

import { isSandboxOrderTarget } from '@/dev/predicates'
import { orderSandboxFixtures } from '@/dev/fixtures'

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
  contextJsonRootObject: string;
  contextJsonUnknownContext(context: string): string;
  fixture: string;
  manifestUrlEndpoint: string;
  manifestUrlFormat: string;
  mode: string;
  pageCodeRequired: string;
  targetRequired: string;
  targetUnknown(target: string): string;
}

export type LaunchConfigValidationInput = {
  fixture: string;
  manifestUrl: string;
  mode: string;
  pageCode: string;
  targets: string[];
}

export type ValidatedLaunchConfigInput = {
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

  return {
    data: {
      ...result.data,
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
  } catch {
    return {
      errors: {
        contextJson: messages.contextJsonInvalidJson,
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
    .superRefine((value, context) => {
      if (!value) return

      let url: URL

      try {
        url = new URL(value)
      } catch {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: messages.manifestUrlFormat,
        })

        return
      }

      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: messages.manifestUrlFormat,
        })

        return
      }

      if (!hasExtensionEndpoint(url)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: messages.manifestUrlEndpoint,
        })
      }
    }),
  mode: z.enum(['page', 'widget'], {
    invalid_type_error: messages.mode,
    required_error: messages.mode,
  }),
  pageCode: z.string().transform(value => value.trim()),
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
  if (value.mode === 'page' && !value.pageCode) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: messages.pageCodeRequired,
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

const hasExtensionEndpoint = (url: URL): boolean => {
  const parts = url.pathname.split('/').filter(Boolean)
  const extensionIndex = parts.indexOf('extension')

  return extensionIndex >= 0 && Boolean(parts[extensionIndex + 1])
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)
