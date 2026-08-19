/* =========================================
   PAGE NAVIGATION
   ========================================= */

function showPage(pageId) {

    // Find all of the website pages
    const pages = document.querySelectorAll(".page");

    // Hide every page
    pages.forEach(function(page) {
        page.classList.remove("active-page");
    });

    // If we're returning to the cover, reset the envelope open state
    const envelope = document.querySelector('.envelope');
    const envelopeButton = document.querySelector('.envelope-button');
    if (pageId === 'cover') {
        if (envelope) envelope.classList.remove('open');
        if (envelopeButton) envelopeButton.classList.remove('opening');
    }

    // Find the page we want
    const selectedPage = document.getElementById(pageId);

    // Show that page
    selectedPage.classList.add("active-page");


    // Scroll back to the top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}



/* =========================================
   OPEN LETTER + START MUSIC
   ========================================= */

function openLetter() {

    const music = document.getElementById("backgroundMusic");

    const musicButton = document.getElementById("musicButton");

    // envelope elements for animation
    const envelope = document.querySelector('.envelope');
    const envelopeButton = document.querySelector('.envelope-button');


    // Background music volume
    if (music) music.volume = 0.35;


    // Start the music
    if (music) {
        music.play()
            .then(function() {

                // Show that music is playing
                musicButton.textContent = "♫";

            })
            .catch(function(error) {

                console.log("Music could not start:", error);

            });
    }

    // Play envelope open animation, then navigate to the letter page
    if (envelope) {
        // add opening hint-class to hide "open me"
        if (envelopeButton) envelopeButton.classList.add('opening');

        // trigger open visuals
        envelope.classList.add('open');

        // after a short delay (match CSS transition), show the letter page
        setTimeout(function() {
            showPage("letter");
        }, 700);

    } else {
        // fallback: immediately open the letter
        showPage("letter");
    }
}



/* =========================================
   MUSIC PLAY / PAUSE BUTTON
   ========================================= */

function toggleMusic() {

    const music = document.getElementById("backgroundMusic");

    const musicButton = document.getElementById("musicButton");


    // If music is currently paused
    if (music.paused) {

        music.play()
            .then(function() {

                musicButton.textContent = "♫";

            })
            .catch(function(error) {

                console.log("Music could not play:", error);

            });

    }

    // If music is currently playing
    else {

        music.pause();

        musicButton.textContent = "♪";

    }

}



/* =========================================
   MEMORY SLIDESHOW
   ========================================= */

let currentSlide = 0;


// Get all slides
const slides = document.querySelectorAll(".slide");


// Get all slideshow dots
const dots = document.querySelectorAll(".dot");



/* =========================================
   SHOW A SLIDE
   ========================================= */

function showSlide(index) {


    // If we go past the last slide,
    // return to the first slide

    if (index >= slides.length) {

        currentSlide = 0;

    }


    // If we go backwards from the first slide,
    // go to the last slide

    else if (index < 0) {

        currentSlide = slides.length - 1;

    }


    // Otherwise show requested slide

    else {

        currentSlide = index;

    }



    /* Hide all slides */

    slides.forEach(function(slide) {

        slide.classList.remove("active");


        // If we leave the video slide,
        // pause ONLY the video.
        //
        // The background song keeps playing.

        const video = slide.querySelector("video");


        if (video) {

            video.pause();

        }

    });



    /* Turn off all dots */

    dots.forEach(function(dot) {

        dot.classList.remove("active-dot");

    });



    /* Show selected slide */

    if (slides[currentSlide]) {

        slides[currentSlide].classList.add("active");

    }



    /* Activate selected dot */

    if (dots[currentSlide]) {

        dots[currentSlide].classList.add("active-dot");

    }

}



/* =========================================
   NEXT / PREVIOUS SLIDE
   ========================================= */

function changeSlide(direction) {

    showSlide(currentSlide + direction);

}



/* =========================================
   CLICKING SLIDESHOW DOTS
   ========================================= */

function goToSlide(index) {

    showSlide(index);

}



/* =========================================
   VIDEO
   ========================================= */

/*
The video and background song are completely
independent.

This means:

BACKGROUND SONG = keeps playing
VIDEO = can also play

Both can play at the same time.
*/

const memoryVideo = document.getElementById("memoryVideo");


if (memoryVideo) {

    memoryVideo.addEventListener("play", function() {

        console.log("Memory video playing.");

        // DO NOT pause background music here.

    });


    memoryVideo.addEventListener("pause", function() {

        console.log("Memory video paused.");

        // Background music continues.

    });


    memoryVideo.addEventListener("ended", function() {

        console.log("Memory video ended.");

        // Background music continues.

    });

}



/* =========================================
   START WEBSITE
   ========================================= */

// Start memories slideshow on picture 1

showSlide(0);
