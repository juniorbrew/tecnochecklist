# 🚨 Resolver Erro de Dependências

## 🎯 **Problema: "A Netlify Function is using '@supabase/supabase-js' but that dependency has not been installed yet"**

**Vamos resolver isso de 3 formas diferentes!**

---

## 🔧 **SOLUÇÃO 1: Adicionar Dependências ao package.json Principal**

### **1.1 Criar package.json na Raiz**
1. **No GitHub, clique em "Add file" → "Create new file"**
2. **Digite:** `package.json`
3. **Cole este código:**
```json
{
  "name": "infra-app",
  "version": "1.0.0",
  "description": "Tecno-Checklist - Aplicação de checklist técnico",
  "main": "index.html",
  "dependencies": {
    "@supabase/supabase-js": "^2.38.0"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "scripts": {
    "start": "echo 'Use Live Server no VS Code para desenvolvimento web'",
    "dev": "echo 'Use Live Server no VS Code para desenvolvimento web'",
    "serve": "echo 'Instale Node.js e execute: node servidor.js'"
  },
  "devDependencies": {
    "electron": "^28.1.0"
  },
  "keywords": [
    "checklist",
    "tecnico",
    "web",
    "app"
  ],
  "author": "Tecno-Checklist Team"
}
```
4. **Clique em "Commit new file"**

### **1.2 Remover package.json das Funções**
1. **No GitHub, vá em `netlify/functions/package.json`**
2. **Clique em "Delete file"**
3. **Digite a mensagem:** "Remover package.json das funções"
4. **Clique em "Commit changes"**

---

## 🔧 **SOLUÇÃO 2: Adicionar Plugin ao netlify.toml**

### **2.1 Atualizar netlify.toml**
1. **No GitHub, vá em `netlify.toml`**
2. **Clique em "Edit file"**
3. **Adicione esta seção:**
```toml
[build]
  publish = "."
  command = "echo 'Build completed'"

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-functions-install-core"

[functions]
  directory = "netlify/functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/.netlify/functions/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Headers = "Content-Type, Authorization"
    Access-Control-Allow-Methods = "GET, POST, PUT, DELETE, OPTIONS"
```
4. **Clique em "Commit changes"**

---

## 🔧 **SOLUÇÃO 3: Atualizar Build Command**

### **3.1 Atualizar netlify.toml**
1. **No GitHub, vá em `netlify.toml`**
2. **Clique em "Edit file"**
3. **Altere a seção build:**
```toml
[build]
  publish = "."
  command = "cd netlify/functions && npm install && cd ../.. && echo 'Build completed'"

[build.environment]
  NODE_VERSION = "18"

[functions]
  directory = "netlify/functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/.netlify/functions/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Headers = "Content-Type, Authorization"
    Access-Control-Allow-Methods = "GET, POST, PUT, DELETE, OPTIONS"
```
4. **Clique em "Commit changes"**

---

## 🚀 **RECOMENDAÇÃO: Usar Solução 1 (Mais Simples)**

### **Passo 1: Criar package.json na Raiz**
1. **Criar arquivo `package.json` na raiz do projeto**
2. **Adicionar dependência `@supabase/supabase-js`**
3. **Fazer commit**

### **Passo 2: Remover package.json das Funções**
1. **Deletar arquivo `netlify/functions/package.json`**
2. **Fazer commit**

### **Passo 3: Aguardar Deploy**
1. **Aguarde o deploy automático**
2. **Verificar se as funções aparecem**

---

## 🧪 **TESTE: Verificar se Funcionou**

### **1. Verificar Deploy**
- [ ] Deploy foi bem-sucedido?
- [ ] Funções aparecem no Netlify?
- [ ] Funções retornam JSON?

### **2. Verificar Função**
1. **Acesse:** `https://seu-site.netlify.app/.netlify/functions/getData?tabela=clientes`
2. **Deve retornar JSON, não HTML**

### **3. Verificar Integração**
- [ ] Dados são salvos no Supabase?
- [ ] Dados aparecem no painel do Supabase?
- [ ] Sincronização funciona?

---

## 📞 **PRECISA DE MAIS AJUDA?**

**Me diga:**
1. **Qual solução você escolheu?**
2. **Consegue criar o package.json na raiz?**
3. **Consegue remover o package.json das funções?**
4. **Qual erro aparece (se houver)?**

**Vou te ajudar a resolver!** 🚀


