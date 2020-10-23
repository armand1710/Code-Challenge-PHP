/**
 * @author armando.joaquin
 * 22 oct 2020
 */

/**
 * API connector
 *
 * @type {{}}
 */
var API = (function () {

    /**
     * Public functions
     * @type {{}}
     */
    var publicWS = {};

    /**
     * Search city by keyword
     * @param query
     */
    publicWS.search = function (query) {
        $.ajax({
            url: 'server/controller.php',
            data: {
                event: 'search',
                query: query
            },
            type: 'post',
            dataType: 'json',
            beforeSend: function () {
                printLoading();
            },
            success: function (response) {
                printResults(response);
            },
            error: function (err) {
                printError();
            }
        });
    };

    /**
     * Print http results
     *
     * @param object
     */
    const printResults = function (object) {
        tableUtils.loadTable();
        for (var i in object) {
            var row = object[i];
            var columns = [row.name, row.city, row.state];
            tableUtils.printRow(columns);
        }
        if (object.length == 0) {
            tableUtils.printRow(['No data found, try again'], 3);
        }
    };

    /**
     * Print table loading
     */
    const printLoading = function () {
        tableUtils.loadTable();
        tableUtils.printRow(['Loading...'], 3);
    };

    /**
     * Print table error results
     *
     * @param error
     */
    const printError = function () {
        tableUtils.loadTable();
        tableUtils.printRow(['Error fetching data'], 3);
    }

    return publicWS;
})();

/**
 * Print html table
 *
 * @type {{}}
 */
var tableUtils = (function () {

    var utils = {};

    var result;

    var colspanNumber = null;

    /**
     * Get html table element
     */
    var getTable = function () {
        result = $('#results').removeAttr('hidden').find('tbody');
        result.html('');
    };

    /**
     * Build <td>
     *
     * @param value
     * @returns {string}
     */
    var convertColumns = function (value) {
        const colspan = (colspanNumber != null) ? 'colspan="' + colspanNumber + '"' : '';
        return '<td ' + colspan + '>' + value + '</td>';
    };

    /**
     * Load table init
     */
    utils.loadTable = function () {
        getTable();
    };

    /**
     * Append row(cols) to table body
     *
     * @param columns
     * @param colspan
     */
    utils.printRow = function (columns, colspan = null) {
        colspanNumber = colspan;
        var td = (columns.map(convertColumns)).join('');
        result.append('<tr>' + td + '</tr>')
    };


    return utils;
})();