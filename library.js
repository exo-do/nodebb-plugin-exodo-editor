"use strict";

var plugin = {};

plugin.parse = function (data, callback) {

	if (data && typeof data === 'string') {
		//preview
		data = parser(data);
	} else if (data.postData && data.postData.content) {
		//post
		data.postData.content = parser(data.postData.content);
	} else if (data.userData && data.userData.signature) {
		//signature
		data.userData.signature = parser(data.userData.signature);
	}

	callback(null, data);
};

function parser(data) {

	//create a variable to capture code content
	var codesTag = [];
	//replace all codes tags by a var we can use in a regex later
	data = data.replace(/(?:<pre>.*?<\/pre>|<code>.*?<\/code>)/g, function (match) {
		codesTag.push(match);
		return '__CODE__';
	});
	//do the replace on the whole
	data = data
		//Handle line breaks inside a paragraph.
		.replace(/([^>]+)\n/g, "$1<br>")
		//Text align left
		.replace(/[^`]?(<(?:p|h\d)>)&lt;-([\s\S]*?)&lt;-(<\/(?:p|h\d)>)/gm, '$1<p class="text-left">$2</p>$3')
		//Text align right
		.replace(/[^`]?(<(?:p|h\d)>)-&gt;([\s\S]*?)-&gt;(<\/(?:p|h\d)>)/gm, '$1<p class="text-right">$2</p>$3')
		//Text align center
		.replace(/[^`\n]?(<(?:p|h\d)>)-&gt;([\s\S]*?)&lt;-(<\/(?:p|h\d)>)/gm, '$1<p class="text-center">$2</p>$3')
		//Text align justify
		.replace(/[^`]?(<(?:p|h\d)>)=&gt;([\s\S]*?)&lt;=(<\/(?:p|h\d)>)/gm, '$1<p class="text-justify">$2</p>$3')
		//Underlined text.
		.replace(/~([\s\S]*?)~/g, "<u>$1</u>");
	
	//replace CODE with previously stocked code content
	data = data.replace(/__CODE__/g, function () {
		return codesTag.shift();
	});
	return data;
};

module.exports = plugin;