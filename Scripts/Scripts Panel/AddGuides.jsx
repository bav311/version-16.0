//AddGuides.jsx
//An InDesign CS3 JavaScript
/*  
@@@BUILDINFO@@@ "AddGuides.jsx" 1.0.0.0 15-August-2006 
*/
//This script draws guides around the selected object or objects.
//Choose Visible Bounds to consider the stroke weight of the paths when placing the guides, 
//or choose Geometric Bounds to ignore the stroke weight when placing the guides
//Choose Each Item to position the guides around individual items in the selection, 
//or Entire Selection to position the guides around the selection as a whole.
//
//For more information on InDesign scripting, go to http://www.adobe.com/products/indesign/scripting.html
//Or visit the InDesign Scripting User to User forum at http://www.adobeforums.com.
//
main();
function main(){
	var myObjectList = new Array;
	if (app.documents.length != 0){
		if (app.selection.length != 0){
			for(var myCounter = 0;myCounter < app.selection.length; myCounter++){
				switch (app.selection[myCounter].constructor.name){
					case "Rectangle":
					case "Oval":
					case "Polygon":
					case "TextFrame":
					case "Group":
					case "Button":
					case "GraphicLine":
						myObjectList.push(app.selection[myCounter]);
						break;
				}
			}
			if (myObjectList.length != 0){
				var myOldXUnits = app.documents.item(0).viewPreferences.horizontalMeasurementUnits;
				var myOldYUnits = app.documents.item(0).viewPreferences.verticalMeasurementUnits;
				app.documents.item(0).viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points;
				app.documents.item(0).viewPreferences.verticalMeasurementUnits = MeasurementUnits.points;
				//myDisplayDialog(myObjectList);
				myDisplayScriptUIDialog(myObjectList);
				app.documents.item(0).viewPreferences.horizontalMeasurementUnits = myOldXUnits;
				app.documents.item(0).viewPreferences.verticalMeasurementUnits = myOldYUnits;
			}
			else{
				alert ("Please select a page item and try again.");
			}
		}
		else{
			alert ("Please select an object and try again.");
		}
	}
	else{
 	   alert ("Please open a document, select an object, and try again.");
	}
}
function myDisplayDialog(myObjectList){
	var myRangeButtons, myBasedOnButtons;
	var myLabelWidth = 100;
	var myDialog = app.dialogs.add({name:"AddGuides"});
	with(myDialog){
		with(dialogColumns.add()){
			with(borderPanels.add()){
				staticTexts.add({staticLabel:"Add Guides At:"});
				with(dialogColumns.add()){					
					var myTopCheckbox = checkboxControls.add({staticLabel:"&Top", checkedState:true});
					var myLeftCheckbox = checkboxControls.add({staticLabel:"&Left", checkedState:true});
					var myBottomCheckbox = checkboxControls.add({staticLabel:"&Bottom", checkedState:true});
					var myRightCheckbox = checkboxControls.add({staticLabel:"&Right", checkedState:true});
					var myXCenterCheckbox = checkboxControls.add({staticLabel:"&Horizontal Center", checkedState:true});
					var myYCenterCheckbox = checkboxControls.add({staticLabel:"&Vertical Center", checkedState:true});
				}
			}
			with(borderPanels.add()){
				staticTexts.add({staticLabel:"Add Guides Around:"});
				with(myRangeButtons = radiobuttonGroups.add()){
					radiobuttonControls.add({staticLabel:"Each &Object", checkedState:true});
					radiobuttonControls.add({staticLabel:"Entire &Selection"});
				}
			}
			with(borderPanels.add()){
				with(dialogRows.add()){
					with(dialogColumns.add()){
						staticTexts.add({staticLabel:"Guides Based On:"});
					}
					with(dialogColumns.add()){
						with(myBasedOnButtons = radiobuttonGroups.add()){
							radiobuttonControls.add({staticLabel:"&Geometric Bounds", checkedState:true});
							radiobuttonControls.add({staticLabel:"V&isible Bounds"});
						}
					}
				}
				with(dialogRows.add()){
					with(dialogColumns.add()){
						staticTexts.add({staticLabel:"Horizontal Offset:", minWidth:myLabelWidth});
					}
					with(dialogColumns.add()){
						var myXOffsetField = measurementEditboxes.add({editValue:0, editUnits:MeasurementUnits.points});
					}
				}
				with(dialogRows.add()){
					with(dialogColumns.add()){
						staticTexts.add({staticLabel:"Vertical Offset:", minWidth:myLabelWidth});
					}
					with(dialogColumns.add()){
						var myYOffsetField = measurementEditboxes.add({editValue:0, editUnits:MeasurementUnits.points});
					}
				}
			}
		}
	}
	myReturn = myDialog.show();
	if (myReturn == true){
		//Get control values from the dialog box.
		var myTop = myTopCheckbox.checkedState;
		var myLeft = myLeftCheckbox.checkedState;
		var myBottom = myBottomCheckbox.checkedState;
		var myRight = myRightCheckbox.checkedState;
		var myXCenter = myXCenterCheckbox.checkedState;
		var myYCenter = myYCenterCheckbox.checkedState;
		var myBasedOn = myBasedOnButtons.selectedButton;
		var myRange = myRangeButtons.selectedButton;
		var myXOffset = myXOffsetField.editValue;
		var myYOffset = myYOffsetField.editValue;
		//Remove the dialog box from memory.
		myDialog.destroy();
		if(myTop+myLeft+myBottom+myRight+myXCenter+myYCenter !=0){
			myAddGuides(myTop, myLeft, myBottom, myRight, myXCenter, myYCenter, myRange, myBasedOn, myXOffset, myYOffset, myObjectList);
		}
		else{
			alert("No guides were specified.");
		}
	}
	else{
		//Remove the dialog box from memory.
		myDialog.destroy();
	}
}
function myDisplayScriptUIDialog(myObjectList){
	var myBasedOn, myRange;
	var myDialog = new Window('dialog', 'AddGuides');
	with(myDialog){
		alignChildren = 'fill';
		var myGuideTypesPanel = add('panel', undefined, "Add Guides At:");
		with(myGuideTypesPanel){
			orientation = 'column';
			alignChildren = 'left';
			margins = [12, 16, 12, 6];
			spacing = 4;
			myDialog.myTopCheckbox = add('checkbox', undefined, "Top");
			myDialog.myTopCheckbox.value = true;
			myDialog.myLeftCheckbox = add('checkbox', undefined, "Left");
			myDialog.myLeftCheckbox.value = true;
			myDialog.myBottomCheckbox = add('checkbox', undefined, "Bottom");
			myDialog.myBottomCheckbox.value = true;
			myDialog.myRightCheckbox = add('checkbox', undefined, "Right");
			myDialog.myRightCheckbox.value = true;
			myDialog.myXCenterCheckbox = add('checkbox', undefined, "Horizontal Center");
			myDialog.myXCenterCheckbox.value = true;
			myDialog.myYCenterCheckbox = add('checkbox', undefined, "Vertical Center");
			myDialog.myYCenterCheckbox.value = true;
		}
		var myGuideLocationPanel = add('panel', undefined, "Add Guides Around:");
		with(myGuideLocationPanel){
			orientation = 'column';
			alignChildren = 'left';
			margins = [12, 14, 12, 6];
			spacing = 4;
			myDialog.myEachObjectRadioButton = add('radiobutton', undefined, "Each Object");
			myDialog.myEachObjectRadioButton.value = true;
			myDialog.myEntireSelectionRadioButton = add('radiobutton', undefined, "Entire Selection");
		}
		var myGuidesBasedOnPanel = add('panel', undefined, "Add Guides Based On:");
		with(myGuidesBasedOnPanel){
			orientation = 'column';
			alignChildren = 'left';
			margins = [12, 14, 12, 6];
			spacing = 4;
			myDialog.myGeometricBoundsRadioButton = add('radiobutton', undefined, "Geometric Bounds");
			myDialog.myGeometricBoundsRadioButton.value = true;
			myDialog.myVisibleBoundsRadioButton = add('radiobutton', undefined, "Visible Bounds");
			with(add('group')){
				orientation = 'row';
				alignChildren = 'center';
				spacing = 2;
				with(add('group')){
					orientation = 'column';
					alignChildren = 'right';
					var myXOffsetLabel = add('statictext', undefined, "Horizontal Offset:");	
					var myYOffsetLabel = add('statictext', undefined, "Vertical Offset:");
				}
				with(add('group')){
					orientation = 'column';
					alignChildren = 'right';
					myDialog.myXOffsetField = add('edittext', undefined, "0", {enterKeySignalsOnChange:false});
					myDialog.myXOffsetField.characters = 7;
					myDialog.myXOffsetField.justify = "right";
					myXOffsetField.onChange = function(){
						if(myValidateNumber(myXOffsetField.text)==false){
							alert("Invalid numeric entry!");
							myDialog.myXOffsetField.text = "0";
						}
					}	
					myDialog.myYOffsetField = add('edittext', undefined, "0");
					myDialog.myYOffsetField.justify = "right";
					myDialog.myYOffsetField.characters = 7;
					myYOffsetField.onChange = function(){
						if(myValidateNumber(myYOffsetField.text)==false){
							alert("Invalid numeric entry!");
							myDialog.myYOffsetField.text = "0";
						}
					}	
				}
				with(add('group')){
					orientation = 'column';
					alignChildren = 'left';
					add('statictext', undefined, "points");
					add('statictext', undefined, "points");
				}
			}
		}
		with(add('group')){
			orientation = 'row';
			alignment = 'right';
			myDialog.myCloseButton = add('button', undefined, "Close", {name:'cancel'});
			myDialog.myCloseButton.onClick = function(){myDialog.close()};
			myDialog.myOKButton = add('button', undefined, "OK", {name:'ok'});
		}
	}
	var myReturn = myDialog.show();
	if (myReturn == true){
		//Get control values from the dialog box.
		with(myDialog){
			var myTop = myTopCheckbox.value;
			var myLeft = myLeftCheckbox.value;
			var myBottom = myBottomCheckbox.value;
			var myRight = myRightCheckbox.value;
			var myXCenter = myXCenterCheckbox.value;
			var myYCenter = myYCenterCheckbox.value;
			var myXOffset = parseFloat(myXOffsetField.text);
			var myYOffset = parseFloat(myYOffsetField.text);
			if(myGeometricBoundsRadioButton.value == true){
				myBasedOn = 0;
			}
			else{
				myBasedOn = 1;
			}
			if(myEachObjectRadioButton.value == true){
				myRange = 0;
			}
			else{
				myRange = 1;
			}
		}
		myDialog.close();
		if(myTop+myLeft+myBottom+myRight+myXCenter+myYCenter !=0){
			myAddGuides(myTop, myLeft, myBottom, myRight, myXCenter, myYCenter, myRange, myBasedOn, myXOffset, myYOffset, myObjectList);
		}
		else{
			alert("No guides were specified.");
		}
	}
	else{
		myDialog.close();
	}
}
function myAddGuides(myTop, myLeft, myBottom, myRight, myXCenter, myYCenter, myRange, myBasedOn, myXOffset, myYOffset, myObjectList){
	var myLayer, myCounter;
	var myOldRulerOrigin = app.activeDocument.viewPreferences.rulerOrigin;
	app.activeDocument.viewPreferences.rulerOrigin = RulerOrigin.spineOrigin;
	//Create a layer to hold the printers marks (if it does not already exist).
	myLayer = app.activeDocument.layers.item("Guides");
	try{
		myLayerName = myLayer.name;
	}
	catch (myError){
		myLayer = app.activeDocument.layers.add({name:"Guides"});
	}
	//Process the objects in the selection.		
	for(myCounter = 0; myCounter < myObjectList.length; myCounter ++){
		var myObject = myObjectList[myCounter];
		if (myBasedOn == 0){
			myBounds = myObject.geometricBounds;
		}
		else{
			myBounds = myObject.visibleBounds;
		}
		//Set up some initial bounding box values.
		if ((myRange != 0)&&(myCounter==0)){
			myX1 = myBounds[1];
			myY1 = myBounds[0];
			myX2 = myBounds[3];
			myY2 = myBounds[2];
		}
		if(myRange == 0){
			myDrawGuides (myBounds[1], myBounds[0], myBounds[3], myBounds[2], myTop, myLeft, myBottom, myRight, myXCenter, myYCenter, myLayer, myXOffset, myYOffset);
		}
		else{
			//Compare the bounds values to the stored bounds.
			//If a given bounds value is less than (for x1 and y1) or 
			//greater than (for x2 and y2) the stored value,
			//then replace the stored value with the bounds value.
			if (myBounds[0] < myY1){
				myY1 = myBounds[0];
			}
			if (myBounds[1] < myX1){
				myX1 = myBounds[1];
			}
			if (myBounds[2] > myY2){
				myY2 = myBounds[2];
			}
			if (myBounds[3] > myX2){
				myX2 = myBounds[3];
			}
		}
	}
	if(myRange != 0){
		myDrawGuides (myX1, myY1, myX2, myY2, myTop, myLeft, myBottom, myRight, myXCenter, myYCenter, myLayer, myXOffset, myYOffset);
	}
	app.activeDocument.viewPreferences.rulerOrigin = myOldRulerOrigin;
}
function myDrawGuides(myX1, myY1, myX2, myY2, myTop, myLeft, myBottom, myRight, myXCenter, myYCenter, myLayer, myXOffset, myYOffset){
	if (myTop == true){
		myDrawGuide(myY1 - myYOffset, 0);
	}
	if (myLeft == true){
		myDrawGuide(myX1 - myXOffset, 1);
	}
	if (myBottom == true){
		myDrawGuide(myY2 + myYOffset, 0);
	}
	if (myRight == true){
		myDrawGuide(myX2 + myXOffset, 1);
	}
	if (myXCenter == true){
		myDrawGuide(myX1+((myX2-myX1)/2), 1);
	}
	if (myYCenter == true){
		myDrawGuide(myY1+((myY2-myY1)/2), 0);
	}
}
function myDrawGuide(myGuideLocation, myGuideOrientation){
	var myLayer = app.activeDocument.layers.item("Guides");
	with(app.activeWindow.activeSpread){
		if(myGuideOrientation == 0){
			with (guides.add(myLayer, undefined, undefined)){
				orientation=HorizontalOrVertical.horizontal;
				location=myGuideLocation;
			}
		}
		else{
			with (guides.add(myLayer, undefined, undefined)){
				orientation=HorizontalOrVertical.vertical;
				location=myGuideLocation;
			}
		}
	}
}
function  myValidateNumber(myString){
	var myRegExp  =  /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/;
	return myRegExp.test(myString);
}