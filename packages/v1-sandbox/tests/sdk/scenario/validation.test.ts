import type { DevPanelValidationMessages } from '@/scenario'

import { expect, test } from 'vitest'

import { validateContextJsonInput, validateLaunchConfigInput } from '@/scenario'

const messages: DevPanelValidationMessages = {
  contextJsonContextObject: context => `Context "${context}" must be an object.`,
  contextJsonInvalidJson: 'Context JSON must be valid JSON.',
  contextJsonRootObject: 'Context JSON must be an object.',
  contextJsonUnknownContext: context => `Unknown context "${context}".`,
  fixture: 'Unknown fixture.',
  manifestUrlEndpoint: 'Manifest URL must include /extension/%extension-id%.',
  manifestUrlFormat: 'Manifest URL must be an absolute http/https URL.',
  manifestUrlRequired: 'Manifest URL is required.',
  mode: 'Unknown mode.',
  pageCodeRequired: 'Page code is required.',
  targetRequired: 'Select at least one target.',
  targetUnknown: target => `Unknown target "${target}".`,
}

const validLaunchInput = {
  fixture: 'order-basic',
  manifestUrl: 'http://extension.test/extension/module-id',
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
      manifestUrl: 'Manifest URL is required.',
    },
    success: false,
  })
})

test('rejects malformed manifest urls', () => {
  const invalidUrl = validateLaunchConfigInput({
    ...validLaunchInput,
    manifestUrl: 'extension.test/module-id',
  }, messages)
  const missingEndpoint = validateLaunchConfigInput({
    ...validLaunchInput,
    manifestUrl: 'http://extension.test/module-id',
  }, messages)

  expect(invalidUrl).toEqual({
    errors: {
      manifestUrl: 'Manifest URL must be an absolute http/https URL.',
    },
    success: false,
  })
  expect(missingEndpoint).toEqual({
    errors: {
      manifestUrl: 'Manifest URL must include /extension/%extension-id%.',
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

  expect(validateContextJsonInput('{', contextNames, messages)).toEqual({
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
