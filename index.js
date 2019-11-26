/*
 * CURRENCY CONVERTER RELOADED
 * Author: <your name here>
 * ---------------------------
 *
 * This converts currencies...somehow.
 *
 * A list of ressources you used, for example links:
 * [JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference).
 */

/*
 *  Aufgabe: Baut einen neuen Währungsumrechner. Nachfolgend findet ihr Code der die 
 *  dafür notwendingen Eingabewerte von der Konsole entgegennimmt.
 * 
 *  Dafür müsst ihr das Script wie folgt aufrufen:
 *  npm start -- <Ausgangssumme> <Ausgangswährung-Code> <Zielwährung-Code>
 *  also z.B.
 *  npm start -- 10.0 USD EUR
 * 
 *  Die erwartete Ausgabe ist ein Text in folgender Form:
 *  "Ergebnis: <Ausgangssumme> <Ausgangswährung> = <Ergebnis> <Zielwährung>"
 *  also z.B.
 *  Ergebnis: 10.00 USD = 11.00 EUR
 *  
 *  Das Script soll mindestens drei verschiedene Währungen in beide Richtungen unterstützen
 */

let args = process.argv.slice(2);

let amount, originalCurrency, targetCurrency;

if (args.length < 3) {
  console.log('Error: Not enough input arguments given!');
} else {
  amount = args[0];
  originalCurrency = args[1];
  targetCurrency = args[2];
}

//variable output
let output
//währungswerte auf dollar normiert
const currencies = {
  USD: {conversion: 1, sign: '$'},
  EUR: {conversion: 0.9, sign: '€'},
  YEN: {conversion: 108.77, sign: '@'}

}


const request = require('request');
request('https://api.exchangeratesapi.io/latest', function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage.
  let bodyObj = JSON.parse(body);


  try {
    for (const pos in bodyObj.rates) {
      if (currencies.hasOwnProperty(pos)) {
        //const celement = download.rates[pos]
        currencies[pos].rate = bodyObj.rates[pos];
      } else if (currencies.hasOwnProperty(pos) === false) {
        currencies[pos] = {};
        currencies[pos].rate = bodyObj.rates[pos];
      }
    }
  // eslint-disable-next-line no-empty
  } catch (error) {
    
  }

  const ammountInUSD = amount / currencies[originalCurrency].conversion;

  output = ammountInUSD * currencies[targetCurrency].conversion;

  console.log(output)


});


