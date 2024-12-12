import React from 'react'
import styles from './CircleSpinner.module.css'
const CircleSpinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default CircleSpinner
