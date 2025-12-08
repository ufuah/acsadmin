import AddStock from '@/src/utils/Addstock/AddStock'
import Protected from '@/src/ProtectedRoute/Protected';
import React from 'react'

interface Props {
    
}

const page = (props: Props) => {
    return (
        <div>
<<<<<<< HEAD
         <AddStock/>
=======
        <Protected allowedRoles={['admin','manager']}>
         <AddStock/>
         </Protected>
>>>>>>> 18ed2f5d6df20b3a431a7d4de6c1999c750a0b71
        </div>
    )
}

export default page
