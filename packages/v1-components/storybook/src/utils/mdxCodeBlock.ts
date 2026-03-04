import 'highlight.js/styles/github.css'
import './highlightJs.css'

import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'

import React from 'react'

import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import less from 'highlight.js/lib/languages/less'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'

type MdxCodeBlockProps = ComponentPropsWithoutRef<'code'>
type MdxPreBlockProps = ComponentPropsWithoutRef<'pre'>
type CodeElementProps = ComponentPropsWithoutRef<'code'> & {
  'data-language'?: string
}

const COPY_BUTTON_TEXT = 'Copy'
const COPIED_BUTTON_TEXT = 'Copied'
const COPY_BUTTON_RESET_DELAY_MS = 1200
const CODE_BLOCK_CLASS = 'omnica-hljs-block'
const COPY_BUTTON_CLASS = 'omnica-hljs-copy'
const LANGUAGE_PREFIXES = ['language-', 'lang-']

const LANGUAGE_ALIASES: Record<string, string> = {
  cjs: 'javascript',
  html: 'xml',
  js: 'javascript',
  jsx: 'javascript',
  markup: 'xml',
  sh: 'bash',
  shell: 'bash',
  ts: 'typescript',
  tsx: 'typescript',
  vue: 'xml',
}

let languagesRegistered = false

function registerLanguages (): void {
  if (languagesRegistered) return

  hljs.registerLanguage('bash', bash)
  hljs.registerLanguage('css', css)
  hljs.registerLanguage('javascript', javascript)
  hljs.registerLanguage('json', json)
  hljs.registerLanguage('less', less)
  hljs.registerLanguage('typescript', typescript)
  hljs.registerLanguage('xml', xml)

  languagesRegistered = true
}

function escapeHtml (value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&#39;')
}

function normalizeClassName (value?: string | null): string | null {
  if (!value) return null

  for (const token of value.split(/\s+/u)) {
    for (const prefix of LANGUAGE_PREFIXES) {
      if (token.startsWith(prefix)) {
        return token.slice(prefix.length)
      }
    }
  }

  return null
}

function resolveLanguage (value?: string | null): string | null {
  const normalized = value?.trim().toLowerCase()
  if (!normalized) return null

  const language = LANGUAGE_ALIASES[normalized] || normalized
  return hljs.getLanguage(language) ? language : null
}

function extractText (node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number' || typeof node === 'boolean') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')

  if (React.isValidElement<{ children?: ReactNode }>(node)) {
    return extractText(node.props.children)
  }

  return ''
}

function findCodeElement (node: ReactNode): ReactElement<CodeElementProps> | null {
  if (React.isValidElement<CodeElementProps>(node) && node.type === 'code') {
    return node
  }

  if (!Array.isArray(node)) return null

  for (const child of node) {
    const codeElement = findCodeElement(child)
    if (codeElement) return codeElement
  }

  return null
}

function withClassName (baseClass: string, className?: string): string {
  return className ? `${className} ${baseClass}` : baseClass
}

function trimTrailingNewline (source: string): string {
  return source.replace(/\r?\n$/u, '')
}

function highlightSource (
  source: string,
  language: string | null
): { html: string; language: string | null } {
  registerLanguages()

  if (source.trim() === '') {
    return { html: '', language: language || null }
  }

  try {
    if (language) {
      return {
        html: hljs.highlight(source, {
          ignoreIllegals: true,
          language,
        }).value,
        language,
      }
    }

    const autoResult = hljs.highlightAuto(source)
    return {
      html: autoResult.value,
      language: autoResult.language || null,
    }
  } catch {
    return {
      html: escapeHtml(source),
      language: language || null,
    }
  }
}

async function copyTextToClipboard (value: string): Promise<boolean> {
  if (!value) return false

  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value)
      return true
    } catch {
      // Ignore and use fallback for older browser contexts.
    }
  }

  if (!document.body || typeof document.execCommand !== 'function') return false

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', 'true')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  textarea.style.pointerEvents = 'none'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()

  try {
    return document.execCommand('copy')
  } finally {
    textarea.remove()
  }
}

export function MdxCodeBlock (props: MdxCodeBlockProps): React.ReactElement {
  const { children, ...rest } = props
  return React.createElement('code', rest, children)
}

export function MdxCodePreBlock (props: MdxPreBlockProps): React.ReactElement {
  const { children, className, ...rest } = props

  const codeElement = findCodeElement(children)
  const codeElementProps = codeElement?.props

  const source = trimTrailingNewline(extractText(codeElementProps?.children ?? children))
  const language = resolveLanguage(
    codeElementProps?.['data-language'] ||
      normalizeClassName(codeElementProps?.className) ||
      normalizeClassName(className)
  )

  const highlightResult = React.useMemo(
    () => highlightSource(source, language),
    [language, source]
  )

  const [copied, setCopied] = React.useState(false)
  const resetTimerRef = React.useRef<number | null>(null)

  React.useEffect(() => () => {
    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current)
    }
  }, [])

  const onCopy = React.useCallback(() => {
    void (async () => {
      const copiedText = await copyTextToClipboard(source)
      if (!copiedText) return

      setCopied(true)

      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current)
      }

      resetTimerRef.current = window.setTimeout(() => {
        setCopied(false)
        resetTimerRef.current = null
      }, COPY_BUTTON_RESET_DELAY_MS)
    })()
  }, [source])

  if (source.trim() === '') {
    return React.createElement('pre', { className, ...rest }, children)
  }

  const resolvedLanguage = highlightResult.language || language
  const codeClassName = resolvedLanguage ? `hljs language-${resolvedLanguage}` : 'hljs'

  return React.createElement(
    'pre',
    {
      ...rest,
      className: withClassName(CODE_BLOCK_CLASS, className),
      'data-language': resolvedLanguage || undefined,
    },
    React.createElement('code', {
      className: codeClassName,
      'data-language': resolvedLanguage || undefined,
      dangerouslySetInnerHTML: {
        __html: highlightResult.html || escapeHtml(source),
      },
    }),
    React.createElement(
      'button',
      {
        type: 'button',
        className: COPY_BUTTON_CLASS,
        'aria-label': 'Copy code',
        onClick: onCopy,
      },
      copied ? COPIED_BUTTON_TEXT : COPY_BUTTON_TEXT
    )
  )
}
