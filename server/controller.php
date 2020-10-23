<?php
/**
 * @author armando.joaquin
 * 22 oct 2020
 */

require_once 'objects/Searcher.class.php';

$request = $_REQUEST;
$action = $request['event'];

switch ($action) {
    case 'search':

        $query = $request['query'];

        $searcher = new Searcher($query);
        $searcher->search();
        $results = $searcher->getResults();

        echo json_encode($results);

        break;
}