var express = require('express'), app = express();
var http = require('http').Server(app);
var whois = require("whois-api");
/* App Setup */
app.use(express.static('public'));
app.get('/:domain', function(req, res){
   res.setHeader('Content-Type', 'application/json');
   var domainName = req.params["domain"];
   whois.lookup(domainName, function(error, result) {
      if (error != null) {
         console.log(error);
         res.send(JSON.stringify({ "error": "Invalid domain: No WHOIS server found for the address. ex: google.com" }));
         return
      }
      res.send(result);
   });
});

/* App */
http.listen(process.env.PORT || 5000, function() {
  console.log('listening on *:5000');
});
