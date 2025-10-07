# 🗄️ Configuração Completa do Supabase para Tecno-Checklist

## 🎯 **Objetivo**
Conectar o projeto Tecno-Checklist hospedado no Netlify a um banco de dados PostgreSQL online no Supabase.

---

## 🚀 **Passo 1: Criar Projeto no Supabase**

### **1.1 Acessar Supabase**
1. Vá para [supabase.com](https://supabase.com)
2. Clique em **"Start your project"**
3. Faça login com sua conta GitHub

### **1.2 Criar Novo Projeto**
1. Clique em **"New Project"**
2. **Nome do projeto**: `tecno-checklist-db`
3. **Database Password**: Crie uma senha forte (salve em local seguro!)
4. **Region**: Escolha **South America (São Paulo)** para melhor performance
5. Clique em **"Create new project"**

⏱️ **Aguarde 2-3 minutos** para o projeto ser criado.

---

## 🔑 **Passo 2: Obter Credenciais**

### **2.1 Acessar Configurações da API**
1. No painel do Supabase, vá em **"Settings"** → **"API"**
2. **Copie a URL do projeto** (exemplo: `https://abcdefghijklmnop.supabase.co`)
3. **Copie a anon key** (chave pública - começa com `eyJ...`)

### **2.2 Salvar Credenciais**
Guarde essas informações em local seguro:
- **URL**: `https://seu-projeto.supabase.co`
- **Anon Key**: `eyJ...sua-chave-aqui`

---

## 📊 **Passo 3: Criar Estrutura do Banco**

### **3.1 Acessar SQL Editor**
1. No painel do Supabase, vá em **"SQL Editor"**
2. Clique em **"New query"**

### **3.2 Executar Script de Criação**
Cole e execute este script SQL completo:

```sql
-- ========================================
-- SCRIPT DE CRIAÇÃO DO BANCO DE DADOS
-- Tecno-Checklist - Sistema Completo
-- ========================================

-- 1. TABELA DE USUÁRIOS
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    usuario VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    telefone VARCHAR(20),
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABELA DE CLIENTES
CREATE TABLE IF NOT EXISTS clientes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    razao_social VARCHAR(255) NOT NULL,
    nome_fantasia VARCHAR(255),
    cnpj VARCHAR(18) UNIQUE,
    endereco TEXT,
    cidade VARCHAR(100),
    estado VARCHAR(2),
    cep VARCHAR(10),
    telefone VARCHAR(20),
    email VARCHAR(255),
    contato_responsavel VARCHAR(255),
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABELA DE TÉCNICOS
CREATE TABLE IF NOT EXISTS tecnicos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    especialidade VARCHAR(255),
    telefone VARCHAR(20),
    email VARCHAR(255),
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABELA DE TIPOS DE TAREFA
CREATE TABLE IF NOT EXISTS tipos_tarefa (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tipo VARCHAR(255) NOT NULL,
    descricao TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TABELA DE TAREFAS
CREATE TABLE IF NOT EXISTS tarefas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
    tecnico_id UUID REFERENCES tecnicos(id) ON DELETE CASCADE,
    tipo_tarefa_id UUID REFERENCES tipos_tarefa(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    status VARCHAR(50) DEFAULT 'pendente',
    prioridade VARCHAR(20) DEFAULT 'media',
    data_inicio DATE,
    data_vencimento DATE,
    data_conclusao DATE,
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. TABELA DE CHECKLISTS
CREATE TABLE IF NOT EXISTS checklists (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(100),
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. TABELA DE ITENS DO CHECKLIST
CREATE TABLE IF NOT EXISTS checklist_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    checklist_id UUID REFERENCES checklists(id) ON DELETE CASCADE,
    item VARCHAR(500) NOT NULL,
    ordem INTEGER DEFAULT 0,
    obrigatorio BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. TABELA DE RESPOSTAS DO CHECKLIST
CREATE TABLE IF NOT EXISTS checklist_respostas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    checklist_id UUID REFERENCES checklists(id) ON DELETE CASCADE,
    item_id UUID REFERENCES checklist_items(id) ON DELETE CASCADE,
    tarefa_id UUID REFERENCES tarefas(id) ON DELETE CASCADE,
    resposta BOOLEAN DEFAULT FALSE,
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- CONFIGURAÇÃO DE SEGURANÇA (RLS)
-- ========================================

-- Habilitar Row Level Security
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tecnicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE tipos_tarefa ENABLE ROW LEVEL SECURITY;
ALTER TABLE tarefas ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_respostas ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso público (para desenvolvimento)
-- ATENÇÃO: Em produção, configure políticas mais restritivas

CREATE POLICY "Permitir acesso público usuarios" ON usuarios FOR ALL USING (true);
CREATE POLICY "Permitir acesso público clientes" ON clientes FOR ALL USING (true);
CREATE POLICY "Permitir acesso público tecnicos" ON tecnicos FOR ALL USING (true);
CREATE POLICY "Permitir acesso público tipos_tarefa" ON tipos_tarefa FOR ALL USING (true);
CREATE POLICY "Permitir acesso público tarefas" ON tarefas FOR ALL USING (true);
CREATE POLICY "Permitir acesso público checklists" ON checklists FOR ALL USING (true);
CREATE POLICY "Permitir acesso público checklist_items" ON checklist_items FOR ALL USING (true);
CREATE POLICY "Permitir acesso público checklist_respostas" ON checklist_respostas FOR ALL USING (true);

-- ========================================
-- DADOS INICIAIS
-- ========================================

-- Inserir tipos de tarefa padrão
INSERT INTO tipos_tarefa (tipo, descricao) VALUES
('Manutenção Preventiva', 'Manutenção programada de equipamentos'),
('Manutenção Corretiva', 'Correção de problemas identificados'),
('Instalação', 'Instalação de novos equipamentos'),
('Configuração', 'Configuração de sistemas e equipamentos'),
('Treinamento', 'Treinamento de usuários'),
('Suporte Técnico', 'Suporte e assistência técnica');

-- Inserir checklist padrão
INSERT INTO checklists (nome, descricao, categoria) VALUES
('Checklist Técnico Geral', 'Checklist padrão para atividades técnicas', 'Geral'),
('Manutenção de Computadores', 'Checklist específico para manutenção de PCs', 'Manutenção'),
('Instalação de Software', 'Checklist para instalação de programas', 'Instalação'),
('Configuração de Rede', 'Checklist para configuração de redes', 'Rede');

-- Inserir itens do checklist padrão
INSERT INTO checklist_items (checklist_id, item, ordem, obrigatorio) 
SELECT 
    c.id,
    item_text,
    ordem,
    obrigatorio
FROM checklists c,
(VALUES 
    (1, 'Verificar funcionamento geral do equipamento', true),
    (2, 'Testar todos os componentes', true),
    (3, 'Verificar conexões e cabos', true),
    (4, 'Testar conectividade de rede', true),
    (5, 'Verificar atualizações do sistema', false),
    (6, 'Limpeza física do equipamento', true),
    (7, 'Verificar logs de erro', false),
    (8, 'Testar backup dos dados', true),
    (9, 'Documentar procedimentos realizados', true),
    (10, 'Entregar equipamento ao usuário', true)
) AS items(ordem, item_text, obrigatorio)
WHERE c.nome = 'Checklist Técnico Geral';

-- ========================================
-- ÍNDICES PARA PERFORMANCE
-- ========================================

CREATE INDEX IF NOT EXISTS idx_tarefas_cliente ON tarefas(cliente_id);
CREATE INDEX IF NOT EXISTS idx_tarefas_tecnico ON tarefas(tecnico_id);
CREATE INDEX IF NOT EXISTS idx_tarefas_status ON tarefas(status);
CREATE INDEX IF NOT EXISTS idx_checklist_items_checklist ON checklist_items(checklist_id);
CREATE INDEX IF NOT EXISTS idx_respostas_tarefa ON checklist_respostas(tarefa_id);

-- ========================================
-- FUNÇÕES AUXILIARES
-- ========================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clientes_updated_at BEFORE UPDATE ON clientes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tecnicos_updated_at BEFORE UPDATE ON tecnicos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tipos_tarefa_updated_at BEFORE UPDATE ON tipos_tarefa FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tarefas_updated_at BEFORE UPDATE ON tarefas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_checklists_updated_at BEFORE UPDATE ON checklists FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- VERIFICAÇÃO FINAL
-- ========================================

-- Verificar se as tabelas foram criadas
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Verificar políticas RLS
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

### **3.3 Verificar Criação**
Após executar o script, verifique se as tabelas foram criadas:
1. Vá em **"Table Editor"**
2. Você deve ver as tabelas: `usuarios`, `clientes`, `tecnicos`, `tipos_tarefa`, `tarefas`, `checklists`, `checklist_items`, `checklist_respostas`

---

## 🔐 **Passo 4: Configurar Segurança**

### **4.1 Verificar RLS (Row Level Security)**
1. Vá em **"Authentication"** → **"Policies"**
2. Verifique se as políticas foram criadas corretamente
3. Todas as tabelas devem ter política "Permitir acesso público"

### **4.2 Configurar CORS (se necessário)**
1. Vá em **"Settings"** → **"API"**
2. Em **"CORS"**, adicione seu domínio do Netlify
3. Exemplo: `https://seu-projeto.netlify.app`

---

## ✅ **Próximos Passos**

Após completar esta configuração:

1. **Copie as credenciais** do Supabase
2. **Atualize o arquivo config.js** com suas credenciais
3. **Configure as funções serverless** do Netlify
4. **Teste a integração** completa

---

## 🎯 **Resultado Esperado**

- ✅ Banco de dados PostgreSQL criado no Supabase
- ✅ Estrutura completa com 8 tabelas relacionadas
- ✅ Dados iniciais inseridos
- ✅ Segurança RLS configurada
- ✅ Pronto para integração com Netlify

**Agora você pode prosseguir para a próxima etapa!** 🚀


