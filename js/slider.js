    let slideIndex = 0;

    function mostrarSlide() {
      const slides = document.getElementById('slides');
      slides.style.transform = `translateX(${-slideIndex * 100}%)`;
    }

    function mudarSlide(direcao) {
      const totalSlides = document.querySelectorAll('.slide').length;

      slideIndex += direcao;

      if (slideIndex < 0) slideIndex = totalSlides - 1;
      if (slideIndex >= totalSlides) slideIndex = 0;

      mostrarSlide();
    }

    // Autoplay a cada 3 segundos
    setInterval(() => {
      mudarSlide(1);
    }, 6000);