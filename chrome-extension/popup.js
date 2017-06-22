const baseURL = 'https://site-favourites-a09liweis.c9users.io/';

var email;

var url;
var title;
var fav;

chrome.storage.sync.get(['email'], function(items){
	if (items.hasOwnProperty('email')) {
		email = items.email;
	}
});

window.onload = function() {

	if (typeof email != 'undefined') {
		$('#login').hide();
	}

	$('#login').submit(function(e) {
		e.preventDefault();
		email = $('#email').val();
		chrome.storage.sync.set({ "email": email }, function(){
		});
		var password = $('#password').val();
		login(email, password);
	});

	$('#add').on('click', function() {
		add(url, title, fav, email);
	})

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var activeTab = tabs[0];
		url = activeTab.url;
		fav = activeTab.favIconUrl;
		title = activeTab.title;
		$('#title').html(title);
		$('#url').html(url);
	});
};

function login(email, password) {
	//var data = '?email=' + email;
	$.ajax({
		url: baseURL + 'api/login',
		method: 'POST',
		data: {
			email: email,
			password: password
		},
		success(res) {
			if (res.code == 200) {
				$('#login').hide();
				$('#add-url').show();
			}
		}
	})
}

function add(url, title, fav, email) {
	$.ajax({
		url: baseURL + 'api/add_url',
		method: 'GET',
		data: {
			url: url,
			title: title,
			fav: fav,
			email: email
		},
		success(res) {
			if (res.code == 200) {
				alert(res.msg);
			}
		}
	})
}