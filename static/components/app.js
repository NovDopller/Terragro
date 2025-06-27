document.getElementById('mainForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // impede reload padrão

  const formData = new FormData(event.target);
  const data = {};
  formData.forEach((v, k) => data[k] = v);

  // Aqui você pode tratar campos, fazer validação, etc.

  try {
    const response = await fetch('/api/plantio', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    const result = await response.json();
    alert(result.msg || "Enviado com sucesso!");
  } catch (err) {
    alert("Erro ao enviar!");
  }
});
