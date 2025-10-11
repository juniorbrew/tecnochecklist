// API para comunicação com Supabase via Netlify Functions
class TecnoChecklistAPI {
    constructor() {
        this.baseUrl = window.location.origin;
        this.headers = {
            'Content-Type': 'application/json'
        };
    }

    // Método genérico para fazer requisições às funções serverless
    async request(functionName, options = {}) {
        // Usar /api/ para Vercel em vez de /.netlify/functions/
        const url = `${this.baseUrl}/api/${functionName}`;
        const config = {
            headers: this.headers,
            ...options
        };

        try {
            console.log('[API] Chamando:', url);
            const response = await fetch(url, config);
            console.log('[API] Status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('[API] Erro na resposta:', errorText);
                throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
            }
            
            const data = await response.json();
            console.log('[API] Resposta recebida:', data);
            return data;
        } catch (error) {
            console.error('[API] Erro na requisição:', error);
            throw error;
        }
    }

    // USUÁRIOS
    async getUsuarios() {
        const response = await this.request('getData?tabela=usuarios');
        return response || [];
    }

    async createUsuario(usuario) {
        const response = await this.request('saveData', {
            method: 'POST',
            body: JSON.stringify({
                tabela: 'usuarios',
                dados: usuario
            })
        });
        return response.data;
    }

    async updateUsuario(id, usuario) {
        const response = await this.request('updateData', {
            method: 'PUT',
            body: JSON.stringify({
                tabela: 'usuarios',
                id: id,
                dados: usuario
            })
        });
        return response.data;
    }

    async deleteUsuario(id) {
        const response = await this.request(`deleteData?tabela=usuarios&id=${id}`, {
            method: 'DELETE'
        });
        return response.data;
    }

    async loginUsuario(usuario, senha) {
        const response = await this.request(`getData?tabela=usuarios&filtros=${encodeURIComponent(JSON.stringify({usuario: usuario, senha: senha, ativo: true}))}`);
        const usuarios = response || [];
        return usuarios.length > 0 ? usuarios[0] : null;
    }

    // CLIENTES
    async getClientes() {
        const response = await this.request('getData?tabela=clientes&ordenacao=' + encodeURIComponent(JSON.stringify({campo: 'created_at', ascending: false})));
        return response || [];
    }

    async createCliente(cliente) {
        const response = await this.request('saveData', {
            method: 'POST',
            body: JSON.stringify({
                tabela: 'clientes',
                dados: cliente
            })
        });
        return response.data;
    }

    async updateCliente(id, cliente) {
        const response = await this.request('updateData', {
            method: 'PUT',
            body: JSON.stringify({
                tabela: 'clientes',
                id: id,
                dados: cliente
            })
        });
        return response.data;
    }

    async deleteCliente(id) {
        const response = await this.request(`deleteData?tabela=clientes&id=${id}`, {
            method: 'DELETE'
        });
        return response.data;
    }

    // TÉCNICOS
    async getTecnicos() {
        const response = await this.request('getData?tabela=tecnicos&ordenacao=' + encodeURIComponent(JSON.stringify({campo: 'created_at', ascending: false})));
        return response || [];
    }

    async createTecnico(tecnico) {
        const response = await this.request('saveData', {
            method: 'POST',
            body: JSON.stringify({
                tabela: 'tecnicos',
                dados: tecnico
            })
        });
        return response.data;
    }

    async updateTecnico(id, tecnico) {
        const response = await this.request('updateData', {
            method: 'PUT',
            body: JSON.stringify({
                tabela: 'tecnicos',
                id: id,
                dados: tecnico
            })
        });
        return response.data;
    }

    async deleteTecnico(id) {
        const response = await this.request(`deleteData?tabela=tecnicos&id=${id}`, {
            method: 'DELETE'
        });
        return response.data;
    }

    // TIPOS DE TAREFA
    async getTiposTarefa() {
        const response = await this.request('getData?tabela=tipos_tarefa&ordenacao=' + encodeURIComponent(JSON.stringify({campo: 'created_at', ascending: false})));
        return response || [];
    }

    async createTipoTarefa(tipo) {
        const response = await this.request('saveData', {
            method: 'POST',
            body: JSON.stringify({
                tabela: 'tipos_tarefa',
                dados: tipo
            })
        });
        return response.data;
    }

    async updateTipoTarefa(id, tipo) {
        const response = await this.request('updateData', {
            method: 'PUT',
            body: JSON.stringify({
                tabela: 'tipos_tarefa',
                id: id,
                dados: tipo
            })
        });
        return response.data;
    }

    async deleteTipoTarefa(id) {
        const response = await this.request(`deleteData?tabela=tipos_tarefa&id=${id}`, {
            method: 'DELETE'
        });
        return response.data;
    }

    // TAREFAS
    async getTarefas() {
        const response = await this.request('getData?tabela=tarefas&ordenacao=' + encodeURIComponent(JSON.stringify({campo: 'created_at', ascending: false})));
        return response || [];
    }

    async createTarefa(tarefa) {
        const response = await this.request('saveData', {
            method: 'POST',
            body: JSON.stringify({
                tabela: 'tarefas',
                dados: tarefa
            })
        });
        return response.data;
    }

    async updateTarefa(id, tarefa) {
        const response = await this.request('updateData', {
            method: 'PUT',
            body: JSON.stringify({
                tabela: 'tarefas',
                id: id,
                dados: tarefa
            })
        });
        return response.data;
    }

    async deleteTarefa(id) {
        const response = await this.request(`deleteData?tabela=tarefas&id=${id}`, {
            method: 'DELETE'
        });
        return response.data;
    }

    // ===========================================
    // MÉTODOS DO CRM
    // ===========================================

    // PRODUTOS
    async getProdutos() {
        const response = await this.request('getData?tabela=produtos&ordenacao=' + encodeURIComponent(JSON.stringify({campo: 'created_at', ascending: false})));
        return response || [];
    }

    async createProduto(produto) {
        const response = await this.request('saveData', {
            method: 'POST',
            body: JSON.stringify({
                tabela: 'produtos',
                dados: produto
            })
        });
        return response.data;
    }

    async updateProduto(id, produto) {
        const response = await this.request('updateData', {
            method: 'PUT',
            body: JSON.stringify({
                tabela: 'produtos',
                id: id,
                dados: produto
            })
        });
        return response.data;
    }

    async deleteProduto(id) {
        const response = await this.request(`deleteData?tabela=produtos&id=${id}`, {
            method: 'DELETE'
        });
        return response.data;
    }

    // OPORTUNIDADES
    async getOportunidades() {
        const response = await this.request('getData?tabela=oportunidades&ordenacao=' + encodeURIComponent(JSON.stringify({campo: 'created_at', ascending: false})));
        return response || [];
    }

    async createOportunidade(oportunidade) {
        const response = await this.request('saveData', {
            method: 'POST',
            body: JSON.stringify({
                tabela: 'oportunidades',
                dados: oportunidade
            })
        });
        return response.data;
    }

    async updateOportunidade(id, oportunidade) {
        const response = await this.request('updateData', {
            method: 'PUT',
            body: JSON.stringify({
                tabela: 'oportunidades',
                id: id,
                dados: oportunidade
            })
        });
        return response.data;
    }

    async deleteOportunidade(id) {
        const response = await this.request(`deleteData?tabela=oportunidades&id=${id}`, {
            method: 'DELETE'
        });
        return response.data;
    }

    // ATIVIDADES
    async getAtividades() {
        const response = await this.request('getData?tabela=atividades&ordenacao=' + encodeURIComponent(JSON.stringify({campo: 'data_agendada', ascending: true})));
        return response || [];
    }

    async createAtividade(atividade) {
        const response = await this.request('saveData', {
            method: 'POST',
            body: JSON.stringify({
                tabela: 'atividades',
                dados: atividade
            })
        });
        return response.data;
    }

    async updateAtividade(id, atividade) {
        const response = await this.request('updateData', {
            method: 'PUT',
            body: JSON.stringify({
                tabela: 'atividades',
                id: id,
                dados: atividade
            })
        });
        return response.data;
    }

    async deleteAtividade(id) {
        const response = await this.request(`deleteData?tabela=atividades&id=${id}`, {
            method: 'DELETE'
        });
        return response.data;
    }

    // OPORTUNIDADE ITENS
    async getOportunidadeItens(oportunidadeId) {
        const response = await this.request(`getData?tabela=oportunidade_itens&filtros=${encodeURIComponent(JSON.stringify({oportunidade_id: oportunidadeId}))}`);
        return response || [];
    }

    async createOportunidadeItem(item) {
        const response = await this.request('saveData', {
            method: 'POST',
            body: JSON.stringify({
                tabela: 'oportunidade_itens',
                dados: item
            })
        });
        return response.data;
    }

    async updateOportunidadeItem(id, item) {
        const response = await this.request('updateData', {
            method: 'PUT',
            body: JSON.stringify({
                tabela: 'oportunidade_itens',
                id: id,
                dados: item
            })
        });
        return response.data;
    }

    async deleteOportunidadeItem(id) {
        const response = await this.request(`deleteData?tabela=oportunidade_itens&id=${id}`, {
            method: 'DELETE'
        });
        return response.data;
    }

    // MÉTODOS DE RELATÓRIOS E DASHBOARD
    async getDashboardData() {
        try {
            const [clientes, oportunidades, atividades] = await Promise.all([
                this.getClientes(),
                this.getOportunidades(),
                this.getAtividades()
            ]);

            const totalClientes = clientes.length;
            const clientesAtivos = clientes.filter(c => c.status === 'ativo').length;
            const oportunidadesAbertas = oportunidades.filter(o => !['fechada', 'perdida'].includes(o.status)).length;
            const valorTotalOportunidades = oportunidades
                .filter(o => !['fechada', 'perdida'].includes(o.status))
                .reduce((total, o) => total + (parseFloat(o.valor) || 0), 0);
            const atividadesPendentes = atividades.filter(a => a.status === 'pendente').length;

            return {
                totalClientes,
                clientesAtivos,
                oportunidadesAbertas,
                valorTotalOportunidades,
                atividadesPendentes,
                clientes,
                oportunidades,
                atividades
            };
        } catch (error) {
            console.error('Erro ao buscar dados do dashboard:', error);
            return {
                totalClientes: 0,
                clientesAtivos: 0,
                oportunidadesAbertas: 0,
                valorTotalOportunidades: 0,
                atividadesPendentes: 0,
                clientes: [],
                oportunidades: [],
                atividades: []
            };
        }
    }
}

// Instância global da API
window.api = new TecnoChecklistAPI();

