import { Form,Button,Input } from "antd";
import React , {useEffect,useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams} from "react-router-dom";


function EditTask (){
const [task, setTask]=useState({name:''});
const {id} =useParams();
const navigate= useNavigate();

useEffect(()=> {

    axios.get(`http://localhost:8080/tasks/${id}`).then(response => {
        setTask(response.data);
    }).catch(error => {
        console.error('Error updating tasks:',error);
    });

},[id]);


const handleUpdate =(e)=> {
    setTask({...task,[e.target.name]:e.target.value});
};
const handleSubmit =(values)=> {
        console.log("sibmit clicked", values)

        axios.put(`http://localhost:8080/tasks/${id}`,values)
        .then(()=> {
            alert("Task updated")
            navigate('/');
    })
    .catch(error => {
        console.error('Erorr fetching tasks:', error)
    });
};
return(
    <>
    <h2>Edit Task</h2>
    <Form  layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="name"  rules={[{required : true}]} >
             <Input label="Edit Task" style={{ width: '30%' }} type="text" name="name" value={task.name} onChange={handleUpdate}/>
             </Form.Item>
             <Form.Item >
             <Button type="primary" htmlType="submit">Edit Task</Button>
             </Form.Item>
    </Form>
    </>
);

}
export default EditTask;