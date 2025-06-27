    document.getElementById('anexoPreColheita').addEventListener('change', function(e) {
      let label = document.getElementById('anexoPreColheita-nome');
      if (this.files.length > 0) {
        let nomes = Array.from(this.files).map(f => f.name).join(', ');
        label.textContent = nomes;
      } else {
        label.textContent = 'Nenhum arquivo selecionado';
      }
    });

    document.querySelectorAll('input[name="daninhas"]').forEach(radio => {
      radio.addEventListener('change', function() {
        const detalhes = document.getElementById('daninhas-detalhes');
        if (this.value === "Sim") {
          detalhes.classList.remove('hidden');
        } else {
          detalhes.classList.add('hidden');
          // Limpa os campos ao esconder (opcional)
          detalhes.querySelectorAll('input, select').forEach(el => {
            if (el.type === "text" || el.type === "number") el.value = '';
            if (el.tagName.toLowerCase() === "select") el.selectedIndex = 0;
          });
        }
      });
    });