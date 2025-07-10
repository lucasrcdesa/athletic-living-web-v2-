# 🚀 Instruções de Deploy

## ✅ Frontend (Vercel)

### 1. Configuração do Vercel
- O arquivo `vercel.json` já está configurado
- O build será feito automaticamente
- As rotas estão configuradas para SPA (Single Page Application)

### 2. Variáveis de Ambiente (se necessário)
```bash
REACT_APP_API_URL=https://athleticlivingback-production-38d9.up.railway.app
NODE_ENV=production
```

### 3. Deploy
```bash
# Instalar Vercel CLI (se não tiver)
npm i -g vercel

# Fazer deploy
vercel --prod
```

## ✅ Backend (Railway)

### 1. Configuração de CORS
O backend já está configurado para aceitar requisições de:
- `http://localhost:3000` (desenvolvimento)
- `https://seu-dominio.vercel.app` (produção)

### 2. Adicionar Domínio do Vercel
No arquivo `application.properties` do backend, adicione:

```properties
# CORS para produção
cors.allowed-origins=http://localhost:3000,https://seu-dominio.vercel.app
```

### 3. Verificar Rotas Públicas
Certifique-se de que `/CadastrarAlunos` está nas rotas públicas do `SecurityFilter.java`:

```java
private boolean isPublicRoute(String path) {
    return path.startsWith("/aluno/") ||
           path.startsWith("/colaborador/") ||
           // ... outras rotas ...
           path.startsWith("/CadastrarAlunos"); // ← IMPORTANTE
}
```

## 🔧 Testes

### 1. Teste Local
```bash
npm start
# Acesse http://localhost:3000/test
```

### 2. Teste em Produção
- Deploy no Vercel
- Acesse `https://seu-dominio.vercel.app/test`
- Verifique se os alunos carregam

## 🐛 Troubleshooting

### Se não funcionar em produção:

1. **Verificar CORS no Backend**
   - Adicione o domínio do Vercel nas origens permitidas
   - Reinicie o backend

2. **Verificar Logs**
   - Console do navegador (F12)
   - Logs do Railway
   - Logs do Vercel

3. **Testar Endpoint Direto**
   - Acesse `https://athleticlivingback-production-38d9.up.railway.app/CadastrarAlunos`
   - Deve retornar JSON com os alunos

## 📝 Checklist

- [ ] Backend no Railway funcionando
- [ ] CORS configurado para domínio do Vercel
- [ ] Rotas públicas incluem `/CadastrarAlunos`
- [ ] Frontend buildando sem erros
- [ ] Teste local funcionando
- [ ] Deploy no Vercel
- [ ] Teste em produção funcionando 