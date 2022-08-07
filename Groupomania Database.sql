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
) ENGINE=InnoDB AUTO_INCREMENT=248 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table groupomania.comments : ~6 rows (environ)
INSERT INTO `comments` (`ID`, `user_id`, `post_id`, `content`) VALUES
	(242, 81, 150, 'Bonjour Carolina !'),
	(243, 81, 149, 'Bonjour Pierre, merci de m\'avoir fait confiance .'),
	(244, 82, 151, 'Ravie de te rencontrer Nassim !'),
	(245, 80, 153, 'Super !!'),
	(246, 82, 153, 'j\'ai hâte !'),
	(247, 81, 153, 'Parfait pour faire votre connaissance a toutes et tous ! !');

-- Listage de la structure de table groupomania. likes
CREATE TABLE IF NOT EXISTS `likes` (
  `user_id` int unsigned NOT NULL,
  `post_id` int unsigned NOT NULL,
  KEY `like_user_id` (`user_id`),
  KEY `like_post_id` (`post_id`) USING BTREE,
  CONSTRAINT `like_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `like_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table groupomania.likes : ~15 rows (environ)
INSERT INTO `likes` (`user_id`, `post_id`) VALUES
	(81, 150),
	(82, 150),
	(82, 149),
	(82, 151),
	(79, 151),
	(79, 150),
	(79, 152),
	(80, 153),
	(80, 152),
	(80, 151),
	(80, 149),
	(82, 153),
	(81, 153),
	(81, 152),
	(81, 149);

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
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table groupomania.posts : ~5 rows (environ)
INSERT INTO `posts` (`Id`, `user_id`, `description`, `imageUrl`, `title`, `creationDate`) VALUES
	(149, 79, 'Bienvenue à tous sur votre nouveau réseau social d\'entreprise !', 'http://localhost:3000/images/bienvenue1659894016926.jpg', 'Bienvenue ! ', '2022-08-07 17:39:17'),
	(150, 80, 'Ravie de pouvoir utiliser notre nouveau réseau social !', 'http://localhost:3000/images/bonjour11659908600584.jpg', 'Bonjour !!', '2022-08-07 21:43:20'),
	(151, 81, 'Salut à tous ! J\'ai hâte de commencer ce nouveau travail avec vous !', 'http://localhost:3000/images/istockphoto-166007695-1024x10241659910061949.jpg', 'Bonsoir !', '2022-08-07 22:07:41'),
	(152, 82, 'Regardez moi cette belle machine !!', 'http://localhost:3000/images/5d87bd50-8e78-4a7a-ade9-4356e3693416-pre-marketplace-image-02-scaled1659911375315.jpg', 'Mon nouvel ordinateur', '2022-08-07 22:29:35'),
	(153, 79, 'Tous les employés sont conviés a un pot de bienvenue vendredi prochain a 13h dans la salle de réunion !', 'http://localhost:3000/images/5XUY3OGMSJOPU4WV6NDHKL7BYA1659911622268.jpg', 'Pot de bienvenue', '2022-08-07 22:33:42');

-- Listage de la structure de table groupomania. users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `admin` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table groupomania.users : ~6 rows (environ)
INSERT INTO `users` (`id`, `username`, `email`, `password`, `admin`) VALUES
	(40, 'Test account !', 'test@mail.com', '$2b$10$ejAr4QR7q0aVLhbfxZNhqOi7KFi1a952HitQWDKdw2fm3Hrx4aktO', 0),
	(78, 'adminAccount', 'groupo.admin@gmail.com', '$2b$10$pj.M5xOOjEsN67/kcG7gYehf6z6IX/n2DdykYbYrXQ2gfdNcPtx3O', 1),
	(79, 'Pierre, CEO', 'pierre@gmail.com', '$2b$10$QUei251x9hay96HREwlrduk/u0fojQaPhLNmuoLfIdFDCvXepKNQu', 0),
	(80, 'Carolina', 'carolina@gmail.com', '$2b$10$mj5Clmxup17aHry/Q5o7R.iQXty0FbriaHnWkhVFtMkipG5C3X5MS', 0),
	(81, 'Nassim', 'nassim@gmail.com', '$2b$10$scOMqh2IBFX5t5yYkMpaWucWJSBDmewPZIbYI91dNBWzCJGbBGULm', 0),
	(82, 'Clémentine', 'clementine@gmail.com', '$2b$10$8pteqxO8NS38zU9YN1XkoeOvGygBco6jI3MYjCHCQ/ofYiOM2OB5W', 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
