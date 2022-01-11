export function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export const THUM_DEFAULT = 'https://via.placeholder.com/300.png';
