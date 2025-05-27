// avaliacao.js

function criarEstrelas(containerId) {
  const container = document.getElementById(containerId);
  let notaSelecionada = 0;

  // Função que pinta as estrelas até o índice selecionado
  function pintarEstrelas(ate) {
    for (let i = 1; i <= 5; i++) {
      const star = container.querySelector(`#star-${i}`);
      if (i <= ate) {
        star.classList.add('filled');
      } else {
        star.classList.remove('filled');
      }
    }
  }

  // Cria as 5 estrelas
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.classList.add('star');
    star.id = `star-${i}`;
    star.innerHTML = '★'; // Estrela Unicode cheia
    star.addEventListener('click', () => {
      notaSelecionada = i;
      pintarEstrelas(i);
      console.log(`Você selecionou ${notaSelecionada} estrelas`);
    });
    container.appendChild(star);
  }
}

window.criarEstrelas = criarEstrelas; // Exporta a função para usar no outro JS
