const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
admin.initializeApp();


exports.getCryptoNews = functions.https.onCall((data, context) => {
  const apiKey = "gelizmv6ovsxzi84vrzqpoxvrsyrekfopego1plg";
  const url = "https://cryptonews-api.com/api/v1/category?section=general&items=50&page=1&token=" + apiKey;

  return fetch(url, {
    // mode: 'no-cors',
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      // return an ArticleDto JSON
      return "FAILED";
    }
  }).then((data) => {
    console.log("The DATA:", data);
    return data;
  });
});



// NOT LAUNCHED YET
exports.getMyNews = functions.https.onCall((data, context) => {
  const apiKey = "gelizmv6ovsxzi84vrzqpoxvrsyrekfopego1plg";
  console.log(data.tickers);
  const url = "https://cryptonews-api.com/api/v1?tickers=" + data.tickers + "&items=50&token=" + apiKey;

  return fetch(url, {
    // mode: 'no-cors',
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      // return an ArticleDto JSON
      return "FAILED";
    }
  }).then((data) => {
    console.log("The DATA:", data);
    return data;
  });
});


exports.getRssFeed = functions.https.onCall((data, context) => {

  var axios = require('axios')
  var config = {
    method: 'get',
    url: 'https://rss.app/api/v1/feed/FEED_ID',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY:YOUR_API_SECRET'
    }
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .then((data) => {
      console.log("The DATA:", data);
      return data.items;
    })
    .catch(function (error) {
      console.log(error);
    });
});

// function getData(){
//   const apiKey = "gelizmv6ovsxzi84vrzqpoxvrsyrekfopego1plg"
//   const url = "https://cryptonews-api.com/api/v1/category?section=general&items=50&page=1&token=" + apiKey;

//   return fetch(url, {
//     // mode: 'no-cors',
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//     },
//   }).then((response) => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       //return an ArticleDto JSON
//       return "FAILED";
//     }
//   }).then((data)=>{
//     return data;
//   });
// }

// let theArticles = getData();
// theArticles.then((info) =>{
//   console.log("HELOOOO");
//   console.log(info);
// });


exports.scheduledFunction = functions.pubsub.schedule('every 5 minutes').onRun((context) => {
  

  var date = new Date()
  date.setDate(date.getDate - 1)

  var forumRef = db.collection("forumTopics");
  const snapshot = await forumRef.where("dbAddDate", ">", date).get();

  if (snapshot.empty) {
    console.log("Error updating comment count");
    return;
  }

  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());

  });
});

//  query.get()
//    .then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     // for each doc count collections and update likes and comments number
//     console.log(doc.id, " => ", doc.data());
//      });
//    })
//    .catch((error) => {
//    console.log("Error getting documents: ", error);
//    });
// //    
// 
// 
// 
// 
// 
// 
// 
// var query = citiesRef.where("state", "==", "CA");

//   console.log('This will be run every 5 minutes!');
//   return null;
// });
