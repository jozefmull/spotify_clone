import React from 'react'
import {NavLink} from 'react-router-dom'
import { MdOutlineShowChart, MdHomeFilled, MdSearch, MdLocationOn
  // , MdOutlineGroups 
} from 'react-icons/md';

const links = [
    { name: 'Home', to: '/', icon: MdHomeFilled },
    { name: 'Search', to: '/search', icon: MdSearch },
    { name: 'Around You', to: '/around-you', icon: MdLocationOn },
    // { name: 'Top Artists', to: '/top-artists', icon: MdOutlineGroups },
    { name: 'Top Charts', to: '/top-charts', icon: MdOutlineShowChart },
  ];

const NavLinks = ({handleClick, mobile}) => {
    let styles ={
        active : {'color': '#fff'},
        notactive : {'color': ''},
    }
  
        return (links.map(link => (
            <NavLink
            key={link.name}
            to={link.to}
            style={({ isActive }) =>
                !isActive ? styles.notactive : styles.active
            }
            className="flex flex-row justify-start items-center my-3 text-sm font-bold text-gray-400 hover:text-white transition-all"
            onClick={mobile ? handleClick : undefined}
          >
            <link.icon className="w-7 h-7 mr-4" />
            {link.name}
          </NavLink>
        ))  )
}

export default NavLinks