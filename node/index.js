const express = require ('express')
const app = express()
const port = 3000
const mysql = require('mysql')
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator')

app.get('/', (req,res) =>{

    const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] })
    
    const connection = mysql.createConnection(config)

    const createtable = `CREATE TABLE IF NOT EXISTS people(id int not null AUTO_INCREMENT, name varchar(255), primary key(id))`
    connection.query(createtable);

    const insertName = `INSERT INTO people(name) values ('${randomName}')`
    connection.query(insertName)
    
    const selectNames = `SELECT * FROM people`
    connection.query(selectNames, (err, result, fields) => {
        if (err) throw err;
        let resultAppend = "<ul>"
        result.forEach(element => {
            resultAppend += (`<li>${element.name}</li>`)
        });
        resultAppend += "</ul>"

        res.send(`<h1>Full Cycle Rocks!</h1></br>${resultAppend}`)
    })
    connection.end()
})

app.listen(port, ()=> {
    console.log(`Rodando na porta ${port}`)
})