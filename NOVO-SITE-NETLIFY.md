# 🚀 **CRIAR NOVO SITE NO NETLIFY**

## 📋 **Passo a passo:**

### **1. Acessar Netlify:**
1. Vá em [netlify.com](https://netlify.com)
2. Faça login na sua conta
3. Clique em **"New site from Git"** (ou "Import from Git")

### **2. Conectar GitHub:**
1. Clique em **"GitHub"**
2. Autorize o Netlify a acessar seus repositórios
3. Procure por **"tecnochecklist"**
4. Selecione o repositório **`juniorbrew/tecnochecklist`**

### **3. Configurar Deploy Settings:**
- **Branch to deploy**: `main`
- **Build command**: `echo 'Build completed'`
- **Publish directory**: `.` (ponto)
- **Functions directory**: `netlify/functions`

### **4. Deploy:**
1. Clique em **"Deploy site"**
2. Aguarde o build completar
3. Anote a URL do site (ex: `https://tecnochecklist.netlify.app`)

### **5. Verificar Functions:**
1. Vá em **"Functions"** (barra lateral)
2. Deve aparecer 4 funções:
   - `deleteData`
   - `getData` 
   - `saveData`
   - `updateData`

## 🎯 **URLs para testar:**
```
https://SEU-SITE.netlify.app/.netlify/functions/getData?tabela=clientes
https://SEU-SITE.netlify.app/.netlify/functions/getData?tabela=tecnicos
```

## ✅ **Se funcionar:**
- As funções retornam JSON
- O site carrega sem erros
- Os dados aparecem na aplicação

## ❌ **Se não funcionar:**
- Verifique se o repositório está correto
- Confirme se as funções aparecem no dashboard
- Teste as URLs diretamente no navegador
