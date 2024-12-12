"use client"

import React, { useState } from 'react'


import Doughnut from './Doughnutchart'


const DoughnutchartInfo = () => {

    const [userData, setUserData] = useState({
        labels: DailyData.map((data) => data.month),
        datasets: [{
            label: 'Numer of Users',
            data: DailyData.map((data) => data.userGained),

        }]

        
    })
  return (
    <Doughnut chartData={userData}/>
  )
}

export default DoughnutchartInfo