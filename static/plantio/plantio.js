    document.getElementById('anexoFotosPlantio').addEventListener('change', function(e) {
      let label = document.getElementById('anexoFotosPlantio-nome');
      if (this.files.length > 0) {
        let nomes = Array.from(this.files).map(f => f.name).join(', ');
        label.textContent = nomes;
      } else {
        label.textContent = 'Nenhum arquivo selecionado';
      }
  });
    document.getElementById('mainForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita recarregar a página

    // Pegando os valores do formulário
    const formData = new FormData(event.target);

    // Transformando em objeto para JSON
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Enviando para o backend Flask
    try {
        const response = await fetch('/api/plantio', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        const result = await response.json();

        document.getElementById('messageContainer').innerText = result.msg || 'Enviado com sucesso!';
    } catch (error) {
        document.getElementById('messageContainer').innerText = 'Erro ao enviar!';
    }
});
