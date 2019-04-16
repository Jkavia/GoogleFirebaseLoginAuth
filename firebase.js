           // Initialize Firebase
           var config = {
            apiKey: "AIzaSyB5Brgffz450IqANwPKaO7gN_epiEww04k",
            authDomain: "jaisproject-b5b20.firebaseapp.com",
            databaseURL: "https://jaisproject-b5b20.firebaseio.com",
            projectId: "jaisproject-b5b20",
            storageBucket: "jaisproject-b5b20.appspot.com",
            messagingSenderId: "181360724611"
          };
          firebase.initializeApp(config);
          console.log(firebase);

          var database = firebase.database();
          var ref = database.ref('scores');
          var data = {
            name:"DTS",
            score: 49
          };
          ref.push(data);
          ref.on('value',gotData, errData);

          function gotData(data){
            console.log(data.val());
          }

          function errData(err){
              consol.log("error!");
              console.log(err);
          }