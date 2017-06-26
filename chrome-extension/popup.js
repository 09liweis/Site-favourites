const baseURL = 'https://favourite-site.herokuapp.com/';

var userId;

var url;
var title;
var fav;

window.onload = function() {

	chrome.storage.sync.get(['userId'], function(items){
		if (items.hasOwnProperty('userId')) {
			userId = items.userId;
		}
		if (typeof userId != 'undefined') {
			$('#login').hide();
			$('#add-url').show();
		}
	});

	$('#login').submit(function(e) {
		e.preventDefault();
		var email = $('#email').val();
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
				chrome.storage.sync.set({ "userId": res.user.id }, function(){
				});
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
			user_id: userId
		},
		success(res) {
			if (res.code == 200) {
				$('#add').html(res.msg);
			}
		}
	})
}