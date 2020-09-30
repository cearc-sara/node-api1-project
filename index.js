const express = require('express')

const server = express();

const id = require('short-id')

server.use(express.json())

let users = [];

server.post("/api/users", (req, res) => {
    const data = req.body;
    if(data.name && data.bio){
        users.push({ id: id.generate(), ...data})
        res.status(201).json({ data: users })
    }else{
        res.status(404).json({ errorMessage: "Please provide a name and bio for the user."})
    }
})

server.get("/api/users", (req, res) => {
    if(res) {
        res.status(200).json({ data: users })
    }else{
        res.status(500).json({ errorMessage: "The users information could not be retrieved"})
    }
})

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id
    const found = users.find(user => user.id === id)

    if(found){
        res.status(200).json({ data: found })
    }else if(!found) {
        res.status(404).json({ message: "The user with the specified ID does not exist"})
    }else{
        res.status(500).json({ errorMessage: "The user information could not be retrieved."})
    }
})

server.delete("/api/users/:id", (req, res) => {
    
})