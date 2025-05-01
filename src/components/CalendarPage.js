import React from 'react'
import { Calendar } from 'antd';
  function CalendarPage(){

    return (
      <div style={{
          display: 'block', width: 1200, padding: 30, height:50
      }}>
          <h4>Calendar</h4>
          <Calendar onChange={(value) => {
              alert(`Your selected ${value.format('YYYY-MM-DD')}`)
          }} />
      </div>
  );

  }

export default CalendarPage;

