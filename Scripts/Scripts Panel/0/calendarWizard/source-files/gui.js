// --------------------------------------------------------------- //
// Legacy Launcher for Legacy Interfaces
// --------------------------------------------------------------- //
function SelectCalendarType( settings )
{
   var myDialog = app.dialogs.add( {name:"Select Calendar Type", canCancel:true} );
   var scripts = [ 'Grid Calendar', 'List Calendar', 'Line Calendar', 'Fit Calendar to Frame', 'Fit Line Calendar to Frame with Square Cells', 'Realign Calendar Tables' ];
   var myResult;
   var selectScript;

   with( myDialog ){
      with( dialogColumns.add() ){
         with( dialogRows.add() ){
            staticTexts.add({staticLabel:"Select Action"});
            selectScript = dropdowns.add({stringList:scripts, selectedIndex:0});
         }
      }
   }

   if( myDialog.show() ){
      if( selectScript.selectedIndex == 0 ){
         settings.bGridCalendar = true;
      } else if( selectScript.selectedIndex == 1 ){
         settings.bListCalendar = true;
      } else if( selectScript.selectedIndex == 2 ){
         settings.bLineCalendar = true;
      } else if( selectScript.selectedIndex == 3 ){
         settings.bFitCalendarToFrame = true;
         settings.bFitLineCalendarToFrameWithSquareCells = false;
      } else if( selectScript.selectedIndex == 4 ){
         settings.bFitCalendarToFrame = true;
         settings.bFitLineCalendarToFrameWithSquareCells = true;
      } else if( selectScript.selectedIndex == 5 ){
         settings.bRealignCalendars = true;
      }
   }

   return;
}
// --------------------------------------------------------------- //
// Script UI Launcher for Legacy Interfaces
// --------------------------------------------------------------- //
function ScriptUISelectCalendarType( settings )
{
   var mainWindow = null;
   var calendarTypeProperties = new Object;
   calendarTypeProperties.style = 'toolbutton';

   mainWindow = new Window( "dialog", settings.title, undefined, {resizeable:false} );

   mainWindow.topGroup = mainWindow.add( "group{ orientation:'column' }" );
   mainWindow.topGroup.alignChildren = "top";

   mainWindow.upperPanel = mainWindow.topGroup.add( "group{ orientation:'row' }" );
   mainWindow.gridButton = mainWindow.upperPanel.add( "iconbutton", undefined, getCalendarTypeImage( settings, 'Grid' ), calendarTypeProperties );
   mainWindow.listButton = mainWindow.upperPanel.add( "iconbutton", undefined, getCalendarTypeImage( settings, 'List' ), calendarTypeProperties );
   mainWindow.lineButton = mainWindow.upperPanel.add( "iconbutton", undefined, getCalendarTypeImage( settings, 'Line' ), calendarTypeProperties );

   mainWindow.lowerPanel               = mainWindow.topGroup.add( "group{ orientation:'row' }" );
   mainWindow.fitCalendarToFrameButton = mainWindow.lowerPanel.add( "button", undefined, "Fit Calendar to Frame" );
   mainWindow.fitLineCalendarToFrameWithSquareCellsButton = mainWindow.lowerPanel.add( "button", undefined, "Fit Line Calendar to Frame With Square Cells" );
   mainWindow.realignCalendarButton    = mainWindow.lowerPanel.add( "button", undefined, "Realign Calendar Layers" );

   mainWindow.gridButton.onClick               = function(){ selectGridCalendar( mainWindow, settings ); };
   mainWindow.listButton.onClick               = function(){ selectListCalendar( mainWindow, settings ); };
   mainWindow.lineButton.onClick               = function(){ selectLineCalendar( mainWindow, settings ); };
   mainWindow.fitCalendarToFrameButton.onClick = function(){ selectFitCalendarToFrame( mainWindow, settings ); };
   mainWindow.fitLineCalendarToFrameWithSquareCellsButton.onClick = function(){ selectFitLineCalendarToFrameWithSquareCells( mainWindow, settings ); };
   mainWindow.realignCalendarButton.onClick    = function(){ selectRealignCalendars( mainWindow, settings ); };

   mainWindow.show();
   return;
}
// --------------------------------------------------------------- //

// --------------------------------------------------------------- //
function selectGridCalendar( mainWindow, settings ){
   settings.bGridCalendar = true;
   settings.bLineCalendar = false;
   settings.bListCalendar = false;
   mainWindow.close( 1 );
}
// --------------------------------------------------------------- //
function selectListCalendar( mainWindow, settings ){
   settings.bGridCalendar = false;
   settings.bListCalendar = true;
   settings.bLineCalendar = false;
   mainWindow.close( 1 );
}
// --------------------------------------------------------------- //
function selectLineCalendar( mainWindow, settings ){
   settings.bGridCalendar = false;
   settings.bListCalendar = false;
   settings.bLineCalendar = true;
   mainWindow.close( 1 );
}
// --------------------------------------------------------------- //
function selectFitCalendarToFrame( mainWindow, settings ){
   settings.bFitCalendarToFrame = true;
   settings.bFitLineCalendarToFrameWithSquareCells = false;
   mainWindow.close( 1 );
}
// --------------------------------------------------------------- //
function selectFitLineCalendarToFrameWithSquareCells( mainWindow, settings ){
   settings.bFitCalendarToFrame = true;
   settings.bFitLineCalendarToFrameWithSquareCells = true;
   mainWindow.close( 1 );
}
// --------------------------------------------------------------- //
function selectRealignCalendars( mainWindow, settings ){
   settings.bRealignCalendars = true;
   mainWindow.close( 1 );
}
// --------------------------------------------------------------- //
function getCalendarTypeImage( settings, type ){
   return ScriptUI.newImage( settings.imagesDirectory + "/" + type + "Up-75x75.png",
                             settings.imagesDirectory + "/" + type + "Disabled-75x75.png",
                             settings.imagesDirectory + "/" + type + "Down-75x75.png",
                             settings.imagesDirectory + "/" + type + "Up-75x75.png"
                             );
}
// --------------------------------------------------------------- //
function getCalendarControlButtonImages( settings, type ){
   return [ ScriptUI.newImage(  settings.imagesDirectory + "/" + type + "Up-125x20.png",
                                settings.imagesDirectory + "/" + type + "Up-125x20.png",
                                settings.imagesDirectory + "/" + type + "Up-125x20.png",
                                settings.imagesDirectory + "/" + type + "Up-125x20.png"
                             ),
            ScriptUI.newImage(  settings.imagesDirectory + "/" + type + "Down-125x20.png",
                                settings.imagesDirectory + "/" + type + "Down-125x20.png",
                                settings.imagesDirectory + "/" + type + "Down-125x20.png",
                                settings.imagesDirectory + "/" + type + "Down-125x20.png"
                             ) ];
}
// --------------------------------------------------------------- //
function getCalendarTypeImages( settings, type ){
   return [ ScriptUI.newImage(  settings.imagesDirectory + "/" + type + "Up-75x75.png",
                                settings.imagesDirectory + "/" + type + "Up-75x75.png",
                                settings.imagesDirectory + "/" + type + "Up-75x75.png",
                                settings.imagesDirectory + "/" + type + "Up-75x75.png"
                             ),
            ScriptUI.newImage(  settings.imagesDirectory + "/" + type + "Down-75x75.png",
                                settings.imagesDirectory + "/" + type + "Down-75x75.png",
                                settings.imagesDirectory + "/" + type + "Down-75x75.png",
                                settings.imagesDirectory + "/" + type + "Down-75x75.png"
                             ) ];
}
// --------------------------------------------------------------- //
// --------------------------------------------------------------- //
function CalendarWizardGui2( settings, splashWindow )
{
   var mainWindow = null;
   var controls = new Object;
   var calendarTypeProperties = new Object;
   calendarTypeProperties.style = 'toolbutton';

   var controlButtonSize = [125, defaultHeight( settings )];
   var fillAll = [ 'fill', 'fill' ];
   var loadingDefaults = true;
   var saveDeleteButtonSize = [30,defaultHeight( settings )];

   aGetHolidayFiles( settings );
   aGetPresetFiles( settings );

   readLicenseFile( settings );

   settings.elleMediaGroupImages = ScriptUI.newImage( settings.imagesDirectory + "/elleMediaGroup.png",
                                                      settings.imagesDirectory + "/elleMediaGroup.png",
                                                      settings.imagesDirectory + "/elleMediaGroup.png",
                                                      settings.imagesDirectory + "/elleMediaGroup.png"
                                                    );
   settings.questionImages = ScriptUI.newImage( settings.imagesDirectory + "/question.png",
                                                settings.imagesDirectory + "/question.png",
                                                settings.imagesDirectory + "/question.png",
                                                settings.imagesDirectory + "/question.png"
                                              );
 
   settings.gridImages      = getCalendarTypeImages( settings, "Grid" );
   settings.listImages      = getCalendarTypeImages( settings, "List" );
   settings.lineImages      = getCalendarTypeImages( settings, "Line" );
   settings.utilitiesImages = getCalendarTypeImages( settings, "Utilities" );
   settings.helpImages      = getCalendarTypeImages( settings, "Help" );
   
   settings.edgesImages          = getCalendarTypeImages( settings, "Edges" );
   settings.heightAndWidthImages = getCalendarTypeImages( settings, "HeightAndWidth" );
   
   settings.basicButtonImages = getCalendarControlButtonImages( settings, "Basic" );
   settings.holidaysButtonImages = getCalendarControlButtonImages( settings, "Holidays" );
   settings.customFramesButtonImages = getCalendarControlButtonImages( settings, "CustomFrames" );

   mainWindow = new Window( "dialog", settings.title, undefined, {resizeable:false} );
   
   mainWindow.holidaySelectorsLabel = new Array();
   mainWindow.holidaySelectorsA = new Array();
   mainWindow.holidaySelectorsB = new Array();
   mainWindow.holidaySelectorsC = new Array();
   mainWindow.holidaySelectorsD = new Array();

   mainWindow.topContainer = mainWindow.add( "group{ orientation:'row' }" );
   mainWindow.topContainer.alignChildren = "top";
   
   mainWindow.actionMenuContainer = mainWindow.topContainer.add( "group{ orientation:'stack' }" );
   mainWindow.actionMenuA = mainWindow.actionMenuContainer.add( "group{ orientation:'column' }" );
   mainWindow.actionMenuB = mainWindow.actionMenuContainer.add( "group{ orientation:'column' }" );
   mainWindow.actionMenuC = mainWindow.actionMenuContainer.add( "group{ orientation:'column' }" );
   mainWindow.actionMenuD = mainWindow.actionMenuContainer.add( "group{ orientation:'column' }" );
   mainWindow.actionMenuE = mainWindow.actionMenuContainer.add( "group{ orientation:'column' }" );
   mainWindow.actionMenuA.visible = true;
   mainWindow.actionMenuB.visible = false;
   mainWindow.actionMenuC.visible = false;
   mainWindow.actionMenuD.visible = false;
   mainWindow.actionMenuE.visible = false;
   mainWindow.actionMenuA.spacing = 10;
   mainWindow.actionMenuB.spacing = 10;
   mainWindow.actionMenuC.spacing = 10;
   mainWindow.actionMenuD.spacing = 10;
   mainWindow.actionMenuE.spacing = 10;

   mainWindow.gridButtonA = mainWindow.actionMenuA.add( "iconbutton", undefined, settings.gridImages[1], calendarTypeProperties );
   mainWindow.actionMenuA.add( "statictext", undefined, "Grid" );
   mainWindow.listButtonA = mainWindow.actionMenuA.add( "iconbutton", undefined, settings.listImages[0], calendarTypeProperties );
   mainWindow.actionMenuA.add( "statictext", undefined, "List" );
   mainWindow.lineButtonA = mainWindow.actionMenuA.add( "iconbutton", undefined, settings.lineImages[0], calendarTypeProperties );
   mainWindow.actionMenuA.add( "statictext", undefined, "Line" );
   mainWindow.utilitiesButtonA = mainWindow.actionMenuA.add( "iconbutton", undefined, settings.utilitiesImages[0], calendarTypeProperties );
   mainWindow.actionMenuA.add( "statictext", undefined, "Utilities" );
   mainWindow.helpButtonA = mainWindow.actionMenuA.add( "iconbutton", undefined, settings.helpImages[0], calendarTypeProperties );
   mainWindow.actionMenuA.add( "statictext", undefined, "Help" );
   
   mainWindow.gridButtonB = mainWindow.actionMenuB.add( "iconbutton", undefined, settings.gridImages[0], calendarTypeProperties );
   mainWindow.actionMenuB.add( "statictext", undefined, "Grid" );
   mainWindow.listButtonB = mainWindow.actionMenuB.add( "iconbutton", undefined, settings.listImages[1], calendarTypeProperties );
   mainWindow.actionMenuB.add( "statictext", undefined, "List" );
   mainWindow.lineButtonB = mainWindow.actionMenuB.add( "iconbutton", undefined, settings.lineImages[0], calendarTypeProperties );
   mainWindow.actionMenuB.add( "statictext", undefined, "Line" );
   mainWindow.utilitiesButtonB = mainWindow.actionMenuB.add( "iconbutton", undefined, settings.utilitiesImages[0], calendarTypeProperties );
   mainWindow.actionMenuB.add( "statictext", undefined, "Utilities" );
   mainWindow.helpButtonB = mainWindow.actionMenuB.add( "iconbutton", undefined, settings.helpImages[0], calendarTypeProperties );
   mainWindow.actionMenuB.add( "statictext", undefined, "Help" );
   
   mainWindow.gridButtonC = mainWindow.actionMenuC.add( "iconbutton", undefined, settings.gridImages[0], calendarTypeProperties );
   mainWindow.actionMenuC.add( "statictext", undefined, "Grid" );
   mainWindow.listButtonC = mainWindow.actionMenuC.add( "iconbutton", undefined, settings.listImages[0], calendarTypeProperties );
   mainWindow.actionMenuC.add( "statictext", undefined, "List" );
   mainWindow.lineButtonC = mainWindow.actionMenuC.add( "iconbutton", undefined, settings.lineImages[1], calendarTypeProperties );
   mainWindow.actionMenuC.add( "statictext", undefined, "Line" );
   mainWindow.utilitiesButtonC = mainWindow.actionMenuC.add( "iconbutton", undefined, settings.utilitiesImages[0], calendarTypeProperties );
   mainWindow.actionMenuC.add( "statictext", undefined, "Utilities" );
   mainWindow.helpButtonC = mainWindow.actionMenuC.add( "iconbutton", undefined, settings.helpImages[0], calendarTypeProperties );
   mainWindow.actionMenuC.add( "statictext", undefined, "Help" );
   
   mainWindow.gridButtonD = mainWindow.actionMenuD.add( "iconbutton", undefined, settings.gridImages[0], calendarTypeProperties );
   mainWindow.actionMenuD.add( "statictext", undefined, "Grid" );
   mainWindow.listButtonD = mainWindow.actionMenuD.add( "iconbutton", undefined, settings.listImages[0], calendarTypeProperties );
   mainWindow.actionMenuD.add( "statictext", undefined, "List" );
   mainWindow.lineButtonD = mainWindow.actionMenuD.add( "iconbutton", undefined, settings.lineImages[0], calendarTypeProperties );
   mainWindow.actionMenuD.add( "statictext", undefined, "Line" );
   mainWindow.utilitiesButtonD = mainWindow.actionMenuD.add( "iconbutton", undefined, settings.utilitiesImages[1], calendarTypeProperties );
   mainWindow.actionMenuD.add( "statictext", undefined, "Utilities" );
   mainWindow.helpButtonD = mainWindow.actionMenuD.add( "iconbutton", undefined, settings.helpImages[0], calendarTypeProperties );
   mainWindow.actionMenuD.add( "statictext", undefined, "Help" );
   
   mainWindow.gridButtonE = mainWindow.actionMenuE.add( "iconbutton", undefined, settings.gridImages[0], calendarTypeProperties );
   mainWindow.actionMenuE.add( "statictext", undefined, "Grid" );
   mainWindow.listButtonE = mainWindow.actionMenuE.add( "iconbutton", undefined, settings.listImages[0], calendarTypeProperties );
   mainWindow.actionMenuE.add( "statictext", undefined, "List" );
   mainWindow.lineButtonE = mainWindow.actionMenuE.add( "iconbutton", undefined, settings.lineImages[0], calendarTypeProperties );
   mainWindow.actionMenuE.add( "statictext", undefined, "Line" );
   mainWindow.utilitiesButtonE = mainWindow.actionMenuE.add( "iconbutton", undefined, settings.utilitiesImages[0], calendarTypeProperties );
   mainWindow.actionMenuE.add( "statictext", undefined, "Utilities" );
   mainWindow.helpButtonE = mainWindow.actionMenuE.add( "iconbutton", undefined, settings.helpImages[1], calendarTypeProperties );
   mainWindow.actionMenuE.add( "statictext", undefined, "Help" );

   mainWindow.gridButtonA.onClick = function(){ gridPressed( settings, mainWindow ); };
   mainWindow.gridButtonB.onClick = function(){ gridPressed( settings, mainWindow ); };
   mainWindow.gridButtonC.onClick = function(){ gridPressed( settings, mainWindow ); };
   mainWindow.gridButtonD.onClick = function(){ gridPressed( settings, mainWindow ); };
   mainWindow.gridButtonE.onClick = function(){ gridPressed( settings, mainWindow ); };
   
   mainWindow.listButtonA.onClick = function(){ listPressed( settings, mainWindow ); };
   mainWindow.listButtonB.onClick = function(){ listPressed( settings, mainWindow ); };
   mainWindow.listButtonC.onClick = function(){ listPressed( settings, mainWindow ); };
   mainWindow.listButtonD.onClick = function(){ listPressed( settings, mainWindow ); };
   mainWindow.listButtonE.onClick = function(){ listPressed( settings, mainWindow ); };
   
   mainWindow.lineButtonA.onClick = function(){ linePressed( settings, mainWindow ); };
   mainWindow.lineButtonB.onClick = function(){ linePressed( settings, mainWindow ); };
   mainWindow.lineButtonC.onClick = function(){ linePressed( settings, mainWindow ); };
   mainWindow.lineButtonD.onClick = function(){ linePressed( settings, mainWindow ); };
   mainWindow.lineButtonE.onClick = function(){ linePressed( settings, mainWindow ); };
   
   mainWindow.utilitiesButtonA.onClick = function(){ utilitiesPressed( settings, mainWindow ); };
   mainWindow.utilitiesButtonB.onClick = function(){ utilitiesPressed( settings, mainWindow ); };
   mainWindow.utilitiesButtonC.onClick = function(){ utilitiesPressed( settings, mainWindow ); };
   mainWindow.utilitiesButtonD.onClick = function(){ utilitiesPressed( settings, mainWindow ); };
   mainWindow.utilitiesButtonE.onClick = function(){ utilitiesPressed( settings, mainWindow ); };

   mainWindow.helpButtonA.onClick = function(){ helpPressed( settings, mainWindow ); };
   mainWindow.helpButtonB.onClick = function(){ helpPressed( settings, mainWindow ); };
   mainWindow.helpButtonC.onClick = function(){ helpPressed( settings, mainWindow ); };
   mainWindow.helpButtonD.onClick = function(){ helpPressed( settings, mainWindow ); };
   mainWindow.helpButtonE.onClick = function(){ helpPressed( settings, mainWindow ); };

  
   mainWindow.controlContainer = mainWindow.topContainer.add( "group{ orientation:'stack' }" );
   mainWindow.controlContainer.alignment = fillAll;
   mainWindow.controlContainer.alignChildren = fillAll;
   
   mainWindow.calendarControlContainer = mainWindow.controlContainer.add( "group{ orientation:'column' }" );
   mainWindow.utilitiesContainer = mainWindow.controlContainer.add( "panel{ text:'Utilities', orientation:'column' }" );
   mainWindow.helpContainer = mainWindow.controlContainer.add( "panel{ text:'Help', orientation:'column' }" );
   mainWindow.calendarControlContainer.visible = true;
   mainWindow.utilitiesContainer.visible = false;
   mainWindow.helpContainer.visible = false;
   mainWindow.calendarControlContainer.alignChildren = ['fill', 'top'];
   mainWindow.calendarControlContainer.spacing = 0;

/*
   mainWindow.calendarControlIdContainer = mainWindow.calendarControlContainer.add( "group{ orientation:'stack' }" );
   mainWindow.calendarControlIdGrid = mainWindow.calendarControlIdContainer.add( "group{ orientation:'row' }" );
   mainWindow.calendarControlIdGrid.add( "statictext" , undefined, "Grid Calendar Creation Selected" );
   mainWindow.calendarControlIdGrid.visible = true;
   
   mainWindow.calendarControlIdList = mainWindow.calendarControlIdContainer.add( "group{ orientation:'row' }" );
   mainWindow.calendarControlIdList.add( "statictext" , undefined, "List Calendar Creation Selected" );
   mainWindow.calendarControlIdList.visible = false;
   
   mainWindow.calendarControlIdLine = mainWindow.calendarControlIdContainer.add( "group{ orientation:'row' }" );
   mainWindow.calendarControlIdLine.add( "statictext" , undefined, "Line Calendar Creation Selected" );
   mainWindow.calendarControlIdLine.visible = false;
*/ 

   mainWindow.calendarControlMenuContainer = mainWindow.calendarControlContainer.add( "group{ orientation:'stack' }" );
   mainWindow.calendarControlMenuA1 = mainWindow.calendarControlMenuContainer.add( "group{ orientation:'row' }" );
   mainWindow.calendarControlMenuC1 = mainWindow.calendarControlMenuContainer.add( "group{ orientation:'row' }" );
   mainWindow.calendarControlMenuD1 = mainWindow.calendarControlMenuContainer.add( "group{ orientation:'row' }" );
   mainWindow.calendarControlMenuA2 = mainWindow.calendarControlMenuContainer.add( "group{ orientation:'row' }" );
   mainWindow.calendarControlMenuC2 = mainWindow.calendarControlMenuContainer.add( "group{ orientation:'row' }" );
   mainWindow.calendarControlMenuD2 = mainWindow.calendarControlMenuContainer.add( "group{ orientation:'row' }" );

   mainWindow.calendarControlMenuA1.visible = true;
   mainWindow.calendarControlMenuC1.visible = false;
   mainWindow.calendarControlMenuD1.visible = false;
   mainWindow.calendarControlMenuA2.visible = false;
   mainWindow.calendarControlMenuC2.visible = false;
   mainWindow.calendarControlMenuD2.visible = false;

   mainWindow.basicButtonA1        = mainWindow.calendarControlMenuA1.add( "iconbutton", undefined, settings.basicButtonImages[1], calendarTypeProperties );
   mainWindow.holidaysButtonA1     = mainWindow.calendarControlMenuA1.add( "iconbutton", undefined, settings.holidaysButtonImages[0], calendarTypeProperties );
   mainWindow.customFramesButtonA1 = mainWindow.calendarControlMenuA1.add( "iconbutton", undefined, settings.customFramesButtonImages[0], calendarTypeProperties );

   mainWindow.basicButtonC1        = mainWindow.calendarControlMenuC1.add( "iconbutton", undefined, settings.basicButtonImages[0], calendarTypeProperties );
   mainWindow.holidaysButtonC1     = mainWindow.calendarControlMenuC1.add( "iconbutton", undefined, settings.holidaysButtonImages[1], calendarTypeProperties );
   mainWindow.customFramesButtonC1 = mainWindow.calendarControlMenuC1.add( "iconbutton", undefined, settings.customFramesButtonImages[0], calendarTypeProperties );
   
   mainWindow.basicButtonD1        = mainWindow.calendarControlMenuD1.add( "iconbutton", undefined, settings.basicButtonImages[0], calendarTypeProperties );
   mainWindow.holidaysButtonD1     = mainWindow.calendarControlMenuD1.add( "iconbutton", undefined, settings.holidaysButtonImages[0], calendarTypeProperties );
   mainWindow.customFramesButtonD1 = mainWindow.calendarControlMenuD1.add( "iconbutton", undefined, settings.customFramesButtonImages[1], calendarTypeProperties );

   mainWindow.basicButtonA2        = mainWindow.calendarControlMenuA2.add( "iconbutton", undefined, settings.basicButtonImages[1], calendarTypeProperties );
   mainWindow.holidaysButtonA2     = mainWindow.calendarControlMenuA2.add( "iconbutton", undefined, settings.holidaysButtonImages[0], calendarTypeProperties );
   mainWindow.customFramesButtonA2 = mainWindow.calendarControlMenuA2.add( "iconbutton", undefined, settings.customFramesButtonImages[0], calendarTypeProperties );

   mainWindow.basicButtonC2        = mainWindow.calendarControlMenuC2.add( "iconbutton", undefined, settings.basicButtonImages[0], calendarTypeProperties );
   mainWindow.holidaysButtonC2     = mainWindow.calendarControlMenuC2.add( "iconbutton", undefined, settings.holidaysButtonImages[1], calendarTypeProperties );
   mainWindow.customFramesButtonC2 = mainWindow.calendarControlMenuC2.add( "iconbutton", undefined, settings.customFramesButtonImages[0], calendarTypeProperties );
   
   mainWindow.basicButtonD2        = mainWindow.calendarControlMenuD2.add( "iconbutton", undefined, settings.basicButtonImages[0], calendarTypeProperties );
   mainWindow.holidaysButtonD2     = mainWindow.calendarControlMenuD2.add( "iconbutton", undefined, settings.holidaysButtonImages[0], calendarTypeProperties );
   mainWindow.customFramesButtonD2 = mainWindow.calendarControlMenuD2.add( "iconbutton", undefined, settings.customFramesButtonImages[1], calendarTypeProperties );

   mainWindow.basicButtonA1.onClick = function(){ basicButtonPressed( settings, mainWindow ); };
   mainWindow.basicButtonC1.onClick = function(){ basicButtonPressed( settings, mainWindow ); };
   mainWindow.basicButtonD1.onClick = function(){ basicButtonPressed( settings, mainWindow ); };
   mainWindow.basicButtonA2.onClick = function(){ basicButtonPressed( settings, mainWindow ); };
   mainWindow.basicButtonC2.onClick = function(){ basicButtonPressed( settings, mainWindow ); };
   mainWindow.basicButtonD2.onClick = function(){ basicButtonPressed( settings, mainWindow ); };

   mainWindow.holidaysButtonA1.onClick = function(){ holidaysButtonPressed( settings, mainWindow ); };
   mainWindow.holidaysButtonC1.onClick = function(){ holidaysButtonPressed( settings, mainWindow ); };
   mainWindow.holidaysButtonD1.onClick = function(){ holidaysButtonPressed( settings, mainWindow ); };
   mainWindow.holidaysButtonA2.onClick = function(){ holidaysButtonPressed( settings, mainWindow ); };
   mainWindow.holidaysButtonC2.onClick = function(){ holidaysButtonPressed( settings, mainWindow ); };
   mainWindow.holidaysButtonD2.onClick = function(){ holidaysButtonPressed( settings, mainWindow ); };
   
   mainWindow.customFramesButtonA1.onClick = function(){ customFramesButtonPressed( settings, mainWindow ); };
   mainWindow.customFramesButtonC1.onClick = function(){ customFramesButtonPressed( settings, mainWindow ); };
   mainWindow.customFramesButtonD1.onClick = function(){ customFramesButtonPressed( settings, mainWindow ); };
   mainWindow.customFramesButtonA2.onClick = function(){ customFramesButtonPressed( settings, mainWindow ); };
   mainWindow.customFramesButtonC2.onClick = function(){ customFramesButtonPressed( settings, mainWindow ); };
   mainWindow.customFramesButtonD2.onClick = function(){ customFramesButtonPressed( settings, mainWindow ); };


   mainWindow.calendarControlActionContainer = mainWindow.calendarControlContainer.add( "group{ orientation:'stack' }" );
   mainWindow.calendarControlActionContainer.alignment = fillAll;
   mainWindow.calendarControlActionContainer.alignChildren = fillAll;
   mainWindow.calendarBasicContainer         = mainWindow.calendarControlActionContainer.add( "panel{ text:'Basic', orientation:'column' }" );
   mainWindow.calendarHolidaysContainer      = mainWindow.calendarControlActionContainer.add( "panel{ text:'Holidays', orientation:'column' }" );
   mainWindow.calendarCustomFramesContainer  = mainWindow.calendarControlActionContainer.add( "panel{ text:'Custom Frames', orientation:'row' }" );
   mainWindow.calendarBasicContainer.visible = true;
   mainWindow.calendarHolidaysContainer.visible = false;
   mainWindow.calendarCustomFramesContainer.visible = false;
   mainWindow.calendarBasicContainer.alignChildren = ['fill', 'top'];
   mainWindow.calendarHolidaysContainer.alignment = ['fill', 'top'];
   mainWindow.calendarCustomFramesContainer.alignment = ['fill', 'top'];

   with( mainWindow.calendarBasicContainer ){
      spacing = 0;
      with( add( "group{ orientation:'row'}" )){
         alignment = ['fill', 'top'];
         with( add( "group{ orientation:'row'}" )){
            alignment = ['fill', 'top'];
            with( add( "group{ orientation:'column'}" )){
               add( 'statictext', undefined, "First Month" );
               add( 'statictext', undefined, "Last Month" );
            }
            with( add( "group{ orientation:'column'}" )){
               mainWindow.startMonth = add( 'dropdownlist', undefined, settings.widgitValues.startMonth.values );
               mainWindow.endMonth = add( 'dropdownlist', undefined, settings.widgitValues.endMonth.values );
               mainWindow.startMonth.selection = settings.widgitValues.startMonth.initial;
               mainWindow.endMonth.selection = settings.widgitValues.endMonth.initial;
            }
            mainWindow.yearContainer = add( "group{ orientation:'stack'}" );
            mainWindow.yearContainer.alignChildren = ['top', 'right'];

            mainWindow.yearSelectionContainer = mainWindow.yearContainer.add( "group{ orientation:'row' }" ); 
            with( mainWindow.yearSelectionContainer ){
               visible = true;
               alignChildren = ['right', 'top'];
               with( add( "group{ orientation:'column'}" )){
                  mainWindow.startYear = add( 'dropdownlist', undefined, settings.widgitValues.startYear.values );
                  mainWindow.endYear = add( 'dropdownlist', undefined, settings.widgitValues.endYear.values );
                  mainWindow.startYear.selection = settings.widgitValues.startYear.initial;
                  mainWindow.endYear.selection = settings.widgitValues.endYear.initial;
               }
               with( add( "group{ orientation:'column'}" )){
                  mainWindow.showYearEntryButton = add( 'button', undefined, "Show Year Entry" );
                  mainWindow.showYearEntryButton.onClick = function(){ showYearEntryContainer( settings, mainWindow ); };
               }
            }
            mainWindow.yearEntryContainer = mainWindow.yearContainer.add( "group{ orientation:'row'}" );
            with( mainWindow.yearEntryContainer ){
               visible = false;
               alignChildren = ['right', 'top'];
               with( add( "group{ orientation:'column'}" )){
                  alignChildren = ['right', 'top'];
                  with( add( "group{ orientation:'row' }" ) ){
                     spacing = 0;
                     mainWindow.customStartYear = add( 'edittext', undefined, settings.widgitValues.customStartYear.initial );
                     mainWindow.customStartYear.preferredSize = [ 40, defaultHeight( settings ) ];
                     mainWindow.customStartYear.onChange = function(){ validateCustomStartYear( settings, mainWindow ); };
                  }
                  with( add( "group{ orientation:'row' }" ) ){
                     spacing = 0;
                     mainWindow.customEndYear = add( 'edittext', undefined, settings.widgitValues.customEndYear.initial );
                     mainWindow.customEndYear.preferredSize = [ 40, defaultHeight( settings ) ];
                     mainWindow.customEndYear.onChange = function(){ validateCustomEndYear( settings, mainWindow ); };
                  }
               }
               with( add( "group{ orientation:'column'}" )){
                  mainWindow.showYearSelectionButton = add( 'button', undefined, "Show Year Selection" );
                  mainWindow.showYearSelectionButton.onClick = function(){ showYearSelectionContainer( settings, mainWindow ); };
               }
            }
         }
         mainWindow.presetContainer = add( "group{ orientation:'column'}" );
         with( mainWindow.presetContainer ){
            visible = true;
            alignment = ['right', 'top'];
            spacing = 0;
            with( add( "group{ orientation:'row' }" ) ){
               spacing = 0;
               alignment = ['fill', 'top'];
               helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
               helpButton.onClick = function(){ showWidgetHelp( presetText( settings )
                                                 );};
               add( 'statictext', undefined, "Preset" );
               mainWindow.presetDropdown = add( 'dropdownlist', undefined, settings.presetFilesShort );
               mainWindow.presetDropdown.preferredSize = [300, defaultHeight( settings )];
               mainWindow.presetDropdown.selection = 0;
               mainWindow.loadPresetButton = add( 'button', undefined, "Load" );
               mainWindow.savePresetToFileButton = add( 'button', undefined, "+" );
               mainWindow.deletePresetButton = add( 'button', undefined, "-" );
            }
         }
      }
      with( add( "group{ orientation:'row' }" )){
         with( add( "panel{ text:'Common Settings', orientation:'column' }" )){
            alignment = ['fill', 'fill'];
            alignChildren = 'fill';
            spacing = 0;

            //add( 'statictext', undefined, "" );

            with( add( "group{ orientation:'row' }" )){
               alignChildren = 'left';
               add( 'statictext', undefined, "Language:" );
               mainWindow.language = add( 'dropdownlist', undefined, settings.widgitValues.language.valuesOriginal );
               mainWindow.language.selection = settings.widgitValues.language.initial;
            }
            with( add( "group{ orientation:'row' }" )){
               alignChildren = 'left';
               add( 'statictext', undefined, "Week Day Heading Style:" );
               mainWindow.weekDayHeadingStyle = add( 'dropdownlist', undefined, settings.widgitValues.weekDayHeadingStyle.values );
               mainWindow.weekDayHeadingStyle.selection = settings.widgitValues.weekDayHeadingStyle.initial;
            }
            with( add( "group{ orientation:'row' }" )){
               spacing = 0;
               alignChildren = ['left', 'middle'];
               helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
               helpButton.onClick = function(){ showWidgetHelp( "For a grid calendar, the \"Week Starts On\" value determines which day of the week is in the left most column. "
                                                          + "For the list and line calendars, it determines the date in which the work week (or week day "
                                                          + "if \'Only Print First Weekday\" is selected) is printed." ); };
               add( 'statictext', undefined, "Week Starts On:" );
               mainWindow.weekStartsOn = add( 'dropdownlist', undefined, settings.widgitValues.weekStartsOn.values );
               mainWindow.weekStartsOn.selection = settings.widgitValues.weekStartsOn.initial;
               mainWindow.weekStartsOn.onChange = function(){ validateWeekStartsOnSettings( settings, mainWindow ); };
            }
            with( add( "group{ orientation:'row' }" )){
               spacing = 0;
               alignChildren = ['left', 'middle'];
               helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
               helpButton.onClick = function(){ showWidgetHelp( "If selected, the wizard will include a number representing the week of the year. This is often "
                                                               +"used in business for planning and coordinating activities."
                                    );};
               mainWindow.includeWorkWeek = add( 'checkbox', undefined, "Include Work Week" );
               mainWindow.includeWorkWeek.value = settings.widgitValues.includeWorkWeek.initial;
            }
            with( add( "group{ orientation:'row' }" )){
               alignChildren = ['left', 'middle'];
               mainWindow.workWeekOptionsLabel = add( 'statictext', undefined, "Work Week 1:" );
               mainWindow.workWeekOptions = add( 'dropdownlist', undefined, settings.widgitValues.workWeekOptions.values );
               mainWindow.workWeekOptions.selection = settings.widgitValues.workWeekOptions.initial;
               mainWindow.workWeekOptionsLabel.enabled = settings.widgitValues.includeWorkWeek.initial;
               mainWindow.workWeekOptions.enabled = settings.widgitValues.includeWorkWeek.initial;
               mainWindow.workWeekOptions.onChange = function(){ validateWeekStartsOnSettings( settings, mainWindow ); };
              
            }
            with( add( "group{ orientation:'row' }" )){
               spacing = 0;
               alignChildren = ['left', 'middle'];
               helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
               helpButton.onClick = function(){ showWidgetHelp( "This text will be prefixed to the number representing the work week.  A common prefix is \"WW\"."
                                    );};
               mainWindow.workWeekPrefixLabel = add( 'statictext', undefined, "Work Week Prefix:" );
               mainWindow.workWeekPrefix = add( 'edittext', undefined, settings.widgitValues.workWeekPrefix.initial );
               mainWindow.workWeekPrefix.preferredSize = [ 50, defaultHeight( settings ) ];
               mainWindow.workWeekPrefixLabel.enabled = settings.widgitValues.includeWorkWeek.initial;
               mainWindow.workWeekPrefix.enabled = settings.widgitValues.includeWorkWeek.initial;
            }
            with( add( "group{ orientation:'row' }" )){
               spacing = 0;
               alignChildren = ['left', 'middle'];
               helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
               helpButton.onClick = function(){ showWidgetHelp( "The calendar wizard uses a refactoring of the basic code from the March, 1985 issue of Sky & Telescope Magazine. "
                                                               +"The algorithm is approximate and based on observing the moon from the prime meridian (GMT/UTC time).  The "
                                                               +"algorithm is not very accurate with regards to the half moons and they can be either early or late by a day. "
                                                               +"For an accurate inclusion of the moon phase with respect to your time zone, it is best to create a \"Moons\" "
                                                               +"holiday file and explicitly set the dates using a more reliable source.\n\n"
                                                               +"http://www.skyandtelescope.com/astronomy-resources/basic-programs-from-sky-telescope"
                                    );};
               mainWindow.includeMoons = add( 'checkbox', undefined, "Include Moon Phase" );
               mainWindow.includeMoons.value = settings.widgitValues.includeMoons.initial;
            }
            with( add( "group{ orientation:'row' }" )){
               alignChildren = ['left', 'middle'];
               mainWindow.moonSizeLabel = add( 'statictext', undefined, "Moon Size:" );
               mainWindow.moonSize = add( 'edittext', undefined, settings.widgitValues.moonSize.initial );
               mainWindow.moonSize.preferredSize = [ 50, defaultHeight( settings ) ];
               mainWindow.moonSizeLabelSuffix = add( 'statictext', undefined, "% of the cell" );
               mainWindow.moonSizeLabel.enabled = settings.widgitValues.includeMoons.initial;
               mainWindow.moonSize.enabled = settings.widgitValues.includeMoons.initial;
               mainWindow.moonSizeLabelSuffix.enabled = settings.widgitValues.includeMoons.initial;
            }
            with( add( "group{ orientation:'row' }" )){
               alignChildren = ['left', 'middle'];
               mainWindow.moonRotationLabel = add( 'statictext', undefined, "Moon Rotation:" );
               mainWindow.moonRotationLabel.enabled = false;
               mainWindow.moonRotation = add( 'dropdownlist', undefined, settings.widgitValues.moonRotation.values );
               mainWindow.moonRotation.selection = settings.widgitValues.moonRotation.initial;
               mainWindow.moonRotation.enabled = false;
            }
            with( add( "group{ orientation:'row' }" )){
               spacing = 0;
               alignChildren = ['left', 'middle'];
               helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
               helpButton.onClick = function(){ showWidgetHelp( "When checked, the wizard will apply a holiday cell and paragraph style to the date.  By default "
                                                               +"the date will be colored the same as the last holiday in the cell"
                                    );};
               mainWindow.highlightHolidays = add( 'checkbox', undefined, "Highlight Holidays" );
               mainWindow.highlightHolidays.value = settings.widgitValues.highlightHolidays.initial;
               mainWindow.highlightHolidays.onClick = function(){ enableDominantHighlighting( settings, mainWindow ); };
            }
            with( add( "group{ orientation:'row' }" )){
               spacing = 0;
               alignChildren = ['left', 'middle'];
               helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
               helpButton.onClick = function(){ showWidgetHelp( "Sometimes, the script will want to highlight the date because it is a holiday and "
                                                                +"also because it is a Sunday or Saturday; however, as both styles cannot be "
                                                                +"simultaneously applied a decision needs to be made about which style to apply.  This option "
                                                                +"allows the user to determine which of the two styles should be dominant (used) if "
                                                                +"both highlighting styles are requested."
                                    );};
               mainWindow.dominantHighlightingLabel = add( 'statictext', undefined, "Dominant Highlighting:" );
               mainWindow.dominantHighlighting = add( 'dropdownlist', undefined, settings.widgitValues.dominantHighlighting.values );
               mainWindow.dominantHighlighting.selection = settings.widgitValues.dominantHighlighting.initial;
            }
            with( add( "group{ orientation:'row' }" )){
               spacing = 0;
               alignChildren = ['left', 'middle'];
               helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
               helpButton.onClick = function(){ showWidgetHelp( "When checked, rather than creating the needed styles, the wizard ask you to locate another InDesign "
                                                               +"file from which to import them. Any needed styles that are not imported will be created\n\n"
                                                               +"This is useful for making \'reference\' calendars that contain the styling information such "
                                                               +"as the font, font size, background colors, grid lines, etc.. and applying those styles to "
                                                               +"new calendars." 
                                    );};
               mainWindow.importStylesFromReferenceCalendar = add( 'checkbox', undefined, "Import Styles From Reference Calendar" );
               mainWindow.importStylesFromReferenceCalendar.value = settings.widgitValues.importStylesFromReferenceCalendar.initial;
            }
         }
         with( add( "group{ orientation:'stack' }" )){
            alignment = ['fill', 'fill'];
            alignChildren = ['fill', 'fill'];
            mainWindow.basicGridOptions = add( "panel{ text: 'Grid Options', orientation:'column' }" );
            mainWindow.basicListLineOptions = add( "panel{ text: 'Line/List Options', orientation:'column' }" );
            mainWindow.basicGridOptions.visible = true;
            mainWindow.basicListLineOptions.visible=false;

            with( mainWindow.basicGridOptions ){
               alignChildren = ['left', 'top'];
               //add( 'statictext', undefined, "" );
               spacing = 0;
               with( add( "group{ orientation:'row' }" )){
                  spacing = 0;
                  alignChildren = ['left', 'middle'];
                  helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
                  helpButton.onClick = function(){ showWidgetHelp( "This option sets how the grid calendar should be labeled.  With the exclude option, "
                                                                  +"the top row of the grid calendar will be omitted.  This is useful when the month name "
                                                                  +"is placed elsewhere on the page, such as overlaying a picture.  This option also controls "
                                                                  +"if the year should be included or not.\n"
                                                                  +"\n"
                                                                  +"If a custom frame for the month is defined, the month will be excluded from the calendar "
                                                                  +"table.  If no custom year frame is defined, but this option asks for both the month and "
                                                                  +"year, both the month and year will be inserted into the custom frame."
                                       );};
                  add( 'statictext', undefined, "Calendar Title:" );
                  mainWindow.gridCalendarMonthLabelingOptions = add( 'dropdownlist', undefined, settings.widgitValues.gridCalendarMonthLabelingOptions.values );
                  mainWindow.gridCalendarMonthLabelingOptions.selection = settings.widgitValues.gridCalendarMonthLabelingOptions.initial;
               }
               with( add( "group{ orientation:'row' }" )){
                  spacing = 0;
                  alignChildren = 'left';
                  helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
                  helpButton.onClick = function(){ showWidgetHelp( "By default, the wizard will create as many rows as are necessary so that every date "
                                                                  +"gets a cell.  By restricting this to 5, if a 6th row was needed, those dates will "
                                                                  +"will reuse the last row with a diagonal seperator.  If 6 rows are selected and only "
                                                                  +"5 are needed, the last row will be empty.  For the situation of February fitting into "
                                                                  +"4 rows, choosing 5 rows will leave one empty row and 6 will leave two."
                                       );};
                  add( 'statictext', undefined, "Max Number of Rows:" );
                  mainWindow.maxNumberOfRowsOptions = add( 'dropdownlist', undefined, settings.widgitValues.maxNumberOfRowsOptions.values );
                  mainWindow.maxNumberOfRowsOptions.selection = settings.widgitValues.maxNumberOfRowsOptions.initial;
               }
               with( add( "group{ orientation:'row' }" )){
                  spacing = 0;
                  alignChildren = ['left', 'middle'];
                  helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
                  helpButton.onClick = function(){ showWidgetHelp( "This option adds mini-calendars of the previous and next month to the left and right of the top row. "
                                                                  +"This option is only valid if the Month Name is included with the Grid Calendar (as the top row is "
                                                                  +"is excluded when the month name is excluded).  This setting cannot be used in conjuntion with the "
                                                                  +"custom month frame."
                                       );};
                  mainWindow.includeMiniCalendars = add( 'checkbox', undefined, "Include Mini-Calendars" );
                  mainWindow.includeMiniCalendars.value = settings.widgitValues.includeMiniCalendars.initial;
               }
               with( add( "group{ orientation:'row' }" )){
                  spacing = 0;
                  alignChildren = ['left', 'middle'];
                  helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
                  helpButton.onClick = function(){ showWidgetHelp( "The value of \"Auto\" will not include the year, if the year of the mini calendar is the same as "
                                                                  +"the main calendar.  However, if the years are different, the year will be included.  Selecting "
                                                                  +"\"Month\" will only include the month.  Selecting \"Month and Year\" will always include both "
                                                                  +"the month and year"
                                       );};
                  mainWindow.miniCalendarMonthLabelingOptionsLabel = add( 'statictext', undefined, "Mini-Calendar Title:" );
                  mainWindow.miniCalendarMonthLabelingOptions = add( 'dropdownlist', undefined, settings.widgitValues.miniCalendarMonthLabelingOptions.values );
                  mainWindow.miniCalendarMonthLabelingOptions.selection = settings.widgitValues.miniCalendarMonthLabelingOptions.initial;
                  mainWindow.miniCalendarMonthLabelingOptionsLabel.enabled = settings.widgitValues.includeMiniCalendars.initial;
                  mainWindow.miniCalendarMonthLabelingOptions.enabled = settings.widgitValues.includeMiniCalendars.initial;
               }
               with( add( "group{ orientation:'row' }" )){
                  spacing = 0;
                  alignChildren = ['left', 'middle'];
                  helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
                  helpButton.onClick = function(){ showWidgetHelp( "As with the main calendar max row options, this will force the mini calendars "
                                                                  +"to have either 6 rows or as many as needed.  There is no option for 5 rows as "
                                                                  +"the mini calendars are too small to support the split cells in the last row."
                                       );};
                  mainWindow.maxNumberOfRowsInMiniCalendarsOptionsLabel = add( 'statictext', undefined, "Max Rows In Mini-Calendars:" );
                  mainWindow.maxNumberOfRowsInMiniCalendarsOptions = add( 'dropdownlist', undefined, settings.widgitValues.maxNumberOfRowsInMiniCalendarsOptions.values );
                  mainWindow.maxNumberOfRowsInMiniCalendarsOptions.selection = settings.widgitValues.maxNumberOfRowsInMiniCalendarsOptions.initial;
                  mainWindow.maxNumberOfRowsInMiniCalendarsOptionsLabel.enabled = settings.widgitValues.includeMiniCalendars.initial;
                  mainWindow.maxNumberOfRowsInMiniCalendarsOptions.enabled = settings.widgitValues.includeMiniCalendars.initial;
               }
               with( add( "group{ orientation:'row' }" )){
                  spacing = 0;
                  alignChildren = ['left', 'middle'];
                  helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
                  helpButton.onClick = function(){ showWidgetHelp( "If not checked, the row with the weekday names will be excluded."
                                       );};
                  mainWindow.includeWeekDayInGridCalendar = add( 'checkbox', undefined, "Include Week Day" );
                  mainWindow.includeWeekDayInGridCalendar.value = settings.widgitValues.includeWeekDayInGridCalendar.initial;
               }
               with( add( "group{ orientation:'row' }" )){
                  spacing = 0;
                  alignChildren = ['left', 'middle'];
                  helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
                  helpButton.onClick = function(){ showWidgetHelp( "If checked, the dates will be included for cells belonging to the previous and next months. "
                                                                  +"They will be given a distinguishing style. For grid calendars, this setting will also effect the "
                                                                  +"mini-calendars."
                                       );};
                  mainWindow.includeNonMonthDays = add( 'checkbox', undefined, "Include Non-Month Days" );
                  mainWindow.includeNonMonthDays.value = settings.widgitValues.includeNonMonthDays.initial;
               }
               with( add( "group{ orientation:'row' }" )){
                  spacing = 0;
                  alignChildren = ['left', 'middle'];
                  helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
                  helpButton.onClick = function(){ showWidgetHelp( "If checked, the dates belonging to sundays will be given a special cell and paragraph style. "
                                                                  +"By default, the dates are turned red. For grid calendars, this setting will also effect the "
                                                                  +"mini-calendars; however, there is a dedicated mini-calendar style that can be used to "
                                                                  +"un-highlight the days."
                                       );};
                  mainWindow.highlightSundays = add( 'checkbox', undefined, "Highlight Sundays" );
                  mainWindow.highlightSundays.value = settings.widgitValues.highlightSundays.initial;
                  mainWindow.highlightSundays.onClick = function(){ enableDominantHighlighting( settings, mainWindow ); };
               }
            }
            with( mainWindow.basicListLineOptions ){
               alignChildren = ['left', 'top'];
               //spacing = 0;
               //add( 'statictext', undefined, "" );
               with( add( "group{ orientation:'row' }" )){
                  alignChildren = ['left', 'middle'];
                  add( 'statictext', undefined, "Title Options:" );
                  mainWindow.listLineCalendarMonthLabelingOptions = add( 'dropdownlist', undefined, settings.widgitValues.listLineCalendarMonthLabelingOptions.values );
                  mainWindow.listLineCalendarMonthLabelingOptions.selection = settings.widgitValues.listLineCalendarMonthLabelingOptions.initial;
               }
               with( add( "group{ orientation:'row' }" )){
                  alignChildren = ['left', 'middle'];
                  add( 'statictext', undefined, "Highlight Weekend:" );
                  mainWindow.highlightWeekendOptions = add( 'dropdownlist', undefined, settings.widgitValues.highlightWeekendOptions.values );
                  mainWindow.highlightWeekendOptions.selection = settings.widgitValues.highlightWeekendOptions.initial;
                  mainWindow.highlightWeekendOptions.onChange = function(){ enableDominantHighlighting( settings, mainWindow ); };
               }
               with( add( "group{ orientation:'row' }" )){
                  alignChildren = ['left', 'middle'];
                  mainWindow.includeStylesForEveryDay = add( 'checkbox', undefined, "Include Styles For Every Day" );
                  mainWindow.includeStylesForEveryDay.value = settings.widgitValues.includeStylesForEveryDay.initial;
               }
               with( add( "group{ orientation:'row' }" )){
                  alignChildren = ['left', 'middle'];
                  mainWindow.daysPerLineOptionsLabel = add( 'statictext', undefined, "Days Per Line:" );
                  mainWindow.daysPerLineOptions = add( 'dropdownlist', undefined, settings.widgitValues.daysPerLineOptions.values );
                  mainWindow.daysPerLineOptions.selection = settings.widgitValues.daysPerLineOptions.initial;
               }
               with( add( "group{ orientation:'row' }" )){
                  alignChildren = ['left', 'middle'];
                  mainWindow.orientationOptionsLabel = add( 'statictext', undefined, "Orientation:" );
                  mainWindow.orientationOptions = add( 'dropdownlist', undefined, settings.widgitValues.orientationOptions.values );
                  mainWindow.orientationOptions.selection = settings.widgitValues.orientationOptions.initial;
               }
               with( add( "group{ orientation:'row' }" )){
                  spacing = 0;
                  alignChildren = ['left', 'middle'];
                  helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
                  helpButton.onClick = function(){ showWidgetHelp( "Since different months have different number of days "
                                                                  +"a choice needs to be made for the line calendar to fill all of the frame, which means months with more days "
                                                                  +"will have narrower cells, or leave some empty space at the end such that all of the cells "
                                                                  +"are the same. This setting makes that choice.  The value of \"auto\" will use the full frame if "
                                                                  +"only generating a calendar for a single month and space the cells to accomidate 31 days if "
                                                                  +"more then one month is being generated."
                                       );};
                  mainWindow.cellSpacingOptionsLabel = add( 'statictext', undefined, "Cell Spacing:" );
                  mainWindow.cellSpacingOptions = add( 'dropdownlist', undefined, settings.widgitValues.cellSpacingOptions.values );
                  mainWindow.cellSpacingOptions.selection = settings.widgitValues.cellSpacingOptions.initial;
               }
               with( add( "group{ orientation:'row' }" )){
                  alignChildren = ['left', 'middle'];
                  mainWindow.forceSquareCells = add( 'checkbox', undefined, "Force Square Cells" );
                  mainWindow.forceSquareCells.value = settings.widgitValues.forceSquareCells.initial;
               }
               with( add( "group{ orientation:'row' }" )){
                  alignChildren = ['left', 'middle'];
                  mainWindow.onlyPrintFirstWeekday = add( 'checkbox', undefined, "Only Print First Weekday" );
                  mainWindow.onlyPrintFirstWeekday.value = settings.widgitValues.onlyPrintFirstWeekday.initial;
               }
               with( add( "group{ orientation:'row' }" )){
                  alignChildren = ['left', 'middle'];
                  mainWindow.putEmptyCellsAtEndOfLine = add( 'checkbox', undefined, "Put Empty Cells At End Of Line" );
                  mainWindow.putEmptyCellsAtEndOfLine.value = settings.widgitValues.putEmptyCellsAtEndOfLine.initial;
               }
               with( add( "group{ orientation:'row' }" )){
                  add( 'statictext', undefined, '' );
               }
               with( add( "group{ orientation:'column' }" )){
                  spacing = 0;
                  margins = [0, 0, 0, 0];
                  alignChildren = ['left', 'top'];
                  with( add( "group{ orientation:'row' }" )){
                     spacing = 0;
                     margins = [0, 0, 0, 0];
                     add( 'statictext', undefined, 'Special thanks to the' );
                     mainWindow.elleMediaGroupButton = add( "iconbutton", undefined, settings.elleMediaGroupImages, calendarTypeProperties );
                     mainWindow.elleMediaGroupButton.onClick = function(){ openElleMediaGroup( settings ); };
                  }
                  with( add( "group{ orientation:'row' }" )){
                     add( 'statictext', undefined, 'for sponsoring the List Calendar.' );
                  }
               }
            }
         }
         with( add( "group{ orientation:'stack' }" )){
            alignment = ['fill', 'fill'];
            alignChildren = ['fill', 'fill'];
            mainWindow.layerOptions = add( "panel{ text: 'Layer Options', orientation:'column' }" );
            mainWindow.columnOptions = add( "panel{ text: 'Column/Layer Options', orientation:'column' }" );
            mainWindow.layerOptions.visible = true;
            mainWindow.columnOptions.visible = false;

            with( mainWindow.layerOptions ){
               alignChildren = ['left', 'top'];
               //add( 'statictext', undefined, "" );

               var allLayers = [ 'addTextLayer', 'addHolidayLayer', 
                                 'addHolidayLayerB', 'addHolidayLayerC', 'addHolidayLayerD',
                                 'useCalendarLayer', 'addDayOfYearLayer', 
                                 'addWeekDayLayer', 'addWorkWeekLayer', 'addMoonsLayer', 'addPictureLayer',
                                 'addBackgroundLayer' ];
               for( j = 0; j < allLayers.length; j++ ){
                  with( add( "group{ orientation:'row' }" )){
                     alignChildren = 'left';

                     mainWindow[allLayers[j]] = add( 'checkbox', undefined, settings.widgitValues[ allLayers[j] ].presetKey );
                     mainWindow[allLayers[j]].value = settings.widgitValues[allLayers[j]].initial;
                     if( allLayers[j] == 'addWeekDayLayer' || allLayers[j] == 'addWorkWeekLayer' ){
                        mainWindow[allLayers[j]].enabled = false;
                     } else if( allLayers[j] == 'addBackgroundLayer' ){
                        mainWindow[allLayers[j]].onClick = function(){ syncListBackgroundLayerCheckbox( settings, mainWindow ); };
                     } else if( allLayers[j] == 'useCalendarLayer' ){
                        mainWindow[allLayers[j]].onClick = function(){ syncListCalendarLayerCheckbox( settings, mainWindow ); };
                     }
                  }
               }
            }
            with( mainWindow.columnOptions ){
               alignChildren = ['left', 'top'];
               spacing = 0;
               //add( 'statictext', undefined, "" );
               with( add( "group{ orientation:'row' }" )){
                  alignChildren = 'left';
                  mainWindow.listUseCalendarLayer = add( 'checkbox', undefined, "Use Calendar Layer" );
                  mainWindow.listUseCalendarLayer.value = settings.widgitValues.useCalendarLayer.initial;
                  mainWindow.listUseCalendarLayer.onClick = function(){ syncGridLineCalendarLayerCheckbox( settings, mainWindow ); };
               }
               with( add( "group{ orientation:'row' }" )){
                  alignChildren = 'left';
                  mainWindow.listAddBackgroundLayer = add( 'checkbox', undefined, "Add Background Layer" );
                  mainWindow.listAddBackgroundLayer.value = settings.widgitValues.addBackgroundLayer.initial;
                  mainWindow.listAddBackgroundLayer.onClick = function(){ syncGridLineBackgroundLayerCheckbox( settings, mainWindow ); };
               }
               with( add( "group{ orientation:'row' }" )){
                  alignChildren = 'left';
                  add( 'statictext', undefined, "Column Order:" );
                  mainWindow.columnOrderOptions = add( 'dropdownlist', undefined, settings.widgitValues.columnOrderOptions.values );
                  mainWindow.columnOrderOptions.selection = settings.widgitValues.columnOrderOptions.initial;
               }
               with( add( "group{ orientation:'row' }" )){
                  alignChildren = 'left';
                  add( 'statictext', undefined, "Column Count:" );
                  mainWindow.columnCountOptions = add( 'dropdownlist', undefined, settings.widgitValues.columnCountOptions.values );
                  mainWindow.columnCountOptions.selection = settings.widgitValues.columnCountOptions.initial;
               }
               with( add( "group{ orientation:'row' }" )){
                  alignChildren = 'left';
                  mainWindow.columnGutterLabel = add( 'statictext', undefined, "Column Gutter:" );
                  mainWindow.columnGutter = add( 'edittext', undefined, settings.widgitValues.columnGutter.initial );
                  mainWindow.columnGutter.preferredSize = [ 50, defaultHeight( settings ) ];
                  mainWindow.columnGutterLabel.enabled = hasMoreThanOneColumn( settings, mainWindow );
                  mainWindow.columnGutter.enabled = hasMoreThanOneColumn( settings, mainWindow );
                  mainWindow.columnGutter.onChange = function(){ validateColumnGutter( settings, mainWindow ); };
               }
               with( add( "group{ orientation:'row' }" )){
                  alignChildren = 'left';
                  mainWindow.mergeDateAndDayColumns = add( 'checkbox', undefined, "Merge Date and Week Day Columns" );
                  mainWindow.mergeDateAndDayColumns.value = settings.widgitValues.mergeDateAndDayColumns.initial;
                  mainWindow.mergeDateAndDayColumns.enabled = settings.widgitValues.addWeekDayColumn.initial;
               }
               with( add( "group{ orientation:'row' }" )){
                  alignChildren = 'left';
                  mainWindow.dateWeekDayDelimiterLabel = add( 'statictext', undefined, "Date and Week Day Delimiter:" );
                  mainWindow.dateWeekDayDelimiter = add( 'edittext', undefined, settings.widgitValues.dateWeekDayDelimiter.initial );
                  mainWindow.dateWeekDayDelimiter.preferredSize = [ 50, defaultHeight( settings ) ];
                  mainWindow.dateWeekDayDelimiterLabel.enabled = settings.widgitValues.mergeDateAndDayColumns.initial;
                  mainWindow.dateWeekDayDelimiter.enabled = settings.widgitValues.mergeDateAndDayColumns.initial;
               }
               with( add( "group{ orientation:'column' }" )){
                  alignChildren = ['fill', 'top'];
                  var column1Width = 90;
                  var column2Width = 60;
                  var column3Width = 80;
                  var column1 = [column1Width, defaultHeight( settings )];
                  var column2 = [column2Width, defaultHeight( settings )];
                  var column3 = [column3Width, defaultHeight( settings )];

                  add( 'statictext', undefined, "" );
                  with( add( "group{ orientation:'row' }" )){
                     with( add( 'statictext', undefined, "Column Name" ) ){ preferredSize = column1; }
                     with( add( 'statictext', undefined, "Included" ) ){ preferredSize = column2; }
                     with( add( 'statictext', undefined, "Width" ) ){ preferredSize = column3; }
                  }
                  with( add( "group{ orientation:'row' }" )){
                     with( add( 'panel' ) ){ preferredSize = [column1Width, 0] }
                     with( add( 'panel' ) ){ preferredSize = [column2Width, 0] }
                     with( add( 'panel' ) ){ preferredSize = [column3Width, 0] }
                  }
                  with( add( "group{ orientation:'row' }" )){
                     with( add( 'statictext', undefined, "Date" ) ){ preferredSize = column1; }
                     mainWindow.addDateColumn = add( 'checkbox', undefined, "" );
                     with( mainWindow.addDateColumn ){
                        mainWindow.addDateColumn.enabled = false;
                        mainWindow.addDateColumn.value = true;
                        preferredSize = column2;
                     }
                     mainWindow.dateColumnWidth = add( 'edittext', undefined, settings.widgitValues.dateColumnWidth.initial );
                     mainWindow.dateColumnWidth.preferredSize = column3;
                     mainWindow.dateColumnWidth.onChange = function(){ validateDateColumnWidth( settings, mainWindow ); };
                  }
                  with( add( "group{ orientation:'row' }" )){
                     with( add( 'statictext', undefined, "Week Day" ) ){ preferredSize = column1; }
                     mainWindow.addWeekDayColumn = add( 'checkbox', undefined, "" );
                     mainWindow.addWeekDayColumn.preferredSize = column2
                     mainWindow.addWeekDayColumn.value = settings.widgitValues.addWeekDayColumn.initial;
                     mainWindow.addWeekDayColumn.onClick = function(){ enableWeekDayColumnWidth( settings, mainWindow ); };
                     mainWindow.weekDayColumnWidth = add( 'edittext', undefined, settings.widgitValues.weekDayColumnWidth.initial );
                     mainWindow.weekDayColumnWidth.preferredSize = column3;
                     mainWindow.weekDayColumnWidth.enabled = false
                     mainWindow.weekDayColumnWidth.onChange = function(){ validateWeekDayColumnWidth( settings, mainWindow ); };
                  }
                  with( add( "group{ orientation:'row' }" )){
                     with( add( 'statictext', undefined, "Work Week" ) ){ preferredSize = column1; }
                     mainWindow.addWorkWeekColumn = add( 'checkbox', undefined, "" );
                     mainWindow.addWorkWeekColumn.preferredSize = column2
                     mainWindow.addWorkWeekColumn.value = settings.widgitValues.addWorkWeekColumn.initial;
                     mainWindow.workWeekColumnWidth = add( 'edittext', undefined, settings.widgitValues.workWeekColumnWidth.initial );
                     mainWindow.workWeekColumnWidth.preferredSize = column3;
                     mainWindow.workWeekColumnWidth.enabled = false
                     mainWindow.workWeekColumnWidth.onChange = function(){ validateWorkWeekColumnWidth( settings, mainWindow ); };
                  }
                  with( add( "group{ orientation:'row' }" )){
                     with( add( 'statictext', undefined, "Moon Phase" ) ){ preferredSize = column1; }
                     mainWindow.addMoonsColumn = add( 'checkbox', undefined, "" );
                     mainWindow.addMoonsColumn.preferredSize = column2
                     mainWindow.addMoonsColumn.value = settings.widgitValues.addMoonsColumn.initial;
                     mainWindow.moonColumnWidth = add( 'edittext', undefined, settings.widgitValues.moonColumnWidth.initial );
                     mainWindow.moonColumnWidth.preferredSize = column3;
                     mainWindow.moonColumnWidth.enabled = false
                     mainWindow.moonColumnWidth.onChange = function(){ validateMoonColumnWidth( settings, mainWindow ); };
                  }
               }
            }
         }
      }
      with( add( "panel{ text:'Page Settings', orientation:'column' }" )){
         alignChildren = 'left';
         spacing = 0;
         with( add( "group{ orientation:'row' }" )){
            spacing = 0;
            alignChildren = ['left', 'middle'];
            add( 'statictext', undefined, "Calendars Per Page:" );
            mainWindow.calendarsPerPageOptions = add( 'dropdownlist', undefined, settings.widgitValues.calendarsPerPageOptions.values );
            mainWindow.calendarsPerPageOptions.selection = settings.widgitValues.calendarsPerPageOptions.initial;
            helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
            helpButton.onClick = function(){ showWidgetHelp( "The style set is useful when a document will have multiple calendars that need to be styled "
                                                            +"independantly.  Choosing a number will append that number to all of the styles created and "
                                                            +"applied during calendar creation.  An example of using this is to create small calendars "
                                                            +"inside of unused cells.  The main calendar can use the default style set, the small calendars "
                                                            +"need to use a different style set so the font can be reduced without impacting the main calendar."
                                 );};
            add( 'statictext', undefined, "   Style Set:" );
            mainWindow.styleSetOptions = add( 'dropdownlist', undefined, settings.widgitValues.styleSetOptions.values );
            mainWindow.styleSetOptions.selection = settings.widgitValues.styleSetOptions.initial;
            helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
            helpButton.onClick = function(){ showWidgetHelp( "The spacer page is a blank page inserted before, between or after calendar pages.");};
            add( 'statictext', undefined, "   Spacer Page:" );
            mainWindow.spacerPageOptions = add( 'dropdownlist', undefined, settings.widgitValues.spacerPageOptions.values );
            mainWindow.spacerPageOptions.selection = settings.widgitValues.spacerPageOptions.initial;
            mainWindow.spacerPageOptions.onChange = function(){ enableCustomFramesToSpacerPage( settings, mainWindow ); };
            helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
            helpButton.onClick = function(){ showWidgetHelp( "If checked, blank pages will be added to the start and end of the document.");};
            mainWindow.includeCoverPages = add( 'checkbox', undefined, "Include Cover Pages" );
            mainWindow.includeCoverPages.value = settings.widgitValues.includeCoverPages.initial;
         }
         with( add( "group{ orientation:'row' }" )){
            spacing = 0;
            alignChildren = ['left', 'middle'];
            helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
            helpButton.onClick = function(){ showWidgetHelp( "Auto page style will use the current text frame if it\'s selected or the insertion marker is in the frame. "
                                                            +"Otherwise, the default behavior is to create a new document."
                                 );};
            add( 'statictext', undefined, "Page:" );
            mainWindow.documentTargetOptions = add( 'dropdownlist', undefined, settings.widgitValues.documentTargetOptions.values );
            mainWindow.documentTargetOptions.selection = settings.widgitValues.documentTargetOptions.initial;
            helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
            helpButton.onClick = function(){ showWidgetHelp( "The default orientation is \"Portrait\" for the Grid and List calendars. "
                                                            +"The default for the Line calendar is \"Landscape\""
                                 );};
            mainWindow.documentOrientationOptions = add( 'dropdownlist', undefined, settings.widgitValues.documentOrientationOptions.values );
            mainWindow.documentOrientationOptions.selection = settings.widgitValues.documentOrientationOptions.initial;
            mainWindow.documentSizeOptions = add( 'dropdownlist', undefined, settings.widgitValues.documentSizeOptions.values );
            mainWindow.documentSizeOptions.selection = settings.widgitValues.documentSizeOptions.initial;
            add( 'statictext', undefined, "   Color Space:" );
            mainWindow.colorSpaceOptions = add( 'dropdownlist', undefined, settings.widgitValues.colorSpaceOptions.values );
            mainWindow.colorSpaceOptions.selection = settings.widgitValues.colorSpaceOptions.initial;
            add( 'statictext', undefined, "   Document Units:" );
            mainWindow.documentUnitOptions = add( 'dropdownlist', undefined, settings.widgitValues.documentUnitOptions.values );
            mainWindow.documentUnitOptions.selection = settings.widgitValues.documentUnitOptions.initial;
         }
      }
   }


   with( mainWindow.calendarHolidaysContainer )
   {
      alignment = ['fill', 'fill'];
      alignChildren = ['left', 'top'];
      var holidayTextWidth = 200;
      var holidayRadioButtonWidth = 20;
      var holidayTextColumn = [holidayTextWidth,defaultHeight( settings )];
      var holidayRadioButtonColumn = [holidayRadioButtonWidth,defaultHeight( settings )];
      var labelMargins = [5,defaultMargin( settings ),defaultMargin( settings ),defaultMargin( settings )];

      with( add( "group{ orientation:'row'}" )){
         alignChildren = ['fill', 'top'];
         with( add( "group{ orientation:'column'}" )){
            alignChildren = 'fill';
            spacing = 0;
            with( add( "group{ orientation:'row'}" )){
               alignChildren = 'left';
               with( add( 'statictext', undefined, ''  ) ){ preferredSize = holidayTextColumn; }
               with( add( 'statictext', undefined, 'A' ) ){ preferredSize = holidayRadioButtonColumn; margins = labelMargins }
               with( add( 'statictext', undefined, 'B' ) ){ preferredSize = holidayRadioButtonColumn; margins = labelMargins }
               with( add( 'statictext', undefined, 'C' ) ){ preferredSize = holidayRadioButtonColumn; margins = labelMargins }
               with( add( 'statictext', undefined, 'D' ) ){ preferredSize = holidayRadioButtonColumn; margins = labelMargins }
            }
            with( add( "group{ orientation:'row'}" )){
               alignChildren = 'center';
               mainWindow.loadHolidayFromCurrentFrameLabel = add( 'statictext', undefined, 'Load From Current Frame' );
               mainWindow.loadHolidayFromCurrentFrameLabel.preferredSize = holidayTextColumn;
               mainWindow.loadHolidayFromCurrentFrameLabel.enabled = false;
            
               mainWindow.loadHolidayFromCurrentFrameA = add( 'checkbox', undefined );
               mainWindow.loadHolidayFromCurrentFrameB = add( 'checkbox', undefined );
               mainWindow.loadHolidayFromCurrentFrameC = add( 'checkbox', undefined );
               mainWindow.loadHolidayFromCurrentFrameD = add( 'checkbox', undefined );
               
               mainWindow.loadHolidayFromCurrentFrameA.preferredSize = holidayRadioButtonColumn;
               mainWindow.loadHolidayFromCurrentFrameB.preferredSize = holidayRadioButtonColumn;
               mainWindow.loadHolidayFromCurrentFrameC.preferredSize = holidayRadioButtonColumn;
               mainWindow.loadHolidayFromCurrentFrameD.preferredSize = holidayRadioButtonColumn;
               
               mainWindow.loadHolidayFromCurrentFrameA.onClick  = makeEnableCurrentFrameLabelFunction( settings, mainWindow, 'A' );
               mainWindow.loadHolidayFromCurrentFrameB.onClick  = makeEnableCurrentFrameLabelFunction( settings, mainWindow, 'B' );
               mainWindow.loadHolidayFromCurrentFrameC.onClick  = makeEnableCurrentFrameLabelFunction( settings, mainWindow, 'C' );
               mainWindow.loadHolidayFromCurrentFrameD.onClick  = makeEnableCurrentFrameLabelFunction( settings, mainWindow, 'D' );
            }
            with( add( "group{ orientation:'row'}" )){
               alignChildren = 'center';
               mainWindow.loadHolidayFromCustomFileLabel = add( 'statictext', undefined, 'Load From Custom File' );
               mainWindow.loadHolidayFromCustomFileLabel.preferredSize = holidayTextColumn;
               mainWindow.loadHolidayFromCustomFileLabel.enabled = false;
               
               mainWindow.loadHolidayFromCustomFileA = add( 'checkbox', undefined );
               mainWindow.loadHolidayFromCustomFileB = add( 'checkbox', undefined );
               mainWindow.loadHolidayFromCustomFileC = add( 'checkbox', undefined );
               mainWindow.loadHolidayFromCustomFileD = add( 'checkbox', undefined );
               
               mainWindow.loadHolidayFromCustomFileA.preferredSize = holidayRadioButtonColumn;
               mainWindow.loadHolidayFromCustomFileB.preferredSize = holidayRadioButtonColumn;
               mainWindow.loadHolidayFromCustomFileC.preferredSize = holidayRadioButtonColumn;
               mainWindow.loadHolidayFromCustomFileD.preferredSize = holidayRadioButtonColumn;
               
               mainWindow.loadHolidayFromCustomFileA.onClick  = makeEnableCustomFileLabelFunction( settings, mainWindow, 'A' );
               mainWindow.loadHolidayFromCustomFileB.onClick  = makeEnableCustomFileLabelFunction( settings, mainWindow, 'B' );
               mainWindow.loadHolidayFromCustomFileC.onClick  = makeEnableCustomFileLabelFunction( settings, mainWindow, 'C' );
               mainWindow.loadHolidayFromCustomFileD.onClick  = makeEnableCustomFileLabelFunction( settings, mainWindow, 'D' );
            }
            
            mainWindow.holidayListing = add( "group{ orientation:'column'}" );
            mainWindow.holidayListing.alignChildren = ['left', 'top'];
            mainWindow.holidayListing.spacing = 0;
            buildMainHolidayListing( settings, mainWindow );
            mainWindow.manageHolidaysButton = add( 'button', undefined, "Manage Holidays" );
            mainWindow.manageHolidaysButton. onClick = function(){ manageHolidays( settings, mainWindow ); };
         }
         with( add( "group{ orientation:'column'}" ) ){
            alignment = ['fill','top'];
            alignChildren = ['fill', 'top'];
            spacing = 0;
            margins = [50, defaultMargin( settings ), defaultMargin( settings ), defaultMargin( settings )];

            var holidaysDirectory = decodeURI( settings.holidaysDirectory.toString() );

            var helpText = [ 'To insert holidays, check the \"A\", \"B\", \"C\" or \"D\" box next to the holiday set. The letter',
                             'will determine which paragraph style is applied to the text',
                             '',
                             'The list of holidays is constructed from the plain text files located',
                             "in \""+holidaysDirectory+"\" with the suffix \".holidays\".",
                             'These files can be edited with the \'Manage Holidays\' button to the left, or with a simple text',
                             'editor such as Notepad.exe or TextEdit. If another \".holidays\" file is added or an existing',
                             'one removed, the list will be updated the next time the wizard starts.',
                             '',
                             'Every line in the file should conform to one of four patterns:',
                             '   1. a blank line',
                             '   2. a line starting with #.  This is a comment line.  Any text can follow the # as the line will be ignored.',
                             '   3. an annually repeating event identifed by the pattern \"<month>-<day>:text\" (ex: \"1-1:New Year\'s Day\")',
                             '   4. a event identifed by the pattern \"<month>-<day>-<year>:text\" (ex: \"11-24-2016:Thanksgiving Day\")',
                             '',
                             'When specifying a date, there are no leading 0\'s.  So, \"1-1:New Year\'s Day\" is valid',
                             'while \"01-01:New Year\'s Day\" is not.  Any holiday file starting with \"Moons\" is used to',
                             'specify exactly when to display full, new, and half moons as the built in algorithm is only',
                             'approximate and based upon UTC time, so it can either be early or late by a day',
            ];
            for( i = 0; i < helpText.length; i++ ){
               add( 'statictext', undefined, helpText[i] );
            }
         }
      }
   }

   with( mainWindow.calendarCustomFramesContainer )
   {
      var column1 = [150, defaultHeight( settings )];
      alignment = ['fill', 'fill'];
      alignChildren = ['left', 'top'];

      with( add( "group{ orientation:'column' }" )){
         spacing = 0;
         alignChildren = ['left', 'top'];
         margins = [defaultMargin( settings ), 140, 25, defaultMargin( settings ) ];
         with( add( "group{ orientation:'row' }" )){
            with( add( 'statictext', undefined, "Document Units:" ) ){ preferredSize = column1; }
            mainWindow.customFrameUnitOptions = add( 'dropdownlist', undefined, settings.widgitValues.customFrameUnitOptions.values );
            mainWindow.customFrameUnitOptions.selection = settings.widgitValues.customFrameUnitOptions.initial;
         }
         add( 'statictext', undefined, "Set the height, width, bleed and margin to activate." );
         var buffer = ['documentHeight', 'documentWidth', 'documentBleed', 'documentMargins'];
         for( i = 0; i < buffer.length; i++ ){
            with( add( "group{ orientation:'row' }" )){
               alignment = 'fill';
               mainWindow[buffer[i] + "Label"] = add( 'statictext', undefined, settings.widgitValues[ buffer[i] ].presetKey + ":" );
               mainWindow[buffer[i] + "Label"].preferredSize = column1;
               mainWindow[buffer[i] + "Label"].enabled = false;
               mainWindow[buffer[i]] = add( 'edittext', undefined, settings.widgitValues[buffer[i]].initial );
               mainWindow[buffer[i]].preferredSize = [50,defaultHeight( settings )];
               mainWindow[buffer[i]].onChange = makeDocumentValueValidateFunction( settings, mainWindow, buffer[i] );
            }
         }
         with( add( "group{ orientation:'row' }" )){
            spacing = 0;
            alignChildren = ['left', 'middle'];
            helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
            helpButton.onClick = function(){ showWidgetHelp( "If a spacer page is added before or after the calendar page, and "
                                                            +"this option is selected, then the custom picture frame will be added "
                                                            +"to the spacer page."
                                 );};
            mainWindow.addCustomPictureFrameToSpacerPage = add( 'checkbox', undefined, "Add Picture Frame to Spacer Page" );
            mainWindow.addCustomPictureFrameToSpacerPage.value = settings.widgitValues.addCustomPictureFrameToSpacerPage.initial;
         }
         with( add( "group{ orientation:'row' }" )){
            spacing = 0;
            alignChildren = ['left', 'middle'];
            helpButton = add( 'iconbutton', undefined, settings.questionImages, calendarTypeProperties );
            helpButton.onClick = function(){ showWidgetHelp( "If a spacer page is added before or after the calendar page, and "
                                                            +"this option is selected, then the custom month and or year frames "
                                                            +"will be added to the spacer page."
                                 );};
            mainWindow.addCustomMonthYearFramesToSpacerPage = add( 'checkbox', undefined, "Add Month/Year Frames to Spacer Page" );
            mainWindow.addCustomMonthYearFramesToSpacerPage.value = settings.widgitValues.addCustomMonthYearFramesToSpacerPage.initial;
         }
      }
      with( add( "group{ orientation:'column' }" )){
         alignment = ['fill', 'top'];
         with( add( "group{ orientation:'stack' }" )){
            mainWindow.customFramesMenuA = add( "group{ orientation:'row' }" );
            mainWindow.customFramesMenuB = add( "group{ orientation:'row' }" );
            mainWindow.customFramesMenuA.visible = true;
            mainWindow.customFramesMenuB.visible = false;

            with( mainWindow.customFramesMenuA ){
               alignment = ['fill', 'top'];
               with( add( "group{ orientation:'column'}" ) ){
                  mainWindow.heightAndWidthButtonA = add( "iconbutton", undefined, settings.heightAndWidthImages[1], calendarTypeProperties );
                  add( "statictext", undefined, "Height and Width" );
               }
               with( add( "group{ orientation:'column'}" ) ){
                  mainWindow.edgesButtonA = add( "iconbutton", undefined, settings.edgesImages[0], calendarTypeProperties );
                  add( "statictext", undefined, "Edges" );
               }
            }
            with( mainWindow.customFramesMenuB ){
               alignment = ['fill', 'top'];
               with( add( "group{ orientation:'column'}" ) ){
                  mainWindow.heightAndWidthButtonB = add( "iconbutton", undefined, settings.heightAndWidthImages[0], calendarTypeProperties );
                  add( "statictext", undefined, "Height and Width" );
               }
               with( add( "group{ orientation:'column'}" ) ){
                  mainWindow.edgesButtonB = add( "iconbutton", undefined, settings.edgesImages[1], calendarTypeProperties );
                  add( "statictext", undefined, "Edges" );
               }
            }

            mainWindow.heightAndWidthButtonA.onClick = function(){ showHeightAndWidth( settings, mainWindow ); };
            mainWindow.heightAndWidthButtonB.onClick = function(){ showHeightAndWidth( settings, mainWindow ); };
            mainWindow.edgesButtonA.onClick = function(){ showEdges( settings, mainWindow ); };
            mainWindow.edgesButtonB.onClick = function(){ showEdges( settings, mainWindow ); };
         }
         with( add( "panel{ orientation:'row' }" )){ alignment='fill', preferredSize = [20, 0]; }
         with( add( "group{ orientation:'stack' }" )){
            alignment = ['fill', 'fill'];
            alignChildren = ['center', 'top'];
            mainWindow.customFramesControlsA = add( "group{ orientation:'column' }" );
            mainWindow.customFramesControlsB = add( "group{ orientation:'column' }" );
            mainWindow.customFramesControlsA.visible = true;
            mainWindow.customFramesControlsB.visible = false;

            with( mainWindow.customFramesControlsA ){
               with( add( "group{ orientation:'row' }" ) ){
                  with( add( "group{ orientation:'column' }" ) ){
                     mainWindow.customCalendarContainerHW = add( "panel{ text:'Calendar Custom Frame', orientation:'column' }" );
                     addHWControls( settings, mainWindow, mainWindow.customCalendarContainerHW, 'calendar' );
                     mainWindow.customPictureContainerHW  = add( "panel{ text:'Picture Custom Frame', orientation:'column' }" );
                     addHWControls( settings, mainWindow, mainWindow.customPictureContainerHW, 'picture' );
                  }
                  with( add( "group{ orientation:'column' }" ) ){
                     mainWindow.customMonthContainerHW    = add( "panel{ text:'Month Custom Frame', orientation:'column' }" );
                     addHWControls( settings, mainWindow, mainWindow.customMonthContainerHW, 'month' );
                     mainWindow.customYearContainerHW     = add( "panel{ text:'Year Custom Frame', orientation:'column' }" );
                     addHWControls( settings, mainWindow, mainWindow.customYearContainerHW, 'year' );
                  }
               }
               with( add( "group{ orientation:'column' }" ) ){
                  alignChildren = ['left', 'top'];
                  spacing = 0;
                  add( 'statictext', undefined, 'Note, the custom frame edges are all relative to the top and left edges of the page.' );
                  add( 'statictext', undefined, 'For example, a 9"x9" frame centered in a 10"x10" page would use the values:' );
                  add( 'statictext', undefined, 'Height = 9, Width = 9, Top Edge = 0.5, Left Edge = 0.5' );
               }
            }
            with( mainWindow.customFramesControlsB ){
               with( add( "group{ orientation:'row' }" ) ){
                  with( add( "group{ orientation:'column' }" ) ){
                     mainWindow.customCalendarContainerEdge = add( "panel{ text:'Calendar Custom Frame', orientation:'column' }" );
                     addEdgeControls( settings, mainWindow, mainWindow.customCalendarContainerEdge, 'calendar' );
                     mainWindow.customPictureContainerEdge  = add( "panel{ text:'Picture Custom Frame', orientation:'column' }" );
                     addEdgeControls( settings, mainWindow, mainWindow.customPictureContainerEdge, 'picture' );
                  }
                  with( add( "group{ orientation:'column' }" ) ){
                     mainWindow.customMonthContainerEdge    = add( "panel{ text:'Month Custom Frame', orientation:'column' }" );
                     addEdgeControls( settings, mainWindow, mainWindow.customMonthContainerEdge, 'month' );
                     mainWindow.customYearContainerEdge     = add( "panel{ text:'Year Custom Frame', orientation:'column' }" );
                     addEdgeControls( settings, mainWindow, mainWindow.customYearContainerEdge, 'year' );
                  }
               }
               with( add( "group{ orientation:'column' }" ) ){
                  alignChildren = ['left', 'top'];
                  spacing = 0;
                  add( 'statictext', undefined, 'Note, the custom frame edges are all relative to the top and left edges of the page.' );
                  add( 'statictext', undefined, 'For example, a 9"x9" frame centered in a 10"x10" page would use the values:' );
                  add( 'statictext', undefined, 'Top = 0.5, Bottom = 9.5, Left = 0.5, Right = 9.5' );
               }
            }
         }
      }
   }

   with( mainWindow.utilitiesContainer )
   {
      margins = [25, 25, 0, 0];
      alignment = ['fill', 'fill'];
      alignChildren = ['fill', 'top'];
      var buttonColumn = [400, defaultHeight( settings )];
      with( add( "group{ orientation:'row' }" ) ){
         alignment = ['fill', 'top' ];
         alignChildren = ['left', 'top' ];
         with( add( "group{ orientation:'row' }" ) ){
            preferredSize = buttonColumn;
            mainWindow.fitCalendarToFrameButton                    = add( "button", undefined, "Fit Calendar to Frame" );
            mainWindow.fitCalendarToFrameButton.onClick = function(){ selectFitCalendarToFrame( mainWindow, settings ); };
         }
         with( add( "group{ orientation:'column' }" ) ){
            alignChildren = ['left', 'top'];
            spacing = 0;
            var helpText = [ 'The calendars use multiple overlapping tables on different layers',
                             'The \'Fit Calendar to Frame\' utility is used to fit one of those tables into a',
                             'larger or smaller frame, then force the tables on the other layers to match the',
                             'newly fit table.  The script will not adjust the height of the rows with the month',
                             'or week day names.  To use the script, first select the adjusted calendar frame from one layer,',
                             'then launch the calendarWizard and press the \'Fit Calendar to Frame\' button.',
                             '', 
                           ]
            for( i = 0; i < helpText.length; i++ ){
               add( 'statictext', undefined, helpText[i] );
            }
         }
      }
      with( add( "group{ orientation:'row' }" ) ){
         alignment = ['fill', 'top' ];
         alignChildren = ['left', 'top' ];
         with( add( "group{ orientation:'row' }" ) ){
            preferredSize = buttonColumn;
            mainWindow.fitLineCalendarToFrameWithSquareCellsButton = add( "button", undefined, "Fit Line Calendar to Frame With Square Cells" );
            mainWindow.fitLineCalendarToFrameWithSquareCellsButton.onClick = function(){ selectFitLineCalendarToFrameWithSquareCells( mainWindow, settings ); };
         }
         with( add( "group{ orientation:'column' }" ) ){
            spacing = 0;
            alignChildren = ['left', 'top'];
            var helpText = [ 'The \'Fit Line Calendar to Frame with Square Cells\' performs a very simliar function',
                             'as the \'Fit Calendar to Frame\'; however, it will adjust the cells such that then come',
                             'out square.  This is only intended to be used on Line calendars.  To use the script,',
                             'first select the adjusted calendar frame from one layer, then launch the calendarWizard and',
                             'press the \'Fit Line Calendar to Frame with Square Cells\' button.',
                             '', 
                           ]
            for( i = 0; i < helpText.length; i++ ){
               add( 'statictext', undefined, helpText[i] );
            }
         }
      }
      with( add( "group{ orientation:'row' }" ) ){
         alignment = ['fill', 'top' ];
         alignChildren = ['left', 'top' ];
         with( add( "group{ orientation:'row' }" ) ){
            preferredSize = buttonColumn;
            mainWindow.realignCalendarButton = add( "button", undefined, "Realign Calendar Layers" );
            mainWindow.realignCalendarButton.onClick    = function(){ selectRealignCalendars( mainWindow, settings ); };
         }
         with( add( "group{ orientation:'column' }" ) ){
            spacing = 0;
            alignChildren = ['left', 'top'];
            var helpText = [ 'The calendars use multiple overlapping tables on different layers',
                             'The \'Realign Calendar Layers\' is used to align all but the selected layer to',
                             'the selected layer.  This is useful when a non-even cell spacing is desired.  One',
                             'layer can be manual adjusted, then this script will align the rest of the layers',
                             'to the first. To use the script, first select the adjusted calendar table,',
                             'then launch the calendarWizard and press the \'Realign Calendar Layers\' button.',
                             '', 
                           ]
            for( i = 0; i < helpText.length; i++ ){
               add( 'statictext', undefined, helpText[i] );
            }
         }
      }
      with( add( "group{ orientation:'row' }" ) ){
         alignment = ['fill', 'top' ];
         alignChildren = ['left', 'top' ];
         with( add( "group{ orientation:'row' }" ) ){
            preferredSize = buttonColumn;
            mainWindow.managePresetsButton = add( "button", undefined, "Manage Presets" );
            mainWindow.managePresetsButton.onClick    = function(){ managePresets( settings, mainWindow ); };
         }
         with( add( "group{ orientation:'column' }" ) ){
            spacing = 0;
            alignChildren = ['left', 'top'];
            var helpText = [ 'Presets are plain text files that contain the settings to use for the Wizard.',
                             'This utility can be used to view, edit and delete the files directly. The',
                             'best way to edit a preset is to load it, change the settings and resave it',
                             'from the Basic Settings window.  The primary purpose of this utility is to',
                             'allow the user to examine the preset or copy and paste it from one computer',
                             'to another. Please take care as the syntax of the preset values must be exact.',
                           ]
            for( i = 0; i < helpText.length; i++ ){
               add( 'statictext', undefined, helpText[i] );
            }
         }
      }
   }

   with( mainWindow.helpContainer )
   {
      margins = [25, 25, 0, 0];
      alignChildren = ['fill', 'top'];
      add( 'statictext', undefined, "Support and Documentation" );
      with( add( "group{ orientation:'column' }" ) ){
         alignChildren = ['fill', 'top'];
         margins = [25, 0, 0, 0];
         spacing = 0;
         with( add( "group{ orientation:'row' }" ) ){
            add( 'statictext', undefined, 'Documentation for this script can be found on the' );
            var homeButton = add( 'button', undefined, "Calendar Wizard Home Page at http://calendarwizard.sourceforge.net" );
            homeButton.onClick = function(){ openCalendarWizardUrl( settings ); };
         }
         with( add( "group{ orientation:'row' }" ) ){
            add( 'statictext', undefined, 'Additional support plus release announcements can be found on the' );
            var faceBookButton = add( 'button', undefined, "Calendar Wizard Facebook Page at https://www.facebook.com/calendarwizard" );
            faceBookButton.onClick = function(){ openFacebook( settings ); };
         }

         with( add( "group{ orientation:'row' }" ) ){
            add( 'statictext', undefined, 'For other questions or suggestions, please' );
            var mailtoButton = add( 'button', undefined, "email the author, Scott Selberg, at indesigncalendarwizard@gmail.com" );
            mailtoButton.onClick = function(){ openMailTo( settings ); };
         }
         add( 'statictext', undefined, 'Presets Directory: ' + decodeURI( settings.presetsDirectory ) );
         add( 'statictext', undefined, 'Holidays Directory: ' + decodeURI( settings.holidaysDirectory ) );
      }
      add( 'statictext', undefined, "" );
      add( 'statictext', undefined, "License" );
      with( add( "group{ orientation:'column' }" ) ){
         alignChildren = ['fill', 'top'];
         margins = [25, 0, 0, 0];
         spacing = 0;
         var helpText = [ 'This script is free to use for personal and non-profit use.  Commercial use, defined as any activity intended to generate profit, requires a license.',
                          'Two licenses are available for purchase.  A single use license for $'+settings.singleUseLicenseCost+' which entitles either an individual on as many computers as desired or a single computer',
                          'with as many users as desired and an enterprise license for $'+settings.enterpriseUseLicenseCost+' which allows the script to be used by every employee within an enterprise.  The script is fully',
                          'functional without entering a license key and may be used for a 30 day trial before purchasing.  There are no refunds for the license.'
                        ]
         for( i = 0; i < helpText.length; i++ ){
            add( 'statictext', undefined, helpText[i] );
         }
         with( add( "group{ orientation:'row' }" ) ){
            mainWindow.singleUserButton = add( 'button', undefined, "Purchase a single use license ($"+settings.singleUseLicenseCost+")" );
            mainWindow.singleUserButton.onClick = function(){ openSingleUseCommercialLicense( settings ); };
            mainWindow.multiUserButton = add( 'button', undefined, "Purchase an enterprise license ($"+settings.enterpriseUseLicenseCost+")" );
            mainWindow.multiUserButton.onClick = function(){ openEnterpriseUseCommercialLicense( settings ); };
            mainWindow.enterLicenseButton = add( 'button', undefined, "Enter license key" );
            mainWindow.enterLicenseButton.onClick = function(){ enterLicenseKey( settings, mainWindow ); };
         }
      }
      add( 'statictext', undefined, "" );
      add( 'statictext', undefined, "Terms of Usage" );
      with( add( "group{ orientation:'column' }" ) ){
         alignChildren = ['fill', 'top'];
         margins = [25, 0, 0, 0];
         spacing = 0;
         var helpText = [ 'For personal and non-profit use, this script is licensed under the Apache License, Version 2.0 (the \"License\"); you may not use this software except in compliance',
                          'with the License.  You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0. For commercial use, this script requires a license from the',
                          'author. Deritives of this software for competing commercial purposes are not allowed without express permission from the author. Unless required by applicable law',
                          'or agreed to in writing, this software is distributed on an \'AS IS\' BASIS, WITHOUT WARRANTIES OR CONTIDIONS OF ANY KIND, either express or implied.',
                        ]
         for( i = 0; i < helpText.length; i++ ){
            add( 'statictext', undefined, helpText[i] );
         }
      }
      add( 'statictext', undefined, "" );
      with( add( "group{ orientation:'row' }" ) ){
         alignChildren = ['fill', 'top'];
         with( add( "group{ orientation:'column' }" ) ){
            spacing = 0;
            alignChildren = ['left', 'top'];
            add( 'statictext', undefined, "Copyright 2015 Scott Selberg" );
            add( 'statictext', undefined, "Dedicated to my beautiful wife Tonya and our awesome kids." );
         }
         with( add( "group{ orientation:'column' }" ) ){
            alignChildren = ['fill', 'top'];
            spacing = 0;
            add( 'statictext', undefined, "For God so loved the world that he gave his one and only Son," );
            add( 'statictext', undefined, "that whoever believes in him shall not perish but have eternal life.");
            add( 'statictext', undefined, "-John 3:16" );
         }
      }
   }

   mainWindow.gridCalendarMonthLabelingOptions.onChange = function(){ enableRelatedMonthLabelControls( settings, mainWindow ) };
   mainWindow.moonSize.onChange = function(){ validateMoonSizeValue( settings, mainWindow ); };
   mainWindow.includeWorkWeek.onClick = function(){ enableRelatedWorkWeekControls( settings, mainWindow, 'includeWorkWeek' ) };
   mainWindow.includeMoons.onClick = function(){ enableRelatedMoonControls( settings, mainWindow, 'includeMoons' ) };
   mainWindow.includeMiniCalendars.onClick = function(){ enableRelatedMiniCalendarControls( settings, mainWindow ) };
   mainWindow.mergeDateAndDayColumns.onClick = function(){ enableRelatedDateWeekDayMergedCellControls( settings, mainWindow ) };

   mainWindow.customFrameUnitOptions.onChange = function(){ enableRelatedUnitControls( settings, mainWindow, 'customFrameUnitOptions' ); };
   mainWindow.documentUnitOptions.onChange = function(){ enableRelatedUnitControls( settings, mainWindow, 'documentUnitOptions' ); };
   
   mainWindow.savePresetToFileButton.preferredSize = saveDeleteButtonSize;
   mainWindow.deletePresetButton.preferredSize = saveDeleteButtonSize;

   mainWindow.loadPresetButton.onClick = function(){ loadScriptUiPreset( settings, mainWindow ); };
   mainWindow.savePresetToFileButton.onClick = function(){ savePresetDialog( settings, mainWindow ); };
   mainWindow.deletePresetButton.onClick = function(){ deletePresetDialog( settings, mainWindow ); };

   mainWindow.addMoonsLayer.onClick = function(){ enableRelatedMoonControls( settings, mainWindow, 'addMoonsLayer' ) };
   mainWindow.addWorkWeekLayer.onClick = function(){ enableRelatedWorkWeekControls( settings, mainWindow, 'addWorkWeekLayer' ) };
   mainWindow.addMoonsColumn.onClick = function(){ enableRelatedMoonControls( settings, mainWindow, 'addMoonsColumn' ) };
   mainWindow.addWorkWeekColumn.onClick = function(){ enableRelatedWorkWeekControls( settings, mainWindow, 'addWorkWeekColumn' ) };

   mainWindow.columnCountOptions.onChange = function(){ enableRelatedColumnCountControls( settings, mainWindow ) };

   mainWindow.bottomContainer = mainWindow.add( "group{ orientation:'row' }" );
   mainWindow.bottomContainer.alignment = 'fill';
   mainWindow.bottomContainer.alignChildren = ['right', 'top'];
   mainWindow.bottomContainer.spacing = 0;
   mainWindow.licenseContainer = mainWindow.bottomContainer.add( "group{ orientation:'column' }" );
   mainWindow.licenseContainer.alignment = 'left';
   mainWindow.licenseContainer.alignChildren = 'left';
   mainWindow.licenseContainer.spacing = 0;
   mainWindow.buttonContainer = mainWindow.bottomContainer.add( "group{ orientation:'row' }" );
   mainWindow.buttonContainer.alignChildren = 'right';

   mainWindow.LicensedToText = mainWindow.licenseContainer.add( 'statictext',undefined, "This script is free for personal and non-profit use.  Commerical use requires a license." );
   mainWindow.CancelButton = mainWindow.buttonContainer.add( "button", undefined, "Cancel" );
   mainWindow.OKButton = mainWindow.buttonContainer.add( "button", undefined, "OK" );
   mainWindow.OKButton.onClick = function(){ ParseScriptUiUserInput( settings, mainWindow );
                                             saveScriptUiPreset( settings, mainWindow, true );
                                             if( bUserInputOK( settings ) ){
                                                return mainWindow.close( 1 )
                                             } else {
                                                return mainWindow.close( 0 )
                                             } };

   loadSelectedScriptUiPreset( settings.defaultPreset, settings, mainWindow, loadingDefaults );
   if( settings.bGridCalendar ){
      gridPressed( settings, mainWindow );
   } else if( settings.bLineCalendar ){
      linePressed( settings, mainWindow );
   } else if( settings.bListCalendar ){
      listPressed( settings, mainWindow );
   }

   setLicense( settings, mainWindow );

   enableRelatedControls( settings, mainWindow );
 
   return mainWindow.show();
}
// --------------------------------------------------------------- //
function validateCustomStartYear( settings, mainWindow )
{
   var dateRegExp = /^\d{4}$/;
   var bError = false;

   if( !dateRegExp.test( mainWindow.customStartYear.text ) ){
      bError = true;
   }

   if( bError ){
      alert( "The entered value for the start year is invalid.  It must be a four digit number and less than the end year.  Resetting to match the end year." );
      mainWindow.customStartYear.text = mainWindow.customEndYear.text;
   } else {
      /*
      if( parseInt( mainWindow.customEndYear.text ) - parseInt( mainWindow.customStartYear.text ) > 24 ){
         alert( "Just a note, the current setting will generate over 24 calendars.  Please double check the start and end date for accuracy." );
      }
      */
   }
   return;
}
// --------------------------------------------------------------- //
function validateCustomEndYear( settings, mainWindow )
{
   var dateRegExp = /^\d{4}$/;
   var bError = false;

   if( !dateRegExp.test( mainWindow.customEndYear.text ) ){
      bError = true;
   }

   if( bError ){
      alert( "The entered value for the end year is invalid.  It must be a four digit number and greater than the start year.  Resetting to match the start year." );
      mainWindow.customEndYear.text = mainWindow.customStartYear.text;
   } else {
      if( parseInt( mainWindow.customEndYear.text ) - parseInt( mainWindow.customStartYear.text ) > 24 ){
         alert( "Just a note, the current setting will generate over 24 calendars.  Please double check the start and end date for accuracy." );
      }
   }
   return;
}
// --------------------------------------------------------------- //
function showYearSelectionContainer( settings, mainWindow ){
   mainWindow.yearSelectionContainer.visible = true;
   mainWindow.yearEntryContainer.visible = false;
   settings.useYearEntry = false;
}
// --------------------------------------------------------------- //
function showYearEntryContainer( settings, mainWindow ){
   mainWindow.yearSelectionContainer.visible = false;
   mainWindow.yearEntryContainer.visible = true;
   settings.useYearEntry = true;
}
// --------------------------------------------------------------- //
function syncListBackgroundLayerCheckbox( settings, mainWindow )
{
   if( mainWindow.listAddBackgroundLayer.value != mainWindow.addBackgroundLayer.value ){
      mainWindow.listAddBackgroundLayer.value = mainWindow.addBackgroundLayer.value;
   }
}
// --------------------------------------------------------------- //
function syncGridLineBackgroundLayerCheckbox( settings, mainWindow )
{
   if( mainWindow.addBackgroundLayer.value != mainWindow.listAddBackgroundLayer.value ){
      mainWindow.addBackgroundLayer.value = mainWindow.listAddBackgroundLayer.value;
   }
}
// --------------------------------------------------------------- //
function syncListCalendarLayerCheckbox( settings, mainWindow )
{
   if( mainWindow.listUseCalendarLayer.value != mainWindow.useCalendarLayer.value ){
      mainWindow.listUseCalendarLayer.value = mainWindow.useCalendarLayer.value;
   }
}
// --------------------------------------------------------------- //
function syncGridLineCalendarLayerCheckbox( settings, mainWindow )
{
   if( mainWindow.useCalendarLayer.value != mainWindow.listUseCalendarLayer.value ){
      mainWindow.useCalendarLayer.value = mainWindow.listUseCalendarLayer.value;
   }
}
// --------------------------------------------------------------- //
function setLicense( settings, mainWindow )
{
   var licensedToText;
   if( settings.bLicensed ){
     mainWindow.enterLicenseButton.visible = false;
     mainWindow.singleUserButton.visible = false;
     mainWindow.multiUserButton.visible = false;

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
        }  else {
           licensedToText += ".";
        }
     } else if( settings.licenseType == "F" || settings.licenseType == 'f' ){
         licensedToText = "This script is licensed for personal or non-profit use.";
     } else {
        licensedToText = "This script is licensed for single use";
     }
   } else {
      licensedToText = "This script is free for personal and non-profit use.  Commerical use requires a license.";
      mainWindow.enterLicenseButton.visible = true;
      mainWindow.singleUserButton.visible = true;
      mainWindow.multiUserButton.visible = true;
   }

   mainWindow.LicensedToText.text = licensedToText;

   return;
}
// --------------------------------------------------------------- //
function basicPressed( settings, mainWindow ){
   mainWindow.calendarBasicContainer.visible = true;
   mainWindow.calendarHolidaysContainer.visible = false;
   mainWindow.calendarCustomFramesContainer.visible = false;

   if( settings.bGridCalendar ){
      gridPressed( settings, mainWindow );
   } else if( settings.bListCalendar ){
      listPressed( settings, mainWindow );
   } else if( settings.bLineCalendar ){
      linePressed( settings, mainWindow );
   }
}
// --------------------------------------------------------------- //
function holidaysPressed( settings, mainWindow ){
   mainWindow.calendarBasicContainer.visible = false;
   mainWindow.calendarHolidaysContainer.visible = true;
   mainWindow.calendarCustomFramesContainer.visible = false;
}
// --------------------------------------------------------------- //
function customFramesPressed( settings, mainWindow ){
   mainWindow.calendarBasicContainer.visible = false;
   mainWindow.calendarHolidaysContainer.visible = false;
   mainWindow.calendarCustomFramesContainer.visible = true;
}
// --------------------------------------------------------------- //
function gridPressed( settings, mainWindow ){
   var currentValue = mainWindow.calendarsPerPageOptions.selection.text;
   var i;
   var newCalendarsPerPageOptionsIndex = 20;
   
   //mainWindow.calendarControlIdGrid.visible = true;
   //mainWindow.calendarControlIdList.visible = false;
   //mainWindow.calendarControlIdLine.visible = false;

   mainWindow.actionMenuA.visible = true;
   mainWindow.actionMenuB.visible = false;
   mainWindow.actionMenuC.visible = false;
   mainWindow.actionMenuD.visible = false;
   mainWindow.actionMenuE.visible = false;
   
   mainWindow.calendarControlContainer.visible = true;
   mainWindow.utilitiesContainer.visible = false;
   mainWindow.helpContainer.visible = false;
   
   if( mainWindow.calendarControlMenuA2.visible ){
      mainWindow.calendarControlMenuA1.visible = true;
      mainWindow.calendarControlMenuA2.visible = false;
   } else if( mainWindow.calendarControlMenuC2.visible ){
      mainWindow.calendarControlMenuC1.visible = true;
      mainWindow.calendarControlMenuC2.visible = false;
   } else if( mainWindow.calendarControlMenuD2.visible ){
      mainWindow.calendarControlMenuD1.visible = true;
      mainWindow.calendarControlMenuD2.visible = false;
   }

   mainWindow.basicGridOptions.visible     = true;
   mainWindow.basicListLineOptions.visible = false;

   if(    ( settings.bListCalendar && mainWindow.moonSize.text == settings.widgitValues.moonSize.listInitial.toString() )
       || ( settings.bLineCalendar && mainWindow.moonSize.text == settings.widgitValues.moonSize.lineInitial.toString() ) ){
      settings.widgitValues.moonSize.initial = settings.widgitValues.moonSize.gridInitial;
      mainWindow.moonSize.text = settings.widgitValues.moonSize.initial.toString();
   }
   
   mainWindow.layerOptions.visible = true;
   mainWindow.columnOptions.visible = false;
   
   mainWindow.addWeekDayLayer.enabled = false;
   mainWindow.addWorkWeekLayer.enabled = false;

   currentValue = mainWindow.calendarsPerPageOptions.selection.text;
   settings.widgitValues.calendarsPerPageOptions.values = settings.widgitValues.calendarsPerPageOptions.gridValues;

   for( i = 0; i < settings.widgitValues.calendarsPerPageOptions.values.length; i++ ){
      if( currentValue == settings.widgitValues.calendarsPerPageOptions.values[i] ){
         newCalendarsPerPageOptionsIndex = i;
         break;
      }
   }

   if( newCalendarsPerPageOptionsIndex < 0 ){
      alert( "The selected value for Calendars Per Page is not valid for the new calendar type.  It has been reset to 1." );
      newCalendarsPerPageOptionsIndex = 0;
   }

   mainWindow.calendarsPerPageOptions.removeAll();
   for( i = 0; i < settings.widgitValues.calendarsPerPageOptions.values.length; i++ ){
      mainWindow.calendarsPerPageOptions.add( "item", settings.widgitValues.calendarsPerPageOptions.values[i] );
   }
   mainWindow.calendarsPerPageOptions.selection = newCalendarsPerPageOptionsIndex;

   settings.bGridCalendar = true;
   settings.bListCalendar = false;
   settings.bLineCalendar = false;

   settings.calendarTypeIndex = 0;
}
// --------------------------------------------------------------- //
function listPressed( settings, mainWindow ){
   var currentValue = mainWindow.calendarsPerPageOptions.selection.text;
   var i;
   var newCalendarsPerPageOptionsIndex = -1;

   //mainWindow.calendarControlIdGrid.visible = false;
   //mainWindow.calendarControlIdList.visible = true;
   //mainWindow.calendarControlIdLine.visible = false;

   mainWindow.actionMenuA.visible = false;
   mainWindow.actionMenuB.visible = true;
   mainWindow.actionMenuC.visible = false;
   mainWindow.actionMenuD.visible = false;
   mainWindow.actionMenuE.visible = false;
   
   mainWindow.calendarControlContainer.visible = true;
   mainWindow.utilitiesContainer.visible = false;
   mainWindow.helpContainer.visible = false;
   
   if( mainWindow.calendarControlMenuA1.visible ){
      mainWindow.calendarControlMenuA2.visible = true;
      mainWindow.calendarControlMenuA1.visible = false;
   } else if( mainWindow.calendarControlMenuC1.visible ){
      mainWindow.calendarControlMenuC2.visible = true;
      mainWindow.calendarControlMenuC1.visible = false;
   } else if( mainWindow.calendarControlMenuD1.visible ){
      mainWindow.calendarControlMenuD2.visible = true;
      mainWindow.calendarControlMenuD1.visible = false;
   }
      
   mainWindow.basicGridOptions.visible     = false;
   mainWindow.basicListLineOptions.visible = true;
   
   if(    ( settings.bGridCalendar && mainWindow.moonSize.text == settings.widgitValues.moonSize.gridInitial.toString() )
       || ( settings.bLineCalendar && mainWindow.moonSize.text == settings.widgitValues.moonSize.lineInitial.toString() ) ){
      settings.widgitValues.moonSize.initial = settings.widgitValues.moonSize.listInitial;
      mainWindow.moonSize.text = settings.widgitValues.moonSize.initial.toString();
   }

   mainWindow.daysPerLineOptionsLabel.enabled = false;
   mainWindow.daysPerLineOptions.enabled = false;
   mainWindow.orientationOptionsLabel.enabled = false;
   mainWindow.orientationOptions.enabled = false;
   mainWindow.cellSpacingOptionsLabel.enabled = false;
   mainWindow.cellSpacingOptions.enabled = false;
   mainWindow.forceSquareCells.enabled = false;
   mainWindow.putEmptyCellsAtEndOfLine.enabled = false;
   mainWindow.onlyPrintFirstWeekday.enabled = false;
   
   mainWindow.layerOptions.visible = false;
   mainWindow.columnOptions.visible = true;

   currentValue = mainWindow.calendarsPerPageOptions.selection.text;
   settings.widgitValues.calendarsPerPageOptions.values = settings.widgitValues.calendarsPerPageOptions.listValues;
   for( i = 0; i < settings.widgitValues.calendarsPerPageOptions.values.length; i++ ){
      if( currentValue == settings.widgitValues.calendarsPerPageOptions.values[i] ){
         newCalendarsPerPageOptionsIndex = i;
         break;
      }
   }

   if( newCalendarsPerPageOptionsIndex < 0 ){
      alert( "The selected value for Calendars Per Page is not valid for the new calendar type.  It has been reset to 1." );
      newCalendarsPerPageOptionsIndex = 0;
   }

   mainWindow.calendarsPerPageOptions.removeAll();
   for( i = 0; i < settings.widgitValues.calendarsPerPageOptions.values.length; i++ ){
      mainWindow.calendarsPerPageOptions.add( "item", settings.widgitValues.calendarsPerPageOptions.values[i] );
   }
   mainWindow.calendarsPerPageOptions.selection = newCalendarsPerPageOptionsIndex;

   settings.bGridCalendar = false;
   settings.bListCalendar = true;
   settings.bLineCalendar = false;
   settings.calendarTypeIndex = 1;
}
// --------------------------------------------------------------- //
function linePressed( settings, mainWindow ){
   var currentValue;
   var i;
   var newCalendarsPerPageOptionsIndex = -1;

   //mainWindow.calendarControlIdGrid.visible = false;
   //mainWindow.calendarControlIdList.visible = false;
   //mainWindow.calendarControlIdLine.visible = true;

   mainWindow.actionMenuA.visible = false;
   mainWindow.actionMenuB.visible = false;
   mainWindow.actionMenuC.visible = true;
   mainWindow.actionMenuD.visible = false;
   mainWindow.actionMenuE.visible = false;
   
   mainWindow.calendarControlContainer.visible = true;
   mainWindow.utilitiesContainer.visible = false;
   mainWindow.helpContainer.visible = false;
   
   if( mainWindow.calendarControlMenuA2.visible ){
      mainWindow.calendarControlMenuA1.visible = true;
      mainWindow.calendarControlMenuA2.visible = false;
   } else if( mainWindow.calendarControlMenuC2.visible ){
      mainWindow.calendarControlMenuC1.visible = true;
      mainWindow.calendarControlMenuC2.visible = false;
   } else if( mainWindow.calendarControlMenuD2.visible ){
      mainWindow.calendarControlMenuD1.visible = true;
      mainWindow.calendarControlMenuD2.visible = false;
   }
   
   mainWindow.basicGridOptions.visible     = false;
   mainWindow.basicListLineOptions.visible = true;
   
   if(    ( settings.bGridCalendar && mainWindow.moonSize.text == settings.widgitValues.moonSize.gridInitial.toString() )
       || ( settings.bListCalendar && mainWindow.moonSize.text == settings.widgitValues.moonSize.listInitial.toString() ) ){
      settings.widgitValues.moonSize.initial = settings.widgitValues.moonSize.lineInitial;
      mainWindow.moonSize.text = settings.widgitValues.moonSize.initial.toString();
   }
   
   mainWindow.daysPerLineOptionsLabel.enabled = true;
   mainWindow.daysPerLineOptions.enabled = true;
   mainWindow.orientationOptionsLabel.enabled = true;
   mainWindow.orientationOptions.enabled = true;
   mainWindow.cellSpacingOptionsLabel.enabled = true;
   mainWindow.cellSpacingOptions.enabled = true;
   mainWindow.forceSquareCells.enabled = true;
   mainWindow.putEmptyCellsAtEndOfLine.enabled = true;
   mainWindow.onlyPrintFirstWeekday.enabled = true;
   
   mainWindow.layerOptions.visible = true;
   mainWindow.columnOptions.visible = false;
   
   mainWindow.addWeekDayLayer.enabled = true;
   mainWindow.addWorkWeekLayer.enabled = true;

   currentValue = mainWindow.calendarsPerPageOptions.selection.text;
   settings.widgitValues.calendarsPerPageOptions.values = settings.widgitValues.calendarsPerPageOptions.lineValues;
   for( i = 0; i < settings.widgitValues.calendarsPerPageOptions.values.length; i++ ){
      if( currentValue == settings.widgitValues.calendarsPerPageOptions.values[i] ){
         newCalendarsPerPageOptionsIndex = i;
         break;
      }
   }

   if( newCalendarsPerPageOptionsIndex < 0 ){
      alert( "The selected value for Calendars Per Page is not valid for the new calendar type.  It has been reset to 1." );
      newCalendarsPerPageOptionsIndex = 0;
   }

   mainWindow.calendarsPerPageOptions.removeAll();
   for( i = 0; i < settings.widgitValues.calendarsPerPageOptions.values.length; i++ ){
      mainWindow.calendarsPerPageOptions.add( "item", settings.widgitValues.calendarsPerPageOptions.values[i] );
   }
   mainWindow.calendarsPerPageOptions.selection = newCalendarsPerPageOptionsIndex;

   settings.bGridCalendar = false;
   settings.bListCalendar = false;
   settings.bLineCalendar = true;
   settings.calendarTypeIndex = 2;
}
// --------------------------------------------------------------- //
function utilitiesPressed( settings, mainWindow ){
   mainWindow.actionMenuA.visible = false;
   mainWindow.actionMenuB.visible = false;
   mainWindow.actionMenuC.visible = false;
   mainWindow.actionMenuD.visible = true;
   mainWindow.actionMenuE.visible = false;
   
   mainWindow.calendarControlContainer.visible = false;
   mainWindow.utilitiesContainer.visible = true;
   mainWindow.helpContainer.visible = false;
}
// --------------------------------------------------------------- //
function helpPressed( settings, mainWindow ){
   mainWindow.actionMenuA.visible = false;
   mainWindow.actionMenuB.visible = false;
   mainWindow.actionMenuC.visible = false;
   mainWindow.actionMenuD.visible = false;
   mainWindow.actionMenuE.visible = true;
   
   mainWindow.calendarControlContainer.visible = false;
   mainWindow.utilitiesContainer.visible = false;
   mainWindow.helpContainer.visible = true;
}
// --------------------------------------------------------------- //
function basicButtonPressed( settings, mainWindow ){
   mainWindow.calendarControlMenuC1.visible = false;
   mainWindow.calendarControlMenuD1.visible = false;
   mainWindow.calendarControlMenuC2.visible = false;
   mainWindow.calendarControlMenuD2.visible = false;
   if( settings.bListCalendar ){
      mainWindow.calendarControlMenuA1.visible = false;
      mainWindow.calendarControlMenuA2.visible = true;
   } else {
      mainWindow.calendarControlMenuA1.visible = true;
      mainWindow.calendarControlMenuA2.visible = false;
   }
   basicPressed( settings, mainWindow );
}
// --------------------------------------------------------------- //
function holidaysButtonPressed( settings, mainWindow ){
   mainWindow.calendarControlMenuA1.visible = false;
   mainWindow.calendarControlMenuD1.visible = false;
   mainWindow.calendarControlMenuA2.visible = false;
   mainWindow.calendarControlMenuD2.visible = false;
   if( settings.bListCalendar ){
      mainWindow.calendarControlMenuC1.visible = false;
      mainWindow.calendarControlMenuC2.visible = true;
   } else {
      mainWindow.calendarControlMenuC1.visible = true;
      mainWindow.calendarControlMenuC2.visible = false;
   }
   
   holidaysPressed( settings, mainWindow );
}
// --------------------------------------------------------------- //
function customFramesButtonPressed( settings, mainWindow ){
   mainWindow.calendarControlMenuA1.visible = false;
   mainWindow.calendarControlMenuC1.visible = false;
   mainWindow.calendarControlMenuA2.visible = false;
   mainWindow.calendarControlMenuC2.visible = false;
   if( settings.bListCalendar ){
      mainWindow.calendarControlMenuD1.visible = false;
      mainWindow.calendarControlMenuD2.visible = true;
   } else {
      mainWindow.calendarControlMenuD1.visible = true;
      mainWindow.calendarControlMenuD2.visible = false;
   }
   customFramesPressed( settings, mainWindow );
}
// --------------------------------------------------------------- //
function UpgradeFilesDialog( settings, message )
{
   var mainWindow = null;
   var skipUpdateButton;
   var updateFileButton;
   var updateAllButton;

   mainWindow = new Window( "dialog", "Calendar Wizard Message", undefined, {resizeable:false} );
   mainWindow.preferredSize = [500, 75];
   textWindow = mainWindow.add( "group{ orientation:'row' }");
   textWindow.alignment = ['fill', 'fill'];
   textWindow.alignChildren = ['fill', 'fill'];

   textWindow.add( 'statictext', undefined, message, { multiline:'true' } );

   with( mainWindow.add( "group{ orientation:'row' }" ) ){
      alignment = 'right';
      skipUpdateButton = add( "button", undefined, "Skip This File Update" );
      updateFileButton = add( "button", undefined, "Update This File" );
      updateAllButton  = add( "button", undefined, "Update This And Any Other Files" );
   }

   skipUpdateButton.onClick = function(){ skipUpdate( settings, mainWindow ); };
   updateFileButton.onClick = function(){ updateFile( settings, mainWindow ); };
   updateAllButton.onClick  = function(){ updateAll( settings, mainWindow ); };

   mainWindow.defaultElement = skipUpdateButton;

   return mainWindow.show();
}
// --------------------------------------------------------------- //
function skipUpdate( settings, mainWindow ){
   mainWindow.close( 0 );
}
// --------------------------------------------------------------- //
function updateFile( settings, mainWindow ){
   mainWindow.close( 1 );
}
// --------------------------------------------------------------- //
function updateAll( settings, mainWindow ){
   settings.forceFileUpdates = 1;
   mainWindow.close( 1 );
}
// --------------------------------------------------------------- //
function savePresetDialog( settings, mainWindow )
{
   var newWindow = null;
   var button1;
   var button2;
   var button3;

   newWindow = new Window( "dialog", "Save Preset", undefined, {resizeable:false} );
   newWindow.preferredSize = [500, 300 ];
   
   with( newWindow.add( "group{ orientation:'row' }") ){
      alignment = 'fill';
      with( add( 'statictext' , undefined, "Preset Name:" ) ){
         alignment = 'left';
      }
      mainWindow.newPresetName = add( 'edittext', undefined, "" );
      mainWindow.newPresetName.alignment = 'fill';
      mainWindow.newPresetName.active = true;
      mainWindow.newPresetName.preferredSize = [400,defaultHeight( settings )];

      if( mainWindow.presetDropdown.selection.index > 0 ){
         mainWindow.newPresetName.text = mainWindow.presetDropdown.selection.text;
      } else {
         mainWindow.newPresetName.text = "";
      }
   };
   
   with( newWindow.add( "group{ orientation:'column' }") ){
      alignChildren = ['fill', 'top'];
      add( 'statictext' , undefined, "A full preset will save every value" );
      add( 'statictext' , undefined, "A partial preset will only save values that are different from the default." );
      add( 'statictext' , undefined, "" );
      mainWindow.saveAsDefault = add( 'checkbox' , undefined, "Save as Script Default" );
      add( 'statictext' , undefined, "Note: If saving as the script default using the \"Create Partial Preset\" "
                                    +"button, all values currently at their default will be reset back to the "
                                    +"factory defaults", {multiline:'true'} );
   }

   with( newWindow.add( "group{ orientation:'row' }" ) ){
      alignment = 'right';
      button1 = add( "button", undefined, "Cancel" );
      button2 = add( "button", undefined, "Create Full Preset" );
      button3 = add( "button", undefined, "Create Partial Preset" );
   }

   button2.onClick = function(){ beginCreateFullPreset( settings, mainWindow, newWindow); };
   button3.onClick = function(){ beginCreatePartialPreset( settings, mainWindow, newWindow ); };
      
   newWindow.defaultElement = button3;

   return newWindow.show();
}
// --------------------------------------------------------------- //
function deletePresetDialog( settings, mainWindow )
{
   var newWindow = null;
   var button1;
   var button2;
   var selectedPreset;
   var result = 0;

   selectedPreset = mainWindow.presetDropdown.selection.text;
   if( selectedPreset.match( /\w/ ) ){
      newWindow = new Window( "dialog", "Delete Preset", undefined, {resizeable:false} );
      //mainWindow.preferredSize = [500, 75];
   
      with( newWindow.add( "group{ orientation:'row' }") ){
         alignment = 'fill';
         //with( add( 'statictext' , undefined, "Delete Preset \"" + mainWindow.newPresetName.text + "\"?" ) ){
         with( add( 'statictext' , undefined, "Delete Preset \"" + selectedPreset + "\"?" ) ){
            alignment = 'left';
         }
      };
   
      with( newWindow.add( "group{ orientation:'column' }") ){
         alignChildren = 'left';
         add( 'statictext' , undefined, "This action cannot be undone" );
      }

      with( newWindow.add( "group{ orientation:'row' }" ) ){
         alignment = 'right';
         button1 = add( "button", undefined, "Cancel" );
         button2 = add( "button", undefined, "Delete" );
      }

      button1.onClick = function(){ newWindow.close( 0 ) };
      button2.onClick = function(){ deleteScriptUiPreset( settings, mainWindow );
                                    newWindow.close( 1 ) };

      newWindow.defaultElement = button1;
      result = newWindow.show();
   }
   return result;
}
// --------------------------------------------------------------- //
function beginCreateFullPreset( settings, mainWindow, newWindow ){
   if( mainWindow.saveAsDefault.value || mainWindow.newPresetName.text.match( settings.anythingRegExp ) ){
      mainWindow.saveFullPreset = true;
      newWindow.close( 1 );
      saveScriptUiPreset( settings, mainWindow, false );
   } else {
      alert( "Invalid preset name." );
   }
}
// --------------------------------------------------------------- //
function beginCreatePartialPreset( settings, mainWindow, newWindow ){
   if( mainWindow.saveAsDefault.value || mainWindow.newPresetName.text.match( settings.anythingRegExp ) ){
      mainWindow.saveFullPreset = false;
      newWindow.close( 1 );
      saveScriptUiPreset( settings, mainWindow, false );
   } else {
      alert( "Invalid preset name." );
   }
   return;
}
// --------------------------------------------------------------- //
function confirmFileOverwrite( settings, mainWindow, fileName )
{
   var newWindow = null;
   var button1;
   var button2;
   var selectedPreset;
   var result = 0;

   selectedPreset = mainWindow.presetDropdown.selection.text;
   newWindow = new Window( "dialog", "Confirm Overwrite", undefined, {resizeable:false} );
   
   with( newWindow.add( "group{ orientation:'row' }") ){
      alignment = 'fill';
      with( add( 'statictext' , undefined, "The file \"" + fileName + "\" already exists.  Overwrite?") ){
         alignment = 'left';
      }
   };

   with( newWindow.add( "group{ orientation:'row' }" ) ){
      alignment = 'right';
      button1 = add( "button", undefined, "Cancel" );
      button2 = add( "button", undefined, "Overwrite" );
   }

   newWindow.defaultElement = button1;
   button1.onClick = function(){ newWindow.close( 0 ) };
   button2.onClick = function(){ newWindow.close( 1 ) };

   return( newWindow.show() );
}
// --------------------------------------------------------------- //
function confirmFileDelete( settings, fileName )
{
   var newWindow = null;
   var button1;
   var button2;
   var result = 0;

   newWindow = new Window( "dialog", "Confirm Delete", undefined, {resizeable:false} );
   
   with( newWindow.add( "group{ orientation:'row' }") ){
      alignment = 'fill';
      with( add( 'statictext' , undefined, "Delete \"" + fileName + "\"? This action cannot be undone.") ){
         alignment = 'left';
      }
   };

   with( newWindow.add( "group{ orientation:'row' }" ) ){
      alignment = 'right';
      button1 = add( "button", undefined, "Cancel" );
      button2 = add( "button", undefined, "Delete" );
   }

   newWindow.defaultElement = button1;
   button1.onClick = function(){ newWindow.close( 0 ) };
   button2.onClick = function(){ newWindow.close( 1 ) };

   return( newWindow.show() );
}
// --------------------------------------------------------------- //
function enterLicenseKey( settings, mainWindow )
{
   var newWindow = null;
   var button1;
   var button2;
   var selectedPreset;
   var result = 0;
   var licenseKeyEntry;

   newWindow = new Window( "dialog", "Enter License Key", undefined, {resizeable:false} );
   newWindow.individual = false;
   newWindow.enterprise = false;

   with( newWindow.add( "group{ orientation:'column' }") ){
      with( add( "group{ orientation:'row' }") ){
         alignment = 'left';
         add( 'statictext' , undefined, "License Key:" );
         newWindow.licenseKeyEntry = add( 'edittext', undefined );
         newWindow.licenseKeyEntry.preferredSize = [200, defaultHeight( settings )];
      }
      with( add( "group{ orientation:'row' }") ){
         alignment = 'left';
         add( 'statictext' , undefined, "Licensed To:" );
         newWindow.licensedToEntry = add( 'edittext', undefined );
         newWindow.licensedToEntry.preferredSize = [200, defaultHeight( settings )];
      }
   }

   with( newWindow.add( "group{ orientation:'row' }" ) ){
      alignment = 'right';
      newWindow.button1 = add( "button", undefined, "Cancel" );
      newWindow.button2 = add( "button", undefined, "OK" );
      newWindow.button2.enabled = false;
   }

   newWindow.defaultElement = newWindow.button1;

   newWindow.licenseKeyEntry.onChange = newWindow.licenseKeyEntry.onChanging = function(){ validateLicenseKey( settings, mainWindow, newWindow ); };
   newWindow.licensedToEntry.onChange = newWindow.licensedToEntry.onChanging = function(){ validateLicenseKey( settings, mainWindow, newWindow ); };
   newWindow.button1.onClick = function(){ newWindow.close(0) };
   newWindow.button2.onClick = function(){ newWindow.close(1); };

   if( newWindow.show() == 1 ){
      settings.licenseFile.open( 'w' );
      if( settings.bWindows ){
         settings.licenseFile.lineFeed = "Windows";
      } else {
         settings.licenseFile.lineFeed = "Unix";
      }
      settings.licenseFile.writeln( newWindow.licenseKeyEntry.text + ":" + newWindow.licensedToEntry.text );
      settings.licenseFile.close(); 
 
      readLicenseFile( settings );
      setLicense( settings, mainWindow )
   }
   return;
}
// --------------------------------------------------------------- //
function validateLicenseKey( settings, mainWindow, newWindow ){
   var individualLicenseRegEx = /^\s*(S):(\d{10})\s*$/i;
   var enterpriseLicenseRegEx = /^\s*(E):(\d{10})\s*$/i;

   if( settings.nonSpaceRegExp.test( newWindow.licensedToEntry.text ) ){
      if( individualLicenseRegEx.test( newWindow.licenseKeyEntry.text ) ){
         newWindow.button2.enabled = true;
         newWindow.individual = true;
         newWindow.enterprise = false;
      } else if( enterpriseLicenseRegEx.test( newWindow.licenseKeyEntry.text ) ){
         newWindow.button2.enabled = true;
         newWindow.individual = false;
         newWindow.enterprise = true;
      } else {
         newWindow.button2.enabled = false;
         newWindow.individual = false;
         newWindow.enterprise = false;
      }
   } else {
      newWindow.button2.enabled = false;
      newWindow.individual = false;
      newWindow.enterprise = false;
   }

   return;
}
// --------------------------------------------------------------- //
function validateMoonSizeValue( settings, mainWindow ){
   if( !( mainWindow.moonSize.text.match( settings.numberRegExp )
         && parseFloat( mainWindow.moonSize.text ) > 1
         && parseFloat( mainWindow.moonSize.text ) <= 100 )){
      alert( "The specified moon size is invalid.  Resetting to the default value." );
      if( settings.bGridCalendar ){
         settings.widgitValues.moonSize.initial = settings.widgitValues.moonSize.gridInitial;
         mainWindow.moonSize.text = settings.widgitValues.moonSize.initial.toString();
      } else if( settings.bListCalendar ){
         settings.widgitValues.moonSize.initial = settings.widgitValues.moonSize.listInitial;
         mainWindow.moonSize.text = settings.widgitValues.moonSize.initial.toString();
      } else if( settings.bLineCalendar ){
         settings.widgitValues.moonSize.initial = settings.widgitValues.moonSize.lineInitial;
         mainWindow.moonSize.text = settings.widgitValues.moonSize.initial.toString();
      }
   }
   return;
}
// --------------------------------------------------------------- //
function enableRelatedControls( settings, mainWindow ){
   enableRelatedMonthLabelControls( settings, mainWindow );
   enableRelatedMoonControls( settings, mainWindow );
   enableRelatedWorkWeekControls( settings, mainWindow );
   enableRelatedMiniCalendarControls( settings, mainWindow );
   enableRelatedDateWeekDayMergedCellControls( settings, mainWindow );
   enableRelatedColumnCountControls( settings, mainWindow );
   enableCurrentFrameLabel( settings, mainWindow, null );
   enableCustomFileLabel( settings, mainWindow, null );
   enableHolidayLabels( settings, mainWindow );
   enableRelatedUnitControls( settings, mainWindow );
   enableCustomDocumentSize( settings, mainWindow );
   enableWeekDayColumnWidth( settings, mainWindow );
   enableDominantHighlighting( settings, mainWindow );
   enableMiniCalendarControl( settings, mainWindow );

   if( settings.bUseCustomHeightAndWidth ){
      mainWindow.customFramesMenuA.visible = true;
      mainWindow.customFramesMenuB.visible = false;
      mainWindow.customFramesControlsA.visible = true;
      mainWindow.customFramesControlsB.visible = false;
   } else {
      mainWindow.customFramesMenuA.visible = false;
      mainWindow.customFramesMenuB.visible = true;
      mainWindow.customFramesControlsA.visible = false;
      mainWindow.customFramesControlsB.visible = true;
   }

   enableCustomHWValueLabels( settings, mainWindow, 'calendar' );
   enableCustomHWValueLabels( settings, mainWindow, 'month' );
   enableCustomHWValueLabels( settings, mainWindow, 'year' );
   enableCustomHWValueLabels( settings, mainWindow, 'picture' );
   enableCustomEdgeValueLabels( settings, mainWindow, 'calendar' );
   enableCustomEdgeValueLabels( settings, mainWindow, 'month' );
   enableCustomEdgeValueLabels( settings, mainWindow, 'year' );
   enableCustomEdgeValueLabels( settings, mainWindow, 'picture' );

   enableCustomFramesToSpacerPage( settings, mainWindow );

   syncListBackgroundLayerCheckbox( settings, mainWindow );
   syncListCalendarLayerCheckbox( settings, mainWindow );

   if( settings.useYearEntry ){
      showYearEntryContainer( settings, mainWindow );
   } else {
      showYearSelectionContainer( settings, mainWindow );
   }

   if( settings.bGridCalendar ){
      gridPressed( settings, mainWindow );
   } else if( settings.bListCalendar ){
      listPressed( settings, mainWindow );
   } else if( settings.bLineCalendar ){
      linePressed( settings, mainWindow );
   }
}
// --------------------------------------------------------------- //
function enableCustomFramesToSpacerPage( settings, mainWindow ){
   enableCustomPictureFrameToSpacerPage( settings, mainWindow );
   enableCustomMonthYearFramesToSpacerPage( settings, mainWindow );
}
// --------------------------------------------------------------- //
function enableCustomPictureFrameToSpacerPage( settings, mainWindow ){
   if( mainWindow.spacerPageOptions.selection.index != 0 &&
       ( mainWindow.pictureCustomSizeY1Label.enabled || mainWindow.pictureCustomHeightLabel.enabled ) ){
      mainWindow.addCustomPictureFrameToSpacerPage.enabled = true;
   } else {
      mainWindow.addCustomPictureFrameToSpacerPage.enabled = false;
   }
}
// --------------------------------------------------------------- //
function enableCustomMonthYearFramesToSpacerPage( settings, mainWindow ){
   if( mainWindow.spacerPageOptions.selection.index != 0 &&
       ( mainWindow.monthCustomSizeY1Label.enabled || mainWindow.monthCustomHeightLabel.enabled  
      || mainWindow.yearCustomSizeY1Label.enabled || mainWindow.yearCustomHeightLabel.enabled ) ){
      mainWindow.addCustomMonthYearFramesToSpacerPage.enabled = true;
   } else {
      mainWindow.addCustomMonthYearFramesToSpacerPage.enabled = false;
   }
}
// --------------------------------------------------------------- //
function enableMiniCalendarControl( settings, mainWindow ){
   if( mainWindow.gridCalendarMonthLabelingOptions.selection.index == 0 ){
      mainWindow.includeMiniCalendars.enabled = false;
   } else if( mainWindow[ 'monthCustomSizeY1Label' ].enabled ){
      mainWindow.includeMiniCalendars.enabled = false;
   } else if( mainWindow[ 'monthCustomHeightLabel' ].enabled ){
      mainWindow.includeMiniCalendars.enabled = false;
   } else {
      mainWindow.includeMiniCalendars.enabled = true;
   }
}
// --------------------------------------------------------------- //
function enableRelatedMonthLabelControls( settings, mainWindow ){
   enableMiniCalendarControl( settings, mainWindow );
}
// --------------------------------------------------------------- //
function enableRelatedWorkWeekControls( settings, mainWindow, widgit ){
   if( widgit != null ){
      syncWorkWeekButtons( settings, mainWindow, widgit );
   }

   if( mainWindow.includeWorkWeek.value ){
      mainWindow.workWeekOptionsLabel.enabled = true;
      mainWindow.workWeekOptions.enabled = true;
      mainWindow.workWeekPrefixLabel.enabled = true;
      mainWindow.workWeekPrefix.enabled = true;
      mainWindow.workWeekColumnWidth.enabled = true;
   } else {
      mainWindow.workWeekOptionsLabel.enabled = false;
      mainWindow.workWeekOptions.enabled = false;
      mainWindow.workWeekPrefixLabel.enabled = false;
      mainWindow.workWeekPrefix.enabled = false;
      mainWindow.workWeekColumnWidth.enabled = false;
   }
   return
}
// --------------------------------------------------------------- //
function enableRelatedMoonControls( settings, mainWindow, widgit ){
   if( widgit != null ){
      syncMoonButtons( settings, mainWindow, widgit );
   }

   if( mainWindow.includeMoons.value ){
      mainWindow.moonSizeLabel.enabled = true;
      mainWindow.moonSize.enabled = true;
      mainWindow.moonSizeLabelSuffix.enabled = true;
      mainWindow.moonRotationLabel.enabled = true;
      mainWindow.moonRotation.enabled = true;
      mainWindow.moonColumnWidth.enabled = true;
   } else {
      mainWindow.moonSizeLabel.enabled = false;
      mainWindow.moonSize.enabled = false;
      mainWindow.moonSizeLabelSuffix.enabled = false;
      mainWindow.moonRotationLabel.enabled = false;
      mainWindow.moonRotation.enabled = false;
      mainWindow.moonColumnWidth.enabled = false;
   }

   return;
}
// --------------------------------------------------------------- //
function enableRelatedMiniCalendarControls( settings, mainWindow ){
   if( mainWindow.includeMiniCalendars.value ){
      mainWindow.miniCalendarMonthLabelingOptionsLabel.enabled = true;
      mainWindow.miniCalendarMonthLabelingOptions.enabled = true;
      mainWindow.maxNumberOfRowsInMiniCalendarsOptionsLabel.enabled = true;
      mainWindow.maxNumberOfRowsInMiniCalendarsOptions.enabled = true;
   } else {
      mainWindow.miniCalendarMonthLabelingOptionsLabel.enabled = false;
      mainWindow.miniCalendarMonthLabelingOptions.enabled = false;
      mainWindow.maxNumberOfRowsInMiniCalendarsOptionsLabel.enabled = false;
      mainWindow.maxNumberOfRowsInMiniCalendarsOptions.enabled = false;
   }
   return;
}
// --------------------------------------------------------------- //
function enableRelatedDateWeekDayMergedCellControls( settings, mainWindow ){
   if( mainWindow.mergeDateAndDayColumns.value ){
      mainWindow.dateWeekDayDelimiterLabel.enabled = true;
      mainWindow.dateWeekDayDelimiter.enabled = true;
   } else {
      mainWindow.dateWeekDayDelimiterLabel.enabled = false;
      mainWindow.dateWeekDayDelimiter.enabled = false;
   }
   return;
}
// --------------------------------------------------------------- //
function enableRelatedColumnCountControls( settings, mainWindow ){
   if( hasMoreThanOneColumn( settings, mainWindow ) ){
      mainWindow.columnGutterLabel.enabled = true;
      mainWindow.columnGutter.enabled = true;
   } else {
      mainWindow.columnGutterLabel.enabled = false;
      mainWindow.columnGutter.enabled = false;
   }
   return;
}
// --------------------------------------------------------------- //
function syncMoonButtons( settings, mainWindow, widgit ){
   var value = mainWindow[ widgit ].value;

   if( mainWindow.includeMoons != value ){
      mainWindow.includeMoons.value = value;
   }

   if( mainWindow.addMoonsLayer != value ){
      mainWindow.addMoonsLayer.value = value;
   }

   if( mainWindow.addMoonsColumn != value ){
      mainWindow.addMoonsColumn.value = value;
   }


   return;
}
// --------------------------------------------------------------- //
function syncWorkWeekButtons( settings, mainWindow, widgit ){
   var value = mainWindow[ widgit ].value;

   if( mainWindow.includeWorkWeek != value ){
      mainWindow.includeWorkWeek.value = value;
   }

   if( mainWindow.addWorkWeekColumn != value ){
      mainWindow.addWorkWeekColumn.value = value;
   }

   if( mainWindow.addWorkWeekLayer != value ){
      mainWindow.addWorkWeekLayer.value = value;
   }

   return;
}
// --------------------------------------------------------------- //
function syncUnitControls( settings, mainWindow, widgit ){
   var value = mainWindow[ widgit ].selection.index;

   if( mainWindow.customFrameUnitOptions.selection.index != value ){
      mainWindow.customFrameUnitOptions.selection = value;
   }
   
   if( mainWindow.documentUnitOptions.selection.index != value ){
      mainWindow.documentUnitOptions.selection = value;
   }

   return;
}
// --------------------------------------------------------------- //
function enableRelatedUnitControls( settings, mainWindow, widgit ){
   if( widgit != null ){
      syncUnitControls( settings, mainWindow, widgit );
   }
}
// --------------------------------------------------------------- //
function hasMoreThanOneColumn( settings, mainWindow ){
   var bFlag = true;
   if( mainWindow.columnCountOptions.selection.index == 0 ){
      bFlag = false;
   }
   return( bFlag );
}
// --------------------------------------------------------------- //
function makeDeleteHolidayFunction( settings, mainWindow, newWindow, i){
   return function(){ deleteHoliday( settings, mainWindow, newWindow, i ); };
}
// --------------------------------------------------------------- //
function deleteHoliday( settings, mainWindow, newWindow, i )
{
   var file = settings.holidayFiles[i];
   var fileName = file.displayName;
   var bDoIt = false;

   fileName = file.displayName.substring( 0, file.displayName.indexOf( '.holidays' ) );
   bDoIt = confirmFileDelete( settings, fileName );
   if( bDoIt == 1 ){
      file.remove();

      if( newWindow.fileBeingEditedIndex == i ){
         newWindow.fileBeingEdited.text = "";
         newWindow.fileContents.text     = "";
      }
      updateHolidays( settings, mainWindow, newWindow );
   }

   return;
}
// --------------------------------------------------------------- //
function makeEditHolidayFunction( settings, newWindow, i){
   return function(){ editHoliday( settings, newWindow, i ); };
}
// --------------------------------------------------------------- //
function editHoliday( settings, newWindow, i )
{
   var contents = "";
   var file = settings.holidayFiles[i];
   if( file.exists && file.open( 'r' ) ){
      while( file.tell() < file.length ){
         contents += file.readln() + "\n";
      }
      file.close();
   }
   
   newWindow.fileBeingEdited.text = file.displayName;
   newWindow.fileContents.text = contents;
   newWindow.fileBeingEditedIndex = i;

   return;
}
// --------------------------------------------------------------- //
function saveHoliday( settings, newWindow )
{
   var file = settings.holidayFiles[ newWindow.fileBeingEditedIndex ];
   var contents;

   if( settings.bWindows ){
      file.lineFeed = "Windows";
   } else {
      file.lineFeed = "Unix";
   }

   if( file.open( 'w' )){ 
      contents = newWindow.fileContents.text.split( /\n/ );
      for( i = 0; i < contents.length; i++ ){
         file.writeln( contents[i] );
      }
      file.close();
   }

   newWindow.saveButton.enabled = false;
   return;
}
// --------------------------------------------------------------- //
function makeEnableCurrentFrameLabelFunction( settings, mainWindow, a){
   return function(){ enableCurrentFrameLabel( settings, mainWindow, a ) };
}
// --------------------------------------------------------------- //
function enableCurrentFrameLabel( settings, mainWindow, letter ){
   var abcd = ['A', 'B', 'C', 'D'];
   var bFlag = false;
   var key = 'loadHolidayFromCurrentFrame';

   // Radio Button Functionality
   if( letter != null && mainWindow[ key + letter ].value == true ){
      for( i = 0; i < abcd.length; i++ ){
         if( abcd[i] != letter ){
            mainWindow[ key+abcd[i] ].value = false;
         }
      }
   }

   for( i = 0; i < abcd.length; i++ ){
      if( mainWindow[ key + abcd[i] ].value == true ){
         bFlag = true;
      }
   }

   if( bFlag ){
      mainWindow.loadHolidayFromCurrentFrameLabel.enabled = true;
   } else {
      mainWindow.loadHolidayFromCurrentFrameLabel.enabled = false;
   }
   return;
}
// --------------------------------------------------------------- //
function makeEnableCustomFileLabelFunction( settings, mainWindow, a){
   return function(){ enableCustomFileLabel( settings, mainWindow, a ) };
}
// --------------------------------------------------------------- //
function enableCustomFileLabel( settings, mainWindow, letter ){
   var abcd = ['A', 'B', 'C', 'D'];
   var bFlag = false;
   var key = 'loadHolidayFromCustomFile';

   // Radio Button Functionality
   if( letter != null && mainWindow[ key + letter ].value == true ){
      for( i = 0; i < abcd.length; i++ ){
         if( abcd[i] != letter ){
            mainWindow[ key+abcd[i] ].value = false;
         }
      }
   }

   // enable/disable the label
   for( i = 0; i < abcd.length; i++ ){
      if( mainWindow[ key + abcd[i] ].value == true ){
         bFlag = true;
      }
   }

   if( bFlag ){
      mainWindow.loadHolidayFromCustomFileLabel.enabled = true;
   } else {
      mainWindow.loadHolidayFromCustomFileLabel.enabled = false;
   }
   return;
}
// --------------------------------------------------------------- //
function makeEnableHolidayLabelFunction( settings, mainWindow, i, a){
   return function(){ enableHolidayLabel( settings, mainWindow, i, a ) };
}
// --------------------------------------------------------------- //
function enableHolidayLabels( settings, mainWindow ){
   for( i = 0; i < mainWindow.holidaySelectorsA.length; i++ ){
      enableHolidayLabel( settings, mainWindow, i, null );
   }
}
// --------------------------------------------------------------- //
function enableHolidayLabel( settings, mainWindow, index, letter){
   var i;
   var abcd = ['A', 'B', 'C', 'D'];
   var bFlag = false;
      
   // Radio Button Functionality
   if( letter != null && mainWindow[ "holidaySelectors" + letter ][index].value == true ){
      for( i = 0; i < abcd.length; i++ ){
         if( abcd[i] != letter ){
            mainWindow[ "holidaySelectors"+abcd[i] ][index].value = false;
         }
      }
   }

   // enable/disable the label
   for( i = 0; i < abcd.length; i++ ){
      if( mainWindow[ "holidaySelectors" + abcd[i] ][index].value == true ){
         bFlag = true;
      }
   }

   if( bFlag ){
      mainWindow.holidaySelectorsLabel[index].enabled = true;
   } else {
      mainWindow.holidaySelectorsLabel[index].enabled = false;
   }

   return;
}
// --------------------------------------------------------------- //
function showHeightAndWidth( settings, mainWindow ){
   settings.bUseCustomHeightAndWidth = true;
   mainWindow.customFramesMenuA.visible = true;
   mainWindow.customFramesMenuB.visible = false;
   mainWindow.customFramesControlsA.visible = true;
   mainWindow.customFramesControlsB.visible = false;
}
// --------------------------------------------------------------- //
function showEdges( settings, mainWindow ){
   settings.bUseCustomHeightAndWidth = false;
   mainWindow.customFramesMenuA.visible = false;
   mainWindow.customFramesMenuB.visible = true;
   mainWindow.customFramesControlsA.visible = false;
   mainWindow.customFramesControlsB.visible = true;
}
// --------------------------------------------------------------- //
function addHWControls( settings, mainWindow, panel, key ){
   
   var title;
   var hWcolumn1 = [60, defaultHeight( settings )];
   var hWcolumn2 = [50, defaultHeight( settings )];

   with( panel ){
      with( add( "group{ orientation:'row'}" ) ){
         mainWindow[ key + 'CustomHeightLabel' ] = add( 'statictext', undefined, 'Height' );
         mainWindow[ key + 'CustomHeightLabel' ].preferredSize = hWcolumn1;
         mainWindow[ key + 'CustomHeightLabel' ].enabled = false;
         mainWindow[ key + 'CustomHeight' ] = add( 'edittext', undefined, settings.widgitValues[ key + 'CustomHeight' ].initial );
         mainWindow[ key + 'CustomHeight' ].preferredSize = hWcolumn2;
         mainWindow[ key + 'CustomHeight' ].onChange = makeCustomHWValueValidateFunction( settings, mainWindow, key, "CustomHeight" );
         mainWindow[ key + 'CustomTopEdgeLabel' ] = add( 'statictext', undefined, 'Top Edge' );
         mainWindow[ key + 'CustomTopEdgeLabel' ].preferredSize = hWcolumn1;
         mainWindow[ key + 'CustomTopEdgeLabel' ].enabled = false;
         mainWindow[ key + 'CustomTopEdge' ] = add( 'edittext', undefined, settings.widgitValues[ key + 'CustomTopEdge' ].initial );
         mainWindow[ key + 'CustomTopEdge' ].preferredSize = hWcolumn2;
         mainWindow[ key + 'CustomTopEdge' ].onChange = makeCustomHWValueValidateFunction( settings, mainWindow, key, "CustomTopEdge" );
      }
      with( add( "group{ orientation:'row'}" ) ){
         mainWindow[ key + 'CustomWidthLabel' ] = add( 'statictext', undefined, 'Width' );
         mainWindow[ key + 'CustomWidthLabel' ].preferredSize = hWcolumn1;
         mainWindow[ key + 'CustomWidthLabel' ].enabled = false;
         mainWindow[ key + 'CustomWidth' ] = add( 'edittext', undefined, settings.widgitValues[ key + 'CustomWidth' ].initial );
         mainWindow[ key + 'CustomWidth' ].preferredSize = hWcolumn2;
         mainWindow[ key + 'CustomWidth' ].onChange = makeCustomHWValueValidateFunction( settings, mainWindow, key, "CustomWidth" );
         mainWindow[ key + 'CustomLeftEdgeLabel' ] = add( 'statictext', undefined, 'Left Edge' );
         mainWindow[ key + 'CustomLeftEdgeLabel' ].preferredSize = hWcolumn1;
         mainWindow[ key + 'CustomLeftEdgeLabel' ].enabled = false;
         mainWindow[ key + 'CustomLeftEdge' ] = add( 'edittext', undefined, settings.widgitValues[ key + 'CustomLeftEdge' ].initial );
         mainWindow[ key + 'CustomLeftEdge' ].preferredSize = hWcolumn2;
         mainWindow[ key + 'CustomLeftEdge' ].onChange = makeCustomHWValueValidateFunction( settings, mainWindow, key, "CustomLeftEdge" );
      }
      add( 'statictext', undefined, 'Set all four values to activate' );
   }
}
// --------------------------------------------------------------- //
function addEdgeControls( settings, mainWindow, panel, key )
{
   var column1 = [50, defaultHeight( settings )];
   var column2 = [50, defaultHeight( settings )];
   var column3 = [50, defaultHeight( settings )];
   var textSize = [50, defaultHeight( settings )];

   with( panel ){
      alignChildren = ['left', 'top'];

      with( add( "group{ orientation:'row'}" ) ){
         mainWindow[ key + 'CustomSizeY1Label' ] = add( 'statictext', undefined, 'Top' );
         mainWindow[ key + 'CustomSizeY1Label' ].preferredSize = column1;
         mainWindow[ key + 'CustomSizeY1Label' ].enabled = false;
         mainWindow[ key + 'CustomSizeY1' ] = add( 'edittext', undefined, settings.widgitValues[ key + 'CustomSizeY1' ].initial );
         mainWindow[ key + 'CustomSizeY1' ].preferredSize = column2;
         mainWindow[ key + 'CustomSizeY1' ].onChange = makeCustomEdgeValueValidateFunction( settings, mainWindow, key, 'CustomSizeY1' );
      }
      with( add( "group{ orientation:'row'}" ) ){
         mainWindow[ key + 'CustomSizeY2Label' ] = add( 'statictext', undefined, 'Bottom' );
         mainWindow[ key + 'CustomSizeY2Label' ].preferredSize = column1;
         mainWindow[ key + 'CustomSizeY2Label' ].enabled = false;
         mainWindow[ key + 'CustomSizeY2' ] = add( 'edittext', undefined, settings.widgitValues[ key + 'CustomSizeY2' ].initial );
         mainWindow[ key + 'CustomSizeY2' ].preferredSize = column2;
         mainWindow[ key + 'CustomSizeY2' ].onChange = makeCustomEdgeValueValidateFunction( settings, mainWindow, key, 'CustomSizeY2' );
      }
      with( add( "group{ orientation:'row'}" ) ){
         with( add( 'statictext', undefined, '' ) ){ preferredSize = column1; };
         mainWindow[ key + 'CustomSizeX1Label' ] = add( 'statictext', undefined, 'Left' );
         mainWindow[ key + 'CustomSizeX1Label' ].preferredSize = column1;
         mainWindow[ key + 'CustomSizeX1Label' ].enabled = false;
         mainWindow[ key + 'CustomSizeX1' ] = add( 'edittext', undefined, settings.widgitValues[ key + 'CustomSizeX1' ].initial );
         mainWindow[ key + 'CustomSizeX1' ].preferredSize = column2;
         mainWindow[ key + 'CustomSizeX1' ].onChange = makeCustomEdgeValueValidateFunction( settings, mainWindow, key, 'CustomSizeX1' );
         mainWindow[ key + 'CustomSizeX2Label' ] = add( 'statictext', undefined, 'Right' );
         mainWindow[ key + 'CustomSizeX2Label' ].preferredSize = column3;
         mainWindow[ key + 'CustomSizeX2Label' ].enabeld = false;
         mainWindow[ key + 'CustomSizeX2' ] = add( 'edittext', undefined, settings.widgitValues[ key + 'CustomSizeX2' ].initial );
         mainWindow[ key + 'CustomSizeX2' ].preferredSize = column2;
         mainWindow[ key + 'CustomSizeX2' ].onChange = makeCustomEdgeValueValidateFunction( settings, mainWindow, key, 'CustomSizeX2' );
      }
      add( 'statictext', undefined, 'Set all four values to activate.' );
   }
}
// --------------------------------------------------------------- //
function validateDateColumnWidth( settings, mainWindow )
{
   var bFlag = false;
   if( settings.nonSpaceRegExp.test( mainWindow.dateColumnWidth.text ) ){
      if( !settings.numberRegExp.test( mainWindow.dateColumnWidth.text ) ){
         bFlag = true;
      } else if( parseFloat( mainWindow.dateColumnWidth.text) <= 0 ){
         bFlag = true;
      }
   }

   if( bFlag ){
      alert( "The date column width must be a number greater than 0." );
      mainWindow.dateColumnWidth.text = '';
   }
 
   return;
}
// --------------------------------------------------------------- //
function validateWeekDayColumnWidth( settings, mainWindow )
{
   var bFlag = false;
   if( settings.nonSpaceRegExp.test( mainWindow.weekDayColumnWidth.text ) ){
      if( !settings.numberRegExp.test( mainWindow.weekDayColumnWidth.text ) ){
         bFlag = true;
      } else if( parseFloat( mainWindow.weekDayColumnWidth.text) <= 0 ){
         bFlag = true;
      }
   }

   if( bFlag ){
      alert( "The week day column width must be a number greater than 0." );
      mainWindow.weekDayColumnWidth.text = '';
   }
 
   return;
}
// --------------------------------------------------------------- //
function validateWorkWeekColumnWidth( settings, mainWindow )
{
   var bFlag = false;
   if( settings.nonSpaceRegExp.test( mainWindow.workWeekColumnWidth.text ) ){
      if( !settings.numberRegExp.test( mainWindow.workWeekColumnWidth.text ) ){
         bFlag = true;
      } else if( parseFloat( mainWindow.workWeekColumnWidth.text) <= 0 ){
         bFlag = true;
      }
   }

   if( bFlag ){
      alert( "The work week column width must be a number greater than 0." );
      mainWindow.workWeekColumnWidth.text = '';
   }
 
   return;
}
// --------------------------------------------------------------- //
function validateMoonColumnWidth( settings, mainWindow )
{
   var bFlag = false;
   if( settings.nonSpaceRegExp.test( mainWindow.moonColumnWidth.text ) ){
      if( !settings.numberRegExp.test( mainWindow.moonColumnWidth.text ) ){
         bFlag = true;
      } else if( parseFloat( mainWindow.moonColumnWidth.text) <= 0 ){
         bFlag = true;
      }
   }

   if( bFlag ){
      alert( "The moon column width must be a number greater than 0." );
      mainWindow.moonColumnWidth.text = '';
   }
 
   return;
}
// --------------------------------------------------------------- //
function validateColumnGutter( settings, mainWindow )
{
   var bFlag = false;
   if( settings.nonSpaceRegExp.test( mainWindow.columnGutter.text ) ){
      if( !settings.numberRegExp.test( mainWindow.columnGutter.text ) ){
         bFlag = true;
      } else if( parseFloat( mainWindow.columnGutter.text) <= 0 ){
         bFlag = true;
      }
   }

   if( bFlag ){
      alert( "The column gutter must be a number greater than 0." );
      mainWindow.columnGutter.text = '';
   }
 
   return;
}
// --------------------------------------------------------------- //
function validateDocumentHeight( settings, mainWindow )
{
   var bFlag = false;
   
   if( settings.nonSpaceRegExp.test( mainWindow.documentHeight.text ) ){
      if( !settings.numberRegExp.test( mainWindow.documentHeight.text ) ){
         bFlag = true;
      } else if( parseFloat( mainWindow.documentHeight.text) <= 0 ){
         bFlag = true;
      }
   }

   if( bFlag ){
      alert( "The document height must be a number greater than 0." );
      mainWindow.documentHeight.text = '';
   } 
   enableCustomDocumentSize( settings, mainWindow )
   return;
}
// --------------------------------------------------------------- //
function validateDocumentWidth( settings, mainWindow )
{
   var bFlag = false;
   if( settings.nonSpaceRegExp.test( mainWindow.documentWidth.text ) ){
      if( !settings.numberRegExp.test( mainWindow.documentWidth.text ) ){
         bFlag = true;
      } else if( parseFloat( mainWindow.documentWidth.text) <= 0 ){
         bFlag = true;
      }
   }

   if( bFlag ){
      alert( "The document width must be a number greater than 0." );
      mainWindow.documentWidth.text = '';
   } 
   enableCustomDocumentSize( settings, mainWindow )
   return;
}
// --------------------------------------------------------------- //
function validateDocumentBleed( settings, mainWindow )
{
   var bFlag = false;
   if( settings.nonSpaceRegExp.test( mainWindow.documentBleed.text ) ){
      if( !settings.numberRegExp.test( mainWindow.documentBleed.text ) ){
         bFlag = true;
      }
   }
   
   if( bFlag ){
      alert( "The value \"" + mainWindow.documentBleed.text + "\" is invalid. The document bleed must be a number." );
      mainWindow.documentBleed.text = '';
   } 
   enableCustomDocumentSize( settings, mainWindow )
   return;
}
// --------------------------------------------------------------- //
function enableWeekDayColumnWidth( settings, mainWindow )
{
   mainWindow.weekDayColumnWidth.enabled = mainWindow.addWeekDayColumn.value;
   mainWindow.mergeDateAndDayColumns.enabled = mainWindow.addWeekDayColumn.value;
}
// --------------------------------------------------------------- //
function validateDocumentMargins( settings, mainWindow )
{
   var bFlag = false;
   if( settings.nonSpaceRegExp.test( mainWindow.documentMargins.text ) ){
      if( !settings.numberRegExp.test( mainWindow.documentMargins.text ) ){
         bFlag = true;
      }
   }
   
   if( bFlag ){
      alert( "The value \"" + mainWindow.documentMargins.text + "\" is invalid. The document margins must be a number." );
      mainWindow.documentMargins.text = '';
   } 
   enableCustomDocumentSize( settings, mainWindow )
   return;
}
// --------------------------------------------------------------- //
function enableCustomDocumentSize( settings, mainWindow )
{
   if(    settings.nonSpaceRegExp.test( mainWindow.documentHeight.text ) 
       && settings.nonSpaceRegExp.test( mainWindow.documentWidth.text ) 
       && settings.nonSpaceRegExp.test( mainWindow.documentBleed.text ) 
       && settings.nonSpaceRegExp.test( mainWindow.documentMargins.text ) 
   ){
      mainWindow.documentHeightLabel.enabled = true;
      mainWindow.documentWidthLabel.enabled = true;
      mainWindow.documentMarginsLabel.enabled = true;
      mainWindow.documentBleedLabel.enabled = true;
   } else {
      mainWindow.documentHeightLabel.enabled = false;
      mainWindow.documentWidthLabel.enabled = false;
      mainWindow.documentMarginsLabel.enabled = false;
      mainWindow.documentBleedLabel.enabled = false;
   }
   return
}
// --------------------------------------------------------------- //
function makeDocumentValueValidateFunction( settings, mainWindow, idString ){
   if( idString == 'documentHeight' ){
      return function(){ validateDocumentHeight( settings, mainWindow ); };
   } else if( idString == 'documentWidth' ){
      return function(){ validateDocumentWidth( settings, mainWindow ); };
   } else if( idString == 'documentMargins' ){
      return function(){ validateDocumentMargins( settings, mainWindow ); };
   } else if( idString == 'documentBleed' ){
      return function(){ validateDocumentBleed( settings, mainWindow ); };
   }
}
// --------------------------------------------------------------- //
function makeCustomHWValueValidateFunction( settings, mainWindow, key, field ){
   return function(){ validateCustomHWValues( settings, mainWindow, key, field ); };
}
// --------------------------------------------------------------- //
function validateCustomHWValues( settings, mainWindow, key, field )
{
   var bFlag = false;

   if( field == 'CustomHeight' || field == 'CustomWidth'){
      if( settings.nonSpaceRegExp.test( mainWindow[ key + field ].text ) ){
         if( !settings.numberRegExp.test( mainWindow[ key + field ].text ) ){
            bFlag = true;
         } else if( parseFloat( mainWindow[ key + field ].text ) <= 0 ){
            bFlag = true;
         }
      }
      if( bFlag ){
         if( field == 'CustomHeight' ){
            alert( "The value \"" + mainWindow[ key + field ].text + "\" is invalid. The height must be a number greater than 0." );
         } else if( field == 'CustomWidth' ){
            alert( "The value \"" + mainWindow[ key + field ].text + "\" is invalid. The width must be a number greater than 0." );
         }
         mainWindow[ key + field ].text = '';
      } 
   } else if( field == 'CustomTopEdge' || field == 'CustomLeftEdge'){
      if( settings.nonSpaceRegExp.test( mainWindow[ key + field ].text ) ){
         if( !settings.numberRegExp.test( mainWindow[ key + field ].text ) ){
            bFlag = true;
         }
      }
      if( bFlag ){
         if( field == 'CustomTopEdge' ){
            alert( "The value \"" + mainWindow[ key + field ].text + "\" is invalid. The top edge must be a number. (The value for the top edge defines how far from the top edge of the page the top edge of the frame should be placed.)" );
         } else if( field == 'CustomWidth' ){
            alert( "The value \"" + mainWindow[ key + field ].text + "\" is invalid. The left edge must be a number. (The value for the left edge defines how far from the left edge of the page the left edge of the frame should be placed.)" );
         }
         mainWindow[ key + field ].text = '';
      } 

   }
   
   enableCustomHWValueLabels( settings, mainWindow, key );
   return;
}
// --------------------------------------------------------------- //
function enableCustomHWValueLabels( settings, mainWindow, key )
{
   if(    settings.nonSpaceRegExp.test( mainWindow[ key + 'CustomHeight'  ].text ) 
       && settings.nonSpaceRegExp.test( mainWindow[ key + 'CustomWidth'   ].text ) 
       && settings.nonSpaceRegExp.test( mainWindow[ key + 'CustomTopEdge' ].text ) 
       && settings.nonSpaceRegExp.test( mainWindow[ key + 'CustomLeftEdge'].text ) 
   ){
      mainWindow[ key + 'CustomHeightLabel'   ].enabled = true;
      mainWindow[ key + 'CustomWidthLabel'    ].enabled = true;
      mainWindow[ key + 'CustomTopEdgeLabel'  ].enabled = true;
      mainWindow[ key + 'CustomLeftEdgeLabel' ].enabled = true;
   } else {
      mainWindow[ key + 'CustomHeightLabel'   ].enabled = false;
      mainWindow[ key + 'CustomWidthLabel'    ].enabled = false;
      mainWindow[ key + 'CustomTopEdgeLabel'  ].enabled = false;
      mainWindow[ key + 'CustomLeftEdgeLabel' ].enabled = false;
   }

   if( key == "month" ){
      enableMiniCalendarControl( settings, mainWindow );
   }
   if( key == "month" || key == "year" ){
      enableCustomMonthYearFramesToSpacerPage( settings, mainWindow );
   }
   if( key == "picture" ){
      enableCustomPictureFrameToSpacerPage( settings, mainWindow );
   }

   return
}
// --------------------------------------------------------------- //
function makeCustomEdgeValueValidateFunction( settings, mainWindow, key, field ){
   return function(){ validateCustomEdgeValues( settings, mainWindow, key, field ); };
}
// --------------------------------------------------------------- //
function validateCustomEdgeValues( settings, mainWindow, key, field )
{
   var bFlag = false;

   if( field == 'CustomSizeY1' ){
      if( settings.nonSpaceRegExp.test( mainWindow[ key + field ].text ) ){
         if( !settings.numberRegExp.test( mainWindow[ key + field ].text ) ){
            alert( "The value \"" + mainWindow[ key + field ].text + "\" is invalid. The top edge must be a number. (The value for the top edge defines how far from the top edge of the page the top edge of the frame should be placed.)" );
            mainWindow[ key + field ].text = '';
         } else if( settings.nonSpaceRegExp.test( mainWindow[ key + 'CustomSizeY2' ].text ) &&
                parseFloat(mainWindow[ key + 'CustomSizeY1' ].text) >= parseFloat(mainWindow[ key + 'CustomSizeY2' ].text )){
            alert( "The value \"" + mainWindow[ key + field ].text + "\" is invalid. The top edge must less than the bottom edge. (The value for the top edge defines how far from the top edge of the page the top edge of the frame should be placed.  The bottom edge defines how far from the top edge of the page the bottom edge of the frame should be placed.)" );
            mainWindow[ key + field ].text = '';
         }
      }
   } else if( field == 'CustomSizeY2' ){
      if( settings.nonSpaceRegExp.test( mainWindow[ key + field ].text ) ){
         if( !settings.numberRegExp.test( mainWindow[ key + field ].text ) ){
            alert( "The value \"" + mainWindow[ key + field ].text + "\" is invalid. The bottom edge must be a number. (The value for the bottom edge defines how far from the top edge of the page the bottom edge of the frame should be placed.)" );
            mainWindow[ key + field ].text = '';
         } else if( settings.nonSpaceRegExp.test( mainWindow[ key + 'CustomSizeY1' ].text ) &&
                parseFloat(mainWindow[ key + 'CustomSizeY1' ].text) >= parseFloat( mainWindow[ key + 'CustomSizeY2' ].text )){
            alert( "The value \"" + mainWindow[ key + field ].text + "\" is invalid. The bottom edge must be greater than the top edge. (The value for the top edge defines how far from the top edge of the page the top edge of the frame should be placed.  The bottom edge defines how far from the top edge of the page the bottom edge of the frame should be placed.)" );
            mainWindow[ key + field ].text = '';
         }
      }
   } else if( field == 'CustomSizeX1' ){
      if( settings.nonSpaceRegExp.test( mainWindow[ key + field ].text ) ){
         if( !settings.numberRegExp.test( mainWindow[ key + field ].text ) ){
            alert( "The value \"" + mainWindow[ key + field ].text + "\" is invalid. The left edge must be a number. (The value for the left edge defines how far from the left edge of the page the left edge of the frame should be placed.)" );
            mainWindow[ key + field ].text = '';
         } else if( settings.nonSpaceRegExp.test( mainWindow[ key + 'CustomSizeX2' ].text ) &&
                parseFloat(mainWindow[ key + 'CustomSizeX1' ].text) >= parseFloat(mainWindow[ key + 'CustomSizeX2' ].text )){
            alert( "The value \"" + mainWindow[ key + field ].text + "\" is invalid. The left edge must be less than the right edge. (The value for the left edge defines how far from the left edge of the page the left edge of the frame should be placed.  The right edge defines how far from the left edge of the page the right edge of the frame should be placed.)" );
            mainWindow[ key + field ].text = '';
         }
      }
   } else if( field == 'CustomSizeX2' ){
      if( settings.nonSpaceRegExp.test( mainWindow[ key + field ].text ) ){
         if( !settings.numberRegExp.test( mainWindow[ key + field ].text ) ){
            alert( "The value \"" + mainWindow[ key + field ].text + "\" is invalid. The right edge must be a number. (The value for the right edge defines how far from the left edge of the page the right edge of the frame should be placed.)" );
            mainWindow[ key + field ].text = '';
         } else if( settings.nonSpaceRegExp.test( mainWindow[ key + 'CustomSizeX1' ].text ) &&
                parseFloat(mainWindow[ key + 'CustomSizeX1' ].text) >= parseFloat(mainWindow[ key + 'CustomSizeX2' ].text )){
            alert( "The value \"" + mainWindow[ key + field ].text + "\" is invalid. The right edge must be greater than the left edge. (The value for the left edge defines how far from the left edge of the page the left edge of the frame should be placed.  The right edge defines how far from the left edge of the page the right edge of the frame should be placed.)" );
            mainWindow[ key + field ].text = '';
         }
      }
   }
   
   enableCustomEdgeValueLabels( settings, mainWindow, key );
   return;
}
// --------------------------------------------------------------- //
function enableCustomEdgeValueLabels( settings, mainWindow, key )
{
   if(    settings.nonSpaceRegExp.test( mainWindow[ key + 'CustomSizeY1' ].text ) 
       && settings.nonSpaceRegExp.test( mainWindow[ key + 'CustomSizeY2' ].text ) 
       && settings.nonSpaceRegExp.test( mainWindow[ key + 'CustomSizeX1' ].text ) 
       && settings.nonSpaceRegExp.test( mainWindow[ key + 'CustomSizeX2' ].text ) 
   ){
      mainWindow[ key + 'CustomSizeY1Label'   ].enabled = true;
      mainWindow[ key + 'CustomSizeY2Label'   ].enabled = true;
      mainWindow[ key + 'CustomSizeX1Label'   ].enabled = true;
      mainWindow[ key + 'CustomSizeX2Label'   ].enabled = true;
   } else {
      mainWindow[ key + 'CustomSizeY1Label'   ].enabled = false;
      mainWindow[ key + 'CustomSizeY2Label'   ].enabled = false;
      mainWindow[ key + 'CustomSizeX1Label'   ].enabled = false;
      mainWindow[ key + 'CustomSizeX2Label'   ].enabled = false;
   }
   if( key == "month" ){
      enableMiniCalendarControl( settings, mainWindow );
   }
   if( key == "month" || key == "year" ){
      enableCustomMonthYearFramesToSpacerPage( settings, mainWindow );
   }
   if( key == "picture" ){
      enableCustomPictureFrameToSpacerPage( settings, mainWindow );
   }
   return
}
// --------------------------------------------------------------- //
function managePresets( settings, mainWindow )
{
   var newWindow = null;
   var button1;

   newWindow = new Window( "dialog", "Manage Preset Files", undefined, {'resizeable':true} );
   newWindow.onResizing = newWindow.onResize = function(){ newWindow.layout.resize(); };
   with( newWindow ){
      preferredSize = [800,400];
      with( add( "group{ text:'top container', orientation:'row' }") ){
         alignment = ['fill', 'fill'];
         with( add( "group{ orientation:'column' }") ){
            alignment = ['left', 'top'];
            alignChildren = ['left', 'top'];
            newWindow.presetListing = add( "group{ orientation:'column' }");
            buildManagePresetListing( settings, mainWindow, newWindow );
            newWindow.addPresetButton = add( 'button', undefined, '+' );
            newWindow.addPresetButton.alignment = ['fill', 'top' ];
            newWindow.addPresetButton.onClick = function(){ if( addPresetFile( settings, mainWindow ) == 1 ){;
                                                                updatePresets( settings, mainWindow, newWindow );
                                                             }; };
         }
         with( add( "panel{ orientation:'column' }") ){
            alignment = ['fill', 'fill'];
            with( add( "group{ orientation:'row' }") ){
               alignment = ['fill', 'top']
               add( "statictext", undefined, 'Editing: ' );
               newWindow.fileBeingEdited = add( 'edittext', undefined, '', { "readonly":true, } );
               newWindow.fileBeingEdited.alignment = ['fill', 'top'];
               newWindow.fileBeingEdited.enabled = false;
            }
            newWindow.fileContents = add( 'edittext', undefined, '', { "multiline":true, } );
            newWindow.fileContents.alignment = ['fill', 'fill'];
            newWindow.fileContents.onChange = newWindow.fileContents.onChanging = function(){ enableSaveButton( settings, newWindow ); };

            if( !settings.supportsEnterInMultiLine ){
               with( add( "group{ orientation:'row' }") ){
                  alignment = ['center', 'bottom'];
                  add( 'statictext', undefined, multilineSupportText() );
                  insertNewLineButton = add( "button", undefined, "Insert New Line" );
                  insertNewLineButton.onClick = function(){ newWindow.fileContents.textselection = "\n";  };
               }
            }
            with( add( "group{ orientation:'row' }") ){
               alignment = ['center', 'bottom'];
               newWindow.saveButton = add( 'button', undefined, 'Save' );
               newWindow.saveButton.enabled = false;
               newWindow.saveButton.onClick = function(){ savePresetFile( settings, newWindow ); };
            }
         }
      }
   }

   with( newWindow.add( "group{ orientation:'row' }" ) ){
      alignment = ['right', 'bottom'];
      alignChildren = 'right';
      button1 = add( "button", undefined, "Done" );
   }

   button1.onClick = function(){ newWindow.close( 1 ); }

   return newWindow.show();
}
// --------------------------------------------------------------- //
function buildManagePresetListing( settings, mainWindow, newWindow )
{
   var i;

   with( newWindow.presetListing ){
      alignment = ['left', 'top'];
      alignChildren = ['left', 'top'];
  
      for( i = 0; i < settings.presetFiles.length; i++ ){
         with( add( "group{ orientation:'row'}" )){
            newWindow.deleteButton = add( 'button', undefined, '-' );
            newWindow.deleteButton.preferredSize = [20, defaultHeight( settings ) ];
            newWindow.deleteButton.onClick = makeDeletePresetFunction( settings, mainWindow, newWindow, i );
            newWindow.editButton = add( 'button', undefined, 'edit' );
            newWindow.editButton.onClick = makeEditPresetFunction( settings, newWindow, i );
            add( 'statictext', undefined, settings.presetFilesShort[i + settings.presetFilesShort.length - settings.presetFiles.length] );
         }
      }
   }
   return;
}
// --------------------------------------------------------------- //
function addPresetFile( settings, mainWindow )
{
   var newWindow = null;
   var button1;
   var newHolidayFile;
   var lines;
   var result = 0;

   newWindow = new Window( "dialog", "Add Preset File", undefined, {'resizeable':true} );
   newWindow.onResizing = newWindow.onResize = function(){ newWindow.layout.resize(); };
   with( newWindow ){
      preferredSize = [600,400];
      with( add( "group{ text:'top container', orientation:'row' }") ){
         alignment = ['fill', 'fill'];
         with( add( "panel{ orientation:'column' }") ){
            alignment = ['fill', 'fill'];
            with( add( "group{ orientation:'row' }") ){
               alignment = ['fill', 'top']
               add( "statictext", undefined, 'New Preset File Name: ' );
               newWindow.fileBeingEdited = add( 'edittext', undefined, '');
               newWindow.fileBeingEdited.alignment = ['fill', 'top'];
               newWindow.fileBeingEdited.onChanging = newWindow.fileBeingEdited.onChange = function(){ validateNewPresetFileName( settings, mainWindow, newWindow ); };
            }
            newWindow.presetText = add( 'edittext', undefined, '', { "multiline":true, } )
            with( newWindow.presetText ){ 
               alignment = ['fill', 'fill'];
               text = '# Calendar Wizard Preset File\n'
                     +'#\n'
                     +'# Lines starting with \'#\' are comments\n'
                     +'\n';
            }
            if( !settings.supportsEnterInMultiLine ){
               with( add( "group{ orientation:'row' }") ){
                  alignment = ['center', 'bottom'];
                  add( 'statictext', undefined, multilineSupportText() );
                  insertNewLineButton = add( "button", undefined, "Insert New Line" );
                  insertNewLineButton.onClick = function(){ newWindow.presetText.textselection = "\n";  };
               }
            }
            with( add( "group{ orientation:'row' }") ){
               alignment = ['center', 'bottom'];
               newWindow.cancelButton = add( 'button', undefined, 'Cancel' );
               newWindow.cancelButton.onClick = function(){ newWindow.close(0); };
               newWindow.createButton = add( 'button', undefined, 'Create' );
               newWindow.createButton.enabled = false;
               newWindow.createButton.onClick = function(){ newWindow.close(1); };
            }
         }
      }
   }

   //newWindow.defaultElement = newWindow.cancelButton;

   if( newWindow.show() == 1 ){
      newPresetFile = new File( settings.userPresetsDirectory + "/" + newWindow.fileBeingEdited.text + ".txt" );

      if( newPresetFile != null ){
         if( !newPresetFile.exists ){
            bCreateFile = true;
         } else if( confirmFileOverwrite( settings, mainWindow, newPresetFile.displayName ) == 1 ){
            bCreateFile = true;
         }
      }

      if( bCreateFile ){
         writePresetFile( settings, newPresetFile, newWindow.presetText.text );
      }

      result = 1;

   }
   return( result );
}
// --------------------------------------------------------------- //
function writePresetFile( settings, file, contents )
{
   return writeHolidayFile( settings, file, contents );
}
// --------------------------------------------------------------- //
function validateNewPresetFileName( settings, mainWindow, newWindow ){
   validateNewHolidayFileName( settings, mainWindow, newWindow );
   return;
}
// --------------------------------------------------------------- //
function makeDeletePresetFunction( settings, mainWindow, newWindow, i){
   return function(){ deletePreset( settings, mainWindow, newWindow, i ); };
}
// --------------------------------------------------------------- //
function deletePreset( settings, mainWindow, newWindow, i )
{
   var file = settings.presetFiles[i];
   var fileName = file.displayName;
   var bDoIt = false;

   fileName = file.displayName.substring( 0, file.displayName.indexOf( '.txt' ) );
   bDoIt = confirmFileDelete( settings, fileName );
   if( bDoIt == 1 ){
      file.remove();
 
      if( newWindow.fileBeingEditedIndex == i ){
         newWindow.fileBeingEdited.text = "";
         newWindow.fileContents.text    = "";
      }

      updatePresets( settings, mainWindow, newWindow );
   }

   return;
}
// --------------------------------------------------------------- //
function makeEditPresetFunction( settings, newWindow, i){
   return function(){ editPreset( settings, newWindow, i ); };
}
// --------------------------------------------------------------- //
function editPreset( settings, newWindow, i )
{
   var contents = "";
   var file = settings.presetFiles[i];
   if( file.exists && file.open( 'r' ) ){
      while( file.tell() < file.length ){
         contents += file.readln() + "\n";
      }
      file.close();
   }
   
   newWindow.fileBeingEdited.text = file.displayName;
   newWindow.fileContents.text = contents;
   newWindow.fileBeingEditedIndex = i;

   return;
}
// --------------------------------------------------------------- //
function savePresetFile( settings, newWindow )
{
   var file = settings.presetFiles[ newWindow.fileBeingEditedIndex ];
   var contents;

   if( settings.bWindows ){
      file.lineFeed = "Windows";
   } else {
      file.lineFeed = "Unix";
   }

   if( file.open( 'w' )){ 
      contents = newWindow.fileContents.text.split( /\n/ );
      for( i = 0; i < contents.length; i++ ){
         file.writeln( contents[i] );
      }
      file.close();
   }

   newWindow.saveButton.enabled = false;
   return;
}
// --------------------------------------------------------------- //
function updatePresets( settings, mainWindow, newWindow ){
   var children;

   setPresetNameWidget( settings, mainWindow, mainWindow.presetDropdown.selection.text );

   while( newWindow.presetListing.children.length > 0 ){
      newWindow.presetListing.remove( 0 );
   }
   buildManagePresetListing( settings, mainWindow, newWindow );

   newWindow.layout.layout( true );
}
// --------------------------------------------------------------- //
function manageHolidays( settings, mainWindow )
{
   var newWindow = null;
   var button1;

   newWindow = new Window( "dialog", "Manage Holiday Files", undefined, {'resizeable':true} );
   newWindow.onResizing = newWindow.onResize = function(){ newWindow.layout.resize(); };
   with( newWindow ){
      preferredSize = [800,400];
      with( add( "group{ text:'top container', orientation:'row' }") ){
         alignment = ['fill', 'fill'];
         with( add( "group{ orientation:'column' }") ){
            alignment = ['left', 'top'];
            alignChildren = ['left', 'top'];
            newWindow.holidayListing = add( "group{ orientation:'column' }");
            buildManageHolidaysListing( settings, mainWindow, newWindow );
            newWindow.addHolidayButton = add( 'button', undefined, '+' );
            newWindow.addHolidayButton.alignment = ['fill', 'top' ];
            newWindow.addHolidayButton.onClick = function(){ if( addHolidayFile( settings, mainWindow ) == 1 ){;
                                                                 updateHolidays( settings, mainWindow, newWindow );
                                                             }; };
         }
         with( add( "panel{ orientation:'column' }") ){
            alignment = ['fill', 'fill'];
            with( add( "group{ orientation:'row' }") ){
               alignment = ['fill', 'top']
               add( "statictext", undefined, 'Editing: ' );
               newWindow.fileBeingEdited = add( 'edittext', undefined, '', { "readonly":true, } );
               newWindow.fileBeingEdited.alignment = ['fill', 'top'];
               newWindow.fileBeingEdited.enabled = false;
            }
            newWindow.fileContents = add( 'edittext', undefined, '', { "multiline":true, } );
            newWindow.fileContents.alignment = ['fill', 'fill'];
            newWindow.fileContents.onChange = newWindow.fileContents.onChanging = function(){ enableSaveButton( settings, newWindow ); };

            if( !settings.supportsEnterInMultiLine ){
               with( add( "group{ orientation:'row' }") ){
                  alignment = ['center', 'bottom'];
                  add( 'statictext', undefined, multilineSupportText() );
                  insertNewLineButton = add( "button", undefined, "Insert New Line" );
                  insertNewLineButton.onClick = function(){ newWindow.fileContents.textselection = "\n";  };
               }
            }
            with( add( "group{ orientation:'row' }") ){
               alignment = ['center', 'bottom'];
               newWindow.saveButton = add( 'button', undefined, 'Save' );
               newWindow.saveButton.enabled = false;
               newWindow.saveButton.onClick = function(){ saveHoliday( settings, newWindow ); };
            }
         }
      }
   }

   with( newWindow.add( "group{ orientation:'row' }" ) ){
      alignment = ['right', 'bottom'];
      alignChildren = 'right';
      button1 = add( "button", undefined, "Done" );
   }

   button1.onClick = function(){ newWindow.close( 1 ); }

   return newWindow.show();
}
// --------------------------------------------------------------- //
function enableSaveButton( settigns, newWindow ){
   newWindow.saveButton.enabled = true;
}
// --------------------------------------------------------------- //
function disableSaveButton( settigns, newWindow ){
   newWindow.saveButton.enabled = false;
}
// --------------------------------------------------------------- //
function buildMainHolidayListing( settings, mainWindow )
{
   var i;
   var holidayTextWidth = 200;
   var holidayRadioButtonWidth = 20;
   var holidayTextColumn = [holidayTextWidth,defaultHeight( settings )];
   var holidayRadioButtonColumn = [holidayRadioButtonWidth,defaultHeight( settings )];
   var labelMargins = [5,defaultMargin( settings ),defaultMargin( settings ),defaultMargin( settings )];

   mainWindow.holidaySelectorsLabel = new Array();
   mainWindow.holidaySelectorsA     = new Array();
   mainWindow.holidaySelectorsB     = new Array();
   mainWindow.holidaySelectorsC     = new Array();
   mainWindow.holidaySelectorsD     = new Array();

   with( mainWindow.holidayListing ){
      for( i = 0; i < settings.holidayFiles.length; i++ ){
         with( add( "group{ orientation:'row'}" )){
            alignChildren = 'center';
            mainWindow.holidaySelectorsLabel[i]=add( 'statictext', undefined, settings.holidayFilesShort[i] );
            mainWindow.holidaySelectorsLabel[i].preferredSize = holidayTextColumn;
            mainWindow.holidaySelectorsLabel[i].enabled = false;
               
            mainWindow.holidaySelectorsA[i] = add( 'checkbox', undefined );
            mainWindow.holidaySelectorsB[i] = add( 'checkbox', undefined );
            mainWindow.holidaySelectorsC[i] = add( 'checkbox', undefined );
            mainWindow.holidaySelectorsD[i] = add( 'checkbox', undefined );
               
            mainWindow.holidaySelectorsA[i].preferredSize = holidayRadioButtonColumn;
            mainWindow.holidaySelectorsB[i].preferredSize = holidayRadioButtonColumn;
            mainWindow.holidaySelectorsC[i].preferredSize = holidayRadioButtonColumn;
            mainWindow.holidaySelectorsD[i].preferredSize = holidayRadioButtonColumn;
               
            mainWindow.holidaySelectorsA[i].onClick  = makeEnableHolidayLabelFunction( settings, mainWindow, i, 'A' );
            mainWindow.holidaySelectorsB[i].onClick  = makeEnableHolidayLabelFunction( settings, mainWindow, i, 'B' );
            mainWindow.holidaySelectorsC[i].onClick  = makeEnableHolidayLabelFunction( settings, mainWindow, i, 'C' );
            mainWindow.holidaySelectorsD[i].onClick  = makeEnableHolidayLabelFunction( settings, mainWindow, i, 'D' );
         }
      }
   }
   return;
}
// --------------------------------------------------------------- //
function buildManageHolidaysListing( settings, mainWindow, newWindow )
{
   with( newWindow.holidayListing ){
      alignment = ['left', 'top'];
      alignChildren = ['left', 'top'];
      for( i = 0; i < settings.holidayFiles.length; i++ ){
         with( add( "group{ orientation:'row'}" )){
            newWindow.deleteButton = add( 'button', undefined, '-' );
            newWindow.deleteButton.preferredSize = [20, defaultHeight( settings ) ];
            newWindow.deleteButton.onClick = makeDeleteHolidayFunction( settings, mainWindow, newWindow, i );

            newWindow.editButton = add( 'button', undefined, 'edit' );
            newWindow.editButton.onClick = makeEditHolidayFunction( settings, newWindow, i );
            add( 'statictext', undefined, settings.holidayFilesShort[i] );
         }
      }
   }
   return;
}
// --------------------------------------------------------------- //
function updateHolidays( settings, mainWindow, newWindow )
{
   var originalState = new Object();
   var abcd = ['A', 'B', 'C', 'D'];
   var children;

   for( i = 0; i < settings.holidayFilesShort.length; i++ ){
      for( j = 0; j < abcd.length; j++ ){
         if( mainWindow['holidaySelectors'+abcd[j]][i].value ){
            originalState[ settings.holidayFilesShort[i] ] = abcd[j];
         }
      }
   }

   aGetHolidayFiles( settings );

   while( newWindow.holidayListing.children.length > 0 ){
      newWindow.holidayListing.remove(0);
   }
   buildManageHolidaysListing( settings, mainWindow, newWindow );

   while( mainWindow.holidayListing.children.length > 0 ){
      mainWindow.holidayListing.remove(0);
   }
   buildMainHolidayListing( settings, mainWindow );
   
   for( i = 0; i < settings.holidayFilesShort.length; i++ ){
      if( originalState[ settings.holidayFilesShort[i] ] != null ){
         for( j = 0; j < abcd.length; j++ ){
            if( originalState[ settings.holidayFilesShort[i] ] == abcd[j] ){
               mainWindow[ 'holidaySelectors' + abcd[j] ][i].value = true;
            }
         }
      }
   }

   enableHolidayLabels( settings, mainWindow );
   newWindow.layout.layout( true );
   mainWindow.layout.layout( true );
   return;
}
// --------------------------------------------------------------- //
function addHolidayFile( settings, mainWindow )
{
   var newWindow = null;
   var button1;
   var newHolidayFile;
   var lines;
   var result = 0;

   newWindow = new Window( "dialog", "Add Holiday File", undefined, {'resizeable':true} );
   newWindow.onResizing = newWindow.onResize = function(){ newWindow.layout.resize(); };
   with( newWindow ){
      preferredSize = [600,400];
      with( add( "group{ text:'top container', orientation:'row' }") ){
         alignment = ['fill', 'fill'];
         with( add( "panel{ orientation:'column' }") ){
            alignment = ['fill', 'fill'];
            with( add( "group{ orientation:'row' }") ){
               alignment = ['fill', 'top']
               add( "statictext", undefined, 'New Holiday File Name: ' );
               newWindow.fileBeingEdited = add( 'edittext', undefined, '');
               newWindow.fileBeingEdited.alignment = ['fill', 'top'];
               newWindow.fileBeingEdited.onChanging = newWindow.fileBeingEdited.onChange = function(){ validateNewHolidayFileName( settings, mainWindow, newWindow ); };
            }
            newWindow.holidayText = add( 'edittext', undefined, '', { "multiline":true, } )
            with( newWindow.holidayText ){ 
               alignment = ['fill', 'fill'];
               text = '# ---------------------------- #\n'
                     +'#\n'
                     +'# Calendar Wizard Holiday File\n'
                     +'#\n'
                     +'# Syntax:\n'
                     +'# 1. Line starting with \'#\' is a comment line\n'
                     +'# 2. Blank lines are ignored\n'
                     +'# 3. <month>-<day>:<text>\n'
                     +'# 4. <month>-<day>-<year>:<text>\n'
                     +'#\n'
                     +'# Examples:\n'
                     +'# 1-1:New Year\'s Day\n'
                     +'# 1-1-2015:New Year\'s Day\n'
                     +'# ---------------------------- #\n';
            }
            if( !settings.supportsEnterInMultiLine ){
               with( add( "group{ orientation:'row' }") ){
                  alignment = ['center', 'bottom'];
                  add( 'statictext', undefined, multilineSupportText() );
                  insertNewLineButton = add( "button", undefined, "Insert New Line" );
                  insertNewLineButton.onClick = function(){ newWindow.holidayText.textselection = "\n";  };
               }
            }
            with( add( "group{ orientation:'row' }") ){
               alignment = ['center', 'bottom'];
               newWindow.cancelButton = add( 'button', undefined, 'Cancel' );
               newWindow.cancelButton.onClick = function(){ newWindow.close(0); };
               newWindow.createButton = add( 'button', undefined, 'Create' );
               newWindow.createButton.enabled = false;
               newWindow.createButton.onClick = function(){ newWindow.close(1); };
            }

         }
      }
   }

   //newWindow.defaultElement = newWindow.cancelButton;

   if( newWindow.show() == 1 ){
      newHolidayFile = new File( settings.holidaysDirectory + "/" + newWindow.fileBeingEdited.text + ".holidays" );

      if( newHolidayFile != null ){
         if( !newHolidayFile.exists ){
            bCreateFile = true;
         } else if( confirmFileOverwrite( settings, mainWindow, newHolidayFile.displayName ) == 1 ){
            bCreateFile = true;
         }
      }

      if( bCreateFile ){
         writeHolidayFile( settings, newHolidayFile, newWindow.holidayText.text );
      }

      result = 1;

   }
   return( result );
}
// --------------------------------------------------------------- //
function writeHolidayFile( settings, file, contents )
{
   var lines;
   var i;
   if( file != null ){
      if( settings.bWindows ){
         file.lineFeed = "Windows";
      } else {
         file.lineFeed = "Unix";
      }

      lines = contents.split( /\n/ );
      
      if( file.open( 'w' )){
         for( i = 0; i < lines.length; i++ ){
            lines[i] = lines[i].replace( "\r", "" );
            file.writeln( lines[i] );
         }
         file.close();
      }
   }
   return;
}
// --------------------------------------------------------------- //
function validateNewHolidayFileName( settings, mainWindow, newWindow ){
   if( settings.fileNameCharactersRegExp.test( newWindow.fileBeingEdited.text ) ){
      newWindow.createButton.enabled = true;
   } else {
      newWindow.createButton.enabled = false;
      if( settings.nonSpaceRegExp.test( newWindow.fileBeingEdited.text ) ){
         alert( "The filename can only contain the characters A-Z, a-z, 0-9, \" \", \"-\" and \"_\"." );
      }
   }
}
// --------------------------------------------------------------- //
function defaultHeight( settings )
{
   return 20;
}
// --------------------------------------------------------------- //
function defaultMargin( settings )
{
   return 20;
}
// --------------------------------------------------------------- //
function showWidgetHelp( text )
{
   var newWindow = null;
   newWindow = new Window( "dialog", "Widget Help", undefined, {resizeable:true} );
   newWindow.preferredSize = [500, 300];
   newWindow.onResizing = newWindow.onResize = function(){ newWindow.layout.resize(); }; 
   with( newWindow.add( "group{ orientation:'column' }") ){
      alignment = ['fill', 'top'];
      
      with( newWindow.add( "group{ orientation:'row' }") ){
         alignment = ['fill', 'top'];
         alignChildren = ['fill', 'top'];
         add( 'statictext' , undefined, text, { 'multiline':true } );
         //add( 'edittext', undefined, text, { "multiline":true, "readonly":true } );
      };

      with( newWindow.add( "group{ orientation:'row' }" ) ){
         alignment = ['right', 'bottom'];
         add( "button", undefined, "OK" );
      }
   }

   return( newWindow.show() );
}
// --------------------------------------------------------------- //
function validateWeekStartsOnSettings( settings, mainWindow )
{
   if( mainWindow.includeWorkWeek.value && mainWindow.workWeekOptions.selection.index == 1 && !mainWindow.weekStartsOn.selection.index == 1 ){
      var newWindow = null;
      newWindow = new Window( "dialog", "Validate Work Week and Week Starts On Settings", undefined, {resizeable:false} );
   
      with( newWindow.add( "group{ orientation:'row' }") ){
         alignment = 'fill';
         alignChildren = ['fill', 'top'];
         add( 'statictext' , undefined, "The ISO8601 work week definition specifies that the week shall start on Monday."
                                       +"Shall we make that setting?", { 'multiline':true } );
      };

      with( newWindow.add( "group{ orientation:'row' }" ) ){
         alignment = 'right';
         button1 = add( "button", undefined, "Leave as is" );
         button2 = add( "button", undefined, "Start the week on Monday" );
      }

      newWindow.defaultElement = button2;

      button1.onClick = function(){ newWindow.close( 0 ); };
      button2.onClick = function(){ newWindow.close( 1 ); };

      if( newWindow.show() == 1 ){
         mainWindow.weekStartsOn.selection = 1;
      }
   }

   return;
}
// --------------------------------------------------------------- //
function presetText( settings )
{
   var text = "The presets allow the user to save and recall the settings. "
            + "This is accomplished by saving the information to text files in:\n\n"
            + settings.presetsDirectory + "\n\n"
            + "Presets come in two flavors: Full and Partial.  A full preset "
            + "saves the state of every item so it can be recovered exactly. "
            + "The partial only saves values that are different from the default. "
            + "This can be useful for saving various custom layouts and you "
            + "do not want the preset altering settings for the calendar.  As "
            + "an example, there could be a preset to layout the page and frames "
            + "for a 10x10 Calendar printed through Adorama's publishing service.\n\n"
            + "There are two special presets.  There is a default.txt preset that "
            + "is loaded automatically when the script starts.  This can be used to "
            + "set the default units for the script to always be centimeters rather "
            + "than inches.  To restore the factory defaults, start the wizard and "
            + "save the current state as a partial preset.  It will only save the "
            + "values different from the default - which would be nothing - and therefore "
            + "all value will be reset to the default state.  The second special "
            + "preset is the \"Previous Run\".  That preset is the automatic partial "
            + "preset that was saved when the script was run the last time.  This makes "
            + "it very convienient to bring back the last attempt to generate a calendar "
            + "and fix any mistakes.";
   return text;
}
// --------------------------------------------------------------- //
function enableDominantHighlighting( settings, mainWindow )
{
   if( dominantHighlightingState( settings, mainWindow ) ){
      mainWindow.dominantHighlightingLabel.enabled = true;
      mainWindow.dominantHighlighting.enabled = true;
   } else {
      mainWindow.dominantHighlightingLabel.enabled = false;
      mainWindow.dominantHighlighting.enabled = false;
   }
}
// --------------------------------------------------------------- //
function dominantHighlightingState( settings, mainWindow )
{
   var bFlag = false;

   if( mainWindow.highlightHolidays.value ){ 
      if( settings.bGridCalendar && mainWindow.highlightSundays.value ){
         bFlag = true;
      } else if( mainWindow.highlightWeekendOptions.selection.index > 0 ){
         bFlag = true;
      }
   }

   return bFlag;
}
// --------------------------------------------------------------- //
// --------------------------------------------------------------- //
