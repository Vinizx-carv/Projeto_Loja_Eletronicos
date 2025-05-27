document.addEventListener('DOMContentLoaded', () => {
  const radios = document.querySelectorAll('#avaliacao input[type="radio"]');
  const mensagem = document.getElementById("mensagem");

  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      const nota = parseInt(radio.value);

      fetch("https://6816fbb426a599ae7c39065c.mockapi.io/v1/avaliacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nota })
      })
      .then(res => res.json())
      .then(() => {
        mensagem.textContent = "Obrigado pela sua avaliação!";
        mensagem.style.color = "green";
      })
      .catch(() => {
        mensagem.textContent = "Erro ao enviar sua avaliação.";
        mensagem.style.color = "red";
      });
    });
  });
});
