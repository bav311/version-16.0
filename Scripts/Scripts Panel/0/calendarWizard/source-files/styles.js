function SetTheDocumentStyles( settings )
{
   if( settings.bGridCalendar ){
      SetTheGridCalendarDocumentStyles( settings );
   } else if( settings.bListCalendar ){
      SetTheListCalendarDocumentStyles( settings );
   } else if( settings.bLineCalendar ){
      SetTheLineCalendarDocumentStyles( settings );
   }
   
   return;
}
// --------------------------------------------------------------- //
function SetTheGridCalendarDocumentStyles( settings )
{
   var titleSize;
   var myDocument = settings.currentDocument;

   /********************************************************************/
   /* create colors and styles, ...                                    */
   /********************************************************************/
   with(myDocument)
   {
      //Add colors.
      try{ colors.item("cal_dayTextColor" + settings.styleSet).name; }
      catch (myError){ 
         if( settings.sColorSpace == 'CMYK' ){
            colors.add({name:"cal_dayTextColor" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,100]});
         } else if ( settings.sColorSpace == 'RBG' ){
            colors.add({name:"cal_dayTextColor" + settings.styleSet, space:ColorSpace.rgb, colorValue:[0,0,0]});
         } else {
            colors.add({name:"cal_dayTextColor" + settings.styleSet, space:ColorSpace.lab, colorValue:[0,0,0]});
         }
      }

      if( settings.bHighlightSundays )
      {
          try{ colors.item("cal_sunday" + settings.styleSet).name; }
          catch (myError){ 
             if( settings.sColorSpace == 'CMYK' ){
                colors.add({name:"cal_sunday" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
             } else if ( settings.sColorSpace == 'RBG' ){
                colors.add({name:"cal_sunday" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
             } else {
                colors.add({name:"cal_sunday" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
             }
          }

          if( settings.bAddNonMonthDays )
          {
              try{ colors.item("cal_nonMonthSunday" + settings.styleSet).name; }
              catch (myError){ 
                  if( settings.sColorSpace == 'CMYK' ){
                      colors.add({name:"cal_nonMonthSunday" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,25]});
                  } else if ( settings.sColorSpace == 'RBG' ){
                      colors.add({name:"cal_nonMonthSunday" + settings.styleSet, space:ColorSpace.rgb, colorValue:[198,200,202]});
                  } else {
                      colors.add({name:"cal_nonMonthSunday" + settings.styleSet, space:ColorSpace.lab, colorValue:[80,0,-1]});
                  }
              }
          }
      }

      if( settings.bHighlightHolidays )
      {
          try{ colors.item("cal_holidayDate" + settings.styleSet).name; }
          catch (myError){ 
             if( settings.sColorSpace == 'CMYK' ){
                colors.add({name:"cal_holidayDate" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
             } else if ( settings.sColorSpace == 'RBG' ){
                colors.add({name:"cal_holidayDate" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
             } else {
                colors.add({name:"cal_holidayDate" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
             }
          }
      }

      if( settings.bJulianDateLayer )
      {
          try{ colors.item("cal_julianDate" + settings.styleSet).name; }
          catch (myError){ 
             if( settings.sColorSpace == 'CMYK' ){
                colors.add({name:"cal_julianDate" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
             } else if ( settings.sColorSpace == 'RBG' ){
                colors.add({name:"cal_julianDate" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
             } else {
                colors.add({name:"cal_julianDate" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
             }
          }
      }

      if( settings.bAddNonMonthDays )
      {
          try{ colors.item("cal_nonMonthDay" + settings.styleSet).name; }
          catch (myError){ 
              if( settings.sColorSpace == 'CMYK' ){
                  colors.add({name:"cal_nonMonthDay" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,25]});
              } else if ( settings.sColorSpace == 'RBG' ){
                  colors.add({name:"cal_nonMonthDay" + settings.styleSet, space:ColorSpace.rgb, colorValue:[198,200,202]});
              } else {
                  colors.add({name:"cal_nonMonthDay" + settings.styleSet, space:ColorSpace.lab, colorValue:[80,0,-1]});
              }
          }
      }
      if( settings.bHolidaysLayer || settings.bHighlightHolidays )
      {
         try{ colors.item("cal_holiday" + settings.styleSet).name; }
         catch (myError){
            if( settings.sColorSpace == 'CMYK' ){
               colors.add({name:"cal_holiday" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
            } else if ( settings.sColorSpace == 'RBG' ){
               colors.add({name:"cal_holiday" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
            } else {
               colors.add({name:"cal_holiday" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
            }
         }

         if( settings.bHolidayStyleA )
         {
             try{ colors.item("cal_holidayA" + settings.styleSet).name; }
             catch (myError){
                if( settings.sColorSpace == 'CMYK' ){
                   colors.add({name:"cal_holidayA" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
                } else if ( settings.sColorSpace == 'RBG' ){
                   colors.add({name:"cal_holidayA" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
                } else {
                   colors.add({name:"cal_holidayA" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
                }
             }
         }

         if( settings.bHolidayStyleB )
         {
             try{ colors.item("cal_holidayB" + settings.styleSet).name; }
             catch (myError){
                if( settings.sColorSpace == 'CMYK' ){
                   colors.add({name:"cal_holidayB" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[77,30,100,17]});
                } else if ( settings.sColorSpace == 'RBG' ){
                   colors.add({name:"cal_holidayB" + settings.styleSet, space:ColorSpace.rgb, colorValue:[63,121,16]});
                } else {
                   colors.add({name:"cal_holidayB" + settings.styleSet, space:ColorSpace.lab, colorValue:[45,-33,45]});
                }
             }
         }

         if( settings.bHolidayStyleC )
         {
             try{ colors.item("cal_holidayC" + settings.styleSet).name; }
             catch (myError){
                if( settings.sColorSpace == 'CMYK' ){
                   colors.add({name:"cal_holidayC" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[74,25,28,0]});
                } else if ( settings.sColorSpace == 'RBG' ){
                   colors.add({name:"cal_holidayC" + settings.styleSet, space:ColorSpace.rgb, colorValue:[63,153,172]});
                } else {
                   colors.add({name:"cal_holidayC" + settings.styleSet, space:ColorSpace.lab, colorValue:[58,-23,-18]});
                }
             }
         }

         if( settings.bHolidayStyleD )
         {
             try{ colors.item("cal_holidayD" + settings.styleSet).name; }
             catch (myError){
                if( settings.sColorSpace == 'CMYK' ){
                   colors.add({name:"cal_holidayD" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[58,83,0,0]});
                } else if ( settings.sColorSpace == 'RBG' ){
                   colors.add({name:"cal_holidayD" + settings.styleSet, space:ColorSpace.rgb, colorValue:[145,52,200]});
                } else {
                   colors.add({name:"cal_holidayD" + settings.styleSet, space:ColorSpace.lab, colorValue:[42,57,-60]});
                }
             }
         }
      }

      if( settings.bWorkWeek )
      {
         try{ colors.item("cal_workWeek" + settings.styleSet).name; }
         catch (myError){
            if( settings.sColorSpace == 'CMYK' ){
               colors.add({name:"cal_workWeek" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
            } else if ( settings.sColorSpace == 'RBG' ){
               colors.add({name:"cal_workWeek" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
            } else {
               colors.add({name:"cal_workWeek" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
            }
         }
      }

      if( settings.bBackgroundLayer )
      {
         try{ colors.item("cal_background" + settings.styleSet).name; }
         catch (myError){
            if( settings.sColorSpace == 'CMYK' ){
               colors.add({name:"cal_background" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,0]});
            } else if ( settings.sColorSpace == 'RBG' ){
               colors.add({name:"cal_background" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,255,255]});
            } else {
               colors.add({name:"cal_background" + settings.styleSet, space:ColorSpace.lab, colorValue:[100,0,0]});
            }
         }
         if( settings.bHighlightSundays || settings.bHighlightHolidays ){
            try{ colors.item("cal_highlightedBackground" + settings.styleSet).name; }
            catch (myError){
               if( settings.sColorSpace == 'CMYK' ){
                  colors.add({name:"cal_highlightedBackground" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,20]});
               } else if ( settings.sColorSpace == 'RBG' ){
                  colors.add({name:"cal_highlightedBackground" + settings.styleSet, space:ColorSpace.rgb, colorValue:[210,210,210]});
               } else {
                  colors.add({name:"cal_highlightedBackground" + settings.styleSet, space:ColorSpace.lab, colorValue:[84.34, -0.78, -1.49]});
               }
            }
         }
      }

      if( settings.bMoons )
      {
         moonColors( settings );
      }

      //Add character styles
      //try{ characterStyles.item("character_style").name; }
      //catch (myError){
      //   characterStyles.add({name:"character_style"});
      //}

      //Add paragraph styles
      try{ paragraphStyles.item("cal_base" + settings.styleSet).name; }
      catch (myError){
         paragraphStyles.add({name:"cal_base" + settings.styleSet,
                              hyphenation:false});
      }

      try{ paragraphStyles.item("cal_title" + settings.styleSet).name; }
      catch (myError){
         if( settings.iCalendarsPerPage >= 8 )
         {
            titleSize = 18;
         }
         else if( settings.iCalendarsPerPage >= 4 )
         {
            titleSize = 24;
         }
         else
         {
            titleSize = 36;
         }
         paragraphStyles.add({name:"cal_title" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
            justification:Justification.centerAlign,
            capitalization:Capitalization.smallCaps,
            pointSize:titleSize});
      }

      try{ paragraphStyles.item("cal_day" + settings.styleSet).name; }
      catch (myError){
         paragraphStyles.add({name:"cal_day" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
            justification:Justification.centerAlign,
            fillColor:colors.item("cal_dayTextColor" + settings.styleSet) });
      }

      try{ paragraphStyles.item("cal_text" + settings.styleSet).name; }
      catch (myError){
         paragraphStyles.add({name:"cal_text" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet) });
      }

      try{ paragraphStyles.item("cal_date" + settings.styleSet).name; }
      catch (myError){
         paragraphStyles.add({name:"cal_date" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
            justification:Justification.rightAlign,
            nextStyle:paragraphStyles.item("cal_text" + settings.styleSet) });
      }
      if( settings.bHighlightSundays )
      {
          try{ paragraphStyles.item("cal_sunday" + settings.styleSet).name; }
          catch (myError){
             paragraphStyles.add({name:"cal_sunday" + settings.styleSet, basedOn:paragraphStyles.item("cal_date" + settings.styleSet),
                justification:Justification.rightAlign,
                nextStyle:paragraphStyles.item("cal_text" + settings.styleSet),
                fillColor:colors.item("cal_sunday" + settings.styleSet) });
          }

          if( settings.bAddNonMonthDays )
          {
              try{ paragraphStyles.item("cal_nonMonthSunday" + settings.styleSet).name; }
              catch (myError){
                 paragraphStyles.add({name:"cal_nonMonthSunday" + settings.styleSet, basedOn:paragraphStyles.item("cal_sunday" + settings.styleSet),
                    justification:Justification.rightAlign,
                    nextStyle:paragraphStyles.item("cal_date" + settings.styleSet),
                    fillColor:colors.item("cal_nonMonthSunday" + settings.styleSet) });
              }
          }
      }
      if( settings.bHighlightHolidays )
      {
          try{ paragraphStyles.item("cal_holidayDate" + settings.styleSet).name; }
          catch (myError){
             paragraphStyles.add({name:"cal_holidayDate" + settings.styleSet, basedOn:paragraphStyles.item("cal_date" + settings.styleSet),
                justification:Justification.rightAlign,
                nextStyle:paragraphStyles.item("cal_text" + settings.styleSet),
                fillColor:colors.item("cal_holidayDate" + settings.styleSet) });
          }
          if( settings.bHolidayStyleA )
          {
             try{ paragraphStyles.item("cal_holidayDateA" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayDateA" + settings.styleSet, basedOn:paragraphStyles.item("cal_holidayDate" + settings.styleSet),
                   fillColor:colors.item("cal_holidayA" + settings.styleSet) });
             }
          }
          if( settings.bHolidayStyleB )
          {
             try{ paragraphStyles.item("cal_holidayDateB" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayDateB" + settings.styleSet, basedOn:paragraphStyles.item("cal_holidayDate" + settings.styleSet),
                   fillColor:colors.item("cal_holidayB" + settings.styleSet) });
             }
          }
          if( settings.bHolidayStyleC )
          {
             try{ paragraphStyles.item("cal_holidayDateC" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayDateC" + settings.styleSet, basedOn:paragraphStyles.item("cal_holidayDate" + settings.styleSet),
                   fillColor:colors.item("cal_holidayC" + settings.styleSet) });
             }
          }
          if( settings.bHolidayStyleD )
          {
             try{ paragraphStyles.item("cal_holidayDateD" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayDateD" + settings.styleSet, basedOn:paragraphStyles.item("cal_holidayDate" + settings.styleSet),
                   fillColor:colors.item("cal_holidayD" + settings.styleSet) });
             }
          }
      }
      if( settings.bAddNonMonthDays )
      {
          try{ paragraphStyles.item("cal_nonMonthDay" + settings.styleSet).name; }
          catch (myError){
              paragraphStyles.add({name:"cal_nonMonthDay" + settings.styleSet, basedOn:paragraphStyles.item("cal_date" + settings.styleSet),
                  justification:Justification.rightAlign,
                  nextStyle:paragraphStyles.item("cal_date" + settings.styleSet),
                  fillColor:colors.item("cal_nonMonthDay" + settings.styleSet) });
          }
      }
      if( settings.iFixedRowCount == 5 ){
         try{ paragraphStyles.item("cal_date_splitCellSecondLine" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_date_splitCellSecondLine" + settings.styleSet, basedOn:paragraphStyles.item("cal_date" + settings.styleSet),
               justification:Justification.leftAlign,
               nextStyle:paragraphStyles.item("cal_text" + settings.styleSet) });
   
            if( !(settings.bCS2 == 1 || settings.bCS == 1 ) )
            {
               paragraphStyles.item( "cal_date_splitCellSecondLine" + settings.styleSet ).justification = Justification.LEFT_ALIGN;
            }
         }
         if( settings.bHighlightSundays ){
            try{ paragraphStyles.item("cal_sunday_splitCellSecondLine" + settings.styleSet).name; }
            catch (myError){
               paragraphStyles.add({name:"cal_sunday_splitCellSecondLine" + settings.styleSet, basedOn:paragraphStyles.item("cal_sunday" + settings.styleSet),
                  justification:Justification.leftAlign,
                  nextStyle:paragraphStyles.item("cal_text" + settings.styleSet) });
      
               if( !(settings.bCS2 == 1 || settings.bCS == 1 ) )
               {
                  paragraphStyles.item( "cal_sunday_splitCellSecondLine" + settings.styleSet ).justification = Justification.LEFT_ALIGN;
               }
            }
         }
      }



      if( settings.bWorkWeek )
      {
         try{ paragraphStyles.item("cal_workWeek" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_workWeek" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               justification:Justification.centerAlign,
               fillColor:colors.item("cal_workWeek" + settings.styleSet) });
         }
      }

      if( settings.bHolidaysLayer )
      {
         try{ paragraphStyles.item("cal_holiday" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_holiday" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               justification:Justification.centerAlign,
               pointSize:10,
               fillColor:colors.item("cal_holiday" + settings.styleSet) });
         }

         if( settings.bHolidayStyleA )
         {
             try{ paragraphStyles.item("cal_holidayA" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayA" + settings.styleSet, basedOn:paragraphStyles.item("cal_holiday" + settings.styleSet),
                   fillColor:colors.item("cal_holidayA" + settings.styleSet) });
             }
         }
         if( settings.bHolidayStyleB )
         {
             try{ paragraphStyles.item("cal_holidayB" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayB" + settings.styleSet, basedOn:paragraphStyles.item("cal_holiday" + settings.styleSet),
                   fillColor:colors.item("cal_holidayB" + settings.styleSet) });
             }
         }
         if( settings.bHolidayStyleC )
         {
             try{ paragraphStyles.item("cal_holidayC" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayC" + settings.styleSet, basedOn:paragraphStyles.item("cal_holiday" + settings.styleSet),
                   fillColor:colors.item("cal_holidayC" + settings.styleSet) });
             }
         }
         if( settings.bHolidayStyleD )
         {
             try{ paragraphStyles.item("cal_holidayD" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayD" + settings.styleSet, basedOn:paragraphStyles.item("cal_holiday" + settings.styleSet),
                   fillColor:colors.item("cal_holidayD" + settings.styleSet) });
             }
         }
      }

      if( settings.bMoons )
      {
         try{ paragraphStyles.item("cal_moon" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_moon" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               justification:Justification.leftAlign});
         }
      }

      if( settings.bJulianDateLayer )
      {
         try{ paragraphStyles.item("cal_julianDate" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_julianDate" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               justification:Justification.rightAlign,
               fillColor:colors.item("cal_julianDate" + settings.styleSet)});
         }
      }

      if( settings.bPicturesLayer )
      {
         try{ paragraphStyles.item("cal_pictures" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_pictures" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               justification:Justification.centerAlign});
         }
      }

      if( settings.bBackgroundLayer )
      {
         try{ paragraphStyles.item("cal_background" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_background" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet)});
         }
      }

      if( settings.bAddMiniCalendars )
      {
         try{ paragraphStyles.item("calMini_base" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"calMini_base" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               pointSize:5});
         }

         try{ paragraphStyles.item("calMini_title" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"calMini_title" + settings.styleSet, basedOn:paragraphStyles.item("calMini_base" + settings.styleSet),
               justification:Justification.centerAlign,
               capitalization:Capitalization.smallCaps });
         }

         try{ paragraphStyles.item("calMini_day" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"calMini_day" + settings.styleSet, basedOn:paragraphStyles.item("calMini_base" + settings.styleSet),
               justification:Justification.centerAlign,
               fillColor:colors.item("cal_dayTextColor" + settings.styleSet) });
         }

         try{ paragraphStyles.item("calMini_text" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"calMini_text" + settings.styleSet, basedOn:paragraphStyles.item("calMini_base" + settings.styleSet) });
         }

         try{ paragraphStyles.item("calMini_date" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"calMini_date" + settings.styleSet, basedOn:paragraphStyles.item("calMini_base" + settings.styleSet),
               justification:Justification.centerAlign });
         }
         if( settings.bHighlightSundays )
         {
             try{ paragraphStyles.item("calMini_sunday" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"calMini_sunday" + settings.styleSet, basedOn:paragraphStyles.item("calMini_date" + settings.styleSet),
                   justification:Justification.centerAlign,
                   fillColor:colors.item("cal_sunday" + settings.styleSet) });
             }
             if( settings.bAddNonMonthDays )
             {
                 try{ paragraphStyles.item("calMini_nonMonthSunday" + settings.styleSet).name; }
                 catch (myError){
                    paragraphStyles.add({name:"calMini_nonMonthSunday" + settings.styleSet, basedOn:paragraphStyles.item("calMini_sunday" + settings.styleSet),
                       justification:Justification.centerAlign,
                       fillColor:colors.item("cal_nonMonthSunday" + settings.styleSet) });
                 }
             }
         }
// Disabled as the holiday layer is disabled for mini-calendars.  
// I've left the code in as someday I may want to resurrect it.
/*
         if( settings.bHighlightHolidays )
         {
             try{ paragraphStyles.item("calMini_holidayDate" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"calMini_holidayDate" + settings.styleSet, basedOn:paragraphStyles.item("calMini_date" + settings.styleSet),
                   justification:Justification.centerAlign,
                   fillColor:colors.item("cal_holidayDate" + settings.styleSet) });
             }
             if( settings.bHolidayStyleA )
             {
                try{ paragraphStyles.item("calMini_holidayDateA" + settings.styleSet).name; }
                catch (myError){
                   paragraphStyles.add({name:"calMini_holidayDateA" + settings.styleSet, basedOn:paragraphStyles.item("calMini_holidayDate" + settings.styleSet),
                      fillColor:colors.item("cal_holidayA" + settings.styleSet) });
                }
             }
             if( settings.bHolidayStyleB )
             {
                try{ paragraphStyles.item("calMini_holidayDateB" + settings.styleSet).name; }
                catch (myError){
                   paragraphStyles.add({name:"calMini_holidayDateB" + settings.styleSet, basedOn:paragraphStyles.item("calMini_holidayDate" + settings.styleSet),
                      fillColor:colors.item("cal_holidayB" + settings.styleSet) });
                }
             }
             if( settings.bHolidayStyleC )
             {
                try{ paragraphStyles.item("calMini_holidayDateC" + settings.styleSet).name; }
                catch (myError){
                   paragraphStyles.add({name:"calMini_holidayDateC" + settings.styleSet, basedOn:paragraphStyles.item("calMini_holidayDate" + settings.styleSet),
                      fillColor:colors.item("cal_holidayC" + settings.styleSet) });
                }
             }
             if( settings.bHolidayStyleD )
             {
                try{ paragraphStyles.item("calMini_holidayDateD" + settings.styleSet).name; }
                catch (myError){
                   paragraphStyles.add({name:"calMini_holidayDateD" + settings.styleSet, basedOn:paragraphStyles.item("calMini_holidayDate" + settings.styleSet),
                      fillColor:colors.item("cal_holidayD" + settings.styleSet) });
                }
             }
         }
*/
         if( settings.bAddNonMonthDays )
         {
             try{ paragraphStyles.item("calMini_nonMonthDay" + settings.styleSet).name; }
             catch (myError){
                 paragraphStyles.add({name:"calMini_nonMonthDay" + settings.styleSet, basedOn:paragraphStyles.item("calMini_date" + settings.styleSet),
                     justification:Justification.centerAlign,
                     fillColor:colors.item("cal_nonMonthDay" + settings.styleSet) });
             }
         }

         try{ paragraphStyles.item("cal_leftMiniCalendar" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_leftMiniCalendar" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               justification:Justification.centerAlign });
         }

         try{ paragraphStyles.item("cal_rightMiniCalendar" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_rightMiniCalendar" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               justification:Justification.centerAlign });
         }
      }

      if( settings.bIncludeMonthName ){
         try{ paragraphStyles.item("cal_month" + settings.styleSet).name; }
         catch (myError){
            titleSize = 36;
            paragraphStyles.add({name:"cal_month" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               justification:Justification.centerAlign,
               capitalization:Capitalization.smallCaps,
               pointSize:titleSize});
         }
      }
      
      if( settings.bIncludeYear ){
         if( settings.bIncludeMonthName ){
            try{ paragraphStyles.item("cal_year" + settings.styleSet).name; }
            catch (myError){
               paragraphStyles.add({name:"cal_year" + settings.styleSet, basedOn:paragraphStyles.item("cal_month" + settings.styleSet)});
            }
         } else {
            try{ paragraphStyles.item("cal_year" + settings.styleSet).name; }
            catch (myError){
               titleSize = 36;
               paragraphStyles.add({name:"cal_year" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
                  justification:Justification.centerAlign,
                  capitalization:Capitalization.smallCaps,
                  pointSize:titleSize});
            }
         }
      }

      if( settings.bCellStyles )
      {
         // Cell Styles
         try{ cellStyles.item("cal_base" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_base" + settings.styleSet,
               appliedParagraphStyle:paragraphStyles.item( "cal_base" + settings.styleSet )});
         }

         try{ cellStyles.item("cal_baseNoEdges" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_baseNoEdges" + settings.styleSet,
                  basedOn:cellStyles.item("cal_base" + settings.styleSet),
                  topEdgeStrokeWeight:0,
                  rightEdgeStrokeWeight:0,
                  bottomEdgeStrokeWeight:0,
                  leftEdgeStrokeWeight:0});
         }

         try{ cellStyles.item("cal_baseNoInset" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_baseNoInset" + settings.styleSet,
               basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
               bottomInset:0,
               topInset:0,
               rightInset:0,
               leftInset:0});
         }

         try{ cellStyles.item("cal_date" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_date" + settings.styleSet,
               basedOn:cellStyles.item("cal_base" + settings.styleSet),
               appliedParagraphStyle:paragraphStyles.item( "cal_date" + settings.styleSet )});
         }

         try{ cellStyles.item("cal_title" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_title" + settings.styleSet,
               basedOn:cellStyles.item("cal_base" + settings.styleSet),
               appliedParagraphStyle:paragraphStyles.item( "cal_title" + settings.styleSet)});

            if( settings.bAddMiniCalendars )
              {
               cellStyles.item( "cal_title" + settings.styleSet ).rightEdgeStrokeWeight  = 0;
               cellStyles.item( "cal_title" + settings.styleSet ).leftEdgeStrokeWeight   = 0;
            }
         }

         try{ cellStyles.item("cal_day" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_day" + settings.styleSet,
               basedOn:cellStyles.item("cal_base" + settings.styleSet),
               appliedParagraphStyle:paragraphStyles.item( "cal_day" + settings.styleSet )});
         }

         if( settings.bHighlightSundays )
         {
             try{ cellStyles.item("cal_sunday" + settings.styleSet).name; }
             catch (myError){
                cellStyles.add({name:"cal_sunday" + settings.styleSet,
                   basedOn:cellStyles.item("cal_date" + settings.styleSet),
                   appliedParagraphStyle:paragraphStyles.item( "cal_sunday" + settings.styleSet )});
             }

             if( settings.bAddNonMonthDays )
             {
                 try{ cellStyles.item("cal_nonMonthSunday" + settings.styleSet).name; }
                 catch (myError){
                    cellStyles.add({name:"cal_nonMonthSunday" + settings.styleSet,
                       basedOn:cellStyles.item("cal_sunday" + settings.styleSet),
                       appliedParagraphStyle:paragraphStyles.item( "cal_nonMonthSunday"  + settings.styleSet)});
                 }
             }
         }
         if( settings.bHighlightHolidays )
         {
             try{ cellStyles.item("cal_holidayDate" + settings.styleSet).name; }
             catch (myError){
                cellStyles.add({name:"cal_holidayDate" + settings.styleSet,
                   basedOn:cellStyles.item("cal_date" + settings.styleSet),
                   appliedParagraphStyle:paragraphStyles.item( "cal_holidayDate" + settings.styleSet )});
             }
             if( settings.bHolidayStyleA )
             {
                try{ cellStyles.item("cal_holidayDateA" + settings.styleSet).name; }
                catch (myError){
                   cellStyles.add({name:"cal_holidayDateA" + settings.styleSet,
                      basedOn:cellStyles.item("cal_holidayDate" + settings.styleSet),
                      appliedParagraphStyle:paragraphStyles.item( "cal_holidayDateA" + settings.styleSet )});
                }
             }
             if( settings.bHolidayStyleB )
             {
                try{ cellStyles.item("cal_holidayDateB" + settings.styleSet).name; }
                catch (myError){
                   cellStyles.add({name:"cal_holidayDateB" + settings.styleSet,
                      basedOn:cellStyles.item("cal_holidayDate" + settings.styleSet),
                      appliedParagraphStyle:paragraphStyles.item( "cal_holidayDateB" + settings.styleSet )});
                }
             }
             if( settings.bHolidayStyleC )
             {
                try{ cellStyles.item("cal_holidayDateC" + settings.styleSet).name; }
                catch (myError){
                   cellStyles.add({name:"cal_holidayDateC" + settings.styleSet,
                      basedOn:cellStyles.item("cal_holidayDate" + settings.styleSet),
                      appliedParagraphStyle:paragraphStyles.item( "cal_holidayDateC" + settings.styleSet )});
                }
             }
             if( settings.bHolidayStyleD )
             {
                try{ cellStyles.item("cal_holidayDateD" + settings.styleSet).name; }
                catch (myError){
                   cellStyles.add({name:"cal_holidayDateD" + settings.styleSet,
                      basedOn:cellStyles.item("cal_holidayDate" + settings.styleSet),
                      appliedParagraphStyle:paragraphStyles.item( "cal_holidayDateD" + settings.styleSet )});
                }
             }
         }

         if( settings.bAddNonMonthDays )
         {
             try{ cellStyles.item("cal_nonMonthDay" + settings.styleSet).name; }
             catch (myError){
                 cellStyles.add({name:"cal_nonMonthDay" + settings.styleSet,
                    basedOn:cellStyles.item("cal_date" + settings.styleSet),
                     appliedParagraphStyle:paragraphStyles.item( "cal_nonMonthDay" + settings.styleSet )});
             }
         }
         try{ cellStyles.item("cal_empty" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_empty" + settings.styleSet,
               basedOn:cellStyles.item("cal_base" + settings.styleSet),
               appliedParagraphStyle:paragraphStyles.item( "cal_date"  + settings.styleSet)});
         }

         if( settings.iFixedRowCount == 5 )
         {
            try{ cellStyles.item("cal_dateSplitCell" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_dateSplitCell" + settings.styleSet,
                  basedOn:cellStyles.item("cal_date" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_date" + settings.styleSet )});

               cellStyles.item("cal_dateSplitCell"+settings.styleSet).topLeftDiagonalLine = true;
               cellStyles.item("cal_dateSplitCell"+settings.styleSet).verticalJustification = VerticalJustification.justifyAlign;
            }
            if( settings.bHighlightSundays ){
               try{ cellStyles.item("cal_sundaySplitCell" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_sundaySplitCell" + settings.styleSet,
                     basedOn:cellStyles.item("cal_sunday" + settings.styleSet),
                     appliedParagraphStyle:paragraphStyles.item( "cal_sunday" + settings.styleSet )});

                  cellStyles.item("cal_sundaySplitCell"+settings.styleSet).topLeftDiagonalLine = true;
                  cellStyles.item("cal_sundaySplitCell"+settings.styleSet).verticalJustification = VerticalJustification.justifyAlign;
               }
            }
         }

         if( settings.bTextLayer  
             || settings.bHolidaysLayer 
             || settings.bJulianDateLayer 
             || settings.bMoons 
             || settings.bPicturesLayer ) 
         {
            try{ cellStyles.item("cal_layerTitle" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_layerTitle" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoInset" + settings.styleSet),
               });
            }
            
            try{ cellStyles.item("cal_layerDay" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_layerDay" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoInset" + settings.styleSet),
               });
            }
         }

         if( settings.bTextLayer )
         {
            /*
            try{ cellStyles.item("cal_textTitle" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_textTitle" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoInset" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_title" + settings.styleSet )
               });
            }
            
            try{ cellStyles.item("cal_textDay" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_textDay" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoInset" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_base"  + settings.styleSet)});
            }
            */
            try{ cellStyles.item("cal_textText" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_textText" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_text" + settings.styleSet )
                  });
            }
         }

         if( settings.bHolidaysLayer )
         {
            /*
            try{ cellStyles.item("cal_holidayTitle" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_holidayTitle" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_title" + settings.styleSet )
                  });
            }
            
            try{ cellStyles.item("cal_holidayDay" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_holidayDay" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_base"  + settings.styleSet)});
            }
            */

            try{ cellStyles.item("cal_holidayText" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_holidayText" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_base"  + settings.styleSet),
                  verticalJustification:VerticalJustification.BOTTOM_ALIGN});
            }
            if( settings.bHolidayStyleA && settings.bHolidaysLayerA )
            {
               try{ cellStyles.item("cal_holidayTextA" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_holidayTextA" + settings.styleSet,
                     basedOn:cellStyles.item("cal_holidayText" + settings.styleSet),
                     appliedParagraphStyle:paragraphStyles.item( "cal_holidayA"  + settings.styleSet) });
                }
            }
            if( settings.bHolidayStyleB && settings.bHolidaysLayerB )
            {
               try{ cellStyles.item("cal_holidayTextB" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_holidayTextB" + settings.styleSet,
                     basedOn:cellStyles.item("cal_holidayText" + settings.styleSet),
                     appliedParagraphStyle:paragraphStyles.item( "cal_holidayB"  + settings.styleSet) });
                }
            }
            if( settings.bHolidayStyleC && settings.bHolidaysLayerC )
            {
               try{ cellStyles.item("cal_holidayTextC" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_holidayTextC" + settings.styleSet,
                     basedOn:cellStyles.item("cal_holidayText" + settings.styleSet),
                     appliedParagraphStyle:paragraphStyles.item( "cal_holidayC"  + settings.styleSet) });
                }
            }
            if( settings.bHolidayStyleD && settings.bHolidaysLayerD )
            {
               try{ cellStyles.item("cal_holidayTextD" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_holidayTextD" + settings.styleSet,
                     basedOn:cellStyles.item("cal_holidayText" + settings.styleSet),
                     appliedParagraphStyle:paragraphStyles.item( "cal_holidayD"  + settings.styleSet) });
                }
            }
         } 

         if( settings.bJulianDateLayer )
         {
            /*
            try{ cellStyles.item("cal_julianDateTitle" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_julianDateTitle" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_base" + settings.styleSet )
                  });
            }

            try{ cellStyles.item("cal_julianDateDay" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_julianDateDay" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_base"  + settings.styleSet)});
            }
            */

            try{ cellStyles.item("cal_julianDateText" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_julianDateText" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  topInset:"1p6",
                  appliedParagraphStyle:paragraphStyles.item( "cal_julianDate"  + settings.styleSet)
                  });
            }
         }

         if( settings.bMoons )
         {
            /*
            try{ cellStyles.item("cal_moonTitle" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_moonTitle" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_base"  + settings.styleSet)
               });
            }

            try{ cellStyles.item("cal_moonDay" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_moonDay" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_base"  + settings.styleSet)});
            }
            */

            try{ cellStyles.item("cal_moonText" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_moonText" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_moon"  + settings.styleSet),
                  verticalJustification:VerticalJustification.TOP_ALIGN});
            }
         }

         if( settings.bPicturesLayer )
         {
            /*
            try{ cellStyles.item("cal_picturesTitle" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_picturesTitle" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoInset" + settings.styleSet)});
            }
            
            try{ cellStyles.item("cal_picturesDay" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_picturesDay" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoInset" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_pictures" + settings.styleSet ),
                  verticalJustification:VerticalJustification.TOP_ALIGN});
            }
            */

            try{ cellStyles.item("cal_picturesText" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_picturesText" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoInset" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_pictures" + settings.styleSet ),
                  verticalJustification:VerticalJustification.TOP_ALIGN});
            }
         }

         if( settings.bBackgroundLayer )
         {
            try{ cellStyles.item("cal_background" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_background" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoInset" + settings.styleSet),
                  fillColor:colors.item("cal_background" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_background" + settings.styleSet )});
            }

            if( settings.bHighlightSundays ){
               try{ cellStyles.item("cal_sunday_background" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_sunday_background" + settings.styleSet,
                     basedOn:cellStyles.item("cal_background" + settings.styleSet),
                     fillColor:colors.item("cal_highlightedBackground" + settings.styleSet )});
               }
   
               if( settings.bAddNonMonthDays )
               {
                   try{ cellStyles.item("cal_nonMonthSunday_background" + settings.styleSet).name; }
                   catch (myError){
                      cellStyles.add({name:"cal_nonMonthSunday_background" + settings.styleSet,
                         basedOn:cellStyles.item("cal_sunday_background" + settings.styleSet),
                         fillColor:colors.item("cal_highlightedBackground" + settings.styleSet )});
                   }
               }
            }

            if( settings.bHighlightHolidays )
            {
                try{ cellStyles.item("cal_holidayDate_background" + settings.styleSet).name; }
                catch (myError){
                   cellStyles.add({name:"cal_holidayDate_background" + settings.styleSet,
                      basedOn:cellStyles.item("cal_background" + settings.styleSet),
                      fillColor:colors.item("cal_highlightedBackground" + settings.styleSet )});
                }
                if( settings.bHolidayStyleA )
                {
                   try{ cellStyles.item("cal_holidayDateA_background" + settings.styleSet).name; }
                   catch (myError){
                      cellStyles.add({name:"cal_holidayDateA_background" + settings.styleSet,
                         basedOn:cellStyles.item("cal_holidayDate_background" + settings.styleSet),
                         fillColor:colors.item("cal_highlightedBackground" + settings.styleSet )});
                   }
                }
                if( settings.bHolidayStyleB )
                {
                   try{ cellStyles.item("cal_holidayDateB_background" + settings.styleSet).name; }
                   catch (myError){
                      cellStyles.add({name:"cal_holidayDateB_background" + settings.styleSet,
                         basedOn:cellStyles.item("cal_holidayDate_background" + settings.styleSet),
                         fillColor:colors.item("cal_highlightedBackground" + settings.styleSet )});
                   }
                }
                if( settings.bHolidayStyleC )
                {
                   try{ cellStyles.item("cal_holidayDateC_background" + settings.styleSet).name; }
                   catch (myError){
                      cellStyles.add({name:"cal_holidayDateC_background" + settings.styleSet,
                         basedOn:cellStyles.item("cal_holidayDate_background" + settings.styleSet),
                         fillColor:colors.item("cal_highlightedBackground" + settings.styleSet )});
                   }
                }
                if( settings.bHolidayStyleD )
                {
                   try{ cellStyles.item("cal_holidayDateD_background" + settings.styleSet).name; }
                   catch (myError){
                      cellStyles.add({name:"cal_holidayDateD_background" + settings.styleSet,
                         basedOn:cellStyles.item("cal_holidayDate_background" + settings.styleSet),
                         fillColor:colors.item("cal_highlightedBackground" + settings.styleSet )});
                   }
                }
            }
        }

        if( settings.bWorkWeek )
        {
           try{ cellStyles.item("calWorkWeek_text" + settings.styleSet).name; }
           catch (myError){
              cellStyles.add({name:"calWorkWeek_text" + settings.styleSet,
                 basedOn:cellStyles.item("cal_base" + settings.styleSet),
                 appliedParagraphStyle:paragraphStyles.item( "cal_workWeek" + settings.styleSet ),
                 topEdgeStrokeWeight:0,
                 //rightEdgeStrokeWeight:0,
                 bottomEdgeStrokeWeight:0,
                 leftEdgeStrokeWeight:0,
                 rotationAngle:270,
                 verticalJustification:VerticalJustification.TOP_ALIGN});
           }
        }

        if( settings.bAddMiniCalendars )
        {
           try{ cellStyles.item("calMini_base" + settings.styleSet).name; }
           catch (myError){
                 cellStyles.add({name:"calMini_base" + settings.styleSet,
                 basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                 topInset:(1/72) + "in",
                 leftInset:(1/72) + "in",
                 bottomInset:(1/72) + "in",
                 rightInset:(1/72) + "in"
                 });
           }

           try{ cellStyles.item("cal_leftMiniCalendar" + settings.styleSet).name; }
           catch (myError){
                cellStyles.add({name:"cal_leftMiniCalendar" + settings.styleSet,
                 basedOn:cellStyles.item("cal_base" + settings.styleSet),
                 appliedParagraphStyle:paragraphStyles.item( "cal_leftMiniCalendar" + settings.styleSet )});
           }

           try{ cellStyles.item("cal_rightMiniCalendar" + settings.styleSet).name; }
           catch (myError){
                cellStyles.add({name:"cal_rightMiniCalendar" + settings.styleSet,
                 basedOn:cellStyles.item("cal_base" + settings.styleSet),
                 appliedParagraphStyle:paragraphStyles.item( "cal_rightMiniCalendar" + settings.styleSet )});
           }

           try{ cellStyles.item("calMini_title" + settings.styleSet).name; }
           catch (myError){
              cellStyles.add({name:"calMini_title" + settings.styleSet,
                 basedOn:cellStyles.item("calMini_base" + settings.styleSet),
                 appliedParagraphStyle:paragraphStyles.item( "calMini_title" + settings.styleSet )
              });
           }

           try{ cellStyles.item("calMini_day" + settings.styleSet).name; }
           catch (myError){
              cellStyles.add({name:"calMini_day" + settings.styleSet,
                 basedOn:cellStyles.item("calMini_base" + settings.styleSet),
                 appliedParagraphStyle:paragraphStyles.item( "calMini_day" + settings.styleSet )
              });
           }

           try{ cellStyles.item("calMini_date" + settings.styleSet).name; }
           catch (myError){
              cellStyles.add({name:"calMini_date" + settings.styleSet,
                 basedOn:cellStyles.item("calMini_base" + settings.styleSet),
                 appliedParagraphStyle:paragraphStyles.item( "calMini_date" + settings.styleSet )
              });
           }

           if( settings.bHighlightSundays )
           {
               try{ cellStyles.item("calMini_sunday" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"calMini_sunday" + settings.styleSet,
                     basedOn:cellStyles.item("calMini_date" + settings.styleSet),
                     appliedParagraphStyle:paragraphStyles.item( "calMini_sunday"+settings.styleSet)
                  });
               }

               if( settings.bAddNonMonthDays )
               {
                  try{ cellStyles.item("calMini_nonMonthSunday" + settings.styleSet).name; }
                  catch (myError){
                     cellStyles.add({name:"calMini_nonMonthSunday" + settings.styleSet,
                        basedOn:cellStyles.item("calMini_sunday" + settings.styleSet),
                        appliedParagraphStyle:paragraphStyles.item( "calMini_nonMonthSunday" + settings.styleSet )
                     });
               }
               }
           }
/*
           if( settings.bHighlightHolidays )
           {
               try{ cellStyles.item("calMini_holidayDate" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"calMini_holidayDate" + settings.styleSet,
                     basedOn:cellStyles.item("calMini_date" + settings.styleSet),
                     appliedParagraphStyle:paragraphStyles.item( "calMini_holidayDate"+settings.styleSet)
                  });
               }
               if( settings.bHolidayStyleA )
               {
                  try{ cellStyles.item("calMini_holidayDateA" + settings.styleSet).name; }
                  catch (myError){
                     cellStyles.add({name:"calMini_holidayDateA" + settings.styleSet,
                        basedOn:cellStyles.item("calMini_holidayDate" + settings.styleSet),
                        appliedParagraphStyle:paragraphStyles.item( "calMini_holidayDateA" + settings.styleSet )});
                  }
               }
               if( settings.bHolidayStyleB )
               {
                  try{ cellStyles.item("calMini_holidayDateB" + settings.styleSet).name; }
                  catch (myError){
                     cellStyles.add({name:"calMini_holidayDateB" + settings.styleSet,
                        basedOn:cellStyles.item("calMini_holidayDate" + settings.styleSet),
                        appliedParagraphStyle:paragraphStyles.item( "calMini_holidayDateB" + settings.styleSet )});
                  }
               }
               if( settings.bHolidayStyleC )
               {
                  try{ cellStyles.item("calMini_holidayDateC" + settings.styleSet).name; }
                  catch (myError){
                     cellStyles.add({name:"calMini_holidayDateC" + settings.styleSet,
                        basedOn:cellStyles.item("calMini_holidayDate" + settings.styleSet),
                        appliedParagraphStyle:paragraphStyles.item( "calMini_holidayDateC" + settings.styleSet )});
                  }
               }
               if( settings.bHolidayStyleD )
               {
                  try{ cellStyles.item("calMini_holidayDateD" + settings.styleSet).name; }
                  catch (myError){
                     cellStyles.add({name:"calMini_holidayDateD" + settings.styleSet,
                        basedOn:cellStyles.item("calMini_holidayDate" + settings.styleSet),
                        appliedParagraphStyle:paragraphStyles.item( "calMini_holidayDateD" + settings.styleSet )});
                  }
               }
           }
*/
           if( settings.bAddNonMonthDays )
           {
               try{ cellStyles.item("calMini_nonMonthDay" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"calMini_nonMonthDay" + settings.styleSet,
                     basedOn:cellStyles.item("calMini_date" + settings.styleSet),
                     appliedParagraphStyle:paragraphStyles.item( "calMini_nonMonthDay" + settings.styleSet )
                  });
               }
           }

           try{ cellStyles.item("calMini_empty" + settings.styleSet).name; }
           catch (myError){
              cellStyles.add({name:"calMini_empty" + settings.styleSet,
                 basedOn:cellStyles.item("calMini_base" + settings.styleSet),
                 appliedParagraphStyle:paragraphStyles.item( "calMini_date" + settings.styleSet )
              });
           }
        }

        // Table Styles
        try{ tableStyles.item("cal_date" + settings.styleSet).name; }
        catch (myError){
           tableStyles.add({name:"cal_date" + settings.styleSet});
        }

        if( settings.bTextLayer )
        {
            try{ tableStyles.item("cal_text" + settings.styleSet).name; }
            catch (myError){
                tableStyles.add({name:"cal_text" + settings.styleSet});
            }
        }

        if( settings.bHolidaysLayer )
        {
            try{ tableStyles.item("cal_holiday" + settings.styleSet).name; }
            catch (myError){
               tableStyles.add({name:"cal_holiday" + settings.styleSet});
            }
        }

        if( settings.bJulianDateLayer )
        {
            try{ tableStyles.item("cal_julianDate" + settings.styleSet).name; }
            catch (myError){
               tableStyles.add({name:"cal_julianDate" + settings.styleSet});
            }
        }

        if( settings.bPicturesLayer )
        {
            try{ tableStyles.item("cal_pictures" + settings.styleSet).name; }
            catch (myError){
               tableStyles.add({name:"cal_pictures" + settings.styleSet});
            }
        }

        if( settings.bBackgroundLayer )
        {
            try{ tableStyles.item("cal_background" + settings.styleSet).name; }
            catch (myError){
               tableStyles.add({name:"cal_background" + settings.styleSet});
            }
        }

        if( settings.bMoons )
        {
            try{ tableStyles.item("cal_moon" + settings.styleSet).name; }
            catch (myError){
               tableStyles.add({name:"cal_moon" + settings.styleSet});
            }
        }

        if( settings.bAddMiniCalendars )
        {
           try{ tableStyles.item("calMini_date" + settings.styleSet).name; }
           catch (myError){
              tableStyles.add({name:"calMini_date" + settings.styleSet});
           }
        }
      }

      // Object Styles (CS4 and later)
      if( settings.bObjectStyles ){
         if( settings.bMoons ){
            moonObjectStyles( settings );
         }
         customFrameObjectStyles( settings );
         backgroundLayerObjectStyles( settings );
      }
   }
   return;
}
// --------------------------------------------------------------- //
function SetTheListCalendarDocumentStyles( settings )
{
   var titleSize;
   var myDocument = settings.currentDocument;

   with(myDocument)
   {
      //Add colors.
      if( settings.bHighlightWeekends )
      {
          try{ colors.item("cal_weekend" + settings.styleSet).name; }
          catch (myError){ 
             if( settings.sColorSpace == 'CMYK' ){
                colors.add({name:"cal_weekend" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
             } else if ( settings.sColorSpace == 'RBG' ){
                colors.add({name:"cal_weekend" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
             } else {
                colors.add({name:"cal_weekend" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
             }
          }
          try{ colors.item("cal_weekend_background" + settings.styleSet).name; }
          catch (myError){ 
             if( settings.sColorSpace == 'CMYK' ){
                colors.add({name:"cal_weekend_background" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,50,0]});
             } else if ( settings.sColorSpace == 'RBG' ){
                colors.add({name:"cal_weekend_background" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,247,153]});
             } else {
                colors.add({name:"cal_weekend_background" + settings.styleSet, space:ColorSpace.lab, colorValue:[96.86,-5.82,46.09]});
             }
          }
      }

      if( settings.bHighlightSaturdays && !settings.bHighlightWeekends )
      {
          try{ colors.item("cal_saturday" + settings.styleSet).name; }
          catch (myError){ 
             if( settings.sColorSpace == 'CMYK' ){
                colors.add({name:"cal_saturday" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
             } else if ( settings.sColorSpace == 'RBG' ){
                colors.add({name:"cal_saturday" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
             } else {
                colors.add({name:"cal_saturday" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
             }
          }
          try{ colors.item("cal_saturday_background" + settings.styleSet).name; }
          catch (myError){ 
             if( settings.sColorSpace == 'CMYK' ){
                colors.add({name:"cal_saturday_background" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,50,0]});
             } else if ( settings.sColorSpace == 'RBG' ){
                colors.add({name:"cal_saturday_background" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,247,153]});
             } else {
                colors.add({name:"cal_saturday_background" + settings.styleSet, space:ColorSpace.lab, colorValue:[96.86,-5.82,46.09]});
             }
          }
      }

      if( settings.bHighlightSundays && !settings.bHighlightWeekends )
      {
          try{ colors.item("cal_sunday" + settings.styleSet).name; }
          catch (myError){ 
             if( settings.sColorSpace == 'CMYK' ){
                colors.add({name:"cal_sunday" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
             } else if ( settings.sColorSpace == 'RBG' ){
                colors.add({name:"cal_sunday" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
             } else {
                colors.add({name:"cal_sunday" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
             }
          }
          try{ colors.item("cal_sunday_background" + settings.styleSet).name; }
          catch (myError){ 
             if( settings.sColorSpace == 'CMYK' ){
                colors.add({name:"cal_sunday_background" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,50,0]});
             } else if ( settings.sColorSpace == 'RBG' ){
                colors.add({name:"cal_sunday_background" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,247,153]});
             } else {
                colors.add({name:"cal_sunday_background" + settings.styleSet, space:ColorSpace.lab, colorValue:[96.86,-5.82,46.09]});
             }
          }
      }

      if( settings.bHolidayStylesOn || settings.bHighlightHolidays)
      {
         try{ colors.item("cal_holiday" + settings.styleSet).name; }
         catch (myError){
            if( settings.sColorSpace == 'CMYK' ){
               colors.add({name:"cal_holiday" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
            } else if ( settings.sColorSpace == 'RBG' ){
               colors.add({name:"cal_holiday" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
            } else {
               colors.add({name:"cal_holiday" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
            }
         }

         if( settings.bHolidayStyleA )
         {
             try{ colors.item("cal_holidayA" + settings.styleSet).name; }
             catch (myError){
                if( settings.sColorSpace == 'CMYK' ){
                   colors.add({name:"cal_holidayA" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
                } else if ( settings.sColorSpace == 'RBG' ){
                   colors.add({name:"cal_holidayA" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
                } else {
                   colors.add({name:"cal_holidayA" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
                }
             }
         }

         if( settings.bHolidayStyleB )
         {
             try{ colors.item("cal_holidayB" + settings.styleSet).name; }
             catch (myError){
                if( settings.sColorSpace == 'CMYK' ){
                   colors.add({name:"cal_holidayB" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[77,30,100,17]});
                } else if ( settings.sColorSpace == 'RBG' ){
                   colors.add({name:"cal_holidayB" + settings.styleSet, space:ColorSpace.rgb, colorValue:[63,121,16]});
                } else {
                   colors.add({name:"cal_holidayB" + settings.styleSet, space:ColorSpace.lab, colorValue:[45,-33,45]});
                }
             }
         }

         if( settings.bHolidayStyleC )
         {
             try{ colors.item("cal_holidayC" + settings.styleSet).name; }
             catch (myError){
                if( settings.sColorSpace == 'CMYK' ){
                   colors.add({name:"cal_holidayC" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[74,25,28,0]});
                } else if ( settings.sColorSpace == 'RBG' ){
                   colors.add({name:"cal_holidayC" + settings.styleSet, space:ColorSpace.rgb, colorValue:[63,153,172]});
                } else {
                   colors.add({name:"cal_holidayC" + settings.styleSet, space:ColorSpace.lab, colorValue:[58,-23,-18]});
                }
             }
         }

         if( settings.bHolidayStyleD )
         {
             try{ colors.item("cal_holidayD" + settings.styleSet).name; }
             catch (myError){
                if( settings.sColorSpace == 'CMYK' ){
                   colors.add({name:"cal_holidayD" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[58,83,0,0]});
                } else if ( settings.sColorSpace == 'RBG' ){
                   colors.add({name:"cal_holidayD" + settings.styleSet, space:ColorSpace.rgb, colorValue:[145,52,200]});
                } else {
                   colors.add({name:"cal_holidayD" + settings.styleSet, space:ColorSpace.lab, colorValue:[42,57,-60]});
                }
             }
         }
      }

      if( settings.bWorkWeek )
      {
         try{ colors.item("cal_workWeek" + settings.styleSet).name; }
         catch (myError){
            if( settings.sColorSpace == 'CMYK' ){
               colors.add({name:"cal_workWeek" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
            } else if ( settings.sColorSpace == 'RBG' ){
               colors.add({name:"cal_workWeek" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
            } else {
               colors.add({name:"cal_workWeek" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
            }
         }
      }

      if( settings.bBackgroundLayer )
      {
         try{ colors.item("cal_background" + settings.styleSet).name; }
         catch (myError){
            if( settings.sColorSpace == 'CMYK' ){
               colors.add({name:"cal_background" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,0]});
            } else if ( settings.sColorSpace == 'RBG' ){
               colors.add({name:"cal_background" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,255,255]});
            } else {
               colors.add({name:"cal_background" + settings.styleSet, space:ColorSpace.lab, colorValue:[100,0,0]});
            }
         }
         if( settings.bHighlightSundays  || settings.bHighlightSaturdays
          || settings.bHighlightWeekends || settings.bHighlightHolidays ){
            try{ colors.item("cal_highlightedBackground" + settings.styleSet).name; }
            catch (myError){
               if( settings.sColorSpace == 'CMYK' ){
                  colors.add({name:"cal_highlightedBackground" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,20]});
               } else if ( settings.sColorSpace == 'RBG' ){
                  colors.add({name:"cal_highlightedBackground" + settings.styleSet, space:ColorSpace.rgb, colorValue:[210,210,210]});
               } else {
                  colors.add({name:"cal_highlightedBackground" + settings.styleSet, space:ColorSpace.lab, colorValue:[84.34, -0.78, -1.49]});
               }
            }
         }
      }

      if( settings.bMoons )
      {
         moonColors( settings );
      }

      //Add character styles
      //try{ characterStyles.item("character_style").name; }
      //catch (myError){
      //   characterStyles.add({name:"character_style"});
      //}

      //Add paragraph styles
      try{ paragraphStyles.item("cal_base" + settings.styleSet).name; }
      catch (myError){
         paragraphStyles.add({name:"cal_base" + settings.styleSet,
                              hyphenation:false});
      }

      try{ paragraphStyles.item("cal_month" + settings.styleSet).name; }
      catch (myError){
         titleSize = 36;
         paragraphStyles.add({name:"cal_month" + settings.styleSet, 
             basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
             justification:Justification.centerAlign,
             capitalization:Capitalization.smallCaps,
             pointSize:titleSize});
      }
      
      try{ paragraphStyles.item("cal_year" + settings.styleSet).name; }
      catch (myError){
         titleSize = 36;
         paragraphStyles.add({name:"cal_year" + settings.styleSet, 
             basedOn:paragraphStyles.item("cal_month" + settings.styleSet)});
      }

      try{ paragraphStyles.item("cal_text" + settings.styleSet).name; }
      catch (myError){
         paragraphStyles.add({name:"cal_text" + settings.styleSet, 
             basedOn:paragraphStyles.item("cal_base" + settings.styleSet) });
      }

      try{ paragraphStyles.item("cal_date" + settings.styleSet).name; }
      catch (myError){
         paragraphStyles.add({name:"cal_date" + settings.styleSet,
             basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
             nextStyle:paragraphStyles.item("cal_text" + settings.styleSet) });
      }
      
      try{ paragraphStyles.item("cal_weekday_date" + settings.styleSet).name; }
      catch (myError){
         paragraphStyles.add({name:"cal_weekday_date" + settings.styleSet, 
             basedOn:paragraphStyles.item("cal_date" + settings.styleSet)})
      }
      
      if( settings.bIncludeStylesForEveryDay ){
         try{ paragraphStyles.item("cal_monday_date" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_monday_date" + settings.styleSet,
                basedOn:paragraphStyles.item("cal_weekday_date" + settings.styleSet)})
         }
      
         try{ paragraphStyles.item("cal_tuesday_date" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_tuesday_date" + settings.styleSet,
                basedOn:paragraphStyles.item("cal_weekday_date" + settings.styleSet)})
         }
      
         try{ paragraphStyles.item("cal_wednesday_date" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_wednesday_date" + settings.styleSet,
                basedOn:paragraphStyles.item("cal_weekday_date" + settings.styleSet)})
         }
      
         try{ paragraphStyles.item("cal_thursday_date" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_thursday_date" + settings.styleSet,
                basedOn:paragraphStyles.item("cal_weekday_date" + settings.styleSet)})
         }
      
         try{ paragraphStyles.item("cal_friday_date" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_friday_date" + settings.styleSet,
                basedOn:paragraphStyles.item("cal_weekday_date" + settings.styleSet)})
         }
      }

      if( settings.bHighlightWeekends )
      {
         try{ paragraphStyles.item("cal_weekend_date" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_weekend_date" + settings.styleSet, 
                basedOn:paragraphStyles.item("cal_weekday_date" + settings.styleSet),
                fillColor:colors.item("cal_weekend" + settings.styleSet) });
         }
      } else {
         try{ paragraphStyles.item("cal_weekend_date" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_weekend_date" + settings.styleSet, 
                basedOn:paragraphStyles.item("cal_weekday_date" + settings.styleSet)})
         }
      }

      if( settings.bIncludeStylesForEveryDay || settings.bHighlightSundays || settings.bHighlightSaturdays || settings.bHighlightWeekends ){
         if( settings.bHighlightSaturdays && !settings.bHighlightWeekends )
         {
             try{ paragraphStyles.item("cal_saturday_date" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_saturday_date" + settings.styleSet, 
                   basedOn:paragraphStyles.item("cal_weekend_date" + settings.styleSet),
                   fillColor:colors.item("cal_saturday" + settings.styleSet) });
             }
         } else {
            try{ paragraphStyles.item("cal_saturday_date" + settings.styleSet).name; }
            catch (myError){
               paragraphStyles.add({name:"cal_saturday_date" + settings.styleSet, 
               basedOn:paragraphStyles.item("cal_weekend_date" + settings.styleSet)})
            }
         }

         if( settings.bHighlightSundays && !settings.bHighlightWeekends  )
         {
             try{ paragraphStyles.item("cal_sunday_date" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_sunday_date" + settings.styleSet, 
                   basedOn:paragraphStyles.item("cal_weekend_date" + settings.styleSet),
                   fillColor:colors.item("cal_sunday" + settings.styleSet) });
             }
         } else {
            try{ paragraphStyles.item("cal_sunday_date" + settings.styleSet).name; }
            catch (myError){
               paragraphStyles.add({name:"cal_sunday_date" + settings.styleSet, 
               basedOn:paragraphStyles.item("cal_weekend_date" + settings.styleSet)})
            }
         }
      }

      try{ paragraphStyles.item("cal_day" + settings.styleSet).name; }
      catch (myError){
         paragraphStyles.add({name:"cal_day" + settings.styleSet, 
             basedOn:paragraphStyles.item("cal_base" + settings.styleSet) });
      }

      try{ paragraphStyles.item("cal_weekday_day" + settings.styleSet).name; }
      catch (myError){
         paragraphStyles.add({name:"cal_weekday_day" + settings.styleSet, 
             basedOn:paragraphStyles.item("cal_day" + settings.styleSet)})
      }
      
      if( settings.bIncludeStylesForEveryDay ){
         try{ paragraphStyles.item("cal_monday_day" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_monday_day" + settings.styleSet,
                basedOn:paragraphStyles.item("cal_weekday_day" + settings.styleSet)})
         }
      
         try{ paragraphStyles.item("cal_tuesday_day" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_tuesday_day" + settings.styleSet,
                basedOn:paragraphStyles.item("cal_weekday_day" + settings.styleSet)})
         }
      
         try{ paragraphStyles.item("cal_wednesday_day" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_wednesday_day" + settings.styleSet, 
                basedOn:paragraphStyles.item("cal_weekday_day" + settings.styleSet)})
         }
      
         try{ paragraphStyles.item("cal_thursday_day" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_thursday_day" + settings.styleSet,
                basedOn:paragraphStyles.item("cal_weekday_day" + settings.styleSet)})
         }
      
         try{ paragraphStyles.item("cal_friday_day" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_friday_day" + settings.styleSet,
                basedOn:paragraphStyles.item("cal_weekday_day" + settings.styleSet)})
         }
      }     

      if( settings.bHighlightWeekends )
      {
         try{ paragraphStyles.item("cal_weekend_day" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_weekend_day" + settings.styleSet, 
                basedOn:paragraphStyles.item("cal_weekday_day" + settings.styleSet),
                fillColor:colors.item("cal_weekend" + settings.styleSet) });
         }
      } else {
         try{ paragraphStyles.item("cal_weekend_day" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_weekend_day" + settings.styleSet, 
                basedOn:paragraphStyles.item("cal_weekday_day" + settings.styleSet)})
         }
      }
 
      if( settings.bIncludeStylesForEveryDay || settings.bHighlightSaturdays || settings.bHighlightSundays || settings.bHighlightWeekends ){
         if( settings.bHighlightSaturdays && !settings.bHighlightWeekends )
         {
             try{ paragraphStyles.item("cal_saturday_day" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_saturday_day" + settings.styleSet, 
                   basedOn:paragraphStyles.item("cal_weekend_day" + settings.styleSet),
                   fillColor:colors.item("cal_saturday" + settings.styleSet) });
             }
         } else {
            try{ paragraphStyles.item("cal_saturday_day" + settings.styleSet).name; }
            catch (myError){
               paragraphStyles.add({name:"cal_saturday_day" + settings.styleSet, 
                   basedOn:paragraphStyles.item("cal_weekend_day" + settings.styleSet)})
            }
         }

         if( settings.bHighlightSunday && !settings.bHighlightWeekends  )
         {
             try{ paragraphStyles.item("cal_sunday_day" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_sunday_day" + settings.styleSet,
                    basedOn:paragraphStyles.item("cal_weekend_day" + settings.styleSet),
                    fillColor:colors.item("cal_sunday" + settings.styleSet) });
             }
         } else {
            try{ paragraphStyles.item("cal_sunday_day" + settings.styleSet).name; }
            catch (myError){
               paragraphStyles.add({name:"cal_sunday_day" + settings.styleSet,
                   basedOn:paragraphStyles.item("cal_weekend_day" + settings.styleSet)})
            }
         }
      }

      if( settings.bWorkWeek )
      {
         try{ paragraphStyles.item("cal_workWeek" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_workWeek" + settings.styleSet,
                basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
                fillColor:colors.item("cal_workWeek" + settings.styleSet) });
         }
      }

      if( settings.bHolidayStylesOn )
      {
         try{ paragraphStyles.item("cal_holiday" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_holiday" + settings.styleSet,
                basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
                pointSize:10,
                fillColor:colors.item("cal_holiday" + settings.styleSet) });
         }

         if( settings.bHolidayStyleA )
         {
             try{ paragraphStyles.item("cal_holidayA" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayA" + settings.styleSet, 
                    basedOn:paragraphStyles.item("cal_holiday" + settings.styleSet),
                    fillColor:colors.item("cal_holidayA" + settings.styleSet) });
             }
         }
         if( settings.bHolidayStyleB )
         {
             try{ paragraphStyles.item("cal_holidayB" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayB" + settings.styleSet, 
                    basedOn:paragraphStyles.item("cal_holiday" + settings.styleSet),
                    fillColor:colors.item("cal_holidayB" + settings.styleSet) });
             }
         }
         if( settings.bHolidayStyleC )
         {
             try{ paragraphStyles.item("cal_holidayC" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayC" + settings.styleSet,
                    basedOn:paragraphStyles.item("cal_holiday" + settings.styleSet),
                    fillColor:colors.item("cal_holidayC" + settings.styleSet) });
             }
         }
         if( settings.bHolidayStyleD )
         {
             try{ paragraphStyles.item("cal_holidayD" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayD" + settings.styleSet,
                    basedOn:paragraphStyles.item("cal_holiday" + settings.styleSet),
                    fillColor:colors.item("cal_holidayD" + settings.styleSet) });
             }
         }
      }

      if( settings.bHighlightHolidays )
      {
          try{ paragraphStyles.item("cal_holidayDate" + settings.styleSet).name; }
          catch (myError){
             paragraphStyles.add({name:"cal_holidayDate" + settings.styleSet, 
                 basedOn:paragraphStyles.item("cal_date" + settings.styleSet),
                 fillColor:colors.item("cal_holiday" + settings.styleSet) });
          }
          if( settings.bHolidayStyleA )
          {
             try{ paragraphStyles.item("cal_holidayDateA" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayDateA" + settings.styleSet,
                    basedOn:paragraphStyles.item("cal_holidayDate" + settings.styleSet),
                    fillColor:colors.item("cal_holidayA" + settings.styleSet) });
             }
          }
          if( settings.bHolidayStyleB )
          {
             try{ paragraphStyles.item("cal_holidayDateB" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayDateB" + settings.styleSet,
                    basedOn:paragraphStyles.item("cal_holidayDate" + settings.styleSet),
                    fillColor:colors.item("cal_holidayB" + settings.styleSet) });
             }
          }
          if( settings.bHolidayStyleC )
          {
             try{ paragraphStyles.item("cal_holidayDateC" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayDateC" + settings.styleSet,
                    basedOn:paragraphStyles.item("cal_holidayDate" + settings.styleSet),
                    fillColor:colors.item("cal_holidayC" + settings.styleSet) });
             }
          }
          if( settings.bHolidayStyleD )
          {
             try{ paragraphStyles.item("cal_holidayDateD" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayDateD" + settings.styleSet, 
                    basedOn:paragraphStyles.item("cal_holidayDate" + settings.styleSet),
                    fillColor:colors.item("cal_holidayD" + settings.styleSet) });
             }
          }
      }

      if( settings.bMoons )
      {
         try{ paragraphStyles.item("cal_moon" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_moon" + settings.styleSet,
                basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
                justification:Justification.leftAlign});
         }
      }

      if( settings.bCellStyles )
      {
         // Cell Styles
         try{ cellStyles.item("cal_base" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_base" + settings.styleSet,
               appliedParagraphStyle:paragraphStyles.item( "cal_base" + settings.styleSet )});
         }

         try{ cellStyles.item("cal_baseNoEdges" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_baseNoEdges" + settings.styleSet,
                  basedOn:cellStyles.item("cal_base" + settings.styleSet),
                  topEdgeStrokeWeight:0,
                  rightEdgeStrokeWeight:0,
                  bottomEdgeStrokeWeight:0,
                  leftEdgeStrokeWeight:0});
         }

         try{ cellStyles.item("cal_baseNoInset" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_baseNoInset" + settings.styleSet,
               basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
               bottomInset:0,
               topInset:0,
               rightInset:0,
               leftInset:0});
         }

         try{ cellStyles.item("cal_row" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_row" + settings.styleSet,
                  basedOn:cellStyles.item("cal_base" + settings.styleSet),
                  verticalJustification:VerticalJustification.CENTER_ALIGN,
                  topEdgeStrokeWeight:1,
                  rightEdgeStrokeWeight:0,
                  bottomEdgeStrokeWeight:1,
                  leftEdgeStrokeWeight:0});
         }

         try{ cellStyles.item("cal_weekday_row" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_weekday_row" + settings.styleSet,
                  basedOn:cellStyles.item("cal_row" + settings.styleSet) });
         }

         if( settings.bHighlightWeekends && ! settings.bBackgroundLayer ){
            try{ cellStyles.item("cal_weekend_row" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_weekend_row" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_row" + settings.styleSet),
                     fillColor:colors.item("cal_weekend_background" + settings.styleSet) });
            }
         } else {
            try{ cellStyles.item("cal_weekend_row" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_weekend_row" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_row" + settings.styleSet) });
            }
         }

         if( settings.bIncludeStylesForEveryDay ) {
            try{ cellStyles.item("cal_monday_row" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_monday_row" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_row" + settings.styleSet)});
            }
            try{ cellStyles.item("cal_tuesday_row" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_tuesday_row" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_row" + settings.styleSet)});
            }
            try{ cellStyles.item("cal_wednesday_row" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_wednesday_row" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_row" + settings.styleSet)});
            }
            try{ cellStyles.item("cal_thursday_row" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_thursday_row" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_row" + settings.styleSet)});
            }
            try{ cellStyles.item("cal_friday_row" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_friday_row" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_row" + settings.styleSet)});
            }
         }

         if( settings.bIncludeStylesForEveryDay || settings.bHighlightSaturdays || settings.bHighlightSundays || settings.bHighlightWeekends ) {
            if( settings.bHighlightSaturdays && !(settings.bHighlightWeekends || settings.bBackgroundLayer ) ){
               try{ cellStyles.item("cal_saturday_row" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_saturday_row" + settings.styleSet,
                        basedOn:cellStyles.item("cal_weekend_row" + settings.styleSet),
                        fillColor:colors.item("cal_saturday_background" + settings.styleSet) });
               }
            } else {
               try{ cellStyles.item("cal_saturday_row" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_saturday_row" + settings.styleSet,
                        basedOn:cellStyles.item("cal_weekend_row" + settings.styleSet) });
               }
            } 

            if( settings.bHighlightSundays && !(settings.bHighlightWeekends || settings.bBackgroundLayer) ){
               try{ cellStyles.item("cal_sunday_row" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_sunday_row" + settings.styleSet,
                        basedOn:cellStyles.item("cal_weekend_row" + settings.styleSet),
                        fillColor:colors.item("cal_sunday_background" + settings.styleSet) });
               }
            } else {
               try{ cellStyles.item("cal_sunday_row" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_sunday_row" + settings.styleSet,
                        basedOn:cellStyles.item("cal_weekend_row" + settings.styleSet) });
               }
            } 
         }

         if( settings.bIncludeStylesForEveryDay ) {
            try{ cellStyles.item("cal_monday_date" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_monday_date" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_monday_date" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_monday_row" + settings.styleSet)});
            }
            try{ cellStyles.item("cal_tuesday_date" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_tuesday_date" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_tuesday_date" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_tuesday_row" + settings.styleSet)});
            }
            try{ cellStyles.item("cal_wednesday_date" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_wednesday_date" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_wednesday_date" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_wednesday_row" + settings.styleSet)});
            }
            try{ cellStyles.item("cal_thursday_date" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_thursday_date" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_thursday_date" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_thursday_row" + settings.styleSet)});
            }
            try{ cellStyles.item("cal_friday_date" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_friday_date" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_friday_date" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_friday_row" + settings.styleSet)});
            }
         } else {
            try{ cellStyles.item("cal_weekday_date" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_weekday_date" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_weekday_date" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_weekday_row" + settings.styleSet)});
            }
         }

         if( settings.bIncludeStylesForEveryDay || settings.bHighlightSaturdays || settings.bHighlightSundays ) {
            try{ cellStyles.item("cal_saturday_date" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_saturday_date" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_saturday_date" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_saturday_row" + settings.styleSet)});
            }
            try{ cellStyles.item("cal_sunday_date" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_sunday_date" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_sunday_date" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_sunday_row" + settings.styleSet)});
            }
         } else {
            try{ cellStyles.item("cal_weekend_date" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_weekend_date" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_weekend_date" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_weekend_row" + settings.styleSet)});
            }
         }

         if( settings.bIncludeStylesForEveryDay ) {
            try{ cellStyles.item("cal_monday_day" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_monday_day" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_monday_day" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_monday_row" + settings.styleSet)});
            }
            try{ cellStyles.item("cal_tuesday_day" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_tuesday_day" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_tuesday_day" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_tuesday_row" + settings.styleSet)});
            }
            try{ cellStyles.item("cal_wednesday_day" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_wednesday_day" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_wednesday_day" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_wednesday_row" + settings.styleSet)});
            }
            try{ cellStyles.item("cal_thursday_day" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_thursday_day" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_thursday_day" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_thursday_row" + settings.styleSet)});
            }
            try{ cellStyles.item("cal_friday_day" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_friday_day" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_friday_day" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_friday_row" + settings.styleSet)});
            }
         } else {
            try{ cellStyles.item("cal_weekday_day" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_weekday_day" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_weekday_day" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_weekday_row" + settings.styleSet)});
            }
         }
         
         if( settings.bIncludeStylesForEveryDay || settings.bHighlightSaturdays || settings.bHighlightSundays ) {
            try{ cellStyles.item("cal_saturday_day" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_saturday_day" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_saturday_day" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_saturday_row" + settings.styleSet)});
            }
            try{ cellStyles.item("cal_sunday_day" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_sunday_day" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_sunday_day" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_sunday_row" + settings.styleSet)});
            }
         } else {
            try{ cellStyles.item("cal_weekend_day" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_weekend_day" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_weekend_day" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_weekend_row" + settings.styleSet)});
            }
         }


         if( settings.bIncludeStylesForEveryDay ) {
            try{ cellStyles.item("cal_monday_text" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_monday_text" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_text" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_monday_row" + settings.styleSet)});
            }
            try{ cellStyles.item("cal_tuesday_text" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_tuesday_text" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_text" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_tuesday_row" + settings.styleSet)});
            }
            try{ cellStyles.item("cal_wednesday_text" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_wednesday_text" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_text" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_wednesday_row" + settings.styleSet)});
            }
            try{ cellStyles.item("cal_thursday_text" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_thursday_text" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_text" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_thursday_row" + settings.styleSet)});
            }
            try{ cellStyles.item("cal_friday_text" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_friday_text" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_text" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_friday_row" + settings.styleSet)});
            }
         } else {
            try{ cellStyles.item("cal_weekday_text" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_weekday_text" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_text" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_weekday_row" + settings.styleSet)});
            }
         }

         if( settings.bIncludeStylesForEveryDay || settings.bHighlightSaturdays || settings.bHighlightSundays ) {
            try{ cellStyles.item("cal_saturday_text" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_saturday_text" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_text" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_saturday_row" + settings.styleSet)});
            }
            try{ cellStyles.item("cal_sunday_text" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_sunday_text" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_text" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_sunday_row" + settings.styleSet)});
            }
         } else {
            try{ cellStyles.item("cal_weekend_text" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_weekend_text" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_text" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_weekend_row" + settings.styleSet)});
            }
         }


         if( settings.bWorkWeek ){
            if( settings.bIncludeStylesForEveryDay ) {
               try{ cellStyles.item("cal_monday_workWeek" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_monday_workWeek" + settings.styleSet,
                     topEdgeStrokeWeight:0,
                     bottomEdgeStrokeWeight:0,
                     appliedParagraphStyle:paragraphStyles.item( "cal_workWeek" + settings.styleSet ),
                     basedOn:cellStyles.item("cal_monday_row" + settings.styleSet)});
               }
               try{ cellStyles.item("cal_tuesday_workWeek" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_tuesday_workWeek" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_workWeek" + settings.styleSet ),
                     topEdgeStrokeWeight:0,
                     bottomEdgeStrokeWeight:0,
                     basedOn:cellStyles.item("cal_tuesday_row" + settings.styleSet)});
               }
               try{ cellStyles.item("cal_wednesday_workWeek" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_wednesday_workWeek" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_workWeek" + settings.styleSet ),
                     topEdgeStrokeWeight:0,
                     bottomEdgeStrokeWeight:0,
                     basedOn:cellStyles.item("cal_wednesday_row" + settings.styleSet)});
               }
               try{ cellStyles.item("cal_thursday_workWeek" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_thursday_workWeek" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_workWeek" + settings.styleSet ),
                     topEdgeStrokeWeight:0,
                     bottomEdgeStrokeWeight:0,
                     basedOn:cellStyles.item("cal_thursday_row" + settings.styleSet)});
               }
               try{ cellStyles.item("cal_friday_workWeek" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_friday_workWeek" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_workWeek" + settings.styleSet ),
                     topEdgeStrokeWeight:0,
                     bottomEdgeStrokeWeight:0,
                     basedOn:cellStyles.item("cal_friday_row" + settings.styleSet)});
               }
            } else {
               try{ cellStyles.item("cal_weekday_workWeek" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_weekday_workWeek" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_workWeek" + settings.styleSet ),
                     topEdgeStrokeWeight:0,
                     bottomEdgeStrokeWeight:0,
                     basedOn:cellStyles.item("cal_weekday_row" + settings.styleSet)});
               }
            }

            if( settings.bIncludeStylesForEveryDay || settings.bHighlightSaturdays || settings.bHighlightSundays ) {
               try{ cellStyles.item("cal_saturday_workWeek" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_saturday_workWeek" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_workWeek" + settings.styleSet ),
                     topEdgeStrokeWeight:0,
                     bottomEdgeStrokeWeight:0,
                     basedOn:cellStyles.item("cal_saturday_row" + settings.styleSet)});
               }
               try{ cellStyles.item("cal_sunday_workWeek" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_sunday_workWeek" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_workWeek" + settings.styleSet ),
                     topEdgeStrokeWeight:0,
                     topEdgeStrokeWeight:0,
                     bottomEdgeStrokeWeight:0,
                     bottomEdgeStrokeWeight:0,
                     basedOn:cellStyles.item("cal_sunday_row" + settings.styleSet)});
               } 
            } else {
               try{ cellStyles.item("cal_weekend_workWeek" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_weekend_workWeek" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_workWeek" + settings.styleSet ),
                     topEdgeStrokeWeight:0,
                     bottomEdgeStrokeWeight:0,
                     basedOn:cellStyles.item("cal_weekend_row" + settings.styleSet)});
               }
            }
         }

         if( settings.bMoons ){
            if( settings.bIncludeStylesForEveryDay ) {
               try{ cellStyles.item("cal_monday_moon" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_monday_moon" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_moon" + settings.styleSet ),
                     topEdgeStrokeWeight:0,
                     bottomEdgeStrokeWeight:0,
                     verticalJustification:VerticalJustification.CENTER_ALIGN,
                     basedOn:cellStyles.item("cal_monday_row" + settings.styleSet)});
               }
               try{ cellStyles.item("cal_tuesday_moon" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_tuesday_moon" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_moon" + settings.styleSet ),
                     topEdgeStrokeWeight:0,
                     bottomEdgeStrokeWeight:0,
                     verticalJustification:VerticalJustification.CENTER_ALIGN,
                     basedOn:cellStyles.item("cal_tuesday_row" + settings.styleSet)});
               }
               try{ cellStyles.item("cal_wednesday_moon" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_wednesday_moon" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_moon" + settings.styleSet ),
                     topEdgeStrokeWeight:0,
                     bottomEdgeStrokeWeight:0,
                     verticalJustification:VerticalJustification.CENTER_ALIGN,
                     basedOn:cellStyles.item("cal_wednesday_row" + settings.styleSet)});
               }
               try{ cellStyles.item("cal_thursday_moon" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_thursday_moon" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_moon" + settings.styleSet ),
                     topEdgeStrokeWeight:0,
                     bottomEdgeStrokeWeight:0,
                     verticalJustification:VerticalJustification.CENTER_ALIGN,
                     basedOn:cellStyles.item("cal_thursday_row" + settings.styleSet)});
               }
               try{ cellStyles.item("cal_friday_moon" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_friday_moon" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_moon" + settings.styleSet ),
                     topEdgeStrokeWeight:0,
                     bottomEdgeStrokeWeight:0,
                     verticalJustification:VerticalJustification.CENTER_ALIGN,
                     basedOn:cellStyles.item("cal_friday_row" + settings.styleSet)});
               }
            } else {
               try{ cellStyles.item("cal_weekday_moon" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_weekday_moon" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_moon" + settings.styleSet ),
                     topEdgeStrokeWeight:0,
                     bottomEdgeStrokeWeight:0,
                     verticalJustification:VerticalJustification.CENTER_ALIGN,
                     basedOn:cellStyles.item("cal_weekday_row" + settings.styleSet)});
               }
            }


            if( settings.bIncludeStylesForEveryDay || settings.bHighlightSaturdays || settings.bHighlightSundays ) {
               try{ cellStyles.item("cal_saturday_moon" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_saturday_moon" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_moon" + settings.styleSet ),
                     topEdgeStrokeWeight:0,
                     bottomEdgeStrokeWeight:0,
                     verticalJustification:VerticalJustification.CENTER_ALIGN,
                     basedOn:cellStyles.item("cal_saturday_row" + settings.styleSet)});
               }
               try{ cellStyles.item("cal_sunday_moon" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_sunday_moon" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_moon" + settings.styleSet ),
                     topEdgeStrokeWeight:0,
                     bottomEdgeStrokeWeight:0,
                     verticalJustification:VerticalJustification.CENTER_ALIGN,
                     basedOn:cellStyles.item("cal_sunday_row" + settings.styleSet)});
               }
            } else {
               try{ cellStyles.item("cal_weekend_moon" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_weekend_moon" + settings.styleSet,
                     appliedParagraphStyle:paragraphStyles.item( "cal_moon" + settings.styleSet ),
                     topEdgeStrokeWeight:0,
                     bottomEdgeStrokeWeight:0,
                     verticalJustification:VerticalJustification.CENTER_ALIGN,
                     basedOn:cellStyles.item("cal_weekend_row" + settings.styleSet)});
               }
            }
         }

         if( settings.bHighlightHolidays )
         {
             try{ cellStyles.item("cal_holidayDate" + settings.styleSet).name; }
             catch (myError){
                cellStyles.add({name:"cal_holidayDate" + settings.styleSet,
                   basedOn:cellStyles.item("cal_row" + settings.styleSet),
                   appliedParagraphStyle:paragraphStyles.item( "cal_holidayDate" + settings.styleSet )});
             }
             if( settings.bHolidayStyleA )
             {
                try{ cellStyles.item("cal_holidayDateA" + settings.styleSet).name; }
                catch (myError){
                   cellStyles.add({name:"cal_holidayDateA" + settings.styleSet,
                      basedOn:cellStyles.item("cal_holidayDate" + settings.styleSet),
                      appliedParagraphStyle:paragraphStyles.item( "cal_holidayDateA" + settings.styleSet )});
                }
             }
             if( settings.bHolidayStyleB )
             {
                try{ cellStyles.item("cal_holidayDateB" + settings.styleSet).name; }
                catch (myError){
                   cellStyles.add({name:"cal_holidayDateB" + settings.styleSet,
                      basedOn:cellStyles.item("cal_holidayDate" + settings.styleSet),
                      appliedParagraphStyle:paragraphStyles.item( "cal_holidayDateB" + settings.styleSet )});
                }
             }
             if( settings.bHolidayStyleC )
             {
                try{ cellStyles.item("cal_holidayDateC" + settings.styleSet).name; }
                catch (myError){
                   cellStyles.add({name:"cal_holidayDateC" + settings.styleSet,
                      basedOn:cellStyles.item("cal_holidayDate" + settings.styleSet),
                      appliedParagraphStyle:paragraphStyles.item( "cal_holidayDateC" + settings.styleSet )});
                }
             }
             if( settings.bHolidayStyleD )
             {
                try{ cellStyles.item("cal_holidayDateD" + settings.styleSet).name; }
                catch (myError){
                   cellStyles.add({name:"cal_holidayDateD" + settings.styleSet,
                      basedOn:cellStyles.item("cal_holidayDate" + settings.styleSet),
                      appliedParagraphStyle:paragraphStyles.item( "cal_holidayDateD" + settings.styleSet )});
                }
             }
         }

         if( settings.bBackgroundLayer ){
            try{ cellStyles.item("cal_background" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_background" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoInset" + settings.styleSet),
                  fillColor:colors.item("cal_background" + settings.styleSet) }); 
            }
            try{ cellStyles.item("cal_background_left" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_background_left" + settings.styleSet,
                  basedOn:cellStyles.item("cal_background" + settings.styleSet) });
            }
            try{ cellStyles.item("cal_background_right" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_background_right" + settings.styleSet,
                  basedOn:cellStyles.item("cal_background" + settings.styleSet) });
            }
         
            /*
            if( settings.bHighlightSundays  || settings.bHighlightSaturdays
             || settings.bHighlightWeekends || settings.bHighlightHolidays ){
               try{ cellStyles.item("cal_background_highlighted" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_background_highlighted" + settings.styleSet,
                     basedOn:cellStyles.item("cal_background" + settings.styleSet),
                     fillColor:colors.item("cal_highlightedBackground" + settings.styleSet) })
               }
               try{ cellStyles.item("cal_background_highlighted_left" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_background_highlighted_left" + settings.styleSet,
                     basedOn:cellStyles.item("cal_background_highlighted" + settings.styleSet)});
               }
               try{ cellStyles.item("cal_background_highlighted_right" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_background_highlighted_right" + settings.styleSet,
                     basedOn:cellStyles.item("cal_background_highlighted" + settings.styleSet)});
               }
            }
            */

            try{ cellStyles.item("cal_weekday_background_left" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_weekday_background_left" + settings.styleSet,
                  basedOn:cellStyles.item("cal_background_left" + settings.styleSet) });
            }
            try{ cellStyles.item("cal_weekday_background_right" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_weekday_background_right" + settings.styleSet,
                  basedOn:cellStyles.item("cal_background_right" + settings.styleSet) });
            }

            if( settings.bHighlightWeekends ){
               try{ cellStyles.item("cal_weekend_background_left" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_weekend_background_left" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_background_left" + settings.styleSet),
                     fillColor:colors.item("cal_highlightedBackground" + settings.styleSet) }); 
               }
               try{ cellStyles.item("cal_weekend_background_right" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_weekend_background_right" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_background_right" + settings.styleSet),
                     fillColor:colors.item("cal_highlightedBackground" + settings.styleSet) }); 
               }
            } else {
               try{ cellStyles.item("cal_weekend_background_left" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_weekend_background_left" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_background_left" + settings.styleSet) });
               }
               try{ cellStyles.item("cal_weekend_background_right" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_weekend_background_right" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_background_right" + settings.styleSet) });
               }
            }

            if( settings.bHighlightSaturdays ){
               try{ cellStyles.item("cal_saturday_background_left" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_saturday_background_left" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekend_background_left" + settings.styleSet),
                     fillColor:colors.item("cal_highlightedBackground" + settings.styleSet) }); 
               }
               try{ cellStyles.item("cal_saturday_background_right" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_saturday_background_right" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekend_background_right" + settings.styleSet),
                     fillColor:colors.item("cal_highlightedBackground" + settings.styleSet) }); 
               }
            } else {
               try{ cellStyles.item("cal_saturday_background_left" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_saturday_background_left" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekend_background_left" + settings.styleSet) });
               }
               try{ cellStyles.item("cal_saturday_background_right" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_saturday_background_right" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekend_background_right" + settings.styleSet) });
               }
            }

            if( settings.bHighlightSundays ){
               try{ cellStyles.item("cal_sunday_background_left" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_sunday_background_left" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekend_background_left" + settings.styleSet),
                     fillColor:colors.item("cal_highlightedBackground" + settings.styleSet) }); 
               }
               try{ cellStyles.item("cal_sunday_background_right" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_sunday_background_right" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekend_background_right" + settings.styleSet),
                     fillColor:colors.item("cal_highlightedBackground" + settings.styleSet) }); 
               }
            } else {
               try{ cellStyles.item("cal_sunday_background_left" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_sunday_background_left" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekend_background_left" + settings.styleSet) });
               }
               try{ cellStyles.item("cal_sunday_background_background_right" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_sunday_background_right" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekend_background_right" + settings.styleSet) });
               }
            }

            if( settings.bHighlightHolidays )
            {
                try{ cellStyles.item("cal_holidayDate_background_left" + settings.styleSet).name; }
                catch (myError){
                   cellStyles.add({name:"cal_holidayDate_background_left" + settings.styleSet,
                      basedOn:cellStyles.item("cal_background_left" + settings.styleSet),
                      fillColor:colors.item("cal_highlightedBackground" + settings.styleSet) }); 
                }
                try{ cellStyles.item("cal_holidayDate_background_right" + settings.styleSet).name; }
                catch (myError){
                   cellStyles.add({name:"cal_holidayDate_background_right" + settings.styleSet,
                      basedOn:cellStyles.item("cal_background_right" + settings.styleSet),
                      fillColor:colors.item("cal_highlightedBackground" + settings.styleSet) }); 
                }
                if( settings.bHolidayStyleA )
                {
                   try{ cellStyles.item("cal_holidayDateA_background_left" + settings.styleSet).name; }
                   catch (myError){
                      cellStyles.add({name:"cal_holidayDateA_background_left" + settings.styleSet,
                         basedOn:cellStyles.item("cal_holidayDate_background_left" + settings.styleSet) });
                   }
                   try{ cellStyles.item("cal_holidayDateA_background_right" + settings.styleSet).name; }
                   catch (myError){
                      cellStyles.add({name:"cal_holidayDateA_background_right" + settings.styleSet,
                         basedOn:cellStyles.item("cal_holidayDate_background_right" + settings.styleSet) });
                   }
                }
                if( settings.bHolidayStyleB )
                {
                   try{ cellStyles.item("cal_holidayDateB_background_left" + settings.styleSet).name; }
                   catch (myError){
                      cellStyles.add({name:"cal_holidayDateB_background_left" + settings.styleSet,
                         basedOn:cellStyles.item("cal_holidayDate_background_left" + settings.styleSet) });
                   }
                   try{ cellStyles.item("cal_holidayDateB_background_right" + settings.styleSet).name; }
                   catch (myError){
                      cellStyles.add({name:"cal_holidayDateB_background_right" + settings.styleSet,
                         basedOn:cellStyles.item("cal_holidayDate_background_right" + settings.styleSet) });
                   }
                }
                if( settings.bHolidayStyleC )
                {
                   try{ cellStyles.item("cal_holidayDateC_background_left" + settings.styleSet).name; }
                   catch (myError){
                      cellStyles.add({name:"cal_holidayDateC_background_left" + settings.styleSet,
                         basedOn:cellStyles.item("cal_holidayDate_background_left" + settings.styleSet) });
                   }
                   try{ cellStyles.item("cal_holidayDateC_background_right" + settings.styleSet).name; }
                   catch (myError){
                      cellStyles.add({name:"cal_holidayDateC_background_right" + settings.styleSet,
                         basedOn:cellStyles.item("cal_holidayDate_background_right" + settings.styleSet) });
                   }
                }
                if( settings.bHolidayStyleD )
                {
                   try{ cellStyles.item("cal_holidayDateD_background_left" + settings.styleSet).name; }
                   catch (myError){
                      cellStyles.add({name:"cal_holidayDateD_background_left" + settings.styleSet,
                         basedOn:cellStyles.item("cal_holidayDate_background_left" + settings.styleSet) });
                   }
                   try{ cellStyles.item("cal_holidayDateD_background_right" + settings.styleSet).name; }
                   catch (myError){
                      cellStyles.add({name:"cal_holidayDateD_background_right" + settings.styleSet,
                         basedOn:cellStyles.item("cal_holidayDate_background_right" + settings.styleSet) });
                   }
                }
            }

            if( settings.bIncludeStylesForEveryDay ){
               try{ cellStyles.item("cal_monday_background_left" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_monday_background_left" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_background_left" + settings.styleSet) });
               }
               try{ cellStyles.item("cal_monday_background_right" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_monday_background_right" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_background_right" + settings.styleSet) });
               }
               try{ cellStyles.item("cal_tuesday_background_left" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_tuesday_background_left" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_background_left" + settings.styleSet) });
               }
               try{ cellStyles.item("cal_tuesday_background_right" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_tuesday_background_right" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_background_right" + settings.styleSet) });
               }
               try{ cellStyles.item("cal_wednesday_background_left" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_wednesday_background_left" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_background_left" + settings.styleSet) });
               }
               try{ cellStyles.item("cal_wednesday_background_right" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_wednesday_background_right" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_background_right" + settings.styleSet) });
               }
               try{ cellStyles.item("cal_thursday_background_left" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_thursday_background_left" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_background_left" + settings.styleSet) });
               }
               try{ cellStyles.item("cal_thursday_background_right" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_thursday_background_right" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_background_right" + settings.styleSet) });
               }
               try{ cellStyles.item("cal_friday_background_left" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_friday_background_left" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_background_left" + settings.styleSet) });
               }
               try{ cellStyles.item("cal_friday_background_right" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_friday_background_right" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_background_right" + settings.styleSet) });
               }
            }
         }

         // Table Styles
         try{ tableStyles.item("cal" + settings.styleSet).name; }
         catch (myError){
            tableStyles.add({name:"cal" + settings.styleSet});
         }
         if( settings.bBackgroundLayer )
         {
             try{ tableStyles.item("cal_background" + settings.styleSet).name; }
             catch (myError){
                tableStyles.add({name:"cal_background" + settings.styleSet});
             }
         }
      }

      // Object Styles (CS4 and later)
      if( settings.bObjectStyles ){
         if( settings.bMoons ){
            moonObjectStyles( settings );
         }
         customFrameObjectStyles( settings );
         backgroundLayerObjectStyles( settings );
      }
   }

   return;
}
// --------------------------------------------------------------- //
function SetTheLineCalendarDocumentStyles( settings )
{
   var titleSize;
   var myDocument = settings.currentDocument;

   with(myDocument)
   {
      //Add colors.
      if( settings.bHighlightWeekends )
      {
          try{ colors.item("cal_weekend" + settings.styleSet).name; }
          catch (myError){ 
             if( settings.sColorSpace == 'CMYK' ){
                colors.add({name:"cal_weekend" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
             } else if ( settings.sColorSpace == 'RBG' ){
                colors.add({name:"cal_weekend" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
             } else {
                colors.add({name:"cal_weekend" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
             }
          }
          try{ colors.item("cal_weekend_background" + settings.styleSet).name; }
          catch (myError){ 
             if( settings.sColorSpace == 'CMYK' ){
                colors.add({name:"cal_weekend_background" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,50,0]});
             } else if ( settings.sColorSpace == 'RBG' ){
                colors.add({name:"cal_weekend_background" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,247,153]});
             } else {
                colors.add({name:"cal_weekend_background" + settings.styleSet, space:ColorSpace.lab, colorValue:[96.86,-5.82,46.09]});
             }
          }
      }

      if( settings.bHighlightSaturdays && !settings.bHighlightWeekends )
      {
          try{ colors.item("cal_saturday" + settings.styleSet).name; }
          catch (myError){ 
             if( settings.sColorSpace == 'CMYK' ){
                colors.add({name:"cal_saturday" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
             } else if ( settings.sColorSpace == 'RBG' ){
                colors.add({name:"cal_saturday" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
             } else {
                colors.add({name:"cal_saturday" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
             }
          }
          try{ colors.item("cal_saturday_background" + settings.styleSet).name; }
          catch (myError){ 
             if( settings.sColorSpace == 'CMYK' ){
                colors.add({name:"cal_saturday_background" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,50,0]});
             } else if ( settings.sColorSpace == 'RBG' ){
                colors.add({name:"cal_saturday_background" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,247,153]});
             } else {
                colors.add({name:"cal_saturday_background" + settings.styleSet, space:ColorSpace.lab, colorValue:[96.86,-5.82,46.09]});
             }
          }
      }

      if( settings.bHighlightSundays && !settings.bHighlightWeekends )
      {
          try{ colors.item("cal_sunday" + settings.styleSet).name; }
          catch (myError){ 
             if( settings.sColorSpace == 'CMYK' ){
                colors.add({name:"cal_sunday" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
             } else if ( settings.sColorSpace == 'RBG' ){
                colors.add({name:"cal_sunday" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
             } else {
                colors.add({name:"cal_sunday" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
             }
          }
          try{ colors.item("cal_sunday_background" + settings.styleSet).name; }
          catch (myError){ 
             if( settings.sColorSpace == 'CMYK' ){
                colors.add({name:"cal_sunday_background" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,50,0]});
             } else if ( settings.sColorSpace == 'RBG' ){
                colors.add({name:"cal_sunday_background" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,247,153]});
             } else {
                colors.add({name:"cal_sunday_background" + settings.styleSet, space:ColorSpace.lab, colorValue:[96.86,-5.82,46.09]});
             }
          }
      }

      if( settings.bHolidayStylesOn )
      {
         try{ colors.item("cal_holiday" + settings.styleSet).name; }
         catch (myError){
            if( settings.sColorSpace == 'CMYK' ){
               colors.add({name:"cal_holiday" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
            } else if ( settings.sColorSpace == 'RBG' ){
               colors.add({name:"cal_holiday" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
            } else {
               colors.add({name:"cal_holiday" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
            }
         }

         if( settings.bHolidayStyleA )
         {
             try{ colors.item("cal_holidayA" + settings.styleSet).name; }
             catch (myError){
                if( settings.sColorSpace == 'CMYK' ){
                   colors.add({name:"cal_holidayA" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
                } else if ( settings.sColorSpace == 'RBG' ){
                   colors.add({name:"cal_holidayA" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
                } else {
                   colors.add({name:"cal_holidayA" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
                }
             }
         }

         if( settings.bHolidayStyleB )
         {
             try{ colors.item("cal_holidayB" + settings.styleSet).name; }
             catch (myError){
                if( settings.sColorSpace == 'CMYK' ){
                   colors.add({name:"cal_holidayB" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[77,30,100,17]});
                } else if ( settings.sColorSpace == 'RBG' ){
                   colors.add({name:"cal_holidayB" + settings.styleSet, space:ColorSpace.rgb, colorValue:[63,121,16]});
                } else {
                   colors.add({name:"cal_holidayB" + settings.styleSet, space:ColorSpace.lab, colorValue:[45,-33,45]});
                }
             }
         }

         if( settings.bHolidayStyleC )
         {
             try{ colors.item("cal_holidayC" + settings.styleSet).name; }
             catch (myError){
                if( settings.sColorSpace == 'CMYK' ){
                   colors.add({name:"cal_holidayC" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[74,25,28,0]});
                } else if ( settings.sColorSpace == 'RBG' ){
                   colors.add({name:"cal_holidayC" + settings.styleSet, space:ColorSpace.rgb, colorValue:[63,153,172]});
                } else {
                   colors.add({name:"cal_holidayC" + settings.styleSet, space:ColorSpace.lab, colorValue:[58,-23,-18]});
                }
             }
         }

         if( settings.bHolidayStyleD )
         {
             try{ colors.item("cal_holidayD" + settings.styleSet).name; }
             catch (myError){
                if( settings.sColorSpace == 'CMYK' ){
                   colors.add({name:"cal_holidayD" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[58,83,0,0]});
                } else if ( settings.sColorSpace == 'RBG' ){
                   colors.add({name:"cal_holidayD" + settings.styleSet, space:ColorSpace.rgb, colorValue:[145,52,200]});
                } else {
                   colors.add({name:"cal_holidayD" + settings.styleSet, space:ColorSpace.lab, colorValue:[42,57,-60]});
                }
             }
         }
      }

      if( settings.bJulianDateLayer )
      {
          try{ colors.item("cal_julianDate" + settings.styleSet).name; }
          catch (myError){ 
             if( settings.sColorSpace == 'CMYK' ){
                colors.add({name:"cal_julianDate" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
             } else if ( settings.sColorSpace == 'RBG' ){
                colors.add({name:"cal_julianDate" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
             } else {
                colors.add({name:"cal_julianDate" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
             }
          }
      }

      if( settings.bWeekDay )
      {
          try{ colors.item("cal_weekDay" + settings.styleSet).name; }
          catch (myError){ 
             if( settings.sColorSpace == 'CMYK' ){
                colors.add({name:"cal_weekDay" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
             } else if ( settings.sColorSpace == 'RBG' ){
                colors.add({name:"cal_weekDay" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
             } else {
                colors.add({name:"cal_weekDay" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
             }
          }
      }

      if( settings.bWorkWeek )
      {
         try{ colors.item("cal_workWeek" + settings.styleSet).name; }
         catch (myError){
            if( settings.sColorSpace == 'CMYK' ){
               colors.add({name:"cal_workWeek" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
            } else if ( settings.sColorSpace == 'RBG' ){
               colors.add({name:"cal_workWeek" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
            } else {
               colors.add({name:"cal_workWeek" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
            }
         }
      }

      if( settings.bBackgroundLayer )
      {
         try{ colors.item("cal_background" + settings.styleSet).name; }
         catch (myError){
            if( settings.sColorSpace == 'CMYK' ){
               colors.add({name:"cal_background" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,0]});
            } else if ( settings.sColorSpace == 'RBG' ){
               colors.add({name:"cal_background" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,255,255]});
            } else {
               colors.add({name:"cal_background" + settings.styleSet, space:ColorSpace.lab, colorValue:[100,0,0]});
            }
         }
         if( settings.bHighlightSaturdays || settings.bHighlightSundays 
          || settings.bHighlightWeekends || settings.bHighlightHolidays ){
            try{ colors.item("cal_highlightedBackground" + settings.styleSet).name; }
            catch (myError){
               if( settings.sColorSpace == 'CMYK' ){
                  colors.add({name:"cal_highlightedBackground" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,20]});
               } else if ( settings.sColorSpace == 'RBG' ){
                  colors.add({name:"cal_highlightedBackground" + settings.styleSet, space:ColorSpace.rgb, colorValue:[210,210,210]});
               } else {
                  colors.add({name:"cal_highlightedBackground" + settings.styleSet, space:ColorSpace.lab, colorValue:[84.34, -0.78, -1.49]});
               }
            }
         }
      }
     
      if( settings.bMoons )
      {
         moonColors( settings );
      }

      //Add character styles
      //try{ characterStyles.item("character_style").name; }
      //catch (myError){
      //   characterStyles.add({name:"character_style"});
      //}

      //Add paragraph styles
      try{ paragraphStyles.item("cal_base" + settings.styleSet).name; }
      catch (myError){
         paragraphStyles.add({name:"cal_base" + settings.styleSet,
                              hyphenation:false});
      }

      try{ paragraphStyles.item("cal_month" + settings.styleSet).name; }
      catch (myError){
         titleSize = 36;
         paragraphStyles.add({name:"cal_month" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
            justification:Justification.leftAlign,
            capitalization:Capitalization.smallCaps,
            pointSize:titleSize});
      }
      
      try{ paragraphStyles.item("cal_year" + settings.styleSet).name; }
      catch (myError){
         titleSize = 36;
         paragraphStyles.add({name:"cal_year" + settings.styleSet, basedOn:paragraphStyles.item("cal_month" + settings.styleSet)});
      }

      if( settings.bTextLayer ){
         try{ paragraphStyles.item("cal_text" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_text" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet) });
         }
      }

      if( settings.bTextLayer ){
         try{ paragraphStyles.item("cal_date" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_date" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
            nextStyle:paragraphStyles.item("cal_text" + settings.styleSet) });
         }
      } else {
         try{ paragraphStyles.item("cal_date" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_date" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet)});
         }
      }
      
      try{ paragraphStyles.item("cal_weekday_date" + settings.styleSet).name; }
      catch (myError){
         paragraphStyles.add({name:"cal_weekday_date" + settings.styleSet, basedOn:paragraphStyles.item("cal_date" + settings.styleSet)})
      }

 
      if( settings.bIncludeStylesForEveryDay ){
         try{ paragraphStyles.item("cal_monday_date" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_monday_date" + settings.styleSet, basedOn:paragraphStyles.item("cal_weekday_date" + settings.styleSet)})
         }
      
         try{ paragraphStyles.item("cal_tuesday_date" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_tuesday_date" + settings.styleSet, basedOn:paragraphStyles.item("cal_weekday_date" + settings.styleSet)})
         }
      
         try{ paragraphStyles.item("cal_wednesday_date" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_wednesday_date" + settings.styleSet, basedOn:paragraphStyles.item("cal_weekday_date" + settings.styleSet)})
         }
      
         try{ paragraphStyles.item("cal_thursday_date" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_thursday_date" + settings.styleSet, basedOn:paragraphStyles.item("cal_weekday_date" + settings.styleSet)})
         }
      
         try{ paragraphStyles.item("cal_friday_date" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_friday_date" + settings.styleSet, basedOn:paragraphStyles.item("cal_weekday_date" + settings.styleSet)})
         }
      }

      if( settings.bHighlightWeekends )
      {
         try{ paragraphStyles.item("cal_weekend_date" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_weekend_date" + settings.styleSet, basedOn:paragraphStyles.item("cal_weekday_date" + settings.styleSet),
                fillColor:colors.item("cal_weekend" + settings.styleSet) });
         }
      } else {
         try{ paragraphStyles.item("cal_weekend_date" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_weekend_date" + settings.styleSet, basedOn:paragraphStyles.item("cal_weekday_date" + settings.styleSet)})
         }
      }
      if( settings.bIncludeStylesForEveryDay || settings.bHighlightWeekends || settings.bHighlightSundays || settings.bHighlightSaturdays ){
         if( settings.bHighlightSaturdays && !settings.bHighlightWeekends )
         {
             try{ paragraphStyles.item("cal_saturday_date" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_saturday_date" + settings.styleSet, basedOn:paragraphStyles.item("cal_weekend_date" + settings.styleSet),
                   fillColor:colors.item("cal_saturday" + settings.styleSet) });
             }
         } else {
            try{ paragraphStyles.item("cal_saturday_date" + settings.styleSet).name; }
            catch (myError){
               paragraphStyles.add({name:"cal_saturday_date" + settings.styleSet, basedOn:paragraphStyles.item("cal_weekend_date" + settings.styleSet)})
            }
         }

         if( settings.bHighlightSundays && !settings.bHighlightWeekends )
         {
             try{ paragraphStyles.item("cal_sunday_date" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_sunday_date" + settings.styleSet, basedOn:paragraphStyles.item("cal_weekend_date" + settings.styleSet),
                   fillColor:colors.item("cal_sunday" + settings.styleSet) });
             }
         } else {
            try{ paragraphStyles.item("cal_sunday_date" + settings.styleSet).name; }
            catch (myError){
               paragraphStyles.add({name:"cal_sunday_date" + settings.styleSet, basedOn:paragraphStyles.item("cal_weekend_date" + settings.styleSet)})
            }
         }
      }

      if( settings.bHolidayStylesOn || settings.bHighlightHolidays)
      {
         if( settings.bHighlightHolidays ){
            try{ paragraphStyles.item("cal_holidayDate" + settings.styleSet).name; }
            catch (myError){
               paragraphStyles.add({name:"cal_holidayDate" + settings.styleSet, basedOn:paragraphStyles.item("cal_date" + settings.styleSet),
                  pointSize:10,
                  fillColor:colors.item("cal_holiday" + settings.styleSet) });
            }
            if( settings.bHolidayStyleA )
            {
                try{ paragraphStyles.item("cal_holidayDateA" + settings.styleSet).name; }
                catch (myError){
                   paragraphStyles.add({name:"cal_holidayDateA" + settings.styleSet, basedOn:paragraphStyles.item("cal_holidayDate" + settings.styleSet),
                      fillColor:colors.item("cal_holidayA" + settings.styleSet) });
                }
            }
            if( settings.bHolidayStyleB )
            {
                try{ paragraphStyles.item("cal_holidayDateB" + settings.styleSet).name; }
                catch (myError){
                   paragraphStyles.add({name:"cal_holidayDateB" + settings.styleSet, basedOn:paragraphStyles.item("cal_holidayDate" + settings.styleSet),
                      fillColor:colors.item("cal_holidayB" + settings.styleSet) });
                }
            }
            if( settings.bHolidayStyleC )
            {
                try{ paragraphStyles.item("cal_holidayDateC" + settings.styleSet).name; }
                catch (myError){
                   paragraphStyles.add({name:"cal_holidayDateC" + settings.styleSet, basedOn:paragraphStyles.item("cal_holidayDate" + settings.styleSet),
                      fillColor:colors.item("cal_holidayC" + settings.styleSet) });
                }
            }
            if( settings.bHolidayStyleD )
            {
                try{ paragraphStyles.item("cal_holidayDateD" + settings.styleSet).name; }
                catch (myError){
                   paragraphStyles.add({name:"cal_holidayDateD" + settings.styleSet, basedOn:paragraphStyles.item("cal_holidayDate" + settings.styleSet),
                      fillColor:colors.item("cal_holidayD" + settings.styleSet) });
                }
            }
         }

         try{ paragraphStyles.item("cal_holiday" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_holiday" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               pointSize:10,
               fillColor:colors.item("cal_holiday" + settings.styleSet) });
         }

         if( settings.bHolidayStyleA )
         {
             try{ paragraphStyles.item("cal_holidayA" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayA" + settings.styleSet, basedOn:paragraphStyles.item("cal_holiday" + settings.styleSet),
                   fillColor:colors.item("cal_holidayA" + settings.styleSet) });
             }
         }
         if( settings.bHolidayStyleB )
         {
             try{ paragraphStyles.item("cal_holidayB" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayB" + settings.styleSet, basedOn:paragraphStyles.item("cal_holiday" + settings.styleSet),
                   fillColor:colors.item("cal_holidayB" + settings.styleSet) });
             }
         }
         if( settings.bHolidayStyleC )
         {
             try{ paragraphStyles.item("cal_holidayC" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayC" + settings.styleSet, basedOn:paragraphStyles.item("cal_holiday" + settings.styleSet),
                   fillColor:colors.item("cal_holidayC" + settings.styleSet) });
             }
         }
         if( settings.bHolidayStyleD )
         {
             try{ paragraphStyles.item("cal_holidayD" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayD" + settings.styleSet, basedOn:paragraphStyles.item("cal_holiday" + settings.styleSet),
                   fillColor:colors.item("cal_holidayD" + settings.styleSet) });
             }
         }
      }

      if( settings.bWorkWeek )
      {
         try{ paragraphStyles.item("cal_workWeek" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_workWeek" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               fillColor:colors.item("cal_workWeek" + settings.styleSet) });
         }
      }

      if( settings.bMoons )
      {
         try{ paragraphStyles.item("cal_moon" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_moon" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               justification:Justification.rightAlign});
         }
      }

      if( settings.bJulianDateLayer )
      {
         try{ paragraphStyles.item("cal_julianDate" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_julianDate" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               justification:Justification.rightAlign,
               fillColor:colors.item("cal_julianDate" + settings.styleSet)});
         }
      }
      
      if( settings.bWeekDay )
      {
         try{ paragraphStyles.item("cal_weekDay" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_weekDay" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               fillColor:colors.item("cal_weekDay" + settings.styleSet)});
         }
      }

      if( settings.bPicturesLayer )
      {
         try{ paragraphStyles.item("cal_pictures" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_pictures" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               justification:Justification.centerAlign});
         }
      }

      if( settings.bBackgroundLayer )
      {
         try{ paragraphStyles.item("cal_background" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_background" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet)});
         }
      }

      if( settings.bCellStyles )
      {
         //Add cell styles
         try{ cellStyles.item("cal_base" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_base" + settings.styleSet,
               appliedParagraphStyle:paragraphStyles.item( "cal_base" + settings.styleSet )});
         }

         try{ cellStyles.item("cal_baseNoEdges" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_baseNoEdges" + settings.styleSet,
                  basedOn:cellStyles.item("cal_base" + settings.styleSet),
                  topEdgeStrokeWeight:0,
                  rightEdgeStrokeWeight:0,
                  bottomEdgeStrokeWeight:0,
                  leftEdgeStrokeWeight:0});
         }

         try{ cellStyles.item("cal_baseNoInset" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_baseNoInset" + settings.styleSet,
               basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
               bottomInset:0,
               topInset:0,
               rightInset:0,
               leftInset:0});
         }

         try{ cellStyles.item("cal_empty" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_empty" + settings.styleSet,
               basedOn:cellStyles.item("cal_base" + settings.styleSet)});
         }

         if( settings.putEmptyCellsAtEndOfLine ){
            try{ cellStyles.item("cal_empty_line1" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_empty_line1" + settings.styleSet,
                  basedOn:cellStyles.item("cal_empty" + settings.styleSet),
                  topEdgeStrokeWeight:0,
                  rightEdgeStrokeWeight:0,
               });
            }

            try{ cellStyles.item("cal_empty_line2" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_empty_line2" + settings.styleSet,
                  basedOn:cellStyles.item("cal_empty" + settings.styleSet),
                  bottomEdgeStrokeWeight:0,
                  rightEdgeStrokeWeight:0,
               });
            }
         } else {
            try{ cellStyles.item("cal_empty_line1" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_empty_line1" + settings.styleSet,
                  basedOn:cellStyles.item("cal_empty" + settings.styleSet),
                  topEdgeStrokeWeight:0,
                  leftEdgeStrokeWeight:0,
               });
            }

            try{ cellStyles.item("cal_empty_line2" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_empty_line2" + settings.styleSet,
                  basedOn:cellStyles.item("cal_empty" + settings.styleSet),
                  bottomEdgeStrokeWeight:0,
                  leftEdgeStrokeWeight:0,
               });
            }
         }

         try{ cellStyles.item("cal_date" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_date" + settings.styleSet,
               basedOn:cellStyles.item("cal_base" + settings.styleSet),
               appliedParagraphStyle:paragraphStyles.item( "cal_date" + settings.styleSet )});
         }

         try{ cellStyles.item("cal_weekday_date" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_weekday_date" + settings.styleSet,
                  basedOn:cellStyles.item("cal_date" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_weekday_date" + settings.styleSet )});
         }

         if( settings.bHighlightWeekends && !settings.bBackgroundLayer ){
            try{ cellStyles.item("cal_weekend_date" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_weekend_date" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_date" + settings.styleSet),
                     fillColor:colors.item("cal_weekend_background" + settings.styleSet),
                     appliedParagraphStyle:paragraphStyles.item( "cal_weekend_date" + settings.styleSet )});
            }
         } else {
            try{ cellStyles.item("cal_weekend_date" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_weekend_date" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_date" + settings.styleSet),
                     appliedParagraphStyle:paragraphStyles.item( "cal_weekend_date" + settings.styleSet )});
            }
         }

         if( settings.bIncludeStylesForEveryDay ) {
            try{ cellStyles.item("cal_monday_date" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_monday_date" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_date" + settings.styleSet),
                     appliedParagraphStyle:paragraphStyles.item( "cal_monday_date" + settings.styleSet )});
            }
            try{ cellStyles.item("cal_tuesday_date" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_tuesday_date" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_date" + settings.styleSet),
                     appliedParagraphStyle:paragraphStyles.item( "cal_tuesday_date" + settings.styleSet )});
            }
            try{ cellStyles.item("cal_wednesday_date" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_wednesday_date" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_date" + settings.styleSet),
                     appliedParagraphStyle:paragraphStyles.item( "cal_wednesday_date" + settings.styleSet )});
            }
            try{ cellStyles.item("cal_thursday_date" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_thursday_date" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_date" + settings.styleSet),
                     appliedParagraphStyle:paragraphStyles.item( "cal_thursday_date" + settings.styleSet )});
            }
            try{ cellStyles.item("cal_friday_date" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_friday_date" + settings.styleSet,
                     basedOn:cellStyles.item("cal_weekday_date" + settings.styleSet),
                     appliedParagraphStyle:paragraphStyles.item( "cal_friday_date" + settings.styleSet )});
            }
         }


         if( settings.bIncludeStylesForEveryDay || settings.bHighlightWeekends || settings.bHighlightSaturdays || settings.bHighlightSundays ) {
            if( settings.bHighlightSaturdays && ! (settings.bHighlightWeekends || settings.bBackgroundLayer ) ){
               try{ cellStyles.item("cal_saturday_date" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_saturday_date" + settings.styleSet,
                        basedOn:cellStyles.item("cal_weekend_date" + settings.styleSet),
                        appliedParagraphStyle:paragraphStyles.item( "cal_saturday_date" + settings.styleSet ),
                        fillColor:colors.item("cal_saturday_background" + settings.styleSet) });
               }
            } else {
               try{ cellStyles.item("cal_saturday_date" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_saturday_date" + settings.styleSet,
                        appliedParagraphStyle:paragraphStyles.item( "cal_saturday_date" + settings.styleSet ),
                        basedOn:cellStyles.item("cal_weekend_date" + settings.styleSet) });
               }
            } 
  
            if( settings.bHighlightSundays && !(settings.bHighlightWeekends || settings.bBackgroundLayer) ){
               try{ cellStyles.item("cal_sunday_date" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_sunday_date" + settings.styleSet,
                        basedOn:cellStyles.item("cal_weekend_date" + settings.styleSet),
                        appliedParagraphStyle:paragraphStyles.item( "cal_sunday_date" + settings.styleSet ),
                        fillColor:colors.item("cal_sunday_background" + settings.styleSet) });
               }
            } else {
               try{ cellStyles.item("cal_sunday_date" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_sunday_date" + settings.styleSet,
                        appliedParagraphStyle:paragraphStyles.item( "cal_sunday_date" + settings.styleSet ),
                        basedOn:cellStyles.item("cal_weekend_date" + settings.styleSet) });
               }
            }
         }

         if( settings.bHighlightHolidays )
         {
             try{ cellStyles.item("cal_holidayDate" + settings.styleSet).name; }
             catch (myError){
                cellStyles.add({name:"cal_holidayDate" + settings.styleSet,
                   basedOn:cellStyles.item("cal_weekday_date" + settings.styleSet),
                   appliedParagraphStyle:paragraphStyles.item( "cal_holidayDate" + settings.styleSet )});
             }
             if( settings.bHolidayStyleA )
             {
                try{ cellStyles.item("cal_holidayDateA" + settings.styleSet).name; }
                catch (myError){
                   cellStyles.add({name:"cal_holidayDateA" + settings.styleSet,
                      basedOn:cellStyles.item("cal_holidayDate" + settings.styleSet),
                      appliedParagraphStyle:paragraphStyles.item( "cal_holidayDateA" + settings.styleSet )});
                }
             }
             if( settings.bHolidayStyleB )
             {
                try{ cellStyles.item("cal_holidayDateB" + settings.styleSet).name; }
                catch (myError){
                   cellStyles.add({name:"cal_holidayDateB" + settings.styleSet,
                      basedOn:cellStyles.item("cal_holidayDate" + settings.styleSet),
                      appliedParagraphStyle:paragraphStyles.item( "cal_holidayDateB" + settings.styleSet )});
                }
             }
             if( settings.bHolidayStyleC )
             {
                try{ cellStyles.item("cal_holidayDateC" + settings.styleSet).name; }
                catch (myError){
                   cellStyles.add({name:"cal_holidayDateC" + settings.styleSet,
                      basedOn:cellStyles.item("cal_holidayDate" + settings.styleSet),
                      appliedParagraphStyle:paragraphStyles.item( "cal_holidayDateC" + settings.styleSet )});
                }
             }
             if( settings.bHolidayStyleD )
             {
                try{ cellStyles.item("cal_holidayDateD" + settings.styleSet).name; }
                catch (myError){
                   cellStyles.add({name:"cal_holidayDateD" + settings.styleSet,
                      basedOn:cellStyles.item("cal_holidayDate" + settings.styleSet),
                      appliedParagraphStyle:paragraphStyles.item( "cal_holidayDateD" + settings.styleSet )});
                }
             }
         }

         if( settings.bTextLayer )
         {
            try{ cellStyles.item("cal_text" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_text" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_text" + settings.styleSet )
                  });
            }
         }
        
         if( settings.bWorkWeek )
         {
            try{ cellStyles.item("cal_workWeek" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_workWeek" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  topInset:"1p6",
                  appliedParagraphStyle:paragraphStyles.item( "cal_workWeek" + settings.styleSet )});
            }
         }

         if( settings.bHolidaysLayer )
         {
            try{ cellStyles.item("cal_holiday" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_holiday" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_holiday"  + settings.styleSet),
                  verticalJustification:VerticalJustification.BOTTOM_ALIGN});
            }
         }
         if( settings.bHolidayStyleA && settings.bHolidaysLayerA )
         {
            try{ cellStyles.item("cal_holidayA" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_holidayA" + settings.styleSet,
                  basedOn:cellStyles.item("cal_holiday" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_holidayA"  + settings.styleSet) });
             }
         }
         if( settings.bHolidayStyleB && settings.bHolidaysLayerB )
         {
            try{ cellStyles.item("cal_holidayB" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_holidayB" + settings.styleSet,
                  basedOn:cellStyles.item("cal_holiday" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_holidayB"  + settings.styleSet) });
            }
         }
         if( settings.bHolidayStyleC && settings.bHolidaysLayerC )
         {
            try{ cellStyles.item("cal_holidayC" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_holidayC" + settings.styleSet,
                  basedOn:cellStyles.item("cal_holiday" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_holidayC"  + settings.styleSet) });
            }
         }
         if( settings.bHolidayStyleD && settings.bHolidaysLayerD)
         {
            try{ cellStyles.item("cal_holidayD" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_holidayD" + settings.styleSet,
                  basedOn:cellStyles.item("cal_holiday" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_holidayD"  + settings.styleSet) });
            }
         }

         if( settings.bJulianDateLayer )
         {
            try{ cellStyles.item("cal_julianDate" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_julianDate" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  topInset:"1p6",
                  appliedParagraphStyle:paragraphStyles.item( "cal_julianDate"  + settings.styleSet)
                  });
            }
         }

         if( settings.bWeekDay )
         {
            try{ cellStyles.item("cal_weekDay" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_weekDay" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  topInset:"1p6",
                  appliedParagraphStyle:paragraphStyles.item( "cal_weekDay"  + settings.styleSet)
                  });
            }
         }

         if( settings.bMoons )
         {
            try{ cellStyles.item("cal_moon" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_moon" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_moon"  + settings.styleSet),
                  verticalJustification:VerticalJustification.TOP_ALIGN});
            }
         }

         if( settings.bPicturesLayer )
         {
            try{ cellStyles.item("cal_pictures" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_pictures" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoInset" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_pictures" + settings.styleSet ),
                  verticalJustification:VerticalJustification.TOP_ALIGN});
            }
         }

         if( settings.bBackgroundLayer )
         {
            try{ cellStyles.item("cal_background" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_background" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoInset" + settings.styleSet),
                  fillColor:colors.item("cal_background" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_background" + settings.styleSet )});
            }

            if( settings.bHighlightWeekends ){
               try{ cellStyles.item("cal_weekend_date_background" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_weekend_date_background" + settings.styleSet,
                        basedOn:cellStyles.item("cal_background" + settings.styleSet),
                        fillColor:colors.item("cal_highlightedBackground" + settings.styleSet) });
               }
            } else {
               try{ cellStyles.item("cal_weekend_date_background" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_weekend_date_background" + settings.styleSet,
                        basedOn:cellStyles.item("cal_background" + settings.styleSet) });
               }
            }

            if( settings.bHighlightSaturdays || settings.bIncludeStylesForEveryDay ){
               try{ cellStyles.item("cal_saturday_date_background" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_saturday_date_background" + settings.styleSet,
                        basedOn:cellStyles.item("cal_weekend_date_background" + settings.styleSet),
                        fillColor:colors.item("cal_highlightedBackground" + settings.styleSet) });
               }
            } else {
               try{ cellStyles.item("cal_saturday_date_background" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_saturday_date_background" + settings.styleSet,
                        basedOn:cellStyles.item("cal_weekend_date_background" + settings.styleSet) });
               }

            }

            if( settings.bHighlightSundays || settings.bIncludeStylesForEveryDay ){
               try{ cellStyles.item("cal_sunday_date_background" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_sunday_date_background" + settings.styleSet,
                        basedOn:cellStyles.item("cal_weekend_date_background" + settings.styleSet),
                        fillColor:colors.item("cal_highlightedBackground" + settings.styleSet) });
               }
            } else {
               try{ cellStyles.item("cal_sunday_date_background" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_sunday_date_background" + settings.styleSet,
                        basedOn:cellStyles.item("cal_weekend_date_background" + settings.styleSet) });
               }
            }

            if( settings.bIncludeStylesForEveryDay ){
               try{ cellStyles.item("cal_weekday_date_background" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_weekday_date_background" + settings.styleSet,
                        basedOn:cellStyles.item("cal_background" + settings.styleSet) });
               }
               try{ cellStyles.item("cal_monday_date_background" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_monday_date_background" + settings.styleSet,
                        basedOn:cellStyles.item("cal_weekday_date_background" + settings.styleSet) });
               }
               try{ cellStyles.item("cal_tuesday_date_background" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_tuesday_date_background" + settings.styleSet,
                        basedOn:cellStyles.item("cal_weekday_date_background" + settings.styleSet) });
               }
               try{ cellStyles.item("cal_wednesday_date_background" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_wednesday_date_background" + settings.styleSet,
                        basedOn:cellStyles.item("cal_weekday_date_background" + settings.styleSet) });
               }
               try{ cellStyles.item("cal_thursday_date_background" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_thursday_date_background" + settings.styleSet,
                        basedOn:cellStyles.item("cal_weekday_date_background" + settings.styleSet) });
               }
               try{ cellStyles.item("cal_friday_date_background" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_friday_date_background" + settings.styleSet,
                        basedOn:cellStyles.item("cal_weekday_date_background" + settings.styleSet) });
               }
            }
            if( settings.bHighlightHolidays && settings.bHolidayStylesOn ){
               try{ cellStyles.item("cal_holidayDate_background" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"cal_holidayDate_background" + settings.styleSet,
                     basedOn:cellStyles.item("cal_background" + settings.styleSet),
                     fillColor:colors.item("cal_highlightedBackground" + settings.styleSet) });
               }
               if( settings.bHolidayStyleA )
               {
                  try{ cellStyles.item("cal_holidayDateA_background" + settings.styleSet).name; }
                  catch (myError){
                     cellStyles.add({name:"cal_holidayDateA_background" + settings.styleSet,
                        basedOn:cellStyles.item("cal_holidayDate_background" + settings.styleSet),
                        fillColor:colors.item("cal_highlightedBackground" + settings.styleSet) });
                  }
               }
               if( settings.bHolidayStyleB )
               {
                  try{ cellStyles.item("cal_holidayDateB_background" + settings.styleSet).name; }
                  catch (myError){
                     cellStyles.add({name:"cal_holidayDateB_background" + settings.styleSet,
                        basedOn:cellStyles.item("cal_holidayDate_background" + settings.styleSet),
                        fillColor:colors.item("cal_highlightedBackground" + settings.styleSet) });
                  }
               }
               if( settings.bHolidayStyleC )
               {
                  try{ cellStyles.item("cal_holidayDateC_background" + settings.styleSet).name; }
                  catch (myError){
                     cellStyles.add({name:"cal_holidayDateC_background" + settings.styleSet,
                        basedOn:cellStyles.item("cal_holidayDate_background" + settings.styleSet),
                        fillColor:colors.item("cal_highlightedBackground" + settings.styleSet) });
                  }
               }
               if( settings.bHolidayStyleD )
               {
                  try{ cellStyles.item("cal_holidayDateD_background" + settings.styleSet).name; }
                  catch (myError){
                     cellStyles.add({name:"cal_holidayDateD_background" + settings.styleSet,
                        basedOn:cellStyles.item("cal_holidayDate_background" + settings.styleSet),
                        fillColor:colors.item("cal_highlightedBackground" + settings.styleSet) });
                  }
               }
            }
         }
      }

      // Table Styles
      try{ tableStyles.item("cal_date" + settings.styleSet).name; }
      catch (myError){
         tableStyles.add({name:"cal_date" + settings.styleSet});
      }

      if( settings.bTextLayer )
      {
          try{ tableStyles.item("cal_text" + settings.styleSet).name; }
          catch (myError){
              tableStyles.add({name:"cal_text" + settings.styleSet});
          }
      }

      if( settings.bHolidaysLayer )
      {
          try{ tableStyles.item("cal_holiday" + settings.styleSet).name; }
          catch (myError){
             tableStyles.add({name:"cal_holiday" + settings.styleSet});
          }
      }

      if( settings.bJulianDateLayer )
      {
          try{ tableStyles.item("cal_julianDate" + settings.styleSet).name; }
          catch (myError){
             tableStyles.add({name:"cal_julianDate" + settings.styleSet});
          }
      }
        
      if( settings.bWorkWeek )
      {
          try{ tableStyles.item("cal_workWeek" + settings.styleSet).name; }
          catch (myError){
             tableStyles.add({name:"cal_workWeek" + settings.styleSet});
          }
      }

      if( settings.bWeekDay )
      {
          try{ tableStyles.item("cal_weekDay" + settings.styleSet).name; }
          catch (myError){
             tableStyles.add({name:"cal_weekDay" + settings.styleSet});
          }
      }

      if( settings.bPicturesLayer )
      { try{ tableStyles.item("cal_pictures" + settings.styleSet).name; }
          catch (myError){
             tableStyles.add({name:"cal_pictures" + settings.styleSet});
          }
      }

      if( settings.bBackgroundLayer )
      {
          try{ tableStyles.item("cal_background" + settings.styleSet).name; }
          catch (myError){
             tableStyles.add({name:"cal_background" + settings.styleSet});
          }
      }

      if( settings.bMoons )
      {
          try{ tableStyles.item("cal_moon" + settings.styleSet).name; }
          catch (myError){
             tableStyles.add({name:"cal_moon" + settings.styleSet});
          }
      }

      // Object Styles (CS4 and later)
      if( settings.bObjectStyles ){
         if( settings.bMoons ){
            moonObjectStyles( settings );
         }

         customFrameObjectStyles( settings );
         backgroundLayerObjectStyles( settings );
      }

   }
   return;
}
// --------------------------------------------------------------- //
function backgroundLayerObjectStyles( settings ){
   with(settings.currentDocument){
      if( settings.bBackgroundLayer ){
         try{ objectStyles.item("cal_backgroundLayer" + settings.styleSet).name; }
         catch (myError){ 
            objectStyles.add({name:"cal_backgroundLayer" + settings.styleSet,
                              enableStroke: false });
         }
      }
   }
}
// --------------------------------------------------------------- //
function customFrameObjectStyles( settings ){
   with(settings.currentDocument){
      if( settings.bIncludeMonthName || settings.bIncludeYear || settings.bUseCustomMonthFrameSize || settings.bUseCustomYearFrameSize || settings.bAddPictureFrame ){
         try{ objectStyles.item("cal_customFrame" + settings.styleSet).name; }
         catch (myError){ 
            objectStyles.add({name:"cal_customFrame" + settings.styleSet,
                              enableStroke: false });
         }
      }

      if( settings.bUseCustomMonthFrameSize || settings.bIncludeMonthName ){
         try{ objectStyles.item("cal_customMonthFrame" + settings.styleSet).name; }
         catch (myError){ 
            objectStyles.add({name:"cal_customMonthFrame" + settings.styleSet,
                              basedOn: objectStyles.item( "cal_customFrame" + settings.styleSet ),
                              enableStroke: false });
         }
      }

      if( settings.bUseCustomYearFrameSize || settings.bIncludeYear ){
         if( settings.bUseCustomMonthFrameSize || settings.bIncludeMonthName ){
            try{ objectStyles.item("cal_customYearFrame" + settings.styleSet).name; }
            catch (myError){ 
               objectStyles.add({name:"cal_customYearFrame" + settings.styleSet,
                                 basedOn: objectStyles.item( "cal_customMonthFrame" + settings.styleSet ),
                                 enableStroke: false });
            }
         } else {
            try{ objectStyles.item("cal_customYearFrame" + settings.styleSet).name; }
            catch (myError){ 
               objectStyles.add({name:"cal_customYearFrame" + settings.styleSet,
                                 basedOn: objectStyles.item( "cal_customFrame" + settings.styleSet ),
                                 enableStroke: false });
            }
         }
      }

      if( settings.bAddPictureFrame ){
         try{ objectStyles.item("cal_customPictureFrame" + settings.styleSet).name; }
         catch (myError){ 
            objectStyles.add({name:"cal_customPictureFrame" + settings.styleSet,
                              basedOn: objectStyles.item( "cal_customFrame" + settings.styleSet ),
                              enableStroke: false });
         }
      }
   }
   return
}
// --------------------------------------------------------------- //
function moonObjectStyles( settings ){
   with(settings.currentDocument){
      if( settings.bMoons ){
         try{ objectStyles.item("cal_litMoon" + settings.styleSet).name; }
         catch (myError){ 
            objectStyles.add({name:"cal_litMoon" + settings.styleSet,
                              fillColor: colors.item("cal_litMoonFillColor" + settings.styleSet),
                              enableFill: true,
                              strokeColor: colors.item("cal_litMoonStrokeColor" + settings.styleSet),
                              enableStroke: true,
                             });
         }
         try{ objectStyles.item("cal_shadowMoon" + settings.styleSet).name; }
         catch (myError){ 
            objectStyles.add({name:"cal_shadowMoon" + settings.styleSet,
                              fillColor: colors.item("cal_shadowMoonFillColor" + settings.styleSet),
                              enableFill: true,
                              strokeColor: colors.item("cal_shadowMoonStrokeColor" + settings.styleSet),
                              enableStroke: true,
                             });
         }
         // not clear why, but need to re-specify the parameters even though
         // the parent style defines them.
         try{ objectStyles.item("cal_litHalfMoon" + settings.styleSet).name; }
         catch (myError){ 
            objectStyles.add({name:"cal_litHalfMoon" + settings.styleSet,
                              basedOn: objectStyles.item( "cal_litMoon" + settings.styleSet ),
                              fillColor: colors.item("cal_litMoonFillColor" + settings.styleSet),
                              enableFill: true,
                              strokeColor: colors.item("cal_litHalfMoonStrokeColor" + settings.styleSet),
                              enableStroke: true,
                             });
         }
         try{ objectStyles.item("cal_shadowHalfMoon" + settings.styleSet).name; }
         catch (myError){ 
            objectStyles.add({name:"cal_shadowHalfMoon" + settings.styleSet,
                              basedOn: objectStyles.item( "cal_shadowMoon" + settings.styleSet ),
                              fillColor: colors.item("cal_shadowMoonFillColor" + settings.styleSet),
                              enableFill: true,
                              strokeColor: colors.item("cal_shadowHalfMoonStrokeColor" + settings.styleSet),
                              enableStroke: true,
                             });
         }
      }
   }
}
// --------------------------------------------------------------- //
function moonColors( settings ){
   with(settings.currentDocument){
      if( settings.bMoons ){
         try{ colors.item("cal_litMoonStrokeColor" + settings.styleSet).name; }
         catch (myError){ 
            if( settings.sColorSpace == 'CMYK' ){
               colors.add({name:"cal_litMoonStrokeColor" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0, 0, 0, 100]});
            } else if ( settings.sColorSpace == 'RBG' ){
               colors.add({name:"cal_litMoonStrokeColor" + settings.styleSet, space:ColorSpace.rgb, colorValue:[0, 0, 0]});
            } else {
               colors.add({name:"cal_litMoonStrokeColor" + settings.styleSet, space:ColorSpace.lab, colorValue:[0, -128, 0]});
            }
         }
         try{ colors.item("cal_litMoonFillColor" + settings.styleSet).name; }
         catch (myError){ 
            if( settings.sColorSpace == 'CMYK' ){
               colors.add({name:"cal_litMoonFillColor" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[1.52,0,25.85,0]});
            } else if ( settings.sColorSpace == 'RBG' ){
               colors.add({name:"cal_litMoonFillColor" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,255,200]});
            } else {
               colors.add({name:"cal_litMoonFillColor" + settings.styleSet, space:ColorSpace.lab, colorValue:[99,-7,26]});
            }
         }
         try{ colors.item("cal_shadowMoonStrokeColor" + settings.styleSet).name; }
         catch (myError){ 
            if( settings.sColorSpace == 'CMYK' ){
               colors.add({name:"cal_shadowMoonStrokeColor" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,100]});
            } else if ( settings.sColorSpace == 'RBG' ){
               colors.add({name:"cal_shadowMoonStrokeColor" + settings.styleSet, space:ColorSpace.rgb, colorValue:[0,0,0]});
            } else {
               colors.add({name:"cal_shadowMoonStrokeColor" + settings.styleSet, space:ColorSpace.lab, colorValue:[0,-128,0]});
            }
         }
         try{ colors.item("cal_shadowMoonFillColor" + settings.styleSet).name; }
         catch (myError){ 
            if( settings.sColorSpace == 'CMYK' ){
               colors.add({name:"cal_shadowMoonFillColor" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,100]});
            } else if ( settings.sColorSpace == 'RBG' ){
               colors.add({name:"cal_shadowMoonFillColor" + settings.styleSet, space:ColorSpace.rgb, colorValue:[0,0,0]});
            } else {
               colors.add({name:"cal_shadowMoonFillColor" + settings.styleSet, space:ColorSpace.lab, colorValue:[0,-128,0]});
            }
         }
         try{ colors.item("cal_litHalfMoonStrokeColor" + settings.styleSet).name; }
         catch (myError){ 
            if( settings.sColorSpace == 'CMYK' ){
               colors.add({name:"cal_litHalfMoonStrokeColor" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[1.52,0,25.85,0]});
            } else if ( settings.sColorSpace == 'RBG' ){
               colors.add({name:"cal_litHalfMoonStrokeColor" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,255,200]});
            } else {
               colors.add({name:"cal_litHalfMoonStrokeColor" + settings.styleSet, space:ColorSpace.lab, colorValue:[99,-7,26]});
            }
         }
         try{ colors.item("cal_shadowHalfMoonStrokeColor" + settings.styleSet).name; }
         catch (myError){ 
            if( settings.sColorSpace == 'CMYK' ){
               colors.add({name:"cal_shadowHalfMoonStrokeColor" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,100]});
            } else if ( settings.sColorSpace == 'RBG' ){
               colors.add({name:"cal_shadowHalfMoonStrokeColor" + settings.styleSet, space:ColorSpace.rgb, colorValue:[0,0,0]});
            } else {
               colors.add({name:"cal_shadowHalfMoonStrokeColor" + settings.styleSet, space:ColorSpace.lab, colorValue:[0,-128,0]});
            }
         }
      }
   }
   return;
}
// --------------------------------------------------------------- //
