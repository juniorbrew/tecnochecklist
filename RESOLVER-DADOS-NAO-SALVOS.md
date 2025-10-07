# 🚨 Resolver: Dados Não Salvos no Supabase

## 🎯 **Problema: "Cliente cadastrado não aparece no Supabase"**

---

## 🔍 **ETAPA 1: Verificar Configuração do Supabase**

### **1.1 Verificar se o Script SQL foi Executado**
1. **Acesse o painel do Supabase**
2. **Vá em "SQL Editor"**
3. **Execute este comando para verificar as tabelas:**
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public' 
   ORDER BY table_name;
   ```
4. **Deve mostrar:** `usuarios`, `clientes`, `tecnicos`, `tipos_tarefa`, `tarefas`, `checklists`, `checklist_items`, `checklist_respostas`

### **1.2 Verificar se as Tabelas Têm Dados**
1. **Vá em "Table Editor"**
2. **Selecione a tabela `clientes`**
3. **Verifique se há dados**
4. **Se estiver vazia, o problema é na configuração**

---

## 🔧 **ETAPA 2: Verificar Credenciais**

### **2.1 Testar Conexão com Supabase**
1. **Acesse:** `https://seu-site.netlify.app/.netlify/functions/getData?tabela=clientes`
2. **Deve retornar um JSON**
3. **Se retornar erro, as credenciais estão incorretas**

### **2.2 Verificar Credenciais no Código**
1. **Abra o arquivo `config.js`**
2. **Verifique se as credenciais estão corretas:**
   ```javascript
   const SUPABASE_CONFIG = {
       url: 'https://SEU-PROJETO.supabase.co', // Sua URL real
       anonKey: 'SUA-CHAVE-ANONIMA-AQUI' // Sua chave real
   };
   ```

### **2.3 Verificar Credenciais nas Funções**
1. **Abra cada arquivo em `netlify/functions/`**
2. **Verifique se as credenciais estão corretas:**
   ```javascript
   const supabaseUrl = 'https://SEU-PROJETO.supabase.co';
   const supabaseKey = 'SUA-CHAVE-ANONIMA-AQUI';
   ```

---

## 🛠️ **ETAPA 3: Soluções por Tipo de Problema**

### **Problema 1: "Credenciais Incorretas"**
**Solução:**
1. **Obter credenciais corretas do Supabase:**
   - Vá em **"Settings"** → **"API"**
   - Copie a **URL** e **anon key**
2. **Atualizar todos os arquivos:**
   - `config.js`
   - `netlify/functions/saveData.js`
   - `netlify/functions/getData.js`
   - `netlify/functions/updateData.js`
   - `netlify/functions/deleteData.js`
3. **Fazer commit e push:**
   ```bash
   git add .
   git commit -m "Corrigir credenciais do Supabase"
   git push
   ```

### **Problema 2: "Script SQL Não Executado"**
**Solução:**
1. **Executar script SQL no Supabase:**
   - Vá em **"SQL Editor"** → **"New query"**
   - Cole o script do arquivo `SETUP-SUPABASE-COMPLETO.md`
   - Clique em **"Run"**
2. **Verificar se as tabelas foram criadas**

### **Problema 3: "Políticas RLS Incorretas"**
**Solução:**
1. **Verificar políticas no Supabase:**
   - Vá em **"Authentication"** → **"Policies"**
   - Verifique se as políticas foram criadas
2. **Recriar políticas se necessário:**
   ```sql
   CREATE POLICY "Permitir acesso público" ON clientes FOR ALL USING (true);
   ```

---

## 🧪 **ETAPA 4: Testar Integração**

### **4.1 Teste de Conexão**
1. **Acesse:** `https://seu-site.netlify.app/.netlify/functions/getData?tabela=clientes`
2. **Deve retornar JSON (mesmo que vazio)**
3. **Se retornar erro, verificar credenciais**

### **4.2 Teste de Criação**
1. **Acesse:** `https://seu-site.netlify.app/teste-integracao.html`
2. **Execute o teste de criação**
3. **Verifique se o dado aparece no Supabase**

### **4.3 Teste Manual**
1. **No site, tente criar um cliente**
2. **Volte ao Supabase**
3. **Verifique se o dado foi salvo**

---

## ✅ **ETAPA 5: Verificar se Funcionou**

### **5.1 Verificar site:**
- [ ] Site carrega corretamente?
- [ ] Funções serverless funcionam?
- [ ] API responde corretamente?

### **5.2 Verificar Supabase:**
- [ ] Tabelas foram criadas?
- [ ] Políticas RLS estão corretas?
- [ ] Dados são salvos?

### **5.3 Verificar integração:**
- [ ] Dados aparecem no Supabase?
- [ ] Sincronização funciona?
- [ ] PWA funciona?

---

## 📞 **PRECISA DE MAIS AJUDA?**

**Me diga:**
1. **Consegue acessar o painel do Supabase?**
2. **Consegue ver as tabelas criadas?**
3. **Qual erro aparece nas funções?**
4. **Consegue executar o script SQL?**

**Vou te ajudar a resolver!** 🚀


