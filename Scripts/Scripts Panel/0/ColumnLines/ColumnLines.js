/* =========================================================================

InDesign ExtendScript

NAME: ColumnLines.js
VERSION: 1.2

AUTHOR: Vitaly Batushev
DATE  : 19.08.2004

DESCRIPTION:
Скрипт рисует линии между колонками на страницах и
в текстовых фреймах.


SUPPORT: http://indesign.rudtp.ru
E-MAIL: vbatushev@indesign.rudtp.ru

============================================================================ */
var ScriptName = app.activeScript.name.substr(0, app.activeScript.name.length - 3);
var ScriptVersion = "1.2";

//=== Language Default ====================================================	
		var strNoOpenDocuments = "No open documents";
		var strNoLayoutWindow = "Open Layout Window!";
		var strLineColor = "Color of Line";
		var strLineTint = "Tint of Color";
		var strTopIndent = "Top Indent";
		var strBottomIndent = "Bottom Indent";
		var strLineWidth = "Width of Line";
		var strWithInsets = "With Insets or Margins";
		var strDeleteOldLines = "Delete Old Lines";
						
//=== End Language Default ====================================================	

	var myIniFile = new File (app.activeScript.path + "/" + ScriptName + ".ini");
	if (!myIniFile.exists) {
		crtini = CreateINI(ScriptName, ScriptVersion);
		eval ("//@include \'" + ScriptName + ".ini\';");
	} else {
		eval ("//@include \'" + ScriptName + ".ini\';");
	}
	var myLangFile = new File (app.activeScript.path + "/" + iniLangFile);
	if (!myLangFile.exists) {
	} else {
		eval ("//@include \'" + iniLangFile + "\';");
	}
if (ScriptVersion != iniScriptVersion) {
	SaveINI(ScriptName, ScriptVersion);
}

with (app) {
	if (documents.length < 1) {
		alert(strNoOpenDocuments);
		exit();
	}
	if (activeWindow.constructor.name != 'LayoutWindow') {
		alert(strNoLayoutWindow);
		exit();
	}
	
	var myNoneSwatch = activeDocument.swatches.item("None");
	
	var mySwatchList = new Array(app.activeDocument.swatches.length);
	for(i = 0; i < app.activeDocument.swatches.length; i++){
		mySwatch = app.activeDocument.swatches.item(i);
		mySwatchList[i] = mySwatch.name;
	}

	
	var myDlg = dialogs.add({name: ScriptName + ' v.' + iniScriptVersion});
	
	with (myDlg) {
		with (dialogColumns.add()) {
			with (dialogRows.add()) {
				staticTexts.add({staticLabel:strLineColor});
				var ddColorLine = dropdowns.add({stringList:mySwatchList, selectedIndex:2});
			}
			with (dialogRows.add()) {
				staticTexts.add({staticLabel:strLineTint});
				var peColorTint = percentEditboxes.add({editValue:100, minWidth:50});
				staticTexts.add({staticLabel:strLineWidth});
				var reLineWidth = realEditboxes.add({editValue:0.25, minWidth:40});
			}
			 with (dialogRows.add()) {
				staticTexts.add({staticLabel:strTopIndent});
				var reTopIndent = realEditboxes.add({editValue:0, minWidth:40});
				staticTexts.add({staticLabel:strBottomIndent});
				var reBottomIndent = realEditboxes.add({editValue:0, minWidth:40});
			}
				var chkWithInsets = checkboxControls.add({staticLabel:strWithInsets, checkedState:true});
				var chkDeleteOldLines = checkboxControls.add({staticLabel:strDeleteOldLines, checkedState:true});
		}	
	}
	result = myDlg.show();
	
	if (result == false) {
		myDlg.destroy();
		exit();
	}
	
	if (selection.length < 1) {
		DrawLinesOnPage(myNoneSwatch, ddColorLine.stringList[ddColorLine.selectedIndex], peColorTint.editValue, reLineWidth.editValue, reTopIndent.editValue, reBottomIndent.editValue, chkWithInsets.checkedState, chkDeleteOldLines.checkedState);
	} else {
		if (selection[0].constructor.name == 'Text') {
			var  myTextFrame = selection[0].parentTextFrame;
			DrawLinesOnFrame(myTextFrame, myNoneSwatch, ddColorLine.stringList[ddColorLine.selectedIndex], peColorTint.editValue, reLineWidth.editValue, reTopIndent.editValue, reBottomIndent.editValue, chkWithInsets.checkedState, chkDeleteOldLines.checkedState);			
			exit();
		}
		for (j = 0; j < selection.length; j++) {
			if (selection[j].constructor.name == 'TextFrame') {
				var myTextFrame = selection[j];
				if (myTextFrame.textFramePreferences.textColumnCount > 1) {
					DrawLinesOnFrame(myTextFrame, myNoneSwatch, ddColorLine.stringList[ddColorLine.selectedIndex], peColorTint.editValue, reLineWidth.editValue, reTopIndent.editValue, reBottomIndent.editValue, chkWithInsets.checkedState, chkDeleteOldLines.checkedState);
				}
			}
		}
	}

}

function DrawLinesOnFrame(myFrame, ColorNone, ColorLine, TintLine, LineWidth, TopIndent, BottomIndent, ToMargin, delOld) {
with (app) {
	var myPage = activeWindow.activePage;
	var myCurSwatch = activeDocument.swatches.item(ColorLine);
	
	var frmID = myFrame.id;
	
	if (delOld == true) {
		if (myPage.graphicLines.length != 0) {
			var myGLarray = new Array();
			for (j = myPage.graphicLines.length - 1; j > -1; j--) {
				if (myPage.graphicLines[j].label == 'ForFrame' + frmID) {
					myGLarray.push(myPage.graphicLines[j]);
				}
			}
			
			for (j = 0; j < myGLarray.length; j++) {
					myGLarray[j].remove();
			}			
			
		}
	}
	
	var myFrameBounds = new Array();
	var myFrameBounds  = myFrame.geometricBounds;
	var colCount = myFrame.textFramePreferences.textColumnCount;
	var colGutt = myFrame.textFramePreferences.textColumnGutter;
	if (ToMargin == true) {
		if (myFrame.textFramePreferences.insetSpacing.length != 4) {
			var mrTop = myFrame.textFramePreferences.insetSpacing + TopIndent;
			var mrBottom = myFrame.textFramePreferences.insetSpacing + BottomIndent;
		} else {
			var mrTop = myFrame.textFramePreferences.insetSpacing[0] + TopIndent;
			var mrBottom = myFrame.textFramePreferences.insetSpacing[2] + BottomIndent;
		}
	} else {
			var mrTop = TopIndent;
			var mrBottom = BottomIndent;
	}
		if (myFrame.textFramePreferences.insetSpacing.length != 4) {
			var mrLeft = myFrame.textFramePreferences.insetSpacing;
			var mrRight = myFrame.textFramePreferences.insetSpacing;
		} else {
			var mrLeft = myFrame.textFramePreferences.insetSpacing[1];
			var mrRight = myFrame.textFramePreferences.insetSpacing[3];
		}
	var linesCount  = colCount - 1;

	var FrameWidth = (myFrameBounds[3] - (myFrameBounds[1] + mrLeft + mrRight));
	var FrameHeight = (myFrameBounds[2] - (myFrameBounds[0] + mrTop + mrBottom));
	var ColWidth = (FrameWidth - (colGutt*linesCount))/colCount;
	
	for (i = 0; i < linesCount; i++) {
		LinePos = mrLeft + ((ColWidth*(i + 1)) + (colGutt/2)*(i + 1 + i)) + myFrameBounds[1];
		myBounds = [myFrameBounds[0] + mrTop, LinePos,myFrameBounds[2] - mrBottom, LinePos];
		myPage.graphicLines.add(undefined, undefined, undefined,{strokeWeight:LineWidth, fillColor:ColorNone, strokeColor:myCurSwatch, strokeTint:TintLine, geometricBounds:myBounds, label:'ForFrame' + frmID});
	}
}
}

function DrawLinesOnPage(ColorNone, ColorLine, TintLine, LineWidth, TopIndent, BottomIndent, ToMargin, delOld) {
with (app) {
	var myPage = activeWindow.activePage;
	var myCurSwatch = activeDocument.swatches.item(ColorLine);
	var myCurLayer = activeWindow.activeLayer.name;
	
	myLayer = app.activeDocument.layers.item("Columns Lines");
	try{
		myLayerName = myLayer.name;
		if (delOld == true) {
			app.activeDocument.layers.item("Columns Lines").remove();
			myLayer = app.activeDocument.layers.add({name:"Columns Lines"});
		}
	}
	catch (myError){
		myLayer = app.activeDocument.layers.add({name:"Columns Lines"});
	}
	
	var myPageMarginPref = myPage.marginPreferences;
	var colCount = myPageMarginPref.columnCount;
	var colGutt = myPageMarginPref.columnGutter;
	if (ToMargin == true) {
		var mrTop = myPageMarginPref.top + TopIndent;
		var mrBottom = myPageMarginPref.bottom + BottomIndent;
	} else {
		var mrTop = TopIndent;
		var mrBottom = BottomIndent;
	}
	var mrLeft = myPageMarginPref.left;
	var mrRight = myPageMarginPref.right;
	var linesCount  = colCount - 1;
	
	var myPageBounds = new Array();
	myPageBounds = myPage.bounds;
	var PageWidth = (myPageBounds[3] - (myPageBounds[1] + mrLeft + mrRight));
	var PageHeight = (myPageBounds[2] - (myPageBounds[0] + mrTop + mrBottom));
	var ColWidth = (PageWidth - (colGutt*linesCount))/colCount;
	
	for (i = 0; i < linesCount; i++) {
		LinePos = mrLeft + ((ColWidth*(i + 1)) + (colGutt/2)*(i + 1 + i));
		myBounds = [myPageBounds[0] + mrTop, LinePos,myPageBounds[2] - mrBottom, LinePos];
		myPage.graphicLines.add(myLayer, undefined, undefined,{strokeWeight:LineWidth, fillColor:ColorNone, strokeColor:myCurSwatch, strokeTint:TintLine, geometricBounds:myBounds});
	}
	activeWindow.activeLayer= activeDocument.layers.item(myCurLayer);
}
}

function CreateINI(nScriptName, nScriptVersion) {	
	var myNewINIfile = new File (app.activeScript.path + "/" + nScriptName + ".ini");
	myNewINIfile.open("w");
	var myINI = "var iniScriptName = \"" + nScriptName + "\";\n";
	myINI = myINI + "var iniScriptVersion = \"" + nScriptVersion + "\";\n";
	myINI = myINI + "var iniLangFile = \"" + nScriptName + ".ru.slang" + "\";\n";
	myNewINIfile.write(myINI);
	myNewINIfile.close();	
	myINI = undefined;
	return CreateINI;
}
function SaveINI(nScriptName, nScriptVersion) {	
	var mySaveINIfile = new File (app.activeScript.path + "/" + nScriptName + ".ini");
	mySaveINIfile.open("w");
	var myINI = "var iniScriptName = \"" + nScriptName + "\";\n";
	myINI = myINI + "var iniScriptVersion = \"" + nScriptVersion + "\";\n";
	myINI = myINI + "var iniLangFile = \"" + iniLangFile + "\";\n";
	mySaveINIfile.write(myINI);
	mySaveINIfile.close();
	myINI = undefined;
	return SaveINI;
}