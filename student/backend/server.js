import express from "express";
import mysql from "mysql2";
const app = express();
const PORT=5000;
import cors from "cors";
app.use(cors());
app.use(express.json());



const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Aneesh@123",
    database:"studentdb"
})
db.connect((err)=>{
    if(err){
        console.log("Error connecting to database:",err);
    }
    else{
        console.log("Connected to database");
    }
})

app.get("/",(req,res)=>{
    res.send("Hello World");
})
app.post("/students",(req,res)=>{
    const{name,age,hobby}=req.body;
    const query="INSERT INTO studentdata(name,age,hobby) VALUES(?,?,?)";
    db.query(query,[name,age,hobby],(err,result)=>{
        if(err){
            console.log("Error inserting data:",err);
            res.status(500).send("Error inserting data");
        }
        else{
            res.status(200).send("Data inserted successfully");
            
            
        }
})
})

app.get("/getStudents",(req,res)=>{
    const query="SELECT * FROM studentdata";
    db.query(query,(err,result)=>{
        if(err){
            console.log("Error fetching data:",err);
            res.status(500).send("Error fetching data");
        }
        else{
            console.log("Data fetched successfully");
            res.status(200).json(result);
        }
    })
})

app.delete("/delete/:id",(req,res)=>{
    const id=req.params.id;
    const query="DELETE FROM studentdata WHERE id=?";
    db.query(query,[id],(err,result)=>{
        if(err){
            res.status(500).send("Error deleting data");
            console.log("Error deleting data:",err);
        }
        else{
            res.status(200).send("Data deleted successfully");
            console.log("Data deleted successfully");
        }
    })
})


    
app.delete("/deleteAll",(req,res)=>{
    const query="DELETE FROM studentdata,ALTER TABLE studentdata AUTO_INCREMENT = 1;";
    db.query(query,(err,result)=>{
        if(err){
            res.status(500).send("Error deleting data");
            console.log("Error deleting data:",err);
        }
        else{
            res.status(200).send("All data deleted successfully");
            console.log("All data deleted successfully");
        }
    })
})


app.put("/update/:id",(req,res)=>{
    const id=req.params.id;
    const{name,age,hobby}=req.body;
    const query="UPDATE studentdata SET name=?,age=?,hobby=? WHERE id=?";
    db.query(query,[name,age,hobby,id],(err,result)=>{
        if(err){
            res.status(500).send("Error updating data");
            console.log("Error updating data:",err);
        }
        else{
            res.status(200).send("Data updated successfully");
            console.log("Data updated successfully");
        }
    })
})



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})