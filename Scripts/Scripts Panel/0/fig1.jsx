#target indesign
main();
function main(){
    //$.localize = true;
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
	var myObjectList = new Array;
	if (app.documents.length != 0){
		if (app.selection.length != 0){

			for(var myCounter = 0; myCounter < app.selection.length; myCounter++){
				if(app.selection[myCounter].constructor.name == "Rectangle") {
                    myObjectList.push(app.selection[myCounter]);
                    }                
                } // for
			if (myObjectList.length != 0){
                 myStart(myObjectList);
			}
			else{
				alert ("Пожалуйста выделите прямоугольник(и) и запустите скрипт снова");
			}
		}
		else{
			alert ("Пожалуйста выделите прямоугольник(и) и запустите скрипт снова");
		}
	}
	else{
		alert ("Пожалуйста откройте документ, выделите прямоугольник и запустите скрипт снова");
	}
}// main


function myStart(myObjectList)
{
var myObject;
var myDocument = app.activeDocument;
with (myDocument.viewPreferences){
	// Сохраняем старые единицы измерения в переменных myOldXUnits, myOldYUnits
	var myOldXUnits = horizontalMeasurementUnits;
	var myOldYUnits = verticalMeasurementUnits;
	// Устанавливаем новые единицы измерения
	horizontalMeasurementUnits = MeasurementUnits.points;
	verticalMeasurementUnits = MeasurementUnits.points;
}

  app.activeWindow.transformReferencePoint = AnchorPoint.centerAnchor;
     // начало цикла по всем объектам
    for (var myObjectCounter = 0; myObjectCounter < myObjectList.length; myObjectCounter++){
        myObject = myObjectList[myObjectCounter];
        myTrasform(myObject);
    }

// Возврат первоначальных единиц измерения на линейках
with (myDocument.viewPreferences){
	try{
		horizontalMeasurementUnits = myOldXUnits;
		verticalMeasurementUnits = myOldYUnits;
	}
	catch(myError){
		alert("Could not reset custom measurement units.");
	}
}
}// fnc


function myTrasform(myObj)
{
    
var myBounds = myObj.geometricBounds;
var myW = myBounds[3] - myBounds[1]; // ширина прямоугольника
var myH = myBounds[2] - myBounds[0]; // высота прямоугольника
var Xcorner = 12;
var Ycorner = 12;
var Y1corner = 15
var X1corner = 15
var Ystep = 55;
var Y0=15;
//myYsteps = Math.ceil(     (myH-2*Ycorner)/Ystep   );
var myYsteps = Math.floor(     (myH-2*Y1corner)/Ystep   );
var Xstep = 55;
var myXsteps = Math.floor(    ( myW-2*X1corner)/Xstep  );
var X0=15;

  
          for(var myPathCounter = 0; myPathCounter < myObj.paths.length; myPathCounter ++){
            var myPath = myObj.paths.item(myPathCounter); // текущий path
            var myPointArray = new Array();   // массив точек текущего path
            
            myPoint=[       [myBounds[1]+2.9, myBounds[0]+0.16],   [    myBounds[1], myBounds[0]    ], [   myBounds[1]+0.16, myBounds[0]+2.9 ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]-1.5, myBounds[0]+5.6],   [    myBounds[1]+0.7, myBounds[0] + 8.   ], [   myBounds[1]+2, myBounds[0]+9.4 ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]+2, myBounds[0]+11],   [    myBounds[1]+0, myBounds[0] + 12   ], [   myBounds[1]-2, myBounds[0]+13 ]     ];
            myPointArray.push(myPoint);
                       
           for(var i =0; i< myYsteps; i++)
            {
            myPoint=[       [myBounds[1]-2, myBounds[0]+Y0-0.9 + Ystep*i],   [    myBounds[1], myBounds[0] + Y0 +Ystep*i  ], [   myBounds[1]+1.5, myBounds[0]+Y0+0.6+Ystep*i ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]+1.5, myBounds[0]+Y0+2 + Ystep*i],   [    myBounds[1], myBounds[0] + Y0+3 + Ystep*i  ], [   myBounds[1]-3, myBounds[0]+Y0+4.9 + Ystep*i]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]-3, myBounds[0]+Y0+6.2 + Ystep*i],   [    myBounds[1], myBounds[0] + Y0+10 + Ystep*i  ], [   myBounds[1]+2.8, myBounds[0]+Y0+13.5+ Ystep*i ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]+2.8, myBounds[0]+Y0+19.2 +Ystep*i],   [    myBounds[1], myBounds[0] + Y0+22 + Ystep*i  ], [   myBounds[1]-3, myBounds[0]+Y0+25 +Ystep*i ]     ];
            myPointArray.push(myPoint);       

            myPoint=[       [   myBounds[1]-3, myBounds[0]+Y0+25.6 + Ystep*i] ,   [    myBounds[1], myBounds[0] + Y0+28 +Ystep*i   ], [myBounds[1]+1.5, myBounds[0]+Y0+29.3+Ystep*i ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]+1.5, myBounds[0]+Y0+30+Ystep*i ],   [    myBounds[1], myBounds[0] + Y0+32+Ystep*i    ], [   myBounds[1]-3.3, myBounds[0]+Y0+36+Ystep*i  ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]-3.4, myBounds[0]+Y0+43.7+Ystep*i ],   [    myBounds[1], myBounds[0] + Y0+47 +Ystep*i   ], [   myBounds[1]+1.5, myBounds[0]+Y0+48.6+Ystep*i  ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]+2.8, myBounds[0]+Y0+50.5+Ystep*i ],   [    myBounds[1], myBounds[0] + Y0+52 +Ystep*i   ], [   myBounds[1]-1.5, myBounds[0]+Y0+52.8 +Ystep*i ]     ];
            myPointArray.push(myPoint);

          }
      
            var Y00 = Y0+Ystep*myYsteps;
            //alert(myYsteps);
            //alert(Y00)
                                   
           myPoint=[       [myBounds[1]-2, myBounds[0]+Y00-1],   [    myBounds[1], myBounds[0] + Y00   ], [   myBounds[1]+2.1, myBounds[0]+Y00+1 ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]+2, myBounds[0]+Y00+2.54],   [    myBounds[1]+0.7, myBounds[0] + Y00+4  ], [   myBounds[1]-1.5, myBounds[0]+Y00+6.4 ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]+0.17, myBounds[0]+Y00+9],   [    myBounds[1], myBounds[0] + Y00 +12   ], [   myBounds[1]+3.2, myBounds[0]+Y00+11.8 ]     ];
            myPointArray.push(myPoint); 
            
            
            var Y000 = Y00 +  Ycorner;
            //alert(Y000)
            
            //oint=[       [myBounds[1]+0.16, myBounds[0]+Y000-3.14],   [    myBounds[1], myBounds[0] + Y000   ], [   myBounds[1]+2.9, myBounds[0]+Y000-0.16 ]     ];
            //myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]+5.6, myBounds[0]+Y000+1.5],   [    myBounds[1]+8, myBounds[0] + Y000-0.7  ], [   myBounds[1]+9.5, myBounds[0]+Y000-2 ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]+11, myBounds[0]+Y000-2],   [    myBounds[1]+12, myBounds[0] + Y000   ], [   myBounds[1]+13, myBounds[0]+Y000+2 ]     ];
            myPointArray.push(myPoint);

            for(var i =0; i< myXsteps; i++)
            {
                myPoint=[  [myBounds[1]+X0-0.9+Xstep*i, myBounds[0]+Y000+2],   [    myBounds[1] + X0 + Xstep*i, myBounds[0] + Y000  ], [   myBounds[1]+X0 + 0.6 + Xstep*i, myBounds[0]+Y000-1.5 ]     ];
                myPointArray.push(myPoint);
                
                myPoint=[  [myBounds[1]+X0+2+Xstep*i, myBounds[0]+Y000-1.5],   [    myBounds[1] +3 + X0 + Xstep*i, myBounds[0] + Y000  ], [   myBounds[1]+X0 + 4.9+ Xstep*i, myBounds[0]+Y000+3]     ];
                myPointArray.push(myPoint);
                
                myPoint=[  [myBounds[1]+X0+6.2+Xstep*i, myBounds[0]+Y000+3],   [    myBounds[1] +10 + X0 + Xstep*i, myBounds[0] + Y000  ], [   myBounds[1]+X0 + 13.5 + Xstep*i, myBounds[0]+Y000-2.7]     ];
                myPointArray.push(myPoint);
                
                 myPoint=[  [myBounds[1]+X0+19.2+Xstep*i, myBounds[0]+Y000-2.7],   [    myBounds[1] +22 + X0 + Xstep*i, myBounds[0] + Y000  ], [   myBounds[1]+X0 + 24.9+ Xstep*i, myBounds[0]+Y000+3]     ];
                myPointArray.push(myPoint);
                
                myPoint=[  [myBounds[1]+X0+25.6 +Xstep*i, myBounds[0]+Y000+3],   [    myBounds[1] +28 + X0 + Xstep*i, myBounds[0] + Y000  ], [   myBounds[1]+X0 + 29.3+ Xstep*i, myBounds[0]+Y000-1.5]     ];
                myPointArray.push(myPoint);
                //6
                myPoint=[  [myBounds[1]+X0+30.1+Xstep*i, myBounds[0]+Y000-1.5],   [    myBounds[1] +32 + X0 + Xstep*i, myBounds[0] + Y000  ], [   myBounds[1]+X0 + 36.2+ Xstep*i, myBounds[0]+Y000+3.4]     ];
                myPointArray.push(myPoint);
                //7
                myPoint=[  [myBounds[1]+X0+43.7+Xstep*i, myBounds[0]+Y000+3.4],   [    myBounds[1] +47 + X0 + Xstep*i, myBounds[0] + Y000  ], [   myBounds[1]+X0 + 48.6+ Xstep*i, myBounds[0]+Y000-1.5]     ];
                myPointArray.push(myPoint);
                //8
                myPoint=[  [myBounds[1]+X0+50.5+Xstep*i, myBounds[0]+Y000-2.7],   [    myBounds[1] +52 + X0 + Xstep*i, myBounds[0] + Y000 ], [   myBounds[1]+X0 + 52.8+ Xstep*i, myBounds[0]+Y000+1.5]     ];
                myPointArray.push(myPoint);
        
                
                
            }
            var X00= X0+Xstep*myXsteps;
            
            //myPoint=[       [myBounds[1]+X00-1, myBounds[0]+Y000+2],   [    myBounds[1]+X00, myBounds[0] + Y000    ], [   myBounds[1]+X00+1, myBounds[0]+Y000-2 ]     ];
            //myPointArray.push(myPoint); 
            
            myPoint=[       [myBounds[1]+X00+2.5, myBounds[0]+Y000-2],   [    myBounds[1]+X00+4, myBounds[0] + Y000 -0.7    ], [   myBounds[1]+X00+6.4, myBounds[0]+Y000+1.5 ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]+X00+9.1, myBounds[0]+Y000-0.2],   [    myBounds[1]+X00+12, myBounds[0] + Y000    ], [   myBounds[1]+X00+11.8, myBounds[0]+Y000-3.2 ]     ];
            myPointArray.push(myPoint);
            
            var X000 = X00 +  Xcorner;
            //alert(X000);
            
            myPoint=[       [myBounds[1]+X000+1.5, myBounds[0]+Y000-5.6],   [    myBounds[1]+X000-0.7, myBounds[0] + Y000 -8   ], [   myBounds[1]+X000-2, myBounds[0]+Y000-9.5 ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]+X000-2, myBounds[0]+Y000-11],   [    myBounds[1]+X000, myBounds[0] + Y000  -12  ], [   myBounds[1]+X000+2, myBounds[0]+Y000-13 ]     ];
            myPointArray.push(myPoint);
            
            Y00 = Y000 - Y0;
             for(var i =0; i< myYsteps; i++)
            {
            myPoint=[       [myBounds[1]+X000+1.5, myBounds[0]+Y00+0.8 - Ystep*i],   [    myBounds[1]+X000, myBounds[0] + Y00 -Ystep*i  ], [   myBounds[1]+X000-2.8, myBounds[0]+Y00-1.5-Ystep*i ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]+X000-1.5, myBounds[0]+Y00-3.4 - Ystep*i],   [    myBounds[1]+X000, myBounds[0] + Y00-5 -Ystep*i  ], [   myBounds[1]+X000+3.4, myBounds[0]+Y00-8.3-Ystep*i ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]+X000+3.35, myBounds[0]+Y00-15.8 - Ystep*i],   [    myBounds[1]+X000, myBounds[0] + Y00 -20-Ystep*i  ], [   myBounds[1]+X000-1.5, myBounds[0]+Y00-21.9-Ystep*i ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]+X000-1.5, myBounds[0]+Y00-22.7 - Ystep*i],   [    myBounds[1]+X000, myBounds[0] + Y00 -24-Ystep*i  ], [   myBounds[1]+X000+3, myBounds[0]+Y00-26.4-Ystep*i ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]+X000+3, myBounds[0]+Y00-27.1 - Ystep*i],   [    myBounds[1]+X000, myBounds[0] + Y00 -30-Ystep*i  ], [   myBounds[1]+X000-2.76, myBounds[0]+Y00-32.8-Ystep*i ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]+X000-2.8, myBounds[0]+Y00-38.5 - Ystep*i],   [    myBounds[1]+X000, myBounds[0] + Y00 -42-Ystep*i  ], [   myBounds[1]+X000+3, myBounds[0]+Y00-45.8-Ystep*i ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]+X000+3, myBounds[0]+Y00-47.1 - Ystep*i],   [    myBounds[1]+X000, myBounds[0] + Y00 -49-Ystep*i  ], [   myBounds[1]+X000-1.5, myBounds[0]+Y00-50-Ystep*i ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]+X000-1.5, myBounds[0]+Y00-51.4 - Ystep*i],   [    myBounds[1]+X000, myBounds[0] + Y00 -52-Ystep*i  ], [   myBounds[1]+X000+2, myBounds[0]+Y00-52.9-Ystep*i ]     ];
            myPointArray.push(myPoint);
            
            
            }
            
            myPoint=[       [myBounds[1]+X000+2, myBounds[0]+13],   [    myBounds[1]+X000,  myBounds[0] +12  ], [   myBounds[1]+X000-2, myBounds[0]+11 ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]+X000-2, myBounds[0]+9.5],   [    myBounds[1]+X000-0.72, myBounds[0]+8  ], [   myBounds[1]+X000+1.5, myBounds[0]+5.6 ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]+X000-0.17, myBounds[0]+2.9],   [    myBounds[1]+X000, myBounds[0]  ], [   myBounds[1]+X000-3.2, myBounds[0]+0.15 ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]+X000-5.62, myBounds[0]-1.5],   [    myBounds[1]+X000-8, myBounds[0] +0.72 ], [   myBounds[1]+X000-9.5, myBounds[0]+2 ]     ];
            myPointArray.push(myPoint);
            
            myPoint=[       [myBounds[1]+X000-11, myBounds[0]+2],   [    myBounds[1]+X000-12, myBounds[0]  ], [   myBounds[1]+X000-13, myBounds[0]-2 ]     ];
            myPointArray.push(myPoint);
            
            X00=X000-X0;
            
            
            //i=0;
            for(var i =myXsteps-1; i >=0 ; i--)
            {
                myPoint=[  [myBounds[1]+X0+ Xstep*i +52.9, myBounds[0]-2],   [    myBounds[1] + X0 + Xstep*i+52, myBounds[0] ],    [   myBounds[1]+X0 + Xstep*i +51.4, myBounds[0]+1.47 ]     ];
                myPointArray.push(myPoint);
                
                myPoint=[  [myBounds[1]+X0+ Xstep*i +50, myBounds[0]+1.5],   [    myBounds[1] + X0 + Xstep*i+49, myBounds[0] ],    [   myBounds[1]+X0 + Xstep*i +47.1, myBounds[0]-3 ]     ];
                myPointArray.push(myPoint);
                
                myPoint=[  [myBounds[1]+X0+ Xstep*i +45.8, myBounds[0]-3],   [    myBounds[1] + X0 + Xstep*i+42, myBounds[0] ],    [   myBounds[1]+X0 + Xstep*i +38.5, myBounds[0]+2.73 ]     ];
                myPointArray.push(myPoint);
                
                myPoint=[  [myBounds[1]+X0+ Xstep*i +32.8, myBounds[0]+2.7],   [    myBounds[1] + X0 + Xstep*i+30, myBounds[0] ],    [   myBounds[1]+X0 + Xstep*i +27.1, myBounds[0]-3 ]     ];
                myPointArray.push(myPoint);
                
                myPoint=[  [myBounds[1]+X0+ Xstep*i +26.4, myBounds[0]-3],   [    myBounds[1] + X0 + Xstep*i+24, myBounds[0] ],    [   myBounds[1]+X0 + Xstep*i +22.7, myBounds[0]+1.5 ]     ];
                myPointArray.push(myPoint);
                
                myPoint=[  [myBounds[1]+X0+ Xstep*i +21.9, myBounds[0]+1.5],   [    myBounds[1] + X0 + Xstep*i+20, myBounds[0] ],    [   myBounds[1]+X0 + Xstep*i +15.8, myBounds[0]-3.4 ]     ];
                myPointArray.push(myPoint);
                
                myPoint=[  [myBounds[1]+X0+ Xstep*i +8.32, myBounds[0]-3.4],   [    myBounds[1] + X0 + Xstep*i+5, myBounds[0] ],    [   myBounds[1]+X0 + Xstep*i +3.4, myBounds[0]+1.5 ]     ];
                myPointArray.push(myPoint);
                
                myPoint=[  [myBounds[1]+X0+ Xstep*i +1.5, myBounds[0]+2.7],   [    myBounds[1] + X0 + Xstep*i, myBounds[0] ],    [   myBounds[1]+X0 + Xstep*i -0.8, myBounds[0]-1.5 ]     ];
                myPointArray.push(myPoint);
                
                }
            
                myPoint=[  [myBounds[1]+13, myBounds[0]-2],   [    myBounds[1] + 12, myBounds[0] ],    [   myBounds[1]+11, myBounds[0]+2 ]     ];
                myPointArray.push(myPoint);
                
                myPoint=[  [myBounds[1]+9.5, myBounds[0]+2],   [    myBounds[1] + 8, myBounds[0] +0.72 ],    [   myBounds[1]+5.6, myBounds[0]-1.5 ]     ];
                myPointArray.push(myPoint);
            


            
            myPath.entirePath = myPointArray;
            } // for
    
 myObj.geometricBounds=myBounds;   
} //fnc