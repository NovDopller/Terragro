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

  data.latitude = latVal;
  data.longitude = lonVal;

  // =======================
  // TRATAMENTO DE URGÊNCIAS
  // =======================
  // INSETOS
  if (data.insetosPresentes === "Sim") {
    if (!data.urgenciaInsetosMip) {
      data.urgenciaInsetosMip = null;
    } else {
      data.urgenciaInsetosMip = parseInt(data.urgenciaInsetosMip);
      if (isNaN(data.urgenciaInsetosMip)) data.urgenciaInsetosMip = null;
    }
  } else {
    data.urgenciaInsetosMip = null;
  }

  // DANINHAS
  if (data.daninhasPresentesMip === "Sim") {
    if (!data.urgenciaDaninhasMip) {
      data.urgenciaDaninhasMip = null;
    } else {
      data.urgenciaDaninhasMip = parseInt(data.urgenciaDaninhasMip);
      if (isNaN(data.urgenciaDaninhasMip)) data.urgenciaDaninhasMip = null;
    }
  } else {
    data.urgenciaDaninhasMip = null;
  }

  // DOENÇAS
  if (data.doencasPresentesMip === "Sim") {
    if (!data.urgenciaDoencasMip) {
      data.urgenciaDoencasMip = null;
    } else {
      data.urgenciaDoencasMip = parseInt(data.urgenciaDoencasMip);
      if (isNaN(data.urgenciaDoencasMip)) data.urgenciaDoencasMip = null;
    }
  } else {
    data.urgenciaDoencasMip = null;
  }

  // =======================
  // TRATAMENTO DE NÚMEROS
  // =======================
  ["incidenciaInsetosMip", "incidenciaDaninhasMip", "incidenciaDoencasMip", "precipitacao7d", "vagensPorPlanta"].forEach(function(field) {
    if (field in data && data[field]) {
      data[field] = parseFloat(String(data[field]).replace(',', '.'));
      if (isNaN(data[field])) data[field] = null;
    } else {
      data[field] = null;
    }
  });

  // =======================
  // ENVIAR DADOS
  // =======================
  console.log("[Envio] Dados para o backend:", data);

  try {
    const response = await fetch('/api/monitoramento-mip-mid', {
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
