import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const App = () => {
    const [students,setStudents]=useState([]);
    const [name,setName]=useState("");
    const [age,setAge]=useState("");
    const [hobby,setHobby]=useState("");
    useEffect(()=>{
        axios.get("http://localhost:5000/getStudents").then((response)=>{
            setStudents(response.data);
        }).catch((error)=>{
            console.log("Error fetching data:",error);
        })
    },[])
    const deleteStudent=(id)=>{
        axios.delete(`http://localhost:5000/delete/${id}`).then((response)=>{
            console.log(response.data);
            axios.get("http://localhost:5000/getStudents").then((response)=>{
                setStudents(response.data);
            }).catch((error)=>{
                console.log("Error fetching data:",error);
            })
        }).catch((error)=>{
            console.log("Error deleting data:",error);
        })
    }
const submit=()=>{
    axios.post("http://localhost:5000/students",{
    name:name,
    age:age,
    hobby:hobby
}).then((response)=>{
    console.log(response.data);
}).catch((err)=>{
    console.log("Error inserting data:",err);
})
}

    
  return (
    <div>
       
<form action="">
<h1>Enter Student Details</h1>
<input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} />
<input type="text" placeholder='Age' value={age} onChange={(e)=>setAge(e.target.value)} />
<input type="text" placeholder='Hobby' value={hobby} onChange={(e)=>setHobby(e.target.value)} />
<button onClick={submit}>submit</button>
    
</form>


        <h1>Student List</h1>
        <table border={1}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Hobby</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student) => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.age}</td>
                        <td>{student.hobby}</td>
                        <td>
                            <button onClick={() => deleteStudent(student.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      
    </div>
  )
}

export default App
