/*global $, chrome, localStorage */
(function () {
    'use strict';
    chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.method === "getLocalStorage") {
            sendResponse(localStorage);
        } else {
            sendResponse();
        }
    });
}());
