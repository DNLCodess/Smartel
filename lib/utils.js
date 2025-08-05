import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function generateWhatsAppMessage(cartItems, total) {
  let message = "Hello! I'm interested in the following solar products:\n\n";
  
  cartItems.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`;
    message += `   Quantity: ${item.quantity}\n`;
    message += `   Price: ${formatPrice(item.price * item.quantity)}\n\n`;
  });
  
  message += `Total: ${formatPrice(total)}\n\n`;
  message += "Please let me know about availability and delivery options. Thank you!";
  
  return encodeURIComponent(message);
}

export function shareProduct(product) {
  const url = `${window.location.origin}/product/${product.id}`;
  const text = `Check out this amazing solar product: ${product.name} - ${formatPrice(product.price)}`;
  
  if (navigator.share) {
    navigator.share({
      title: product.name,
      text: text,
      url: url,
    });
  } else {
    navigator.clipboard.writeText(`${text}\n${url}`);
    // You might want to show a toast notification here
  }
}