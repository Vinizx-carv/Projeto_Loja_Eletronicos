document.getElementById("finalizar-compra").addEventListener("click", () => {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  if (carrinho.length === 0) {
    alert("O carrinho está vazio.");
    return;
  }

  localStorage.setItem("produtosParaAvaliar", JSON.stringify(carrinho));

  window.location.href = "avaliacao.html";
});
