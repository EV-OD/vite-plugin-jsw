import { ClassPrototype, IdentifierExpression ,  DecoratorNode,
  DeclarationStatement,
  Source,
  Node,
  SourceKind,
  Program,
  ClassDeclaration,
  TypeNode,
  NodeKind,
  InterfaceDeclaration,
  FunctionDeclaration,
  TypeName,
  DiagnosticCategory,
  DiagnosticEmitter,
  NamedTypeNode,
  Range,
  util,} from "assemblyscript"
import { writeFileSync, existsSync, mkdirSync } from "fs"
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';


import * as AS from "assemblyscript"
import { Transform } from "assemblyscript/transform"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log("DEBUG: Transform file is being loaded by Node");
class MyTransform extends Transform {
  afterParse(parser) {
    this.log("Running MyTransform afterParse");
    const visit = (node) => {
      if (!node || typeof node !== 'object') return;

      // 1. Handle ElementAccess (e.g., array[index])
      if (node.kind === NodeKind.ElementAccess) {
        this.log("Found ElementAccess node, modifying index expression.");
        this.log(`Original node: ${node.toString()}`);
        
        const indexExpr = node.elementExpression;

        // Create the wrap: i32(indexExpr)
        // We use Node.create... methods instead of Class.create
        const call = Node.createCallExpression(
          Node.createIdentifierExpression("i32", indexExpr.range),
          null,        // Template types
          [indexExpr], // Arguments
          indexExpr.range
        );

        // Replace the original index
        node.elementExpression = call;

        // IMPORTANT: Visit the baseExpression (the array) but NOT the 
        // new elementExpression to avoid infinite recursion.
        visit(node.expression); 
        return; 
      }

      // 2. Recursively visit all child properties
      // Using Object.keys is a "manual" way to walk the tree.
      for (const key of Object.keys(node)) {
        if (key === 'range' || key === 'parent' || key === 'baseExpression') continue;
        const child = node[key];
        if (child && typeof child === 'object') {
          if (Array.isArray(child)) {
            for (let i = 0; i < child.length; i++) {
              visit(child[i]);
            }
          } else {
            visit(child);
          }
        }
      }
    };

    for (const source of parser.sources) {
      // Avoid modifying the standard library which is under ~lib/
      if (!source.internalPath.startsWith("~lib/")) {
        visit(source);
      }
    }
    
  }
}

export default MyTransform;