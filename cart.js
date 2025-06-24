document.addEventListener('DOMContentLoaded', function() {
    // Cart elements
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    const overlay = document.getElementById('overlay');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const clearCartBtn = document.getElementById('clear-cart');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
  
    // Cart array to store items
    let cart = [];
  
    // Open cart modal
    cartBtn.addEventListener('click', function() {
      cartModal.classList.add('active');
      overlay.classList.add('active');
    });
  
    // Close cart modal
    closeCart.addEventListener('click', function() {
      cartModal.classList.remove('active');
      overlay.classList.remove('active');
    });
  
    // Close cart when clicking on overlay
    overlay.addEventListener('click', function() {
      cartModal.classList.remove('active');
      overlay.classList.remove('active');
    });
  
    // Add to cart functionality
    addToCartBtns.forEach(button => {
      button.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));
        
        // Check if item already exists in cart
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({
            name,
            price,
            quantity: 1
          });
        }
        
        updateCart();
      });
    });
  
    // Clear cart
    clearCartBtn.addEventListener('click', function() {
      cart = [];
      updateCart();
    });
  
    // Update cart UI
    function updateCart() {
      // Clear cart items
      cartItems.innerHTML = '';
      
      let total = 0;
      let count = 0;
      
      // Add each item to cart
      cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        
        cartItemElement.innerHTML = `
          <div class="cart-item-info">
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
          <div class="cart-item-quantity">
            <button class="decrease-quantity">-</button>
            <span>${item.quantity}</span>
            <button class="increase-quantity">+</button>
          </div>
          <button class="remove-item">×</button>
        `;
        
        cartItems.appendChild(cartItemElement);
        
        // Calculate total
        total += item.price * item.quantity;
        count += item.quantity;
        
        // Add event listeners to quantity buttons
        const decreaseBtn = cartItemElement.querySelector('.decrease-quantity');
        const increaseBtn = cartItemElement.querySelector('.increase-quantity');
        const removeBtn = cartItemElement.querySelector('.remove-item');
        
        decreaseBtn.addEventListener('click', function() {
          if (item.quantity > 1) {
            item.quantity -= 1;
            updateCart();
          }
        });
        
        increaseBtn.addEventListener('click', function() {
          item.quantity += 1;
          updateCart();
        });
        
        removeBtn.addEventListener('click', function() {
          cart = cart.filter(cartItem => cartItem.name !== item.name);
          updateCart();
        });
      });
      
      // Update total and count
      cartTotal.textContent = total.toFixed(2);
      cartCount.textContent = count;
      
      // Save cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    // Load cart from localStorage
    function loadCart() {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
      }
    }
  
    // Initialize cart
    loadCart();
  });
  //1