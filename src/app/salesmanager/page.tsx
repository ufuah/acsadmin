import AddStock from '@/src/utils/Addstock/AddStock'
import React from 'react'
import Table from '../../utils/table/Table'
import SearchBox from '@/src/utils/searchExtr/searchbar'
import styles from './manage.module.css'
interface Props {
    
}

const page = (props: Props) => {
    return (
        <div>
         
           <Table/>
           {/* <div className="sum">
            please add me
           </div> */}
        </div>
    )
}

export default page
