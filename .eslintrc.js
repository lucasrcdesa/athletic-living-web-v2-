module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    // Desabilitar warnings que podem impedir o build
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    // Permitir que o build continue mesmo com warnings
    'no-console': 'off',
    'no-debugger': 'warn'
  }
}; 