
document.getElementById('cadastroForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email-regis').value;
  const senha = document.getElementById('senha-regis').value;

  try {
    // Busca todos os usuários e verifica se o e-mail já existe
    const res = await fetch(API_URL);
    const data = await res.json();
    const jaExiste = data.some(u => u.email === email);

    if (jaExiste) {
      mostrarMensagem('E-mail já está cadastrado!');
      return;
    }

    // Cadastra o novo usuário
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });

    if (response.ok) {
      mostrarMensagem('Usuário cadastrado com sucesso!');
      
    } else {
      mostrarMensagem('Erro ao cadastrar. Tente novamente.');
    }

  } catch (err) {
    console.error(err);
    mostrarMensagem('Erro de conexão com a API.');
  }
});


