
import { createHashHistory } from 'history'
 
const history = createHashHistory();

const param = require('jquery-param');

export const loginInfo = {
};

export const ajaxPost = function (url, data) {
    return fetch(`${loginInfo.host}/${url}`, {
        method: 'POST',
        credentials: 'include',
        body: param(data),
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    })
    .then(response => {
        console.log(response);
        if (response.status != 200) {
            delete loginInfo.UserID;
            history.push('/login');
            return false;
        }
        return response.json();
    });
}

export const ajaxGet = function (url, data) {
    return fetch(`${loginInfo.host}/${url}`, {
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
        return  response.json()

    });
}