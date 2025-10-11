const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ftptqjolbzpdqoxydgkj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0cHRxam9sYnpwZHFveHlkZ2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5NjA1NDAsImV4cCI6MjA3NTUzNjU0MH0.dDiK4JqFbhTTXGvAYjfvvXXVepLMgujpYXQyUhOf4s4';

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
        const data = JSON.parse(event.body);
        const { tabela, dados } = data;
        
        if (!tabela || !dados) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Parâmetros tabela e dados são obrigatórios' })
            };
        }

        // Salvar no Supabase
        const { data: resultado, error } = await supabase
            .from(tabela)
            .insert([dados])
            .select();

        if (error) {
            console.error('Erro Supabase:', error);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Erro ao salvar dados no banco' })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                success: true, 
                message: 'Dados salvos com sucesso',
                data: resultado[0]
            })
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