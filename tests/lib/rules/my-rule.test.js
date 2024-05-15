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
