-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: invoice_system
-- ------------------------------------------------------
-- Server version 5.7.27-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_name_UNIQUE` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (46,'cat edited','2019-12-25 01:17:34','2019-12-30 22:50:28'),(47,'HHH','2019-12-25 01:22:33','2019-12-25 01:22:33'),(48,'test loader','2019-12-25 01:23:10','2019-12-25 01:23:10'),(50,'cat6','2019-12-25 01:42:50','2019-12-25 01:42:50'),(51,'test category edited','2019-12-30 22:59:04','2019-12-30 22:59:46'),(52,'NNN','2020-01-01 02:14:21','2020-01-01 02:14:21'),(54,'UUU','2020-01-01 02:14:43','2020-01-01 02:14:43');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `description` mediumtext,
  `category` int(11) DEFAULT NULL,
  `image` longblob,
  `sellingPrice` decimal(10,2) DEFAULT '0.00',
  `buyingPrice` decimal(10,2) DEFAULT '0.00',
  `taxRate` decimal(5,2) DEFAULT '0.00',
  `quantity` int(11) DEFAULT NULL,
  `salesUnit` int(11) DEFAULT NULL,
  `code` varchar(200) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,'Product 1','desciption',50,_binary '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',0.00,0.00,0.00,0,2,'CAT-01','2020-01-01 15:19:12','2020-01-01 15:45:07'),(3,'Product 2','desc',52,'',0.00,0.00,0.00,0,2,'NNN-01','2020-01-01 15:19:36','2020-01-01 15:19:36');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_name_UNIQUE` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (2,'admin'),(1,'user');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_unit`
--

DROP TABLE IF EXISTS `sales_unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales_unit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_unit`
--

LOCK TABLES `sales_unit` WRITE;
/*!40000 ALTER TABLE `sales_unit` DISABLE KEYS */;
INSERT INTO `sales_unit` VALUES (2,'dozen box'),(1,'Piece');
/*!40000 ALTER TABLE `sales_unit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email_id` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_id_UNIQUE` (`email_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Muthukumar','palani','muthupalani1986@gmail.com','password',2,'2019-12-10 05:00:00','2019-12-10 05:00:00'),(2,'Test3 updated','test1','test2@gmail.com','test1',2,'2019-12-10 21:26:42','2019-12-10 21:28:42'),(3,'Test4','test1','test4@gmail.com','test4',1,'2019-12-10 21:47:28','2019-12-10 21:47:28');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-01 15:46:49