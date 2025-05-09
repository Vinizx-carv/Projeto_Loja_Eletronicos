// js/descricaoprod_logic.js

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id'); // Espera-se um ID na URL, ex: descricaoprod.html?id=1

    // Elementos da página para exibir informações do produto
    const nomeProdutoElem = document.getElementById('desc-nome-produto');
    const precoProdutoElem = document.getElementById('desc-preco-produto');
    const imgPrincipalElem = document.getElementById('desc-img-principal');
    const btnComprar = document.getElementById('desc-btn-comprar');

    // URL da API (pode ser melhor definir em um local compartilhado no futuro)
    const API_URL_BASE = 'https://6816fbb426a599ae7c39065c.mockapi.io/v1/produtos';

    if (productId && nomeProdutoElem && precoProdutoElem && imgPrincipalElem && btnComprar) {
        try {
            const res = await fetch(`${API_URL_BASE}/${productId}`);
            if (!res.ok) {
                throw new Error(`Produto com ID ${productId} não encontrado ou erro na API.`);
            }
            const produto = await res.json();

            nomeProdutoElem.textContent = produto.nome;
            const precoFormatado = parseFloat(produto.preco).toFixed(2);
            precoProdutoElem.textContent = `R$ ${precoFormatado}`;
            imgPrincipalElem.src = produto.imagemPrincipal;
            imgPrincipalElem.alt = produto.nome; // Atualiza o alt text da imagem

            // Configura o botão de comprar para adicionar ao carrinho
            btnComprar.addEventListener('click', () => {
                // A função adicionarAoCarrinho é definida em index.js e está globalmente acessível
                if (typeof adicionarAoCarrinho === 'function') {
                    adicionarAoCarrinho(produto.id, produto.nome, precoFormatado, produto.imagemPrincipal);
                } else {
                    console.error('Função adicionarAoCarrinho não encontrada. Verifique se js/index.js está incluído.');
                    alert('Erro ao tentar adicionar o produto ao carrinho.');
                }
            });

        } catch (error) {
            console.error("Erro ao carregar detalhes do produto:", error);
            if (nomeProdutoElem) nomeProdutoElem.textContent = 'Produto não encontrado';
            if (precoProdutoElem) precoProdutoElem.textContent = '---';
            if (imgPrincipalElem) imgPrincipalElem.alt = 'Erro ao carregar imagem';
            if (btnComprar) {
                btnComprar.textContent = 'Produto Indisponível';
                btnComprar.disabled = true;
            }
        }
    } else {
        if (!productId) {
            if (nomeProdutoElem) nomeProdutoElem.textContent = 'Produto não especificado.';
            console.warn('ID do produto não fornecido na URL (ex: ?id=123).');
        } else {
            console.warn('Um ou mais elementos da página de descrição do produto não foram encontrados no DOM.');
        }
        if (btnComprar) {
            btnComprar.textContent = 'Erro';
            btnComprar.disabled = true;
        }
    }
});