// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop actual submission
        const email = document.getElementById('email').value;

        // Simple feedback
        alert(`Thanks! We have received your message from ${email}. We will be in touch shortly.`);

        // Reset form
        contactForm.reset();
    });
}