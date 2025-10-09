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
        // Verificar se é método DELETE
        if (req.method !== 'DELETE') {
            return res.status(405).json({ error: 'Método não permitido. Use DELETE.' });
        }

        const { tabela, id } = req.query;
        
        if (!tabela || !id) {
            return res.status(400).json({ error: 'Parâmetros tabela e id são obrigatórios' });
        }

        // Excluir do Supabase
        const { error } = await supabase
            .from(tabela)
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Erro Supabase:', error);
            return res.status(500).json({ error: 'Erro ao excluir dados do banco' });
        }

        return res.status(200).json({ 
            success: true, 
            message: 'Dados excluídos com sucesso'
        });

    } catch (error) {
        console.error('Erro:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}
