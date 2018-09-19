
import { createHashHistory } from 'history'
import { func } from 'prop-types';

export const history = createHashHistory();

const param = require('jquery-param');

export const loginInfo = {
};

if (typeof (sessionStorage) !== "undefined") {

    console.log(sessionStorage);
    if (sessionStorage["loginInfo"]) {
        Object.assign(loginInfo, JSON.parse(sessionStorage["loginInfo"]));
    }
    loginInfo.save = function () {
        sessionStorage["loginInfo"] = JSON.stringify(loginInfo);
    }
    loginInfo.clear = function () {
        sessionStorage["loginInfo"] = JSON.stringify({});
    }

} else {
    // Sorry! No Web Storage support..
    console.log("Sorry! No Web Storage support..");
}

export const ajaxPost = function (url, data) {
    return fetch(`${window.host}/${url}`, {
        method: 'POST',
        credentials: 'include',
        body: param(data),
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

export const logout = function () {
    loginInfo.clear();
    history.push("/login");
}

export const getFieldIndex = function (field, index) {
    index = index === undefined ? '' : index;
    var result = `${field}${index}`;

    return result;
}