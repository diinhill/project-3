// import React, { useState, useContext, useEffect } from 'react'
// import { AuthContext } from '../../context/authContext'
// import { LinearProgress } from '@material-ui/core';
// import firebase from '../../config';
// import { useHistory } from 'react-router-dom';


// const flexContainer = { display: 'flex', flexDirection: 'column' }
// const Profile = () => {
//     const history = useHistory()

//     const [imgLoading, setImgLoading] = useState(0)

//     const { user, userData, updateUserData } = useContext(AuthContext)

//     useEffect(() => {
//         !user && history.push("/login")
//     }, [])

//     console.log('userData :>> ', userData);
//     // https://firebase.google.com/docs/storage/web/upload-files
//     const firebaseStorageUpload = (file) => {
//         const storageService = firebase.storage();
//         const storageRef = storageService.ref();


//         setImgLoading(0)
//         const uploadTask = storageRef.child(`avatar/${file.name}`).put(file);

//         uploadTask.on('state_changed', (snapshot) => {
//             console.log(snapshot)
//             let prog = Math.round(snapshot.bytesTransferred * 100 / snapshot.totalBytes)
//             setImgLoading(prog)
//         }, (error) => {
//             console.log(error);
//         }, () => {
//             console.log('success');
//             setImgLoading(100)
//             firebase
//                 .storage()
//                 .ref(`avatar/`)
//                 .child(`${file.name}`)
//                 .getDownloadURL()
//                 .then(url => updateUserData({ avatar: url, msg: "hi" }));
//         });

//     }

//     const handleUpload = (files) => {
//         const file = files[0]
//         console.log(file)
//         firebaseStorageUpload(file)
//     }


//     const handleOnSubmit = (event) => {
//         event.preventDefault();
//         updateUserData({ avatar: "" })
//     }

//     return (
//         <form onSubmit={handleOnSubmit} style={flexContainer}>
//             <label>
//                 <p>name  {user.displayName}</p>
//             </label>
//             <label>
//                 <p>email: {user.email}</p>
//             </label>


//             <div>
//                 {imgLoading > 0 && !userData?.avatar && <LinearProgress variant="buffer" value={imgLoading} valueBuffer={imgLoading} color="secondary" />}
//                 {userData?.avatar ? <img src={userData.avatar} alt="avatar" width={100} height="auto" /> :
//                     <input multiple required accept="image/*" type="file"
//                         onChange={(e) => {
//                             if (e.target.files) {
//                                 handleUpload(e.target.files)
//                             }
//                         }}
//                     />}
//             </div>

//             <div>
//                 <button type="submit">Delete photo</button>
//             </div>
//         </form>
//     )
// }

// export default Profile
