
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
  const valordividido = (produto.preco / 10).toFixed(2);
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
      <p><span class="preco-produto"> <strong>R$ ${produto.preco.toFixed(2)} </strong></span> no pix <br> ou 10x de R$ ${valordividido}</p>
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


function mostrarMensagem(texto) {
  const div = document.createElement('div');
  div.className = 'mensagem';
  div.innerHTML = `<p>${texto}</p>`;
  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 4000); 

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
      <div class="item-carrinho" style="border-bottom: 1px solid #ccc; padding: 10px 0;">
        <img src="${item.imagemPrincipal}" alt="${item.nome}" style="width: 60px; height: 60px; object-fit: contain;">
        <div class="detalhes-prod-carrinho">
          <p><strong>${item.nome}</strong></p>
          <p>Preço unitário: R$ ${preco.toFixed(2)}</p>
          <p>Total: R$ ${(preco * item.quantidade).toFixed(2)}</p>
          <div class="ajusta-quantidade" style="margin-top: 5px;">
            <button onclick="diminuirQuantidade('${item.id}')" class="menos-e-mais">-</button>
            <p>${item.quantidade}</p>
            <button onclick="aumentarQuantidade('${item.id}')" class="menos-e-mais">+</button>
          </div>
        </div>
        <button onclick="removerItem('${item.id}')" class="remover"><img src="../assents/delete.png" width="30px" alt=""></button>
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

document.getElementById("busca").addEventListener("input", function () {
  const termo = this.value.trim().toLowerCase();
  const precoMax = parseFloat(document.getElementById("preco").value);
  const marcasSelecionadas = [...document.querySelectorAll(".marca-checkbox:checked")].map(m => m.value);
  const tiposSelecionados = [...document.querySelectorAll(".tipo-checkbox:checked")].map(t => t.value);

  let filtrados = produtosGlobal.filter(p => {
    const atendePreco = parseFloat(p.preco) <= precoMax;
    const atendeMarca = marcasSelecionadas.length ? marcasSelecionadas.includes(p.marca) : true;
    const atendeTipo = tiposSelecionados.length ? tiposSelecionados.includes(p.tipo) : true;
    const atendeBusca = p.nome.toLowerCase().includes(termo);
    return atendePreco && atendeMarca && atendeTipo && atendeBusca;
  });

  exibirProdutos(filtrados);
});
}