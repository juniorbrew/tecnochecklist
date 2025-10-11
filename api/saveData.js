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
        console.log('[saveData] Método:', req.method);
        console.log('[saveData] Body:', req.body);
        
        // Verificar se é método POST
        if (req.method !== 'POST') {
            console.error('[saveData] Método incorreto:', req.method);
            return res.status(405).json({ error: 'Método não permitido. Use POST.' });
        }

        const { tabela, dados } = req.body;
        
        console.log('[saveData] Tabela:', tabela);
        console.log('[saveData] Dados:', JSON.stringify(dados));
        
        if (!tabela || !dados) {
            console.error('[saveData] Parâmetros faltando:', { tabela: !!tabela, dados: !!dados });
            return res.status(400).json({ error: 'Parâmetros tabela e dados são obrigatórios' });
        }

        // Salvar no Supabase
        console.log('[saveData] Tentando salvar na tabela:', tabela);
        
        const { data: resultado, error } = await supabase
            .from(tabela)
            .insert([dados])
            .select();
            
        console.log('[saveData] Resultado Supabase:', { success: !!resultado, error: error?.message });

        if (error) {
            console.error('[saveData] Erro Supabase detalhado:', JSON.stringify(error));
            return res.status(500).json({ 
                error: 'Erro ao salvar dados no banco',
                details: error.message 
            });
        }

        console.log('[saveData] Sucesso! Dados salvos:', resultado[0]?.id);
        return res.status(200).json({ 
            success: true, 
            message: 'Dados salvos com sucesso',
            data: resultado[0]
        });

    } catch (error) {
        console.error('[saveData] Erro exceção:', error.message, error.stack);
        return res.status(500).json({ 
            error: 'Erro interno do servidor',
            details: error.message 
        });
    }
}
