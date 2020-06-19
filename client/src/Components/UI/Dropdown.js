import React, { useState } from 'react';

export const Dropdown = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const menuClass = `dropdown-menu${isOpen ? " show" : ""}`;
    
    const handleHover = () => setIsOpen(! isOpen);

    
    return (
        <div 
            className="dropdown" 
            style={{marginRight: '3.8rem'}} 
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
        >
            <a 
                className="nav-link dropdown-toggle"
                href="#" 
                id="navbarDropdownMenuLink" 
                data-toggle="dropdown"
                aria-haspopup="true" 
                aria-expanded="false"
            >
                Lang
            </a>
          <div className={menuClass} style={{minWidth: '1rem'}} aria-labelledby="navbarDropdownMenuLink">
            <a className="dropdown-item" href="?lang=ua">UKR</a>
            <a className="dropdown-item" href="?lang=en">ENG</a>
          </div>
        </div>
    );
}