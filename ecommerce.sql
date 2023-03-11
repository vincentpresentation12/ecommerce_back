-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 11 mars 2023 à 00:54
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ecommerce`
--

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `articles`
--

INSERT INTO `articles` (`id`, `name`, `description`, `price`, `image`, `createdAt`, `updatedAt`) VALUES
(2, 'trotinette', 'La Anoki est la nouvelle trottinette électrique Weebot pensée pour une utilisation urbaine quotidienne. Ce modèle est doté de doubles suspensions avant et arrière et propose une vitesse de pointe de 40 km/h et une autonomie moyenne de 50 km. Sûrement la t', 410, '2d7280ef964e7904a683c507d4d0162b', '2023-03-10 23:30:30', '2023-03-10 23:30:30'),
(3, 'trotinette2', 'Description de la Trottinette Electrique Minimotors Dualtron Thunder version 2022. \r\n\r\nLa nouvelle trottinette électrique Dualtron Thunder est la nouvelle version haut de gamme de la marque Minimotors. Cette version 2021 présente le tout nouveau système d', 4000, '9efc67db5ad39f02bec4e14dee09fe1c', '2023-03-10 23:35:30', '2023-03-10 23:35:30'),
(4, 'new trotinette', 'Description de la Trottinette Electrique Dualtron Mini Double freins.\r\n\r\nSi la Speedway Mini 4 Pro était la grande nouveauté 2019 de Minimotors, la trottinette électrique Dualtron Mini sera la nouvelle pépite de la gamme de la célèbre marque coréenne en 2', 5000, 'fd008c08656ddeb4e8f2fe68f1d4d3ad', '2023-03-10 23:37:05', '2023-03-10 23:37:05');

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

CREATE TABLE `commandes` (
  `id` int(11) NOT NULL,
  `id_Panier` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`id_Panier`)),
  `id_User` int(11) DEFAULT NULL,
  `id_Article` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`id_Article`)),
  `status_Admin` varchar(255) DEFAULT NULL,
  `status_User` varchar(255) DEFAULT 'Validé',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commandes`
--

INSERT INTO `commandes` (`id`, `id_Panier`, `id_User`, `id_Article`, `status_Admin`, `status_User`, `createdAt`, `updatedAt`) VALUES
(1, '[1]', 1, '[1]', 'en Attente', 'Validé', '2023-03-04 13:25:29', '2023-03-04 13:25:29');

-- --------------------------------------------------------

--
-- Structure de la table `commande_articles`
--

CREATE TABLE `commande_articles` (
  `id` int(11) NOT NULL,
  `id_commande` int(11) DEFAULT NULL,
  `id_article` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `paniers`
--

CREATE TABLE `paniers` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_article` int(11) DEFAULT NULL,
  `quantite` int(11) DEFAULT NULL,
  `statut` varchar(255) DEFAULT NULL,
  `valide` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `paniers`
--

INSERT INTO `paniers` (`id`, `id_user`, `id_article`, `quantite`, `statut`, `valide`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 1, 'validé', 1, '2023-03-04 13:25:26', '2023-03-04 13:25:29');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `code_postal` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `level` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `email`, `password`, `lastname`, `firstname`, `adresse`, `code_postal`, `city`, `level`, `createdAt`, `updatedAt`) VALUES
(1, 'vincent', '$2b$10$WLMmj6IsZyNCiq0170Qyt.0FcwBvY1VnbRdDu1Yd399KZbfcJrNKu', NULL, NULL, NULL, NULL, NULL, 1, '2023-03-04 13:24:39', '2023-03-04 13:24:39'),
(2, 'vincent@gmail.com', '$2b$10$HoHLoU8CHteERuyI3Ox1P.kJX.fBLhgtpucNuyBnEA34.UmLsBHbq', 'crosnier', 'vincent', '8', 'place jean rouvier', 'fabregues', 0, '2023-03-04 13:58:15', '2023-03-10 23:10:53');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `commande_articles`
--
ALTER TABLE `commande_articles`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `paniers`
--
ALTER TABLE `paniers`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `commande_articles`
--
ALTER TABLE `commande_articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `paniers`
--
ALTER TABLE `paniers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
