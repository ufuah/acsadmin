import React from 'react'
import LoadingSpinner from '../../utils/LoadingComp/LoadingSpinner'
import styles from "./loading.module.css"

const loading = () => {
  return (
    <div className={styles.container}>
      <LoadingSpinner/>
    </div>
  )
}

export default loading