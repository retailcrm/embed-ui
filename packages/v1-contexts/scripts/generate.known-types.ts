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

type Literal = string
type Path = string
type SchemaName = string

const schemas: Record<SchemaName, Path[]> = {
  'order/card': [
    path.resolve(__root, 'types/order/card.d.ts'),
  ],
}

const code = {} as Record<SchemaName, string>

const extract = (srcPath: string) => {
  const source = ts.createSourceFile(
    srcPath,
    fs.readFileSync(srcPath, 'utf8'),
    ts.ScriptTarget.Latest,
    true
  )

  const known: Record<Literal, string> = {}

  function traverse (node: ts.Node) {
    if (ts.isTypeAliasDeclaration(node)) {
      const name = node.name.text
      const exported = (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0

      if (!excluded.has(name) && exported && ts.isTypeLiteralNode(node.type)) {
        known[name] = node.type.getFullText(source).trim()
      }
    }

    ts.forEachChild(node, traverse)
  }

  traverse(source)

  return known
}

const pathForSchema = (name: SchemaName): Path => path.join(__generated, name + '.d.ts')

Object.keys(schemas).forEach(name => {
  const _imports_ = {} as Record<Path, Record<Literal, string>>

  schemas[name].forEach(srcPath => {
    _imports_[path.relative(path.dirname(pathForSchema(name)), srcPath)] = extract(srcPath)
  })

  code[name] = Object.keys(_imports_).reduce((code, path) => {
    const literals = Object.keys(_imports_[path])

    // Считаем, что каждый литерал уникален, даже если источников типов больше одного
    return literals.length === 0
      ? code
      : code + literals.map(literal => `import type { ${literal} } from '${path}'`).join('\n') + '\n'
  }, '')

  code[name] += `\nexport type KnownTypes = {${Object.keys(_imports_).reduce((code, path) => {
    const literals = Object.keys(_imports_[path])

    return literals.length === 0
      ? code
      : code + '\n' + literals.map(literal => `  '${literal}': ${literal};`).join('\n')
  }, '')}
};\n`
})

Object.keys(code).forEach(name => {
  const dstPath = pathForSchema(name)
  const dstDir = path.dirname(dstPath)

  if (!fs.existsSync(dstDir)) {
    fs.mkdirSync(dstDir)
  }

  fs.writeFileSync(dstPath, code[name], 'utf8')

  console.log(`Generated "${dstPath}"`)
})
