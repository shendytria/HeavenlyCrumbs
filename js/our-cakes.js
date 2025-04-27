// Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        // Show/hide menu items based on filter
        menuItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Modal Functionality
const menuGrid = document.getElementById('menuGrid');
const modal = document.getElementById('cakeModal');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalStars = document.getElementById('modalStars');
const modalReviewCount = document.getElementById('modalReviewCount');
const modalIngredients = document.getElementById('modalIngredients');

// Sample cake data for modal
const cakeData = {
    "Elegant Blue Marble Wedding Cake": {
        ingredients: ["Vanilla sponge cake", "Swiss meringue buttercream", "Edible gold leaf", "Fondant", "Food-grade color gel"],
        reviews: [
            { text: "This cake was the highlight of our wedding! Not only was it gorgeous, but it tasted divine.", author: "Emily W." },
        ]
    },
    "Chocolate Birthday Delight": {
        ingredients: ["Belgian chocolate", "Fresh cream", "Seasonal berries", "Dark chocolate ganache", "Vanilla extract"],
        reviews: [
            { text: "Best chocolate cake I've ever had! Moist, rich, and the perfect amount of sweetness.", author: "Jessica R." },
        ]
    },
    "Spring Bloom Cake": {
        ingredients: ["Lemon sponge", "Orange zest", "Citrus buttercream", "Handcrafted sugar flowers", "Edible petals"],
        reviews: [
            { text: "This cake tastes like sunshine! The citrus flavors are perfectly balanced.", author: "Linda K." },
        ]
    }
};

// Default cake data for cakes not in the sample data
const defaultCakeData = {
    ingredients: ["Premium flour", "Free-range eggs", "Organic sugar", "High-quality butter", "Natural flavorings"],
    reviews: [
        { text: "Beautiful presentation and delicious taste. Will order again!", author: "Satisfied Client" }
    ]
};

// Open modal when clicking on a menu item
menuGrid.addEventListener('click', (e) => {
    const menuItem = e.target.closest('.menu-item');
    if (!menuItem) return;

    const title = menuItem.querySelector('h3').textContent;
    const price = menuItem.querySelector('.menu-item-price').textContent;
    const image = menuItem.querySelector('img').src;
    const rating = menuItem.querySelector('.rating').textContent;
    const reviewCount = rating.match(/\((\d+)\)/)[1];
    const stars = rating.match(/★+/)[0];

    // Set modal content
    modalTitle.textContent = title;
    modalPrice.textContent = price;
    modalImage.src = image;
    modalImage.alt = title;
    modalStars.textContent = stars;
    modalReviewCount.textContent = `(${reviewCount} reviews)`;

    // Get cake data or use default
    const data = cakeData[title] || defaultCakeData;

    // Set description
    modalDescription.textContent = data.description;

    // Set ingredients
    modalIngredients.innerHTML = '';
    data.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        modalIngredients.appendChild(li);
    });

    // Set reviews
    modalReviews.innerHTML = '';
    data.reviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review';

        const reviewText = document.createElement('div');
        reviewText.className = 'review-text';
        reviewText.textContent = review.text;

        const reviewAuthor = document.createElement('div');
        reviewAuthor.className = 'review-author';
        reviewAuthor.textContent = review.author;

        reviewDiv.appendChild(reviewText);
        reviewDiv.appendChild(reviewAuthor);
        modalReviews.appendChild(reviewDiv);
    });

    // Show modal
    modal.style.display = 'block';
});

// Close modal
modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Load More button functionality
// In a real implementation, this would load more cakes from a database
const loadMoreBtn = document.getElementById('loadMoreBtn');

loadMoreBtn.addEventListener('click', () => {
    // Add more cake items
    const moreItems = [
        {
            category: "wedding",
            price: "Rp3.00.000",
            image: "https://i.pinimg.com/736x/2d/6b/e2/2d6be25707fb35556fdcddec3d1f76ff.jpg",
            title: "Rustic Wedding Cake",
            description: "Three-tier semi-naked cake with real flowers",
            rating: "★★★★☆ (33)"
        },
        {
            category: "birthday",
            price: "Rp750.000",
            image: "https://i.pinimg.com/736x/e8/17/7e/e8177ea06c63c8067a288ce23497e1cf.jpg",
            title: "Rainbow Surprise Cake",
            description: "Colorful layers with sprinkles and candy decorations",
            rating: "★★★★★ (41)"
        },
        {
            category: "special",
            price: "Rp2.000.000",
            image: "https://i.pinimg.com/736x/f0/ff/cb/f0ffcbcc2c385c3973747f47e6cbd9e4.jpg",
            title: "Engagement Celebration Cake",
            description: "Elegant cake with romantic details and personalized topper",
            rating: "★★★★★ (28)"
        }
    ];

    const menuGrid = document.querySelector('.menu-grid');
    const currentFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');

    moreItems.forEach(item => {
        const newItem = document.createElement('div');
        newItem.className = 'menu-item';
        newItem.setAttribute('data-category', item.category);

        if (currentFilter !== 'all' && currentFilter !== item.category) {
            newItem.style.display = 'none';
        }

        newItem.innerHTML = `
    <div class="menu-item-price">${item.price}</div>
    <img src="${item.image}" alt="${item.title}">
    <div class="menu-item-info">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="rating">${item.rating}</div>
    </div>
`;

        menuGrid.appendChild(newItem);
    });

    // Update button state
    loadMoreBtn.textContent = "No More Cakes to Load";
    loadMoreBtn.disabled = true;
});

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Responsive adjustments
window.addEventListener('resize', () => {
    if (window.innerWidth > 767) {
        navLinks.style.display = 'flex';
    } else {
        navLinks.style.display = 'none';
    }
});

// Initialize modal data with first cake
document.addEventListener('DOMContentLoaded', () => {
    // Additional initialization code if needed
});