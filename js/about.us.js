document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    // Responsive adjustments
    function handleResize() {
        if (window.innerWidth <= 767) {
            if (mobileMenuBtn) mobileMenuBtn.style.display = 'block';
            if (navLinks) navLinks.classList.remove('active');
        } else {
            if (mobileMenuBtn) mobileMenuBtn.style.display = 'none';
            if (navLinks) navLinks.style.display = 'flex';
        }
    }

    // Initial call and window resize event
    handleResize();
    window.addEventListener('resize', handleResize);
});