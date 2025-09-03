<script>
let clientes = [];
let tecnicos = [];

// Salvar e carregar do localStorage
function salvarDados() {
  localStorage.setItem('clientes', JSON.stringify(clientes));
  localStorage.setItem('tecnicos', JSON.stringify(tecnicos));
}
function carregarDados() {
  clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
  tecnicos = JSON.parse(localStorage.getItem('tecnicos') || '[]');
}

// Renderizar tabela de clientes
function renderClientes() {
  const tbody = document.getElementById('tabelaClientes').getElementsByTagName('tbody')[0];
  tbody.innerHTML = '';
  clientes.forEach((cli, i) => {
    const row = tbody.insertRow();
    row.insertCell(0).innerText = cli.razaoSocial;
    row.insertCell(1).innerText = cli.cnpj;
    row.insertCell(2).innerText = cli.telefone;
    row.insertCell(3).innerText = cli.email;
    const acoes = row.insertCell(4);
    const editar = document.createElement('button');
    editar.innerText = "✏️";
    editar.onclick = () => editarCliente(i);
    const excluir = document.createElement('button');
    excluir.innerText = "🗑️";
    excluir.onclick = () => { clientes.splice(i,1); salvarDados(); renderClientes(); };
    acoes.appendChild(editar);
    acoes.appendChild(excluir);
  });
  atualizarSelects();
}

// Manipular formulário de cliente
document.getElementById('clienteForm').onsubmit = function(e) {
  e.preventDefault();
  const razaoSocial = document.getElementById('razaoSocial').value;
  const cnpj = document.getElementById('cnpj').value;
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;
  if(this.editando !== undefined) {
    clientes[this.editando] = { razaoSocial, cnpj, telefone, email };
    this.editando = undefined;
    this.querySelector('button').innerText = "➕ Incluir Cliente";
  } else {
    clientes.push({ razaoSocial, cnpj, telefone, email });
  }
  salvarDados();
  renderClientes();
  this.reset();
};
function editarCliente(i) {
  const cli = clientes[i];
  document.getElementById('razaoSocial').value = cli.razaoSocial;
  document.getElementById('cnpj').value = cli.cnpj;
  document.getElementById('telefone').value = cli.telefone;
  document.getElementById('email').value = cli.email;
  document.getElementById('clienteForm').editando = i;
  document.getElementById('clienteForm').querySelector('button').innerText = "💾 Salvar Alterações";
}

// Técnicos: igualzinho, só muda nomes e IDs

// Atualizar selects
function atualizarSelects() {
  const clienteSelect = document.getElementById('clienteSelect');
  clienteSelect.innerHTML = '<option value="">Selecione um cliente</option>';
  clientes.forEach(cli => {
    clienteSelect.add(new Option(cli.razaoSocial, cli.razaoSocial));
  });
  const tecnicoSelect = document.getElementById('tecnicoSelect');
  tecnicoSelect.innerHTML = '<option value="">Selecione um técnico</option>';
  tecnicos.forEach(tec => {
    tecnicoSelect.add(new Option(tec.nome, tec.nome));
  });
}

// Inicialização
window.onload = function() {
  carregarDados();
  renderClientes();
  // renderTecnicos(); // igual para técnicos
};
</script>
