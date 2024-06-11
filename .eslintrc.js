module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

    // temporary rules
    "no-prototype-builtins": "off",
    "vue/multi-word-component-names": "off",
    "no-dupe-else-if": "off",
    "vue/no-mutating-props": "off",
    "vue/valid-v-slot": "off",
  },
};
