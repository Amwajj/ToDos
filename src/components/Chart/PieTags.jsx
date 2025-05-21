import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { getAuthHeader } from '../../auth';

ChartJS.register( ArcElement, Tooltip, Legend);
const PieTags = () =>  {
  const [tagCounts, setTagCounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tagResponse = await axios.get('http://localhost:8080/tasks/tag', {
            headers: getAuthHeader()
          });
        const tags = tagResponse.data;
        console.log("Tags:",tags);

        const tagCountPromises = tags.map(async (tag) => {
          const res = await axios.get(`http://localhost:8080/tasks/filter?tag=${encodeURIComponent(tag)}`, {
              headers: getAuthHeader()
            });
          console.log("Tasks for ${tag}:",res.data);
          return { tag, count: res.data.length };
        });

        const results = await Promise.all(tagCountPromises);
        console.log("Tag counts:",results);
        setTagCounts(results);
      } catch (error) {
        console.error('Error loading tag data:', error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: tagCounts.map(item => item.tag),
    datasets: [
      {
        label: 'Tasks per Tag',
        data: tagCounts.map(item => item.count),
        backgroundColor:[ 
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',

        ],
        borderWidth:1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Number of Tasks by Tag',
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieTags;
