// carrinho.js
export let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

export function adicionarAoCarrinho(produto) {
  const existente = carrinho.find(p => p.id === produto.id);
  if (existente) {
    existente.quantidade++;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarCarrinho();
}

export function atualizarCarrinho() {
  const container = document.getElementById("itens-carrinho");
  const totalEl = document.getElementById("total-carrinho");

  if (!container || !totalEl) return;

  container.innerHTML = "";
  let total = 0;

  carrinho.forEach(item => {
    const preco = parseFloat(item.preco);
    total += preco * item.quantidade;

    container.innerHTML += `
      <div class="item-carrinho">
        <p>${item.nome}</p>
        <p>Qtd: ${item.quantidade}</p>
        <p>R$ ${(item.quantidade * preco).toFixed(2)}</p>
      </div>
    `;
  });

  totalEl.innerText = `Total: R$ ${total.toFixed(2)}`;
}
