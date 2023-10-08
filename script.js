const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
];

const productsContainer = document.getElementById('products-container');
const cartContainer = document.getElementById('cart-container');

const cart = [];

function renderProducts() {
    Products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <span>${product.name} - ${product.price}</span>
            <button class="remove-btn" onclick="removeFromCart(${product.id})">-</button>
            <span id="quantity-${product.id}">0</span>
            <button class="add-btn" onclick="addToCart(${product.id})">+</button>
            
        `;
        productsContainer.appendChild(productItem);
    });
}

function renderCart() {
    cartContainer.innerHTML = '';
    let totalSum = 0;
    if (cart.length === 0) {
        cartContainer.innerText = 'No Product added to the cart';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            const product = Products.find(p => p.id === item.id);
            const totalPrice = product.price * item.quantity;
            totalSum += totalPrice;
            cartItem.innerText = `${product.name} ------${item.quantity} * ${totalPrice}`;
            cartContainer.appendChild(cartItem);
        });
        const totalElement = document.createElement('div');
        totalElement.innerText = `Total: ${totalSum}`;
        cartContainer.appendChild(totalElement);
    }
}

function addToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    renderCart();
    updateQuantityDisplay(productId);
}

function removeFromCart(productId) {
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity--;
        if (cart[existingItemIndex].quantity <= 0) {
            cart.splice(existingItemIndex, 1);
        }
    }
    renderCart();
    updateQuantityDisplay(productId);
}

function updateQuantityDisplay(productId) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    const cartItem = cart.find(item => item.id === productId);
    if (quantityElement && cartItem) {
        quantityElement.innerText = cartItem.quantity;
    } else if (quantityElement) {
        quantityElement.innerText = '0';
    }
}

renderProducts();