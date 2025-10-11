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
        console.log('[getData] Método:', req.method);
        console.log('[getData] Query:', req.query);
        
        const { tabela } = req.query;
        
        if (!tabela) {
            console.error('[getData] Tabela não especificada');
            return res.status(400).json({ error: 'Parâmetro tabela é obrigatório' });
        }

        console.log('[getData] Buscando dados da tabela:', tabela);

        // Buscar dados do Supabase
        const { data, error } = await supabase
            .from(tabela)
            .select('*');

        if (error) {
            console.error('[getData] Erro Supabase:', JSON.stringify(error));
            return res.status(500).json({ 
                error: 'Erro ao buscar dados do banco',
                details: error.message 
            });
        }

        console.log('[getData] Sucesso! Registros encontrados:', data?.length || 0);
        return res.status(200).json(data || []);

    } catch (error) {
        console.error('[getData] Erro exceção:', error.message, error.stack);
        return res.status(500).json({ 
            error: 'Erro interno do servidor',
            details: error.message 
        });
    }
}
