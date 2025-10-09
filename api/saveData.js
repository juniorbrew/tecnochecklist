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
        console.log('Método:', req.method);
        console.log('Body:', req.body);
        
        // Verificar se é método POST
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Método não permitido. Use POST.' });
        }

        const { tabela, dados } = req.body;
        
        console.log('Tabela:', tabela);
        console.log('Dados:', dados);
        
        if (!tabela || !dados) {
            return res.status(400).json({ error: 'Parâmetros tabela e dados são obrigatórios' });
        }

        // Salvar no Supabase
        console.log('Tentando salvar na tabela:', tabela);
        console.log('Dados a serem salvos:', dados);
        
        const { data: resultado, error } = await supabase
            .from(tabela)
            .insert([dados])
            .select();
            
        console.log('Resultado Supabase:', { data: resultado, error });

        if (error) {
            console.error('Erro Supabase:', error);
            return res.status(500).json({ error: 'Erro ao salvar dados no banco' });
        }

        return res.status(200).json({ 
            success: true, 
            message: 'Dados salvos com sucesso',
            data: resultado[0]
        });

    } catch (error) {
        console.error('Erro:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}
