// =========================
// OPEN / CLOSE MODAL
// =========================
function openFeedbackForm() {
    const modal = document.getElementById("feedbackFormBox");

    if (modal.style.display === "flex") {
        modal.style.display = "none";
    } else {
        modal.style.display = "flex";
    }
}

// Close when clicking outside modal
window.addEventListener("click", function (e) {
    const modal = document.getElementById("feedbackFormBox");
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

const links = document.querySelectorAll(".nav-link");
const slider = document.querySelector(".slider-indicator");

function moveSlider(el) {
    slider.style.width = el.offsetWidth + "px";
    slider.style.left = el.offsetLeft + "px";

    links.forEach(l => l.classList.remove("active"));
    el.classList.add("active");
}

window.addEventListener("load", () => {
    const active = document.querySelector(".nav-link.active");
    if (active) moveSlider(active);
});

links.forEach(link => {
    link.addEventListener("click", function () {
        moveSlider(this);
    });
});


// =========================
// LOAD FEEDBACK FROM STORAGE
// =========================
let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
renderFeedback();


// =========================
// SUBMIT FEEDBACK
// =========================
document.getElementById("feedbackForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("fb_name").value.trim() || "Anonymous";
    const role = document.getElementById("fb_role").value;
    const message = document.getElementById("fb_message").value.trim();

    let rating = document.querySelector('input[name="rating"]:checked');
    rating = rating ? parseInt(rating.value) : 5;

    const feedback = {
        name,
        role,
        message,
        rating,
        date: new Date().toLocaleString()
    };

    feedbacks.unshift(feedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    renderFeedback();
    this.reset();

    document.getElementById("feedbackFormBox").style.display = "none";
});


// =========================
// DISPLAY FEEDBACK
// =========================
function renderFeedback() {
    const list = document.getElementById("feedbackList");
    list.innerHTML = "";

    feedbacks.forEach(fb => {
        let stars = "⭐".repeat(fb.rating);

        list.innerHTML += `
            <div class="feedback-item">
                <div class="stars">${stars}</div>
                <strong>${fb.name}</strong> (${fb.role})
                <p>${fb.message}</p>
                <small style="color:gray;">${fb.date}</small>
            </div>
        `;
    });
}


// =========================
// REGISTRATION FORM (FIXED)
// =========================
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registrationForm");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const btn = document.getElementById("registerBtn");

        const data = {
            name: document.getElementById("regName").value,
            email: document.getElementById("regEmail").value,
            phone: document.getElementById("regPhone").value,
            course: document.getElementById("regCourse").value,
            network: document.getElementById("networkSelect").value,
            paymentCode: document.getElementById("paymentCode").value
        };

        try {
            btn.innerText = "Processing...";
            btn.disabled = true;

            const res = await fetch("http://localhost:5500/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            console.log("SERVER RESPONSE:", result);

            if (res.ok) {
                alert("Success ✔ Registration sent");
                form.reset();
            } else {
                alert("Server error ❌");
            }

        } catch (err) {
            console.log("ERROR:", err);
            alert("Server not running or blocked");
        } finally {
            btn.innerText = "Register Now";
            btn.disabled = false;
        }
    });
});


// =========================
// PAYMENT NETWORK SWITCH
// =========================
const networkSelect = document.getElementById("networkSelect");
const paymentNumber = document.getElementById("paymentNumber");

if (networkSelect) {
    networkSelect.addEventListener("change", function () {

        if (this.value === "mtn") {
            paymentNumber.innerHTML = "MTN Pay To: <strong>0788123456</strong>";
        } else if (this.value === "airtel") {
            paymentNumber.innerHTML = "Airtel Pay To: <strong>0733123456</strong>";
        }

    });
}
function setLanguage(lang) {
    const elements = document.querySelectorAll("[data-key]");

    elements.forEach(el => {
        const key = el.getAttribute("data-key");

        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    // save language (important)
    localStorage.setItem("lang", lang);
}
window.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang") || "en";
    document.getElementById("languageSelect").value = savedLang;
    setLanguage(savedLang);
});
// Language Switcher JavaScript
const languages = ['en', 'fr', 'es', 'kin', 'sw'];

function changeLanguage(lang) {
    // Hide all languages
    languages.forEach(l => {
        document.querySelectorAll(`.lang-${l}`).forEach(el => {
            el.classList.remove('active');
        });
    });
    
    // Show selected language
    document.querySelectorAll(`.lang-${lang}`).forEach(el => {
        el.classList.add('active');
    });
    
    // Save preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Update dropdown
    const switcher = document.getElementById('languageSwitcher');
    if (switcher) switcher.value = lang;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const switcher = document.getElementById('languageSwitcher');
    if (switcher) {
        switcher.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }
    
    // Load saved language or browser default
    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = navigator.language.split('-')[0];
    
    let defaultLang = 'en';
    if (savedLang && languages.includes(savedLang)) {
        defaultLang = savedLang;
    } else if (languages.includes(browserLang)) {
        defaultLang = browserLang;
    } else if (browserLang === 'fr') {
        defaultLang = 'fr';
    } else if (browserLang === 'es') {
        defaultLang = 'es';
    }
    
    changeLanguage(defaultLang);
});
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,fr,es,rw,sw',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}
const translations = {

    en: {

        heroTitle: "Muhanga Technical Center",
        heroText: "Welcome to our technical education center",
        heroBtn: "Get Started",

        servicesTitle: "Our Services",

        service1Title: "Automobile",
        service1Text: "Learn modern automobile technology",

        service2Title: "Building Construction",
        service2Text: "Learn professional construction skills",

        aboutTitle: "About Us",
        aboutText: "We provide quality technical education.",

        contactTitle: "Contact Us"
    },

    rw: {

        heroTitle: "Muhanga Technical Center",
        heroText: "Murakaza neza mu kigo cyacu cy'imyuga",
        heroBtn: "Tangira",

        servicesTitle: "Serivisi Zacu",

        service1Title: "Ubwubatsi bw'Imodoka",
        service1Text: "Wige ikoranabuhanga ry'imodoka",

        service2Title: "Ubwubatsi",
        service2Text: "Wige imyuga y'ubwubatsi",

        aboutTitle: "Ibyerekeye Twebwe",
        aboutText: "Dutanga uburezi bwiza bw'imyuga.",

        contactTitle: "Twandikire"
    },

    fr: {

        heroTitle: "Centre Technique de Muhanga",
        heroText: "Bienvenue dans notre centre technique",
        heroBtn: "Commencer",

        servicesTitle: "Nos Services",

        service1Title: "Automobile",
        service1Text: "Apprenez la technologie automobile moderne",

        service2Title: "Construction",
        service2Text: "Apprenez les compétences professionnelles",

        aboutTitle: "À Propos",
        aboutText: "Nous fournissons une éducation technique de qualité.",

        contactTitle: "Contactez-nous"
    }

};

/* SELECT */
const languageSelect = document.getElementById("languageSelect");

/* CHANGE LANGUAGE */
function changeLanguage(language){

    document.querySelectorAll("[data-lang]").forEach(element => {

        const key = element.getAttribute("data-lang");

        if(translations[language][key]){

            element.textContent = translations[language][key];

        }

    });

}

/* EVENT */
languageSelect.addEventListener("change", () => {

    const selectedLanguage = languageSelect.value;

    changeLanguage(selectedLanguage);

    localStorage.setItem("language", selectedLanguage);

});

/* LOAD SAVED LANGUAGE */
window.addEventListener("DOMContentLoaded", () => {

    const savedLanguage = localStorage.getItem("language") || "en";

    languageSelect.value = savedLanguage;

    changeLanguage(savedLanguage);

});