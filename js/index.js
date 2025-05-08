window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    preloader.style.opacity = "0";
    preloader.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  });


 
 

  document.getElementById('closeModal4').addEventListener('click', function () {
    document.getElementById('carrinho').style.display = 'none';
});
  


document.getElementById('button-carrinho').addEventListener('click', function () {
    document.getElementById('carrinho').style.display = 'flex';
});
  


function mostrarMensagem(texto) {
  const div = document.createElement('div');
  div.className = 'mensagem';
  div.innerHTML = `<p>${texto}</p>`;
  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 4000); // igual à duração da animação
}
