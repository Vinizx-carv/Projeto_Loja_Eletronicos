const API_URL_PRO = 'https://6816fbb426a599ae7c39065c.mockapi.io/v1/produtos';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const container = document.getElementById('detalhe-produto');
const infor = document.getElementById('informação');
// Mostra skeleton enquanto carrega
const skeleton = document.createElement('div');
skeleton.className = 'skeleton-produto';
skeleton.innerHTML = '<div class="skeleton image"></div><div class="skeleton text"></div>';
container.appendChild(skeleton);

async function carregarProduto() {
  try {
    const res = await fetch(`${API_URL_PRO}/${id}`);
    const produto = await res.json();

    container.innerHTML = `
      <div class="produto-container">
        <div class="produto-esquerda">
          <div class="imagens-miniaturas">
            ${produto.imagensSecundarias?.map(img => `
              <img src="${img}" alt="Miniatura">
            `).join('') || ''}
          </div>
          <div class="imagem-principal">
          <div class="imagem-centro">
            <img src="${produto.imagemPrincipal}" alt="${produto.nome}">
          </div>
          </div>
        </div>
        <div class="produto-direita">
          <h1> Notebook Samsung Galaxy Book 4, Intel® Core™ i5-1335U, 8GB, 512GB SSD, Tela 15.6" Full HD, Windows 11 + Headphone Bluetooth Goldentec GT Go Rosa ${produto.nome}, ${produto.marca}</h1>
          <p>Por <span class="preco-produto">R$ ${produto.preco}</span> no pix <br> ou 10x de <strong>R$ 339,90</strong></p>
          <button class="comprar">Comprar</button>
          <p style="text-align: center; font-size: 1rem;">Vendido e entregue por <strong>Bytestore</strong></p>
        </div>
      </div>
    `;
const especificacoes = [];

if(produto.marca) especificacoes.push({ nome: 'Marca', valor: produto.marca });
if(produto.modelo) especificacoes.push({ nome: 'Modelo', valor: produto.modelo });
if(produto.preco) especificacoes.push({ nome: 'Preço', valor: produto.preco });
if(produto.compatibilidade) especificacoes.push({ nome: 'Compatibilidade', valor: produto.compatibilidade });
if(produto.processador) especificacoes.push({ nome: 'Processador', valor: produto.processador });
// etc.

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
}

carregarProduto();
