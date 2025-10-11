# 📋 CRIAR COLUNA CHECKLIST NO SUPABASE

## 🎯 OBJETIVO

Adicionar a coluna `checklist` (tipo JSONB) na tabela `tarefas` para salvar o progresso dos itens do checklist.

---

## 🚀 PASSO A PASSO

### **MÉTODO 1: Via SQL Editor (RECOMENDADO)** ⭐

#### **1. Acessar o Supabase**
1. Vá para: https://supabase.com
2. Faça login
3. Selecione seu projeto: `ftptqjolbzpdqoxydgkj`

#### **2. Abrir SQL Editor**
1. No menu lateral esquerdo, clique em **"SQL Editor"**
2. Clique em **"New query"** (Nova consulta)

#### **3. Copiar e Colar este SQL:**

```sql
-- ========================================
-- ADICIONAR COLUNA CHECKLIST
-- ========================================

-- 1. Adicionar coluna checklist (tipo JSONB)
ALTER TABLE tarefas 
ADD COLUMN IF NOT EXISTS checklist jsonb;

-- 2. Permitir valores nulos (tarefas antigas sem checklist)
ALTER TABLE tarefas 
ALTER COLUMN checklist DROP NOT NULL;

-- 3. Criar índice para melhor performance (opcional, mas recomendado)
CREATE INDEX IF NOT EXISTS idx_tarefas_checklist 
ON tarefas USING gin (checklist);

-- 4. Verificar se a coluna foi criada
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'tarefas' 
  AND column_name = 'checklist';
```

#### **4. Executar**
1. Clique no botão **"Run"** (Executar) ou pressione **Ctrl+Enter**
2. Aguarde a execução
3. Você deve ver uma mensagem de sucesso

#### **5. Verificar o Resultado**
Na parte inferior, você deve ver algo como:

```
column_name | data_type | is_nullable
checklist   | jsonb     | YES
```

✅ **Se viu isso, a coluna foi criada com sucesso!**

---

### **MÉTODO 2: Via Table Editor (VISUAL)** 👁️

Se preferir fazer visualmente:

#### **1. Acessar Table Editor**
1. No menu lateral, clique em **"Table Editor"**
2. Selecione a tabela **"tarefas"**

#### **2. Adicionar Nova Coluna**
1. Clique no botão **"+ New Column"** (no canto superior direito)
2. Preencha os campos:
   - **Name:** `checklist`
   - **Type:** `jsonb`
   - **Default value:** (deixe vazio)
   - ✅ Marque: **"Is Nullable"** (permitir valores nulos)
   - ❌ Desmarque: **"Is Identity"**
   - ❌ Desmarque: **"Is Primary Key"**
3. Clique em **"Save"**

#### **3. Verificar**
- A nova coluna `checklist` deve aparecer na lista de colunas
- Tipo: `jsonb`
- Nullable: `Yes`

---

## 🧪 TESTAR SE FUNCIONOU

### **Teste 1: Via SQL Editor**

Execute este SQL:

```sql
-- Testar inserção de dados
UPDATE tarefas 
SET checklist = '[
  {"item": "Item 1", "concluido": false},
  {"item": "Item 2", "concluido": true}
]'::jsonb
WHERE id = (SELECT id FROM tarefas LIMIT 1);

-- Verificar se salvou
SELECT id, titulo, checklist 
FROM tarefas 
WHERE checklist IS NOT NULL 
LIMIT 1;
```

Se retornar dados, **funcionou!** ✅

### **Teste 2: Pelo Site**

1. Faça o deploy do código
2. Abra uma tarefa no Modo Técnico
3. Marque alguns itens
4. Recarregue a página (F5)
5. Abra a mesma tarefa
6. ✅ **Os itens devem continuar marcados**

---

## 📊 ESTRUTURA DA COLUNA CHECKLIST

A coluna `checklist` armazena um array JSON com esta estrutura:

```json
[
  {
    "item": "Verificar configuração",
    "concluido": false
  },
  {
    "item": "Testar conexão",
    "concluido": true
  },
  {
    "item": "Documentar processo",
    "concluido": false
  }
]
```

---

## 🔐 PERMISSÕES RLS (Row Level Security)

Se você tiver RLS ativado, precisará adicionar políticas para a nova coluna:

```sql
-- Permitir SELECT
CREATE POLICY "Enable read checklist for all users" 
ON tarefas FOR SELECT 
USING (true);

-- Permitir UPDATE
CREATE POLICY "Enable update checklist for all users" 
ON tarefas FOR UPDATE 
USING (true);
```

**Nota:** Ajuste as políticas conforme sua necessidade de segurança.

---

## ❌ POSSÍVEIS ERROS E SOLUÇÕES

### **Erro: "permission denied for table tarefas"**
**Causa:** Seu usuário não tem permissão para alterar a tabela
**Solução:** Use o usuário admin do Supabase ou peça ao administrador

### **Erro: "column checklist already exists"**
**Causa:** A coluna já foi criada antes
**Solução:** Apenas pule essa etapa, está tudo certo!

### **Erro: "syntax error near jsonb"**
**Causa:** Versão antiga do PostgreSQL
**Solução:** Use `json` ao invés de `jsonb`:
```sql
ALTER TABLE tarefas ADD COLUMN checklist json;
```

---

## ✅ CHECKLIST DE VERIFICAÇÃO

Antes de fazer deploy, confirme:

- [ ] Coluna `checklist` criada
- [ ] Tipo é `jsonb` (ou `json`)
- [ ] Coluna permite valores nulos (`is_nullable = YES`)
- [ ] Índice criado (opcional, para performance)
- [ ] Teste de inserção funcionou
- [ ] Permissões RLS configuradas (se necessário)

---

## 🚀 PRÓXIMOS PASSOS

Após criar a coluna:

1. ✅ **Fazer deploy do código**
   ```bash
   git add .
   git commit -m "fix: adicionar suporte a checklist persistente no banco"
   git push
   ```

2. ✅ **Testar no site:**
   - Marcar itens no checklist
   - Verificar se barra de progresso atualiza
   - Recarregar página e ver se mantém
   - Verificar se status muda para "concluida" ao completar 100%

3. ✅ **Verificar no Supabase:**
   - Table Editor → tarefas
   - Veja se a coluna `checklist` tem dados JSON

---

## 📞 PRECISA DE AJUDA?

Se encontrar algum erro, compartilhe:

1. ✅ Screenshot do erro
2. ✅ Mensagem de erro completa
3. ✅ Em qual passo está tendo problema

---

**EXECUTE O SQL ACIMA E ME CONFIRME SE FUNCIONOU!** 🚀

Depois do SQL executado com sucesso, podemos fazer o deploy e testar tudo junto!
