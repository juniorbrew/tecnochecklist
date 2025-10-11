# 🐛 DEBUG: Tarefas Não Aparecem

## 📋 LOGS ADICIONADOS

Acabei de adicionar logs detalhados para identificar o problema. Siga estes passos:

---

## 🚀 PASSO 1: FAZER DEPLOY

```bash
git add index.html
git commit -m "debug: adicionar logs detalhados para loadData e saveData"
git push
```

---

## 🔍 PASSO 2: REPRODUZIR O PROBLEMA

### A) Limpar Dados Antigos (Importante!)

1. Abra o site na Vercel
2. Pressione **F12** (Console do Dev Tools)
3. Vá para a aba **Application** (ou **Aplicativo**)
4. No menu lateral, clique em **Local Storage**
5. Selecione o domínio do seu site
6. Clique com botão direito → **Clear** (Limpar tudo)
7. **Recarregue a página (F5)**

### B) Cadastrar Dados Base

**IMPORTANTE:** Cadastre nesta ordem:

1. **Vá para "Clientes"**
   - Clique em "Adicionar Cliente"
   - Preencha: Nome = "Cliente Teste"
   - Clique em "Salvar"
   - ✅ Verifique se apareceu na lista

2. **Vá para "Técnicos"**
   - Clique em "Adicionar Técnico"
   - Preencha: Nome = "Técnico Teste"
   - Clique em "Salvar"
   - ✅ Verifique se apareceu na lista

3. **Vá para "Tipos de Tarefa"**
   - Clique em "Adicionar Tipo"
   - Preencha: Nome = "Tipo Teste"
   - Checklist (opcional): deixe vazio ou adicione alguns itens
   - Clique em "Salvar"
   - ✅ Verifique se apareceu na lista

### C) Criar Tarefa e Observar Logs

1. **Abra o Console (F12)** e vá para a aba **Console**

2. **Vá para "Tarefas"**

3. **Clique em "Criar Nova Tarefa"**

4. **Preencha:**
   - Título: "Tarefa Teste"
   - Cliente: Selecione "Cliente Teste"
   - Técnico: Selecione "Técnico Teste"
   - Tipo: Selecione "Tipo Teste"
   - Data: Selecione hoje
   - Prioridade: Selecione "Media"
   - Observações: (deixe vazio ou escreva algo)

5. **Clique em "Criar Tarefa"**

6. **OBSERVAR NO CONSOLE:**

---

## 📊 LOGS ESPERADOS

### Durante o Salvamento:

```javascript
[Salvando tarefa] {
  id: "uuid...",
  titulo: "Tarefa Teste",
  cliente_id: "uuid...",
  tecnico_id: "uuid...",
  tipo_id: "uuid...",
  data: "2025-10-11",
  prioridade: "media",
  status: "pendente",
  progresso: 0,
  observacoes: null
}

[API] Chamando: https://seu-site.vercel.app/api/saveData
[API] Status: 200
[API] Resposta recebida: { success: true, data: {...} }

[saveData] Método: POST
[saveData] Tabela: tarefas
[saveData] Tentando salvar na tabela: tarefas
[saveData] Sucesso! Dados salvos: [UUID]

[saveData] Tarefa salva: { success: true, data: {...} }
```

### ✅ **VERIFICAR:**
- [ ] A tarefa aparece na lista imediatamente?
- [ ] Há algum erro em vermelho no console?

---

## 🔄 PASSO 3: RECARREGAR E OBSERVAR

1. **Recarregue a página (F5)**

2. **OBSERVAR NO CONSOLE:**

### Logs Esperados ao Carregar:

```javascript
[loadData] Iniciando carregamento...

[API] Chamando: https://seu-site.vercel.app/api/getData?tabela=clientes
[API] Chamando: https://seu-site.vercel.app/api/getData?tabela=tecnicos
[API] Chamando: https://seu-site.vercel.app/api/getData?tabela=tipos_tarefa
[API] Chamando: https://seu-site.vercel.app/api/getData?tabela=tarefas

[getData] Método: GET
[getData] Query: { tabela: "tarefas" }
[getData] Buscando dados da tabela: tarefas
[getData] Sucesso! Registros encontrados: 1

[loadData] Dados recebidos: {
  clientes: 1,
  tecnicos: 1,
  tipos: 1,
  tarefas: 1
}

[loadData] Tarefas brutas do banco: [{
  id: "uuid...",
  titulo: "Tarefa Teste",
  cliente_id: "uuid...",
  tecnico_id: "uuid...",
  tipo_id: "uuid...",
  data: "2025-10-11",
  prioridade: "media",
  status: "pendente",
  progresso: 0,
  observacoes: null,
  created_at: "2025-10-11T..."
}]

[loadData] Processando tarefa 1: {...}

[loadData] Objetos encontrados: {
  cliente: "Cliente Teste",
  tecnico: "Técnico Teste",
  tipo: "Tipo Teste"
}

[loadData] Tarefa processada: {
  ...
  cliente: "Cliente Teste",
  tecnico: "Técnico Teste",
  tipo: "Tipo Teste",
  checklist: []
}

[loadData] Tarefas processadas: 1 [...]

[loadData] Renderizando interface...

✅ Dados carregados do banco de dados!
```

### ✅ **VERIFICAR:**
- [ ] A tarefa aparece na lista após recarregar?
- [ ] Os nomes de cliente, técnico e tipo aparecem corretamente?
- [ ] Há algum erro em vermelho no console?

---

## 🐛 POSSÍVEIS ERROS E SOLUÇÕES

### Erro 1: "Cliente não encontrado" / "Técnico não encontrado"

**Causa:** Os IDs não estão correspondendo.

**Solução:** Verificar se os UUIDs estão corretos:
```javascript
// No console, digite:
console.log('Cliente ID na tarefa:', tarefas[0].cliente_id);
console.log('Clientes disponíveis:', clientes.map(c => ({ id: c.id, nome: c.nome })));
```

### Erro 2: Tarefa não aparece após criar

**Causa:** Erro silencioso na renderização.

**Solução:** Verificar logs de erro no console e compartilhar.

### Erro 3: "Cannot read properties of undefined"

**Causa:** Algum campo está undefined.

**Solução:** Compartilhar o log completo do erro.

---

## 📤 COMPARTILHAR RESULTADOS

**Por favor, compartilhe:**

1. ✅ **Screenshot do console** com todos os logs
2. ✅ **Mensagens de erro** (se houver) - copiar texto completo
3. ✅ **O que você vê na interface:**
   - A tarefa aparece ao criar?
   - A tarefa aparece ao recarregar?
   - Que nomes aparecem (Cliente, Técnico, Tipo)?

---

## 🎯 PRÓXIMOS PASSOS APÓS COMPARTILHAR

Com os logs, poderei identificar exatamente onde está o problema:

1. Se é na busca dos objetos (cliente, técnico, tipo)
2. Se é na renderização
3. Se é no processamento do checklist
4. Se é no formato dos dados do banco

---

## 💡 DICA RÁPIDA

Se quiser testar agora mesmo sem esperar, vá ao **Supabase**:

1. Acesse: https://ftptqjolbzpdqoxydgkj.supabase.co
2. Vá para **Table Editor** → **tarefas**
3. Veja se a tarefa está lá
4. Copie os valores de `cliente_id`, `tecnico_id`, `tipo_id`
5. Compare com os IDs nas tabelas **clientes**, **tecnicos**, **tipos_tarefa**
6. Veja se os UUIDs correspondem

Se os UUIDs não corresponderem, esse é o problema!

