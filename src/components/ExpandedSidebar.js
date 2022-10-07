import React from 'react';
import '../styles/ExpandedSidebar.css';
import { AiOutlineHome } from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import { BiVideoPlus } from 'react-icons/bi';

function ExpandedSidebar(props) {
  return (
    <div className='ExpandedSidebar'>
      <button>
        <AiOutlineHome className='icon' />
        For You
      </button>
      <button>
        <BsPeople className='icon' />
        Following
      </button>
      <button>
        <BiVideoPlus className='icon' />
        LIVE
      </button>
    </div>
  );
}

export default ExpandedSidebar;
