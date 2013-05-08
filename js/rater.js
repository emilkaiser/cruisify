/*global $, chrome */
(function () {
    'use strict';
    var rateCont = $('.star-box-giga-star'),
        secondRateCont = $('[itemprop="ratingValue"]');
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
            add = 10;
        } else {
            add = 0;
            if (ls.love && $.inArray(ls.love.toLowerCase(), genres) !== -1) {
                add += 3;
            }
            if (ls.like && $.inArray(ls.like.toLowerCase(), genres) !== -1) {
                add += 1;
            }
            if (ls.hate && $.inArray(ls.hate.toLowerCase(), genres) !== -1) {
                add -= 2;
            }
        }
        if (add !== 0) {
            add = parseFloat(rateCont.html().replace(',', '.'), 10) + add;
            add = Math.round(add * 10) / 10;
            add = Math.min(10, add).toString();
            add = add.replace('.', ',');
            rateCont.html(add);
            secondRateCont.html(add);
            if (!parseInt(ls.secret, 10)) {
                rateCont.css({
                    'background-position': '0',
                    'margin-right': '5px',
                    'padding': '0'
                }).addClass('updated').removeClass('titlePageSprite');
            }
        }
    });
}());

