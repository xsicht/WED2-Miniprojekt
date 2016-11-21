var hbs = require('hbs');

hbs.registerHelper('drawStars', function(n, block) {
    var s = '';
    var activ = n;
    var inactiv = 5 - n;
    var span = '<span class="starActiv">★</span>';
    for(var i = 0; i < activ; ++i)
        s += span;

    span = '<span class="starInactiv">☆</span>';
    for(var i = 0; i < inactiv; ++i)
        s += span;
    return s;
});