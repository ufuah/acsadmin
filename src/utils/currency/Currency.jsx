"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';

function CurrencyFormatter({ amount }) {
  const [formattedAmount, setFormattedAmount] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    const locale = router.locale || 'en-NG'; // Set locale to 'en-NG' for English with Nigeria's currency formatting
    const currencyFormatter = new Intl.NumberFormat(locale, {
    //   style: 'currency',
      currency: 'NGN', // Nigerian Naira currency code
    });
    setFormattedAmount(currencyFormatter.format(amount));
  }, [amount, router.locale]);

  return <div>{formattedAmount}</div>;
}

export default CurrencyFormatter;
