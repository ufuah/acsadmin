import AddStock from '@/src/utils/Addstock/AddStock'
import Protected from '@/src/ProtectedRoute/Protected';
import React from 'react'

interface Props {
    
}

const page = (props: Props) => {
    return (
        <div>
        <Protected allowedRoles={['admin','manager']}>
         <AddStock/>
         </Protected>
        </div>
    )
}

export default page
