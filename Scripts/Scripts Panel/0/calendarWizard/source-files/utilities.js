/* --------------------------------------------------------------- //
   Calendar Wizard Utility: Fit Calendar To Frame 

   Authored by by Scott Selberg
   April 3, 2006

   Subversion Revision: $Revision: 157 $
   Author: $Author: sselberg $
   Subversion Head URL: $HeadURL: svn+ssh://sselberg@svn.code.sf.net/p/calendarwizard/code/trunk/calendarWizard.js $
// --------------------------------------------------------------- */
function fitCalendarToFrame( settings )
{
   var alignCalendars = new Array();
   var result;
   var result2;
   var result3;
   var originalPreferences;
   var knownCalendars;
   var masterLabelPrefix;

   knownCalendars = findCalendars( settings ).sort();
   knownCalendars.unshift("All");

   result = findSelectedFrame( settings, knownCalendars );
   if( !result.bCalendarFound )
   {
      result2 = selectCalendarGUI( settings, knownCalendars );
      if( result2.dialogResult ){
         
         result3 = identifyTargetAndMasterCalendars( settings, knownCalendars, result2 );
         alignCalendars = result3.alignCalendars;
         masterLabelPrefix = result3.masterLabelPrefix;

         for( i = 0; i < alignCalendars.length; i++ ){
            originalPreferences = setViewPreferences( null );
            if( settings.bFitLineCalendarToFrameWithSquareCells ){
               fitLineCalendarWithSquareCells( alignCalendars[i], masterLabelPrefix )
            } else {
               fitCalendar( alignCalendars[i], masterLabelPrefix )
            }
            setViewPreferences( originalPreferences );
         }   
      }
   } else {
      masterLabelPrefix = "calendar" + result.masterType;
      alignCalendars[0] = result.masterIndex;
      originalPreferences = setViewPreferences( null );
      if( settings.bFitLineCalendarToFrameWithSquareCells ){
         fitLineCalendarWithSquareCells( alignCalendars[0], masterLabelPrefix )
      } else {
         fitCalendar( alignCalendars[0], masterLabelPrefix )
      }
      setViewPreferences( originalPreferences );
   }
   return;
}
// --------------------------------------------------------------- //
function realignCalendarTables( settings )
{
   var alignCalendars = new Array();
   var result;
   var result2;
   var result3;
   var originalPreferences;
   var knownCalendars;
   var masterLabelPrefix;
   var i;

   knownCalendars = findCalendars( settings ).sort();
   knownCalendars.unshift("All");

   result = findSelectedFrame( settings, knownCalendars );
   if( !result.bCalendarFound )
   {
      result2 = selectCalendarGUI( settings, knownCalendars );
      if( result2.dialogResult ){
         result3 = identifyTargetAndMasterCalendars( settings, knownCalendars, result2 );
         alignCalendars = result3.alignCalendars;
         masterLabelPrefix = result3.masterLabelPrefix;
         for( i = 0; i < alignCalendars.length; i++ ){
            resizeCalendar( settings, masterLabelPrefix, alignCalendars[i] );
         }
      }
   } else {
      masterLabelPrefix = "calendar" + result.masterType;
      resizeCalendar( settings, masterLabelPrefix, result.masterIndex );
   }
   return;
}
// --------------------------------------------------------------- //
function fitLineCalendarWithSquareCells( calendarIndex, masterLabelPrefix )
{
   var myDocument = app.activeDocument;
   var frame1 = myDocument.textFrames.item( masterLabelPrefix + calendarIndex );
   var table1 = frame1.tables.firstItem();
   var frameBounds = frame1.geometricBounds;
   var columns;
   var rows;
   var cellHeight;
   var cellWidth;
   var strokeHeight;
   var strokeWidth;

   // if no cells of the table are visible, getting the columns or rows will fail, 
   // we try to get the cells, if we can't get them, we shrink them and try again.
   enlargeFrameTillTableIsVisible( frame1 );
   columns = table1.columns;
   rows    = table1.rows;
   strokeHeight = getStroke( calendarIndex );
   strokeWidth  = strokeHeight;
   
   if( rows.length <= 2 || columns.length <= 2 ){
      if( rows.length <= 2 ){
         // horizontal calendar
         cellWidth = ((frameBounds[3] - frameBounds[1] - strokeHeight)/(rows.firstItem().cells.length));
         cellHeight = cellWidth;

         if( (frameBounds[2] - frameBounds[0] - strokeHeight) <  ( cellHeight * rows.length ) ){
            frameBounds[2] = frameBounds[0] + (rows.length * cellHeight) + strokeHeight;
         }
      } else if( columns.length <= 2 ){
         // vertical calendar
         cellHeight = ((frameBounds[2] - frameBounds[0] - strokeHeight)/(columns.firstItem().cells.length));
         cellWidth = cellHeight;
         
         if( (frameBounds[3] - frameBounds[1] - strokeWidth) < ( cellWidth * columns.length ) ){
            frameBounds[3] = frameBounds[1] + (columns.length * cellWidth) + strokeHeight;
         }
      }

      rows.firstItem().cells.everyItem().width = cellWidth;
      columns.firstItem().cells.everyItem().height = cellHeight;

      frame1.geometricBounds = frameBounds;
      resizeCalendar( settings, masterLabelPrefix, calendarIndex );
   } else {
      alert( "This is only appropriate for the Line Calendar" );
   }

}
// --------------------------------------------------------------- //
function fitCalendar( calendarIndex, masterLabelPrefix )
{
   var myDocument = app.activeDocument;
   var frame1 = myDocument.textFrames.item( masterLabelPrefix + calendarIndex );
   var table1 = frame1.tables.firstItem();
   var frameBounds = frame1.geometricBounds;
   var i;
   var j;
   var columns;
   var myCells;
   var workWeekCellWidth = 0.25;
   var cellHeight;
   var cellWidth;
   var strokeHeight;
   var strokeWidth;

   var firstRowLabel;
   var secondRowLabel;
   var startOnRow = 2;
   var metaRows = 2;
   var bGridCalendar = true;
   var bLineCalendar = false;
   var bListCalendar = false;
   var usedFrameWidth = 0;

   // if no cells of the table are visible, getting the columns or rows will fail, 
   // we try to get the cells, if we can't get them, we shrink them and try again.

   enlargeFrameTillTableIsVisible( frame1 );
   columns = table1.columns;
   rows    = table1.rows;
   strokeHeight = getStroke( calendarIndex );
   strokeWidth  = strokeHeight;
   myCells = columns.firstItem().cells;
   frameColumns  = frame1.textFramePreferences.textColumnCount;
   frameGutter   = frame1.textFramePreferences.textColumnGutter;
 
   if( settings.bCS ){
      // Note, CS (Verion 3) does not support the label property, so we just ask
      metaRows = getCountOfMetaRows( settings )
   } else if( table1.columns.length == 1 || table1.rows.length == 1){
      // Line Calendar
      metaRows = 0;
      bGridCalendar = false;
      bListCalendar = false;
      bLineCalendar = true;
   } else if( frameColumns > 1 || (table1.rows.length > 10 &&  table1.columns.length > 2 )){
      // List Calendar
      bGridCalendar = false;
      bListCalendar = true;
      bLineCalendar = false;
      metaRows = 0;
   } else if( table1.rows.length <= 2 || table1.columns.length <= 2 ){
      // Could be a Line or List Calndar
      bIsLineCalendar = getIsLineCalendar( settings );

      bGridCalendar = false;
      metaRows = 0;
      if( bIsLineCalendar ){ 
         bListCalendar = false;
         bLineCalendar = true;
      } else {
         bListCalendar = true;
         bLineCalendar = false;
      }
   } else {
      // Grid Calendar
      firstRowLabel = table1.rows.item(0).cells.item(0).label;
      secondRowLabel = table1.rows.item(1).cells.item(0).label;

      if( secondRowLabel == "WeekDayName" ){
         metaRows = 2;
      } else if( firstRowLabel == "MonthName" || firstRowLabel == "WeekDayName" ){
         metaRows = 1;
      } else{
         metaRows = getCountOfMetaRows( settings )
      }
   }
       
   if( bListCalendar ){
      startOnRow = 0;
      frameHeight   = (frameBounds[2]-frameBounds[0]);
      frameColumns  = frame1.textFramePreferences.textColumnCount;
      frameGutter   = frame1.textFramePreferences.textColumnGutter;
      rowsPerColumn = rows.length/frameColumns;
      cellHeight = (frameHeight-strokeWidth)/rowsPerColumn;
   } else {
      if( metaRows == 2 ){
         cellHeight = ((frameBounds[2] - frameBounds[0] - myCells[0].height - myCells[1].height  - strokeHeight)/(myCells.length - 2));
         startOnRow = 2;
      } else if( metaRows == 1 ) {
         cellHeight = ((frameBounds[2] - frameBounds[0] - myCells[0].height - strokeHeight)/(myCells.length - 1));
         startOnRow = 1;
      } else {
         cellHeight = ((frameBounds[2] - frameBounds[0] - strokeHeight)/(myCells.length));
         startOnRow = 0;
      }
   }

   for( i = startOnRow; i < myCells.length; i++ ){
      myCells[i].height = cellHeight;
   }

   myCells = table1.rows.lastItem().cells;
   if( bListCalendar ){
      if( frameColumns > 1 ){
         availableFrameWidth = ((frameBounds[3] - frameBounds[1]) - ((frameColumns - 1) * frameGutter) )/frameColumns;
      } else {
         availableFrameWidth = (frameBounds[3] - frameBounds[1]) - strokeWidth;
      }

      for( i = 0; i < (myCells.length - 1); i++ ){
         usedFrameWidth += myCells.item( i ).width;
      }
      if( (availableFrameWidth - usedFrameWidth) > 0 ){
         myCells[ myCells.length - 1 ].width = availableFrameWidth - usedFrameWidth;
      } else {
         alert( "The sum of the table column widths are wider than the available frame column width.  The calendar does not fit in the frame." );
      }
   } else if( columns.length == 8 ) {
      for( i = 0; i < columns.length; i++ ) {
         if( i == 0 ) {
            cellWidth = workWeekCellWidth;
         } else {
            cellWidth = ((frameBounds[3] - frameBounds[1] - strokeWidth - workWeekCellWidth)/(myCells.length - 1));
         }

         cells = columns[i].cells;
         for( j = 0; j < cells.length; j++ ) {
            myCells[i].width = cellWidth;
         }
      }
   } else {
      cellWidth = ((frameBounds[3] - frameBounds[1] - strokeWidth)/(myCells.length));
      for( i = 0; i < myCells.length; i++ ) {
         myCells[i].width = cellWidth;
      }
   }

   frame1.geometricBounds = frameBounds;

   resizeCalendar( settings, masterLabelPrefix, calendarIndex );
}
// --------------------------------------------------------------- //
function enlargeFrameTillTableIsVisible( frame ){
   var frameBounds = frame.geometricBounds;
   var myCells1;
   var myCells2;

   try{
      // get the number of cells
      myCells1 = frame.tables.firstItem().cells;
 
      // quadruple the size of the frame
      frame.geometricBounds = [ frameBounds[0], frameBounds[1], 4*frameBounds[2], 4*frameBounds[3] ];
      
      // get the number of cells again
      myCells2 = frame.tables.firstItem().cells;

      // see if the number has increased. if so repeat the whole process as some more may be hidden.
      // if not, we're done.
      if( myCells1.length > 0 && myCells1.length == myCells2.length ){
         frame.geometricBounds = frameBounds;
      } else {
         enlargeFrameTillTableIsVisible( frame );
      } 
   } catch(myError) {
      // double the frame size
      frame.geometricBounds = [ frameBounds[0], frameBounds[1], 2*frameBounds[2], 2*frameBounds[3] ];
      enlargeFrameTillTableIsVisible( frame );
   }

   return;
}
// --------------------------------------------------------------- //
function fitFramesToCalendars( settings, masterIndex ){
   var i;
   var myDocument;
   var frameBounds;

   myDocument = app.activeDocument;

   // shrink picture frames
   try{ myDocument.textFrames.item( "calendarDates" + masterIndex ).fit( FitOptions.FRAME_TO_CONTENT ); }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarJulianDate" + masterIndex ).fit( FitOptions.FRAME_TO_CONTENT ); }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarWeekDay" + masterIndex ).fit( FitOptions.FRAME_TO_CONTENT ); }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarWorkWeek" + masterIndex ).fit( FitOptions.FRAME_TO_CONTENT ); }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarHolidays" + masterIndex ).fit( FitOptions.FRAME_TO_CONTENT ); }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarHolidaysA" + masterIndex ).fit( FitOptions.FRAME_TO_CONTENT ); }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarHolidaysB" + masterIndex ).fit( FitOptions.FRAME_TO_CONTENT ); }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarHolidaysC" + masterIndex ).fit( FitOptions.FRAME_TO_CONTENT ); }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarHolidaysD" + masterIndex ).fit( FitOptions.FRAME_TO_CONTENT ); }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarText" + masterIndex ).fit( FitOptions.FRAME_TO_CONTENT ); }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarMoons" + masterIndex ).fit( FitOptions.FRAME_TO_CONTENT ); }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarPictures" + masterIndex ).fit( FitOptions.FRAME_TO_CONTENT ); }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarBackground" + masterIndex ).fit( FitOptions.FRAME_TO_CONTENT ); }
   catch(myError){}

   return;
}
// --------------------------------------------------------------- //
function resizeCalendar( settings, masterLabelPrefix, masterIndex ){
   var i;
   var myDocument;
   var frameBounds;

   myDocument = app.activeDocument;
   frameBounds = myDocument.textFrames.item( masterLabelPrefix + masterIndex ).geometricBounds;

   // shrink picture frames
   try{ shrinkPictureFrames( "calendarPictures" + masterIndex ); }
   catch(myError){}

   try{ myDocument.textFrames.item( "calendarDates" + masterIndex ).geometricBounds = frameBounds; }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarJulianDate" + masterIndex ).geometricBounds = frameBounds; }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarWeekDay" + masterIndex ).geometricBounds = frameBounds; }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarWorkWeek" + masterIndex ).geometricBounds = frameBounds; }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarHolidays" + masterIndex ).geometricBounds = frameBounds; }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarHolidaysA" + masterIndex ).geometricBounds = frameBounds; }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarHolidaysB" + masterIndex ).geometricBounds = frameBounds; }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarHolidaysC" + masterIndex ).geometricBounds = frameBounds; }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarHolidaysD" + masterIndex ).geometricBounds = frameBounds; }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarText" + masterIndex ).geometricBounds = frameBounds; }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarMoons" + masterIndex ).geometricBounds = frameBounds; }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarPictures" + masterIndex ).geometricBounds = frameBounds; }
   catch(myError){}
   try{ myDocument.textFrames.item( "calendarBackground" + masterIndex ).geometricBounds = frameBounds; }
   catch(myError){}

   alignCalendar( masterIndex, masterLabelPrefix )
   PlaceCalendarsOnAppropriateLayers( settings );
   fitFramesToCalendars( settings, masterIndex );

   return;
}
// --------------------------------------------------------------- //
function alignCalendar( calendarIndex, masterLabelPrefix )
{
   var calendarDate       = "calendarDates"       + calendarIndex;
   var calendarJulianDate = "calendarJulianDate"  + calendarIndex;
   var calendarWeekDay    = "calendarWeekDay"     + calendarIndex;
   var calendarWorkWeek   = "calendarWorkWeek"    + calendarIndex;
   var calendarHolidays   = "calendarHolidays"    + calendarIndex;
   var calendarHolidaysA  = "calendarHolidaysA"   + calendarIndex;
   var calendarHolidaysB  = "calendarHolidaysB"   + calendarIndex;
   var calendarHolidaysC  = "calendarHolidaysC"   + calendarIndex;
   var calendarHolidaysD  = "calendarHolidaysD"   + calendarIndex;
   var calendarText       = "calendarText"        + calendarIndex;
   var calendarMoons      = "calendarMoons"       + calendarIndex;
   var calendarPictures   = "calendarPictures"    + calendarIndex;
   var calendarBackground = "calendarBackground"  + calendarIndex;

   if( masterLabelPrefix == "calendarText" ){
      slave01Label = calendarPictures;
      slave02Label = calendarDate;
      slave03Label = calendarMoons;
      slave04Label = calendarHolidays;
      slave05Label = calendarHolidaysA;
      slave06Label = calendarHolidaysB;
      slave07Label = calendarHolidaysC;
      slave08Label = calendarHolidaysD;
      slave09Label = calendarBackground;
      slave10Label = calendarJulianDate;
      slave11Label = calendarWeekDay;
      slave12Label = calendarWorkWeek;
      masterLabel  = calendarText;
   } else if( masterLabelPrefix == "calendarHolidays" ){
      slave01Label = calendarPictures;
      slave02Label = calendarDate;
      slave03Label = calendarMoons;
      masterLabel  = calendarHolidays;
      slave04Label = calendarHolidaysA;
      slave05Label = calendarHolidaysB;
      slave06Label = calendarHolidaysC;
      slave07Label = calendarHolidaysD;
      slave08Label = calendarBackground;
      slave09Label = calendarJulianDate;
      slave10Label = calendarWeekDay;
      slave11Label = calendarWorkWeek;
      slave12Label = calendarText;
   } else if( masterLabelPrefix == "calendarHolidaysA" ){
      slave01Label = calendarPictures;
      slave02Label = calendarDate;
      slave03Label = calendarMoons;
      slave04Label = calendarHolidays;
      masterLabel  = calendarHolidaysA;
      slave05Label = calendarHolidaysB;
      slave06Label = calendarHolidaysC;
      slave07Label = calendarHolidaysD;
      slave08Label = calendarBackground;
      slave09Label = calendarJulianDate;
      slave10Label = calendarWeekDay;
      slave11Label = calendarWorkWeek;
      slave12Label = calendarText;
   } else if( masterLabelPrefix == "calendarHolidaysB" ){
      slave01Label = calendarPictures;
      slave02Label = calendarDate;
      slave03Label = calendarMoons;
      slave04Label = calendarHolidays;
      slave05Label = calendarHolidaysA;
      masterLabel  = calendarHolidaysB;
      slave06Label = calendarHolidaysC;
      slave07Label = calendarHolidaysD;
      slave08Label = calendarBackground;
      slave09Label = calendarJulianDate;
      slave10Label = calendarWeekDay;
      slave11Label = calendarWorkWeek;
      slave12Label = calendarText;
   } else if( masterLabelPrefix == "calendarHolidaysC" ){
      slave01Label = calendarPictures;
      slave02Label = calendarDate;
      slave03Label = calendarMoons;
      slave04Label = calendarHolidays;
      slave05Label = calendarHolidaysA;
      slave06Label = calendarHolidaysB;
      masterLabel  = calendarHolidaysC;
      slave07Label = calendarHolidaysD;
      slave08Label = calendarBackground;
      slave09Label = calendarJulianDate;
      slave10Label = calendarWeekDay;
      slave11Label = calendarWorkWeek;
      slave12Label = calendarText;
   } else if( masterLabelPrefix == "calendarHolidaysD" ){
      slave01Label = calendarPictures;
      slave02Label = calendarDate;
      slave03Label = calendarMoons;
      slave04Label = calendarHolidays;
      slave05Label = calendarHolidaysA;
      slave06Label = calendarHolidaysB;
      slave07Label = calendarHolidaysC;
      masterLabel  = calendarHolidaysD;
      slave08Label = calendarBackground;
      slave09Label = calendarJulianDate;
      slave10Label = calendarWeekDay;
      slave11Label = calendarWorkWeek;
      slave12Label = calendarText;
   } else if( masterLabelPrefix == "calendarPictures" ){
      masterLabel  = calendarPictures;
      slave01Label = calendarDate;
      slave02Label = calendarMoons;
      slave03Label = calendarHolidays;
      slave04Label = calendarHolidaysA;
      slave05Label = calendarHolidaysB;
      slave06Label = calendarHolidaysC;
      slave07Label = calendarHolidaysD;
      slave08Label = calendarBackground;
      slave09Label = calendarJulianDate;
      slave10Label = calendarWeekDay;
      slave11Label = calendarWorkWeek;
      slave12Label = calendarText;
   } else if( masterLabelPrefix == "calendarBackground" ){
      slave01label = calendarPictures;
      slave02Label = calendarDate;
      slave03Label = calendarMoons;
      slave04Label = calendarHolidays;
      slave05Label = calendarHolidaysA;
      slave06Label = calendarHolidaysB;
      slave07Label = calendarHolidaysC;
      slave08Label = calendarHolidaysD;
      masterLabel  = calendarBackground;
      slave09Label = calendarJulianDate;
      slave10Label = calendarWeekDay;
      slave11Label = calendarWorkWeek;
      slave12Label = calendarText;
   } else if( masterLabelPrefix == "calendarMoons" ){
      slave01label = calendarPictures;
      slave02Label = calendarDate;
      masterLabel  = calendarMoons;
      slave03Label = calendarHolidays;
      slave04Label = calendarHolidaysA;
      slave05Label = calendarHolidaysB;
      slave06Label = calendarHolidaysC;
      slave07Label = calendarHolidaysD;
      slave08Label = calendarBackground;
      slave09Label = calendarJulianDate;
      slave10Label = calendarWeekDay;
      slave11Label = calendarWorkWeek;
      slave12Label = calendarText;
   } else if( masterLabelPrefix == "calendarJulianDate" ){
      slave01label = calendarPictures;
      slave02Label = calendarDate;
      slave03Label = calendarMoons;
      slave04Label = calendarHolidays;
      slave05Label = calendarHolidaysA;
      slave06Label = calendarHolidaysB;
      slave07Label = calendarHolidaysC;
      slave08Label = calendarHolidaysD;
      slave09Label = calendarBackground;
      masterLabel  = calendarJulianDate;
      slave10Label = calendarWeekDay;
      slave11Label = calendarWorkWeek;
      slave12Label = calendarText;
   } else if( masterLabelPrefix == "calendarWeekDay" ){
      slave01label = calendarPictures;
      slave02Label = calendarDate;
      slave03Label = calendarMoons;
      slave04Label = calendarHolidays;
      slave05Label = calendarHolidaysA;
      slave06Label = calendarHolidaysB;
      slave07Label = calendarHolidaysC;
      slave08Label = calendarHolidaysD;
      slave09Label = calendarBackground;
      slave10Label = calendarJulianDate;
      masterLabel  = calendarWeekDay;
      slave11Label = calendarWorkWeek;
      slave12Label = calendarText;
   } else if( masterLabelPrefix == "calendarWorkWeek" ){
      slave01label = calendarPictures;
      slave02Label = calendarDate;
      slave03Label = calendarMoons;
      slave04Label = calendarHolidays;
      slave05Label = calendarHolidaysA;
      slave06Label = calendarHolidaysB;
      slave07Label = calendarHolidaysC;
      slave08Label = calendarHolidaysD;
      slave09Label = calendarBackground;
      slave10Label = calendarJulianDate;
      slave11Label = calendarWeekDay;
      masterLabel = calendarWorkWeek;
      slave12Label = calendarText;
   } else {
      slave01label = calendarPictures;
      masterLabel  = calendarDate;
      slave02Label = calendarMoons;
      slave03Label = calendarHolidays;
      slave04Label = calendarHolidaysA;
      slave05Label = calendarHolidaysB;
      slave06Label = calendarHolidaysC;
      slave07Label = calendarHolidaysD;
      slave08Label = calendarBackground;
      slave09Label = calendarJulianDate;
      slave10Label = calendarWeekDay;
      slave11Label = calendarWorkWeek;
      slave12Label = calendarText;
   }

   // layer might not exist...
   try{ alignTables( masterLabel, slave01Label ); }
   catch( myError ){}
   
   // layer might not exist...
   try{ alignTables( masterLabel, slave02Label ); }
   catch( myError ){}

   // layer might not exist...
   try{ alignTables( masterLabel, slave03Label ); }
   catch( myError ){}

   // layer might not exist...
   try{ alignTables( masterLabel, slave04Label ); }
   catch( myError ){}

   // layer might not exist...
   try{ alignTables( masterLabel, slave05Label ); }
   catch( myError ){}

   // layer might not exist...
   try{ alignTables( masterLabel, slave06Label ); }
   catch( myError ){}
   
    // layer might not exist...
   try{ alignTables( masterLabel, slave07Label ); }
   catch( myError ){}
    
   // layer might not exist...
   try{ alignTables( masterLabel, slave08Label ); }
   catch( myError ){}
   
   // layer might not exist...
   try{ alignTables( masterLabel, slave09Label ); }
   catch( myError ){}

   // layer might not exist...
   try{ alignTables( masterLabel, slave10Label ); }
   catch( myError ){}

   // layer might not exist...
   try{ alignTables( masterLabel, slave11Label ); }
   catch( myError ){}

   // layer might not exist...
   try{ alignTables( masterLabel, slave12Label ); }
   catch( myError ){}

   // rescale picture frames
   rescalePictureFrames( calendarPictures );

   return;
}
// --------------------------------------------------------------- //
function shrinkPictureFrames( frameLabel )
{
   var myDocument = app.activeDocument;
   var frame;
   var frames;
   var cells;
   var i;
   var table;
   var j;

   try{ 
      table = myDocument.textFrames.item( frameLabel ).tables.firstItem();
      rows = table.rows;
      for( i = 0; i < rows.length; i++ ){
         cells = rows[i].cells;
         for( j = 0; j < cells.length; j++ ){
            cells[j].pageItems.firstItem().geometricBounds = [0,0,.01,.01];
         }
      }
   }
   catch( myError ){}
}
// --------------------------------------------------------------- //
function rescalePictureFrames( frameLabel )
{
   var myDocument = app.activeDocument;
   var frame;
   var frames;
   var cells;
   var i;
   var table;
   var j;

   try{ 
      table = myDocument.textFrames.item( frameLabel ).tables.firstItem();
      rows = table.rows;
      for( i = 0; i < rows.length; i++ ){
         cells = rows[i].cells;
         for( j = 0; j < cells.length; j++ ){
            cells[j].pageItems.firstItem().geometricBounds = [0,0,cells[j].height,cells[j].width];
         }
      }
   }
   catch( myError ){}
}
// --------------------------------------------------------------- //
function alignTables( label1, label2 )
{
   var myDocument = app.activeDocument;
   var frame1 = myDocument.textFrames.item( label1 );
   var frame2 = myDocument.textFrames.item( label2 );
   var myColumnCells;

   // the frame may be too small for the calender, so we enlarge it till the calendar is visible,
   // then put it back to the correct size.
   var frame1Bounds = frame1.geometricBounds;
   var frame2Bounds = frame2.geometricBounds;
   enlargeFrameTillTableIsVisible( frame1 );
   enlargeFrameTillTableIsVisible( frame2 );

   var table1 = frame1.tables.firstItem();
   var table2 = frame2.tables.firstItem();

   var myMasterRow = table1.rows.lastItem().cells;
   var mySlaveRow  = table2.rows.lastItem().cells;

   for( var i = 0; i < myMasterRow.length; i++ ){
      mySlaveRow[i].width = myMasterRow[i].width;
   }

   var myMasterColumn = table1.columns.firstItem().cells;
   var mySlaveColumn  = table2.columns.firstItem().cells;

   for( var i = 0; i < myMasterColumn.length; i++ )
   {
      mySlaveColumn[i].height = myMasterColumn[i].height;
   }
   
   frame1.geometricBounds = frame1Bounds;
   frame2.geometricBounds = frame2Bounds;

   return;
}
// --------------------------------------------------------------- //
function getIsLineCalendar( settings )
{
   var mainWindow = null;
   var bLineCalendar = true;
   var result;

   mainWindow = new Window( "dialog", "Line or List Calendar?", undefined, {resizeable:false} );
   with( mainWindow.add( "group{ orientation:'column' }" ) ){
      alignChildren = "top";
      add( "statictext", undefined, "Is the selected calendar a list or line calendar?" );
      with( add( "group{ orientation:'row' }" ) ){
         mainWindow.listButton = add( "button", undefined, "List Calendar" );
         mainWindow.listButton.onClick = function(){ mainWindow.close( 0 ); };
         mainWindow.lineButton = add( "button", undefined, "Line Calendar" );
         mainWindow.lineButton.onClick = function(){ mainWindow.close( 1 ); };
      }
   }

   result = mainWindow.show();
   if( result == 0 ){
      bLineCalendar = false;
   }
   return(bLineCalendar);
}
// --------------------------------------------------------------- //
function getCountOfMetaRows( settings )
{
    var metaRowCount = 0;
    var myDialog = app.dialogs.add({name:"Fit Calendar To Frame Row Identifier:",canCancel:false});
    with( myDialog ){
       with( dialogColumns.add() ){
          with( dialogRows.add() ){
             var hasMonthNameCheckbox = checkboxControls.add({checkedState:false});
             staticTexts.add({staticLabel:"Has row for the month name."});
          }
          with( dialogRows.add() ){
             var hasWeekDayNamesCheckbox = checkboxControls.add({checkedState:false});
             staticTexts.add({staticLabel:"Has row with the week day names."});
          }
       }
    }
    var myResult = myDialog.show();
    if( hasMonthNameCheckbox.checkedState ) {
       metaRowCount = metaRowCount + 1;
    }

    if( hasWeekDayNamesCheckbox.checkedState ) {
       metaRowCount = metaRowCount + 1;
    }

    return metaRowCount;
}
// --------------------------------------------------------------- //
function findSelectedFrame( settings, knownCalendars )
{
   var selectionObjectType;
   var result = new Object;

   result.label = "";
   result.bCalendarFound = false;
   result.masterType  = '';
   result.masterIndex = 0;

   try { 
      selectionObjectType = app.selection[0].toString();
      if( selectionObjectType == "[object TextFrame]" ) {
         result.label = app.selection[0].label; 
      } else if( selectionObjectType == "[object InsertionPoint]" ){
         if( settings.bCS ){
            try{ result.label = app.selection[0].parentTextFrame.label; }
            catch( myError ){
               result.label = app.selection[0].parentTextFrame[0].label;
            }
         } else {
            result.label = app.selection[0].parentTextFrames[0].label;
         }      
      }

      try {
        buffer = settings.calendarRegExp.exec( result.label );
        for( i = 0; i < knownCalendars.length; i++ ){
           if( buffer[2] == knownCalendars[i] ){
              result.bCalendarFound = true;
              result.masterType  = buffer[1];
              result.masterIndex = buffer[2];
           }
        }
      }
      catch( myError ){}
   }
   catch( myError ){}

   return result;
}
// --------------------------------------------------------------- //
function selectCalendarGUI( settings, knownCalendars )
{
   var selector = new Object;
   var myDialog = app.dialogs.add({name:"Select Calendar",canCancel:true});
   with(myDialog){
      with( dialogColumns.add() ){
         with( dialogRows.add() ){
            staticTexts.add({staticLabel:"Select Calendar"});
            selector.selectCalendar = dropdowns.add({stringList:knownCalendars,
                                                     selectedIndex:0});
         }
         with( dialogRows.add() ){
            staticTexts.add({staticLabel:"Align calender to layer"});
            selector.selectMasterLayer = dropdowns.add({stringList:settings.knownLayers,
                                                        selectedIndex:0});
         }
      }
   }

   selector.dialogResult = myDialog.show();
   return( selector );
}
// --------------------------------------------------------------- //
function identifyTargetAndMasterCalendars( settings, knownCalendars, guiResult ){
  var result               = new Object;
  result.alignCalendars    = new Array();
  result.masterLabelPrefix =  '';
 
  if( knownCalendars[ guiResult.selectCalendar.selectedIndex ] == "All" ){
     result.alignCalendars = knownCalendars;
     result.alignCalendars.shift();
  } else {
     result.alignCalendars[0] = knownCalendars[ guiResult.selectCalendar.selectedIndex ];
  }

  if( settings.knownLayers[ guiResult.selectMasterLayer.selectedIndex ] == "calendarText" ){
     result.masterLabelPrefix = "calendarText";
  } else if( settings.knownLayers[ guiResult.selectMasterLayer.selectedIndex ] == "calendarHolidays" ){
     result.masterLabelPrefix = "calendarHolidays";
  } else if( settings.knownLayers[ guiResult.selectMasterLayer.selectedIndex ] == "calendarHolidaysA" ){
     result.masterLabelPrefix = "calendarHolidaysA";
  } else if( settings.knownLayers[ guiResult.selectMasterLayer.selectedIndex ] == "calendarHolidaysB" ){
     result.masterLabelPrefix = "calendarHolidaysB";
  } else if( settings.knownLayers[ guiResult.selectMasterLayer.selectedIndex ] == "calendarHolidaysC" ){
     result.masterLabelPrefix = "calendarHolidaysC";
  } else if( settings.knownLayers[ guiResult.selectMasterLayer.selectedIndex ] == "calendarHolidaysD" ){
     result.masterLabelPrefix = "calendarHolidaysD";
  } else if( settings.knownLayers[ guiResult.selectMasterLayer.selectedIndex ] == "calendarMoons" ){
     result.masterLabelPrefix = "calendarMoons";
  } else if( settings.knownLayers[ guiResult.selectMasterLayer.selectedIndex ] == "calendarPictures" ){
     result.masterLabelPrefix = "calendarPictures";
  } else if( settings.knownLayers[ guiResult.selectMasterLayer.selectedIndex ] == "calendarBackground" ){
     result.masterLabelPrefix = "calendarBackground";
  } else if( settings.knownLayers[ guiResult.selectMasterLayer.selectedIndex ] == "calendarJulianDate" ){
     result.masterLabelPrefix = "calendarJulianDate";
  } else if( settings.knownLayers[ guiResult.selectMasterLayer.selectedIndex ] == "calendarWeekDay" ){
     result.masterLabelPrefix = "calendarWeekDay";
  } else if( settings.knownLayers[ guiResult.selectMasterLayer.selectedIndex ] == "calendarWorkWeek" ){
     result.masterLabelPrefix = "calendarWorkWeek";
  } else{
     result.masterLabelPrefix = "calendarDates";
  }

  return result;
}
// --------------------------------------------------------------- //
function setViewPreferences( preferences ){
   var result = new Object;

   with(app.activeDocument.viewPreferences){
      // Save away current setting
      result.rulerOrigin                = rulerOrigin;
      result.horizontalMeasurementUnits = horizontalMeasurementUnits;
      result.verticalMeasurementUnits   = verticalMeasurementUnits;

      if( preferences == null ){
         rulerOrigin                = RulerOrigin.pageOrigin;
         horizontalMeasurementUnits = MeasurementUnits.inches;
         verticalMeasurementUnits   = MeasurementUnits.inches;
      } else {
         rulerOrigin                = preferences.rulerOrigin
         horizontalMeasurementUnits = preferences.horizontalMeasurementUnits;
         verticalMeasurementUnits   = preferences.verticalMeasurementUnits;
      }
   }
   return( result );
}
// --------------------------------------------------------------- //
function getStroke( calendarIndex )
{
   var myDocument = app.activeDocument;
   var frameStroke;
   var tableStroke;
   var myCellsStroke;
   var stroke = 1/72;
        
   // in CS, the bottomEdgeStrokeWeight doesn't seem to work, so it defaults to 1/72
   if( !settings.bCS ){
      frameStroke = myDocument.textFrames.item( "calendarDates" + calendarIndex );
      tableStroke = frameStroke.tables.firstItem();
      myCellsStroke = tableStroke.columns.lastItem().cells;
      stroke = (myCellsStroke[ myCellsStroke.length-1 ].bottomEdgeStrokeWeight)/72;        
      //strokeWidth = (myCells[ myCells.length-1 ].rightEdgeStrokeWeight)/72;
   }

   return stroke;
}



