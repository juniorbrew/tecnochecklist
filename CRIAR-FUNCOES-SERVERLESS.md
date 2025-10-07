# 🚀 Criar Funções Serverless - Solução Completa

## 🎯 **Problema: "Não consigo ver Functions na barra lateral"**

**Isso significa que as funções serverless não foram criadas corretamente!**

---

## 📋 **ETAPA 1: Verificar Estrutura de Arquivos**

### **1.1 Verificar se a Pasta Existe**
1. **Na raiz do seu projeto, verifique se existe:**
   - Pasta `netlify/`
   - Dentro dela, pasta `functions/`

### **1.2 Verificar se os Arquivos Existem**
1. **Dentro de `netlify/functions/`, verifique se existem:**
   - `saveData.js`
   - `getData.js`
   - `updateData.js`
   - `deleteData.js`
   - `package.json`

### **1.3 Se os Arquivos NÃO Existem**
**Solução:**
1. **Criar a pasta `netlify/functions/`**
2. **Criar os arquivos das funções**
3. **Fazer commit e push**

---

## 🔧 **ETAPA 2: Criar Estrutura de Pastas**

### **2.1 Criar Pasta `netlify`**
1. **Na raiz do projeto, criar pasta `netlify`**
2. **Dentro dela, criar pasta `functions`**

### **2.2 Estrutura Final:**
```
infra-app/
├── netlify/
│   ├── functions/
│   │   ├── saveData.js
│   │   ├── getData.js
│   │   ├── updateData.js
│   │   ├── deleteData.js
│   │   └── package.json
├── netlify.toml
├── index.html
└── config.js
```

---

## 🛠️ **ETAPA 3: Criar Arquivos das Funções**

### **3.1 Arquivo `netlify/functions/saveData.js`**
```javascript
// Função serverless do Netlify para salvar dados no Supabase
const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = 'https://wznupigcxxecuahihqow.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6bnVwaWdjeHhlY3VhaGlocW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTc3NjYsImV4cCI6MjA3NTM3Mzc2Nn0.fIFs3GOIvMBVn2wyYmXuEoh5lXoRkn2vFkzmLfNYy44';

const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
    // Configurar CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Responder a requisições OPTIONS (preflight)
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        // Verificar método HTTP
        if (event.httpMethod !== 'POST') {
            return {
                statusCode: 405,
                headers,
                body: JSON.stringify({ error: 'Método não permitido' })
            };
        }

        // Parse do body
        const data = JSON.parse(event.body || '{}');
        
        // Validar dados obrigatórios
        if (!data.tabela || !data.dados) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ 
                    error: 'Dados obrigatórios: tabela e dados' 
                })
            };
        }

        // Inserir dados no Supabase
        const { data: result, error } = await supabase
            .from(data.tabela)
            .insert([data.dados]);

        if (error) {
            console.error('Erro Supabase:', error);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                    error: 'Erro ao salvar dados',
                    details: error.message 
                })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                success: true,
                data: result,
                message: 'Dados salvos com sucesso'
            })
        };

    } catch (error) {
        console.error('Erro na função:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Erro interno do servidor',
                details: error.message 
            })
        };
    }
};
```

### **3.2 Arquivo `netlify/functions/getData.js`**
```javascript
// Função serverless do Netlify para buscar dados do Supabase
const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = 'https://wznupigcxxecuahihqow.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6bnVwaWdjeHhlY3VhaGlocW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTc3NjYsImV4cCI6MjA3NTM3Mzc2Nn0.fIFs3GOIvMBVn2wyYmXuEoh5lXoRkn2vFkzmLfNYy44';

const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
    // Configurar CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Responder a requisições OPTIONS (preflight)
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        // Verificar método HTTP
        if (event.httpMethod !== 'GET') {
            return {
                statusCode: 405,
                headers,
                body: JSON.stringify({ error: 'Método não permitido' })
            };
        }

        // Obter parâmetros da query string
        const { tabela, filtros, ordenacao, limite } = event.queryStringParameters || {};

        // Validar tabela
        if (!tabela) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ 
                    error: 'Parâmetro obrigatório: tabela' 
                })
            };
        }

        // Construir query
        let query = supabase.from(tabela).select('*');

        // Aplicar filtros se fornecidos
        if (filtros) {
            try {
                const filtrosObj = JSON.parse(filtros);
                Object.entries(filtrosObj).forEach(([campo, valor]) => {
                    query = query.eq(campo, valor);
                });
            } catch (e) {
                console.warn('Erro ao parsear filtros:', e);
            }
        }

        // Aplicar ordenação se fornecida
        if (ordenacao) {
            try {
                const ordenacaoObj = JSON.parse(ordenacao);
                query = query.order(ordenacaoObj.campo, { ascending: ordenacaoObj.ascending !== false });
            } catch (e) {
                console.warn('Erro ao parsear ordenação:', e);
            }
        }

        // Aplicar limite se fornecido
        if (limite) {
            query = query.limit(parseInt(limite));
        }

        // Executar query
        const { data, error } = await query;

        if (error) {
            console.error('Erro Supabase:', error);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                    error: 'Erro ao buscar dados',
                    details: error.message 
                })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                success: true,
                data: data,
                count: data ? data.length : 0
            })
        };

    } catch (error) {
        console.error('Erro na função:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Erro interno do servidor',
                details: error.message 
            })
        };
    }
};
```

### **3.3 Arquivo `netlify/functions/updateData.js`**
```javascript
// Função serverless do Netlify para atualizar dados no Supabase
const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = 'https://wznupigcxxecuahihqow.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6bnVwaWdjeHhlY3VhaGlocW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTc3NjYsImV4cCI6MjA3NTM3Mzc2Nn0.fIFs3GOIvMBVn2wyYmXuEoh5lXoRkn2vFkzmLfNYy44';

const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
    // Configurar CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Responder a requisições OPTIONS (preflight)
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        // Verificar método HTTP
        if (event.httpMethod !== 'PUT') {
            return {
                statusCode: 405,
                headers,
                body: JSON.stringify({ error: 'Método não permitido' })
            };
        }

        // Parse do body
        const data = JSON.parse(event.body || '{}');
        
        // Validar dados obrigatórios
        if (!data.tabela || !data.id || !data.dados) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ 
                    error: 'Dados obrigatórios: tabela, id e dados' 
                })
            };
        }

        // Atualizar dados no Supabase
        const { data: result, error } = await supabase
            .from(data.tabela)
            .update(data.dados)
            .eq('id', data.id);

        if (error) {
            console.error('Erro Supabase:', error);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                    error: 'Erro ao atualizar dados',
                    details: error.message 
                })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                success: true,
                data: result,
                message: 'Dados atualizados com sucesso'
            })
        };

    } catch (error) {
        console.error('Erro na função:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Erro interno do servidor',
                details: error.message 
            })
        };
    }
};
```

### **3.4 Arquivo `netlify/functions/deleteData.js`**
```javascript
// Função serverless do Netlify para deletar dados do Supabase
const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = 'https://wznupigcxxecuahihqow.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6bnVwaWdjeHhlY3VhaGlocW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTc3NjYsImV4cCI6MjA3NTM3Mzc2Nn0.fIFs3GOIvMBVn2wyYmXuEoh5lXoRkn2vFkzmLfNYy44';

const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
    // Configurar CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Responder a requisições OPTIONS (preflight)
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        // Verificar método HTTP
        if (event.httpMethod !== 'DELETE') {
            return {
                statusCode: 405,
                headers,
                body: JSON.stringify({ error: 'Método não permitido' })
            };
        }

        // Obter parâmetros da query string
        const { tabela, id } = event.queryStringParameters || {};

        // Validar dados obrigatórios
        if (!tabela || !id) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ 
                    error: 'Parâmetros obrigatórios: tabela e id' 
                })
            };
        }

        // Deletar dados no Supabase
        const { data: result, error } = await supabase
            .from(tabela)
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Erro Supabase:', error);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                    error: 'Erro ao deletar dados',
                    details: error.message 
                })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                success: true,
                data: result,
                message: 'Dados deletados com sucesso'
            })
        };

    } catch (error) {
        console.error('Erro na função:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Erro interno do servidor',
                details: error.message 
            })
        };
    }
};
```

### **3.5 Arquivo `netlify/functions/package.json`**
```json
{
  "name": "netlify-functions",
  "version": "1.0.0",
  "description": "Funções serverless para Tecno-Checklist",
  "main": "index.js",
  "dependencies": {
    "@supabase/supabase-js": "^2.38.0"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "keywords": [
    "netlify",
    "functions",
    "supabase",
    "serverless"
  ],
  "author": "Tecno-Checklist Team"
}
```

---

## 🚀 **ETAPA 4: Fazer Commit e Push**

### **4.1 Adicionar Arquivos**
```bash
git add netlify/
git add netlify.toml
git add index.html
git add config.js
```

### **4.2 Fazer Commit**
```bash
git commit -m "Adicionar funções serverless e configurar Supabase"
```

### **4.3 Fazer Push**
```bash
git push
```

---

## 🧪 **ETAPA 5: Testar Deploy**

### **5.1 Aguardar Deploy**
1. **Aguarde o deploy automático no Netlify**
2. **Vá em "Functions" ou "Funções"**
3. **Deve mostrar as funções:**
   - `saveData`
   - `getData`
   - `updateData`
   - `deleteData`

### **5.2 Testar Função**
1. **Acesse:** `https://seu-site.netlify.app/.netlify/functions/getData?tabela=clientes`
2. **Deve retornar JSON, não HTML**

---

## ✅ **ETAPA 6: Verificar se Funcionou**

### **6.1 Verificar estrutura:**
- [ ] Pasta `netlify/` existe?
- [ ] Pasta `netlify/functions/` existe?
- [ ] Arquivos das funções existem?
- [ ] Arquivo `package.json` existe?

### **6.2 Verificar deploy:**
- [ ] Deploy foi bem-sucedido?
- [ ] Funções aparecem no Netlify?
- [ ] Funções retornam JSON?

### **6.3 Verificar integração:**
- [ ] Dados são salvos no Supabase?
- [ ] Dados aparecem no painel do Supabase?
- [ ] Sincronização funciona?

---

## 📞 **PRECISA DE MAIS AJUDA?**

**Me diga:**
1. **Consegue criar a pasta `netlify/functions/`?**
2. **Consegue criar os arquivos das funções?**
3. **Consegue fazer commit e push?**
4. **Qual erro aparece (se houver)?**

**Vou te ajudar a resolver!** 🚀


