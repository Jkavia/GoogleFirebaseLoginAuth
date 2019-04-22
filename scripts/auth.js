

        
    //  const adminForm = document.querySelector('.admin-actions');    
    //  adminForm.addEventListener('submit', (e)=>{
    //      e.preventDefault();
    //      const adminEmail = document.querySelector('#admin-email').value;
    //      //reference to a function
    //      const addAdminRole = functions.httpsCallable('addAdminRole');
    //      //invoking the function
    //      addAdminRole({email:adminEmail}).then((result)=>{
    //         console.log(result);
    //      });
    //  } )
        // listen for auth status changes
        auth.onAuthStateChanged(user => {
            if (user) {
                //get data
    //db.collection('guides').get().then changed to below to get the realtime db update visible on ui
    db.collection('guides').onSnapshot(snapshot => {
        // console.log(snapshot.docs);
            setupGuides(snapshot.docs);
            setupUI(user);
        }, err =>{
            console.log(err.message);
        });
            //window.alert('user logged in: ', user);
            } else {
                setupUI();
                setupGuides([]);
            //window.alert('user logged out');
            }
        });

        //to add the guides in the db
        const createForm = document.querySelector('#create-form');
        createForm.addEventListener('submit', (e) => {
        e.preventDefault();
        db.collection('guides').add({
            title: createForm['title'].value,
            content: createForm['content'].value
        }).then(()=>{
            //close the model and clear the form 
            // close the signup modal & reset form
            const modal = document.querySelector('#modal-create');
            M.Modal.getInstance(modal).close();
            createForm.reset();
        }).catch(err =>{
            console.log(err.message);
        })

    });

        // signup
        const signupForm = document.querySelector('#signup-form');
        signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // get user info
        const email = signupForm['signup-email'].value;
        const password = signupForm['signup-password'].value;
        const name = signupForm['name'].value;

        // sign up the user
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            //console.log(cred.user);
            // close the signup modal & reset form
            cred.user.updateProfile({
                displayName: name,
                photoURL: "https://cdn4.iconfinder.com/data/icons/blank-people-avatars/256/2-512.png"
            }).then(function() {
                // Update successful.
            }).catch(function(error) {
                // An error happened.
            });

            return db.collection('users').doc(cred.user.uid).set({
                bio: signupForm['signup-bio'].value
            });
            }).then(()=>{
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signupForm.reset();
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
            } else {
            alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
        });;
        });

        // logout
        const logout = document.querySelector('#logout');
        logout.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
            } else {
            alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
        });
        });

        // login
        const loginForm = document.querySelector('#login-form');
        loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // get user info
        const email = loginForm['login-email'].value;
        const password = loginForm['login-password'].value;

        // log the user in
        auth.signInWithEmailAndPassword(email, password).then((cred) => {
            console.log(cred.user);
            // close the signup modal & reset form
            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            loginForm.reset();
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
            } else {
            alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
        });

        });



         // Google login
         const googleLogin = document.querySelector('#google-signIn');
         googleLogin.addEventListener('click', (e) => {
         e.preventDefault();
         
         // define google as the base providor
         const base_providor = new firebase.auth.GoogleAuthProvider();
         auth.signInWithPopup(base_providor).then(result=>{
            console.log(result.user);
            // close the signup modal & reset form
            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            loginForm.reset();
         }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
            } else {
            alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
        });
 
         });


         //Github login
         const githubLogin = document.querySelector('#github-signIn');
         githubLogin.addEventListener('click', (e) => {
         e.preventDefault();
         
         // define google as the base providor
         const base_providor1 = new firebase.auth.GithubAuthProvider();
         auth.signInWithPopup(base_providor1).then(result=>{
            console.log(result.user);
            // close the signup modal & reset form
            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            loginForm.reset();
         }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
            } else {
            alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
        });
 
         });