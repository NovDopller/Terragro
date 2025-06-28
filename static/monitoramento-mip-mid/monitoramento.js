let geoOk = false;
let geoTentativas = 0;

window.addEventListener('DOMContentLoaded', function() {
  // GEOLOCALIZAÇÃO
  const geoStatus = document.getElementById('geo-status');
  const latInput = document.getElementById('latitude');
  const lonInput = document.getElementById('longitude');
  geoOk = false;

  if (!latInput || !lonInput) {
    if (geoStatus) geoStatus.textContent = "Campos latitude/longitude não encontrados!";
    return;
  }

  function tentaGeo() {
    if (geoStatus) geoStatus.textContent = "Obtendo localização...";
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(pos) {
          latInput.value = pos.coords.latitude;
          lonInput.value = pos.coords.longitude;
          geoOk = true;
          geoTentativas = 0;
          if (geoStatus) geoStatus.textContent = "Localização obtida!";
          console.log("[Geo] Latitude:", latInput.value, "Longitude:", lonInput.value);
        },
        function(error) {
          latInput.value = "";
          lonInput.value = "";
          geoOk = false;
          geoTentativas++;
          let msg = "Não foi possível obter sua localização.";
          if (error.code === 1) msg += " Permissão negada pelo usuário.";
          if (geoStatus) geoStatus.textContent = msg;
          if (geoTentativas < 3) {
            setTimeout(tentaGeo, 2000); // tenta de novo até 3x
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      if (geoStatus) geoStatus.textContent = "Seu navegador não suporta geolocalização.";
    }
  }

  tentaGeo(); // chama ao abrir

  // ===== MOSTRAR/ESCONDER CAMPOS DINÂMICOS DO RELATÓRIO =====

  // Estado inicial: esconder campos de motivo
  const motivoCiclo = document.getElementById('cicloMotivo');
  const motivoUniformidade = document.getElementById('uniformidadeMotivo');
  if (motivoCiclo) {
    motivoCiclo.classList.add('hidden');
    motivoCiclo.value = '';
  }
  if (motivoUniformidade) {
    motivoUniformidade.classList.add('hidden');
    motivoUniformidade.value = '';
  }

  // Ciclo fenológico
  document.querySelectorAll('input[name="mesmoCiclo"]').forEach(radio => {
    radio.addEventListener('change', function() {
      if (!motivoCiclo) return;
      if (this.value === "Não") {
        motivoCiclo.classList.remove('hidden');
      } else {
        motivoCiclo.classList.add('hidden');
        motivoCiclo.value = '';
      }
    });
  });

  // Uniformidade grãos/vagens
  document.querySelectorAll('input[name="uniformidadeGrãos"]').forEach(radio => {
    radio.addEventListener('change', function() {
      if (!motivoUniformidade) return;
      if (this.value === "Desuniforme") {
        motivoUniformidade.classList.remove('hidden');
      } else {
        motivoUniformidade.classList.add('hidden');
        motivoUniformidade.value = '';
      }
    });
  });
});

// ===== SUBMISSÃO =====
document.getElementById('mainForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const latInput = document.getElementById('latitude');
  const lonInput = document.getElementById('longitude');
  const geoStatus = document.getElementById('geo-status');

  // Faz nova tentativa se ainda não tiver geo
  if (
    !geoOk ||
    !latInput || !lonInput ||
    !latInput.value || !lonInput.value ||
    isNaN(parseFloat(latInput.value)) || isNaN(parseFloat(lonInput.value))
  ) {
    if (geoStatus) geoStatus.textContent = "Tentando obter localização para liberar o envio...";
    // tenta geolocalização novamente ANTES de bloquear o usuário
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(pos) {
          latInput.value = pos.coords.latitude;
          lonInput.value = pos.coords.longitude;
          geoOk = true;
          document.getElementById('geo-status').textContent = "Localização obtida! Agora envie o formulário.";
        },
        function() {
          document.getElementById('geo-status').textContent = "Não foi possível obter sua localização.";
        }
      );
    }
    alert("Aguarde a localização antes de enviar!");
    return;
  }

  const formData = new FormData(event.target);

  // Reforça os valores atuais (mesmo que já estejam no form)
  formData.set('latitude', latInput.value);
  formData.set('longitude', lonInput.value);

  try {
    const response = await fetch('/api/salvar_monitoramento_mip_mid', {
      method: 'POST',
      body: formData
    });
    let result;
    try {
      result = await response.json();
    } catch (err) {
      document.getElementById('messageContainer').innerText = 'Resposta inesperada do servidor!';
      return;
    }
    document.getElementById('messageContainer').innerText = result.msg || 'Enviado com sucesso!';
  } catch (error) {
    document.getElementById('messageContainer').innerText = 'Erro ao enviar!';
    console.error("[Envio] Erro:", error);
  }
});
