/* =========================================================================

NAME: TFManager

AUTHOR: Oleg Butrin (obutrin@indesign.rudtp.ru)
HOMEPAGE: http://indesign.rudtp.ru
DATE  : 13.02.2005 19:08

COMMENT:
Script search file names in the selected story and replace him to inline file contents

RIGHT:
You have the right to use and distribute this script.
You have the right to modify this script for own needs. 
It is desirable to send the variant to the author of a script.
You have no right to distribute the modified script from author's name.
You have no right to have profit from sale of a script.

The author of a script does not sustain the responsibility in all cases of loss data and other kinds of losses if they have arisen in the time of using a script.
You use this script at your own fear and risk.

============================================================================ */
app.scriptPreferences.version = 3;
with (app) {
	var iniFile = new File (activeScript.path+ "/TFManager.ini");
	if (iniFile.exists) {
		eval ("//@include \'TFManager.ini\';");
	} else {
		alert("Can\'t open ini file!");
		exit();
	}	
	var myLangFile = new File (activeScript.path + "/" + iniLangFile);
	if (myLangFile.exists) {
		eval ("//@include \'" + iniLangFile + "\';");
	} else {
		alert ("Cant open lang file!");
		exit();
	}	
	if (documents.length < 1) {
		alert(langNoDoc);
		exit();
	}
	if (selection.length != 1) {
		alert(langNoObj);
		exit();
	}
	try {
		var myStory = selection[0].parentStory;
		var myStoryId = myStory.id;
	} catch (err) {
		alert(langNoObj);
		exit();
	}
	var myDoc = activeDocument;
	var mySelObject = selection[0];
	var myDocPref = myDoc.documentPreferences;
	var myDocViewPref = myDoc.viewPreferences;
	
	var myDocUtinsHorisontal = myDocViewPref.horizontalMeasurementUnits;
	var myDocUtinsVertical = myDocViewPref.verticalMeasurementUnits;
	
	myDoc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points;
	myDoc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.points;
	
	var myMaxHeight = myDocPref.pageHeight;
	var myMaxWidth = myDocPref.pageWidth;
	
	myDoc.undo();
	myDoc.undo();
	
	var myDialog = dialogs.add({name:iniScriptName + " " + iniSriptVersion});
	with (myDialog.dialogColumns.add()) {
		with (borderPanels.add()) {
			with (dialogColumns.add()) {
				dialogRows.add().staticTexts.add({staticLabel:langFilesOptions});
				with (borderPanels.add().dialogColumns.add()) {
					var mySelectNames = dialogRows.add().radiobuttonGroups.add();
					with (mySelectNames) {
						radiobuttonControls.add({staticLabel:langLongNames});
						radiobuttonControls.add({staticLabel:langShortNames, checkedState:true});
					}
					var mySelectURI = dialogRows.add().checkboxControls.add({staticLabel:langURIEncoded});
					with (dialogRows.add()) {
						with (dialogColumns.add()) {
							dialogRows.add().staticTexts.add({staticLabel:langTagBefore});
							dialogRows.add().staticTexts.add({staticLabel:langTagAfter});
						}
						with (dialogColumns.add()) {
							var mySelectTagBefore = dialogRows.add().textEditboxes.add({editContents:iniTagBefore, minWidth:50});
							var mySelectTagAfter = dialogRows.add().textEditboxes.add({editContents:iniTagAfter, minWidth:50});
						}						
					}
				}
			}
			with (dialogColumns.add()) {
				dialogRows.add().staticTexts.add({staticLabel:langManageOptions});
				with (borderPanels.add().dialogColumns.add()) {
					with (dialogRows.add()) {
						with (dialogColumns.add()) {
							var mySelectPersent = dialogRows.add().checkboxControls.add({staticLabel:langPercent, checkedState:true});
							var mySelectHeight = dialogRows.add().checkboxControls.add({staticLabel:langMaxHeight, checkedState:true});
							var mySelectWidth = dialogRows.add().checkboxControls.add({staticLabel:langMaxWidth, checkedState:true});
						}						
						with (dialogColumns.add()) {
							var mySelectPercentValue = dialogRows.add().percentEditboxes.add({editValue:100, minimumValue:1, maximumValue:200, largeNudge:5, smallNudge:1, minWidth:70});
							var mySelectHeightValue = dialogRows.add().measurementEditboxes.add({editUnits:myDocUtinsHorisontal, minimumValue:10, maximumValue:myMaxHeight, editValue:myMaxHeight / 2, largeNudge:.5, smallNudge:1, minWidth:70});
							var mySelectWidthValue = dialogRows.add().measurementEditboxes.add({editUnits:myDocUtinsVertical, minimumValue:10, maximumValue:myMaxWidth, editValue:myMaxWidth / 2, largeNudge:.5, smallNudge:1, minWidth:70});
						}						
					}					
				}
				dialogRows.add().staticTexts.add({staticLabel:"\u00A9 Oleg Butrin"});
				dialogRows.add().staticTexts.add({staticLabel:"http://indesign.rudtp.ru"});
			}
		}
	}
	var myResult = myDialog.show();
	if (!myResult) {
		myDialog.destroy();
		exit();
	}
	var myFolder = Folder.selectDialog(langSelectFolder);
	if (!myFolder) {
		alert(langFolderNotSelect);
		myDialog.destroy();
		exit();
	}
	var myFiles = myFolder.getFiles("*");
	var myFileErrorsCount = 0;
	var myPlaceErrorsCount = 0;
	findPreferences = null;
	replacePreferences = null;
	for (myCounter = 0; myCounter < myFiles.length; myCounter++) {
		if (myFiles[myCounter].constructor.name != "File") {
			continue;			
		}
		if (mySelectNames.selectedButton == 0) {
			if (mySelectURI.checkedState) {
				var myFileName = myFiles[myCounter].fullName;
			} else {
				var myFileName = myFiles[myCounter].fsName;
			}
		} else {
			if (mySelectURI.checkedState) {
				var myFileName = myFiles[myCounter].name;
			} else {
				var myFileName = decodeURI(myFiles[myCounter].name);
			}
		}
		var myFindString = mySelectTagBefore.editContents + String(myFileName) + mySelectTagAfter.editContents;
		var myFindResult = myStory.search(myFindString, undefined, false);
		if (myFindResult.length > 0) {
			myFindResult.reverse();
			try {
				var myPage = activeWindow.activePage;
				var myPlacePoint = new Array(0,0)
				var myPlacedObject = myPage.place(myFiles[myCounter], myPlacePoint, undefined, false, false, true, true);
				if (myPlacedObject.parent.contentType == ContentType.graphicType) {
					myObject = myPlacedObject.parent;
					var myResizeContent = true;
					if (mySelectPersent.checkedState) {
						myObject.resize(mySelectPercentValue.editValue, mySelectPercentValue.editValue, AnchorPoint.topLeftAnchor, false, myResizeContent, false);
					}
					if ((mySelectHeight.checkedState) && ((myObject.visibleBounds[2] - myObject.visibleBounds[0]) > mySelectHeightValue.editContents)) {
						var myHeigthPercent = (mySelectHeightValue.editContents * 100 / (myObject.visibleBounds[2] - myObject.visibleBounds[0]));
						myObject.resize(myHeigthPercent, myHeigthPercent, AnchorPoint.topLeftAnchor, false, myResizeContent, false);
					}
					if ((mySelectWidth.checkedState) && ((myObject.visibleBounds[3] - myObject.visibleBounds[1]) > mySelectWidthValue.editContents)) {
						var myWidthPercent = (mySelectWidthValue.editContents * 100 / (myObject.visibleBounds[3] - myObject.visibleBounds[1]));
						myObject.resize(myWidthPercent, myWidthPercent, AnchorPoint.topLeftAnchor, false, myResizeContent, false);
					}

				} else {
					myObject = myPlacedObject.textFrames[0];
					var myResizeContent = false;
					if ((mySelectHeight.checkedState)) {
						var myHeigthPercent = (mySelectHeightValue.editContents * 100 / (myObject.visibleBounds[2] - myObject.visibleBounds[0]));
					}
					if ((mySelectWidth.checkedState)) {
						var myWidthPercent = (mySelectWidthValue.editContents * 100 / (myObject.visibleBounds[3] - myObject.visibleBounds[1]));
					}
					myObject.resize(myWidthPercent, myHeigthPercent, AnchorPoint.topLeftAnchor, false, myResizeContent, false);
				}
				myObject.select(SelectionOptions.replace);
				cut();
			} catch (err) {
				myFileErrorsCount++;
				continue;
			}
			for (myCount = 0; myCount < myFindResult.length; myCount++) {
				myFindResult[myCount].select(SelectionOptions.replace);
				try {
					paste();
				} catch (err) {
					myPlaceErrorsCount++;
				}
			}
		}
	}
	findPreferences = null;
	replacePreferences = null;
	mySelObject.select(SelectionOptions.replace);
	if ((myFileErrorsCount != 0) || (myPlaceErrorsCount != 0)) {
		alert(langAllDone + "\n" + String(myFileErrorsCount) + " " + langPlaceErrors + "\n" + String(myPlaceErrorsCount) + " " + langReplaceErrors);
	} else {
		alert(langAllDone);
	}
	myDialog.destroy();
	exit();
}