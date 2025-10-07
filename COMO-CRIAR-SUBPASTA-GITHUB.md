# 📁 Como Criar Subpasta no GitHub

## 🎯 **Criar pasta `netlify/functions/` no GitHub**

---

## 📋 **MÉTODO 1: Via Interface Web do GitHub (Mais Fácil)**

### **1.1 Acessar seu Repositório**
1. **Vá em [github.com](https://github.com)**
2. **Faça login na sua conta**
3. **Clique no repositório `infra-app`**

### **1.2 Criar Pasta `netlify`**
1. **Clique em "Add file" → "Create new file"**
2. **Digite:** `netlify/README.md`
3. **Adicione algum conteúdo (ex: "# Netlify Functions")**
4. **Clique em "Commit new file"**

### **1.3 Criar Pasta `functions`**
1. **Clique em "Add file" → "Create new file"**
2. **Digite:** `netlify/functions/README.md`
3. **Adicione algum conteúdo (ex: "# Functions")**
4. **Clique em "Commit new file"**

### **1.4 Criar Arquivos das Funções**
1. **Clique em "Add file" → "Create new file"**
2. **Digite:** `netlify/functions/saveData.js`
3. **Cole o código da função**
4. **Clique em "Commit new file"**
5. **Repita para os outros arquivos**

---

## 🔧 **MÉTODO 2: Via Git Local (Mais Rápido)**

### **2.1 Criar Pastas Localmente**
```bash
# Na raiz do seu projeto
mkdir netlify
mkdir netlify/functions
```

### **2.2 Criar Arquivos**
```bash
# Criar arquivos das funções
touch netlify/functions/saveData.js
touch netlify/functions/getData.js
touch netlify/functions/updateData.js
touch netlify/functions/deleteData.js
touch netlify/functions/package.json
```

### **2.3 Adicionar Conteúdo**
1. **Abra cada arquivo em um editor**
2. **Cole o código correspondente**
3. **Salve o arquivo**

### **2.4 Fazer Commit e Push**
```bash
git add netlify/
git commit -m "Adicionar funções serverless"
git push
```

---

## 🚀 **MÉTODO 3: Via GitHub Desktop (Mais Visual)**

### **3.1 Instalar GitHub Desktop**
1. **Baixe em [desktop.github.com](https://desktop.github.com)**
2. **Instale e configure**

### **3.2 Criar Pastas**
1. **Abra o GitHub Desktop**
2. **Selecione seu repositório**
3. **Clique com botão direito na pasta raiz**
4. **Escolha "New folder"**
5. **Digite:** `netlify`
6. **Repita para criar `functions`**

### **3.3 Criar Arquivos**
1. **Clique com botão direito na pasta `functions`**
2. **Escolha "New file"**
3. **Digite o nome:** `saveData.js`
4. **Adicione o conteúdo**
5. **Repita para os outros arquivos**

---

## 📁 **ESTRUTURA FINAL QUE VOCÊ DEVE TER**

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
└── config.js
```

---

## 🧪 **TESTE: Verificar se Funcionou**

### **1. Verificar no GitHub:**
- [ ] Pasta `netlify/` existe?
- [ ] Pasta `netlify/functions/` existe?
- [ ] Arquivos das funções existem?
- [ ] Arquivo `package.json` existe?

### **2. Verificar no Netlify:**
- [ ] Deploy foi bem-sucedido?
- [ ] Funções aparecem na lista?
- [ ] Funções retornam JSON?

### **3. Verificar integração:**
- [ ] Dados são salvos no Supabase?
- [ ] Dados aparecem no painel do Supabase?
- [ ] Sincronização funciona?

---

## 📞 **PRECISA DE MAIS AJUDA?**

**Me diga:**
1. **Qual método você prefere usar?**
2. **Consegue acessar o GitHub?**
3. **Consegue criar as pastas?**
4. **Qual erro aparece (se houver)?**

**Vou te ajudar a resolver!** 🚀


