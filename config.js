// Configuração da API Supabase
// IMPORTANTE: Substitua estas URLs pelas suas do projeto Supabase

const SUPABASE_CONFIG = {
    url: 'https://wznupigcxxecuahihqow.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6bnVwaWdjeHhlY3VhaGlocW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTc3NjYsImV4cCI6MjA3NTM3Mzc2Nn0.fIFs3GOIvMBVn2wyYmXuEoh5lXoRkn2vFkzmLfNYy44'
};

// Configuração do domínio
const DOMAIN_CONFIG = {
    production: 'https://seu-site.netlify.app', // Substitua pelo seu domínio do Netlify
    development: 'http://localhost:3000'
};

// Exportar configurações
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SUPABASE_CONFIG, DOMAIN_CONFIG };
} else {
    window.SUPABASE_CONFIG = SUPABASE_CONFIG;
    window.DOMAIN_CONFIG = DOMAIN_CONFIG;
}
