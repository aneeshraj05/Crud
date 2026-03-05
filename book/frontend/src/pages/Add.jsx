import React from 'react'
import '../styles/Book.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Add = () => {
  const navigate=useNavigate();
  const[title,setTitle]=React.useState("");
  const[description,setDescription]=React.useState("");
  const[author,setAuthor]=React.useState("");
  const[price,setPrice]=React.useState();
  const[published_year,setPublishedYear]=React.useState();
  const add=(e)=>{
    e.preventDefault();
    if(title=='' || description=='' || author=='' || price==0 || published_year==0){
      alert("Please fill all the fields");
      return;
    }
    axios.post('http://localhost:3000/books/add',{
      title,
      description,
      author,
      price,
      published_year
    }).then((response)=>{
      console.log("Book added successfully:",response.data);
   
      navigate('/');

    }).catch((error)=>{
      console.log("Error adding data:",error);
    })
  }
  return (
    <div className="dib">
      <div className='add'>
        <form action="" className='form'>
            <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <input type="text" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
            <input type="text" placeholder="Author" value={author} onChange={(e)=>setAuthor(e.target.value)} />
            <input type="number" placeholder="Price" value={price} onChange={(e)=>setPrice(Number(e.target.value))}  />
            <input type="number" placeholder="Published Year" value={published_year} onChange={(e)=>setPublishedYear(Number(e.target.value))} />
            <button type="submit" onClick={add}>Add Book</button>
        </form>
    </div>
    </div>
  )
}

export default Add
