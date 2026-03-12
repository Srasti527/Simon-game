const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let leaderboard = [];

app.post("/score", (req, res) => {

    const { name, score } = req.body;

    leaderboard.push({ name, score });

    leaderboard.sort((a,b) => b.score - a.score);

    leaderboard = leaderboard.slice(0,5);

    res.json({message:"Score saved"});
});

app.get("/leaderboard", (req,res)=>{
    res.json(leaderboard);
});

app.listen(5000, ()=>{
    console.log("Server running on port 5000");
});