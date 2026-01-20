// public/indexCastTransform.cjs

module.exports = class AutoCastIndexTransform {
  afterParse(parser) {
    // 1. Locate the AssemblyScript library instance
    // We try the global injected by 'asc' first, then the parser's program prototype
    const AS = global.assemblyscript || 
               (parser.program && parser.program.constructor.assemblyscript) ||
               require("assemblyscript/dist/sdk.js");

    if (!AS || !AS.CallExpression) {
      // If this shows up in your terminal, we know why it's failing
      console.error("[JSW] Error: Could not locate AssemblyScript AST factory.");
      return;
    }

    const visit = (node) => {
      if (!node || typeof node !== 'object') return;

      // NodeKind.ELEMENT_ACCESS = 54 (matches: array[index])
      if (node.kind === 54) {
        const indexExpr = node.elementExpression;

        // Create the wrap: i32(indexExpr)
        const call = AS.CallExpression.create(
          indexExpr.range.source,
          AS.IdentifierExpression.create(indexExpr.range.source, "i32", indexExpr.range),
          null,
          [indexExpr],
          indexExpr.range
        );

        // Replace the original index with our new i32() call
        node.elementExpression = call;
      }

      // Recursively visit all child properties
      for (const key of Object.keys(node)) {
        if (key === 'range' || key === 'parent' || key === 'baseExpression') continue;
        const child = node[key];
        if (child && typeof child === 'object') {
          if (Array.isArray(child)) {
            for (let i = 0; i < child.length; i++) visit(child[i]);
          } else {
            visit(child);
          }
        }
      }
    };

    // Transform every source file except the standard library
    for (const source of parser.sources) {
      if (!source.internalPath.startsWith("~lib/")) {
        visit(source);
      }
    }
  }
}