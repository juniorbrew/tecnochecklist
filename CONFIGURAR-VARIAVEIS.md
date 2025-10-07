# ⚙️ Configurar Variáveis de Ambiente - Próximo Passo

## 🎯 **Agora que o deploy funcionou!**

---

## 📋 **ETAPA 1: Acessar Site Settings**

### **1.1 Encontrar seu site**
1. No Netlify, você deve ver seu site na lista
2. Clique no **nome do seu site**
3. Agora você verá a barra lateral com:
   - Overview
   - Analytics
   - **Site settings** ← **AQUI!**
   - Forms
   - Functions

### **1.2 Acessar configurações**
1. Clique em **"Site settings"**
2. Na barra lateral, clique em **"Environment variables"**
3. Clique em **"Add variable"**

---

## 🔑 **ETAPA 2: Adicionar Variáveis do Supabase**

### **2.1 Variável 1: SUPABASE_URL**
1. **Key:** `SUPABASE_URL`
2. **Value:** `https://seu-projeto.supabase.co` (cole sua URL do Supabase)
3. Clique em **"Save"**

### **2.2 Variável 2: SUPABASE_ANON_KEY**
1. **Key:** `SUPABASE_ANON_KEY`
2. **Value:** `eyJ...sua-chave-aqui` (cole sua chave anônima do Supabase)
3. Clique em **"Save"**

### **2.3 Verificar variáveis**
- Você deve ver ambas as variáveis na lista
- Certifique-se de que estão corretas

---

## 🧪 **ETAPA 3: Testar Integração**

### **3.1 Testar Site**
1. Acesse a URL do seu site
2. Deve mostrar seu site funcionando

### **3.2 Testar Funções Serverless**
1. Acesse: `https://seu-site.netlify.app/.netlify/functions/getData?tabela=usuarios`
2. Deve retornar um JSON (mesmo que vazio)

### **3.3 Teste Completo**
1. Acesse: `https://seu-site.netlify.app/teste-integracao.html`
2. Execute todos os testes
3. Verifique se passaram

---

## ✅ **ETAPA 4: Verificar se Funcionou**

### **4.1 Verificar site:**
- [ ] Site aparece na lista do Netlify?
- [ ] URL do site funciona?
- [ ] Site carrega corretamente?

### **4.2 Verificar configurações:**
- [ ] Consegue ver "Site settings"?
- [ ] Consegue ver "Environment variables"?
- [ ] Pode adicionar variáveis?

### **4.3 Testar funcionalidades:**
- [ ] Funções serverless funcionam?
- [ ] API responde corretamente?
- [ ] Dados são salvos no banco?

---

## 🚨 **SE ALGO DER ERRADO**

### **Problema 1: "Não consigo ver Site settings"**
**Solução:**
1. Verificar se o deploy foi bem-sucedido
2. Aguardar alguns minutos
3. Tentar atualizar a página

### **Problema 2: "Não consigo adicionar variáveis"**
**Solução:**
1. Verificar se está na seção correta
2. Tentar fazer logout e login novamente
3. Verificar se o site está ativo

### **Problema 3: "Funções não funcionam"**
**Solução:**
1. Verificar se as variáveis estão corretas
2. Aguardar alguns minutos para propagação
3. Tentar novo deploy

---

## 📞 **PRECISA DE AJUDA?**

**Me diga:**
1. **Consegue ver "Site settings"?**
2. **Consegue ver "Environment variables"?**
3. **Consegue adicionar as variáveis?**
4. **Qual erro aparece (se houver)?**

**Vou te ajudar a resolver!** 🚀


