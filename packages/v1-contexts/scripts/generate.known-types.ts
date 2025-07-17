import * as ts from 'typescript'

import * as fs from 'fs'
import * as path from 'node:path'

import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const __root = path.resolve(__dirname, '..')
const __generated = path.resolve(__root, 'generated')
if (!fs.existsSync(__generated)) {
  fs.mkdirSync(__generated)
}

const excluded = new Set([
  'MethodList',
  'Schema',
])

const inputFilePath = path.resolve(__root, 'types/order/card.d.ts')
const outputFilePath = path.resolve(__generated, 'known-types.d.ts')

const source = ts.createSourceFile(
  inputFilePath,
  fs.readFileSync(inputFilePath, 'utf8'),
  ts.ScriptTarget.Latest,
  true
)

const result: Record<string, string> = {}

function traverse(node: ts.Node) {
  if (ts.isTypeAliasDeclaration(node)) {
    const name = node.name.text
    const exported = (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0

    if (!excluded.has(name) && exported && ts.isTypeLiteralNode(node.type)) {
      result[name] = node.type.getFullText(source).trim()
    }
  }

  ts.forEachChild(node, traverse)
}

traverse(source)

fs.writeFileSync(outputFilePath, `${
  Object.keys(result).map(key => `import type { ${key} } from '../types/order/card.d.ts'`).join('\n')
}

export type KnownTypes = {
${Object.entries(result)
    .map(([key]) => `  '${key}': ${key};`)
    .join('\n')}
};\n`, 'utf8')

console.log(`Generated "${outputFilePath}"`)
