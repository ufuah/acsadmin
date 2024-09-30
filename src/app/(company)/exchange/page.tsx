import LockRoute from "@/src/Lockprovider/LockProvider";
import Protected from "@/src/ProtectedRoute/Protected";
import ExchangeReturn from "@/src/utils/exchangeandreturn/ExchangeReturn";
import React from "react";

type Props = {};

const exchange = (props: Props) => {
  return (
    <div>
      
        <ExchangeReturn />
    
    </div>
  );
};

export default exchange;
