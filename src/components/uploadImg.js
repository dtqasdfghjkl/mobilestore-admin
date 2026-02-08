import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../fireConfig";

export const uploadImg = async(img) => {
    return new Promise((res, rej) => {
        const storageRef = ref(storage, 'images/'+img.name);

        const uploadTask = uploadBytesResumable(storageRef, img);
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            // Handle unsuccessful uploads
            console.log(error);
            rej();
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            res(downloadURL);
            });
        }
        );
    })
    
}

export async function uploadImgCloud(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "sellphones");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/del0iskif/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url; // URL ảnh
}
