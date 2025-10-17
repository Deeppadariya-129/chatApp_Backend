import express from 'express'

const app = express()

const PORT = 2000

app.get('/', (req, res) => {
    res.send("Hello Server is running")
})


app.listen(PORT, () => {
    console.log(`Server running successfully http://localhost:${PORT} ✅`);
    
})