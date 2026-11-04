// Whole-ringgit teaching prices. Keep option values and these keys consistent.
const products = {
  kopi: { name: 'Kopi', price: 6 },
  teh: { name: 'Teh', price: 4 },
  milo: { name: 'Milo', price: 7 }
};
const form = document.querySelector('#order-form');
const productInput = document.querySelector('#product');
const quantityInput = document.querySelector('#quantity');
const message = document.querySelector('#message');
const summary = document.querySelector('#summary');
const resetButton = document.querySelector('#reset-estimate');
let estimate = null;

function total(price, quantity) {
  return price * quantity;
}

// Clear the previous status without removing the base feedback class.
function showMessage(text, status) {
  message.textContent = text;
  message.classList.remove('error', 'success');
  if (status !== '') {
    message.classList.add(status);
  }
}

function render() {
  if (estimate === null) {
    summary.textContent = 'No estimate yet.';
    return;
  }
  summary.textContent = estimate.name + ' x ' + estimate.quantity
    + ' = RM' + estimate.amount;
}

function handleSubmit(event) {
  event.preventDefault();
  const productId = productInput.value;
  const raw = quantityInput.value.trim();
  // This small example accepts exactly these three product identifiers.
  if (productId !== 'kopi' && productId !== 'teh' && productId !== 'milo') {
    showMessage('Error: choose a listed product. Last valid estimate unchanged.', 'error');
    return;
  }
  if (raw === '') {
    showMessage('Error: enter a quantity. Last valid estimate unchanged.', 'error');
    return;
  }
  const quantity = Number(raw);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 5) {
    showMessage('Error: use a whole number from 1 to 5. Last valid estimate unchanged.', 'error');
    return;
  }
  const product = products[productId];
  estimate = { name: product.name, quantity: quantity,
    amount: total(product.price, quantity) };
  render();
  showMessage('Success: estimate updated. No order has been placed.', 'success');
}

function resetEstimate() {
  form.reset();
  estimate = null;
  render();
  showMessage('Choose a product and enter a quantity.', '');
  productInput.focus();
}

form.addEventListener('submit', handleSubmit);
resetButton.addEventListener('click', resetEstimate);
render();
