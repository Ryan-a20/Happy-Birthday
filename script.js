// Run after DOM ready
document.addEventListener('DOMContentLoaded', function () {
  // Page navigation
  function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active-page'));
    const selected = document.getElementById(pageId);
    if (selected) selected.classList.add('active-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  window.showPage = showPage;

  // Music controls
  const music = document.getElementById('backgroundMusic');
  const musicButton = document.getElementById('musicButton');
  if (music) music.volume = 0.35;

  function setMusicButton(paused) {
    if (paused) {
      musicButton.textContent = '♪';
      musicButton.setAttribute('aria-pressed', 'false');
    } else {
      musicButton.textContent = '♫';
      musicButton.setAttribute('aria-pressed', 'true');
    }
  }

  function toggleMusic() {
    if (!music) return;
    if (music.paused) {
      music.play().then(() => setMusicButton(false)).catch(err => console.log('play failed', err));
    } else {
      music.pause();
      setMusicButton(true);
    }
  }
  window.toggleMusic = toggleMusic;
  musicButton && musicButton.addEventListener('click', toggleMusic);

  function openLetter() {
    if (music && music.paused) {
      music.play().then(() => setMusicButton(false)).catch(err => console.log('Music could not start:', err));
    }
    showPage('letter');
  }
  window.openLetter = openLetter;

  // Slideshow
  let currentSlide = 0;
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dots = Array.from(document.querySelectorAll('.dot'));

  function updateSlides() {
    if (!slides.length) return;
    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
    dots.forEach((d, i) => d.classList.toggle('active-dot', i === currentSlide));
    // pause video on non-active slides
    slides.forEach((s, i) => {
      const v = s.querySelector('video');
      if (v && i !== currentSlide) v.pause();
    });
  }

  function showSlide(index) {
    if (!slides.length) return;
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    currentSlide = index;
    updateSlides();
  }
  window.showSlide = showSlide;

  function changeSlide(direction) {
    showSlide(currentSlide + direction);
  }
  window.changeSlide = changeSlide;

  function goToSlide(index) {
    showSlide(index);
  }
  window.goToSlide = goToSlide;

  // dot click handlers (in case they were added dynamically)
  dots.forEach((dot, idx) => dot.addEventListener('click', () => goToSlide(idx)));

  // keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') changeSlide(1);
    if (e.key === 'ArrowLeft') changeSlide(-1);
  });

  // initialize
  showSlide(0);
});
