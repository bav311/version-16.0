/* --------------------------------------------------------------- //
   Line Calendar 

   Authored by by Scott Selberg
   August 31, 2015

   Subversion Revision: $Revision: 157 $
   Author: $Author: sselberg $
   Subversion Head URL: $HeadURL: svn+ssh://sselberg@svn.code.sf.net/p/calendarwizard/code/trunk/calendarWizard.js $
// --------------------------------------------------------------- */
function buildCalendar( settings, frame, iMonth, iYear )
{
   var myCells;
   var day;
   var dateBuffer;
   var workWeek;
   var bIncludeHeaderInCompact;
   var startCellCount = 0;

   var month = settings.months[ iMonth ];
   var bSplitCell = false;
   var stroke = 1/72;
   var calendarColumnCount = 7;
   var initialRows = 2;
   var leftIndex = 0;
   var rightIndex = 2;

   var i;
   var next;
   var date;
   var startDay;
   var endDate;
   var daysInThePreviousMonth;
   var daysInTheNextMonth;
   var bStarted;
   var strokeHeight;
   var cellHeight;
   var rowStart;
   var holidaysTextFrame;
   var myMasterRow;
   var mySlaveRow;
   var myMasterColumn;
   var mySlaveColumn;
   var textTextFrame;
   var bufferStroke;
   var cellWidth;

   var julianDateTextFrame;
   var julianDateCalendar
   var moonsTextFrame;
   var moonsCalendar;
   var picturesTextFrame;
   var picturesCalendar;
   var backgroundTextFrame;
   var backgroundCalendar;
   var styles;
   var rowOffset;
   var dateWithYearRegExp    = /^\s*(\d+)\s*-\s*(\d+)\s*-\s*(\d+)\s*/;

   // needed to map the cell label to cell id since CS has no label...
   var csLabelMap = new Array;
   var bufferLabel;
   
   var date = new Date();
   var rowCells;
   var columnCells;
   var weekDayOfTheFirst;
   var weekDays = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];
   var daysInTheMonth = GetDaysInMonth( iYear, iMonth );
   
   var stroke = 1/72;
   var strokeWidth = stroke;
   var days;
   var frameHeight;
   var frameWidth;
   var myDocument = settings.currentDocument;
   var myCalendar;
   var selectedStyle;
   var currentWeekday;
   var currentDate;
   var calendarCells;
   var useWidth;
   var lines;
   var emptyCells;
   var line1EmptyCells;
   var line2EmptyCells; 
   var i;
   var j;

   date.setUTCFullYear( iYear, iMonth, 1 );
   date.setUTCHours( 0, 0, 0, 0 );
   weekDayOfTheFirst = date.getUTCDay();

   with( frame )
   {
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

      frameHeight = (frameBounds[2]-frameBounds[0]);
      frameWidth  = (frameBounds[3]-frameBounds[1]);
         
      // if not using the full frame, always divide by 31 so every months' cells will be
      // the same size, but the height or length of the calendar will vary.
      
      if( settings.bVertical ){

         // Unlimited
         if( settings.daysPerLine == settings.daysPerLineOptions[0] ){
            rowCells = daysInTheMonth;
            columnCells = 1;
            if( settings.bUseFullFrame ){
               rowHeight   = (frameHeight-strokeWidth)/rowCells;
            } else {
               rowHeight   = (frameHeight-strokeWidth)/31;
            }
         } else {
            rowCells = Math.ceil(daysInTheMonth/2);
            columnCells = 2;
            if( settings.bUseFullFrame ){
               rowHeight   = (frameHeight-strokeWidth)/rowCells;
            } else {
               rowHeight   = (frameHeight-strokeWidth)/16;
            }
         }
         
         if( settings.bLineCalendarSquareCells ){
            useWidth = (columnCells * rowHeight);
            columnWidth = rowHeight;
         } else {
            useWidth = frameWidth-strokeWidth;
            columnWidth = (frameWidth-strokeWidth)/columnCells;
         }
      } else {
         
         if( settings.daysPerLine == settings.daysPerLineOptions[0] ){
            columnCells = daysInTheMonth;
            rowCells = 1;
            if( settings.bUseFullFrame ){
               columnWidth = (frameWidth-strokeWidth)/columnCells;
               useWidth = frameWidth-strokeWidth;
            } else {
               columnWidth = (frameWidth-strokeWidth)/31;
               useWidth = (columnWidth * daysInTheMonth);
            }
         } else {
            columnCells = Math.ceil(daysInTheMonth/2);
            rowCells = 2;
            if( settings.bUseFullFrame ){
               columnWidth = (frameWidth-strokeWidth)/columnCells;
               useWidth = frameWidth - strokeWidth;
            } else {
               columnWidth = (frameWidth-strokeWidth)/16;
               useWidth = (columnWidth * columnCells);
            }
         }

         if( settings.bLineCalendarSquareCells ){
            rowHeight = columnWidth;
         } else {
            rowHeight = (frameHeight-strokeWidth)/rowCells;
         }
      }

      myCalendar = frame.parentStory.tables.add( {bodyRowCount:rowCells, 
                                                  columnCount:columnCells,
                                                  width:useWidth} );
 
      with( myCalendar )
      {
         cells.everyItem().height = rowHeight;

         // Default the styles in the cell
         if( settings.bCellStyles == true )
         {
            selectedStyle = "cal_date";
            appliedTableStyle = myDocument.tableStyles.item(selectedStyle + settings.styleSet);

            selectedStyle = "cal_date";
            rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
         }

         emptyCells = cells.length - daysInTheMonth;
         line1EmptyCells = Math.floor( emptyCells/2 );
         line2EmptyCells = Math.floor( emptyCells/2 );
         if( emptyCells % 2 != 0 ){
            if( settings.daysPerLine == settings.daysPerLineOptions[1] ){
               line2EmptyCells++;
            } else {
               line1EmptyCells++;
            }
         }

         currentWeekday = 'monday';
         calendarCells = cells;
         if( settings.bVertical ){
            myLines = columns;
         } else {
            myLines = rows;
         }

         currentDay = 1;
         for( i = 0; i < myLines.length; i++ ){
            for( j = 0; j < myLines.item( i ).cells.length; j++ ){
               currentWeekdayIndex = ((currentDay-1)+weekDayOfTheFirst)%7;
               currentWeekday = weekDays[ currentWeekdayIndex ];

               if( settings.bIncludeStylesForEveryDay ) {
                  style = currentWeekday;
               } else if( ( settings.bHighlightWeekends || settings.bHighlightSundays || settings.bHighlightSaturdays ) && (currentWeekdayIndex == 0 || currentWeekdayIndex == 6 ) ){
                  style = currentWeekday;
               } else {
                  if( currentWeekdayIndex == 0 || currentWeekdayIndex == 6 ){
                     style = "weekend";
                  } else {
                     style = "weekday";
                  }
               }
 
               if( settings.putEmptyCellsAtEndOfLine ){
                  if(  (i == 0 && j < myLines.item(i).cells.length - line1EmptyCells)
                    || (i == 1 && j < myLines.item(i).cells.length - line2EmptyCells) ){
                     myLines.item(i).cells.item(j).appliedCellStyle = myDocument.cellStyles.item( 'cal_' + style + "_date" + settings.styleSet );
                     myLines.item(i).cells.item(j).contents = currentDay.toString();
                     myLines.item(i).cells.item(j).label = (iMonth+1).toString() + "-" + currentDay.toString() + "-" + iYear.toString();
                     currentDay++;
                  } else {
                     if( i == 0 ){
                        myLines.item(i).cells.item(j).appliedCellStyle = myDocument.cellStyles.item( 'cal_empty_line1' + settings.styleSet );
                     } else {
                        myLines.item(i).cells.item(j).appliedCellStyle = myDocument.cellStyles.item( 'cal_empty_line2' + settings.styleSet );
                     }
                  }
               } else {
                  if(  (i == 0 && j + 1 > line1EmptyCells && j < myLines.item(i).cells.length)
                    || (i == 1 && j + 1 > line2EmptyCells && j < myLines.item(i).cells.length) ){
                     myLines.item(i).cells.item(j).appliedCellStyle = myDocument.cellStyles.item( 'cal_' + style + "_date" + settings.styleSet );
                     myLines.item(i).cells.item(j).contents = currentDay.toString();
                     myLines.item(i).cells.item(j).label = (iMonth+1).toString() + "-" + currentDay.toString() + "-" + iYear.toString();
                     currentDay++;
                  } else {
                     if( i == 0 ){
                        myLines.item(i).cells.item(j).appliedCellStyle = myDocument.cellStyles.item( 'cal_empty_line1' + settings.styleSet );
                     } else {
                        myLines.item(i).cells.item(j).appliedCellStyle = myDocument.cellStyles.item( 'cal_empty_line2' + settings.styleSet );
                     }
                  }
               }
            }
         }
      }
   }
   frame.fit( FitOptions.FRAME_TO_CONTENT );

   var holidaysOnPrimaryLayer = new Array();
   for( i = 0; i < settings.ABCD.length; i++ ){
      if( settings[ "bHolidaysLayer" + settings.ABCD[i] ] ){
         if( settings[ 'bHolidayStyle' + settings.ABCD[i] ] ){
            holidaysTextFrame = settings.currentPage.textFrames.add( settings[ "holidaysLayer" + settings.ABCD[i] ] );
            if( settings.bFrameNameSupported == true )
            {
               holidaysTextFrame.name = settings[ "calendarHolidayLabel" + settings.ABCD[i] ] + settings.iCalendarCount;
            }
            holidaysTextFrame.label = settings[ "calendarHolidayLabel" + settings.ABCD[i] ] + settings.iCalendarCount;
            holidaysTextFrame.geometricBounds = frame.geometricBounds;
   
            holidaysCalendar = holidaysTextFrame.parentStory.tables.add({bodyRowCount:myCalendar.bodyRowCount, 
                                                                         columnCount:myCalendar.columnCount
                                                                       });
            if( settings.bCellStyles )
            {
                holidaysCalendar.appliedTableStyle = myDocument.tableStyles.item("cal_holiday" + settings.styleSet);
                holidaysCalendar.rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_holiday" + settings.ABCD[i] + settings.styleSet);
            }

            if( settings.bCS )
            {
               // in CS, the table is not made properly in the constructor, so
               // I'm setting the bounds again manually...
               holidaysCalendar.bodyRowCount = myCalendar.bodyRowCount;
               holidaysCalendar.columnCount = myCalendar.columnCount;
            }
   
            myMasterRow = myCalendar.rows.lastItem().cells;
            mySlaveRow  = holidaysCalendar.rows.lastItem().cells;

            for( j = 0; j < myMasterRow.length; j++ )
            {
               mySlaveRow[j].width = myMasterRow[j].width;
            }

            myMasterColumn = myCalendar.columns.firstItem().cells;
            mySlaveColumn  = holidaysCalendar.columns.firstItem().cells;

            for( j = 0; j < myMasterColumn.length; j++ )
            {
               mySlaveColumn[j].height = myMasterColumn[j].height;
            }

            if( !settings.bCellStyles )
            {
                holidaysCalendar.cells.everyItem().leftEdgeStrokeWeight = "0in";
                holidaysCalendar.cells.everyItem().topEdgeStrokeWeight = "0in";
                holidaysCalendar.cells.everyItem().rightEdgeStrokeWeight = "0in";
                holidaysCalendar.cells.everyItem().bottomEdgeStrokeWeight = "0in";
                holidaysCalendar.cells.everyItem().insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item("cal_holiday" + settings.styleSet);
                holidaysCalendar.cells.everyItem().verticalJustification = VerticalJustification.bottomAlign;
            }
      
            addHolidayText( settings, iYear, myCalendar, holidaysCalendar, settings.ABCD[i] );
         }
      } else {
        holidaysOnPrimaryLayer.push( settings.ABCD[ i ] );
      }
   } 

   if( settings.bHolidaysLayer && holidaysOnPrimaryLayer.length > 0 )
   {
      holidaysTextFrame = settings.currentPage.textFrames.add( settings.holidaysLayer );
      if( settings.bFrameNameSupported == true )
      {
         holidaysTextFrame.name = settings.calendarHolidayLabel + settings.iCalendarCount;
      }
      holidaysTextFrame.label = settings.calendarHolidayLabel + settings.iCalendarCount;
      holidaysTextFrame.geometricBounds = frame.geometricBounds;

      holidaysCalendar = holidaysTextFrame.parentStory.tables.add({bodyRowCount:myCalendar.bodyRowCount, 
                                                                   columnCount:myCalendar.columnCount
                                                                 });
      if( settings.bCellStyles )
      {
          holidaysCalendar.appliedTableStyle = myDocument.tableStyles.item("cal_holiday" + settings.styleSet);
          holidaysCalendar.rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_holiday" + settings.styleSet);
      }

      if( settings.bCS )
      {
         // in CS, the table is not made properly in the constructor, so
         // I'm setting the bounds again manually...
         holidaysCalendar.bodyRowCount = myCalendar.bodyRowCount;
         holidaysCalendar.columnCount = myCalendar.columnCount;
      }

      myMasterRow = myCalendar.rows.lastItem().cells;
      mySlaveRow  = holidaysCalendar.rows.lastItem().cells;

      for( i = 0; i < myMasterRow.length; i++ )
      {
         mySlaveRow[i].width = myMasterRow[i].width;
      }

      myMasterColumn = myCalendar.columns.firstItem().cells;
      mySlaveColumn  = holidaysCalendar.columns.firstItem().cells;

      for( i = 0; i < myMasterColumn.length; i++ )
      {
         mySlaveColumn[i].height = myMasterColumn[i].height;
      }

      if( !settings.bCellStyles )
      {
          holidaysCalendar.cells.everyItem().leftEdgeStrokeWeight = "0in";
          holidaysCalendar.cells.everyItem().topEdgeStrokeWeight = "0in";
          holidaysCalendar.cells.everyItem().rightEdgeStrokeWeight = "0in";
          holidaysCalendar.cells.everyItem().bottomEdgeStrokeWeight = "0in";
          holidaysCalendar.cells.everyItem().insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item("cal_holiday" + settings.styleSet);
          holidaysCalendar.cells.everyItem().verticalJustification = VerticalJustification.bottomAlign;
      }
   
      addHolidayText( settings, iYear, myCalendar, holidaysCalendar, "All", holidaysOnPrimaryLayer );
   }

   if( settings.bJulianDateLayer )
   {
      julianDateTextFrame = settings.currentPage.textFrames.add( settings.julianDateLayer );
      if( settings.bFrameNameSupported == true )
      {
         julianDateTextFrame.name = settings.calendarJulianDateLabel + settings.iCalendarCount;
      }
      julianDateTextFrame.label = settings.calendarJulianDateLabel + settings.iCalendarCount;
      julianDateTextFrame.geometricBounds = frame.geometricBounds;

      julianDateCalendar = julianDateTextFrame.parentStory.tables.add({bodyRowCount:myCalendar.bodyRowCount, 
                                                                       columnCount:myCalendar.columnCount
                                                                      });
      if( settings.bCellStyles )
      {
          julianDateCalendar.appliedTableStyle = myDocument.tableStyles.item("cal_julianDate" + settings.styleSet);
          julianDateCalendar.rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_julianDate" + settings.styleSet);
      }

      if( settings.bCS )
      {
         // in CS, the table is not made properly in the constructor, so
         // I'm setting the bounds again manually...
         julianDateCalendar.bodyRowCount = myCalendar.bodyRowCount;
         julianDateCalendar.columnCount = myCalendar.columnCount;
      }

      myMasterRow = myCalendar.rows.lastItem().cells;
      mySlaveRow  = julianDateCalendar.rows.lastItem().cells;

      for( i = 0; i < myMasterRow.length; i++ )
      {
         mySlaveRow[i].width = myMasterRow[i].width;
      }

      myMasterColumn = myCalendar.columns.firstItem().cells;
      mySlaveColumn  = julianDateCalendar.columns.firstItem().cells;

      for( i = 0; i < myMasterColumn.length; i++ )
      {
         mySlaveColumn[i].height = myMasterColumn[i].height;
      }

      if( !settings.bCellStyles )
      {
          julianDateCalendar.cells.everyItem().insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item("cal_julianDate" + settings.styleSet);;
      }

      addJulianDates( settings, myCalendar, julianDateCalendar );
   }

   if( settings.bWeekDay )
   {
      weekDayTextFrame = settings.currentPage.textFrames.add( settings.weekDayLayer );
      if( settings.bFrameNameSupported == true )
      {
         weekDayTextFrame.name = settings.calendarWeekDayLabel + settings.iCalendarCount;
      }
      weekDayTextFrame.label = settings.calendarWeekDayLabel + settings.iCalendarCount;
      weekDayTextFrame.geometricBounds = frame.geometricBounds;

      weekDayCalendar = weekDayTextFrame.parentStory.tables.add({bodyRowCount:myCalendar.bodyRowCount, 
                                                                 columnCount:myCalendar.columnCount
                                                                 });
      if( settings.bCellStyles )
      {
          weekDayCalendar.appliedTableStyle = myDocument.tableStyles.item("cal_weekDay" + settings.styleSet);
          weekDayCalendar.rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_weekDay" + settings.styleSet);
      }

      if( settings.bCS )
      {
         // in CS, the table is not made properly in the constructor, so
         // I'm setting the bounds again manually...
         weekDayCalendar.bodyRowCount = myCalendar.bodyRowCount;
         weekDayCalendar.columnCount = myCalendar.columnCount;
      }

      myMasterRow = myCalendar.rows.lastItem().cells;
      mySlaveRow  = weekDayCalendar.rows.lastItem().cells;

      for( i = 0; i < myMasterRow.length; i++ )
      {
         mySlaveRow[i].width = myMasterRow[i].width;
      }

      myMasterColumn = myCalendar.columns.firstItem().cells;
      mySlaveColumn  = weekDayCalendar.columns.firstItem().cells;

      for( i = 0; i < myMasterColumn.length; i++ )
      {
         mySlaveColumn[i].height = myMasterColumn[i].height;
      }

      if( !settings.bCellStyles )
      {
          weekDayCalendar.cells.everyItem().insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item("cal_weekDay" + settings.styleSet);;
      }

      addWeekDays( settings, myCalendar, weekDayCalendar );
   }
   
   if( settings.bWorkWeek )
   {
      workWeekTextFrame = settings.currentPage.textFrames.add( settings.workWeekLayer );
      if( settings.bFrameNameSupported == true )
      {
         workWeekTextFrame.name = settings.calendarWorkWeekLabel + settings.iCalendarCount;
      }
      workWeekTextFrame.label = settings.calendarWorkWeekLabel + settings.iCalendarCount;
      workWeekTextFrame.geometricBounds = frame.geometricBounds;

      workWeekCalendar = workWeekTextFrame.parentStory.tables.add({bodyRowCount:myCalendar.bodyRowCount, 
                                                                   columnCount:myCalendar.columnCount
                                                                  });
      if( settings.bCellStyles )
      {
          workWeekCalendar.appliedTableStyle = myDocument.tableStyles.item("cal_workWeek" + settings.styleSet);
          workWeekCalendar.rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_workWeek" + settings.styleSet);
      }

      if( settings.bCS )
      {
         // in CS, the table is not made properly in the constructor, so
         // I'm setting the bounds again manually...
         workWeekCalendar.bodyRowCount = myCalendar.bodyRowCount;
         workWeekCalendar.columnCount = myCalendar.columnCount;
      }

      myMasterRow = myCalendar.rows.lastItem().cells;
      mySlaveRow  = workWeekCalendar.rows.lastItem().cells;

      for( i = 0; i < myMasterRow.length; i++ )
      {
         mySlaveRow[i].width = myMasterRow[i].width;
      }

      myMasterColumn = myCalendar.columns.firstItem().cells;
      mySlaveColumn  = workWeekCalendar.columns.firstItem().cells;

      for( i = 0; i < myMasterColumn.length; i++ )
      {
         mySlaveColumn[i].height = myMasterColumn[i].height;
      }

      if( !settings.bCellStyles )
      {
          workWeekCalendar.cells.everyItem().insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item("cal_workWeek" + settings.styleSet);;
      }

      addWorkWeeks( settings, myCalendar, workWeekCalendar );
   }

   if( settings.bMoons )
   {
      moonsTextFrame = settings.currentPage.textFrames.add( settings.moonsLayer );
      if( settings.bFrameNameSupported == true )
      {
         moonsTextFrame.name = settings.calendarMoonsLabel + settings.iCalendarCount;
      }
      moonsTextFrame.label = settings.calendarMoonsLabel + settings.iCalendarCount;
      moonsTextFrame.geometricBounds = frame.geometricBounds;

      moonsCalendar = moonsTextFrame.parentStory.tables.add({bodyRowCount:myCalendar.bodyRowCount, 
                                                             columnCount:myCalendar.columnCount
                                                            });
      if( settings.bCellStyles )
      {
          moonsCalendar.appliedTableStyle = myDocument.tableStyles.item("cal_moon" + settings.styleSet);
          moonsCalendar.rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_moon" + settings.styleSet);
      }

      if( settings.bCS )
      {
         // in CS, the table is not made properly in the constructor, so
         // I'm setting the bounds again manually...
         moonsCalendar.bodyRowCount = myCalendar.bodyRowCount;
         moonsCalendar.columnCount = myCalendar.columnCount;
      }

      myMasterRow = myCalendar.rows.lastItem().cells;
      mySlaveRow  = moonsCalendar.rows.lastItem().cells;

      for( i = 0; i < myMasterRow.length; i++ )
      {
         mySlaveRow[i].width = myMasterRow[i].width;
      }

      myMasterColumn = myCalendar.columns.firstItem().cells;
      mySlaveColumn  = moonsCalendar.columns.firstItem().cells;

      for( i = 0; i < myMasterColumn.length; i++ )
      {
         mySlaveColumn[i].height = myMasterColumn[i].height;
      }

      if( !settings.bCellStyles )
      {
          moonsCalendar.cells.everyItem().leftEdgeStrokeWeight = "0in";
          moonsCalendar.cells.everyItem().topEdgeStrokeWeight = "0in";
          moonsCalendar.cells.everyItem().rightEdgeStrokeWeight = "0in";
          moonsCalendar.cells.everyItem().bottomEdgeStrokeWeight = "0in";
          moonsCalendar.cells.everyItem().insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item("cal_moon" + settings.styleSet);
          moonsCalendar.cells.everyItem().verticalJustification = VerticalJustification.bottomAlign;
      }

      // disabled because it causes the myCalendar to change layers
      addMoons( settings, myCalendar, moonsCalendar );
   }

   if( settings.bPicturesLayer )
   {
      picturesTextFrame = settings.currentPage.textFrames.add( settings.picturesLayer );
      if( settings.bFrameNameSupported == true )
      {
         picturesTextFrame.name = settings.calendarPicturesLabel + settings.iCalendarCount;
      }
      picturesTextFrame.label = settings.calendarPicturesLabel + settings.iCalendarCount;
      picturesTextFrame.geometricBounds = frame.geometricBounds;

      picturesCalendar = picturesTextFrame.parentStory.tables.add({bodyRowCount:myCalendar.bodyRowCount, 
                                                                   columnCount:myCalendar.columnCount
                                                                  });
      if( settings.bCellStyles )
      {
          picturesCalendar.appliedTableStyle = myDocument.tableStyles.item("cal_pictures" + settings.styleSet);
          picturesCalendar.rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_pictures" + settings.styleSet);
      }

      if( settings.bCS )
      {
         // in CS, the table is not made properly in the constructor, so
         // I'm setting the bounds again manually...
         picturesCalendar.bodyRowCount = myCalendar.bodyRowCount;
         picturesCalendar.columnCount = myCalendar.columnCount;
      }

      myMasterRow = myCalendar.rows.lastItem().cells;
      mySlaveRow  = picturesCalendar.rows.lastItem().cells;

      for( i = 0; i < myMasterRow.length; i++ )
      {
         mySlaveRow[i].width = myMasterRow[i].width;
      }

      myMasterColumn = myCalendar.columns.firstItem().cells;
      mySlaveColumn  = picturesCalendar.columns.firstItem().cells;

      for( i = 0; i < myMasterColumn.length; i++ )
      {
         mySlaveColumn[i].height = myMasterColumn[i].height;
      }

      if( !settings.bCellStyles )
      {
          picturesCalendar.cells.everyItem().leftEdgeStrokeWeight = "0in";
          picturesCalendar.cells.everyItem().topEdgeStrokeWeight = "0in";
          picturesCalendar.cells.everyItem().rightEdgeStrokeWeight = "0in";
          picturesCalendar.cells.everyItem().bottomEdgeStrokeWeight = "0in";
          picturesCalendar.cells.everyItem().insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item("cal_pictures" + settings.styleSet);
          picturesCalendar.cells.everyItem().verticalJustification = VerticalJustification.bottomAlign;
      }

      // disabled because it causes the myCalendar to change layers
      addPictureFrames( settings, myCalendar, picturesCalendar );
   }
   
   if( settings.bBackgroundLayer )
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

      backgroundCalendar = backgroundTextFrame.parentStory.tables.add({bodyRowCount:myCalendar.bodyRowCount, 
                                                                       columnCount:myCalendar.columnCount
                                                                      });
      
      if( settings.bCellStyles )
      {
          backgroundCalendar.appliedTableStyle = myDocument.tableStyles.item("cal_background" + settings.styleSet);
          backgroundCalendar.rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_background" + settings.styleSet);

          // Transfer the highlighted date cells.
          for( i = 0; i < myCalendar.rows.length; i++ ){
             for( j = 0; j < myCalendar.rows.item(i).cells.length; j++ ){
                if( settings.bIncludeStylesForEveryDay || settings.lineCalendarHighlightedStyleRegExp.test( myCalendar.rows.item(i).cells.item(j).appliedCellStyle.name ) ){
                   try{ backgroundCalendar.rows.item(i).cells.item(j).appliedCellStyle = getBackgroundStyle( settings,  myCalendar.rows.item(i).cells.item(j).appliedCellStyle.name );}
                   catch( error ){
                      alert( "Style :" + getBackgroundStyle( myCalendar.rows.item(i).cells.item(j).appliedCellStyle.name ) + " not found." );
                      throw( error );
                   }
                }
             }
          }
      }

      if( settings.bCS )
      {
         // in CS, the table is not made properly in the constructor, so
         // I'm setting the bounds again manually...
         backgroundCalendar.bodyRowCount = myCalendar.bodyRowCount;
         backgroundCalendar.columnCount = myCalendar.columnCount;
      }

      myMasterRow = myCalendar.rows.lastItem().cells;
      mySlaveRow  = backgroundCalendar.rows.lastItem().cells;

      for( i = 0; i < myMasterRow.length; i++ )
      {
         mySlaveRow[i].width = myMasterRow[i].width;
      }

      myMasterColumn = myCalendar.columns.firstItem().cells;
      mySlaveColumn  = backgroundCalendar.columns.firstItem().cells;

      for( i = 0; i < myMasterColumn.length; i++ )
      {
         mySlaveColumn[i].height = myMasterColumn[i].height;
      }

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

   if( settings.bTextLayer )
   {
      textTextFrame = settings.currentPage.textFrames.add( settings.textLayer );
      if( settings.bFrameNameSupported == true )
      {
         textTextFrame.name = settings.calendarTextLabel + settings.iCalendarCount;
      }
      textTextFrame.label = settings.calendarTextLabel + settings.iCalendarCount;
      textTextFrame.geometricBounds = frame.geometricBounds;

      textCalendar = textTextFrame.parentStory.tables.add({bodyRowCount:myCalendar.bodyRowCount, 
                                                           columnCount:myCalendar.columnCount
                                                         });
      if( settings.bCellStyles )
      {
          textCalendar.appliedTableStyle = myDocument.tableStyles.item("cal_text" + settings.styleSet);
          textCalendar.rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_text" + settings.styleSet);
      }

      if( settings.bCS )
      {
         // in CS, the table is not made properly in the constructor, so
         // I'm setting the bounds again manually...
         textCalendar.bodyRowCount = myCalendar.bodyRowCount;
         textCalendar.columnCount = myCalendar.columnCount;
      }

      myMasterRow = myCalendar.rows.lastItem().cells;
      mySlaveRow  = textCalendar.rows.lastItem().cells;

      for( i = 0; i < myMasterRow.length; i++ )
      {
         mySlaveRow[i].width = myMasterRow[i].width;
      }

      myMasterColumn = myCalendar.columns.firstItem().cells;
      mySlaveColumn  = textCalendar.columns.firstItem().cells;

      for( i = 0; i < myMasterColumn.length; i++ )
      {
         mySlaveColumn[i].height = myMasterColumn[i].height;
      }

      if( !settings.bCellStyles )
      {
          textCalendar.cells.everyItem().leftEdgeStrokeWeight = "0in";
          textCalendar.cells.everyItem().topEdgeStrokeWeight = "0in";
          textCalendar.cells.everyItem().rightEdgeStrokeWeight = "0in";
          textCalendar.cells.everyItem().bottomEdgeStrokeWeight = "0in";
          textCalendar.cells.everyItem().insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item("cal_text" + settings.styleSet);
      }
   }
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
   var framesPerPage          = settings.iCalendarsPerPage;
   var frameVerticalSpacing   = settings.calendarVerticalSpacing;
   var frameHorizontalSpacing = settings.calendarHorizontalSpacing;
   var dimensionY;
   var dimensionX;
   var frameCount = 0;
   var scaleFactor = getScaleFactorFromUnits( settings.customPageSizeUnits );;

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

      if( settings.bVertical ){
         framesPerRow    = framesPerPage;
         framesPerColumn = 1;
      } else {
         framesPerRow    = 1;
         framesPerColumn = framesPerPage;
      } 

      dimensionY = (myY2 - myY1 - (frameVerticalSpacing * (framesPerColumn - 1)))/framesPerColumn;
      dimensionX = (myX2 - myX1 - (frameHorizontalSpacing * (framesPerRow - 1)))/framesPerRow;

      for( var i=0; i<framesPerColumn; i++ )
      {
         frameBounds[0] = myY1 + (i * frameVerticalSpacing ) + (i+0) * dimensionY;
         frameBounds[2] = myY1 + (i * frameVerticalSpacing ) + (i+1) * dimensionY;

         for( var j=0; j<framesPerRow; j++ )
         {
            frameBounds[1] = myX1 + (j * frameHorizontalSpacing ) + (j+0) * dimensionX;
            frameBounds[3] = myX1 + (j * frameHorizontalSpacing ) + (j+1) * dimensionX;

            frames[frameCount++] = new Array(frameBounds[0], frameBounds[1], frameBounds[2], frameBounds[3]);
         }
      }
   }

   return frames;
}
// --------------------------------------------------------------- //
function bGetLineCalendarUserInput( settings, selector )
{
   var title  = settings.baseTitle + ": Version " + settings.versionString + " - Line Calendar";
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
   with(dialogBox){
      with(dialogColumns.add()){
         with( dialogRows.add() ){
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
                  with(dialogColumns.add()){
                     selector.StartYear = dropdowns.add({stringList:settings.yearOptions,
                                                         selectedIndex:8});
                     selector.EndYear = dropdowns.add({stringList:settings.yearOptions,
                                                       selectedIndex:8});
                  }
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:" "});
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
                  staticTexts.add({staticLabel:"Layout"});
                  selector.daysPerLine = dropdowns.add({stringList:settings.daysPerLineOptions,
                                                          selectedIndex:0});
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
                  staticTexts.add({staticLabel:"Week Day Style"});
                  selector.headerOptions = dropdowns.add({stringList:settings.headerOptions,
                                                          selectedIndex:0});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Highlight Weekend Option"});
                  selector.highlightDayOptions = dropdowns.add({stringList:settings.highlightDayOptions, selectedIndex:0});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Orientation"});
                  selector.Orientation = dropdowns.add({stringList:settings.orientationOptions,
                                                        selectedIndex:0});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Cell Spacing"});
                  selector.cellSpacingOptions = dropdowns.add({stringList:settings.cellSpacingOptions, selectedIndex:0});
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
                  selector.bLineCalendarSquareCells = checkboxControls.add({checkedState:true});
                  staticTexts.add({staticLabel:"Force Square Cells"});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Work Week Prefix"});
                  selector.workWeekPrefix = textEditboxes.add({editContents:settings.workWeekPrefix, minWidth:40});
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
                  selector.IncludeStylesForEveryDay = checkboxControls.add({checkedState:false});
                  staticTexts.add({staticLabel:"Include Styles for Every Day"});
               }
               with( dialogRows.add() ){
                  selector.ImportStyles = checkboxControls.add({checkedState:false});
                  staticTexts.add({staticLabel:"Import Styles from Reference Calendar"});
               } 
               with( dialogRows.add() ){
                  selector.OnlyPrintFirstWeekday = checkboxControls.add({checkedState:false});
                  staticTexts.add({staticLabel:"Only Print Weekday on the First Day of the Week"});
               } 
               with( dialogRows.add() ){
                  selector.PutEmptyCellsAtEndOfLine = checkboxControls.add({checkedState:true});
                  staticTexts.add({staticLabel:"Put Empty Cells At End Of Line"});
               } 
            }
            with(dialogColumns.add()){
               staticTexts.add({staticLabel:"     "});
            }
            with(dialogColumns.add()){
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:" "});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:" "});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:" "});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Layer Options"});
               }
               with(dialogRows.add()){
                  with(dialogColumns.add()){
                     staticTexts.add({staticLabel:"Add Text Layer"});
                     staticTexts.add({staticLabel:"Add Holiday Layer"});
                     staticTexts.add({staticLabel:"Use Calendar Layer"});
                     staticTexts.add({staticLabel:"Add Day of Year Layer"});
                     staticTexts.add({staticLabel:"Add Week Day Layer"});
                     staticTexts.add({staticLabel:"Add Work Week Layer"});
                     staticTexts.add({staticLabel:"Add Moon Phases"});
                     staticTexts.add({staticLabel:"Add Picture Layer"});
                     staticTexts.add({staticLabel:"Add Background Layer"});
                  }
                  with(dialogColumns.add()){
                     selector.AddTextLayer        = checkboxControls.add({checkedState:false});
                     selector.AddHolidaysLayer    = checkboxControls.add({checkedState:false});
                     selector.UseCalendarLayer    = checkboxControls.add({checkedState:false});
                     selector.AddJulianDateLayer  = checkboxControls.add({checkedState:false});
                     selector.IncludeWeekDayNames = checkboxControls.add({checkedState:false});
                     selector.WorkWeek            = checkboxControls.add({checkedState:false});
                     selector.Moons               = checkboxControls.add({checkedState:false});
                     selector.AddPicturesLayer    = checkboxControls.add({checkedState:false});
                     selector.AddBackgroundLayer  = checkboxControls.add({checkedState:false});
                  }
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
                        //selector.LineCalendarPreset = dropdowns.add({stringList:settings.presetFilesShort,
                                                                     //selectedIndex:0});
                     }
                  }
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:""});
               } 
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:""});
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
            staticTexts.add({staticLabel:" "});
         }
         if( settings.bUseCustomHeightAndWidth ){
            with( dialogRows.add() ){
               staticTexts.add({staticLabel:"Floating Elements: Used when all four parameters for a given frame are specified"});
            }
         } else {
            with( dialogRows.add() ){
               staticTexts.add({staticLabel:"Floating Elements: Used when all four edges for a given frame are specified"});
            }
         }
         with( dialogRows.add() ){
            with( dialogColumns.add() ){
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
            }
            with( dialogColumns.add() ){
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
            }
            with( dialogColumns.add() ){
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
            }
            with( dialogColumns.add() ) {
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
         }
         with( dialogRows.add() ){
            staticTexts.add({staticLabel:" "});
         }
         with( dialogRows.add() ){
            staticTexts.add({staticLabel:"Custom Sizes: Used when all values for the page or calendar size or both are specified"});
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
                              }
                              with( dialogColumns.add() ){
                                 selector.calendarCustomHeight = textEditboxes.add({minWidth:40});
                                 selector.calendarCustomWidth  = textEditboxes.add({minWidth:40});
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
                                 selector.calendarCustomTopEdge  = textEditboxes.add({minWidth:40});
                                 selector.calendarCustomLeftEdge = textEditboxes.add({minWidth:40});
                              }
                           }
                        }
                     }
                  }
               }
            } else {
               with( dialogColumns.add() ){
                  with( dialogRows.add() ){
                     staticTexts.add({staticLabel:"Custom Calendar Size/Placement-scott"});
                  }              
                  with( dialogRows.add() ){
                     with( dialogColumns.add() ){
                        staticTexts.add({staticLabel:"Top"});
                        staticTexts.add({staticLabel:"Bottom"});
                     }
                     with( dialogColumns.add() ){
                        selector.customSizeY1 = textEditboxes.add({minWidth:40});
                        selector.customSizeY2 = textEditboxes.add({minWidth:40});
                        staticTexts.add({staticLabel:"Left"});
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
                     }
                     with( dialogColumns.add() ){
                        staticTexts.add({staticLabel:" "});
                        staticTexts.add({staticLabel:" "});
                        selector.customSizeX2 = textEditboxes.add({minWidth:40});
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
                  staticTexts.add({staticLabel:"Calendars per Page"});
                  selector.CalendarsPerPage = dropdowns.add({stringList:settings.calendarsPerPageOptions,
                     selectedIndex:0});
                  staticTexts.add({staticLabel:" Color Space"});
                  selector.ColorSpace = dropdowns.add({stringList:settings.colorSpaceOptions,
                     selectedIndex:0});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Page"});
                  selector.PageType = dropdowns.add({stringList:settings.pageTypeOptions,
                     selectedIndex:0});
                  selector.PageOrientation = dropdowns.add({stringList:settings.pageOrientationOptions,
                     selectedIndex:2});
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
                  if( settings.bLicensed ){
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
