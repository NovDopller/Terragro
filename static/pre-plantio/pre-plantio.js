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

// GEOLOCALIZAÇÃO automática ao carregar a página (latitude/longitude)
window.addEventListener('DOMContentLoaded', function() {
  const geoStatus = document.getElementById('geo-status');
  if (navigator.geolocation && document.getElementById('latitude')) {
    if (geoStatus) geoStatus.textContent = "Obtendo localização...";
    navigator.geolocation.getCurrentPosition(
      function(pos) {
        document.getElementById('latitude').value = pos.coords.latitude;
        document.getElementById('longitude').value = pos.coords.longitude;
        if (geoStatus) geoStatus.textContent = "Localização obtida!";
      },
      function(error) {
        document.getElementById('latitude').value = "";
        document.getElementById('longitude').value = "";
        if (geoStatus) geoStatus.textContent = "Não foi possível obter sua localização.";
      }
    );
  }
});

// SUBMISSÃO DO FORMULÁRIO PRINCIPAL (agora com FormData, para arquivos!)
document.getElementById('mainForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // ESSENCIAL: impede o reload!

  const formData = new FormData(event.target);

  // Checagem dos campos de localização
  const latVal = formData.get('latitude');
  const lonVal = formData.get('longitude');
  if (
    typeof latVal === "undefined" || typeof lonVal === "undefined" ||
    latVal === "" || lonVal === "" ||
    latVal === null || lonVal === null ||
    isNaN(parseFloat(latVal)) || isNaN(parseFloat(lonVal))
  ) {
    alert("Por favor, aguarde a localização ser carregada antes de enviar.");
    return;
  }

  // Debug (opcional)
  console.log("Latitude:", latVal, "Longitude:", lonVal);

  try {
    const response = await fetch('/api/pre-plantio', {
      method: 'POST',
      body: formData // IMPORTANTE: NÃO colocar headers!
    });
    const result = await response.json();
    document.getElementById('messageContainer').innerText = result.msg || 'Enviado com sucesso!';
  } catch (error) {
    document.getElementById('messageContainer').innerText = 'Erro ao enviar!';
  }
});

