/* --------------------------------------------------------------- //
   Grid Calendar

   Authored by by Scott Selberg
   March 11, 2006

   Subversion Revision: $Revision: 157 $
   Author: $Author: sselberg $
   Subversion Head URL: $HeadURL: svn+ssh://sselberg@svn.code.sf.net/p/calendarwizard/code/trunk/calendarWizard.js $
// --------------------------------------------------------------- */
function buildCalendar( settings, frame, iMonth, iYear, bMiniCalendar, iMainCalendarYear )
{
   var dayOrdering = settings.dayOrdering;
   var iFixedRowCount = settings.iFixedRowCount;
   var buffer;
   var days;
   var strokeWidth;
   var frameBounds;
   var selectedStyle;
   var myRow;
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

   var myDocument = settings.currentDocument;
   var myCalendar;
   var i;
   var miniLeftTextFrame;
   var next;
   var miniRightTextFrame;
   var date;
   var startDay;
   var endDate;
   var daysInTheMonth = new Array();
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

   // needed to map the cell label to cell id since CS has no label...
   var csLabelMap = new Array;
   var bufferLabel;

   if( settings.bWorkWeek && ! bMiniCalendar )
   {
      calendarColumnCount = 8;
      startCellCount = 1;
   }

   if( bMiniCalendar )
   {
       iFixedRowCount = settings.iFixedRowCountForMiniCalendars;
   }

   if( !settings.bIncludeMonthNameInCalendar && iFixedRowCount > 0 ){
      initialRows--;
   }
   if( !settings.bWeekDay && iFixedRowCount > 0 ){
      initialRows--;
   }

   with( frame )
   {
      frameBounds = geometricBounds;

      // get the array of day names
      if( bMiniCalendar || settings.headerType == "Short: S" )
      {
         days = settings.daysShort;
      } 
      else if( settings.headerType == "Mid: Sun" )
      {
         days = settings.daysMid;
      } 
      else if( settings.headerType == "Full: Sunday" )
      {
         days = settings.daysLong;
      }
      else if( ( frameBounds[3] - frameBounds[1] ) >= 7.5 )
      {
         days = settings.daysLong;
      }
      else if( ( frameBounds[3] - frameBounds[1] ) >= 3 )
      {
         days = settings.daysMid;
      }
      else
      {
         days = settings.daysShort;
      }

      if( bMiniCalendar ) 
      {
         strokeWidth = 0;
      }
      else
      {
         strokeWidth = stroke;
      }

      // create the table which will be the calendar.
      myCalendar = frame.parentStory.tables.add({bodyRowCount: (initialRows + iFixedRowCount), 
                                                     columnCount:calendarColumnCount,
                                                     width:(frameBounds[3]-frameBounds[1]-(strokeWidth))});

      with( myCalendar )
      {
         // in CS, the table is not made properly in the constructor, so
         // I'm setting the bounds again manually...
         if( settings.bCS )
         {
            bodyRowCount = initialRows + iFixedRowCount;
            columnCount = calendarColumnCount;
            width = frameBounds[3]-frameBounds[1]-strokeWidth;
         }

         // Default the styles in the cell
         if( settings.bCellStyles == true )
         {
            bMiniCalendar ? selectedStyle = "calMini_date" : selectedStyle = "cal_date";
            appliedTableStyle = myDocument.tableStyles.item(selectedStyle + settings.styleSet);

            bMiniCalendar ? selectedStyle = "calMini_empty" : selectedStyle = "cal_empty";
            rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
         }
         else
         {
            myCells = cells.everyItem().getElements();   
            for( i = 0; i < myCells.length; i++ )
            {
               // default the style of the paragraph.
               // this is most important in the compact mode, where
               // the default style will prevent the cell from being 
               // sized small enough
               bMiniCalendar ? selectedStyle = "calMini_date" : selectedStyle = "cal_date";
               myCells[i].insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item(selectedStyle + settings.styleSet);
               if( bMiniCalendar )
               {
                  myCells[i].topEdgeStrokeWeight    = "0in";
                  myCells[i].leftEdgeStrokeWeight   = "0in";
                  myCells[i].bottomEdgeStrokeWeight = "0in";
                  myCells[i].rightEdgeStrokeWeight  = "0in";
                  myCells[i].topInset    = (1/72) + "in";
                  myCells[i].leftInset   = (1/72) + "in";
                  myCells[i].bottomInset = (1/72) + "in";
                  myCells[i].rightInset  = (1/72) + "in";
               }
            }
         }

         // set the title cell (month + year)
         if( settings.bIncludeMonthNameInCalendar )
         {
            myRow = rows.firstItem();

            // this is needed to set the header row; but it toasts the logic for creating the
            // text layer and holiday layer tables... so I'll comment it out for now.
            //if( settings.bCellStyles ) )
            //{
            //   myRow.rowType = RowTypes.HEADER_ROW;
            //}
            if( settings.bWorkWeek && ! bMiniCalendar )
            {
               leftIndex++;
               rightIndex++;

               if( settings.bCellStyles )
               {
                  myRow.cells.item(0).appliedCellStyle = myDocument.cellStyles.item("calWorkWeek_text" + settings.styleSet);
               }
               else
               {
                  myRow.cells.item(0).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("cal_workWeek" + settings.styleSet);
               }   

            }

            if( settings.bAddMiniCalendars && !bMiniCalendar )
            {

               // merge the middle cells
               myRow.cells.item(leftIndex+1).merge( myRow.cells.itemByRange( leftIndex+1, calendarColumnCount-2 ) );
               buffer = rows.firstItem().cells.item(leftIndex+1);

               // Set the style for the minicalendar on the left and right cells
               if( settings.bCellStyles )
               {
                   myRow.cells.item(leftIndex).appliedCellStyle = myDocument.cellStyles.item("cal_leftMiniCalendar" + settings.styleSet);
                   myRow.cells.item(rightIndex).appliedCellStyle = myDocument.cellStyles.item("cal_rightMiniCalendar" + settings.styleSet);
               }
               else
               {
                   myRow.cells.item(leftIndex).insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item( "cal_leftMiniCalendar" + settings.styleSet );
                   myRow.cells.item(rightIndex).insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item( "cal_rightMiniCalendar" + settings.styleSet );

                   myRow.cells.everyItem().leftEdgeStrokeWeight = "0in";
                   myRow.cells.everyItem().topEdgeStrokeWeight = "0in";
                   myRow.cells.everyItem().rightEdgeStrokeWeight = "0in";
               }

               try{ 
                  if( !settings.bMiniCalendarGenerationError ){
                     // add the mini calendar on the left
                     if( settings.bCS || settings.bCS2 )
                     {
                        miniLeftTextFrame = settings.currentPage.textFrames.add( { geometricBounds:settings.miniCalendarSize } );

                        // needed because of a bug in CS
                        miniLeftTextFrame.geometricBounds = settings.miniCalendarSize;

                        next = previousMonth( iMonth, iYear );
                        buildCalendar( settings, miniLeftTextFrame, next[0], next[1], true, iYear );

                        app.select( miniLeftTextFrame );
                        app.cut();
                        app.select( myRow.cells.item(leftIndex).insertionPoints.firstItem() );
                        app.paste();
                     }
                     else
                     {
                        // check to make sure the current cell is larger than the mini-calendar size
                        miniLeftTextFrame = myRow.cells.item(leftIndex).insertionPoints.firstItem().textFrames.add( { geometricBounds:settings.miniCalendarSize } );
                        next = previousMonth( iMonth, iYear );
                        buildCalendar( settings, miniLeftTextFrame, next[0], next[1], true, iYear );
                     }
                  }
               } catch( err ) {
                  alert( "Failed to generate left mini-calendar. This is most likely caused "
                        +"by trying to generate the calendar into too small of a frame.  The "
                        +"mini calendars are pre-defined to be 0.75\" x 0.75\" in size\n\n"
                        + err );
                  settings.bMiniCalendarGenerationError = true;
               }

               // add the mini calendar on the right
               try{
                  if( !settings.bMiniCalendarGenerationError ){
                     if( settings.bCS || settings.bCS2 )
                     {
                        miniRightTextFrame = settings.currentPage.textFrames.add( { geometricBounds:settings.miniCalendarSize } );

                        // needed because of a bug in CS
                        miniRightTextFrame.geometricBounds = settings.miniCalendarSize;

                        next = nextMonth( iMonth, iYear );
                        buildCalendar( settings, miniRightTextFrame, next[0], next[1], true, iYear );

                        app.select( miniRightTextFrame );
                        app.cut();
                        app.select( myRow.cells.item(rightIndex).insertionPoints.firstItem() );
                        app.paste();
                     }
                     else
                     {
                        miniRightTextFrame = myRow.cells.item(rightIndex).insertionPoints.firstItem().textFrames.add( { geometricBounds:settings.miniCalendarSize } );
                        next = nextMonth( iMonth, iYear );
                        buildCalendar( settings, miniRightTextFrame, next[0], next[1], true, iYear );
                     }
                  }
               } catch( err ) {
                  alert( "Failed to generate left mini-calendar. This is most likely caused "
                        +"by trying to generate the calendar into too small of a frame.  The "
                        +"mini calendars are pre-defined to be 0.75\" x 0.75\" in size\n\n"
                        + err );
                  settings.bMiniCalendarGenerationError = true;
               }

               app.select( NothingEnum.nothing );
            }
            else
            {
               myRow.cells.item(leftIndex).merge( myRow.cells.itemByRange( leftIndex, calendarColumnCount-1 ) );
               buffer = rows.firstItem().cells.item(leftIndex);
            }

            // Set the style and contents of the merged middle cells
            if( bMiniCalendar ){
               if( settings.bIncludeYearInMiniCalendar ){
                  buffer.contents = month + " " + iYear;
               } else if( !settings.bIncludeYearInMiniCalendar && settings.bAutoIncludeYearInMiniCalendar && iYear != iMainCalendarYear ){
                  buffer.contents = month + " " + iYear;
               } else {
                  buffer.contents = month;
               }
            } else if( !settings.bIncludeYearInCalendar ){
               buffer.contents = month;
            } else {
               buffer.contents = month + " " + iYear;
            }
            

            // Set the cell style
            styles = new Object();
            styles.miniStyle = 'calMini_title';
            styles.defaultStyle = 'cal_title';
            styles.paragraphMiniStyle = 'calMini_title';
            styles.paragraphDefaultStyle =  'cal_title';
            setStyle( settings, bMiniCalendar, styles, buffer );
   
            // this call makes the cell render, so that the height may be asked for
            buffer = rows.firstItem().cells.firstItem().contents;  
         }

         // set the day header cells
         if( settings.bWeekDay ){
            if( myRow == null )
            {
               myRow = rows.firstItem();
            }
            else
            {
               myRow = rows.nextItem( myRow );
            }
            myCells = myRow.cells;
            for( i = startCellCount; i < myCells.length; i++ )
            {   
               myCells.item(i).contents = days[(settings.dayOrdering[i - startCellCount])];

               if( settings.bCellStyles )
               {
                   bMiniCalendar ? selectedStyle = "calMini_day" : selectedStyle = "cal_day";
                   myCells.item(i).appliedCellStyle = myDocument.cellStyles.item( selectedStyle + settings.styleSet);
               }
               else
               {
                   bMiniCalendar ? selectedStyle = "calMini_dayCellBackground" : selectedStyle = "cal_dayCellBackground";
                   myCells.item(i).fillColor = myDocument.colors.item(selectedStyle + settings.styleSet);
                   bMiniCalendar ? selectedStyle = "calMini_day" : selectedStyle = "cal_day";
                   myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item(selectedStyle + settings.styleSet);
                   myCells.item(i).verticalJustification = VerticalJustification.centerAlign;
               }
            }
            
            if( settings.bWorkWeek && ! bMiniCalendar )
            {
               if( settings.bCellStyles )
               {
                  myCells.item(0).appliedCellStyle = myDocument.cellStyles.item("calWorkWeek_text" + settings.styleSet);
               }
               else
               {
                  myCells.item(0).rotationAngle = 270;
                  myCells.item(0).verticalJustification = VerticalJustification.centerAlign;
                  myCells.item(0).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("cal_workWeek" + settings.styleSet);
               }
            }
         }
         
         // this call makes the cell render, so that the height may be asked for
         //?? why is this here?
         // buffer = myCells.firstItem().contents;

         // figure out how many days in the month, and what day of the week to start on
         date = new Date( iYear, iMonth, 1);
         startDay = date.getDay();  // day of the week
         endDate  = GetDaysInMonth( iYear, iMonth )
         for( i = 0; i < endDate; i++ )
         {
            daysInTheMonth[i] = (endDate - i) + "";
         }

         if( settings.bAddNonMonthDays )
         {
            daysInThePreviousMonth = new Array();
            daysInTheNextMonth     = new Array();

            if( iMonth == 0 )
            {
               endDate = GetDaysInMonth( iYear-1, 11 );
            }
            else
            {
               endDate = GetDaysInMonth( iYear, iMonth-1 );
            }

            for( i = 0; i < endDate; i++ )
            {
               daysInThePreviousMonth[i] = (endDate - i) + "";
            }

            if( iMonth == 11 )
            {
               endDate = GetDaysInMonth( iYear+1, 0 );
            }
            else
            {
               endDate = GetDaysInMonth( iYear, iMonth+1 );
            }

            for( i = 0; i < endDate; i++ )
            {
               daysInTheNextMonth[i] = (endDate - i) + "";
            }
         }

         // start the days...
         bStarted         = false;
         bWorkWeekLabeled = false;
         if( myRow == null )
         {
            myRow = rows.firstItem();
         }
         else
         {
            myRow = rows.nextItem( myRow );
         }
         try{ myCells = myRow.cells; }
         catch( myError ) {
               myRow = rows.add();
               myRow.cells.everyItem().label = "";
               if( settings.bCS )
               {
                  myRow = rows.lastItem();
               }
               myCells = myRow.cells;
         }

         for( i = startCellCount; i < myCells.length; i++ )
         {
            if( settings.bCS2 || settings.bCS )
            {
                myCells.item(i).fillColor = app.activeDocument.swatches.item(0); // nullSwatch 
            }

            if( bStarted || startDay == settings.dayOrdering[i - startCellCount] )
            {
               bStarted = true;
               day = daysInTheMonth.pop()
               myCells.item(i).contents = day;

               if( settings.bCS )
               {
                  csLabelMap[ myCells.item(i).id ] = (iMonth+1).toString() + "-" + day + "-" + iYear.toString();
               }
               else
               {
                  myCells.item(i).label = (iMonth+1).toString() + "-" + day + "-" + iYear.toString();
               }

               if( settings.bWorkWeek && !bWorkWeekLabeled && !bMiniCalendar )
               {
                  workWeek = getWorkWeek( settings, iYear, iMonth, parseInt(day) );
                  myCells.item(0).contents = settings.workWeekPrefix + workWeek.toString();

                  if( settings.bCellStyles )
                  {
                     myCells.item(0).appliedCellStyle = myDocument.cellStyles.item("calWorkWeek_text" + settings.styleSet);
                  }
                  else
                  {
                     myCells.item(0).rotationAngle = 270;
                     myCells.item(0).verticalJustification = VerticalJustification.centerAlign;
                     myCells.item(0).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("cal_workWeek" + settings.styleSet);
                  }   

                  bWorkWeekLabeled = true;
               }

               if( settings.bCellStyles )
               {
                  bMiniCalendar ? selectedStyle = "calMini_date" : selectedStyle = "cal_date";
                  myCells.item(i).appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
                  myCells.item(i).clearCellStyleOverrides( true );
                  myCells.item(i).insertionPoints.everyItem().clearOverrides( OverrideType.ALL );
               }
               else
               {
                   bMiniCalendar ? selectedStyle = "calMini_date" : selectedStyle = "cal_date";
                   myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item(selectedStyle + settings.styleSet);
               }

               // needs to be after the clearCellStyleOverrides
               if( settings.bCS )
               {
                  csLabelMap[ myCells.item(i).id ] = (iMonth+1).toString() + "-" + day + "-" + iYear.toString();
               }
               else
               {
                  myCells.item(i).label = (iMonth+1).toString() + "-" + day + "-" + iYear.toString();
               }

            }
            else
            {
               if( settings.bAddNonMonthDays )
               {
                  if( startDay + startCellCount - settings.dayOrdering[0] - i - 1 < 0 )
                  {
                     // this is the case when the first day of the month is Sunday and calendar starts on Monday.
                     myCells.item(i).contents = daysInThePreviousMonth[ startDay + startCellCount - settings.dayOrdering[0] - i - 1 + 7 ];
                  }
                  else
                  {
                     myCells.item(i).contents = daysInThePreviousMonth[ startDay + startCellCount - settings.dayOrdering[0] - i - 1 ];
                  }

                  if( settings.bCS )
                  {
                     csLabelMap[ myCells.item(i).id ] = " ";
                  }
                  else
                  {
                     myCells.item(i).label = " ";
                  }

                  if( settings.bCellStyles )
                  {
                      bMiniCalendar ? selectedStyle = "calMini_nonMonthDay" : selectedStyle = "cal_nonMonthDay";
                      myCells.item(i).appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
                  }
                  else
                  {
                      bMiniCalendar ? selectedStyle = "calMini_nonMonthDay" : selectedStyle = "cal_nonMonthDay";
                      myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item( selectedStyle + settings.styleSet );  
                  }
               }
               else
               {
                  myCells.item(i).contents = '';

                  if( settings.bCS )
                  {
                     csLabelMap[ myCells.item(i).id ] = " ";
                  }
                  else
                  {
                     myCells.item(i).label = " ";
                  }

                  if( settings.bCellStyles )
                  {
                      bMiniCalendar ? selectedStyle = "calMini_empty" : selectedStyle = "cal_empty";
                      myCells.item(i).appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
                  }
               }
            }

            if( !settings.bCellStyles )
            {
                if( bMiniCalendar )
                {
                   myCells.item(i).verticalJustification = VerticalJustification.centerAlign;
                }
                else
                {
                   myCells.item(i).verticalJustification = VerticalJustification.topAlign;
                }
            }
         }            

         // continue the days...  
         while( daysInTheMonth.length > 0 )
         {
            bWorkWeekLabeled = false;
            myRow = rows.nextItem( myRow );
            try{ myCells = myRow.cells; }
            catch( myError ) {
               // Don't allow split cells in the mini-calendar
               if( iFixedRowCount == 0 || bMiniCalendar )
               {
                  myRow = rows.add();
                  myRow.cells.everyItem().label = "";
                  if( settings.bCS )
                  {
                     myRow = rows.lastItem();
                  }

                  if( settings.bCellStyles )
                  {
                      bMiniCalendar ? selectedStyle = "calMini_empty" : selectedStyle = "cal_empty";
                      myRow.cells.everyItem().appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet)
                  }

                  myCells = myRow.cells;
               }
               else
               {
                  bSplitCell = true;
                  myRow = rows.lastItem();
                  myCells = myRow.cells;
               }
            }

            for( i = startCellCount; i < myCells.length; i++ )
            {
               if( daysInTheMonth.length > 0 )
               {
                  if( !bSplitCell )
                  {
                     day = daysInTheMonth.pop()
                     myCells.item(i).contents = day;

                     if( settings.bWorkWeek && !bWorkWeekLabeled && !bMiniCalendar )
                     {
                        workWeek = getWorkWeek( settings, iYear, iMonth, parseInt(day) );
                        myCells.item(0).contents = settings.workWeekPrefix + workWeek.toString();

                        if( settings.bCellStyles )
                        {
                           myCells.item(0).appliedCellStyle = myDocument.cellStyles.item("calWorkWeek_text" + settings.styleSet);
                        }
                        else
                        {
                           myCells.item(0).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("cal_workWeek" + settings.styleSet);
                        }   

                        bWorkWeekLabeled = true;
                     }

                     if( settings.bCellStyles )
                     {
                        bMiniCalendar ? selectedStyle = "calMini_date" : selectedStyle = "cal_date";
                        myCells.item(i).appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
                        myCells.item(i).clearCellStyleOverrides( true );
                        myCells.item(i).insertionPoints.everyItem().clearOverrides( OverrideType.ALL );
                     }
                     else
                     {
                        bMiniCalendar ? selectedStyle = "calMini_date" : selectedStyle = "cal_date";
                        myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item(selectedStyle + settings.styleSet);

                        if( bMiniCalendar )
                        {
                           myCells.item(i).verticalJustification = VerticalJustification.centerAlign;
                        }
                        else
                        {
                           myCells.item(i).verticalJustification = VerticalJustification.topAlign;
                        }
                     }

                     if( settings.bCS )
                     {
                        csLabelMap[ myCells.item(i).id ] = (iMonth+1).toString() + "-" + day + "-" + iYear.toString();
                     }
                     else
                     {
                        // needs to be after the clearCellStyleOverrides
                        myCells.item(i).label = (iMonth+1).toString() + "-" + day + "-" + iYear.toString();
                     }
                  }
                  else
                  {
                      //something else to find...
                     day = daysInTheMonth.pop()

                     
                     var theCurrentDate = new Date;
                     theCurrentDate.setUTCFullYear( iYear, iMonth, day );
                     theCurrentDate.setUTCHours( 12, 0, 0, 0 );

                     if( settings.bCellStyles )
                     {
                         if( theCurrentDate.getUTCDay() == 0 && settings.bHighlightSundays ){
                            myCells.item(i).appliedCellStyle = myDocument.cellStyles.item( "cal_sundaySplitCell" + settings.styleSet );
                         } else {
                            myCells.item(i).appliedCellStyle = myDocument.cellStyles.item( "cal_dateSplitCell" + settings.styleSet );
                         }
                     }
                     else
                     {
                        myCells.item(i).topLeftDiagonalLine = true;
                        myCells.item(i).verticalJustification = VerticalJustification.justifyAlign;
                     }
                     myCells.item(i).contents = myCells.item(i).contents + "\r" + day;

                     if( settings.bCS )
                     {
                        csLabelMap[ myCells.item(i).id ] = csLabelMap[ myCells.item(i).id ] + ", " + (iMonth+1).toString() + "-" + day + "-" + iYear.toString();
                     }
                     else
                     {
                        myCells.item(i).label =  myCells.item(i).label + ", " + (iMonth+1).toString() + "-" + day + "-" + iYear.toString();
                     }

                     // bMiniCalendar is not allowed here...
                     if( theCurrentDate.getUTCDay() == 0 && settings.bHighlightSundays ){
                        selectedStyle = "cal_sunday";
                        myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item(selectedStyle + settings.styleSet);
                        selectedStyle = "cal_sunday_splitCellSecondLine";
                        myCells.item(i).insertionPoints.lastItem().appliedParagraphStyle = myDocument.paragraphStyles.item(selectedStyle + settings.styleSet);

                     } else {
                        selectedStyle = "cal_date";
                        myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item(selectedStyle + settings.styleSet);
                        selectedStyle = "cal_date_splitCellSecondLine";
                        myCells.item(i).insertionPoints.lastItem().appliedParagraphStyle = myDocument.paragraphStyles.item(selectedStyle + settings.styleSet);
                     }
                  }
               }
               else
               {
                  if( !settings.somethingRegExp.test(myCells.item(i).contents) ){
                     if( settings.bAddNonMonthDays )
                     {
                        myCells.item(i).contents = daysInTheNextMonth.pop();
   
                        if( settings.bCS )
                        {
                           csLabelMap[ myCells.item(i).id ] = " ";
                        }
                        else
                        {
                           myCells.item(i).label = " ";
                        }

                        if( settings.bCellStyles )
                        {
                            bMiniCalendar ? selectedStyle = "calMini_nonMonthDay" : selectedStyle = "cal_nonMonthDay";
                            myCells.item(i).appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
                        }
                        else 
                        {
                            bMiniCalendar ? selectedStyle = "calMini_nonMonthDay" : selectedStyle = "cal_nonMonthDay";
                            myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item( selectedStyle + settings.styleSet );
                        }
                     }
                     else
                     {
                        if( settings.bCS )
                        {
                           csLabelMap[ myCells.item(i).id ] = " ";
                        }
                        else
                        {
                           myCells.item(i).label = " ";
                        }
                     }
                  }
               }
            }            
         }

         if( settings.bCS )
         {
            for( i = 0; i < csLabelMap.length; i++ )
            {
               try{ csLabelMap[i].match( settings.numberRegExp ) }
               catch( myError ){ csLabelMap[i] = "unlabeled"}
            }

            settings.csLabelMap = csLabelMap;
         }

         // set the style for Sunday
         if( settings.bHighlightSundays )
         {
             rowStart = 2;
             if( !settings.bIncludeMonthNameInCalendar )
             {
                rowStart = rowStart - 1;
             }
             if( !settings.bWeekDay )
             {
                rowStart = rowStart - 1;
             }

             if( settings.dayOrdering[0] == 0 )
             {
                if( settings.bWorkWeek && !bMiniCalendar )
                {
                   myCells = columns.item(1).cells;
                   for( i = rowStart; i < myCells.length; i++ )
                   {
                      bufferLabel = " ";
                      if( settings.bCS )
                      {
                         bufferLabel = settings.csLabelMap[ myCells.item(i).id ];
                      }
                      else
                      {
                         bufferLabel = myCells.item(i).label;
                      }

                      if( settings.somethingRegExp.test( myCells.item(i).contents )){
                      if(  settings.bAddNonMonthDays && !bufferLabel.match( settings.dateWithYearRegExp )  )
                      {
                         if( settings.bCellStyles )
                         {
                             bMiniCalendar ? selectedStyle = "calMini_nonMonthSunday" : selectedStyle = "cal_nonMonthSunday";
                             myCells.item(i).appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
                         }
                         else 
                         {
                             bMiniCalendar ? selectedStyle = "calMini_nonMonthSunday" : selectedStyle = "cal_nonMonthSunday";
                             myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item(selectedStyle + settings.styleSet);
                         }                  
                      }
                      else
                      {
                         if( settings.bCellStyles )
                         {
                             var splitCellRegExp = /SplitCell/i;
                             if( ! splitCellRegExp.test(myCells.item(i).appliedCellStyle.name ) ){
                                bMiniCalendar ? selectedStyle = "calMini_sunday" : selectedStyle = "cal_sunday";
                                myCells.item(i).appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
                             }
                         }
                         else 
                         {
                             bMiniCalendar ? selectedStyle = "calMini_sunday" : selectedStyle = "cal_sunday";
                             myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item( selectedStyle + settings.styleSet );
                         }
                      }
                      }
                   }
                }
                else
                {
                   myCells = columns.item(0).cells;
                   for( i = rowStart; i < myCells.length; i++ )
                   {
                      bufferLabel = " ";
                      if( settings.bCS )
                      {
                         bufferLabel = settings.csLabelMap[ myCells.item(i).id ];
                      }
                      else
                      {
                         bufferLabel = myCells.item(i).label;
                      }

                      if( settings.somethingRegExp.test( myCells.item(i).contents )){
                      if(  settings.bAddNonMonthDays && !bufferLabel.match( settings.dateWithYearRegExp )  )
                      {
                         if( settings.bCellStyles )
                         {
                             bMiniCalendar ? selectedStyle = "calMini_nonMonthSunday" : selectedStyle = "cal_nonMonthSunday";
                             myCells.item(i).appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
                         }
                         else 
                         {
                             bMiniCalendar ? selectedStyle = "calMini_nonMonthSunday" : selectedStyle = "cal_nonMonthSunday";
                             myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item( selectedStyle + settings.styleSet );
                         }                  
                      }
                      else
                      {
                         if( settings.bCellStyles )
                         {
                             var splitCellRegExp = /SplitCell/i;
                             if( !splitCellRegExp.test(myCells.item(i).appliedCellStyle.name) ){
                                bMiniCalendar ? selectedStyle = "calMini_sunday" : selectedStyle = "cal_sunday";
                                myCells.item(i).appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
                             }
                         }
                         else 
                         {
                             bMiniCalendar ? selectedStyle = "calMini_sunday" : selectedStyle = "cal_sunday";
                             myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item( selectedStyle + settings.styleSet );
                         }                  
                      }
                      }
                   }
                }
             }
             else
             {
                //when the cell spans several columns, it is not included in the cells of the last column. so we
                //need to account for this
                //
                //Mini-calendars don't have mini-calendars, so the title will span the whole length and therefore
                // we need to take 1 away.  If mini-calendars are not included, we also need to take 1 away as
                // the title spans the whole lenth.
                if( bMiniCalendar || !settings.bAddMiniCalendars ) {
                    rowOffset = 1;
                } else {
                    rowOffset = 0;
                }

                myCells = columns.lastItem().cells;
                for( i = (rowStart - rowOffset); i < myCells.length; i++ )
                {                   
                   bufferLabel = " ";
                   if( settings.bCS )
                   {
                      bufferLabel = settings.csLabelMap[ myCells.item(i).id ];
                   }
                   else
                   {
                      bufferLabel = myCells.item(i).label;
                   }

                   if( settings.somethingRegExp.test( myCells.item(i).contents )){
                   if(  settings.bAddNonMonthDays && !bufferLabel.match( settings.dateWithYearRegExp )  )
                   {
                      if( settings.bCellStyles )
                      {
                          bMiniCalendar ? selectedStyle = "calMini_nonMonthSunday" : selectedStyle = "cal_nonMonthSunday";
                          myCells.item(i).appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
                      }
                      else 
                      {
                          bMiniCalendar ? selectedStyle = "calMini_nonMonthSunday" : selectedStyle = "cal_nonMonthSunday";
                          myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item(selectedStyle + settings.styleSet);
                      }                  
                   }
                   else
                   {
                      if( settings.bCellStyles )
                      {
                          var splitCellRegExp = /SplitCell/i;
                          if( ! splitCellRegExp.test(myCells.item(i).appliedCellStyle.name) ){
                             bMiniCalendar ? selectedStyle = "calMini_sunday" : selectedStyle = "cal_sunday";
                             myCells.item(i).appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
                          }
                      }
                      else 
                      {
                          bMiniCalendar ? selectedStyle = "calMini_sunday" : selectedStyle = "cal_sunday";
                          myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item( selectedStyle + settings.styleSet );
                      }                  
                   }
                   }
                }
             }
         }

         // adjust the cell height

         // measure the last row (as the first may have the work week)
         myCells = columns.lastItem().cells;
         strokeHeight = (myCells[ myCells.length-1 ].bottomEdgeStrokeWeight)/72;

         // adjust the first row
         myCells = columns.firstItem().cells;

         if( settings.bCS )
         {
            // in CS, the bottomEdgeStrokeWeight doesn't seem to work, so I'm hard
            // coding it to 1/72
            strokeHeight = stroke;
         }

//         if( _bCompact == 1 && _bIncludeHeaderInCompact == 0 ) 
//         {
//            rowStart = 1;
//            cellHeight = ((frameBounds[2] - frameBounds[0] - myCells[0].height - strokeHeight)/(myCells.length - 1));
//         }
//         else
//         {
         rowStart = 2;
         if( !settings.bIncludeMonthNameInCalendar && !settings.bWeekDay )
         {
            rowStart = rowStart - 2;
            cellHeight = ((frameBounds[2] - frameBounds[0] - strokeHeight)/(myCells.length));
         }
         else if( !settings.bIncludeMonthNameInCalendar || !settings.bWeekDay )
         {
            rowStart = rowStart - 1;
            cellHeight = ((frameBounds[2] - frameBounds[0] - myCells[0].height - strokeHeight)/(myCells.length - 1));
         } else {
            cellHeight = ((frameBounds[2] - frameBounds[0] - myCells[0].height - myCells[1].height  - strokeHeight)/(myCells.length - 2));
         }
//         }

         for( i = rowStart; i < myCells.length; i++ )
         {
            myCells[i].height = cellHeight;
         }

         // adjust the widths if work week is displayed
         if( settings.bWorkWeek && !bMiniCalendar )
         {
            myCells = rows.item(4).cells;  //get a row cells which display the dates
            bufferStroke = ( myCells[ myCells.length-1 ].rightEdgeStrokeWeight)/72;
            myCells[0].width = settings.workWeekCellWidth;

            cellWidth = ((frameBounds[3] - frameBounds[1] - myCells[0].width - bufferStroke)/(myCells.length - 1));
            rowStart = 1;
            if( !settings.bIncludeMonthNameInCalendar )
            {
               rowStart = rowStart - 1;
            }
            for( i = rowStart; i < myCells.length; i++ )
            {
               myCells[i].width = cellWidth;
            }
         }
      }
      labelMonthAndWeekDayRows( settings, myCalendar )
   }

   var holidaysOnPrimaryLayer = new Array();
   for( i = 0; i < settings.ABCD.length; i++ ){
      if( settings[ "bHolidaysLayer" + settings.ABCD[i] ] && !bMiniCalendar ){
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
                holidaysCalendar.rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_holidayText" + settings.ABCD[i] + settings.styleSet);
                if(settings.bIncludeMonthNameInCalendar )
                {
                   holidaysCalendar.rows.firstItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_layerTitle" + settings.styleSet);
                }
                if( settings.bWeekDay ){
                   if( settings.bIncludeMonthNameInCalendar )
                   {
                      dayRowIndex = 1;
                   } else {
                      dayRowIndex = 0;
                   }
                   holidaysCalendar.rows.item(dayRowIndex).cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_layerDay" + settings.styleSet);
                }
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

            mySlaveRow  = holidaysCalendar.rows.firstItem();
            if( settings.bIncludeMonthNameInCalendar )
            {
               mySlaveRow.cells.item(1).merge( mySlaveRow );
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
            labelMonthAndWeekDayRows( settings, holidaysCalendar )
         }
      } else {
        holidaysOnPrimaryLayer.push( settings.ABCD[ i ] );
      }
   } 

   if( settings.bHolidaysLayer && holidaysOnPrimaryLayer.length > 0 && !bMiniCalendar )
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
          holidaysCalendar.rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_holidayText" + settings.styleSet);
          if(settings.bIncludeMonthNameInCalendar )
          {
             holidaysCalendar.rows.firstItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_layerTitle" + settings.styleSet);
          }
          if( settings.bWeekDay ){
             if( settings.bIncludeMonthNameInCalendar )
             {
                dayRowIndex = 1;
             } else {
                dayRowIndex = 0;
             }
             holidaysCalendar.rows.item(dayRowIndex).cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_layerDay" + settings.styleSet);
          }
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

      mySlaveRow  = holidaysCalendar.rows.firstItem();
      if( settings.bIncludeMonthNameInCalendar )
      {
         mySlaveRow.cells.item(1).merge( mySlaveRow );
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

      // disabled because it causes the myCalendar to change layers
      addHolidayText( settings, iYear, myCalendar, holidaysCalendar, "All", holidaysOnPrimaryLayer );
      labelMonthAndWeekDayRows( settings, holidaysCalendar )
   }

   if( settings.bJulianDateLayer && !bMiniCalendar)
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
          julianDateCalendar.rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_julianDateText" + settings.styleSet);
          if(settings.bIncludeMonthNameInCalendar )
          {
             julianDateCalendar.rows.firstItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_layerTitle" + settings.styleSet);
          }
          if( settings.bWeekDay ){
             if( settings.bIncludeMonthNameInCalendar )
             {
                dayRowIndex = 1;
             } else {
                dayRowIndex = 0;
             }
             julianDateCalendar.rows.item(dayRowIndex).cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_layerDay" + settings.styleSet);
          }
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

      mySlaveRow  = julianDateCalendar.rows.firstItem();
      if( settings.bIncludeMonthNameInCalendar )
      {
         mySlaveRow.cells.item(1).merge( mySlaveRow );
      }

      if( !settings.bCellStyles )
      {
          julianDateCalendar.cells.everyItem().insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item("cal_julianDate" + settings.styleSet);;
      }

      // disabled because it causes the myCalendar to change layers
      addJulianDates( settings, myCalendar, julianDateCalendar );
      labelMonthAndWeekDayRows( settings, julianDateCalendar )
   }

   if( settings.bMoons && !bMiniCalendar)
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
          moonsCalendar.rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_moonText" + settings.styleSet);
          if(settings.bIncludeMonthNameInCalendar )
          {
             moonsCalendar.rows.firstItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_layerTitle" + settings.styleSet);
          }
          if( settings.bWeekDay ){
             if( settings.bIncludeMonthNameInCalendar )
             {
                dayRowIndex = 1;
             } else {
                dayRowIndex = 0;
             }
             moonsCalendar.rows.item(dayRowIndex).cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_layerDay" + settings.styleSet);
          }
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

      mySlaveRow  = moonsCalendar.rows.firstItem();
      if( settings.bIncludeMonthNameInCalendar )
      {
         mySlaveRow.cells.item(1).merge( mySlaveRow );
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
      labelMonthAndWeekDayRows( settings, moonsCalendar )
   }

   if( settings.bPicturesLayer && !bMiniCalendar)
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
          picturesCalendar.rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_picturesText" + settings.styleSet);
          if(settings.bIncludeMonthNameInCalendar )
          {
             picturesCalendar.rows.firstItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_layerTitle" + settings.styleSet);
          }
          if( settings.bWeekDay ){
             if( settings.bIncludeMonthNameInCalendar )
             {
                dayRowIndex = 1;
             } else {
                dayRowIndex = 0;
             }
             picturesCalendar.rows.item(dayRowIndex).cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_layerDay" + settings.styleSet);
          }
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

      mySlaveRow  = picturesCalendar.rows.firstItem();
      if( settings.bIncludeMonthNameInCalendar )
      {
         mySlaveRow.cells.item(1).merge( mySlaveRow );
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
      labelMonthAndWeekDayRows( settings, picturesCalendar )
   }

   if( settings.bBackgroundLayer && !bMiniCalendar)
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
                if( settings.gridCalendarHighlightedStyleRegExp.test( myCalendar.rows.item(i).cells.item(j).appliedCellStyle.name ) ){
                   try{
                      backgroundCalendar.rows.item(i).cells.item(j).appliedCellStyle = getBackgroundStyle( settings,  myCalendar.rows.item(i).cells.item(j).appliedCellStyle.name );
                   } catch (error){
                      alert( "Style: " + getBackgroundStyle( settings, myCalendar.rows.item(i).cells.item(j).appliedCellStyle.name ) + " not found." );
                      throw(error);
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

      mySlaveRow  = backgroundCalendar.rows.firstItem();
      if( settings.bIncludeMonthNameInCalendar )
      {
         mySlaveRow.cells.item(1).merge( mySlaveRow );
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
      labelMonthAndWeekDayRows( settings, backgroundCalendar )
   }

   if( settings.bTextLayer && !bMiniCalendar )
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
          textCalendar.rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_textText" + settings.styleSet);
          if(settings.bIncludeMonthNameInCalendar )
          {
             textCalendar.rows.firstItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_layerTitle" + settings.styleSet);
          }
          if( settings.bWeekDay ){
             if( settings.bIncludeMonthNameInCalendar )
             {
                dayRowIndex = 1;
             } else {
                dayRowIndex = 0;
             }
             textCalendar.rows.item(dayRowIndex).cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_layerDay" + settings.styleSet);
          }
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

      mySlaveRow  = textCalendar.rows.firstItem();
      if( settings.bIncludeMonthNameInCalendar )
      {
         mySlaveRow.cells.item(1).merge( mySlaveRow );
      }

      if( !settings.bCellStyles )
      {
          textCalendar.cells.everyItem().leftEdgeStrokeWeight = "0in";
          textCalendar.cells.everyItem().topEdgeStrokeWeight = "0in";
          textCalendar.cells.everyItem().rightEdgeStrokeWeight = "0in";
          textCalendar.cells.everyItem().bottomEdgeStrokeWeight = "0in";
          textCalendar.cells.everyItem().insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item("cal_text" + settings.styleSet);
      }
      labelMonthAndWeekDayRows( settings, textCalendar )
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
   var scaleFactor = getScaleFactorFromUnits( settings.customPageSizeUnits );

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
      else if( ( framesPerPage == 2 || framesPerPage == 3 ) && myPageHeight >= myPageWidth )
      {
         framesPerRow    = 1;
         framesPerColumn = framesPerPage;
      }
      else if( ( framesPerPage == 2 || framesPerPage == 3 ) && myPageHeight < myPageWidth )
      {
         framesPerRow    = framesPerPage;
         framesPerColumn = 1;
      }
      else if( framesPerPage == 4 )
      {
         framesPerRow    = 2;
         framesPerColumn = 2;
      }
      else if( ( framesPerPage == 6 || framesPerPage == 8 || framesPerPage == 10 ) && myPageHeight >= myPageWidth )
      {
         framesPerRow    = 2;
         framesPerColumn = framesPerPage/2;
      }
      else if( ( framesPerPage == 6 || framesPerPage == 8 || framesPerPage == 10 ) && myPageHeight < myPageWidth )
      {
         framesPerRow    = framesPerPage/2;
         framesPerColumn = 2;
      }
      else if( framesPerPage == 9 )
      {
         framesPerRow    = 3;
         framesPerColumn = 3;
      }
      else if( framesPerPage == 12 && myPageHeight >= myPageWidth )
      {
         framesPerRow    = 3;
         framesPerColumn = 4;
      }
      else if( framesPerPage == 12 && myPageHeight < myPageWidth )
      {
         framesPerRow    = 4;
         framesPerColumn = 3;
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
function labelMonthAndWeekDayRows( settings, table )
{
   if( !settings.bCS ) {
      myRow = table.rows.firstItem();
      if( settings.bIncludeMonthNameInCalendar ) {
         myCells = myRow.cells;
         for( i = 0; i < myCells.length; i++ ) {
            myCells.item(i).label = "MonthName";
         }
         myRow = table.rows.nextItem( myRow );
      }
      
      if( settings.bWeekDay ) {
         myCells = myRow.cells;
         for( i = 0; i < myCells.length; i++ ) {
            myCells.item(i).label = "WeekDayName";
         }
      }
   }
   return;
}
// --------------------------------------------------------------- //
function setStyle( settings, bMiniCalendar, styles, cell )
{
    var selectedStyle;

    if( settings.bCellStyles )
    {
        bMiniCalendar ? selectedStyle = styles.miniStyle : selectedStyle = styles.defaultStyle;
        cell.appliedCellStyle = settings.currentDocument.cellStyles.item( selectedStyle + settings.styleSet );
    }
    else
    {
        bMiniCalendar ? selectedStyle = styles.paragraphMiniStyle : selectedStyle = styles.paragraphDefaultStyle;
        cell.insertionPoints.item(0).appliedParagraphStyle = settings.currentDocument.paragraphStyles.item( selectedStyle + settings.styleSet);
    }

    return;
}
// --------------------------------------------------------------- //
function bGetGridCalendarUserInput( settings, selector )
{
   var title  = settings.baseTitle + ": Version " + settings.versionString + " - Grid Calendar";
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
                  staticTexts.add({staticLabel:"Start on"});
                  selector.StartDay = dropdowns.add({stringList:settings.startDayOptions,
                                                     selectedIndex:0});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Date Rows"});
                  selector.MaxRowCount = dropdowns.add({stringList:settings.maxRowCountOptions,
                                                        selectedIndex:0});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Mini-Calendar Date Rows"});
                  selector.MaxRowCountInMiniCalendars = dropdowns.add({stringList:settings.maxRowCountInMiniCalendarsOptions,
                                                                       selectedIndex:0});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Count Work Week on"});
                  selector.WorkWeekStart = dropdowns.add({stringList:settings.widgitValues.workWeekOptions.values,
                                                          selectedIndex:0});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Heading Style"});
                  selector.headerOptions = dropdowns.add({stringList:settings.headerOptions,
                                                          selectedIndex:0});
               }
               with( dialogRows.add() ){
                     staticTexts.add({staticLabel:"Month Identification"});
                     selector.MonthIdentification = dropdowns.add({stringList:settings.monthIdentificationOptions,
                                                                   selectedIndex:2});
               }
               with( dialogRows.add() ){
                     staticTexts.add({staticLabel:"Mini-Calendar Month Identification"});
                     selector.miniCalMonthIdentification = dropdowns.add({stringList:settings.miniCalMonthIdentificationOptions,
                                                                          selectedIndex:0});
               }
               with( dialogRows.add() ){
                  staticTexts.add({staticLabel:"Moon Size (% of cell)"});
                  moonSize = settings.moonSize.toString();
                  selector.moonSize = textEditboxes.add({editContents:moonSize, minWidth:40});
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
                  selector.IncludeWeekDayNames = checkboxControls.add({checkedState:true});
                  staticTexts.add({staticLabel:"Include Week Day Names"});
               }
               with( dialogRows.add() ){
                  selector.AddMiniCalendars = checkboxControls.add({checkedState:false});
                  staticTexts.add({staticLabel:"Include Mini-Calendar"});
               }
               with( dialogRows.add() ){
                  selector.WorkWeek = checkboxControls.add({checkedState:false});
                  staticTexts.add({staticLabel:"Include Work Weeks"});
               }
               with( dialogRows.add() ){
                  selector.AddNonMonthDays = checkboxControls.add({checkedState:false});
                  staticTexts.add({staticLabel:"Include Non-Month Days"});
               }
               with( dialogRows.add() ){
                  selector.bHighlightSundays = checkboxControls.add({checkedState:false});
                  staticTexts.add({staticLabel:"Highlight Sundays"});
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
                  selector.ImportStyles = checkboxControls.add({checkedState:false});
                  staticTexts.add({staticLabel:"Import Styles from Reference Calendar"});
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
                     staticTexts.add({staticLabel:"Add Moon Phases"});
                     staticTexts.add({staticLabel:"Add Picture Layer"});
                     staticTexts.add({staticLabel:"Add Background Layer"});
                  }
                  with(dialogColumns.add()){
                     selector.AddTextLayer       = checkboxControls.add({checkedState:true});
                     selector.AddHolidaysLayer   = checkboxControls.add({checkedState:false});
                     selector.UseCalendarLayer   = checkboxControls.add({checkedState:false});
                     selector.AddJulianDateLayer = checkboxControls.add({checkedState:false});
                     selector.Moons              = checkboxControls.add({checkedState:false});
                     selector.AddPicturesLayer   = checkboxControls.add({checkedState:false});
                     selector.AddBackgroundLayer = checkboxControls.add({checkedState:false});
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
                        //selector.GridCalendarPreset = dropdowns.add({stringList:settings.presetFilesShort,
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
                     staticTexts.add({staticLabel:"Custom Calendar Size/Placement"});
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
