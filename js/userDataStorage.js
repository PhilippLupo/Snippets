/**
 * Storage for IE7
 * LocalStorage Polyfill
 *
 * @param maxage
 * @constructor
 */
function UserDataStorage(maxage)  {
	var memory = document.createElement("div");
	memory.style.display = "none";
	memory.style.behavior = "url('#default#userData')";
	document.body.appendChild(memory);
	if (maxage) {
		var now = new Date().getTime();
		var expires = now + maxage * 1000;
		memory.expires = new Date(expires).toUTCString();
	}
	memory.load("UserDataStorage");
	this.getItem = function(key) {
		return memory.getAttribute(key) || null;
	};
	this.setItem = function(key, value) {
		memory.setAttribute(key,value);
		memory.save("UserDataStorage");
	};
	this.removeItem = function(key) {
		memory.removeAttribute(key);
		memory.save("UserDataStorage");
	};
}
UserDataStorage.testLocalStorage = function testLocalStorage() {
	try {
		localStorage.setItem(mod, mod);
		localStorage.removeItem(mod);
		return true;
	} catch(e) {
		return false;
	}
};

if(!UserDataStorage.testLocalStorage()) {
	window.localStorage = window.localStorage || (window.UserDataStorage && new UserDataStorage());
}