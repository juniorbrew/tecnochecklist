# 🚀 **CONFIGURAR NETLIFY COM REPOSITÓRIO**

## 📋 **Passo a passo:**

### **1. Acessar Site Settings:**
1. No painel do Netlify, clique no seu site
2. Vá em **"Site settings"** (ícone de engrenagem)
3. Clique em **"Build & deploy"**

### **2. Link Repository:**
1. Em **"Continuous Deployment"**, clique em **"Link repository"**
2. Selecione **"GitHub"**
3. Escolha o repositório **`juniorbrew/tecnochecklist`**
4. Clique em **"Save"**

### **3. Configurar Build Settings:**
- **Build command**: `echo 'Build completed'`
- **Publish directory**: `.` (ponto)
- **Functions directory**: `netlify/functions`

### **4. Fazer Deploy:**
1. Vá em **"Deploys"**
2. Clique em **"Trigger deploy"** → **"Deploy site"**

### **5. Verificar Functions:**
1. Vá em **"Functions"** (barra lateral)
2. Deve aparecer 4 funções:
   - `deleteData`
   - `getData`
   - `saveData`
   - `updateData`

## 🎯 **URLs para testar:**
```
https://tecnochecklist.netlify.app/.netlify/functions/getData?tabela=clientes
https://tecnochecklist.netlify.app/.netlify/functions/getData?tabela=tecnicos
```

## ✅ **Se funcionar:**
- As funções retornam JSON
- O site carrega sem erros
- Os dados aparecem na aplicação

## ❌ **Se não funcionar:**
- Verifique se o repositório está correto
- Confirme se as funções aparecem no dashboard
- Teste as URLs diretamente no navegador
