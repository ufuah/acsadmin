
import Protected from "@/src/ProtectedRoute/Protected";

import ExchangeReturn from "@/src/utils/exchangeandreturn/ExchangeReturn";
import React from "react";


const exchange = () => {
  return (
    <div>

      <Protected allowedRoles={['admin', 'manager']}>
        <ExchangeReturn />
      </Protected>

    </div>
  );
};

export default exchange;
