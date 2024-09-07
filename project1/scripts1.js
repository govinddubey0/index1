// JavaScript Enhancements (if any)

document.addEventListener('DOMContentLoaded', function () {
    // Add any custom JavaScript here
});

// Example of smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
