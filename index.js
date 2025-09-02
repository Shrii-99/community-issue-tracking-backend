import dotenv from "dotenv"
dotenv.config();
import express from "express"

app.get("/" , (req , res) => {
    res.send("Hii from server")
})

const port = process.env.PORT;
app.listen(port , () =>{
    console.log(`Server is running on http://localhost:${port}`);
} )