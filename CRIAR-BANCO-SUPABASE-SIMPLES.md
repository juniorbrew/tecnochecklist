# 🗄️ **CRIAR BANCO DE DADOS NO SUPABASE - PASSO A PASSO**

## 📋 **Seu banco já existe! Vamos criar as tabelas:**

---

## **PASSO 1: Acessar Supabase**

1. Vá em [supabase.com](https://supabase.com)
2. Faça login (você já tem projeto criado)
3. Selecione o projeto **"tecno-checklist-db"** (ou o nome que você deu)

---

## **PASSO 2: Criar Tabelas**

### **2.1 Acessar SQL Editor**
1. No painel do Supabase, procure por **"SQL Editor"** (barra lateral)
2. Clique em **"New query"**

### **2.2 Executar Script SQL**

Cole e execute este script completo:

```sql
-- TABELA DE CLIENTES
CREATE TABLE IF NOT EXISTS clientes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18),
    whatsapp VARCHAR(20),
    endereco TEXT,
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    cep VARCHAR(10),
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABELA DE TÉCNICOS
CREATE TABLE IF NOT EXISTS tecnicos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    especialidade VARCHAR(255),
    telefone VARCHAR(20),
    email VARCHAR(255),
    status VARCHAR(50) DEFAULT 'ativo',
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABELA DE TIPOS DE TAREFA
CREATE TABLE IF NOT EXISTS tipos_tarefa (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    checklist TEXT[],
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABELA DE TAREFAS
CREATE TABLE IF NOT EXISTS tarefas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    cliente_id UUID REFERENCES clientes(id),
    tecnico_id UUID REFERENCES tecnicos(id),
    tipo_id UUID REFERENCES tipos_tarefa(id),
    data DATE,
    prioridade VARCHAR(20) DEFAULT 'media',
    status VARCHAR(50) DEFAULT 'pendente',
    progresso INTEGER DEFAULT 0,
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABELA DE USUÁRIOS
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    usuario VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil VARCHAR(50) DEFAULT 'operador',
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- HABILITAR RLS (Row Level Security)
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tecnicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE tipos_tarefa ENABLE ROW LEVEL SECURITY;
ALTER TABLE tarefas ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE ACESSO PÚBLICO
CREATE POLICY "Acesso público clientes" ON clientes FOR ALL USING (true);
CREATE POLICY "Acesso público tecnicos" ON tecnicos FOR ALL USING (true);
CREATE POLICY "Acesso público tipos_tarefa" ON tipos_tarefa FOR ALL USING (true);
CREATE POLICY "Acesso público tarefas" ON tarefas FOR ALL USING (true);
CREATE POLICY "Acesso público usuarios" ON usuarios FOR ALL USING (true);

-- INSERIR DADOS INICIAIS
INSERT INTO usuarios (nome, usuario, senha, perfil) VALUES
('Administrador', 'admin', '123', 'admin'),
('Operador', 'operador', '123', 'operador'),
('Visualizador', 'visualizador', '123', 'visualizador');
```

### **2.3 Executar Script**
1. **Clique em "Run"** (botão de play)
2. **Aguarde alguns segundos**
3. **Deve aparecer:** "Success. No rows returned"

---

## **PASSO 3: Verificar Tabelas**

### **3.1 Acessar Table Editor**
1. No painel do Supabase, procure por **"Table Editor"** (barra lateral)
2. Deve aparecer 5 tabelas:
   - ✅ `clientes`
   - ✅ `tecnicos`
   - ✅ `tipos_tarefa`
   - ✅ `tarefas`
   - ✅ `usuarios`

### **3.2 Verificar Dados**
1. Clique em **"usuarios"**
2. Deve aparecer 3 usuários criados
3. Se aparecer, **tudo funcionou!** ✅

---

## **PASSO 4: Testar Conexão**

### **4.1 Testar no Navegador**
Abra estas URLs:

**Teste 1 - Usuários:**
```
https://tecnocheclist.netlify.app/.netlify/functions/getData?tabela=usuarios
```
Deve retornar os 3 usuários ✅

**Teste 2 - Clientes:**
```
https://tecnocheclist.netlify.app/.netlify/functions/getData?tabela=clientes
```
Deve retornar `[]` (vazio) ✅

### **4.2 Resultado Esperado:**
- ✅ **Retorna JSON** = Conexão funcionando
- ❌ **Erro 500** = Problema na conexão
- ❌ **404** = Função não encontrada

---

## **PASSO 5: Testar no Site**

### **5.1 Cadastrar Cliente**
1. Acesse: [https://tecnocheclist.netlify.app/](https://tecnocheclist.netlify.app/)
2. Faça login com: `admin` / `123`
3. Vá em **"Clientes"**
4. **Cadastre um cliente** de teste

### **5.2 Verificar no Supabase**
1. Volte ao painel do Supabase
2. Vá em **"Table Editor"** → **"clientes"**
3. **Atualize a página**
4. Deve aparecer o cliente cadastrado! ✅

---

## ✅ **CHECKLIST FINAL:**

- [ ] Script SQL executado com sucesso
- [ ] 5 tabelas criadas
- [ ] 3 usuários inseridos
- [ ] Funções retornam JSON
- [ ] Site carrega sem erros
- [ ] Consegue cadastrar dados
- [ ] Dados aparecem no Supabase

---

## 📞 **Me diga:**
1. **Conseguiu executar o script SQL?**
2. **As 5 tabelas foram criadas?**
3. **As funções retornam JSON?**
4. **Consegue cadastrar dados?**

**Vou te ajudar em cada passo!** 🚀
