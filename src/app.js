const express = require('express')  
const { randomInt } = require('crypto')
const morgan = require('morgan')
const { cpSync } = require('fs')
const pokemons = require('./data/pokemons')
const dresseurs = require('./data/dresseurs')
const verifierId = require('./middlewares/verifierId')
const {chargerPokemon, chargerDresseur} = require('./middlewares/charger')

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

// Ajoute un pokémon
app.post('/api/pokemons', (req, res) => {
    const nom = req.body.nom
    const type = req.body.type

    if (!nom || !type) {
        res.status(400).json({message: "Le champ nom et type sont obligatoires"})
    }

    let idMax = 0
    for (const pokemon of pokemons) {
        if(pokemon.id > idMax) {
            idMax = pokemon.id
        }
    }

    const nouveauPokemon = {id: idMax + 1, nom: nom, type: type}
    pokemons.push(nouveauPokemon)

    res.status(201).json(nouveauPokemon)
})

// Renvoie un pokemon choisi au hasard
app.get('/api/pokemons/aleatoire', (req, res) => {
    const index = randomInt(pokemons.length)

    res.json(pokemons[index])
})

// Renvoie un pokemon a partir de son id
app.get('/api/pokemons/:id', verifierId, chargerPokemon,  (req, res) => {

    const pokemon = pokemons.find(p => p.id === req.id)

    if(!pokemon) {
       return res.status(404).json({message: 'Pokemon introuvable'})
    }
    res.json(pokemon)
})

// Modifie un pokémon
app.put('/api/pokemons/:id', verifierId, (req, res) => {
    const pokemon = pokemons.find(p => p.id === req.id)

    if(!pokemon) {
        return res.status(404).json({message:"Pokémon introuvable"})
    }

    const nom = req.body.nom
    const type = req.body.type

    if (!nom || !type) {
        return res.status(400).json({message: "Les champes nom et type sont obligatoire"})
    }

    pokemon.nom = nom
    pokemon.type= type

    res.json(pokemon)
})

// Supprime un pokémon
app.delete('/api/pokemons/:id', verifierId, (req, res) =>{
    const index = pokemons.findIndex(p => p.id === req.id)

    if (index === -1) {
        return res.status(404).json({message: "Pokémon introuvable"})
    }

    pokemons.splice(index,1)

    res.status(204).json()
} )

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