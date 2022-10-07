import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { RiShareForwardLine } from 'react-icons/ri';
import { BsFillLockFill } from 'react-icons/bs';

function Profile(props) {
  return (
    <div className='Profile'>
      <section className='profile'>
        <img className='profilePhoto' alt='profilePhoto'></img>
        <h4>kvsd97</h4>
        <p>kvsd97</p>
        <button>
          <FaRegEdit /> Edit profile
        </button>
        <button className='shareIcon'>
          <RiShareForwardLine />
        </button>

        <p>4 Following</p>
        <p>2 Followers</p>
        <p>6 Likes</p>
      </section>

      <section>
        <button>Videos</button>
        <button>
          {' '}
          <BsFillLockFill /> Liked
        </button>
      </section>
    </div>
  );
}

export default Profile;
