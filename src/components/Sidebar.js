import React from 'react';
import '../styles/Sidebar.css';
import { AiOutlineHome } from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import { BiVideoPlus } from 'react-icons/bi';

function Sidebar(props) {
  return (
    <div className='Sidebar'>
      <button>
        <AiOutlineHome />
      </button>
      <button>
        <BsPeople />
      </button>
      <button>
        <BiVideoPlus />
      </button>
    </div>
  );
}

export default Sidebar;
