import AddStock from '@/src/utils/Addstock/AddStock'
import React from 'react'
import Table from '../../../utils/table/Table'
import SearchBox from '@/src/utils/searchExtr/searchbar'
import Protected from '@/src/ProtectedRoute/Protected'



const page = () => {
    return (
        <div>
        <Protected allowedRoles={['admin','manager']}>
           <Table/>
           {/* <div className="sum">
            please add me
           </div> */}
           </Protected>
        </div>
    )
}

export default page
