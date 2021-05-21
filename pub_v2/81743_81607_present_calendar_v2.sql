-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 28 яну 2021 в 16:30
-- Версия на сървъра: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cal`
--

-- --------------------------------------------------------

--
-- Структура на таблица `eventcalendar`
--

CREATE TABLE `eventcalendar` (
  `num` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `fn` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `month` varchar(255) DEFAULT NULL,
  `day` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `sub` varchar(255) NOT NULL,
  `locked` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Схема на данните от таблица `eventcalendar`
--

INSERT INTO `eventcalendar` (`num`, `name`, `fn`, `year`, `month`, `day`, `time`, `sub`, `locked`) VALUES
(1, 'ReactJS', '81543', '2021', '001', '14', '08:06', 'JAVASCRIPT', 1),
(2, 'Аудио филтри за уеб', '82321', '2021', '001', '14', '08:12', 'OTHER', 1),
(3, 'Технология Blazor', '81222', '2021', '001', '14', '08:42', 'HTML', 1),
(4, 'Софтуерни шаблони за поведение', '81745', '2021', '01', '21', '08:00', 'PHP', 1),
(5, 'PHP 7+', '83444', '2021', '01', '21', '08:24', 'PHP', 1),
(6, 'TypeScript', '81289', '2021', '01', '21', '08:54', 'JAVASCRIPT', 1),
(7, 'CSS Grid', '81456', '2021', '001', '28', '08:18', 'CSS', 1),
(8, 'WebXR', '82333', '2021', '001', '28', '08:42', 'OTHER', 1),
(9, 'Shadow DOM 101', '81790', '2021', '001', '28', '08:48', 'HTML', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `eventcalendar`
--
ALTER TABLE `eventcalendar`
  ADD PRIMARY KEY (`num`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `eventcalendar`
--
ALTER TABLE `eventcalendar`
  MODIFY `num` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
