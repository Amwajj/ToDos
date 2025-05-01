import React from 'react'
import {Link} from "react-router-dom"

  const NavItem =({icon, text,path,isOpen,setIsOpen})=>{

    return ( 
    <div className="flex item-center gap-4 cursor-pointer w-full hover:text-blue-400">
        <Link to={path} className="flex items-center gap-2 p-2 hover:bg-gray-700">
        <span className="text-xl " onClick={()=> setIsOpen((prev) =>(!prev))}>
            
            {icon}</span>
            </Link>
           {isOpen &&(
            <div>{text}</div>
        )}
    </div>
    );
  };

export default NavItem;