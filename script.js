// Highlight the active page in the navigation menu
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split('/').pop();
  
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  
    const formatPrice = price => `Rs. ${price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    const parsePrice = priceText => parseFloat(priceText.replace(/Rs\.|,/g, '').trim());
  
    const quantityInputs = document.querySelectorAll('.item-quantity input');
    const subtotalElements = document.querySelectorAll('.item-total-price');
    const priceElements = document.querySelectorAll('.item-price');
    const subtotalElement = document.querySelector('.price');
    const totalPriceElement = document.querySelector('.total-price');
  
    const updateCartTotals = () => {
      let total = 0;
  
      quantityInputs.forEach((input, index) => {
        const quantity = parseInt(input.value) || 0;
        const price = parsePrice(priceElements[index].textContent);
        const subtotal = quantity * price;
  
        subtotalElements[index].textContent = formatPrice(subtotal);
        total += subtotal;
      });
  
      subtotalElement.textContent = formatPrice(total);
      totalPriceElement.textContent = formatPrice(total);
    };
  
    // Attach event listeners to quantity inputs
    quantityInputs.forEach(input => input.addEventListener('input', updateCartTotals));
  
    // Handle item removal
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const row = button.closest('tr'); // Locate the parent row
        if (row) {
          row.remove(); // Remove the row
          updateCartTotals(); // Recalculate totals
        }
      });
    });
  
    // Attach checkout button functionality
    const checkoutButton = document.querySelector('.cart-totals button');
    checkoutButton.addEventListener('click', () => {
      const total = totalPriceElement.textContent;
      alert(`Thank you for shopping! Your total is ${total}`);
    });
  
    // Initial calculation
    updateCartTotals();
  });
  