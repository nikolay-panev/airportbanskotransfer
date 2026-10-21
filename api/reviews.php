<?php
// Public, read-only list of approved reviews.
// Fixed query — nothing from the request is ever placed into SQL.
// Replaces the generic query builder in index.php, which accepted raw field
// names and ORDER BY clauses from the browser (SQL injection risk that could
// expose the bookings table).
require_once(__DIR__ . "/config.php");

header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: public, max-age=300");

$limit = 12;

$stmt = $db->prepare('SELECT `name`, `comment`, `rating`, `created` FROM `comments` WHERE `deleted` IS NULL AND `approved` = 1 ORDER BY `created` DESC LIMIT ' . intval($limit));
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

$stats = $db->query('SELECT COUNT(*) AS `total`, AVG(`rating`) AS `average` FROM `comments` WHERE `deleted` IS NULL AND `approved` = 1 AND `rating` IS NOT NULL')->fetch(PDO::FETCH_ASSOC);

die(json_encode([
	'status' => 'success',
	'data' => $rows,
	'total' => intval($stats['total']),
	'average' => $stats['average'] !== null ? round(floatval($stats['average']), 2) : null,
]));
