import React from 'react'
import Styles from './card.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
interface Props {
    
}

const Card = (props: Props ) => {
    return (
        <div >
            <div className={Styles.name}>
                <div className="icon">
                    <FontAwesomeIcon icon={faMoneyBill}/>
                </div>
            </div>
        </div>
    )
}

export default Card
