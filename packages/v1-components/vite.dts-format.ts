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
