const API_URL_PRO = 'https://6816fbb426a599ae7c39065c.mockapi.io/v1/produtos';

const precoRange = document.getElementById("preco");
const precoValor = document.getElementById("preco-valor");
const marcaContainer = document.getElementById("marca-container");
const tipoContainer = document.getElementById("tipo-container");
const produtosDiv = document.getElementById("pro");

let produtosGlobal = [];

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
      <p><strong>Marca:</strong> ${produto.marca}</p>
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

carregarProdutos();

