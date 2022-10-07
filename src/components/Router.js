import React, { useState } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import App from './App';
import Upload from './Upload';

function Router(props) {
  const [decoded, setDecoded] = useState('');
  const [isSignIn, setIsSignIn] = useState();

  console.log(decoded);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <App
              isSignIn={isSignIn}
              setIsSignIn={setIsSignIn}
              decoded={decoded}
              setDecoded={setDecoded}
            />
          }
        />
        <Route
          path='upload'
          element={<Upload decoded={decoded} setDecoded={setDecoded} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
