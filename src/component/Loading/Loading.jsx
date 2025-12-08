import React from 'react'
import styles from "./laoding.module.css";
import Image from "next/image";
import logo from "../../../public/companyLogo.png";
import LoadingSpinner from '../../utils/LoadingComp/LoadingSpinner';


const Loading = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.logo}>
                    <Image src={logo} alt='' />
                </div>
                <LoadingSpinner/>
            </div>

           
        </div>
    )
}

export default Loading