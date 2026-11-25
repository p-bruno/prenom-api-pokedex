const express = require('express')
const { randomInt } = require('crypto')
const pokemons = require('../data/pokemons')
const verifierId = require('../middlewares/verifierId')
const {chargerPokemon} = require('../middlewares/charger')
const router = express.Router()


// Renvoie la liste des pokémons
router.get('/', (req, res) => {
    const type = req.query.type

    if (type) {
        const resultat = pokemons.filter(p => p.type === type)
        return res.json(resultat)
    }

    res.json(pokemons)
})

// Ajoute un pokémon
router.post('/', (req, res) => {
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
router.get('/aleatoire', (req, res) => {
    const index = randomInt(pokemons.length)

    res.json(pokemons[index])
})

// Renvoie un pokemon a partir de son id
router.get('/:id', verifierId, chargerPokemon,  (req, res) => {

    const pokemon = pokemons.find(p => p.id === req.id)

    if(!pokemon) {
       return res.status(404).json({message: 'Pokemon introuvable'})
    }
    res.json(pokemon)
})

// Modifie un pokémon
router.put('/:id', verifierId, (req, res) => {
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
router.delete('/:id', verifierId, (req, res) =>{
    const index = pokemons.findIndex(p => p.id === req.id)

    if (index === -1) {
        return res.status(404).json({message: "Pokémon introuvable"})
    }

    pokemons.splice(index,1)

    res.status(204).json()
} )



module.exports = router