// js/index.js

// Lógica existente do preloader
window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        preloader.style.opacity = "0";
        preloader.style.transition = "opacity 0.5s ease";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 500);
    }
});

// Lógica existente para fechar e abrir modal do carrinho
const carrinhoModal = document.getElementById('carrinho');
const closeModalCarrinhoBtn = document.getElementById('closeModal4');
const openCarrinhoBtn = document.getElementById('button-carrinho');

if (closeModalCarrinhoBtn && carrinhoModal) {
    closeModalCarrinhoBtn.addEventListener('click', function () {
        carrinhoModal.style.display = 'none';
    });
}

if (openCarrinhoBtn && carrinhoModal) {
    openCarrinhoBtn.addEventListener('click', function () {
        carrinhoModal.style.display = 'flex';
        atualizarDisplayCarrinho(); // Atualiza o display sempre que o carrinho é aberto
    });
}

// Lógica existente para mostrar mensagem
function mostrarMensagem(texto) {
  const divMensagem = document.getElementById('mensagem'); // Use a div existente
  if (divMensagem) {
      divMensagem.querySelector('p').textContent = texto;
      divMensagem.classList.add('show'); // Adiciona uma classe para mostrar
      setTimeout(() => {
          divMensagem.classList.remove('show'); // Remove a classe para esconder
      }, 4000);
  } else { // Fallback se a div não existir como no HTML original
      const div = document.createElement('div');
      div.className = 'mensagem show'; // Adiciona 'show' para consistência
      div.innerHTML = `<p>${texto}</p>`;
      document.body.appendChild(div);
      setTimeout(() => {
          div.remove();
      }, 4000);
  }
}


// --- Carrinho de Compras Logic ---
let carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItensLojaTech')) || [];

const carrinhoConteudoDiv = document.querySelector('#carrinho .conteudo');
const carrinhoSubtotalP = document.querySelector('#carrinho .carrinho-subtotal p');
const carrinhoTotalP = document.querySelector('#carrinho .carrinho-total p');
const produtosContainer = document.getElementById('pro'); // Container dos produtos em Index.html

function salvarCarrinho() {
    localStorage.setItem('carrinhoItensLojaTech', JSON.stringify(carrinhoItens));
}

// Função para adicionar produto ao carrinho (chamada globalmente)
function adicionarAoCarrinho(id, nome, preco, imagem) {
    const precoNumerico = parseFloat(preco);
    if (isNaN(precoNumerico)) {
        console.error("Preço inválido:", preco);
        mostrarMensagem("Erro: Preço inválido para o produto.");
        return;
    }

    // Gera um ID único para cada item no carrinho, mesmo que seja o mesmo produto
    // Isso permite remover instâncias específicas se o mesmo produto for adicionado várias vezes.
    const cartItemId = Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9);

    carrinhoItens.push({ cartItemId, id, nome, preco: precoNumerico, imagem });
    salvarCarrinho();
    mostrarMensagem(`${nome} adicionado ao carrinho!`);
    atualizarDisplayCarrinho();
}

function removerDoCarrinho(cartItemId) {
    carrinhoItens = carrinhoItens.filter(item => item.cartItemId !== cartItemId);
    salvarCarrinho();
    atualizarDisplayCarrinho();
}

function atualizarDisplayCarrinho() {
    if (!carrinhoConteudoDiv) {
        // console.error("Elemento '.conteudo' do carrinho não encontrado.");
        return; // Não faz nada se o container do carrinho não estiver na página atual
    }
    carrinhoConteudoDiv.innerHTML = '';

    if (carrinhoItens.length === 0) {
        carrinhoConteudoDiv.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
        carrinhoItens.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('carrinho-item');
            // Garante que o preço do item é um número antes de formatar
            const precoItemFormatado = typeof item.preco === 'number' ? item.preco.toFixed(2) : 'N/A';
            itemDiv.innerHTML = `
                <img src="${item.imagem}" alt="${item.nome}" class="carrinho-item-img">
                <div class="carrinho-item-info">
                    <h4>${item.nome}</h4>
                    <p>R$ ${precoItemFormatado}</p>
                </div>
                <button class="remover-item-btn" data-cart-item-id="${item.cartItemId}">&times;</button>
            `;
            carrinhoConteudoDiv.appendChild(itemDiv);
        });
    }
    atualizarTotalCarrinho();
}

function atualizarTotalCarrinho() {
    const subtotal = carrinhoItens.reduce((acc, item) => acc + (typeof item.preco === 'number' ? item.preco : 0), 0);
    const total = subtotal; // Adicionar lógica de frete/descontos aqui se necessário

    if (carrinhoSubtotalP) {
        carrinhoSubtotalP.textContent = `R$ ${subtotal.toFixed(2)}`;
    }
    if (carrinhoTotalP) {
        carrinhoTotalP.textContent = `R$ ${total.toFixed(2)}`;
    }
}

// Event Listener para botões "Adicionar ao Carrinho" (delegação de evento em #pro)
if (produtosContainer) {
    produtosContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('adicionar-carrinho-btn')) {
            const button = event.target;
            const id = button.dataset.id;
            const nome = button.dataset.nome;
            const preco = button.dataset.preco;
            const imagem = button.dataset.imagem;
            adicionarAoCarrinho(id, nome, preco, imagem);
        }
    });
}

// Event Listener para botões "Remover" no carrinho (delegação de evento em .conteudo)
if (carrinhoConteudoDiv) {
    carrinhoConteudoDiv.addEventListener('click', function(event) {
        if (event.target.classList.contains('remover-item-btn')) {
            const cartItemId = event.target.dataset.cartItemId;
            removerDoCarrinho(cartItemId);
        }
    });
}

// Inicializar o display do carrinho ao carregar a página (se o carrinho estiver visível ou para os totais)
document.addEventListener('DOMContentLoaded', () => {
    if (carrinhoModal) { // Só atualiza se o modal do carrinho existir na página
       atualizarDisplayCarrinho();
    }
});