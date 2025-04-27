document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    // Form validation
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Simple validation
            if (!email || !password) {
                alert("Please fill in all fields");
                return false;
            }

            // In a real application, you would send this data to your server
            // For demo purposes, we'll just show an alert
            alert("Login successful! Welcome back to HeavenlyCrumbs!");
            loginForm.reset();
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