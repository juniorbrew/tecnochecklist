# 🧪 Testar Conexão com Supabase

## 🎯 **Verificar se está conectado com o banco do Supabase**

---

## 🔍 **ETAPA 1: Testar Conexão Direta**

### **1.1 Testar Função Serverless**
1. **Acesse:** `https://seu-site.netlify.app/.netlify/functions/getData?tabela=clientes`
2. **Deve retornar um JSON, não HTML**
3. **Se retornar HTML, a função não está funcionando**

### **1.2 Verificar Resposta**
- **Se retornar JSON vazio:** `{"success": true, "data": [], "count": 0}` - Conexão OK, mas sem dados
- **Se retornar erro:** `{"error": "..."}` - Problema na conexão
- **Se retornar HTML:** Função não está funcionando

---

## 🔧 **ETAPA 2: Verificar Credenciais**

### **2.1 Verificar no Supabase**
1. **Acesse o painel do Supabase**
2. **Vá em "Settings" → "API"**
3. **Copie a URL e anon key**
4. **Verifique se estão corretas no código**

### **2.2 Verificar no Código**
1. **Abra o arquivo `config.js`**
2. **Verifique se as credenciais estão corretas:**
   ```javascript
   const SUPABASE_CONFIG = {
       url: 'https://SEU-PROJETO.supabase.co', // Sua URL real
       anonKey: 'SUA-CHAVE-ANONIMA-AQUI' // Sua chave real
   };
   ```

### **2.3 Verificar nas Funções**
1. **Abra cada arquivo em `netlify/functions/`**
2. **Verifique se as credenciais estão corretas:**
   ```javascript
   const supabaseUrl = 'https://SEU-PROJETO.supabase.co';
   const supabaseKey = 'SUA-CHAVE-ANONIMA-AQUI';
   ```

---

## 🧪 **ETAPA 3: Teste Completo**

### **3.1 Teste de Conexão**
1. **Acesse:** `https://seu-site.netlify.app/teste-integracao.html`
2. **Execute o teste de conexão**
3. **Verifique se passou**

### **3.2 Teste de Criação**
1. **Execute o teste de criação de dados**
2. **Verifique se o dado aparece no Supabase**
3. **Volte ao painel do Supabase**
4. **Vá em "Table Editor" → "clientes"**
5. **Verifique se o dado foi salvo**

### **3.3 Teste de Busca**
1. **Execute o teste de busca de dados**
2. **Verifique se retorna os dados corretos**
3. **Compare com o que está no Supabase**

---

## 🔍 **ETAPA 4: Verificar no Supabase**

### **4.1 Verificar Tabelas**
1. **No painel do Supabase, vá em "Table Editor"**
2. **Verifique se as tabelas existem:**
   - `usuarios`
   - `clientes`
   - `tecnicos`
   - `tipos_tarefa`
   - `tarefas`
   - `checklists`
   - `checklist_items`
   - `checklist_respostas`

### **4.2 Verificar Dados**
1. **Selecione uma tabela (ex: `clientes`)**
2. **Verifique se há dados**
3. **Se estiver vazia, o problema é na configuração**

### **4.3 Verificar Logs**
1. **No Supabase, vá em "Logs" → "API"**
2. **Verifique se há requisições sendo feitas**
3. **Se não houver, o problema é na conexão**

---

## 🚨 **SE NÃO ESTIVER CONECTADO**

### **Problema 1: "Credenciais Incorretas"**
**Solução:**
1. **Obter credenciais corretas do Supabase**
2. **Atualizar todos os arquivos**
3. **Fazer commit e push**
4. **Tentar novo deploy**

### **Problema 2: "Script SQL Não Executado"**
**Solução:**
1. **Executar script SQL no Supabase**
2. **Verificar se as tabelas foram criadas**
3. **Verificar se as políticas RLS estão corretas**

### **Problema 3: "Funções Não Funcionam"**
**Solução:**
1. **Verificar se as funções aparecem no Netlify**
2. **Verificar se os logs mostram erros**
3. **Tentar novo deploy**

---

## ✅ **ETAPA 5: Verificar se Funcionou**

### **5.1 Verificar conexão:**
- [ ] Função serverless retorna JSON?
- [ ] Dados são salvos no Supabase?
- [ ] Dados aparecem no painel do Supabase?

### **5.2 Verificar integração:**
- [ ] Teste de conexão passou?
- [ ] Teste de criação passou?
- [ ] Teste de busca passou?

### **5.3 Verificar sincronização:**
- [ ] Dados criados no site aparecem no Supabase?
- [ ] Dados criados no Supabase aparecem no site?
- [ ] Sincronização funciona em tempo real?

---

## 📞 **PRECISA DE MAIS AJUDA?**

**Me diga:**
1. **O que retorna quando acessa a função serverless?**
2. **Consegue ver as tabelas no Supabase?**
3. **Consegue ver dados nas tabelas?**
4. **Qual erro aparece (se houver)?**

**Vou te ajudar a resolver!** 🚀


