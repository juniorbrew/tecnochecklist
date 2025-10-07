# 📁 Onde Colocar os Arquivos das Funções

## 🎯 **Estrutura de Pastas para o Projeto**

---

## 📋 **ETAPA 1: Criar Estrutura de Pastas**

### **1.1 Criar Pasta `netlify`**
1. **Na raiz do seu projeto** (mesmo nível que `index.html`)
2. **Criar uma pasta chamada `netlify`**
3. **Dentro da pasta `netlify`, criar uma pasta chamada `functions`**

### **1.2 Estrutura Final:**
```
infra-app/
├── netlify/
│   ├── functions/
│   │   ├── saveData.js
│   │   ├── getData.js
│   │   ├── updateData.js
│   │   ├── deleteData.js
│   │   └── package.json
├── netlify.toml
├── index.html
├── config.js
└── outros arquivos...
```

---

## 🔧 **ETAPA 2: Colocar Arquivos**

### **2.1 Arquivo `saveData.js`**
1. **Criar arquivo:** `netlify/functions/saveData.js`
2. **Copiar o conteúdo** que eu forneci
3. **Salvar o arquivo**

### **2.2 Arquivo `getData.js`**
1. **Criar arquivo:** `netlify/functions/getData.js`
2. **Copiar o conteúdo** que eu forneci
3. **Salvar o arquivo**

### **2.3 Arquivo `updateData.js`**
1. **Criar arquivo:** `netlify/functions/updateData.js`
2. **Copiar o conteúdo** que eu forneci
3. **Salvar o arquivo**

### **2.4 Arquivo `deleteData.js`**
1. **Criar arquivo:** `netlify/functions/deleteData.js`
2. **Copiar o conteúdo** que eu forneci
3. **Salvar o arquivo**

### **2.5 Arquivo `package.json`**
1. **Criar arquivo:** `netlify/functions/package.json`
2. **Copiar o conteúdo:**
   ```json
   {
     "name": "netlify-functions",
     "version": "1.0.0",
     "description": "Funções serverless para Tecno-Checklist",
     "main": "index.js",
     "dependencies": {
       "@supabase/supabase-js": "^2.38.0"
     },
     "engines": {
       "node": ">=18.0.0"
     },
     "keywords": [
       "netlify",
       "functions",
       "supabase",
       "serverless"
     ],
     "author": "Tecno-Checklist Team"
   }
   ```

---

## 🚀 **ETAPA 3: Fazer Commit e Push**

### **3.1 Adicionar Arquivos**
```bash
git add netlify/
git add netlify.toml
git add config.js
```

### **3.2 Fazer Commit**
```bash
git commit -m "Adicionar funções serverless e configurar Supabase"
```

### **3.3 Fazer Push**
```bash
git push
```

---

## 🧪 **ETAPA 4: Testar Deploy**

### **4.1 Verificar no Netlify**
1. **Aguarde o deploy automático**
2. **Vá em "Functions"**
3. **Deve mostrar as funções:**
   - `saveData`
   - `getData`
   - `updateData`
   - `deleteData`

### **4.2 Testar Função**
1. **Acesse:** `https://seu-site.netlify.app/.netlify/functions/getData?tabela=clientes`
2. **Deve retornar JSON, não HTML**

---

## ✅ **ETAPA 5: Verificar se Funcionou**

### **5.1 Verificar estrutura:**
- [ ] Pasta `netlify/` existe?
- [ ] Pasta `netlify/functions/` existe?
- [ ] Arquivos das funções existem?
- [ ] Arquivo `package.json` existe?

### **5.2 Verificar deploy:**
- [ ] Deploy foi bem-sucedido?
- [ ] Funções aparecem no Netlify?
- [ ] Funções retornam JSON?

### **5.3 Verificar integração:**
- [ ] Dados são salvos no Supabase?
- [ ] Dados aparecem no painel do Supabase?
- [ ] Sincronização funciona?

---

## 📞 **PRECISA DE MAIS AJUDA?**

**Me diga:**
1. **Consegue criar a pasta `netlify/functions/`?**
2. **Consegue criar os arquivos das funções?**
3. **Consegue fazer commit e push?**
4. **Qual erro aparece (se houver)?**

**Vou te ajudar a resolver!** 🚀


