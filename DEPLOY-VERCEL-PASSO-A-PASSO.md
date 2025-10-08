# 🚀 **DEPLOY NO VERCEL - PASSO A PASSO**

## 📋 **Vantagens do Vercel:**
- ✅ Gratuito sem limites de deploy
- ✅ Funções serverless incluídas
- ✅ Deploy automático do GitHub
- ✅ Mais estável que Netlify

---

## **PASSO 1: Acessar Vercel**

1. Vá em [vercel.com](https://vercel.com)
2. Clique em **"Sign Up"** ou **"Log in"**
3. Escolha **"Continue with GitHub"**
4. Autorize o Vercel a acessar seus repositórios

---

## **PASSO 2: Criar Novo Projeto**

1. Clique em **"New Project"** ou **"Add New..."** → **"Project"**
2. Procure por **"tecnochecklist"** na lista
3. Clique em **"Import"** ao lado do repositório

---

## **PASSO 3: Configurar Deploy**

1. **Project Name**: `tecnochecklist` (ou deixe como está)
2. **Framework Preset**: `Other`
3. **Root Directory**: `./` (raiz)
4. **Build Command**: Deixe vazio
5. **Output Directory**: `.` (ponto)
6. **Install Command**: `npm install`

---

## **PASSO 4: Deploy**

1. Clique em **"Deploy"**
2. Aguarde 2-3 minutos
3. Quando terminar, aparecerá: **"Congratulations!"**
4. Anote a URL: `https://tecnochecklist.vercel.app`

---

## **PASSO 5: Testar Funções**

### **5.1 Testar no Navegador:**

**Teste 1 - Clientes:**
```
https://tecnochecklist.vercel.app/api/getData?tabela=clientes
```

**Teste 2 - Usuários:**
```
https://tecnochecklist.vercel.app/api/getData?tabela=usuarios
```

### **5.2 Resultado Esperado:**
- ✅ **Retorna JSON** = Funções funcionando
- ❌ **Erro 500** = Problema na conexão
- ❌ **404** = Função não encontrada

---

## **PASSO 6: Testar Site**

1. Acesse: `https://tecnochecklist.vercel.app`
2. Faça login com: `admin` / `123`
3. Vá em **"Clientes"**
4. **Cadastre um cliente** de teste
5. **Verifique se salva** no Supabase

---

## **PASSO 7: Criar Tabelas no Supabase**

1. Vá em [supabase.com](https://supabase.com)
2. Acesse seu projeto
3. Vá em **"SQL Editor"** → **"New query"**
4. Cole o script do arquivo `CRIAR-BANCO-SUPABASE-SIMPLES.md`
5. Clique em **"Run"**
6. Vá em **"Table Editor"** e verifique se as 5 tabelas foram criadas

---

## ✅ **CHECKLIST FINAL:**

- [ ] Conseguiu acessar o Vercel?
- [ ] Conseguiu importar o repositório?
- [ ] Deploy foi bem-sucedido?
- [ ] Funções retornam JSON?
- [ ] Site carrega sem erros?
- [ ] Consegue cadastrar dados?
- [ ] Dados aparecem no Supabase?

---

## 📞 **Me diga:**
1. **Conseguiu fazer login no Vercel?**
2. **Conseguiu importar o repositório?**
3. **O deploy foi bem-sucedido?**
4. **As funções funcionam?**

**Vou te ajudar em cada passo!** 🚀
