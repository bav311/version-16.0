/* --------------------------------------------------------------- //
   List Calendar

   Authored by by Scott Selberg
   August 12, 2015

   Subversion Revision: $Revision: 154 $
   Author: $Author: sselberg $
   Subversion Head URL: $HeadURL: svn+ssh://sselberg@svn.code.sf.net/p/calendarwizard/code/trunk/calendarWizard.js $

   Last update: $Date: 2015-07-07 14:37:05 -0700 (Tue, 07 Jul 2015) $
// --------------------------------------------------------------- */
function buildCalendar( settings, frame, iMonth, iYear )
{
   var date = new Date;
   var columns = 2;
   date.setUTCFullYear( iYear, iMonth, 1 );
   date.setUTCHours( 12, 0, 0, 0 );

   var stroke = 1/72;
   var strokeWidth = stroke;
   var days;
   var calendar;
   var bodyRowCount;
   var frameBounds;
   var appliedTableStyle;
   var myCells;
   var i;
   var j;
   var myDocument = settings.currentDocument;
   var daysInTheMonth = GetDaysInMonth(iYear, iMonth) 
   var frameColumns;
   var frameGutter;
   var availableFrameWidth;
   var weekDayOfTheFirst = date.getUTCDay();
   var weekDays = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];
   var frameHeight;
   var rowsPerColumn;
   var rowHeight;
   var firstColumnCells;
   var myColumns = new Array;
   var columnCells;
   var currentWeekday;
   var currentDate;
   var style;
   var unitSuffix = getUnitSuffix( settings.customSizeUnits );
   var scaleFactor = getScaleFactorFromUnits( settings.customSizeUnits );
   var dateColumnIndex;

   if( settings.bMoons ){
      myColumns.push( 'moon' );
   }
   if( settings.bWorkWeek ){
      myColumns.push( 'workWeek' );
   }
   if( settings.bWeekDay ){
      if( settings.bMergeDateAndWeekDayColumns ){
         if( settings.columnOrder == "Day, Date" ){
            myColumns.push( 'dayDate' );
         } else {
            myColumns.push( 'dateDay' );
         }
      } else {
         if( settings.columnOrder == "Day, Date" ){
            myColumns.push( 'day' );
            myColumns.push( 'date' );
         } else {
            myColumns.push( 'date' );
            myColumns.push( 'day' );
         }
      }
   } else {
      myColumns.push( 'date' );
   }
   myColumns.push( 'text' );

   with( frame ) {
      frameBounds = geometricBounds;

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

      frameColumns = textFramePreferences.textColumnCount;
      frameGutter = textFramePreferences.textColumnGutter;
      if( frameColumns > 1 ){
         availableFrameWidth = ((frameBounds[3] - frameBounds[1]) - ((frameColumns - 1) * frameGutter) )/frameColumns;
      } else {
         availableFrameWidth = (frameBounds[3] - frameBounds[1]) - strokeWidth;
      }
      
      frameHeight = (frameBounds[2]-frameBounds[0]);
      rowsPerColumn = Math.ceil(daysInTheMonth/frameColumns);
      rowHeight = (frameHeight-strokeWidth)/rowsPerColumn;

      calendar = frame.parentStory.tables.add( {bodyRowCount:daysInTheMonth, 
                                                columnCount:myColumns.length,
                                                width:availableFrameWidth} );
      with( calendar ){
         columns.firstItem().cells.everyItem().height = rowHeight;
 
         firstRow = rows.firstItem().cells;
         for( i = 0; i < firstRow.length - 1; i++ ){
            if( myColumns[i] == 'date' ){
               firstRow[i].width = settings.dateColumnWidth + unitSuffix;
            } else if( myColumns[i] == 'day' ){
               firstRow[i].width = settings.weekDayColumnWidth + unitSuffix;
            } else if( myColumns[i] == 'dayDate' ){
               firstRow[i].width = (settings.dateColumnWidth + settings.weekDayColumnWidth) + unitSuffix;
            } else if( myColumns[i] == 'dateDay' ){
               firstRow[i].width = (settings.dateColumnWidth + settings.weekDayColumnWidth) + unitSuffix;
            } else if( myColumns[i] == 'moon' ){
               if( settings.bUsingDefaultMoonPhaseColumnWidth ){
                  if( firstRow[i].height > (settings.moonPhaseColumnWidth * scaleFactor ) ){
                     firstRow[i].width = firstRow[i].height;
                  } else {
                     firstRow[i].width = settings.moonPhaseColumnWidth + unitSuffix;
                  }
               } else {
                  firstRow[i].width = settings.moonPhaseColumnWidth + unitSuffix;
               }
            } else if( myColumns[i] == 'workWeek' ){
               firstRow[i].width = settings.workWeekColumnWidth + unitSuffix;
            } else if( myColumns[i] == 'text' ){
            }
         }
         
         var usedFrameWidth = 0;
         for( i = 0; i < (firstRow.length - 1); i++ ){
            usedFrameWidth += firstRow[i].width;
         }
         if( (availableFrameWidth - usedFrameWidth) > 0 ){
            firstRow[ firstRow.length - 1 ].width = availableFrameWidth - usedFrameWidth;
         } else {
            alert( "The sum of the table column widths are wider than the available frame column width.  The calendar does not fit in the frame." );
         }

         currentWeekday = 'monday';
         currentDate    = 1;
         for( j = 0; j < myColumns.length; j++ ){
            if( myColumns[j] == 'date' 
                || myColumns[j] == 'dayDate' 
                || myColumns[j] == 'dateDay' ){
                dateColumnIndex = j;
                break;
            }
         }

         for( i = 0; i < rows.length; i++ ){
            rowCells = rows.item(i).cells;
               for( j = 0; j < myColumns.length; j++ ){
               currentWeekdayIndex = (i+weekDayOfTheFirst)%7;
               currentWeekday = weekDays[ currentWeekdayIndex ];
                
               if( settings.bIncludeStylesForEveryDay ) {
                  style = currentWeekday;
               } else if( ( settings.bHighlightSundays || settings.bHighlightSaturdays ) && (currentWeekdayIndex == 0 || currentWeekdayIndex == 6 ) ){
                  style = currentWeekday;
               } else {
                  if( currentWeekdayIndex == 0 || currentWeekdayIndex == 6 ){
                     style = "weekend";
                  } else {
                     style = "weekday";
                  }
               }
               if( myColumns[j] == 'dayDate' || myColumns[j] == 'dateDay' ){
                  rowCells.item(j).appliedCellStyle = myDocument.cellStyles.item( 'cal_' + style + "_date" + settings.styleSet );
               } else {
                  rowCells.item(j).appliedCellStyle = myDocument.cellStyles.item( 'cal_' + style + "_" + myColumns[j] + settings.styleSet );
               }

               if( myColumns[j] == 'date' ){
                  rowCells.item(j).contents = currentDate.toString();
               } else if( myColumns[j] == 'day' ){
                  rowCells.item(j).contents = days[currentWeekdayIndex];
               } else if( myColumns[j] == 'dayDate' ){
                  rowCells.item(j).contents = days[currentWeekdayIndex] + settings.dateWeekDayDelimiter + currentDate.toString();
               } else if( myColumns[j] == 'dateDay' ){
                  rowCells.item(j).contents = currentDate.toString() + settings.dateWeekDayDelimiter + days[currentWeekdayIndex];
               } else if( myColumns[j] == 'moon' ){
                  insertMoon( settings, rowCells.item(j), rowHeight, iMonth, iYear, currentDate );
               } else if( myColumns[j] == 'workWeek' ){
                  if( currentWeekdayIndex == settings.weekStartDay ){
                     rowCells.item(j).contents = settings.workWeekPrefix + getWorkWeek( settings, iYear, iMonth, currentDate  ).toString();
                  }
               } else if( myColumns[j] == 'text' ){
                  insertHolidayText( settings, rowCells.item(j), rowCells.item( dateColumnIndex ), iYear, iMonth, currentDate );
               }

            } 
            currentDate++;
         }
      }

      if( settings.bBackgroundLayer)
      {
         backgroundTextFrame = settings.currentPage.textFrames.add( settings.backgroundLayer );
         if( settings.bFrameNameSupported == true )
         {
            backgroundTextFrame.name = settings.calendarBackgroundLabel + settings.iCalendarCount;
         }

         if( settings.bObjectStyles ){
            backgroundTextFrame.appliedObjectStyle = settings.currentDocument.objectStyles.item( "cal_backgroundLayer" + settings.styleSet );
         }

         backgroundTextFrame.label = settings.calendarBackgroundLabel + settings.iCalendarCount;
         backgroundTextFrame.geometricBounds = frame.geometricBounds;
         backgroundTextFrame.textFramePreferences.textColumnCount = frame.textFramePreferences.textColumnCount;
         backgroundTextFrame.textFramePreferences.textColumnGutter = frame.textFramePreferences.textColumnGutter;

         backgroundCalendar = backgroundTextFrame.parentStory.tables.add({bodyRowCount:calendar.bodyRowCount, 
                                                                          columnCount:calendar.columnCount
                                                                         });
      
         if( settings.bCellStyles )
         {
             backgroundCalendar.appliedTableStyle = myDocument.tableStyles.item("cal_background" + settings.styleSet);
             backgroundCalendar.rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_background" + settings.styleSet);
   
             var leftCellRegExp  = /(moon|workWeek)$/i
             var holidayRegExp   = /holidayDate/i;
             var holidayARegExp  = /holidayDateA/i;
             var holidayBRegExp  = /holidayDateB/i;
             var holidayCRegExp  = /holidayDateC/i;
             var holidayDRegExp  = /holidayDateD/i;
             var weekendRegExp   = /weekend/i;
             var saturdayRegExp  = /saturday/i;
             var sundayRegExp    = /sunday/i;
             var weekdayRegExp   = /weekday/i;
             var mondayRegExp    = /monday/i;
             var tuesdayRegExp   = /tuesday/i;
             var wednesdayRegExp = /wednesday/i;
             var thursdayRegExp  = /thursday/i;
             var fridayRegExp    = /friday/i;

             var side = "left";
             var calendarCellStyle;
             var targetStyle;
             var targetStyleBase;
             var styleSetRegExp = /.*?(\d+)/;
             var styleSet;
             var buffer;

             // Transfer the highlighted date cells.
             for( i = 0; i < calendar.rows.length; i++ ){
                targetStyle = "cal_background";
                targetStyleBase = "";

                for( j = 0; j < calendar.rows.item(i).cells.length; j++ ){
                   calendarCellStyle = calendar.rows.item(i).cells.item(j).appliedCellStyle.name;

                   if(        holidayARegExp.test( calendarCellStyle ) ){
                      targetStyleBase = "cal_holidayDateA_background_";
                      break;
                   } else if( holidayBRegExp.test( calendarCellStyle ) ){
                      targetStyleBase = "cal_holidayDateB_background_";
                      break;
                   } else if( holidayCRegExp.test( calendarCellStyle ) ){
                      targetStyleBase = "cal_holidayDateC_background_";
                      break;
                   } else if( holidayDRegExp.test( calendarCellStyle ) ){
                      targetStyleBase = "cal_holidayDateD_background_";
                      break;
                   } else if( holidayRegExp.test( calendarCellStyle ) ){
                      targetStyleBase = "cal_holidayDate_background_";
                      break;
                   }
                }

                for( j = 0; j < calendar.rows.item(i).cells.length; j++ ){
                   calendarCellStyle = calendar.rows.item(i).cells.item(j).appliedCellStyle.name;
                   if( leftCellRegExp.test( calendarCellStyle ) ){
                      side = "left";
                   } else {
                      side = "right";
                   }

                   if( settings.nonSpaceRegExp.test( targetStyleBase ) ){
                      targetStyle = targetStyleBase + side;
                   } else if( weekendRegExp.test( calendarCellStyle ) ){
                      targetStyle = "cal_weekend_background_" + side;
                   } else if( saturdayRegExp.test( calendarCellStyle ) ){
                      targetStyle = "cal_saturday_background_" + side;
                   } else if( sundayRegExp.test( calendarCellStyle ) ){
                      targetStyle = "cal_sunday_background_" + side;
                   } else if( weekdayRegExp.test( calendarCellStyle ) ){
                      targetStyle = "cal_weekday_background_" + side;
                   } else if( mondayRegExp.test( calendarCellStyle ) ){
                      targetStyle = "cal_monday_background_" + side;
                   } else if( tuesdayRegExp.test( calendarCellStyle ) ){
                      targetStyle = "cal_tuesday_background_" + side;
                   } else if( wednesdayRegExp.test( calendarCellStyle ) ){
                      targetStyle = "cal_wednesday_background_" + side;
                   } else if( thursdayRegExp.test( calendarCellStyle ) ){
                      targetStyle = "cal_thursday_background_" + side;
                   } else if( fridayRegExp.test( calendarCellStyle ) ){
                      targetStyle = "cal_friday_background_" + side;
                   }

                   if( styleSetRegExp.test( calendarCellStyle ) ){
                      buffer = styleSetRegExp.exec( calendarCellStyle );
                      styleSet = buffer[1];
                   } else {
                      styleSet = "";
                   }
 
                   try{ 
                      backgroundCalendar.rows.item(i).cells.item(j).appliedCellStyle = targetStyle + styleSet;
                   } catch ( error ){
                      alert( "Style: " + targetStyle + " not found." );
                      throw( error );
                   }
                }
             }
         }

         if( settings.bCS )
         {
            // in CS, the table is not made properly in the constructor, so
            // I'm setting the bounds again manually...
            backgroundCalendar.bodyRowCount = calendar.bodyRowCount;
            backgroundCalendar.columnCount = calendar.columnCount;
         }

         myMasterRow = calendar.rows.lastItem().cells;
         mySlaveRow  = backgroundCalendar.rows.lastItem().cells;
   
         for( i = 0; i < myMasterRow.length; i++ )
         {
            mySlaveRow[i].width = myMasterRow[i].width;
         }
   
         myMasterColumn = calendar.columns.firstItem().cells;
         mySlaveColumn  = backgroundCalendar.columns.firstItem().cells;
   
         for( i = 0; i < myMasterColumn.length; i++ )
         {
            mySlaveColumn[i].height = myMasterColumn[i].height;
         }
   
         mySlaveRow  = backgroundCalendar.rows.firstItem();
   
         if( !settings.bCellStyles )
         {
             backgroundCalendar.cells.everyItem().leftEdgeStrokeWeight = "0in";
             backgroundCalendar.cells.everyItem().topEdgeStrokeWeight = "0in";
             backgroundCalendar.cells.everyItem().rightEdgeStrokeWeight = "0in";
             backgroundCalendar.cells.everyItem().bottomEdgeStrokeWeight = "0in";
             backgroundCalendar.cells.everyItem().insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item("cal_background" + settings.styleSet);
             backgroundCalendar.cells.everyItem().verticalJustification = VerticalJustification.bottomAlign;
         }
      }
   }

   return;
}
// --------------------------------------------------------------- //
function calendarFramePositions(settings, document)
{
   var pageOrientation = document.documentPreferences.pageOrientation;
   var page            = document.pages.item(0);

   var frameBounds = new Array();
   var frames      = new Array();
   var i = 0;
   var j = 0;
   var frameCount      = 0
   var framesPerRow    = 1;
   var framesPerColumn = 1;
   var myPageHeight;
   var myPageWidth;
   var myX1;
   var myX2;
   var myY1;
   var myY2;
   var framesPerPage          = 1;
   var frameVerticalSpacing   = settings.calendarVerticalSpacing;
   var frameHorizontalSpacing = settings.calendarHorizontalSpacing;
   var dimensionY;
   var dimensionX;
   var frameCount = 0;
   var scaleFactor = getScaleFactorFromUnits( settings.customPageSizeUnits );
   var offset = 1;

   if( settings.bUseCustomSize )
   {
      frames[ frameCount++ ] = new Array( settings.calendarCustomSizeY1 * scaleFactor,
                                          settings.calendarCustomSizeX1 * scaleFactor,
                                          settings.calendarCustomSizeY2 * scaleFactor,
                                          settings.calendarCustomSizeX2 * scaleFactor);
   }
   else
   {

      with (document.documentPreferences)
      {
         myPageHeight = pageHeight;
         myPageWidth = pageWidth;
      }

      with(page.marginPreferences)
      {
         myX1 = left;
         myY1 = top;
         myY2 = myPageHeight - bottom;
         myX2 = myPageWidth - right;
      }

      if( framesPerPage == 1 )
      {
         framesPerRow    = 1;
         framesPerColumn = 1;
      }

      dimensionY = (myY2 - myY1) - offset;
      dimensionX = (myX2 - myX1);

      frameBounds[0] = myY1 + offset;
      frameBounds[2] = myY1 + dimensionY + offset;

      frameBounds[1] = myX1;
      frameBounds[3] = myX1 + dimensionX;

      frames[frameCount++] = new Array(frameBounds[0], frameBounds[1], frameBounds[2], frameBounds[3]);
   }

   return frames;
}
// --------------------------------------------------------------- //
function bGetListCalendarUserInput( settings, selector )
{
   var title  = settings.baseTitle + ": Version " + settings.versionString + " - List Calendar";
   var dialogBox;
   var result;
   var bOK;
   var i;
   var moonSize;

   aGetHolidayFiles( settings );
   readLicenseFile( settings );
   //aGetPresetFiles( settings );
   selector.holidaySelectorsA = new Array();
   selector.holidaySelectorsB = new Array();
   selector.holidaySelectorsC = new Array();
   selector.holidaySelectorsD = new Array();

   dialogBox = app.dialogs.add({name:title,canCancel:true});
   with(dialogBox)
   {
      //Add a dialog column.
      with(dialogColumns.add()){
         with(dialogRows.add()){
            with(dialogColumns.add()){
               with( dialogRows.add() ){
                  with(dialogColumns.add()){
                     staticTexts.add({staticLabel:"First Month"});
                     staticTexts.add({staticLabel:"Last Month"});
                  }
                  with(dialogColumns.add()){
                    selector.StartMonth = dropdowns.add({stringList:settings.monthOptions,
                                                         selectedIndex:settings.today.getMonth()});
                    selector.EndMonth = dropdowns.add({stringList:settings.monthOptions,
                                                       selectedIndex:settings.today.getMonth()});
                  }
                  with(dialogColumns.add())
                  {
                    selector.StartYear = dropdowns.add({stringList:settings.yearOptions,
                                                        selectedIndex:8});
                    selector.EndYear = dropdowns.add({stringList:settings.yearOptions,
                                                      selectedIndex:8});
                  }
               }

               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:""});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Calendar Options"});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Language"});
                  selector.Language = dropdowns.add({stringList:settings.languageOptions,
                                                     selectedIndex:0});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Week Day Style"});
                  selector.headerOptions = dropdowns.add({stringList:settings.headerOptions, selectedIndex:0});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Month/Year Options"});
                  selector.monthYearOptions = dropdowns.add({stringList:settings.monthYearOptions, selectedIndex:1});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Week Starts on"});
                  selector.StartDay = dropdowns.add({stringList:settings.startDayOptions, selectedIndex:0});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Count Work Week on"});
                  selector.WorkWeekStart = dropdowns.add({stringList:settings.widgitValues.workWeekOptions.values,
                                                          selectedIndex:0});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Highlight Weekend Option"});
                  selector.highlightDayOptions = dropdowns.add({stringList:settings.highlightDayOptions, selectedIndex:0});
               }
               with( dialogRows.add() ){
                  selector.bHighlightHolidays = checkboxControls.add({checkedState:false});
                  staticTexts.add({staticLabel:"Highlight Holidays"});
               }
               with( dialogRows.add() ){
                  selector.bHolidaysDominant = checkboxControls.add({checkedState:true});
                  staticTexts.add({staticLabel:"Holidays are Dominant Highlight Style"});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Moon Size (% of cell)"});
                  moonSize = settings.moonSize.toString();
                  selector.moonSize = textEditboxes.add({editContents:moonSize,minWidth:40});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Moon Rotation"});
                  selector.moonRotation = dropdowns.add({stringList:settings.moonRotationOptions, selectedIndex:0});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Work Week Prefix"});
                  selector.workWeekPrefix = textEditboxes.add({editContents:settings.workWeekPrefix, minWidth:40});
               }
               with( dialogRows.add() ){
                  selector.UseCalendarLayer = checkboxControls.add({checkedState:false});
                  staticTexts.add({staticLabel:"Use Calendar Layer"});
               }
               with( dialogRows.add() ){
                  selector.AddBackgroundLayer = checkboxControls.add({checkedState:false});
                  staticTexts.add({staticLabel:"Add Background Layer"});
               }
               with( dialogRows.add() ){
                  selector.IncludeStylesForEveryDay = checkboxControls.add({checkedState:false});
                  staticTexts.add({staticLabel:"Include Styles for Every Day"});
               }
               with( dialogRows.add() ){
                  selector.ImportStyles = checkboxControls.add({checkedState:false});
                  staticTexts.add({staticLabel:"Import Styles from Reference Calendar"});
               }
            }
            with(dialogColumns.add()){
               staticTexts.add({staticLabel:"     "});
            }
            with(dialogColumns.add()){
               with( dialogRows.add() ){
                  with(dialogColumns.add()){
                     staticTexts.add({staticLabel:""});
                     staticTexts.add({staticLabel:""});
                     staticTexts.add({staticLabel:""});
                  }
               }
               if( settings.bUseCustomHeightAndWidth ){
                  with( dialogRows.add() ){
                     staticTexts.add({staticLabel:"Month Frame Size/Placement"});
                     with( dialogRows.add() ){
                        with( dialogColumns.add() ){
                           with( dialogRows.add() ){
                              with( dialogColumns.add() ){
                                 staticTexts.add({staticLabel:"Height"});
                                 staticTexts.add({staticLabel:"Width"});
                              }
                              with( dialogColumns.add() ){
                                 selector.monthCustomHeight = textEditboxes.add({minWidth:40});
                                 selector.monthCustomWidth  = textEditboxes.add({minWidth:40});
                              }
                           }
                        }
                        with( dialogColumns.add() ){
                           with( dialogRows.add() ){
                              with( dialogColumns.add() ){
                                 staticTexts.add({staticLabel:"Top Edge"});
                                 staticTexts.add({staticLabel:"Left Edge"});
                              }
                              with( dialogColumns.add() ){
                                 selector.monthCustomTopEdge   = textEditboxes.add({minWidth:40});
                                 selector.monthCustomLeftEdge = textEditboxes.add({minWidth:40});
                              }
                           }
                        }
                     }
                  }
               } else {
                  with(dialogRows.add()){
                    staticTexts.add({staticLabel:"Month Frame Size/Placement"});
                  }
                  with( dialogRows.add() ){
                     with( dialogColumns.add() ){
                        staticTexts.add({staticLabel:"Top"});
                        staticTexts.add({staticLabel:"Bottom"});
                        staticTexts.add({staticLabel:""});
                     }
                     with( dialogColumns.add() ){
                        selector.monthCustomSizeY1 = textEditboxes.add({minWidth:40});
                        selector.monthCustomSizeY2 = textEditboxes.add({minWidth:40});
                        staticTexts.add({staticLabel:"Left"});
                     }
                     with( dialogColumns.add() ){
                        staticTexts.add({staticLabel:" "});
                        staticTexts.add({staticLabel:" "});
                        selector.monthCustomSizeX1 = textEditboxes.add({minWidth:40});
                     }
                     with( dialogColumns.add() ){
                        staticTexts.add({staticLabel:" "});
                        staticTexts.add({staticLabel:" "});
                        staticTexts.add({staticLabel:"Right"});
                     }
                     with( dialogColumns.add() ){
                        staticTexts.add({staticLabel:" "});
                        staticTexts.add({staticLabel:" "});
                        selector.monthCustomSizeX2 = textEditboxes.add({minWidth:40});
                     }
                  }
               }
               with(dialogRows.add()){
                  staticTexts.add({staticLabel:""});
               }
               if( settings.bUseCustomHeightAndWidth ){
                  with( dialogRows.add() ){
                     staticTexts.add({staticLabel:"Year Frame Size/Placement"});
                     with( dialogRows.add() ){
                        with( dialogColumns.add() ){
                           with( dialogRows.add() ){
                              with( dialogColumns.add() ){
                                 staticTexts.add({staticLabel:"Height"});
                                 staticTexts.add({staticLabel:"Width"});
                              }
                              with( dialogColumns.add() ){
                                 selector.yearCustomHeight = textEditboxes.add({minWidth:40});
                                 selector.yearCustomWidth  = textEditboxes.add({minWidth:40});
                              }
                           }
                        }
                        with( dialogColumns.add() ){
                           with( dialogRows.add() ){
                              with( dialogColumns.add() ){
                                 staticTexts.add({staticLabel:"Top Edge"});
                                 staticTexts.add({staticLabel:"Left Edge"});
                              }
                              with( dialogColumns.add() ){
                                 selector.yearCustomTopEdge   = textEditboxes.add({minWidth:40});
                                 selector.yearCustomLeftEdge = textEditboxes.add({minWidth:40});
                              }
                           }
                        }
                     }
                  }
               } else {
                  with(dialogRows.add()){
                     staticTexts.add({staticLabel:"Year Frame Size/Placement"});
                  }
                  with( dialogRows.add() ){
                     with( dialogColumns.add() ){
                        staticTexts.add({staticLabel:"Top"});
                        staticTexts.add({staticLabel:"Bottom"});
                        staticTexts.add({staticLabel:""});
                     }
                     with( dialogColumns.add() ){
                        selector.yearCustomSizeY1 = textEditboxes.add({minWidth:40});
                        selector.yearCustomSizeY2 = textEditboxes.add({minWidth:40});
                        staticTexts.add({staticLabel:"Left"});
                     }
                     with( dialogColumns.add() ){
                        staticTexts.add({staticLabel:" "});
                        staticTexts.add({staticLabel:" "});
                        selector.yearCustomSizeX1 = textEditboxes.add({minWidth:40});
                     }
                     with( dialogColumns.add() ){
                        staticTexts.add({staticLabel:" "});
                        staticTexts.add({staticLabel:" "});
                        staticTexts.add({staticLabel:"Right"});
                     }
                     with( dialogColumns.add() ){
                        staticTexts.add({staticLabel:" "});
                        staticTexts.add({staticLabel:" "});
                        selector.yearCustomSizeX2 = textEditboxes.add({minWidth:40});
                     }
                  }
               }
               with(dialogRows.add()){
                  staticTexts.add({staticLabel:""});
               }
               if( settings.bUseCustomHeightAndWidth ){
                  with( dialogRows.add() ){
                     staticTexts.add({staticLabel:"Picture Frame Size/Placement"});
                     with( dialogRows.add() ){
                        with( dialogColumns.add() ){
                           with( dialogRows.add() ){
                              with( dialogColumns.add() ){
                                 staticTexts.add({staticLabel:"Height"});
                                 staticTexts.add({staticLabel:"Width"});
                              }
                              with( dialogColumns.add() ){
                                 selector.pictureCustomHeight = textEditboxes.add({minWidth:40});
                                 selector.pictureCustomWidth  = textEditboxes.add({minWidth:40});
                              }
                           }
                        }
                        with( dialogColumns.add() ){
                           with( dialogRows.add() ){
                              with( dialogColumns.add() ){
                                 staticTexts.add({staticLabel:"Top Edge"});
                                 staticTexts.add({staticLabel:"Left Edge"});
                              }
                              with( dialogColumns.add() ){
                                 selector.pictureCustomTopEdge   = textEditboxes.add({minWidth:40});
                                 selector.pictureCustomLeftEdge = textEditboxes.add({minWidth:40});
                              }
                           }
                        }
                     }
                  }
               } else {
                  with(dialogRows.add()){
                     staticTexts.add({staticLabel:"Picture Frame Size/Placement"});
                  }
                  with( dialogRows.add() ){
                     with( dialogColumns.add() ){
                        staticTexts.add({staticLabel:"Top"});
                        staticTexts.add({staticLabel:"Bottom"});
                        staticTexts.add({staticLabel:""});
                     } 
                     with( dialogColumns.add() ){
                        selector.pictureCustomSizeY1 = textEditboxes.add({minWidth:40});
                        selector.pictureCustomSizeY2 = textEditboxes.add({minWidth:40});
                        staticTexts.add({staticLabel:"Left"});
                     }
                     with( dialogColumns.add() ){
                        staticTexts.add({staticLabel:" "});
                        staticTexts.add({staticLabel:" "});
                        selector.pictureCustomSizeX1 = textEditboxes.add({minWidth:40});
                     }
                     with( dialogColumns.add() ){
                        staticTexts.add({staticLabel:" "});
                        staticTexts.add({staticLabel:" "});
                        staticTexts.add({staticLabel:"Right"});
                     }
                     with( dialogColumns.add() ){
                        staticTexts.add({staticLabel:" "});
                        staticTexts.add({staticLabel:" "});
                        selector.pictureCustomSizeX2 = textEditboxes.add({minWidth:40});
                     }
                  }
               }
               staticTexts.add({staticLabel:" "});
               with( dialogRows.add() ){
                  selector.addPictureCustomFrameToSpacerPage = checkboxControls.add({checkedState:false});
                  staticTexts.add({staticLabel:"Add Picture Frame to Spacer Page"});
               }
               with( dialogRows.add() ){
                  selector.addMonthYearCustomFramesToSpacerPage = checkboxControls.add({checkedState:false});
                  staticTexts.add({staticLabel:"Add Month/Year Frames to Spacer Page"});
               }
            }
            with(dialogColumns.add()){
               staticTexts.add({staticLabel:"     "});
            }
            with(dialogColumns.add()){
               with( dialogRows.add() ){
                  with(dialogColumns.add()){
                     with( dialogRows.add() ){
                        //staticTexts.add({staticLabel:"Preset"});
                        //selector.ListCalendarPreset = dropdowns.add({stringList:settings.presetFilesShort,
                                                                     //selectedIndex:0});
                     }
                     staticTexts.add({staticLabel:""});
                     staticTexts.add({staticLabel:""});
                  }
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Holiday Options (M-D[-YYYY]:Text)"});
               }
               with(dialogRows.add()){           
                  with(dialogColumns.add()){
                     staticTexts.add({staticLabel:"<Style>"});
                     staticTexts.add({staticLabel:"From Current Frame"});
                     staticTexts.add({staticLabel:"From Custom Files"});
                     for( i = 0; i < settings.holidayFiles.length; i++ ){
                        staticTexts.add({staticLabel: settings.holidayFilesShort[i]});
                     }
                  }
                  with(dialogColumns.add()){
                     staticTexts.add({staticLabel:"A  "});
                     selector.GetHolidayFromCurrentFrameA = checkboxControls.add({checkedState:false});
                     selector.GetHolidayFromCustomFilesA  = checkboxControls.add({checkedState:false});
                     for( i = 0; i < settings.holidayFiles.length; i++ ){
                        selector.holidaySelectorsA[i] = checkboxControls.add({checkedState:false});
                     }
                  }
                  with(dialogColumns.add()){
                     staticTexts.add({staticLabel:"B  "});
                     selector.GetHolidayFromCurrentFrameB = checkboxControls.add({checkedState:false});
                     selector.GetHolidayFromCustomFilesB  = checkboxControls.add({checkedState:false});
                     for( i = 0; i < settings.holidayFiles.length; i++ ){
                        selector.holidaySelectorsB[i] = checkboxControls.add({checkedState:false});
                     }
                  }
                  with(dialogColumns.add()){
                     staticTexts.add({staticLabel:"C  "});
                     selector.GetHolidayFromCurrentFrameC = checkboxControls.add({checkedState:false});
                     selector.GetHolidayFromCustomFilesC  = checkboxControls.add({checkedState:false});
                     for( i = 0; i < settings.holidayFiles.length; i++ ){
                        selector.holidaySelectorsC[i] = checkboxControls.add({checkedState:false});
                     }
                  }
                  with(dialogColumns.add()){
                     staticTexts.add({staticLabel:"D  "});
                     selector.GetHolidayFromCurrentFrameD = checkboxControls.add({checkedState:false});
                     selector.GetHolidayFromCustomFilesD  = checkboxControls.add({checkedState:false});
                     for( i = 0; i < settings.holidayFiles.length; i++ ){
                        selector.holidaySelectorsD[i] = checkboxControls.add({checkedState:false});
                     }
                  }
               }
            }
         }
        
         with( dialogRows.add() ){
            with( dialogColumns.add() ){
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Column Options"});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Column Order"});
                  selector.columnOrderOptions = dropdowns.add({stringList:settings.columnOrderOptions, selectedIndex:0});
               }
               with( dialogRows.add() ){
                  with( dialogColumns.add() ){
                     with( dialogRows.add() ){
                        staticTexts.add({staticLabel:"Date Column (mandatory)"});
                     }
                     with( dialogRows.add() ){
                        selector.IncludeWeekDayNames = checkboxControls.add({checkedState:true});
                        staticTexts.add({staticLabel:"Include Week Day Names"});
                     }
                     with( dialogRows.add() ){
                        selector.WorkWeek = checkboxControls.add({checkedState:false});
                        staticTexts.add({staticLabel:"Include Work Week"});
                     }
                     with( dialogRows.add() ){
                        selector.Moons = checkboxControls.add({checkedState:false});
                        staticTexts.add({staticLabel:"Include Moon Phase"});
                     }
                     with( dialogRows.add() ){
                        selector.MergeDateAndWeekDayColumns = checkboxControls.add({checkedState:false});
                        staticTexts.add({staticLabel:"Merge Date and Week Day Columns"});
                     }
                  }
                  with( dialogColumns.add() ){
                     staticTexts.add({staticLabel:"Column Width:"});
                     staticTexts.add({staticLabel:"Column Width:"});
                     staticTexts.add({staticLabel:"Column Width:"});
                     staticTexts.add({staticLabel:"Column Width:"});
                     staticTexts.add({staticLabel:"Delimiter:"});
                  }
                  with( dialogColumns.add() ){
                     selector.dateColumnWidth = textEditboxes.add({minWidth:80});
                     selector.weekDayColumnWidth = textEditboxes.add({minWidth:80});
                     selector.workWeekColumnWidth = textEditboxes.add({minWidth:80});
                     selector.moonPhaseColumnWidth = textEditboxes.add({minWidth:80});
                     selector.dateWeekDayDelimiter = textEditboxes.add({minWidth:80});
                  }
               }
            }
         }

         with( dialogRows.add() ){
            staticTexts.add({staticLabel:""});
         }
         if( settings.bUseCustomHeightAndWidth ){
            with( dialogRows.add() ){
               staticTexts.add({staticLabel:"Custom Sizes: Used when all values for the page or calendar size or both are specified"});
            }
         } else {
            with( dialogRows.add() ){
               staticTexts.add({staticLabel:"Custom Sizes: Used when all values for the page or calendar size or both are specified"});
            }
         }

         with( dialogRows.add() ){   
            with( dialogColumns.add() ){
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Custom Page Size/Margin"});
               }
               with( dialogRows.add() ){
                  with( dialogColumns.add() ){
                     staticTexts.add({staticLabel:"Height"});
                     staticTexts.add({staticLabel:"Width"});
                     staticTexts.add({staticLabel:"Margin"});
                     staticTexts.add({staticLabel:"Bleed"});
                  }
                  with( dialogColumns.add() ){
                     selector.customPageHeight = textEditboxes.add({minWidth:80});
                     selector.customPageWidth  = textEditboxes.add({minWidth:80});
                     selector.customPageMargin = textEditboxes.add({minWidth:80});
                     selector.customPageBleed = textEditboxes.add({minWidth:80});
                  }
               }
            }
            with( dialogColumns.add() ){
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"     "});
               }
            }

            if( settings.bUseCustomHeightAndWidth ){
               with( dialogColumns.add() ){
                  with( dialogRows.add() ){
                     staticTexts.add({staticLabel:"Custom Calendar Size/Placement"});
                     with( dialogRows.add() ){
                        with( dialogColumns.add() ){
                           with( dialogRows.add() ){
                              with( dialogColumns.add() ){
                                 staticTexts.add({staticLabel:"Height"});
                                 staticTexts.add({staticLabel:"Width"});
                                 staticTexts.add({staticLabel:"Columns"});
                              }
                              with( dialogColumns.add() ){
                                 selector.calendarCustomHeight = textEditboxes.add({minWidth:40});
                                 selector.calendarCustomWidth  = textEditboxes.add({minWidth:40});
                                 selector.columnCount  = dropdowns.add({stringList:settings.columnCountOptions, selectedIndex:0});
                              }
                           }
                        }
                        with( dialogColumns.add() ){
                           with( dialogRows.add() ){
                              with( dialogColumns.add() ){
                                 staticTexts.add({staticLabel:"Top Edge"});
                                 staticTexts.add({staticLabel:"Left Edge"});
                                 staticTexts.add({staticLabel:"Gutter"});
                              }
                              with( dialogColumns.add() ){
                                 selector.calendarCustomTopEdge  = textEditboxes.add({minWidth:40});
                                 selector.calendarCustomLeftEdge = textEditboxes.add({minWidth:40});
                                 selector.columnGutter = textEditboxes.add({minWidth:40});
                              }
                           }
                        }
                     }
                  }
               }
            } else {
               with( dialogColumns.add() ){
                  with( dialogRows.add() ){
                     staticTexts.add({staticLabel:"Custom Calendar Size/Placement"});
                  }              
                  with( dialogRows.add() ){
                     with( dialogColumns.add() ){
                        staticTexts.add({staticLabel:"Top"});
                        staticTexts.add({staticLabel:"Bottom"});
                        staticTexts.add({staticLabel:""});
                        staticTexts.add({staticLabel:"Columns:"});
                     }
                     with( dialogColumns.add() ){
                        selector.customSizeY1 = textEditboxes.add({minWidth:40});
                        selector.customSizeY2 = textEditboxes.add({minWidth:40});
                        staticTexts.add({staticLabel:"Left"});
                        selector.columnCount  = dropdowns.add({stringList:settings.columnCountOptions, selectedIndex:0});
                     }
                     with( dialogColumns.add() ){
                        staticTexts.add({staticLabel:" "});
                        staticTexts.add({staticLabel:" "});
                        selector.customSizeX1 = textEditboxes.add({minWidth:40});
                     }
                     with( dialogColumns.add() ){
                        staticTexts.add({staticLabel:" "});
                        staticTexts.add({staticLabel:" "});
                        staticTexts.add({staticLabel:"Right"});
                        staticTexts.add({staticLabel:"Gutter:"});
                     }
                     with( dialogColumns.add() ){
                        staticTexts.add({staticLabel:" "});
                        staticTexts.add({staticLabel:" "});
                        selector.customSizeX2 = textEditboxes.add({minWidth:40});
                        selector.columnGutter = textEditboxes.add({minWidth:40});
                     }
                  }
               }
            }
            with( dialogColumns.add() ){
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"     "});
               }
            }
            with( dialogColumns.add() ){
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Units/Style"});
               }
               with( dialogRows.add() ){
                  with( dialogColumns.add() ){
                     staticTexts.add({staticLabel:"Units:"});
                     staticTexts.add({staticLabel:"Calendar Style Set:"});
                  }
                  with( dialogColumns.add() ){
                     selector.customSizeUnitOptions = dropdowns.add({stringList:settings.calendarCustomSizeUnitOptions, selectedIndex:0});
                     selector.styleSetOptions       = dropdowns.add({stringList:settings.styleSetOptions, selectedIndex:0});
                  }
               }
            }
         }

         with( dialogRows.add() ){
            staticTexts.add({staticLabel:" "});
         }

         with( dialogRows.add() ){
            with(dialogColumns.add()){
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Color Space"});
                  selector.ColorSpace = dropdowns.add({stringList:settings.colorSpaceOptions,
                     selectedIndex:0});
               }

               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Page"});
                  selector.PageType = dropdowns.add({stringList:settings.pageTypeOptions,
                     selectedIndex:0});
                  selector.PageOrientation = dropdowns.add({stringList:settings.pageOrientationOptions,
                     selectedIndex:1});
                  selector.PageSize = dropdowns.add({stringList:settings.pageSizeOptions,
                     selectedIndex:0});
               }
            }

            with( dialogColumns.add() ){
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"     "});
               }
            }

            with( dialogColumns.add() ){
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Spacer Page"});
                  selector.spacerPageOptions = dropdowns.add({stringList:settings.spacerPageOptions,
                     selectedIndex:0});
               }
               with( dialogRows.add() ){
                  selector.includeCoverPages = checkboxControls.add({checkedState:false});
                  staticTexts.add({staticLabel:"Include Cover Pages"});
               }
            }
         }

         with( dialogRows.add() ){
            staticTexts.add({staticLabel:"     "});
         }

         with( dialogRows.add() ){
            with(dialogColumns.add()){
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"The List Calendar was sponsored by the Elle Media Group (http://www.ellemediagroup.co.uk)."});
               }
               with( dialogRows.add() ){
                  if( settings.bLicensed ){
                     licensedToText = "This script is licensed for single use";
                     if( settings.licenseType == "S" || settings.licenseType == "s" ){
                        licensedToText = "This script is licensed for single use";
                        if( settings.licensedTo != null && settings.nonSpaceRegExp.test( settings.licensedTo ) ){
                           licensedToText += " to " + settings.licensedTo + ".";
                        } else {
                           licensedToText += ".";
                        } 
                     } else if( settings.licenseType == "E" || settings.licenseType == "e" ){
                        licensedToText = "This script is licensed for enterprise use";
                        if( settings.licensedTo != null && settings.nonSpaceRegExp.test( settings.licensedTo ) ){
                           licensedToText += " to " + settings.licensedTo + ".";
                        } else {
                           licensedToText += ".";
                        } 
                     } else {
                        licensedToText = "This script is licensed for single use";
	             }
                     staticTexts.add({staticLabel:licensedToText});
                  } else {
                     staticTexts.add({staticLabel:"This script is free for personal and non-profit use.  A commerical use license may be purchased at: http://calendarwizard.sourceforge.net"});
                  }
               } 
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Documentation and tutorial examples are at http://calendarwizard.sourceforge.net."});
               }
            }
         }
      }
   }

   // this is necessary because a previous script written by somebody else might 
   // have disabled it which would cause the script to not work.
   if( !settings.bCS )
   {
      app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
   }

   bOK = dialogBox.show();

   if( bOK )
   {
      ParseUserInput( settings, selector );
      //if( selector.Preset.selectedIndex > 0 ){
         //ParsePreset( settings, settings.presetFiles[ selector.Preset.selectedIndex - 1 ] );
      //}

      if( !bUserInputOK( settings ) )
      {
         bOK = false;
      }
   }

   dialogBox.destroy();

   return( bOK );
}
