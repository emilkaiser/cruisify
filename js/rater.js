/*global $, chrome */
(function () {
    'use strict';
    var rateCont = $('.star-box-giga-star');
    chrome.extension.sendMessage({method: "getLocalStorage"}, function (ls) {
        if (!ls) {
            return;
        }
        var genres = [],
            regex = /Tom Cruise/,
            cruise = false,
            add;
        $('.itemprop[itemprop="actor"]').each(function () {
            if (regex.test($(this).html())) {
                cruise = true;
            }
        });
        $('.itemprop[itemprop="genre"]').each(function () {
            genres.push($(this).html().toLowerCase());
        });
        if (parseInt(ls.cruisify, 10) && cruise) {
            rateCont.html("10");
            rateCont.css({
                'background-position': '0'
            }).addClass('updated').removeClass('titlePageSprite');
        } else {
            add = 0;
            if (ls.love && $.inArray(ls.love.toLowerCase(), genres) !== -1) {
                add += 2 + Math.random();
            }
            if (ls.like && $.inArray(ls.like.toLowerCase(), genres) !== -1) {
                add += Math.random();
            }
            if (ls.hate && $.inArray(ls.hate.toLowerCase(), genres) !== -1) {
                add -= 1 + Math.random();
            }
            add = Math.min(10, (parseFloat(rateCont.html().replace(',', '.'), 10) + Math.round(add * 10) / 10)).toString();
            rateCont.html(add.replace('.', ','));
            rateCont.css({
                'background-position': '0',
                'margin-right': '5px',
                'padding': '0'
            }).addClass('updated').removeClass('titlePageSprite');
        }
    });
}());

