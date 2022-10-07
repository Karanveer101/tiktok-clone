import Header from './Header';
import Main from './Main';
import React, { useState, useEffect } from 'react';

function App(props) {
  const { decoded, setDecoded, isSignIn, setIsSignIn } = props;

  const [screenWidth, setScreenWidth] = useState(document.body.clientWidth);

  function handleResize() {
    setScreenWidth(document.body.clientWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <div className='App'>
      <Header
        decoded={decoded}
        setDecoded={setDecoded}
        isSignIn={isSignIn}
        setIsSignIn={setIsSignIn}
      />
      <Main screenWidth={screenWidth} />
    </div>
  );
}

export default App;
