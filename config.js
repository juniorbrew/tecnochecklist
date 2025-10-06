// Configuração da API Supabase
// Substitua estas URLs pelas suas do projeto Supabase

const SUPABASE_CONFIG = {
    url: 'https://seu-projeto.supabase.co', // Substitua pela sua URL
    anonKey: 'sua-chave-anonima-aqui' // Substitua pela sua chave anônima
};

// Configuração do domínio
const DOMAIN_CONFIG = {
    production: 'https://seudominio.com.br', // Substitua pelo seu domínio
    development: 'http://localhost:3000'
};

// Exportar configurações
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SUPABASE_CONFIG, DOMAIN_CONFIG };
} else {
    window.SUPABASE_CONFIG = SUPABASE_CONFIG;
    window.DOMAIN_CONFIG = DOMAIN_CONFIG;
}
