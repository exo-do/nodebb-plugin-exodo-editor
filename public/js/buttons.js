$('document').ready(function () {
	require(['composer', 'composer/controls'], function (composer, controls) {
		composer.addButton('fa fa-header', function (textarea, selectionStart, selectionEnd) {
			writeToTextarea(controls, textarea, selectionStart, selectionEnd, '### ', '');
		});
		composer.addButton('fa fa-list-ol', function (textarea, selectionStart, selectionEnd) {
			writeToTextarea(controls, textarea, selectionStart, selectionEnd, '\n1. ', '');
		});
		composer.addButton('fa fa-underline', function (textarea, selectionStart, selectionEnd) {
			writeToTextarea(controls, textarea, selectionStart, selectionEnd, '~', '~');
		});
		composer.addButton('fa fa-strikethrough', function (textarea, selectionStart, selectionEnd) {
			writeToTextarea(controls, textarea, selectionStart, selectionEnd, '~~', '~~', ' ');
		});
		composer.addButton('fa fa-file-image-o', function (textarea, selectionStart, selectionEnd) {
			writeToTextarea(controls, textarea, selectionStart, selectionEnd, '![](', ')', 'URL');
		});
		composer.addButton('fa fa-code', function (textarea, selectionStart, selectionEnd) {
			writeToTextarea(controls, textarea, selectionStart, selectionEnd, '```\n', '\n```\n');
		});
		composer.addButton('fa fa-quote-right', function (textarea, selectionStart, selectionEnd) {
			writeToTextarea(controls, textarea, selectionStart, selectionEnd, '@Usuario:\n> ', '\n\n');
		});
		//dont show this on mobile
		/*if ($('.userinfo').is(":visible") || $('.threadstats').is(":visible")) 
		{
		composer.addButton('fa fa-align-left out', function (textarea, selectionStart, selectionEnd) {
			writeToTextarea(controls, textarea, selectionStart, selectionEnd, '<-', '<-');
		});
		composer.addButton('fa fa-align-center out', function (textarea, selectionStart, selectionEnd) {
			writeToTextarea(controls, textarea, selectionStart, selectionEnd, '->', '<-');
		});
		composer.addButton('fa fa-align-right out', function (textarea, selectionStart, selectionEnd) {
			writeToTextarea(controls, textarea, selectionStart, selectionEnd, '->', '->');
		});
		composer.addButton('fa fa-align-justify out', function (textarea, selectionStart, selectionEnd) {
			writeToTextarea(controls, textarea, selectionStart, selectionEnd, '=>', '<=');
		});
		}
		*/
	});

	function writeToTextarea(controls, textarea, selectionStart, selectionEnd, tagStart, tagEnd, tagExample) {
		if (selectionStart === selectionEnd) {
			//No hay texto seleccionado
			tagExample = tagExample || '';
			controls.insertIntoTextarea(textarea, tagStart + tagExample + tagEnd);
		} else {
			//Englobamos el texto seleccionado
			tagExample = '';
			controls.wrapSelectionInTextareaWith(textarea, tagStart, tagEnd);
		}
		//Situamos el cursor en mitad del tag
		controls.updateTextareaSelection(textarea, selectionStart + tagStart.length, selectionEnd + tagStart.length + tagExample.length);
	}

	$(window).on('action:composer.loaded', function (data) {
		$('.composer:not(:last)').remove(); //Eliminamos cualquier editor anterior
		var $toolbar = $('.formatting-bar');
		setTimeout(function () {
			//Reordenamos un poco la toolbar
			$toolbar.find('span:has(.fa-italic)').after($('span:has(.fa-strikethrough)')).after($('span:has(.fa-underline)'));
			$toolbar.find('span:has(.fa-cloud-upload)').after($('span:has(.fa-link)')).after($('span:has(.fa-file-image-o)'));
			$toolbar.find('span:has(.fa-list)').after($('span:has(.fa-list-ol)'));
			$toolbar.find('.help').appendTo($toolbar);
		}, 0);
	});

});