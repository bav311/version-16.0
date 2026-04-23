/* =========================================================================

NAME: textFrameDivider.jsx

AUTHOR: Oleg Butrin
HOMEPAGE: http://toolbox.rudtp.ru
DATE  : 07.06.2006 8:46

COMMENT: Script divide threaded text frames

RIGHT:
You have the right to use and distribute this script.
You have the right to modify this script for own needs. 
It is desirable to send the variant to the author of a script.
You have no right to distribute the modified script from author's name.
You have no right to have profit from sale of a script.

The author of a script does not sustain the responsibility in all cases of loss data and other kinds of losses if they have arisen in the time of using a script.
You use this script at your own fear and risk.

============================================================================ */

var langAlertNoDoc = localize({ru: "Нет открытых документов!"});
var langAlertNoText = localize({ru: "Не выбран текст!"});
var langAlertOnlySelected = localize({ru: "Отделить только выбранный фрейм?"});

var iniScriptName = "Text Frame Divider";
var iniScriptVersion = "1.0";

function divideFrame (myTextFrame) {
	var myDouble = myTextFrame.duplicate();
	var myText = myTextFrame.characters.itemByRange(0, myTextFrame.characters.length - 1);
	myText.remove();
	myTextFrame.remove();
}

function divideStory (myStory) {
	if (myStory.overflows) {
		var myOText = myStory.characters.itemByRange(myStory.textFrames.lastItem().characters.lastItem().index + 1, myStory.characters.lastItem().index);
		myOText.remove();
	}
	var myArray = new Array;
	var myLength = myStory.textFrames.length;
	for (var counter = 0; counter < myLength; counter++) {
		myArray.push(myStory.textFrames[counter])
	}
	myArray.reverse();
	for (var counter = 0; counter < myLength; counter++) {
		divideFrame(myArray[counter]);
	}
}

with (app) {
	try {
		var myDoc = activeDocument;
	} catch (error) {
		alert(langAlertNoDoc);
		exit();
	}
	try {
		var myStory = selection[0].parentStory;
	} catch (error) {
		alert(langAlertNoText);
		exit();
	}
	if (myStory.textFrames.length == 1) {
		exit();
	}
	if (selection[0].constructor.name == "TextFrame") {
		var myResult = confirm(langAlertOnlySelected, true, iniScriptName + " " + iniScriptVersion);
		if (myResult) {
			divideFrame(selection[0])
		} else {
			divideStory(myStory);
		}
	} else {
		divideStory(myStory);
	}
}