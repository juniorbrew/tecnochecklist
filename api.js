// API para comunicação com Supabase
class TecnoChecklistAPI {
    constructor() {
        this.supabaseUrl = SUPABASE_CONFIG.url;
        this.supabaseKey = SUPABASE_CONFIG.anonKey;
        this.headers = {
            'Content-Type': 'application/json',
            'apikey': this.supabaseKey,
            'Authorization': `Bearer ${this.supabaseKey}`
        };
    }

    // Método genérico para fazer requisições
    async request(endpoint, options = {}) {
        const url = `${this.supabaseUrl}/rest/v1/${endpoint}`;
        const config = {
            headers: this.headers,
            ...options
        };

        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // USUÁRIOS
    async getUsuarios() {
        return await this.request('usuarios?select=*');
    }

    async createUsuario(usuario) {
        return await this.request('usuarios', {
            method: 'POST',
            body: JSON.stringify(usuario)
        });
    }

    async updateUsuario(id, usuario) {
        return await this.request(`usuarios?id=eq.${id}`, {
            method: 'PATCH',
            body: JSON.stringify(usuario)
        });
    }

    async deleteUsuario(id) {
        return await this.request(`usuarios?id=eq.${id}`, {
            method: 'DELETE'
        });
    }

    async loginUsuario(usuario, senha) {
        const usuarios = await this.request(`usuarios?usuario=eq.${usuario}&senha=eq.${senha}&ativo=eq.true`);
        return usuarios.length > 0 ? usuarios[0] : null;
    }

    // CLIENTES
    async getClientes() {
        return await this.request('clientes?select=*&order=created_at.desc');
    }

    async createCliente(cliente) {
        return await this.request('clientes', {
            method: 'POST',
            body: JSON.stringify(cliente)
        });
    }

    async updateCliente(id, cliente) {
        return await this.request(`clientes?id=eq.${id}`, {
            method: 'PATCH',
            body: JSON.stringify(cliente)
        });
    }

    async deleteCliente(id) {
        return await this.request(`clientes?id=eq.${id}`, {
            method: 'DELETE'
        });
    }

    // TÉCNICOS
    async getTecnicos() {
        return await this.request('tecnicos?select=*&order=created_at.desc');
    }

    async createTecnico(tecnico) {
        return await this.request('tecnicos', {
            method: 'POST',
            body: JSON.stringify(tecnico)
        });
    }

    async updateTecnico(id, tecnico) {
        return await this.request(`tecnicos?id=eq.${id}`, {
            method: 'PATCH',
            body: JSON.stringify(tecnico)
        });
    }

    async deleteTecnico(id) {
        return await this.request(`tecnicos?id=eq.${id}`, {
            method: 'DELETE'
        });
    }

    // TIPOS DE TAREFA
    async getTiposTarefa() {
        return await this.request('tipos_tarefa?select=*&order=created_at.desc');
    }

    async createTipoTarefa(tipo) {
        return await this.request('tipos_tarefa', {
            method: 'POST',
            body: JSON.stringify(tipo)
        });
    }

    async updateTipoTarefa(id, tipo) {
        return await this.request(`tipos_tarefa?id=eq.${id}`, {
            method: 'PATCH',
            body: JSON.stringify(tipo)
        });
    }

    async deleteTipoTarefa(id) {
        return await this.request(`tipos_tarefa?id=eq.${id}`, {
            method: 'DELETE'
        });
    }

    // TAREFAS
    async getTarefas() {
        return await this.request(`
            tarefas?select=*,
            clientes(razao_social),
            tecnicos(nome),
            tipos_tarefa(tipo)
            &order=created_at.desc
        `);
    }

    async createTarefa(tarefa) {
        return await this.request('tarefas', {
            method: 'POST',
            body: JSON.stringify(tarefa)
        });
    }

    async updateTarefa(id, tarefa) {
        return await this.request(`tarefas?id=eq.${id}`, {
            method: 'PATCH',
            body: JSON.stringify(tarefa)
        });
    }

    async deleteTarefa(id) {
        return await this.request(`tarefas?id=eq.${id}`, {
            method: 'DELETE'
        });
    }
}

// Instância global da API
window.api = new TecnoChecklistAPI();

