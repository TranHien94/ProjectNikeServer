import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDCrv_9TYBJDel51j7P3BF3j5Xb2Kz7ruA",
    authDomain: "project18-e4131.firebaseapp.com",
    projectId: "project18-e4131",
    storageBucket: "project18-e4131.appspot.com",
    messagingSenderId: "1050713962737",
    appId: "1:1050713962737:web:16638e793157c320921150",
    measurementId: "G-NZFW2160LW"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (app) {
    console.log("Kết nối Firebase thành công!");
} else {
    console.error("Kết nối Firebase thất bại!");
}

// tạo ra storage
export const storage = getStorage(app);

export async function uploadFileToStorage(fileUploads, folderName, bufferData) {
    console.log("fileUploads:", fileUploads);
    console.log("folderName:", folderName);
    console.log("bufferData:", bufferData);
    // nếu file là null thì không làm gì hết
    if (!fileUploads) {
        return false
    }

    let fileRef;
    let metadata;
    if (!bufferData) {
        // tên file trên file base
        fileRef = ref(storage, `${folderName}/` + fileUploads.name);
    } else {
        // tên file trên file base
        fileRef = ref(storage, `${folderName}/` + fileUploads.filename);
        metadata = {
            contentType: fileUploads.mimetype,
        };
    }
    let url;
    if (bufferData) {
        // upload file lên fire storage
        url = await uploadBytes(fileRef, bufferData, metadata).then(async res => {
            // khi up thành công thì tìm URL
            return await getDownloadURL(res.ref)
                .then(url => url)
                .catch(er => false)
        })
    } else {
        // upload file lên fire storage
        url = await uploadBytes(fileRef, fileUploads).then(async res => {
            // khi up thành công thì tìm URL
            return await getDownloadURL(res.ref)
                .then(url => url)
                .catch(er => false)
        })
    }


    return url
}


export async function getFileInFolder(folderName) {
    const listRef = ref(storage, folderName);

    return await listAll(listRef).then(async (res) => {
        let result = []; // tạo array trống

        for (let i in res.items) {
            let url = await getDownloadURL(res.items[i])
                .then(url => url)
                .catch(er => false)
            if (!url) {
                return false
            }
            result.push(url)
        }

        return result
    })
}