function ParseScriptUiUserInput( settings, mainWindow )
{
   var i;
   var pageSize;

   settings.bHolidayStyleA = false;
   settings.bHolidayStyleB = false;
   settings.bHolidayStyleC = false;
   settings.bHolidayStyleD = false;
   settings.holidaySelectorsStyle = new Array();


   // Start and End Month
   settings.iStartMonth = mainWindow.startMonth.selection.index;
   settings.iEndMonth   = mainWindow.endMonth.selection.index;

   // Start and End Year
   if( settings.useYearEntry ){
      settings.sStartYear = mainWindow.customStartYear.text;
      settings.sEndYear = mainWindow.customEndYear.text;
   } else {
      settings.sStartYear = mainWindow.startYear.selection.text;
      settings.sEndYear = mainWindow.endYear.selection.text;
   }
   settings.iStartYear = parseInt( settings.sStartYear );
   settings.iEndYear = parseInt( settings.sEndYear );
   settings.iCalendarsToMake = 12*(settings.iEndYear - settings.iStartYear + 1) - settings.iStartMonth - (12-settings.iEndMonth-1);
   
   // Calendar Options
   selectLanguage( settings, { Language : { selectedIndex : mainWindow.language.selection.index } } );
   

   if( mainWindow.workWeekOptions.selection.index == 2 ) {
      settings.workWeekStart = 'Jan1';
   } else if( mainWindow.workWeekOptions.selection.index == 1 ) {
      settings.workWeekStart = 'WeekIncludingFirstThursday';
   } else {
      settings.workWeekStart = 'FirstFullWeek';
   }
 
   // Week start day/Day Ordering
   if( mainWindow.weekStartsOn.selection.text == "Monday" ){
      settings.dayOrdering = new Array(1, 2, 3, 4, 5, 6, 0);
   } else if( mainWindow.weekStartsOn.selection.text == "Saturday" ){
      settings.dayOrdering = new Array(6, 0, 1, 2, 3, 4, 5);
   } else {
      settings.dayOrdering = new Array(0, 1, 2, 3, 4, 5, 6);
   }
   settings.weekStartDay = settings.dayOrdering[0];

   // Add Mini Calendars
   if( settings.bGridCalendar && mainWindow.includeMiniCalendars.enabled && mainWindow.includeMiniCalendars.value ){
      settings.bAddMiniCalendars = true;
   } else {
      settings.bAddMiniCalendars = false;
   } 

   if( settings.numberRegExp.test(mainWindow.moonSize.text)){
      settings.moonSize = parseFloat( mainWindow.moonSize.text / 100 );
   }
 
   settings.moonRotation = mainWindow.moonRotation.selection.text;
   if( mainWindow.dominantHighlighting.selection.index == 0 ){
      settings.bHighlightHolidaysIsDominant = true;
   }

   // Include Month/Year Options
   if( settings.bGridCalendar ){
      // Exclude
      if( mainWindow.gridCalendarMonthLabelingOptions.selection.index == 0 ){
         settings.bIncludeYearInCalendar = false;
         settings.bIncludeMonthNameInCalendar = false;
      // Month
      } else if( mainWindow.gridCalendarMonthLabelingOptions.selection.index == 1 ){
         settings.bIncludeYearInCalendar = false;
         settings.bIncludeMonthNameInCalendar = true;
      // Month and Year
      } else {
         settings.bIncludeYearInCalendar = true;
         settings.bIncludeMonthNameInCalendar = true;
      }

      // Auto
      if( mainWindow.miniCalendarMonthLabelingOptions.selection.index == 0 ){
         settings.bIncludeYearInMiniCalendar = settings.bIncludeInCalendarYear;
         settings.bAutoIncludeYearInMiniCalendar = true;
      // Month
      } else if( mainWindow.miniCalendarMonthLabelingOptions.selection.index == 1 ){
         settings.bIncludeYearInMiniCalendar = false;
         settings.bAutoIncludeYearInMiniCalendar = false;
      // Month and Year
      } else {
         settings.bIncludeYearInMiniCalendar = true;
         settings.bAutoIncludeYearInMiniCalendar = false;
      }
   } else if( settings.bListCalendar || settings.bLineCalendar ){
      if( mainWindow.listLineCalendarMonthLabelingOptions.selection.index == 0 ) {
         settings.bIncludeMonthName = false;
         settings.bIncludeYear      = false;
         settings.bFrameForYear     = false;
      } else if( mainWindow.listLineCalendarMonthLabelingOptions.selection.index == 1 ) {
         settings.bIncludeMonthName = true;
         settings.bIncludeYear      = false;
         settings.bFrameForYear     = false;
      } else if( mainWindow.listLineCalendarMonthLabelingOptions.selection.index == 2 ) {
         settings.bIncludeMonthName = true;
         settings.bIncludeYear      = true;
         settings.bFrameForYear     = false;
      } else {
         settings.bIncludeMonthName = true;
         settings.bIncludeYear      = true;
         settings.bFrameForYear     = true;
      }
   }

   settings.headerType = mainWindow.weekDayHeadingStyle.selection.text;
   settings.bWorkWeek = mainWindow.includeWorkWeek.value;
   settings.bMoons = mainWindow.includeMoons.value;
   settings.bImportStyles = mainWindow.importStylesFromReferenceCalendar.value;

   
   if( settings.bGridCalendar){
      settings.bWeekDay = mainWindow.includeWeekDayInGridCalendar.value;
   } else if( settings.bListCalendar ){
      settings.bWeekDay = mainWindow.addWeekDayColumn.value;
   } else if( settings.bLineCalendar ){
      settings.bWeekDay = mainWindow.addWeekDayLayer.value;
   }

   if( mainWindow.workWeekPrefix.enabled && mainWindow.workWeekPrefix.text.match( settings.anytingRegExp ) ){
      settings.workWeekPrefix = mainWindow.workWeekPrefix.text;
   } else {
      settings.workWeekPrefix = "";
   }

   if( settings.bGridCalendar){
      settings.bAddNonMonthDays  = mainWindow.includeNonMonthDays.value;
      settings.bHighlightSundays = mainWindow.highlightSundays.value;
      
      // Row count ( 0 = auto select )
      if( mainWindow.maxNumberOfRowsOptions.selection.index > 0 ){
         settings.iFixedRowCount = parseInt( mainWindow.maxNumberOfRowsOptions.selection.text );
      } else {
         settings.iFixedRowCount = 0;
      }
      
      if( mainWindow.maxNumberOfRowsInMiniCalendarsOptions.selection.index > 0 ){
         settings.iFixedRowCountForMiniCalendars = parseInt( mainWindow.maxNumberOfRowsInMiniCalendarsOptions.selection.text );
      } else {
         settings.iFixedRowCountForMiniCalendars = 0;
      }
   }

   if( settings.bGridCalendar || settings.bLineCalendar ){
      settings.bHolidaysLayer       = mainWindow.addHolidayLayer.value;
      //settings.bHolidaysLayerA      = mainWindow.addHolidayLayerA.value;
      settings.bHolidaysLayerB      = mainWindow.addHolidayLayerB.value;
      settings.bHolidaysLayerC      = mainWindow.addHolidayLayerC.value;
      settings.bHolidaysLayerD      = mainWindow.addHolidayLayerD.value;
      settings.bHolidaysLayerManual = mainWindow.addHolidayLayer.value 
                                     //|| mainWindow.addHolidayLayerA.value || mainWindow.addHolidayLayerB.value 
                                     mainWindow.addHolidayLayerB.value 
                                     || mainWindow.addHolidayLayerC.value || mainWindow.addHolidayLayerD.value;
      settings.bJulianDateLayer     = mainWindow.addDayOfYearLayer.value;
      settings.bPicturesLayer       = mainWindow.addPictureLayer.value;
      settings.bTextLayer           = mainWindow.addTextLayer.value;
   }
   settings.bHighlightHolidays      = mainWindow.highlightHolidays.value;  
   settings.bDateLayer              = mainWindow.useCalendarLayer.value;
   settings.bBackgroundLayer        = mainWindow.addBackgroundLayer.value;

   if( settings.bHolidaysLayer ){
      settings.bHolidayStylesOn = true;
   }
   if( settings.bHighlightHolidays ){
      settings.bHolidayStylesOn = true;
   }

   if( settings.bListCalendar || settings.bLineCalendar ){
      settings.bIncludeStylesForEveryDay   = mainWindow.includeStylesForEveryDay.value;

      if( mainWindow.highlightWeekendOptions.selection.index == 0 ) {
         settings.bHighlightSundays    = false;
         settings.bHighlightSaturdays  = false;
         settings.bHighlightWeekends   = false;
      } else if( mainWindow.highlightWeekendOptions.selection.index == 1 ) {
         settings.bHighlightSundays    = true;
         settings.bHighlightSaturdays  = true;
         settings.bHighlightWeekends   = true;
      } else if( mainWindow.highlightWeekendOptions.selection.index == 2 ) {
         settings.bHighlightSundays    = true;
         settings.bHighlightSaturdays  = false;
         settings.bHighlightWeekends   = false;
      } else {
         settings.bHighlightSundays    = false;
         settings.bHighlightSaturdays  = true;
         settings.bHighlightWeekends   = false;
      }

      if( settings.bListCalendar ){
         settings.columnOrder = mainWindow.columnOrderOptions.selection.text;
         settings.bMergeDateAndWeekDayColumns =  mainWindow.mergeDateAndDayColumns.value;

      } else if( settings.bLineCalendar ){
         if( mainWindow.orientationOptions.selection.index == 0 ){
            settings.bVertical = false;
         } else {
            settings.bVertical = true;
         }
      
         if( mainWindow.cellSpacingOptions.selection.index == 0 ){
            if( settings.iStartYear == settings.iEndYear && settings.iStartMonth == settings.iEndMonth ){
               settings.bUseFullFrame = true;
            } else {
               settings.bUseFullFrame = false;
            }
         } else if( mainWindow.cellSpacingOptions.selection.index == 1 ){
            settings.bUseFullFrame = true;
         } else {
            settings.bUseFullFrame = false;
         }
  
         settings.bLineCalendarSquareCells = mainWindow.forceSquareCells.value;
         settings.daysPerLine = mainWindow.daysPerLineOptions.selection.text;
         settings.bOnlyPrintFirstWeekday = mainWindow.onlyPrintFirstWeekday.value;
         settings.putEmptyCellsAtEndOfLine = mainWindow.putEmptyCellsAtEndOfLine.value;
      }

   }


   settings.customPageSizeUnits = mainWindow.documentUnitOptions.selection.text;
   settings.customSizeUnits     = mainWindow.documentUnitOptions.selection.text;
   settings.styleSet            = mainWindow.styleSetOptions.selection.text;
   scaleFactor = getScaleFactorFromUnits( settings.customSizeUnits );

   if( settings.bListCalendar ){
      if( settings.numberRegExp.test( mainWindow.dateColumnWidth.text ) ){
         settings.dateColumnWidth = mainWindow.dateColumnWidth.text;
      } else {
         settings.dateColumnWidth = settings.defaultDateColumnWidthInInches/scaleFactor;
      }
      settings.iDateColumnWidth = parseFloat( settings.dateColumnWidth );

      if( settings.numberRegExp.test( mainWindow.weekDayColumnWidth.text ) ){
         settings.weekDayColumnWidth = mainWindow.weekDayColumnWidth.text;
      } else {
         settings.weekDayColumnWidth = settings.defaultWeekDayColumnWidthInInches/scaleFactor;
      }
      settings.iWeekDayColumnWidth = parseFloat( settings.weekDayColumnWidth );
   
      if( settings.numberRegExp.test( mainWindow.moonColumnWidth.text ) ){
         settings.bUsingDefaultMoonPhaseColumnWidth = false;
         settings.moonPhaseColumnWidth = mainWindow.moonColumnWidth.text;;
      } else {
         settings.bUsingDefaultMoonPhaseColumnWidth = true;
         settings.moonPhaseColumnWidth = settings.defaultMoonPhaseColumnWidthInInches/scaleFactor;
      }
      settings.iMoonPhaseColumnWidth = parseFloat( settings.moonPhaseColumnWidth );

      if( settings.numberRegExp( mainWindow.workWeekColumnWidth.text ) ){
         settings.workWeekColumnWidth = mainWindow.workWeekColumnWidth.text;
      } else {
         settings.workWeekColumnWidth = settings.defaultWorkWeekColumnWidthInInches/scaleFactor;
      }
      settings.iWorkWeekColumnWidth = parseFloat( settings.workWeekColumnWidth );

      if( settings.anythingRegExp( mainWindow.dateWeekDayDelimiter.text ) ){
         settings.dateWeekDayDelimiter = mainWindow.dateWeekDayDelimiter.text;
         settings.dateWeekDayDelimiter = settings.dateWeekDayDelimiter.replace( /\\t/g, "\t" );
         settings.dateWeekDayDelimiter = settings.dateWeekDayDelimiter.replace( /\\n/g, "\n" );
      } else {
         settings.dateWeekDayDelimiter = settings.defaultDateWeekDayDelimiter;
      }
   
      settings.columnCount = mainWindow.columnCountOptions.selection.index + 1
      if( settings.numberRegExp.test( mainWindow.columnGutter.text ) ){
         settings.columnGutter = parseFloat( mainWindow.columnGutter.text );
      } else {
         settings.colummGutter = 0;
      }

      if( settings.bMergeDateAndWeekDayColumns ){
         settings.dateColumnWidth = parseFloat( settings.dateColumnWidth ) + parseFloat( settings.weekDayColumnWidth );
         settings.iDateColumnWidth = parseFloat( settings.dateColumnWidth );
      }
   }

   // Page Options
   if( settings.bGridCalendar || settings.bLineCalendar ){
      settings.iCalendarsPerPage = parseInt( mainWindow.calendarsPerPageOptions.selection.text );
   } else {
      settings.iCalendarsPerPage = 1;
   }
   settings.sPageType          = mainWindow.documentTargetOptions.selection.text;
   settings.sPageOrientation   = mainWindow.documentOrientationOptions.selection.text;
   settings.sColorSpace        = mainWindow.colorSpaceOptions.selection.text;
   settings.sSpacerPageOption  = mainWindow.spacerPageOptions.selection.text;
   settings.bIncludeCoverPages = mainWindow.includeCoverPages.value;
    

   if( mainWindow.addCustomPictureFrameToSpacerPage.enabled && mainWindow.addCustomPictureFrameToSpacerPage.value ){
      settings.bAddCustomPictureFrameToSpacerPage = true;
   }
   if( mainWindow.addCustomMonthYearFramesToSpacerPage.enabled && mainWindow.addCustomMonthYearFramesToSpacerPage.value ){
      settings.bAddCustomMonthYearFramesToSpacerPage = mainWindow.addCustomMonthYearFramesToSpacerPage.value;
   }

   // Add Holidays from Frame
   if( mainWindow.loadHolidayFromCurrentFrameA.value
       || mainWindow.loadHolidayFromCurrentFrameA.value
       || mainWindow.loadHolidayFromCurrentFrameB.value
       || mainWindow.loadHolidayFromCurrentFrameC.value ){
      settings.bGetFrameHolidays = true;
      settings.bHolidayStylesOn = true;
      settings.bHolidaysLayer = true;

      if( settings.sPageType == "Auto" )
      {
         settings.sPageType = 'New Document';
      }

      if( mainWindow.loadHolidayFromCurrentFrameA.value )
      {
          settings.bHolidayStyleA = true;
          settings.GetHolidaysFromCurrentFrameStyle = 'A';
      }
      else if( mainWindow.loadHolidayFromCurrentFrameB.value )
      {
          settings.bHolidayStyleB = true;
          settings.GetHolidaysFromCurrentFrameStyle = 'B';
      }
      else if( mainWindow.loadHolidayFromCurrentFrameC.value )
      {
          settings.bHolidayStyleC = true;
          settings.GetHolidaysFromCurrentFrameStyle = 'C';
      }
      else if( mainWindow.loadHolidayFromCurrentFrameD.value )
      {
          settings.bHolidayStyleD = true;
          settings.GetHolidaysFromCurrentFrameStyle = 'D';
      }
      else
      {
          settings.bHolidayStyleA = true;
          settings.GetHolidaysFromCurrentFrameStyle = 'A';
      }
   } else {
      settings.bGetFrameHolidays = false;
   }

   // Holiday Custom Files
   if( mainWindow.loadHolidayFromCustomFileA.value 
       || mainWindow.loadHolidayFromCustomFileB.value 
       || mainWindow.loadHolidayFromCustomFileC.value 
       || mainWindow.loadHolidayFromCustomFileD.value ){
      settings.bGetCustomHolidays = true;
      settings.bHolidayStylesOn = true;
      settings.bHolidaysLayer = true;

      if( mainWindow.loadHolidayFromCustomFileA.value )
      {
          settings.bHolidayStyleA = true;
          settings.GetHolidaysFromCustomFilesStyle = 'A';
      }
      else if( mainWindow.loadHolidayFromCustomFileB.value )
      {
          settings.bHolidayStyleB = true;
          settings.GetHolidaysFromCustomFilesStyle = 'B';
      }
      else if( mainWindow.loadHolidayFromCustomFileC.value )
      {
          settings.bHolidayStyleC = true;
          settings.GetHolidaysFromCustomFilesStyle = 'C';
      }
      else if( mainWindow.loadHolidayFromCustomFileD.value )
      {
          settings.bHolidayStyleD = true;
          settings.GetHolidaysFromCustomFilesStyle = 'D';
      }
      else
      {
          settings.bHolidayStyleA = true;
          settings.GetHolidaysFromCustomFilesStyle = 'A';
      }

   } else {
      settings.bGetCustomHolidays = false;
   }
 
   // Holiday Files
   for( i = 0; i < settings.holidayFiles.length; i++ )
   {
      if( mainWindow.holidaySelectorsA[i].value
          || mainWindow.holidaySelectorsB[i].value
          || mainWindow.holidaySelectorsC[i].value
          || mainWindow.holidaySelectorsD[i].value ){
         settings.bGetFileHolidays = true;
         settings.bHolidaysFile[i] = true;
         settings.bHolidayStylesOn = true;
         settings.bHolidaysLayer = true;

         if( mainWindow.holidaySelectorsA[i].value )
         {
             settings.bHolidayStyleA = true;
             settings.holidaySelectorsStyle[i] = 'A';
         }
         else if( mainWindow.holidaySelectorsB[i].value )
         {
             settings.bHolidayStyleB = true;
             settings.holidaySelectorsStyle[i] = 'B';
         }
         else if( mainWindow.holidaySelectorsC[i].value )
         {
             settings.bHolidayStyleC = true;
             settings.holidaySelectorsStyle[i] = 'C';
         }
         else if( mainWindow.holidaySelectorsD[i].value )
         {
             settings.bHolidayStyleD = true;
             settings.holidaySelectorsStyle[i] = 'D';
         }
         else
         {
             settings.bHolidayStyleA = true;
             settings.holidaySelectorsStyle[i] = 'A';
         }

         } else {
         settings.bHolidaysFile[i] = false;
      }
   }

   if( settings.numberRegExp.test( mainWindow.documentMargins.text ) )
   {
      settings.bUseCustomPageMargin = true;
      settings.customPageMargin = mainWindow.documentMargins.text;
   }
   else
   {
      settings.bUseCustomPageMargin = false;
   }

   if( settings.numberRegExp.test( mainWindow.documentBleed.text ) )
   {
      settings.bUseCustomPageBleed = true;
      settings.customPageBleed = mainWindow.documentBleed.text;
   }

   var customFrames = new Array( 'calendar', 'month', 'year', 'picture' );
   for( i = 0; i < customFrames.length; i++ ){
      var key = customFrames[i];
      if( settings.bUseCustomHeightAndWidth ){
         if(    settings.numberRegExp.test( mainWindow[ key + 'CustomHeight'].text )
             && settings.numberRegExp.test( mainWindow[ key + 'CustomWidth'].text )
             && settings.numberRegExp.test( mainWindow[ key + 'CustomTopEdge'].text )
             && settings.numberRegExp.test( mainWindow[ key + 'CustomLeftEdge'].text )){


            if( key == 'month' ){
               settings.bUseCustomMonthFrameSize = true;
               settings.bIncludeMonthName = true;
               settings.bIncludeMonthNameInCalendar = false;
            } else if( key == 'year' ){
               settings.bUseCustomYearFrameSize = true;
               settings.bIncludeYear            = true;
               settings.bFrameForYear           = true;
            } else if( key == 'picture' ){
               settings.bAddPictureFrame = true;
            } else if( key == 'calendar' ){
               settings.bUseCustomSize = true;
            }
            settings[ key + "CustomSizeY1" ] = mainWindow[ key + 'CustomTopEdge' ].text;
            settings[ key + "CustomSizeY2" ] = ( parseFloat( mainWindow[ key + 'CustomTopEdge' ].text ) + parseFloat( mainWindow[ key + 'CustomHeight' ].text ) ).toString();
            settings[ key + "CustomSizeX1" ] = mainWindow[ key + 'CustomLeftEdge' ].text;
            settings[ key + "CustomSizeX2" ] = ( parseFloat( mainWindow[ key + 'CustomLeftEdge' ].text ) + parseFloat( mainWindow[ key + 'CustomWidth' ].text ) ).toString();
         } else {
            if( key == 'month' ){
               settings.bUseCustomMonthFrameSize = false;
            } else if( key == 'year' ){
               settings.bUseCustomYearFrameSize = false;
            } else if( key == 'picture' ){
               settings.bAddPictureFrame = false;
            } else if( key == 'calendar' ){
               settings.bUseCustomSize = false;
            }
         }
      } else {
         if(    settings.numberRegExp( mainWindow[ key + 'CustomSizeY1' ].text )
             && settings.numberRegExp( mainWindow[ key + 'CustomSizeY2' ].text )
             && settings.numberRegExp( mainWindow[ key + 'CustomSizeX1' ].text )
             && settings.numberRegExp( mainWindow[ key + 'CustomSizeX2' ].text ) ){

            if( key == 'month' ){
               settings.bUseCustomMonthFrameSize = true;
               settings.bIncludeMonthName = true;
               settings.bIncludeMonthNameInCalendar = false;
            } else if( key == 'year' ){
               settings.bUseCustomYearFrameSize = true;
               settings.bIncludeYear            = true;
               settings.bFrameForYear           = true;
            } else if( key == 'picture' ){
               settings.bAddPictureFrame = true;
            } else if( key == 'calendar' ){
               settings.bUseCustomSize = true;
            }

            settings[ key + 'CustomSizeY1' ] = mainWindow[ key + 'CustomSizeY1' ].text;
            settings[ key + 'CustomSizeY2' ] = mainWindow[ key + 'CustomSizeY2' ].text;
            settings[ key + 'CustomSizeX1' ] = mainWindow[ key + 'CustomSizeX1' ].text;
            settings[ key + 'CustomSizeX2' ] = mainWindow[ key + 'CustomSizeX2' ].text;
         } else {
            if( key == 'month' ){
               settings.bUseCustomMonthFrameSize = false;
            } else if( key == 'year' ){
               settings.bUseCustomYearFrameSize = false;
            } else if( key == 'picture' ){
               settings.bAddPictureFrame = false;
            } else if( key == 'calendar' ){
               settings.bUseCustomSize = false;
            }
         }
      }
   }
   
   setPageSize( settings, mainWindow.documentHeight.text,
                          mainWindow.documentWidth.text,
                          mainWindow.documentSizeOptions.selection.text );

   return;
}
// --------------------------------------------------------------- //
function ParseUserInput( settings, selector )
{
   var i;
   var pageSize;
   settings.bHolidayStyleA = false;
   settings.bHolidayStyleB = false;
   settings.bHolidayStyleC = false;
   settings.bHolidayStyleD = false;
   settings.holidaySelectorsStyle = new Array();

   // Start and End Month
   settings.iStartMonth  = selector.StartMonth.selectedIndex;
   settings.iEndMonth    = selector.EndMonth.selectedIndex;

   // Start and End Year
   settings.sStartYear   = settings.yearOptions[ selector.StartYear.selectedIndex ];
   settings.sEndYear     = settings.yearOptions[ selector.EndYear.selectedIndex ];
   settings.iStartYear   = parseInt( settings.sStartYear );
   settings.iEndYear     = parseInt( settings.sEndYear );
   settings.iCalendarsToMake = 12*(settings.iEndYear - settings.iStartYear + 1) - settings.iStartMonth - (12-settings.iEndMonth-1);

   // Calendar Options
   selectLanguage( settings, selector );
   
   if( selector.WorkWeekStart.selectedIndex == 2 ) {
      settings.workWeekStart = 'Jan1';
   } else if( selector.WorkWeekStart.selectedIndex == 1 ) {
      settings.workWeekStart = 'WeekIncludingFirstThursday';
   } else {
      settings.workWeekStart = 'FirstFullWeek';
   }
 
   // Week start day/Day Ordering
   if( selector.StartDay.selectedIndex == 1 ){
      settings.dayOrdering = new Array(1, 2, 3, 4, 5, 6, 0);
   } else if ( selector.StartDay.selectedIndex== 2){
      settings.dayOrdering = new Array(6, 0, 1, 2, 3, 4, 5);
   } else {
      settings.dayOrdering = new Array(0, 1, 2, 3, 4, 5, 6);
   }
   settings.weekStartDay = settings.dayOrdering[0];

   // Add Mini Calendars
   if( settings.bGridCalendar ){
      settings.bAddMiniCalendars = selector.AddMiniCalendars.checkedState;
   } else {
      settings.bAddMiniCalendars = false;
   }

   if( settings.numberRegExp.test( selector.moonSize.editContents ) ){
      settings.moonSize = selector.moonSize.editContents/100;
   }

   settings.moonRotation = settings.moonRotationOptions[ selector.moonRotation.selectedIndex ];

   // Including Month/Year Options 
   if( settings.bGridCalendar ){
      // Exclude
      if( selector.MonthIdentification.selectedIndex == 0 ){
         settings.bIncludeYearInCalendar = false;
         settings.bIncludeMonthNameInCalendar = false;
      // Month
      } else if( selector.MonthIdentification.selectedIndex == 1 ){
         settings.bIncludeYearInCalendar = false;
         settings.bIncludeMonthNameInCalendar = true;
      // Month and Year
      } else if( selector.MonthIdentification.selectedIndex == 2 ){
         settings.bIncludeYearInCalendar = true;
         settings.bIncludeMonthNameInCalendar = true;
      }
   
      // Auto
      if( selector.miniCalMonthIdentification.selectedIndex == 0 ){
         settings.bIncludeYearInMiniCalendar = settings.bIncludeYear;
         settings.bAutoIncludeYearInMiniCalendar = true;
      // Month
      } else if( selector.miniCalMonthIdentification.selectedIndex == 1 ){
         settings.bIncludeYearInMiniCalendar = false;
         settings.bAutoIncludeYearInMiniCalendar = false;
      // Month and Year
      } else if( selector.miniCalMonthIdentification.selectedIndex == 2 ){
         settings.bIncludeYearInMiniCalendar = true;
         settings.bAutoIncludeYearInMiniCalendar = false;
      }
   } else if( settings.bListCalendar || settings.bLineCalendar ){
     if( selector.monthYearOptions.selectedIndex == 0 ) {
         settings.bIncludeMonthName = false;
         settings.bIncludeYear      = false;
         settings.bFrameForYear     = false;
      } else if( selector.monthYearOptions.selectedIndex == 1 ) {
         settings.bIncludeMonthName = true;
         settings.bIncludeYear      = false;
         settings.bFrameForYear     = false;
      } else if( selector.monthYearOptions.selectedIndex == 2 ) {
         settings.bIncludeMonthName = true;
         settings.bIncludeYear      = true;
         settings.bFrameForYear     = false;
      } else {
         settings.bIncludeMonthName = true;
         settings.bIncludeYear      = true;
         settings.bFrameForYear     = true;
      }
   }

   settings.headerType              = settings.headerOptions[ selector.headerOptions.selectedIndex ];
   settings.bWorkWeek               = selector.WorkWeek.checkedState;
   settings.bMoons                  = selector.Moons.checkedState;
   settings.bImportStyles           = selector.ImportStyles.checkedState;
   settings.bWeekDay                = selector.IncludeWeekDayNames.checkedState;
   
   settings.bAddCustomPictureFrameToSpacerPage = selector.addPictureCustomFrameToSpacerPage.checkedState;
   settings.bAddCustomMonthYearFramesToSpacerPage = selector.addMonthYearCustomFramesToSpacerPage.checkedState;

   // this needs to after bWorkWeek is set, as it could be set to false
   if( selector.workWeekPrefix.editContents.match( settings.anythingRegExp ) ){
      settings.workWeekPrefix = selector.workWeekPrefix.editContents;
      settings.bWorkWeek = true;
   }

   if( settings.bGridCalendar ){
      settings.bAddNonMonthDays     = selector.AddNonMonthDays.checkedState;
      settings.bHighlightSundays    = selector.bHighlightSundays.checkedState;

      // Row count ( 0 = auto select )
      if( selector.MaxRowCount.selectedIndex > 0 ){
         settings.iFixedRowCount = parseInt( settings.maxRowCountOptions[ selector.MaxRowCount.selectedIndex ] );
      } else {
         settings.iFixedRowCount = 0;
      }
      
      if( selector.MaxRowCountInMiniCalendars.selectedIndex > 0 ){
         settings.iFixedRowCountForMiniCalendars = parseInt( settings.maxRowCountInMiniCalendarsOptions[ selector.MaxRowCountInMiniCalendars.selectedIndex ] );
      } else {
         settings.iFixedRowCountForMiniCalendars = 0;
      }
   }
 
   if( settings.bGridCalendar || settings.bLineCandar ){
      settings.bHolidaysLayer       = selector.AddHolidaysLayer.checkedState;
      settings.bHolidaysLayerManual = selector.AddHolidaysLayer.checkedState;
      settings.bJulianDateLayer     = selector.AddJulianDateLayer.checkedState;
      settings.bPicturesLayer       = selector.AddPicturesLayer.checkedState;
      settings.bTextLayer           = selector.AddTextLayer.checkedState;
   }
   settings.bHighlightHolidays   = selector.bHighlightHolidays.checkedState;
   settings.bDateLayer           = selector.UseCalendarLayer.checkedState;
   settings.bBackgroundLayer     = selector.AddBackgroundLayer.checkedState;
   
   if( settings.bHolidaysLayer ){
      settings.bHolidayStylesOn = true;
   }
   if( settings.bHighlightHolidays ){
      settings.bHolidayStylesOn = true;
   }

   settings.bHighlightHolidaysIsDominant = selector.bHolidaysDominant.checkedState;

   if( settings.bListCalendar || settings.bLineCalendar ){

      settings.bIncludeStylesForEveryDay   = selector.IncludeStylesForEveryDay.checkedState;

      if( selector.highlightDayOptions.selectedIndex == 0 ) {
         settings.bHighlightSundays    = false;
         settings.bHighlightSaturdays  = false;
         settings.bHighlightWeekends   = false;
      } else if( selector.highlightDayOptions.selectedIndex == 1 ) {
         settings.bHighlightSundays    = true;
         settings.bHighlightSaturdays  = true;
         settings.bHighlightWeekends   = true;
      } else if( selector.highlightDayOptions.selectedIndex == 2 ) {
         settings.bHighlightSundays    = true;
         settings.bHighlightSaturdays  = false;
         settings.bHighlightWeekends   = false;
      } else {
         settings.bHighlightSundays    = false;
         settings.bHighlightSaturdays  = true;
         settings.bHighlightWeekends   = false;
      }

      if( settings.bListCalendar ){
         settings.columnOrder                 = settings.columnOrderOptions[ selector.columnOrderOptions.selectedIndex ];
         settings.bMergeDateAndWeekDayColumns = selector.MergeDateAndWeekDayColumns.checkedState;

      } else if( settings.bLineCalendar ){
         if( selector.Orientation.selectedIndex == 0 ){
            settings.bVertical = false;
         } else {
            settings.bVertical = true;
         }
      
         if( selector.cellSpacingOptions.selectedIndex == 0 ){
            if( settings.iStartYear == settings.iEndYear && settings.iStartMonth == settings.iEndMonth ){
               settings.bUseFullFrame = true;
            } else {
               settings.bUseFullFrame = false;
            }
         } else if( selector.cellSpacingOptions.selectedIndex == 1 ){
            settings.bUseFullFrame = true;
         } else {
            settings.bUseFullFrame = false;
         }

         settings.bLineCalendarSquareCells = selector.bLineCalendarSquareCells.checkedState;
         settings.daysPerLine = settings.daysPerLineOptions[ selector.daysPerLine.selectedIndex ];
         settings.bOnlyPrintFirstWeekday = selector.OnlyPrintFirstWeekday.checkedState;
         settings.putEmptyCellsAtEndOfLine = selector.PutEmptyCellsAtEndOfLine.checkedState;
      }
   }

   settings.customPageSizeUnits = settings.calendarCustomSizeUnitOptions[ selector.customSizeUnitOptions.selectedIndex ];
   settings.customSizeUnits     = settings.calendarCustomSizeUnitOptions[ selector.customSizeUnitOptions.selectedIndex ];
   settings.styleSet            = settings.styleSetOptions[ selector.styleSetOptions.selectedIndex ];
   scaleFactor = getScaleFactorFromUnits( settings.customSizeUnits );

   if( settings.bListCalendar ){
      if( settings.numberRegExp.test( selector.dateColumnWidth.editContents ) ){
         settings.dateColumnWidth = selector.dateColumnWidth.editContents;
      } else {
         settings.dateColumnWidth = settings.defaultDateColumnWidthInInches/scaleFactor;
      }
      settings.iDateColumnWidth = parseFloat( settings.dateColumnWidth );

      if( settings.numberRegExp.test( selector.weekDayColumnWidth.editContents ) ){
         settings.weekDayColumnWidth = selector.weekDayColumnWidth.editContents;
      } else {
         settings.weekDayColumnWidth = settings.defaultWeekDayColumnWidthInInches/scaleFactor;
      }
      settings.iWeekDayColumnWidth = parseFloat( settings.weekDayColumnWidth );
   
      if( settings.numberRegExp( selector.moonPhaseColumnWidth.editContents )){
         settings.bUsingDefaultMoonPhaseColumnWidth = false;
         settings.moonPhaseColumnWidth = selector.moonPhaseColumnWidth.editContents;
      } else {
         settings.bUsingDefaultMoonPhaseColumnWidth = true;
         settings.moonPhaseColumnWidth = settings.defaultMoonPhaseColumnWidthInInches/scaleFactor;
      }
      settings.iMoonPhaseColumnWidth = parseFloat( settings.moonPhaseColumnWidth );

      if( settings.numberRegExp.test( selector.workWeekColumnWidth.editContents ) ){
         settings.workWeekColumnWidth = selector.workWeekColumnWidth.editContents;
      } else {
         settings.workWeekColumnWidth = settings.defaultWorkWeekColumnWidthInInches/scaleFactor;
      }
      settings.iWorkWeekColumnWidth = parseFloat( settings.workWeekColumnWidth );

      if( settings.anythingRegExp.test( selector.dateWeekDayDelimiter.editContents ) ){
         settings.dateWeekDayDelimiter = selector.dateWeekDayDelimiter.editContents;
         settings.dateWeekDayDelimiter = settings.dateWeekDayDelimiter.replace( /\\t/g, "\t" );
         settings.dateWeekDayDelimiter = settings.dateWeekDayDelimiter.replace( /\\n/g, "\n" );
      } else {
         settings.dateWeekDayDelimiter = settings.defaultDateWeekDayDelimiter;
      }
   
      settings.columnCount = selector.columnCount.selectedIndex + 1;
      if( settings.numberRegExp( selector.columnGutter.editContents ) ){
         settings.columnGutter = parseFloat( selector.columnGutter.editContents )
      } else {
         settings.colummGutter = 0;
      }

      if( settings.bMergeDateAndWeekDayColumns ){
         settings.dateColumnWidth = parseFloat( settings.dateColumnWidth ) + parseFloat( settings.weekDayColumnWidth );
         settings.iDateColumnWidth = parseFloat( settings.dateColumnWidth );
      }
   }

   // Page Options
   if( settings.bGridCalendar || settings.bLineCalendar ){
      settings.iCalendarsPerPage = parseInt( settings.calendarsPerPageOptions[ 
                                             selector.CalendarsPerPage.selectedIndex ] );
   } else {
      settings.iCalendarsPerPage = 1;
   }
   settings.sPageType          = settings.pageTypeOptions[ selector.PageType.selectedIndex ];
   settings.sPageOrientation   = settings.pageOrientationOptions[ selector.PageOrientation.selectedIndex ];
   settings.sColorSpace        = settings.colorSpaceOptions[ selector.ColorSpace.selectedIndex ];
   settings.sSpacerPageOption  = settings.spacerPageOptions[ selector.spacerPageOptions.selectedIndex ];
   settings.bIncludeCoverPages = selector.includeCoverPages.checkedState;

   // Add Holidays from Frame
   if( selector.GetHolidayFromCurrentFrameA.checkedState || 
       selector.GetHolidayFromCurrentFrameB.checkedState ||
       selector.GetHolidayFromCurrentFrameC.checkedState ||
       selector.GetHolidayFromCurrentFrameD.checkedState ){
      settings.bGetFrameHolidays = true;
      settings.bHolidayStylesOn = true;
      settings.bHolidaysLayer = true;

      if( settings.sPageType == "Auto" )
      {
         settings.sPageType = 'New Document';
      }

      if( selector.GetHolidayFromCurrentFrameA.checkedState )
      {
          settings.bHolidayStyleA = true;
          settings.GetHolidaysFromCurrentFrameStyle = 'A';
      }
      else if( selector.GetHolidayFromCurrentFrameB.checkedState )
      {
          settings.bHolidayStyleB = true;
          settings.GetHolidaysFromCurrentFrameStyle = 'B';
      }
      else if( selector.GetHolidayFromCurrentFrameC.checkedState )
      {
          settings.bHolidayStyleC = true;
          settings.GetHolidaysFromCurrentFrameStyle = 'C';
      }
      else if( selector.GetHolidayFromCurrentFrameD.checkedState )
      {
          settings.bHolidayStyleD = true;
          settings.GetHolidaysFromCurrentFrameStyle = 'D';
      }
      else //( selector.GetHolidayFromCurrentFrameB.checkedState )
      {
          settings.bHolidayStyleA = true;
          settings.GetHolidaysFromCurrentFrameStyle = 'A';
      }
   } else {
      settings.bGetFrameHolidays = false;
   }

   // Holiday Custom Files
   if( selector.GetHolidayFromCustomFilesA.checkedState ||
       selector.GetHolidayFromCustomFilesB.checkedState ||
       selector.GetHolidayFromCustomFilesC.checkedState ||
       selector.GetHolidayFromCustomFilesD.checkedState ){
      settings.bGetCustomHolidays = true;
      settings.bHolidayStylesOn = true;
      settings.bHolidaysLayer = true;

      if( selector.GetHolidayFromCustomFilesA.checkedState )
      {
          settings.bHolidayStyleA = true;
          settings.GetHolidaysFromCustomFilesStyle = 'A';
      }
      else if( selector.GetHolidayFromCustomFilesB.checkedState )
      {
          settings.bHolidayStyleB = true;
          settings.GetHolidaysFromCustomFilesStyle = 'B';
      }
      else if( selector.GetHolidayFromCustomFilesC.checkedState )
      {
          settings.bHolidayStyleC = true;
          settings.GetHolidaysFromCustomFilesStyle = 'C';
      }
      else if( selector.GetHolidayFromCustomFilesD.checkedState )
      {
          settings.bHolidayStyleD = true;
          settings.GetHolidaysFromCustomFilesStyle = 'D';
      }
      else //if( selector.GetHolidayFromCustomFilesA.checkedState )
      {
          settings.bHolidayStyleA = true;
          settings.GetHolidaysFromCustomFilesStyle = 'A';
      }

   } else {
      settings.bGetCustomHolidays = false;
   }

   // Holiday Files
   for( i = 0; i < settings.holidayFiles.length; i++ )
   {
      if( selector.holidaySelectorsA[i].checkedState ||
          selector.holidaySelectorsB[i].checkedState ||
          selector.holidaySelectorsC[i].checkedState ||
          selector.holidaySelectorsD[i].checkedState ){
         settings.bGetFileHolidays = true;
         settings.bHolidaysFile[i] = true;
         settings.bHolidayStylesOn = true;
         settings.bHolidaysLayer = true;

         if( selector.holidaySelectorsA[i].checkedState )
         {
             settings.bHolidayStyleA = true;
             settings.holidaySelectorsStyle[i] = 'A';
         }
         else if( selector.holidaySelectorsB[i].checkedState )
         {
             settings.bHolidayStyleB = true;
             settings.holidaySelectorsStyle[i] = 'B';
         }
         else if( selector.holidaySelectorsC[i].checkedState )
         {
             settings.bHolidayStyleC = true;
             settings.holidaySelectorsStyle[i] = 'C';
         }
         else if( selector.holidaySelectorsD[i].checkedState )
         {
             settings.bHolidayStyleD = true;
             settings.holidaySelectorsStyle[i] = 'D';
         }
         else //if( selector.holidaySelectorsA[i].checkedState )
         {
             settings.bHolidayStyleA = true;
             settings.holidaySelectorsStyle[i] = 'A';
         }

         } else {
         settings.bHolidaysFile[i] = false;
      }
   }

   if( settings.numberRegExp.test( selector.customPageMargin.editContents ) )
   {
      settings.bUseCustomPageMargin = true;
      settings.customPageMargin = selector.customPageMargin.editContents;
   }
   else
   {
      settings.bUseCustomPageMargin = false;
   }

   if( settings.numberRegExp.test( selector.customPageBleed.editContents ) )
   {
      settings.bUseCustomPageBleed = true;
      settings.customPageBleed = selector.customPageBleed.editContents;
   }


   if( settings.bUseCustomHeightAndWidth ){
      if(    selector.monthCustomHeight.editContents.match( settings.numberRegExp ) 
          && selector.monthCustomWidth.editContents.match( settings.numberRegExp ) 
          && selector.monthCustomTopEdge.editContents.match( settings.numberRegExp ) 
          && selector.monthCustomLeftEdge.editContents.match( settings.numberRegExp )
      ){
         settings.bUseCustomMonthFrameSize = true;
         settings.bIncludeMonthName = true;
         settings.bIncludeMonthNameInCalendar = false;
         settings.monthCustomSizeY1 = selector.monthCustomTopEdge.editContents;
         settings.monthCustomSizeY2 = ( parseFloat( selector.monthCustomTopEdge.editContents ) + parseFloat( selector.monthCustomHeight.editContents ) ).toString();
         settings.monthCustomSizeX1 = selector.monthCustomLeftEdge.editContents;
         settings.monthCustomSizeX2 = ( parseFloat( selector.monthCustomLeftEdge.editContents ) + parseFloat( selector.monthCustomWidth.editContents ) ).toString();
      } else {
         settings.bUseCustomMonthFrameSize = false;
      }
   } else {
      if(    selector.monthCustomSizeY1.editContents.match( settings.numberRegExp ) 
          && selector.monthCustomSizeY2.editContents.match( settings.numberRegExp ) 
          && selector.monthCustomSizeX1.editContents.match( settings.numberRegExp ) 
          && selector.monthCustomSizeX2.editContents.match( settings.numberRegExp )
          && parseFloat(monthCustomSizeY2.editContents) > parseFloat( monthCustomSizeY1.editContents )
          && parseFloat(monthCustomSizeX2.editContents) > parseFloat( monthCustomSizeX1.editContents )
      ){
         settings.bUseCustomMonthFrameSize = true;
         settings.bIncludeMonthName = true;
         settings.bIncludeMonthNameInCalendar = false;
         settings.monthCustomSizeY1 = selector.monthCustomSizeY1.editContents;
         settings.monthCustomSizeY2 = selector.monthCustomSizeY2.editContents;
         settings.monthCustomSizeX1 = selector.monthCustomSizeX1.editContents;
         settings.monthCustomSizeX2 = selector.monthCustomSizeX2.editContents;
      } else {
         settings.bUseCustomMonthFrameSize = false;
      }
   }
 
   if( settings.bUseCustomHeightAndWidth ){
      if(    selector.yearCustomHeight.editContents.match( settings.numberRegExp ) 
          && selector.yearCustomWidth.editContents.match( settings.numberRegExp ) 
          && selector.yearCustomTopEdge.editContents.match( settings.numberRegExp ) 
          && selector.yearCustomLeftEdge.editContents.match( settings.numberRegExp )
      ){
         settings.bUseCustomYearFrameSize = true;
         settings.bIncludeYear            = true;
         settings.bFrameForYear           = true;
         settings.yearCustomSizeY1 = selector.yearCustomTopEdge.editContents;
         settings.yearCustomSizeY2 = ( parseFloat( selector.yearCustomTopEdge.editContents ) + parseFloat( selector.yearCustomHeight.editContents ) ).toString();
         settings.yearCustomSizeX1 = selector.yearCustomLeftEdge.editContents;
         settings.yearCustomSizeX2 = ( parseFloat( selector.yearCustomLeftEdge.editContents ) + parseFloat( selector.yearCustomWidth.editContents ) ).toString();
      } else {
         settings.bUseCustomYearFrameSize = false;
      }
   } else {
      if(    selector.yearCustomSizeY1.editContents.match( settings.numberRegExp ) 
          && selector.yearCustomSizeY2.editContents.match( settings.numberRegExp ) 
          && selector.yearCustomSizeX1.editContents.match( settings.numberRegExp ) 
          && selector.yearCustomSizeX2.editContents.match( settings.numberRegExp ) 
          && parseFloat(yearCustomSizeY2.editContents) > parseFloat( yearCustomSizeY1.editContents )
          && parseFloat(yearCustomSizeX2.editContents) > parseFloat( yearCustomSizeX1.editContents )
      ){
         settings.bUseCustomYearFrameSize = true;
         settings.bIncludeYear            = true;
         settings.bFrameForYear           = true;
         settings.yearCustomSizeY1 = selector.yearCustomSizeY1.editContents;
         settings.yearCustomSizeY2 = selector.yearCustomSizeY2.editContents;
         settings.yearCustomSizeX1 = selector.yearCustomSizeX1.editContents;
         settings.yearCustomSizeX2 = selector.yearCustomSizeX2.editContents;
      } else {
         settings.bUseCustomYearFrameSize = false;
      }
   } 

   if( settings.bUseCustomHeightAndWidth ){
      if(    selector.pictureCustomHeight.editContents.match( settings.numberRegExp ) 
          && selector.pictureCustomWidth.editContents.match( settings.numberRegExp ) 
          && selector.pictureCustomTopEdge.editContents.match( settings.numberRegExp ) 
          && selector.pictureCustomLeftEdge.editContents.match( settings.numberRegExp ) 
      ){
         settings.bAddPictureFrame = true;
         settings.pictureCustomSizeY1 = selector.pictureCustomTopEdge.editContents;
         settings.pictureCustomSizeY2 = ( parseFloat( selector.pictureCustomTopEdge.editContents ) + parseFloat( selector.pictureCustomHeight.editContents ) ).toString();
         settings.pictureCustomSizeX1 = selector.pictureCustomLeftEdge.editContents;
         settings.pictureCustomSizeX2 = ( parseFloat( selector.pictureCustomLeftEdge.editContents ) + parseFloat( selector.pictureCustomWidth.editContents ) ).toString();
      } else {
         settings.bAddPictureFrame = false;
      }
   } else {
      if(    selector.pictureCustomSizeY1.editContents.match( settings.numberRegExp ) 
          && selector.pictureCustomSizeY2.editContents.match( settings.numberRegExp ) 
          && selector.pictureCustomSizeX1.editContents.match( settings.numberRegExp ) 
          && selector.pictureCustomSizeX2.editContents.match( settings.numberRegExp )
          && parseFloat(pictureCustomSizeY2.editContents) > parseFloat( pictureCustomSizeY1.editContents )
          && parseFloat(pictureCustomSizeX2.editContents) > parseFloat( pictureCustomSizeX1.editContents )
      ){
         settings.bAddPictureFrame = true;
         settings.pictureCustomSizeY1 = selector.pictureCustomSizeY1.editContents;
         settings.pictureCustomSizeY2 = selector.pictureCustomSizeY2.editContents;
         settings.pictureCustomSizeX1 = selector.pictureCustomSizeX1.editContents;
         settings.pictureCustomSizeX2 = selector.pictureCustomSizeX2.editContents;
      } else {
         settings.bAddPictureFrame = false;
      }
   } 

   if( settings.bUseCustomHeightAndWidth ){
      if( selector.calendarCustomHeight.editContents.match( settings.numberRegExp )
         && selector.calendarCustomWidth.editContents.match( settings.numberRegExp )
         && selector.calendarCustomTopEdge.editContents.match( settings.numberRegExp )
         && selector.calendarCustomLeftEdge.editContents.match( settings.numberRegExp )
      ){
         settings.bUseCustomSize = true;
         settings.calendarCustomSizeY1 = selector.calendarCustomTopEdge.editContents;
         settings.calendarCustomSizeY2 = ( parseFloat( selector.calendarCustomTopEdge.editContents ) + parseFloat( selector.calendarCustomHeight.editContents ) ).toString();
         settings.calendarCustomSizeX1 = selector.calendarCustomLeftEdge.editContents;
         settings.calendarCustomSizeX2 = ( parseFloat( selector.calendarCustomLeftEdge.editContents ) + parseFloat( selector.calendarCustomWidth.editContents ) ).toString();
      } else {
         settings.bUseCustomSize = false;
      }
   } else {
      if(    selector.customSizeY1.editContents.match( settings.numberRegExp ) 
          && selector.customSizeY2.editContents.match( settings.numberRegExp ) 
          && selector.customSizeX1.editContents.match( settings.numberRegExp ) 
          && selector.customSizeX2.editContents.match( settings.numberRegExp )
          && parseFloat(customSizeY2.editContents) > parseFloat( customSizeY1.editContents )
          && parseFloat(customSizeX2.editContents) > parseFloat( customSizeX1.editContents )
      ){
         settings.bUseCustomSize = true;
         settings.calendarCustomSizeY1 = selector.customSizeY1.editContents;
         settings.calendarCustomSizeY2 = selector.customSizeY2.editContents;
         settings.calendarCustomSizeX1 = selector.customSizeX1.editContents;
         settings.calendarCustomSizeX2 = selector.customSizeX2.editContents;
      }
      else
      {
         settings.bUseCustomSize = false;
      }
   } 

   setPageSize( settings, selector.customPageHeight.editContents,
                          selector.customPageWidth.editContents,
                          settings.pageSizeOptions[ selector.PageSize.selectedIndex ] );
   


   return;
}
