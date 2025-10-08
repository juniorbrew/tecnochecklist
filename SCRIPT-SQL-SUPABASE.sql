-- ========================================
-- SCRIPT DE CRIAÇÃO DO BANCO DE DADOS
-- Tecno-Checklist - Sistema Completo
-- ========================================

-- 1. TABELA DE CLIENTES
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

-- 2. TABELA DE TÉCNICOS
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

-- 3. TABELA DE TIPOS DE TAREFA
CREATE TABLE IF NOT EXISTS tipos_tarefa (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    checklist TEXT[],
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABELA DE TAREFAS
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

-- 5. TABELA DE USUÁRIOS
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    usuario VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil VARCHAR(50) DEFAULT 'operador',
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- CONFIGURAÇÃO DE SEGURANÇA (RLS)
-- ========================================

-- Habilitar Row Level Security
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tecnicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE tipos_tarefa ENABLE ROW LEVEL SECURITY;
ALTER TABLE tarefas ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso público (para desenvolvimento)
CREATE POLICY "Acesso público clientes" ON clientes FOR ALL USING (true);
CREATE POLICY "Acesso público tecnicos" ON tecnicos FOR ALL USING (true);
CREATE POLICY "Acesso público tipos_tarefa" ON tipos_tarefa FOR ALL USING (true);
CREATE POLICY "Acesso público tarefas" ON tarefas FOR ALL USING (true);
CREATE POLICY "Acesso público usuarios" ON usuarios FOR ALL USING (true);

-- ========================================
-- DADOS INICIAIS
-- ========================================

-- Inserir usuários padrão
INSERT INTO usuarios (nome, usuario, senha, perfil) VALUES
('Administrador', 'admin', '123', 'admin'),
('Operador', 'operador', '123', 'operador'),
('Visualizador', 'visualizador', '123', 'visualizador')
ON CONFLICT (usuario) DO NOTHING;

-- ========================================
-- VERIFICAÇÃO FINAL
-- ========================================

-- Verificar se as tabelas foram criadas
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
