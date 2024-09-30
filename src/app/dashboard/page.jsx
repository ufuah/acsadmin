import React from 'react'
import Protected from '../../ProtectedRoute/Protected'
import Topbar from "../../utils/top/Topbar";
import Card from "../../utils/cards/Card";
import  LockRoute from '@/src/Lockprovider/LockProvider';
// import Protected from "../ProtectedRoute/Protected";

const page = () => {
  return (
    <div>
       <Protected>
        <LockRoute>

       
        <Topbar />
        <Card />
        </LockRoute>
      </Protected>
    </div>
  )
}

export default page
