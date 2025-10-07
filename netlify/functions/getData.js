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

        // Simular dados para teste (sem Supabase por enquanto)
        let dados = [];
        
        switch (tabela) {
            case 'clientes':
                dados = [
                    { id: 1, nome: 'Cliente Teste', email: 'teste@email.com', telefone: '11999999999' }
                ];
                break;
            case 'tecnicos':
                dados = [
                    { id: 1, nome: 'Técnico Teste', especialidade: 'Eletricista' }
                ];
                break;
            case 'tipos_tarefa':
                dados = [
                    { id: 1, nome: 'Manutenção', descricao: 'Manutenção preventiva' }
                ];
                break;
            case 'tarefas':
                dados = [
                    { id: 1, titulo: 'Tarefa Teste', descricao: 'Descrição da tarefa' }
                ];
                break;
            default:
                dados = [];
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(dados)
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