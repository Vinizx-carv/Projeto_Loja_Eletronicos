// URL da API
const API_URL_PRO = 'https://6816fbb426a599ae7c39065c.mockapi.io/v1/produtos';

// Elementos da DOM
const precoRange = document.getElementById("preco");
const precoValor = document.getElementById("preco-valor");
const marcaContainer = document.getElementById("marca-container");
const tipoContainer = document.getElementById("tipo-container");
const produtosDiv = document.getElementById("pro");

let produtosGlobal = [];
let carrinho = [];

function criarCard(produto) {
  return `
    <div class="card">
      <div class="card-image">

        <a href="pages/produto.html?id=${produto.id}">
          <img src="${produto.imagemPrincipal}" alt="${produto.nome}" />
        </a>

      </div>
      <h2>
        <a href="pages/produto.html?id=${produto.id}">
          ${produto.nome}
        </a>
      </h2>
      <p>R$ ${produto.preco}</p>

      <button onclick="adicionarAoCarrinho('${produto.id}')">Adicionar ao carrinho</button>

    </div>
  `;
}


async function carregarProdutos() {
  try {
    const res = await fetch(API_URL_PRO);
    const produtos = await res.json();
    produtosGlobal = produtos;

    preencherFiltros(produtos);
    exibirProdutos(produtos);
  } catch (error) {
    produtosDiv.innerHTML = '<p>Erro ao carregar produtos.</p>';
  }
}

function preencherFiltros(produtos) {
  const marcas = [...new Set(produtos.map(p => p.marca))];
  const tipos = [...new Set(produtos.map(p => p.tipo))];
  const precos = produtos.map(p => parseFloat(p.preco));
  const precoMax = Math.max(...precos);

  precoRange.max = Math.ceil(precoMax);
  precoRange.value = precoMax;
  precoValor.textContent = precoMax;

  precoRange.addEventListener("input", () => {
    precoValor.textContent = precoRange.value;
  });

  marcaContainer.innerHTML = "";
  marcas.forEach(m => {
    marcaContainer.innerHTML += `
      <div class="div-filtro">
        <input type="checkbox" class="marca-checkbox" value="${m}" id="marca-${m}">
        <label for="marca-${m}">${m}</label>
      </div>`;
  });

  tipoContainer.innerHTML = "";
  tipos.forEach(t => {
    tipoContainer.innerHTML += `
      <div>
        <input type="checkbox" class="tipo-checkbox" value="${t}" id="tipo-${t}">
        <label for="tipo-${t}">${t}</label>
      </div>`;
  });
}

function exibirProdutos(produtos) {
  produtosDiv.innerHTML = produtos.length
    ? produtos.map(criarCard).join('')
    : '<p>Nenhum produto encontrado.</p>';
}

document.getElementById("filtrar").addEventListener("click", () => {
  const precoMax = parseFloat(precoRange.value);

  const marcasSelecionadas = [...document.querySelectorAll(".marca-checkbox:checked")].map(el => el.value);
  const tiposSelecionados = [...document.querySelectorAll(".tipo-checkbox:checked")].map(el => el.value);

  let filtrados = produtosGlobal.filter(p => parseFloat(p.preco) <= precoMax);

  if (marcasSelecionadas.length)
    filtrados = filtrados.filter(p => marcasSelecionadas.includes(p.marca));

  if (tiposSelecionados.length)
    filtrados = filtrados.filter(p => tiposSelecionados.includes(p.tipo));

  exibirProdutos(filtrados);
});

function adicionarAoCarrinho(id) {
  const produto = produtosGlobal.find(p => p.id === id);
  if (!produto) return;

  const itemNoCarrinho = carrinho.find(p => p.id === id);

  if (itemNoCarrinho) {
    itemNoCarrinho.quantidade++;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }

  atualizarCarrinho();
}

function atualizarCarrinho() {
  const carrinhoDiv = document.querySelector("#carrinho .conteudo");
  carrinhoDiv.innerHTML = "";

  let subtotal = 0;

  carrinho.forEach(item => {
    const preco = parseFloat(item.preco);
    subtotal += preco * item.quantidade;

    carrinhoDiv.innerHTML += `
      <div class="item-carrinho" style="border-bottom: 1px solid #ccc; padding: 10px 0; display: flex; align-items: center;">
        <img src="${item.imagemPrincipal}" alt="${item.nome}" style="width: 50px; height: 50px; margin-right: 10px;">
        <div>
          <p><strong>${item.nome}</strong></p>
          <p>Preço unitário: R$ ${preco.toFixed(2)}</p>
          <p>Quantidade: ${item.quantidade}</p>
          <p>Total: R$ ${(preco * item.quantidade).toFixed(2)}</p>
          <div style="margin-top: 5px;">
            <button onclick="aumentarQuantidade('${item.id}')">+</button>
            <button onclick="diminuirQuantidade('${item.id}')">-</button>
            <button onclick="removerItem('${item.id}')">Remover</button>
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector(".carrinho-subtotal p").textContent = `R$ ${subtotal.toFixed(2)}`;
  document.querySelector(".carrinho-total p").textContent = `R$ ${subtotal.toFixed(2)}`;
}

function aumentarQuantidade(id) {
  const item = carrinho.find(p => p.id === id);
  if (item) {
    item.quantidade++;
    atualizarCarrinho();
  }
}

function diminuirQuantidade(id) {
  const item = carrinho.find(p => p.id === id);
  if (item) {
    item.quantidade--;
    if (item.quantidade <= 0) {
      carrinho = carrinho.filter(p => p.id !== id);
    }
    atualizarCarrinho();
  }
}

function removerItem(id) {
  carrinho = carrinho.filter(p => p.id !== id);
  atualizarCarrinho();
}

carregarProdutos();
