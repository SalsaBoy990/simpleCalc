function simpleCalc(sb, eb, data, msg) {
    "use strict";
    /* simpleCalc: Simple Calculator Program
     * (c) Copyright: András Gulácsi 2017
     * Licence: MIT
     * 
     * ARGUMENTS:
     * 'sb' = starting bracket,
     * 'eb' = ending bracket,
     * 'data' = from where we get the user input,
     * 'msg' = error message for the user if there is an error
     * Note: every time the user clicks on the ( or ) buttons, 'sb' & 'eb' are incremented
     * */

    /* Get input from the HTML element. Gets the text content of the HTML element */
    var input = document.getElementById(data);
    input = input.textContent;

    /* If there is a number before '(' like this: 4(7) then a * is injected: 4*(7) */
    var multiplySignInjecter = function(c, i) {
        var isNumber = input[i - 1]; 
        isNumber = isNumber.match( /[0-9]/g );
        return (isNumber !== null) ? ("*" + c) : c;
    };

    /* Formatting the input string. Example: '5(76+65)7' becomes '5*(76+65)*7'. ',' is replaced by '.' . */
    input = (function () {
        var result = "";
        var c = "";
        for (var i = 0, len = input.length; i < len; i += 1) {
            c = input[i];
            switch (c) {
                case "(":
                    (i > 0) ? result += multiplySignInjecter(c, i) : result += c;
                    /* If the first character is a bracket should not be left off. */
                    break;
                case ",":
                    /* Rewrite comma to point (in Hungary, we use ',' instead of '.' as the decimal sign). */
                    result += "."; 
                    break;
                default:
                    result += c;
                    break;
            }
        }
        /* console.log(result);*/
        return result;
    })();

   /* Output the results */
   var output = "=<br />";

   /* This is one case when the eval() is very useful! Invokes JS interpreter on our string.
    * Very very simple error handling. */
   try {
       output += eval(input);
   }
   catch(e) {
        var error = document.getElementById(msg);
        error.innerHTML = "Your expression contains errors!";
        return;
   }

   /* Replace the decimal sign from . to , */
   output = output.replace(".", ",", "g");
   /* Append results to the 'display' of the calculator */
   var result = document.getElementById(data);
   result.innerHTML += output;
}
