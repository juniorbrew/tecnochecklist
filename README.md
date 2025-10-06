# Tecno-Checklist

Sistema de checklist técnico desenvolvido como PWA (Progressive Web App) para uso em dispositivos móveis e desktop.

## 🚀 Características

- **PWA (Progressive Web App)** - Instalável em dispositivos móveis
- **Responsivo** - Funciona em qualquer dispositivo
- **Offline** - Funciona sem conexão com internet
- **Sincronização** - Dados sincronizados com Supabase
- **Exportação** - Geração de relatórios em PDF

## 📱 Como Usar

### Instalação Local
1. Clone o repositório
2. Abra o arquivo `index.html` no navegador
3. Para desenvolvimento, use um servidor local (Live Server, Python, etc.)

### Instalação como PWA
1. Acesse o site em um dispositivo móvel
2. Adicione à tela inicial quando solicitado
3. Use como aplicativo nativo

## 🛠️ Configuração

### Supabase (Banco de Dados)
1. Crie um projeto no [Supabase](https://supabase.com)
2. Configure as tabelas necessárias
3. Atualize o arquivo `config.js` com suas credenciais:

```javascript
const SUPABASE_CONFIG = {
    url: 'https://seu-projeto.supabase.co',
    anonKey: 'sua-chave-anonima-aqui'
};
```

## 🌐 Hospedagem

### Netlify (Recomendado)
1. Conecte seu repositório GitHub ao Netlify
2. Configure as variáveis de ambiente do Supabase
3. Deploy automático!

### Vercel
1. Conecte seu repositório
2. Configure as variáveis de ambiente
3. Deploy instantâneo

### GitHub Pages
1. Ative GitHub Pages no repositório
2. Selecione a branch main
3. Site online automaticamente

## 📋 Funcionalidades

- ✅ **Checklist Dinâmico** - Criação e edição de checklists
- 📊 **Relatórios** - Geração de relatórios em PDF
- 🔄 **Sincronização** - Dados sincronizados na nuvem
- 📱 **PWA** - Instalável como app nativo
- 🌐 **Offline** - Funciona sem internet
- 🎨 **Interface Moderna** - Design responsivo e intuitivo

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Supabase (BaaS)
- **PWA**: Service Worker, Manifest
- **Hospedagem**: Netlify/Vercel/GitHub Pages

## 📁 Estrutura do Projeto

```
├── index.html          # Aplicação principal
├── config.js           # Configuração do Supabase
├── api.js             # API do Supabase
├── sw.js              # Service Worker
├── manifest.json      # Manifesto PWA
├── browserconfig.xml  # Configuração do browser
├── netlify.toml       # Configuração do Netlify
└── package.json       # Dependências
```

## 🚀 Deploy Rápido

1. **Configure o Supabase** no arquivo `config.js`
2. **Faça commit** das alterações
3. **Conecte ao Netlify** - deploy automático!

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para facilitar checklists técnicos**
