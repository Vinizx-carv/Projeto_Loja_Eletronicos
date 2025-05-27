import { API_URL_PRO } from './config.js';

const carrinho = [];

async function adicionarAoCarrinho(produtoId) {
  try {
    const res = await fetch(`${API_URL_PRO}/${produtoId}`);
    const produto = await res.json();

    const itemExistente = carrinho.find(item => item.id === produto.id);
    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      carrinho.push({ ...produto, quantidade: 1 });
    }

    atualizarCarrinhoVisual();
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error);
  }
}

function atualizarCarrinhoVisual() {
  const itensCarrinho = document.getElementById("itens-carrinho");
  const totalCarrinho = document.getElementById("total-carrinho");

  itensCarrinho.innerHTML = ""; // limpa antes de atualizar

  let total = 0;

  carrinho.forEach(item => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item-carrinho");
    itemDiv.innerHTML = `
      <p>${item.nome} x${item.quantidade} - R$ ${subtotal.toFixed(2)}</p>
    `;
    itensCarrinho.appendChild(itemDiv);
  });

  totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;
}



const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const container = document.getElementById('detalhe-produto');
const infor = document.getElementById('informação');
const desc = document.getElementById('descrição');



async function carregarProduto() {




  try {
    const res = await fetch(`${API_URL_PRO}/${id}`);
    const produto = await res.json();

    const valordividido = (produto.preco / 10);
    const valordivFormatado = valordividido.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    });

    const precoFormatado = produto.preco.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    });


    container.innerHTML = `
      <div class="produto-container">
        <div class="produto-esquerda">
          <div class="imagens-Extras">
              ${produto.imagensExtras?.map(imagem => `
                <div class="imagens-dentro">
              <img src="${imagem}" alt="Miniatura ${produto.nome}">
                      </div>
              `).join('') || ''}

          </div>
          <div class="imagem-principal">
          <div class="imagem-centro">
            <img src="${produto.imagemPrincipal}" alt="${produto.nome}">
          </div>
          </div>
        </div>
        <div class="produto-direita">
        <div>
          <h1>  ${produto.nome}, ${produto.marca},${produto.linha} </h1>
          <p>Por <span class="preco-produto">R$ ${precoFormatado}</span> no pix <br> ou 10x de R$ ${valordivFormatado}</p>
        </div> 
        <div class="btn-add-comprar">  
          <button class="comprar">Comprar</button>
<button onclick="adicionarAoCarrinho('${produto.id}')" class="add-carrinho">Adicionar ao carrinho</button>
          <p style="text-align: center; font-size: 1rem;">Vendido e entregue por <strong>Bytestore</strong></p>
        </div>
      </div>
    `;



    
    
const especificacoes = [];

if(produto.marca) especificacoes.push({ nome: 'Marca', valor: produto.marca });
if(produto.modelo) especificacoes.push({ nome: 'Modelo', valor: produto.modelo });
if(produto.preco) especificacoes.push({ nome: 'Preço', valor: produto.preco });
if(produto.processador) especificacoes.push({ nome: 'Processador', valor: produto.processador });
if(produto.fabricante) especificacoes.push({ nome: 'Fabricante', valor: produto.fabricante });
if(produto.linha) especificacoes.push({ nome: 'Linha', valor: produto.linha });
if(produto.serie) especificacoes.push({ nome: 'Série', valor: produto.serie });
if(produto.tipo) especificacoes.push({ nome: 'Tipo', valor: produto.tipo });
if(produto.memoria) especificacoes.push({ nome: 'Tamanho da memória', valor: produto.memoria });
if(produto.grafica) especificacoes.push({ nome: 'Memória gráfica', valor: produto.grafica });
if(produto.versao) especificacoes.push({ nome: 'Versão', valor: produto.versao})
if(produto.cor) especificacoes.push({ nome: 'Cor', valor: produto.cor});
if(produto.plataforma) especificacoes.push({ nome: 'Plataforma', valor: produto.plataforma});
if(produto.submodelo) especificacoes.push({ nome: 'Submodelo', valor: produto.submodelo});
if(produto.edicao) especificacoes.push({ nome: 'Edicao', valor: produto.edicao});
if(produto.genenos) especificacoes.push({ nome: 'Genero', valor: produto.genero});
if(produto.titulo) especificacoes.push({ nome: 'Titulo', valor: produto.titulo});
if(produto.desenvolvedores) especificacoes.push({ nome: 'Desenvolvedores', valor: produto.desenvolvedores});
if(produto.editoras) especificacoes.push({ nome: 'Editoras', valor: produto.editoras});
if(produto.ram) especificacoes.push({ nome: 'Memória Ram', valor: produto.ram});
if(produto.detalhado) especificacoes.push({ nome: 'Modelo detalhado', valor: produto.detalhado});
if(produto.alfanumero) especificacoes.push({ nome: 'Modelo alfanumero', valor: produto.alfanumero});
if(produto.nome) especificacoes.push({ nome: 'Nome', valor: produto.nome});
if(produto.frequencia) especificacoes.push({ nome: 'Frequencia', valor: produto.frequencia});
if(produto.ssd) especificacoes.push({ nome: 'SSD', valor: produto.ssd});
if(produto.colecao) especificacoes.push({ nome: 'Coleção', valor: produto.colecao});
if(produto.classificacao) especificacoes.push({ nome: 'Classificacao', valor: produto.classificacao});







let especificacoesHTML = especificacoes.map(esp => `
  <div class="especificacao">
    <p>${esp.nome}</p>
    <p>${esp.valor || 'Não informado'}</p>
  </div>
`).join('');

infor.innerHTML = `
  <div class="especificacao-container">
    <h1>Especificações</h1>
    ${especificacoesHTML}
  </div>
`;

let descricaoHTML = `<p>${produto.descricao || 'Descrição não informada.'}</p>`;

desc.innerHTML = `
  <div class="descricao-container">
    <h1>Descrição</h1>
    ${descricaoHTML}
  </div>
`;


    const containerImg = container.querySelector('.imagem-centro');
    const img = container.querySelector('.imagem-centro img');

    containerImg.addEventListener('mousemove', e => {
      const rect = containerImg.getBoundingClientRect();

      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
      img.style.transform = 'scale(1.6)';
    });

    containerImg.addEventListener('mouseleave', () => {

      img.style.transform = 'scale(1)';
    });

  } catch (error) {
    container.innerHTML = '<p>Erro ao carregar produto.</p>';
  }

  
    const imagemPrincipal = container.querySelector('.imagem-centro img');
    const miniaturas = container.querySelectorAll('.imagens-dentro img');

    miniaturas.forEach(miniatura => {
      miniatura.addEventListener('click', () => {
        imagemPrincipal.src = miniatura.src;
        imagemPrincipal.alt = miniatura.alt || 'Imagem principal';
      });
    });

}




















carregarProduto();
