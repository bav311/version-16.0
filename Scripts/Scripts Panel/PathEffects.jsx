//PathEffects.jsx
//An InDesign CS3 JavaScript
//
//Effects:
//Punk: Pushes the control handles on all of the points on the path toward the geometric center of the path.
//Bloat: Pushes the control handles on all of the points on the path away from the geometric enter of the path.
//PunkBloat: Pushes the left direction handle toward the center of the path and pushes the 
//right direction handle away from the center of the path.
//BloatPunk: Pushes the right direction handle toward the center of the path and pushes the left 
//direction handle away from the center of the path.
//Twirl: Pushes all right direction handles toward the center of the path and leaves the left direction handle unchanged.
//AntiTwirl: Pushes all left direction handles toward the center of the path and leaves the right direction handles unchanged.
//Retract All: Retracts all control handles.
//MakeRectangle: Converts the selected object to a rectangle.
//MakeOval: Converts the selected object to an oval.
//Turn on the Copy Path option to apply the effect to a duplicate of the selected path(s).
//
//Note that some settings for some of these effects are mathematically equivalent. For example, choosing Bloat and 
//setting the Distance from Center Point field to -50 is the same as choosing Punk and setting the Offset from 
//Center Point field to 50.
//
//For more on InDesign scripting, go to http://www.adobe.com/products/indesign/xml_scripting.html
//or visit the InDesign Scripting User to User forum at http://www.adobeforums.com
//
var myObjectList = new Array;
if (app.documents.length != 0){
	if (app.selection.length != 0){

		for(var myCounter = 0;myCounter < app.selection.length; myCounter++){
			switch (app.selection[myCounter].constructor.name){
				case "TextFrame":
				case "Rectangle":
				case "Oval":
				case "Polygon":
				case "GraphicLine":
					myObjectList.push(app.selection[myCounter]);
					break;
			}
		}
		if (myObjectList.length != 0){
			myDisplayDialog(myObjectList);
		}
		else{
			alert ("Please select a rectangle, oval, polygon, or graphic line and try again.");
		}
	}
	else{
		alert ("Please select an object and try again.");
	}
}
else{
	alert ("Please open a document, select an object, and try again.");
}
function myDisplayDialog(myObjectList){
	myDialog = app.dialogs.add({name:"PathEffects"});
	with(myDialog){
		with(dialogColumns.add()){
			with(borderPanels.add()){
				staticTexts.add({staticLabel:"Effect:"});
				var myPathEffectButtons = radiobuttonGroups.add();
				with(myPathEffectButtons){
					radiobuttonControls.add({staticLabel:"Punk", checkedState:true});
					radiobuttonControls.add({staticLabel:"Bloat"});
					radiobuttonControls.add({staticLabel:"PunkBloat"});
					radiobuttonControls.add({staticLabel:"BloatPunk"});
					radiobuttonControls.add({staticLabel:"Twirl"});
					radiobuttonControls.add({staticLabel:"AntiTwirl"});
					radiobuttonControls.add({staticLabel:"RetractAll"});
					radiobuttonControls.add({staticLabel:"MakeRectangle"});
					radiobuttonControls.add({staticLabel:"MakeOval"});
				}
			}
			with(borderPanels.add()){
				staticTexts.add({staticLabel:"Options:"});
				with (dialogColumns.add()){
					staticTexts.add({staticLabel:"Offset from Center Point:"});
					var myCopyPathCheckbox = checkboxControls.add({checkedState: false, staticLabel:"Copy Path"});
				}
				with (dialogColumns.add()){
					var myOffsetEditbox = percentEditboxes.add({editValue:50});
				}
			}
			staticTexts.add({staticLabel:"Refer to the script text for a description of the path effects."});
		}
	}
	var myReturn = myDialog.show();
	if (myReturn == true){
		//Get the values from the dialog box.
		var myEffectType = myPathEffectButtons.selectedButton;
		var myCopyPath = myCopyPathCheckbox.checkedState;
		var myOffset = myOffsetEditbox.editValue;
		myDialog.destroy();
		myPathEffect(myObjectList, myEffectType, myOffset, myCopyPath);
	}
	else{
		myDialog.destroy();
	}
}
function myPathEffect(myObjectList, myEffectType, myOffset, myCopyPath){
	//This function builds a list of all of the anchor point coordinates (and the control handle coordinates
	//for curved line segments) and puts them in an array. Once the coordinates have been calculates, we
	//set all of the point locations using the "entirePath" property. This is much faster than drawing
	//the path point-by-point.
	var myPathPoint, myAnchor, myX, myY, myX1, myY1, myX2, myY2, myX3, myY3, myXOffset, myYOffset, myPoint, myPathPoint, myPointArray
	for (var myObjectCounter = 0; myObjectCounter < myObjectList.length; myObjectCounter++){
		var myObject = myObjectList[myObjectCounter];
		if (myCopyPath == true){
			myObject = myObject.duplicate();
		}
		var myBounds = myObject.geometricBounds;
		var myXCenter = myBounds[1] + ((myBounds[3] - myBounds[1]) / 2);
		var myYCenter = myBounds[0] + ((myBounds[2] - myBounds[0]) / 2);
		//No need to process each path/path point for MakeRectangle and MakeOval.
		if(myEffectType >= 7){
			var myPointArray = new Array(4);
			if (myEffectType == 7){
				//Convert to rectangle.
				myPointArray[0] = [[myBounds[1], myBounds[0]], [myBounds[1], myBounds[0]], [myBounds[1], myBounds[0]]];	
				myPointArray[1] = [[myBounds[1], myBounds[2]], [myBounds[1], myBounds[2]], [myBounds[1], myBounds[2]]];	
				myPointArray[2] = [[myBounds[3], myBounds[2]], [myBounds[3], myBounds[2]], [myBounds[3], myBounds[2]]];	
				myPointArray[3] = [[myBounds[3], myBounds[0]], [myBounds[3], myBounds[0]], [myBounds[3], myBounds[0]]];
			}
			else{
				//Convert to oval.
				myMagicConstant = 0.552284746667;
				myXOffset = ((myBounds[3]-myBounds[1])/2)* myMagicConstant;
				myYOffset = ((myBounds[2]-myBounds[0])/2) * myMagicConstant;
				myPointArray[0] = [[myBounds[1], myYCenter-myYOffset], [myBounds[1], myYCenter], [myBounds[1], myYCenter + myYOffset]];	
				myPointArray[1] = [[myXCenter - myXOffset, myBounds[2]], [myXCenter, myBounds[2]], [myXCenter + myXOffset, myBounds[2]]];	
				myPointArray[2] = [[myBounds[3], myYCenter + myYOffset], [myBounds[3], myYCenter], [myBounds[3], myYCenter - myYOffset]];	
				myPointArray[3] = [[myXCenter + myXOffset, myBounds[0]], [myXCenter, myBounds[0]], [myXCenter - myXOffset, myBounds[0]]];	
			}
			myObject.paths.item(0).entirePath = myPointArray;	
		}
		else{
			//For all other path effects, process each path and every path point.
			for(var myPathCounter = 0; myPathCounter < myObject.paths.length; myPathCounter ++){
				var myPath = myObject.paths.item(myPathCounter);
				var myPointArray = new Array(myPath.pathPoints.length);
				for (var myPathPointCounter = 0; myPathPointCounter < myPath.pathPoints.length; myPathPointCounter ++){
					myPathPoint = myPath.pathPoints.item(myPathPointCounter);
					myAnchor = myPathPoint.anchor;
					myX1 = myAnchor[0];
					myY1 = myAnchor[1];
					myXOffset = myXCenter - myX1;
					myYOffset = myYCenter - myY1;
					myX = myXOffset * (myOffset*.01);
					myY = myYOffset * (myOffset*.01);
					//Calculate new path point values based on the path effect type.
					switch (myEffectType){
						case 0:
							//Punk effect.
							myX2 = myXCenter - myX;
							myY2 = myYCenter - myY;
							myPoint = [[myX2, myY2], myAnchor, [myX2, myY2]];
							break;
						case 1:
							//Bloat effect.
							myX2 = myX1 - myX;
							myY2 = myY1 - myY;
							myPoint = [[myX2, myY2], myAnchor, [myX2, myY2]];
							break;
						case 2:
							//PunkBloat effect.
							myX2 = myXCenter - myX;
							myY2 = myYCenter - myY;
							myX3 = myX1 - (myXOffset - myX);
							myY3 = myY1 - (myYOffset - myY);
							myPoint = [[myX2, myY2], myAnchor, [myX3, myY3]];
							break;
						case 3:
							//BloatPunk effect.
							myX2 = myXCenter - myX;
							myY2 = myYCenter - myY;
							myX3 = myX1 - (myXOffset - myX);
							myY3 = myY1 - (myYOffset - myY);
							myPoint = [[myX3, myY3], myAnchor, [myX2, myY2]];
							break;
						case 4:
							//Twirl effect.
							myX2 = myXCenter - myX;
							myY2 = myYCenter - myY;
							myX3 = myX1 - (((myX * Math.cos(90)) - (myY * Math.sin(90))));
							myY3 = myY1 - (((myX * Math.sin(90)) + (myY * Math.cos(90))));
							myPoint = [[myX3, myY3], myAnchor, [myX2, myY2]];
							break;
						case 5:
							//AntiTwirl effect.
							myX2 = myXCenter - myX;
							myY2 = myYCenter - myY;
							myX3 = myX1 - (((myX * Math.cos(90)) - (myY * Math.sin(90))));
							myY3 = myY1 - (((myX * Math.sin(90)) + (myY * Math.cos(90))));
							myPoint = [[myX2, myY2], myAnchor, [myX3, myY3]];
							break;
						case 6:
							//RetractAll effect.
							myPoint = [myAnchor, myAnchor, myAnchor];
							break;
					}
					myPointArray[myPathPointCounter] = myPoint;
				}
				myPath.entirePath = myPointArray;
			}
		}
	}
}