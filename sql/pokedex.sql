-- Base de données de l'API Pokédex
-- Attention : supprime la base si elle existe déjà, puis la recrée avec les données de départ

-- 🎙️ DROP puis CREATE → on peut repartir de zéro à tout moment
DROP DATABASE IF EXISTS api_pokedex;
-- 🎙️ utf8mb4 → accents (Salamèche, Régis)
CREATE DATABASE api_pokedex CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE api_pokedex;

-- 🎙️ Une table par ressource, mêmes champs que nos objets
CREATE TABLE pokemons (
    -- 🎙️ AUTO_INCREMENT : MySQL choisit l'id → fini le calcul d'idMax
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    type VARCHAR(30) NOT NULL
);

CREATE TABLE dresseurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    ville VARCHAR(50) NOT NULL
);

-- 🎙️ Mêmes données que nos tableaux, mêmes id
INSERT INTO pokemons (id, nom, type) VALUES
    (1, 'Bulbizarre', 'plante'),
    (4, 'Salamèche', 'feu'),
    (7, 'Carapuce', 'eau'),
    (25, 'Pikachu', 'electrik'),
    (37, 'Goupix', 'feu');

INSERT INTO dresseurs (id, nom, ville) VALUES
    (1, 'Sacha', 'bourg-palette'),
    (2, 'Ondine', 'azuria'),
    (3, 'Pierre', 'argenta'),
    (4, 'Régis', 'bourg-palette');