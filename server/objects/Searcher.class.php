<?php

/**
 * @author armando.joaquin
 * 22 oct 2020
 *
 * Class Searcher
 */
class Searcher
{
    /**
     * Min query length to evaluate
     *
     */
    const MIN_QUERY_LENGTH = 2;
    /**
     * Input query
     * @var string
     */
    private $query;

    /**
     * Searching result list
     *
     * @var array
     */
    private $results;

    function __construct($query)
    {
        $this->query = $query;
        $this->results = array();
    }

    /**
     * Search (evaluate) query in keywords source
     *
     */
    public function search()
    {
        $queryLower = strtolower($this->query);
        if (strlen($queryLower) < self::MIN_QUERY_LENGTH) {
            return;
        }
        $keywords = $this->getKeywords();
        foreach ($keywords as $row) {
            foreach ($row as $value) {
                $valueLower = strtolower($value);
                if (strpos($valueLower, $queryLower) !== false) {
                    $this->results[] = $row;
                    continue;
                }
            }
        }
    }

    /**
     * Get searching results
     * @return array
     */
    public function getResults()
    {
        return $this->results;
    }

    /**
     * Load source file and return array
     * @return mixed
     */
    private function getKeywords()
    {
        $source = file_get_contents('keywords.json');
        return json_decode($source, true);
    }
}
