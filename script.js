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
   OPEN LETTER + START MUSIC
   ========================================= */

function openLetter() {

    const music = document.getElementById("backgroundMusic");

    const musicButton = document.getElementById("musicButton");


    // Change this if you want the music louder/quieter
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

        music.play()
            .then(function() {

                musicButton.textContent = "♫";

            })
            .catch(function(error) {

                console.log("Music could not play:", error);

            });

    }

    else {

        music.pause();

        musicButton.textContent = "♪";

    }
}


/* =========================================
   MEMORY SLIDESHOW
   ========================================= */

let currentSlide = 0;

const slides = document.querySelectorAll(".slide");

const dots = document.querySelectorAll(".dot");


function showSlide(index) {

    if (slides.length === 0) {
        return;
    }


    // Go back to beginning after final slide
    if (index >= slides.length) {

        currentSlide = 0;

    }

    // Go to final slide when pressing back
    // from the first slide
    else if (index < 0) {

        currentSlide = slides.length - 1;

    }

    else {

        currentSlide = index;

    }


    // Hide every slide
    slides.forEach(function(slide) {

        slide.classList.remove("active");


        // Pause the video if you leave its slide.
        // THIS DOES NOT PAUSE THE BACKGROUND SONG.

        const video = slide.querySelector("video");

        if (video) {

            video.pause();

        }

    });


    // Turn off all dots
    dots.forEach(function(dot) {

        dot.classList.remove("active-dot");

    });


    // Show selected slide
    slides[currentSlide].classList.add("active");


    // Highlight selected dot
    if (dots[currentSlide]) {

        dots[currentSlide].classList.add("active-dot");

    }
}


/* =========================================
   NEXT / PREVIOUS
   ========================================= */

function changeSlide(direction) {

    showSlide(currentSlide + direction);

}


/* =========================================
   DOT NAVIGATION
   ========================================= */

function goToSlide(index) {

    showSlide(index);

}


/* =========================================
   MEMORY VIDEO
   ========================================= */

/*
   The memory video and the background music
   are independent.

   Therefore:

   SONG = continues playing
   VIDEO = plays at the same time
*/

const memoryVideo = document.getElementById("memoryVideo");


if (memoryVideo) {

    memoryVideo.addEventListener("play", function() {

        console.log("Memory video playing.");

        // Background music keeps playing.

    });


    memoryVideo.addEventListener("pause", function() {

        console.log("Memory video paused.");

        // Background music keeps playing.

    });


    memoryVideo.addEventListener("ended", function() {

        console.log("Memory video ended.");

        // Background music keeps playing.

    });

}


/* =========================================
   INITIALIZE WEBSITE
   ========================================= */

showSlide(0);


/* =========================================
   COPILOT: disable added animations (user request)
   This injects a small override style at runtime to
   turn off CSS animations and transitions without
   modifying the original stylesheet.
   ========================================= */
(function disableAnimations(){
    try {
        const css = `* , *::before, *::after {\n  animation: none !important;\n  transition: none !important;\n  scroll-behavior: auto !important;\n}`;
        const s = document.createElement('style');
        s.setAttribute('data-copilot','disable-animations');
        s.appendChild(document.createTextNode(css));
        (document.head || document.documentElement).appendChild(s);
    }
    catch (e) {
        // fail silently — nothing critical
        console.warn('Could not inject disable-animations stylesheet', e);
    }
})();
