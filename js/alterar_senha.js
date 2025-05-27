document.getElementById("reset-password-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome = document.getElementById("username").value;
    const email = document.getElementById("email-rec").value;
    const novaSenha = document.getElementById("new-password").value;

    try {
        
        const res = await fetch(API_URL);
        const usuarios = await res.json();

        
        const usuario = usuarios.find(user => user.nome === nome && user.email === email);

        if (!usuario) {
            mostrarMensagem('Usuário ou e-mail não encontrados.');
            return;
        }

        
        const updateRes = await fetch(`${API_URL}/${usuario.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...usuario, senha: novaSenha })
        });

        if (updateRes.ok) {
            mostrarMensagem('Senha modificada com sucesso!');
            window.location.href = 'index.html';
        } else {
            mostrarMensagem('Erro ao mudar a senha. Tente novamente.');
        }

    } catch (err) {
        console.error(err);
        mostrarMensagem('Erro de conexão com a API.');
    }
});

document.getElementById('rec').addEventListener('click', function() {
    document.getElementById('alterar_senha').style.display = 'flex';
});

document.getElementById('rec').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'none';
});

document.getElementById('closeModal3').addEventListener('click', function() {
    document.getElementById('alterar_senha').style.display = 'none';
});















document.getElementById('closeModal3').addEventListener('click', function () {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('blurOverlay').style.display = 'none';
});
  
