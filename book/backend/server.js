import express from 'express';
import mysql from 'mysql2'
import cors from 'cors';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const SECRET_KEY = "supersecret";
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

const db=mysql.createConnection({
    host:'Localhost',
    user:'root',
    password:'Aneesh@123',
    database:'books'
})
db.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('Connected to MySQL database');
    }
})

function authenticationToken(req,res,next){
    const authHeader=req.headers['authorization'];
    const token =authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({error:"Access denied"});
    }
    jwt.verify(token,SECRET_KEY,(err,user)=>{
        if(err){
            return res.status(403).json({error:"Invalid token"});

        }
        req.user=user;
        next();

    })
}


app.post('/books/register',async (req,res)=>{
    const {username,email,password}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);
    const query='INSERT INTO users (username,email,password) VALUES(?,?,?)';
    db.query(query,[username,email,hashedPassword],(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).json({error:"Failed to register user"})
        }
        else{
            console.log("Successfully registered user");
            res.json(data);
        }
    })

})



app.post('/books/login',async (req,res)=>{
    const {email,password}=req.body;
    const query='SELECT * FROM users WHERE email=?';
    db.query(query,[email],async(err,data)=>{
        if(err){
            return res.status(500).json({error:"Failed to login"});
        }
        if(data.length===0){
            return res.status(400).json({error:"User not found"});
        }
        const user=data[0];
        const match=await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(400).json({error:"Invalid password"});
        }
        const token=jwt.sign({id:user.id,email:user.email},SECRET_KEY,{expiresIn:"1h"});
        console.log("Successfully logged in");
        res.json({token});
    })
})



app.get('/books/get',authenticationToken,(req,res)=>{
    const query='SELECT * FROM bookdata';
    db.query(query,(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).json({error:"Failed to fetch books"})
        }
        else{
            console.log("Successfully fetched books");
            res.json(data);
        }
    })
})

app.post('/books/add',(req,res)=>{
    const {title,description,author,genre,price,published_year}=req.body;
    const query='INSERT INTO bookdata (title,description,author,genre,price,published_year) VALUES(?,?,?,?,?,?)';
    db.query(query,[title,description,author,genre,price,published_year],(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).json({error:"Failed to add book"})
        }
        else{
            console.log("Successfully added book");
            res.json(data);
        }

    })
})
app.delete('/books/delete/:id',(req,res)=>{
    const id=req.params.id;
    const query='DELETE FROM bookdata WHERE id=?';
    db.query(query,[id],(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).json({error:"Failed to delete book"})
        }
        else{
            console.log("Successfully deleted book");
            res.json(data);
        }
    })
})
app.put("/books/update/:id",(req,res)=>{
    const id=req.params.id;
    const {title,description,author,genre,price,published_year}=req.body;
    const query='UPDATE bookdata SET title=?,description=?,author=?,genre=?,price=?,published_year=? WHERE id=?';
    db.query(query,[title,description,author,genre,price,published_year,id],(err,data)=>{   
        if(err){
            console.log(err);
            res.status(500).json({error:"Failed to update book"})
        }
        else{
            console.log("Successfully updated book");
            res.json(data);
        }
    })
})
app.get('/book/get',(req,res)=>{
    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) || 5;
    const offset=(page-1)*limit;
    const query='SELECT * FROM bookdata LIMIT ? OFFSET ?';
    db.query(query,[limit,offset],(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).json({error:"Failed to fetch books"})
        }
        else{
            res.json(result);
        }
    })
})

app.get('/books/genre/:genre',(req,res)=>{
    const genre=req.params.genre;
    const query='SELECT * FROM bookdata WHERE genre=?';
    db.query(query,[genre],(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).json({error:"Failed to fetch books by genre"})
        }
        else{
            console.log("Successfully fetched books by genre");
            res.json(data);
        }
    })
})


app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


