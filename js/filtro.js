// js/filtro.js

const API_URL_PRO = 'https://6816fbb426a599ae7c39065c.mockapi.io/v1/produtos';

const precoRange = document.getElementById("preco");
const precoValor = document.getElementById("preco-valor");
const marcaContainer = document.getElementById("marca-container");
const tipoContainer = document.getElementById("tipo-container");
const produtosDiv = document.getElementById("pro");

let produtosGlobal = [];

function criarCard(produto) {
  // Certifique-se de que o preço é um número e formate-o
  const precoFormatado = parseFloat(produto.preco).toFixed(2);
  return `
    <div class="card">
      <div class="card-image">
        <img src="${produto.imagemPrincipal}" alt="${produto.nome}"/>
      </div>
      <h2>${produto.nome}</h2>
      <p>${produto.descricao}</p>
      <p><strong>Preço:</strong> R$ ${precoFormatado}</p>
      <p><strong>Marca:</strong> ${produto.marca}</p>
      <p><strong>Tipo:</strong> ${produto.tipo}</p>
      <button class="adicionar-carrinho-btn"
              data-id="${produto.id}"
              data-nome="${produto.nome}"
              data-preco="${precoFormatado}"
              data-imagem="${produto.imagemPrincipal}">
        Adicionar ao Carrinho
      </button>
    </div>
  `;
}

async function carregarProdutos() {
  try {
    const res = await fetch(API_URL_PRO);
    if (!res.ok) {
        throw new Error(`Erro HTTP: ${res.status}`);
    }
    const produtos = await res.json();
    produtosGlobal = produtos;

    preencherFiltros(produtos);
    exibirProdutos(produtos);
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    produtosDiv.innerHTML = '<p>Erro ao carregar produtos. Tente novamente mais tarde.</p>';
  }
}

function preencherFiltros(produtos) {
  const marcas = [...new Set(produtos.map(p => p.marca))];
  const tipos = [...new Set(produtos.map(p => p.tipo))];
  
  // Garante que os preços sejam números antes de encontrar o máximo
  const precosNumericos = produtos.map(p => parseFloat(p.preco)).filter(p => !isNaN(p));
  const precoMax = precosNumericos.length > 0 ? Math.max(...precosNumericos) : 10000; // Valor padrão caso não haja preços

  precoRange.max = Math.ceil(precoMax);
  precoRange.value = Math.ceil(precoMax); // Define o valor inicial do range
  precoValor.textContent = Math.ceil(precoMax);


  precoRange.addEventListener("input", () => {
    precoValor.textContent = precoRange.value;
  });

  marcaContainer.innerHTML = "";
  marcas.forEach(m => {
    marcaContainer.innerHTML += `
      <div>
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
  const precoMaxSelecionado = parseFloat(precoRange.value);

  const marcasSelecionadas = [...document.querySelectorAll(".marca-checkbox:checked")].map(el => el.value);
  const tiposSelecionados = [...document.querySelectorAll(".tipo-checkbox:checked")].map(el => el.value);

  let filtrados = produtosGlobal.filter(p => parseFloat(p.preco) <= precoMaxSelecionado);

  if (marcasSelecionadas.length)
    filtrados = filtrados.filter(p => marcasSelecionadas.includes(p.marca));

  if (tiposSelecionados.length)
    filtrados = filtrados.filter(p => tiposSelecionados.includes(p.tipo));

  exibirProdutos(filtrados);
});

carregarProdutos();