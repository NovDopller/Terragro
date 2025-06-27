document.getElementById('formMonitoramentoMipMid').addEventListener('submit', function(event) {
  event.preventDefault(); // evita o reload da página

  const dados = {
    latitude: this.latitude.value,
    longitude: this.longitude.value,
    urgenciaInsetosMip: this.urgenciaInsetosMip.value,
    nome_talhao: this.nome_talhao.value,
    observacoes: this.observacoes.value
  };

  fetch('/api/salvar_monitoramento_mip_mid', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
  .then(res => res.json())
  .then(data => {
    alert(data.msg); // mensagem do backend
  })
  .catch(err => {
    alert('Erro ao salvar monitoramento');
    console.error(err);
  });
});

