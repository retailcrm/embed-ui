import type { Page } from 'playwright'

import { dirname } from 'node:path'
import { mkdir } from 'node:fs/promises'
import process from 'node:process'
import { resolve } from 'node:path'

import { chromium } from 'playwright'

type CliOptions = {
  baseUrl: string;
  output: string;
  selector?: string;
  settleMs: number;
  storyPath: string;
  timeoutMs: number;
  viewportHeight: number;
  viewportWidth: number;
  waitForSelector?: string;
}

const DEFAULT_OPTIONS: CliOptions = {
  baseUrl: 'http://127.0.0.1:6006',
  output: 'artifacts/storybook/UiTable.docs.png',
  settleMs: 2500,
  storyPath: '/docs/components-uitable--docs',
  timeoutMs: 60000,
  viewportHeight: 1600,
  viewportWidth: 1600,
}

const parseInteger = (value: string, flag: string): number => {
  const parsed = Number.parseInt(value, 10)

  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`Invalid value for ${flag}: ${value}`)
  }

  return parsed
}

const parseArgs = (argv: string[]): CliOptions => {
  const options: CliOptions = { ...DEFAULT_OPTIONS }

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index]
    const nextValue = argv[index + 1]

    const readValue = (flag: string) => {
      if (!nextValue) {
        throw new Error(`Missing value for ${flag}`)
      }

      index += 1

      return nextValue
    }

    if (argument === '--base-url') {
      options.baseUrl = readValue(argument)
      continue
    }

    if (argument === '--output') {
      options.output = readValue(argument)
      continue
    }

    if (argument === '--path') {
      options.storyPath = readValue(argument)
      continue
    }

    if (argument === '--settle-ms') {
      options.settleMs = parseInteger(readValue(argument), argument)
      continue
    }

    if (argument === '--selector') {
      options.selector = readValue(argument)
      continue
    }

    if (argument === '--timeout-ms') {
      options.timeoutMs = parseInteger(readValue(argument), argument)
      continue
    }

    if (argument === '--viewport-height') {
      options.viewportHeight = parseInteger(readValue(argument), argument)
      continue
    }

    if (argument === '--viewport-width') {
      options.viewportWidth = parseInteger(readValue(argument), argument)
      continue
    }

    if (argument === '--wait-for-selector') {
      options.waitForSelector = readValue(argument)
      continue
    }

    throw new Error(`Unknown argument: ${argument}`)
  }

  return options
}

const delay = async (timeoutMs: number) => {
  await new Promise((resolveDelay) => {
    setTimeout(resolveDelay, timeoutMs)
  })
}

const waitForStorybook = async (baseUrl: string, timeoutMs: number) => {
  const startedAt = Date.now()
  let lastError: unknown = null

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(baseUrl)

      if (response.ok) {
        return
      }

      lastError = new Error(`Unexpected status: ${response.status}`)
    } catch (error) {
      lastError = error
    }

    await delay(1000)
  }

  throw new Error(`Storybook did not become ready at ${baseUrl} within ${timeoutMs}ms. Last error: ${String(lastError)}`)
}

const waitForSelectorWithScroll = async (
  page: Page,
  selector: string,
  timeoutMs: number
) => {
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    const locator = page.locator(selector).last()

    if (await locator.isVisible().catch(() => false)) {
      return
    }

    const reachedBottom = await page.evaluate(() => {
      const { documentElement } = document

      window.scrollBy(0, Math.max(window.innerHeight - 120, 240))

      return window.scrollY + window.innerHeight >= documentElement.scrollHeight - 4
    })

    await page.waitForTimeout(300)

    if (reachedBottom) {
      await page.waitForTimeout(600)
    }
  }

  throw new Error(`Timed out waiting for selector ${selector}`)
}

const warmUpFullPage = async (
  page: Page,
  timeoutMs: number
) => {
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    const reachedBottom = await page.evaluate(() => {
      const { documentElement } = document

      window.scrollBy(0, Math.max(window.innerHeight - 160, 320))

      return window.scrollY + window.innerHeight >= documentElement.scrollHeight - 4
    })

    await page.waitForTimeout(250)

    if (reachedBottom) {
      return
    }
  }

  throw new Error(`Timed out warming up full page within ${timeoutMs}ms`)
}

const toStoryUrl = (baseUrl: string, storyPath: string) => {
  const trimmedBaseUrl = baseUrl.replace(/\/$/, '')

  if (storyPath.startsWith('http://') || storyPath.startsWith('https://')) {
    return storyPath
  }

  if (
    storyPath.startsWith('/?')
    || storyPath.startsWith('?')
    || storyPath.startsWith('/iframe.html')
    || storyPath.startsWith('iframe.html')
  ) {
    const normalizedPath = storyPath.startsWith('/') ? storyPath : `/${storyPath}`

    return `${trimmedBaseUrl}${normalizedPath}`
  }

  return `${trimmedBaseUrl}/?path=${storyPath}`
}

const run = async () => {
  const options = parseArgs(process.argv.slice(2))
  const outputPath = resolve(options.output)
  const storyUrl = toStoryUrl(options.baseUrl, options.storyPath)

  await waitForStorybook(options.baseUrl, options.timeoutMs)

  const browser = await chromium.launch({
    headless: true,
  })

  try {
    const page = await browser.newPage({
      viewport: {
        width: options.viewportWidth,
        height: options.viewportHeight,
      },
    })

    await page.goto(storyUrl, {
      waitUntil: 'domcontentloaded',
      timeout: options.timeoutMs,
    })

    await page.waitForLoadState('networkidle', { timeout: options.timeoutMs })

    if (options.waitForSelector) {
      await waitForSelectorWithScroll(page, options.waitForSelector, options.timeoutMs)
    }

    await warmUpFullPage(page, options.timeoutMs)

    await page.evaluate(async () => {
      if ('fonts' in document) {
        await document.fonts.ready
      }
    })

    await page.waitForTimeout(options.settleMs)
    await page.evaluate(() => {
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(250)

    await mkdir(dirname(outputPath), { recursive: true })
    if (options.selector) {
      const locator = page.locator(options.selector).last()

      await locator.scrollIntoViewIfNeeded()
      await locator.screenshot({
        path: outputPath,
      })
    } else {
      await page.screenshot({
        fullPage: true,
        path: outputPath,
      })
    }

    console.log(outputPath)
  } finally {
    await browser.close()
  }
}

void run()
