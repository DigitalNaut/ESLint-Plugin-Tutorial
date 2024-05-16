## How to create an ESLint plugin with Jest and ES Modules

To create ESLint plugins, you'll need to understand how to parse JavaScript code and how ESLint's architecture allows for plugins. The key components you'll need to grasp are:

1. **Abstract Syntax Trees (ASTs)**
2. **Parser APIs**
3. **ESLint Architecture and Plugin System**

Let's break down each of these components with clear explanations and analogies.

### 1. Abstract Syntax Trees (ASTs)

**Concept**: An AST is a tree representation of the structure of source code. It breaks down the code into its syntactic components.

**Analogy**: Imagine you have a book. An AST is like an outline of the book that breaks it down into chapters, sections, paragraphs, sentences, and words. Each node in the tree represents a structural element of the code.

For example, consider the following JavaScript code:

```javascript
const x = 5;
```

The AST for this code might look something like this:

- Program
  - VariableDeclaration
    - VariableDeclarator
      - Identifier (name: "x")
      - Literal (value: 5)

### 2. Parser APIs

**Concept**: A parser API is a tool that takes source code as input and produces an AST. ESLint uses parsers to understand the code it is linting.

**Analogy**: Think of a parser as a translator that converts a story (your code) into an outline (the AST). Just like different translators might have slightly different styles, different parsers might produce slightly different ASTs for the same code.

In the context of ESLint, you often use [`espree`](https://github.com/eslint/espree) (ESLint's default parser), but you can use others like [`babel-eslint`](https://www.npmjs.com/package/@babel/eslint-parser) or [`@typescript-eslint/parser`](https://typescript-eslint.io/packages/parser/) if you are working with code that includes modern JavaScript features or TypeScript.

### 3. ESLint Architecture and Plugin System

**Concept**: ESLint's architecture allows for extendable and customizable linting rules through plugins. Plugins can add new rules, processors, and configurations.

**Analogy**: Think of ESLint as a game console and plugins as game cartridges. The console (ESLint) provides the basic functionality, while the cartridges (plugins) add new games (linting rules and features) that you can play.

An ESLint plugin typically consists of:

- **Rules**: Custom linting rules that define code patterns to flag.
- **Configurations**: Presets of rules that can be easily shared.
- **Processors**: Tools to preprocess code before linting.

### Putting It All Together: Creating an ESLint Plugin

Let's walk through creating a simple ESLint plugin step-by-step.

#### Step 1: Set Up Your Environment

First, make sure you have Node.js and npm installed. Then create a new directory for your plugin and initialize it:

```bash
mkdir eslint-plugin-myplugin
cd eslint-plugin-myplugin
npm init
```

#### Step 2: Install ESLint

```bash
npm install eslint --save-dev
```

#### Step 3: Create the Plugin Structure

Your directory should look something like this:

```
📂 eslint-plugin-myplugin/
├── 📂 lib/
│   └── 📂 rules/
│       └── 📝my-rule.js
├── tests/
│   └── 📂 lib/
│       └── 📂 rules/
│           └── 📝 my-rule.js
├── 📝 index.js
└── 📝 package.json
```

#### Step 4: Define a Rule

Create `lib/rules/my-rule.js`:

```javascript
const plugin = {
  meta: {
    type: "problem",
    docs: {
      description: "disallow the use of 'var'",
      category: "Best Practices",
      recommended: true,
    },
    schema: [],
  },
  create: function (context) {
    return {
      VariableDeclaration: function (node) {
        if (node.kind === "var") {
          context.report(node, "Unexpected var, use let or const instead.");
        }
      },
    };
  },
};

export default plugin;
```

#### Step 5: Configure the Plugin

Create `index.js` to define the plugin configuration:

```javascript
const rules = {
  "my-rule": import("./lib/rules/my-rule.js"),
};

export default rules;
```

#### Step 6: Test Your Plugin

Set up tests in `tests/lib/rules/my-rule.js` using the popular testing framework Jest:

```javascript
import { RuleTester } from "eslint";
import rule from "../../../lib/rules/my-rule.js";

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: "latest",
  },
});

ruleTester.run("my-rule", rule, {
  valid: [{ code: "let x = 5;" }, { code: "const y = 10;" }],

  invalid: [
    {
      code: "var z = 15;",
      errors: [
        {
          message: "Unexpected var, use let or const instead.",
        },
      ],
    },
  ],
});
```

> [!IMPORTANT]
> We need to specify the `parserOptions.ecmaVersion` for the `RuleTester` separately as it does not read the `parserOptions` from the ESLint configuration.
> [See the documentation for more details. &#128279;](https://eslint.org/docs/latest/extend/custom-rule-tutorial#step-6-write-the-test)

Modify your `package.json` file's scripts to run your tests:

```jsonc
{
  // ...
  "scripts": {
    "test": "`node --experimental-vm-modules node_modules/jest/bin/jest.js`",
  },
  // ...
}
```

> [!NOTE]
> The current version of Jest as of this writing (29.7.0) does not support ES modules out of the box. Hence why we need to add the `--experimental-vm-modules` via Node.
> [See the documentation for more details. &#128279;](https://jestjs.io/docs/ecmascript-modules)

Run your tests to ensure your rule works correctly:

```bash
npm test
```

## Try it yourself

You can inspect the code above in a real project by forking this repo and running it locally.

## Disclaimer

The base tutorial was created with the [Universal Primer](https://chatgpt.com/g/g-GbLbctpPz-universal-primer) plugin by Siqi Chen for ChatGPT v4o, but was manually edited for accuracy and specificity for Jest and ES Modules. Additional assistance was provided by Codeium for clarity and autocompletion.

## License

© 2024 DigitalNaut. This work is openly licensed via [CC BY-NC-SA License](https://creativecommons.org/licenses/by-nc-sa/4.0/).
