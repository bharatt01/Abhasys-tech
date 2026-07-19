import {
 collection,
 addDoc,
 getDocs,
 doc,
 deleteDoc,
 updateDoc,
 query,
 orderBy,
 Timestamp
}
from "firebase/firestore";


import {
 db
}
from "@/firebase/firebase";



// GET ALL BLOGS

export async function getBlogs(){

const q = query(
collection(db,"blogs"),
orderBy("createdAt","desc")
);


const snapshot = await getDocs(q);


return snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}));

}



// CREATE BLOG


export async function createBlog(data:any){


return await addDoc(
collection(db,"blogs"),
{

...data,

createdAt:
Timestamp.now(),

updatedAt:
Timestamp.now()

}

);


}



// DELETE BLOG


export async function deleteBlog(id:string){

await deleteDoc(
doc(db,"blogs",id)
);

}



// UPDATE BLOG


export async function updateBlog(
id:string,
data:any
){

await updateDoc(
doc(db,"blogs",id),
{

...data,

updatedAt:
Timestamp.now()

}

);

}