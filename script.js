// Product Data
const products = [
    {
        id: 1,
        name: "Camisa Social Preta",
        category: "camisas",
        price: 149.90,
        oldPrice: 199.90,
        image: "👔",
        imageFront: "images/products/FRENTE1.png",
        imageBack: "images/products/COSTAS1.png",
        badge: "Novo"
    },
    {
        id: 2,
        name: "Camisa Casual Branca",
        category: "camisas",
        price: 129.90,
        oldPrice: null,
        image: "👔",
        imageFront: "images/products/FRENTE2.png",
        imageBack: "images/products/COSTAS2.png",
        badge: null
    },
    {
        id: 3,
        name: "Camisa 3",
        category: "camisas",
        price: 139.90,
        oldPrice: null,
        image: "👔",
        imageFront: "images/products/FRENTE3.png",
        imageBack: "images/products/COSTAS3.png",
        badge: null
    }
];

// Shopping Cart
let cart = [];
let currentFilter = 'all';

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const searchBtn = document.getElementById('searchBtn');
const searchBar = document.getElementById('searchBar');
const closeSearch = document.getElementById('closeSearch');
const searchInput = document.getElementById('searchInput');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const filterTabs = document.querySelectorAll('.filter-tab');

// Tab Management - Global function
window.switchTab = function(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(`${tabName}Tab`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Activate corresponding nav link
    const activeLink = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Close mobile menu
    navMenu.classList.remove('active');
    
    // If home tab, render featured products and catalog showcase
    if (tabName === 'home') {
        renderFeaturedProducts();
        renderCatalogShowcase();
    }
    
    // If catalog tab, render products
    if (tabName === 'catalog') {
        renderProducts();
    }
    
    // If checkout tab, render checkout
    if (tabName === 'checkout') {
        renderCheckout();
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderFeaturedProducts();
    renderCatalogShowcase();
    updateCartCount();
    setupEventListeners();
    setupTabNavigation();
    setupHeroVideo();
    setupBrandImage();
});

// Setup Hero Video Animation
function setupHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');
    const heroContent = document.querySelector('.hero-content');
    
    if (!heroVideo || !heroContent) return;
    
    let hasShown = false;
    
    const showContent = () => {
        if (hasShown) return;
        hasShown = true;
        setTimeout(() => {
            heroContent.classList.add('visible');
        }, 5000);
    };
    
    // Wait for video to start playing, then wait 5 seconds
    heroVideo.addEventListener('playing', showContent);
    
    // Fallback: if video is already playing or loaded
    if (heroVideo.readyState >= 2) {
        heroVideo.play().then(() => {
            showContent();
        }).catch(() => {
            // If autoplay fails, show after load
            showContent();
        });
    }
    
    // Also trigger on canplay event
    heroVideo.addEventListener('canplay', () => {
        if (!hasShown) {
            showContent();
        }
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Cart
    cartBtn.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);

    // Search
    searchBtn.addEventListener('click', toggleSearch);
    closeSearch.addEventListener('click', closeSearchBar);

    // Menu Toggle
    menuToggle.addEventListener('click', toggleMenu);

    // Filter Tabs (product filters)
    const productFilterTabs = document.querySelectorAll('.filter-tab');
    productFilterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            productFilterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilter = tab.dataset.filter;
            renderProducts();
        });
    });

    // Search Input
    searchInput.addEventListener('input', handleSearch);
}

// Setup Tab Navigation
function setupTabNavigation() {
    // Main navigation tabs
    document.querySelectorAll('.nav-link[data-tab]').forEach(link => {
        link.addEventListener('click', () => {
            const tabName = link.dataset.tab;
            switchTab(tabName);
        });
    });
    
    // Footer links
    document.querySelectorAll('.footer-link[data-tab]').forEach(link => {
        link.addEventListener('click', () => {
            const tabName = link.dataset.tab;
            switchTab(tabName);
        });
    });
}

// Render Products
function renderProducts(filteredProducts = null) {
    const productsToShow = filteredProducts || 
        (currentFilter === 'all' ? products : products.filter(p => p.category === currentFilter));
    
    productsGrid.innerHTML = productsToShow.map(product => {
        return renderProductCard(product);
    }).join('');
}

// Render Featured Products (for home page)
function renderFeaturedProducts() {
    const featuredProductsGrid = document.getElementById('featuredProductsGrid');
    if (!featuredProductsGrid) return;
    
    // Get only camisas (the 3 shirts)
    const camisas = products.filter(p => p.category === 'camisas');
    
    featuredProductsGrid.innerHTML = camisas.map(product => {
        return renderProductCard(product);
    }).join('');
}

// Render Catalog Showcase (for home page - below brand identity)
function renderCatalogShowcase() {
    const catalogShowcaseGrid = document.getElementById('catalogShowcaseGrid');
    if (!catalogShowcaseGrid) return;
    
    // Get all products (the 3 camisas)
    const allProducts = products.filter(p => p.category === 'camisas');
    
    catalogShowcaseGrid.innerHTML = allProducts.map(product => {
        return renderProductCard(product);
    }).join('');
}

// Render Product Card (helper function)
function renderProductCard(product) {
    // Check if product has front and back images (camisas)
    const hasMultipleImages = product.imageFront && product.imageBack;
    
    let imageHTML = '';
    if (hasMultipleImages) {
        // For camisas with front and back images
        imageHTML = `
            <div class="product-image-container">
                <img src="${product.imageFront}" alt="${product.name} - Frente" class="product-img product-img-front" onerror="handleImageError(this, '${product.image}')">
                <img src="${product.imageBack}" alt="${product.name} - Costas" class="product-img product-img-back" onerror="handleImageError(this, '${product.image}')">
                <div class="image-toggle-hint">Passe o mouse para ver costas</div>
            </div>
        `;
    } else {
        // For other products, use emoji placeholder
        imageHTML = `<div class="product-placeholder">${product.image}</div>`;
    }
    
    return `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                ${imageHTML}
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">
                    R$ ${product.price.toFixed(2).replace('.', ',')}
                    ${product.oldPrice ? `<span class="product-price-old">R$ ${product.oldPrice.toFixed(2).replace('.', ',')}</span>` : ''}
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `;
}

// Get Category Name
function getCategoryName(category) {
    const names = {
        'camisas': 'Camisas',
        'calcas': 'Calças',
        'bermudas': 'Bermudas',
        'acessorios': 'Acessórios'
    };
    return names[category] || category;
}

// Handle Image Error
function handleImageError(img, fallbackEmoji) {
    img.onerror = null; // Prevent infinite loop
    img.style.display = 'none';
    
    // Check if placeholder already exists
    const container = img.parentElement;
    if (!container.querySelector('.product-placeholder')) {
        const placeholder = document.createElement('div');
        placeholder.className = 'product-placeholder';
        placeholder.textContent = fallbackEmoji;
        container.appendChild(placeholder);
    }
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartCount();
    renderCart();
    
    // Update checkout if it's currently visible
    const checkoutTab = document.getElementById('checkoutTab');
    if (checkoutTab && checkoutTab.classList.contains('active')) {
        renderCheckout();
    }
    
    showNotification(`${product.name} adicionado ao carrinho!`);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCart();
    
    // Update checkout if it's currently visible
    const checkoutTab = document.getElementById('checkoutTab');
    if (checkoutTab && checkoutTab.classList.contains('active')) {
        renderCheckout();
    }
}

// Update Cart Count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Render Cart
function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><p>SEU CARRINHO ESTÁ VAZIO</p></div>';
        document.querySelector('#cartTotalWrapper span:first-child').textContent = 'TOTAL:';
        document.getElementById('cartTotal').textContent = 'R$ 0,00';
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartItems.innerHTML = cart.map(item => {
        // Use real image if available (camisas have imageFront), otherwise use emoji
        const imageHTML = item.imageFront 
            ? `<img src="${item.imageFront}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">`
            : `<div style="font-size: 2rem;">${item.image}</div>`;
        
        return `
        <div class="cart-item">
            <div class="cart-item-image">
                ${imageHTML}
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">
                    R$ ${item.price.toFixed(2).replace('.', ',')} x ${item.quantity}
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
        </div>
    `;
    }).join('');

    document.querySelector('#cartTotalWrapper span:first-child').textContent = 'TOTAL:';
    document.getElementById('cartTotal').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Open Cart
function openCart() {
    renderCart();
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Cart
function closeCartSidebar() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Toggle Search
function toggleSearch() {
    searchBar.classList.toggle('active');
    if (searchBar.classList.contains('active')) {
        searchInput.focus();
    }
}

// Close Search
function closeSearchBar() {
    searchBar.classList.remove('active');
    searchInput.value = '';
    renderProducts();
}

// Handle Search
function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query === '') {
        renderProducts();
        return;
    }

    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        getCategoryName(product.category).toLowerCase().includes(query)
    );

    renderProducts(filtered);
}

// Toggle Menu
function toggleMenu() {
    navMenu.classList.toggle('active');
}

// Render Checkout Page
function renderCheckout() {
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutShipping = document.getElementById('checkoutShipping');
    const checkoutTotal = document.getElementById('checkoutTotal');
    
    if (!checkoutItems) return;
    
    if (cart.length === 0) {
        checkoutItems.innerHTML = '<div class="checkout-empty"><p>SEU CARRINHO ESTÁ VAZIO</p><p style="margin-top: 1rem;"><button class="btn btn-primary" onclick="switchTab(\'catalog\')">IR PARA CATÁLOGO</button></p></div>';
        if (checkoutSubtotal) checkoutSubtotal.textContent = 'R$ 0,00';
        if (checkoutShipping) checkoutShipping.textContent = 'R$ 0,00';
        if (checkoutTotal) checkoutTotal.textContent = 'R$ 0,00';
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 200 ? 0 : 15.00; // Frete grátis acima de R$ 200
    const total = subtotal + shipping;
    
    checkoutItems.innerHTML = cart.map(item => {
        // Use real image if available (camisas have imageFront), otherwise use emoji
        const imageHTML = item.imageFront 
            ? `<img src="${item.imageFront}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">`
            : `<div style="font-size: 2rem;">${item.image}</div>`;
        
        return `
        <div class="checkout-item">
            <div class="checkout-item-image">
                ${imageHTML}
            </div>
            <div class="checkout-item-info">
                <div class="checkout-item-name">${item.name}</div>
                <div class="checkout-item-details">Qtd: ${item.quantity} | R$ ${item.price.toFixed(2).replace('.', ',')} cada</div>
            </div>
            <div class="checkout-item-price">
                R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}
            </div>
        </div>
    `;
    }).join('');
    
    if (checkoutSubtotal) checkoutSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    if (checkoutShipping) checkoutShipping.textContent = shipping > 0 ? `R$ ${shipping.toFixed(2).replace('.', ',')}` : 'GRÁTIS';
    if (checkoutTotal) checkoutTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Setup Smooth Scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--accent-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Setup Brand Image
function setupBrandImage() {
    const brandImage = document.getElementById('brandImage');
    const brandPlaceholder = document.querySelector('.brand-placeholder');
    
    if (!brandImage || !brandPlaceholder) return;
    
    // Show placeholder initially
    brandPlaceholder.style.display = 'block';
    brandImage.style.display = 'none';
    
    // Handle image load error
    brandImage.addEventListener('error', () => {
        brandImage.style.display = 'none';
        brandPlaceholder.style.display = 'block';
    });
    
    // Handle image load success
    brandImage.addEventListener('load', () => {
        if (brandImage.complete && brandImage.naturalWidth > 0) {
            brandImage.style.display = 'block';
            brandPlaceholder.style.display = 'none';
        } else {
            brandImage.style.display = 'none';
            brandPlaceholder.style.display = 'block';
        }
    });
    
    // Check if image is already loaded
    if (brandImage.complete) {
        if (brandImage.naturalWidth > 0) {
            brandImage.style.display = 'block';
            brandPlaceholder.style.display = 'none';
        } else {
            brandImage.style.display = 'none';
            brandPlaceholder.style.display = 'block';
        }
    }
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Contact Form Handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
    });
}

// Checkout Form Handler
const checkoutForm = document.getElementById('checkoutForm');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            showNotification('Seu carrinho está vazio!');
            return;
        }
        
        // Here you would normally send the data to a server
        showNotification('Pedido finalizado com sucesso! Em breve você receberá um email de confirmação.');
        cart = [];
        updateCartCount();
        renderCheckout();
        renderCart();
        checkoutForm.reset();
    });
}

