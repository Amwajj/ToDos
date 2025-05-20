
import {Bar }from "react-chartjs-2";
import sourceData from "../sourceData.json";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
function Analytics (){
  console.log(sourceData)
 return(
  <div >
    <div className="dataCard revenueCard">Chart1 </div>
      <div className="dataCard customerCard">
      <Bar
       data = {{
  labels: sourceData.labels,
  
   dataset:[
    {
      label:"Revenue",
      data:sourceData.data,
    }
  ],
  
       }}/>
      </div>
  </div>
 )
}
export default Analytics;