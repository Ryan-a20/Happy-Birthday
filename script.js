/* =========================================
   PAGE NAVIGATION
   ========================================= */

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active-page");
    });


    const selectedPage = document.getElementById(pageId);


    if (selectedPage) {

        selectedPage.classList.add("active-page");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   OPEN LETTER + MUSIC
   ========================================= */

function openLetter() {

    const music = document.getElementById("backgroundMusic");

    const musicButton = document.getElementById("musicButton");


    music.volume = 0.35;


    music.play()
        .then(function() {

            musicButton.textContent = "♫";

        })
        .catch(function(error) {

            console.log("Music could not start:", error);

        });


    showPage("letter");

}


/* =========================================
   MUSIC BUTTON
   ========================================= */

function toggleMusic() {

    const music = document.getElementById("backgroundMusic");

    const musicButton = document.getElementById("musicButton");


    if (music.paused) {

        music.play();

        musicButton.textContent = "♫";

    }

    else {

        music.pause();

        musicButton.textContent = "♪";

    }

}


/* =========================================
   SLIDESHOW
   ========================================= */

let currentSlide = 0;

const slides = document.querySelectorAll(".slide");

const dots = document.querySelectorAll(".dot");


function showSlide(index) {

    if (slides.length === 0) {
        return;
    }


    if (index >= slides.length) {

        currentSlide = 0;

    }

    else if (index < 0) {

        currentSlide = slides.length - 1;

    }

    else {

        currentSlide = index;

    }


    slides.forEach(function(slide) {

        slide.classList.remove("active");


        const video = slide.querySelector("video");


        if (video) {

            video.pause();

        }

    });


    dots.forEach(function(dot) {

        dot.classList.remove("active-dot");

    });


    slides[currentSlide].classList.add("active");


    if (dots[currentSlide]) {

        dots[currentSlide].classList.add("active-dot");

    }

}


/* NEXT / PREVIOUS */

function changeSlide(direction) {

    showSlide(currentSlide + direction);

}


/* CLICK DOT */

function goToSlide(index) {

    showSlide(index);

}


/* INITIAL SLIDE */

showSlide(0);

  // initialize
  showPage('cover');
});
