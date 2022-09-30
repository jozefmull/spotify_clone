import {NavLink} from 'react-router-dom'
import { MdOutlineShowChart, MdHomeFilled, MdSearch, MdLocationOn, MdOutlineGroups } from 'react-icons/md';
import {FaSpotify} from 'react-icons/fa'

const links = [
  { name: 'Home', to: '/', icon: MdHomeFilled },
  { name: 'Search', to: '/search', icon: MdSearch },
  { name: 'Around You', to: '/around-you', icon: MdLocationOn },
  { name: 'Top Artists', to: '/top-artists', icon: MdOutlineGroups },
  { name: 'Top Charts', to: '/top-charts', icon: MdOutlineShowChart },
];

const Sidebar = () => {
    const navLinksRenderer = () => {
        let styles ={
            active : {'color': '#fff'},
            notactive : {'color': ''},
        }
        return links.map(link => (
            <NavLink
            key={link.name}
            to={link.to}
            style={({ isActive }) =>
                !isActive ? styles.notactive : styles.active
            }
            className="flex flex-row justify-start items-center my-3 text-sm font-bold text-gray-400 hover:text-white transition-all"
          >
            <link.icon className="w-7 h-7 mr-4" />
            {link.name}
          </NavLink>
        ))  
    }
  return (
    <div className='px-5 py-3 bg-black min-w-[250px] w-full max-w-[250px] animate-slidedown'>
    <div className='flex text-white  h-[50px] justify-start items-center'>
      <FaSpotify className='mr-2 h-[40px] w-[40px]'/>  <em className='font-semibold text-2xl'>NotSpotify</em>
    </div>
    <div className="mt-7">
      {navLinksRenderer()}
    </div>
  </div>
  )
}

export default Sidebar