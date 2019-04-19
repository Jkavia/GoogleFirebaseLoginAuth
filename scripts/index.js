        // DOM elements
        const guideList = document.querySelector('.guides');
        //hadling login logout tabs
        const loggedOutLinks = document.querySelectorAll('.logged-out');
        const loggedInLinks = document.querySelectorAll('.logged-in');

        //showing the account details
        const AccountDetails = document.querySelector('.account-details');

        const setupUI = (user) => {
            if(user){
          // account info
    db.collection('users').doc(user.uid).get().then(doc => {
        const html = `
            <div><img style="height:200px;width:200px" src="${user.photoURL}"></div>
          <div>Logged in as: ${user.email}</div>
          <div>Name: ${user.displayName}</div>
          <div>Bio: ${doc.data().bio}</div>
        `;
        AccountDetails.innerHTML = html;
      });
                loggedInLinks.forEach(item => item.style.display = 'block');
                loggedOutLinks.forEach(item => item.style.display = 'none');
            }else{

                //hide account info 
                AccountDetails.innerHTML = '';

                loggedInLinks.forEach(item => item.style.display = 'none');
                loggedOutLinks.forEach(item => item.style.display = 'block');
            }
        }
        // setup guides
        const setupGuides = (data) => {

                if(data.length){
            let html = '';
            data.forEach(doc => {
                const guide = doc.data();
                //console.log(doc.data);
                const li = `<li>
                    <div class="collapsible-header yellow lighten-4"> ${guide.title} </div>
                    <div class="collapsible-body white"> ${guide.content} </div>
                </li>`;
                html += li;
            });
            guideList.innerHTML = html
            }else{
                guideList.innerHTML = '<h5 class="center-align">Login to view Profile</h5>';
            }
        };

        // setup materialize components
        document.addEventListener('DOMContentLoaded', function() {

            var modals = document.querySelectorAll('.modal');
            //M for materialize
            M.Modal.init(modals);
        
            var items = document.querySelectorAll('.collapsible');
            M.Collapsible.init(items);
        
        });