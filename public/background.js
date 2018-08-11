// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

//chrome.runtime.onInstalled.addListener(function() {
//  chrome.storage.sync.set({color: '#3aa757'}, function() {
//    console.log("The color is green.");
//  });
//});

chrome.webRequest.onBeforeRequest.addListener(function(details){
	console.log(details.url);
	var getLocation = function(href) {
		var l = document.createElement("a");
	   l.href = href;
	   return l;
	};
	var loc = getLocation(details.url);
	var re = new RegExp('\.eth(?:[:\/]|$)');
	if(re.test(loc.hostname)){				
		console.log(loc.hostname);
		var etherscanaddress = "https://etherscan.io/enslookup?q=" + loc.hostname;
		console.log(etherscanaddress);
		return {redirectUrl : etherscanaddress};
	}
}, {urls: ["<all_urls>"]}, ["blocking"]);
