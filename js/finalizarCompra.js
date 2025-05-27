document.getElementById("finalizar-compra").addEventListener("click", () => {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  if (carrinho.length === 0) {
    alert("O carrinho está vazio.");
    return;
  }

  // Salva os produtos no localStorage para avaliação posterior
  localStorage.setItem("produtosParaAvaliar", JSON.stringify(carrinho));

  // Redireciona para a página de avaliação (sem passar id no parâmetro)
  window.location.href = "avaliacao.html";
});
