import React, { useState, useEffect } from 'react';
import Header from './Header';
import { BsCloudUpload } from 'react-icons/bs';
import '../styles/Upload.css';
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  updateMetadata,
  getDownloadURL,
} from 'firebase/storage';
import { app } from './Firebase';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, updateDoc, arrayUnion } from 'firebase/firestore';

function Upload(props) {
  const [isSignIn, setIsSignIn] = useState();

  const auth = getAuth();
  const { decoded } = props;
  console.log(decoded);
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [progress, setProgress] = useState('');
  console.log(progress);
  const [caption, setCaption] = useState();
  console.log(caption);

  const handleCaption = (e) => {
    setCaption(e.target.value);
  };
  const [trackProgress, setTrackProgress] = useState();
  console.log(file);

  async function handleClick() {
    if (file === undefined) {
      alert('please choose a file to upload');
      return;
    } else if (caption === undefined) {
      alert('please provide caption to upload');
      return;
    }

    let url;

    const metadata = {
      customMetadata: {
        caption: `${caption}`,
        user: `${decoded.name}`,
      },
    };
    const storage = getStorage(app);
    const storageRef = ref(storage, `videos/${file.name}`);

    //tracks upload progress
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log('Upload is ' + progress + '% done');
        // eslint-disable-next-line default-case
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            setTrackProgress(<p>Upload is running </p>);

            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        navigate('/');
      }
    );

    //download a file to firebase storage
    await uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });

    //get the download url of recently downloaded file
    await getDownloadURL(ref(storage, `videos/${file.name}`))
      .then((link) => {
        url = link;
      })
      .catch((error) => {
        console.log(error);
      });
    // add file path to firestore for current user
    const currentUser = auth.currentUser.uid;
    const db = getFirestore(app);

    //update the firestore database
    await updateDoc(doc(db, 'users', `${currentUser}`), {
      videos: arrayUnion({ caption: caption, url: url }),
    });

    updateMetadata(storageRef, metadata)
      .then((metadata) => {
        console.log(metadata);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    if (progress === '') return;
    setTrackProgress(
      <p>
        Upload is <span className='uploadProgress'>{progress.toFixed(2)}</span>{' '}
        % done.{' '}
      </p>
    );
  }, [progress]);

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  return (
    <div className='Upload'>
      <Header isSignIn={isSignIn} setIsSignIn={setIsSignIn} />
      <div className='uploadContent'>
        <div>
          <h3 className='uploadVideoTitle'>Upload video</h3>
          <p>Post a video to your account</p>
          <div className='videoUpload'>
            <div>
              <BsCloudUpload className='uploadIcon' />
            </div>
            <h4>Select video to upload</h4>
            <p>
              or drag and drop a file <br></br>
              <br></br>
              MP4 or WebM <br></br>
              720x1280 resolution or higher <br></br>
              Up to 10 minutes <br></br>
              Less than 2 GB
            </p>
            <br></br>
            <form>
              <input
                type='file'
                accept='.mp4, .webm'
                onChange={handleChange}
              ></input>
            </form>

            {trackProgress}
          </div>
        </div>
        <div className='videoInfo'>
          <label htmlFor='caption'>Caption</label>
          <input type='text' onChange={handleCaption} id='caption'></input>

          <button onClick={handleClick} className='postBtn'>
            Post
          </button>
          <button className='discardBtn'>Discard</button>
        </div>
      </div>
    </div>
  );
}

export default Upload;
