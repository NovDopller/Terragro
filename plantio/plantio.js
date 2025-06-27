    document.getElementById('anexoFotosPlantio').addEventListener('change', function(e) {
      let label = document.getElementById('anexoFotosPlantio-nome');
      if (this.files.length > 0) {
        let nomes = Array.from(this.files).map(f => f.name).join(', ');
        label.textContent = nomes;
      } else {
        label.textContent = 'Nenhum arquivo selecionado';
      }
    });