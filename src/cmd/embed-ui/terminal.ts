import type { SpawnOptionsWithoutStdio } from 'node:child_process'

import { spawn } from 'node:child_process'

const SPINNER_FRAMES = ['-', '\\', '|', '/'] as const

class CommandError extends Error {
  stdout: Buffer
  stderr: Buffer

  constructor(command: string, exitCode: number | null, stdout: Buffer, stderr: Buffer) {
    super(`Command failed${exitCode === null ? '' : ` with exit code ${exitCode}`}: ${command}`)
    this.stdout = stdout
    this.stderr = stderr
  }
}

const createSpinner = (message: string): (() => void) => {
  if (!process.stderr.isTTY) {
    return () => undefined
  }

  let frameIndex = 0

  process.stderr.write(`${SPINNER_FRAMES[frameIndex]} ${message}`)

  const timer = setInterval(() => {
    frameIndex = (frameIndex + 1) % SPINNER_FRAMES.length
    process.stderr.write(`\r${SPINNER_FRAMES[frameIndex]} ${message}`)
  }, 100)

  return () => {
    clearInterval(timer)
  }
}

const finishSpinner = (message: string, status: 'OK' | 'FAIL'): void => {
  if (process.stderr.isTTY) {
    process.stderr.write(`\r${status} ${message}\n`)
  }
}

export const runCommandWithTerminalStatus = async (
  command: string,
  args: string[],
  options: SpawnOptionsWithoutStdio,
  message: string
): Promise<void> => {
  const stopSpinner = createSpinner(message)
  const displayCommand = [command, ...args].join(' ')

  try {
    await new Promise<void>((resolve, reject) => {
      const child = spawn(command, args, {
        ...options,
        stdio: ['ignore', 'pipe', 'pipe'],
      })
      const stdout: Buffer[] = []
      const stderr: Buffer[] = []

      child.stdout.on('data', (chunk: Buffer) => stdout.push(chunk))
      child.stderr.on('data', (chunk: Buffer) => stderr.push(chunk))
      child.on('error', reject)
      child.on('close', (exitCode) => {
        const stdoutBuffer = Buffer.concat(stdout)
        const stderrBuffer = Buffer.concat(stderr)

        if (exitCode === 0) {
          resolve()
          return
        }

        reject(new CommandError(displayCommand, exitCode, stdoutBuffer, stderrBuffer))
      })
    })

    finishSpinner(message, 'OK')
  } catch (error) {
    finishSpinner(message, 'FAIL')
    throw error
  } finally {
    stopSpinner()
  }
}
