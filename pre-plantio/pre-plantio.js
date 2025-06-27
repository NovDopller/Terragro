// Hectares somente se NÃO for área total
    document.querySelectorAll('input[name="areaTotalTalhao"]').forEach(radio => {
      radio.addEventListener('change', function() {
        const container = document.getElementById('hectaresContainer');
        if (this.value === "Não") {
          container.classList.remove('hidden');
        } else {
          container.classList.add('hidden');
          container.querySelector('input').value = '';
        }
      });
    });
    // Calagem só se sim
    document.querySelectorAll('input[name="dosagemCalagemPP"]').forEach(radio => {
      radio.addEventListener('change', function() {
        const container = document.getElementById('calagemContainer');
        if (this.value === "Sim") {
          container.classList.remove('hidden');
        } else {
          container.classList.add('hidden');
          container.querySelector('input').value = '';
        }
      });
    });
    // Detalhes insetos
    document.querySelectorAll('input[name="insetosPP"]').forEach(radio => {
      radio.addEventListener('change', function() {
        const detalhes = document.getElementById('insetos-detalhes');
        if (this.value === "Sim") {
          detalhes.classList.remove('hidden');
        } else {
          detalhes.classList.add('hidden');
          detalhes.querySelectorAll('input, select').forEach(el => {
            if (el.type === "text" || el.type === "number") el.value = '';
            if (el.tagName.toLowerCase() === "select") el.selectedIndex = 0;
          });
        }
      });
    });
    // Detalhes daninhas
    document.querySelectorAll('input[name="daninhasPP"]').forEach(radio => {
      radio.addEventListener('change', function() {
        const detalhes = document.getElementById('daninhas-detalhes');
        if (this.value === "Sim") {
          detalhes.classList.remove('hidden');
        } else {
          detalhes.classList.add('hidden');
          detalhes.querySelectorAll('input, select').forEach(el => {
            if (el.type === "text" || el.type === "number") el.value = '';
            if (el.tagName.toLowerCase() === "select") el.selectedIndex = 0;
          });
        }
      });
    });
    // Anexo análise solo
    document.getElementById('anexoAnaliseSoloPP').addEventListener('change', function(e) {
      let label = document.getElementById('anexoAnaliseSoloPP-nome');
      if (this.files.length > 0) {
        let nomes = Array.from(this.files).map(f => f.name).join(', ');
        label.textContent = nomes;
      } else {
        label.textContent = 'Nenhum arquivo selecionado';
      }
    });
    // Anexo fotos
    document.getElementById('anexoFotosPlantio').addEventListener('change', function(e) {
      let label = document.getElementById('anexoFotosPlantio-nome');
      if (this.files.length > 0) {
        let nomes = Array.from(this.files).map(f => f.name).join(', ');
        label.textContent = nomes;
      } else {
        label.textContent = 'Nenhum arquivo selecionado';
      }
    });