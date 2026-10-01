/* ==========================================================================
   Saved Makoti — Cart (localStorage based, client-side MVP)
   ========================================================================== */

const CART_KEY = "savedmakoti_cart_v1";
const FREE_SHIP_THRESHOLD = 10000;
const SHIP_FLAT = 250;

function getCart(){
  try{
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(e){ return []; }
}

function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function cartLineKey(id, size, color){
  return id + "|" + (size || "") + "|" + (color || "");
}

function addToCart(id, size, color, qty){
  qty = qty || 1;
  const cart = getCart();
  const key = cartLineKey(id, size, color);
  const existing = cart.find(l => cartLineKey(l.id, l.size, l.color) === key);
  if(existing){
    existing.qty += qty;
  }else{
    cart.push({ id, size: size || null, color: color || null, qty });
  }
  saveCart(cart);
  return cart;
}

function updateCartQty(id, size, color, qty){
  let cart = getCart();
  const key = cartLineKey(id, size, color);
  if(qty <= 0){
    cart = cart.filter(l => cartLineKey(l.id, l.size, l.color) !== key);
  }else{
    const line = cart.find(l => cartLineKey(l.id, l.size, l.color) === key);
    if(line) line.qty = qty;
  }
  saveCart(cart);
  return cart;
}

function removeFromCart(id, size, color){
  updateCartQty(id, size, color, 0);
}

function cartCount(){
  return getCart().reduce((sum, l) => sum + l.qty, 0);
}

function cartSubtotal(){
  const cart = getCart();
  let total = 0;
  cart.forEach(l => {
    const p = typeof findProduct === "function" ? findProduct(l.id) : null;
    if(p) total += p.price * l.qty;
  });
  return total;
}

function updateCartCount(){
  document.querySelectorAll(".cart-count").forEach(el => {
    const c = cartCount();
    el.textContent = c;
    el.style.display = c > 0 ? "flex" : "none";
  });
}

function showToast(message, imgSrc){
  let toast = document.querySelector(".toast");
  if(!toast){
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = (imgSrc ? `<img src="${imgSrc}" alt="">` : "") + `<span>${message}</span>`;
  requestAnimationFrame(() => toast.classList.add("show"));
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("show"), 3200);
}

document.addEventListener("DOMContentLoaded", updateCartCount);
