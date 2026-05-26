#target indesign
#targetengine "findChangeQueryList2"

// INITIALIZE
var scriptFile;
// include library and extentions
try{
	// проверяем присутствие библиотеки
	var libIncluded = false;
	try{ libIncluded = getScriptLibrary ? true : false }catch(err){} // если в библиотеку вносятся изменения - эту строку нужно закомментировать
	// если библиотека  не внедрена - подгружаем
	if( !libIncluded ){
		var libFile = false;
		var scriptFile = function(){ try{ var res = app.activeScript || new File($.fileName); if( !res || res.constructor != File ) throw "error" else return res }catch(err){ return new File(err.fileName) } }();
		if( scriptFile && scriptFile.exists ){
			var folder = scriptFile.parent;
			while( true ){
				if( !folder ){
					libFile = false;
					break;
					}
				libFile = getLastVersion( folder.absoluteURI + '/scriptLib2', 'scriptLib', 'jsx' );
				if( libFile )
					break;
				folder = folder.parent;
				}
			}
		if( libFile )
			eval("//@include \'" + libFile.absoluteURI + "\';")
		else throw new Error('Error: scriptLib.jsx not found');
		}
	//===============
	function getLastVersion( folder, fileName, fileExtension ){ // возвращает файл последней версии
		// folder: Folder or path
		try{
		folder = new Folder(folder);
		if( !folder.exists ) return false;
		fileExtension = fileExtension ? '\.'+ fileExtension : '';
		// последняя версия определяется по дате создания
		var files = folder.getFiles(function(thisFile) { return ( RegExp('^'+fileName+'.*?'+fileExtension+'$', '').test(thisFile.displayName) ) });
		files.sort( function(a,b){return (a.created > b.created)?1:0} );
		return files.length ? files[files.length-1] : false;
		}catch(err){return false}
		}
	}catch(err){ 
		alert( err + '\rline ' + err.line); 
		exit(); 
		}
var script = getScriptLibrary( {
	scriptFile: scriptFile, 
	name: 'findChangeQueryList', 
	version: 2.20, 
	release: 2016, 
	supportApp: [ 'InDesign5'], 
	targetengine: true
	} ); // 'ExtendScript Toolkit3'
if( !script.systemCheck() )
	exit();

script.initXMLOptions();// подгружаем настройки

extension_scriptInfo( script );
extension_customDraw( script );
extension_resizeableWindow( script );

//========= ЛОКАЛИЗАЦИЯ ================================================
var languages = ['en', 'ru'];
var messages = {
	en: {
		searchArea: 'Search area: ',
		document: 'Document',
		selectedStory: 'Selected story',
		selectedText: 'Selected text',
		selectedTable: 'Selected table',
		selectedCells: 'Selected cells',
		selectedRows: 'Selected rows',
		selectedColumns: 'Selected columns',
		
		noOpenDocs: 'No open documents',
		cs3noSuppotViewForSelectedText: 'Indesign CS3 don\'t support mode "With a viewing" for selected text.',
		processFullDoc: 'Document will be processed completely.\r\rContinue?',
		overflows_viewDisabled: 'There is overflows of text!\rMode "With a viewing" is disabled!',
		selectSPfolder: 'Select user Scripts Panel folder',
		processing: 'Processing',
		processStop: 'Processing will be stopped.\rAre you sure?',
		сomplete: 'Complete. Processed:',
		missingFormat: 'Some queries refers to formatting elements not found in this document:',
		missFormat: 'Missing format',
		warning: 'Warning!',
		incorrectLine: 'Incorrect data. Skipped line: ',
		continueQuestion: 'Continue?',
		currentSet: 'Current set',
		missingFiles: 'some files are missing.',
		newSet: 'New set..',
		editor: 'Editor',
		withView: 'Use with a viewing',
		emptySet: 'Set is empty!',
		replaceSet: 'Set already exists!\r Replace it?',
		saveSet: 'Current set is not saved. Save?',
		useModeWithView: 'Use mode "With a viewing" (after reboot)',
		afterReboot: 'after reboot',
		showReport: 'Show report after completion',
		showOnlyPositive: 'only positive results',
		useRelativeLinks: 'Use relative links for scripts',
		preferences: 'Preferences',
		addScript: 'Add script',
		editorAdd: 'Add to set',
		editorUp: 'Move up by set',
		editorDown: 'Move down by set',
		editorRemove: 'Remove from set',
		report: 'Report',
		restoreDocument: 'Do restore state of document before running script?',
		noCheckFonts: 'The list of fonts not available: document contains missing fonts. \rCheck queries will be executed without checking fonts.',
		addQueryQuession: 'ADD QUERY?',
		setsListType: 'Sets list type',
		afterReboot: 'after reboot',
		withMultiselect: 'with multiselect',
		Help: "\
Custom lists of queries\r\
\r\
Lists are formed on the basis of user queries.\r\
Also on the list you can add links to the scripts. These scripts will be executed.\r\
\r\
MAIN DIALOG\r\
If the field 'List' deployed - are processed only selected items list.\r\
\r\
EDITOR SETS\r\
Double click on the line with a yellow icon indicates information about the missing formatting.\r\
\r\
MATERIAL REQUIREMENTS\r\
Material must not contain overflow text, and must not located outside the pages (that is, on a pasteboard).\r\
Queries that contain formatting that is not in the publication, will be processed without this format.\r\
",
		},
	ru: {
		searchArea: 'Зона поиска: ',
		document: 'Документ',
		selectedStory: 'Выдел. материал',
		selectedText: 'Выдел. текст',
		selectedTable: 'Выдел. таблица',
		selectedCells: 'Выдел. ячейки',
		selectedRows: 'Выдел. строки',
		selectedColumns: 'Выдел. столбцы',
		
		noOpenDocs: 'Нет открытых документов',
		cs3noSuppotViewForSelectedText: 'Indesign CS3 не поддерживает режим "С просмотра" для выделенного текста.',
		processFullDoc: 'Будет обработано содержание всего документа.\r\rПродолжить?',
		overflows_viewDisabled: 'Имеется вытесненный текст!\rРежим "С просмотром" отключен.',
		selectSPfolder: 'Укажите пользовательскую папку Script Panel',
		processing: 'Обработка',
		processStop: 'Обработка будет остановлена. Вы уверены?',
		сomplete: 'Конец задания. Обработано:',
		missingFormat: 'Часть запросов ссылается на элементы форматирования, не найденные в этом документе:' ,
		missFormat: 'Отсутствует формат',
		warning: 'Внимание!',
		incorrectLine: 'Некорректные данные. Будет пропущена строка: ',
		continueQuestion: 'Продолжить?',
		currentSet: 'Текущий набор',
		missingFiles: 'часть файлов отсутствует.',
		newSet: 'Новый набор..',
		editor: 'Редактор',
		withView: 'С просмотром',
		emptySet: 'Набор пуст!',
		replaceSet: 'Набор уже существует!\r Перезаписать?',
		saveSet: 'Текущий набор не сохранен. Сохранить?',
		useModeWithView: 'Использовать режим "С просмотром" (требуется перезагрузка)',
		showReport: 'Показывать отчет после окончания',
		showOnlyPositive: 'только положительные результаты',
		useRelativeLinks: 'Использовать относительные пути для подключаемых скриптов',
		preferences: 'Настройки',
		addScript: 'Добавить скрипт',
		editorAdd: 'Добавить в набор',
		editorUp: 'Двигать вверх по набору',
		editorDown: 'Двигать вниз по набору',
		editorRemove: 'Удалить из набора',
		report: 'Отчет',
		restoreDocument: 'Восстановить состояние документа до запуска скрипта?',
		noCheckFonts: 'Список шрифтов недоступен: документ содержит отсутствующие шрифты. \rПроверка запросов будет выполняться без проверки шрифтов.',
		addQueryQuession: 'ДОБАВИТЬ?',
		setsListType: 'Тип списка наборов',
		afterReboot: 'требуется перезагрузка',
		withMultiselect: 'с мультивыбором',
		Help: "Пакетная обработка документа запросами Find/Change.\
\
Наборы формируются на основе имеющихся пользовательских запросов Find/Change.\
Два режима работы: обычный и 'С просмотром'.\
В наборы можно добавлять ссылки на скрипты, которые будут запускаться на выполнение.\
\
РЕЖИМ 'С ПРОСМОТРОМ'\
Включается в настройках, при этом требуется перезапуск скрипта.\
Замены в этом режиме работают пошагово, давая возможность выбора действия для каждого найденого текста: изменить или пропустить.\
Статус 'С просмотром' включается для каждой замены набора отдельно.\
Для этого в Редакторе в поле набора (список слева) выделите запрос и включите галку 'С просмотром'.\
\
ГЛАВНЫЙ ДИАЛОГ\
При запуске обработки окончательный набор на выполнение формируется в зависимости от состояния поля 'List':\
если оно свернуто - обрабатывается весь текущий набор, если развернуто - только выделеные запросы.\
\
РЕДАКТОР НАБОРОВ\
Поле слева - пользовательский набор, справа - списки доступных пользовательских запросов.\
Добавить запрос в набор можно дважды щелкнув на нем в списке,\
или же выделив один или несколько (с прижатой Ctrl) запросов и нажав кнопку '<<'.\
Запросы проверяются на предмет отсутствующего в текущем документе форматирования.\
Такие запросы отмечаются желтой иконкой, двойной клик показывает отсутствующее форматирование.\
(Эта проверка доступна и в Главном диалоге, кнопка 'Check set'.)\
\
ТРЕБОВАНИЯ К МАТЕРИАЛУ\
Обрабатываемый материал не должен содержать вытесненный текст, а также находиться вне страниц (т.е. на монтажном столе).\
Запросы, содержащие форматирование, отсутствующее в обрабатываемой публикации, будут выполняться без учета этого форматирования.\
\
ФАЙЛЫ ПОЛЬЗОВАТЕЛЬСКИХ ЗАПРОСОВ\
Перенос запросов из одной программы InDesign в другую:\
- откройте палитру Scripts (меню Окно/Утилиты/Сценарии);\
- выделите в палитре строку User (Пользователь), вызовите контекстное меню (правой кнопкой мыши) и выберите 'Reveal in Finder' ('Показать в проводнике');\
- в открывшемся каталоге перейдите на два уровня ниже и скопируйте содержимое папки 'Find-Change Queries';\
- в другой програме InDesign таким же способом перейдите в каталог с папкой 'Find-Change Queries' и поместите в нее ранее скопированные папки с xml-файлами.\
(Если папка 'Find-Change Queries' отсутствует - в палитре Find/Change создайте любой пользовательский запрос.)\
",
		},
	}
// GLOBAL VARIABLES
var processStatus = undefined;

var relativeLinks = undefined;
var setsListType = undefined;
var coreFolderLink = undefined;
var sbsDialogLocation = undefined;
var defaultSets = undefined;
var mainDialogHeight = undefined;
var editorHeight = undefined;
var showReport = undefined;
var showReport_trueOnly = undefined;
var lang = undefined;
var enabledChangeWithView = undefined;

var prefs = undefined;

var myStory = undefined;
var searchArea = undefined;

var existsQueriesFiles = undefined;
var checkQueries = undefined;
var workSet = undefined;
var charStyles = undefined;
var paraStyles = undefined;
var objectStyles = undefined;
var docSwatches = undefined;
var docFontsPsnames = undefined;
var startProcess = undefined;
var setsFolderName = undefined;
var userSetsFolder = undefined;
var lastUndoIndex = undefined;
var userSetFiles = undefined;
var userSetNames = undefined;

ini();

function ini(){
	processStatus = false;// глобальная переменная запуска обработки, переопределяется только в mainDialog.start.onClick
	//========= НАСТРОЙКИ ПО УМОЛЧАНИЮ ======================================
	relativeLinks = true;//относительные ссылки 
	setsListType = 'dropdownlist';// dropdownlist | listbox
	coreFolderLink = app.scriptPreferences.scriptsFolder.parent.parent;//корневая папка
	if( !coreFolderLink.exists ){
		alert( 'Error!\rFolder \'' + coreFolderLink.fsName + '\' not found.' );
		return;
		}
	sbsDialogLocation = [$.screens[0].right/2, $.screens[0].bottom/2];//расположение SBS_dialog
	defaultSets = [];//наборы по умолчанию

	mainDialogHeight = 50;//добавление к дефолтовой высоте окна mainDialog
	editorHeight = 0;//добавление к дефолтовой высоте окна Редактора
	showReport = true;
	showReport_trueOnly = true;
	lang = ( $.locale == 'ru_RU' ) ? 'ru' : 'en';
	
	//включение ф-ции "С просмотром", по умолчанию - отключена, 
	enabledChangeWithView = false;
	
	//========= ПОДГРУЖАЕМ НАСТРОЙКИ =======================================
	loadPrefs();
	
	if( !app.documents.length ){
		alert( messages[lang].noOpenDocs );
		return;
		}

	//======== ПРОВЕРЯЕМ ВЫБРАНЫЙ ЯЗЫК ===================================
	lang = messages[lang] ? lang : 'en';

	//======== ПРОВЕРЯЕМ ЧТО У НАС ВЫДЕЛЕНО ================================
	// Определяем область обработки
	myStory;
	searchArea = '';
	if(app.selection[0] == undefined){
		if( !confirm( messages[lang].processFullDoc, true, script.name ) )
			exit();
		myStory = app.activeDocument;
		searchArea = messages[lang].searchArea + messages[lang].document;
		}
	else
		switch(app.selection[0].constructor.name){
			case 'TextFrame':
			case 'InsertionPoint':
			myStory = app.selection[0].parentStory; // Цепочка фреймов
			searchArea = messages[lang].searchArea + messages[lang].selectedStory;
			break;
			case 'Text':
			case 'TextColumn':
			case 'Paragraph':
			case 'Table':
			case 'Cell':
			case 'Row':
			case 'Column':
			if( parseFloat(app.version)<6 && enabledChangeWithView ){ // если это CS3 и выделен текст в режиме сессии
				alert( messages[lang].cs3noSuppotViewForSelectedText );
				enabledChangeWithView = false;
				}
			myStory = app.selection[0];
			switch(app.selection[0].constructor.name){
				case 'Text':
				case 'TextColumn':
				case 'Paragraph':
				searchArea = messages[lang].searchArea + messages[lang].selectedText;
				break;
				case 'Table':
				searchArea = messages[lang].searchArea + messages[lang].selectedTable;
				break;
				case 'Cell':
				searchArea = messages[lang].searchArea + messages[lang].selectedCells;
				break;
				case 'Row':
				searchArea = messages[lang].searchArea + messages[lang].selectedRows;
				break;
				case 'Column':
				searchArea = messages[lang].searchArea + messages[lang].selectedColumns;
				break;
				}
			break;
			default:
			if( !confirm( 'Current selection: ' +app.selection[0].constructor.name+'.\r\r' + messages[lang].processFullDoc, true, script.name ) )
				exit();
			myStory = app.activeDocument;
			searchArea = messages[lang].searchArea + messages[lang].document;
			}

	//Если включено "С просмотром" - проверяем переполнение.
	if( enabledChangeWithView ){
		if( myStory == app.activeDocument ){
			for (i = 0; i < app.activeDocument.stories.length; i++)
				if( app.activeDocument.stories[i].overflows ){
					if( !confirm(messages[lang].overflows_viewDisabled +'\r'+messages[lang].continueQuestion) )
						return; // выходим из функции скрипта
					enabledChangeWithView = false;
					}
			}
		else if( myStory instanceof Story && myStory.overflows ){
			if( !confirm(messages[lang].overflows_viewDisabled +'\r'+messages[lang].continueQuestion) )
				return; // выходим из функции скрипта
			enabledChangeWithView = false;
			}
		}
	//======== ОПРЕДЕЛЯЕМ СЛУЖЕБНЫЕ ========================================
	//ГЛОБАЛЬНЫЕ ОБЪЕКТЫ
	existsQueriesFiles = { text:{}, grep:{}, glyph:{}, object:{} };//именованые массивы для быстрого определения наличия запроса
	checkQueries = { text:{}, grep:{}, glyph:{}, object:{} };//именованые массивы, в которые помещаются все провереные запросы
	workSet = [];//текущий загруженый набор
	workSet.names = []; // массив имен сетов, входящих в состав набора
	workSet.reset = function(){
		this.splice(0);
		this.names = [];
		}
	//переменные для массивов стилей и шрифтов (для проверки запросов)
	charStyles = false;
	paraStyles = false;
	objectStyles = false;
	docSwatches = false;
//	docFontsPsnames = false;
	//=========================================================================
	startProcess = false;
	setsFolderName = 'findChangeQuerySets';
	userSetsFolder = Folder(script.file.path+'/'+setsFolderName);
	lastUndoIndex = app.activeDocument.undoHistory.length;//длинна массива отмен на момент запуска скрипта - для отмены всей работы скрипта при его остановке (в режиме "С просмотром")
	//==========================================================================
	if( !userSetsFolder.exists ) userSetsFolder.create();

	//ПОДГРУЖАЕМ НАСТРОЙКИ
	addScriptImages();

	//СОСТАВЛЯЕМ СПИСОК ПОЛЬЗОВАТЕЛЬСКИХ НАБОРОВ
	userSetFiles = userSetsFolder.getFiles('*.xml');//собираем ссылки
	userSetNames = [];
	for (i = 0; i < userSetFiles.length; i++)
		userSetNames[i] = script.getFileNameOnly( userSetFiles[i] );
	//===========================================================================
	main();
	savePrefs();

	startSet();
	}

//===================== ФУНКЦИИ ============================================
// ==========================================================================
//images
function addScriptImages(){
	var code = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\n\x00\x00\x00\n\b\x06\x00\x00\x00\u008D2\u00CF\u00BD\x00\x00\x00\x04gAMA\x00\x00\u00AF\u00C87\x05\u008A\u00E9\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x01\fIDATx\u00DAb\u00FC\u009F\u00E6\u00C2\x00\x05\u0091@\x1C\x03\u00C4^P\u00FE6 ^\x02\u00C4\u00CBA\x1C\u0096?\u00BF\x7F\u0083\u00E8\u00A6\u00AF\u009F>\u00D5\u00BE}\u00F6\u008C\u00E1\u00FD\u00CB\u0097`U\u0082\u00E2\u00E2^r\x1A\x1A M\u009A@\\\u00C7\u00F2\u00FB\u00E7\u00CF\u00C8\x1F_\u00BF\u00D6\u00BEz\u00FC\u00F8/\x1B\x07\u00C7>\u00E3\u00BB\u00FF\u00DD\u00C0*\u00D3]\u00FF\u00FFaf\u00FE\u00F9\u00FB\u00E3\u00C7Z \u00EF:\u00D3\u00AF\x1F?b>\u00BF\x7F\u00CF\u00C0\u00C1\u00CD\u00BDO\u00F1\u00E8s\u00B8\"\x06AA\u0086\u008B;w\u00B2\u00BF~\u00F2\u0084\x01\u00A4\u0086\u00F1\u00A5\u00A7\u00FA\x7F\u00A0\u0089\f@k\x18\u00A1n\x03+:\u00BBz5\x03\u00D0t\u00C6G\u00F6\u00B2\u00FF\u0081\u008600\u00FD\u00FC\u00F6\u008D\u0081\u0093\u0087\u0087\x01\u009B\"\u0090\x00H\x0E\u00A4\u0086\u00E9\u00E7\u00F7\u00EF\u00DB\u00D0\x15\x01\x01X\u00D1\x1B\x1F\u00AD] \x1A\u00A4\x06\u00E4\u00C6% w\u00BCy\u00F7\u00EE'\u00B2\u00A2w\u00FE\u00BA\u00BB\u0080V:\u0081\u00DC\x0FR\x03\u00F25(\u009C4\u009F^\u00BE\\\u00AB\u00A4\u00AB\x0B\n\u0096\u00FF \u0085\u00A0`zq\u00FF>\x030\u00D8\u009AAa\u00C9xF\u0089\u0081\u00A8\x00\x07\b0\x00\u00E2\x04\u008B\u00888\u00FE\x16\x1A\x00\x00\x00\x00IEND\u00AEB`\u0082";
	script.writeImage(code, 'noExists');
	var code = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\n\x00\x00\x00\n\b\x06\x00\x00\x00\u008D2\u00CF\u00BD\x00\x00\x00\x04gAMA\x00\x00\u00AF\u00C87\x05\u008A\u00E9\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x01\x03IDATx\u00DAL\u008F\u00B1j\u00C2`\x14\u0085ORA\x04S\u00A2\u00E0\u00A2\x0EEk\u00E9\u00AC]\u00ECd\u00C1\u0087\u00B0{\u00C1\u00A5\u00EF\u00F0G\u00E8K8\u0089\x0E\x0E\u009D}\u0088\x0Eu\u00E8Ph\x04\x077\u00A9\u00D8%\u0082\u00C4D\u00D2{\u00FE\u00FE\u00A9^8\u00FC\u00E7\u009E\u00FB\x11N\u00AC\u00E5+\u00CE\u00C7\x13)\u00E3\x07f\u00FF\x1B\x7F\n$\u00C9RK|\"\u00AF\u0096\u00F1i\x0E;\u008A\u0084\u008E\u00BE\u00F19\u00A9{\u0085\u00DB'\u00ED)zf\u00F4d\u00EC\u00C3A\u00C0p\x05yU\u00A9\u00D1\u00C5|\u00D4\u00C6]\u00FB\x19\u00F4\u00CC\u00CC\rv\x18\x02o\u00E3\u009EW\u00BA~\x00\u00F6\u008BS[\u00F1\u00CCx#\u00A3A\u0091\u00AA\u00D6\u00CAr\u00F4\u00CF@\x1F\u00CCx#s\u00F1\u00D8\u0081wuS\u00E9\x14]\u00F9~\u00BC\u0085\u00E3^\u00E2\u00BE\u0099E\u00D9\u00FD\u00D1\u00FB\u00F1ha\u00B3\x0E,vT\u00F5Z\u00A4{R\u008B\u008F/\u00F4_\u0092\u00FF\u009D72\u0099\u00F4\u00AF\u00D3i\u00B5\u0080\u00F7\u00E1\\\u00B2S\x0B2\u00998\u00C6`6\u0083\u00CA\u00E7\x01\u00C7\x01r9Sq\x0F\x04\x01\u00B0\u00DBI\x03a~\x05\x18\x00\u009A\u00FD\u0090LX\u0095@\u00F1\x00\x00\x00\x00IEND\u00AEB`\u0082";
	script.writeImage(code, 'missingFormat');
	var code = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\b\x02\x00\x00\x01\u00E7pcH\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x00\fIDATx\u00DAc\u00FA\u00FF\u00FF?\x00\x06\x06\x03\x00\u00F7\u0098\u00DEN\x00\x00\x00\x00IEND\u00AEB`\u0082";
	script.writeImage(code, 'zero');
	var code = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\x04gAMA\x00\x00\u00AF\u00C87\x05\u008A\u00E9\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x021IDATx\u00DA\u00A4S\u00B9\u008A\"Q\x14\u00BD\u00E5\u00D6\"*\u00EE\x18\u00B84\u0088\n\"4\u0082\u008A\u00A0\u00A0\r\u0086\u00E6\u00FE\u0080\u0098\x1A\x1A\u00AA\u00FF`b\u00D8\u00A1\u0099\u0081\u00A1\u00E0\f\n\u00AD(Hc\u00E6\u009A(\u0088\u00BB\u0091\u00B8O\u009D\u0087\u00CA\f3\x1D\u00CD\u0083[u\u00EA\u00DEs^\u00DDz\u00E7\x16W(\x14\u00E8\u009B\u0095\u00E5#s\u00C7\u00B9\u00FB\u00F3_Kp\u00BD^)\x1A\u008D\x12\x7F\u00CF\u00F2Q\x05\u00BE?g\u00BE\u00C1Up\u00EF\u0098\u00B8|>\u00FF|\u009B\u00CF\u00E7\u00A3\u00E1pH\x1A\u008D\u0086\u00D4j5i\u00B5Z\u00BA\u00DDn\u00B4^\u00AFi\u00B3\u00D9\u00B0\u00BB\u00CDf\u00A3V\u00AB\u00F5\u00ECJt\u00B9\\\u00F0\x10\u00F6z\u00BD\u00A4\u00D3\u00E9H\u00A9T2\u00E2b\u00B1`\x18\x0B\x18\x1BZ\u00ADV\u0092H$\u00E4\u00F1x\u00A8\u00DDn\u0087\u00D9'`\u0083X,\u00F6\u00DE\u00EF\u00F7i\u00BF\u00DF\u0093@ `d\u00BB\u00DDNb\u00B1\u0098\x050r\u00A8\u0081\x03.4\u00D0\u008A\u00CE\u00E73{\u008BB\u00A1\u00A0\u00F9|Nz\u00BD\u009E^^^\u00A8\u00D1hP\u00BD^g\u00B5P(D\u0081@\u0080\x0E\u0087\x03\u00EB\x06\\,h\x05\u00FC%[,\x16oH\u00A2(\x14\n\u00D1\x1E\u00E2G:\u009D\u00E6\x10\u00C0\u00C8\u00A1\u00F6\u00D8\x00\x1Ah\u00B1A&\x1E\u008F\u0093\u00D1h$\u00B3\u00D9L\"\u0091\u0088\u00BA\u00DD.\u00A5R\u00A9\u00F7\u0087U\u00C0\u00C8\u00A1\x06\x0E\u00B8\u00D0@+:\u009DN4\u0099L\u00FE\u00F0\u00F6\u00D1\u00E2\u00BFr\u00E0\u00C3\x11\x04\u00B00\x18\fr\u0083\u00C1 \u0082\x13\u009FN\u00A7d0\x18H.\u0097\u00D3\u00E7\u00E7g\u00C4\u00E1p|@T.\u0097\u00ABn\u00B7\u00FBU*\u0095\u00B2\u00EEpx\u00B5Z\rs\u0090cg\u0090H$\u00B8\u00E5r\u00C9\u0084\u00BB\u00DD\u008E\u00D9\u00E5r\u00B9\"\u0095J\u00E5\u0086\x00F\x0E5p\u00C0\u0085\x06\u00DA\u00A7\x0B8\x1C\u0093\u00C9\u00C4\x1C\u0098\u00CDf\u00CC6L\x1B\x16\u00DAEN&\u0093\u00B1\r`\u00E3\u00C3\x05\u00A1\u00DF\u00EF\u00A7f\u00B3Yu:\u009D\u00AF\x18\u00A6\u00D1h\u00C4\u00C8\u00BD^\u008F\u008E\u00C7#\u00B3\u00F6\u00EB\u00EB\u008BY\u0088\u00D6\u00F9O\u00A1\u00EDvK\u00A5R)\u00C2O\u00E9\u00C7c\x12\x7F\u00F26E\u0080\u00C7\u00E31{\u00BBJ\u00A5\u00A2\u00DFgd\u00B5Z\x11\x7FV\u00AC\u00FDN\u00A7\u00C34\u00CFI\f\u0087\u00C3Y\u00FE\u009E\u0083\u00DFooo\u009C\u00C5b\u0081\u00F7\u00ECgA\x00#\u0087\x1A8\u00E0\u00DE5\u00C4%\u0093\u00C9\u00FF\u00FA\u009D\x7F\t0\x00I\\i\u00A5H\x00\u00EA^\x00\x00\x00\x00IEND\u00AEB`\u0082";
	script.writeImage(code, 'settings');
	};
//============================= СОХРАНЕНИЕ НАСТРОЕК ========================
function loadPrefs(){
	var userXMLOptions = script.getUserXMLOptions();
	lang = userXMLOptions.lang.toString() ? userXMLOptions.lang.toString() : lang; // String
	relativeLinks = (userXMLOptions.relativeLinks.toString() == 'true'); // Boolean
	setsListType = userXMLOptions.setsListType.toString() ? userXMLOptions.setsListType.toString() : setsListType; // String
	enabledChangeWithView = (userXMLOptions.enabledChangeWithView.toString() == 'true'); // Boolean
	mainDialogHeight = userXMLOptions.mainDialogHeight.toString() && userXMLOptions.xpath("mainDialogHeight[number(string())>0]").length() ? +userXMLOptions.mainDialogHeight.toString() : mainDialogHeight; // Number
	editorHeight = userXMLOptions.editorHeight.toString() && userXMLOptions.xpath("editorHeight[number(string())>0]").length() ? +userXMLOptions.editorHeight.toString() : editorHeight; // Number
	showReport = (userXMLOptions.showReport.toString() == 'true'); // Boolean
	showReport_trueOnly = (userXMLOptions.showReport_trueOnly.toString() == 'true'); // Boolean
	if( userXMLOptions.sbsDialogLocation.toString() ){ // Array of Numbers
		var values = userXMLOptions.sbsDialogLocation.toString().split( ' ' );
		if( values.length == 2 && script.isNumber(values[0]) && script.isNumber(values[1]) )
			sbsDialogLocation = [+values[0],+values[1]];
		}
	defaultSets = userXMLOptions.defaultSet.toString() ? userXMLOptions.defaultSet.toString().split('|') : defaultSets; // String
	}
function savePrefs(){
	var xmlOpts = <>
			<lang>{lang}</lang>
			<relativeLinks>{relativeLinks}</relativeLinks>
			<setsListType>{setsListType}</setsListType>
			<enabledChangeWithView>{enabledChangeWithView ? true : false}</enabledChangeWithView>
			<mainDialogHeight>{mainDialogHeight}</mainDialogHeight>
			<editorHeight>{editorHeight}</editorHeight>
			<showReport>{showReport}</showReport>
			<showReport_trueOnly>{showReport_trueOnly}</showReport_trueOnly>
			<sbsDialogLocation>{sbsDialogLocation[0] +' '+ sbsDialogLocation[1]}</sbsDialogLocation>
			<defaultSet>{workSet.names.length ? workSet.names.join('|') : defaultSets.join('|')}</defaultSet>
		</>;
	var userXMLOptions = script.getUserXMLOptions();
	userXMLOptions.replace( userXMLOptions.child, xmlOpts ); // заменяем всё содержимое
	script.saveXMLOptions();
	}
//============================= РАБОТА С ФАЙЛАМИ ЗАПРОСОВ ===================
function getQueryFolder( type ) {
	var thisFolder = false;
	switch( type ){
		case 'grep':
		thisFolder = '/Find-Change Queries/GREP/';
		break;
		case 'text':
		thisFolder = '/Find-Change Queries/Text/';
		break;
		case 'glyph':
		thisFolder = '/Find-Change Queries/Glyph/';
		break;
		case 'object':
		thisFolder = '/Find-Change Queries/Object/';
		break;
		default:
		alert ( 'function getQueryFolder - error:\r type = ' + type );
		return false;
		}
	return Folder( coreFolderLink + thisFolder );
	}
function getQueryFile( query ) {
	if( existsQueriesFiles[query.type] != undefined && existsQueriesFiles[query.type][query.name] != undefined )
		return existsQueriesFiles[query.type][query.name];
	var file = false;
	if( query.type == 'script' ){
		//если это относительная ссылка - восстанавливаем ее относительно текущего скрипта
		file = getFsObject( query.name );
//		file = ( /^\.\//.test(query.name) ) ? File( script.file.parent.fsName + query.name.replace(/^./, '') ) : File( query.name );
		return ( file.exists ) ? file : false;
		}
	var thisFolder = getQueryFolder( query.type );
	if( thisFolder ){
		file = File( thisFolder.fsName + '/' + query.name + '.xml' );
		if( !file.exists ) file = false;
		}
	existsQueriesFiles[query.type][query.name] = file;
	return file;
	}
//===================== РАБОТА С ФАЙЛАМИ И ЗАПУСК СКРИПТОВ ==================
function getAdaptFsName( fsObject, relative ){//return link, в том числе пригодный для записи в файл
	if(relative)
		return script.adaptFsNameForSave( fsObject.fsName.replace(script.file.parent.fsName, '.') );
	else
		return script.adaptFsNameForSave( fsObject.fsName );
	}
function getFsObject( adaptFsName ){//return File
	if( adaptFsName.charAt(0) == '.' )
		adaptFsName = script.file.parent.fsName + adaptFsName.substr(1);
	if( File.fs == 'Macintosh' && !(/^[.\/]/.test(adaptFsName)) )
		adaptFsName = '/' + adaptFsName;
	return File( adaptFsName );
	}
function launchFsObject( path ){//return true / false
	try{
	var fsObject = getFsObject( path );
	if(!fsObject.exists){
		alert( 'Error:\r' + fsObject.fsName + '\ris not found!' );
		return;
		}
	var type = 0;
	switch(path.substr( path.lastIndexOf('.')+1 ).toLowerCase()){
		case 'js':
		case 'jsx':
		case 'jsxbin':
		type = 1246973031;//ScriptLanguage.javascript
		break;
		case 'vbs':
		type = 1447185511;//ScriptLanguage.VISUAL_BASIC
		break;
		case 'applescript':
		type = 1095978087;//ScriptLanguage.APPLESCRIPT_LANGUAGE
		}
	if(!type)
		return false;
	app.doScript( fsObject, type );
	return true;
	}catch(err){script.alertError( 'File: ' + path + '\r\r' + err); return false;};
	}


function addIcon( opts ){ // opts = { iconButton, iconPath, text, helpTip }
	var icon = script.getInDesignIcon( opts.iconPath ); // example: script.getInDesignIcon( 'Text/(Find and Change Panel Resources)/idrc_PNGA/113.idrc' );
	if( icon )
		opts.iconButton.image = icon;
	else
		script.getCustomDraw(opts.iconButton, {text:opts.text});
	opts.iconButton.helpTip = opts.helpTip;
	}
//============================ ОСНОВНОЙ ДИАЛОГ =============================
function main(){
	var setsListHeight = setsListType == 'dropdownlist' ? 0 : 150;
	
	var mainDialog = new Window("dialog", script.name + ' ('+searchArea+')', [0,0,480,setsListHeight+55], {resizeable:true});
	with(mainDialog){
		mainDialog.group = add("group", [5,5,480,setsListHeight+52], undefined);
		with(mainDialog.group){
			mainDialog.sets = add(setsListType, [0,0,395,22+setsListHeight], userSetNames, {multiselect: true}); // setsListType = 'dropdownlist' | 'listbox';
			if( setsListType == 'listbox' )
				mainDialog.sets.helpTip = 'Ctrl+Click - multiselect/deselect';
			mainDialog.exit = add("iconbutton", [0,setsListHeight+25,22,setsListHeight+47], undefined, {style: "toolbutton"});
			mainDialog.info = add("iconbutton", [292,setsListHeight+25,314,setsListHeight+47], undefined, {style: "toolbutton"} );
			mainDialog.prefs = add("iconbutton", [319,setsListHeight+25,341,setsListHeight+47], undefined, {style: "toolbutton"} );
			mainDialog.editor = add("iconbutton", [346,setsListHeight+25,368,setsListHeight+47], undefined, {style: "toolbutton"} );
			mainDialog.list = add("iconbutton", [373,setsListHeight+25,395,setsListHeight+47], undefined, {style: "toolbutton"} );
			mainDialog.start = add("button", [400,0,470,47], "Start");
			}
		// FIX: In InDesign CS6 on Windows 10 you have to place the listbox in a group or a panel
		//alert(mainDialogHeight);
		mainDialog.listBoxGroup = add( 'group', [5,setsListHeight+60,470,setsListHeight+60+mainDialogHeight]);
		mainDialog.listBoxGroup.alignChildren = ['fill','fill'];
		with(mainDialog.listBoxGroup) {
			mainDialog.listBox = add("listbox",  [0,0,470,mainDialogHeight-27], undefined, {multiselect: false});
			mainDialog.buts = add("group", [5,mainDialogHeight-22,465,mainDialogHeight], undefined);
			with(mainDialog.buts) {
				mainDialog.buts.checkSet = add("button", [390,0,460,22], "Check set");
				}
			}
		}
	
	mainDialog.buts.checkSet.enabled = false;
	mainDialog.start.active = true;
//	script.getCustomDraw( mainDialog.start, { text: 'Start', style: 'Bold', textRGB: [255,0,0] } );
	// Exit
	addIcon( { iconButton: mainDialog.exit, iconPath: "UI/(Track Changes UI Resources)/idrc_PNGA/308.idrc", text: 'X', helpTip: 'Exit' } );
	mainDialog.exit.onClick = function(){
		workSet.reset();
		this.window.close();
		}
	// info
	addIcon( { iconButton: mainDialog.info, iconPath: "Text/(Find and Change Panel Resources)/idrc_PNGR/102.idrc", text: 'i', helpTip: 'Info' } );
	mainDialog.info.onClick = function(){
		script.getWinInfo( '', messages[lang].Help );
		}
	// prefs
	mainDialog.prefs.image = script.images['settings'];
	mainDialog.prefs.helpTip = 'Settings';
	mainDialog.prefs.onClick = function(){
		getWinPrefs();
		}
	// editor
	addIcon( { iconButton: mainDialog.editor, iconPath: "Workgroup/(Workgroup UI Resources)/idrc_PNGA/4516.idrc", text: 'E', helpTip: 'Editor' } ); // карандаш
	mainDialog.editor.onClick = function(){
		this.window.close();
		editSets();
		}
	// list
	addIcon( { iconButton: mainDialog.list, iconPath: "Text/(RunIn Styles Panel Resources)/idrc_PNGA/200.idrc", text: 'V', helpTip: 'List' } );
	mainDialog.list.onClick = function(){
		try{
		if( this.helpTip == 'List' ){ // ПОКАЗЫВАЕМ
			addIcon( { iconButton: mainDialog.list, iconPath: "Text/(RunIn Styles Panel Resources)/idrc_PNGA/100.idrc", text: '^', helpTip: 'Hide list' } );
			script.resizeWindow( this.window, 1, mainDialogHeight+10 );
			if( mainDialog.sets.selection ){//выводим список
				if( setsListType == 'dropdownlist' ){
					var _set = getSet( workSet.names[0], {showReport: true} ); // setNameOrFiles - имя набора или массив файлов, opts = {showReport: bool}. Return set or false
					if( _set ){
						loadSetToListBox( _set, mainDialog.listBox, {selectExists: true, namesOnly: false, notClearList: false, checkSet: false, showCheckReport: false} ); // rerturn массив ссылок на элементы списка
						}
					}
				else{
					for( var i = 0; i < workSet.names.length; i++ ){
						var _set = getSet( workSet.names[i], {showReport: true} ); // setNameOrFiles - имя набора или массив файлов, opts = {showReport: bool}. Return set or false
						if( !_set )
							continue;
						var _listItems = loadSetToListBox( _set, mainDialog.listBox, {selectExists: true, namesOnly: false, notClearList: true, checkSet: false, showCheckReport: false} ); // rerturn массив ссылок на элементы списка
						mainDialog.sets._sets[workSet.names[i]] = _listItems;
						}
					}
				mainDialog.buts.checkSet.enabled = mainDialog.listBox.items.length ? true : false;
				}
			}
		else{ // ПРЯЧЕМ
			addIcon( { iconButton: mainDialog.list, iconPath: "Text/(RunIn Styles Panel Resources)/idrc_PNGA/200.idrc", text: 'V', helpTip: 'List' } );
			script.resizeWindow( this.window, 1, -mainDialogHeight-10 );
			// очищаем весь список
			mainDialog.listBox.removeAll();
			mainDialog.sets._sets = {};
			}
		}catch(err){ script.alertError( err ); }
		}
	//====================== RESIZE
	mainDialog.onResize = function() {
		try{
		if( mainDialog.list.helpTip == 'List' )
			this.bounds = [this.location[0],this.location[1], this.location[0]+480, this.location[1]+setsListHeight+55];
		else if( this.size[1] < setsListHeight+55+(30+22) )
			this.bounds = [this.location[0],this.location[1], this.location[0]+480, this.location[1]+setsListHeight+55+(30+22)];
		else{
			this.bounds = [this.location[0],this.location[1], this.location[0]+480, this.location[1]+this.size[1]];
			mainDialogHeight = this.size[1] - (setsListHeight+55) - 10;
			mainDialog.listBoxGroup.size.height = mainDialogHeight;
			mainDialog.listBox.size.height = mainDialogHeight-27;
			mainDialog.buts.location.y = mainDialogHeight-22;
			}
		}catch(err){ script.alertError( err ); }
		}
	
	if( setsListType == 'dropdownlist' ){
		mainDialog.sets.onChange = function(){
			if( workSet.names.length && workSet.names[0] == this.selection.text )
				return;
			workSet.names = [this.selection.text];
			
			// далее - только при открытом списке
			if( mainDialog.list.helpTip == 'List' )
				return;
			mainDialog.listBox.removeAll();
			var _set = getSet( this.selection.text, {showReport: true} ); // setNameOrFiles - имя набора или массив файлов, opts = {showReport: bool}. Return set or false
			if( !_set )
				return;
			loadSetToListBox( _set, mainDialog.listBox, {selectExists: true, namesOnly: false, notClearList: false, checkSet: false, showCheckReport: false} ); // rerturn массив ссылок на элементы списка
			mainDialog.buts.checkSet.enabled = true;
			}
		}
	else{ // listbox multiselect
		mainDialog.sets.onChange = function(){
			if( !this.selection ){
				this._sets = {};
				mainDialog.listBox.removeAll();
				return;
				}
			var indexInNames;
			for( var i = 0; i < this.items.length; i++ ){
				indexInNames = -1;
				for( var z = 0; z < workSet.names.length; z++ )
					if( workSet.names[z] == this.items[i].text ){
						indexInNames = z;
						break;
						}
				// ADD
				if( this.items[i].selected && indexInNames == -1 ){
					
					var _set = getSet( this.items[i].text, {showReport: true} ); // setNameOrFiles - имя набора или массив файлов, opts = {showReport: bool}. Return set or false
					if( !_set )
						continue;
					workSet.names.push( this.items[i].text );
					
					// далее - только при открытом списке
					if( mainDialog.list.helpTip == 'List' )
						continue;
					if( !this._sets[this.items[i].text] ){
						var _listItems = loadSetToListBox( _set, mainDialog.listBox, {selectExists: true, namesOnly: false, notClearList: true, checkSet: false, showCheckReport: false} ); // rerturn массив ссылок на элементы списка
						this._sets[this.items[i].text] = _listItems;
						}
					continue;
					}
				// DELETE
				if( !this.items[i].selected && indexInNames > -1 ){
					workSet.names.splice( indexInNames, 1 );
					
					// далее - только при открытом списке
					if( mainDialog.list.helpTip == 'List' )
						continue;
					if( this._sets[this.items[i].text] ){
						var _listItems = this._sets[this.items[i].text];
						for( var z = 0; z < _listItems.length; z++ )
							mainDialog.listBox.remove( _listItems[z] );
						this._sets[this.items[i].text] = undefined;
						}
					}
		//		alert( this.items[i].selected );
				}
			
			mainDialog.buts.checkSet.enabled = mainDialog.listBox.items.length ? true : false;
			}
		}
	
	if( setsListType == 'listbox' ){
		mainDialog.sets.onDoubleClick = function(){
			mainDialog.sets.onChange();
			mainDialog.start.onClick();
			}
		}
	
	mainDialog.start.onClick = function(){
		try{
		if( !workSet.names.length ){
			alert( 'Select set' );
			return;
			}
		var setNames = workSet.names.join('|').split('|');
		workSet.reset();
		if( mainDialog.list.helpTip == 'List'  ){ // если список закрыт
			for( var i = 0; i < setNames.length; i++ ){
				var _set = getSet( setNames[i], {showReport: true} ); // setNameOrFiles - имя набора или массив файлов, opts = {showReport: bool}. Return set or false
				if( !_set )
					continue;
				workSet = workSet.concat( _set );
				}
			workSet.names = setNames;
			}
		else{ //если открыт список - формируем по нему
			for( var i = 0; i < mainDialog.listBox.items.length; i++ )
				if( mainDialog.listBox.items[i].checked && mainDialog.listBox.items[i].setItem.existsFile )
					workSet.push( mainDialog.listBox.items[i].setItem );
			}
		processStatus = true;
		this.window.close();
		}catch(err){ script.alertError( err ); }
		}
	// Разворачивающийся список запросов
	mainDialog.listBox.onChange = function(){
		try{
		var item = this.selection;
		if( !item.setItem.existsFile )
			item.checked = false;
		else
			item.checked = !item.checked;
//		item.checked = !item.setItem.existsFile ? false : !item.checked;
		item.selected = false;
		}catch(err){alert(err+err.line)}
		}
	mainDialog.buts.checkSet.onClick = function(){
		if( !mainDialog.listBox.items.length ){
			this.enabled = false;
			return;
			}
		for( var i = 0; i < workSet.names.length; i++ ){
			var _set = [];
			_set.names = workSet.names;
			
			var listItems = mainDialog.listBox.items;
			
			for( var i = 0; i < listItems.length; i++ )
				_set.push( listItems[i].setItem );
			
			var res = checkSet( _set, {showCheckReport: true} ); //ф-ция проверки загруженого набора, изменяет свойство missingFormat на результаты проверки. Return report string || ''
			if( res ){
				for(var i = 0; i < _set.length; i++)
					if( _set[i].existsFile && _set[i].missingFormat )
						listItems[i].image = script.images['missingFormat'];
				}
			}
		this.enabled = false;
		}
	
	//ПОДГРУЗКА НАБОРА
	mainDialog.sets._sets = {};
	try{
	var setNames = workSet.names.length ? workSet.names : defaultSets;
	var selectIndexes = [];
	for(var i = 0; i < setNames.length; i++)
		if( mainDialog.sets.find( setNames[i] ) != null )
			selectIndexes.push( mainDialog.sets.find( setNames[i] ).index );
	if( selectIndexes.length )
		mainDialog.sets.selection = setsListType == 'dropdownlist' ? selectIndexes[0] : selectIndexes;
	}catch(err){
		script.alertError( err );
		workSet.reset();
		}
	
	mainDialog.center();
	mainDialog.show();
	}

//============================ НАСТРОЙКИ ====================================
function getWinPrefs( fromEditor ){
	var winPrefs = new Window('dialog', messages[lang].preferences);
	winPrefs.preferredSize = [200,20];
	winPrefs.alignChildren = 'left';
	winPrefs.margins = 5;
	winPrefs.spacing = 5;
	with(winPrefs){
		winPrefs.setsListType = add('panel', undefined, messages[lang].setsListType + (fromEditor ? '' : ' ('+messages[lang].afterReboot+')') );
		winPrefs.setsListType.orientation = 'row';
		winPrefs.setsListType.alignment = ['fill','top'];
		winPrefs.setsListType.margins = [5,15,5,5];
		with(winPrefs.setsListType){
			winPrefs.setsListType.ddList = add('radiobutton', undefined, 'Drop-down list', { name: 'dropdownlist' });
			winPrefs.setsListType.lBox = add('radiobutton', undefined, 'List box ('+messages[lang].withMultiselect+')', { name: 'listbox' });
			}
		winPrefs.view = add('checkbox', undefined, messages[lang].useModeWithView);
		winPrefs.showReport = add('checkbox', undefined, messages[lang].showReport);
		winPrefs.showReport_trueOnly = add('checkbox', undefined, messages[lang].showOnlyPositive);
		winPrefs.showReport_trueOnly.alignment = 'center';
		winPrefs.relative = add('checkbox', undefined, messages[lang].useRelativeLinks);
		winPrefs.lang = add('group');
		winPrefs.lang.orientation = 'row';
		with(winPrefs.lang){
			winPrefs.lang.sText = add('statictext', undefined, 'Language');
			winPrefs.lang.langs = add('dropdownlist', undefined, undefined, { items: languages });
			winPrefs.lang.langs.preferredSize = [100,22];
			}
		winPrefs.buts = add('group');
		winPrefs.buts.alignment = 'right';
		winPrefs.buts.orientation = 'row';
		winPrefs.buts.margins = [0,10,0,0];
		winPrefs.buts.spacing = 5;
		with(winPrefs.buts){
			winPrefs.buts.cancel = add('button', undefined, 'Cancel');
			winPrefs.buts.ok = add('button', undefined, 'OK');
			}
		};
	
	// INI
	if( setsListType == 'dropdownlist' )
		winPrefs.setsListType.ddList.value = true;
	else
		winPrefs.setsListType.lBox.value = true;
	winPrefs.relative.value = relativeLinks;
	winPrefs.view.value = enabledChangeWithView;
	winPrefs.showReport.value = showReport;
	winPrefs.showReport_trueOnly.value = showReport_trueOnly;
	winPrefs.showReport_trueOnly.enabled = showReport;
	winPrefs.lang.langs.selection = winPrefs.lang.langs.find( lang ).index;
	
	winPrefs.setsListType.ddList.onClick = winPrefs.setsListType.lBox.onClick = function(){
		setsListType = this.properties.name;
		}
	winPrefs.showReport.onClick = function(){
		winPrefs.showReport_trueOnly.enabled = this.value;
		}
	winPrefs.buts.cancel.onClick = function(){
		this.window.close();
		}
	winPrefs.buts.ok.onClick = function(){
		if( fromEditor ){
			if( winPrefs.relative.value != relativeLinks){
				relativeLinks = winPrefs.relative.value;
				var listItems = editor.set.listBox.items;
				for( var i = 0; i < listItems.length; i++ )
					if( listItems[i].setItem.type == 'script' ){
						listItems[i].setItem.name = getAdaptFsName( getFsObject( listItems[i].setItem.name ), relativeLinks );
						listItems[i].text = getListItemName( listItems[i].setItem );
						}
				}
			}
		else
			relativeLinks = winPrefs.relative.value;
		
		enabledChangeWithView = winPrefs.view.value;
		showReport = winPrefs.showReport.value;
		showReport_trueOnly = winPrefs.showReport_trueOnly.value;
		lang = winPrefs.lang.langs.selection.text;
		
		this.window.close();
		}
	
	winPrefs.center();
	winPrefs.show();
	}
//============================ РЕДАКТОР НАБОРОВ =============================
function editSets(){
	var getMainDialog = true;
	var queriesFullSets = [[],[],[],[]];
	var thisSetNames = [messages[lang].newSet, '-'].concat( userSetNames );
	try{
	var editor = new Window("dialog", messages[lang].editor, [0,0,635,360+editorHeight], {resizeable:true});
	with(editor){
		editor.set = add("group", [5,5,300,330+editorHeight], undefined);
		with(editor.set) {
			editor.set.sets = add("dropdownlist", [0,0,193,22], undefined, {items: thisSetNames});
			editor.set.save = add("iconbutton", [198,0,220,22], undefined, {style: "toolbutton"});
			editor.set.saveAs = add("button", [225,0,295,22], "Save As");
			editor.set.listBox = add("listbox", [0,25,295,325+editorHeight], undefined);
			}
		editor.edit = add("group", [305,30,330,330], undefined);
		with(editor.edit) {
			editor.edit.Add = add("iconbutton", [0,0,25,25], undefined, {style: "toolbutton"});
			editor.edit.top = add("iconbutton", [0,65,25,90], undefined, {name:-1, style: "toolbutton"});
			editor.edit.bottom = add("iconbutton", [0,95,25,120], undefined, {name:1, style: "toolbutton"});
			editor.edit.del = add("iconbutton", [0,185,25,210], undefined, {style: "toolbutton"});
			editor.edit.addScript = add("iconbutton", [0,275,25,300], undefined, {style: "toolbutton"});
			}
		editor.queries = add("group", [335,5,630,330+editorHeight], undefined);
		with(editor.queries) {
			editor.queries.buts = [];
			editor.queries.buts[0] = add("button", [0,0,70,22], "Text", {name:0});
			editor.queries.buts[1] = add("button", [75,0,145,22], "GREP", {name:1});
			editor.queries.buts[2] = add("button", [150,0,220,22], "Glyph", {name:2});
			editor.queries.buts[3] = add("button", [225,0,295,22], "Object", {name:3});
			editor.queries.listBox = [];
			editor.queries.listBox[0] = add("listbox", [0,25,295,325+editorHeight], undefined, {name:0, multiselect: true});
			editor.queries.listBox[1] = add("listbox", [0,25,295,325+editorHeight], undefined, {name:1, multiselect: true});
			editor.queries.listBox[2] = add("listbox", [0,25,295,325+editorHeight], undefined, {name:2, multiselect: true});
			editor.queries.listBox[3] = add("listbox", [0,25,295,325+editorHeight], undefined, {name:3, multiselect: true});
			}
		editor.buts = add("group", [5,335+editorHeight,630,357+editorHeight], undefined);
		with(editor.buts) {
			editor.buts.view = add("checkbox", [0,0,140,20], messages[lang].withView);
			editor.buts.prefs = add("iconbutton", [576,0,598,22], undefined, {style: "toolbutton"} );
			editor.buts.Close = add("iconbutton", [603,0,625,22], undefined, {style: "toolbutton"} );
			}
		}
	// <<
	addIcon( { iconButton: editor.edit.Add, iconPath: "Layout/(Links UI Resources)/idrc_PNGA/220.idrc", text: '<<', helpTip: messages[lang].editorAdd } ); 
	// ^
	addIcon( { iconButton: editor.edit.top, iconPath: "Text/(RunIn Styles Panel Resources)/idrc_PNGA/100.idrc", text: '^', helpTip: messages[lang].editorUp } );
	// V
	addIcon( { iconButton: editor.edit.bottom, iconPath: "Text/(RunIn Styles Panel Resources)/idrc_PNGA/200.idrc", text: 'V', helpTip: messages[lang].editorDown } );
	// Remove
	addIcon( { iconButton: editor.edit.del, iconPath: "Text/(Find and Change Panel Resources)/idrc_PNGA/118.idrc", text: 'x', helpTip: messages[lang].editorRemove } );
	// addScript
	addIcon( { iconButton: editor.edit.addScript, iconPath: "Script/(Scripts Panel Resources)/idrc_PNGA/2501.idrc", text: 'js', helpTip: messages[lang].addScript } );
	// Save
	addIcon( { iconButton: editor.set.save, iconPath: "Text/(Find and Change Panel Resources)/idrc_PNGA/117.idrc", text: 'S', helpTip: 'Save' } );
	editor.set.save.enabled = false;
	editor.buts.view.visible = enabledChangeWithView;
	editor.buts.view.enabled = false;
	
	// prefs
	editor.buts.prefs.image = script.images['settings'];
	editor.buts.prefs.helpTip = 'Settings';
	editor.buts.prefs.onClick = function(){
		getWinPrefs( true );
		}
	// editor
	addIcon( { iconButton: editor.buts.Close, iconPath: "UI/(Track Changes UI Resources)/idrc_PNGA/308.idrc", text: 'X', helpTip: 'Close' } );
	editor.buts.Close.onClick = function(){
		this.window.close();
		}
	editor.onClose = function(){
		//сохранение текущего набора
//		if( editor.set.save.enabled && workSet.length ){//только если набор не пустой
		if( editor.set.save.enabled ){
			switch( script.confirm( messages[lang].saveSet, {title: messages[lang].warning, multiline: false, withUndefined: true} ) ){
				case undefined://прервать выход из Редактора
					getMainDialog = true;
					return false; //прервать выход 
				case false://не сохранять
					break;
				case true:
					saveCurrentSet();
				}
			}
		}
	
	//====================== RESIZE
	//moveCoefs: [horizontal, vertical], resizeCoefs: [horizontal, vertical], minLock: true/false, directions: [horizontal, vertical], 
	/*
		args: { 
			obj: uiObject or Array
			moveCoefs: [horizontal, vertical], 
			resizeCoefs: [horizontal, vertical], 
			isSeparator: false/0/1 ( 0 - on width, 1 - on height, added function obj.properties.moveSeparator(resize[value,value]) ),
			keyRestore: String,  - only for separator
			window: Window object (Optional) - если не указан obj
			windowMinSize: bool/[bool,bool]/[num,num],
			windowResizeDirections: [horizontal, vertical], (Optional, default: [true,true]),
			windowKeyRestore: String
			}
		*/
	
	script.addDynamicObject({ 
		obj: [editor.set, editor.set.listBox, editor.queries, editor.queries.listBox[0], editor.queries.listBox[1], editor.queries.listBox[2], editor.queries.listBox[3]],
		moveCoefs: false, //  [horizontal, vertical]
		resizeCoefs: [0,1], //  [horizontal, vertical]
//		isSeparator: false/0/1 ( 0 - on width, 1 - on height, added function obj.properties.moveSeparator(resize[value,value]) ),
//		keyRestore: String,  - only for separator
//		window: Window object (Optional) - если не указан obj
		windowMinSize: [false, true], //bool/[bool,bool]/[num,num],
		windowResizeDirections: [false, true], // [horizontal, vertical], (Optional, default: [true,true]),
//		windowKeyRestore: String
		});
	script.addDynamicObject({ 
		obj: editor.buts,
		moveCoefs: [0,1], //  [horizontal, vertical]
		});

	//=============== Ф-ЦИЯ СОХРАНЕНИЯ НАБОРА ==========================
	var saveCurrentSet = function( New ){//New - создается новый набор на основе текущего
		var listItems = editor.set.listBox.items;
		
		if( !listItems.length && !script.confirm(messages[lang].emptySet +' '+ messages[lang].continueQuestion , {title: '', multiline: false, withUndefined: false}) )
			return false;
		
		var _set = [];
		for( var i = 0; i < listItems.length; i++ )
			_set.push( listItems[i].setItem );
		
		// Определяем не по текущему выделеному элементу списка, а по переменной _currentName
		var setName = editor.set.sets._currentName ? editor.set.sets._currentName : '';
		
		//если это новый набор либо сохранение анонимного набора - получаем имя набора
		if( New || !setName ){
			//запрашиваем новое имя для нового набора
			while( true ){
				setName = prompt( 'Save as:', '' );
				if( setName == null )
					return false;
				if( setName ){
					setName = script.adaptForFileName( setName );
					for( var i = 0; i < userSetNames.length; i++ )
						if( setName == userSetNames[i] ){
							if( !confirm( '\''+setName +'\' - '+ messages[lang].replaceSet ) ){
								setName = '';
								break;
								}
							else{//перезаписываем существующий
								if( saveSet( _set, setName ) ){
									editor.set.save.enabled = false;
									selectSetName( setName );
									return true;
									}
								else return false;
								}
							}
					if( setName ) break;//если получено корректное имя - прерываем цикл
					}
				}
			
			if( saveSet( _set, setName ) ){
				editor.set.sets.add( 'item', setName );
				editor.set.save.enabled = false;
				selectSetName( setName );
//				alert( 'Set \''+setName+'\' saved!' );
				return true;
				}
			return false;
			}
		//просто сохраняем текущий
		if( saveSet( _set, setName ) ){
			editor.set.save.enabled = false;
			return true;
			}
		return false;
		}
	//=============== Ф-ЦИИ ДИАЛОГА =======================================
	function selectSetName( setName ){ // return bool
		if( setName == null ){
			editor.set.sets.selection = null;
			editor.set.sets._currentName = null;
			return true;
			}
		else if( !setName )
			return false;
		
		var index = editor.set.sets.find( setName );
		if( index == null )
			return false;
		
		editor.set.sets.selection = index;
		// ЗАПОМИНАЕМ
		editor.set.sets._currentName = setName;
		return true;
		}
	editor.set.sets.onChange = function(){
		//=============== НОВЫЙ НАБОР ==========================
		if( this.selection.index == 0 ){//создание нового набоа
			//сохранение текущего набора
			if( editor.set.save.enabled ){
				switch( script.confirm(messages[lang].saveSet, {title: messages[lang].warning, multiline: false, withUndefined: true}) ){
					case undefined: //прервать
						//показываем текущий набор
						selectSetName( this._currentName );
						return;
					case false://не сохранять
						break;
					case true:
						if( !saveCurrentSet() ){ //если не сохранился - прервать
							//показываем текущий набор
							selectSetName( this._currentName );
							return;
							}
					}
				}
			//обнуляем
			editor.set.listBox.removeAll();
			this._currentName = '';
			this.selection = null;
			editor.set.save.enabled = false;
			editor.buts.view.value = editor.buts.view.enabled = false;
			return;//прерываем
			}
		//=============== ПОДГРУЗКА НАБОРА ==========================
		if( this.selection && this.selection.text == this._currentName )//если выбраный набор уже подгружен - прерываем
			return;
		//сохранение текущего набора
		if( editor.set.save.enabled ){
			switch( script.confirm( messages[lang].saveSet, {title: messages[lang].warning, multiline: false, withUndefined: true}) ){
				case undefined://прервать
					//показываем текущий набор
					selectSetName( this._currentName );
					return;
				case false://не сохранять
					break;
				case true:
					if( !saveCurrentSet() ){ //если не сохранился - прервать
						//показываем текущий набор
						selectSetName( this._currentName );
						return;
						}
				}
			}
		
		// очищаем диалог
		editor.set.listBox.removeAll();
		
		//загружаем новый набор
		var _set = getSet( this.selection.text, {showReport: true} ); // setNameOrFiles - имя набора или массив файлов, opts = {showReport: bool}. Return set or false
		if( !_set ){//если не найден
			selectSetName(this._currentName );
//			editor.buts.view.value = editor.buts.view.enabled = false;
			return;
			}
		
		editor.set.save.enabled = false;
		// запоминаем
		this._currentName = this.selection.text;
		loadSetToListBox( _set, editor.set.listBox, {selectExists: false, namesOnly: false, notClearList: false, checkSet: true, showCheckReport: false} ); // rerturn массив ссылок на элементы списка
		}
	editor.set.save.onClick = function(){
		saveCurrentSet();
		}
	editor.set.saveAs.onClick = function(){
		saveCurrentSet( true );
		}
	editor.set.listBox.onChange = function(){
		if( !enabledChangeWithView )
			return;
		if( this.selection.setItem.type == 'script' || !this.selection.setItem.existsFile )
			editor.buts.view.enabled = editor.buts.view.value = false;
		else{
			editor.buts.view.enabled = true;
			editor.buts.view.value = this.selection.setItem.view=='1' ? true : false;
			}
		}
	editor.set.listBox.onDoubleClick = function(){
		if( this.selection.setItem.missingFormat )
			alert( this.selection.setItem.missingFormat, messages[lang].missFormat );
		}
	
	function pushQueryToSet(){
		try{
		for( var i = 0; i < 4; i++ )
			if( editor.queries.listBox[i].visible )
				break;
		if( !editor.queries.listBox[i].selection )
			return;
		
//		var listItem;
		var _set = [];
		for( var j = 0; j < editor.queries.listBox[i].selection.length; j++ ){
			_set.push( editor.queries.listBox[i].selection[j].setItem );
			/*
			listItem = editor.set.listBox.add( 'item' );
			listItem.setItem = editor.queries.listBox[i].selection[j].setItem;
//			listItem.setItem = eval( queriesFullSets[i][editor.queries.listBox[i].selection[j].index].toSource().replace(/[\r\n]/g, '\\n') );
			listItem.text = getListItemName( listItem.setItem );
			if( listItem.setItem.missingFormat )
				listItem.image = script.images['missingFormat'];
			*/
			}
		loadSetToListBox( _set, editor.set.listBox, {selectExists: false, namesOnly: false, notClearList: true, checkSet: false, showCheckReport: false} ); // rerturn массив ссылок на элементы списка
		
		editor.set.listBox.selection = editor.set.listBox.items.length-1;
//		editor.queries.listBox[i].selection = null;
		editor.set.save.enabled = true;
		}catch(err){ script.alertError( err ); }
		}
	editor.edit.Add.onClick = pushQueryToSet;
	editor.edit.top.onClick = editor.edit.bottom.onClick = function(){
		try{
		var listBox = editor.set.listBox;
		if(listBox.selection == null || !listBox.items.length )
			return;
		if(this.properties.name == -1 && listBox.selection.index == 0)
			return;
		if(this.properties.name == 1 && listBox.selection.index == listBox.items.length-1)
			return;
		
		var item = listBox.selection;
		var nextItem = listBox.items[listBox.selection.index + this.properties.name];
		var text =item.text;
		var setItem =item.setItem;
		item.text = nextItem.text;
		item.setItem = nextItem.setItem;
		nextItem.text = text;
		nextItem.setItem = setItem;
		
		item.image = item.setItem.missingFormat ? script.images['missingFormat'] : ( !item.setItem.existsFile ? script.images['noExists'] : script.images['zero'] );
		nextItem.image = nextItem.setItem.missingFormat ? script.images['missingFormat'] : ( !nextItem.setItem.existsFile ? script.images['noExists'] : script.images['zero'] );
		
		listBox.selection = nextItem;
		editor.set.save.enabled = true;
		}catch(err){script.alertError(err);}
		}
	editor.edit.top.onDoubleClick = editor.edit.bottom.onDoubleClick = function(){
		try{
		var listBox = editor.set.listBox;
		if(listBox.selection == null || !listBox.items.length )
			return;
		if(this.properties.name == -1 && listBox.selection.index == 0)
			return;
		if(this.properties.name == 1 && listBox.selection.index == listBox.items.length-1)
			return;
		
		var item = listBox.selection;
		var nextItem = this.properties.name == 1 ? listBox.items[listBox.items.length-1] : listBox.items[0];
		var text =item.text;
		var setItem =item.setItem;
		item.text = nextItem.text;
		item.setItem = nextItem.setItem;
		nextItem.text = text;
		nextItem.setItem = setItem;
		
		item.image = item.setItem.missingFormat ? script.images['missingFormat'] : ( !item.setItem.existsFile ? script.images['noExists'] : script.images['zero'] );
		nextItem.image = nextItem.setItem.missingFormat ? script.images['missingFormat'] : ( !nextItem.setItem.existsFile ? script.images['noExists'] : script.images['zero'] );
		
		listBox.selection = nextItem;
		editor.set.save.enabled = true;
		}catch(err){script.alertError(err);}
		}
	editor.edit.del.onClick = function(){
		try{
		var listBox = editor.set.listBox;
		if(listBox.selection == null || !listBox.items.length )
			return;
		
		var index = +listBox.selection.index;
		listBox.remove( listBox.children[index] );
		
		if(index)
			listBox.selection = index - 1;
		else if( listBox.children.length )
			listBox.selection = index;
		
		editor.set.save.enabled = true;
		}catch(err){script.alertError(err);}
		}
	editor.edit.addScript.onClick = function(){
		var myMask = "Files:*.js;*.jsx;*.jsxbin" + ( File.fs == 'Windows'  ? ";*.vbs" : ";*.applescript" );
		var file = File.openDialog( messages[lang].addScript, myMask );
		if( !file )
			return;
		
		var listItem = editor.set.listBox.add( 'item' );
		listItem.setItem = {type:'script', view:0, name:getAdaptFsName( file, relativeLinks ) , existsFile:true, missingFormat:''};
		listItem.text = getListItemName( listItem.setItem );
		
		editor.set.listBox.selection = listItem;
		editor.set.save.enabled = true;
		}
	editor.queries.buts[0].onClick = editor.queries.buts[1].onClick = editor.queries.buts[2].onClick = editor.queries.buts[3].onClick = function(){
		if( queriesFullSets[this.properties.name] && !queriesFullSets[this.properties.name].length ){
			var folder =  getQueryFolder(this.text.toLowerCase());
			if( folder.exists ){
				var _set = getSet( folder.getFiles('*.xml'), {showReport: false} ); // setNameOrFiles - имя набора или массив файлов, opts = {showReport: bool}. Return set or false
				if( _set ){
					queriesFullSets[this.properties.name] = _set;
					var listBox = editor.queries.listBox[this.properties.name];
					loadSetToListBox( _set, listBox, {selectExists: false, namesOnly: true, notClearList: false, checkSet: true, showCheckReport: false} ); // rerturn массив ссылок на элементы списка
					}
				}
			}
		for( var i = 0; i < editor.queries.buts.length; i++ ){
			editor.queries.buts[i].enabled = true;
			editor.queries.listBox[i].visible = false;
			editor.queries.listBox[i].selection = null;
			}
		editor.queries.buts[this.properties.name].enabled = false;
		editor.queries.listBox[this.properties.name].visible = true;
		}
	editor.queries.listBox[0].onDoubleClick = editor.queries.listBox[1].onDoubleClick = editor.queries.listBox[2].onDoubleClick = editor.queries.listBox[3].onDoubleClick = function(){
		try{
		if( this.selection[0].setItem.missingFormat )
			if( !confirm( (File.fs=='Macintosh'?messages[lang].missFormat+':\r':'') + this.selection[0].setItem.missingFormat + '\r\r '+messages[lang].addQueryQuession, true, messages[lang].missFormat ) )
				return;
		pushQueryToSet();
		}catch(err){script.alertError(err);}
		}
	
	editor.buts.view.onClick = function(){
		if( !editor.set.listBox.selection || editor.set.listBox.selection.setItem.type == 'script' ){
			this.value = false;
			return;
			}
		editor.set.listBox.selection.setItem.view = this.value ? '1' : '0';
		editor.set.listBox.selection.text =  getListItemName( editor.set.listBox.selection.setItem );
		editor.set.save.enabled = true;
		}
	
	if( workSet.names.length ){ //показываем текущий набор
		var _set = getSet( workSet.names[0], {showReport: true} ); // setNameOrFiles - имя набора или массив файлов, opts = {showReport: bool}. Return set or false
		if( _set ){
			selectSetName(  workSet.names[0] );
			loadSetToListBox( _set, editor.set.listBox, {selectExists: false, namesOnly: false, notClearList: false, checkSet: true, showCheckReport: false} ); // rerturn массив ссылок на элементы списка
			}
		}
	
	editor.queries.buts[1].onClick();
	editor.center();
	editor.show();
	
	if( getMainDialog )
		return main();
	else
		workSet.reset();//выход из скрипта, для этого обнуляем текущий загруженый набор
	
	}catch(err){ script.alertError( err ); main();}
	}

//============================ ОБРАБОТКА ====================================
function startSet(){
	try{
	if( !processStatus || !workSet || !workSet.length )
		return;
	workSet.count = -1;
	workSet.step = 0;
	workSet.findArray = [];
	workSet.resultOf = [];
	
	var closeStatus = false;
	
	//фиктивный объект
	var SBS_dialog = {
		close: function(){},
		pBar: { setValue: function(){} },
		}
	//======================= SBS_dialog ========================================
	var getSBS_dialog = function(){
		var SBS_dialog = new Window("window", messages[lang].processing, [0,0,380,33]);
		with(SBS_dialog){
//			SBS_dialog.pBar = add("progressbar", [5,10,375,25], undefined);
			SBS_dialog.change = add("button", [5,33,75,55], "Change");
			SBS_dialog.changeAll = add("button", [80,33,150,55], "All");
			SBS_dialog.next = add("button", [155,33,225,55], ">");
			SBS_dialog.nextQuery = add("button", [230,33,300,55], ">>");
			SBS_dialog.exit = add("button", [305,33,375,55], "Exit");
			SBS_dialog.Name = add("statictext", [5,60,290,75], "");
			SBS_dialog.step = add("statictext", [305,60,375,75], "");
			SBS_dialog.Name.graphics.font = SBS_dialog.step.graphics.font = ScriptUI.newFont(SBS_dialog.Name.graphics.font.name, SBS_dialog.Name.graphics.font.style, 9);
			}
		SBS_dialog.pBar = script.getProgressBar( SBS_dialog, workSet.length, [370,15], [5,10] );//возвращает progressbar с ф-цией setValue( [num] )
		//данные для сворачивания/разворачивания
		SBS_dialog.minHeight = 33;
		SBS_dialog.maxHeight = 75;
		
		SBS_dialog.exit.onClick = function () {
			closeStatus = true;
			this.window.close();
			exit();
			}
		SBS_dialog.change.onClick = function (){
			try{
			switch( workSet[workSet.count].type ){
				case 'text':
				workSet.findArray[workSet.step].changeText();
				break;
				case 'grep':
				workSet.findArray[workSet.step].changeGrep();
				break;
				case 'glyph':
				workSet.findArray[workSet.step].changeGlyph();
				break;
				case 'object':
				workSet.findArray[workSet.step].changeObject();
				}
			workSet.step++;
			if( workSet.step >= workSet.findArray.length )
				return processSet();
			SBS_dialog.step.text = workSet.step+' из '+workSet.findArray.length;
			workSet.findArray[workSet.step].select();
			showPageOfObject( app.selection[0] );
			}catch(err){script.alertError(err)}
			}		
		SBS_dialog.changeAll.onClick = function () {
			switch( workSet[workSet.count].type){
				case 'text':
				myStory.changeText();
				break;
				case 'grep':
				myStory.changeGrep();
				break;
				case 'glyph':
				myStory.changeGlyph();
				break;
				case 'object':
				myStory.changeObject();
				}
			processSet();
			}
		SBS_dialog.next.onClick = function () {
			workSet.step++;
			if( workSet.step >= workSet.findArray.length )
				return processSet();
			SBS_dialog.step.text = workSet.step+' of '+workSet.findArray.length;
			workSet.findArray[workSet.step].select();
			showPageOfObject( app.selection[0] );
			}
		SBS_dialog.nextQuery.onClick = function(){
			processSet();
			}
		SBS_dialog.onClose = function(){
			if( !closeStatus && !confirm( messages[lang].processStop ) )
				return false;
			//Уничтожение функций всех кнопок, иначе они будут срабатывать даже после закрытия скрипта
			this.change.onClick = function(){}
			this.changeAll.onClick = function(){}
			this.next.onClick = function(){}
			this.nextQuery.onClick = function(){}
			this.exit.onClick = function(){}
			if( !closeStatus && lastUndoIndex < app.activeDocument.undoHistory.length && confirm(messages[lang].restoreDocument) )
				for(var i = app.activeDocument.undoHistory.length; i > lastUndoIndex; i--)
					app.activeDocument.undo();
			exit();
			}
		SBS_dialog.onMove = function(){
			sbsDialogLocation = this.location;
			}
		SBS_dialog.location = sbsDialogLocation;
		
		return SBS_dialog;
		}
	//======================= ФУНКЦИИ ========================================
	var processSet = function(){
		try{
		workSet.count += 1;
		workSet.findArray = [];
		workSet.step = 0;
		if( workSet.count >=  workSet.length ){
			// обнуляем диалоги
			app.findGrepPreferences = app.changeGrepPreferences = null;
			app.findTextPreferences = app.changeTextPreferences = null;
			
			closeStatus = true;
			SBS_dialog.close();
			if( myStory instanceof Document ){}
			else app.selection = myStory instanceof Story ? myStory.textContainers[0] : myStory;
			reportShow();
			exit();
			}
		SBS_dialog.pBar.setValue();
		var query = workSet[workSet.count];
		if( !query.existsFile )
			return processSet();
		if( query.type == 'script' ){
			try{
				workSet.resultOf[workSet.count] =  launchFsObject( query.name );
			}catch(err){
				alert( query.name + ':\r\r' + err );
				workSet.resultOf[workSet.count] = false;
				}
			return processSet();
			}
		else{
			switch( query.type ){
				case 'text':
				app.loadFindChangeQuery( query.name, 1182038131 );
				workSet.findArray = myStory.findText( parseFloat(app.version)==5 ); // реверс массива результатов поиска - только для CS3
				break;
				case 'grep':
				app.loadFindChangeQuery( query.name, 1181184627 );
				workSet.findArray = myStory.findGrep( parseFloat(app.version)==5 ); // реверс массива результатов поиска - только для CS3
				break;
				case 'glyph':
				app.loadFindChangeQuery( query.name, 1181183091 );
				workSet.findArray = myStory.findGlyph( parseFloat(app.version)==5 ); // реверс массива результатов поиска - только для CS3
				break;
				case 'object':
				if( myStory instanceof Document || myStory instanceof Story ){
					app.loadFindChangeQuery( query.name, 1181704819 );
					workSet.findArray = myStory.findObject();
					}
				else
					workSet.findArray = [];
				}
			}
		workSet.resultOf[workSet.count] = workSet.findArray.length;//сохраняем инфу о рез-тах поиска
		if( !workSet.findArray.length )//если ничего не найдено - запускаем следующее задание
			return processSet();
		//Обрабатываем
		if( !enabledChangeWithView || query.view=='0' ) {//без просмотра, определяется по нескольким признакам
			if( enabledChangeWithView )//только при режиме "С просмотром"
				if( SBS_dialog.size[1] != SBS_dialog.minHeight )
					script.resizeWindow( SBS_dialog, 1, SBS_dialog.minHeight - SBS_dialog.maxHeight );//уменьшаем
			switch( query.type ){
				case 'text':
				myStory.changeText();
				break;
				case 'grep':
				myStory.changeGrep();
				break;
				case 'glyph':
				myStory.changeGlyph();
				break;
				case 'object':
				myStory.changeObject();
				}
			return processSet();
			}
		else{//с просмотром
			if( SBS_dialog.size[1] == SBS_dialog.minHeight )
				script.resizeWindow( SBS_dialog, 1, SBS_dialog.maxHeight - SBS_dialog.minHeight );//увеличиваем
			workSet.findArray[workSet.step].select();
			showPageOfObject( app.selection[0] );
			SBS_dialog.step.text = workSet.step+1+' из '+workSet.findArray.length;
			SBS_dialog.Name.text =query.type+': '+query.name;
			if( !SBS_dialog.visible ){
				app.activeDocument.layoutWindows[0].zoom( 2053534832 );//ZoomOptions.FIT_PAGE
				SBS_dialog.show();
				}
			}
		}catch(err){script.alertError(err)}
		}
	var showPageOfObject = function( OBJECT ){
		if( !OBJECT )
			return;
		try{
		if( OBJECT.hasOwnProperty("parentPage") ){
			if( OBJECT.parentPage )
				return app.activeDocument.layoutWindows[0].activePage = OBJECT.parentPage;
			else return;
			}
		switch(  OBJECT.parent.constructor.name ){
			case 'Page':
				app.activeDocument.layoutWindows[0].activePage = OBJECT.parent;
			break;
			case 'Spread':
			case 'MasterSpread':
				app.activeDocument.layoutWindows[0].activeSpread = OBJECT.parent;
			break;
			default:
				if( OBJECT.hasOwnProperty("parentTextFrames") ){
					if( !OBJECT.parentTextFrames.length ) // если текст вытеснен
						arguments.callee( OBJECT.parentStory.textContainers[OBJECT.parentStory.textContainers.length-1] );
					else
						arguments.callee( OBJECT.parentTextFrames[0] );
					return;
					}
				arguments.callee( OBJECT.parent );
			}
		}catch(err){/* alert( err + '\r' + err.line ) */}
		}
	var reportShow = function(){
		if( !showReport )
			return;
		var textReport = '';
		for(var i = 0; i < workSet.length; i++){
			if( !workSet[i].existsFile || (showReport_trueOnly && !workSet.resultOf[i]) )
				continue;
			textReport += workSet[i].type + '\t' + workSet[i].name + '\r' + workSet.resultOf[i] + '\r';
			}
		script.getReportWindow( textReport, messages[lang].report, messages[lang].сomplete );
		}


	//======================= MAIN ============================================
	// создаем диалог только если это режим 'С просмотром', 
	if( enabledChangeWithView ){ 
		var SBS_dialog = getSBS_dialog();
		SBS_dialog.show();
		}
	processSet();
	}catch(err){script.alertError(err)}
	}


//============================ СОХРАНЕНИЕ ЗАПРОСА ==========================
function saveSet( set, setName ){
	if( !set.length )
		return false;
	var xmlSet = <set type="array"></set>;
	
	for( var i = 0; i < set.length; i++ )
		xmlSet.appendChild( <item type={set[i].type} view={set[i].view} name={set[i].name}></item> );
	var file = File(userSetsFolder.fsName+'/'+setName+'.xml');
	script.write_xml_file( file, xmlSet );
	/*
	if( !script.fileWrite( file, str, {encode:true} ) ){
		alert( 'Set \''+setName+'\' is not saved!', 'Error', true );
		return false;
		}
	*/
	//добавляем в массивы
	for (i = 0; i < userSetNames.length; i++)
		if( setName == userSetNames[i] )
			return true;
	userSetNames.push( setName );
	userSetFiles.push( file );
	return true;
	}

//============================ ЗАГРУЗКА НАБОРА ===============================
function getSet( setNameOrFiles, opts ) { // setNameOrFiles - имя набора или массив файлов, opts = {showReport: bool}. Return set or false
	// opts = {showReport: bool}
	//ф-ция возвращает набор в виде массива объектов setItem вида {type:'grep', view:0, name:'', existsFile:true, missingFormat:''}. missingFormat не определяется;
	try{
	opts = opts || {};
	var target = [];
	target.names = [];
	if( target.constructor.name != 'Array' ){
		alert( 'Function getSet - error:\r target.constructor.name = ' + target.constructor.name );
		return false;
		}
	if( setNameOrFiles.constructor.name == 'Array' ){//если набор передан в виде массива файлов запросов - обрабатываем
		if( !setNameOrFiles.length || setNameOrFiles[0].constructor != File  )
			return false;
		var files = setNameOrFiles;
		//задаем имя по папке первого файла
		target.names = [script.getFileName( files[0].parent )];
		//тип тоже определяем по первому файлу
		var type = ( /\.xml$/i.test(files[0]) ) ? target.names[0].toLowerCase() : 'script';
		for(var i=0;i<files.length;i++)
			target.push( {type:type, view:0, name: script.getFileName(files[i]).replace(/\.[^.]+$/,''), existsFile:true, missingFormat:''} );
		return target;
		}
	//если передано имя набора - открываем файл набора и считываем
	var setName = setNameOrFiles;
	var setFile = false;
	for (i = 0; i < userSetNames.length; i++)
		if( setName == userSetNames[i] ){
			setFile = userSetFiles[i];
			break;
			}
	if( !setFile ){
		alert( 'File not found: '+ setName );
		return false;
		}
	if( !setFile.exists ){
		alert( 'File not found:\r'+ setFile.fsName );
		return false;
		}
	var xml = script.read_xml_file( setFile );
	if( !xml )
		return false;
	
	target.names = [setName];
	var query;
	var report = '';
	var items = xml.item;
	for( var i=0; i<items.length(); i++ ) {
		var type = items[i].@type.toString();
		var name = items[i].@name.toString();
		var view = script.isNumber( items[i].@view.toString() ) ? +items[i].@view.toString() : null;
		if( type && name && view != null )
			target.push( {type:type, name:name, view:view, existsFile:true, missingFormat:''} );
		query = target[target.length-1];
		if( !getQueryFile( query ) ){
			query.existsFile = false;
			report += query.type + '\t' + query.name + '\r';
			}
		else if( query.type == 'script' ){
			if( RegExp((File.fs == 'Windows') ? "\.vbs$" : "\.applescript$").test(query.name) ){
				query.existsFile = false;
				report += query.type + '\t' + query.name + '\r';
				}
			}
		}
	if( report && showReport ){
		var setName = target.names ? ' \''+target.names.join(' | ')+'\'' : '';
		script.getReportWindow( report, messages[lang].warning, messages[lang].currentSet+setName+':\r'+messages[lang].missingFiles );
		}
	return target;
	}catch(err){script.alertError(err); return false;}
	}
//ЗАГРУЗКА НАБОРА В LISTBOX
function loadSetToListBox( set, listBox, opts ){ // rerturn массив ссылок на элементы списка. opts = {selectExists: bool, namesOnly: bool, notClearList: bool, checkSet: bool, showCheckReport: bool}
	try{
	opts = opts || {};
	
	if( opts.checkSet )
		checkSet( set, {showCheckReport: opts.showCheckReport} ); //ф-ция проверки загруженого набора, изменяет свойство missingFormat на результаты проверки. Return report string || ''
	
	var listItems = []; // массив ссылок на элементы списка
	if( !opts.notClearList && listBox.items.length )
		listBox.removeAll();
	var item;
	var name = '';
	for(var i=0;i<set.length;i++){
		name = opts.namesOnly ? set[i].name : getListItemName( set[i] );
		item = listBox.add( 'item', name );
		item.setItem = set[i]; // ссылка на объект элемента набора
		listItems.push( item );
		item.checked = false;
		if( !set[i].existsFile )
			item.image = script.images['noExists'];
		else{
			if( set[i].missingFormat )
				item.image = script.images['missingFormat'];
			if( opts.selectExists )
				item.checked = true;
			}
		}
//	listBox.visible = thisVisible;
	}catch(err){ script.alertError( err ); }
	finally{
		return listItems;
		}
	}
function getListItemName( query ){//получение имени для listBox
	return  query.type + ' - ' + ( (enabledChangeWithView) ? query.view+' - ' : '' ) + query.name;
	}

//======================= ПРОВЕРКА НАБОРА И ЗАПРОСОВ =======================
function checkSet( set, opts ) {//ф-ция проверки загруженого набора, изменяет свойство missingFormat на результаты проверки. Return report string || ''
	// opts = {showCheckReport: bool}
	opts = opts || {};
	if( !set || !set.length )
		return false;
	var check = '';
	var report = '';
	for(var i=0;i<set.length;i++)
		if( set[i].type != 'script' && set[i].existsFile )
			if( check = checkQuery( set[i]) ){
				set[i].missingFormat = check;
				report += set[i].name + ':\r\r' + check + '\r=================\r';
				}
	if( report && opts.showCheckReport )
		script.getReportWindow( report, messages[lang].warning, messages[lang].missingFormat );
	return report;
	}

function checkQuery( query ){
	if(checkQueries[query.type][query.name] != undefined )
		return checkQueries[query.type][query.name];
	try{
	var report = '';
	var file = getQueryFile( query );
	if( !file )
		return;//дальнейшая работа скрипта прерывается, но finally все равно срабатывает
	var myXML = XML( script.fileRead(file) );
	switch( file.parent.displayName ){
		case 'Text':
		case 'GREP':
		report += checkXML( myXML.descendants('FindFormatSettings').descendants('TextAttribute'), true );
		report += checkXML( myXML.descendants('ReplaceFormatSettings').descendants('TextAttribute') );
		break;
		case 'Glyph':
		report += checkXML( myXML.descendants('FindGlyph').descendants('GlyphAttribute'), true );
		report += checkXML( myXML.descendants('ReplaceGlyph').descendants('GlyphAttribute') );
		break;
		case 'Object':
		report += checkXML( myXML.descendants('GraphicsAttribute') );
		break;
		default:
		alert( 'function checkQuery - error: \r' + file.parent.displayName );
		myXML = [];
		}
	}catch( err ){ script.alertError( err ); }
	finally{
		checkQueries[query.type][query.name] = report;
		return report;
		}
	}

function checkXML( myXML, find ){
	try{
	if( !myXML.length() )
		return '';
	var report ='';
	var thisValue;
	var findFontID = false;
	var changFontID = false;
	for(var i=0; i< myXML.length(); i++){
		thisValue = myXML[i].@value.toString().replace(/\\:/g, ':');
		if( myXML[i].@cls_id.toString() )
			switch( +myXML[i].@cls_id ){
				//swatch
				case 6913:
				case 6930:
				case 7053:
				case 7054:
				case 7062:
				case 7063:
				case 28260://Object
				case 28264://Object
				case 28297://Object
				try{ app.activeDocument.swatches.itemByName( thisValue ).name }
				catch(err){ report += 'swatch: ' + thisValue + '\r'; }
				break;
				//font 
				case 6955:
				if( !find )//только если проверяется блок FindFormatSettings или FindGlyph
					break;
				createDocFontsList();
				if( !(myXML[i].@psname.toString() in docFontsPsnames) ){
					report += 'font: ' + myXML[i].@psname.toString() + '\r';
					break;
					}
				var technology = '';
				switch( docFontsPsnames[myXML[i].@psname.toString()] ){//если шрифт присутствует - проверяем его тип
					case 1718894932:// ATC
					technology = 'ATC';
					break;
					case 1718895209:// Bitmap
					technology = 'Bitmap';
					break;
					case 1718895433 :// CID
					technology = 'CID';
					break;
					case 1718898499:// OCF
					technology = 'OCF';
					break;
					case 1718898502:// OpenType CFF
					technology = 'OpenTypeCFF';
					break;
					case 1718898505:// OpenType CID
					technology = 'OpenTypeCID';
					break;
					case 1718898516:// OpenType TT
					technology = 'OpenTypeTT'; 
					break;
					case 1718899796:// TrueType
					technology = 'TrueType';
					break;
					case 1718899761:// Type 1
					technology = 'Type1';
					}
				if( technology != myXML[i].@technology )
					report += 'font: ' + myXML[i].@psname + ' ' + myXML[i].@technology + '\r';
				break;
				/*
				//font style
				case 6914:
				report += 'font style: ' + myXML[i].@value + '\r';
				break;
				*/
				//language
				case 6941:
				try{ app.activeDocument.languages.itemByName( thisValue ).name }
				catch(err){ report += 'language: ' + thisValue + '\r'; }
				break;
				//character style
				case 107551:
				case 107552:
				if( !charStyles ) charStyles = getStylesList('character', ':');
				if( !(thisValue in charStyles.ids) )
					report += 'character style: ' + thisValue + '\r';
				break;
				//numeric list style
				case 107543:
				try{ app.activeDocument.numberingLists.itemByName( thisValue ).name }
				catch(err){ report += 'numeric list style: ' + thisValue + '\r'; }
				break;
				}
		if( myXML[i].@type.toString() ){
			switch( myXML[i].@type.toString() ){
				//character style
				case 'cstyle':
				if( !charStyles ) charStyles = getStylesList('character', ':');
				if( !(thisValue in charStyles.ids) )
					report += 'character style: ' + thisValue + '\r';
				break;
				//paragraph style
				case 'pstyle':
				if( !paraStyles ) paraStyles = getStylesList('paragraph', ':');
				if( !(thisValue in paraStyles.ids) )
					report += 'paragraph style: ' + thisValue + '\r';
				break;
				//object style
				case 'objectstyle':
				if( !objectStyles ) objectStyles = getStylesList('object', ':');
				if( !(thisValue in objectStyles.ids) )
					report += 'object style: ' + thisValue + '\r';
				}
			}
		}
	return report;
	}catch( err ){ script.alertError( err ); return ''; }
	}


//========= Ф-ЦИЯ ПОЛУЧЕНИЯ СПИСКОВ СТИЛЕЙ ===============================
function getStylesList( style, separator ){// style = 'paragraph' / 'character' / 'table' / 'cell' / 'object'
	separator = separator || ' / ';
	style = style.replace(/^./, style[0].toUpperCase());
	var names = [];
	var ids = {};
	eval ( 'var docStyles = app.activeDocument.all' + style + 'Styles;' );
	var groupType = style + 'StyleGroup';
	var parent;
	for(var i=0; i<docStyles.length; i++){
		names[i] = docStyles[i].name;
		parent = docStyles[i].parent;
		while( parent.constructor.name == groupType ){
			names[i] = parent.name + separator + names[i];
			parent = parent.parent;
			}
		ids[names[i]] = docStyles[i].id;
		}
	return{ names: names, ids: ids }
	}
//========= Ф-ЦИЯ ПОЛУЧЕНИЯ СПИСКА ШРИФТОВ ДОКУМЕНТА ===================
function createDocFontsList(){
	try{
	if( docFontsPsnames )
		return;
	docFontsPsnames = {};
	var Fonts = app.activeDocument.fonts.everyItem().postscriptName;
	var Types = app.activeDocument.fonts.everyItem().fontType;
	if( Fonts.length != Types.length ){
//		alert( 'function createDocFontsList - error:\r Fonts.length != Types.length' );
		return createDocFontsList_2();
		}
	for(var i=0; i<Fonts.length; i++)
		docFontsPsnames[Fonts[i]] = Types[i];
	}catch( err ){
//		script.alertError( err ); 
//		alert( 'function createDocFontsList - error' );
		createDocFontsList_2();
		}
	}

function createDocFontsList_2(){
	try{
	var fonts = app.activeDocument.fonts;
	docFontsPsnames = {};
	if( fonts.length > 10 ){
		var myProgressPanel = script.getProgressWindow( fonts.length, 'Wait, creating a list of fonts...' );
		myProgressPanel.show();
		for(var i=0; i<fonts.length; i++){
			myProgressPanel.progressBar.setValue();
			try{
//				docFontsPsnames[(fonts[i].postscriptName||fonts[i].name)] = fonts[i].fontType;
				docFontsPsnames[(fonts[i].postscriptName)] = fonts[i].fontType;
				}catch( err ){}//отсутствующие шрифты пропускаем
			}
		myProgressPanel.close();
		}
	else
		for(var i=0; i<fonts.length; i++)
			try{
				docFontsPsnames[fonts[i].postscriptName] = fonts[i].fontType;
				}catch( err ){}//отсутствующие шрифты пропускаем
//	script.getReportWindow( docFontsPsnames.toSource() );
	}catch( err ){
		script.alertError( err ); 
		alert( 'function createDocFontsList_2 - error' );
//		alert( messages[lang].noCheckFonts );
		}
	try{ myProgressPanel.close(); }catch( err ){};
	}
//================= SCRIPT LIBRARY =========================
function getScriptLibrary( scriptArgs ){
//	scriptArgs = {
//		scriptFile: File
//		name: '', 
//		version: Number, 
//		autor: '', 
//		mail: '', 
//		sites: [ '','' ](URLs), 
//		release: Number (year), 
//		supportApp: [ 'InDesign5', 'Photoshop10', 'Illustrator13', 'InDesign6', 'Photoshop11', 'Illustrator14' ], 
//		supportFS: [ 'Windows', 'Macintosh' ] ,
//		prefsInit: Boolean,
//		log: Boolean, init output messages to log-file
//		logWithoutStart: Boolean\
//		workingDirectory: Folder (Optional)
//		targetengine: Bool (Default - false)
//		notShowAlert: Bool
//		}
	if( !scriptArgs ) scriptArgs = {};
	var lib = getLib();
	lib.file = scriptArgs.scriptFile || lib.getThisFile();
	if( !lib.file )
		throw new Error( 'Error: current script file not defined' );
	lib.name = scriptArgs.name || lib.getFileNameOnly( lib.file );
	lib.setTargetengine( scriptArgs.targetengine );
	// log
	lib.logInit = scriptArgs.log;
	lib.logWithoutStart = scriptArgs.logWithoutStart;
	lib.logFILE = new File( lib.file.parent.absoluteURI + '/log.txt' );
	lib.LOG();
	// переводим supportApp в объект
	var _supportApp_ = lib.supportApp;
	lib.supportApp = {};
	for( var i =0; i < _supportApp_.length; i++ ){
		try{
		var parse = /^(.*?)([\d\.]+)?$/.exec(_supportApp_[i]);
		if( parse && parse[1] ){
			var version = parse[2] ? parseFloat(parse[2]) : 0;
			if( lib.supportApp[parse[1]] )
				lib.supportApp[parse[1]] = Math.min( lib.supportApp[parse[1]], version );
			else lib.supportApp[parse[1]] = version;
			}
		}catch(err){}
		}
	// prefs init
	lib.workingDirectory = scriptArgs.workingDirectory;
	if( scriptArgs.prefsInit )
		lib.initXMLOptions();
	return lib;
	function getLib(){
		var scriptLIB;
		scriptLIB = {
		libraryVersion: 2.031, // версия библиотеки script
		extensions: {},//объект для регистрации подгруженных расширений
		version: scriptArgs.version || 1,
		autor: scriptArgs.autor || 'Alexey Dmitrienko',
		mail: scriptArgs.mail || 'alexey-dmitrienko@ya.ru',
		sites: scriptArgs.sites || [
	//		'www.sites.google.com/site/scriptuibuilder/'
			],
		release: scriptArgs.release || new Date().getFullYear(),
		supportApp: scriptArgs.supportApp || [ // пустой массив - поддержка без ограничений, затем он будет переведен в объект {<appName>: <minVersion>}
			// 'InDesign5', 'Photoshop10', 'Illustrator13', 
			],
		supportFS: scriptArgs.supportFS || [ // пустой массив - поддержка без ограничений
			// 'Windows', 'Macintosh' 
			],
		targetengine: false,
		setTargetengine: function( bool ){
			if( !arguments.length ) return;
			if( bool && lib.getAppName('photoshop') )
				return;
			this.targetengine = bool ? true : false;
			},
		notShowAlert: scriptArgs.notShowAlert,
		//============= Log ==============================
		logInit: false, // вывод в log-файл отключен
		logFILE: false, // основной файл для вывода лога, переменная заполнится при инициализации библиотеки
		logFiles: [],
		addLogFile: function( file ){
			if( file && file instanceof File )
				this.logFiles.push( file );
			},
		logSTRING: '',
		LOG: function( str, write ){ // write = true
			try{
			if( !this.logInit )
				return;
			if( !this.logStarted ){
				this.logStarted = new Date();
				if( !this.logWithoutStart ){
					this.logSTRING = '===============================================\n';
					this.logSTRING += '[' + this.getFormattedDateTime( this.logStarted ) + '] ' + "Start log for "+this.fullName() + " (" + this.getFileName(this.file) +")";
					}
				}
			if( str ){
				str = this.errorToString( str );
				this.logSTRING += (this.logSTRING?'\n':'') + '[' + this.getFormattedDateTime( this.logStarted ) + '] ' + str;
				}
			if( write && this.logSTRING ){
				this.fileWriteLine( this.logFILE, this.logSTRING, {encoding: "utf-8"} );
				for( var i = 0; i < this.logFiles.length; i++ )
					if( this.logFiles[i].absoluteURI != this.logFILE.absoluteURI )
						this.fileWriteLine( this.logFiles[i], this.logSTRING, {encoding: "utf-8"} );
				this.logSTRING = "";
				}
			}catch(err){
				if( !this.logWriteError ){
					this.logWriteError = true;
					this.alertError(err);
					}
				};
			},
		logWriteError: false,
		//============= Script =============================
		file: false,
		getThisFile: function(){ try{ var res = app.activeScript || new File($.fileName); if( !res || res.constructor != File ) throw "error" else return res }catch(err){ return new File(err.fileName) } },
		fullName: function(){return this.name+' v.'+this.version},
		notShowErrorOnThisSession: false,
		alertError: function( errorObject, message ){
			if( errorObject.toString() == "Script finished" ) // если ошибка вызвана функцией exitScript() для завершения работы повторяем ошибку
				throw new Error( "Script finished" );
			try{
			var Str = errorObject+'\r';
			Str+='string: '+errorObject.line+'\r';
			if( message )
				Str+= 'Custom message: ' + message;
			this.LOG( Str, true ); // записывем с сохранением, поскольку ошибка может остановить работу скрипта
			// window
			if( this.notShowErrorOnThisSession || this.notShowAlert )
				return;
			Str+= '\r'+this.fullName();
			var LIB = this;
			var win = new Window("dialog", this.localize('Error'), undefined, );
			win.margins = 5;
			with(win){
				if( Str.split(/\r/).length > 20 ){
					win.eText = add( "edittext", undefined, Str, {multiline: 'true', } );
					win.eText.preferredSize = [400,150];
					}
				else{
					win.eText = add( "statictext", undefined, Str, {multiline: 'true', } );
					win.eText.justify = "left";
					win.eText.preferredSize = [400,150];
					}
				win.eText.maximumSize = [450,200];
				win.group = add( "group", undefined, undefined );
				win.group.alignment = ['fill', 'top'];
				win.group.orientation = 'row';
				with(win.group){
					win.group.cBox = add( "checkbox", undefined,  this.localize('Not show Error on this session') );
					win.group.cBox.alignment = ['left', 'center'];
					win.group.cBox.graphics.font = ScriptUI.newFont(win.group.cBox.graphics.font.name, win.group.cBox.graphics.font.style, 10);
					win.group.Exit = add( "button", undefined, 'Exit' );
					win.group.Exit.alignment = ['right', 'top'];
					win.group.Ok = add( "button", undefined, 'Ok' );
					win.group.Ok.alignment = ['right', 'top'];
					}
				}
			if( this.targetengine ) // пока не работает как надо
				win.group.Exit.enabled = false;
			else{
				win.group.Exit.onClick = function(){
					this.window.close();
					LIB.exitScript();
					}
				}
			win.group.Ok.onClick = function(){
				if( win.group.cBox.value )
					LIB.notShowErrorOnThisSession = true;
				this.window.close();
				}
			win.center();
			win.show();
			}catch(err){ if(!this.notShowErrorOnThisSession) this.alert(err) }
			},
		systemCheck: function(){
			var support = true; // default support
			var thisApp = this.appName+this.appVersion;
			var reg = new RegExp( this.appName, 'ig' );
			for( var name in this.supportApp ){
				support = false; // если объект содержит записи - включаем проверку
				if( reg.test(name) && (!this.supportApp[name] || this.appVersion >= this.supportApp[name] ) ){
					support = true;
					break;
					}
				}
			if( support && this.supportFS.length )
				for(var i=0;i<this.supportFS.length;i++){
					if(File.fs == this.supportFS[i]){
						support = true;
						break;
						}
					support = false;
					}
			if(support)
				return true;
			if( !this.notShowErrorOnThisSession )
				this.alert( this.localize('This version of a program is not supported') + ':\r'+this.fullName() + '\r\r======================\r'+(this.fullInfo?this.fullInfo():''), this.localize('Error'), true );
			return false;
			},
		exitScript: function( message ){
			message = message || "";
			if( message )
				this.alert( message );
			
			if( this.exitScriptWithFunction && this.exitScriptWithFunction.constructor == Function ){
				try{
					this.exitScriptWithFunction();
					}catch(err){
						this.LOG( err );
						}
				}
			this.LOG( '', true );
			this.saveXMLOptions();
			if( this.getAppName('indesign') )
				exit(0);
			else
				throw new Error( "Script finished" );
			},
		errorToString: function( err ){
			if( err && err.constructor == Error )
				return 'Error: ' + err + ' \rline: ' + err.line;
			return err;
			},
		alert: function( message, title, errorIcon ){ // message: string[, title: string][, errorIcon: bool=false])
			title = title || this.fullName();
			if( message == undefined )
				return;
			var error = message && message.constructor == Error;
			message = this.errorToString( message );
			this.LOG( message, error );
			if( !this.notShowAlert )
				alert( message, title, (errorIcon || error) );
			},
		//============= ExtendedScript =============================
		isNumber: function( value ){// возвращает true / false, value = Number or String
			if( value === undefined || value === null || value === '' )
				return false;
			return isFinite( value );
			},
		constructorName: function( value, constructorName ){// возвращает String: имя конструктора ('undefined' | 'null' | constructor.name) , если указан constructorName и он не совпадает с конструктором - возвращает ''
			if( constructorName && constructorName.constructor != String )
				constructorName = undefined;
			if( value == undefined ){
				if( constructorName ) 
					return /undefined/i.test(constructorName) ? 'undefined' : '';
				return 'undefined';
				}
			if( value == null ){
				if( constructorName ) 
					return /null/i.test(constructorName) ? 'null' : '';
				return 'null';
				}
			if( constructorName ) 
				return RegExp(value.constructor.name, 'i').test(constructorName) ? value.constructor.name : '';
			return value.constructor.name;
			},
		getWithPrefix: function( num, targetNum ){ // добавляет к числу префикс, возвращает строку. targetNum - число. под размер которого будет добавлен префикс
			if( this.isNumber(num) )
				num = +num;
			else
				return num;
			var level = targetNum ? Math.floor(targetNum).toString().length : 1; // округляем в меньшую сторону, переводим в строку и получаем её длинну. По умолчанию level = 1
			var res = num.toString();
			var length = Math.floor(num).toString().length; // округляем в меньшую сторону, переводим в строку и получаем её длинну
			while( length++ < level )
				res = '0' + res;
			return res;
			},
		getMonth: function( index, locale ){
			try{
			locale = locale || this.language;
			if( locale == 'ru' )
				return ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"][index];
			return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][index];
			}catch(err){ return "[getMonth error: index = "+index+"]" }
			},
		getFormattedDateTime: function( date ) {
			date = date && date.constructor == Date ? date : new Date();
			// Gives us: Wed Jul 08 2009 14:05:44 GMT-0700
			// return: Jul 08 2009 14:05:44
			return date.toString().split(" ").slice(1,-1).join(" ");
			},
		//============= Messages =============================
		language: ( $.locale == 'ru_RU' ) ? 'ru' : 'en',
		localize: function( stringOrJson ){ // stringOrJson = '' or {'ru':'', 'en':''}
			if( stringOrJson ){
				if( stringOrJson.constructor.name == 'String' )
					return this.messages[this.language][stringOrJson] || stringOrJson;
				else
					return stringOrJson[this.language] || '';
				}
			return '';
			},
		messages: {
			en: {},
			ru: {
				"Processing": 'Обработка',
				"Warning!": 'Внимание!',
				"Continue?": 'Продолжить?',
				"Preferences": 'Настройки',
				"Report": 'Отчет',
				"Error": 'Ошибка',
				"Do not show Error on this session": 'Больше не показывать',
				"This version of a program is not supported": 'Эта версия программы не поддерживается',
				"Error of data": 'Ошибка данных',
				"File not found": 'Файл не найден',
				"Folder not found": 'Папка не найдена',
				"Error writing file": 'Ошибка записи файла',
				"For MacOS: \ryou yourself must create alias in the folder:\r": 'Для MacOS: \rвы самостоятельно должны создать ярлык в папке:\r',
				"Progress": 'Выполнение',
				"Save as": 'Сохранить как',
//				"Error rename file": 'Ошибка переименования файла',
//				"Error deleting file": 'Ошибка удаления файла',
//				"Error load file": 'Ошибка загрузки данных',
				},
			},
		//============= Options =============================
		getDefaultXMLOptions: function(){
			return <{this.name} scriptVersion={this.version} libraryVersion={this.libraryVersion}>
					<user/>
				</{this.name}>;
			},
		XMLOptions: null,
		getXMLOptions: function(){
			if( !this.XMLOptions )
				this.initXMLOptions();
			return this.XMLOptions;
			},
		getUserXMLOptions: function(){
			return this.getXMLOptions().user;
			},
		initXMLOptions: function( fromFile ){
			// INI
			var xmlFile = fromFile ? fromFile : this.getPrefFile();
			if( xmlFile.exists ){
				// Err mess
				var errMess = 'Error XML options initialisation from file: ' + xmlFile.fsName +'\r';
				if( !this.XMLOptions )
					errMess += 'Loaded default options\r';
				errMess += 'Error message: ';
				
				var res = this.read_xml_file( xmlFile, true );
				if( res.constructor == Error )
					this.alertError( errMess + res );
				else if( res.name() != this.name )
					this.alertError( errMess + "incorrect name of root node: "+res.name() );
				else
					this.XMLOptions = res;
				}
			if( !this.XMLOptions ){
				xmlFile = this.getPrefFile();
				this.XMLOptions = this.getDefaultXMLOptions();
				}
			// EXE
			this.XMLOptions.@source_after_load = this.XMLOptions.toXMLString(); // запоминаем код исходника
			this.XMLOptions.@filePath = xmlFile.absoluteURI;
			this.XMLOptions.@fileName = xmlFile.displayName;
			
			// данные версий не обновляем - они будут давать информацию в каких условиях был создан файл настроек
			// обновляем данные версий
			// res.@version = this.version;
			// res.@libraryVersion = this.libraryVersion;
			},
		saveXMLOptions: function( toFile ){
			// INI
			var xmlOpts = this.getXMLOptions().copy(); // работаем с копией
			var xml_file = toFile ? toFile : new File( xmlOpts.@filePath.toString() );
			var SOURCE_AFTE_LOAD = xmlOpts.@source_after_load.toString(); // запоминаем исходный код
			// удаляем временные атрибуты
			delete xmlOpts.@filePath;
			delete xmlOpts.@fileName;
			delete xmlOpts.@source_after_load;
			// EXE
			if( !xml_file.exists || xmlOpts.toXMLString() != SOURCE_AFTE_LOAD )
				this.write_xml_file( xml_file, xmlOpts );
			},
		// ЗАКРЫТЫЕ
		getPrefFolder: function(){
			return this.folderCreate( new Folder(this.getWorkingDirectory().absoluteURI + '/' + this.name) );
			},
		workingDirectory: false,
		getWorkingDirectory: function(){
			if( this.workingDirectory && this.constructorName(this.workingDirectory, 'folder') )
				return this.workingDirectory;
			return new Folder( Folder.userData.absoluteURI + '/Adobe/Scripts' );
			},
		getPrefFile: function(){
			var prefFolder = this.getPrefFolder();
			if( !prefFolder )
				return false;
			return new File(prefFolder.absoluteURI+'/preferrences_v.'+this.version.toString().split('.')[0]+'_'+this.appName+this.appVersion+'.xml'); // файл настроек меняется только на уровне версий скрипта(т.е. подверсии используют один файл настроек)
			},
		resourcesFolder: function(){
			return this.folderCreate( new Folder(this.getPrefFolder().absoluteURI + '/resources') );
			},
		//============= JSON =============================
		objectToSource: function( object ){ // return string or ''
			if( this.JSON )
				return this.JSON.objectToSource( object );
			if( object == undefined || object == null || !Object.isValid(object) || object instanceof Array )
				return '';
//			return encodeURI(uneval(object));
			return uneval( object );
			},
		sourceToObject: function( string, returnError ){ // return Object or null, or Error (if returnError = true)
			if( !string || /^\s*?$/.test(string) )
				return null;
			if( this.JSON ){
				var res = this.JSON.sourceToObject( string );
				if( !res )
					return null;
				if( res.constructor == Error ){
					if( returnError )
						return res;
					this.alertError( res );
					return null;
					}
				return res;
				}
//			var source = decodeURI(string).replace(/[\n\r]/g,'\\n').replace(/[\t]/g,'\\t');
			try{
			var res = eval( '('+ string +')' );
			return res && Object.isValid(res) && res.constructor == Object ? res : null;
			}catch(err){
				if( returnError )
					return err;
				this.alertError( err );
				return null;
				}
			},
		//============= XML =============================
		write_xml_file: function( toFile, xml ){
			var str = "<?xml version='1.0' encoding='UTF-8'?>\
"+xml.toXMLString();
			this.fileWrite( toFile, str, {encoding: "UTF-8"} ); // opts = { encode: Bool, encoding: String }
			},
		read_xml_file: function( XMLFile, returnError ){ // return XML or false or Error (if returnError = true)
			try{
			if( !XMLFile.exists )
				throw new Error( 'XML file not found: ' + XMLFile.fsName );
			XMLFile.open('r');
			var res = XMLFile.read();
			XMLFile.close();
			if( !res )
				throw new Error( 'Error read XML file: ' + XMLFile.fsName );
			var myXML = new XML( res );
			if( !myXML )
				throw new Error( 'Error load XML from file: ' + XMLFile.fsName );
			return myXML;
			}catch(err){
				if( returnError )
					return err;
				this.alertError( err );
				return false;
				}
			},
		//============= file system =============================
		folderCreate: function( folder ){ // folder = Folder or String, return Folder / false
			if( !folder )
				return false;
			if( this.constructorName(folder, 'folder') ){
				}
			else if( this.constructorName(folder, 'string') )
				folder = new Folder( folder );
			else if( this.constructorName(folder, 'file') )
				folder = folder.parent;
			else return false;
			if( !folder.exists ){
				// функция взята из: BobsScriptLibrary
				var oFolder = new Folder( folder.absoluteURI ); // make a new folder object (copy) to play with
				var stk = new Array();
				while( !oFolder.exists ){ // we know this first one will not exist
					stk.push( oFolder ); // so push this folder onto the stack
					oFolder = new Folder( oFolder.path ); // and then check to see if the parent folder exists, if so, stop this loop
					}
				stk2 = new Array(); // this is to remove created folders if one of the subsequent folder creations fails - leave nothing behind
				while ( stk.length > 0 ){ // while there's still stuff in the stack
					oFolder = stk.pop(); // pop off the last one, create it, push it onto the error recovery stack if it works, if it doesn't unwind what we've done
					if( oFolder.create() )
						stk2.push( oFolder );
					else{
						while ( stk2.length > 0 )
							stk2.pop.remove();
						this.alertError( err );
						return false;
						} 
					}
				}
			return folder;
			},
		folderClear: function( folder ){ // return false / true
			var flag = true;
			try{
			var files = folder.getFiles();
			if( files.length )
				for( var i = files.length-1; i > -1; i-- ){
					if( files[i] instanceof Folder )
						flag = this.folderClear( files[i] );
					files[i].remove();
					}
			}catch(err){ flag = false; }
			finally{ return flag }
			},
		fileRead: function( file, opts ){ // opts = { decode: Bool }
			if( !file || !this.constructorName(file, 'file') )
				return false;
			opts = opts && opts.constructor == Object ? opts : {};
			if(!file.exists){
				if( !this.notShowErrorOnThisSession ) 
					this.alert( 'fileRead:\n' + this.localize('File not found') + ':\n\n'+file.fsName, this.localize('Error'), true );
				return false;
				}
			var result = false;
			try{
			file.open( 'r' );
			var result = file.read();
			result = opts.decode ? decodeURI( result ) : result;
			}catch( err ){ 
				this.alertError( err ); 
				result = false; 
				}
			finally{
			file.close();
			}
			return result;
			},
		fileWrite: function( file, string, opts ){ // opts = { encode: Bool, encoding: String }
			if( !file || !this.constructorName(file, 'file') )
				return false;
			opts = opts && opts.constructor == Object ? opts : {};
			var result = false;
			var Err = '';
			string = opts.encode ? encodeURI( string ) : string;
			try{
			if( !file.parent.exists )
				throw ( this.localize('Folder not found') + ": " + file.parent.fsName );
			file.open("w");
			if( opts.encoding && opts.encoding.constructor == String )
				file.encoding = opts.encoding;
			result = file.write( new String(string) );
			if( File.fs == 'Macintosh' )
				result = true;// в MacOS проверить запись не получается - при положит. записи тоже возвращает false,  сравнение записываемой строки и рез-т чтения после записи тоже возвр. false
			}catch( err ){ 
				Err = err;
				result = false; 
				}
			finally{
				file.close();
				if( !result )
					if( !this.notShowErrorOnThisSession ) 
						this.alert( this.localize('Error writing file') + "!\n\nFile:\n" + file.fsName + (Err ? '\r\rSystem message:\r' + Err +'\rline: '+Err.line : ''));
				}
			return result;
			},
		fileWriteLine: function( file, string, opts ){
			if( !file || !this.constructorName(file, 'file') )
				return false;
			opts = opts && opts.constructor == Object ? opts : {};
			var result = false;
			var Err = '';
			string =  opts.encode ? encodeURI( string ) : string;
			try{
			if( !file.parent.exists )
				throw ( this.localize('Folder not found') + ": " + file.parent.fsName );
			file.open('a');
			if( opts.encoding && opts.encoding.constructor == String )
				file.encoding = opts.encoding;
			result = file.writeln( new String(string) );
			if( File.fs == 'Macintosh' )
				result = true;// в MacOS проверить запись не получается - при положит. записи тоже возвращает false,  сравнение записываемой строки и рез-т чтения после записи тоже возвр. false
			}catch( err ){ 
				Err = err;
				result = false; 
				}
			finally{
				file.close();
				if( !result )
					if( !this.notShowErrorOnThisSession ) 
						this.alert( this.localize('Error writing file') + "!\n\nFile:\n" + file.fsName + (Err ? '\r\rSystem message:\r' + Err +'\rline: '+Err.line : ''));
				}
			return result;
			},
		adaptForFileName: function(str){
			return str.toString().replace(/[\r\n\t\\\/:*?"<>|]+/g, '_');
			},
		adaptFsNameForSave: function(fsName){
			return fsName.replace(/\\/g, '/').replace(/\'/g, '\\\'');
			},
		
		getFileName: function( file ){
			return file.fsName.split(/[\\\/]/).reverse()[0];
			// вариант 2 - без использования обратного слеша (js-код с обратным слешем не проходит через Bridge()):
			return decodeURI( file.absoluteURI ).split('/').reverse()[0]; 
			// вариант 3
			return file.fsName.substring( file.parent.fsName.length+1 );
			},
		getFileNameOnly: function( file ){ // Внимание: для получения имени папки не использовать
			if( file instanceof Folder )
				return this.getFileName( file ); 
			return this.getFileName( file ).split('.').slice(0,-1).join('.');
			// вариант 2
			return file.fsName.substring( file.parent.fsName.length+1, file.fsName.lastIndexOf('.') )
			},
		getFileExtention: function( file ){
			if( file instanceof File )
				return file.fsName.substring( file.fsName.lastIndexOf('.')+1 ).toLowerCase();
			return '';
			},
		getFileAlias: function(folder, file, create){
			try{
			var aliases = folder.getFiles(function(file){return file.alias});
			var fileLink = file.absoluteURI;
			for(var i = 0; i < aliases.length; i++)
				if(aliases[i].resolve().absoluteURI == fileLink)
					return aliases[i];
			if(create){
				if(!folder.exists)
					folder.create();
				if(File.fs == 'Macintosh'){
					if( !this.notShowErrorOnThisSession ) 
						this.alert( this.localize('For MacOS: \ryou yourself must create alias in the folder:\r') + folder.fsName);
					return false;
					}
				var alias = new File(folder.absoluteURI + '/'  + this.getFileName(file));
				alias.createAlias(file);
				return alias;
				}
			return false;
			}catch(err){this.alertError(err)};
			},
		moveFile: function( FILE, FOLDER ){
			try{
			if( !FOLDER )
				return;
			var folder = this.folderCreate( FOLDER );
			if( !folder )
				throw new Error( 'script.moveFile function error: Folder not found: ' + FOLDER.toString() );
			if( FILE.copy(folder.absoluteURI +"/" + FILE.name) ){
				FILE.remove();
				return true;
				}
			}catch(err){this.alertError(err)};
			},
		getLastCreatedFile: function( folder, fileName, fileExtension ){ // возвращает самый новый файл среди найденных
			// folder: Folder or path
			// fileName: String. Часть имени файла (с начала).
			// fileExtension: String
			try{
			folder = new Folder(folder);
			if( !folder.exists ) return false;
			fileExtension = fileExtension ? '\.'+ fileExtension.replace(/^\./,'') : '';
			// последняя версия определяется по дате создания
			var files = folder.getFiles(function(thisFile) { return ( RegExp('^'+fileName+'.*?'+fileExtension+'$', '').test(thisFile.displayName) ) });
			files.sort( function(a,b){return (a.created > b.created)?1:0} );
			return files.length ? files[files.length-1] : false;
			}catch(err){this.alertError( err ); return false;}
			},
		//============= application data =============================
		appName: app.name.replace('Adobe ',''),
		getAppName: function( str ){ var name = app.name.split(' ').reverse()[0].toLowerCase(); return arguments.length ? (RegExp(name,'ig').test(arguments[0])?name:false) : name; },// если указан str - возвращает результат поиска в строке имени программы
		appVersion: parseFloat( app.version ),
		appVersionCS: function(){
			switch( this.appName ){
				case 'InDesign':
				return this.appVersion - 2;
				case 'Photoshop':
				return this.appVersion - 7;
				case 'Illustrator':
				return this.appVersion - 10;
				default:
				return 0;
				}
			},
		getStartupFolder: function(){
			var folder = new Folder((app.filePath || app.path) + ((this.appName == 'InDesign')?'/Scripts':'') + '/Startup Scripts');
			if(!folder.exists)
				folder.create();
			return folder;
			},
		getInDesignIcon: function( iconCataloquePath ){
			if( iconCataloquePath && (this.getAppName('indesign')||BridgeTalk.getStatus('indesign')!='ISNOTINSTALLED') && this.appVersionCS() >= 5 ){
				if( File.fs == 'Macintosh' )
					iconCataloquePath = iconCataloquePath.replace( /\(([^()]+) Resources\)/, '$1.InDesignPlugin/Versions/A/Resources' );
				if( new File(iconCataloquePath).exists )
					return ScriptUI.newImage( iconCataloquePath );
				// если это неполный путь из каталога - наращиваем
				var app_path = this.getAppName('indesign') ? app.filePath : BridgeTalk.getAppPath('indesign').replace(/[^\\\/]+$/,'');
				iconCataloquePath = app_path + '/Plug-Ins/' + iconCataloquePath;
			//	$.writeln( iconCataloquePath );
				if( new File(iconCataloquePath).exists )
					return ScriptUI.newImage( iconCataloquePath );
				}
			return false;
			},
		getInDesignIconShortPath: function( pathOrFileOrScriptUIImage ){
			if( pathOrFileOrScriptUIImage.constructor == String )
				var icon_file = new File( pathOrFileOrScriptUIImage );
			else if( pathOrFileOrScriptUIImage.constructor == File )
				var icon_file = pathOrFileOrScriptUIImage;
			else if( pathOrFileOrScriptUIImage.constructor == UIImage )
				var icon_file = new File( pathOrFileOrScriptUIImage.pathname );
			
			if( this.getFileExtention(icon_file) == 'idrc' && icon_file.exists )
				return icon_file.fsName.replace( /\\/g, '/' ).replace( /^.+\/Plug-Ins\//, '' );
			
			return icon_file.fsName;
			},
		//============= scriptUI =============================
		images: [],
		writeImage: function(codeStr, name){
			
			var folder = this.resourcesFolder();
			if(!folder.exists)
				folder.create();
			var pngFile = new File(folder.absoluteURI + '/' + name + '.png');
			if(!pngFile.exists){
				pngFile.encoding = "BINARY";
				if(!this.fileWrite(pngFile, codeStr)){
					this.images[name] = false;
					return false;
					}
				}
			this.images[name] = ScriptUI.newImage(pngFile.absoluteURI);
			
//			this.images[name] = ScriptUI.newImage( codeStr );
			return this.images[name];
			},
		getUiObjectIndex: function(uiObject){
			try{
			for(var i = 0; i < uiObject.parent.children.length; i++)
				if(uiObject.parent.children[i] == uiObject)
					return i;
			}catch(err){this.alertError(err)};
			},
		resizeWindow: function( window, sizeIndex, value ){//sizeIndex: 0 - hor, 1 - vert
			try{
			var size = [0,0];
			size[sizeIndex] = value;
			var location = [window.location[0], window.location[1]];
			var bounds = [window.bounds[0], window.bounds[1], window.bounds[2], window.bounds[3]];
			window.location = location;
			window.bounds = [bounds[0], bounds[1], bounds[2]+size[0], bounds[3]+size[1]];
			window.location = location;
			}catch(err){ this.alertError( err ); }
			},
		confirm: function( message, opts ){ // return  false / true/undefined. opts = {title: str, multiline: bool, withUndefined: bool}
			opts = opts || {};
			var result = opts.withUndefined ? undefined : false;
			var win = new Window( 'dialog', opts.title || '' );
			win.alignChildren = 'right';
			win.margins = 5;
			win.spacing = 5;
			with(win){
				if( message )
					win.Text = add('statictext', undefined, message, {multiline:(opts.multiline?true:false)});
				win.Grp = add('group');
				win.Grp.orientation = 'row';
				win.Grp.spacing = 5;
				with(win.Grp){
					if( opts.withUndefined )
						win.Grp.Cancel = add( 'button', undefined, 'Cancel' );
					win.Grp.no = add('button', undefined, 'No');
					win.Grp.ok = add('button', undefined, 'OK');
					}
				}
			if( opts.withUndefined ){
				win.Grp.Cancel.onClick = function(){
					result = undefined;
					this.window.close();
					}
				}
			win.Grp.no.onClick = function(){
				result = false;
				this.window.close();
				}
			win.Grp.ok.onClick = function(){
				result = true;
				this.window.close();
				}
			win.defaultElement = win.Grp.ok;
			win.center();
			win.show();
			return result;
			},
		getReportWindow: function( reportText, tittle, reportName, width ){//ОКНО ВЫВОДА РЕЗУЛЬТАТОВ
			tittle = tittle || '';
			width = width || 400;
			var _height = new String( reportText ).split('\r').length;
			var resizeable = this.hasOwnProperty('addDynamicObject');
			if( _height == 1 ) _height = 22;
			else _height = ( _height < 20 ) ? 15*_height : 300;
			var winReport = new Window( 'dialog', tittle, undefined, {resizeable: resizeable} );
			winReport.alignChildren = 'left';
			winReport.margins = 5;
			winReport.spacing = 10;
			with(winReport){
				if( reportName ){
					winReport.Name = add('statictext', undefined, reportName, {multiline:true});
					winReport.Name.preferredSize = [ width, winReport.Name.preferredSize[1] ];
					}
				winReport.Text = add('edittext', undefined, reportText, {multiline:true, readonly: ( File.fs == 'Windows' )});
				winReport.Text.alignment = ["fill", "fill"];
				winReport.Text.preferredSize = [ width, _height ];
				
				winReport.ok = add('button', undefined, 'OK');
				winReport.ok.alignment = 'center';
				};
			winReport.ok.onClick = function(){
				this.window.close();
				}
			//====================== RESIZE
			if( resizeable ){
				script.addDynamicObject( { obj: winReport.Text, moveCoefs: false, resizeCoefs: [1,1], isSeparator: false, windowKeyRestore: script.name+'_ReportWindow' } );
				script.addDynamicObject( { obj: winReport.ok, moveCoefs: ['center',1], resizeCoefs: false, isSeparator: false } );
				if( winReport.Name )
					script.addDynamicObject( { obj: winReport.Name, moveCoefs: false, resizeCoefs: [1,0], isSeparator: false } );
				}
			else{
				winReport.Text.minimumSize = [ width, _height ];
				winReport.ok.minimumSize = winReport.ok.maximumSize = [100, 22 ];
				
				winReport.onResizing = function() {this.layout.resize()}
				winReport.onShow = function(){
					this.layout.layout();
					this.minimumSize = this.preferredSize;
					}
				}

			winReport.center();
			winReport.show();
			},
		getProgressBar: function( container, maxValue, size, location, reverse ){//возвращает progressbar с ф-цией setValue( [num] )
			/*
			Note: in scripts that use progress bars, you cannot set
			app.scriptPreferences.enableRedraw to false. If you do, the progress
			bar doesn't display correctly. This is on Macs only.
			*/
			if( /indesign/i.test(app.name) && File.fs != 'Windows' ){
				app.scriptPreferences.enableRedraw = true;
				}
			
			size = size || [200, 8];
			location = location || [0,0];
			if( File.fs == '_Macintosh' ){ // отключено
				// Самодельный прогрессбар
				var pBar = container.add('group', [location[0], location[1], location[0]+size[0], location[1]+size[1]]);
				pBar.visible = false;
				pBar.graphics.backgroundColor =
				pBar.graphics.disabledBackgroundColor = // в окне, у которого нет фокуса - ничего не обновляется, disabledBackgroundColor не помогает
					pBar.graphics.newBrush(pBar.graphics.BrushType.SOLID_COLOR, [0/255, 0/255, 255/255, 1]);
				pBar.step = pBar.size[0]/maxValue;
				pBar.value = 0;
				pBar.setValue = function( num ){
					num = num || 1;
					if( !this.value || this.value >= maxValue ){
						this.size = [0, this.size[1]];
						this.visible = true;
						this.value = 0;
						}
					this.value += num;
					this.size = [this.step*this.value, this.size[1]];
					}
				return pBar;
				}
			if( reverse ){
				var pBar = container.add('progressbar', [location[0], location[1], location[0]+size[0], location[1]+size[1]], maxValue, maxValue);
				pBar.setValue = function( num ){
					num = num || 1;
					if( this.value >= maxValue ) this.value = maxValue;
					this.value -= num;
					};
				return pBar;
				}
			var pBar = container.add('progressbar', [location[0], location[1], location[0]+size[0], location[1]+size[1]], 0, maxValue);
			pBar.setValue = function( num ){
				num = num || 1;
				if( (this.value + num) > maxValue ){
					num = (maxValue - this.value) || 1;
					this.value = 0;
					}
				this.value += num;
				};
			return pBar;
			},
		getProgressWindow: function( maxValue, title, reverse ){//return palette{ setValue: function( [num] ) }
			var LIB = this;
			title = title || this.localize('Progress');
			var myProgressPanel = new Window('palette', title);
			myProgressPanel.progressBar = this.getProgressBar( myProgressPanel, maxValue, undefined, undefined, reverse );
			myProgressPanel.setValue = function( num ){
				this.progressBar.setValue( num );
				}
			myProgressPanel.addProgressBar = function( maxValue, reverse ){
				var pBar = LIB.getProgressBar( this, maxValue, undefined, undefined, reverse ); // with 
				pBar.removeBar = function(){
					var win = this.window;
					win.remove( this );
					win.layout.layout( true );
					}
				this.layout.layout( true );
				return pBar;// return  ProgressBar with functs setValue(num) and removeBar()
				}
			myProgressPanel.center();
			return myProgressPanel;
			},
		addGroupListener: function( prefs ){ // prefs = {objs: Array of UIObjects, listener: function( event ), onChangingMode: Bool }
			if( !prefs || !prefs.objs || !prefs.objs || !prefs.listener || prefs.listener.constructor != Function )
				return;
			if( prefs.objs.constructor != Array )
				prefs.objs = [prefs.objs];
			for( var i = 0; i <prefs.objs.length; i++ ){
				if( prefs.objs[i].hasOwnProperty('margins') ){// обработчики для содержимого контейнеров
					if( prefs.onChangingMode )
						prefs.objs[i].addEventListener( 'changing', prefs.listener );
					else{
						prefs.objs[i].addEventListener( 'click', prefs.listener );
						prefs.objs[i].addEventListener( 'change', prefs.listener );
						}
					continue;
					}
				switch( prefs.objs[i].type ){
					case "dropdownlist":
					case "listbox":
					case "treeview":
					case "edittext":
					case "scrollbar":
					case "slider":
						if( prefs.onChangingMode )
							prefs.objs[i].addEventListener( 'changing', prefs.listener );
						else
							prefs.objs[i].addEventListener( 'change', prefs.listener );
					break;
					case "checkbox":
					case "radiobutton":
					case "button":
					case "iconbutton":
						prefs.objs[i].addEventListener( 'click', prefs.listener );
					}
				}
			},
		}
		return scriptLIB;
		};
	}
function extension_scriptInfo( scriptLibrary ){
	if( scriptLibrary && scriptLibrary instanceof Object && scriptLibrary.libraryVersion ){}
	else return;
	var name = 'scriptInfo';
	var version = 1.22;
	var script = scriptLibrary;
	script.extensions[name] = {version: version};
	//=================================
	script.messages.en.info = 'Info';
	script.messages.en.script = 'Script';
	script.messages.en.help = 'Help';
	script.messages.en.system = 'System';
	script.messages.ru.info = 'Информация';
	script.messages.ru.script = 'Скрипт';
	script.messages.ru.help = 'Помощь';
	script.messages.ru.system = 'Система';
	script.supportInfo = function(){
		try{
		var arr_supApps = [];
		for( var name in this.supportApp )
			arr_supApps.push( name + (this.supportApp[name] ? ' ' + this.supportApp[name] + ' and late' : '') );
		var supportFS = this.supportFS.length ? this.supportApp.length : ['Windows','Macintosh'];
		return arr_supApps.join(' / ') + ' // ' + supportFS.join('/');
		}catch(err){this.alertError(err)}
		}
	script.fullInfo = function(){
		return this.fullName()+'\r'+
			'for '+this.supportInfo()+'\r\r'+
			'script of '+this.autor+', '+this.release+'\r'+
			this.mail+'\r'+
			this.sites.join('\r');
		}
	script.getWinInfo = function( addInfo, help ){ // addInfo - additional information about the script
		try{
		addInfo = addInfo ? '\r\r'+addInfo : '';
		help = help || '';
		var thisSite = ( !this.sites || !(this.sites instanceof Array) || this.sites.length == 0 ) ? false : this.sites[0];
		var addScriptInfo = function( container ){
			var item;
			with(container){
				item = add('statictext', undefined, container.window.core.fullInfo() + addInfo , {multiline: true});
				
				var buts = add('group');
				buts.orientation = 'row';
				buts.alignment = 'right';
				buts.margins = [0,10,0,10];
				if( thisSite ){
					var site = buts.add('button', undefined, thisSite);
					site.onClick = function(){
						this.window.core.connectToSite();
						this.window.close();
						}
					}
				}
			}
		var addHelpInfo = function( container ){
			var item = container.add('statictext', undefined, help, {multiline: true, scrolling: true });
			item.preferredSize = [350,300];
			}
		var addSystemInfo = function( container ){
			container.add('statictext', undefined, container.window.core.getSystemInfo(), {multiline: true});
			var item = container.add( "button", undefined, 'working directory' );
			item.alignment = ['left', 'top'];
			item.onClick = function(){
			var dir = script.getWorkingDirectory();
			if( dir )
				dir.execute();
			}
			}
		var winInfo = new Window( 'dialog', this.localize('info') );
		winInfo.core = this;
		winInfo.preferredSize = [400,10];
		winInfo.alignChildren = 'fill';
		winInfo.margins = 5;
		winInfo.spacing = 5;
		if(this.appVersionCS() > 3){//CS4 и старше
			with(winInfo){
				winInfo.tPnl = add('tabbedpanel');
				with(winInfo.tPnl){
					winInfo.tPnl.script = add( 'tab', undefined, this.localize('script') );
					winInfo.tPnl.script.orientation = 'column';
					winInfo.tPnl.script.alignChildren = 'fill';
					addScriptInfo( winInfo.tPnl.script );
					
					if( help ){
						winInfo.tPnl.help = add( 'tab', undefined, this.localize('help') );
						winInfo.tPnl.help.orientation = 'column';
						winInfo.tPnl.help.alignChildren = 'fill';
						addHelpInfo( winInfo.tPnl.help );
						}
					
					winInfo.tPnl.system = add( 'tab', undefined, this.localize('system') );
					winInfo.tPnl.system.orientation = 'column';
					winInfo.tPnl.system.alignChildren = 'fill';
					addSystemInfo( winInfo.tPnl.system );
					}
				}
			}
		else{//CS3
			addScriptInfo( winInfo );
			winInfo.tPnl = winInfo.add( 'panel', undefined, this.localize('system') );
			winInfo.tPnl.alignChildren = 'fill';
			addHelpInfo( winInfo.tPnl );
			addSystemInfo( winInfo.tPnl );
			}
		winInfo.ok = winInfo.add('button', undefined, "OK");
		winInfo.ok.alignment = 'center';
		winInfo.ok.onClick = function(){
			this.window.close();
			}
		winInfo.center();
		winInfo.show();
		}catch(err){this.alertError(err)};
		}
	script.getSystemInfo = function(){
		var str = '';
		try{
		str+=$.os+'\r';
		str+=this.appName+' '+this.appVersion+'\r';
		str+='Language: '+$.locale+'\r';
		str+='ScriptUI: '+ScriptUI.version+'\r';
		str+= '\r' + 'scriptLibrary: '+this.libraryVersion+'\r'
		if( $.fileName && File($.fileName).exists )
			str+= '('+File($.fileName).fsName+')'+'\r';
		if( this.extensions.toSource() != '({})' ){
			str += 'scriptExtensions:\r';
			for( var name in this.extensions )
				str += '   ' + name + ': ' + this.extensions[name].version + (this.extensions[name].description ? ' ('+this.extensions[name].description+')':'') + '\r';
			}
		return str;
		}catch(err){ return str }
		}
	script.connectToSite = function(){
		if( !this.sites || !(this.sites instanceof Array) || this.sites.length == 0 )
			return;
		var thisSite = this.sites[0];
		var urlFile = File(Folder.temp.absoluteURI + '/'+this.adaptForFileName(thisSite)+'.url');
		if(!urlFile.exists)
			this.fileWrite( urlFile, '[DEFAULT]\rBASEURL=http://'+thisSite+'/\r[InternetShortcut]\rURL=http://'+thisSite+'/' );
		try{
			urlFile.execute();
			} catch(err) {this.alertError(err)}
		}
	}
function extension_customDraw( scriptLibrary ){
	if( scriptLibrary && scriptLibrary instanceof Object && scriptLibrary.libraryVersion ){}
	else return;
	var name = 'customDraw';
	var version = 1.22;
	var script = scriptLibrary;
	script.extensions[name] = {version: version};
	//=================================
	script.getCustomDraw = function( uiObject, args ){// args = { text: 'myButton', font: 'Tahoma', style: 'Bold', size: 12, textRGB: [0,0,0], bgRGB: [0,0,0], uiImage: UIImage, storeText: 'x', imageWidth: 22, imageHeight: 22, imageAutoFill: bool } - добавление текста в элемент scriptUI (напр., для добавления текста в iconbutton) и раскраска элемента
		// v.3
		if( uiObject.constructor == Array ){
			for(var i = 0; i < uiObject.length; i++)
				this.getCustomDraw( uiObject[i], args );
//				arguments.callee( uiObject[i], args );
			return;
			}
		try{
		if( !args )//обнуление, убирает ранее установленное форм-ние (текст и цвет)
			args = uiObject.image ? {uiImage: uiObject.image} : {};
		
		if( args.text )
			this.addFont( uiObject, args );
		
		uiObject.onDraw = function(){
//		var onDraw = function(){
			try{
			this.graphics.drawOSControl();
			if( args.bgRGB ){
				this.graphics.rectPath( 0, 0, this.size[0], this.size[1] );
				this.graphics.fillPath( this.graphics.newBrush( this.graphics.BrushType.SOLID_COLOR, [args.bgRGB[0]/255, args.bgRGB[1]/255, args.bgRGB[2]/255, 0.5] ) );
				}
			
			var uiObject_size = this.size ? this.size : this.preferredSize;
			
			var wh;
			if( args.uiImage ){
				// габариты картинки
				wh = [args.uiImage.size[0],args.uiImage.size[1]];
				
				if( args.imageAutoFill ){
					}
				if( args.imageWidth && args.imageHeight ){
					wh = [
						args.imageWidth, 
						args.imageHeight
						];
					}
				else if( args.imageWidth ){
					wh = [
						args.imageWidth, 
						wh[1]/(wh[0]/args.imageWidth)
						];
					}
				else if( args.imageHeight ){
					wh = [
						wh[0]/(wh[1]/args.imageHeight),
						args.imageHeight
						];
					}
				
				if( wh[0] <= uiObject_size[0] && wh[1] <= uiObject_size[1] ){
					}
				else if( args.imageAutoFill ){ // если иконка  не вписывается в габариты и включена опция автозаполнения
					wh = [args.uiImage.size[0],args.uiImage.size[1]];
					// коэфициент уменьшения
					var k = Math.min(uiObject_size[0]/wh[0], uiObject_size[1]/wh[1]);
					wh = [k*uiObject_size[0],k*uiObject_size[1]];
					}
				//	$.writeln( wh.toString() );
				
				// координаты картинки
				var xy;
				if( args.text )
					xy = [6, (uiObject_size[1]-wh[1])/2 ];
				else
					xy = [ (uiObject_size[0]-wh[0])/2, (uiObject_size[1]-wh[1])/2 ];
				
				this.graphics.drawImage(
					args.uiImage,
					xy[0],
					xy[1],
					wh[0],
					wh[1]
					);
				}
			
			if( args.text ){
				args.textRGB = args.textRGB || [0,0,0];//по умолчанию - Black
				var textSize = this.graphics.measureString( args.text );
				
				var x;
				if( args.uiImage )
					x = xy[0] + wh[0] + 6;
				else
					x = Math.max(0, (uiObject_size[0] - textSize[0])/2);
				
				var y = Math.max(0, (uiObject_size[1] - textSize[1])/2);
				
				this.graphics.drawString( args.text, this.graphics.newPen( this.graphics.PenType.SOLID_COLOR, [args.textRGB[0]/255, args.textRGB[1]/255, args.textRGB[2]/255, 1], 1 ), x, y);
				}
			}catch(err){ throw err } //alert( err + ', line ' + err.line ) }
			};
		
//		$.writeln( '0: ' + uiObject.type + ': ' + args.uiImage.name );s
		
/*		if( uiObject.onClick ){
			var onClick = uiObject.onClick;
			uiObject.onClick = function(){};
			uiObject.onClick();
			uiObject.onClick = onClick;
			}
		else
			uiObject.onClick();
			*/
		
		uiObject.enabled = !uiObject.enabled;
		uiObject.enabled = !uiObject.enabled;
		
//		uiObject.window.layout.layout(true);
/*		
		if( uiObject.window.visible ){
			$.writeln( '1: ' + uiObject.type + ': ' + args.uiImage.name );
			uiObject.enabled = !uiObject.enabled;
			uiObject.enabled = !uiObject.enabled;
			}
		else{
			$.writeln( '01: ' + uiObject.type + ': ' + args.uiImage.name );
			var _funct = function( event ){
				$.writeln( '2: ' + uiObject.type + ': ' + args.uiImage.name );
				uiObject.enabled = !uiObject.enabled;
				uiObject.enabled = !uiObject.enabled;
//				event.target.removeEventListener( event.type, _funct );
				
//				var next_event = ScriptUI.events.createEvent( 'UIEvent' );
//				next_event.initUIEvent( event.type );
//				event.target.window.dispatchEvent( next_event );
				};
			uiObject.window.addEventListener( 'focus', _funct );
			}
			*/
		}catch(err){this.alertError(err)};
		}
	/*
	script.getCustomDraw = function( uiObject, args ){// uiObject = uiObject || array of uiObjects; args = { text: 'myButton', font: 'Tahoma', style: 'Bold', size: 12, textRGB: [0,0,0], bgRGB: [0,0,0] } - добавление текста в uiObject (напр., для добавления текста в iconbutton) и раскраска элемента
		if( uiObject.constructor == Array ){
			for(var i = 0; i < uiObject.length; i++)
				script.getCustomDraw( uiObject[i], args );
//				arguments.callee( uiObject[i], args );
			return;
			}
		try{
		if( !args )//обнуление, убирает ранее установленное форм-ние (текст и цвет)
			args = {}
		var str = '';
		str += 'uiObject.onDraw = function(){';
		str += 'this.graphics.drawOSControl();';
		if(args.text){
			args.textRGB = args.textRGB || [0,0,0];//по умолчанию - Black
			this.addFont( uiObject, args );
			str += 'var textSize = this.graphics.measureString( \''+args.text+'\' );';
			str += 'var x = Math.max(0, (this.size[0] - textSize[0])/2);';
			str += 'var y = Math.max(0, (this.size[1] - textSize[1])/2);';
			str += 'this.graphics.drawString( \''+args.text+'\', this.graphics.newPen( this.graphics.PenType.SOLID_COLOR, ['+args.textRGB[0]+'/255, '+args.textRGB[1]+'/255, '+args.textRGB[2]+'/255, 1], 1 ), x, y);';
			}
		if(args.bgRGB){
			str += 'this.graphics.rectPath( 0, 0, this.size[0], this.size[1] );\
			this.graphics.fillPath( this.graphics.newBrush( this.graphics.BrushType.SOLID_COLOR, ['+args.bgRGB[0]+'/255, '+args.bgRGB[1]+'/255, '+args.bgRGB[2]+'/255, 0.5] ) );'
			}
		str += '};';
		eval( str );
		//активируем изменения
		uiObject.enabled = !uiObject.enabled;
		uiObject.enabled = !uiObject.enabled;
		}catch(err){this.alertError(err)};
		}
	*/
	script.addFont = function( uiObject, args ){// args = arguments or uiObject, return uiobject.graphics.font or false. Code of arguments: { font: 'Tahoma', style: 'Bold', size: 12 }, (style: Regular, Bold, Italic, Bolditalic)
		if( args ){
			try{
			if( args.font || args.style || args.size ){
				args.font = args.font || uiObject.graphics.font.name;
				args.style = args.style || uiObject.graphics.font.style;
				args.size = args.size || uiObject.graphics.font.size;
				return uiObject.graphics.font = ScriptUI.newFont(args.font, args.style, args.size);
				}
			else if( args.graphics && args.graphics.font )//если через args передан uiobject
				return uiObject.graphics.font = args.graphics.font;
			}catch(err){}
			}
		try{ return uiObject.graphics.font }catch(err){ return false }
		}
	script.addColor = function( uiObject, type, RGB, opacity ){//type: 0 = backgroundColor, 1 = foregroundColor (fontColor), RGB - Array or uiobject or ScriptUIBrush/Pen. Return uiObject.graphics.[type]Color or false
		opacity = opacity && opacity <= 1 ? opacity : 1;
		if( RGB ){
			try{
			if( !type )
				return uiObject.graphics.backgroundColor = 
					RGB instanceof Array ? 
						uiObject.graphics.newBrush(uiObject.graphics.BrushType.SOLID_COLOR, [RGB[0]/255, RGB[1]/255, RGB[2]/255, opacity]) :
/*						RGB instanceof ScriptUIBrush ? 
							RGB : 
							RGB.graphics.backgroundColor ?
								RGB.graphics.backgroundColor : */
								uiObject.graphics.backgroundColor;
			else
				return uiObject.graphics.foregroundColor = 
					RGB instanceof Array ? 
						uiObject.graphics.newPen(uiObject.graphics.PenType.SOLID_COLOR, [RGB[0]/255, RGB[1]/255, RGB[2]/255, opacity], 2) :
/*						RGB instanceof ScriptUIPen ? 
							RGB : 
							RGB.graphics.foregroundColor ? 
								RGB.graphics.foregroundColor : */
								uiObject.graphics.foregroundColor;
			}catch(err){}
			}
		//если не указан RGB - просто возвращаем color объекта
		try{ 
			if( !type )
				return uiObject.graphics.backgroundColor;
			else
				return uiObject.graphics.foregroundColor;
			}catch(err){ return false }
		}
	script.getRGB = function( uiObject, type ){//type: 0 = backgroundColor, 1 = foregroundColor (fontColor)
		var color = this.addColor( uiObject, type );
		if( color )
			return [Math.round(color[0]*255), Math.round(color[1]*255), Math.round(color[2]*255)];
		}
	}
function extension_resizeableWindow( scriptLibrary ){
	if( scriptLibrary && scriptLibrary instanceof Object && scriptLibrary.libraryVersion ){}
	else return;
	var name = 'resizeableWindow';
	var version = 2.5;
	var script = scriptLibrary;
	script.extensions[name] = {version: version};
	//=================================
	script.addDynamicObject = function( args ){
		/*
		args: { 
			obj: uiObject or Array
			moveCoefs: [horizontal, vertical], 
			resizeCoefs: [horizontal, vertical], 
			isSeparator: false/0/1 ( 0 - on width, 1 - on height, added function obj.properties.moveSeparator(resize[value,value]) ),
			keyRestore: String,  - only for separator
			window: Window object (Optional) - если не указан obj
			windowMinSize: bool/[bool,bool]/[num,num],
			windowResizeDirections: [horizontal, vertical], (Optional, default: [true,true]),
			windowKeyRestore: String
			}
		*/
		try{
		var obj = args.obj;
		var moveCoefs = args.moveCoefs;
		var resizeCoefs = args.resizeCoefs;
		var keyRestore = args.keyRestore;
		if( this.constructorName(args.isSeparator, 'number') ){
			if( obj.type == 'tabbedpanel' || obj.type == 'tab' )
				args.isSeparator = false;
			else if( !this.extensions['mouseMove'] ){
				args.isSeparator = false;
				this.alert( 'extension_'+name+': extension_mouseMove not found');
				}
			}
		else
			args.isSeparator = false;
		
		var windowMinSize = args.windowMinSize;
		var windowResizeDirections = args.windowResizeDirections || [true, true];
		var windowKeyRestore = args.windowKeyRestore;
		
		
		var script = this;
		if( obj )
			var win = ( obj instanceof Array ) ? obj[0].window : obj.window;
		else if( args.window && args.window.constructor == Window )
			var win = args.window;
		else{
			this.alert( 'addDynamicObject error: window is undefined' );
			return;
			}
/*		if( !win.properties || !win.properties.resizeable ){
			if( win.properties && win.properties.Error ) return;//повторные сообщения не показываем
			this.alert( 'Error: window.properties.resizeable = false' );
			return win.properties ? win.properties.Error = true : win.properties = {Error:true};
			} */
		if( !win.properties || !win.properties.initStatus ){
			if( !win.properties )
				win.properties = {};
			win.properties.initStatus = true;
			win.properties.Objs = [];
			var initFunction = function( event ){
				try{
				var win =  event.target;
				win.removeEventListener('show', initFunction);
				win.properties.Size = [win.size[0],  win.size[1]];
				// для resizeDynamicObject
				if(  win.properties.SizeWatchString )
					win.properties.watch( 'Size', new Function( '',  win.properties.SizeWatchString) );
				for( var i = 0; i <  win.properties.Objs.length; i++ ){
					 win.properties.Objs[i].properties.Location = [ win.properties.Objs[i].location[0], win.properties.Objs[i].location[1]];
					 win.properties.Objs[i].properties.Size = [ win.properties.Objs[i].size[0],  win.properties.Objs[i].size[1]];
					// для resizeDynamicObject
					if(  win.properties.Objs[i].properties.SizeWatchString )
						 win.properties.Objs[i].properties.watch( 'Size', new Function( '',  win.properties.Objs[i].properties.SizeWatchString) );
					}
				win.onResize = new Function( '',  win.properties.functString );
				//===================
				// подгрузка resize и move
				if( !win.keyRestore )
					return;
				var base = script.extensions[name].initialDataBase[win.keyRestore];
				// запоминаем
				for( var i = 0; i < base.length; i++ ){
					if( base[i].size )
						base[i].size = [base[i].object.size[0], base[i].object.size[1]];
					if( base[i].location )
						base[i].location = [base[i].object.location[0], base[i].object.location[1]];
					}
				//подгружаем
				var xmlRestoreBase = script.getXMLOptions()[name].restoreBase[win.keyRestore];
				if( xmlRestoreBase.length() && script.getXMLOptions()[name].@version.toString() == version.toString() ){
					var xmlRestore;
					for( var i = 0; i < base.length; i++ ){
						xmlRestore = xmlRestoreBase[base[i].key];
						if( xmlRestore.length() ){
							var resizes = xmlRestore.@resize.toString().split(' ');
							if( base[i].size && resizes.length == 2 && this.isNumber(resizes[0]) && this.isNumber(resizes[1]) ){
								script.resizeDynamicObject( base[i].object, +resizes[0], +resizes[1] );
								}
							var locations = xmlRestore.@location.toString().split(' ');
							if( base[i].location && locations.length == 2 && this.isNumber(locations[0]) && this.isNumber(locations[1]) ){
								base[i].object.location = [+locations[0],+locations[1]];
								}
							var movies = xmlRestore.@move.toString().split(' ');
							if( base[i].move && movies.length == 2 && this.isNumber(movies[0]) && this.isNumber(movies[1]) ){
								base[i].object.properties.moveSeparator( [+movies[0],+movies[1]] );
								}
							}
						}
					}
				
				win.addEventListener('close', saveWindowPrefs);
				function saveWindowPrefs(e){
					if( !script.getXMLOptions()[name].length() ){
						script.getXMLOptions()[name].appendChild( 
							<{name} version={version}>
								<restoreBase></restoreBase>
							</{name}>
							);
						}
					else
						script.getXMLOptions()[name].@version = version; // на всяк случай обновляем версию
					// удаляем старые настройки
					if( script.getXMLOptions()[name].restoreBase[win.keyRestore].length() )
						delete script.getXMLOptions()[name].restoreBase[win.keyRestore];
					// собираем
					var xmlRestore = <{win.keyRestore}></{win.keyRestore}>;
					for( var i = 0; i < base.length; i++ ){
						if( base[i].size && base[i].object.size.toString() != base[i].size.toString() )
							xmlRestore.@resize = base[i].object.size[0]-base[i].size[0] + ' ' + base[i].object.size[1]-base[i].size[1];
						if( base[i].object.location.toString() != base[i].location.toString() ){
							if( i == 0 ) // location для window
								xmlRestore.@location = base[i].object.location[0] + ' ' + base[i].object.location[1];
							else
								xmlRestore.@move = base[i].object.location[0]-base[i].location[0] + ' ' + base[i].object.location[1]-base[i].location[1];
							}
						}
					// записываем
					script.getXMLOptions()[name].restoreBase.appendChild( xmlRestore );
					}
				}catch(err){script.alert(err) }
				}
			win.addEventListener('show', initFunction);
			}
		
		if( obj instanceof Array )
			for( var i = 0; i < obj.length; i++ )
				addDynamics( obj[i] );
		else
			addDynamics( obj );
		//=========================================================
		// PRIVATE FUNCTS
		//=========================================================
		function addDynamics( obj ){
			// добавляем в базу
			if( args.windowKeyRestore ){
				obj.window.keyRestore = args.windowKeyRestore;
				if( !script.extensions[name].initialDataBase )
					script.extensions[name].initialDataBase = {};
				script.extensions[name].initialDataBase[args.windowKeyRestore] = [{object: obj.window, key: args.windowKeyRestore, size:true, location:true}];
				}
			if( obj.window.keyRestore && args.keyRestore && script.constructorName(args.isSeparator, 'number') )
				script.extensions[name].initialDataBase[obj.window.keyRestore].push( {object: obj, key: args.keyRestore, isSeparator: args.isSeparator, location:true} );
			
			if( !obj.properties ) obj.properties = {Size:true, Location:true};
			var win = obj.window;
			win.properties.Objs[win.properties.Objs.length] = obj;//регистрируем объект
			var parent = obj.parent;
			if( !parent.properties )
				parent.properties = {};
			if( !parent.properties.functString ){
				parent.properties.functString = '';
				if( parent == win )
					win.properties.functString = getStringForDynamicWindow();
				parent.properties.functString += 'var resize = [this.size[0]-this.properties.Size[0], this.size[1]-this.properties.Size[1]];';
				}
			var index = script.getUiObjectIndex(obj);
			var sObj = 'this.children['+index+']';
			var sThisObj = 'this.This.children['+index+']';
			if( moveCoefs && ( moveCoefs[0] || moveCoefs[1] ) ){
				var thisLocations = [
					sObj + '.properties.Location[0]' + ( moveCoefs[0] ? '+resize[0]' + (moveCoefs[0]==1?'':'*'+moveCoefs[0]) : '' ),
					sObj + '.properties.Location[1]' + ( moveCoefs[1] ? '+resize[1]' + (moveCoefs[1]==1?'':'*'+moveCoefs[1]) : '' )
					];
				if( moveCoefs[0] == 'center' ) thisLocations[0] = '(this.size[0]-'+sObj+'.size[0])/2';
				if( moveCoefs[1] == 'center' ) thisLocations[1] = '(this.size[1]-'+sObj+'.size[1])/2';
				parent.properties.functString += sObj + '.location = [' + thisLocations.join(',') + '];';
				}
			if( resizeCoefs && ( resizeCoefs[0] || resizeCoefs[1] ) ){
				parent.properties.functString += 
					sObj+'.size = ['+
						sObj + '.properties.Size[0]' + ( resizeCoefs[0] ? '+resize[0]' + (resizeCoefs[0]==1?'':'*'+resizeCoefs[0]) : '' ) + ',' +
						sObj + '.properties.Size[1]' + ( resizeCoefs[1] ? '+resize[1]' + (resizeCoefs[1]==1?'':'*'+resizeCoefs[1]) : '') +
					'];';
				// для resizeDynamicObject
				if( !parent.properties.SizeWatchString ){
					parent.properties.This = parent;
					parent.properties.SizeWatchString = 'var resize = [arguments[2][0]-arguments[1][0], arguments[2][1]-arguments[1][1]];';// arguments = [name, old, new]
					}
				parent.properties.SizeWatchString += 
					sThisObj+'.properties.Size = ['+
						sThisObj + '.properties.Size[0]' + ( resizeCoefs[0] ? '+resize[0]' + (resizeCoefs[0]==1?'':'*'+resizeCoefs[0]) : '' ) + ',' +
						sThisObj + '.properties.Size[1]' + ( resizeCoefs[1] ? '+resize[1]' + (resizeCoefs[1]==1?'':'*'+resizeCoefs[1]) : '') +
					'];';
				}
			if( moveCoefs && ( moveCoefs[0] || moveCoefs[1] ) ){ // в версии 2.2 этот блок был в конце предыдущего блока "if( !parent.properties.SizeWatchString ){", но были проблемы с динамическим перемещением
				var thisLocations = [
					sThisObj + '.properties.Location[0]' + ( moveCoefs[0] ? '+resize[0]' + (moveCoefs[0]==1?'':'*'+moveCoefs[0]) : '' ),
					sThisObj + '.properties.Location[1]' + ( moveCoefs[1] ? '+resize[1]' + (moveCoefs[1]==1?'':'*'+moveCoefs[1]) : '' )
					];
	//			if( moveCoefs[0] == 'center' ) thisLocations[0] = '(this.size[0]-'+sObj+'.size[0])/2';
	//			if( moveCoefs[1] == 'center' ) thisLocations[1] = '(this.size[1]-'+sObj+'.size[1])/2';
				parent.properties.SizeWatchString += sThisObj + '.properties.Location = [' + thisLocations.join(',') + '];';
				}
			parent.properties.functString += sObj+'.size = ' + sObj+'.size;';// повторно вызываем событие против запаздывания
			parent.watch( 'size', new Function( '', parent.properties.functString) );//обработчик добавляется во все контейнеры, в т.ч. и в window
			//======== isSeparator ============
			if( args.isSeparator.constructor == Number && index && index < obj.parent.children.length-1 ){
				var preObj = obj.parent.children[index-1];
				var nextObj = obj.parent.children[index+1];
				var dynamicSeparation = function( resize ){
					if( !resize || !resize[args.isSeparator] )
						return;
					if( preObj.size[args.isSeparator] < 20 )
						resize[args.isSeparator] = 20-preObj.size[args.isSeparator];
					else if( nextObj.size[args.isSeparator] < 20 ) 
						resize[args.isSeparator] = nextObj.size[args.isSeparator]-20;
					script.resizeDynamicObject( preObj, resize[0], resize[1] );//obj, onWidth, onHeight
					script.moveDynamicObject( obj, resize[0], resize[1] );//obj, onWidth, onHeight
					script.moveDynamicObject( nextObj, resize[0], resize[1] );//obj, onWidth, onHeight
					script.resizeDynamicObject(nextObj, -resize[0], -resize[1] );//obj, onWidth, onHeight
					}
				if( args.isSeparator )
					script.addMouseMove( { target: obj, direction: [0,1],  withFunct: dynamicSeparation, notMoveTarget: true } ); 
				else
					script.addMouseMove( { target: obj, direction: [1,0],  withFunct: dynamicSeparation, notMoveTarget: true } );
				obj.properties.moveSeparator = dynamicSeparation;
				}
			}
		function getStringForDynamicWindow(){
			if( windowMinSize ){// преобразуем windowMinSize
				if( windowMinSize.constructor != Array ) 
					windowMinSize = ['this.properties.Size[0]', 'this.properties.Size[1]'];
				else{
					windowMinSize = [
						windowMinSize[0] ? (windowMinSize[0] === true ? 'this.properties.Size[0]' : windowMinSize[0]) : false, 
						windowMinSize[1] ? (windowMinSize[1] === true ? 'this.properties.Size[1]' : windowMinSize[1]) : false
						];
					}
				}
			if( windowResizeDirections || windowMinSize ){
				var width = 'this.bounds[2]';//ширина
				if( windowResizeDirections && !windowResizeDirections[0] )
					width = 'this.bounds[0]+this.properties.Size[0]';
				else if( windowMinSize && windowMinSize[0] )
					width = 'this.bounds[0]+(this.size[0] < '+windowMinSize[0]+' ? '+windowMinSize[0]+' : this.size[0])';
				var height = 'this.bounds[3]';//ширина
				if( windowResizeDirections && !windowResizeDirections[1] )
					height = 'this.bounds[1]+this.properties.Size[1]';
				else if( windowMinSize && windowMinSize[1] )
					height = 'this.bounds[1]+(this.size[1] < '+windowMinSize[1]+' ? '+windowMinSize[1]+' : this.size[1])';
				return 'this.bounds = [this.bounds[0],this.bounds[1],'+width+','+height+'];';
				}
			return '';
			}
		
		}catch(err){ this.alertError(err) }
		}
	script.resizeDynamicObject = function( obj, onWidth, onHeight ){
		try{
			if( onWidth ){
				if( obj == obj.window ){
					this.resizeWindow( obj, 0, onWidth );// ( window, sizeIndex, value ){//sizeIndex: 0 - hor, 1 - vert
					obj.size = obj.size; // вызываем watch
//					obj.onResize();
					}
				else{
					var oldWidth = obj.size[0];
					obj.size = [obj.size[0]+onWidth, obj.size[1]];
					obj.size = obj.size; // вызываем watch
					obj.properties.Size = [obj.properties.Size[0]+(obj.size[0]-oldWidth), obj.properties.Size[1]];
					}
				}
			}catch(e){}
		try{
			if( onHeight ){
				if( obj == obj.window ){
					this.resizeWindow( obj, 1, onHeight );// ( window, sizeIndex, value ){//sizeIndex: 0 - hor, 1 - vert
					obj.size = obj.size; // вызываем watch
//					obj.onResize();
					}
				else{
					var oldHeight = obj.size[1];
					obj.size = [obj.size[0], obj.size[1]+onHeight];
					obj.size = obj.size; // вызываем watch
					obj.properties.Size = [obj.properties.Size[0], obj.properties.Size[1]+(obj.size[1]-oldHeight)];
					}
				}
			}catch(e){}
        }
	script.moveDynamicObject = function( obj, onWidth, onHeight ){
		try{
			if( obj == obj.window )
				return;
			if( onWidth ){
				var oldWidth = obj.location[0];
				obj.location = [obj.location[0]+onWidth, obj.location[1]];
				obj.properties.Location = [obj.properties.Location[0]+(obj.location[0]-oldWidth), obj.properties.Location[1]];
				}
			}catch(e){}
		try{
			if( onHeight ){
				var oldHeight = obj.location[1];
				obj.location = [obj.location[0], obj.location[1]+onHeight];
				obj.properties.Location = [obj.properties.Location[0], obj.properties.Location[1]+(obj.location[1]-oldHeight)];
				}
			}catch(e){}
        }
	}