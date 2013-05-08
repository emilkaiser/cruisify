/*global $, chrome, localStorage, document, setTimeout */
(function () {
    'use strict';
    function save() {
        if (document.getElementById('yes').checked) {
            localStorage.cruisify = 1;
        } else if (document.getElementById('no').checked) {
            localStorage.cruisify = 0;
        }
        localStorage.secret = document.getElementById("secret").checked ? 1 : 0;
        localStorage.love = document.getElementById("love").value || "";
        localStorage.like = document.getElementById("like").value || "";
        localStorage.hate = document.getElementById("hate").value || "";

        var status = document.getElementById("status");
        status.innerHTML = "Options saved!";
        setTimeout(function () {
            status.innerHTML = "";
        }, 1250);
    }

    function restore() {
        if (parseInt(localStorage.cruisify, 10)) {
            document.getElementById('yes').checked = true;
        } else {
            document.getElementById('yes').checked = false;
            document.getElementById('no').checked = true;
        }
        document.getElementById("secret").checked = parseInt(localStorage.secret, 10);
        document.getElementById("love").value = localStorage.love || "";
        document.getElementById("like").value = localStorage.like || "";
        document.getElementById("hate").value = localStorage.hate || "";
    }
    document.addEventListener('DOMContentLoaded', restore);
    document.querySelector('#save').addEventListener('click', save);
}());
