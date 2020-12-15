-- MySQL dump 10.13  Distrib 5.5.16, for Win32 (x86)
--
-- Host: localhost    Database: btpns
-- ------------------------------------------------------
-- Server version	5.5.16

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
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item` (
  `id` int(11) NOT NULL DEFAULT '0',
  `merchantID` int(11) NOT NULL DEFAULT '0',
  `name_` varchar(255) DEFAULT NULL,
  `price` double DEFAULT '0',
  PRIMARY KEY (`id`,`merchantID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` (`id`, `merchantID`, `name_`, `price`) VALUES (1,1,'Bawang Putih',5000),(2,1,'Ayam',6000),(3,2,'Ikan',2000),(4,2,'Bawang Merah',1000),(5,3,'Sendok',9000),(6,3,'Garpu',3000);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merchant`
--

DROP TABLE IF EXISTS `merchant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_` varchar(255) DEFAULT NULL,
  `Saldo` double DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant`
--

LOCK TABLES `merchant` WRITE;
/*!40000 ALTER TABLE `merchant` DISABLE KEYS */;
INSERT INTO `merchant` (`id`, `name_`, `Saldo`) VALUES (1,'Merchant1',116000),(2,'Merchant2',0),(3,'Merchant3',0);
/*!40000 ALTER TABLE `merchant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trans`
--

DROP TABLE IF EXISTS `trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transactionDate` datetime DEFAULT NULL,
  `userID` int(11) DEFAULT NULL,
  `merchantID` int(11) DEFAULT NULL,
  `itemID` int(11) DEFAULT NULL,
  `price` double DEFAULT '0',
  `note` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans`
--

LOCK TABLES `trans` WRITE;
/*!40000 ALTER TABLE `trans` DISABLE KEYS */;
INSERT INTO `trans` (`id`, `transactionDate`, `userID`, `merchantID`, `itemID`, `price`, `note`) VALUES (1,'2020-12-08 14:55:47',1,1,1,5000,'Pembayaran untuk item Bawang Putih'),(5,'2020-12-09 16:44:42',1,1,2,6000,'Pembayaran untuk item Ayam'),(6,'2020-12-09 16:45:14',1,1,2,6000,'Pembayaran untuk item Ayam'),(7,'2020-12-09 16:45:25',1,1,2,6000,'Pembayaran untuk item Ayam'),(8,'2020-12-09 17:20:42',1,1,2,6000,'Pembayaran untuk item Ayam'),(9,'2020-12-09 17:20:44',1,1,2,6000,'Pembayaran untuk item Ayam'),(10,'2020-12-09 17:20:46',1,1,2,6000,'Pembayaran untuk item Ayam'),(11,'2020-12-09 17:20:48',1,1,2,6000,'Pembayaran untuk item Ayam'),(12,'2020-12-09 17:20:50',1,1,2,6000,'Pembayaran untuk item Ayam'),(13,'2020-12-09 17:20:52',1,1,2,6000,'Pembayaran untuk item Ayam'),(14,'2020-12-09 17:20:53',1,1,2,6000,'Pembayaran untuk item Ayam'),(15,'2020-12-09 17:20:55',1,1,2,6000,'Pembayaran untuk item Ayam'),(16,'2020-12-09 17:20:57',1,1,2,6000,'Pembayaran untuk item Ayam'),(17,'2020-12-09 17:20:58',1,1,2,6000,'Pembayaran untuk item Ayam'),(18,'2020-12-09 19:52:19',1,1,1,5000,'Pembayaran untuk item Bawang Putih'),(19,'2020-12-09 19:52:23',1,1,1,5000,'Pembayaran untuk item Bawang Putih'),(20,'2020-12-09 19:52:24',1,1,1,5000,'Pembayaran untuk item Bawang Putih');
/*!40000 ALTER TABLE `trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_` varchar(255) DEFAULT NULL,
  `Saldo` double DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `name_`, `Saldo`) VALUES (1,'Dill',236003),(2,'Noer',0),(3,'Rokhman',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-09 20:04:08
