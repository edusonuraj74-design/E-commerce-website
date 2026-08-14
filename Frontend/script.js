// ========================================
// CART DATA
// ========================================

let cart = [];


// ========================================
// PRODUCTS
// ========================================

const products = [
    {
        id: 1,
        name: "Smart Watch",
        price: 1999,
        image: "images/smartwatch.jpg"
    },

    {
        id: 2,
        name: "Headphones",
        price: 1499,
        image: "images/headphones.jpg"
    },

    {
        id: 3,
        name: "Keyboard",
        price: 999,
        image: "images/keyboard.jpg"
    },

    {
        id: 4,
        name: "Wireless Mouse",
        price: 699,
        image: "images/mouse.jpg"
    }
];


// ========================================
// ADD TO CART
// ========================================

function addToCart(productId) {

    const product = products.find(function(item) {
        return item.id === productId;
    });

    const existingProduct = cart.find(function(item) {
        return item.id === productId;
    });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    updateCart();

    alert(product.name + " added to cart!");
}


// ========================================
// UPDATE CART
// ========================================

function updateCart() {

    const cartCount = document.getElementById("cart-count");

    const cartItems = document.getElementById("cart-items");

    const cartTotal = document.getElementById("cart-total");


    // Calculate total quantity

    let totalQuantity = 0;

    cart.forEach(function(item) {

        totalQuantity += item.quantity;

    });


    cartCount.textContent = totalQuantity;


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

        cartTotal.textContent = "0";

        return;
    }


    // Clear old cart

    cartItems.innerHTML = "";


    // Total price

    let totalPrice = 0;


    // Display products

    cart.forEach(function(item) {

        totalPrice += item.price * item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-product-info">

                <h3>${item.name}</h3>

                <p>₹${item.price}</p>

                <div class="quantity">

                    <button onclick="decreaseQuantity(${item.id})">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${item.id})">
                        +
                    </button>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    // Show total

    cartTotal.textContent = totalPrice;

}


// ========================================
// INCREASE QUANTITY
// ========================================

function increaseQuantity(productId) {

    const product = cart.find(function(item) {

        return item.id === productId;

    });


    if (product) {

        product.quantity++;

    }


    updateCart();
}


// ========================================
// DECREASE QUANTITY
// ========================================

function decreaseQuantity(productId) {

    const product = cart.find(function(item) {

        return item.id === productId;

    });


    if (product) {

        product.quantity--;

    }


    // Remove product if quantity becomes 0

    if (product && product.quantity <= 0) {

        cart = cart.filter(function(item) {

            return item.id !== productId;

        });

    }


    updateCart();
}


// ========================================
// REMOVE PRODUCT
// ========================================

function removeFromCart(productId) {

    cart = cart.filter(function(item) {

        return item.id !== productId;

    });


    updateCart();
}


// ========================================
// SEARCH PRODUCTS
// ========================================

const searchBox = document.getElementById("search");

const productCards =
    document.querySelectorAll(".product-card");


searchBox.addEventListener("input", function() {

    const searchText =
        searchBox.value.toLowerCase();


    productCards.forEach(function(card) {

        const productName =
            card.querySelector("h3")
                .textContent
                .toLowerCase();


        if (productName.includes(searchText)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});