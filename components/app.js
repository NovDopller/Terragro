function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const now = new Date().toLocaleString();
  let reportHTML = '<div class="alert alert-success">Enviado com sucesso!</div>';
  reportHTML += '<p><strong>Data/Hora:</strong> ' + now + '</p>';
  // Collect fields
  reportHTML += '<ul>';
  new FormData(form).forEach((v, k) => {
    reportHTML += '<li><strong>' + k + ':</strong> ' + v + '</li>';
  });
  reportHTML += '</ul>';
  // Attempt geolocation
  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude.toFixed(4), lon = pos.coords.longitude.toFixed(4);
    reportHTML = '<p><strong>Localização:</strong> (' + lat + ', ' + lon + ')</p>' + reportHTML;
    // Store in localStorage and redirect
    localStorage.setItem('lastReport', reportHTML);
    window.location.href = '../index.html';
  }, err => {
    // No geolocation
    reportHTML = '<div class="alert alert-warning">Enviado sem localização.</div>' + reportHTML;
    localStorage.setItem('lastReport', reportHTML);
    window.location.href = '../index.html';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('mainForm');
  if (form) form.addEventListener('submit', handleSubmit);
});
