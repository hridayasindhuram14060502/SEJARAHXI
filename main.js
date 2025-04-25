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

// animation
var PARTICLE_NUM = 500;
var PARTICLE_BASE_RADIUS = 0.5;
var FL = 500; 
var DEFAULT_SPEED = 2;
var BOOST_SPEED = 300;

var canvas;
var canvasWidth, canvasHeight;
var context;
var centerX, centerY;
var mouseX, mouseY;
var speed = DEFAULT_SPEED;
var targetSpeed = DEFAULT_SPEED;
var particles = [];

window.addEventListener('load', function() {
    canvas = document.getElementById('c');

    var resize = function() {
        canvasWidth  = canvas.width = window.innerWidth;
        canvasHeight = canvas.height = window.innerHeight;
        centerX = canvasWidth * 0.5;
        centerY = canvasHeight * 0.5;
        context = canvas.getContext('2d');

        context.clearRect(0, 0, canvasWidth, canvasHeight);
    };

    window.addEventListener('resize', resize);
    resize();

    mouseX = centerX;
    mouseY = centerY;

    for (var i = 0; i < PARTICLE_NUM; i++) {
        particles[i] = randomizeParticle(new Particle());
        particles[i].z -= 500 * Math.random();
    }

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.addEventListener('mousedown', function() {
        targetSpeed = BOOST_SPEED;
    });

    document.addEventListener('mouseup', function() {
        targetSpeed = DEFAULT_SPEED;
    });

    setInterval(loop, 1000 / 60);
});

function loop() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    speed += (targetSpeed - speed) * 0.01;

    var p, cx, cy, rx, ry, f, x, y, r, pf, px, py, pr, a, a1, a2;
    var halfPi = Math.PI * 0.5;
    var atan2  = Math.atan2;
    var cos    = Math.cos;
    var sin    = Math.sin;

    context.beginPath();
    for (var i = 0; i < PARTICLE_NUM; i++) {
        p = particles[i];

        p.pastZ = p.z;
        p.z -= speed;

        if (p.z <= 0) {
            randomizeParticle(p);
            continue;
        }

        cx = centerX - (mouseX - centerX) * 1.25;
        cy = centerY - (mouseY - centerY) * 1.25;

        rx = p.x - cx;
        ry = p.y - cy;

        f = FL / p.z;
        x = cx + rx * f;
        y = cy + ry * f;
        r = PARTICLE_BASE_RADIUS * f;

        pf = FL / p.pastZ;
        px = cx + rx * pf;
        py = cy + ry * pf;
        pr = PARTICLE_BASE_RADIUS * pf;

        a  = atan2(py - y, px - x);
        a1 = a + halfPi;
        a2 = a - halfPi;

        context.moveTo(px + pr * cos(a1), py + pr * sin(a1));
        context.arc(px, py, pr, a1, a2, true);
        context.lineTo(x + r * cos(a2), y + r * sin(a2));
        context.arc(x, y, r, a2, a1, true);
        context.closePath();
    }

    context.fillStyle = "rgb(82, 46, 0)"; 
    context.fill();
}

function randomizeParticle(p) {
    p.x = Math.random() * canvasWidth;
    p.y = Math.random() * canvasHeight;
    p.z = Math.random() * 1500 + 500;
    return p;
}

function Particle(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.pastZ = 0;
}

// button
document.addEventListener('DOMContentLoaded', function () {
    const buttonsComponent = document.querySelector('.buttons');
    const buttonsToggle = document.querySelector('.buttons__toggle');
    const buttonsCtas = document.querySelector('.buttons__ctas');

    buttonsToggle.addEventListener('click', function () {
        buttonsComponent.classList.toggle('buttons--active');
    });

    document.addEventListener('click', function (event) {
        if (!buttonsComponent.contains(event.target)) {
            buttonsComponent.classList.remove('buttons--active');
        }
    });
});

// to do list
new Vue({
    el: '#app',
    data: {
        tasks: [
            { name: 'Hafal Semua Tokoh Pahlawan' },
            { name: 'Nilai Sejarah Diatas 95' },
            { name: 'Menceritakan Ulang Materi Dengan Lancar' }
        ],
        newTask: "",
        showToDo: false
    },
    methods: {
        toggleToDoList() {
            this.showToDo = !this.showToDo;
        },
        newItem() {
            if (!this.newTask.trim()) return;
            this.tasks.push({ name: this.newTask });
            this.newTask = "";
        },
        delItem(task) {
            this.tasks.splice(this.tasks.indexOf(task), 1);
        }
    }
});

// modal video
function openModal() {
    document.getElementById("videoModal").style.display = "block";
}

function closeModal() {
    let video = document.getElementById("videoPlayer");
    video.pause(); // Hentikan video saat modal ditutup
    document.getElementById("videoModal").style.display = "none";
}

// chatbot
function sendMessage() {
    const userInput = document.getElementById("user-input").value;
  
    if (userInput.trim() === "") return;
  
    appendMessage(userInput, 'user');
  
    let botResponse = getBotResponse(userInput);
  
    setTimeout(() => {
        appendMessage(botResponse, 'bot');
    }, 500);
  
    document.getElementById("user-input").value = "";
  }
  
  function getBotResponse(userInput) {
    const lowerCaseInput = userInput.toLowerCase().trim();
  
    if (lowerCaseInput.includes('halo') || lowerCaseInput.includes('hai')) {
        return "Halo! Apakah ada yang bisa saya bantu?";
    } 
  
    else if (lowerCaseInput.includes('siapa fatmawati soekarno')) {
        return "Fatmawati Soekarno adalah istri dari Presiden pertama Indonesia, Soekarno, sekaligus Ibu Negara Indonesia yang pertama. Ia dikenal sebagai penjahit bendera Merah Putih yang dikibarkan saat Proklamasi Kemerdekaan Indonesia pada 17 Agustus 1945.";
    } 
  
    else {
        return "Maaf, saya tidak mengerti pesan Anda. Bisakah Anda menjelaskannya kembali?";
    }
  }
  
  function appendMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageElement.classList.add("chat-message", sender);
    chatBox.appendChild(messageElement);
    
    chatBox.scrollTop = chatBox.scrollHeight;
  }

// toggle chatbot
document.addEventListener("DOMContentLoaded", function () {
    const chatButton = document.querySelector(".buttonschatbot");
    const chatContainer = document.querySelector(".chattbott");

    function updateChatPosition() {
        if (window.innerWidth >= 1025) {
            // **Desktop Mode**
            chatContainer.style.top = "auto";
            chatContainer.style.bottom = "100px"; // Jarak dari bawah
            // chatContainer.style.bottom = "20%"; // Jarak dari bawah
            // chatContainer.style.left = "50%"; // Jarak dari kanan
            chatContainer.style.right = "100px"; // Jarak dari kanan
            chatContainer.style.left = "auto";
            chatContainer.style.transform = "none";
        } else {
            // **Tablet & Mobile Mode**
            chatContainer.style.top = "50%";
            chatContainer.style.left = "50%";
            chatContainer.style.bottom = "auto";
            chatContainer.style.right = "auto";
            chatContainer.style.transform = "translate(-50%, -50%)";
        }
    }

    updateChatPosition();
    window.addEventListener("resize", updateChatPosition);

    chatContainer.style.display = "none";
    chatContainer.style.opacity = "0";
    chatContainer.style.transition = "opacity 0.3s ease-in-out, transform 0.3s ease-in-out";
    chatContainer.style.boxShadow = "0px 10px 30px rgba(0, 0, 0, 0.2)";
    chatContainer.style.borderRadius = "15px";
    chatContainer.style.overflow = "hidden";
    chatContainer.style.position = "fixed";

    chatButton.addEventListener("click", function (event) {
        event.preventDefault();
        if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
            chatContainer.style.display = "block";
            setTimeout(() => {
                chatContainer.style.opacity = "1";
            }, 10);
        } else {
            chatContainer.style.opacity = "0";
            setTimeout(() => {
                chatContainer.style.display = "none";
            }, 300);
        }
    });
});
