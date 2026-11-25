const express = require('express')  
const { randomInt } = require('crypto')
const morgan = require('morgan')
const { cpSync } = require('fs')
const pokemons = require('./data/pokemons')
const dresseurs = require('./data/dresseurs')
const verifierId = require('./middlewares/verifierId')
const {chargerPokemon, chargerDresseur} = require('./middlewares/charger')
const routerPokemons = require("./routes/pokemons")
/* 
Requête → route → Réponse

Requête → middleware 1 → route → Réponse

Requête → middleware 1 → middleware 2 → route → Réponse

*/

// Appel de la fonction express() pour creer une instance de notre application
// La variable app represente notre serveur web
const app = express()

// Indique sur quel port le serveur ecoute les requetes envoyees par les clients
const port = 3000




// Affiche chaque reqete recue dans le terminal
app.use(morgan('dev'))
app.use(express.json())
app.use("/api/pokemons", routerPokemons)




// Definit la route GET '/'
app.get('/', (req, res) => {
    // Renvoie une chaine de caractère au navigateur
    res.send('Hello, Express')
})


// Renvoie la liste de tous les dresseurs
app.get('/api/dresseurs', (req, res) => {
    res.json(dresseurs)
})

// Renvoie un dresseur à partir de son identifiant
app.get('/api/dresseurs/:id', verifierId, chargerDresseur, (req, res) => {
    const id = Number(req.params.id)
    const dresseur = dresseurs.find(d => d.id === id)

    if(!dresseur) {
        return res.status(404).json({message: 'Dresseur introuvable'})
    }
    res.json(dresseur)
})

// Route de test : provoque volontairement une erreure
app.get('/api/test-erreur', (req, res) => {
    throw new Error('Erreur volontaire pour le test')
})

app.use((req, res, next) => {
    res.status(404).json({message: "Route introuvable"})
})

// Gere toutes les erreures survenues dans les routes
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({message: 'Erreur interne du serveur'})
})

// Demarre le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`)
})