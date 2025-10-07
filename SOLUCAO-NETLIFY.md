# 🚨 Solução de Problemas - Netlify

## 🎯 **Problemas Comuns e Soluções**

---

## ❌ **PROBLEMA 1: "Não consigo fazer login no Netlify"**

### **Solução:**
1. **Limpar cache do navegador:**
   - Pressione `Ctrl + Shift + Delete`
   - Selecione "Cookies e dados de sites"
   - Clique em "Limpar dados"

2. **Tentar navegador diferente:**
   - Use Chrome, Firefox ou Edge
   - Acesse [netlify.com](https://netlify.com)

3. **Fazer login com GitHub:**
   - Clique em "Sign up" ou "Log in"
   - Escolha "Continue with GitHub"
   - Autorize o Netlify a acessar sua conta

---

## ❌ **PROBLEMA 2: "Não vejo meu repositório na lista"**

### **Solução:**
1. **Verificar se o repositório está público:**
   - Vá no GitHub
   - Verifique se o repositório `infra-app` está público
   - Se estiver privado, torne público temporariamente

2. **Sincronizar repositórios:**
   - No Netlify, clique em "Refresh repositories"
   - Aguarde alguns segundos
   - Procure novamente por `infra-app`

3. **Verificar nome do repositório:**
   - Confirme se o nome está exatamente `infra-app`
   - Se for diferente, procure pelo nome correto

---

## ❌ **PROBLEMA 3: "Deploy falha ou não funciona"**

### **Solução:**
1. **Verificar arquivos necessários:**
   - Confirme se `netlify.toml` está na raiz do projeto
   - Confirme se a pasta `netlify/functions/` existe
   - Confirme se `package.json` existe

2. **Configurar Build Settings manualmente:**
   - **Build command**: Deixe vazio
   - **Publish directory**: `.` (ponto)
   - **Node version**: 18

3. **Fazer novo deploy:**
   - Vá em "Deploys"
   - Clique em "Trigger deploy"
   - Escolha "Deploy site"

---

## ❌ **PROBLEMA 4: "Não consigo adicionar variáveis de ambiente"**

### **Solução:**
1. **Verificar se o site foi criado:**
   - Aguarde o deploy completar
   - Só então configure as variáveis

2. **Localizar a seção correta:**
   - Vá em "Site settings" (não "Account settings")
   - Clique em "Environment variables"
   - Clique em "Add variable"

3. **Adicionar variáveis uma por vez:**
   - **Primeira variável:**
     - Key: `SUPABASE_URL`
     - Value: `https://seu-projeto.supabase.co`
   - **Segunda variável:**
     - Key: `SUPABASE_ANON_KEY`
     - Value: `eyJ...sua-chave-aqui`

---

## 🔧 **ALTERNATIVA: Deploy Manual**

Se o deploy automático não funcionar, faça manualmente:

### **Opção 1: Drag and Drop**
1. **Compactar o projeto:**
   - Selecione todos os arquivos do projeto
   - Crie um arquivo ZIP

2. **Fazer upload:**
   - Vá em [netlify.com](https://netlify.com)
   - Arraste o arquivo ZIP para a área de deploy
   - Aguarde o processamento

### **Opção 2: Netlify CLI**
1. **Instalar Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Fazer login:**
   ```bash
   netlify login
   ```

3. **Fazer deploy:**
   ```bash
   netlify deploy --prod
   ```

---

## 🧪 **TESTE: Verificar se Deploy Funcionou**

### **1. Verificar URL do Site:**
- Após o deploy, você receberá uma URL como: `https://nome-aleatorio.netlify.app`
- Acesse essa URL
- Deve mostrar seu site funcionando

### **2. Testar Funções Serverless:**
- Acesse: `https://seu-site.netlify.app/.netlify/functions/getData?tabela=usuarios`
- Deve retornar um JSON (mesmo que vazio)

### **3. Verificar Logs:**
- No Netlify, vá em "Functions"
- Verifique se as funções estão ativas
- Se houver erros, aparecerão nos logs

---

## 🆘 **SE NADA FUNCIONAR**

### **Solução de Emergência:**
1. **Usar Vercel como alternativa:**
   - Acesse [vercel.com](https://vercel.com)
   - Conecte seu repositório GitHub
   - Configure as variáveis de ambiente
   - Faça deploy

2. **Usar GitHub Pages:**
   - Vá nas configurações do repositório
   - Ative GitHub Pages
   - Configure como fonte: "Deploy from a branch"
   - Escolha branch "main"

---

## 📞 **Suporte Adicional**

### **Se ainda não conseguir:**
1. **Me diga exatamente onde está travando:**
   - Qual erro aparece?
   - Em qual passo específico?
   - Qual mensagem de erro?

2. **Alternativas que posso sugerir:**
   - Deploy em outra plataforma
   - Configuração local
   - Uso de banco de dados diferente

---

## ✅ **Checklist de Verificação**

- [ ] Conseguiu fazer login no Netlify?
- [ ] Conseguiu conectar o repositório?
- [ ] Deploy foi bem-sucedido?
- [ ] Site está acessível?
- [ ] Variáveis de ambiente foram configuradas?
- [ ] Funções serverless estão funcionando?

**Me diga qual desses itens está falhando e te ajudo a resolver!** 🚀


