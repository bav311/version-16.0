function saveScriptUiPreset( settings, mainWindow, automatic )
{
   var preset;
   var indexToSelect = 0;
   var i;
   var newPreset;
   var bSaveFile = false;
   var bSavedUnits = false;
   var bSaveUnits  = false;

   if( automatic ){
      mainWindow.saveAsDefault = { 'value':false };
      mainWindow.saveFullPreset = false;
      preset = settings.lastRunPreset;
   } else {
      newPreset = stripSpaces( mainWindow.newPresetName.text );
      if( newPreset.match( settings.nonSpaceRegExp ) ){
         preset = new File( settings.userPresetsDirectory + "/" + newPreset + ".txt" );
      }
   
      if( mainWindow.saveAsDefault.value ){
         preset = settings.defaultPreset;
      }
      
      if( preset != null ){
         if( !preset.exists ){
            bSaveFile = true;
         } else if( confirmFileOverwrite( settings, mainWindow, preset.displayName ) == 1 ){
            bSaveFile = true;
         }
      }
   }

   if( preset != null ){
      if( settings.bWindows ){
         preset.lineFeed = "Windows";
      } else {
         preset.lineFeed = "Unix";
      }
      if( preset.open( 'w' )){
         preset.writeln( "# Calendar Wizard Preset File" );
         preset.writeln( "#" );
         preset.writeln( "# Calendar Wizard Version: " + settings.versionString );
         preset.writeln( "# Adobe InDesign Version: " + app.version );
         preset.writeln( "# Operating System: " + $.os );
         preset.writeln( "#" );
         preset.writeln( "# Lines staring with a '#' symbol are comments" );
         preset.writeln( "" );
         preset.writeln( "" );

         
         //if( mainWindow.saveAsDefault.value ){
         if( mainWindow.saveFullPreset 
             || settings.bGridCalendar && settings.initialCalendarType != 'Grid'
             || settings.bListCalendar && settings.initialCalendarType != 'List'
             || settings.bLineCalendar && settings.initialCalendarType != 'Line' ){

            preset.writeln( "# Calendar Type" );
            preset.writeln( "# -------------" );
            preset.writeln( "#   Grid" );
            preset.writeln( "#   List" );
            preset.writeln( "#   Line" );
            if( settings.bListCalendar ){
               preset.writeln( "Calendar Type = List" );
            } else if ( settings.bLineCalendar ){
               preset.writeln( "Calendar Type = Line" );
            } else {
               preset.writeln( "Calendar Type = Grid" );
            }
            preset.writeln( "" );
         } 

         if( mainWindow.saveFullPreset || settings.useYearEntry != settings.useYearEntryInitial ){
            preset.writeln( "# Use Year Entry" );
            preset.writeln( "# -------------" );
            preset.writeln( "#   Either true of false" );
            if( settings.useYearEntry ){
               preset.writeln( "Use Year Entry = true" );
            } else {
               preset.writeln( "Use Year Entry = false" );
            }
            preset.writeln( "" );
         }

         var abcd = [ 'A', 'B', 'C', 'D' ];
         for( j = 0; j < abcd.length; j++ ){
            key = abcd[j];
            if( mainWindow[ 'loadHolidayFromCurrentFrame' + key ].value ){
               if( mainWindow.saveFullPreset || settings.initialHolidayFromCurrentFrameValue != key ){
                  preset.writeln( "Get Holidays From Current Frame = " + key );
                  preset.writeln( "" );
               }
            }
            if( mainWindow[ 'loadHolidayFromCustomFile' + key ].value ){
               if( mainWindow.saveFullPreset || settings.initialHolidayFromCustomFileValue != key ){
                  preset.writeln( "Get Holidays From Custom File = " + key );
                  preset.writeln( "" );
               }
            }
         }
    
         preset.writeln( "# Holidays" );
         preset.writeln( "# --------" );
         for( i = 0; i < settings.holidayFiles.length; i++ ){
            for( j = 0; j < abcd.length; j++ ){
               key = abcd[j];
               if( mainWindow[ 'holidaySelectors' + key ][i].value ){
                  if( mainWindow.saveFullPreset || !isDefaultHolidayFileSetting( settings, mainWindow, settings.holidayFilesShort[i], key ) ){
                     preset.writeln( "Get Holidays From File = " + settings.holidayFilesShort[i] + ":" + key );
                     preset.writeln( "" );
                  }
               }
            }
         }
         preset.writeln( "" );

         for( key in settings.widgitValues ){

            // save the index to preserve the concept of "current year"
            // offset so the preset index of 0 is the current year.
            if( key == 'startYearDisabled' || key == 'endYearDisabled' ){
               if( mainWindow.saveFullPreset || settings.widgitValues[key].initial != mainWindow[key].selection.index ){
                  preset.writeln( settings.widgitValues[key].presetHelp );
                  preset.writeln( settings.widgitValues[key].presetKey + " = " + (mainWindow[key].selection.index - settings.widgitValues[key].offset) );
                  preset.writeln( "" );
               }
            }
            else if( settings.widgitValues[key].type == 'dropdown' ){
               if( mainWindow.saveFullPreset || settings.widgitValues[key].initial != mainWindow[key].selection.index ){
                  preset.writeln( settings.widgitValues[key].presetHelp );

                  // note to self, it would be a lot easier to just set the value to 
                  // mainWindow[key].selection.text; however, for the language parameter the
                  // text in the dropdown widgit have nasty chinese and arabic characters
                  // that mess up the preset, so I'm pulling the 'cleaned' up version from the
                  // primary values array in the widgitValues object.  Since this works for
                  // everyting, it's the way it done to reduce an if/then case for the language.
                  preset.writeln( settings.widgitValues[key].presetKey + " = " + settings.widgitValues[key].values[mainWindow[key].selection.index] );
                  preset.writeln( "" );
               }
            }
            else if( settings.widgitValues[key].type == 'checkbox' ){
               if( mainWindow.saveFullPreset || settings.widgitValues[key].initial != mainWindow[key].value ){
                  if( settings.widgitValues[key].unitDependant ){
                     bSaveUnits = true;
                  }
                  preset.writeln( settings.widgitValues[key].presetHelp );
                  preset.writeln( settings.widgitValues[key].presetKey + " = " + booleanToString( mainWindow[key].value ) );
                  preset.writeln( "" );
               }
            }
            else if( settings.widgitValues[key].type == 'text' ){
               if( mainWindow.saveFullPreset || settings.widgitValues[key].initial != mainWindow[key].text ){
                  if( key == 'documentUnitOptions' ){
                     bSavedUnits = true;
                  }
                  if( settings.widgitValues[key].unitDependant ){
                     bSaveUnits = true;
                  }
                  preset.writeln( settings.widgitValues[key].presetHelp );
                  preset.writeln( settings.widgitValues[key].presetKey + " = " + mainWindow[key].text );
                  preset.writeln( "" );
               } 
            }
            else if( settings.widgitValues[key].type == 'boolean-settings' ){
               if( mainWindow.saveFullPreset || settings.widgitValues[key].initial != settings[ settings.widgitValues[key].settingsKey ] ){
                  if( settings.widgitValues[key].unitDependant ){
                     bSaveUnits = true;
                  }
                  preset.writeln( settings.widgitValues[key].presetHelp );
                  preset.writeln( settings.widgitValues[key].presetKey + " = " + booleanToString( settings[ settings.widgitValues[key].settingsKey] ) );
                  preset.writeln( "" );
               }
            }
            else if( settings.widgitValues[key].type == 'list-settings' ){
               if( mainWindow.saveFullPreset || settings.widgitValues[key].initial != settings[ settings.widgitValues[key].settingsKey ] ){
                  if( settings.widgitValues[key].unitDependant ){
                     bSaveUnits = true;
                  }
                  preset.writeln( settings.widgitValues[key].presetHelp );

                  // note to self, it would be a lot easier to just set the value to 
                  // mainWindow[key].selection.text; however, for the language parameter the
                  // text in the dropdown widgit have nasty chinese and arabic characters
                  // that mess up the preset, so I'm pulling the 'cleaned' up version from the
                  // primary values array in the widgitValues object.  Since this works for
                  // everyting, it's the way it done to reduce an if/then case for the language.
                  preset.writeln( settings.widgitValues[key].presetKey + " = " + settings.widgitValues[key].values[ settings[ settings.widgitValues[key].settingsKey ] ] );
                  preset.writeln( "" );
               }
            }
         } 

         if( bSaveUnits && !bSavedUnits ){
            preset.writeln( settings.widgitValues['documentUnitOptions'].presetHelp );
            preset.writeln( settings.widgitValues['documentUnitOptions'].presetKey + " = " + settings.widgitValues['documentUnitOptions'].values[mainWindow['documentUnitOptions'].selection.index] );
            preset.writeln( "" );
         }


         preset.close( );
         setPresetNameWidget( settings, mainWindow, newPreset );
      }
   } 

   if( mainWindow.saveAsDefault.value ){
      mainWindow.saveAsDefault.value = false;
   }
}
// --------------------------------------------------------------- //
function isDefaultHolidayFileSetting( settings, mainWindow, holidayFile, key ){
   var i;
   var bFlag = false;

   for( i = 0; i < settings.initialHolidayFiles.length; i++ ){
      if( settings.initialHolidayFiles[i].file == holidayFile && settings.initialHolidayFile[i].style == key ){
         bFlag = true;
         break;
      }
   }
   return bFlag;
}
// --------------------------------------------------------------- //
function loadScriptUiPreset( settings, mainWindow )
{
   var index;
   var presetFiles;
   var presetFile;
   var loadingDefaults = false;

   presetFiles = settings.presetFiles;
   index = mainWindow.presetDropdown.selection.index - 1;

   if( index >= 0 && index < presetFiles.length ){
      presetFile = new File( presetFiles[ index ] );
   }
  
   return loadSelectedScriptUiPreset( presetFile, settings, mainWindow, loadingDefaults )
}
// --------------------------------------------------------------- //
function loadSelectedScriptUiPreset( presetFile, settings, mainWindow, loadingDefaults )
{
   var i;
   var presets;
   var keyValue;
   var key;
   var value;
   var cleanValue;
   var j;
   var widgitName;
   var widgitKeyMap;
   var widgit;
   var holidaysKeyRegExp = new RegExp( 'Get Holidays From.*' );
   var abcd = ['A', 'B', 'C', 'D'];
   var buffer;
   var holidaysFile;
   var holidaysStyle;
   var bFound;

   if( !presetFile.exists ){
      return;
   }

   var widgitKeyMap = new Object;
   for( widgitName in settings.widgitValues ){
      widgitKeyMap[ settings.widgitValues[ widgitName ].presetKey ] = widgitName;
   }

   presets = aGetPresetsFromFile( presetFile );
   for( i = 0; i < presets.length; i++ ){
      keyValue = presets[i].split( "=" );
      key   = stripSpaces( keyValue[0] );
      value = stripSpaces( keyValue[1] );     

      //alert( "Check out " + key + " with value " + value );

      // Common Presets
      if( key == 'Calendar Type' ){
         if( value == 'Line' ){
            settings.bGridCalendar = false;
            settings.bListCalendar = false;
            settings.bLineCalendar = true;
            if( loadingDefaults ){ settings.initialCalendarType = "Line"; }
         } else if( value == 'List' ){
            settings.bGridCalendar = false;
            settings.bListCalendar = true;
            settings.bLineCalendar = false;
            if( loadingDefaults ){ settings.initialCalendarType = "List"; }
         } else {
            settings.bGridCalendar = true;
            settings.bListCalendar = false;
            settings.bLineCalendar = false;
            if( loadingDefaults ){ settings.initialCalendarType = "Grid"; }
         }
      
      } else if( key == 'Use Year Entry' ){
         if( value == "true" ){
            settings.useYearEntry = true;
         } else {
            settings.useYearEntry = false;
         }
      } else if( holidaysKeyRegExp.test( key ) ){
         for( j = 0; j < abcd.length; j++ ){
            if( key == "Get Holidays From Current Frame" && value == abcd[j] ){
               mainWindow[ "loadHolidayFromCurrentFrame" + abcd[j] ].value = true;
               if( loadingDefaults ){ settings.initialHolidayFromCurrentFrameValue = abcd[j]; }
            } else if( key == "Get Holidays From Custom File" && value == abcd[j] ){
               mainWindow[ "loadHolidayFromCustomFile" + abcd[j] ].value = true;
               if( loadingDefaults ){ settings.initialHolidayFromCustomFileValue = abcd[j]; }
            }
         }
         if( key == ("Get Holidays From File" )){
            buffer = value.split( ":" );
            holidaysFile = buffer[0];
            holidaysStyle = buffer[1];
            bFound = false;
            for( j = 0; j < settings.holidayFilesShort.length; j++ ){
               if( holidaysFile == settings.holidayFilesShort[j] ){
                  mainWindow[ "holidaySelectors" + holidaysStyle ][j].value = true;
                  bFound = true;
                  if( loadingDefaults ){ settings.initialHolidayFiles.push( { file:holidaysFile, style:holidaysStyle } ); };
               }
            }
            if( !bFound ){
               alert( "Unable to locate the holiday file \""+holidaysFile+"\" defined in the preset.  It will be ignored." );
            }
         }
      } else {
         widgitName = widgitKeyMap[ key ];
         widgit = settings.widgitValues[ widgitName ];
     
         // save the index to preserve the concept of "current year"
         // offset so the preset index of 0 is the current year.
         if( key.indexOf( "Year Index Disabled" ) > -1 ){
            mainWindow[widgitName].selection = parseInt(value) + widgit.offset;
            if( loadingDefaults ){ widgit.initial = parseInt(value) + widgit.offset; }
         }
         else if ( widgit != null ){
            if( widgit.type == 'checkbox' ){
               mainWindow[widgitName].value = bValue( value );
               if( loadingDefaults ){ widgit.initial = bValue( value ); }
            }
            else if( widgit.type == 'text' ){
               mainWindow[widgitName].text = value;
               if( loadingDefaults ){ widgit.initial = value; }
            }
            else if( widgit.type == 'dropdown' ){
               for( j = 0; j < widgit.values.length; j++ ){
                  if( value == widgit.values[j] ){
                     mainWindow[widgitName].selection = j;
                     break;
                  }
               }
               if( loadingDefaults ){ widgit.initial = j; }
            }
            else if( widgit.type == 'boolean-settings' ){
               settings[ widgit.settingsKey ] = bValue( value );
               if( loadingDefaults ){ widgit.initial = bValue( value ); }
            }
            else if( widgit.type == 'list-settings' ){
               for( j = 0; j < widgit.values.length; j++ ){
                  if( value == widgit.values[j] ){
                     settings[ widgit.settingsKey ] = j;
                     break;
                  }
               }
               if( loadingDefaults ){ widgit.initial = j; }
            }
         }
      }
   }
      
   enableRelatedControls( settings, mainWindow );
}
// --------------------------------------------------------------- //
function deleteScriptUiPreset( settings, mainWindow )
{
   var preset;
   var selectedPreset;

   selectedPreset = mainWindow.presetDropdown.selection.text;
   preset = new File( settings.userPresetsDirectory + "/" + selectedPreset + ".txt" );

   if( preset != null && preset.exists ){
      preset.remove();
   }

   setPresetNameWidget( settings, mainWindow, '' );
   return;
}
// --------------------------------------------------------------- //
function setPresetNameWidget( settings, mainWindow, selectedPreset )
{
   var i;
   var indexToSelect = 0;

   aGetPresetFiles( settings );
   mainWindow.presetDropdown.removeAll();
   for( i = 0; i < settings.presetFilesShort.length; i++ ){
      mainWindow.presetDropdown.add( 'item', settings.presetFilesShort[i] );
      if( selectedPreset == settings.presetFilesShort[i] ){
         indexToSelect = i;
      }
   }
   mainWindow.presetDropdown.selection = indexToSelect;

   return

}
