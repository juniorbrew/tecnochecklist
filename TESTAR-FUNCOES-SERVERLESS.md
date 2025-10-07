# 🧪 Testar Funções Serverless

## 🎯 **Agora que você substituiu o netlify.toml, vamos testar se as funções estão funcionando!**

---

## 🔍 **ETAPA 1: Verificar se as Funções Aparecem**

### **1.1 No Netlify**
1. **Vá no Netlify, em "Functions" ou "Funções"**
2. **Deve mostrar as funções:**
   - `saveData`
   - `getData`
   - `updateData`
   - `deleteData`
3. **Se não aparecer nenhuma função, o problema é na configuração**

### **1.2 Testar Função Individual**
1. **Acesse:** `https://seu-site.netlify.app/.netlify/functions/getData?tabela=clientes`
2. **Deve retornar JSON, não HTML**
3. **Se retornar HTML, a função não está funcionando**

---

## 🔧 **ETAPA 2: Soluções se as Funções Não Funcionarem**

### **Solução 1: Verificar Deploy**
1. **No Netlify, vá em "Deploys"**
2. **Verifique se o último deploy foi bem-sucedido**
3. **Se falhou, tente fazer novo deploy**

### **Solução 2: Verificar Logs**
1. **No Netlify, vá em "Functions"**
2. **Clique em uma função**
3. **Clique em "View logs"**
4. **Deve mostrar os logs da função**

### **Solução 3: Verificar Configuração**
1. **No Netlify, vá em "Site settings"**
2. **Vá em "Build & deploy"**
3. **Verifique se as configurações estão corretas:**
   - **Build command:** `cd netlify/functions && npm install && cd ../.. && echo 'Build completed'`
   - **Publish directory:** `.` (ponto)
   - **Node version:** 18

---

## 🧪 **ETAPA 3: Testar Integração**

### **3.1 Testar Site**
1. **Acesse seu site no Netlify**
2. **Tente criar um cliente**
3. **Verifique se aparece no Supabase**

### **3.2 Testar Função Diretamente**
1. **Acesse:** `https://seu-site.netlify.app/.netlify/functions/getData?tabela=clientes`
2. **Deve retornar JSON, não HTML**

### **3.3 Verificar Supabase**
1. **Acesse o painel do Supabase**
2. **Vá em "Table Editor"**
3. **Verifique se a tabela `clientes` existe**
4. **Verifique se os dados aparecem**

---

## ✅ **ETAPA 4: Verificar se Funcionou**

### **4.1 Verificar funções:**
- [ ] Funções aparecem no Netlify?
- [ ] Funções retornam JSON?
- [ ] Dados são salvos no Supabase?

### **4.2 Verificar integração:**
- [ ] Dados aparecem no painel do Supabase?
- [ ] Sincronização funciona?
- [ ] PWA funciona?

### **4.3 Verificar site:**
- [ ] Site carrega corretamente?
- [ ] Funções serverless funcionam?
- [ ] API responde corretamente?

---

## 📞 **PRECISA DE MAIS AJUDA?**

**Me diga:**
1. **Consegue ver as funções no Netlify?**
2. **A função serverless retorna JSON?**
3. **Consegue criar um cliente no site?**
4. **O cliente aparece no Supabase?**

**Vou te ajudar a resolver!** 🚀


