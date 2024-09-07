// Smooth scroll-to-top button functionality
const scrollToTopButton = document.getElementById("scroll-to-top");

window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopButton.style.display = "block";
    } else {
        scrollToTopButton.style.display = "none";
    }
};

scrollToTopButton.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Loading animation
window.addEventListener('load', function() {
    document.getElementById('loading-spinner').style.display = 'none';
});

// Parallax scrolling effect (optional if required)
window.addEventListener('scroll', function() {
    const parallax = document.querySelector('.parallax');
    if (parallax) {
        let scrollPosition = window.pageYOffset;
        parallax.style.backgroundPositionY = scrollPosition * 0.5 + "px";
    }
});
