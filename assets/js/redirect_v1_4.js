function redirectUrl(domain, path) {
    return "https://"+ domain+ "/"+ path;
}

function redirectLoad(blocked) {
    if (blocked) {
        console.log("[RD Blocked]");
    } else {        
        if (typeof REDIRECT_ENABLE === 'undefined' || REDIRECT_ENABLE === null) {
            console.log("[RD Disabled]");
            return false;
        }
        if (typeof REDIRECT_GUIDE === 'undefined' || REDIRECT_GUIDE === null) {
            console.log("[RD NoOption]");
            return false;
        }
        console.log("[RD Enabled]");
        for (const [dom, domain] of Object.entries(REDIRECT_GUIDE)) {
            console.log(`${dom} => ${domain}`);
            $(`.${dom}`).each(function() {
                $(this).attr("href", redirectUrl(domain, $(this).attr("href")));
            });
        }
    }
}

$(window).on("load", function() {
    $.getScript( "https://www.ubg235.com/js/redirect.js?ws=ubg61.github.io" )
        .done(function( script, textStatus ) {            
            redirectLoad(false);
        })
        .fail(function( jqxhr, settings, exception ) {
            redirectLoad(true);
        });
});
