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
		.replace(/[^`]?(<(p|h\d)>)&lt;-((?:(?!-&gt;)[\s\S])*?)&lt;-(<\/\2>)/gm, '<div class="text-left">$1$3$4</div>') //$1 = <p>, $2 = p (discarded), $3 = content, $4 = </p>
		//Text align right
		.replace(/[^`]?(<(p|h\d)>)-&gt;((?:(?!&lt;-)[\s\S])*?)-&gt;(<\/\2>)/gm, '<div class="text-right">$1$3$4</div>')
		//Text align center
		.replace(/[^`\n]?(<(p|h\d)>)-&gt;((?:(?!-&gt;)[\s\S])*?)&lt;-(<\/\2>)/gm, '<div class="text-center">$1$3$4</div>')
		//Text align justify
		.replace(/[^`]?(<(p|h\d)>)=&gt;([\s\S]*?)&lt;=(<\/\2>)/gm, '<div class="text-justify">$1$3$4</div>')
		//Underlined text.
		.replace(/~([\s\S]*?)~/g, "<u>$1</u>");
	
	//replace CODE with previously stocked code content
	data = data.replace(/__CODE__/g, function () {
		return codesTag.shift();
	});
	return data;
};

module.exports = plugin;