import {  Button, Form} from "antd";
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import { useState } from "react";



const AddTask = () =>{
    const [form]=Form.useForm();

    const navigate= useNavigate();
    
    const [showPopup, setShowPopup]=useState(false);
    const handleClose =()=>{
        setShowPopup(false);
    };
        const onFinish=(values) =>
        {
    
            axios.post('http://localhost:8080/tasks', values).then(()=> {
                form.resetFields();
                navigate('/');
            }).catch (error => {
                console.error('Erorr adding task:', error)
            });
        };

return(
    
<>
{showPopup &&(
<div>

<div className="w-screen h-screen bg-black bg-opacity-30 fixed top-0 right-0 flex justify-center items-center">
<div className="bg-white p-10 rounded-md shadow-md">
    <button className="abslout top-2 right-2 text-slate-500 hover:text-slate-800 text-xl font-bold" onClick={handleClose}>&times;</button>
<Form form={form} layout="vertical" onFinish={onFinish}>
<Form.Item name="name"  rules={[{required : true}]} >
    <div className="flex flex-col gap-2 " >
        <label className="input-label text-slate-950 ">TITLE</label>
        <input type="text" className="text-2xl text-slate-950 outline-none bg-slate-50"></input>   
    </div>
    </Form.Item>
    <Form.Item>
    <div className="flex flex-col gap-2 mt-4">
    
        <label className="input-label text-slate-950">CONTENT</label>
        <textarea 
        type="text"
        className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
        placeholder="Content"
        rows={10}
        />       
    </div>
    </Form.Item>
    <div className="mt-3">
        <label className="input-label text-slate-950">TAGS</label>
    </div>
    <Form.Item >
    <Button type="primary" htmlType="submit">Add Task</Button>
    </Form.Item>    
    </Form>
</div>
</div>

    
    </div>)}
 </>
        
);
};
export default AddTask;