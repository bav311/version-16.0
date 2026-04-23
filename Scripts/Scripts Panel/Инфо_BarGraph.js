/*                               ______________________________________
                               |                                      |
                    _.---------|.--.       BarGraph.js v1.1           |
                 .-'  `       .'/  ``                                 |
              .-'           .' |    /|    www.sobolewski.biz          |
           .-'         |   /   `.__//                                 |
        .-'           _.--/        / e-mail: mariusz@sobolewski.biz   |
       |        _  .-'   /        /                                   |
       |     ._  \      /     `  /   © 2005 by Mariusz Sobolewski     |
       |        ` .    /     `  /                                     |
       |         \ \ '/        /______________________________________|
       |        - \  /        /
       |        '  .'        / 
       |          '         |.'
       |                    |  
       |                    |  
       |                    |.'
       |                    /
       |                   /
       |                  /
       )                 /|
    .▒/`-.              / |
   ▒▓▓▓▒. `-._         / /
  ▒▓▓▓▓▓▓▓▓▒. `-.     / /
 ▒▓▓▓▓▓▓▓▓▓▓▓▓▒. `.    /
▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒.`. /
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒.`.
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒.`.
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒.
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒.
▓▓█░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█'

*/

if (app.locale == 1279479916){ // Polish
var txt_locale_1 = "Nie masz otwartych dokument\u00f3w!";
var txt_locale_2 = "Zaznacz jeden lub wi\u0119cej prostok\u0105t\u00f3w.";
var txt_locale_3 = "Zaznacz jeden lub wi\u0119cej prostok\u0105t\u00f3w.";
var txt_locale_4 = "Wykres s\u0142upkowy";
var txt_locale_5 = "Warto\u015b\u0107 maksymalna:";
var txt_locale_6 = "Warto\u015b\u0107 s\u0142upka ";
}
else { // Default to English
var txt_locale_1 = "No documents are open!";
var txt_locale_2 = "Select one or more rectangles.";
var txt_locale_3 = "Select one or more rectangles.";
var txt_locale_4 = "Bar Graph";
var txt_locale_5 = "Max. value:";
var txt_locale_6 = "Value for bar ";
}


try{
       if (app.documents.length == 0){
		err(txt_locale_1);
	}
	if (app.documents.length != 0 && app.selection[0].constructor.name != "Rectangle"){
		err(txt_locale_2);
	}
}
catch(e){
	err(txt_locale_3);
}



var myRectangles = new Array();
for (i = 0; app.selection.length - 1 >= i; i++) {
myRectangles[i] = app.selection[i];
}
myRectangles.reverse();



var myDialog = app.dialogs.add({name:txt_locale_4,canCancel:true});
with(myDialog){
                with (dialogColumns.add()) {
			var myLabelA = staticTexts.add({staticLabel:txt_locale_5});
                        var mySpacer = staticTexts.add({staticLabel:"\u00A0"});
                        
                        var myLabel = new Array();
                        for (i = 0; app.selection.length - 1 >= i; i++) {
                        myLabel[i] = staticTexts.add({staticLabel:txt_locale_6 + (i+1) +":"});
                        }
                        
                        var mySpacer = staticTexts.add({staticLabel:"\u00A0"});
                        var CopyrightA = staticTexts.add({staticLabel:"\u00A9 2005 Mariusz Sobolewski"});
		}
		with (dialogColumns.add()) {
			var myMax_val = realEditboxes.add({editValue:0});
                        var mySpacer = staticTexts.add({staticLabel:"\u00A0"});
                        
                        var myBar_val = new Array();
                        for (i = 0; app.selection.length - 1 >= i; i++) {
                        myBar_val[i] = realEditboxes.add({editValue:0});
                        }
                        
                        var mySpacer = staticTexts.add({staticLabel:"\u00A0"});
                        var CopyrightB = staticTexts.add({staticLabel:"\u2022 www.sobolewski.biz"});
		}
}

// Display the dialog box.
if(myDialog.show() == true){

        
// MAX VALUE OF THE GRAPH:
var max_val = myMax_val.editValue;

// var max_val = myRectangleGeometricBounds[3] - myRectangleGeometricBounds[1];
var val_ratio = 100 / max_val;


for (i = 0; i < myRectangles.length; i++){

// geometricBounds array: 0 - top, 1 - left, 2 - bottom, 3 - right
var myRectGeomBounds = myRectangles[i].geometricBounds;

// CURRENT LENGTH OF THE SELECTED BAR:
var bar_full_length = myRectGeomBounds[3] - myRectGeomBounds[1];

// VALUE FOR THE SELECTED BAR:
var bar_val = myBar_val[i].editValue;

// Percentage of the full bar
var bar_length_percent = (bar_val * val_ratio) / 100;

// Actual length of the bar
bar_length_absolute = bar_length_percent * bar_full_length;

// Calculate new value for the right-side geometric bound
myRectGeomBounds[3] = myRectGeomBounds[3] - (myRectGeomBounds[3] - bar_length_absolute) + myRectGeomBounds[1];

myRectangles[i].geometricBounds = new Array(myRectGeomBounds[0], myRectGeomBounds[1], myRectGeomBounds[2], myRectGeomBounds[3]);
}

}
else{ 
myDialog.destroy()
}

// =========================================================================

function err(e){
	alert(e);
	exit();
}

/*
BarGraph.js
Copyright (C) 2005  Mariusz Sobolewski
e-mail: mariusz@sobolewski.biz
www.sobolewski.biz

This script is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This script is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/