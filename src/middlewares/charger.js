const pokemons = require('../data/pokemons')
const dresseurs = require('../data/dresseurs')

// Cherche le Pokémon correspondant à req.id
const chargerPokemon = (req, res, next) => {
    const pokemon = pokemons.find(p => p.id === req.id)

    if (!pokemon) {
        return res.status(404).json({ message: 'Pokémon introuvable' })
    }

    req.pokemon = pokemon
    next()
}

// Cherche le dresseur correspondant à req.id
const chargerDresseur = (req, res, next) => {
    const dresseur = dresseurs.find(d => d.id === req.id)

    if (!dresseur) {
        return res.status(404).json({ message: 'Dresseur introuvable' })
    }

    req.dresseur = dresseur
    next()
}

module.exports = {chargerPokemon, chargerDresseur}