/*! simpleCalc v1.0 | (c) Andras Gulacsi 2017 | MIT license
 *  ARGUMENTS:
        'data' = from where we get the user input and put the result
        'msg' = to where we write error message for the user
*/
function simpleCalc(data, msg) {
    "use strict";
    
    /* Get input from the HTML element. Gets the text content of the HTML element */
    var input = document.getElementById(data);
    input = input.textContent;

    /* If there is a number before '(' like this: 4(7) then a * is injected: 4*(7) */
    var multiplySignInjecter = function(i) {
        var isNumber = input[i - 1]; 
        isNumber = isNumber.match(/[0-9]/g);
        return (isNumber !== null) ? ("*" + c) : c;
    };

    /* Formatting the input string. For example: '5(76+65)+7' becomes '5*(76+65)+7'. */
    input = (function () {
        var result = "";
        for (var i = 0, len = input.length; i < len; i += 1) {
            if (input[i] === "(") {
                (i > 0) ? result += multiplySignInjecter(i) : result += input[i];
            } else {
                result += input[i];
            }
        }
        return result;
    })();

   /* Output the results */
   var output = "=<br />";

   /* eval() is useful in this case. It invokes the JS engine on our string.
    * It 'knows' the math. With simple error handling. */
   try {
       output += eval(input);
   }
   catch(e) {
        var error = document.getElementById(msg);
        error.innerHTML = "Your expression contains errors!";
        return;
   }

   /* Append results to the display of the calculator. */
   var result = document.getElementById(data);
   result.innerHTML += output;
}
