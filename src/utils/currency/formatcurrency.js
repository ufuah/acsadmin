// utils/currency/Currency.js

function formatCurrency(amount, locale = 'en-NG', currency = 'NGN') {
    const currencyFormatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    });
    return currencyFormatter.format(amount);
  }
  
  export default formatCurrency;
  