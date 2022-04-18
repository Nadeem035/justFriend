-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 27, 2022 at 11:34 AM
-- Server version: 5.7.34-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `just_friend`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(256) NOT NULL,
  `img` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`id`, `name`, `email`, `password`, `img`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2b$10$twqeY05KYuvKMy3DPI5ym.SsENabbGjnOuLCIRxCE.GEuJDATlUHq', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_block_user`
--

CREATE TABLE `tbl_block_user` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `blocked_user_id` int(11) NOT NULL,
  `createdDtm` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_block_user`
--

INSERT INTO `tbl_block_user` (`id`, `user_id`, `blocked_user_id`, `createdDtm`) VALUES
(1, 56, 13, '2021-10-11 10:50:54'),
(2, 5, 24, '2021-10-14 09:34:51'),
(3, 5, 24, '2021-10-14 09:34:59'),
(4, 26, 24, '2021-10-15 05:32:55'),
(5, 36, 14, '2021-10-15 05:53:23'),
(6, 36, 14, '2021-10-15 05:53:31'),
(7, 58, 24, '2021-10-15 06:06:27'),
(8, 58, 32, '2021-10-15 06:08:23'),
(9, 15, 15, '2021-10-15 08:52:06'),
(10, 15, 24, '2021-10-15 08:55:18'),
(11, 15, 24, '2021-10-19 11:25:35'),
(12, 15, 32, '2021-10-19 11:25:38'),
(13, 68, 24, '2021-10-19 14:18:27'),
(14, 56, 73, '2021-12-03 12:07:06'),
(15, 56, 73, '2021-12-03 12:07:13'),
(16, 60, 26, '2022-01-24 10:59:26'),
(17, 12, 26, '2022-01-24 11:05:02'),
(18, 12, 26, '2022-01-24 11:08:07'),
(19, 12, 26, '2022-01-24 11:09:48'),
(20, 12, 26, '2022-01-24 11:09:50'),
(21, 12, 26, '2022-01-24 11:11:04'),
(22, 12, 26, '2022-01-24 11:12:19'),
(23, 12, 26, '2022-01-24 11:13:18'),
(24, 12, 26, '2022-01-24 11:16:03'),
(25, 12, 26, '2022-01-24 11:16:35'),
(26, 12, 26, '2022-01-24 11:17:43');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

CREATE TABLE `tbl_category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `img` varchar(255) NOT NULL,
  `createdDtm` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedDtm` datetime DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_category`
--

INSERT INTO `tbl_category` (`id`, `name`, `img`, `createdDtm`, `updatedDtm`, `isDeleted`) VALUES
(1, '전자기기', 'uploads/Electronic.png', '2021-12-07 17:55:02', '2021-12-07 17:55:02', 0),
(2, '스포츠용품', 'uploads/Sports.png', '2021-12-07 17:55:02', '2021-12-07 17:55:02', 0),
(3, '자동차', 'uploads/Cars.png', '2021-12-07 17:57:54', '2021-12-07 17:57:54', 0),
(4, '오토바이', 'uploads/Vehicles.png', '2021-12-07 17:57:54', '2021-12-07 17:57:54', 0),
(5, '게임 ', 'uploads/Games.png', '2021-12-07 17:58:39', '2021-12-07 17:58:39', 0),
(6, 'Test', 'uploads/category/20220106T135218096ZGiftCard-Graphic-01_grande.jpg', '2022-01-06 14:52:19', '2022-01-06 14:52:18', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_chats`
--

CREATE TABLE `tbl_chats` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `room_id` int(11) NOT NULL,
  `sender_id` varchar(255) NOT NULL,
  `receiver_id` varchar(255) NOT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `is_seen` tinyint(1) DEFAULT '0',
  `message` varchar(255) NOT NULL,
  `media_type` varchar(255) NOT NULL,
  `date` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_chat_rooms`
--

CREATE TABLE `tbl_chat_rooms` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sender_id` varchar(255) NOT NULL,
  `receiver_id` varchar(255) DEFAULT '',
  `is_deleted` tinyint(1) DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_favourite`
--

CREATE TABLE `tbl_favourite` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `createdDtm` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isFavourite` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_favourite`
--

INSERT INTO `tbl_favourite` (`id`, `user_id`, `product_id`, `createdDtm`, `isFavourite`) VALUES
(2, 74, 75, '2021-12-08 16:00:07', 1),
(4, 74, 77, '2021-12-09 15:04:26', 1),
(18, 75, 87, '2022-01-11 07:34:53', 1),
(19, 75, 81, '2022-01-11 07:42:32', 1),
(27, 75, 72, '2022-01-11 07:49:27', 1),
(28, 75, 71, '2022-01-11 07:49:30', 1),
(34, 76, 81, '2022-01-11 07:54:05', 1),
(39, 76, 73, '2022-01-11 07:54:56', 1),
(50, 75, 82, '2022-01-11 08:12:26', 1),
(52, 76, 75, '2022-01-11 08:21:39', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_foundation`
--

CREATE TABLE `tbl_foundation` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createDtm` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDtm` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_foundation`
--

INSERT INTO `tbl_foundation` (`id`, `name`, `createDtm`, `updateDtm`, `isDeleted`) VALUES
(1, '월드비전', '2021-12-07 18:17:50', '2021-12-07 18:17:50', 0),
(2, '초록우산 어린이재단', '2021-12-07 18:17:50', '2021-12-07 18:17:50', 0),
(3, '굿네이버스', '2021-12-07 18:18:04', '2021-12-07 18:18:04', 0),
(4, '유니세프', '2021-12-07 18:18:04', '2021-12-07 18:18:04', 0),
(5, '푸르매 재단', '2021-12-07 18:18:15', '2021-12-07 18:18:15', 0),
(6, '두드림 펀드', '2021-12-07 18:18:15', '2021-12-07 18:18:15', 0),
(7, 'test', '2022-01-07 10:56:47', '2022-01-07 10:56:47', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_notification`
--

CREATE TABLE `tbl_notification` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `push_body` varchar(100) NOT NULL,
  `createdDtm` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isRead` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_notification`
--

INSERT INTO `tbl_notification` (`id`, `user_id`, `product_id`, `title`, `push_body`, `createdDtm`, `isRead`) VALUES
(1, 3, 1, 'demo', 'Your ad is now published', '2021-09-22 15:44:37', 0),
(2, 1, 2, 'New Folder test', 'Your ad is now published', '2021-09-23 13:25:15', 0),
(3, 1, 3, 'New Folder test', 'Your ad is now published', '2021-09-23 14:16:56', 0),
(4, 1, 4, 'New Folder test', 'Your ad is now published', '2021-09-24 09:51:42', 0),
(5, 1, 5, 'New Folder test', 'Your ad is now published', '2021-09-24 09:55:02', 0),
(6, 13, 6, 'title', 'Your ad is now published', '2021-09-24 15:34:18', 0),
(7, 13, 7, 'tt', 'Your ad is now published', '2021-09-24 15:56:41', 0),
(8, 13, 8, 'title', 'Your ad is now published', '2021-09-24 15:58:25', 0),
(9, 13, 9, 'title', 'Your ad is now published', '2021-09-24 16:00:07', 0),
(10, 26, 10, 'Scenery', 'Your ad is now published', '2021-09-28 07:27:38', 0),
(11, 26, 11, 'Yellow', 'Your ad is now published', '2021-09-29 08:28:55', 0),
(12, 27, 12, 'car', 'Your ad is now published', '2021-09-29 11:14:40', 0),
(13, 27, 13, 'title', 'Your ad is now published', '2021-09-29 11:23:19', 0),
(14, 6, 14, 'Equipment', 'Your ad is now published', '2021-09-29 12:11:35', 0),
(15, 6, 15, 'supplements to', 'Your ad is now published', '2021-09-29 12:20:37', 0),
(16, 27, 16, 'title', 'Your ad is now published', '2021-09-29 14:52:19', 0),
(17, 6, 17, 'title', 'Your ad is now published', '2021-09-30 07:41:57', 0),
(18, 6, 18, 'office', 'Your ad is now published', '2021-09-30 08:19:20', 0),
(19, 5, 19, ' nvcjgujgjgu', 'Your ad is now published', '2021-09-30 10:08:07', 0),
(20, 5, 20, 'screen', 'Your ad is now published', '2021-09-30 11:37:54', 0),
(21, 13, 21, 'new day work', 'Your ad is now published', '2021-09-30 14:13:17', 0),
(22, 13, 22, 'newest addition', 'Your ad is now published', '2021-09-30 14:31:39', 0),
(23, 13, 23, 'newest addition', 'Your ad is now published', '2021-09-30 14:34:45', 0),
(24, 13, 24, 'The first thing', 'Your ad is now published', '2021-09-30 14:35:58', 0),
(25, 13, 25, 'yuij', 'Your ad is now published', '2021-09-30 14:47:56', 0),
(26, 5, 26, 'okay thanks ', 'Your ad is now published', '2021-09-30 14:52:39', 0),
(27, 17, 27, 'New Folder test', 'Your ad is now published', '2021-10-01 06:29:44', 0),
(28, 26, 28, 'Truck', 'Your ad is now published', '2021-10-01 13:21:26', 0),
(29, 13, 29, 'I have already sent ', 'Your ad is now published', '2021-10-01 13:35:06', 0),
(30, 26, 30, '3 sceneries', 'Your ad is now published', '2021-10-01 14:11:19', 0),
(31, 26, 31, '5 Sceneries', 'Your ad is now published', '2021-10-01 14:12:05', 0),
(32, 1, 32, 'New Folder test', 'Your ad is now published', '2021-10-01 14:18:44', 0),
(33, 11, 33, 'I have sent ', 'Your ad is now published', '2021-10-01 14:27:40', 0),
(34, 26, 34, '4 Oct Scenery', 'Your ad is now published', '2021-10-04 06:56:47', 0),
(35, 13, 35, 'turle', 'Your ad is now published', '2021-10-04 08:20:26', 0),
(36, 26, 36, 'Laptop Wallpaper', 'Your ad is now published', '2021-10-04 08:39:06', 0),
(37, 6, 37, 'The first thing', 'Your ad is now published', '2021-10-04 11:27:41', 0),
(38, 6, 38, 'I have to say', 'Your ad is now published', '2021-10-04 11:30:07', 0),
(39, 13, 39, 'turtle', 'Your ad is now published', '2021-10-06 07:55:31', 0),
(40, 13, 40, 'turtle', 'Your ad is now published', '2021-10-06 07:55:32', 0),
(41, 32, 41, 'water botl', 'Your ad is now published', '2021-10-06 08:32:13', 0),
(42, 32, 42, 'water', 'Your ad is now published', '2021-10-06 08:41:25', 0),
(43, 13, 43, 'anything', 'Your ad is now published', '2021-10-06 11:48:16', 0),
(44, 13, 44, 'anything', 'Your ad is now published', '2021-10-06 11:48:16', 0),
(45, 13, 45, 'anything', 'Your ad is now published', '2021-10-06 11:48:16', 0),
(46, 13, 46, 'anything', 'Your ad is now published', '2021-10-06 11:48:16', 0),
(47, 13, 47, 'anything', 'Your ad is now published', '2021-10-06 11:48:17', 0),
(48, 13, 48, 'anything', 'Your ad is now published', '2021-10-06 11:48:17', 0),
(49, 26, 49, 'Car Wallpapers 2021', 'Your ad is now published', '2021-10-06 12:41:44', 0),
(50, 26, 50, 'heheh', 'Your ad is now published', '2021-10-06 14:46:10', 0),
(51, 24, 51, 'photos', 'Your ad is now published', '2021-10-07 11:20:18', 0),
(52, 24, 52, 'car', 'Your ad is now published', '2021-10-07 11:28:15', 0),
(53, 13, 53, 'The first is', 'Your ad is now published', '2021-10-07 15:16:10', 0),
(54, 12, 54, 'mouse', 'Your ad is now published', '2021-10-08 06:42:53', 0),
(55, 12, 55, 'office', 'Your ad is now published', '2021-10-08 06:50:48', 0),
(56, 12, 56, 'office', 'Your ad is now published', '2021-10-08 06:55:43', 0),
(57, 12, 57, 'ttt', 'Your ad is now published', '2021-10-08 06:58:51', 0),
(58, 12, 58, 'turtle', 'Your ad is now published', '2021-10-08 07:04:19', 0),
(59, 13, 59, 'I am not sure', 'Your ad is now published', '2021-10-08 07:38:38', 0),
(60, 1, 60, 'New Folder test', 'Your ad is now published', '2021-10-12 07:49:51', 0),
(61, 1, 61, 'New Folder test', 'Your ad is now published', '2021-10-12 07:51:12', 0),
(62, 24, 62, 'person', 'Your ad is now published', '2021-10-12 14:34:38', 0),
(63, 12, 63, 'car', 'Your ad is now published', '2021-10-13 09:33:46', 0),
(64, 12, 64, 'yes', 'Your ad is now published', '2021-10-13 09:35:51', 0),
(65, 12, 65, 'turtle', 'Your ad is now published', '2021-10-13 12:21:58', 0),
(66, 12, 66, 'turtle', 'Your ad is now published', '2021-10-13 12:23:29', 0),
(67, 12, 67, 'turn', 'Your ad is now published', '2021-10-13 12:37:59', 0),
(68, 12, 68, 'turtle', 'Your ad is now published', '2021-10-13 12:42:26', 0),
(69, 59, 69, 'I’m just trying ', 'Your ad is now published', '2021-10-14 12:23:19', 0),
(70, 15, 70, 'I am not', 'Your ad is now published', '2021-10-15 10:50:58', 0),
(71, 72, 71, 'Maneer’s Product', 'Your ad is now published', '2021-11-30 07:57:43', 0),
(72, 73, 72, 'Waterfalls', 'Your ad is now published', '2021-11-30 08:15:55', 0),
(73, 56, 73, 'laptop', 'Your ad is now published', '2021-12-03 13:30:03', 0),
(74, 56, 74, 'wooden carrom board game chess,', 'Your ad is now published', '2021-12-03 13:39:30', 0),
(75, 26, 83, 'rate', 'Your ad is now published', '2021-12-27 12:41:43', 0),
(76, 26, 84, 'test', 'Your ad is now published', '2021-12-27 13:11:24', 0),
(77, 26, 85, 'hdhdhd', 'Your ad is now published', '2021-12-27 13:15:31', 0),
(78, 26, 86, 'hahaha', 'Your ad is now published', '2021-12-27 13:34:07', 0),
(79, 76, 87, 'New Folder test', 'Your ad is now published', '2022-01-10 14:15:41', 0),
(80, 75, 88, 'cvvhj', 'Your ad is now published', '2022-01-11 13:19:39', 0),
(81, 26, 91, 'Scenery', 'Your ad is now published', '2022-01-18 06:53:10', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payment`
--

CREATE TABLE `tbl_payment` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `transaction_id` varchar(256) NOT NULL,
  `payment_status` varchar(50) NOT NULL,
  `amount` int(11) NOT NULL,
  `createdDtm` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_payment`
--

INSERT INTO `tbl_payment` (`id`, `product_id`, `user_id`, `transaction_id`, `payment_status`, `amount`, `createdDtm`) VALUES
(1, 89, 26, 'Optional(<PPCOrderActionData: 0x600002c1db60>)', '1', 1200, '2022-01-19 05:49:37'),
(2, 88, 26, 'Optional(<PPCOrderActionData: 0x600000104db0>)', '1', 10, '2022-01-19 05:52:07'),
(3, 74, 26, 'Optional(<PPCOrderActionData: 0x600001e0ca50>)', '1', 50000, '2022-01-19 05:53:58'),
(4, 12, 26, 'Optional(<PPCOrderActionData: 0x600001fc1110>)', '1', 25800, '2022-01-19 05:55:08'),
(5, 73, 26, 'Optional(<PPCOrderActionData: 0x600001fc1ef0>)', '1', 580000, '2022-01-19 05:55:54');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_products`
--

CREATE TABLE `tbl_products` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `img` varchar(500) NOT NULL DEFAULT '0',
  `imgs` varchar(500) NOT NULL DEFAULT 'uploads/dummy.jpg',
  `product_desc` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `price` int(128) NOT NULL DEFAULT '0',
  `category_id` int(11) NOT NULL,
  `sub_category_id` int(11) NOT NULL DEFAULT '0',
  `product_condition` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `latitude` varchar(255) NOT NULL DEFAULT '0',
  `longitude` varchar(255) NOT NULL DEFAULT '0',
  `isDeleted` tinyint(4) NOT NULL DEFAULT '0',
  `isSold` tinyint(4) NOT NULL DEFAULT '0',
  `soldTo` int(2) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `img_path` varchar(128) NOT NULL DEFAULT '0',
  `createdDtm` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedDtm` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isFeatured` tinyint(4) NOT NULL DEFAULT '0',
  `featuredUpto` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_charity` tinyint(4) NOT NULL DEFAULT '0',
  `foundation_id` int(11) NOT NULL DEFAULT '0',
  `foundation_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `charity_amt` int(11) NOT NULL DEFAULT '0',
  `terms` tinyint(4) NOT NULL DEFAULT '0',
  `chat_id` varchar(200) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_products`
--

INSERT INTO `tbl_products` (`id`, `name`, `img`, `imgs`, `product_desc`, `price`, `category_id`, `sub_category_id`, `product_condition`, `latitude`, `longitude`, `isDeleted`, `isSold`, `soldTo`, `user_id`, `img_path`, `createdDtm`, `updatedDtm`, `isFeatured`, `featuredUpto`, `is_charity`, `foundation_id`, `foundation_name`, `charity_amt`, `terms`, `chat_id`) VALUES
(9, '제목', 'uploads/20210924T140004558ZIMG_20210916_153604.jpg', '[\"uploads/20210924T140004558ZIMG_20210916_153604.jpg\"]', '테스트 제품 설명\n', 100, 2, 2, 'O', '0.0', '0.0', 1, 1, 0, 13, '0', '2021-09-24 16:00:07', '2021-09-24 16:00:07', 0, '2022-01-07 13:22:24', 1, 2, '0', 20, 1, '0'),
(10, '경치', 'uploads/20210928T052736919Z1632806856.jpg', '[\"uploads/20210928T052736919Z1632806856.jpg\",\"uploads/20210928T052737845Z1632806856.jpg\",\"uploads/20210928T052737996Z1632806856.jpg\"]', '연극풍경의 역사는 극장 자체만큼이나 오래되었고, 둔탁하고 전통이 얽매여 있다. 우리가 \'전통적인 풍경\', 즉 3차원 표면이나 풍경을 닮도록 칠해진 2차원 캔버스로 덮인 \'평면\'이라고 생각하는 경향이 있는 것은 비교적 최근의 혁신이며 보다 고대의 연극 표현 형식에서 크게 벗어나는 것입니다.', 400, 1, 1, 'Best', '0.0', '0.0', 0, 0, 0, 26, '0', '2021-09-28 07:27:38', '2021-09-28 07:27:38', 0, '2022-01-20 07:46:05', 1, 2, '0', 40, 1, '0'),
(11, '노란색', 'uploads/20210929T062847085Z1632896924.jpg', '[\"uploads/20210929T062847085Z1632896924.jpg\",\"uploads/20210929T062851048Z1632896924.jpg\",\"uploads/20210929T062852489Z1632896924.jpg\",\"uploads/20210929T062854204Z1632896924.jpg\"]', '테스트 테스트 테스트 테스트', 100, 1, 1, 'Good', '0.0', '0.0', 0, 1, 0, 26, '0', '2021-09-29 08:28:54', '2021-09-29 08:28:54', 0, '2021-12-07 17:30:38', 1, 1, '0', 1233, 1, '0'),
(12, '자동차', 'uploads/20210929T091437792ZIMG_20210804_180014.jpg', '[\"uploads/20210929T091437792ZIMG_20210804_180014.jpg\",\"uploads/20210929T091439453ZIMG_20210916_153345.jpg\"]', '자동차는 운송에 사용되는 바퀴 달린 자동차입니다. 자동차에 대한 대부분의 정의는 1~8인승으로 주로 도로에서 운행한다고 말합니다.', 25800, 3, 2, 'G', '0.0', '0.0', 0, 1, 26, 27, '0', '2021-09-29 11:14:40', '2021-09-29 11:14:40', 0, '2022-01-19 05:55:08', 1, 2, '0', 15, 1, '0'),
(28, '트럭', 'uploads/20211001T112125350Z1633087284.jpg', '[\"uploads/20211001T112125350Z1633087284.jpg\",\"uploads/20211001T112126622Z1633087284.jpg\",\"uploads/20211001T112126769Z1633087284.jpg\"]', '테스트 테스트 테스트 테스트', 50000, 4, 8, 'Good', '35.9078', '127.7669', 0, 1, 0, 26, '0', '2021-10-01 13:21:26', '2021-10-01 13:21:26', 0, '2021-12-07 17:30:35', 1, 2, '0', 45, 1, '0'),
(30, '3 풍경', 'uploads/20211001T121117721Z1633090276.jpg', '[\"uploads/20211001T121117721Z1633090276.jpg\",\"uploads/20211001T121118534Z1633090276.jpg\",\"uploads/20211001T121118697Z1633090276.jpg\"]', '테스트 테스트 테스트 테스트', 50, 3, 6, 'Best', '35.9078', '127.7669', 0, 1, 0, 26, '0', '2021-10-01 14:11:19', '2021-10-01 14:11:19', 0, '2021-12-07 17:30:30', 0, 0, '0', 0, 1, '0'),
(31, '5 풍경', 'uploads/20211001T121203319Z1633090322.jpg', '[\"uploads/20211001T121203319Z1633090322.jpg\",\"uploads/20211001T121204259Z1633090322.jpg\",\"uploads/20211001T121204577Z1633090322.jpg\",\"uploads/20211001T121204745Z1633090322.jpg\",\"uploads/20211001T121204908Z1633090322.jpg\"]', '테스트 테스트 테스트 테스트', 500, 1, 2, 'Good', '35.9078', '127.7669', 0, 0, 0, 26, '0', '2021-10-01 14:12:05', '2021-10-01 14:12:05', 0, '2021-12-07 17:30:26', 0, 0, '0', 0, 1, '0'),
(34, '10월 4일 풍경', 'uploads/20211004T045646089Z1633323405.jpg', '[\"uploads/20211004T045646089Z1633323405.jpg\",\"uploads/20211004T045647176Z1633323405.jpg\",\"uploads/20211004T045647301Z1633323405.jpg\",\"uploads/20211004T045647364Z1633323405.jpg\",\"uploads/20211004T045647408Z1633323405.jpg\",\"uploads/20211004T045647458Z1633323405.jpg\"]', '테스트 테스트 테스트 테스트', 10000, 1, 2, 'Best', '35.9078', '127.7669', 0, 0, 0, 26, '0', '2021-10-04 06:56:47', '2021-10-04 06:56:47', 0, '2021-12-07 17:30:21', 0, 0, '0', 0, 1, '0'),
(36, '노트북 바탕화면', 'uploads/20211004T063905106Z1633329544.jpg', '[\"uploads/20211004T063905106Z1633329544.jpg\",\"uploads/20211004T063906193Z1633329544.jpg\",\"uploads/20211004T063906323Z1633329544.jpg\",\"uploads/20211004T063906344Z1633329544.jpg\"]', '최고의 노트북 바탕 화면', 15000, 1, 2, 'Best', '35.9078', '127.7669', 0, 0, 0, 26, '0', '2021-10-04 08:39:06', '2021-10-04 08:39:06', 0, '2021-12-07 17:28:09', 1, 4, 'Foundation4', 1500, 1, '0'),
(49, '자동차 배경 화면', 'uploads/products/20211006T104134782Z1633516894.jpg', '[\"uploads/products/20211006T104134782Z1633516894.jpg\",\"uploads/products/20211006T104138054Z1633516894.jpg\",\"uploads/products/20211006T104139441Z1633516894.jpg\",\"uploads/products/20211006T104143177Z1633516894.jpg\"]', '최고의 자동차 월페이퍼', 1000, 3, 5, 'Best', '127.15002866944', '37.4522438484415', 0, 0, 0, 26, '0', '2021-10-06 12:41:44', '2021-10-06 12:41:44', 0, '2021-12-07 17:27:24', 1, 0, '0', 0, 1, '0'),
(50, '손 장갑', 'uploads/products/20211006T124608870Z1633524368.jpg', '[\"uploads/products/20211006T124608870Z1633524368.jpg\",\"uploads/products/20211006T124609868Z1633524368.jpg\",\"uploads/products/20211006T124610039Z1633524368.jpg\",\"uploads/products/20211006T124610160Z1633524368.jpg\",\"uploads/products/20211006T124610208Z1633524368.jpg\",\"uploads/products/20211006T124610239Z1633524368.jpg\",\"uploads/products/20211006T124610323Z1633524368.jpg\",\"uploads/products/20211006T124610365Z1633524368.jpg\",\"uploads/products/20211006T124610432Z1633524368.jpg\"]', '손 장갑은 손을 안전하게 보호하고 박테리아, 세균, 흙 또는 엉망으로부터 보호하는 좋은 방법입니다', 48488454, 2, 4, 'Good', '35.9078', '127.7669', 0, 0, 0, 26, '0', '2021-10-06 14:46:10', '2021-10-06 14:46:10', 0, '2021-12-07 17:25:56', 1, 0, '0', 0, 1, '0'),
(68, 'turtle', 'uploads/products/20211013T104219273ZJPEG_20211013_161141_8924434624933398896.jpg', '[\"uploads/products/20211013T104219273ZJPEG_20211013_161141_8924434624933398896.jpg\",\"uploads/products/20211013T104221624ZJPEG_20211013_161151_532192244759025427.jpg\",\"uploads/products/20211013T104224298ZJPEG_20211013_161158_165849376170440482.jpg\"]', 'dhak karne ke baad hona tha ki baat karte ho', 255, 2, 2, 'O', '0.0', '0.0', 0, 1, 0, 12, '0', '2021-10-13 12:42:26', '2021-10-13 12:42:26', 0, '2021-10-13 10:42:31', 0, 0, '0', 0, 1, '0'),
(71, '빨간 꽃', 'uploads/products/20211130T065740631Z1638255459.jpg', '[\"uploads/products/20211130T065740631Z1638255459.jpg\",\"uploads/products/20211130T065743421Z1638255459.jpg\",\"uploads/products/20211130T065743455Z1638255459.jpg\"]', '장미는 장미과에 속하는 장미 속의 다년생 꽃 식물입니다.', 12, 1, 1, 'Good', '126.851629955742', '35.1601037626662', 0, 0, 0, 72, '0', '2021-11-30 07:57:43', '2021-11-30 07:57:43', 0, '2021-12-07 17:15:42', 1, 0, '0', 0, 1, '0'),
(72, '폭포', 'uploads/products/20211130T071551638Z1638256550.jpg', '[\"uploads/products/20211130T071551638Z1638256550.jpg\",\"uploads/products/20211130T071553597Z1638256550.jpg\",\"uploads/products/20211130T071554210Z1638256550.jpg\"]', '폭포는 물이 수직 방울 또는 일련의 가파른 방울 위로 흐르는 강이나 시내의 한 지점입니다', 30, 1, 1, 'Best', '126.851629955742', '35.1601037626662', 0, 0, 0, 73, '0', '2021-11-30 08:15:55', '2021-11-30 08:15:55', 0, '2021-12-07 17:14:34', 1, 0, '0', 0, 1, '0'),
(73, '노트북', 'uploads/products/20211203T123001272Z1638534600.jpg', '[\"uploads/products/20211203T123001272Z1638534600.jpg\",\"uploads/products/20211203T123001844Z1638534600.jpg\",\"uploads/products/20211203T123002251Z1638534600.jpg\"]', '휴대전화용 노트북 모바일 모바일 앱은 휴대전화에서 판매 준비가 되어 있으며 휴대전화가 출시될 예정입니다', 580000, 1, 2, 'Good', '126.851629955742', '35.1601037626662', 0, 1, 26, 56, '0', '2021-12-03 13:30:02', '2021-12-03 13:30:02', 0, '2022-01-19 05:55:54', 0, 0, '0', 0, 1, '0'),
(74, '나무 캐롬 보드', 'uploads/products/20211203T123929555Z1638535169.jpg', '[\"uploads/products/20211203T123929555Z1638535169.jpg\",\"uploads/products/20211203T123930163Z1638535169.jpg\",\"uploads/products/20211203T123930479Z1638535169.jpg\",\"uploads/products/20211203T123930481Z1638535169.jpg\"]', '모든 게임이 훌륭하고 재미있고 내 iPhone에 새로운 게임이 있고 내가 함께 플레이해야 하는 유일한 게임입니다.', 50000, 5, 10, 'Best', '126.851629955742', '35.1601037626662', 0, 1, 26, 56, '0', '2021-12-03 13:39:30', '2021-12-03 13:39:30', 0, '2022-01-19 05:53:58', 1, 0, '0', 0, 1, '0'),
(75, '햄버거 ', 'uploads/products/20211208T075243762Z1638949962.jpg', '[\"uploads/products/20211208T075243762Z1638949962.jpg\",\"uploads/products/20211208T075246020Z1638949963.jpg\",\"uploads/products/20211208T075246381Z1638949963.jpg\",\"uploads/products/20211208T075246597Z1638949963.jpg\"]', '설명란', 12000, 2, 3, 'Ok', '37.2891939602882', '126.864590815243', 0, 0, 0, 54, '0', '2021-12-08 08:52:46', '2021-12-08 08:52:46', 0, '2021-12-08 16:18:06', 1, 0, '0', 0, 1, '0'),
(76, '테스트 ', 'uploads/products/20211208T145900014Z1638975539.jpg', '[\"uploads/products/20211208T145900014Z1638975539.jpg\",\"uploads/products/20211208T145901797Z1638975539.jpg\",\"uploads/products/20211208T145902472Z1638975539.jpg\"]', '테스트', 15000, 1, 2, 'Ok', '37.2891939602882', '126.864590815243', 0, 1, 0, 74, '0', '2021-12-08 15:59:03', '2021-12-08 15:59:03', 0, '2021-12-08 15:00:37', 1, 0, '0', 0, 1, '0'),
(77, '핸드폰 팝니다', 'uploads/products/20211209T140347317Z1639058626.jpg', '[\"uploads/products/20211209T140347317Z1639058626.jpg\",\"uploads/products/20211209T140359258Z1639058626.jpg\",\"uploads/products/20211209T140401668Z1639058626.jpg\"]', '핸드폰 판매합니다', 1000000, 1, 1, 'Best', '35.855558130604', '128.622076163639', 0, 1, 0, 74, '0', '2021-12-09 15:04:10', '2021-12-09 15:04:10', 0, '2021-12-09 14:04:41', 1, 0, '0', 0, 1, '0'),
(78, '아이폰 13 pro 판매합니다 ', 'uploads/products/20211210T001609370Z1639095368.jpg', '[\"uploads/products/20211210T001609370Z1639095368.jpg\",\"uploads/products/20211210T001610103Z1639095368.jpg\",\"uploads/products/20211210T001610454Z1639095368.jpg\"]', '아이폰 13프로 판매합니다 아직 따끈따끈한 신상입니다 \n궁금하신 점 있으시면 톡 주세요', 1300000, 1, 1, 'Best', '35.855558130604', '128.622076163639', 0, 1, 0, 74, '0', '2021-12-10 01:16:10', '2021-12-10 01:16:10', 0, '2021-12-10 00:37:06', 1, 0, '0', 0, 1, '0'),
(79, '삼성 노트북 최신형 제품 판매합니다', 'uploads/products/20211210T001931470Z1639095570.jpg', '[\"uploads/products/20211210T001931470Z1639095570.jpg\",\"uploads/products/20211210T001932232Z1639095570.jpg\",\"uploads/products/20211210T001932308Z1639095570.jpg\"]', '삼성 노트북 판매합니다 일단은 최신형이니 가격 에고 가능합니다 \n연락주세요', 2500000, 1, 2, 'Best', '37.2749769872425', '127.00892996953', 0, 1, 0, 74, '0', '2021-12-10 01:19:32', '2021-12-10 01:19:32', 0, '2021-12-10 00:37:16', 0, 0, '0', 0, 1, '0'),
(80, '애플 노트북 판매합니다 ', 'uploads/products/20211210T002808537Z1639096087.jpg', '[\"uploads/products/20211210T002808537Z1639096087.jpg\",\"uploads/products/20211210T002808869Z1639096087.jpg\",\"uploads/products/20211210T002809211Z1639096087.jpg\",\"uploads/products/20211210T002809565Z1639096087.jpg\"]', '최신형 애플 노트북 판매합니다 가격은 네고 가능합니다\n관심있으시면 연락주세요 ', 2500000, 1, 2, 'Best', '35.855558130604', '128.622076163639', 0, 1, 0, 74, '0', '2021-12-10 01:28:09', '2021-12-10 01:28:09', 0, '2021-12-10 00:37:22', 0, 0, '0', 0, 1, '0'),
(81, '테스트', 'uploads/products/20211222T150705047Z1640185624.jpg', '[\"uploads/products/20211222T150705047Z1640185624.jpg\",\"uploads/products/20211222T150708973Z1640185624.jpg\",\"uploads/products/20211222T150709385Z1640185624.jpg\"]', '테스트입니다', 10000, 3, 5, 'Ok', '35.8713802646197', '128.601805491072', 0, 0, 0, 74, '0', '2021-12-22 16:07:10', '2021-12-22 16:07:10', 0, '2021-12-22 15:07:10', 1, 0, '0', 0, 1, '0'),
(82, '빌린 집', 'uploads/products/20211227T112826020Z1640604505.jpg', '[\"uploads/products/20211227T112826020Z1640604505.jpg\",\"uploads/products/20211227T112833484Z1640604505.jpg\",\"uploads/products/20211227T112834730Z1640604505.jpg\",\"uploads/products/20211227T112835952Z1640604505.jpg\"]', '집은 매우 아름답다', 120, 1, 2, 'Good', '35.1798200522868', '129.075087492149', 0, 0, 0, 26, '0', '2021-12-27 12:28:36', '2021-12-27 12:28:36', 0, '2021-12-27 11:28:36', 0, 0, '0', 0, 1, '0'),
(87, 'New Folder test', 'uploads/products/20220110T131540810Z1200px-FoS20162016_0624_132444AA_(27785299372).png', '[\"uploads/products/20220110T131540810Z1200px-FoS20162016_0624_132444AA_(27785299372).png\"]', 'this is product desc\"', 0, 2, 0, '0', '0', '0', 0, 0, 0, 17, '0', '2022-01-10 14:15:41', '2022-01-10 14:15:41', 0, '2022-01-10 13:15:41', 0, 0, '0', 0, 0, '0'),
(88, 'cvvhj', 'uploads/products/20220111T121938334Z1641903577.jpg', '[\"uploads/products/20220111T121938334Z1641903577.jpg\",\"uploads/products/20220111T121939386Z1641903577.jpg\",\"uploads/products/20220111T121939604Z1641903577.jpg\",\"uploads/products/20220111T121939763Z1641903578.jpg\"]', '설명란hhjj', 10, 1, 2, 'Best', '', '', 0, 1, 26, 75, '0', '2022-01-11 13:19:39', '2022-01-11 13:19:39', 0, '2022-01-19 05:52:07', 0, 0, '0', 0, 1, '0'),
(89, '방 청정기', 'uploads/products/20220117T141707010Z1642429026.jpg', '[\"uploads/products/20220117T141707010Z1642429026.jpg\",\"uploads/products/20220117T141707603Z1642429026.jpg\",\"uploads/products/20220117T141707910Z1642429026.jpg\"]', '방 청정기', 1200, 1, 1, 'Best', '36.4800649113762', '127.289195324698', 0, 1, 26, 78, '0', '2022-01-17 15:17:08', '2022-01-17 15:17:08', 0, '2022-01-19 05:49:37', 1, 0, '0', 0, 1, '0'),
(90, '이동하는', 'uploads/products/20220117T142826343Z1642429705.jpg', '[\"uploads/products/20220117T142826343Z1642429705.jpg\",\"uploads/products/20220117T142826610Z1642429705.jpg\",\"uploads/products/20220117T142826899Z1642429705.jpg\"]', '이동하는', 6000, 2, 3, 'Good', '37.4560044656444', '126.705258070068', 0, 0, 0, 26, '0', '2022-01-17 15:28:27', '2022-01-17 15:28:27', 0, '2022-01-17 14:28:27', 1, 0, '0', 0, 1, '0'),
(91, 'Scenery', 'uploads/products/20220118T055306202Z1642485184.jpg', '[\"uploads/products/20220118T055306202Z1642485184.jpg\",\"uploads/products/20220118T055309673Z1642485184.jpg\",\"uploads/products/20220118T055310084Z1642485184.jpg\"]', '설명란', 1200, 1, 1, 'Best', '35.8713802646197', '128.601805491072', 0, 0, 0, 26, '0', '2022-01-18 06:53:10', '2022-01-18 06:53:10', 0, '2022-01-18 05:53:10', 1, 2, '초록우산 어린이재단', 120, 1, '0');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product_reviews`
--

CREATE TABLE `tbl_product_reviews` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `review` varchar(500) NOT NULL,
  `rating` float NOT NULL,
  `createdDtm` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_report`
--

CREATE TABLE `tbl_report` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reported_user_id` int(11) NOT NULL,
  `type` varchar(128) NOT NULL,
  `comment` varchar(500) NOT NULL,
  `createdDtm` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_report`
--

INSERT INTO `tbl_report` (`id`, `user_id`, `reported_user_id`, `type`, `comment`, `createdDtm`) VALUES
(1, 26, 26, 'Other', 'User is insulting meUser is insulting meUser is insulting meUser is insulting meUser is insulting me', '2021-10-05 07:42:21'),
(2, 47, 24, 'Other', 'weqweqwe', '2021-10-13 08:26:24'),
(3, 47, 17, 'Other', 'sdertwerw', '2021-10-13 08:29:05'),
(4, 47, 17, 'Other', 'erwerwewr', '2021-10-13 08:29:15'),
(5, 47, 17, 'Other', 'yuj67u', '2021-10-13 08:29:59'),
(6, 5, 24, 'fraud', 'Not good ', '2021-10-14 11:34:00'),
(7, 58, 24, 'Other', 'ert', '2021-10-15 07:25:21'),
(11, 15, 15, 'Other', 'The first thing I did was', '2021-10-15 10:51:59'),
(15, 15, 24, 'Other', 'hdhdhsbdbdndbdb', '2021-10-15 10:57:13'),
(16, 15, 24, 'Other', 'hdhdhsbdbdndbdb', '2021-10-15 10:57:14'),
(20, 56, 73, 'other', 'Jhgjjg', '2021-12-03 13:06:27'),
(21, 12, 26, 'Other', 'This is for testing', '2022-01-24 11:51:53'),
(22, 12, 26, 'Other', 'This is testing', '2022-01-24 11:53:46'),
(23, 60, 26, 'fraud', 'Hello ', '2022-01-24 11:59:16');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_report_review`
--

CREATE TABLE `tbl_report_review` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `review_id` int(11) NOT NULL,
  `createdDtm` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_report_review`
--

INSERT INTO `tbl_report_review` (`id`, `user_id`, `review_id`, `createdDtm`) VALUES
(1, 1, 1, '2021-10-14 15:53:46'),
(2, 26, 25, '2021-10-14 12:55:07'),
(3, 26, 25, '2021-10-14 12:55:19'),
(4, 59, 25, '2021-10-14 13:02:48'),
(5, 59, 25, '2021-10-14 13:10:47'),
(6, 59, 25, '2021-10-14 13:10:57'),
(7, 59, 25, '2021-10-14 13:11:02'),
(8, 59, 25, '2021-10-14 13:12:00'),
(9, 59, 25, '2021-10-14 13:12:09'),
(10, 59, 25, '2021-10-14 13:12:16'),
(11, 15, 15, '2021-10-15 11:57:19'),
(12, 1, 1, '2021-10-19 06:56:09'),
(13, 15, 47, '2021-10-19 11:52:59'),
(14, 1, 1, '2021-10-19 12:42:20'),
(15, 1, 1, '2021-10-19 12:42:26'),
(16, 1, 1, '2021-10-19 12:55:42'),
(17, 1, 1, '2021-10-19 13:00:50'),
(18, 1, 1, '2021-10-19 13:03:06'),
(19, 1, 1, '2021-10-19 13:07:08'),
(20, 67, 10, '2021-10-19 13:16:33'),
(21, 15, 46, '2021-10-19 13:32:57'),
(22, 15, 61, '2021-10-19 13:33:01'),
(23, 15, 58, '2021-10-19 14:19:05'),
(24, 15, 58, '2021-10-19 14:19:29'),
(25, 56, 0, '2021-12-03 13:11:38'),
(26, 26, 2, '2022-01-03 10:35:36'),
(27, 78, 9, '2022-01-24 15:19:12'),
(28, 78, 9, '2022-01-24 15:19:41'),
(29, 78, 9, '2022-01-24 15:20:14'),
(30, 12, 5, '2022-01-24 15:45:54'),
(31, 12, 5, '2022-01-24 15:46:42'),
(32, 12, 5, '2022-01-24 15:46:55'),
(33, 12, 5, '2022-01-24 15:48:22'),
(34, 12, 5, '2022-01-24 15:48:33'),
(35, 12, 5, '2022-01-24 15:48:57');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_search`
--

CREATE TABLE `tbl_search` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `search_keyword` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdDtm` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_search`
--

INSERT INTO `tbl_search` (`id`, `user_id`, `search_keyword`, `createdDtm`) VALUES
(1, 1, 'gfg', '2021-12-07 17:49:11'),
(2, 26, 'test', '2021-12-08 13:51:10'),
(3, 75, 'test', '2022-01-06 07:34:54'),
(4, 76, '부산광역시', '2022-01-11 07:21:47'),
(5, 75, 'mmjjjj', '2022-01-11 07:27:42'),
(6, 76, 'fhhf', '2022-01-11 07:39:28'),
(7, 76, 'fgtg', '2022-01-11 07:39:51'),
(8, 75, 'ghjjkkkk', '2022-01-11 07:41:17'),
(9, 75, 'Uddhav', '2022-01-11 08:29:45'),
(10, 76, 'nssn', '2022-01-11 08:30:05'),
(11, 75, 'ddjfjfje', '2022-01-11 08:31:04'),
(12, 75, 'Fhfjf', '2022-01-11 08:32:36'),
(13, 77, 'zndnd', '2022-01-12 11:16:53'),
(14, 78, 'Dheeraj', '2022-01-18 12:18:22'),
(15, 78, 'cndns', '2022-01-18 12:18:28'),
(16, 78, 'shah', '2022-01-18 12:19:04'),
(17, 78, 'Ghosh’s he', '2022-01-18 12:19:36'),
(18, 78, 'chad', '2022-01-18 12:19:59'),
(19, 78, 'gallery', '2022-01-18 12:20:16'),
(20, 78, 'Scenery', '2022-01-18 12:20:36'),
(21, 78, 'Scenery', '2022-01-18 12:20:45'),
(22, 78, 'Scenery', '2022-01-18 12:21:01'),
(23, 78, 'scenery ', '2022-01-18 12:22:24'),
(24, 78, 'scenery', '2022-01-18 12:22:31'),
(25, 78, 'Scenery', '2022-01-18 12:22:45'),
(26, 12, 'scenery', '2022-01-18 13:30:56'),
(27, 12, 'scenery', '2022-01-18 13:31:35'),
(28, 12, 'Scenery', '2022-01-18 13:31:41'),
(29, 12, 'scenery', '2022-01-18 13:31:54'),
(30, 78, 'rhdhhfde', '2022-01-18 13:43:09'),
(31, 78, 'seventy', '2022-01-18 13:43:18'),
(32, 78, 'Scenery', '2022-01-18 13:43:28'),
(33, 12, 'Scenery', '2022-01-18 13:58:50');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sub_category`
--

CREATE TABLE `tbl_sub_category` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `isDeleted` int(2) NOT NULL DEFAULT '0',
  `createdDtm` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_sub_category`
--

INSERT INTO `tbl_sub_category` (`id`, `category_id`, `name`, `isDeleted`, `createdDtm`) VALUES
(1, 1, '휴대전화', 0, '2021-09-20 05:38:39'),
(2, 1, '노트북', 0, '2021-09-20 05:38:39'),
(3, 2, '스포츠 장비', 0, '2021-09-20 05:41:34'),
(4, 2, '영양 및 보충제', 0, '2021-09-20 05:41:34'),
(5, 3, 'used Car parts', 0, '2021-09-20 05:42:40'),
(6, 3, 'car accessories', 0, '2021-09-20 05:42:40'),
(7, 4, 'heavy vehicles parts', 0, '2021-09-20 05:43:43'),
(8, 4, 'heavy vehicles ', 0, '2021-09-20 05:43:43'),
(9, 5, 'Video Games', 0, '2021-09-20 05:44:18'),
(10, 5, 'Indoor Games', 0, '2021-09-20 05:44:18'),
(11, 1, 'test2', 0, '2022-01-07 07:02:20');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `mobile` varchar(20) DEFAULT '0',
  `isDeleted` tinyint(4) DEFAULT '0',
  `createdDtm` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedDtm` datetime DEFAULT CURRENT_TIMESTAMP,
  `deviceId` varchar(255) NOT NULL DEFAULT '0',
  `platform` varchar(255) NOT NULL DEFAULT '0',
  `userImg` varchar(800) DEFAULT 'uploads/user.jpg',
  `deviceType` varchar(255) DEFAULT '0',
  `gmail` varchar(255) DEFAULT '0',
  `facebook` varchar(255) DEFAULT '0',
  `kakao` varchar(200) NOT NULL DEFAULT '0',
  `latitude` varchar(255) NOT NULL DEFAULT '0',
  `longitude` varchar(255) NOT NULL DEFAULT '0',
  `token` varchar(500) NOT NULL DEFAULT '0',
  `isActive` tinyint(4) NOT NULL,
  `chat_id` varchar(200) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `email`, `password`, `name`, `mobile`, `isDeleted`, `createdDtm`, `updatedDtm`, `deviceId`, `platform`, `userImg`, `deviceType`, `gmail`, `facebook`, `kakao`, `latitude`, `longitude`, `token`, `isActive`, `chat_id`) VALUES
(1, 'saini@yopmail.com', '$2b$10$bcn755F3.hzAVbvw4vA8KuJz5gxgqYyCYHQry2bbrKZkJqsm.RivO', 'Saini', '0', 0, '2021-09-07 13:36:27', '2021-09-07 13:36:27', '0', '0', 'uploads/user.jpg', '0', '0', '0', '0', '0', '0', '0', 0, '0'),
(2, 'abc@yopmail.com', '$2b$10$jvqMKzRmst/HmbdcFm3HnuIsx2lPEKWok1I8U5CIvmr/H8dry2i/m', 'Test', '749839656', 0, '2021-09-08 07:03:03', '2021-09-08 07:03:03', '98643287568374660000', 'Manual', '', 'IOS', '', '', '0', '0', '0', 'fkhsdkjfhkljdsgfjdsgfjsdgfhjgdskf', 1, '0'),
(3, 'snow@yopmail.com', '$2b$10$Z1h87E/orhz0SwnVCsMh6uej2YjwXjh2AE2xUvY5R7Hy84OeTqN2u', 'Jon Snow', '1234567890', 0, '2021-09-08 08:15:01', '2021-09-08 08:15:01', '8313D250-E84A-41E0-A5EF-81F0382B2F69', 'Manual', '', 'IOS', '', '', '0', '0', '0', '', 1, '0'),
(4, 'professional2403@gmail.com', '$2b$10$Mn0QulYZHtVxI31YXJMSvOiH9dicjJeUZ89GugtkgozUBAnBHC4ne', 'Lalit Kumar', '', 0, '2021-09-08 13:18:32', '2021-09-08 13:18:32', '81945E50-5289-4B8F-9AA9-93F6C9AC328D', 'Gmail', 'https://lh3.googleusercontent.com/a/AATXAJwIwi5xh6jkniaXE1ylDNvPoMvIlEEC2Iv9W7d-=s450', 'IOS', '113945512108870419376', '', '', '', '', '', 1, '4'),
(5, 'contact.appdeft@gmail.com', '$2b$10$.vgDYxisstGAby6eeIvaYOEKAkx2jD6JCxWtdwpi.csoY4robjhIm', 'App Deft', '', 0, '2021-09-08 13:27:54', '2021-09-08 13:27:54', '0C66440C-DF17-4967-B7BF-A3B2DB0458F6', 'Gmail', 'https://lh3.googleusercontent.com/a/AATXAJyoF4OgolJuswAo9p0hDvg4aTfb7R1IiT6251f-=s300', 'IOS', '117085631568717076324', '', '0', '', '', '', 1, '0'),
(6, '', '$2b$10$E5gbCUXrmy0JozIwi67/iefrgWR4t9l8Wbh8Nki4.oESsAqrC5SUq', '', '', 0, '2021-09-09 08:14:31', '2021-09-09 08:14:31', '9E1EABAE-873A-459D-A193-097F2490FC96', 'Gmail', '', 'IOS', '', '', '', '', '', 'enHZ9littUlhh1ZzbtEmaa:APA91bGkQFn4F2nxX2Y8Bac2m-OeETJYTWs-HUKvYFLNfXLrVaL6irp7i7EDQh0ep_QBYGZ2zS8SSZhguKNvvITMqc8zDNRT7_ocOK-dUaH_D5CncNXP_xe0P-zt1vqk3SijdQLu8w6h', 1, '6'),
(7, 'abhiabhishek0311@gmail.com', '$2b$10$PiateSqx1KhFmy3MMXiMj.6LYTNqYbcsYzusdKrwAyyRJLBoqf8uO', 'Abhishek kumar', '', 0, '2021-09-10 12:05:37', '2021-09-10 12:05:37', 'D3A2BCDE-7250-4136-9322-A2B37D0286F5', 'Gmail', '', 'IOS', '100490737168765619747', '', '0', '', '', '', 1, '0'),
(8, 'simran@yopmail.com', '$2b$10$ZBO7ltX0vxmcA.15SY4oDO.RztyN9NTVM267FKkStkQ5vwng4zMbW', 'Simran', '0', 0, '2021-09-13 07:40:24', '2021-09-13 07:40:24', '0', '0', 'uploads/user.jpg', '0', '0', '0', '0', '0', '0', '0', 0, '0'),
(9, 'abc@yopymail.com', '$2b$10$WzZlTqn/ipsYBv4C7vWBNuWjTZEFkvEvalWLVSTcoKU8uPWJsdqsS', 'Test', '749839656', 0, '2021-09-13 09:55:42', '2021-09-13 09:55:42', '98643287568374660000', 'Manual', '', 'IOS', '', '', '0', '0', '0', 'fkhsdkjfhkljdsgfjdsgfjsdgfhjgdskf', 1, '0'),
(10, 'demo@yopmail.com', '$2b$10$M.kulXFdgmTJ3Xg68cR1eeSTR4r9NJ8d8Y0w/wePWe.aM7v4EkBrW', 'demo', '1234567890', 0, '2021-09-13 13:33:25', '2021-09-13 13:33:25', '2671190b-9b3d-4d03-9c12-4962729b9669', 'Manual', '', 'Android', '', '', '0', '0.0', '0.0', '', 1, '0'),
(11, 'er.rakesh0016@gmail.com', '$2b$10$U7tGbGQXYfowc3Ix/nF39.XzDJYNSxx.tQqjQgbBYSkfxUZSIeXaK', 'Rakesh Kumar', '', 0, '2021-09-13 14:33:23', '2021-09-13 14:33:23', '96ABBC74-9B2C-42FA-BF30-1317970A7D99', 'Gmail', '', 'IOS', '112803875383857396437', '', '0', '', '', '', 1, '0'),
(12, 'ramesh.gautam37@gmail.com', '$2b$10$XvU6o8kQ3Ovt6fgMl7PjtO4UWFxnjNdFOzZN/W/b2w.YwgBFTH8Uq', 'Rehaan gautam', '', 0, '2021-09-14 06:50:44', '2021-09-14 06:50:44', 'cb89930a-2a82-4272-942d-61d435113ba1', 'Gmail', 'https://lh3.googleusercontent.com/a-/AOh14Gi6_BDn5HjwWl0zJvo3rYX-G32hu_eX5l3E8sQf=s96-c', '', '114707083614371946692', '', '', '', '', '', 1, '12'),
(14, 'abc@ymail.com', '$2b$10$EDGzhsyBGWSiu6RaS205oOPFvvIoVxBeHL2U3rCINDeBFhOtIJrfK', 'Test', '749839656', 0, '2021-09-14 07:32:50', '2021-09-14 07:32:50', '98643287568374660000', 'Manual', '', 'IOS', '', '', '0', '0', '0', 'fkhsdkjfhkljdsgfjdsgfjsdgfhjgdskf', 1, '0'),
(15, 'agnihotriv98@gmail.com', '$2b$10$cepwFCd4XmUvDHJvhCcQMOK9HDbxaO5M2tXXn52TvKcSzFwux/QPK', 'Vijay Agnihotri', '', 0, '2021-09-15 06:55:33', '2021-09-15 06:55:33', 'aca3af29-8843-4cad-9290-d7d53f87504f', 'Gmail', 'uploads/userprofile/20211021T050326489ZImage_746.jpg', '', '112514962989490390448', '', '1951031952', '', '', '', 1, '0'),
(16, 'vijay@gmail.com', '$2b$10$BsIwlGaMoPckLmDZwhoQbuEsugBtrMRthxn8Y59XmvHXYSY4aNQK2', 'vijay', '+919464334480', 0, '2021-09-15 07:15:51', '2021-09-15 07:15:51', 'aa19a18d-abdd-4efc-a174-af12dbf96b8f', 'Manual', '', 'Android', '', '', '0', '0.0', '0.0', '', 1, '0'),
(17, 'newUser1@gmail.com', '$2b$10$7q6z3oDOD6AyCJAQdU0R2eintEP23U53g1hqNjI0TryZRFLPXiDba', 'Manveer1', '0', 0, '2021-09-15 07:46:02', '2021-09-15 07:46:02', '0', '0', 'uploads/user.jpg', '0', '0', '0', '0', '0', '0', '0', 0, '0'),
(18, 'newUser3@gmail.com', '$2b$10$uWqUoTLJFIs5m9XlvVWIF.PenpejGMSzHNBzEA05wIbNBezHrKgiy', 'newUser', '0', 0, '2021-09-15 07:46:53', '2021-09-15 07:46:53', '0', '0', 'uploads/user.jpg', '0', '0', '0', '0', '0', '0', '0', 1, '0'),
(19, 'hh@gmail.com', '$2b$10$vGYMX2pVbwlHkR1WUKbEce0Y5.YvkFXRurOH4mxRF8bl1JKVAEuBe', 'h', '+914234567812', 0, '2021-09-15 07:51:06', '2021-09-15 07:51:06', 'b0a77968-1d40-41a0-bd5e-4836cf88b3b5', 'Manual', '', 'Android', '', '', '0', '0.0', '0.0', '', 1, '0'),
(20, 'v@gmail.com', '$2b$10$doqneybR5uPH1RCB4K1zQeoimMX0Qp8p5XF941vJM1FP1Pvlp1ozK', 'v', '+911234567896', 0, '2021-09-15 07:53:00', '2021-09-15 07:53:00', 'c989ba53-684b-458f-b877-e5d4d4c2474c', 'Manual', '', 'Android', '', '', '0', '0.0', '0.0', '', 0, '0'),
(21, 'vv@gmail.com', '$2b$10$hYIWDvdBfhf/GSp536ObWew7p7vPXkqVbjl7WCP4lvpDJlPVZ1dQG', 'vv', '+911425363655', 0, '2021-09-15 07:55:17', '2021-09-15 07:55:17', 'eeffb006-2bf5-4af7-959a-306328fd91a8', 'Manual', '', 'Android', '', '', '0', '0.0', '0.0', '', 0, '0'),
(23, 'vidhiyanks@gmail.com', '$2b$10$m7G7uT792QHxw7/UTu3Hq.Zkp3195r6yuera36i8z.7oKsBFcbcmm', 'Vidhiyank Singh', '', 0, '2021-09-15 12:17:11', '2021-09-15 12:17:11', '87cb87bc-34a1-49fb-9fb1-0e636921b6ec', 'Gmail', 'https://lh3.googleusercontent.com/a/AATXAJziVUwFsNghWryNw3DNRm_ruggErw2gdkwpdRT9=s96-c', '', '118427214294088783007', '', '0', '', '', '', 1, '0'),
(24, 'seerajsharma3181@gmail.com', '$2b$10$TR8kpQBA5DpEyvLCDi89ZuDgAZDOJxWW.hi1SfEgxx2Uua6jIvaKG', 'seeraj sharma', '', 0, '2021-09-15 12:19:08', '2021-09-15 12:19:08', '56c8ba34-c798-478e-9bdc-7b69cbf9be93', 'Gmail', 'https://lh3.googleusercontent.com/a/AATXAJySNk6sZtKUxukKzoMIdgS17LfcImo5-Ee7ua6T=s96-c', '', '108423130579171572240', '', '0', '', '', '', 1, '0'),
(25, 'vijays@yopmail.com', '$2b$10$brbN8NxOKxytxB/GkbheUeuszP59ErE2rqglmeM2kabd.0TAw1Qcm', 'vijay', '+919464334480', 0, '2021-09-15 15:30:00', '2021-09-15 15:30:00', '87f1ebc6-47f6-4385-af02-c2960a22dc02', 'Manual', '', 'Android', '', '', '0', '0.0', '0.0', '', 0, '0'),
(26, 'apptestingios2@gmail.com', '$2b$10$F9AxWTyfTSxm08Bne094k.e0/JSI0PN9pQtxovS5hOBgpP6Ac6OZG', 'ios testing', '', 0, '2021-09-28 06:51:48', '2021-09-28 06:51:48', '9E1EABAE-873A-459D-A193-097F2490FC96', 'Gmail', 'https://lh3.googleusercontent.com/a-/AOh14Gg9CjLbaV1_LdoI5y7geHae3ts0XhbFk1Wl2NgJ=s300', 'IOS', '105901584862829515054', '', '', '', '', 'enHZ9littUlhh1ZzbtEmaa:APA91bGkQFn4F2nxX2Y8Bac2m-OeETJYTWs-HUKvYFLNfXLrVaL6irp7i7EDQh0ep_QBYGZ2zS8SSZhguKNvvITMqc8zDNRT7_ocOK-dUaH_D5CncNXP_xe0P-zt1vqk3SijdQLu8w6h', 1, '26'),
(27, 'hhh@gmail.com', '$2b$10$xKZdl9LiL87r0e0XKSJkJefABX2qRLg2mw3sxr3s0hH/yQw0zt4xS', 'h', '+911234567895', 0, '2021-09-29 09:16:18', '2021-09-29 09:16:18', 'f70f63dd-4b6b-4caa-9d5f-05932378bed8', 'Manual', '', 'Android', '', '', '0', '0.0', '0.0', '', 0, '0'),
(28, 'riya@yopmail.com', '$2b$10$OPNpbp5Qd9CRa1m0m5/wAOjodeZ/oMLsNFv1v06ux4u8LLKoBDCKu', 'riya', '9464334480', 0, '2021-09-30 12:38:54', '2021-09-30 12:38:54', '96ABBC74-9B2C-42FA-BF30-1317970A7D99', 'Manual', '', 'IOS', '', '', '0', '0', '0', '', 1, '0'),
(29, 'harkaur@gmail.com', '$2b$10$OKi2C0JcmXaRplrx80vXreVnOGsmyMnebTfZzw00vx/LEiD4rWz8G', 'jhh', '+911234566888', 0, '2021-09-30 15:27:24', '2021-09-30 15:27:24', '35c9adca-d398-4a5b-8204-7359dd909c21', 'Manual', '', 'Android', '', '', '0', '0.0', '0.0', '', 0, '0'),
(30, 'r@gmail.com', '$2b$10$1oG8uSlYlSZ8bysAXiDKIu71CHjbgBiy2Ar2S0dmoSzSE.Ykoa/EO', 'r', '1472583690', 0, '2021-09-30 15:56:34', '2021-09-30 15:56:34', '96ABBC74-9B2C-42FA-BF30-1317970A7D99', 'Manual', '', 'IOS', '', '', '0', '0', '0', '', 1, '0'),
(31, 'v@yopmail.com', '$2b$10$H2wBVXCPzdvW.a8rpgT2ne7To7xjQSkjZZGTLSvK417GIGtmw8jgy', 'v', '3698565322', 0, '2021-09-30 15:57:53', '2021-09-30 15:57:53', '96ABBC74-9B2C-42FA-BF30-1317970A7D99', 'Manual', '', 'IOS', '', '', '0', '0', '0', '', 1, '0'),
(32, 'manveer.vinnisoft@gmail.com', '$2b$10$b4Ki.gjO02/jBYW2Jw5dR.QPbz./xFIGmTpB0aF0R2neXrEKNxSoe', 'Manveer Singh', '', 0, '2021-10-01 10:27:49', '2021-10-01 10:27:49', 'db471fb2-2c14-467b-b6dd-17c309ef4bd1', 'Gmail', 'uploads/userprofile/20211112T130607643ZImage_480.jpg', '', '111191410793510621959', '', '0', '', '', '', 1, '0'),
(33, 'vb@yopmail.com', '$2b$10$4oS1N.oWt1aOQNGxhVHJj.pyUH4AFjm4riFqKWDxUAb17xNf/JUKK', 'vv ', 'IN +912583692580', 0, '2021-10-01 13:47:16', '2021-10-01 13:47:16', '96ABBC74-9B2C-42FA-BF30-1317970A7D99', 'Manual', '', 'IOS', '', '', '0', '0', '0', '', 1, '0'),
(34, 'elgitano@naver.com', '$2b$10$WIe6NQs7RzN3IKPNbl0.XOq/c0sjl1xoLbnrbLjLPckS4SFiDnA7.', 'kyung', '+911055976140', 0, '2021-10-04 06:56:10', '2021-10-04 06:56:10', '3c9a8cc6-6b35-4f8e-8da3-92ae84bf7556', 'Manual', '', 'Android', '', '', '0', '0.0', '0.0', '', 0, '0'),
(35, 'va@yopmail.com', '$2b$10$rDRPnaVgR0dluhAqm8.SzOUYIfW6WbuehhmBLNkIlBn.7500.Z0R2', 'heloo', '+919464334480', 0, '2021-10-04 08:20:31', '2021-10-04 08:20:31', '127a7374-bf30-4da4-8426-dee379bf3ba9', 'Manual', '', 'Android', '', '', '0', '0.0', '0.0', '', 0, '0'),
(36, 'newUser10@gmail.com', '$2b$10$qvqT5XQy4S1iDMhv8Sx9rub5LfcjaxOID3Y1XZTPh8EHUP7PqfR.y', 'newUser', '0', 0, '2021-10-04 08:45:59', '2021-10-04 08:45:59', '0', '0', 'uploads/userprofile/20211015T113606182ZSevenInHeavenMenuQR.jpg', '0', '0', '0', '0', '0', '0', '0', 1, '0'),
(37, 'newUr1@gmail.com', '$2b$10$q3dx0GZvo7fIccOaKb0RX.QUgOAW55lOPyBN2nPu3vhzGMhPVX39e', 'newUser', '0', 0, '2021-10-04 08:46:21', '2021-10-04 08:46:21', '0', '0', 'uploads/user.jpg', '0', '0', '0', '0', '0', '0', '0', 0, '0'),
(38, 'vg@jsbsbbd', '$2b$10$nPG0AIftvMQanJge.KscK.PHb5IPuDNxSn36rk9mR12fyASkw4Rwi', 'ndbrbrb', '+919595959541', 0, '2021-10-04 09:04:13', '2021-10-04 09:04:13', '0e94e94a-78c6-4dff-b2eb-f5b09cd8245f', 'Manual', '', 'Android', '', '', '0', '0.0', '0.0', '', 0, '0'),
(39, 'yct@ygyyff5f5', '$2b$10$/F7MxA64knwLgJp5c/E5o./ES8GyrV5GnUMTGzm.1nNcKL6jtBbz2', 'ff', '+915252525282', 0, '2021-10-04 09:21:53', '2021-10-04 09:21:53', '21d18852-7a3f-454d-89e6-cf0abd92a617', 'Manual', '', 'Android', '', '', '0', '0.0', '0.0', '', 0, '0'),
(40, 'bbb@bbbbbbb', '$2b$10$huVTYLmLqX6fBg3.Ow6HvuzuxMFO4/pgrq6UeOkXJy5IsVDTU/qvK', 'hb', '+912583868888', 0, '2021-10-04 09:22:36', '2021-10-04 09:22:36', 'bf536044-490f-44ef-8369-2e5b0ee9a80f', 'Manual', '', 'Android', '', '', '0', '0.0', '0.0', '', 0, '0'),
(41, 'mail.com', '$2b$10$xj3NQRL8DULk1s93mYlrv.hMfr1Ny6QA634.KTvH24XdMRCHsuiVu', 'h', '+911245797667', 0, '2021-10-04 09:28:32', '2021-10-04 09:28:32', '1b87c452-adba-403c-8573-fcbad11aa589', 'Manual', '', 'Android', '', '', '0', '0.0', '0.0', '', 0, '0'),
(42, 'ha@gmail.com', '$2b$10$XUhLhSM.SrX/ucDZ4Q.gkOTiP3AxfVNyDa8GlTMbElbWHHcFe7Sgu', 'h', '+913464997948', 0, '2021-10-04 09:37:26', '2021-10-04 09:37:26', 'cf2bc509-3ab4-4e20-b5e9-00b23ae76a67', 'Manual', '', 'Android', '', '', '0', '0.0', '0.0', '', 0, '0'),
(43, 'yu@yopmail.com', '$2b$10$XHlI/qDT/umxFxZ.h5JzauZo14d8P3L18HKlqwFn7IgJbxRDHS.bW', 'gutitit', '+919464334480', 0, '2021-10-04 12:28:18', '2021-10-04 12:28:18', 'bdf09b01-790a-40a9-9262-5248aa88b700', 'Manual', '', 'Android', '', '', '0', '0.0', '0.0', '', 0, '0'),
(46, 'lalitk24392@gmail.com', '$2b$10$T9PBR92KSi/tMrPikH9TlOo8kXmM.BEFK9Wuau1IfkcD77DwLcijK', 'lalit kumar', '', 0, '2021-10-05 09:51:44', '2021-10-05 09:51:44', '81945E50-5289-4B8F-9AA9-93F6C9AC328D', 'Gmail', 'https://lh3.googleusercontent.com/a-/AOh14GhhxGdSzrcR3NCv60EZKOA3DynYs_-JaZqhelJH-Q=s450', 'IOS', '100304434641950858908', '', '0', '', '', '', 1, '0'),
(47, 'h2@gmail.com', '$2b$10$Oy.7BMvUYEOH4iLMXATKB.heinNn4HGtC4.Z0.iM4Hhxn7zVIKp9.', 'h', '0', 0, '2021-10-07 08:10:33', '2021-10-07 08:10:33', '0', '0', 'uploads/user.jpg', '0', '0', '0', '0', '0', '0', '0', 1, '0'),
(49, 'riii@yopmail.com', '$2b$10$XB/VDrJ7190Mk.foKpDkceJ3T9m2fhJLjIG/XnGCya.TC0E.HQxsu', 'gbb', '+919464334480', 0, '2021-10-07 15:07:05', '2021-10-07 15:07:05', '1ef38694-7685-4a92-a39c-8d9eec7da5f1', '', '', '', '', '', '0', '', '', '', 0, '0'),
(52, 'rm@gmail.com', '$2b$10$WUH/CkU8MUGO/gegQRbHiOQkymXVCfbk8RcMqzJ6FXLziJw.C9T5O', 'newUser', '0', 0, '2021-10-07 16:00:57', '2021-10-07 16:00:57', '0', '0', 'uploads/user.jpg', '0', '0', '0', '0', '0', '0', '0', 1, '0'),
(53, 'kylegomez.35423@gmail.com', '$2b$10$EHoMPLQohOTpQ7Aj/hqPheV7zmFQ7sb9tvGCCkbQdiudR/9tZSBZa', 'Kyle Gomez', '', 0, '2021-10-08 17:44:15', '2021-10-08 17:44:15', '87f89598-9107-48b8-988f-9e15eadf9c0a', 'Gmail', 'https://lh3.googleusercontent.com/a/AATXAJzT9uOsjA6POFtG8Vp1PgRdJNLW9of6lUcENDB6=s96-c', '', '114380453793356592447', '', '0', '', '', '', 1, '0'),
(54, 'richmanforever01@gmail.com', '$2b$10$1ngi.eiIxwFebZC2T8AaveAxtSE2PPV4meIvfcZpPUmwmTIYYS/Wm', 'OZ Yoo', '', 0, '2021-10-11 08:39:53', '2021-10-11 08:39:53', 'B2A2448D-7652-4D61-9B7F-47469A2D924C', 'Gmail', 'https://lh3.googleusercontent.com/a-/AOh14GgObq_aGlR1lo7HSHsMz5nufcnACG6Rs5u61He5Jg=s450', 'IOS', '107786805792805281747', '', '', '', '', '', 1, '54'),
(55, 'crystalhoward.39077@gmail.com', '$2b$10$HRc4UDeJ1UZnxGFw2MhxC.sJLzMXHdJculzb3PpAIk7tHJHIQw1Ze', 'Crystal Howard', '', 0, '2021-10-11 08:54:42', '2021-10-11 08:54:42', '2b7954da-ba63-4db9-aa90-807728a01120', 'Gmail', 'https://lh3.googleusercontent.com/a/AATXAJweipf_PrKJxobSWXE336FcPTDRL-XTldXnM4gI=s96-c', '', '118337554864425164017', '', '0', '', '', '', 1, '0'),
(56, 'ios@yopmail.com', '$2b$10$3K0nUu97ATpRaBZfAA7jnOI6/nhK.7cQhk0OPOQSCo6sZlvwIhNw.', 'Riya sharma', '+919418547157', 0, '2021-10-11 11:27:17', '2021-10-11 11:27:17', '3D8BEB63-6777-4EBF-8B01-83AF251C869A', 'Manual', 'uploads/userprofile/20211203T114317247Z1638531796.jpg', 'IOS', '', '', '0', '0', '0', '', 1, '56'),
(59, 'shivu@yopmail.com', '$2b$10$jRMErp2PyxgxmLOBf3jjyuepo5/zJW5x1e/nJT/ZK/0wk..eNSDEy', 'shivu', '+919780066133', 0, '2021-10-14 11:59:42', '2021-10-14 11:59:42', '0C66440C-DF17-4967-B7BF-A3B2DB0458F6', 'Manual', 'uploads/userprofile/20211015T091212200Z1634289131.jpg', 'IOS', '', '', '0', '0', '0', '', 1, '0'),
(60, 'contact.appdeft@gmail.com', '$2b$10$At7ZOwcTRD1gjNaHcyBmMOqtc4aMDCAD2RZ2Yb28YL28M0sCGY8Cy', 'App Deft', '', 0, '2021-10-14 12:16:18', '2021-10-14 12:16:18', '9E1EABAE-873A-459D-A193-097F2490FC96', 'Facebook', '', 'IOS', '', '343059564168406', '', '', '', 'enHZ9littUlhh1ZzbtEmaa:APA91bGkQFn4F2nxX2Y8Bac2m-OeETJYTWs-HUKvYFLNfXLrVaL6irp7i7EDQh0ep_QBYGZ2zS8SSZhguKNvvITMqc8zDNRT7_ocOK-dUaH_D5CncNXP_xe0P-zt1vqk3SijdQLu8w6h', 1, '60'),
(61, '000gaurav0@gmail.com', '$2b$10$CS.ZUUlf3ENxpCk1Fx4WbOU2UX20f/2u0MYcg8Omh5Ng/U7bPuQoq', 'Goru', '', 0, '2021-10-15 10:02:50', '2021-10-15 10:02:50', '0C66440C-DF17-4967-B7BF-A3B2DB0458F6', 'Kakao', 'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg', 'IOS', '', '', '1950811598', '', '', '', 1, '61'),
(62, 'gaurav.sharma@appdeft.biz', '$2b$10$TPR.uoluxQjDmzwDSTs7puXkh3Ewc165zyybgta.bBG3IIED3TNeK', 'Gaurav Sharma', '', 0, '2021-10-15 10:09:50', '2021-10-15 10:09:50', '0C66440C-DF17-4967-B7BF-A3B2DB0458F6', 'Kakao', 'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg', 'IOS', '', '', '1950927348', '', '', '', 1, '0'),
(67, 'h@yopmail.com', '$2b$10$beLVnuI9VCBux.kyGTC0D.2OYEP.IA9KrfWei0EWNmGhOcEhUvif.', 'harde', '+916284060443', 0, '2021-10-18 07:31:13', '2021-10-18 07:31:13', '84b24641-74f5-4828-9440-d7be2dc8038e', '', 'uploads/userprofile/20211018T081826422ZImage_877.jpg', '', '', '', '0', '', '', '', 0, '0'),
(68, 'taylorstanley.77413@gmail.com', '$2b$10$9v/35SzrW3N4Xs0HXdC0i.BzfJXjWfceOT7ysRV8e9MpgxMUb/FpW', 'Taylor Stanley', '', 0, '2021-10-19 16:15:12', '2021-10-19 16:15:12', '179da747-0a97-4dca-ab3d-1fbea02026e7', 'Gmail', 'https://lh3.googleusercontent.com/a/AATXAJwqns8NZVI791-_fAr1BEUWAiBk9KthDjRnoqLK=s96-c', '', '110263579931590131602', '', '0', '', '', '', 1, '0'),
(69, 'hardeep.vinnisoft@gmail.com', '$2b$10$mODSnmq8yF90lYMu2bKS6Om.ZbIPezg56ZdhNGMLlAPaTQYoZcTWi', 'hardeep', '', 0, '2021-10-21 11:47:19', '2021-10-21 11:47:19', '4ea7fda7-d81c-48a0-97fa-27062c8aa2e4', 'kakao', 'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg', '', '', '', '0', '', '', '', 1, '0'),
(70, 'ramesh.gautam37@gmail.com', '$2b$10$KI8974sIKmcfFGCSNTFWWe5mg3jhMNFZjezCyidH3HrDreZH5f2tu', 'Rehaan Gautam', '', 0, '2021-10-21 11:49:29', '2021-10-21 11:49:29', '46068e05-1f5b-4560-869a-ee1611cce64f', 'Facebook', 'http://graph.facebook.com/4266639513451364/picture?type=large', '', '', '4266639513451364', '0', '', '', '', 1, '0'),
(71, 'kartiksharma10000@gmail.com', '$2b$10$KxX8NweyHbpmS4ugQtfQWO/xoO0w87vv4Ol35Re57PzlfycHNprie', 'SHERON GAMING', '', 0, '2021-11-08 10:08:36', '2021-11-08 10:08:36', '85415ece-b717-43b6-9a2c-ac36c1532143', 'Gmail', 'https://lh3.googleusercontent.com/a-/AOh14Gh3A1TdG5vY84QCxxZrvaXweApsLiemHsjHl6BFXg=s96-c', '', '103845886573443105306', '', '0', '', '', '', 1, '0'),
(73, 'manveer@yopmail.com', '$2b$10$JtqYGoYp1WmlbHPzhSXEbOiDk/kAqpBKXy2VZyXHJIxmTX.TClswq', 'Manveer 3', '+918837533049', 0, '2021-11-30 08:14:41', '2021-11-30 08:14:41', 'E47AD9F6-E4C3-43F0-9181-3C5D011F9D41', 'Manual', '', 'IOS', '', '', '0', '0', '0', '', 1, '73'),
(74, 'nftmarket@kakao.com', '$2b$10$HTeHfVtJXQmugg/NeShBvOh2JycQVJIPn.fGg3f3Ki6ot9H/wbF9a', '유경운(OZ)', '', 0, '2021-12-08 12:14:08', '2021-12-08 12:14:08', 'F1D54668-F5B2-4149-9CBD-524D23F39AD1', 'Kakao', 'https://k.kakaocdn.net/dn/AHfV3/btrfVtGeCl4/qcuhAEj3dLq1LTPYdK4n71/img_640x640.jpg', 'IOS', '', '', '2019653313', '', '', 'd5OdF31fnEwWiJAys2YqiX:APA91bH6vzcNpq0ce4qgs_DMI6WW0xv-qBC9oXB0QOSpIFZS7iSNlSTePedZ_oDf54b_JXkzbg8SjxCQF54rFsHlafAEzOeFbTovBmtGPozUZ37HZdkpsKtOsP_XbZvrw5c9OEJCWA2s', 1, '74'),
(75, 'manveer@kakao.com', '$2b$10$tUYKJ2V4J2mF35BZiuiX9uh/OPTvX3kvDQZ.NuP4mcCbgMrBLFQ0m', 'saini', '', 0, '2021-12-28 12:55:45', '2021-12-28 12:55:45', '0C66440C-DF17-4967-B7BF-A3B2DB0458F6', 'Kakao', 'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg', 'IOS', '', '', '2054465086', '', '', 'eqoITD3o5Uc9qzUaK5Cuyb:APA91bGj7MO6U_sjCmKstKJyzJo7heTM-Rrq8m3TxnkZ4hZCQhatWIbvjP9CkG_IyqdjW0QiyV5HmgX5opmjsYg8OJnXtzEanyNYrlr2kEjFP2o5bh4IzV_z-xtsfqlIcO41Q2SoDdBJ', 1, '75'),
(76, 'user@yopmail.com', '$2b$10$FKM3nvY30KezTCkNFJxFM.5pockCByw20M2iXb.RFc9HjUWc/vmc.', 'Mohit Mahajan', '+917973851191', 0, '2022-01-10 13:24:10', '2022-01-10 13:24:10', '29786129-94a4-4184-9b36-ecb493fb6adb', '', '', '', '', '', '0', '', '', '', 0, '0'),
(77, 'mbhanumahajan2828@gmail.com', '$2b$10$4k76X3MSEuMkeE/tIuZf5e88Bo29DJK9lM4bHxUQhWAXL1FQw6pEm', 'mohit', '+917973851191', 0, '2022-01-11 13:03:31', '2022-01-11 13:03:31', '2144f4f1-d03e-4090-89c9-7cc77f957764', '', 'uploads/userprofile/20220111T122103643ZImage_717.jpg', '', '', '', '0', '', '', 'fb-Olhfxd0EpvKml3uAQ2p:APA91bGBeQiZ7YsJKeTvCrEqkKdmFxJlktaZjP2BocgYCNfdqbgOG9igpt7pKAujTXUQ8FAp279JNyqwarvgzflglZg-2kJMGv7qPpyvpgf6B73kJq37W_cZDE8ZPaBNqqRJd6pqUWSb', 0, '77'),
(78, 'appdeftdev@gmail.com', '$2b$10$tY7Gqqb3aLuK9GsRmo9zFObhizj0JbfLCCRpxwNq3DpGPErXjNkG6', 'AppDeft Development', '', 0, '2022-01-17 14:55:34', '2022-01-17 14:55:34', 'CBC45462-734A-4431-82D7-51535D2055DC', 'Gmail', 'https://lh3.googleusercontent.com/a/AATXAJxUeRTW9ngELTWY6QeIL1Z5rCsMq5haGlNIzQpd=s450', 'IOS', '105102358208127493228', '', '', '', '', 'f-tYaQQm-kgltcw81hiQrn:APA91bEfdiKA7abJoQ8CcxJH9rt3KafhHD5tlkQshwiyG0ABZlJyPcihMrcxVCtZGMbq5jc2GgsQKsxCMTxRlE2t-Xy6XqzUZzcxPOEZBceYYr45xiaPhj6WxQd6pCIXJpGM3eVZsmBc', 1, '78');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user_review`
--

CREATE TABLE `tbl_user_review` (
  `id` int(11) NOT NULL,
  `review_to_user_id` int(11) NOT NULL,
  `review_by_user_id` int(11) NOT NULL,
  `review` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `rating` float NOT NULL,
  `createdDtm` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user_review`
--

INSERT INTO `tbl_user_review` (`id`, `review_to_user_id`, `review_by_user_id`, `review`, `rating`, `createdDtm`) VALUES
(3, 26, 26, 'Hi', 2, '2022-01-03 10:35:17'),
(4, 17, 75, 'Please tell us you', 4, '2022-01-11 07:37:56'),
(5, 26, 78, 'Awesome', 4, '2022-01-18 15:11:09'),
(6, 17, 26, 'Awesome', 2, '2022-01-19 08:39:22'),
(7, 2, 36, 'dfbhjdfnmxbmnfbxfbhdfbhb', 30.7076, '2022-01-24 12:57:24'),
(9, 26, 12, 'This is it', 3, '2022-01-24 14:26:52');

-- --------------------------------------------------------

--
-- Table structure for table `user_address`
--

CREATE TABLE `user_address` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `address` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `phone_number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `address_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `house_number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `area` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `pincode` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `state` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `createdDtm` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0',
  `selected` varchar(50) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_address`
--

INSERT INTO `user_address` (`id`, `userId`, `name`, `address`, `phone_number`, `address_name`, `house_number`, `area`, `pincode`, `city`, `state`, `createdDtm`, `isDeleted`, `selected`) VALUES
(1, 75, '0', '서울 강북구 방학로 384', '0', '0', '0', '0', '0', '0', '0', '2022-01-04 11:59:14', 0, '1641297554700'),
(2, 75, '0', '서울 강북구 방학로 384', '0', '0', '0', '0', '0', '0', '0', '2022-01-05 07:44:17', 0, '1641368657102'),
(3, 26, '0', '서울 강남구 언주로 864', '0', '0', '0', '0', '0', '0', '0', '2022-01-17 12:03:51', 0, '1642421031564'),
(4, 26, '0', '서울 강남구 언주로 864', '0', '0', '0', '0', '0', '0', '0', '2022-01-17 14:04:53', 0, '1642428293935');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_block_user`
--
ALTER TABLE `tbl_block_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_category`
--
ALTER TABLE `tbl_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_chats`
--
ALTER TABLE `tbl_chats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_chat_rooms`
--
ALTER TABLE `tbl_chat_rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_favourite`
--
ALTER TABLE `tbl_favourite`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_foundation`
--
ALTER TABLE `tbl_foundation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_payment`
--
ALTER TABLE `tbl_payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_products`
--
ALTER TABLE `tbl_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_product_reviews`
--
ALTER TABLE `tbl_product_reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_report`
--
ALTER TABLE `tbl_report`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_report_review`
--
ALTER TABLE `tbl_report_review`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_search`
--
ALTER TABLE `tbl_search`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_sub_category`
--
ALTER TABLE `tbl_sub_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_user_review`
--
ALTER TABLE `tbl_user_review`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tbl_block_user`
--
ALTER TABLE `tbl_block_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `tbl_category`
--
ALTER TABLE `tbl_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `tbl_chats`
--
ALTER TABLE `tbl_chats`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_chat_rooms`
--
ALTER TABLE `tbl_chat_rooms`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_favourite`
--
ALTER TABLE `tbl_favourite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;
--
-- AUTO_INCREMENT for table `tbl_foundation`
--
ALTER TABLE `tbl_foundation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;
--
-- AUTO_INCREMENT for table `tbl_payment`
--
ALTER TABLE `tbl_payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `tbl_products`
--
ALTER TABLE `tbl_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;
--
-- AUTO_INCREMENT for table `tbl_product_reviews`
--
ALTER TABLE `tbl_product_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_report`
--
ALTER TABLE `tbl_report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `tbl_report_review`
--
ALTER TABLE `tbl_report_review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT for table `tbl_search`
--
ALTER TABLE `tbl_search`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT for table `tbl_sub_category`
--
ALTER TABLE `tbl_sub_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;
--
-- AUTO_INCREMENT for table `tbl_user_review`
--
ALTER TABLE `tbl_user_review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `user_address`
--
ALTER TABLE `user_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
