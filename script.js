// Hamburger menü
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-links a');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
}

// Menü bezárása linkre kattintva (mobil)
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const target = document.getElementById(this.getAttribute('href').substring(1));
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 60,
                behavior: 'smooth'
            });
        }
    });
});


// ===============================
// FORMSPREE AJAX SUBMIT (NO REDIRECT)
// ===============================

const form = document.querySelector('.contact-form');
const status = document.querySelector('.form-status');

if (form && status) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();     // ⛔ megállítja az átirányítást
        e.stopPropagation();

        status.textContent = "Küldés folyamatban...";

        const data = new FormData(form);

        fetch(form.action, {
            method: "POST",
            body: data,
            headers: {
                "Accept": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                status.textContent = "✅ Üzenet elküldve! Köszönöm.";
                form.reset();
            } else {
                throw new Error("Form hiba");
            }
        })
        .catch(() => {
            status.textContent = "❌ Nem sikerült elküldeni. Próbáld újra később.";
        });
    });
}
