document.addEventListener('DOMContentLoaded', function () {
    // Hero Image Slider
    const slides = document.querySelector('#slides');
    const slideElements = document.querySelectorAll('.slide');
    const slidesCount = slideElements.length;
    let currentSlide = 0;
    let slideWidth = document.querySelector('.slider-container').clientWidth;
    let autoSlideInterval;

    // Create navigation dots
    const sliderNav = document.getElementById('sliderNav');
    for (let i = 0; i < slidesCount; i++) {
        const dot = document.createElement('button');
        dot.classList.add('slider-nav-btn');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(i);
        });
        sliderNav.appendChild(dot);
    }

    // Happy moments images - using placeholders for demo
    const happyMoments = [
        { url: 'https://i.pinimg.com/736x/8d/e4/b4/8de4b4fb543ebf1bfb826d648b62ab89.jpg', alt: 'Wedding Celebration' },
        { url: 'https://i.pinimg.com/736x/d9/0f/17/d90f176d110b6a19ff38044b817d7eca.jpg', alt: 'Birthday Party' },
        { url: 'https://i.pinimg.com/736x/64/5d/90/645d90a67d79b3c01ab0ebaa6cd23ef3.jpg', alt: 'Anniversary Celebration' },
        { url: 'https://i.pinimg.com/736x/74/d5/8f/74d58ff1f6e41d984bf5812968743c69.jpg', alt: 'Graduation Party' }
    ];

    // Set images
    slideElements.forEach((slide, index) => {
        if (happyMoments[index]) {
            slide.style.backgroundImage = `url(${happyMoments[index].url})`;
            slide.setAttribute('aria-label', happyMoments[index].alt);
        }
    });

    // Next and previous buttons
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    nextBtn.addEventListener('click', () => {
        goToSlide((currentSlide + 1) % slidesCount);
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        goToSlide((currentSlide - 1 + slidesCount) % slidesCount);
        resetAutoSlide();
    });

    // Add touch/swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;

    const sliderContainer = document.querySelector('.slider-container');

    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        resetAutoSlide();
    });

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            // Swipe left - next slide
            goToSlide((currentSlide + 1) % slidesCount);
        } else if (touchEndX - touchStartX > 50) {
            // Swipe right - previous slide
            goToSlide((currentSlide - 1 + slidesCount) % slidesCount);
        }
    }

    // Function to go to a specific slide
    function goToSlide(slideIndex) {
        // Update slide position
        slides.style.transform = `translateX(-${slideIndex * 100}%)`;

        // Update active dot
        const dots = document.querySelectorAll('.slider-nav-btn');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });

        currentSlide = slideIndex;
    }

    // Auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            goToSlide((currentSlide + 1) % slidesCount);
        }, 5000); // Change slide every 5 seconds
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Update slide width on window resize
    window.addEventListener('resize', () => {
        slideWidth = document.querySelector('.slider-container').clientWidth;
        goToSlide(currentSlide);
    });

    // Start auto sliding
    startAutoSlide();

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