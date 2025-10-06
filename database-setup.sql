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
