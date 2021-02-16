Author: Jesse Fimbres

APPROACH
APPLICATION STACK
Node, Express, MongoDB
DEPENDENCIES
"ejs": "^3.1.6",
"express": "^4.17.1",
"mongoose": "^5.11.16",
"shortid": "^2.2.16",
"jest": "^2.1.1" (for unit testing)

TO HASH OR NOT TO HASH?
While there are libraries readily available for the purpose of URL shortening, 
I decided to use a simpler solution that doesn't involve hashing. I decided to leverage the counter component of the MongoDB ObjectId, which is generated whenever a new document is created. The final 6 characters of the ObjectId string make up the counter, and they are guaranteed to be unique within the database. Since I was already familair with MongoDB, this seemed like the logical way to go. The counter is stored within the "shortUrl" field of the "urlSchema", along with the original input URL, "longUrl". The simplicity of this method removes any need for hashing or some more complex base conversion technique.

As a note- unit testing is important. But due to the lack of functions it proved to be difficult to provide meaningful unit tests on the assignment. Perhaps a more complex approach is in order! 

PROCESS OVERVIEW
1) User submits long URL
2) Long URL gets added to a mongo document (if long URL not already in the document)
3) The ObjectId is extracted from the document and the counter segment takes the place of the short URL id
4) A table with the (long,short) pairs is displayed on the front end.
5) When the user clicks on the short link, the short field is used to look up the proper long url and redirect the user to the appropriate site.

HOW TO LAUNCH
* Make sure dependencies are installed
* Have mongoDB running locally
* nodemon server.js