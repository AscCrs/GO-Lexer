const reservedWords = [
  "import",
  "package",
  "func",
  "var",
  "const",
  "type",
  "struct",
  "interface",
  "map",
  "slice",
  "range",
  "for",
  "if",
  "else",
  "switch",
  "case",
  "default",
];

const operators = [
  ".",
  "+",
  "-",
  "*",
  "/",
  "%",
  "^",
  "==",
  "=",
  "!=",
  ":",
  ":=",
  "<",
  ">",
  ">=",
  "<=",
  "&&",
  "||",
  "!",
];

const delimiters = ["(", ")", "{", "}", "[", "]", ",", ";"];

const regexPatterns = {
  identifier: /^[a-zA-Z_]\w*/,
  integer: /^\d+/,
  float: /^\d+\.\d+/,
  string: /^"([^"]|\\.)*"|^'([^']|\\.)*'/,
};

function lex(input) {
  let tokens = []; // Arreglo con los tokens encontrados
  let cursor = 0;
  let line = 1;

  while (cursor < input.length) {
    let char = input[cursor];

    if (char === " " || char === "\t" || char === "\n") {
      if (char === "\n") {
        line++;
      }
      cursor++;
      continue;
    }

    if (char === "/" && input[cursor + 1] === "/") {
      let endIndex = input.indexOf("\n", cursor);
      if (endIndex === -1) {
        break; // Fin de entradas
      } else {
        cursor = endIndex;
        continue;
      }
    }
    
    if (char === "/" && input[cursor + 1] === "*") {
      let endIndex = input.indexOf("*/", cursor + 2);
      if (endIndex === -1) {
        throw new Error(
          `Lexical error: Comentario Multi Línea sin cerrar en la línea ${line}`
        );
      } else {
        let newlinesCount =
          input.substring(cursor, endIndex).split("\n").length - 1;
        line += newlinesCount;
        cursor = endIndex + 2; // No tomar en cuenta '*/'
        continue;
      }
    }    


    // Inclusion de los delimitadores
    if (delimiters.includes(char)) {
      tokens.push({ type: "delimitador", value: char, line });
      cursor++;
      continue;
    }

    // Inclusion de los operadores
    if (operators.includes(char)) {
      let value = char;
      if (char === "=" && input[cursor + 1] === "=") {
        value += "=";
        cursor++;
      }
      if ((char === "&" || char === "|") && input[cursor + 1] === char) {
        value += char;
        cursor++;
      }
      tokens.push({ type: "operador", value, line });
      cursor++;
      continue;
    }

    let match;
    if ((match = regexPatterns.identifier.exec(input.substring(cursor)))) {
      let value = match[0];
      if (reservedWords.includes(value)) {
        tokens.push({ type: "palabra reservada", value, line });
      } else {
        tokens.push({ type: "identificador", value, line });
      }
      cursor += value.length;
      continue;
    }

    for (let [patternName, pattern] of Object.entries(regexPatterns)) {
      if ((match = pattern.exec(input.substring(cursor)))) {
        let value = match[0];
        tokens.push({ type: patternName, value, line });
        cursor += value.length;
        break;
      }
    }

    // Si no hay coincidencia, se trata de un caracter invalido
    if (!match) {
      let invalidChar = input[cursor];
      throw new Error(
        `Lexical error: Caracter Invalido '${invalidChar}' en la linea ${line}`
      );
    }
  }

  return tokens;
}

// // Ejemplos de uso:
// const code = `
// package main

// import "fmt"

// /* This is a multi-line comment
//    It spans multiple lines */
// // This is single-line comment    

// func main() {
//   // This is a single-line comment
//   var x int = 10
//   if x > 5 {
//     fmt.Println("x is greater than 5")
//   } else {
//     fmt.Println("x is not greater than 5")
//   }
// }
// `;

// const code2 = `
// package main

// import "fmt"

// func main() {
//     fmt.Println("Hello, World!")
// }
// `;

// try {
//   console.log(lex(code));
//   console.log(lex(code2));
// } catch (error) {
//   console.error(error.message);
// }