# 🎯 Como Encontrar "Site Settings" no Netlify

## 🔍 **Problema: "Não consigo achar o caminho Site settings"**

---

## 📍 **PASSO A PASSO PARA ENCONTRAR**

### **1. Primeiro, acesse seu site no Netlify**
1. Vá em [netlify.com](https://netlify.com)
2. Faça login
3. **IMPORTANTE:** Clique no **NOME DO SEU SITE** (não em "Account settings")

### **2. Localizar "Site settings"**
Após clicar no nome do site, você verá uma barra lateral esquerda com:

```
📊 Overview
📈 Analytics  
🔧 Site settings  ← AQUI!
📝 Forms
⚡ Functions
🌐 Domain management
🔒 SSL/TLS
📋 Deploys
```

### **3. Clicar em "Site settings"**
- Clique em **"Site settings"** na barra lateral
- Você verá várias opções:
  - General
  - Build & deploy
  - Environment variables ← **AQUI!**
  - Identity
  - Functions
  - etc.

---

## 🚨 **ERRO COMUM: Clicar no lugar errado**

### **❌ NÃO clique em:**
- "Account settings" (configurações da conta)
- "Team settings" (configurações da equipe)
- "Billing" (cobrança)

### **✅ Clique em:**
- **Nome do seu site** (ex: "infra-app" ou "wonderful-name-12345")

---

## 🖼️ **VISUALIZAÇÃO DA INTERFACE**

```
Netlify Dashboard
├── Seus Sites
│   ├── Site 1
│   ├── Site 2
│   └── infra-app ← CLIQUE AQUI!
│       ├── Overview
│       ├── Analytics
│       ├── Site settings ← AQUI!
│       ├── Forms
│       ├── Functions
│       └── Domain management
```

---

## 🔧 **APÓS ENCONTRAR "Site settings"**

### **1. Clique em "Environment variables"**
- Dentro de "Site settings"
- Clique em **"Environment variables"**
- Clique em **"Add variable"**

### **2. Adicionar variáveis**
**Variável 1:**
- **Key**: `SUPABASE_URL`
- **Value**: `https://seu-projeto.supabase.co`
- Clique em **"Save"**

**Variável 2:**
- **Key**: `SUPABASE_ANON_KEY`
- **Value**: `eyJ...sua-chave-aqui`
- Clique em **"Save"**

---

## 🆘 **SE AINDA NÃO ENCONTRAR**

### **Alternativa 1: URL Direta**
1. Após fazer deploy, você receberá uma URL como:
   `https://wonderful-name-12345.netlify.app`
2. No Netlify, procure por essa URL na lista de sites
3. Clique nela

### **Alternativa 2: Buscar por Nome**
1. No Netlify, procure por:
   - Nome do repositório
   - URL do site
   - Nome que você deu ao projeto

### **Alternativa 3: Verificar se Deploy Funcionou**
1. Se não conseguir encontrar "Site settings"
2. Pode ser que o deploy não funcionou
3. Verifique se o site aparece na lista principal

---

## ✅ **CHECKLIST DE VERIFICAÇÃO**

- [ ] Conseguiu fazer login no Netlify?
- [ ] Vê a lista de sites na tela principal?
- [ ] Clicou no nome do seu site?
- [ ] Vê a barra lateral esquerda?
- [ ] Consegue ver "Site settings"?
- [ ] Consegue ver "Environment variables"?

---

## 📞 **PRECISA DE MAIS AJUDA?**

**Me diga:**
1. **Você consegue ver a lista de sites no Netlify?**
2. **Qual é o nome do seu site na lista?**
3. **Aparece alguma mensagem de erro?**
4. **Consegue acessar o site pelo link fornecido?**

**Vou te ajudar a encontrar!** 🚀


