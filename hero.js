const images = [
    { title: "Agus Alim", url: "asset/tokoh/Agus Alim.png" },
    { title: "Ahmad Soebardjo", url: "asset/tokoh/Ahmad Soebardjo.png" },
    { title: "Amir Sjarifuddin", url: "asset/tokoh/Amir Sjarifuddin.png" },
    { title: "Chaerul Saleh", url: "asset/tokoh/Chaerul Saleh.png" },
    { title: "Fatmawati", url: "asset/tokoh/Fatmawati.png" },
    { title: "Jenderal Sudirman", url: "asset/tokoh/Jenderal Sudirman.png" },
    { title: "Kartini", url: "asset/tokoh/Kartini.png" },
    { title: "Ki Hajar Dewantara", url: "asset/tokoh/Ki Hajar Dewantara.png" },
    { title: "Laksmana Malahayati", url: "asset/tokoh/Laksmana Malahayati.png" },
    { title: "Laksmana Tadashi Maeda", url: "asset/tokoh/Laksmana Tadashi Maeda.png" },
    { title: "Mohammad Hatta", url: "asset/tokoh/Mohammad Hatta.png" },
    { title: "Mohammad Yamin", url: "asset/tokoh/Mohammad Yamin.png" },
    { title: "Rajiman Wediodiningrat", url: "asset/tokoh/Rajiman Wediodiningrat.png" },
    { title: "Rasuna Said", url: "asset/tokoh/Rasuna Said.png" },
    { title: "Sayuti Melik", url: "asset/tokoh/Sayuti Melik.png" },
    { title: "Soekarno", url: "asset/tokoh/Soekarno.png" },
    { title: "Soepomo", url: "asset/tokoh/Soepomo.png" },
    { title: "Sukarni", url: "asset/tokoh/Sukarni.png" },
    { title: "Sutan Syahrir", url: "asset/tokoh/Sutan Syahrir.png" },
    { title: "Tan Malaka", url: "asset/tokoh/Tan Malaka.png" },
    { title: "Wikana", url: "asset/tokoh/Wikana.png" }
];

const FLIP_SPEED = 750;
let flipTiming = {
	duration: FLIP_SPEED,
	iterations: 1
};

// flip down
let flipAnimationTop = [
	{ transform: "rotateX(0)" },
	{ transform: "rotateX(-90deg)" },
	{ transform: "rotateX(-90deg)" }
];
let flipAnimationBottom = [
	{ transform: "rotateX(90deg)" },
	{ transform: "rotateX(90deg)" },
	{ transform: "rotateX(0)" }
];

// flip up
let flipAnimationTopReverse = [
	{ transform: "rotateX(-90deg)" },
	{ transform: "rotateX(-90deg)" },
	{ transform: "rotateX(0)" }
];
let flipAnimationBottomReverse = [
	{ transform: "rotateX(0)" },
	{ transform: "rotateX(90deg)" },
	{ transform: "rotateX(90deg)" }
];

// selectors
const flipGallery = document.getElementById("flip-gallery");
const flipUnite = flipGallery.querySelectorAll(".unite");

let currentIndex = 0;

// flip that image!
function updateGallery(currentIndex, isReverse = false) {
	// define direction
	const topAnimation = isReverse ? flipAnimationTopReverse : flipAnimationTop;
	const bottomAnimation = isReverse
		? flipAnimationBottomReverse
		: flipAnimationBottom;

	// animate flipping
	flipGallery.querySelector(".overlay-top").animate(topAnimation, flipTiming);
	flipGallery
		.querySelector(".overlay-bottom")
		.animate(bottomAnimation, flipTiming);

	// hide title
	flipGallery.style.setProperty("--title-y", "-1rem");
	flipGallery.style.setProperty("--title-opacity", 0);
	flipGallery.setAttribute("data-title", "");

	// Update image
	flipUnite.forEach((el, idx) => {
		let delay;
		if (isReverse) {
			delay = idx === 1 || idx === 2 ? 0 : FLIP_SPEED - 200;
		} else {
			delay = idx === 1 || idx === 2 ? FLIP_SPEED - 200 : 0;
		}

		/*
		const delay = (isReverse && (idx !== 1 && idx !== 2)) || (!isReverse && (idx === 1 || idx === 2)) 
		? FLIP_SPEED - 200 
		: 0;
*/
		setTimeout(() => setActiveImage(el), delay);
	});

	// update and reveal new title
	//flipUnite[3].addEventListener("animationend", () => {
	setTimeout(() => setImageTitle(), FLIP_SPEED * 0.5); // approx delay on revealing title
}
// set active image
function setActiveImage(el) {
	el.style.backgroundImage = `url("${images[currentIndex].url}")`;
}
// set active image title and reveal
function setImageTitle() {
	flipGallery.setAttribute("data-title", images[currentIndex].title);
	flipGallery.style.setProperty("--title-y", "0");
	flipGallery.style.setProperty("--title-opacity", 1);
}

// update the image index and flip the galllery
function updateIndex(increment) {
	const newIndex = Number(increment);
	const isReverse = newIndex < 0;
	currentIndex = (currentIndex + newIndex + images.length) % images.length;
	updateGallery(currentIndex, isReverse);
}

// nav buttons
const galleryNavButtons = document
	.querySelectorAll("[data-gallery-nav]")
	.forEach((btn) => {
		btn.addEventListener("click", () => updateIndex(btn.dataset.galleryNav));
	});

// set up first image including title (no animation)
function defineFirstImg() {
	flipUnite.forEach((el, idx) => {
		setActiveImage(el);
		setImageTitle(el);
	});
}
defineFirstImg();

// preloader

window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    const video = document.getElementById('preloader-video');

    setTimeout(() => {
        preloader.style.display = 'none';
        mainContent.style.display = 'block';
    }, 9000);
    
    video.addEventListener('ended', function() {
        setTimeout(() => {
            preloader.style.display = 'none';
            mainContent.style.display = 'block';
        }, Math.max(0, 5000 - video.currentTime * 1000));
    });
});