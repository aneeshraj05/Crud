import React from 'react'
import '../styles/Book.css'

const Books = ({id, title, description, author, price, publishedYear,deleteNote}) => {
    
  return (
    <div>
        <div className="container">
            <h1>{title}</h1>
            <p className='des'>{description}
            </p>
          <div className="det">  <p>{author}</p>
            <p>${price.toFixed(2)}</p>
            <p>{publishedYear}</p></div>
            <button onClick={() => deleteNote(id)}className='btn' >Delete</button>

        </div>

      
    </div>
  )
}

export default Books
