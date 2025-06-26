// scripts/pre-plantio.js

document.addEventListener('DOMContentLoaded', () => {
  // Função genérica para show/hide
  function toggleDetails(radioName, detailsId) {
    document.querySelectorAll(`input[name="${radioName}"]`).forEach(radio => {
      radio.addEventListener('change', () => {
        const det = document.getElementById(detailsId);
        if (radio.value === 'Sim' && radio.checked) det.classList.remove('hidden');
        if (radio.value === 'Não'  && radio.checked) det.classList.add('hidden');
      });
    });
  }
  // Ativa para insetos e daninhas
  toggleDetails('insetosPP', 'insetos-detalhes');
  toggleDetails('daninhasPP', 'daninhas-detalhes');
});
document.addEventListener('DOMContentLoaded', () => {
  // ... código de toggleDetails()

  // 1) Atualiza o nome do arquivo no botão
  const anexoInput = document.getElementById('anexoAnaliseSoloPP');
  const anexoNome  = document.getElementById('anexo-nome');
  if (anexoInput && anexoNome) {
    anexoInput.addEventListener('change', () => {
      anexoNome.textContent = anexoInput.files.length
        ? anexoInput.files[0].name
        : 'Nenhum arquivo selecionado';
    });
  }

  // 2) No submit do form, além de gerar o relatório, injete a imagem
  const form = document.getElementById('mainForm');
  const msgContainer = document.getElementById('messageContainer');
  form.addEventListener('submit', event => {
    event.preventDefault();
    // Limpa relatório anterior
    msgContainer.innerHTML = '';

    const formData = new FormData(form);

    // --- aqui vai seu código atual que imprime todos os campos ---
    // ex:
    // for (let [key, value] of formData.entries()) { ... }

    // --- depois de imprimir os textos, trate a imagem: ---
    const file = formData.get('anexoAnaliseSoloPP');
    if (file && file instanceof File && file.type.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.alt = 'Foto do pré-plantio';
      img.className = 'mt-6 max-w-full rounded-lg shadow-lg';
      msgContainer.appendChild(img);
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.auto-expand').forEach(textarea => {
    textarea.style.height = textarea.scrollHeight + 'px';
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const radios = document.querySelectorAll('input[name="areaTotalTalhao"]');
  const container = document.getElementById('hectaresContainer');

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'Não' && radio.checked) {
        container.classList.remove('hidden');
      } else if (radio.value === 'Sim' && radio.checked) {
        container.classList.add('hidden');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const radiosCalagem = document.querySelectorAll('input[name="dosagemCalagemPP"]');
  const calagemContainer = document.getElementById('calagemContainer');

  radiosCalagem.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'Sim' && radio.checked) {
        calagemContainer.classList.remove('hidden');
      } else if (radio.value === 'Não' && radio.checked) {
        calagemContainer.classList.add('hidden');
      }
    });
  });
});
