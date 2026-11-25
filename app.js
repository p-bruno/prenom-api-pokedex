const express = require('express')  
const { randomInt } = require('crypto')
const morgan = require('morgan')

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

// Données de test : liste des Pokémon
const pokemons = [
    { id: 1, nom: 'Bulbizarre', type: 'plante' },
    { id: 4, nom: 'Salamèche', type: 'feu' },
    { id: 7, nom: 'Carapuce', type: 'eau' },
    { id: 25, nom: 'Pikachu', type: 'electrik' },
    { id: 37, nom: 'Goupix', type: 'feu' }
]

const dresseurs = [
    { id: 1, nom: 'Sacha', ville: 'bourg-palette' },
    { id: 2, nom: 'Ondine', ville: 'azuria' },
    { id: 3, nom: 'Pierre', ville: 'argenta' },
    { id: 4, nom: 'Régis', ville: 'bourg-palette' }
]

// Affiche chaque reqete recue dans le terminal
app.use(morgan('dev'))

const verifierId = (req,res,next) => {
    const id = Number(req.params.id)

    if(Number.isNaN(id)) {
        return res.status(400).json({message: "L'id doit être un nombre"})
    }

    req.id = id 
    next()
}

// Definit la route GET '/'
app.get('/', (req, res) => {
    // Renvoie une chaine de caractère au navigateur
    res.send('Hello, Express')
})

// Renvoie la liste des pokémons
app.get('/api/pokemons', (req, res) => {
    const type = req.query.type

    if (type) {
        const resultat = pokemons.filter(p => p.type === type)
        return res.json(resultat)
    }

    res.json(pokemons)
})

// Renvoie un pokemon choisi au hasard
app.get('/api/pokemons/aleatoire', (req, res) => {
    const index = randomInt(pokemons.length)

    res.json(pokemons[index])
})

// Renvoie un pokemon a partir de son id
app.get('/api/pokemons/:id', verifierId,  (req, res) => {

    const pokemon = pokemons.find(p => p.id === req.id)

    if(!pokemon) {
       return res.status(404).json({message: 'Pokemon introuvable'})
    }
    res.json(pokemon)
})

// Renvoie la liste de tous les dresseurs
app.get('/api/dresseurs', (req, res) => {
    res.json(dresseurs)
})

// Renvoie un dresseur à partir de son identifiant
app.get('/api/dresseurs/:id', verifierId, (req, res) => {
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