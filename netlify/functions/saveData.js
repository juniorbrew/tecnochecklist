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

        // Simular salvamento (sem Supabase por enquanto)
        const novoId = Math.floor(Math.random() * 1000) + 1;
        const itemSalvo = { ...dados, id: novoId };

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                success: true, 
                message: 'Dados salvos com sucesso',
                data: itemSalvo
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