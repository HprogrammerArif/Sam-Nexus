// Get cart from localStorage
export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

// Save cart to localStorage
export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Add product to cart (or increment if already added)
export const addToCart = (product) => {
  const cart = getCart();
  const index = cart.findIndex(item => item.productId === product.productId);

  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  return cart;
};

// Increment quantity by 1
export const incrementCartItem = (productId) => {
  const cart = getCart();
  const index = cart.findIndex(item => item.productId === productId);

  if (index !== -1) {
    cart[index].quantity += 1;
    saveCart(cart);
  }

  return cart;
};

// Decrement quantity by 1 (remove item if quantity reaches 0)
export const decrementCartItem = (productId) => {
  const cart = getCart();
  const index = cart.findIndex(item => item.productId === productId);

  const product = cart.map(item => item.productId === productId)

  console.log({index, cart, product});
  if (index !== -1) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    }
    // } else {
    //   cart.splice(index, 1); // Remove the item if quantity is 1
    // }
    saveCart(cart);
  }


  return cart;
};

// Remove item from cart completely
export const removeFromCart = (productId) => {
  const cart = getCart().filter(item => item.productId !== productId);
  saveCart(cart);
  return cart;
};

// Clear entire cart
export const clearCart = () => {
  const cart = []; // set cart to empty
  saveCart(cart);  // save empty cart to storage (e.g., localStorage)
  return cart;
};


// Get total items count
export const getTotalCartItems = () => {
  return getCart().reduce((total, item) => total + item.quantity, 0);
};
