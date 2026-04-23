function ParsePreset( settings, presetFile )
{
   var presets = aGetPresetsFromFile( presetFile );
   var i;
   var j;
   var keyValue;
   var key;
   var value;
   var pageHeight = '';
   var pageWidth = '';
   var pageSize = '';
   var monthCustomSizeY1 = '';
   var monthCustomSizeY2 = '';
   var monthCustomSizeX1 = '';
   var monthCustomSizeX2 = '';
   var yearCustomSizeY1 = '';
   var yearCustomSizeY2 = '';
   var yearCustomSizeX1 = '';
   var yearCustomSizeX2 = '';
   var pictureCustomSizeY1 = '';
   var pictureCustomSizeY2 = '';
   var pictureCustomSizeX1 = '';
   var pictureCustomSizeX2 = '';
   var calendarCustomSizeY1 = '';
   var calendarCustomSizeY2 = '';
   var calendarCustomSizeX1 = '';
   var calendarCustomSizeX2 = '';
   var monthCustomHeight = '';
   var monthCustomWidth = '';
   var monthCustomTopEdge = '';
   var monthCustomLeftEdge = '';
   var yearCustomHeight = '';
   var yearCustomWidth = '';
   var yearCustomTopEdge = '';
   var yearCustomLeftEdge = '';
   var pictureCustomHeight = '';
   var pictureCustomWidth = '';
   var pictureCustomTopEdge = '';
   var pictureCustomLeftEdge = '';
   var calendarCustomHeight = '';
   var calendarCustomWidth = '';
   var calendarCustomTopEdge = '';
   var calendarCustomLeftEdge = '';
   var buffer;
   var holidaysFile;
   var holidaysStyle;
   var cellSpacingValue;
   
   var widgitKeyMap = new Object;
   for( widgitName in settings.widgitValues ){
      widgitKeyMap[ settings.widgitValues[ widgitName ].presetKey ] = widgitName;
   }

   //settings = defaultSettings( settings );
   for( i = 0; i < presets.length; i++ ){
      keyValue = presets[i].split( "=" );
      key   = stripSpaces( keyValue[0] );
      value = stripSpaces( keyValue[1] );

      widgitName = widgitKeyMap[ key ];
      widgit = settings.widgitValues[ widgitName ];

      // Common Presets
      if( key == settings.widgitValues.startYear.presetKey || key == settings.widgitValues.endYear.presetKey ){
         for( j = 0; j < widgit.values.length; j++ ){
            if( value == widgit.values[j] ){
               settings[ widgit.settingsKey ] = widgit.values[ i + widgit.offset ];
               break;
            }
         }
      }
      else if( key == settings.widgitValues.startMonth.presetKey || key == settings.widgitValues.endMonth.presetKey ){
         for( j = 0; j < widgit.values.length; j++ ){
            if( value == widgit.values[j] ){
               settings[ widgit.settingsKey ] = j;
               break;
            }
         }
      }
      else if( key == settings.widgitValues.language.presetKey ){
         for( j = 0; j < widgit.values.length; j++ ){
            if( value == widgit.values[j] ){
               selectLanguage( settings, { Language : { selectedIndex : j } } );
               break;
            }
         }
      }
      else if( key == settings.widgitValues.weekStartsOn.presetKey ){
         if( value == widgit.values[2] ){
	    settings.dayOrdering = new Array(6, 0, 1, 2, 3, 4, 5);
         } else if( value == widgit.values[1] ){
            settings.dayOrdering = new Array(1, 2, 3, 4, 5, 6, 0);
         } else {
            settings.dayOrdering = new Array(0, 1, 2, 3, 4, 5, 6);
         }
         settings.weekStartDay = settings.dayOrdering[0];
      }
      else if( key == settings.widgitValues.workWeekOptions.presetKey ){
         if( value = settings.widgitValues.workWeekOptions.values[1] ){
            settings.workWeekStart = 'Jan1';
         } else {
            settings.workWeekStart = 'FirstFullWeek';
         }
      }
      else if( key == settings.widgitValues.moonSize.presetKey ){
         if( settings.numberRegExp.test(value) ){
            settings.moonSize = parseFloat(value)/100;
         }
      }
      else if( key == settings.widgitValues.gridCalendarMonthLabelingOptions.presetKey ){
         // Exclude
         if( value == setttings.widgitValues.gridCalendarMonthLabelingOptions.values[0] ){
            settings.bIncludeYearInCalendar = false;
            settings.bIncludeMonthNameInCalendar = false;
         }
         // Month
         else if( value == setttings.widgitValues.gridCalendarMonthLabelingOptions.values[0] ){
            settings.bIncludeYearInCalendar = false;
            settings.bIncludeMonthNameInCalendar = true;
         }
         // Month and Year
         else {
            settings.bIncludeYearInCalendar = true;
            settings.bIncludeMonthNameInCalendar = true;
         }
      }
      else if( key == settings.widgitValues.miniCalendarMonthLabelingOptions.presetKey ){
         // Auto
         if( value == setttings.widgitValues.miniCalendarMonthLabelingOptions.values[0] ){
            settings.bIncludeYearInMiniCalendar = true;
            settings.bAutoIncludeYearInMiniCalendar = true;
         }
         // Month
         else if( value == setttings.widgitValues.gridCalendarMonthLabelingOptions.values[1] ){
            settings.bIncludeYearInMiniCalendar = false;
            settings.bAutoIncludeYearInMiniCalendar = false;
         }
         // Month and Year
         else {
            settings.bIncludeYearInMiniCalendar = true;
            settings.bAutoIncludeYearInMiniCalendar = false;
         }
      }
      else if( key == settings.maxNumberOfRowsOptions.presetKey ){
         if( parseInt( value ) == 5 || parseInt( value ) == 6 ){
            settings.iFixedRowCount = parseInt( value );
         } else {
            settings.iFixedRowCount = 0;
         }
      }
      else if( key == settings.widgitValues.lineListCalendarMonthLabelingOptions.presetKey ){
         if( value == setttings.widgitValues.lineListCalendarMonthLabelingOptions.values[0] ){
            settings.bIncludeMonthName = false;
            settings.bIncludeYear      = false;
            settings.bFrameForYear     = false;
         }
         else if( value == setttings.widgitValues.lineListCalendarMonthLabelingOptions.values[1] ){
            settings.bIncludeMonthName = true;
            settings.bIncludeYear      = false;
            settings.bFrameForYear     = false;
         }
         else if( value == setttings.widgitValues.lineListCalendarMonthLabelingOptions.values[2] ){
            settings.bIncludeMonthName = true;
            settings.bIncludeYear      = true;
            settings.bFrameForYear     = false;
         }
         else if( value == setttings.widgitValues.lineListCalendarMonthLabelingOptions.values[3] ){
            settings.bIncludeMonthName = true;
            settings.bIncludeYear      = true;
            settings.bFrameForYear     = true;
         }
      }
      else if( key == settings.widgitValues.highlightWeekendOptions.presetKey ){
         if( value == settings.widgitValues.highlightWeekendOptions[1] ){
            settings.bHighlightWeekends = true;
            settings.bHighlightSundays  = true;
            settings.bHighlightSaturday = true;
         } else if( value == settings.widgitValues.highlightWeekendOptions[2] ){
            settings.bHighlightWeekends = false;
            settings.bHighlightSundays  = true;
            settings.bHighlightSaturday = false;
         } else if( value == settings.widgitValues.highlightWeekendOptions[3] ){
            settings.bHighlightWeekends = false;
            settings.bHighlightSundays  = false;
            settings.bHighlightSaturday = true;
         } else {
            settings.bHighlightWeekends = false;
            settings.bHighlightSundays  = false;
            settings.bHighlightSaturday = false;
         }
      }
      else if( key == settings.widgitValues.orientationOptions.presetKey ){
         if( value == settings.widgitValues.orientationOptions.values[1] ){
            settings.bVertical = true;
         } else {
            settings.bVertical = false;
         }
      }
      else if( key == settings.widgitValues.cellSpacingOptions.presetKey ){
         cellSpacingValue = value;
      }




      else if( key == settings.widgitValues.weekDayHeadingStyle.presetKey 
            || key == settings.widgitValues.workWeekPrefix.presetKey
            || key == settings.widgitValues.daysPerLineOptions.presetKey
      ){
         settings[widgit.settingsKey] = value;
      }
      else if( key == settings.widgitValues.includeWorkWeek.presetKey
            || key == settings.widgitValues.includeMoons.presetKey 
            || key == settings.widgitValues.importStylesFromReferenceCalendar.presetKey
            || key == settings.widgitValues.includeMiniCalendars.presetKey
            || key == settings.widgitValues.includeWeekDayInGridCalendar.presetKey 
            || key == settings.widgitValues.highlightSundays.presetKey
            || key == settings.widgitValues.highlightNonMonthDays.presetKey
            || key == settings.widgitValues.includeStylesForEveryDay.presetKey 
            || key == settings.widgitValues.forceSquareCells.presetKey 
            || key == settings.widgitValues.onlyPrintFirstWeekday.presetKey
            || key == settings.widgitValues.addTextLayer.presetKey
            || key == settings.widgitValues.addHolidayLayer.presetKey
            || key == settings.widgitValues.useCalendarLayer.presetKey
            || key == settings.widgitValues.addDayOfYearLayer.presetKey
            || key == settings.widgitValues.addWeekDayLayer.presetKey
            || key == settings.widgitValues.addWorkWeekLayer.presetKey
            || key == settings.widgitValues.addMoonsLayer.presetKey
            || key == settings.widgitValues.addPictureLayer.presetKey
            || key == settings.widgitValues.addBackgroundLayer.presetKey
      ){
         settings[widgit.settingsKey] = bValue( value );
      }
      //} else if( key == 'Calendars Per Page' ){
         //settings.iCalendarPerPage = parseInt( value );

      //else if( key = 'Include Week Day' || key == 'Include Week Day Name' || key == 'Include Week Day Layer' ){
         //settings.bWeekDay = bValue( value );
      //}
      //else if( key == 'Include Moon Phase' || key == 'Include Moon Phase Layer' ){
         //settings.bMoons = bValue( value );
      //}
      //else if( key == 'Include Work Week' || key == 'Include Work Week Layer'){
         //settings.bWorkWeek = bValue( value );
      //}
      //else if( key == 'Include Year' ){
         //settings.bIncludeYear = bValue( value );
      //}
      else if( key == 'Custom Size Units' ){
         settings.customPageSizeUnits = value;
         settings.customSizeUnits     = value;
      }
      else if( key == 'Custom Page Margin' ){
         settings.bUseCustomPageMargin = true;
         settings.customPageMargin = value;
      } else if( key == 'Custom Page Bleed' ){
         settings.bUseCustomPageBleed = true;
         settings.customPageBleed = value;
      }
      else if( key == 'Page Type' ){
         settings.sPageType = value;
      }
      else if( key == 'Page Orientation' ){
         settings.sPageOrientation = value;
      }
       else if( key == 'Color Space' ){
         settings.sColorSpace = value;
      }
      else if( key == 'Style Set' ){
         settings.styleSet = value;
      }
      else if( key == 'Page Height' ){
         pageHeight = value;
      }
      else if( key == 'Page Width' ){
         pageWidth = value;
      }
      else if( key == 'Page Size' ){
         pageSize = value;
      }
      else if( key == 'Get Holidays From Current Frame:A' ){
           if( value == 'true' ){
              settings.bGetFrameHolidays = true;
              settings.bHolidayStylesOn = true;
              settings.bHolidayStyleA = true;
              settings.bGetHolidaysFromCurrentFrameStyle = 'A';
           }
      }
      else if( key == 'Get Holidays From Current Frame:B' ){
           if( value == 'true' ){
              settings.bGetFrameHolidays = true;
              settings.bHolidayStylesOn = true;
              settings.bHolidayStyleB = true;
              settings.bGetHolidaysFromCurrentFrameStyle = 'B';
           }
      }
      else if( key == 'Get Holidays From Current Frame:C' ){
           if( value == 'true' ){
              settings.bGetFrameHolidays = true;
              settings.bHolidayStylesOn = true;
              settings.bHolidayStyleC = true;
              settings.bGetHolidaysFromCurrentFrameStyle = 'C';
           }
      }
      else if( key == 'Get Holidays From Current Frame:D' ){
           if( value == 'true' ){
              settings.bGetFrameHolidays = true;
              settings.bHolidayStylesOn = true;
              settings.bHolidayStyleD = true;
              settings.bGetHolidaysFromCurrentFrameStyle = 'D';
           }
      }
      else if( key == 'Get Holidays From Custom File:A' ){
           if( value == 'true' ){
              settings.bGetCustomHolidays = true;
              settings.bHolidayStylesOn = true;
              settings.bHolidayStyleA = true;
              settings.bGetHolidaysFromCustomFileStyle = 'A';
           }
      }
      else if( key == 'Get Holidays From Custom File:B' ){
           if( value == 'true' ){
              settings.bGetCustomHolidays = true;
              settings.bHolidayStylesOn = true;
              settings.bHolidayStyleB = true;
              settings.bGetHolidaysFromCustomFileStyle = 'B';
           }
      }
      else if( key == 'Get Holidays From Custom File:C' ){
           if( value == 'true' ){
              settings.bGetCustomHolidays = true;
              settings.bHolidayStylesOn = true;
              settings.bHolidayStyleC = true;
              settings.bGetHolidaysFromCustomFileStyle = 'C';
           }
      }
      else if( key == 'Get Holidays From Custom File:D' ){
           if( value == 'true' ){
              settings.bGetCustomHolidays = true;
              settings.bHolidayStylesOn = true;
              settings.bHolidayStyleD = true;
              settings.bGetHolidaysFromCustomFileStyle = 'D';
           }
      }
      else if( key == 'Get Holidays From File' ){
         buffer = value.split( ":" );
         holidaysFile = buffer[0];
         holidaysStyle = buffer[1];

         for( j = 0; j < settings.holidayFiles.length; j++ ){
            if( settings.holidaysFolder+"/"+holidaysFile+".holidays" == settings.holidayFiles[j] ){
               settings.bGetFileHolidays = true;
               settings.bHolidaysFile[j] = true;
               settings.bHolidayStylesOn = true;
               if( holidaysStyle == "A" ){
                  settings.bHolidayStyleA = true;
                  settings.holidaySelectorsStyle[j] = holidaysStyle;
               } else if( holidaysStyle == "B" ){
                  settings.bHolidayStyleB = true;
                  settings.holidaySelectorsStyle[j] = holidaysStyle;
               } else if( holidaysStyle == "C" ){
                  settings.bHolidayStyleC = true;
                  settings.holidaySelectorsStyle[j] = holidaysStyle;
               } else if( holidaysStyle == "D" ){
                  settings.bHolidayStyleD = true;
                  settings.holidaySelectorsStyle[j] = holidaysStyle;
               }
            }
         }
      }

      // Grid Calendar
      else if( key == 'Month Identification' ){
         if( value == 'Exclude' ){
            settings.bIncludeMonthName = false;
            settings.bIncludeYear      = false;
         } else if( value == 'Month' ){
            settings.bIncludeMonthName = true;
            settings.bIncludeYear      = false;
         } else {
            settings.bIncludeMonthName = true;
            settings.bIncludeYear      = true;
         }
      }

      // Grid/Line Calendar
      else if( key == 'Highlight Holidays' ){
         settings.bHighlightHolidays = bValue( value );
      }
      else if( key == 'Include Text Layer' ){
         settings.bTextLayer = bValue( value );
      } else if( key == 'Include Holiday Layer' ){
         settings.bHolidaysLayer = bValue( value );
         settings.bHolidaysLayerManual = bValue( value );
         if( bValue( value ) ){
            settings.bHolidayStylesOn = true;
         }
      }
   
      // List Calendar
      else if( key == 'Column Order' ){
         settings.columnOrder = value;
      }
      else if( key == 'Merge Date And Day Columns' ){
         settings.bMergeDateAndWeekDayColumns = bValue( value );
      }
      else if( key == 'Moon Phase Column Width' ){
         settings.moonPhaseColumnWidth = parseFloat( value );
      }
      else if( key == 'Work Week Column Width' ){
         settings.workWeekColumnWidth = parseFloat( value );
      }
      else if( key == 'Date Column Width' ){
         settings.dateColumnWidth = parseFloat( value );
      }
      else if( key == 'Day Column Width' ){
         settings.weekDayColumnWidth = parseFloat( value );
      }
      else if( key == 'DayDate Delimiter' ){
         settings.dateWeekDayDelimiter = value;
      }
      else if( key == 'Column Count' ){
         settings.columnCount = parseInt( value );
      }
      else if( key == 'Column Gutter' ){
         settings.columnGutter = parseFloat( value );
      }

      // Custom frames
      else if( key == 'Month Frame Y1' ){
         monthCustomSizeY1 = value;
      } else if( key == 'Month Frame Y2' ){
         monthCustomSizeY2 = value;
      } else if( key == 'Month Frame X1' ){
         monthCustomSizeX1 = value;
      } else if( key == 'Month Frame X2' ){
         monthCustomSizeX2 = value;
      } else if( key == 'Year Frame Y1' ){
         yearCustomSizeY1 = value;
      } else if( key == 'Year Frame Y2' ){
         yearCustomSizeY2 = value;
      } else if( key == 'Year Frame X1' ){
         yearCustomSizeX1 = value;
      } else if( key == 'Year Frame X2' ){
         yearCustomSizeX2 = value;
      } else if( key == 'Picture Frame Y1' ){
         pictureCustomSizeY1 = value;
      } else if( key == 'Picture Frame Y2' ){
         pictureCustomSizeY2 = value;
      } else if( key == 'Picture Frame X1' ){
         pictureCustomSizeX1 = value;
      } else if( key == 'Picture Frame X2' ){
         pictureCustomSizeX2 = value;
      } else if( key == 'Calendar Frame Y1' ){
         calendarCustomSizeY1 = value;
      } else if( key == 'Calendar Frame Y2' ){
         calendarCustomSizeY2 = value;
      } else if( key == 'Calendar Frame X1' ){
         calendarCustomSizeX1 = value;
      } else if( key == 'Calendar Frame X2' ){
         calendarCustomSizeX2 = value;
      } else if( key == 'Month Frame Height' ){
         monthCustomHeight = value;
      } else if( key == 'Month Frame Width' ){
         monthCustomWidth = value;
      } else if( key == 'Month Frame Top Edge' ){
         monthCustomTopEdge = value;
      } else if( key == 'Month Frame Left Edge' ){
         monthCustomLeftEdge = value;
      } else if( key == 'Year Frame Height' ){
         yearCustomHeight = value;
      } else if( key == 'Year Frame Width' ){
         yearCustomWidth = value;
      } else if( key == 'Year Frame Top Edge' ){
         yearCustomTopEdge = value;
      } else if( key == 'Year Frame Left Edge' ){
         yearCustomLeftEdge = value;
      } else if( key == 'Picture Frame Height' ){
         pictureCustomHeight = value;
      } else if( key == 'Picture Frame Width' ){
         pictureCustomWidth = value;
      } else if( key == 'Picture Frame Top Edge' ){
         pictureCustomTopEdge = value;
      } else if( key == 'Picture Frame Left Edge' ){
         pictureCustomLeftEdge = value;
      } else if( key == 'Calendar Frame Height' ){
         calendarCustomHeight = value;
      } else if( key == 'Calendar Frame Width' ){
         calendarCustomWidth = value;
      } else if( key == 'Calendar Frame Top Edge' ){
         calendarCustomTopEdge = value;
      } else if( key == 'Calendar Frame Left Edge' ){
         calendarCustomLeftEdge = value;
      }
   }

   if( cellSpacingValue.matches( settings.cellSpacingOptions[1] ) ){
      settings.bUseFullFrame = true;
   } else if( cellSpacingValue.matches( settings.cellSpacingOptions[2] ) ){
      settings.bUseFullFrame = false;
   } else {
      if( settings.iStartYear == settings.iEndYear && settings.iStartMonth == settings.iEndMonth ){
         settings.bUseFullFrame = true;
      } else {
         settings.bUseFullFrame = false;
      }
   }

   if(    monthCustomSizeY1.match( settings.numberRegExp )
       && monthCustomSizeY2.match( settings.numberRegExp )
       && monthCustomSizeX1.match( settings.numberRegExp )
       && monthCustomSizeX2.match( settings.numberRegExp )
       && parseFloat(monthCustomSizeY2) > parseFloat(monthCustomSizeY1)
       && parseFloat(monthCustomSizeX2) > parseFloat(monthCustomSizeX1)
   ){
      settings.monthCustomSizeY1 = monthCustomSizeY1;
      settings.monthCustomSizeY2 = monthCustomSizeY2;
      settings.monthCustomSizeX1 = monthCustomSizeX1;
      settings.monthCustomSizeX2 = monthCustomSizeX2;
      settings.bUseCustomMonthFrameSize = true;
   } else {
      settings.bUseCustomMonthFrameSize = false;
   }
   
   if(    monthCustomHeight.match( settings.numberRegExp ) 
       && monthCustomWidth.match( settings.numberRegExp ) 
       && monthCustomTopEdge.match( settings.numberRegExp ) 
       && monthCustomLeftEdge.match( settings.numberRegExp ) )
   {
      settings.bUseCustomMonthFrameSize = true;
      settings.monthCustomSizeY1 = monthCustomTopEdge;
      settings.monthCustomSizeY2 = ( parseFloat( monthCustomTopEdge ) + parseFloat( monthCustomHeight ) ).toString();
      settings.monthCustomSizeX1 = monthCustomLeftEdge;
      settings.monthCustomSizeX2 = ( parseFloat( monthCustomLeftEdge ) + parseFloat( monthCustomWidth ) ).toString();
   } else {
      settings.bUseCustomMonthFrameSize = false;
   }

   if(    yearCustomSizeY1.match( settings.numberRegExp )
       && yearCustomSizeY2.match( settings.numberRegExp )
       && yearCustomSizeX1.match( settings.numberRegExp )
       && yearCustomSizeX2.match( settings.numberRegExp ) 
       && parseFloat(yearCustomSizeY2) > parseFloat(yearCustomSizeY1)
       && parseFloat(yearCustomSizeX2) > parseFloat(yearCustomSizeX1)
   ){
      settings.yearCustomSizeY1 = yearCustomSizeY1;
      settings.yearCustomSizeY2 = yearCustomSizeY2;
      settings.yearCustomSizeX1 = yearCustomSizeX1;
      settings.yearCustomSizeX2 = yearCustomSizeX2;
      settings.bUseCustomYearFrameSize = true;
      settings.bIncludeYear            = true;
      settings.bFrameForYear           = true;
   } else {
      settings.bUseCustomYearFrameSize = false;
   }
   
   if(    yearCustomHeight.match( settings.numberRegExp ) 
       && yearCustomWidth.match( settings.numberRegExp ) 
       && yearCustomTopEdge.match( settings.numberRegExp ) 
       && yearCustomLeftEdge.match( settings.numberRegExp ) )
   {
      settings.bUseCustomYearFrameSize = true;
      settings.bIncludeYear            = true;
      settings.bFrameForYear           = true;
      settings.yearCustomSizeY1 = yearCustomTopEdge;
      settings.yearCustomSizeY2 = ( parseFloat( yearCustomTopEdge ) + parseFloat( yearCustomHeight ) ).toString();
      settings.yearCustomSizeX1 = yearCustomLeftEdge;
      settings.yearCustomSizeX2 = ( parseFloat( yearCustomLeftEdge ) + parseFloat( yearCustomWidth ) ).toString();
   } else {
      settings.bUseCustomYearFrameSize = false;
   }
   
   if(    pictureCustomSizeY1.match( settings.numberRegExp )
       && pictureCustomSizeY2.match( settings.numberRegExp )
       && pictureCustomSizeX1.match( settings.numberRegExp )
       && pictureCustomSizeX2.match( settings.numberRegExp )
       && parseFloat(pictureCustomSizeY2) > parseFloat(pictureCustomSizeY1)
       && parseFloat(pictureCustomSizeX2) > parseFloat(pictureCustomSizeX1)
   ){
      settings.pictureCustomSizeY1 = pictureCustomSizeY1;
      settings.pictureCustomSizeY2 = pictureCustomSizeY2;
      settings.pictureCustomSizeX1 = pictureCustomSizeX1;
      settings.pictureCustomSizeX2 = pictureCustomSizeX2;
      settings.bAddPictureFrame = true;
   } else {
      settings.bAddPictureFrame = false;
   }
  
   if(    pictureCustomHeight.match( settings.numberRegExp ) 
       && pictureCustomWidth.match( settings.numberRegExp ) 
       && pictureCustomTopEdge.match( settings.numberRegExp ) 
       && pictureCustomLeftEdge.match( settings.numberRegExp ) )
   {
      settings.bAddPictureFrame = true;
      settings.pictureCustomSizeY1 = pictureCustomTopEdge;
      settings.pictureCustomSizeY2 = ( parseFloat( pictureCustomTopEdge ) + parseFloat( pictureCustomHeight ) ).toString();
      settings.pictureCustomSizeX1 = pictureCustomLeftEdge;
      settings.pictureCustomSizeX2 = ( parseFloat( pictureCustomLeftEdge ) + parseFloat( pictureCustomWidth ) ).toString();
   } else {
      settings.bAddPictureFrame = false;
   }
   
   if(    calendarCustomSizeY1.match( settings.numberRegExp )
       && calendarCustomSizeY2.match( settings.numberRegExp )
       && calendarCustomSizeX1.match( settings.numberRegExp )
       && calendarCustomSizeX2.match( settings.numberRegExp )
       && parseFloat(calendarCustomSizeY2) > parseFloat(calendarCustomSizeY1)
       && parseFloat(calendarCustomSizeX2) > parseFloat(calendarCustomSizeX1)
    ){
      settings.calendarCustomSizeY1 = calendarCustomSizeY1;
      settings.calendarCustomSizeY2 = calendarCustomSizeY2;
      settings.calendarCustomSizeX1 = calendarCustomSizeX1;
      settings.calendarCustomSizeX2 = calendarCustomSizeX2;
      settings.bUseCustomSize = true;
   } else {
      settings.bUseCustomSize = false;
   }
   
   if(    calendarCustomHeight.match( settings.numberRegExp ) 
       && calendarCustomWidth.match( settings.numberRegExp ) 
       && calendarCustomTopEdge.match( settings.numberRegExp ) 
       && calendarCustomLeftEdge.match( settings.numberRegExp ) )
   {
      settings.bUseCustomSize = true;
      settings.calendarCustomSizeY1 = calendarCustomTopEdge;
      settings.calendarCustomSizeY2 = ( parseFloat( calendarCustomTopEdge ) + parseFloat( calendarCustomHeight ) ).toString();
      settings.calendarCustomSizeX1 = calendarCustomLeftEdge;
      settings.calendarCustomSizeX2 = ( parseFloat( calendarCustomLeftEdge ) + parseFloat( calendarCustomWidth ) ).toString();
   } else {
      settings.bUseCustomSize = false;
   }

   settings.iStartYear = parseInt( settings.sStartYear );
   settings.iEndYear   = parseInt( settings.sEndYear   );

   setPageSize( settings, pageHeight, pageWidth, pageSize );

   return;
}
