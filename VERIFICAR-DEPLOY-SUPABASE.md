# 🔍 **VERIFICAR DEPLOY COM SUPABASE**

## 📋 **Passo a passo:**

### **1. Acessar Netlify:**
1. Vá em [netlify.com](https://netlify.com)
2. Faça login na sua conta
3. Clique no seu site **"tecnocheclist"**

### **2. Verificar Deploy:**
1. Vá em **"Deploys"** (barra lateral)
2. Verifique se o último deploy está **"Published"** ✅
3. Se estiver **"Building"** ⏳, aguarde completar
4. Se der **erro** ❌, me diga qual erro

### **3. Verificar Functions:**
1. Vá em **"Functions"** (barra lateral)
2. Deve aparecer 4 funções:
   - `deleteData` ✅
   - `getData` ✅
   - `saveData` ✅
   - `updateData` ✅

### **4. Testar Functions:**
Abra estas URLs no navegador:

**Teste 1 - Clientes:**
```
https://tecnocheclist.netlify.app/.netlify/functions/getData?tabela=clientes
```

**Teste 2 - Técnicos:**
```
https://tecnocheclist.netlify.app/.netlify/functions/getData?tabela=tecnicos
```

### **5. O que deve aparecer:**
- ✅ **JSON vazio `[]`** = Supabase funcionando (sem dados)
- ❌ **Erro 500** = Problema na conexão
- ❌ **404** = Função não encontrada

### **6. Testar no Site:**
1. Acesse: [https://tecnocheclist.netlify.app/](https://tecnocheclist.netlify.app/)
2. Tente **cadastrar um cliente**
3. Veja se **aparece na lista**

## 🎯 **Me diga:**
1. **O deploy terminou?**
2. **As funções aparecem no dashboard?**
3. **As URLs retornam JSON?**
4. **Consegue cadastrar dados no site?**

