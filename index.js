const express = require("express");
const app= express();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
app.use(express.json());
require('dotenv').config();
const PORT = process.env.PORT || 3000
app.get('/',(req,res)=>{
    return res.json("server is started");
})
app.post('/', async (req, res) => {
    try {   
        const { name } = req.body;
        const ans = await prisma.user.create({
            data: {
                name: name
            }
        });
        res.json(ans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post('/singup',async(req,res)=>{
    try {
        const {name} = req.body;
        const output = await prisma.user.findMany({
            where:{name:name}
        }
           )
        return res.json({
            msg:"user presnet sucessfully",
        })
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT,()=>{
    console.log('server started');
})