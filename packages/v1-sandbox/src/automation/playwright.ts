import type { SandboxLaunchInput } from '@/automation/bridge'

import { SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY } from '@/automation/bridge'

export type SandboxPlaywrightPage = {
  evaluate<R, A>(
    pageFunction: (arg: A) => R | Promise<R>,
    arg: A,
  ): Promise<R>;
  waitForFunction<R, A>(
    pageFunction: (arg: A) => R,
    arg: A,
  ): Promise<unknown>;
  waitForURL(
    url: string | RegExp | ((url: URL) => boolean),
  ): Promise<unknown>;
}

export type LaunchSandboxExtensionOptions = {
  waitForUrl?: boolean;
}

export const waitForSandboxLaunchBridge = async (
  page: SandboxPlaywrightPage
): Promise<void> => {
  await page.waitForFunction((key) => {
    return Boolean(window[key as typeof SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY])
  }, SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY)
}

export const launchSandboxExtension = async (
  page: SandboxPlaywrightPage,
  config: SandboxLaunchInput,
  options: LaunchSandboxExtensionOptions = {}
): Promise<void> => {
  await waitForSandboxLaunchBridge(page)

  await Promise.all([
    options.waitForUrl === false
      ? Promise.resolve()
      : page.waitForURL((url) => {
        return Object.entries(config).every(([key, value]) => {
          if (Array.isArray(value)) {
            return url.searchParams.get(key) === value.join(',')
          }

          if (value === null || value === undefined) {
            return true
          }

          return url.searchParams.get(key) === String(value)
        })
      }),
    page.evaluate(({ launchConfig, key }) => {
      window[key]?.launch(launchConfig)
    }, {
      key: SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY,
      launchConfig: config,
    }),
  ])
}
