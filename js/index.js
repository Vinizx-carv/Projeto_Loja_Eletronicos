




function mostrarMensagem(texto) {
  const div = document.createElement('div');
  div.className = 'mensagem';
  div.innerHTML = `<p>${texto}</p>`;
  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 4000); 
}
