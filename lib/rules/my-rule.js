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
