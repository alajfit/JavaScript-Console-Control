/***
 * JavaScript Console Log Controller by Query String
 * This will control whether the console logs and alerts are shown in the console log
 * It is backward compatable for all broswers including all legacy IE browsers
 * Alerts are transformed to logs and will be coloured in Firefox and Chrome based browsers
 *      Created by Alan J Fitzpatrick
 ***/

(function () { // Modular code block to avoid interferring with the Global Namespace 
    var qSVal = "cLC"; // This is the initial variable to be checked for in the Query String
    var cLC = (location.search.replace(/^.*?\=/, '') == qSVal) ? !0 : 0; // This line checks for the given variable
    if( !cLC ) { // We then have an in statement to check if the ling was present the value
        if( console ) {
            console.log = function () {}; // If Variable not present in the query string clear the console log output code
            window.alert = function () {}; // remove the alert function so it doesn't effect users of the page
        } else if ( typeof console == "undefined" || typeof console.log == "undefined" ) { // if we find no console
            console = { // create the console log just in case and empty the function
                log: function() {} 
            }; 
            window.alert = function () {};
        } else { // if all else fails just clear the alerts at the very least as these are most obstructive to users
            window.alert = function () {};
        }
    } else { // now we deploy the code when we want to show the console and alerts
        var ua = window.navigator.userAgent, // we grab the userAgent of the browser
            msie = ua.indexOf("MSIE "), // run a check for old IE browesers <= 10
            trident = ua.indexOf('Trident/'); // run a check for all IE browsers 11+
        if (msie > 0  || trident > 0) { // If browser is IE don't run any color changes as it doesnt work
            window.alert = function (text) { text = 'Alert: '+text+'!'; console.log(text); }; // Add alert to the console
            alert('Your alerts will appear in this console window'); console.log('-> Console Logs are now active!\n');
        } else { // if using any other brower run the alert color changes as they work
        	// here we add the alert to the console but we also give the text a black background and change the font color to red
            window.alert = function (text) { text = 'Alert: '+text+'!'; console.log( '%c'+text, 'background: #222; color: #FF0000;' ); };
            alert('Your alerts will appear in this console window'); console.log('-> Console Logs are now active!\n'); // Log initiation
        }
    }
})(); // fire modular block
