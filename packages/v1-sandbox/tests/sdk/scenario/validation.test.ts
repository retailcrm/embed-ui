import type { DevPanelValidationMessages } from '@/scenario'

import { expect, test } from 'vitest'

import { validateContextJsonInput, validateLaunchConfigInput } from '@/scenario'

const messages: DevPanelValidationMessages = {
  contextJsonContextObject: context => `Context "${context}" must be an object.`,
  contextJsonInvalidJson: 'Context JSON must be valid JSON.',
  contextJsonInvalidJsonAt: (line, column) => `Invalid JSON at ${line}:${column}.`,
  contextJsonRootObject: 'Context JSON must be an object.',
  contextJsonUnknownContext: context => `Unknown context "${context}".`,
  fixture: 'Unknown fixture.',
  manifestUrlDescriptor: 'Extension descriptor is invalid.',
  manifestUrlRequired: 'Extension descriptor is required.',
  mode: 'Unknown mode.',
  pageCodeFormat: 'Page code has an invalid format.',
  pageCodeRequired: 'Page code is required.',
  targetRequired: 'Select at least one target.',
  targetUnknown: target => `Unknown target "${target}".`,
}

const descriptor = {
  baseUrl: 'https://extension.test/runtime/',
  code: 'returns-module',
  entrypoint: 'worker.js',
  pages: ['returns'],
  stylesheet: null,
  targets: ['order/card:common.after'],
}

const validLaunchInput = {
  fixture: 'order-basic',
  manifestUrl: JSON.stringify(descriptor),
  mode: 'widget',
  pageCode: 'returns',
  targets: ['order/card:common.after'],
}

test('rejects empty manifest urls', () => {
  const result = validateLaunchConfigInput({
    ...validLaunchInput,
    manifestUrl: '',
  }, messages)

  expect(result).toEqual({
    errors: {
      manifestUrl: 'Extension descriptor is required.',
    },
    success: false,
  })
})

test('rejects direct extension urls', () => {
  const invalidUrl = validateLaunchConfigInput({
    ...validLaunchInput,
    manifestUrl: 'extension.test/module-id',
  }, messages)
  expect(invalidUrl).toEqual({
    errors: {
      manifestUrl: 'Extension descriptor is invalid.',
    },
    success: false,
  })
})

test('accepts a strict extension descriptor', () => {
  const result = validateLaunchConfigInput({
    ...validLaunchInput,
    manifestUrl: JSON.stringify(descriptor),
  }, messages)

  expect(result).toEqual({
    data: {
      ...validLaunchInput,
      descriptor,
      manifestUrl: '',
    },
    success: true,
  })
})

test('rejects malformed or non-strict extension descriptors', () => {
  const result = validateLaunchConfigInput({
    ...validLaunchInput,
    manifestUrl: JSON.stringify({
      entrypoint: 'https://extension.test/runtime/worker.js',
      baseUrl: 'https://extension.test/',
      code: 'returns-module',
      pages: [],
      runner: 'worker',
      stylesheet: null,
      targets: [],
    }),
  }, messages)

  expect(result).toEqual({
    errors: {
      manifestUrl: 'Extension descriptor is invalid.',
    },
    success: false,
  })
})

test('rejects non-json direct urls with unsupported protocols', () => {
  const result = validateLaunchConfigInput({
    ...validLaunchInput,
    manifestUrl: 'ftp://extension.test/extension/module-id',
  }, messages)

  expect(result).toEqual({
    errors: {
      manifestUrl: 'Extension descriptor is invalid.',
    },
    success: false,
  })
})

test('keeps the first validation error for each field', () => {
  const result = validateLaunchConfigInput({
    ...validLaunchInput,
    targets: ['unknown-first', 'unknown-second'],
  }, messages)

  expect(result).toEqual({
    errors: {
      targets: 'Unknown target "unknown-first".',
    },
    success: false,
  })
})

test('requires page code only for page mode', () => {
  const pageResult = validateLaunchConfigInput({
    ...validLaunchInput,
    mode: 'page',
    pageCode: ' ',
  }, messages)
  const widgetResult = validateLaunchConfigInput({
    ...validLaunchInput,
    mode: 'widget',
    pageCode: ' ',
  }, messages)

  expect(pageResult).toEqual({
    errors: {
      pageCode: 'Page code is required.',
    },
    success: false,
  })
  expect(widgetResult.success).toBe(true)
})

test('validates page code format only in page mode', () => {
  const invalidPageResult = validateLaunchConfigInput({
    ...validLaunchInput,
    mode: 'page',
    pageCode: 'orders_dashboard2',
  }, messages)
  const validPageResult = validateLaunchConfigInput({
    ...validLaunchInput,
    mode: 'page',
    pageCode: 'orders-dashboard',
  }, messages)
  const ignoredWidgetResult = validateLaunchConfigInput({
    ...validLaunchInput,
    mode: 'widget',
    pageCode: 'orders_dashboard2',
  }, messages)

  expect(invalidPageResult).toEqual({
    errors: {
      pageCode: 'Page code has an invalid format.',
    },
    success: false,
  })
  expect(validPageResult.success).toBe(true)
  expect(ignoredWidgetResult.success).toBe(true)
})

test('requires at least one valid widget target in widget mode', () => {
  const emptyTargets = validateLaunchConfigInput({
    ...validLaunchInput,
    targets: [],
  }, messages)
  const unknownTarget = validateLaunchConfigInput({
    ...validLaunchInput,
    targets: ['unknown'],
  }, messages)

  expect(emptyTargets).toEqual({
    errors: {
      targets: 'Select at least one target.',
    },
    success: false,
  })
  expect(unknownTarget).toEqual({
    errors: {
      targets: 'Unknown target "unknown".',
    },
    success: false,
  })
})

test('rejects unknown fixture', () => {
  const result = validateLaunchConfigInput({
    ...validLaunchInput,
    fixture: 'unknown',
  }, messages)

  expect(result).toEqual({
    errors: {
      fixture: 'Unknown fixture.',
    },
    success: false,
  })
})

test('validates context json overrides', () => {
  const contextNames = ['order/card', 'order/card:settings', 'settings', 'user/current']

  expect(validateContextJsonInput('invalid', contextNames, messages)).toEqual({
    errors: {
      contextJson: 'Context JSON must be valid JSON.',
    },
    success: false,
  })
  expect(validateContextJsonInput('[]', contextNames, messages)).toEqual({
    errors: {
      contextJson: 'Context JSON must be an object.',
    },
    success: false,
  })
  expect(validateContextJsonInput('{"unknown":{}}', contextNames, messages)).toEqual({
    errors: {
      contextJson: 'Unknown context "unknown".',
    },
    success: false,
  })
  expect(validateContextJsonInput('{"order/card":[]}', contextNames, messages)).toEqual({
    errors: {
      contextJson: 'Context "order/card" must be an object.',
    },
    success: false,
  })

  const validResult = validateContextJsonInput(
    '{"order/card":{"number":"999C"}}',
    contextNames,
    messages
  )

  expect(validResult).toEqual({
    data: {
      'order/card': {
        number: '999C',
      },
    },
    success: true,
  })
})

test('includes JSON parser location when it is available', () => {
  const contextNames = ['order/card', 'order/card:settings', 'settings', 'user/current']

  expect(validateContextJsonInput('{\n  "order/card": {},\n}', contextNames, messages)).toEqual({
    errors: {
      contextJson: 'Invalid JSON at 3:1.',
    },
    success: false,
  })
})
