module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": "off",
    "vue/no-use-v-if-with-v-for": "off",
    "linebreak-style": [2, "unix"],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
  extends: [
    "@nuxtjs",
    "prettier",
    "prettier/vue",
    "plugin:prettier/recommended",
    "plugin:nuxt/recommended",
    "plugin:vue/essential",
  ],
  plugins: ["prettier"],
  globals: {
    ChessBoard: true,
    arrowLine: true,
  },
};
