import {
  DEFAULT_FIXTURE,
  DEFAULT_HOST,
  DEFAULT_PORT,
  startExtensionFixtureServer,
} from './serve-extension-fixture.mjs'

const fixtureBaseUrl = `http://${DEFAULT_HOST}:${DEFAULT_PORT}/`

const canReuseFixtureServer = async () => {
  try {
    const response = await fetch(new URL('/index.html', fixtureBaseUrl), {
      method: 'HEAD',
    })

    return response.ok
  } catch {
    return false
  }
}

export default async () => {
  if (process.env.SANDBOX_FIXTURE_BASE_URL) {
    return
  }

  let fixtureServer

  try {
    fixtureServer = await startExtensionFixtureServer({
      fixture: DEFAULT_FIXTURE,
      host: DEFAULT_HOST,
      port: DEFAULT_PORT,
    })
  } catch (error) {
    if (
      error instanceof Error
      && 'code' in error
      && error.code === 'EADDRINUSE'
      && await canReuseFixtureServer()
    ) {
      return
    }

    throw error
  }

  return async () => {
    await fixtureServer.close()
  }
}
