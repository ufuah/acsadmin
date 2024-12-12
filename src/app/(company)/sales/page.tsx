
import React from "react";
import Sales from "../../../utils/AddSales/Sales";
import Protected from "@/src/ProtectedRoute/Protected";



const Page = () => {

  return (
    <div>
      <Protected allowedRoles={['admin']}>
        <Sales />
      </Protected>
    </div>
  );
};

export default Page;
