chrome.tabs.getSelected(null,function(tab) {
	var tablink = tab.url;
	console.log(tablink);
});
console.log('test');