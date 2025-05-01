import { Table,Button } from "antd";
import React , {useEffect,useState} from 'react';
import axios from 'axios';
import { useNavigate} from "react-router-dom";


function TaskTable (){
const [tasks, setTasks]=useState([]);


const fetchTasks = (page =1, size =5, sortBy='id', ascending=true) =>{
    axios.get(`http://localhost:8080/tasks`,{
        params:{
            page:page -1,
            size,
            sortBy,
            ascending
        }
    }).then(res => {
        setTasks(res.data.content);

    }).catch (error => {
        console.error('Erorr fetching tasks:', error);
    });
};

useEffect(()=>{
    fetchTasks();
},[]);
const navigate= useNavigate();

const handleDelete =(id)=> {
    axios.delete(`http://localhost:8080/tasks/${id}`).then(()=> {
        navigate('/');
    axios.get('http://localhost:8080/tasks').then(response => setTasks(response.data.content));
    }).catch (error => {
        console.error('Erorr fetching tasks:', error);
    })
    .catch (error => {
        console.error('Erorr deleting task:', error);
    });
};


useEffect(()=> {

    axios.get('http://localhost:8080/tasks').then(response => {
        setTasks(response.data.content);
    }).catch(error => {
        console.error('Error fetching tasks:',error);
    });

},[]);



const columns =[
    {
        title:'ID',
        dataIndex:'id',
    },
    {
        title:'Name',
        dataIndex:'name',
    },
   
    {
        title:'Actions',
        render: (text , record) =>(
            <>
            <Button onClick={()=> navigate(`/edit/${record.id}`)} style={{ marginLeft:8, color:'green'}}>Edit</Button>

            <Button onClick={()=> handleDelete(record.id)} style={{ marginLeft:8, color:'red'}}>Delete</Button>
            </>
        )

    },
];
return(
    <>
    <h2>Task List</h2>
    <Table columns={columns} dataSource={tasks} 
 rowKey="id"
    onChange={(pagination, filters,sorter)=> {
        const isAsc=sorter.order!=='descend';
        const sortField=sorter.field ||'id'
        fetchTasks(pagination.current, pagination.pageSize,sortField,isAsc)

    }}
     />
    </>
);

}
export default TaskTable;