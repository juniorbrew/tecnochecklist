# 💰 Solução para Variáveis de Ambiente Gratuitas

## 🎯 **Problema: "Environment variables" só para ambiente pago**

**Vamos usar uma solução alternativa!**

---

## 🔧 **SOLUÇÃO 1: Configurar Credenciais no Código**

### **1.1 Atualizar `config.js`**
Substitua o arquivo `config.js` com suas credenciais reais:

```javascript
// Configuração da API Supabase
const SUPABASE_CONFIG = {
    url: 'https://SEU-PROJETO.supabase.co', // Cole sua URL aqui
    anonKey: 'SUA-CHAVE-ANONIMA-AQUI' // Cole sua chave aqui
};

// Configuração do domínio
const DOMAIN_CONFIG = {
    production: 'https://seu-site.netlify.app', // Substitua pelo seu domínio
    development: 'http://localhost:3000'
};

// Exportar configurações
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SUPABASE_CONFIG, DOMAIN_CONFIG };
} else {
    window.SUPABASE_CONFIG = SUPABASE_CONFIG;
    window.DOMAIN_CONFIG = DOMAIN_CONFIG;
}
```

### **1.2 Atualizar Funções Serverless**
Edite os arquivos em `netlify/functions/` para usar credenciais fixas:

**Exemplo para `saveData.js`:**
```javascript
// Função serverless do Netlify para salvar dados no Supabase
const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase (substitua pelos seus valores)
const supabaseUrl = 'https://SEU-PROJETO.supabase.co';
const supabaseKey = 'SUA-CHAVE-ANONIMA-AQUI';

const supabase = createClient(supabaseUrl, supabaseKey);

// ... resto do código permanece igual
```

---

## 🔧 **SOLUÇÃO 2: Usar Arquivo de Configuração**

### **2.1 Criar `config.json`**
Crie um arquivo `config.json` na raiz do projeto:

```json
{
  "supabase": {
    "url": "https://SEU-PROJETO.supabase.co",
    "anonKey": "SUA-CHAVE-ANONIMA-AQUI"
  }
}
```

### **2.2 Atualizar Funções para Usar Config**
```javascript
// No início de cada função serverless
const config = require('./config.json');

const supabaseUrl = config.supabase.url;
const supabaseKey = config.supabase.anonKey;
```

---

## 🔧 **SOLUÇÃO 3: Usar Variáveis de Ambiente do GitHub**

### **3.1 Configurar no GitHub**
1. Vá no seu repositório GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Adicione:
   - `SUPABASE_URL` = sua URL
   - `SUPABASE_ANON_KEY` = sua chave

### **3.2 Atualizar Funções**
```javascript
// Usar variáveis do GitHub Actions
const supabaseUrl = process.env.SUPABASE_URL || 'https://SEU-PROJETO.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'SUA-CHAVE-ANONIMA-AQUI';
```

---

## 🚀 **RECOMENDAÇÃO: Solução 1 (Mais Simples)**

### **Passo 1: Atualizar `config.js`**
1. Abra o arquivo `config.js`
2. Substitua as credenciais pelos seus valores reais
3. Salve o arquivo

### **Passo 2: Atualizar Funções Serverless**
1. Abra cada arquivo em `netlify/functions/`
2. Substitua as linhas:
   ```javascript
   const supabaseUrl = process.env.SUPABASE_URL || 'https://seu-projeto.supabase.co';
   const supabaseKey = process.env.SUPABASE_ANON_KEY || 'sua-chave-anonima-aqui';
   ```
3. Por:
   ```javascript
   const supabaseUrl = 'https://SEU-PROJETO.supabase.co';
   const supabaseKey = 'SUA-CHAVE-ANONIMA-AQUI';
   ```

### **Passo 3: Fazer Commit e Push**
```bash
git add .
git commit -m "Configurar credenciais do Supabase"
git push
```

### **Passo 4: Novo Deploy**
1. No Netlify, vá em **"Deploys"**
2. Clique em **"Trigger deploy"**
3. Escolha **"Deploy site"**
4. Aguarde o processamento

---

## 🧪 **TESTE: Verificar se Funcionou**

### **1. Verificar site:**
- [ ] Site aparece na lista do Netlify?
- [ ] URL do site funciona?
- [ ] Site carrega corretamente?

### **2. Verificar funções:**
- [ ] Funções serverless funcionam?
- [ ] API responde corretamente?
- [ ] Dados são salvos no banco?

### **3. Teste completo:**
- [ ] Acesse `https://seu-site.netlify.app/teste-integracao.html`
- [ ] Execute todos os testes
- [ ] Verifique se passaram

---

## 📞 **PRECISA DE AJUDA?**

**Me diga:**
1. **Qual solução você escolheu?**
2. **Consegue editar os arquivos?**
3. **Qual erro aparece (se houver)?**
4. **O deploy foi bem-sucedido?**

**Vou te ajudar a resolver!** 🚀


