import React, { useState } from 'react'
import { motion } from "framer-motion"
import { FaBars } from "react-icons/fa"
import { menuItems } from "../data"
import NavItem from "./NavItem"

const Sidebar = ({isModalOpen,setIsModalOpen,selectTask}) => {

  const [isOpen, setIsOpen] = useState(false);

  return( 
  <div>

    <motion.div initial={{ width: 60 }} animate={{ width: isOpen ? 150 : 60 }}
      transition={{ duration: 0.4 }} className=" h-screen text-gray-700 p-4 flex flex-col gap-6">
      <button className="text-xl mb-6" onClick={() => setIsOpen(prev => !prev)}>
        <FaBars />
      </button>


      <nav className="flex flex-col gap-11">
        {menuItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            text={item.text}
            button={item.button}
            path={item.path}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        ))}
      </nav>
    </motion.div>
  </div>

      );
   
};

export default Sidebar;

