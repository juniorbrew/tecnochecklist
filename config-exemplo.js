// EXEMPLO DE CONFIGURAÇÃO - Substitua pelos seus valores reais
// Copie este arquivo para config.js e atualize com suas credenciais

const SUPABASE_CONFIG = {
    // Substitua pela URL do seu projeto Supabase
    url: 'https://abcdefghijklmnop.supabase.co', // EXEMPLO - substitua pela sua URL
    
    // Substitua pela sua chave anônima do Supabase
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY5ODc2MDAwMCwiZXhwIjoyMDE0MzM2MDAwfQ.exemplo-de-chave-anonima' // EXEMPLO - substitua pela sua chave
};

// Configuração do domínio
const DOMAIN_CONFIG = {
    production: 'https://seu-projeto.netlify.app', // Substitua pelo seu domínio do Netlify
    development: 'http://localhost:8888' // Para desenvolvimento local
};

// Exportar configurações
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SUPABASE_CONFIG, DOMAIN_CONFIG };
} else {
    window.SUPABASE_CONFIG = SUPABASE_CONFIG;
    window.DOMAIN_CONFIG = DOMAIN_CONFIG;
}

// ========================================
// INSTRUÇÕES PARA CONFIGURAR:
// ========================================

/*
1. CRIAR PROJETO NO SUPABASE:
   - Acesse https://supabase.com
   - Crie um novo projeto
   - Escolha região: South America (São Paulo)
   - Aguarde a criação (2-3 minutos)

2. OBTER CREDENCIAIS:
   - No painel do Supabase, vá em Settings → API
   - Copie a URL do projeto
   - Copie a anon key (chave pública)

3. EXECUTAR SCRIPT SQL:
   - Vá em SQL Editor → New query
   - Cole e execute o script do arquivo SETUP-SUPABASE-COMPLETO.md
   - Verifique se as 8 tabelas foram criadas

4. CONFIGURAR NETLIFY:
   - Adicione as variáveis de ambiente:
     SUPABASE_URL = https://seu-projeto.supabase.co
     SUPABASE_ANON_KEY = sua-chave-anonima-aqui

5. ATUALIZAR ESTE ARQUIVO:
   - Substitua as URLs e chaves pelos seus valores reais
   - Salve como config.js
   - Faça commit e push

6. TESTAR:
   - Acesse seu site no Netlify
   - Teste criar, editar e deletar registros
   - Verifique se os dados aparecem no Supabase
*/


