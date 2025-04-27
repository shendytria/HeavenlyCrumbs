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
    const signupForm = document.getElementById('signupForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation
            if (password.value !== confirmPassword.value) {
                alert("Passwords don't match!");
                return false;
            }

            // Password strength validation
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            if (!passwordRegex.test(password.value)) {
                alert("Password must be at least 8 characters with letters, numbers and special characters");
                return false;
            }

            // If validation passes
            alert("Account created successfully! Welcome to HeavenlyCrumbs!");
            signupForm.reset();
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