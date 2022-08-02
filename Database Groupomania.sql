-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.28 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour groupomania
CREATE DATABASE IF NOT EXISTS `groupomania` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `groupomania`;

-- Listage de la structure de table groupomania. comments
CREATE TABLE IF NOT EXISTS `comments` (
  `ID` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL DEFAULT '0',
  `post_id` int unsigned NOT NULL DEFAULT '0',
  `content` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE,
  KEY `post_id` (`post_id`),
  KEY `FK_comment_user` (`user_id`),
  CONSTRAINT `FK_comment_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table groupomania.comments : ~0 rows (environ)

-- Listage de la structure de table groupomania. likes
CREATE TABLE IF NOT EXISTS `likes` (
  `user_id` int unsigned NOT NULL,
  `post_id` int unsigned NOT NULL,
  KEY `like_user_id` (`user_id`),
  KEY `like_post_id` (`post_id`) USING BTREE,
  CONSTRAINT `like_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `like_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table groupomania.likes : ~3 rows (environ)
INSERT INTO `likes` (`user_id`, `post_id`) VALUES
	(5, 97),
	(5, 98),
	(5, 88);

-- Listage de la structure de table groupomania. posts
CREATE TABLE IF NOT EXISTS `posts` (
  `Id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL DEFAULT '0',
  `description` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `imageUrl` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`) USING BTREE,
  KEY `post_user_id` (`user_id`),
  CONSTRAINT `post_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table groupomania.posts : ~3 rows (environ)
INSERT INTO `posts` (`Id`, `user_id`, `description`, `imageUrl`, `title`, `creationDate`) VALUES
	(88, 40, 'ça pique !', 'http://localhost:3000/images/carolina-reaper1658153183230.jpg', 'Piment', '2022-07-22 10:31:08'),
	(97, 5, 'Salut les amis !', 'http://localhost:3000/images/bonjour-bob1658485900862.jpg', 'Bonsoir !', '2022-07-22 10:31:40'),
	(98, 5, 'ordinateur', 'http://localhost:3000/images/5d87bd50-8e78-4a7a-ade9-4356e3693416-pre-marketplace-image-02-scaled1658824384943.jpg', 'ordi', '2022-07-26 08:33:04');

-- Listage de la structure de table groupomania. users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `admin` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table groupomania.users : ~2 rows (environ)
INSERT INTO `users` (`id`, `username`, `email`, `password`, `admin`) VALUES
	(5, 'martin', 'martinbrosseau@hotmail.fr', '$2b$10$jdmKj93V9FRRqXcX5dSvzeoYyzG.uCt9X.6QFa7V7hMPenax31eq2', 0),
	(40, 'Test account !', 'test@mail.com', '$2b$10$ejAr4QR7q0aVLhbfxZNhqOi7KFi1a952HitQWDKdw2fm3Hrx4aktO', 0),
	(73, 'paul', 'paul@mail.com', '$2b$10$UtQ7KHEkYvOIA79NqHtHheJ4Ry4bD8J2bNIoWNHdfirabkM4fubZS', 0),
	(74, 'Martin3', 'martin.brosseau@laposte.net', '$2b$10$wvOg07f.2gQ1lsZrNgIpnOdqWr5wslCA3NHTJpqIzrxYYThwmQe/6', 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
