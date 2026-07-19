import {
useState
}
from "react";


import {
signInWithEmailAndPassword
}
from "firebase/auth";


import {
auth
}
from "@/firebase/firebase";


export default function Login(){


const[email,setEmail]=useState("");

const[password,setPassword]=useState("");



async function login(){


await signInWithEmailAndPassword(
auth,
email,
password
);


window.location.href=
"/superadmin/dashboard";


}



return (

<div className="min-h-screen flex items-center justify-center">


<div className="w-96">


<h1 className="text-4xl font-black">
Super Admin
</h1>



<input
className="border p-3 w-full mt-8"
placeholder="Email"
onChange={
e=>setEmail(e.target.value)
}
/>



<input
className="border p-3 w-full mt-4"
placeholder="Password"
type="password"
onChange={
e=>setPassword(e.target.value)
}
/>


<button

onClick={login}

className="
mt-6
bg-black
text-white
px-6
py-3
rounded-xl
"

>

Login

</button>


</div>


</div>

)

}