# 🌐 Netlify - Guia Simplificado

## 🎯 **Vamos resolver isso passo a passo!**

---

## 📋 **ETAPA 1: Preparar o Projeto (2 minutos)**

### **1.1 Verificar Arquivos**
Confirme se estes arquivos existem na raiz do seu projeto:
- ✅ `netlify.toml`
- ✅ `netlify/functions/` (pasta)
- ✅ `package.json`
- ✅ `index.html`

### **1.2 Fazer Commit (se necessário)**
```bash
git add .
git commit -m "Preparar para deploy no Netlify"
git push
```

---

## 🚀 **ETAPA 2: Deploy no Netlify (5 minutos)**

### **2.1 Acessar Netlify**
1. Abra [netlify.com](https://netlify.com)
2. Clique em **"Sign up"** ou **"Log in"**
3. Escolha **"Continue with GitHub"**

### **2.2 Conectar Repositório**
1. Clique em **"New site from Git"**
2. Escolha **"GitHub"**
3. Procure por `infra-app` na lista
4. Se não aparecer, clique em **"Configure the Netlify app on GitHub"**
5. Autorize o Netlify a acessar seus repositórios

### **2.3 Configurar Deploy**
1. **Repository**: `infra-app`
2. **Branch**: `main`
3. **Build command**: Deixe vazio
4. **Publish directory**: `.` (ponto)
5. Clique em **"Deploy site"**

⏱️ **Aguarde 2-3 minutos** para o deploy completar.

---

## ⚙️ **ETAPA 3: Configurar Variáveis (3 minutos)**

### **3.1 Acessar Configurações**
1. Após o deploy, clique no nome do seu site
2. Vá em **"Site settings"**
3. Clique em **"Environment variables"**

### **3.2 Adicionar Variáveis**
**Variável 1:**
- Clique em **"Add variable"**
- **Key**: `SUPABASE_URL`
- **Value**: `https://seu-projeto.supabase.co` (cole sua URL)
- Clique em **"Save"**

**Variável 2:**
- Clique em **"Add variable"**
- **Key**: `SUPABASE_ANON_KEY`
- **Value**: `eyJ...sua-chave-aqui` (cole sua chave)
- Clique em **"Save"**

---

## 🧪 **ETAPA 4: Testar (2 minutos)**

### **4.1 Verificar Site**
1. Acesse a URL do seu site (ex: `https://nome-aleatorio.netlify.app`)
2. Deve mostrar seu site funcionando

### **4.2 Testar Funções**
1. Acesse: `https://seu-site.netlify.app/.netlify/functions/getData?tabela=usuarios`
2. Deve retornar um JSON

### **4.3 Teste Completo**
1. Acesse: `https://seu-site.netlify.app/teste-integracao.html`
2. Execute todos os testes
3. Verifique se passaram

---

## 🚨 **PROBLEMAS COMUNS**

### **❌ "Não vejo meu repositório"**
**Solução:**
1. Vá no GitHub
2. Verifique se o repositório está público
3. No Netlify, clique em "Refresh repositories"

### **❌ "Deploy falha"**
**Solução:**
1. Verifique se `netlify.toml` está na raiz
2. Verifique se a pasta `netlify/functions/` existe
3. Faça novo commit e push

### **❌ "Não consigo adicionar variáveis"**
**Solução:**
1. Aguarde o deploy completar
2. Vá em "Site settings" (não "Account settings")
3. Clique em "Environment variables"

---

## 🆘 **ALTERNATIVA: Deploy Manual**

Se o deploy automático não funcionar:

### **Opção 1: Drag and Drop**
1. **Compactar projeto:**
   - Selecione todos os arquivos
   - Crie um arquivo ZIP

2. **Upload manual:**
   - Vá em [netlify.com](https://netlify.com)
   - Arraste o ZIP para a área de deploy
   - Aguarde processamento

### **Opção 2: Netlify CLI**
```bash
# Instalar CLI
npm install -g netlify-cli

# Fazer login
netlify login

# Deploy
netlify deploy --prod
```

---

## ✅ **CHECKLIST FINAL**

- [ ] Conseguiu acessar netlify.com?
- [ ] Conseguiu fazer login com GitHub?
- [ ] Conseguiu conectar o repositório?
- [ ] Deploy foi bem-sucedido?
- [ ] Site está acessível?
- [ ] Variáveis de ambiente foram configuradas?
- [ ] Teste de integração passou?

---

## 📞 **PRECISA DE AJUDA?**

**Me diga exatamente onde está travando:**

1. **Qual erro aparece?**
2. **Em qual passo específico?**
3. **Qual mensagem de erro?**

**Vou te ajudar a resolver!** 🚀


