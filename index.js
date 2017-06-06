module.exports = function (babel) {
  const t = babel.types

  return {
    visitor: {
      FunctionDeclaration: function (path, state) {
        const params = path.node.params

        // only snog if there's something to log
        if (!params.length) { return }

        const node = t.callExpression(
          t.callExpression(
            t.identifier('require'),
            [
              t.stringLiteral('snog')
            ]
          ),
          [
            t.objectExpression(
              params.map(p => t.objectProperty(t.identifier(p.name), t.identifier(p.name)))
            )
          ]
        )
        path.get('body').unshiftContainer('body', node)
      }
    }
  }
}
