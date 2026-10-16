/**
 * Helper to format price in VND
 * Examples:
 *   formatCurrency(35000) => "35.000 đ"
 *   formatCurrency(0) => "0 VNĐ"
 */
export const formatCurrency = (amount: number): string => {
  if (amount === 0) return '0 VNĐ';
  return `${amount.toLocaleString('vi-VN')} đ`;
};
