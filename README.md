# RandomWikipediaJS
 JS package to retrieve a random wikipedia page, among other things

## Usage and Examples
 RandomWikipediaJS provides asyncronous functions that return promises containing URLs, HTMLDocuments, and document titles

```jsx
const { getDocByURL, getNewestURL, getRandomTitle, getNewestTitle, getTodayTitle, getTomorrowURL, getTomorrowTitle } = require("randomwikipediajs");

// Get a document by URL and log the title
getDocByURL("https://en.wikipedia.org/wiki/Sultan_Bazar_Clock_Tower").then(doc => console.log(doc.title));

// Get a random document and log the title
getRandomDocument().then(doc => console.log(doc.title));

// Get a random article title
getRandomTitle().then(title => console.log(title));

// Get URL of the newest modified Wikipedia article and log URL
getNewestURL().then(url => console.log(url));

// Get URL of featured Wikipedia article from tomorrow and log URL
getTomorrowURL().then(url => console.log(url));

// Get URL of featured Wikipedia article from day after tomorrow and log URL
getTomorrowURL(true).then(url => console.log(url));

// Get and log titles of
getNewestTitle().then(title => console.log(title)); // Last modified Wikipedia article
getRandomTitle().then(title => console.log(title)); // Random Wikipedia article
getTodayTitle().then(title => console.log(title)); // Today's featured Wikipedia article
getTomorrowTitle().then(title => console.log(title)); // Tomorrow's featured Wikipedia article
getTomorrowTitle(true).then(title => console.log(title)); // Day after tomorrow's featured Wikipedia article
```
