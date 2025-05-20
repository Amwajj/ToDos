import React from 'react'
import {Link} from "react-router-dom"

  const NavItem =({icon, text,path,isOpen,setIsOpen})=>{

    return ( 
    <div className="flex item-center gap-4 cursor-pointer w-full hover:text-violet-500">
        <Link to={path} className="flex items-center gap-2  ">
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