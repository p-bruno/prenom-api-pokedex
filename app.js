const express = require('express')  

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

// Definit la route GET '/'
app.get('/', (req, res) => {
    // Renvoie une chaine de caractère au navigateur
    res.send('Hello, Express')
})

// Renvoie la liste des pokémons
app.get('/api/pokemons', (req, res) => {
    res.json(pokemons)
})

// Renvoie un pokemon a partir de son id
app.get('/api/pokemons/:id', (req, res) => {
    const id = Number(req.params.id)
    const pokemon = pokemons.find(p => p.id === id)
    res.json(pokemon)
})

// Demarre le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`)
})