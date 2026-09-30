import * as ts from 'typescript'

const printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed,
  removeComments: false,
})

export const formatDeclarationFile = (content: string): string => {
  const sourceFile = ts.createSourceFile(
    'declaration.d.ts',
    content,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  )

  return `${printer.printFile(sourceFile)}\n`
}

export const fixHostDeclarationFile = (content: string): string => formatDeclarationFile(
  content
    .replace(
      'import { Attrs } from \'vue\';',
      'type Attrs = Record<string, unknown>;'
    )
    .replace(
      'import { GlobalComponents } from \'vue\';',
      'import { GlobalComponents as VueGlobalComponents } from \'vue\';\ntype GlobalComponents = { [K in keyof VueGlobalComponents]: VueGlobalComponents[K] };'
    )
    .replace(
      'import { GlobalDirectives } from \'vue\';',
      'import { GlobalDirectives as VueGlobalDirectives } from \'vue\';\ntype GlobalDirectives = { [K in keyof VueGlobalDirectives]: VueGlobalDirectives[K] };'
    )
    .replaceAll('$nextTick: nextTick;', '$nextTick: typeof nextTick;')
)
