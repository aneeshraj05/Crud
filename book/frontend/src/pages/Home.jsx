import React from 'react'
import Books from '../components/Books'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/App.css'

const Home = () => {
     const navigate=useNavigate()
  const[books,setBooks]=useState([]);
 ;
 useEffect(()=>{
  axios.get('http://localhost:3000/books/get').then((response)=>{
    setBooks(response.data);
  }).catch((error)=>{
    console.log("Error fetching data:",error);
  })

 },[]);

 const deleteNote=(id)=>{
 axios.delete(`http://localhost:3000/books/delete/${id}`).then((response)=>{
  console.log("Book deleted successfully:",response.data);
  axios.get('http://localhost:3000/books/get').then((response)=>{
    setBooks(response.data);
  }).catch((error)=>{
    console.log("Error fetching data:",error);
  })

 }).catch((error)=>{
  console.log("Error deleting data:",error);
 })
 }
 const add=()=>{
  navigate('/add');

 }
  return (
    <div className='hero'>
      <button onClick={add} className='hbtn'>Add Book</button>
{
  books.map((book)=>{
    return <Books key={book.id} id={book.id} title={book.title} description={book.description} author={book.author} price={book.price} publishedYear={book.published_year} deleteNote={deleteNote}/>
  })
}
      
    </div>
  )
}

export default Home
