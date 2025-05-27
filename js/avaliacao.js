async function atualizarAvaliacao(produtoId) {
  const avaliacaoEl = document.getElementById("avaliacao-produto");

  try {
    const resposta = await fetch(`https://6816fbb426a599ae7c39065c.mockapi.io/v1/produtos/${produtoId}`);
    if (!resposta.ok) throw new Error("Erro ao buscar avaliação");

    const produto = await resposta.json();

    const media = produto.avaliacoes ? produto.estrelas / produto.avaliacoes : 0;
    const total = produto.avaliacoes || 0;

    avaliacaoEl.innerHTML = `
      <div class="estrelas">
        ${gerarEstrelas(media)}
        <span class="avaliadores">(${total} avaliações)</span>
      </div>
    `;
  } catch (error) {
    avaliacaoEl.innerHTML = '<p style="color:red;">Erro ao carregar avaliações.</p>';
    console.error(error);
  }
}

function gerarEstrelas(media) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (media >= i) {
      html += '★';    
    } else if (media >= i - 0.5) {
      html += '☆';    
    } else {
      html += '☆';    
    }
  }
  return html;
}
