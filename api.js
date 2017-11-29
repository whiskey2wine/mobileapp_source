/**
 * Created by jayakornkarikan on 10/12/2017 AD.
 */


exports.profile = function() {
    return fetch('http://35.198.194.101:3000/profile')
        .then(function (res) {
            if (res) {
                return res.json();
            }
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            // ADD THIS THROW error
            // throw error;
        });
}

exports.menu = function () {
    let url = 'http://35.198.194.101:3000/fetchitem';
    return fetch(url)
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log(err.message);
            throw err;
        })
}

exports.buyItem = function (name, price, quantity, email) {
    return fetch('http://35.198.194.101:3000/buy', {
        method: "POST",
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            name: name,
            quantity: quantity,
            price: price,
            email: email
        })
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log(err.message);
            throw err;
        })
}

exports.getHistory = function (email) {
    return fetch('http://35.198.194.101:3000/yourorder', {
        method: "POST",
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            email: email
        })
    })
        .then((res) => {
            if (res) {
                return res.json();
            }
    })
    .catch((err) => {
        console.log(err.message);
        // throw err;
    })
}