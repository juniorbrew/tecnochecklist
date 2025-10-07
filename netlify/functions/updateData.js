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
        const { tabela, id, dados } = data;
        
        if (!tabela || !id || !dados) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Parâmetros tabela, id e dados são obrigatórios' })
            };
        }

        // Simular atualização (sem Supabase por enquanto)
        const itemAtualizado = { ...dados, id: parseInt(id) };

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                success: true, 
                message: 'Dados atualizados com sucesso',
                data: itemAtualizado
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