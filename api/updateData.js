import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ftptqjolbzpdqoxydgkj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0cHRxam9sYnpwZHFveHlkZ2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5NjA1NDAsImV4cCI6MjA3NTUzNjU0MH0.dDiK4JqFbhTTXGvAYjfvvXXVepLMgujpYXQyUhOf4s4';

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        console.log('[updateData] Método:', req.method);
        console.log('[updateData] Body:', req.body);
        
        // Verificar se é método PUT
        if (req.method !== 'PUT') {
            console.error('[updateData] Método incorreto:', req.method);
            return res.status(405).json({ error: 'Método não permitido. Use PUT.' });
        }

        const { tabela, id, dados } = req.body;
        
        console.log('[updateData] Tabela:', tabela, 'ID:', id);
        
        if (!tabela || !id || !dados) {
            console.error('[updateData] Parâmetros faltando:', { tabela: !!tabela, id: !!id, dados: !!dados });
            return res.status(400).json({ error: 'Parâmetros tabela, id e dados são obrigatórios' });
        }

        console.log('[updateData] Tentando atualizar na tabela:', tabela);

        // Atualizar no Supabase
        const { data: resultado, error } = await supabase
            .from(tabela)
            .update(dados)
            .eq('id', id)
            .select();

        if (error) {
            console.error('[updateData] Erro Supabase:', JSON.stringify(error));
            return res.status(500).json({ 
                error: 'Erro ao atualizar dados no banco',
                details: error.message 
            });
        }

        console.log('[updateData] Sucesso! Dados atualizados:', resultado[0]?.id);
        return res.status(200).json({ 
            success: true, 
            message: 'Dados atualizados com sucesso',
            data: resultado[0]
        });

    } catch (error) {
        console.error('[updateData] Erro exceção:', error.message, error.stack);
        return res.status(500).json({ 
            error: 'Erro interno do servidor',
            details: error.message 
        });
    }
}
