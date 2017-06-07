const baseURL = 'https://site-favourites-a09liweis.c9users.io/';

window.onload = function() {

	$('#login').submit(function(e) {
		e.preventDefault();
		var email = $('#email').val();
		var password = $('#password').val();
		login(email, password);
	});

	// var form = document.forms[0];
	// form.onsubmit = function(e) {
	// 	e.preventDefault();
	// 	var email = form.email.value;
	// 	var password = form.password.value;
	// 	login(email, password);
	// }

	var urlNode = document.getElementById('url');
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var activeTab = tabs[0];
		var url = activeTab.url;
		var fav = activeTab.favIconUrl;
		var title = activeTab.title;
		urlNode.innerText = url;
	});
};

function login(email, password) {
	var http = new XMLHttpRequest();
	var url = baseURL + 'api/login';
	var params = 'email=' + email + '&password=' + password;
	http.open('POST', url, true);

	//Send the proper header information along with the request
	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	http.onreadystatechange = function() {//Call a function when the state changes.
	    if(http.readyState == 4 && http.status == 200) {
	        var res = JSON.parse(http.responseText);
	        console.log(res);
	    }
	}
	http.send(params);
}