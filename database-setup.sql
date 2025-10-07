-- Script SQL para configurar banco de dados do Tecno-Checklist
-- Execute este script no SQL Editor do Supabase

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

-- Inserir dados de exemplo
INSERT INTO checklists (nome, descricao, categoria) VALUES 
('Checklist de Segurança', 'Verificação de itens de segurança básicos', 'Segurança'),
('Checklist de Manutenção', 'Verificação de equipamentos e manutenção', 'Manutenção'),
('Checklist de Qualidade', 'Verificação de padrões de qualidade', 'Qualidade');

-- Inserir itens de exemplo para o primeiro checklist
INSERT INTO checklist_items (checklist_id, item, ordem) VALUES 
((SELECT id FROM checklists WHERE nome = 'Checklist de Segurança'), 'Verificar extintores de incêndio', 1),
((SELECT id FROM checklists WHERE nome = 'Checklist de Segurança'), 'Verificar saídas de emergência', 2),
((SELECT id FROM checklists WHERE nome = 'Checklist de Segurança'), 'Verificar iluminação de emergência', 3),
((SELECT id FROM checklists WHERE nome = 'Checklist de Segurança'), 'Verificar alarmes de segurança', 4),
((SELECT id FROM checklists WHERE nome = 'Checklist de Segurança'), 'Verificar equipamentos de proteção individual', 5);

-- Inserir itens de exemplo para o segundo checklist
INSERT INTO checklist_items (checklist_id, item, ordem) VALUES 
((SELECT id FROM checklists WHERE nome = 'Checklist de Manutenção'), 'Verificar funcionamento de equipamentos', 1),
((SELECT id FROM checklists WHERE nome = 'Checklist de Manutenção'), 'Verificar lubrificação de máquinas', 2),
((SELECT id FROM checklists WHERE nome = 'Checklist de Manutenção'), 'Verificar limpeza de filtros', 3),
((SELECT id FROM checklists WHERE nome = 'Checklist de Manutenção'), 'Verificar calibração de instrumentos', 4),
((SELECT id FROM checklists WHERE nome = 'Checklist de Manutenção'), 'Verificar desgaste de peças', 5);

-- Inserir itens de exemplo para o terceiro checklist
INSERT INTO checklist_items (checklist_id, item, ordem) VALUES 
((SELECT id FROM checklists WHERE nome = 'Checklist de Qualidade'), 'Verificar padrões de acabamento', 1),
((SELECT id FROM checklists WHERE nome = 'Checklist de Qualidade'), 'Verificar medidas e dimensões', 2),
((SELECT id FROM checklists WHERE nome = 'Checklist de Qualidade'), 'Verificar funcionamento de produtos', 3),
((SELECT id FROM checklists WHERE nome = 'Checklist de Qualidade'), 'Verificar embalagem e rotulagem', 4),
((SELECT id FROM checklists WHERE nome = 'Checklist de Qualidade'), 'Verificar documentação técnica', 5);

-- ===========================================
-- ESTRUTURA DO CRM
-- ===========================================

-- Tabela para clientes
CREATE TABLE clientes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    telefone VARCHAR(20),
    empresa VARCHAR(255),
    cargo VARCHAR(100),
    endereco TEXT,
    cidade VARCHAR(100),
    estado VARCHAR(50),
    cep VARCHAR(10),
    website VARCHAR(255),
    observacoes TEXT,
    status VARCHAR(50) DEFAULT 'ativo', -- ativo, inativo, prospect
    origem VARCHAR(100), -- indicação, site, rede social, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para oportunidades de vendas
CREATE TABLE oportunidades (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    valor DECIMAL(12,2),
    moeda VARCHAR(3) DEFAULT 'BRL',
    status VARCHAR(50) DEFAULT 'prospecting', -- prospecting, qualificada, proposta, negociação, fechada, perdida
    probabilidade INTEGER DEFAULT 0, -- 0-100%
    data_fechamento_prevista DATE,
    data_fechamento_real DATE,
    fonte VARCHAR(100), -- site, indicação, cold call, etc.
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para atividades (tarefas, reuniões, ligações, etc.)
CREATE TABLE atividades (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
    oportunidade_id UUID REFERENCES oportunidades(id) ON DELETE SET NULL,
    tipo VARCHAR(50) NOT NULL, -- ligacao, email, reuniao, tarefa, nota
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_agendada TIMESTAMP WITH TIME ZONE,
    data_concluida TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'pendente', -- pendente, concluida, cancelada
    prioridade VARCHAR(20) DEFAULT 'media', -- baixa, media, alta
    resultado TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para produtos/serviços
CREATE TABLE produtos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(100),
    preco DECIMAL(12,2),
    moeda VARCHAR(3) DEFAULT 'BRL',
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para itens das oportunidades (produtos/serviços)
CREATE TABLE oportunidade_itens (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    oportunidade_id UUID REFERENCES oportunidades(id) ON DELETE CASCADE,
    produto_id UUID REFERENCES produtos(id) ON DELETE CASCADE,
    quantidade INTEGER DEFAULT 1,
    preco_unitario DECIMAL(12,2),
    desconto DECIMAL(5,2) DEFAULT 0, -- percentual
    total DECIMAL(12,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS para as novas tabelas
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE oportunidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE atividades ENABLE ROW LEVEL SECURITY;
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE oportunidade_itens ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso para as novas tabelas
CREATE POLICY "Permitir acesso público" ON clientes FOR ALL USING (true);
CREATE POLICY "Permitir acesso público" ON oportunidades FOR ALL USING (true);
CREATE POLICY "Permitir acesso público" ON atividades FOR ALL USING (true);
CREATE POLICY "Permitir acesso público" ON produtos FOR ALL USING (true);
CREATE POLICY "Permitir acesso público" ON oportunidade_itens FOR ALL USING (true);

-- Inserir dados de exemplo para o CRM
INSERT INTO clientes (nome, email, telefone, empresa, cargo, status, origem) VALUES 
('João Silva', 'joao@empresa.com', '(11) 99999-9999', 'Tech Solutions', 'CEO', 'ativo', 'site'),
('Maria Santos', 'maria@startup.com', '(11) 88888-8888', 'StartupXYZ', 'Diretora', 'prospect', 'indicação'),
('Pedro Costa', 'pedro@consultoria.com', '(11) 77777-7777', 'Consultoria ABC', 'Sócio', 'ativo', 'rede social');

INSERT INTO produtos (nome, descricao, categoria, preco) VALUES 
('Consultoria Estratégica', 'Consultoria em estratégia empresarial', 'Consultoria', 5000.00),
('Desenvolvimento de Software', 'Desenvolvimento de aplicações web', 'Desenvolvimento', 15000.00),
('Treinamento Técnico', 'Treinamento em tecnologias', 'Educação', 2000.00);

INSERT INTO oportunidades (cliente_id, titulo, descricao, valor, status, probabilidade, data_fechamento_prevista, fonte) VALUES 
((SELECT id FROM clientes WHERE nome = 'João Silva'), 'Projeto de Consultoria', 'Consultoria para digitalização da empresa', 5000.00, 'proposta', 70, '2024-02-15', 'site'),
((SELECT id FROM clientes WHERE nome = 'Maria Santos'), 'Desenvolvimento de App', 'Desenvolvimento de aplicativo mobile', 15000.00, 'negociação', 50, '2024-03-01', 'indicação'),
((SELECT id FROM clientes WHERE nome = 'Pedro Costa'), 'Treinamento de Equipe', 'Treinamento em metodologias ágeis', 2000.00, 'qualificada', 80, '2024-01-30', 'rede social');

INSERT INTO atividades (cliente_id, oportunidade_id, tipo, titulo, descricao, data_agendada, status, prioridade) VALUES 
((SELECT id FROM clientes WHERE nome = 'João Silva'), (SELECT id FROM oportunidades WHERE titulo = 'Projeto de Consultoria'), 'reuniao', 'Reunião de apresentação', 'Apresentar proposta de consultoria', '2024-01-15 14:00:00', 'concluida', 'alta'),
((SELECT id FROM clientes WHERE nome = 'Maria Santos'), (SELECT id FROM oportunidades WHERE titulo = 'Desenvolvimento de App'), 'ligacao', 'Follow-up da proposta', 'Ligar para esclarecer dúvidas sobre o projeto', '2024-01-20 10:00:00', 'pendente', 'media'),
((SELECT id FROM clientes WHERE nome = 'Pedro Costa'), (SELECT id FROM oportunidades WHERE titulo = 'Treinamento de Equipe'), 'email', 'Envio de proposta', 'Enviar proposta detalhada do treinamento', '2024-01-18 09:00:00', 'concluida', 'alta');

