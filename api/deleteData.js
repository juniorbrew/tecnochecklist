const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wznupigcxxecuahihqow.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6bnVwaWdjeHhlY3VhaGlocW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTc3NjYsImV4cCI6MjA3NTM3Mzc2Nn0.fIFs3GOIvMBVn2wyYmXuEoh5lXoRkn2vFkzmLfNYy44';

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
