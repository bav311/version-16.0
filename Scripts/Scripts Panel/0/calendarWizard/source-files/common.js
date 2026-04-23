function commonTest( string ){
   alert( "Common is loaded: " + string );
}
// --------------------------------------------------------------- //
function SetupAndCreateCalendar( settings ){

   if( bUserInputOK( settings ) ){

      GetHolidays( settings );
      GetMoons( settings );

      GetTheDocument( settings );
      SetTheDocumentStyles( settings );

      MakeCalendars( settings );

      PlaceCalendarsOnAppropriateLayers( settings );

      CleanUp( settings );
   } else {
      alert( "User input has unreconcilable errors.  Script is aborting" );
   }
}
// --------------------------------------------------------------- //
function aGetPresetFiles( settings )
{
   var i;
   var buffer;
   
   settings.presetFiles = settings.userPresetsDirectory.getFiles("*.txt");
   if( settings.lastRunPreset.exists ){
      settings.presetFiles.unshift( settings.lastRunPreset );
   }
   settings.presetFilesShort = new Array( "" );
   for( i = 0; i < settings.presetFiles.length; i++ ) 
   {
      settings.presetFilesShort.push( settings.presetFiles[i].displayName.substring( 0, settings.presetFiles[i].displayName.indexOf( ".txt" ) ) );
   }

   return;
}
// --------------------------------------------------------------- //
function getBackgroundStyle( settings, style )
{
   var pattern = /(.*?)(\d+)/;
   var splitCell = /^(.+)SplitCell(.*)$/i;
   var result;

   if( splitCell.test( style ) ){
      pieces = splitCell.exec( style );
      style = pieces[1] + pieces[2];
   }

   if( pattern.test( style ) ){
      pieces = pattern.exec( style );
      result = pieces[1] + "_background" + pieces[2];  
   } else {
      result = style + "_background";
   }

   return result;
}
// --------------------------------------------------------------- //
function IdentifyInDesignVersionAndFeatures( settings )
{
   settings.bCS         = false;
   settings.bCS2        = false;
   settings.bCS3        = false;
   settings.bCS4        = false;
   settings.bCS5        = false;
   settings.bCSX        = false;
   settings.bCellStyles = false;
   settings.bFrameNameSupported = false;
   settings.bObjectStyles = false;

   if (app.version == 3) {
      settings.bCS = true;
   } else if( String(app.version).split(".")[0] == 4 ) {
      settings.bCS2     = true;
   } else if( String(app.version).split(".")[0] == 5 ) {
      settings.bCS3     = true;
   } else if( String(app.version).split(".")[0] == 6 ) {
      settings.bCS4     = true;
   } else if( String(app.version).split(".")[0] == 7 ) {
      settings.bCS5     = true;
   } else {
      settings.bCSX    = true;
   }
   
   if( ! (settings.bCS || settings.bCS2) ) {
      settings.bObjectStyles = true
   }

   if( ! (settings.bCS || settings.bCS2 ) ) {
      settings.bCellStyles = true
   }

   if( ! (settings.bCS || settings.bCS2 || settings.bCS3 || settings.bCS4 ) ) {
      settings.bFrameNameSupported = true
   }

   if(   settings.bCS  
      || settings.bCS2  
      || settings.bCS3
      || settings.bCS4
      || settings.bCS5 ){
      settings.supportsEnterInMultiLine = false;
   } else {
      settings.supportsEnterInMultiLine = true;
   }
      
   return;
}
// --------------------------------------------------------------- //
function multilineSupportText()
{
   return( "Use Ctrl-Enter or the button to add a new line." );
}
// --------------------------------------------------------------- //
function CleanUp( settings )
{
   with(settings.currentDocument.viewPreferences)
   {
      rulerOrigin                = settings.originalRulerOrigin;
      horizontalMeasurementUnits = settings.originalHorizontalMeasurementUnits;
      verticalMeasurementUnits   = settings.originalVerticalMeasurementUnits;
   }

   app.select( NothingEnum.nothing );

   return;
}
// --------------------------------------------------------------- //
function GetHolidays( settings )
{
   var i;
   var holidays;
   var styles;
   var items;

   settings.holidayGroups      = new Array();
   settings.holidayGroupStyles = new Array();

   if( settings.bGetFrameHolidays )
   {
      settings.holidayGroups.push( GetFrameHolidays( settings ) );
      settings.holidayGroupStyles.push( settings.GetHolidaysFromCurrentFrameStyle );
   }

   if( settings.bGetFileHolidays )
   {
      items = GetFileHolidays( settings );
      holidays = items[0];
      styles = items[1];

      if( holidays.length <= 0 && !settings.bGetFrameHolidays && !settings.bGetCustomHolidays ){
         settings.bHolidaysLayer = settings.bHolidaysLayerManual;
         settings.bHolidayStyleA = false;
         settings.bHolidayStyleB = false;
         settings.bHolidayStyleC = false;
         settings.bHolidayStyleD = false;
      }

      for( i = 0; i < holidays.length; i++ )
      {
         settings.holidayGroups.push( holidays[i] );
         settings.holidayGroupStyles.push( styles[i] );
      }
   }

   if( settings.bGetCustomHolidays )
   {
      settings.holidayGroups.push( GetCustomHolidays( settings ) )
      settings.holidayGroupStyles.push( settings.GetHolidaysFromCustomFilesStyle );
   }

   return;
}
// --------------------------------------------------------------- //
function DayStringFromDate( myDate )
{
   var dateString = (myDate.getUTCMonth()+1) + "-" + myDate.getUTCDate() + "-" + myDate.getUTCFullYear();
   return dateString;
}
// --------------------------------------------------------------- //
function GetMoons( settings )
{
   var i;
   var buffer = new Array();
   var moons = new Array();
   var iYear;
   var bStart = true;
   var moonHolidayFile    = /holidays\/\s*moon/i;

   if( settings.bGetFileHolidays )
   {
      for( i = 0; i < settings.holidayFiles.length; i++ )
      {
         if( settings.bHolidaysFile[i] && moonHolidayFile.test( settings.holidayFiles[i] ) )
         {
            buffer = LoadHolidaysFromFile( settings, settings.holidayFiles[i] );
            for( j = 0; j <= buffer.length; j++ ){
               if( settings.dateWithYearHolidayRegExp.test( buffer[j] ) ){
                  matches = settings.dateWithYearHolidayRegExp.exec( buffer[j] );
                  
                  bufferDate = new Date();
                  bufferDate.setUTCFullYear( parseInt(matches[3]), parseInt(matches[1])-1, parseInt(matches[2]) );
                  bufferDate.setUTCHours( 0, 0, 0, 0 );
                  moons.push( [ bufferDate, matches[4] ] );
               }
            }
         }
      }
   }

   if( settings.bMoons && !moons.length > 0 ){
      iStartYear = settings.iStartYear;
      iEndYear   = settings.iEndYear;
      for( iYear = iStartYear; iYear <= iEndYear; iYear++ ){
         buffer = getMoonPhases( iYear );

         if( iYear == iStartYear ){
            moons = buffer;
         } else {
            bStart = true;
            for( j = 0; j < buffer.length; j++ ){
               if( bStart && DayStringFromDate( moons[moons.length-1][0] ) == DayStringFromDate( buffer[ j ][0] )){

               } else {
                  moons.push( buffer[j] );
                  bStart = false;
               }
            }
         }
      }
   }

   if( moons.length > 0 ){
      settings.bMoons = true;
      settings.Moons = moons.sort( function(a,b){ return (a[0].getTime() - b[0].getTime()) } );
   }

   return;
}
// --------------------------------------------------------------- //
function  MakeCalendars( settings )
{
   var iYear  = settings.iStartYear;
   var iMonth = settings.iStartMonth;
   var iCalendarCount = 0;

   while( ( iYear < settings.iEndYear ) || 
          ( (iYear == settings.iEndYear && iMonth <= settings.iEndMonth ) ) )
   {

      GetThePage( settings, iCalendarCount, iMonth, iYear );
      GetTheFrame( settings, iCalendarCount );

      if( settings.bGridCalendar ){
         // false indicates the calendar is not a miniCalendar
         buildCalendar( settings, settings.currentFrame, iMonth, iYear, false, iYear );
      } else {
         buildCalendar( settings, settings.currentFrame, iMonth, iYear );
      }

      if( !settings.bAddCustomPictureFrameToSpacerPage ){
         addPictureFrame( settings );
      }
      if( !settings.bAddCustomMonthYearFramesToSpacerPage ){
         addMonthAndYear( settings, settings.currentFrame, iMonth, iYear );
      }

      iCalendarCount++;

      // spacer page after
      if( ( iYear == settings.iEndYear && iMonth == settings.iEndMonth ) || (iCalendarCount > 0 && (iCalendarCount % settings.iCalendarsPerPage) == 0 ) ){
         if( settings.sSpacerPageOption == settings.spacerPageOptions[2] ){
            settings.currentPage = settings.currentDocument.pages.add();
            if( settings.bAddCustomPictureFrameToSpacerPage ){
               addPictureFrame( settings );
            }
            if( settings.bAddCustomMonthYearFramesToSpacerPage ){
               addMonthAndYear( settings, settings.currentFrame, iMonth, iYear );
            }
         }
      }

      var next = nextMonth( iMonth, iYear );
      iMonth = next[0];
      iYear = next[1];
   }

   // end of document cover page
   if( settings.bIncludeCoverPages ){
      settings.currentPage = settings.currentDocument.pages.add();
   }

   return;
}
// --------------------------------------------------------------- //
function getUnitSuffix( units )
{
   var unitSuffix = "in";

   if( units == "points" ) {
      unitSuffix = "pt";
   } else if( units == "centimeters" ) {
      unitSuffix = "cm";
   }

   return( unitSuffix );
}
// --------------------------------------------------------------- //
function getScaleFactorFromUnits( units )
{
   var scaleFactor = 1;

   if( units == "inches" ) {
      scaleFactor = 1;
   } else if( units == "points" ) {
      scaleFactor = 1/72;
   } else if( units == "centimeters" ) {
      scaleFactor = 0.393700787;
   }

   return scaleFactor;
}
// --------------------------------------------------------------- //
//myGetBounds calculates and return the bounds of the "live area" of the page.
function myGetBounds(myPage, myDocument)
{
    var array = new Array()
    var item = 0;
    with (myDocument.documentPreferences)
   {
        var myPageHeight = pageHeight;
        var myPageWidth = pageWidth;
    }

    with(myPage.marginPreferences)
    {
        var myX1 = left;
        var myY1 = top;
        var myY2 = bottom;
        var myX2 = right;
    }

    array[item++] = myY1;
    array[item++] = myX1;
    array[item++] = myPageHeight - myY2;
    array[item++] = myPageWidth - myX2;

   return array;
}
// --------------------------------------------------------------- //
function GetDaysInMonth(iYear, iMonth) 
{
   var daysInMonth = new Array(12);
   daysInMonth[0]  = 31; // January

   /* Leap year complexity.  if the year is evenly divisible by 400 it is a leap year
   if it is eveny divisible by 100, it is not, and lastly if it is divisible by 4 it is. */
   if( iYear % 400 == 0 )
   {
      daysInMonth[1] = 29 // February;
   }
   else if( iYear % 100 == 0 )
   {
      daysInMonth[1] = 28 // February;
   }
   else if( iYear % 4 == 0 )
   {
      daysInMonth[1] = 29 // February;
   }
   else
   {
      daysInMonth[1] = 28 // February;  
   }

   daysInMonth[2]  = 31; // March
   daysInMonth[3]  = 30; // April
   daysInMonth[4]  = 31; // May
   daysInMonth[5]  = 30; // June
   daysInMonth[6]  = 31; // July
   daysInMonth[7]  = 31; // August
   daysInMonth[8]  = 30; // September
   daysInMonth[9]  = 31; // October
   daysInMonth[10] = 30; // November
   daysInMonth[11] = 31; // December

   return daysInMonth[iMonth];

}
// --------------------------------------------------------------- //
function nextMonth( iMonth, iYear )
{
   var iNextMonth;
   var iNextYear;
   if( iMonth == 11 )
   {
      iNextMonth = 0;
      iNextYear = iYear + 1;
   }
   else
   {
      iNextMonth = iMonth + 1;
      iNextYear = iYear;
   }

   return( new Array( iNextMonth, iNextYear ) );
}
// --------------------------------------------------------------- //
function previousMonth( iMonth, iYear )
{
   var iNextMonth;
   var iNextYear;
   if( iMonth == 0 )
   {
      iNextMonth = 11;
      iNextYear = iYear - 1;
   }
   else
   {
      iNextMonth = iMonth - 1;
      iNextYear = iYear;
   }

   return( new Array( iNextMonth, iNextYear ) );
}
// --------------------------------------------------------------- //
function addLayers( settings, myDocument )
{
   with( myDocument )
   {
      if( settings.bMoons && (settings.bGridCalendar || settings.bLineCalendar) )
      {
         try{ settings.moonsLayer = layers.item( settings.calendarMoonsLabel ).name; }
         catch (myError){
            settings.moonsLayer = layers.add({name:settings.calendarMoonsLabel});
            settings.moonsLayer.move( LocationOptions.AT_END );
         }
      }  
      if( settings.bPicturesLayer && (settings.bGridCalendar || settings.bLineCalendar) )
      {
         try{ settings.picturesLayer = layers.item( settings.calendarPicturesLabel ).name; }
         catch (myError){
            settings.picturesLayer = layers.add({name:settings.calendarPicturesLabel});
            settings.picturesLayer.move( LocationOptions.AT_END );
         }
      }
      if( settings.bBackgroundLayer )
      {
         try{ settings.backgroundLayer = layers.item( settings.calendarBackgroundLabel ).name; }
         catch (myError){
            settings.backgroundLayer = layers.add({name:settings.calendarBackgroundLabel});
            settings.backgroundLayer.move( LocationOptions.AT_END );
         }
      }
      if( settings.bDateLayer )
      {
         try{ settings.dateLayer = layers.item( settings.calendarDateLabel ).name; }
         catch (myError){
            settings.dateLayer = layers.add({name:settings.calendarDateLabel});
            settings.dateLayer.move( LocationOptions.AT_BEGINNING );
         }
      }
      if( settings.bJulianDateLayer && (settings.bGridCalendar || settings.bLineCalendar) )
      {
         try{ settings.julianDateLayer = layers.item( settings.calendarJulianDateLabel ).name; }
         catch (myError){
            settings.julianDateLayer = layers.add({name:settings.calendarJulianDateLabel});
            settings.julianDateLayer.move( LocationOptions.AT_BEGINNING );
         }
      }
      if( settings.bWorkWeek && settings.bLineCalendar )
      {
         try{ settings.workWeekLayer = layers.item( settings.calendarWorkWeekLabel ).name; }
         catch (myError){
            settings.workWeekLayer = layers.add({name:settings.calendarWorkWeekLabel});
            settings.workWeekLayer.move( LocationOptions.AT_BEGINNING );
         }
      }
      if( settings.bWeekDay && settings.bLineCalendar)
      {
         try{ settings.weekDayLayer = layers.item( settings.calendarWeekDayLabel ).name; }
         catch (myError){
            settings.weekDayLayer = layers.add({name:settings.calendarWeekDayLabel});
            settings.weekDayLayer.move( LocationOptions.AT_BEGINNING );
         }
      }
      if( settings.bHolidaysLayerD && (settings.bGridCalendar || settings.bLineCalendar) )
      {
         try{ settings.holidaysLayerD = layers.item( settings.calendarHolidayLabelD ).name; }
         catch (myError){
            settings.holidaysLayerD = layers.add({name:settings.calendarHolidayLabelD});
            settings.holidaysLayerD.move( LocationOptions.AT_BEGINNING );
         }
      }
      if( settings.bHolidaysLayerC && (settings.bGridCalendar || settings.bLineCalendar) )
      {
         try{ settings.holidaysLayerC = layers.item( settings.calendarHolidayLabelC ).name; }
         catch (myError){
            settings.holidaysLayerC = layers.add({name:settings.calendarHolidayLabelC});
            settings.holidaysLayerC.move( LocationOptions.AT_BEGINNING );
         }
      }
      if( settings.bHolidaysLayerB && (settings.bGridCalendar || settings.bLineCalendar) )
      {
         try{ settings.holidaysLayerB = layers.item( settings.calendarHolidayLabelB ).name; }
         catch (myError){
            settings.holidaysLayerB = layers.add({name:settings.calendarHolidayLabelB});
            settings.holidaysLayerB.move( LocationOptions.AT_BEGINNING );
         }
      }
      if( settings.bHolidaysLayerA && (settings.bGridCalendar || settings.bLineCalendar) )
      {
         try{ settings.holidaysLayerA = layers.item( settings.calendarHolidayLabelA ).name; }
         catch (myError){
            settings.holidaysLayerA = layers.add({name:settings.calendarHolidayLabelA});
            settings.holidaysLayerA.move( LocationOptions.AT_BEGINNING );
         }
      }
      if( settings.bHolidaysLayer && (settings.bGridCalendar || settings.bLineCalendar) )
      {
         try{ settings.holidaysLayer = layers.item( settings.calendarHolidayLabel ).name; }
         catch (myError){
            settings.holidaysLayer = layers.add({name:settings.calendarHolidayLabel});
            settings.holidaysLayer.move( LocationOptions.AT_BEGINNING );
         }
      }
      if( settings.bTextLayer && (settings.bGridCalendar || settings.bLineCalendar) )
      {
         try{ settings.textLayer = layers.item( settings.calendarTextLabel ).name; }
         catch (myError){
            settings.textLayer = layers.add({name:settings.calendarTextLabel});
            settings.textLayer.move( LocationOptions.AT_BEGINNING );
         }
      }   
   }

   return;
}
// --------------------------------------------------------------- //
function findCalendars( settings )
{
   var myDocument;
   var myTextFrames;
   var i;
   var knownCalendars = new Array();
   var buffer;
   var myError;

   try
   {
      myDocument = app.activeDocument;
      myTextFrames = myDocument.textFrames;
      for( i = 0; i < myTextFrames.length; i++ )
      {
         buffer = settings.calendarDatesRegExp.exec( myTextFrames.item(i).label );
         try{ knownCalendars.push( buffer[1] ) }
         catch( myError ){ }
      }
   }
   catch( myError )
   {}

   return( knownCalendars )
}
// --------------------------------------------------------------- //
function nextCalendarCount( settings )
{
   var buffer = 0;
   var knownCalendars;
   var knownCalendarIndex;
   var i;
   try
   {
      knownCalendars = findCalendars( settings );
      for( i = 0; i < knownCalendars.length; i++ )
      {
         knownCalendarIndex = parseInt(knownCalendars[i]);
         if( knownCalendarIndex > buffer )
         {
            buffer = knownCalendarIndex;
         }
      }      
   } catch( myError )
   {}

   return( buffer + 1 )
}
// --------------------------------------------------------------- //
function bItemIn( item, array )
{
   var bFlag = false;
   var i;

   for( i = 0; i < array.length; i++ )
   {
      if( item == array[i] )
      {
         bFlag = true;
      }
   }

   return( bFlag );
}
// --------------------------------------------------------------- //
// Based upon the Basic program published in Sky & Telescope, March 1985
// by Roger W. Sinnott
// --------------------------------------------------------------- //
function getMoonPhases( year ){
    var degToRad, K0, T, T2, T3, J0, F0, M0, M1, B1, oldJ, M5, M6, B6, J, F, U;
    var U = 0;
    var moons = new Array();

    degToRad = 3.14159265 / 180;
    K0 = Math.floor((year - 1900) * 12.3685);
    T = (year - 1899.5) / 100;
    T2 = T * T;
    T3 = T * T * T;

    J0 = 2415020 + 29 * K0;
    F0 = 0.0001178 * T2 - 0.000000155 * T3 + (0.75933 + 0.53058868 * K0) - (0.000837 * T + 0.000335 * T2);

    M0 = 360 * (fractionalPart(K0 * 0.08084821133)) + 359.2242 - 0.0000333 * T2 - 0.00000347 * T3;
    M1 = 360 * (fractionalPart(K0 * 0.07171366128)) + 306.0253 + 0.0107306 * T2 + 0.00001236 * T3;
    B1 = 360 * (fractionalPart(K0 * 0.08519585128)) + 21.2964  - 0.0016528 * T2 - 0.00000239 * T3;

    for( K9 = 0; K9 <= 28*2; K9++ ){
       J=J0+14*(K9/2);
       F=F0+0.765294*(K9/2)
       K=K9/4
       M5 = (M0 + K * 29.10535608) * degToRad;
       M6 = (M1 + K * 385.81691806) * degToRad;
       B6 = (B1 + K * 390.67050646) * degToRad;
       F -= 0.4068 * Math.sin(M6);
       F += (0.1734 - 0.000393 * T) * Math.sin(M5);
       F += 0.0161 * Math.sin(2 * M6);
       F += 0.0104 * Math.sin(2 * B6);
       F -= 0.0074 * Math.sin(M5 - M6) ;
       F -= 0.0051 * Math.sin(M5 + M6);
       F += 0.0021 * Math.sin(2 * M5);
       F += 0.0010 * Math.sin(2 * B6 - M6);
       J=J+Math.floor(F);
       F=fractionalPart(F);

       myDate = JulianToUTC( J+F );
       if( U==0 ){
          moons.push( [ myDate, 'new' ] );
       } else if( U==1 ){
          moons.push( [ myDate, 'first quarter' ] );
       } else if( U == 2 ){
          moons.push( [ myDate, 'full' ] );
       } else if( U==3 ){
          moons.push( [ myDate, 'last quarter' ] );
       }
       U++;
       if( U == 4 ){
          U = 0;
       }
    }
 
    return moons;
}
// --------------------------------------------------------------- //
function fractionalPart( myNumber ){
   return( myNumber - Math.floor( myNumber ));
}
// --------------------------------------------------------------- //
// From https://stellafane.org/observing/moon_phase.html
// --------------------------------------------------------------- //
function JulianToUTC( JD ){
   // JD = Julian Date, possible with fractional days
   // Output is a JavaScript UTC Date Object
    var A, alpha;
    var Z = Math.floor( JD + 0.5 ); // Integer JD's
    var F = (JD + 0.5) - Z;	 // Fractional JD's
    if (Z < 2299161) { A = Z; }
    else {
    	alpha = Math.floor( (Z-1867216.25) / 36524.25 );
    	A = Z + 1 + alpha - Math.floor( alpha / 4 );
    }
    var B = A + 1524;
    var C = Math.floor( (B-122.1) / 365.25 );
    var D = Math.floor( 365.25*C );
    var E = Math.floor( ( B-D )/30.6001 );
    var DT = B - D - Math.floor(30.6001*E) + F; // Day of Month with decimals for time
    var Mon = E - (E<13.5?1:13);                // Month Number
    var Yr  = C - (Mon>2.5?4716:4715);		// Year    
    var Day = Math.floor( DT );                 // Day of Month without decimals for time
    var H = 24*(DT - Day);                      // Hours and fractional hours 
    var Hr = Math.floor( H );                   // Integer Hours
    var M = 60*(H - Hr);                        // Minutes and fractional minutes
    var Min = Math.floor( M );                  // Integer Minutes
    var Sec = Math.floor( 60*(M-Min) );         // Integer Seconds (Milliseconds discarded)
    //Create and set a JavaScript Date Object and return it
    var theDate = new Date(0);
    theDate.setUTCFullYear(Yr, Mon-1, Day);
    theDate.setUTCHours(Hr, Min, Sec);
    return( theDate );
}
// --------------------------------------------------------------- //
function GetFrameHolidays( settings )
{
    var selectionObjectType = settings.selectionObjectType;
    var myTextFrame;
    var text;
    var holidays = new Array();

    if( selectionObjectType == "[object TextFrame]" )
    {
       myTextFrame = app.selection[0];
    } 
    else if( selectionObjectType == "[object InsertionPoint]" )
    {
       if( settings.bCS )
       {
          try{ myTextFrame = app.selection[0].parentTextFrame; }
          catch( myError )
          {
             myTextFrame = app.selection[0].parentTextFrame[0];
          }
       }
       else
       {
          myTextFrame = app.selection[0].parentTextFrames[0];
       }
    }

    text = myTextFrame.contents;
    holidays = text.split("\r")

    return( holidays );
}
// --------------------------------------------------------------- //
function GetFileHolidays( settings )
{
    var items    = new Array();
    var holidays = new Array();
    var styles   = new Array();
    var moonHolidayFile    = /holidays\/\s*moon/i;
    var i;

    for( i = 0; i < settings.holidayFiles.length; i++ )
    {
        if( settings.bHolidaysFile[i] && ! moonHolidayFile.test( settings.holidayFiles[i] ) )
        {
            holidays.push( LoadHolidaysFromFile( settings, settings.holidayFiles[i] ) );
            styles.push( settings.holidaySelectorsStyle[i] );
        }
    }

    items[0] = holidays;
    items[1] = styles;

    return( items );
}
// --------------------------------------------------------------- //
function GetCustomHolidays( settings )
{
    var holidays = new Array();
    var i;
    var file = new File();
    var files = file.openDlg( "Select one or more holiday files", "", true );
    var myError;
    var temp;
    var j;

    try {
       for( i = 0; i < files.length; i++ )
       {
          temp = LoadHolidaysFromFile( settings, files[i] );
          for( j = 0; j < temp.length; j++ )
          {
             holidays.push( temp[j] );
          }
       }

    } catch( myError ){}

    return( holidays );
}
// --------------------------------------------------------------- //
function LoadHolidaysFromFile( settings, file )
{
    var lines = new Array();

    var i = 0;
    var buffer;

    file.open();
    while( ! file.eof )
    {
        buffer = file.readln();
        if( buffer.match( settings.dateWithOutYearRegExp )  || buffer.match( settings.dateWithYearRegExp )  )
        {
            lines[i++] = buffer;
        }
    }
    file.close();

    return( lines );
}
// --------------------------------------------------------------- //
function PlaceCalendarsOnAppropriateLayers( settings )
{
   var buffer;
   var myError;
   var layer;
   var myDocument = app.activeDocument;
   var myTextFrames = myDocument.textFrames;

   for( var i = 0; i < myTextFrames.length; i++ )
   {
      if( myTextFrames.item(i).label.match( settings.calendarDatesRegExp ) )
      {
          try{ myTextFrames.item(i).move( myDocument.layers.item( settings.calendarDateLabel) ) }
          catch (myError){
              try{ myTextFrames.item(i).move( myDocument.layers.item( 'Layer 1' ) ) }
              catch (myError){
                 try{ myTextFrames.item(i).move( myDocument.layers.item(-1) ) }
                 catch (myError){
                 }
              }
          }
      }
      else if( myTextFrames.item(i).label.match( settings.calendarJulianDateRegExp ) )
      {
          try{ myTextFrames.item(i).move( myDocument.layers.item(settings.calendarJulianDateLabel) ) }
          catch (myError){
          }
      }
      else if( myTextFrames.item(i).label.match( settings.calendarWorkWeekRegExp ) )
      {
          try{ myTextFrames.item(i).move( myDocument.layers.item(settings.calendarWorkWeekLabel) ) }
          catch (myError){
          }
      }
      else if( myTextFrames.item(i).label.match( settings.calendarWeekDayRegExp ) )
      {
          try{ myTextFrames.item(i).move( myDocument.layers.item(settings.calendarWeekDayLabel) ) }
          catch (myError){
          }
      }
      else if( myTextFrames.item(i).label.match( settings.calendarTextRegExp ) )
      {
          try{ myTextFrames.item(i).move( myDocument.layers.item(settings.calendarTextLabel) ) }
          catch (myError){
          }
      }
      else if( myTextFrames.item(i).label.match( settings.calendarHolidaysRegExp ) )
      {
          try{ myTextFrames.item(i).move( myDocument.layers.item(settings.calendarHolidayLabel) ) }
          catch (myError){
          }
      }
      else if( myTextFrames.item(i).label.match( settings.calendarHolidaysARegExp ) )
      {
          try{ myTextFrames.item(i).move( myDocument.layers.item(settings.calendarHolidayLabelA) ) }
          catch (myError){
          }
      }
      else if( myTextFrames.item(i).label.match( settings.calendarHolidaysBRegExp ) )
      {
          try{ myTextFrames.item(i).move( myDocument.layers.item(settings.calendarHolidayLabelB) ) }
          catch (myError){
          }
      }
      else if( myTextFrames.item(i).label.match( settings.calendarHolidaysCRegExp ) )
      {
          try{ myTextFrames.item(i).move( myDocument.layers.item(settings.calendarHolidayLabelC) ) }
          catch (myError){
          }
      }
      else if( myTextFrames.item(i).label.match( settings.calendarHolidaysDRegExp ) )
      {
          try{ myTextFrames.item(i).move( myDocument.layers.item(settings.calendarHolidayLabelD) ) }
          catch (myError){
          }
      }
      else if( myTextFrames.item(i).label.match( settings.calendarMoonsRegExp ) )
      {
          try{ myTextFrames.item(i).move( myDocument.layers.item(settings.calendarMoonsLabel) ) }
          catch (myError){
          }
      }
      else if( myTextFrames.item(i).label.match( settings.calendarBackgroundRegExp ) )
      {
          try{ myTextFrames.item(i).move( myDocument.layers.item(settings.calendarBackgroundLabel) ) }
          catch (myError){
          }
      }
   }
   return;
}
// --------------------------------------------------------------- //
function PlaceFrameOnDateLayer( settings, frame )
{
   var buffer;
   var myError;
   var layer;
   var myDocument = app.activeDocument;

   try{ frame.move( myDocument.layers.item( settings.calendarDateLabel ) ) }
   catch (myError){
      try{ frame.move( myDocument.layers.item( 'Layer 1' ) ) }
      catch (myError){
         try{ myTextFrames.item(i).move( myDocument.layers.item(-1) ) }
         catch (myError){
         }
      }
   }
   return;
}
// --------------------------------------------------------------- //
function getWorkWeek( settings, iYear, iMonth, iDay )
{
  var newYearDayInstance;
  var newYearDayOfWeek;
  var daysUntilToday;
  var j;
  var ww;
  var workWeek;
  var date;
  var testDate;
  var yearStart;
  var jan1;
  var daysUntilThisWorkWeek = 0;
  var bFirstPartialWeekCounts = false;
  
  newYearDayInstance = new Date();                      //instance of the date for January 1
  newYearDayInstance.setUTCFullYear( iYear, 0, 1 ); 
  newYearDayInstance.setUTCHours( 0, 0, 0, 0 );     
  newYearDayOfWeek   = newYearDayInstance.getUTCDay(); //day of the week for January 1. 0 is Sunday
  daysUntilToday     = newYearDayOfWeek;               //days before January 1 in ww01

  if( settings.workWeekStart == 'WeekIncludingFirstThursday' )
  {

    //By the ISO standard, weeks start on Monday
    //Work Week 1 contains the first thursday.
    date = new Date();
    date.setUTCFullYear( iYear, iMonth, iDay );
    date.setUTCHours( 0, 0, 0, 0);

    jan1 = new Date();
    jan1.setUTCFullYear( iYear, 0, 1 );
    jan1.setUTCHours( 0, 0, 0, 0);
    
    dec31 = new Date();
    dec31.setUTCFullYear( iYear, 11, 31 );
    dec31.setUTCHours( 0, 0, 0, 0);

    firstMonday = new Date();
    if( jan1.getUTCDay() == 0 ){
       firstMonday.setUTCFullYear( iYear, 0, 2 );
    } else if( jan1.getUTCDay() == 1 ){
       firstMonday.setUTCFullYear( iYear, 0, 1 );
    } else if( jan1.getUTCDay() == 2 ){
       firstMonday.setUTCFullYear( iYear, 0, 7 );
    } else if( jan1.getUTCDay() == 3 ){
       firstMonday.setUTCFullYear( iYear, 0, 6 );
    } else if( jan1.getUTCDay() == 4 ){
       firstMonday.setUTCFullYear( iYear, 0, 5 );
    } else if( jan1.getUTCDay() == 5 ){
       firstMonday.setUTCFullYear( iYear, 0, 4 );
    } else if( jan1.getUTCDay() == 6 ){
       firstMonday.setUTCFullYear( iYear, 0, 3 );
    }

    // Check if the first parial week is counted or not.
    // Test if the first of January is Monday, Tuesday, 
    // Wednesday or Thursday. If so, the week counts.  
    if( jan1.getUTCDay() > 0 && jan1.getUTCDay() <= 4 ){
       bFirstPartialWeekCounts = true;
    }
     
    //count days in all previous months
    for (var j = 0; j < iMonth; j++){ 
      daysUntilThisWorkWeek += GetDaysInMonth(iYear, j);
    }
    daysUntilThisWorkWeek += iDay; //add days in current month

    // Subtract out the days in the first partial week
    // ISO sets Monday as the start of the week, so we need to treat Sunday differently.
    if( jan1.getUTCDay() == 0 ){
       daysUntilThisWorkWeek -= 1;
    } else {
       daysUntilThisWorkWeek -= 8-jan1.getUTCDay();
    }

    // If we're beyond the first partial week
    // subtract out the days in the current partial week.
    if( date.getUTCMonth() > 0 || date.getUTCDate() >= firstMonday.getUTCDate() ){
       if( date.getUTCDay() == 0 ){
          daysUntilThisWorkWeek -= 6;
       } else {
          daysUntilThisWorkWeek -= (date.getUTCDay()-1);
       }
    }

    // If this is the partial week, set the work week manually
    if( date.getUTCMonth() > 0 || date.getUTCDate() >= firstMonday.getUTCDate() ){
       workWeek = (daysUntilThisWorkWeek+6)/7;
       if( bFirstPartialWeekCounts ){
          workWeek++;
       }
  
       if( workWeek == 53 && dec31.getUTCDay() >= 1 && dec31.getUTCDay() <= 3 ){
          workWeek = 1;
       }
    } else {
       if( jan1.getUTCDay() > 0 && jan1.getUTCDay() <= 4 ){
          workWeek = 1;
       } else if( jan1.getUTCDay() == 6 ){
          if( GetDaysInMonth(iYear-1, 2) == 29 ){
             workWeek = 53;
          } else {
             workWeek = 52;
          }
       } else if( jan1.getUTCDay() == 5 ){
          workWeek = 53;
       } else if( jan1.getUTCDay() == 0 ){
          workWeek = 52;
       }
    }
  } else {
     // Take into account the week starting on Monday
     daysUntilToday -= settings.weekStartDay;

     //count days in all previous months
     for (var j = 0; j < iMonth; j++)
     { 
       daysUntilToday += GetDaysInMonth(iYear, j);
     }

     daysUntilToday += iDay; //add days in current month
     workWeek = Math.ceil(daysUntilToday/7)


     if( settings.workWeekStart == 'FirstFullWeek' && (newYearDayOfWeek - settings.weekStartDay) > 0 )
     {
        if( workWeek == 1 || workWeek == 0) 
        {
           workWeek = 52;
        }
        else
        {
           workWeek--;
        }
     }
     else if( settings.workWeekStart == 'Jan1' && (newYearDayOfWeek - settings.weekStartDay) < 0 )
     {
        workWeek++;
     }

     if( workWeek == 0 )
     {
        workWeek = 52;
     }
  }

  return workWeek;
}
// --------------------------------------------------------------- //
function aGetPresetsFromFile( file )
{
    var presets = new Array();
    var configEntryRegExp  = /^.*=.*$/;
    var buffer;

    file.open();
    while( !file.eof )
    {
        buffer = file.readln();
        if( buffer.indexOf('#') >= 0 ){
           buffer = buffer.substring( 0, buffer.indexOf("#") - 1 );
        }
        if( buffer.match( configEntryRegExp ) ){
           presets.push( buffer );
        }
    }
    file.close();

    return( presets );
}
// --------------------------------------------------------------- //
function aGetHolidayFiles( settings )
{
   var i;
   var buffer;

   settings.holidayFiles = settings.holidaysDirectory.getFiles("*.holidays");
   settings.holidayFilesShort = new Array();

   for( i = 0; i < settings.holidayFiles.length; i++ ) 
   {
      settings.holidayFilesShort[i] = settings.holidayFiles[i].displayName.substring( 0, settings.holidayFiles[i].displayName.indexOf( '.holidays' ) );
   }

   return;
}
// --------------------------------------------------------------- //
function stripSpaces( string )
{
   var leadingSpaceRegEx  = /^\s+/;
   var trailingSpaceRegEx = /\s+$/;

   while( string.match( leadingSpaceRegEx ) ){
      string = string.substring( 1, string.length );
   }
   
   while( string.match( trailingSpaceRegEx ) ){
      string = string.substring( 0, string.length - 1 );
   }

   return( string );
}
// --------------------------------------------------------------- //
function setPageSize( settings, height, width, size )
{
   if( settings.numberRegExp.test( height ) && settings.numberRegExp.test( width ) )
   { 
      settings.sPageType = "New Document";
      settings.bUseCustomPageSize = true;
      settings.customPageHeight = height;
      settings.customPageWidth  = width;
   }
   else
   {
      settings.bUseCustomPageSize = false;
      sPageSize = size;
      if( sPageSize == 'B5' )
      {
         settings.customPageHeight = '25.0';
         settings.customPageWidth  = '17.6';    
         settings.customPageSizeUnits = "centimeters";
      }
      else if( sPageSize == 'A5' )
      {
         settings.customPageHeight = '21.0';
         settings.customPageWidth  = '14.8';    
         settings.customPageSizeUnits = "centimeters";
      }
      else if( sPageSize == 'A4' )
      {
         settings.customPageHeight = '29.7';
         settings.customPageWidth  = '21.0';    
         settings.customPageSizeUnits = "centimeters";
      }
      else if( sPageSize == 'A3' )
      {
         settings.customPageHeight = '42.0';
         settings.customPageWidth  = '29.7';    
         settings.customPageSizeUnits = "centimeters";
      }
      else if( sPageSize == 'Legal - Half' )
      {
         settings.customPageHeight = '7';
         settings.customPageWidth  = '8.5';    
         settings.customPageSizeUnits = "inches";
      }
      else if( sPageSize == 'Letter - Half' )
      {
         settings.customPageHeight = '5.5';
         settings.customPageWidth  = '8.5';    
         settings.customPageSizeUnits = "inches";
      }
      else if( sPageSize == 'Tabloid' )
      {
         settings.customPageHeight = '17';
         settings.customPageWidth  = '11';    
         settings.customPageSizeUnits = "inches";
      }
      else if( sPageSize == 'Legal' )
      {
         settings.customPageHeight = '14';
         settings.customPageWidth  = '8.5';    
         settings.customPageSizeUnits = "inches";
      }
      else //( sPageSize == 'Letter' )
      {
         settings.customPageHeight = '11';
         settings.customPageWidth  = '8.5';    
         settings.customPageSizeUnits = "inches";
      }
   }

   return;
}
// --------------------------------------------------------------- //
function ShowHelp( settings )
{
   var anythingRegExp = /\w/;
   var contents = "";
   var linesPerPage = 50;
   var marginPercent = 0.95;
   var pagesCount;
   var pages = new Array();
   var textFrames = new Array();;
   var i = 0;
   var lines = new Array();

   if( settings.help.exists )
   {
      settings.help.open();
      while( ! settings.help.eof )
      {
          line = settings.help.readln();
          contents += line + "\r";
          lines[i++] = line;
      }
      settings.help.close();
   }

   pagesCount = Math.ceil( lines.length/(linesPerPage * marginPercent) )

   pages[0] = settings.currentPage;
   textFrames[0] = settings.currentFrame;

   for( i = 1; i < pagesCount; i++ )
   {
       pages[i] = settings.currentDocument.pages.add();
       textFrames[i] = pages[i].textFrames.add();
       textFrames[i].geometricBounds = settings.calendarFramePositions[0];
       textFrames[i].previousTextFrame = textFrames[i-1];
   }

   settings.currentFrame.insertionPoints.firstItem().contents = contents;

   return;
}
// --------------------------------------------------------------- //
function addMoon( settings, type, cell, rowHeight )
{
    var height = cell.height;
    var width  = cell.width;
    var dim;
    var moonScaling;
    var oval;
    var buffer;

    height <= width ? dim = height : dim = width;

    if( settings.bListCalendar ){
       dim = rowHeight;
    }
    moonScaling = settings.moonSize;


    if( settings.bCS )
    {
       oval.geometricBounds = [0,0,dim*moonScaling, dim*moonScaling];
    }

    if( type == "New Moon" ){
       moonShape = 'shaded';
    } else if( type == "Full Moon" ){
       moonShape = 'lit';
    } else if( type == "Waxing Moon" ){
       if( settings.moonRotation == settings.moonRotationOptions[0] ){
          moonShape = 'D';
       } else {
          moonShape = 'C';
       }
    } else if( type == "Waning Moon" ){
       if( settings.moonRotation == settings.moonRotationOptions[0] ){
          moonShape = 'C';
       } else {
          moonShape = 'D';
       }
    }

    try{ 
       if( !settings.bMoonGenerationError ){
          if( moonShape == "shaded" )
          {
             addOval( settings, cell, 'whole', 'shadow' );
          }
          else if( moonShape == "D" )
          {
             addOval( settings, cell, 'C', 'shadow' );
             addOval( settings, cell, 'D', 'lit' );
          }
          else if( moonShape == "lit" )
          {
             addOval( settings, cell, 'whole', 'lit' );
          }
          else if( moonShape == "C" )
          {
             addOval( settings, cell, 'C', 'lit' );
             addOval( settings, cell, 'D', 'shadow' );
          }
       }
    } catch( err ) {
       alert( "Failed to generate the moon graphics. This is most likely caused "
             +"by trying to generate the oval into too small of a frame.\n\n"
             + err );
    }

    return;
}
// --------------------------------------------------------------- //
function addOval( settings, cell, type, style )
{
   var height = cell.height;
   var width  = cell.width;
   var moonScaling = settings.moonSize;
   var dim;
   var oval;
   var buffer;
   var strokeColor = 'cal_litMoonStrokeColor';
   var fillColor = 'cal_litMoonFillColor';
   var objectStyle = 'cal_litMoon';
   
   height <= width ? dim = height : dim = width;

   if( settings.bListCalendar ){
      dim = height;
   }

   if( type == "C" || type == "D" ){
      if( style == 'shadow' ){
         strokeColor = 'cal_shadowHalfMoonStrokeColor';
         fillColor = 'cal_shadowMoonFillColor';
         objectStyle = 'cal_shadowHalfMoon';
      } else {
         strokeColor = 'cal_litHalfMoonStrokeColor';
         fillColor = 'cal_litMoonFillColor';
         objectStyle = 'cal_litHalfMoon';
      }
   } else {
      if( style == 'shadow' ){
         strokeColor = 'cal_shadowMoonStrokeColor';
         fillColor = 'cal_shadowMoonFillColor';
         objectStyle = 'cal_shadowMoon';
      }
   }

   if( !settings.bObjectStyles ){
      oval = settings.currentPage.ovals.add( {strokeColor:settings.currentDocument.colors.item(strokeColor + settings.styleSet),
                                              fillColor:settings.currentDocument.colors.item(fillColor + settings.styleSet),
                                              strokeWeight:'1pt',
                                              geometricBounds: [0,0,dim * moonScaling, dim * moonScaling]} );
   } else {
      oval = settings.currentPage.ovals.add( {appliedObjectStyle:settings.currentDocument.objectStyles.item( objectStyle + settings.styleSet ),
                                              geometricBounds: [0,0,dim * moonScaling, dim * moonScaling]} );
   }

   if( settings.bCS ) {
      oval.geometricBounds = [0,0,dim*moonScaling, dim*moonScaling];
   }

   if( type == "C" ){
      oval.paths.item(0).pathPoints.item(1).remove();

      oval.paths.item(0).pathPoints.item(0).pointType = PointType.CORNER;
      oval.paths.item(0).pathPoints.item(0).rightDirection = [ 
          oval.paths.item(0).pathPoints.item(0).anchor[0], 
          oval.paths.item(0).pathPoints.item(0).anchor[1] - (dim * moonScaling * 1/4)];

      oval.paths.item(0).pathPoints.item(1).pointType = PointType.CORNER;
      oval.paths.item(0).pathPoints.item(1).leftDirection = [ 
          oval.paths.item(0).pathPoints.item(1).anchor[0], 
          oval.paths.item(0).pathPoints.item(1).anchor[1] + (dim * moonScaling * 1/4)];
   } else if( type == "D" ) {
       oval.paths.item(0).pathPoints.item(3).remove();

       oval.paths.item(0).pathPoints.item(0).pointType = PointType.CORNER;
       oval.paths.item(0).pathPoints.item(0).leftDirection = [ 
           oval.paths.item(0).pathPoints.item(0).anchor[0], 
           oval.paths.item(0).pathPoints.item(0).anchor[1] - (dim * moonScaling * 1/4)];

       oval.paths.item(0).pathPoints.item(2).pointType = PointType.CORNER;
       oval.paths.item(0).pathPoints.item(2).rightDirection = [ 
           oval.paths.item(0).pathPoints.item(2).anchor[0], 
           oval.paths.item(0).pathPoints.item(2).anchor[1] + (dim * moonScaling * 1/4)];
   }

   app.select( oval );
   app.cut();
   app.select( cell.insertionPoints.lastItem() );
   app.paste();

   return;
}
// --------------------------------------------------------------- //
function bUserInputOK( settings )
{
   var selectionObjectType;
   var bFlag = true;
   var bClipToOneMonth = false;
   var buffer; 
   try{ selectionObjectType = app.selection[0].toString(); }
   catch( myError ){ selectionObjectType = null; }

   settings.selectionObjectType = selectionObjectType;

   if( settings.bGetFrameHolidays && 
       !( selectionObjectType == "[object TextFrame]" || selectionObjectType == "[object InsertionPoint]" ) )
   {
      alert( "No frame selected, therefore, I couldn't get holidays from frame" );
      settings.bGetFrameHolidays = false;
   }

   // Give the user a dialog if the settings call for the
   // text frame, but it can't be used.
   if( settings.sPageType == "Current Text Frame" )
   {
      if( !( selectionObjectType == "[object TextFrame]" || selectionObjectType == "[object InsertionPoint]" ) )
      {
         alert( "Need to select a text frame before executing the script in order to use \"Current Text Frame\"." );  
         bFlag = false;
      }
      else if( !( (settings.iStartMonth == settings.iEndMonth ) &&
                  (settings.iStartYear == settings.iEndYear   ) &&
                  (settings.iCalendarsPerPage == 1   ) ) )
      {
         bClipToOneMonth = true;
      }  
   }
   else if( settings.sPageType == "Auto" )
   {
      if( ( selectionObjectType == "[object TextFrame]" || selectionObjectType == "[object InsertionPoint]" ) &&
          !( (settings.iStartMonth == settings.iEndMonth ) &&
             (settings.iStartYear == settings.iEndYear   ) &&
             (settings.iCalendarsPerPage == 1   )
          ) )
      {
         bClipToOneMonth = true;
      }
   }

   if( settings.iFixedRowCount == 5 )
   {
      if( settings.bGetFileHolidays ||
          settings.bGetCustomHolidays ||
          settings.bGetFrameHolidays ||
          settings.bWorkWeek ||
          settings.bHighlightHolidays ||
          settings.bMoons )
      {
         alert( "Can't select work week, moon phases, or holidays with a fixed row count of 5.  Changing to auto." );
         settings.iFixedRowCount = 0;
      }
   }

   if( bClipToOneMonth )
   {
      alert( "When drawing into a text frame, only one month can be created." );  
      settings.iEndMonth = settings.iStartMonth;
      settings.iEndYear  = settings.iStartYear;
      settings.sEndMonth = settings.sStartMonth;
      settings.iCalendarsPerPage = 1;
   }

   if( settings.bUseCustomSize && settings.iCalendarsPerPage > 1 )
   {
      alert( "When drawing into a custom size frame, only one calendar per page may be created." );  
      settings.iCalendarsPerPage = 1;
   }

   if( settings.sPageType == "Current Document" )
   {
      try{ app.activeDocument }
      catch( myError )
      {
         alert( "No document selected! Defaulting to \"Auto\" page type." );
         settings.sPageType = 'Auto';

      }
   }
 
   if( !settings.bIncludeMonthNameInCalendar && settings.bAddMiniCalendars )
   {
      alert( "Mini-Calendars can not be used when the month name is excluded.  Note, the month name "
             +"was either explicity excluded from the calendar table using the Month/Year labeling "
             +"options or implicity by defining a custom frame for the month." );
      settings.bAddMiniCalendars = false;
   }

   if( settings.bAutoIncludeYearInMiniCalendar ){
      settings.bIncludeYearInMiniCalendar = settings.bIncludeYear;
   }

   if( settings.iStartYear > settings.iEndYear ){
      alert( "The start year must be less than or equal to the end year" );
      bFlag = false;
   }

   if( settings.moonSize <= .01 || settings.moonSize >= 1 ){
      alert( "The specified moon size \"" + settings.moonSize + "\" is invalid. It must be between 1 and 100 (percent). It has been reset to it's default value.\n" );
      if( settings.bGridCalendar ){
         settings.moonSize = settings.gridCalendarMoonSize/100;
      } else if( settings.bListCalendar ){
         settings.moonSize = settings.listCalendarMoonSize/100;
      } else if( settings.bLineCalendar ){
         settings.moonSize = settings.lineCalendarMoonSize/100;
      }
   }  

   return( bFlag );
}
// --------------------------------------------------------------- //
function GetTheDocument( settings )
{
   var myDocument;
   var selectionObjectType = settings.selectionObjectType;
   var myY1;
   var myX1;
   var myY2;
   var myX2;
   var scaleFactor = 1;
   var unitSuffix = getUnitSuffix( settings.customPageSizeUnits );
   var documentPreset;
   var fileFilters = "InDesign Files:*.indd;All Files:*.*";
   var referenceCalendar;

   if( settings.bGetFrameHolidays && settings.sPageType == "Auto" )
   {
      // the normal auto is the current frame if it is selected; but
      // not when it has holiday information.
      settings.sPageType = "New Document"; 
   }

   if( settings.sPageType == "Current Text Frame" ||
       settings.sPageType == "Current Document" ||
       ( settings.sPageType == "Auto" && settings.selectionObjectType == "[object TextFrame]" ) ||
       ( settings.sPageType == "Auto" && settings.selectionObjectType == "[object InsertionPoint]")
      )
   {
      myDocument  = app.activeDocument;
   }   
   else
   {

      if( settings.bUseCustomPageMargin == true )
      {
         //backup and set the current application default margin preferences.
         with (app.marginPreferences)
         {
            myY1 = top;
            myX1 = left;
            myY2 = bottom;
            myX2 = right;

            top    = settings.customPageMargin+unitSuffix;
            left   = settings.customPageMargin+unitSuffix;
            bottom = settings.customPageMargin+unitSuffix;
            right  = settings.customPageMargin+unitSuffix;
         }
      }

      // Add the document

      // the code below will force the document to start with 
      // only 1 page as the user may have defaulted InDesign
      // to create a new document with multiple pages.
      documentPreset = app.documentPresets.itemByName( "[Default]" );
      if( documentPreset == null ){ 
         documentPreset = app.documentPresets.firstItem();
      }
      documentPreset.pagesPerDocument = 1;
      myDocument  = app.documents.add( true, documentPreset );
      
      //myDocument  = app.documents.add();
      myDocument.documentPreferences.facingPages = false;

      myDocument.documentPreferences.pageHeight = (settings.customPageHeight + unitSuffix);
      myDocument.documentPreferences.pageWidth  = (settings.customPageWidth  + unitSuffix);      

      if( settings.bUseCustomPageBleed == true )
      {
          myDocument.documentPreferences.documentBleedBottomOffset         = (settings.customPageBleed + unitSuffix);
          myDocument.documentPreferences.documentBleedInsideOrLeftOffset   = (settings.customPageBleed + unitSuffix);
          myDocument.documentPreferences.documentBleedOutsideOrRightOffset = (settings.customPageBleed + unitSuffix);
          myDocument.documentPreferences.documentBleedTopOffset            = (settings.customPageBleed + unitSuffix);
      }

      if( settings.bUseCustomPageSize == true)
      {
         if( parseFloat( settings.customPageHeight ) > parseFloat( settings.customPageWidth ) )
         {
            myDocument.documentPreferences.pageOrientation = PageOrientation.portrait;
         }
         else
         {
            myDocument.documentPreferences.pageOrientation = PageOrientation.landscape;
         }
      }
      else if( settings.sPageOrientation == 'Portrait')
      {
         myDocument.documentPreferences.pageOrientation = PageOrientation.portrait;
      }
      else if( settings.sPageOrientation == 'Landscape')
      {
         myDocument.documentPreferences.pageOrientation = PageOrientation.landscape;
      }
      else if( settings.bListCalendar )
      {
         myDocument.documentPreferences.pageOrientation = PageOrientation.portrait;
      }
      else
      {
         myDocument.documentPreferences.pageOrientation = PageOrientation.landscape;
      }
       

      // Reset the application default margins to their original state.
      if( settings.bUseCustomPageMargin == true )
      {
         with (app.marginPreferences)
         {
            top    = myY1;
            left   = myX1;
            bottom = myY2;
            right  = myX2;
         }
      }
   }

   //if( settings.bGridCalendar || settings.bLineCalendar ){
      addLayers( settings, myDocument );
   //}

   if( settings.bImportStyles ){
      referenceCalendar = File.openDialog("Please select the InDesign file with the reference calendar.", fileFilters, false);
      if(referenceCalendar != null){
         myDocument.importStyles( ImportFormat.TABLE_AND_CELL_STYLES_FORMAT, referenceCalendar );
         myDocument.importStyles( ImportFormat.TEXT_STYLES_FORMAT, referenceCalendar );
         myDocument.importStyles( ImportFormat.OBJECT_STYLES_FORMAT, referenceCalendar );
      }
   }

   with(myDocument.viewPreferences)
   {
      settings.originalRulerOrigin                = rulerOrigin;
      settings.originalHorizontalMeasurementUnits = horizontalMeasurementUnits;
      settings.originalVerticalMeasurementUnits   = verticalMeasurementUnits;

      rulerOrigin                = RulerOrigin.pageOrigin;
      horizontalMeasurementUnits = MeasurementUnits.inches;
      verticalMeasurementUnits   = MeasurementUnits.inches;
   }

   settings.calendarFramePositions = calendarFramePositions( settings, myDocument );
   settings.currentDocument = myDocument;
   return;
}
// --------------------------------------------------------------- //
function GetThePage( settings, iCalendarCount, iMonth, iYear )
{
   var myDocument = settings.currentDocument;
   var selectionObjectType = settings.selectionObjectType;

   if( settings.sPageType == "Current Text Frame" ||
       ( settings.sPageType == "Auto" && settings.selectionObjectType == "[object TextFrame]" ) ||
       ( settings.sPageType == "Auto" && settings.selectionObjectType == "[object InsertionPoint]")
      )
   {
      // reset once the frame is found
      settings.currentPage = myDocument.pages.item(0);

      // No spacer pages if current text frame is being used
      settings.sSpacerPageOption = settings.spacerPageOptions[0]; 
      settings.bIncludeCoverPages = false;
   }
   else if( settings.sPageType == "Current Document" )
   {
      if( iCalendarCount > 0 && (iCalendarCount % settings.iCalendarsPerPage) == 0 )
      {
         // spacer page before adding new page
         if( settings.sSpacerPageOption == settings.spacerPageOptions[1] ){
            settings.currentPage = myDocument.pages.add();
            if( settings.bAddCustomPictureFrameToSpacerPage ){
               addPictureFrame( settings );
            }
            if( settings.bAddCustomMonthYearFramesToSpacerPage ){
               addMonthAndYear( settings, null, iMonth, iYear );
            }
         }
         settings.currentPage = myDocument.pages.add();
      } else if( iCalendarCount == 0 ){
         // start of document cover page
         if( settings.bIncludeCoverPages ){
            settings.currentPage = myDocument.pages.add();
            if( settings.bAddCustomPictureFrameToSpacerPage ){
               addPictureFrame( settings );
            }
            if( settings.bAddCustomMonthYearFramesToSpacerPage ){
               addMonthAndYear( settings, null, iMonth, iYear );
            }
            settings.currentPage = myDocument.pages.add();
         }
         // spacer page before initial page
         if( settings.sSpacerPageOption == settings.spacerPageOptions[1] ){
            settings.currentPage = myDocument.layoutWindows.item(0).activePage;
            if( settings.bAddCustomPictureFrameToSpacerPage ){
               addPictureFrame( settings );
            }
            if( settings.bAddCustomMonthYearFramesToSpacerPage ){
               addMonthAndYear( settings, null, iMonth, iYear );
            }
            settings.currentPage = myDocument.pages.add();
         }
      }
      settings.currentPage = myDocument.layoutWindows.item(0).activePage;
   }
   else
   {
      if( iCalendarCount > 0 && (iCalendarCount % settings.iCalendarsPerPage) == 0 )
      {
         // spacer page before adding new page
         if( settings.sSpacerPageOption == settings.spacerPageOptions[1] ){
            settings.currentPage = myDocument.pages.add();
            if( settings.bAddCustomPictureFrameToSpacerPage ){
               addPictureFrame( settings );
            }
            if( settings.bAddCustomMonthYearFramesToSpacerPage ){
               addMonthAndYear( settings, null, iMonth, iYear );
            }
         }
         settings.currentPage = myDocument.pages.add();
      } else if( iCalendarCount == 0 ){
         // start of document cover page
         if( settings.bIncludeCoverPages ){
            settings.currentPage = myDocument.pages.add();
         }
         // spacer page before initial page
         if( settings.sSpacerPageOption == settings.spacerPageOptions[1] ){
            settings.currentPage = myDocument.pages.lastItem();
            if( settings.bAddCustomPictureFrameToSpacerPage ){
               addPictureFrame( settings );
            }
            if( settings.bAddCustomMonthYearFramesToSpacerPage ){
               addMonthAndYear( settings, null, iMonth, iYear );
            }
            settings.currentPage = myDocument.pages.add();
         }
      }
      settings.currentPage = myDocument.pages.lastItem();
   }

   return( settings.currentPage );
}
// --------------------------------------------------------------- //
function GetTheFrame( settings, iCalendarCount )
{
   var myDocument = settings.currentDocument;
   var myPage     = settings.currentPage;
   var myTextFrame;
   var selectionObjectType = settings.selectionObjectType;
   var myItem;
   var unitSuffix = getUnitSuffix( settings.customSizeUnits );

   if( (settings.sPageType == "Current Text Frame" || settings.sPageType == "Auto" ) && settings.selectionObjectType == "[object TextFrame]" )
   {
      myTextFrame = app.selection[0];
      myItem = myTextFrame.parent;
      while( !myItem.toString() == "[object Page]" ){
         myItem = myItem.parent;
      }
      settings.currentPage = myItem;
   }
   else if( (settings.sPageType == "Current Text Frame" || settings.sPageType == "Auto" )  && settings.selectionObjectType == "[object InsertionPoint]" )
   {
      if( settings.bCS )
      {
         try{ myTextFrame = app.selection[0].parentTextFrame; }
         catch( myError )
         {
            myTextFrame = app.selection[0].parentTextFrame[0];
            myItem = myTextFrame.parent;
            while( !myItem.toString() == "[object Page]" ){
               myItem = myItem.parent;
            }
            settings.currentPage = myItem;
         }
      }
      else
      {
         myTextFrame = app.selection[0].parentTextFrames[0];
         myItem = myTextFrame.parent;
         while( !myItem.toString() == "[object Page]" ){
            myItem = myItem.parent;
         }
         settings.currentPage = myItem;
      }
   }
   else
   {
      myTextFrame = myPage.textFrames.add();
      myTextFrame.geometricBounds = settings.calendarFramePositions[iCalendarCount % settings.iCalendarsPerPage];

      if( settings.columnCount > 1 ){
         myTextFrame.textFramePreferences.textColumnCount = settings.columnCount;
      
         if( settings.columnGutter > 0 ){
            myTextFrame.textFramePreferences.textColumnGutter = settings.columnGutter + unitSuffix;
         } 
      } 
 
   }

   if( settings.bGetFrameHolidays && settings.sPageType == "Current Text Frame" )
   {
       myTextFrame.contents = "";
   }

   if( settings.bDateLayer )
   {
      myTextFrame.move( myDocument.layers.item( settings.calendarDateLabel ) );
   }

   settings.iCalendarCount = nextCalendarCount( settings );
   myTextFrame.label = settings.calendarDateLabel + settings.iCalendarCount;
   if( settings.bFrameNameSupported == true )
   {
      myTextFrame.name = settings.calendarDateLabel + settings.iCalendarCount;
   }   
   settings.currentFrame = myTextFrame;

   return( myTextFrame );
}
// --------------------------------------------------------------- //
function insertHolidayText( settings, targetCell, dateCell, iYear, iMonth, iDay )
{
   var myDocument = settings.currentDocument;
   var g;
   var h;
   var holidaysPreBuffer;
   var holidaysBuffer = new Array( 2 );
   var holidays = new Array();
   var fullStyle;
   var style;
   var printedHolidays;
   var holidayGroups = settings.holidayGroups;
   var holidayGroupStyles = settings.holidayGroupStyles;
   var bPrintHoliday = false;
   var abcd = new Array( "A", "B", "C", "D" );
   var styleIndex;
   var bStyleSet = false;

   printedHolidays = new Array();
   for( styleIndex = 0; styleIndex < abcd.length; styleIndex++ ){
   for( g = 0; g < holidayGroups.length; g++ ){
      holidays = holidayGroups[g];
      style    = holidayGroupStyles[g];

      if( style == abcd[ styleIndex ] ){
      for( h = 0; h < holidays.length; h++ ){
         holidaysPreBuffer = holidays[h].split(":");
         holidaysBuffer[0] = holidaysPreBuffer.shift();
         holidaysBuffer[1] = holidaysPreBuffer.join( ":" );

         if( holidays[h].match( settings.dateWithOutYearHolidayRegExp ) && (iMonth+1)+"-"+iDay == holidaysBuffer[0] ){
            bPrintHoliday = true;
         } else if( holidays[h].match( settings.dateWithYearHolidayRegExp ) && (iMonth+1)+"-"+iDay+"-"+iYear == holidaysBuffer[0] ){
            bPrintHoliday = true;
         } else {
            bPrintHoliday = false;
         }

         if( bPrintHoliday ){
            if( !bItemIn( holidaysBuffer[1], printedHolidays ) ) {
               if( targetCell.contents.match( settings.anythingRegExp ) ) {
                  targetCell.insertionPoints.lastItem().contents = "\r" + holidaysBuffer[1];
               } else {
                  targetCell.contents = holidaysBuffer[1];
               }

               printedHolidays.push( holidaysBuffer[1] );
               fullStyle = "cal_holiday" + style;

               targetCell.insertionPoints.lastItem().appliedParagraphStyle = settings.currentDocument.paragraphStyles.item(fullStyle + settings.styleSet);
               if( settings.bHighlightHolidays == true && settings.bCellStyles == true && !bStyleSet ) { 
                  if( !( settings.weekDayHighlight.test( dateCell.appliedCellStyle.name ) && !settings.bHighlightHolidaysIsDominant ) ){
                     fullCellStyle = "cal_holidayDate" + style;
                     dateCell.appliedCellStyle = myDocument.cellStyles.item(fullCellStyle + settings.styleSet);
                     bStyleSet = true;
                  }
               }
            }

         }
      }
      }
   }
   }

   return;
}
// --------------------------------------------------------------- //
function insertMoon( settings, targetCell, rowHeight, iMonth, iYear, iDay )
{
   var cellDate;
   var currentDate = new Date();
   var j;

   cellDate = (iMonth+1) + "-" + iDay + "-" + iYear;

   currentDate.setUTCFullYear( parseInt( iYear ), parseInt( iMonth ), parseInt( iDay ) );
   currentDate.setUTCHours( 0, 0, 0, 0 );

   for( j = 0; j < settings.Moons.length; j++ ){
      if( cellDate == DayStringFromDate( settings.Moons[j][0] ) ){
         if( settings.Moons[j][1] == 'new' ){
            addMoon( settings, "New Moon", targetCell, rowHeight );
            break;
         } else if( settings.Moons[j][1] == 'first quarter' ){
            addMoon( settings, "Waxing Moon", targetCell, rowHeight );
            break;
         } else if( settings.Moons[j][1] == 'full' ){
            addMoon( settings, "Full Moon", targetCell, rowHeight );
            break;
         } else if( settings.Moons[j][1] == 'last quarter' ){
            addMoon( settings, "Waning Moon", targetCell, rowHeight );
            break;
         }
      } else if( currentDate.getTime() < settings.Moons[j][0] ){
         break;
      }
   }
 
   return;
}
// --------------------------------------------------------------- //
function bValue( value )
{
   var bFlag = false;
   if( value == 'true' ){
      bFlag = true;
   }
   return bFlag;
}
// --------------------------------------------------------------- //
function booleanToString( bFlag ){
   var result = 'false';
   if( bFlag ){
      result = 'true';
   }
   return( result );
}
// --------------------------------------------------------------- //
function addHolidayText( settings, iYear, calendarTable, holidaysTable, targetABCD, manualList )
{
   var myCalendarRow;
   var myHolidaysRow;
   var myCalendarCells;
   var myHolidaysCells;
   var calendarDate;
   var myDocument = settings.currentDocument;
   var i;
   var j;
   var k;
   var m;
   var h;
   var g;
   var holidaysPreBuffer;
   var holidaysBuffer = new Array( 2 );
   var holidays = new Array();
   var fullStyle;
   var style;
   var printedHolidays;
   var holidayGroups = settings.holidayGroups;
   var holidayGroupStyles = settings.holidayGroupStyles;
   var bPrintHoliday = false;
   var bufferLabel;
   var bStyleSet = false;
   var fullCellStyle;
   var startRow = 2;
   var abcd = new Array( "A", "B", "C", "D" );

   if( targetABCD == "A" ){
      abcd = [ "A" ];
   } else if( targetABCD == "B" ){
      abcd = [ "B" ];
   } else if( targetABCD == "C" ){
      abcd = [ "C" ];
   } else if( targetABCD == "D" ){
      abcd = [ "D" ];
   } else if( targetABCD == "All" ){
      abcd = manualList;
   }

   if( settings.bLineCalendar ){
      startRow = 0;
   } else {
      if( !settings.bIncludeMonthNameInCalendar ){
         startRow = startRow - 1;
      }
   
      if( !settings.bWeekDay ){
         startRow = startRow - 1;
      }
   }

   for( k = startRow; k < calendarTable.rows.length; k++ )
   {
      myCalendarCells = calendarTable.rows.item( k ).cells;
      myHolidaysCells = holidaysTable.rows.item( k ).cells;

      for( i = 0; i < myCalendarCells.length; i++ )
      {
         printedHolidays = new Array();
         bStyleSet = false;

         for( styleIndex = 0; styleIndex < abcd.length; styleIndex++ ){
         for( g = 0; g < holidayGroups.length; g++ )
         {
             holidays = holidayGroups[g];
             style    = holidayGroupStyles[g];

             if( style == abcd[ styleIndex ] ){
             for( h = 0; h < holidays.length; h++ )
             {
                 bPrintHoliday = false;
                 if( holidays[h].match( settings.dateWithOutYearHolidayRegExp ) )
                 {
                    holidaysPreBuffer = holidays[h].split(":");
                    holidaysBuffer[0] = holidaysPreBuffer.shift();
                    holidaysBuffer[1] = holidaysPreBuffer.join( ":" );

                    bufferLabel = " ";
                    if( settings.bCS )
                    {
                       bufferLabel = settings.csLabelMap[ myCalendarCells[i].id ];
                    }
                    else
                    {
                       bufferLabel = myCalendarCells[i].label;
                    }

                    if( bufferLabel == (holidaysBuffer[0] + "-" + iYear) )
                    {
                       bPrintHoliday = true;
                    }
                 }
                 else if( holidays[h].match( settings.dateWithYearHolidayRegExp ) )
                 {
                    holidaysPreBuffer = holidays[h].split(":");
                    holidaysBuffer[0] = holidaysPreBuffer.shift();
                    holidaysBuffer[1] = holidaysPreBuffer.join( ":" );

                    bufferLabel = " ";
                    if( settings.bCS )
                    {
                       bufferLabel = settings.csLabelMap[ myCalendarCells[i].id ];
                    }
                    else
                    {
                       bufferLabel = myCalendarCells[i].label;
                    }

                    if( bufferLabel == holidaysBuffer[0] )
                    {
                       bPrintHoliday = true;
                    }
                 }

                 if( bPrintHoliday )
                 {
                    if( !bItemIn( holidaysBuffer[1], printedHolidays ) )
                    {
                       if( myHolidaysCells[i].contents.match( settings.anythingRegExp ) )
                       {
                          myHolidaysCells[i].insertionPoints.lastItem().contents = "\r" + holidaysBuffer[1];
                       }
                       else
                       {
                          myHolidaysCells[i].contents = holidaysBuffer[1];
                       }

                       printedHolidays.push( holidaysBuffer[1] );
                       fullStyle = "cal_holiday" + style;

                       myHolidaysCells[i].insertionPoints.lastItem().appliedParagraphStyle = settings.currentDocument.paragraphStyles.item(fullStyle + settings.styleSet);

                       if( settings.holidayDateStyleApplied.test( myCalendarCells[i].appliedCellStyle.name ) ){
                          bStyleSet = true;
                       }

                       if( settings.bHighlightHolidays == true && !bStyleSet )
                       {
                          if( settings.bCellStyles == true )
                          { 
                             if( !( settings.weekDayHighlight.test( myCalendarCells[i].appliedCellStyle.name ) && !settings.bHighlightHolidaysIsDominant ) ){
                                fullCellStyle = "cal_holidayDate" + style;
                                myCalendarCells[i].appliedCellStyle = myDocument.cellStyles.item(fullCellStyle + settings.styleSet);
                                bStyleSet = true;
                             }
                          }
                          else
                          {
                             myCalendarCells[i].insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("cal_holidayDate" + style + settings.styleSet);
                          }   
                       }
                    }
                 }
             }
             }
         }
         }
      }
   }

   return;
}
// --------------------------------------------------------------- //
function addJulianDates( settings, calendarTable, julianDatesTable )
{
   var myCalendarRow;
   var myJulianDateRow;
   var myCalendarCells;
   var myJulianDateCells;
   var i;
   var k;
   var cellDate;
   var month;
   var day;
   var year;

   var dateNow  = new Date();
   var dateJan1 = new Date();

   var bufferLabel;
   var tempCells;
   var startRow = 2;

   if( settings.bLineCalendar ){
      startRow = 0;
   } else {
      if( !settings.bIncludeMonthNameInCalendar ){
         startRow = startRow - 1;
      }
   
      if( !settings.bWeekDay ){
         startRow = startRow - 1;
      }
   }

   for( k = startRow; k < calendarTable.rows.length; k++ )
   {
      myCalendarCells   = calendarTable.rows.item( k ).cells;
      myJulianDateCells = julianDatesTable.rows.item( k ).cells;

      for( i = 0; i < myCalendarCells.length; i++ )
      {
         if( !settings.bCellStyles )
         {
            myJulianDateCells[i].verticalJustification = VerticalJustification.topAlign;
         }

         bufferLabel = " ";
         if( settings.bCS )
         {
            bufferLabel = settings.csLabelMap[ myCalendarCells[i].id ];
         }
         else
         {
            bufferLabel = myCalendarCells[i].label;
         }

         if( bufferLabel.match( settings.dateWithYearRegExp ) )
         {
            cellDate = bufferLabel;
            month = cellDate.substring( 0, cellDate.indexOf( '-', 0 ) );
            day   = cellDate.substring( cellDate.indexOf('-',0)+1, cellDate.indexOf( '-', 3 ) );
            year  = cellDate.substr( cellDate.indexOf( '-', 3 ) + 1, 4 );

            dateJan1.setUTCFullYear( parseInt( year ), 0, 1 );
            dateNow.setUTCFullYear( parseInt( year ), parseInt( month ) - 1, parseInt( day )+1 );
            myJulianDateCells[i].contents = Math.ceil( (dateNow.valueOf() - dateJan1.valueOf())/(60*60*24*1000)).toString();
         }
      }
   }

   return;
}
// --------------------------------------------------------------- //
function addWorkWeeks( settings, calendarTable, workWeekTable )
{
   var myCalendarRow;
   var myJulianDateRow;
   var myCalendarCells;
   var myJulianDateCells;
   var dateWithYearRegExp    = /^\s*(\d+)\s*-\s*(\d+)\s*-\s*(\d+)\s*$/;
   var i;
   var k;
   var cellDate;
   var month;
   var day;
   var year;
   var dateNow  = new Date();
   var bufferLabel;
   var tempCells;
   var startRow = 2;

   if( settings.bLineCalendar ){
      startRow = 0;
   } else {
      if( !settings.bIncludeMonthNameInCalendar ){
         startRow = startRow - 1;
      }
   
      if( !settings.bWeekDay ){
         startRow = startRow - 1;
      }
   }
      
   // get the array of day names based on the frameBounds
   if( settings.headerType == "Short: S" ) {
      days = settings.daysShort;
   } else if( settings.headerType == "Mid: Sun" ) {
      days = settings.daysMid;
   } else if( settings.headerType == "Full: Sunday" ) {
      days = settings.daysLong;
   } else {
      days = settings.daysLong;
   }

   for( k = startRow; k < calendarTable.rows.length; k++ )
   {
      myCalendarCells = calendarTable.rows.item( k ).cells;
      myWorkWeekCells = workWeekTable.rows.item( k ).cells;

      for( i = 0; i < myCalendarCells.length; i++ )
      {
         if( !settings.bCellStyles )
         {
            myWorkWeeksCells[i].verticalJustification = VerticalJustification.topAlign;
         }

         bufferLabel = " ";
         if( settings.bCS )
         {
            bufferLabel = settings.csLabelMap[ myCalendarCells[i].id ];
         }
         else
         {
            bufferLabel = myCalendarCells[i].label;
         }

         if( bufferLabel.match( dateWithYearRegExp ) )
         {
            cellDate = bufferLabel;
            month = cellDate.substring( 0, cellDate.indexOf( '-', 0 ) );
            day   = cellDate.substring( cellDate.indexOf('-',0)+1, cellDate.indexOf( '-', 3 ) );
            year  = cellDate.substr( cellDate.indexOf( '-', 3 ) + 1, 4 );

            dateNow.setUTCFullYear( parseInt( year ), parseInt( month ) - 1, parseInt( day ) );
            if( settings.weekStartDay == dateNow.getUTCDay() ){
               myWorkWeekCells[i].contents = settings.workWeekPrefix + getWorkWeek( settings, parseInt( year ), parseInt( month ) - 1, parseInt( day ) ).toString();
            }
         }
      }
   }

   return;
}
// --------------------------------------------------------------- //
function addWeekDays( settings, calendarTable, weekDaysTable )
{
   var myCalendarRow;
   var myJulianDateRow;
   var myCalendarCells;
   var myJulianDateCells;
   var dateWithYearRegExp    = /^\s*(\d+)\s*-\s*(\d+)\s*-\s*(\d+)\s*$/;
   var i;
   var k;
   var cellDate;
   var month;
   var day;
   var year;
   var dateNow  = new Date();
   var bufferLabel;
   var tempCells;
   var startRow = 2;
   var printIt = true;
   if( settings.bLineCalendar ){
      startRow = 0;
   } else {
      if( !settings.bIncludeMonthNameInCalendar ){
         startRow = startRow - 1;
      }
   
      if( !settings.bWeekDay ){
         startRow = startRow - 1;
      }
   }
      
   // get the array of day names based on the frameBounds
   if( settings.headerType == "Short: S" ) {
      days = settings.daysShort;
   } else if( settings.headerType == "Mid: Sun" ) {
      days = settings.daysMid;
   } else if( settings.headerType == "Full: Sunday" ) {
      days = settings.daysLong;
   } else {
      days = settings.daysLong;
   }

   for( k = startRow; k < calendarTable.rows.length; k++ )
   {
      myCalendarCells = calendarTable.rows.item( k ).cells;
      myWeekDaysCells = weekDaysTable.rows.item( k ).cells;

      for( i = 0; i < myCalendarCells.length; i++ )
      {
         if( !settings.bCellStyles )
         {
            myWeekDaysCells[i].verticalJustification = VerticalJustification.topAlign;
         }

         bufferLabel = " ";
         if( settings.bCS )
         {
            bufferLabel = settings.csLabelMap[ myCalendarCells[i].id ];
         }
         else
         {
            bufferLabel = myCalendarCells[i].label;
         }

         if( bufferLabel.match( dateWithYearRegExp ) )
         {
            cellDate = bufferLabel;
            month = cellDate.substring( 0, cellDate.indexOf( '-', 0 ) );
            day   = cellDate.substring( cellDate.indexOf('-',0)+1, cellDate.indexOf( '-', 3 ) );
            year  = cellDate.substr( cellDate.indexOf( '-', 3 ) + 1, 4 );

            dateNow.setUTCFullYear( parseInt( year ), parseInt( month ) - 1, parseInt( day ) );

            if( settings.bOnlyPrintFirstWeekday ){
               if( dateNow.getUTCDay() == settings.weekStartDay ){
                  printIt = true;
               } else {
                  printIt = false;
               }
            } else {
               printIt = true;
            }
            
            if( printIt ){
               myWeekDaysCells[i].contents = days[ dateNow.getUTCDay() ];
            }
         }
      }
   }

   return;
}
// --------------------------------------------------------------- //
function addMoons( settings, calendarTable, moonsTable )
{
   var myCalendarRow;
   var myMoonsRow;
   var myCalendarCells;
   var myMoonsCells;
   var i;
   var k;
   var cellDate;
   var month;
   var day;
   var year;
   var bufferLabel;
   var currentDate = new Date;
   var startRow = 2;

   if( settings.bLineCalendar ){
      startRow = 0;
   } else {
      if( !settings.bIncludeMonthNameInCalendar ){
         startRow = startRow - 1;
      }
   
      if( !settings.bWeekDay ){
         startRow = startRow - 1;
      }
   }

   for( k = startRow; k < calendarTable.rows.length; k++ )
   {
      myCalendarCells = calendarTable.rows.item( k ).cells;
      myMoonsCells   = moonsTable.rows.item( k ).cells;

      for( i = 0; i < myCalendarCells.length; i++ )
      {
         if( !settings.bCellStyles )
         {
            myMoonsCells[i].topInset    = "0 in";
            myMoonsCells[i].rightInset  = "0 in";
            myMoonsCells[i].bottomInset = "0 in";
            myMoonsCells[i].leftInset   = "0 in";
            myMoonsCells[i].verticalJustification = VerticalJustification.topAlign;
         }

         bufferLabel = " ";
         if( settings.bCS )
         {
            bufferLabel = settings.csLabelMap[ myCalendarCells[i].id ];
         }
         else
         {
            bufferLabel = myCalendarCells[i].label;

         }

         if( bufferLabel.match( settings.dateWithYearRegExp ) )
         {
            cellDate = bufferLabel;
            month = cellDate.substring( 0, cellDate.indexOf( '-', 0 ) );
            day   = cellDate.substring( cellDate.indexOf('-',0)+1, cellDate.indexOf( '-', 3 ) );
            year  = cellDate.substr( cellDate.indexOf( '-', 3 ) + 1, 4 );

            currentDate.setUTCFullYear( parseInt( year ), parseInt( month )-1, parseInt( day ) );
            currentDate.setUTCHours( 0, 0, 0, 0 );

            for( j = 0; j < settings.Moons.length; j++ ){
               if( cellDate == DayStringFromDate( settings.Moons[j][0] ) ){
                  if( settings.Moons[j][1] == 'new' ){
                     addMoon( settings, "New Moon", myMoonsCells[i] );
                     break;
                  } else if( settings.Moons[j][1] == 'first quarter' ){
                     addMoon( settings, "Waxing Moon", myMoonsCells[i] );
                     break;
                  } else if( settings.Moons[j][1] == 'full' ){
                     addMoon( settings, "Full Moon", myMoonsCells[i] );
                     break;
                  } else if( settings.Moons[j][1] == 'last quarter' ){
                     addMoon( settings, "Waning Moon", myMoonsCells[i] );
                     break;
                  }
               } else if( currentDate.getTime() < settings.Moons[j][0] ){
                  break;
               }
            }
         }
      }
   }

   return;
}
// --------------------------------------------------------------- //
function addPictureFrames( settings, calendarTable, picturesTable )
{
   var cells = picturesTable.cells;
   var i;
   var width;
   var height;
   var frame;

   for( i = 0; i < cells.length; i++ )
   {
      height = cells[i].height;
      width  = cells[i].width;

      cells[i].label = "pictureCell_" + i;

      if( settings.bCS || settings.bCS2 )
      {
         cells[i].topInset = "0 in";
         cells[i].rightInset = "0 in";
         cells[i].bottomInset = "0 in";
         cells[i].leftInset = "0 in";

         frame = settings.currentPage.textFrames.add( {geometricBounds:[0,0,height,width]});

         // needed due to bug in CS
         if( settings.bCS )
         {
            frame.geometricBounds = [0,0,height,width];
         }

         frame.contentType = ContentType.GRAPHIC_TYPE;
         frame.label = "pictureFrame_" + i;

         app.select( frame );
         app.cut();
         app.select( cells[i].insertionPoints.lastItem() );
         app.paste();
      }
      else
      {
         frame = cells[i].insertionPoints.lastItem().textFrames.add( {geometricBounds:[0,0,height,width]});
         frame.contentType = ContentType.GRAPHIC_TYPE;
         frame.label = "pictureFrame_" + i;
      }
   }

   return;
}
// --------------------------------------------------------------- //
function addPictureFrame( settings )
{
   var myDocument = settings.currentDocument;
   var myPage     = settings.currentPage;

   var newFrameBounds;
   var pictureFrame;
   var yearFrame;
   var unitSuffix = getUnitSuffix( settings.customSizeUnits );

   if( settings.bAddPictureFrame ){
      newFrameBounds = new Array( settings.pictureCustomSizeY1 + unitSuffix,
                                  settings.pictureCustomSizeX1 + unitSuffix,
                                  settings.pictureCustomSizeY2 + unitSuffix,
                                  settings.pictureCustomSizeX2 + unitSuffix );

      if( settings.bObjectStyles ){
         pictureFrame = myPage.textFrames.add( {appliedObjectStyle:settings.currentDocument.objectStyles.item( "cal_customPictureFrame" + settings.styleSet ),
                                                geometricBounds:newFrameBounds } );
      } else {
         pictureFrame = myPage.textFrames.add( {geometricBounds:newFrameBounds } );
      }
      pictureFrame.contentType = ContentType.GRAPHIC_TYPE;

      PlaceFrameOnDateLayer( settings, pictureFrame )
   }

   return;
}
// --------------------------------------------------------------- //
function addMonthAndYear( settings, currentFrame, iMonth, iYear )
{
   var myDocument = settings.currentDocument;
   var myPage     = settings.currentPage;

   var calendarFrameBounds;
   var newFrameBounds;
   var monthFrame;
   var yearFrame;
   var unitSuffix = getUnitSuffix( settings.customSizeUnits );
   var yearWidth = 0;

   if( currentFrame != null ){
      calendarFrameBounds = currentFrame.geometricBounds;
   }
   
   if( settings.bIncludeYear && !settings.bIncludeMonthName ){
      // this condition is only true if the four corners of the year are 
      // set, but not for the month and the selection to include the month name is not set.
      newFrameBounds = new Array( settings.yearCustomSizeY1 + unitSuffix,
                                  settings.yearCustomSizeX1 + unitSuffix,
                                  settings.yearCustomSizeY2 + unitSuffix,
                                  settings.yearCustomSizeX2 + unitSuffix );
      if( settings.bObjectStyles ){
         yearFrame = myPage.textFrames.add( {appliedObjectStyle:myDocument.objectStyles.item( "cal_customYearFrame" + settings.styleSet ),
                                             geometricBounds:newFrameBounds} );
      } else {
         yearFrame = myPage.textFrames.add( {geometricBounds:newFrameBounds} );
      }
      yearFrame.contents = iYear.toString();
      yearFrame.paragraphs.everyItem().appliedParagraphStyle = myDocument.paragraphStyles.item( 'cal_year' + settings.styleSet)
      PlaceFrameOnDateLayer( settings, yearFrame )
   } else if( settings.bIncludeMonthName ){
      if( settings.bIncludeYear && settings.bFrameForYear ){

         if( settings.bUseCustomMonthFrameSize ){
            newFrameBounds = new Array( settings.monthCustomSizeY1 + unitSuffix,
                                        settings.monthCustomSizeX1 + unitSuffix,
                                        settings.monthCustomSizeY2 + unitSuffix,
                                        settings.monthCustomSizeX2 + unitSuffix );
         } else {
            calendarWidth = calendarFrameBounds[3] - calendarFrameBounds[1];
            yearWidth = settings.defaultYearWidth * calendarWidth;
            monthWidth = calendarWidth - yearWidth;
            newFrameBounds = new Array( calendarFrameBounds[0], calendarFrameBounds[1], calendarFrameBounds[0]-settings.monthFrameHeight, calendarFrameBounds[1] + monthWidth );
         }

         if( settings.bObjectStyles ){
            monthFrame = myPage.textFrames.add( {appliedObjectStyle:myDocument.objectStyles.item( "cal_customMonthFrame" + settings.styleSet ),
                                                 geometricBounds:newFrameBounds} );
         } else {
            monthFrame = myPage.textFrames.add( {geometricBounds:newFrameBounds} );
         }
         monthFrame.contents = settings.months[ iMonth ];
         monthFrame.paragraphs.everyItem().appliedParagraphStyle = myDocument.paragraphStyles.item( 'cal_month' + settings.styleSet)
         PlaceFrameOnDateLayer( settings, monthFrame )
         
         // make sure the units are in inches by re-getting the frame bounds.
         if( settings.bUseCustomYearFrameSize ){
            newFrameBounds = new Array( settings.yearCustomSizeY1 + unitSuffix,
                                        settings.yearCustomSizeX1 + unitSuffix,
                                        settings.yearCustomSizeY2 + unitSuffix,
                                        settings.yearCustomSizeX2 + unitSuffix );

         } else {
            newFrameBounds = monthFrame.geometricBounds;
            newFrameBounds = new Array( newFrameBounds[0], newFrameBounds[3], newFrameBounds[2], parseFloat(newFrameBounds[3])+yearWidth );
         }

         if( settings.bObjectStyles ){
            yearFrame = myPage.textFrames.add( {appliedObjectStyle:myDocument.objectStyles.item( "cal_customYearFrame" + settings.styleSet ),
                                                geometricBounds:newFrameBounds} );
         } else {
            yearFrame = myPage.textFrames.add( {geometricBounds:newFrameBounds} );
         }
         yearFrame.contents = iYear.toString();
         yearFrame.paragraphs.everyItem().appliedParagraphStyle = myDocument.paragraphStyles.item( 'cal_year' + settings.styleSet)
         PlaceFrameOnDateLayer( settings, yearFrame )
      } else {
         if( settings.bUseCustomMonthFrameSize ){
            newFrameBounds = new Array( settings.monthCustomSizeY1 + unitSuffix,
                                        settings.monthCustomSizeX1 + unitSuffix,
                                        settings.monthCustomSizeY2 + unitSuffix,
                                        settings.monthCustomSizeX2 + unitSuffix );
         } else {
            newFrameBounds = new Array( calendarFrameBounds[0], calendarFrameBounds[1], calendarFrameBounds[0]-settings.monthFrameHeight, calendarFrameBounds[3] );
         }
         if( settings.bObjectStyles ){
            monthFrame = myPage.textFrames.add( {appliedObjectStyle:myDocument.objectStyles.item( "cal_customMonthFrame" + settings.styleSet ),
                                                 geometricBounds:newFrameBounds} );
         } else {
            monthFrame = myPage.textFrames.add( {geometricBounds:newFrameBounds} );
         }
         if( settings.bIncludeYear || settings.bIncludeYearInCalendar ){
            monthFrame.contents = settings.months[ iMonth ] + " " + iYear;
         } else {
            monthFrame.contents = settings.months[ iMonth ];
         }
         monthFrame.paragraphs.everyItem().appliedParagraphStyle = myDocument.paragraphStyles.item( 'cal_month' + settings.styleSet)
         PlaceFrameOnDateLayer( settings, monthFrame )
      }
   }
   return;
}
// --------------------------------------------------------------- //
function sComputeChecksum( contents )
{
   var contents;
   var i;
   var sum = 0;
   for( i = 0; i < contents.length; i++ ){
      sum += contents.charCodeAt( i );
   }
   return( sum );
}
// --------------------------------------------------------------- //
function readLicenseFile( settings )
{
   var file = settings.licenseFile;
   var contents;

   if( file.exists && file.open( 'r' ) ){
      contents = file.readln();
      buffer = contents.split( /:/ );
      if( buffer.length >= 2 && settings.somethingRegExp.test( buffer[0] ) && settings.somethingRegExp.test( buffer[1] ) ){
         settings.bLicensed = true;
         settings.licenseType = buffer[0];
         settings.licenseKey = buffer[1];
         settings.licensedTo = buffer[2];
      } else if( buffer.length == 1 && settings.somethingRegExp.test( buffer[0] ) ){
         settings.bLicensed = true;
         settings.licenseType = buffer[0];
         settings.licenseKey = buffer[1];
      }
      file.close();
   }
   return;
}
// --------------------------------------------------------------- //
function aReadFileWithChecksum( file )
{
   var contents;
   var lines = new Array();
   var checksum = 0;
   var checkSumRegExp = /^\s*#\s*CHECKSUM\s*=\s*(\d+)\s*$/;
   
   if( file.exists && file.open( 'r' ) ){
      while( file.tell() < file.length ){
         contents = file.readln();
         if( checksum == 0 && checkSumRegExp.test( contents ) ){
            buffer = checkSumRegExp.exec( contents );
            checksum = buffer[1];
         } else {
            lines.push( contents );
         }
      }
      file.close();
   }

   return( [ checksum, lines ] );

}
// --------------------------------------------------------------- //
function sChecksum( file )
{
   var contents;
   var lines = new Array();
   var sum = 0;
   var checkSumRegExp = /^\s*#\s*CHECKSUM\s*=\s*(\d+)\s*$/;

   var buffer = aReadFileWithChecksum( file );
   var sum = sComputeChecksum( buffer[1].join( "" ) );
   
   return sum;
}
// --------------------------------------------------------------- //
function bFileHasLocalModifications( file )
{
   var buffer = aReadFileWithChecksum( file );
   var checksum = buffer[0]
   var sum = sComputeChecksum( buffer[1].join( "" ) );
   var bFlag;

   if( checksum == sum ){
      bFlag = false;
   } else {
      bFlag = true;
   }

   return( bFlag );
}
// --------------------------------------------------------------- //
function openMailTo( settings ){
   if( settings.bWindows ){
      openUrlInBrowser( settings, settings.mailto );
   } else {
      openUrlWithLauncher( settings, "mailto.command" );
   }
}
// --------------------------------------------------------------- //
function openElleMediaGroup( settings ){
   if( settings.bWindows ){
      openUrlInBrowser( settings, settings.elleMediaGroupUrl );
   } else {
      openUrlWithLauncher( settings, "openElleMediaGroup.command" );
   }
}
// --------------------------------------------------------------- //
function openCalendarWizardUrl( settings ){
   if( settings.bWindows ){
      openUrlInBrowser( settings, settings.sourceForgeHome );
   } else {
      openUrlWithLauncher( settings, "openCalendarWizard.command" );
   }
}
// --------------------------------------------------------------- //
function openFacebook( settings ){
   if( settings.bWindows ){
      openUrlInBrowser( settings, settings.facebookHome );
   } else {
      openUrlWithLauncher( settings, "openFacebook.command" );
   }
}
// --------------------------------------------------------------- //
function openDonation( settings ){
   if( settings.bWindows ){
      openUrlInBrowser( settings, settings.paypalDonate );
   } else {
      openUrlWithLauncher( settings, "openDonation.command" );
   }
}
// --------------------------------------------------------------- //
function openSingleUseCommercialLicense( settings ){
   if( settings.bWindows ){
      openUrlInBrowser( settings, settings.paypalSingleUse );
   } else {
      openUrlWithLauncher( settings, "openSingleUseCommercialLicense.command" );
   }
}
// --------------------------------------------------------------- //
function openEnterpriseUseCommercialLicense( settings ){
   if( settings.bWindows ){
      openUrlInBrowser( settings, settings.paypalEnterpriseUse );
   } else {
      openUrlWithLauncher( settings, "openEnterpriseUseCommercialLicense.command" );
   }
}
// --------------------------------------------------------------- //
function openUrlWithLauncher( settings, launcher ){
   var launcherFileName = settings.webLaunchersDirectory + "/" + launcher;
   var launcherFile = File( launcherFileName );
   if( launcherFile.exists ){
      launcherFile.execute();
   }
}
// --------------------------------------------------------------- //
function openUrlInBrowser( settings, url ){
   // this doesn't work for OSX with Chrome as the default browser.
   var tempFileName = Folder.temp.fullName+"/calendarWizardUrlLauncher.html";
   var tempFile     = File( tempFileName );
   var contents = "<html><head><META HTTP-EQUIV=Refresh CONTENT=\"0; URL="+url+"\"></head><body><p></p></body></html>";
   tempFile.open("w");
   tempFile.write( contents );
   tempFile.close();
   tempFile.execute();
}
