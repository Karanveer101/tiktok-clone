import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ExpandedSidebar from './ExpandedSidebar';
import '../styles/Main.css';
import { app } from './Firebase';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
function Main(props) {
  const db = getFirestore(app);
  const [videos, setVideos] = useState([]);
  console.log(videos);

  useEffect(() => {
    async function getVideos() {
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        setVideos((prev) => [...prev, doc.data()]);
      });
    }
    getVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { screenWidth } = props;

  const displayVideos = videos.map((data, index) => {
    return (
      <div className='user' key={index}>
        {data.videos.map((video, index) => {
          return (
            <div className='video' key={index}>
              <div className='videoInfoWrapper'>
                <img src={data.photoURL} alt='userPhoto'></img>
                <div className='caption'>
                  <h4>{data.name}</h4>
                  <p>{video.caption}</p>
                </div>
              </div>
              <video height='500' width='300' controls autoPlay>
                <source src={video.url} type='video/mp4' />
              </video>
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div className='Main'>
      {screenWidth < 1000 ? <Sidebar /> : <ExpandedSidebar />}
      <div className='videos'>{displayVideos}</div>
    </div>
  );
}

export default Main;
