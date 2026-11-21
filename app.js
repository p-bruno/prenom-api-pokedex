const express = require('express')  

// Appel de la fonction express() pour creer une instance de notre application
// La variable app represente notre serveur web
const app = express()

// Indique sur quel port le serveur ecoute les requetes envoyees par les clients
const port = 3000

// Definit la route GET '/'
app.get('/', (req, res) => {
    // Renvoie une chaine de caractère au navigateur
    res.send('Hello, Express')
})

// Demarre le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`)
})