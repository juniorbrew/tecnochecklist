# 🚀 Solução Final - Dependências

## 🎯 **Problema: "A Netlify Function is using '@supabase/supabase-js' but that dependency has not been installed yet"**

**Vamos resolver isso de forma definitiva!**

---

## 🔧 **SOLUÇÃO: Usar Build Command Personalizado**

### **1.1 Atualizar netlify.toml**
1. **No GitHub, vá em `netlify.toml`**
2. **Clique em "Edit file"**
3. **Substitua todo o conteúdo por:**
```toml
[build]
  publish = "."
  command = "cd netlify/functions && npm install && cd ../.. && echo 'Build completed'"

[build.environment]
  NODE_VERSION = "18"

[functions]
  directory = "netlify/functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/.netlify/functions/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Headers = "Content-Type, Authorization"
    Access-Control-Allow-Methods = "GET, POST, PUT, DELETE, OPTIONS"
```
4. **Clique em "Commit changes"**

### **1.2 Manter Estrutura Atual**
- **Manter o arquivo `package.json` na raiz do projeto**
- **Manter o `netlify/functions/package.json`**

---

## 🧪 **TESTE: Verificar se Funcionou**

### **1. Verificar Deploy**
- [ ] Deploy foi bem-sucedido?
- [ ] Funções aparecem no Netlify?
- [ ] Funções retornam JSON?

### **2. Verificar Função**
1. **Acesse:** `https://seu-site.netlify.app/.netlify/functions/getData?tabela=clientes`
2. **Deve retornar JSON, não HTML**

### **3. Verificar Integração**
- [ ] Dados são salvos no Supabase?
- [ ] Dados aparecem no painel do Supabase?
- [ ] Sincronização funciona?

---

## 📞 **PRECISA DE MAIS AJUDA?**

**Me diga:**
1. **Consegue atualizar o netlify.toml?**
2. **Qual erro aparece (se houver)?**
3. **Consegue ver as funções no Netlify?**
4. **Consegue testar a função?**

**Vou te ajudar a resolver!** 🚀


