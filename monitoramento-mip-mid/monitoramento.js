   // Função para mostrar/esconder detalhes condicionais (insetos, daninhas, doenças)
    function setupDetalhes(nomeCampo, idDetalhe) {
      document.querySelectorAll('input[name="' + nomeCampo + '"]').forEach(el => {
        el.addEventListener('change', function() {
          document.getElementById(idDetalhe).classList.toggle('hidden', this.value !== 'Sim');
          // Limpa ao esconder
          if(this.value !== 'Sim') {
            document.getElementById(idDetalhe).querySelectorAll('input, select').forEach(field => {
              if (field.type === 'text' || field.type === 'number') field.value = '';
              if (field.tagName.toLowerCase() === 'select') field.selectedIndex = 0;
            });
          }
        });
      });
    }
    setupDetalhes('insetosPresentes', 'insetos-detalhes');
    setupDetalhes('daninhasPresentesMip', 'daninhas-detalhes');
    setupDetalhes('doencasPresentesMip', 'doencas-detalhes');

    // Anexos
    document.getElementById('anexoMipMid').addEventListener('change', function(e) {
      let label = document.getElementById('anexoMipMid-nome');
      if (this.files.length > 0) {
        let nomes = Array.from(this.files).map(f => f.name).join(', ');
        label.textContent = nomes;
      } else {
        label.textContent = 'Nenhum arquivo selecionado';
      }
    });