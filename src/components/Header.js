import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import { AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import { BiMessageDetail } from 'react-icons/bi';
import Login from './Login';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { GoSignOut } from 'react-icons/go';

function Header(props) {
  const [SignInPopUp, setSignInPopUp] = useState(false);
  const { isSignIn, setIsSignIn } = props;
  console.log(setIsSignIn);
  const [photoURL, setPhotoURL] = useState();
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);

  const handleUploadBtn = (e) => {
    if (user === null) {
      e.preventDefault();
      setSignInPopUp(true);
    } else return;
  };

  useEffect(() => {
    if (user) {
      const photoURL = user.photoURL;
      setPhotoURL(photoURL);
      setIsSignIn(true);
    } else {
      setIsSignIn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setIsSignIn(false);
      })
      .catch((error) => {
        alert(error);
      });
  };

  console.log(isSignIn);

  console.log(SignInPopUp);

  const signedIn = (
    <button>
      <img className='profilePhoto' src={photoURL} alt='profilePhoto' />
    </button>
  );

  const signedOut = (
    <button className='loginBtn' onClick={() => setSignInPopUp(true)}>
      {' '}
      Log in
    </button>
  );

  return (
    <div className='header'>
      <Link to='/'>
        <img
          className='logo'
          src={require('../images/tiktok.png')}
          alt='logo'
        />
      </Link>
      <form className='search'>
        <input type='text' placeholder='Search accounts and videos' />
        <button className='searchIcon'>
          <AiOutlineSearch />
        </button>
      </form>

      <div className='accountBtns'>
        <Link onClick={handleUploadBtn} to='/upload'>
          <button className='uploadBtn'>
            <AiOutlinePlus />
            Upload
          </button>
        </Link>

        <button>
          <FiSend />
        </button>

        <button>
          <BiMessageDetail />
        </button>

        {SignInPopUp ? (
          <Login setIsSignIn={setIsSignIn} setSignInPopUp={setSignInPopUp} />
        ) : (
          ''
        )}
        {isSignIn ? signedIn : signedOut}

        <button onClick={handleSignOut}>
          <GoSignOut />
        </button>
      </div>
    </div>
  );
}
export default Header;