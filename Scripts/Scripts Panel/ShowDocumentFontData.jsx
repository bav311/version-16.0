//DESCRIPTION: Show document fonts and their type
// Peter Kahrel
// Update to support fonts.adobe fonts by Tim Sheasby
// The update adds (AF) suffix to the Adobe Fonts listing

#targetengine showfonts;

(function () {
	
	var sizeCache = {};

	function getTypeSizes (font) {
		
		var size;
		var sizes = [];
		var known = {};
		
		app.findGrepPreferences = null;
		app.findGrepPreferences.appliedFont = app.documents[0].fonts.item (font);
		
		var props = app.findChangeGrepOptions.properties;
		var p = app.findChangeGrepOptions;
		for (var i in p) {
			if (i.indexOf('include') === 0) {
				p[i] = true;
			}
		}
		
		var ranges = app.documents[0].findGrep();
		app.findChangeGrepOptions.properties = props;

		for (var i = ranges.length-1; i >= 0; i--) {
			size = ranges[i].pointSize;
			if (!known[size]) {
				sizes.push (size.toFixed(3).replace(/\.?0+$/, ''));
				known[size] = true;
			}
		}

		sizes.sort (function (a, b) {return a - b});
		sizes = sizes.join (', ');
		
		if (!sizeCache[font]) {
			sizeCache[font] = sizes;
		}

		return sizes;
	}

	//-----------------------------------------------------------------

	function showDetails (fontname) {  
		var script = {
			'0': 'Roman',
			'1': 'Japanese',
			'2': 'Chinese (traditional)',
			'3': 'Korean',
			'4': 'Arabic',
			'5': 'Hebrew',
			'6': 'Greek',
			'7': 'Russian',
			'8': 'RSymbol',
			'9': 'Devanagari',
			'10': 'Gurmukhi',
			'11': 'Gujarati',
			'12': 'oriya',
			'13': 'Bengali',
			'14': 'Tamil',
			'15': 'telegu',
			'16': 'Kannada',
			'17': 'Malayalam',
			'18': 'Sinhalese',
			'19': 'Burmese',
			'20': 'Khmer',
			'21': 'Thai',
			'22': 'Laotian',
			'23': 'Georgian',
			'24': 'Armenian',
			'25': 'Chinese (simplified)',
			'26': 'Tibetan',
			'27': 'Mongolian',
			'28': 'Geez',
			'29': 'Slavic',
			'30': 'Vietnamese',
			'31': 'Sindhi'
		};

		function getObject() {
			var i;
			var arr = [];
			var p = app.fonts.item(fontname).properties;
			var ignore = {parent: true, index: true};
			for(i in p) {
				if (!ignore[i]) {
					arr.push ({
							key: i, 
							value: p[i] instanceof Enumerator ? String (p[i]) : p[i]
						});
				}
			}
			arr.sort (function (a,b) {return a.key > b.key});
			return arr;
		}


		//if (app.selection.length > 0 && app.selection[0].hasOwnProperty('appliedFont')) {
			var props = getObject();
			var w = new Window ('dialog')
			w.text = 'Font properties (' + fontname.replace('\t', ' ') + ')';
			//var w = new Window ('dialog {text: "Font properties"}');
			w.list = w.add ('listbox', undefined, '', {numberOfColumns: 2, columnWidths: [-1, 400]});
			for (var i = 0; i < props.length; i++) {
				with (w.list.add ('item', props[i].key)) {
						switch (props[i].key) {
							case 'writingScript': subItems[0].text = props[i].value + ' ' + ('('+script[props[i].value]+')' || ''); break;
							case 'fontType': subItems[0].text = props[i].value === 'ATC' ? 'Composite' : props[i].value; break;
							default: subItems[0].text = props[i].value;
						}
				}
			}
			w.sizes = w.list.add ('item', 'Sizes');
			w.sizes.subItems[0].text = sizeCache[fontname] || getTypeSizes (fontname);
			w.show(); 
		//}
	};

	//-----------------------------------------------------------------
	
	function main() {
		var s = [];
		var f = app.documents[0].fonts.everyItem().getElements();
		function typekit (f) {
			if (f.location.indexOf ('Typekit') > 0) {
				return ' (TK)';
			}
			if (f.location.indexOf ('Adobe Fonts') > 0) {
				return ' (AF)';
			}
			return '';
		}
		
		for (var i = 0; i < f.length; i++) {
			try {
				s.push (f[i].name + '\t' + String (f[i].fontType) + typekit (f[i]) + '\t' + String (f[i].status));
			} catch (_) {
				s.push (f[i].name + '\t' + '———————' + '\t' + String (f[i].status));
			}
		}
		s.sort();
		
		//var w = new Window ('palette {text: "Document fonts", alignChildren: "right", properties: {closeButton: false}}');
		var w = new Window ('palette {text: "Document fonts", alignChildren: "right"}');
			w.dummy = w.add ('group')
			var list = w.dummy.add ('listbox', undefined, undefined, {
				numberOfColumns: 4, 
				showHeaders: true, 
				columnTitles: ['Typeface', 'Style', 'Type', 'Status'],
				columnWidths: [150, 100, 150, 120], 
				multiselect: true
			});		
			list.maximumSize.height = w.maximumSize.height - 300;
			
			w.buttons = w.add ('group');
				w.details = w.buttons.add ('button {text: "Details"}');
				w.store = w.buttons.add ('button {text: "Save"}');
				//w.close = w.buttons.add ('button {text: "Close", properties: {name: "cancel"}}');
			
			var i, j, list_item, parts;
			for (i = 0; i < s.length; i++){
				parts = s[i].split('\t');
				list_item = list.add ('item', parts[0]);
				for (j = 1; j < parts.length; j++) {
					list_item.subItems[j-1].text = parts[j];
				}
			}

			w.store.onClick = function () {
				var outfile = File('~/Desktop/ShowFonts.txt');
				outfile.encoding = 'UTF-8';
				outfile.open ('w'); 
				outfile.write ('FONT\tSTYLE\tTYPE\tSTATUS\r');  
				outfile.write (s.join('\r')); 
				outfile.close(); 
				outfile.execute();
			}
		
			list.onChange = function () {
				w.details.enabled = list.selection;
			}

			w.details.onClick = function () {
				showDetails (list.selection[0].text + '\t' + list.selection[0].subItems[0].text);
			}
		
			w.onShow = function () {
				w.details.enabled = false;
			}
			
			// This doesn't work...
			//w.close.onClick = function () {
			//	w.close();
			//}
		
		w.show();
	}

	main();
}());

/*
Font types: ATC, Bitmap, CID, OCF, OpenType CCF, OpentType CID, OpenType TT, Truetype, Type 1, or Unknown.
Font statuses: Fauxed, Installed, Not available, Substituted, or Unknown.
*/