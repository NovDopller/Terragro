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
    document.getElementById('mainForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('/api/pre-colheita', {
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
