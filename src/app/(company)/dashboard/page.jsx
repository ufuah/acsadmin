import React from 'react'

import Topbar from "../../../utils/top/Topbar";
import Card from "../../../utils/cards/Card";
import  LockRoute from '@/src/Lockprovider/LockProvider';
import Protected from '@/src/ProtectedRoute/Protected';
import Dashboard from '@/src/utils/Dashboard/Dashboard';
// import Protected from "../ProtectedRoute/Protected";

const page = () => {
  return (
    <div>
       <Protected allowedRoles={['admin']}>
        <LockRoute>
        <Topbar />
        <Card />
        </LockRoute>

        {/* <Dashboard/> */}
      </Protected>
    </div>
  )
}

export default page
