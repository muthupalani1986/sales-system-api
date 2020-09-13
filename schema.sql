-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: sales_system
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

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
-- Table structure for table `amz_payment`
--

DROP TABLE IF EXISTS `amz_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `amz_payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `settlement-id` varchar(45) DEFAULT NULL,
  `settlement-start-date` datetime DEFAULT NULL,
  `settlement-end-date` datetime DEFAULT NULL,
  `deposit-date` datetime DEFAULT NULL,
  `total-amount` decimal(19,2) DEFAULT '0.00',
  `currency` varchar(45) DEFAULT NULL,
  `transaction-type` varchar(45) DEFAULT NULL,
  `order-id` varchar(200) DEFAULT NULL,
  `merchant-order-id` varchar(200) DEFAULT NULL,
  `adjustment-id` varchar(200) DEFAULT NULL,
  `shipment-id` varchar(100) DEFAULT NULL,
  `marketplace-name` varchar(200) DEFAULT NULL,
  `shipment-fee-type` varchar(45) DEFAULT NULL,
  `shipment-fee-amount` decimal(19,2) DEFAULT NULL,
  `order-fee-type` varchar(45) DEFAULT NULL,
  `order-fee-amount` decimal(19,2) DEFAULT '0.00',
  `fulfillment-id` varchar(100) DEFAULT NULL,
  `posted-date` datetime DEFAULT NULL,
  `order-item-code` varchar(200) DEFAULT NULL,
  `merchant-order-item-id` varchar(200) DEFAULT NULL,
  `merchant-adjustment-item-id` varchar(200) DEFAULT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `quantity-purchased` int(11) DEFAULT NULL,
  `price-type` varchar(100) DEFAULT NULL,
  `price-amount` decimal(19,2) DEFAULT NULL,
  `item-related-fee-type` varchar(200) DEFAULT NULL,
  `item-related-fee-amount` decimal(19,2) DEFAULT '0.00',
  `misc-fee-amount` decimal(19,2) DEFAULT '0.00',
  `other-fee-amount` decimal(19,2) DEFAULT '0.00',
  `other-fee-reason-description` varchar(200) DEFAULT NULL,
  `promotion-id` varchar(100) DEFAULT NULL,
  `promotion-type` varchar(100) DEFAULT NULL,
  `promotion-amount` decimal(19,2) DEFAULT '0.00',
  `direct-payment-type` varchar(100) DEFAULT NULL,
  `direct-payment-amount` decimal(19,2) DEFAULT '0.00',
  `other-amount` decimal(19,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amz_payment`
--

LOCK TABLES `amz_payment` WRITE;
/*!40000 ALTER TABLE `amz_payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `amz_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `amz_payment_summary`
--

DROP TABLE IF EXISTS `amz_payment_summary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `amz_payment_summary` (
  `settlement_id` bigint(20) DEFAULT NULL,
  `settlement_start_date` datetime DEFAULT NULL,
  `settlement_end_date` datetime DEFAULT NULL,
  `Beginning` decimal(28,10) DEFAULT NULL,
  `Product_charges` decimal(28,10) DEFAULT NULL,
  `Promo_rebates` decimal(28,10) DEFAULT NULL,
  `Amazon_fees` decimal(28,10) DEFAULT NULL,
  `Other` decimal(28,10) DEFAULT NULL,
  `Deposit` decimal(28,10) DEFAULT NULL,
  `Beginning_ORG` varchar(50) DEFAULT NULL,
  `Product_charges_ORG` varchar(50) DEFAULT NULL,
  `Promo_rebates_ORG` varchar(50) DEFAULT NULL,
  `Amazon_fees_ORG` varchar(50) DEFAULT NULL,
  `Other_ORG` varchar(50) DEFAULT NULL,
  `Deposit_ORG` varchar(50) DEFAULT NULL,
  `Paymet_Mode` varchar(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amz_payment_summary`
--

LOCK TABLES `amz_payment_summary` WRITE;
/*!40000 ALTER TABLE `amz_payment_summary` DISABLE KEYS */;
/*!40000 ALTER TABLE `amz_payment_summary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pickup`
--

DROP TABLE IF EXISTS `pickup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pickup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(50) DEFAULT NULL,
  `tracking_id` bigint(20) DEFAULT NULL,
  `purchase_date` datetime DEFAULT NULL,
  `picked_up_date` varchar(64) DEFAULT NULL,
  `asin` varchar(50) DEFAULT NULL,
  `sku` varchar(50) DEFAULT NULL,
  `product_name` varchar(180) DEFAULT NULL,
  `quantity_purchased` int(11) DEFAULT NULL,
  `invoice_id` varchar(50) DEFAULT NULL,
  `package_identifier` varchar(50) DEFAULT NULL,
  `ship_service_level` varchar(50) DEFAULT NULL,
  `pickup_slot` varchar(63) DEFAULT NULL,
  `order_item_id` bigint(20) DEFAULT NULL,
  `ship_postal_code` int(11) DEFAULT NULL,
  `ship_country` varchar(50) DEFAULT NULL,
  `ship_city` varchar(50) DEFAULT NULL,
  `ship_state` varchar(50) DEFAULT NULL,
  `carrier` varchar(50) DEFAULT NULL,
  `Uploaded_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pickup`
--

LOCK TABLES `pickup` WRITE;
/*!40000 ALTER TABLE `pickup` DISABLE KEYS */;
/*!40000 ALTER TABLE `pickup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `AMZ_SKU` varchar(69) DEFAULT NULL,
  `Common_SkU` varchar(50) DEFAULT NULL,
  `PROD_TYPE` varchar(50) DEFAULT NULL,
  `PURCH_COST` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email_id` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_id_UNIQUE` (`email_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'muthukumar edit','palani','muthu@gmail.com','password',1,'2020-09-05 10:00:00','2020-09-06 13:15:03');
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

-- Dump completed on 2020-09-14  0:38:29
