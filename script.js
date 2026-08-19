// Run after DOM ready
document.addEventListener('DOMContentLoaded', function () {
  // Page navigation
  function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active-page'));
    const selected = document.getElementById(pageId);
    if (selected) selected.classList.add('active-page');
    // ensure music button state persists
    const music = document.getElementById('backgroundMusic');
    const musicButton = document.getElementById('musicButton');
    if (music && musicButton) {
      musicButton.textContent = music.paused ? '♪' : '♫';
      musicButton.setAttribute('aria-pressed', (!music.paused).toString());
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  window.showPage = showPage;

  // Music controls
  const music = document.getElementById('backgroundMusic');
  const musicButton = document.getElementById('musicButton');
  if (music) music.volume = 0.35;

  function setMusicButton(paused) {
    if (!musicButton) return;
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

  // Lightbox / scrapbook behavior
  const lightbox = document.getElementById('lightbox');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxMedia = document.getElementById('lightboxMedia');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  const thumbnails = Array.from(document.querySelectorAll('.thumbnail'));
  let currentIndex = -1;

  function showLightbox(index) {
    if (index < 0 || index >= thumbnails.length) return;
    currentIndex = index;
    const btn = thumbnails[index];
    const type = btn.dataset.type;
    const src = btn.dataset.src;
    openLightbox(src, type);
  }

  function openLightbox(src, type) {
    // clear previous
    lightboxMedia.innerHTML = '';

    if (type === 'image') {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Memory image';
      lightboxMedia.appendChild(img);
    } else if (type === 'video') {
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.style.maxHeight = '80vh';
      lightboxMedia.appendChild(video);
    }

    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    // pause video if any
    const v = lightboxMedia.querySelector('video');
    if (v) {
      v.pause();
      v.src = '';
    }
    lightboxMedia.innerHTML = '';
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    currentIndex = -1;
  }

  function showNext() {
    if (thumbnails.length === 0) return;
    currentIndex = (currentIndex + 1) % thumbnails.length;
    showLightbox(currentIndex);
  }

  function showPrev() {
    if (thumbnails.length === 0) return;
    currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    showLightbox(currentIndex);
  }

  thumbnails.forEach((thumb, idx) => {
    thumb.addEventListener('click', () => {
      currentIndex = idx;
      const type = thumb.dataset.type;
      const src = thumb.dataset.src;
      openLightbox(src, type);
    });
  });

  lightboxClose && lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop && lightboxBackdrop.addEventListener('click', closeLightbox);
  lightboxNext && lightboxNext.addEventListener('click', showNext);
  lightboxPrev && lightboxPrev.addEventListener('click', showPrev);

  // keyboard support for lightbox
  document.addEventListener('keydown', (e) => {
    if (lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    }
  });

  // initialize
  showPage('cover');
});
