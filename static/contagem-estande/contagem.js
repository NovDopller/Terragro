    // Exibir/ocultar detalhes dos cards Sim/Não
    document.querySelectorAll('input[type=radio][value="Sim"]').forEach(function(radio) {
      radio.addEventListener('change', function() {
        let detalhes = this.closest('.bg-white').querySelector('.space-y-6');
        if (detalhes) detalhes.classList.remove('hidden');
      });
    });
    document.querySelectorAll('input[type=radio][value="Não"]').forEach(function(radio) {
      radio.addEventListener('change', function() {
        let detalhes = this.closest('.bg-white').querySelector('.space-y-6');
        if (detalhes) detalhes.classList.add('hidden');
      });
    });
    document.getElementById('mainForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};

    // Pega múltiplos checkboxes de condições climáticas e junta em string
    const condicoes = [];
    formData.forEach((value, key) => {
        if (key === "condicoesClimaticas") {
            condicoes.push(value);
        } else {
            data[key] = value;
        }
    });
    data.condicoesClimaticas = condicoes.join(', ');

    try {
        const response = await fetch('/api/contagem-estande', {
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
