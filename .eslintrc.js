// eslint-disable-next-line no-undef
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:vue/vue3-recommended",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json",
        "tsconfigRootDir": "./",
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "import",
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
        'vue/no-deprecated-slot-attribute': 'off',
    },
    "settings":{
        "import/resolver":{
            "typescript":{
                "alwaysTryTypes": true
            }
        }
    }
}
