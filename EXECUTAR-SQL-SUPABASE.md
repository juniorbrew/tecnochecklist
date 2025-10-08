# 🗄️ **EXECUTAR SQL NO SUPABASE - PASSO A PASSO**

## 🎯 **Agora vamos criar as tabelas no banco!**

---

## **PASSO 1: Acessar Supabase**

1. **Vá em** [supabase.com](https://supabase.com)
2. **Faça login** na sua conta
3. **Selecione seu projeto** (aquele com a URL `https://wznupigcxxecuahihqow.supabase.co`)

---

## **PASSO 2: Acessar SQL Editor**

1. **No painel do Supabase**, procure na barra lateral esquerda
2. **Clique em "SQL Editor"** 
3. **Clique em "New query"** (botão azul)

---

## **PASSO 3: Copiar Script SQL**

1. **Abra o arquivo** `SCRIPT-SQL-SUPABASE.sql` no seu projeto
2. **Selecione TODO o conteúdo** (Ctrl+A)
3. **Copie** (Ctrl+C)

---

## **PASSO 4: Colar e Executar**

1. **No SQL Editor do Supabase**, cole o script (Ctrl+V)
2. **Clique em "Run"** (botão ▶️ no canto inferior direito)
3. **Aguarde alguns segundos**
4. **Deve aparecer:** "Success. No rows returned" ✅

---

## **PASSO 5: Verificar Tabelas Criadas**

1. **No painel do Supabase**, procure na barra lateral
2. **Clique em "Table Editor"**
3. **Deve aparecer 5 tabelas:**
   - ✅ `clientes`
   - ✅ `tecnicos`
   - ✅ `tipos_tarefa`
   - ✅ `tarefas`
   - ✅ `usuarios`

---

## **PASSO 6: Verificar Dados Iniciais**

1. **Clique na tabela "usuarios"**
2. **Deve aparecer 3 usuários:**
   - admin
   - operador
   - visualizador
3. **Se aparecer, tudo funcionou!** ✅

---

## **PASSO 7: Testar Conexão**

### **Teste no navegador:**

**Teste 1 - Usuários:**
```
https://tecnochecklist.vercel.app/api/getData?tabela=usuarios
```
**Deve retornar:** JSON com 3 usuários ✅

**Teste 2 - Clientes:**
```
https://tecnochecklist.vercel.app/api/getData?tabela=clientes
```
**Deve retornar:** `[]` (vazio - sem dados) ✅

---

## **PASSO 8: Testar no Site**

1. **Acesse:** [https://tecnochecklist.vercel.app](https://tecnochecklist.vercel.app)
2. **Faça login:** `admin` / `123`
3. **Vá em "Clientes"**
4. **Cadastre um cliente** de teste
5. **Verifique se aparece na lista**

---

## **PASSO 9: Verificar no Supabase**

1. **Volte ao Supabase**
2. **Vá em "Table Editor"** → **"clientes"**
3. **Atualize a página** (F5)
4. **Deve aparecer o cliente cadastrado!** ✅

---

## ✅ **CHECKLIST FINAL:**

- [ ] Conseguiu acessar o Supabase?
- [ ] Encontrou o "SQL Editor"?
- [ ] Executou o script SQL?
- [ ] 5 tabelas foram criadas?
- [ ] 3 usuários foram inseridos?
- [ ] Funções retornam JSON?
- [ ] Consegue cadastrar dados?
- [ ] Dados aparecem no Supabase?

---

## 🎯 **RESULTADO FINAL:**

Após completar todos os passos:
- ✅ Site hospedado no Vercel
- ✅ Banco PostgreSQL no Supabase
- ✅ Funções serverless funcionando
- ✅ Sincronização em tempo real
- ✅ PWA funcionando
- ✅ Acesso global via internet

**Projeto 100% funcional!** 🎉

---

## 📞 **Me diga:**
1. **Conseguiu executar o script SQL?**
2. **As tabelas foram criadas?**
3. **As funções retornam JSON agora?**
4. **Consegue cadastrar dados?**
