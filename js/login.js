const API_URL = 'https://6816fbb426a599ae7c39065c.mockapi.io/v1/usuarios';

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const response = await fetch(`${API_URL}?email=${email}`);
    const usuarios = await response.json();

    if (usuarios.length === 0) {
      alert('Usuário não encontrado!');
      return;
    }

    const usuario = usuarios[0];

    if (usuario.senha === senha) {
      alert(`Bem-vindo, ${usuario.nome}!`);
      // Aqui você pode redirecionar, ex: window.location.href = "produtos.html";
    } else {
      alert('Senha incorreta!');
    }
  } catch (err) {
    console.error(err);
    alert('Erro ao tentar fazer login.');
  }
});

document.getElementById('btnLogin').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'flex';
  });
  
  document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'none';
  });
  
  document.getElementById('sign-up-link').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'none';
    
  });
  
  document.getElementById('sign-up-link').addEventListener('click', function() {
    document.getElementById('cadastroForm').style.display = 'flex';
  });
  
  document.getElementById('closeModal2').addEventListener('click', function() {
    document.getElementById('cadastroForm').style.display = 'none';
  });


  window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    preloader.style.display = "none";
  });















  




  //temporario procura forma melhor de fazer
  document.getElementById('btnLogin').addEventListener('click', function () {
    document.getElementById('loginForm').style.display = 'flex';
    document.getElementById('blurOverlay').style.display = 'block';
});
//esse tambem
document.getElementById('closeModal').addEventListener('click', function () {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('blurOverlay').style.display = 'none';
});
  




