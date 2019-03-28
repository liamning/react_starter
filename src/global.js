
import { createHashHistory } from 'history'
import { func } from 'prop-types';


window.addEventListener("close", function( event ) {
    // make the close button ineffective
    alert('test');
    event.preventDefault();
  }, false);


const param = require('jquery-param');

export const loginInfo = {
};

export const history = createHashHistory({
    basename: '',             // The base URL of the app (see below)
    hashType: 'slash',        // The hash type to use (see below)
    // A function to use to confirm navigation with the user (see below)
    getUserConfirmation(message, callback) {
        // Show some custom dialog to the user and call
        // callback(true) to continue the transiton, or
        // callback(false) to abort it.

        //callback(confirm("sure?"));
        
        // console.log("getUserConfirmation");
         console.log(`=========================`);
        console.log(history.location.pathname);
        console.log(window.location.hash);


    window.lastURL = history.location.pathname;
    console.log("getUserConfirmation", window.lastURL);
        callback(true);
        // if(loginInfo.UserID || history.location.pathname == "/login"){
        //     callback(true);
        // } else {
        //     callback(false); 
        // }
      }
})


 const unblock = history.block('Are you sure you want to leave this page?')

// Or use a function that returns the message when it's needed.
// history.block((location, action) => {
//   // The location and action arguments indicate the location
//   // we're transitioning to and how we're getting there.

//   // A common use case is to prevent the user from leaving the
//   // page if there's a form they haven't submitted yet.
//   //if (input.value !== '')
//     return 'Are you sure you want to leave this page?'
// })
window.ajaxCount = 0;
export const ajaxPost = function (url, data) {
    // if (loginInfo.Session)
    //     data.session = loginInfo.Session;

    window.ajaxCount++;
    return fetch(`${window.host}/${url}`, {
        method: 'POST',
        credentials: 'include',
        // body: JSON.stringify(data),
        body: param(data),
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    }).then(response => {
        window.ajaxCount--;
        //console.log(`ajaxCount = ${ajaxCount}`);
            ////console.log(response);
            if (response.status != 200) {
                delete loginInfo.UserID;
                history.replace('/login');
                return false;
            }

            return response.json();
        });
}

export const ajaxGet = function (url, data) {
    return fetch(`${window.host}/${url}`, {
        method: 'GET',
        credentials: 'include',
        body: param(data),
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    }).then(response => {
        if (response.status != 200) {
            delete loginInfo.UserID;
            history.replace('/login');
            return false;

        }
        return response.json()

    });
}


loginInfo.save = function () {
    sessionStorage["loginInfo"] = JSON.stringify(loginInfo);
    localStorage["session"] = loginInfo.Session;

}
loginInfo.clear = function () {
    sessionStorage.clear();
    localStorage.clear();
    delete loginInfo.UserID;
}


if (typeof (sessionStorage) !== "undefined") {

    if (sessionStorage["loginInfo"] && localStorage["session"]) {
        Object.assign(loginInfo, JSON.parse(sessionStorage["loginInfo"]));

    } 
    // else if (localStorage["session"]) {
    //     let url = 'Logout';
    //     let data = { session: localStorage["session"] };
    //     loginInfo.clear();
    //     ajaxPost(url, data).then(response => {

    //         //console.log(response);

    //     });
    // } 
    else {
        loginInfo.clear();
    }


} else {
    // Sorry! No Web Storage support..
    //console.log("Sorry! No Web Storage support..");

}
export const logout = function () {
    loginInfo.clear();
    history.replace("/login");

}

export const getFieldIndex = function (field, index) {
    index = index === undefined ? '' : index;
    var result = `${field}${index}`;

    return result;
}


var e = document.getElementsByClassName('sample')[0];
			
			function whichTransitionEvent(){
			    var t;
			    var el = document.createElement('fakeelement');
			    var transitions = {
			      'transition':'transitionend',
			      'OTransition':'oTransitionEnd',
			      'MozTransition':'transitionend',
			      'WebkitTransition':'webkitTransitionEnd'
			    }

			    for(t in transitions){
			        if( el.style[t] !== undefined ){
			            return transitions[t];
			        }
			    }
			}

			// var transitionEvent = whichTransitionEvent();
			// transitionEvent && e.addEventListener(transitionEvent, function() {
			// 	console.log('Transition complete!  This is the callback, no library needed!');
			// });
