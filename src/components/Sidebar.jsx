import React, { useState } from 'react'
import { Button } from "antd";
import {motion} from "framer-motion"
import {FaBars} from "react-icons/fa"
import {menuItems} from "../data"
import NavItem from "./NavItem"
import { IoIosAdd } from "react-icons/io";
import AddTask from "./AddTask"
  const Sidebar =()=>{
    const [isOpen, setIsOpen]=useState(false);
    const [popUp, setPopUp] = useState(false);
   
    return  <div>

    <motion.div initial={{width:60}} animate={{width: isOpen?240: 60}}
    transition={{duration:0.4}} className="bg-gray-900 h-screen text-white p-4 flex flex-col gap-6">
    <button className="text-xl mb-6" onClick={()=> setIsOpen(prev=> !prev)}>
    <FaBars/>
    </button>

   
    <Button onClick={() => setPopUp(true)} type="primary">
      <IoIosAdd size={42}/> {isOpen &&<span>Add New Task</span>}</Button>
      {popUp && <AddTask setPopUp={setPopUp} />}

    <nav className="flex flex-col gap-11">
        {menuItems.map((item, index)=>(
            <NavItem 
            key ={index}
            icon={item.icon}
            text={item.text}
            path={item.path}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            />
        ))}
    </nav>
    </motion.div>
    </div>

  };

export default Sidebar;

