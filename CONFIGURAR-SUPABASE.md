# 🗄️ Como Configurar Banco de Dados no Supabase

## 🎉 **Projeto Publicado no Vercel!**
Agora vamos configurar o banco de dados para hospedar os dados do checklist.

## 🚀 **Passo 1: Criar Projeto no Supabase**

### **1.1 Acesse o Supabase**
- Vá para [supabase.com](https://supabase.com)
- Clique em "Start your project"
- Faça login com GitHub

### **1.2 Criar Novo Projeto**
- Clique em "New Project"
- **Nome**: `tecno-checklist-db`
- **Database Password**: Crie uma senha forte
- **Region**: Escolha a mais próxima (South America - São Paulo)
- Clique em "Create new project"

## 🔧 **Passo 2: Configurar Credenciais**

### **2.1 Obter URL e Chave**
1. **No painel do Supabase**, vá em "Settings" → "API"
2. **Copie a URL** (exemplo: `https://abcdefgh.supabase.co`)
3. **Copie a anon key** (chave pública)

### **2.2 Atualizar config.js**
Abra o arquivo `config.js` e substitua:

```javascript
const SUPABASE_CONFIG = {
    url: 'https://SEU-PROJETO.supabase.co', // Cole sua URL aqui
    anonKey: 'SUA-CHAVE-ANONIMA-AQUI' // Cole sua chave aqui
};
```

## 📊 **Passo 3: Criar Tabelas no Banco**

### **3.1 Acessar SQL Editor**
- No painel do Supabase, vá em "SQL Editor"
- Clique em "New query"

### **3.2 Executar Script SQL**
Cole e execute este script:

```sql
-- Tabela para checklists
CREATE TABLE checklists (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para itens do checklist
CREATE TABLE checklist_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    checklist_id UUID REFERENCES checklists(id) ON DELETE CASCADE,
    item VARCHAR(500) NOT NULL,
    ordem INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para respostas
CREATE TABLE checklist_respostas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    checklist_id UUID REFERENCES checklists(id) ON DELETE CASCADE,
    item_id UUID REFERENCES checklist_items(id) ON DELETE CASCADE,
    resposta BOOLEAN DEFAULT FALSE,
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_respostas ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso (público para leitura e escrita)
CREATE POLICY "Permitir acesso público" ON checklists FOR ALL USING (true);
CREATE POLICY "Permitir acesso público" ON checklist_items FOR ALL USING (true);
CREATE POLICY "Permitir acesso público" ON checklist_respostas FOR ALL USING (true);
```

## 🔐 **Passo 4: Configurar Segurança**

### **4.1 Configurar RLS (Row Level Security)**
- Vá em "Authentication" → "Policies"
- Verifique se as políticas foram criadas corretamente

### **4.2 Configurar CORS (se necessário)**
- Vá em "Settings" → "API"
- Adicione seu domínio do Vercel na lista de CORS

## 🧪 **Passo 5: Testar Conexão**

### **5.1 Atualizar config.js**
```javascript
const SUPABASE_CONFIG = {
    url: 'https://SEU-PROJETO.supabase.co',
    anonKey: 'SUA-CHAVE-ANONIMA-AQUI'
};
```

### **5.2 Fazer Commit e Push**
```bash
git add config.js
git commit -m "Configurar Supabase com credenciais reais"
git push
```

### **5.3 Deploy Automático**
- O Vercel vai fazer deploy automático
- Teste a aplicação no domínio do Vercel

## 📋 **Estrutura do Banco de Dados:**

```
checklists
├── id (UUID, Primary Key)
├── nome (VARCHAR)
├── descricao (TEXT)
├── categoria (VARCHAR)
└── created_at (TIMESTAMP)

checklist_items
├── id (UUID, Primary Key)
├── checklist_id (UUID, Foreign Key)
├── item (VARCHAR)
├── ordem (INTEGER)
└── created_at (TIMESTAMP)

checklist_respostas
├── id (UUID, Primary Key)
├── checklist_id (UUID, Foreign Key)
├── item_id (UUID, Foreign Key)
├── resposta (BOOLEAN)
├── observacoes (TEXT)
└── created_at (TIMESTAMP)
```

## ✅ **Próximos Passos:**

1. **Criar projeto no Supabase**
2. **Configurar credenciais no config.js**
3. **Executar script SQL**
4. **Fazer commit e push**
5. **Testar no Vercel**

## 🎯 **Resultado Final:**
- **Banco de dados hospedado** no Supabase
- **Aplicação funcionando** no Vercel
- **Dados sincronizados** na nuvem
- **PWA funcionando** perfeitamente

---

**Projeto completo com banco de dados!** 🎉
