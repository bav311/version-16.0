function initializeSettings( scriptName, scriptDirectory ){
   var settings = new Object;


   settings.baseTitle         = "Adobe InDesign Calendar Wizard";
   settings.versionMajor  = 5;
   settings.versionMinor  = 0;
   settings.versionBuild  = 20;
   settings.versionString = settings.versionMajor.toString() + "." 
                          + settings.versionMinor.toString() + "." 
                          + settings.versionBuild.toString();
   settings.title = settings.baseTitle + ": " + settings.versionString;

   if( $.os.indexOf( "Windows" ) > -1 ){
     settings.bWindows = true;
     settings.bMac = false;
   } else {
     settings.bWindows = false;
     settings.bMac = true;
   }
   settings.ABCD = [ "A", "B", "C", "D" ];

   settings.scriptName             = scriptName;
   settings.scriptDirectory        = scriptDirectory;
   settings.fileNameAndPath        = scriptDirectory + "/" + scriptName;
   settings.imagesDirectory        = new Folder( settings.scriptDirectory + "/source-files/GuiImages" );
   settings.webLaunchersDirectory  = new Folder( settings.scriptDirectory + "/source-files/webLaunchers" );
   settings.holidaysRoDirectory    = new Folder( settings.scriptDirectory + "/source-files/holidays");
   settings.presetsRoDirectory     = new Folder( settings.scriptDirectory + "/source-files/presets");
   settings.userPresetsRoDirectory = new Folder( settings.presetsRoDirectory + "/userPresets");
   settings.licenseFileRo          = new File( settings.scriptDirectory + "/source-files/licensedTo.txt" );
   
   settings.dataDirectory          = new Folder( Folder.userData + "/calendarWizard" );
   settings.versionFile            = new File( settings.dataDirectory + "/Version-" + settings.versionString );
   settings.holidaysDirectory      = new Folder( settings.dataDirectory + "/holidays");
   settings.presetsDirectory       = new Folder( settings.dataDirectory + "/presets");
   settings.userPresetsDirectory   = new Folder( settings.presetsDirectory + "/userPresets");
   settings.licenseFile            = new File( settings.dataDirectory + "/licensedTo.txt" );
   
   settings.defaultPreset          = new File( settings.presetsDirectory + "/defaults.txt" );
   settings.lastRunPreset          = new File( settings.presetsDirectory + "/Previous\ Run.txt" );
   

   initalizeDataFolder( settings );

   settings.bGridCalendar = true;
   settings.bListCalendar = false;
   settings.bLineCalendar = false;
   settings.calendarTypeIndex = 1;
   settings.initialCalendarType = "Grid";

   // Default Settings
   settings.moonSize = 1/3; // percent of the cell size
   settings.iCalendarsPerPage = 1;
   settings.bImportStyles = false;
   settings.columnCount = 1;
   settings.columnGutter = 0;
   settings.dayOrdering = new Array(0, 1, 2, 3, 4, 5, 6);
   settings.bUseCustomHeightAndWidth = true;
   settings.bShowHelp = false;

   settings.bMiniCalendarGenerationError = false;
   settings.bMoonGenerationError = false;
   settings.bCalendarGenerationError = false;

   // Options
   settings.today       = new Date();
   settings.calendarCustomSizeUnitOptions = new Array( 'inches', 'points', 'centimeters' );

   settings.useYearEntry        = false;
   settings.useYearEntryInitial = settings.useYearEntry;

   // default for Grid Calendar


   // default for List Calendar
   settings.columnOrderOptions      = new Array( "Date, Day", "Day, Date" );
  

   settings.defaultDateColumnWidthInInches = 0.5;
   settings.defaultWeekDayColumnWidthInInches = 1.0;
   settings.defaultWorkWeekColumnWidthInInches = 0.60;
   settings.defaultMoonPhaseColumnWidthInInches = 0.25;
   settings.defaultDateWeekDayDelimiter = ' ';
   settings.monthFrameHeight = 1.0;
   settings.defaultYearWidth = 1/3; //percent of the calendar width

   // defaults for calendar generation
   settings.calendarSpacing           = 0.25;
   settings.calendarVerticalSpacing   = settings.calendarSpacing;
   settings.calendarHorizontalSpacing = settings.calendarSpacing;
   settings.miniCalendarSize          = new Array( "0in", "0in", "0.75in", "0.75in" ); // 0.75 inches square
   settings.workWeekCellWidth         = 0.25;

   // Used for tracking progress
   settings.calendarDateLabel       = 'calendarDates';
   settings.calendarJulianDateLabel = 'calendarJulianDate';
   settings.calendarWeekDayLabel    = 'calendarWeekDay';
   settings.calendarWorkWeekLabel   = 'calendarWorkWeek';
   settings.calendarHolidayLabel    = 'calendarHolidays';
   settings.calendarHolidayLabelA   = 'calendarHolidaysA';
   settings.calendarHolidayLabelB   = 'calendarHolidaysB';
   settings.calendarHolidayLabelC   = 'calendarHolidaysC';
   settings.calendarHolidayLabelD   = 'calendarHolidaysD';
   settings.calendarTextLabel       = 'calendarText';
   settings.calendarMoonsLabel      = 'calendarMoons';
   settings.calendarPicturesLabel   = 'calendarPictures';
   settings.calendarBackgroundLabel = 'calendarBackground';

   settings.calendarRegExp               = /calendar(Dates|JulianDate|WorkWeek|WeekDay|Holidays|Text|Moons|Pictures|Background)(.*)/;
   settings.calendarDatesRegExp          = /calendarDates(.*)/;
   settings.calendarJulianDateRegExp     = /calendarJulianDate(.*)/;
   settings.calendarWeekDayRegExp        = /calendarWeekDay(.*)/;
   settings.calendarWorkWeekRegExp       = /calendarWorkWeek(.*)/;
   settings.calendarTextRegExp           = /calendarText(.*)/;
   settings.calendarHolidaysRegExp       = /calendarHolidays(\d*)$/;
   settings.calendarHolidaysARegExp      = /calendarHolidaysA(.*)/;
   settings.calendarHolidaysBRegExp      = /calendarHolidaysB(.*)/;
   settings.calendarHolidaysCRegExp      = /calendarHolidaysC(.*)/;
   settings.calendarHolidaysDRegExp      = /calendarHolidaysD(.*)/;
   settings.calendarMoonsRegExp          = /calendarMoons(.*)/;
   settings.calendarPicturesRegExp       = /calendarPictures(.*)/;
   settings.calendarBackgroundRegExp     = /calendarBackground(.*)/;
   settings.dateWithYearHolidayRegExp    = /^\s*(\d+)\s*-\s*(\d+)\s*-\s*(\d+)\s*:\s*(.*)/;
   settings.dateWithOutYearHolidayRegExp = /^\s*(\d+)\s*-\s*(\d+)\s*:\s*(.*)/;
   settings.dateWithYearRegExp           = /^\s*(\d+)\s*-\s*(\d+)\s*-\s*(\d+)\s*/;
   settings.numberRegExp                 = /^[0-9.-]+$/;
   settings.anythingRegExp               = /./;
   settings.nonSpaceRegExp               = /\S/;
   settings.somethingRegExp              = /./;
   settings.fileNameCharactersRegExp     = /^[\w -]+$/i;
   settings.weekDayHighlight             = /(Sunday|Saturday|Weekend)/i;
   settings.holidayDateStyleApplied      = /cal_holidayDate/i;

   settings.gridCalendarHighlightedStyleRegExp = /cal_(sunday|nonMonthSunday|holidayDate|holidayDateA|holidayDateB|holidayDateC|holidayDateD)/i;
   settings.lineCalendarHighlightedStyleRegExp = /cal_(weekend_date|saturday_date|sunday_date|holidayDate|holidayDateA|holidayDateB|holidayDateC|holidayDateD)/i;

   settings.knownLayers  = new Array( "calendarDates", 
                                      "calendarWorkWeek", 
                                      "calendarWeekDay", 
                                      "calendarJulianDate", 
                                      "calendarText",
                                      "calendarHolidays", 
                                      "calendarHolidaysA", 
                                      "calendarHolidaysB", 
                                      "calendarHolidaysC", 
                                      "calendarHolidaysD", 
                                      "calendarMoons",
                                      "calendarPictures", 
                                      "calendarBackground" ); 

   settings.bHolidaysFile     = new Array();
   settings.holidayFiles      = new Array();
   settings.holidayFilesShort = new Array();


   settings.singleUseLicenseCost = '20';
   settings.enterpriseUseLicenseCost = '100';

   settings.bHighlightSundays = false;
   settings.bAddNonMonthDays  = false;
   settings.bHighlightHolidays = false;
   settings.bJulianDateLayer   = false;
   settings.bHolidaysLayer     = false;
   settings.bHolidayStyleA     = false;
   settings.bHolidayStyleB     = false;
   settings.bHolidayStyleC     = false;
   settings.bHolidayStyleD     = false;
   settings.bAddWorkWeek       = false;
   settings.bBackgroundLayer   = false;
   settings.bAddMiniCalendars  = false;
   settings.bMoons             = false;
      
   settings.sourceForgeHome     = "http://calendarwizard.sourceforge.net";
   settings.facebookHome        = "http://www.facebook.com/calendarwizard";
   settings.paypalDonate        = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7533952";
   settings.paypalSingleUse     = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=82A6TCQVNMF52";
   settings.paypalEnterpriseUse = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3B9W232DURH6U";
   settings.mailto              = "mailto:indesigncalendarwizard@gmail.com";
   settings.elleMediaGroupUrl   = "http://www.ellemediagroup.co.uk";
   
   // note, if the default is anything but blank, it will turn on 
   // work weeks by default...
   settings.gridCalendarWorkWeekPrefix = "";
   settings.listCalendarWorkWeekPrefix = "";
   settings.lineCalendarWorkWeekPrefix = "";

   settings.bLicensed = false;
   settings.licenseType = "F";
   settings.licenseKey = "";
   settings.licensedTo = "";

   settings.initialHolidayFromCurrentFrameValue = "";
   settings.initialHolidayFromCustomFileValue   = "";
   settings.initialHolidayFiles = new Array();

   widgitValues( settings )

   IdentifyInDesignVersionAndFeatures( settings );
   
   settings.bHolidaysLayerA = false;
   settings.bHolidaysLayerB = false;
   settings.bHolidaysLayerC = false;
   settings.bHolidaysLayerD = false;

   return( settings );
}
// --------------------------------------------------------------- //
function widgitValues( settings )
{
   var newLine = "\n";
   var key = null;
   var buffer;
   var bufferArray;
   var i;
   var cleanValue;
   var k;

   if( settings.bWindows ){
      newLine = "\r\n";
   }

   settings.widgitValues = new Object();

// ************ //
   settings.yearOptions = new Array();
   for( var i = -8; i <= 20; i++ ){ 
      settings.yearOptions.push( (settings.today.getFullYear()+i).toString() );
   }
   /*
   key = 'Start Year Index';  
   settings.widgitValues.startYear  = { type:       'dropdown',
                                        initial:    8,
                                        offset:     8,
                                        values:     settings.yearOptions,
                                        settingsKey:'sStartYear',
                                        presetKey:  key,
                                        presetHelp: "# " + key + newLine
                                                   +"# -------------------- " + newLine
                                                   +"#   -8 = Eight Years Ago" + newLine
                                                   +"#   ..." + newLine
                                                   +"#   0 = Current Year" + newLine
                                                   +"#   ..." + newLine
                                                   +"#   20 = Twenty Years in the Future",
                                      };
   key = 'End Year Index';  
   settings.widgitValues.endYear  = { type:       'dropdown',
                                      initial:    8,
                                      offset:     8,
                                      values:     settings.yearOptions,
                                      settingsKey:'sEndYear',
                                      presetKey:  key,
                                      presetHelp: "# " + key + newLine
                                                 +"# -------------------- " + newLine
                                                 +"#   -8 = Eight Years Ago" + newLine
                                                 +"#   ..." + newLine
                                                 +"#   0 = Current Year" + newLine
                                                 +"#   ..." + newLine
                                                 +"#   20 = Twenty Years in the Future",
                                    };
   */
   key = 'Start Year';  
   settings.widgitValues.startYear  = { type:       'dropdown',
                                        initial:    8,
                                        offset:     8,
                                        values:     settings.yearOptions,
                                        settingsKey:'sStartYear',
                                        presetKey:  key,
                                        presetHelp: "# " + key + newLine
                                                   +"# -------------------- " + newLine
                                                   +"# The script will only understand" + newLine
                                                   +"# eight years ago to 20 years in" + newLine
                                                   +"# the future" + newLine
                                      };
   key = 'End Year';  
   settings.widgitValues.endYear  = { type:       'dropdown',
                                      initial:    8,
                                      offset:     8,
                                      values:     settings.yearOptions,
                                      settingsKey:'sEndYear',
                                      presetKey:  key,
                                      presetHelp: "# " + key + newLine
                                                 +"# -------------------- " + newLine
                                                 +"# The script will only understand" + newLine
                                                 +"# eight years ago to 20 years in" + newLine
                                                 +"# the future" + newLine
                                    };
// ************ //
   key = "Custom Start Year";
   settings.widgitValues.customStartYear = { type:        'text',
                                             initial:     settings.yearOptions[8],
                                             presetKey:   key,
                                             presetHelp:  "# " + key + newLine
                                                         +"# -------------------- " + newLine
                                                         +"#   Any Year (4 digits)",
                                           };
// ************ //
   key = "Custom End Year";
   settings.widgitValues.customEndYear = { type:        'text',
                                           initial:     settings.yearOptions[8],
                                           presetKey:   key,
                                           presetHelp:  "# " + key + newLine
                                                       +"# -------------------- " + newLine
                                                       +"#   Any Year (4 digits)",
                                         };
// ************ //
   settings.monthOptions = new Array( 'January', 'February', 'March', 'April', 'May', 'June',
                                      'July', 'August', 'September', 'October', 'November', 'December');

   key = 'Start Month';  
   settings.widgitValues.startMonth  = { type:       'dropdown',
                                         initial:    settings.today.getMonth(),
                                         values:     settings.monthOptions,
                                         settingsKey:'iStartMonth',
                                         presetKey:  key,
                                         presetHelp: "# " + key + newLine
                                                    +"# -------------------- " + newLine
                                                    +validValuesText( settings.monthOptions, newLine ),
                                      };
   key = 'End Month';  
   settings.widgitValues.endMonth  = { type:       'dropdown',
                                       initial:    settings.today.getMonth(),
                                       values:     settings.monthOptions,
                                       settingsKey:'iEndMonth',
                                       presetKey:  key,
                                       presetHelp: "# " + key + newLine
                                                  +"# -------------------- " + newLine
                                                  +validValuesText( settings.monthOptions, newLine ),
                                    };
// ************ //
   // note, the presence of chinese and arabic characters throws things off, so
   // I'm using a 'cleaned' version of the name in the preset.
   key = 'Language';
   settings.languageOptions = getLanguageOptions();
   settings.languageOptionsClean = new Array();
  
   for( i = 0; i < settings.languageOptions.length; i++ ){
      cleanValue = settings.languageOptions[i];
      if( cleanValue.indexOf( "(" ) > -1 ){
         cleanValue = cleanValue.substring( 0, cleanValue.indexOf( "(" )-1 ); 
      }
      settings.languageOptionsClean.push( cleanValue );
   }
   
   settings.widgitValues.language  = { type:       'dropdown',
                                       initial:    0,
                                       values:     settings.languageOptionsClean,
                                       valuesOriginal: settings.languageOptions,
                                       presetKey:  key,
                                       presetHelp: "# " + key + newLine
                                                  +"# -------------------- " + newLine
                                                  +"#   " + settings.languageOptionsClean.join( newLine + "#   " ),
                                    };

// ************ //
   key = 'Week Day Heading Style';
   settings.headerOptions = new Array( "Auto", "Short: S", "Mid: Sun", "Full: Sunday");
   settings.widgitValues.weekDayHeadingStyle  = { type:       'dropdown',
                                                  initial:    0,
                                                  values:     settings.headerOptions,
                                                  settingsKey:'headerType',
                                                  presetKey:  key,
                                                  presetHelp: "# " + key + newLine
                                                             +"# -------------------- " + newLine
                                                             +validValuesText( settings.headerOptions, newLine ),
                                               };
// ************ //
   key = 'Week Starts On';
   settings.startDayOptions = new Array( 'Sunday', 'Monday', 'Saturday');
   settings.widgitValues.weekStartsOn = { type:       'dropdown',
                                          initial:    0,
                                          values:     settings.startDayOptions,
                                          presetKey:  key,
                                          presetHelp: "# " + key + newLine
                                                     +"# -------------------- " + newLine
                                                     +validValuesText( settings.startDayOptions, newLine ),
                                       };
 
// ************ //
   key = "Include Work Week";
   settings.widgitValues.includeWorkWeek = { type:       'checkbox',
                                             initial:    false,
                                             presetKey:  key,
                                             settingsKey:'bWorkWeek',
                                             presetHelp: "# " + key + newLine
                                                        +"# -------------------- " + newLine
                                                        +"#   Either true or false",
                                           };
// ************ //
   key = "Work Week Options"
   settings.workWeekOptions          = new Array( 'First Full Week', 'Week including Jan 4 (ISO8601)', 'Week Including Jan 1' );
   settings.widgitValues.workWeekOptions = { type:       'dropdown',
                                             initial:    0,
                                             values:     settings.workWeekOptions,
                                             presetKey:  key,
                                             presetHelp: "# " + key + newLine
                                                        +"# -------------------- " + newLine
                                                        +validValuesText( settings.workWeekOptions, newLine ),
                                           };
 
// ************ //
   key = "Work Week Prefix";
   settings.widgitValues.workWeekPrefix = { type:        'text',
                                            initial:     '',
                                            presetKey:   key,
                                            settingsKey:'workWeekPrefix',
                                            presetHelp:  "# " + key + newLine
                                                        +"# -------------------- " + newLine
                                                        +"#   Any Text",
                                          };
// ************ //
   key = "Include Moon Phase";
   settings.widgitValues.includeMoons = { type:        'checkbox',
                                          initial:     false,
                                          presetKey:   key,
                                          setttingsKey:'bMoons',
                                          presetHelp:  "# " + key + newLine
                                                      +"# -------------------- " + newLine
                                                      +"#   Either true or false",
                                        };
// ************ //
   key = "Moon Size (% of Cell)";
   settings.gridCalendarMoonSize = Math.round(1/3 * 100); // percent of the cell size
   settings.listCalendarMoonSize = Math.round(2/5 * 100); // percent of the cell size
   settings.lineCalendarMoonSize = Math.round(1/4 * 100); // percent of the cell size
   settings.widgitValues.moonSize = { type:        'text',
                                      initial:     settings.gridCalendarMoonSize,
                                      gridInitial: settings.gridCalendarMoonSize,
                                      listInitial: settings.listCalendarMoonSize,
                                      lineInitial: settings.lineCalendarMoonSize,
                                      setttingsKey:'moonSize',
                                      presetKey:   key,
                                      presetHelp:  "# " + key + newLine
                                                  +"# -------------------- " + newLine
                                                  +"#   Number between 1 and 100",
                                    };
// ************ //
   key = "Moon Rotation"
   settings.moonRotationOptions = new Array( 'Northern Hemisphere (DOC)', 'Southern Hemisphere (COD)' );
   settings.widgitValues.moonRotation = { type:       'dropdown',
                                          initial:    0,
                                          values:     settings.moonRotationOptions,
                                          presetKey:  key,
                                          presetHelp: "# " + key + newLine
                                                     +"# -------------------- " + newLine
                                                     +validValuesText( settings.moonRotationOptions, newLine ),
                                        };

// ************ //
   key = "Import Styles From Reference Calendar";
   settings.widgitValues.importStylesFromReferenceCalendar = { type:        'checkbox',
                                                               initial:     false,
                                                               presetKey:   key,
                                                               settingsKey: 'bImportStyles',
                                                               presetHelp:  "# " + key + newLine
                                                                           +"# -------------------- " + newLine
                                                                           +"#   Either true or false",
                                                              };

// ************ //
   key = "Grid Calendar Month Labeling Options";
   settings.monthIdentificationOptions = new Array( "Exclude", "Month", "Month and Year" );
   settings.widgitValues.gridCalendarMonthLabelingOptions = { type:       'dropdown',
                                                              initial:    2,
                                                              values:     settings.monthIdentificationOptions,
                                                              presetKey:  key,
                                                              presetHelp: "# " + key + newLine
                                                                         +"# -------------------- " + newLine
                                                                         +validValuesText( settings.monthIdentificationOptions, newLine ),
                                                            };
 
// ************ //
   key = "Include Mini Calendars";
   settings.widgitValues.includeMiniCalendars = { type:        'checkbox',
                                                  initial:     false,
                                                  presetKey:   key,
                                                  settingsKey: 'bAddMiniCalendars',
                                                  presetHelp:  "# " + key + newLine
                                                              +"# -------------------- " + newLine
                                                              +"#   Either true or false",
                                                };
// ************ //
   key = "Mini-Calendar Month Labeling Options";
   settings.miniCalMonthIdentificationOptions = new Array( "Auto", "Month", "Month and Year" );
   settings.widgitValues.miniCalendarMonthLabelingOptions = { type:       'dropdown',
                                                              initial:    0,
                                                              values:     settings.miniCalMonthIdentificationOptions,
                                                              presetKey:  key,
                                                              presetHelp: "# " + key + newLine
                                                                         +"# -------------------- " + newLine
                                                                         +validValuesText( settings.miniCalMonthIdentificationOptions, newLine ),
                                                            };
// ************ //
   key = "Max Number of Rows";
   settings.maxRowCountOptions            = new Array( 'Auto', '5', '6' );
   settings.widgitValues.maxNumberOfRowsOptions = { type:       'dropdown',
                                                    initial:    0,
                                                    values:     settings.maxRowCountOptions,
                                                    presetKey:  key,
                                                    presetHelp: "# " + key + newLine
                                                               +"# -------------------- " + newLine
                                                               +validValuesText( settings.maxRowCountOptions, newLine ),
                                                  };
// ************ //
   key = "Max Number of Rows in MiniCalendars";
   settings.maxRowCountInMiniCalendarsOptions            = new Array( 'Auto', '6' );
   settings.widgitValues.maxNumberOfRowsInMiniCalendarsOptions = { type:       'dropdown',
                                                                   initial:    0,
                                                                   values:     settings.maxRowCountInMiniCalendarsOptions,
                                                                   presetKey:  key,
                                                                   presetHelp: "# " + key + newLine
                                                                              +"# -------------------- " + newLine
                                                                              +validValuesText( settings.maxRowCountInMiniCalendarsOptions, newLine ),
                                                                 };
// ************ //
   key = "Include Week Day in Grid Calendars";
   settings.widgitValues.includeWeekDayInGridCalendar = { type:        'checkbox',
                                                          initial:     true,
                                                          presetKey:   key,
                                                          settingsKey: 'bWeekDay',
                                                          presetHelp:  "# " + key + newLine
                                                                      +"# -------------------- " + newLine
                                                                      +"#   Either true or false",
                                                        };
// ************ //
   key = "Include Non Month Days";
   settings.widgitValues.includeNonMonthDays = { type:        'checkbox',
                                                 initial:     false,
                                                 presetKey:   key,
                                                 settingsKey: 'bAddNonMonthDays',
                                                 presetHelp:  "# " + key + newLine
                                                             +"# -------------------- " + newLine
                                                             +"#   Either true or false",
                                               };
// ************ //
   key = "Highlight Sundays";
   settings.widgitValues.highlightSundays = { type:        'checkbox',
                                              initial:     false,
                                              presetKey:   key,
                                              settingsKey: 'bHighlightSundays',
                                              presetHelp:  "# " + key + newLine
                                                          +"# -------------------- " + newLine
                                                          +"#   Either true or false",
                                            };
// ************ //
   key = "Highlight Holidays";
   settings.widgitValues.highlightHolidays = { type:        'checkbox',
                                               initial:     false,
                                               presetKey:   key,
                                               settingsKey: 'bHighlightHolidays',
                                               presetHelp:  "# " + key + newLine
                                                           +"# -------------------- " + newLine
                                                           +"#   Either true or false",
                                             };
// ************ //
   key = "Dominant Highlight Preference";
   settings.dominantHighlighting = new Array( "Holidays", "Saturday/Sunday" );
   settings.widgitValues.dominantHighlighting = { type:       'dropdown',
                                                  initial:    0,
                                                  values:     settings.dominantHighlighting,
                                                  presetKey:  key,
                                                  presetHelp: "# " + key + newLine
                                                             +"# -------------------- " + newLine
                                                             +validValuesText( settings.dominantHighlighting, newLine ),
                                                };
// ************ //
   key = "List/Line Calendar Month Labeling Options";
   settings.monthYearOptions        = new Array( "None", "Month Only", "Month & Year (one frame)", "Month & Year (two frames)" );
   settings.widgitValues.listLineCalendarMonthLabelingOptions = { type:       'dropdown',
                                                                  initial:    2,
                                                                  values:     settings.monthYearOptions,
                                                                  presetKey:  key,
                                                                  presetHelp: "# " + key + newLine
                                                                             +"# -------------------- " + newLine
                                                                             +validValuesText( settings.monthYearOptions, newLine ),
                                                                };
// ************ //
   key = "Highlight Weekend Options";
   settings.highlightDayOptions     = new Array( "None", "Weekends", "Sunday", "Saturday" );
   settings.widgitValues.highlightWeekendOptions = { type:       'dropdown',
                                                     initial:    0,
                                                     values:     settings.highlightDayOptions,
                                                     presetKey:  key,
                                                     presetHelp: "# " + key + newLine
                                                                +"# -------------------- " + newLine
                                                                +validValuesText( settings.highlightDayOptions, newLine ),
                                                   };
// ************ //
   key = "Spacer Page";
   settings.spacerPageOptions              = new Array( "None", "Before", "After" );
   settings.widgitValues.spacerPageOptions = { type:       'dropdown',
                                                     initial:    0,
                                                     values:     settings.spacerPageOptions,
                                                     presetKey:  key,
                                                     presetHelp: "# " + key + newLine
                                                                +"# -------------------- " + newLine
                                                                +validValuesText( settings.spacerPageOptions, newLine ),
                                                   };
// ************ //
   key = "Include Cover Pages";
   settings.widgitValues.includeCoverPages = { type:        'checkbox',
                                               initial:     false,
                                               presetKey:   key,
                                               presetHelp:  "# " + key + newLine
                                                           +"# -------------------- " + newLine
                                                           +"#   Either true or false",
                                             };
// ************ //
   key = "Add Custom Picture Frame To Spacer Page";
   settings.widgitValues.addCustomPictureFrameToSpacerPage = { type:        'checkbox',
                                                               initial:     false,
                                                               presetKey:   key,
                                                               presetHelp:  "# " + key + newLine
                                                                           +"# -------------------- " + newLine
                                                                           +"#   Either true or false",
                                                             };
// ************ //
   key = "Add Custom Month/Yaer Frames To Spacer Page";
   settings.widgitValues.addCustomMonthYearFramesToSpacerPage = { type:        'checkbox',
                                                                  initial:     false,
                                                                  presetKey:   key,
                                                                  presetHelp:  "# " + key + newLine
                                                                              +"# -------------------- " + newLine
                                                                              +"#   Either true or false",
                                                                };   
// ************ //
   key = "Include Styles For Every Day";
   settings.widgitValues.includeStylesForEveryDay = { type:        'checkbox',
                                                      initial:     false,
                                                      presetKey:   key,
                                                      settingsKey: 'bIncludeStylesForEveryDay',
                                                      presetHelp:  "# " + key + newLine
                                                                  +"# -------------------- " + newLine
                                                                  +"#   Either true or false",
                                                    };
// ************ //
   key = "Line Calendar Days Per Line";
   settings.daysPerLineOptions      = new Array( '1 Line', '2 Lines: 1st Gets Extra Day', '2 Lines: 2nd Gets Extra Day'  );
   settings.widgitValues.daysPerLineOptions = { type:       'dropdown',
                                                initial:    0,
                                                values:     settings.daysPerLineOptions,
                                                presetKey:  key,
                                                settingsKey: 'daysPerLine',
                                                presetHelp: "# " + key + newLine
                                                           +"# -------------------- " + newLine
                                                           +validValuesText( settings.daysPerLineOptions, newLine ),
                                              };
// ************ //
   key = "Put Empty Cells At End of Line";
   settings.widgitValues.putEmptyCellsAtEndOfLine = { type:        'checkbox',
                                                      initial:     true,
                                                      presetKey:   key,
                                                      presetHelp:  "# " + key + newLine
                                                                  +"# -------------------- " + newLine
                                                                  +"#   Either true or false",
                                                    };
// ************ //
   key = "Line Calendar Orientation";
   settings.orientationOptions            = new Array( "Horizontal", "Vertical" );
   settings.widgitValues.orientationOptions = { type:       'dropdown',
                                                initial:    0,
                                                values:     settings.orientationOptions,
                                                presetKey:  key,
                                                presetHelp: "# " + key + newLine
                                                           +"# -------------------- " + newLine
                                                           +validValuesText( settings.orientationOptions, newLine ),
                                              };
// ************ //
   key = "Line Calendar Cell Spacing";
   settings.cellSpacingOptions            = new Array( "Auto", "Space Cells to Fill Frame", "Space Cells for 31 Days" );
   settings.widgitValues.cellSpacingOptions = { type:       'dropdown',
                                                initial:    0,
                                                values:     settings.cellSpacingOptions,
                                                presetKey:  key,
                                                presetHelp: "# " + key + newLine
                                                           +"# -------------------- " + newLine
                                                           +validValuesText( settings.cellSpacingOptions, newLine ),
                                              };
// ************ //
   key = "Force Square Cells";
   settings.widgitValues.forceSquareCells = { type:        'checkbox',
                                              initial:     true,
                                              presetKey:   key,
                                              settingsKey: 'bLineCalendarSquareCells',
                                              presetHelp:  "# " + key + newLine
                                                          +"# -------------------- " + newLine
                                                          +"#   Either true or false",
                                             };
// ************ //
   key = "Only Print The Day Name On First Day Of The Week";
   settings.widgitValues.onlyPrintFirstWeekday = { type:        'checkbox',
                                                   initial:     false,
                                                   presetKey:   key,
                                                   settingsKey: 'bOnlyPrintFirstWeekday',
                                                   presetHelp:  "# " + key + newLine
                                                               +"# -------------------- " + newLine
                                                               +"#   Either true or false",
                                                  };
// ************ //
   key = "Add Text Layer";
   settings.widgitValues.addTextLayer = { type:        'checkbox',
                                          initial:     true,
                                          presetKey:   key,
                                          settingsKey: 'bTextLayer',
                                          presetHelp:  "# " + key + newLine
                                                      +"# -------------------- " + newLine
                                                      +"#   Either true or false",
                                        };
// ************ //
   key = "Add Holiday Layer";
   settings.widgitValues.addHolidayLayer = { type:        'checkbox',
                                             initial:     false,
                                             presetKey:   key,
                                             settingsKey: 'bHolidaysLayer',
                                             presetHelp:  "# " + key + newLine
                                                         +"# -------------------- " + newLine
                                                         +"#   Either true or false",
                                           };
// ************ //
/* key = "Independant Holiday A Layer";
   settings.widgitValues.addHolidayLayerA = { type:        'checkbox',
                                              initial:     false,
                                              presetKey:   key,
                                              settingsKey: 'bHolidaysLayerA',
                                              presetHelp:  "# " + key + newLine
                                                          +"# -------------------- " + newLine
                                                          +"#   Either true or false",
                                            };
*/
// ************ //
   key = "Independant Holiday B Layer";
   settings.widgitValues.addHolidayLayerB = { type:        'checkbox',
                                              initial:     false,
                                              presetKey:   key,
                                              settingsKey: 'bHolidaysLayerB',
                                              presetHelp:  "# " + key + newLine
                                                          +"# -------------------- " + newLine
                                                          +"#   Either true or false",
                                            };
// ************ //
   key = "Independant Holiday C Layer";
   settings.widgitValues.addHolidayLayerC = { type:        'checkbox',
                                              initial:     false,
                                              presetKey:   key,
                                              settingsKey: 'bHolidaysLayerC',
                                              presetHelp:  "# " + key + newLine
                                                          +"# -------------------- " + newLine
                                                          +"#   Either true or false",
                                            };
// ************ //
   key = "Independant Holiday D Layer";
   settings.widgitValues.addHolidayLayerD = { type:        'checkbox',
                                              initial:     false,
                                              presetKey:   key,
                                              settingsKey: 'bHolidaysLayerD',
                                              presetHelp:  "# " + key + newLine
                                                          +"# -------------------- " + newLine
                                                          +"#   Either true or false",
                                            };
// ************ //
   key = "Use Calendar Layer";
   settings.widgitValues.useCalendarLayer = { type:        'checkbox',
                                              initial:     false,
                                              presetKey:   key,
                                              settingsKey: 'bDateLayer',
                                              presetHelp:  "# " + key + newLine
                                                          +"# -------------------- " + newLine
                                                          +"#   Either true or false",
                                            };
// ************ //
   key = "Add Day of Year Layer";
   settings.widgitValues.addDayOfYearLayer = { type:        'checkbox',
                                               initial:     false,
                                               presetKey:   key,
                                               settingsKey: 'bJulianDateLayer',
                                               presetHelp:  "# " + key + newLine
                                                           +"# -------------------- " + newLine
                                                           +"#   Either true or false",
                                             };
// ************ //
   key = "Add Week Day Layer";
   settings.widgitValues.addWeekDayLayer = { type:        'checkbox',
                                             initial:     false,
                                             presetKey:   key,
                                             settingsKey: 'bWeekDay',
                                             presetHelp:  "# " + key + newLine
                                                         +"# -------------------- " + newLine
                                                         +"#   Either true or false",
                                           };
// ************ //
   key = "Add Work Week Layer";
   settings.widgitValues.addWorkWeekLayer = { type:        'checkbox',
                                              initial:     false,
                                              presetKey:   key,
                                              settingsKey: 'bWorkWeek',
                                              presetHelp:  "# " + key + newLine
                                                          +"# -------------------- " + newLine
                                                          +"#   Either true or false",
                                            };
// ************ //
   key = "Add Moons Layer";
   settings.widgitValues.addMoonsLayer = { type:        'checkbox',
                                           initial:     false,
                                           presetKey:   key,
                                           settingsKey: 'bMoons',
                                           presetHelp:  "# " + key + newLine
                                                       +"# -------------------- " + newLine
                                                       +"#   Either true or false",
                                            };
// ************ //
   key = "Add Picture Layer";
   settings.widgitValues.addPictureLayer = { type:        'checkbox',
                                             initial:     false,
                                             presetKey:   key,
                                             settingsKey: 'bPicturesLayer',
                                             presetHelp:  "# " + key + newLine
                                                         +"# -------------------- " + newLine
                                                         +"#   Either true or false",
                                            };
// ************ //
   key = "Add Background Layer";
   settings.widgitValues.addBackgroundLayer = { type:        'checkbox',
                                                initial:     false,
                                                presetKey:   key,
                                                settingsKey: 'bBackgroundLaye',
                                                presetHelp:  "# " + key + newLine
                                                            +"# -------------------- " + newLine
                                                            +"#   Either true or false",
                                               };

// ************ //
   key = "List Calendar Column Order";
   settings.columnOrderOptions      = new Array( "Date, Day", "Day, Date" );
   settings.widgitValues.columnOrderOptions = { type:       'dropdown',
                                                initial:    0,
                                                values:     settings.columnOrderOptions,
                                                presetKey:  key,
                                                presetHelp: "# " + key + newLine
                                                           +"# -------------------- " + newLine
                                                           +validValuesText( settings.columnOrderOptions, newLine ),
         
                                              };
// ************ //
   key = "List Calendar Column Count";
   settings.columnCountOptions      = new Array( '1', '2' );
   settings.widgitValues.columnCountOptions = { type:       'dropdown',
                                                initial:    0,
                                                values:     settings.columnCountOptions,
                                                presetKey:  key,
                                                presetHelp: "# " + key + newLine
                                                           +"# -------------------- " + newLine
                                                           +validValuesText( settings.columnCountOptions, newLine ),
         
                                              };
// ************ //
   key = "List Calendar Column Gutter";
   settings.widgitValues.columnGutter = { type:        'text',
                                          initial:     '',
                                          presetKey:   key,
                                          unitDependant: true,
                                          presetHelp:  "# " + key + newLine
                                                      +"# -------------------- " + newLine
                                                      +"#   A Number",
                                        };
// ************ //
   key = "Add Week Day Column To List Calendar";
   settings.widgitValues.addWeekDayColumn = { type:        'checkbox',
                                              initial:     false,
                                               presetKey:   key,
                                               presetHelp:  "# " + key + newLine
                                                           +"# -------------------- " + newLine
                                                           +"#   Either true or false",
                                              };
// ************ //
   key = "Add Work Week Column To List Calendar";
   settings.widgitValues.addWorkWeekColumn = { type:        'checkbox',
                                               initial:     false,
                                               presetKey:   key,
                                               presetHelp:  "# " + key + newLine
                                                           +"# -------------------- " + newLine
                                                           +"#   Either true or false",
                                              };
// ************ //
   key = "Add Moon Phase Column To List Calendar";
   settings.widgitValues.addMoonsColumn = { type:        'checkbox',
                                            initial:     false,
                                            presetKey:   key,
                                            presetHelp:  "# " + key + newLine
                                                        +"# -------------------- " + newLine
                                                        +"#   Either true or false",
                                           };
// ************ //
   key = "Merge Date and Day Columns";
   settings.widgitValues.mergeDateAndDayColumns = { type:        'checkbox',
                                                    initial:     false,
                                                    presetKey:   key,
                                                    presetHelp:  "# " + key + newLine
                                                                +"# -------------------- " + newLine
                                                                +"#   Either true or false",
                                                   };

// ************ //
   key = "Date WeekDay Delimiter";
   settings.widgitValues.dateWeekDayDelimiter = { type:        'text',
                                                  initial:     '',
                                                  presetKey:   key,
                                                  presetHelp:  "# " + key + newLine
                                                              +"# -------------------- " + newLine
                                                              +"#   Arbitrary Text",
                                                };
// ************ //
   key = "Date Column Width";
   settings.widgitValues.dateColumnWidth = { type:        'text',
                                             initial:     '',
                                             presetKey:   key,
                                             unitDependant: true,
                                             presetHelp:  "# " + key + newLine
                                                         +"# -------------------- " + newLine
                                                         +"#   A number",
                                           };
// ************ //
   key = "Week Day Column Width";
   settings.widgitValues.weekDayColumnWidth = { type:        'text',
                                                initial:     '',
                                                presetKey:   key,
                                                unitDependant: true,
                                                presetHelp:  "# " + key + newLine
                                                            +"# -------------------- " + newLine
                                                            +"#   A number",
                                              };   
// ************ //
   key = "Work Week Column Width";
   settings.widgitValues.workWeekColumnWidth = { type:        'text',
                                                 initial:     '',
                                                 presetKey:   key,
                                                 unitDependant: true,
                                                 presetHelp:  "# " + key + newLine
                                                             +"# -------------------- " + newLine
                                                             +"#   A number",
                                               };   
// ************ //
   key = "Moon Column Width";
   settings.widgitValues.moonColumnWidth = { type:        'text',
                                             initial:     '',
                                             presetKey:   key,
                                             unitDependant: true,
                                             presetHelp:  "# " + key + newLine
                                                         +"# -------------------- " + newLine
                                                         +"#   A number",
                                           };   

// ************ //
   key = "Color Space";
   settings.colorSpaceOptions = new Array( 'CMYK', 'RGB', "Lab" );
   settings.widgitValues.colorSpaceOptions = { type:       'dropdown',
                                               initial:    0,
                                               values:     settings.colorSpaceOptions,
                                               presetKey:  key,
                                               presetHelp: "# " + key + newLine
                                                          +"# -------------------- " + newLine
                                                          +validValuesText( settings.colorSpaceOptions, newLine ),
                                              };
// ************ //
   key = "Calendars Per Page";
   settings.calendarsPerPageOptions      = new Array( '1', '2', '3', '4', '6', '8', '9', '10', '12');
   settings.gridCalendarsPerPageOptions  = new Array( '1', '2', '3', '4', '6', '8', '9', '10', '12');
   settings.listCalendarsPerPageOptions  = new Array( '1' );
   settings.lineCalendarsPerPageOptions  = new Array( '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
   settings.widgitValues.calendarsPerPageOptions = { type:       'dropdown',
                                                     initial:    0,
                                                     values:     settings.calendarsPerPageOptions,
                                                     gridValues: settings.gridCalendarsPerPageOptions,
                                                     listValues: settings.listCalendarsPerPageOptions,
                                                     lineValues: settings.lineCalendarsPerPageOptions,
                                                     presetKey:  key,
                                                     presetHelp: "# " + key + newLine
                                                                +"# -------------------- " + newLine
                                                                +validValuesText( settings.calendarsPerPageOptions, newLine ),
                                                    };
// ************ //
   key = "Document Target";
   settings.pageTypeOptions = new Array( 'Auto', 'Current Text Frame', 'New Document', 'Current Document' );
   settings.widgitValues.documentTargetOptions = { type:       'dropdown',
                                                   initial:    0,
                                                   values:     settings.pageTypeOptions,
                                                   presetKey:  key,
                                                   presetHelp: "# " + key + newLine
                                                              +"# -------------------- " + newLine
                                                              +validValuesText( settings.pageTypeOptions, newLine ),
                                                 };
// ************ //
   key = "Document Orientation";
   settings.pageOrientationOptions        = new Array( 'default', 'Portrait', 'Landscape' );
   settings.widgitValues.documentOrientationOptions = { type:       'dropdown',
                                                        initial:    0,
                                                        values:     settings.pageOrientationOptions,
                                                        presetKey:  key,
                                                        presetHelp: "# " + key + newLine
                                                                   +"# -------------------- " + newLine
                                                                   +validValuesText( settings.pageOrientationOptions, newLine ),
                                                      };
// ************ //
   key = "Document Size";
   settings.pageSizeOptions               = new Array( "Letter", "Legal", "Tabloid", "Letter - Half", "Legal - Half", "A3", "A4", "A5", "B5" ); 
   settings.widgitValues.documentSizeOptions = { type:       'dropdown',
                                                 initial:    0,
                                                 values:     settings.pageSizeOptions,
                                                 presetKey:  key,
                                                 presetHelp: "# " + key + newLine
                                                            +"# -------------------- " + newLine
                                                            +validValuesText( settings.pageSizeOptions, newLine ),
                                               };
// ************ //
   key = "Document Units";
   settings.documentUnitOptions = new Array( 'inches', 'points', 'centimeters' );
   settings.widgitValues.documentUnitOptions = { type:       'dropdown',
                                                 initial:    0,
                                                 values:     settings.documentUnitOptions,
                                                 presetKey:  key,
                                                 presetHelp: "# " + key + newLine
                                                            +"# -------------------- " + newLine
                                                            +validValuesText( settings.documentUnitOptions, newLine ),
                                               };
// ************ //
   key = "Custom Frame Units";
   settings.widgitValues.customFrameUnitOptions = { type:       'dropdown',
                                                    initial:    0,
                                                    values:     settings.documentUnitOptions,
                                                    presetKey:  key,
                                                    presetHelp: "# " + key + newLine
                                                               +"# -------------------- " + newLine
                                                               +validValuesText( settings.documentUnitOptions, newLine ),
                                               };   
// ************ //
   key = "Calendar Style Set";
   settings.styleSetOptions               = new Array( '', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15' );
   settings.widgitValues.styleSetOptions = { type:       'dropdown',
                                             initial:    0,
                                             values:     settings.styleSetOptions,
                                             presetKey:  key,
                                             presetHelp: "# " + key + newLine
                                                        +"# -------------------- " + newLine
                                                        +validValuesText( settings.styleSetOptions, newLine ),
                                           };
// ************ //
   var items  = [ 'documentHeight',  'documentWidth',  'documentBleed',  'documentMargins'  ];
   var labels = [ 'Document Height', 'Document Width', 'Document Bleed', 'Document Margins' ];
   for( i = 0; i < items.length; i++ ){
      key = labels[i];
      settings.widgitValues[items[i]] = { type:        'text',
                                          initial:     '',
                                          presetKey:   key,
                                          unitDependant: true,
                                          presetHelp:  "# " + key + newLine
                                                      +"# -------------------- " + newLine
                                                      +"#   A number",
                                        };
   }   
// ************ //
   var category = ['calendar', 'month', 'year', 'picture'];
   var categoryLabel = ['Calendar', 'Month', 'Year', 'Picture'];
   for( i = 0; i < category.length; i++ ){
      var items  = [ 'CustomSizeY1',    'CustomSizeY2',    'CustomSizeX1',    'CustomSizeX2',    'CustomTopEdge',    'CustomLeftEdge',    'CustomWidth',   'CustomHeight'   ];
      var labels = [ ' Custom Size Y1', ' Custom Size Y2', ' Custom Size X1', ' Custom Size X2', ' Custom Top Edge', ' Custom Left Edge', ' Custom Width', ' Custom Height' ];
      for( j = 0; j < items.length; j++ ){
         key = categoryLabel[i] + labels[j];
         settings.widgitValues[category[i]+items[j]] = { type:        'text',
                                                         initial:     '',
                                                         presetKey:   key,
                                                         unitDependant: true,
                                                         presetHelp:  "# " + key + newLine
                                                                     +"# -------------------- " + newLine
                                                                     +"#   A number",
                                                       };
      }   
   }

// ************ //
   key = "Custom Frame Defined By Height and Width";
   settings.widgitValues.bUseCustomHeightAndWidth = { type:        'boolean-settings',
                                                      initial:     true,
                                                      presetKey:   key,
                                                      settingsKey: 'bUseCustomHeightAndWidth',
                                                      presetHelp:  "# " + key + newLine
                                                                  +"# -------------------- " + newLine
                                                                  +"#   Either true or false",
                                                     };
// ************ //
/* Not yet working; not sure if it's needed
   key = "Calendar Type";
   settings.calendarTypes = new Array( 'Grid', 'List', 'Line' );
   settings.widgitValues.calendarType = { type:        'list-settings',
                                          initial:     0,
                                          values:      settings.calendarTypes,
                                          presetKey:   key,
                                          settingsKey: 'calendarTypeIndex',
                                          presetHelp:  "# " + key + newLine
                                                      +"# -------------------- " + newLine
                                                            +validValuesText( settings.calendarTypes, newLine ),
                                        };
*/



   return;     
}
// --------------------------------------------------------------- //
function validValuesText( list, newLine ){
   bufferArray = new Array();
   for( i = 0; i < list.length; i++ ){
      bufferArray.push( "#   " + list[i] );
   }
   return( bufferArray.join( newLine ) );
}
// --------------------------------------------------------------- //
function LoadGridCalendarSettings( settings )
{
   settings.calendarsPerPageOptions       = new Array( '1', '2', '3', '4', '6', '8', '9', '10', '12');
   settings.moonSize = settings.gridCalendarMoonSize;
   settings.workWeekPrefix = settings.gridCalendarWorkWeekPrefix;
   return;
}
// --------------------------------------------------------------- //
function LoadListCalendarSettings( settings )
{
   settings.calendarsPerPageOptions       = new Array( '1' );
   settings.monthFrameHeight = 1.0;
   settings.defaultYearWidth = 0.33; //percent of the calendar width
   settings.moonSize = settings.listCalendarMoonSize;
   settings.workWeekPrefix = settings.listCalendarWorkWeekPrefix;
   return;
}
// --------------------------------------------------------------- //
function LoadLineCalendarSettings( settings )
{
   settings.calendarsPerPageOptions       = new Array( '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
   settings.monthFrameHeight = 0.5;
   settings.defaultYearWidth = 1.5; //percent of the calendar width
   settings.moonSize = settings.lineCalendarMoonSize;
   settings.workWeekPrefix = settings.lineCalendarWorkWeekPrefix;
   return;
}
// --------------------------------------------------------------- //
function initalizeDataFolder( settings )
{
   var bFlag;
   var whatToDo;
   var updateFiles = false;
   var i;
   var versionFiles;
   var upgrade;


   //new, upgrade, no change
   if( !settings.versionFile.exists ){
      upgrade = bUpgrade( settings );

      createFolderIfNecessary( settings.dataDirectory, "Failed to create \"" + settings.dataDirectory + "\". Holidays and Presets will be unavailable.\n" );
      createFolderIfNecessary( settings.holidaysDirectory, "Failed to create \"" + settings.holidaysDirectory + "\". Holidays will be unavailable.\n" );
      if( createFolderIfNecessary( settings.presetsDirectory, "Failed to create \"" + settings.presetsDirectory + "\". Presets will be unavailable.\n" ) ){
         createFolderIfNecessary( settings.userPresetsDirectory, "Failed to create \"" + settings.userPresetsDirectory + "\". Grid Calendar Presets will be unavailable.\n" );
      }

      copyFilesWithChecksum( settings, upgrade, settings.holidaysRoDirectory, settings.holidaysDirectory, "*.holidays" );
      copyFilesWithChecksum( settings, upgrade, settings.presetsRoDirectory, settings.presetsDirectory, "*.txt" );
      copyFilesWithChecksum( settings, upgrade, settings.userPresetsRoDirectory, settings.userPresetsDirectory, "*.txt" );

      versionFiles = settings.dataDirectory.getFiles( "Version*" );
      for( i = 0; i < versionFiles.length; i++ ){
         versionFiles[i].remove();
      }
      settings.versionFile.open( 'w' );
      settings.versionFile.close(); 

      if( !settings.licenseFile.exists && settings.licenseFileRo.exists ){
         settings.licenseFileRo.copy( settings.licenseFile );
      }
   }

   return;
}
// --------------------------------------------------------------- //
function copyFilesWithChecksum( settings, upgrade, sourceDirectory, destinationDirectory, fileFilter )
{
   var sourceFiles = sourceDirectory.getFiles( fileFilter );
   var i;
   var destinationFile;
   var fileName;
   var buffer;
   var lineFeed = "\n";
   var destination;
   var destinationChecksum;
   var destinationSum;
   var result;
   var bDoIt;

   for( i = 0; i < sourceFiles.length; i++ ){
      bDoIt = true;

      fileName = sourceFiles[i].toString().substring( sourceFiles[i].toString().lastIndexOf( "/" ) + 1, sourceFiles[i].toString().length );
      destinationFile = new File( destinationDirectory.toString() + "/" + fileName );
      if( settings.bWindows ){
         destinationFile.lineFeed = "Windows";
      } else {
         destinationFile.lineFeed = "Unix";
      }
       
      buffer = aReadFileWithChecksum( sourceFiles[i] );
      sum = sComputeChecksum( buffer[1].join( "" ) );

      if( !destinationFile.exists && upgrade){
         bDoIt = false;
      } else if( !destinationFile.exists && !upgrade){
         bDoIt = true;
      } else if( settings.forceFileUpdates ){
         bDoIt = true;
      } else {
         // check destination file for local modifications...

         destination = aReadFileWithChecksum( destinationFile );
         destinationChecksum = destination[0]
         destinationSum = sComputeChecksum( destination[1].join( "" ) );

         if( destinationChecksum == destinationSum ){
            // no modifications, update the file
            bDoIt = true;
         } else if( destinationChecksum == sum  ){
            // the source file is not an update and the local file has modifications, so don't update it
            bDoIt = false;
         } else {
            // Ask the user what to do
            result = UpgradeFilesDialog( settings, "File with local modifications: " + fileName + "\n\n"
                                           +"A new version of the Calendar Wizard has been installed. "
                                           +"There is an update to the file \"" + fileName + "\"; "
                                           +"distributed as part of the Calendar Wizard; "
                                           +"however, it would appear the file provided by the previous "
                                           +"version has been edited.");
            if( result == 0 ){
               bDoIt = false;
            } else {
               bDoIt = true;
            }
         }
      }

      if( bDoIt ){
         if( destinationFile.open( 'w' ) ){
            destinationFile.writeln( "# CHECKSUM = " + sum );
            for( j = 0; j < buffer[1].length; j++ ){
               destinationFile.writeln( buffer[1][j] );
            }
            destinationFile.close();
         } else {
            alert( "Failed to Update " + fileName );
         }
      }
   }
   return;
}
// --------------------------------------------------------------- //
function bUpgrade( settings )
{
   var bUpgraded = false;
   var versionFiles = settings.dataDirectory.getFiles( "Version*" );
   var versionRegExp = /Version-(\d+)\.(\d+)\.(\d+)$/;
   var buffer;
   
   for( var i = 0; i < versionFiles.length; i++ ){
      if( versionRegExp.test( versionFiles[i] ) ){
         buffer = versionRegExp.exec( versionFiles[i] );
         if( settings.versionMajor > parseInt(buffer[1]) ){
            bUpgraded = true;
         } else if( settings.versionMajor == parseInt(buffer[1]) ){
            if( settings.versionMinor > parseInt(buffer[2]) ){
               bUpgraded = true;
            } else if( settings.versionMinor == parseInt(buffer[2]) ){
               if( settings.versionBuild > parseInt(buffer[3]) ){
                  bUpgraded = true;
               }
            } 
         }
      }
   }


   return( bUpgraded );
}
// --------------------------------------------------------------- //
function createFolderIfNecessary( folder, errorMessage )
{
   var bFlag = true;
   if( ! folder.exists ){
      bFlag = folder.create();
      if( !bFlag ){
         alert( errorMessage );
      }
   }
   return( bFlag );
}
