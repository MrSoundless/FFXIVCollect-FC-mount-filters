// ==UserScript==
// @name         FFXIVCollect FC Mount filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  FFXIVCollect FC Mount filter
// @author       You
// @match        https://ffxivcollect.com/fc/*/mounts
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.isRowHidingEnabled = true;

    var fcCollectionTables = document.getElementsByClassName('free-company-collection');
    if (fcCollectionTables.length == 0)
        return;

    var table = fcCollectionTables[0];
    table.parentElement.parentElement.append(createEnabledCheckbox());
    var head = table.getElementsByTagName('thead')[0];
    var headRows = head.getElementsByTagName('tr');
    headRows[0].append(document.createElement('th'));
    headRows[1].append(createHeaderCheckbox());

    var body = table.getElementsByTagName('tbody')[0];
    var rows = body.getElementsByTagName('tr');
    for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        var row = rows[rowIndex];
        var checkboxCell = createCheckboxCell();
        row.append(checkboxCell);
    }

    function toggleActivity() {
        window.isRowHidingEnabled = this.checked;
        var allRows = document.querySelectorAll('.free-company-collection tbody tr');
        for (var i = 0; i < allRows.length; ++i) {
            var row = allRows[i];
            if (window.isRowHidingEnabled) {
                var visible = row.querySelector('input').checked;
                row.style.display = visible ? "table-row" : "none";
            }
            else {
                row.style.display = "table-row";
            }
        }

    }
    function createEnabledCheckbox() {
        var div = document.createElement('div');
        div.style.width = "200px";
        div.style.margin = "auto";

        var label = document.createElement('label');
        label.innerText = "Enable hiding rows";
        label.style.marginLeft = '10px';

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.onchange = toggleActivity;

        div.append(checkbox);
        div.append(label);
        return div;
    }
    function createHeaderCheckbox() {
        var cell = document.createElement('th');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.onchange = function() {
            var table = this.parentElement.parentElement.parentElement.parentElement;
            var allRows = table.querySelectorAll('tbody tr');
            for (var i = 0; i < allRows.length; ++i) {
                var row = allRows[i];
                if (window.isRowHidingEnabled)
                    row.style.display = this.checked ? "table-row" : "none";

                var checkbox = row.querySelectorAll('input[type=checkbox]')[0];
                checkbox.checked = this.checked;
            }
        }


        cell.append(checkbox);
        return cell;
    }
    function createCheckboxCell() {
        var cell = document.createElement('td');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.onchange = function() {
            if (window.isRowHidingEnabled)
                this.parentElement.parentElement.style.display = this.checked ? "table-row" : "none";
        }

        cell.append(checkbox);
        return cell;
    }
})();