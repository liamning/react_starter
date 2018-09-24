
import { createHashHistory } from 'history'
import { func } from 'prop-types';

export const history = createHashHistory();

const param = require('jquery-param');

export const loginInfo = {
};
export const ajaxPost = function (url, data) {
    if (loginInfo.Session)
        data.session = loginInfo.Session;
		
    return fetch(`${window.host}/${url}`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    })
        .then(response => {
            //console.log(response);
            if (response.status != 200) {
                delete loginInfo.UserID;
                history.push('/login');
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
            history.push('/login');
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
}


if (typeof (sessionStorage) !== "undefined") {
 
    if (sessionStorage["loginInfo"] && localStorage["session"]) {
        Object.assign(loginInfo, JSON.parse(sessionStorage["loginInfo"]));

    } else if(localStorage["session"]) {
        let url = 'Logout'; 
        let data = { session: localStorage["session"] };
        loginInfo.clear();
        ajaxPost(url, data).then(response => {

          console.log(response);

        });
    } else {
        loginInfo.clear();
    }
 




} else {
    // Sorry! No Web Storage support..
    console.log("Sorry! No Web Storage support..");

}
export const logout = function () {
    loginInfo.clear();
    history.push("/login");
}

export const getFieldIndex = function (field, index) {
    index = index === undefined ? '' : index;
    var result = `${field}${index}`;

    return result;
}