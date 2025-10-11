# Correções Implementadas - Cadastro de Tarefas

## Data: 11 de Outubro de 2025

## Problema Original
As tarefas não estavam sendo salvas no banco de dados Supabase. O erro relatado era: `{"error":"requested path is invalid"}`

## ⚠️ CORREÇÃO CRÍTICA ADICIONAL
**Problema principal descoberto:** O `api.js` estava chamando `/.netlify/functions/` mas o site está hospedado na **Vercel**, que usa `/api/`!

## Causas Identificadas

### 1. **URL INCORRETA DA API (CAUSA RAIZ)** ⭐
- O `api.js` estava configurado para Netlify: `/.netlify/functions/`
- Site está na Vercel, que usa: `/api/`
- Resultado: todas as requisições falhavam com "requested path is invalid"

### 2. Bug na Lógica de Salvamento
- A função `handleTarefaSubmit` criava tarefas com `created_at: new Date().toISOString()`
- A função `saveData()` verificava se `tarefa.created_at` existia para decidir entre criar (POST) ou atualizar (PUT)
- Como todas as tarefas novas tinham `created_at`, o sistema sempre tentava ATUALIZAR em vez de CRIAR
- Resultado: falha ao salvar porque a tarefa não existia no banco

### 3. Credenciais do Supabase Inconsistentes
- `api/saveData.js` (Vercel): usava URL `ftptqjolbzpdqoxydgkj`
- `config.js` e funções Netlify: usavam URL `wznupigcxxecuahihqow`
- Inconsistência causava falhas de autenticação

### 4. Formato de Resposta da API getData
- Funções na pasta `/api/` já estavam corretas com `export default`
- Apenas precisavam de logs melhorados para debugging

## Correções Implementadas

### 1. **Corrigida URL da API (api.js)** ⭐ MAIS IMPORTANTE

#### Linha 13 - request():
```javascript
// ANTES (NETLIFY):
const url = `${this.baseUrl}/.netlify/functions/${functionName}`;

// DEPOIS (VERCEL):
const url = `${this.baseUrl}/api/${functionName}`;
```

**Adicionados logs detalhados:**
```javascript
console.log('[API] Chamando:', url);
console.log('[API] Status:', response.status);
console.log('[API] Resposta recebida:', data);
```

### 2. Corrigida Lógica de Criação de Tarefas (index.html)

#### Linha 3950 - handleTarefaSubmit():
```javascript
// ANTES:
const novaTarefa = {
    id: crypto.randomUUID(),
    titulo, cliente, tecnico, tipo, data, prioridade, observacoes,
    status: 'pendente',
    checklist: [...],
    created_at: new Date().toISOString()  // ❌ PROBLEMA
};

// DEPOIS:
const novaTarefa = {
    id: crypto.randomUUID(),
    titulo, cliente, tecnico, tipo, data, prioridade, observacoes,
    status: 'pendente',
    checklist: [...],
    _isNew: true  // ✅ SOLUÇÃO: Marca temporária
};
```

#### Linhas 6174-6200 - saveData():
```javascript
// ANTES:
if (tarefa.created_at) {  // ❌ Sempre verdadeiro para novas tarefas
    // Atualizar (PUT)
} else {
    // Criar (POST)
}

// DEPOIS:
if (tarefa._isNew) {  // ✅ Verifica marca temporária
    // Criar nova tarefa (POST)
    const { _isNew, ...tarefaData } = tarefa; // Remove marca antes de enviar
    fetch('/api/saveData', { method: 'POST', ... });
} else if (tarefa.created_at) {
    // Atualizar existente (PUT)
    fetch('/api/updateData', { method: 'PUT', ... });
}
```

### 3. Corrigido Formato de Resposta do getData (api.js)

O `getData` retorna array diretamente, então removido `.data`:

```javascript
// ANTES:
async getTarefas() {
    const response = await this.request('getData?tabela=tarefas...');
    return response.data || [];  // ❌ response.data seria undefined
}

// DEPOIS:
async getTarefas() {
    const response = await this.request('getData?tabela=tarefas...');
    return response || [];  // ✅ response já é o array
}
```

**Aplicado em todos os métodos get:** getUsuarios, getClientes, getTecnicos, getTiposTarefa, getTarefas, getProdutos, getOportunidades, getAtividades, getOportunidadeItens, loginUsuario

### 4. Padronizadas Credenciais do Supabase

Todos os arquivos agora usam:
- URL: `https://ftptqjolbzpdqoxydgkj.supabase.co`
- Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...dDiK4JqFbhTTXGvAYjfvvXXVepLMgujpYXQyUhOf4s4`

**Arquivos atualizados:**
- ✅ `config.js`
- ✅ `api/saveData.js`
- ✅ `api/getData.js`
- ✅ `api/updateData.js`
- ✅ `api/deleteData.js`
- ✅ `netlify/functions/saveData.js`
- ✅ `netlify/functions/getData.js`
- ✅ `netlify/functions/updateData.js`
- ✅ `netlify/functions/deleteData.js`

### 5. Melhorado Tratamento de Erros e Logs

Todas as funções da API agora incluem:

#### Logs Detalhados:
```javascript
console.log('[saveData] Método:', req.method);
console.log('[saveData] Tabela:', tabela);
console.log('[saveData] Dados:', JSON.stringify(dados));
```

#### Tratamento de Erros Aprimorado:
```javascript
if (error) {
    console.error('[saveData] Erro Supabase detalhado:', JSON.stringify(error));
    return res.status(500).json({ 
        error: 'Erro ao salvar dados no banco',
        details: error.message  // ✅ Detalhes do erro
    });
}
```

#### Confirmação de Sucesso:
```javascript
console.log('[saveData] Sucesso! Dados salvos:', resultado[0]?.id);
```

## Arquivos Modificados

1. **api.js** ⭐ CRÍTICO
   - Linha 13: URL alterada de `/.netlify/functions/` para `/api/`
   - Linhas 20-32: Adicionados logs detalhados
   - Múltiplas linhas: Corrigido retorno de todos os métodos get (removido `.data`)

2. **index.html** (2 alterações)
   - Linha 3950: Removido `created_at`, adicionado `_isNew: true`
   - Linhas 6174-6200: Ajustada lógica de verificação para usar `_isNew`

3. **config.js**
   - Linhas 5-6: Atualizadas credenciais do Supabase

4. **api/saveData.js**
   - Adicionados logs detalhados
   - Melhorado tratamento de erros

5. **api/getData.js**
   - Adicionados logs detalhados
   - Melhorado tratamento de erros
   - Corrigido retorno para `{ data: [...] }`

6. **api/updateData.js**
   - Adicionados logs detalhados
   - Melhorado tratamento de erros

7. **api/deleteData.js**
   - Adicionados logs detalhados
   - Melhorado tratamento de erros

8. **netlify/functions/*.js** (4 arquivos)
   - Atualizadas credenciais do Supabase

## Como Testar

### 1. Fazer Deploy na Vercel
```bash
git add .
git commit -m "fix: corrigir salvamento de tarefas no banco de dados"
git push
```

### 2. Testar Cadastro de Tarefa
1. Acesse seu site na Vercel
2. Vá para a seção "Tarefas"
3. Clique em "Criar Nova Tarefa"
4. Preencha os campos:
   - Título: "Teste de Cadastro"
   - Cliente: Selecione um cliente
   - Técnico: Selecione um técnico
   - Tipo: Selecione um tipo
   - Data: Selecione uma data
   - Prioridade: Selecione uma prioridade
5. Clique em "Salvar"
6. Verifique se aparece a mensagem: "✅ Tarefa criada com sucesso!"
7. Verifique se aparece: "✅ Dados salvos no banco de dados!"

### 3. Verificar no Console do Navegador (F12)
Você deve ver logs como:
```
[saveData] Método: POST
[saveData] Tabela: tarefas
[saveData] Dados: {...}
[saveData] Tentando salvar na tabela: tarefas
[saveData] Resultado Supabase: { success: true }
[saveData] Sucesso! Dados salvos: [UUID]
```

### 4. Verificar no Supabase
1. Acesse: https://ftptqjolbzpdqoxydgkj.supabase.co
2. Vá para "Table Editor"
3. Abra a tabela "tarefas"
4. Verifique se a nova tarefa foi criada

## Próximos Passos

1. ✅ Testar o cadastro de tarefas
2. ✅ Verificar se os logs aparecem no console da Vercel
3. ✅ Confirmar que os dados estão sendo salvos no Supabase
4. Se houver erros, verificar os logs detalhados no console

## Notas Importantes

- A marca `_isNew: true` é temporária e removida antes de enviar para o banco
- O `created_at` será criado automaticamente pelo Supabase (campo DEFAULT NOW())
- Os logs detalhados ajudarão a identificar problemas rapidamente
- Mantenha as credenciais do Supabase consistentes em todos os arquivos

## Suporte

Se ainda houver problemas:
1. Abra o Console do Navegador (F12)
2. Abra a aba "Network"
3. Tente criar uma tarefa
4. Verifique as requisições para `/api/saveData`
5. Compartilhe os logs do console e da requisição

