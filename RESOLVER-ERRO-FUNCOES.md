# 🚨 Resolver Erro das Funções Serverless

## 🎯 **Problema: "Erro ao carregar dados do banco. Usando dados locais."**

**Isso indica que as funções serverless não estão funcionando corretamente!**

---

## 🔍 **ETAPA 1: Verificar se as Funções Existem**

### **1.1 Verificar no Netlify**
1. **No Netlify, vá em "Functions"**
2. **Deve mostrar uma lista de funções:**
   - `saveData`
   - `getData`
   - `updateData`
   - `deleteData`
3. **Se não aparecer nenhuma função, o problema é na configuração**

### **1.2 Verificar Arquivos no Projeto**
1. **Verifique se a pasta `netlify/functions/` existe**
2. **Verifique se os arquivos existem:**
   - `netlify/functions/saveData.js`
   - `netlify/functions/getData.js`
   - `netlify/functions/updateData.js`
   - `netlify/functions/deleteData.js`
   - `netlify/functions/package.json`

---

## 🔧 **ETAPA 2: Soluções por Tipo de Problema**

### **Problema 1: "Funções não aparecem na lista"**
**Solução:**
1. **Verificar se o arquivo `netlify.toml` está correto**
2. **Verificar se a pasta `netlify/functions/` existe**
3. **Fazer commit e push das alterações**
4. **Tentar novo deploy**

### **Problema 2: "Funções aparecem mas não funcionam"**
**Solução:**
1. **Verificar se as credenciais estão corretas**
2. **Verificar se as dependências estão corretas**
3. **Verificar se o Node.js está configurado corretamente**

### **Problema 3: "Erro de configuração"**
**Solução:**
1. **Verificar se o arquivo `netlify.toml` está na raiz**
2. **Verificar se a sintaxe está correta**
3. **Verificar se as configurações estão corretas**

---

## 🛠️ **ETAPA 3: Verificar Configuração**

### **3.1 Verificar `netlify.toml`**
O arquivo deve estar na raiz do projeto e conter:
```toml
[build]
  publish = "."
  command = "echo 'Build completed'"

[build.environment]
  NODE_VERSION = "18"

[functions]
  directory = "netlify/functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### **3.2 Verificar Estrutura de Pastas**
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

### **3.3 Verificar Dependências**
O arquivo `netlify/functions/package.json` deve conter:
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.38.0"
  }
}
```

---

## 🚀 **ETAPA 4: Tentar Soluções**

### **Solução 1: Reconfigurar Netlify**
1. **No Netlify, vá em "Site settings"**
2. **Vá em "Build & deploy"**
3. **Verifique se as configurações estão corretas:**
   - **Build command:** Deixe vazio
   - **Publish directory:** `.` (ponto)
   - **Node version:** 18

### **Solução 2: Fazer Novo Deploy**
1. **Fazer commit e push das alterações**
2. **No Netlify, vá em "Deploys"**
3. **Clique em "Trigger deploy"**
4. **Escolha "Deploy site"**
5. **Aguarde o processamento**

### **Solução 3: Deploy Manual**
1. **Compactar todos os arquivos em ZIP**
2. **No Netlify, vá em "Sites"**
3. **Clique em "Add new site"**
4. **Escolha "Deploy manually"**
5. **Arraste o arquivo ZIP para a área de deploy**

---

## 🧪 **ETAPA 5: Testar Soluções**

### **5.1 Verificar se as Funções Aparecem**
1. **No Netlify, vá em "Functions"**
2. **Deve mostrar uma lista de funções**
3. **Se não aparecer, o problema é na configuração**

### **5.2 Testar Função Individual**
1. **Acesse:** `https://seu-site.netlify.app/.netlify/functions/getData?tabela=clientes`
2. **Deve retornar JSON, não HTML**
3. **Se retornar HTML, a função não está funcionando**

### **5.3 Verificar Logs**
1. **No Netlify, vá em "Functions"**
2. **Clique em uma função**
3. **Clique em "View logs"**
4. **Deve mostrar os logs da função**

---

## ✅ **ETAPA 6: Verificar se Funcionou**

### **6.1 Verificar site:**
- [ ] Site carrega corretamente?
- [ ] Funções serverless funcionam?
- [ ] API responde corretamente?

### **6.2 Verificar Supabase:**
- [ ] Tabelas foram criadas?
- [ ] Políticas RLS estão corretas?
- [ ] Dados são salvos?

### **6.3 Verificar integração:**
- [ ] Dados aparecem no Supabase?
- [ ] Sincronização funciona?
- [ ] PWA funciona?

---

## 📞 **PRECISA DE MAIS AJUDA?**

**Me diga:**
1. **Consegue ver a lista de funções no Netlify?**
2. **Consegue ver os arquivos na pasta `netlify/functions/`?**
3. **Qual erro aparece (se houver)?**
4. **Consegue fazer commit e push?**

**Vou te ajudar a resolver!** 🚀


