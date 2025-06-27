// ========== GEOLOCALIZAÇÃO ==========
let geoOk = false;

window.addEventListener('DOMContentLoaded', function() {
  const geoStatus = document.getElementById('geo-status');
  const latInput = document.getElementById('latitude');
  const lonInput = document.getElementById('longitude');
  geoOk = false;

  if (!latInput || !lonInput) {
    if (geoStatus) geoStatus.textContent = "Campos latitude/longitude não encontrados!";
    return;
  }

  if (geoStatus) geoStatus.textContent = "Obtendo localização...";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(pos) {
        latInput.value = pos.coords.latitude;
        lonInput.value = pos.coords.longitude;
        geoOk = true;
        if (geoStatus) geoStatus.textContent = "Localização obtida!";
        console.log("[Geo] Latitude:", latInput.value, "Longitude:", lonInput.value);
      },
      function(error) {
        latInput.value = "";
        lonInput.value = "";
        geoOk = false;
        let msg = "Não foi possível obter sua localização.";
        if (error.code === 1) msg += " Permissão negada pelo usuário.";
        if (geoStatus) geoStatus.textContent = msg;
        alert(msg + "\n\nPermita o acesso à localização para continuar.");
        console.warn("[Geo] Erro:", msg);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  } else {
    if (geoStatus) geoStatus.textContent = "Seu navegador não suporta geolocalização.";
  }
});

// ========== SUBMISSÃO DO FORMULÁRIO ==========
document.getElementById('mainForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const latVal = document.getElementById('latitude').value;
  const lonVal = document.getElementById('longitude').value;
  const geoStatus = document.getElementById('geo-status');

  if (
    !geoOk ||
    !latVal || !lonVal ||
    isNaN(parseFloat(latVal)) || isNaN(parseFloat(lonVal))
  ) {
    alert("Localização não detectada! Por favor, aguarde ou permita o acesso à sua localização.\nStatus atual: " + (geoStatus ? geoStatus.textContent : ""));
    if (geoStatus) geoStatus.textContent = "Envio bloqueado por falta de localização válida.";
    return;
  }

  const formData = new FormData(event.target);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Garante valores certos de localização
  data.latitude = latVal;
  data.longitude = lonVal;

  // ===========================
  // TRATAMENTO DE URGÊNCIAS (apenas se resposta "Sim")
  // ===========================

  // INSETOS
  if (data.insetosPresente === "Sim") {
    if (!data.urgenciaInsetos) {
      data.urgenciaInsetos = null;
    } else {
      data.urgenciaInsetos = parseInt(data.urgenciaInsetos);
      if (isNaN(data.urgenciaInsetos)) data.urgenciaInsetos = null;
    }
  } else {
    data.urgenciaInsetos = null;
  }

  // DOENÇAS
  if (data.doencasPresente === "Sim") {
    if (!data.urgenciaDoencas) {
      data.urgenciaDoencas = null;
    } else {
      data.urgenciaDoencas = parseInt(data.urgenciaDoencas);
      if (isNaN(data.urgenciaDoencas)) data.urgenciaDoencas = null;
    }
  } else {
    data.urgenciaDoencas = null;
  }

  // DANINHAS
  if (data.daninhasPresente === "Sim") {
    if (!data.urgenciaDaninhas) {
      data.urgenciaDaninhas = null;
    } else {
      data.urgenciaDaninhas = parseInt(data.urgenciaDaninhas);
      if (isNaN(data.urgenciaDaninhas)) data.urgenciaDaninhas = null;
    }
  } else {
    data.urgenciaDaninhas = null;
  }

  // ===========================
  // TRATAMENTO DE NUMÉRICOS
  // ===========================
  ["incidenciaDoencas", "incidenciaInsetos", "incidenciaDaninhas"].forEach(function(field) {
    if (field in data && data[field]) {
      data[field] = parseFloat(String(data[field]).replace(',', '.'));
      if (isNaN(data[field])) data[field] = null;
    } else {
      data[field] = null;
    }
  });

  ["plantasMetro1", "plantasMetro2", "plantasMetro3"].forEach(function(field) {
    if (field in data && data[field]) {
      data[field] = parseInt(data[field]);
      if (isNaN(data[field])) data[field] = null;
    } else {
      data[field] = null;
    }
  });

  // ===========================
  // ENVIAR DADOS
  // ===========================
  console.log("[Envio] Dados para o backend:", data);

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
