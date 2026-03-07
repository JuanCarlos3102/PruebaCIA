
// ===== MENU RESPONSIVE =====
const menuToggle = document.getElementById("menu-toggle");
const sideMenu = document.getElementById("side-menu");

if (menuToggle && sideMenu) {
    menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        sideMenu.classList.toggle("active");
    });

    // Cerrar al hacer click afuera
    document.addEventListener("click", (e) => {
        if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            sideMenu.classList.remove("active");
        }
    });
}


// ===== CARRUSEL =====
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    if (slides[index]) {
        slides[index].classList.add("active");
    }
}

if (nextBtn && prevBtn && slides.length > 0) {

    nextBtn.addEventListener("click", () => {
        currentSlide++;
        if (currentSlide >= slides.length) currentSlide = 0;
        showSlide(currentSlide);
    });

    prevBtn.addEventListener("click", () => {
        currentSlide--;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        showSlide(currentSlide);
    });

    // Carrusel automático cada 6 segundos
    setInterval(() => {
        currentSlide++;
        if (currentSlide >= slides.length) currentSlide = 0;
        showSlide(currentSlide);
    }, 6000);
}


// ===== CHAT WHATSAPP =====
document.addEventListener("DOMContentLoaded", function(){

    const chatToggle = document.querySelector(".chat-toggle");
    const chatbot = document.querySelector(".chatbot");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");
    const chatBody = document.getElementById("chat-body");

    const phoneNumber = "525572340437"; // NUMERO WHATSAPP EMPRESA

    function getTime(){
        const now = new Date();
        return now.getHours().toString().padStart(2,'0') + ":" +
               now.getMinutes().toString().padStart(2,'0');
    }

    function addMessage(text, type){
        const msg = document.createElement("div");
        msg.classList.add("message", type);
        msg.innerHTML = `
            ${text}
            <div class="msg-time">${getTime()}</div>
        `;
        chatBody.appendChild(msg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function sendMessage(){

        const text = chatInput.value.trim();
        if(text === "") return;

        // Mostrar mensaje del usuario en el chat
        addMessage(text,"user");

        chatInput.value = "";

        // Mensaje automático
        setTimeout(() => {
            addMessage("Un asesor te atenderá por WhatsApp en unos segundos.", "bot");
        }, 600);

        // Abrir WhatsApp
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");

    }

    sendBtn.addEventListener("click", sendMessage);

    chatInput.addEventListener("keypress", function(e){
        if(e.key === "Enter"){
            sendMessage();
        }
    });

    // Abrir / cerrar chat
    chatToggle.addEventListener("click", function(e){
        e.stopPropagation();
        chatbot.classList.toggle("active");
    });

    document.addEventListener("click", function(e){
        if(!chatbot.contains(e.target) && !chatToggle.contains(e.target)){
            chatbot.classList.remove("active");
        }
    });

});

// ===== SERVICES BACKGROUND CHANGE =====
const services = document.querySelectorAll('.service-item');
const bg = document.getElementById('servicesBg');
const defaultImage = "ImagenPrincipal.jpg";

if (services.length > 0 && bg) {

    services.forEach(service => {

        service.addEventListener('mouseenter', () => {
            const newImage = service.getAttribute('data-image');
            bg.style.opacity = "0";

            setTimeout(() => {
                bg.style.backgroundImage = `url('${newImage}')`;
                bg.style.opacity = "1";
            }, 200);
        });

        service.addEventListener('mouseleave', () => {
            bg.style.opacity = "0";

            setTimeout(() => {
                bg.style.backgroundImage = `url('${defaultImage}')`;
                bg.style.opacity = "1";
            }, 200);
        });

    });
}


// ACORDEON MISION / VISION 

const cards = document.querySelectorAll(".about-card");

// Detectar si es dispositivo táctil
const isTouchDevice = window.matchMedia("(hover: none)").matches;

function closeAll() {
    cards.forEach(card => card.classList.remove("active"));
}

function openOnly(selected) {
    cards.forEach(card => {
        if (card === selected) {
            card.classList.add("active");
        } else {
            card.classList.remove("active");
        }
    });
}

cards.forEach(card => {

    // CLICK (funciona en todos)
    card.addEventListener("click", (e) => {
        e.stopPropagation();

        const isActive = card.classList.contains("active");
        closeAll();

        if (!isActive) {
            card.classList.add("active");
        }
    });

    // HOVER solo en desktop
    if (!isTouchDevice) {
        card.addEventListener("mouseenter", () => {
            openOnly(card);
        });
    }
});

// Si haces click fuera, se cierran todos
document.addEventListener("click", () => {
    closeAll();
});

document.querySelectorAll(".service-header").forEach(header => {

    header.addEventListener("click", () => {

        const item = header.parentElement;

        // cerrar otros abiertos
        document.querySelectorAll(".service-item").forEach(i => {
            if(i !== item){
                i.classList.remove("active");
            }
        });

        // toggle actual
        item.classList.toggle("active");
    });

});

// ===== BOTON TRADUCTOR MEJORADO =====

document.addEventListener("DOMContentLoaded", function () {

    const langBtn = document.getElementById("langBtn");

    function setCookie(name,value){
        document.cookie = name + "=" + value + ";path=/";
    }

    function translate(lang){

        const combo = document.querySelector(".goog-te-combo");

        if(!combo){
            setTimeout(()=>translate(lang),300);
            return;
        }

        combo.value = lang;
        combo.dispatchEvent(new Event("change"));

        // guardar idioma
        localStorage.setItem("lang",lang);

        // cambiar cookie para forzar traducción
        setCookie("googtrans","/es/"+lang);

        langBtn.innerHTML = lang === "en" ? "🌍 ES" : "🌍 EN";
    }

    langBtn.addEventListener("click",()=>{

        const current = localStorage.getItem("lang") || "es";

        const newLang = current === "es" ? "en" : "es";

        translate(newLang);

    });

});

// Eliminar barra de Google Translate
setInterval(() => {

    const banner = document.querySelector(".goog-te-banner-frame");
    if (banner) banner.remove();

    const tooltip = document.querySelector("#goog-gt-tt");
    if (tooltip) tooltip.remove();

    const balloon = document.querySelector(".goog-te-balloon-frame");
    if (balloon) balloon.remove();

}, 500);