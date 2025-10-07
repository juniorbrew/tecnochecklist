const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wznupigcxxecuahihqow.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6bnVwaWdjeHhlY3VhaGlocW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTc3NjYsImV4cCI6MjA3NTM3Mzc2Nn0.fIFs3GOIvMBVn2wyYmXuEoh5lXoRkn2vFkzmLfNYy44';

const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
    // Configurar CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    };

    // Responder a requisições OPTIONS (CORS preflight)
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        const { tabela } = event.queryStringParameters || {};
        
        if (!tabela) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Parâmetro tabela é obrigatório' })
            };
        }

        // Buscar dados do Supabase
        const { data, error } = await supabase
            .from(tabela)
            .select('*');

        if (error) {
            console.error('Erro Supabase:', error);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Erro ao buscar dados do banco' })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data || [])
        };

    } catch (error) {
        console.error('Erro:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Erro interno do servidor' })
        };
    }
};