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
    const id = req.params.id
    const currentUsers = users.filter(user => user.id !== id)

    if(currentUsers){
        res.status(200).json({ data: currentUsers })
    }else if(!currentUsers){
        res.status(404).json({ message: "The user with the specified ID does not exist."})
    }else{
        res.status(500).json({ errorMessage: "The user could not be removed"})
    }
})

server.put("/api/users/:id", (req, res) => {
    const id = req.params.id
    const changes = req.body
    const found = users.find(user => user.id === id)

    if(found && req.body.name && req.body.bio) {
        Object.assign(found, changes)
        res.status(200).json({ data: users })
    }else{
        res.status(400).json({ errorMessage: "Please provide name and bio for the user"})
    }
})

const port = 5000

server.listen(port, () => console.log("server running..."))