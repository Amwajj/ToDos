import React from 'react';
import ReactECharts from 'echarts-for-react';
import BarTag from './BarTag';
import PieTags from './PieTags'


const EchartCards = ({ todoCount, doneCount }) => {
  const barOptions = {
    title: { text: 'Tasks by Status (Bar)' },
    tooltip: {},
    xAxis: { type: 'category', data: ['To Do', 'Done'] },
    yAxis: { type: 'value' },
    series: [
      {
        data: [todoCount, doneCount],
        type: 'bar',
        itemStyle: { color: '#4f46e5'},
      },
    ],
  };

  const pieOptions = {
    title: { text: 'Tasks by Status (Pie)', left: 'center' },
    tooltip: { trigger: 'item' },
    legend: { orient: 'vertical', left: 'left' },
    series: [
      {
        name: 'Tasks',
        type: 'pie',
        radius: '50%',
        data: [
          { value: todoCount, name: 'To Do' },
          { value: doneCount, name: 'Done' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
   <div className="grid grid-flow-col grid-rows-4 gap-4 p-20 bg-gray-50 items-center">
  
 
  <div className="row-span-2 bg-white rounded-md" style={{ width: 400, height: 400 }}>
    <ReactECharts option={barOptions} style={{ height: '100%', width: '100%' }} />
  </div>


  <div className="row-span-2 bg-white rounded-md" style={{ width: 400, height: 400 }}>
    <BarTag />
  </div>


  <div className="row-span-2 bg-white rounded-md" style={{ width: 400, height: 400 }}>
    <ReactECharts option={pieOptions} style={{ height: '100%', width: '100%' }} />
  </div>


  <div className="row-span-2 bg-white rounded-md" style={{ width: 400, height: 400 }}>
    <PieTags />
  </div>

</div>
  
  );
};

export default EchartCards;