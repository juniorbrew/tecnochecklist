<script>
// Variável global para tipos de tarefa
let tiposDeTarefa = {}; // {nome_do_tipo: [checklist, ...]}

// Salvar no localStorage
function salvarTipos() {
  localStorage.setItem('tiposDeTarefa', JSON.stringify(tiposDeTarefa));
}

// Carregar do localStorage
function carregarTipos() {
  tiposDeTarefa = JSON.parse(localStorage.getItem('tiposDeTarefa') || '{}');
}

// Renderizar tabela de tipos de tarefa
function renderTipos() {
  const tbody = document.getElementById('tabelaTipos').getElementsByTagName('tbody')[0];
  tbody.innerHTML = '';
  Object.entries(tiposDeTarefa).forEach(([tipo, checklist], i) => {
    const row = tbody.insertRow();
    row.insertCell(0).innerText = tipo;
    row.insertCell(1).innerText = checklist.join(', ');
    const acoes = row.insertCell(2);
    const editar = document.createElement('button');
    editar.innerText = "✏️";
    editar.onclick = () => editarTipo(i, tipo);
    const excluir = document.createElement('button');
    excluir.innerText = "🗑️";
    excluir.onclick = () => { delete tiposDeTarefa[tipo]; salvarTipos(); renderTipos(); atualizarSelects(); };
    acoes.appendChild(editar);
    acoes.appendChild(excluir);
  });
  atualizarSelects();
}

// Manipular formulário de tipo de tarefa
document.getElementById('tipoForm').onsubmit = function(e) {
  e.preventDefault();
  const nomeTipo = document.getElementById('nomeTipo').value;
  const checklist = document.getElementById('checklistTipo').value.split('\n').map(x=>x.trim()).filter(Boolean);
  tiposDeTarefa[nomeTipo] = checklist;
  salvarTipos();
  renderTipos();
  this.reset();
  this.removeAttribute('data-editando');
  this.querySelector('button').innerText = "➕ Incluir Tipo";
};
function editarTipo(i, tipo) {
  document.getElementById('nomeTipo').value = tipo;
  document.getElementById('checklistTipo').value = (tiposDeTarefa[tipo] || []).join('\n');
  document.getElementById('tipoForm').setAttribute('data-editando', i);
  document.getElementById('tipoForm').querySelector('button').innerText = "💾 Salvar Alterações";
}

// Inicialização tipos
window.onload = function() {
  carregarTipos();
  renderTipos();
  // ...chame também carregarDados/render para clientes, técnicos, tarefas etc.
};
</script>
