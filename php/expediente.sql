-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 03, 2018 at 11:43 PM
-- Server version: 5.6.38
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `expediente`
--

-- --------------------------------------------------------

--
-- Table structure for table `pacientes`
--

CREATE TABLE `pacientes` (
  `folio` varchar(18) NOT NULL,
  `curp` varchar(18) NOT NULL,
  `primerap` varchar(50) NOT NULL,
  `segundoap` varchar(50) DEFAULT NULL,
  `nombre` varchar(50) NOT NULL,
  `fecnac` date NOT NULL,
  `edonac` varchar(4) NOT NULL,
  `sexo` varchar(1) NOT NULL,
  `nacorigen` varchar(3) NOT NULL,
  `edo` varchar(4) NOT NULL,
  `mun` varchar(4) NOT NULL,
  `loc` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`folio`);
