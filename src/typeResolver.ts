import * as ts from 'typescript';
/**
 * Uses TypeScript to find missing return types and variable types,
 * converting "implicit" code into "explicit" AssemblyScript code.
 */
export function resolveImplicitTypes(sourceCode: string, fileName: string = 'input.ts'): string {
  // 1. Create a virtual file system for the TypeChecker
  const sourceFile = ts.createSourceFile(fileName, sourceCode, ts.ScriptTarget.Latest, true);
  
  // Create a minimal compiler host to handle the virtual file
  const defaultCompilerHost = ts.createCompilerHost({});
  const customCompilerHost: ts.CompilerHost = {
    ...defaultCompilerHost,
    getSourceFile: (name, target) => name === fileName ? sourceFile : defaultCompilerHost.getSourceFile(name, target),
    writeFile: () => {}, // We don't need to write files to disk
    getCurrentDirectory: () => "/",
    getCanonicalFileName: f => f,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: name => name === fileName,
    readFile: name => name === fileName ? sourceCode : undefined,
  };

  // 2. Create the TypeScript Program and TypeChecker
  const program = ts.createProgram([fileName], { 
    allowJs: true, 
    strict: false, // Be lenient to allow inference
    noLib: true    // We don't need full DOM/Node libs for basic math
  }, customCompilerHost);
  
  const checker = program.getTypeChecker();
  const printer = ts.createPrinter();

  // 3. Transformation Function: This visits every node and adds types
  const transformer = (context: ts.TransformationContext) => {
    return (rootNode: ts.SourceFile) => {
      function visit(node: ts.Node): ts.Node {
        
        // Handle Functions with missing return types
        if (ts.isFunctionDeclaration(node) && !node.type) {
          const signature = checker.getSignatureFromDeclaration(node);
          if (signature) {
            const returnType = checker.getReturnTypeOfSignature(signature);
            const typeString = mapTsToAsType(checker.typeToString(returnType));
            
            // Reclone the function with the new return type
            return ts.factory.updateFunctionDeclaration(
              node,
              node.modifiers,
              node.asteriskToken,
              node.name,
              node.typeParameters,
              node.parameters,
              ts.factory.createTypeReferenceNode(typeString, undefined), // Injected Type
              node.body
            );
          }
        }

        // Handle Variables with missing types (e.g., let x = 5)
        if (ts.isVariableDeclaration(node) && !node.type && node.initializer) {
            let type = checker.getTypeAtLocation(node.initializer);
            // FIX: If the type is a literal (like the number 0), get the base type (number)
            if (type.isLiteral()) {
                type = checker.getBaseTypeOfLiteralType(type);
            }
            const typeString = checker.typeToString(
                type, 
                node, 
                ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseFullyQualifiedType
            );       
            const asType = mapTsToAsType(typeString);
            if (asType !== 'any') {     
            return ts.factory.updateVariableDeclaration(
                node,
                node.name,
                node.exclamationToken,
                ts.factory.createTypeReferenceNode(typeString, undefined), // Injected Type
                node.initializer
            );
        }
        }

        return ts.visitEachChild(node, visit, context);
      }
      return ts.visitNode(rootNode, visit) as ts.SourceFile;
    };
  };

  // 4. Execute transformation and print results
  const result = ts.transform(sourceFile, [transformer]);
  const transformedSourceFile = result.transformed[0];
  return printer.printFile(transformedSourceFile);
}

/**
 * Helper to map standard TS 'number' to the default 'f64' for AssemblyScript
 */
function mapTsToAsType(tsType: string): string {
  // 1. Handle explicit literal numbers or general 'number'
  if (tsType === 'number' || !isNaN(Number(tsType))) return 'f64';
  
  // 2. Handle standard TS types
  if (tsType === 'boolean') return 'bool';
  if (tsType === 'void') return 'void';
  
  // 3. Handle Typed Arrays (Very important for your Neural Network)
  if (tsType.includes('Float64Array')) return 'Float64Array';
  if (tsType.includes('Float32Array')) return 'Float32Array';
  if (tsType.includes('Int32Array')) return 'Int32Array';
  
  // 4. Handle 'any' - Default to f64 for math-heavy code, 
  // or return 'any' to skip injection and let AS handle it.
  if (tsType === 'any') return 'any'; 
  
  return tsType;
}