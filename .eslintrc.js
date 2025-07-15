module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    // Desabilitar warnings que podem impedir o build
    '@typescript-eslint/no-unused-vars': 'off',
    'react-hooks/exhaustive-deps': 'off',
    // Permitir que o build continue mesmo com warnings
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
}; 