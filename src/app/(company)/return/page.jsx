import React from 'react'
import Return from '../../../utils/exchangeComp/Exchange'
import Protected from '@/src/ProtectedRoute/Protected'


const page = () => {
  return (
    <div>
      <Protected allowedRoles={['admin', 'manager']}>
        <Return/>
      </Protected>
    </div>
  )
}

export default page
