// DoQueryList.jsx
// Программа для подготовки списка запросов, исполнения их и сохранения для использования в будущем.
// © Михаил Иванюшин, 2012-2016  ivanyushin#yandex.ru
// Инструкция по работе с программой размещена на сайте adobeindesign.ru
// Всплывающие подсказки на кнопках также помогут разобраться в работе скрипта.
//
// Благодарю Питера Карела (Peter Kahrel) /Великобритания/, Лорана Турньера (Laurent Tournier) /Франция/, 
// Жаннету Кат (Janneta Kat) /Германия/, Татьяну Прокофьеву (Россия) и Алексея Чмеля (Россия) 
// за помощь в переводе сообщений с русского на другие языки и участие в тестировании программы.
//
// I owe much to Peter Kahrel (Great Britain), Laurent Tournier (France), Janneta Kat (Germany), Tatiana Prokofieva (Russia), Alexey Chmel (Russia) 
// for help in translating and testing this script.
//
// Сообщения интерфейса на украинский язык перевёл Олег Мельник (https://www.behance.net/olehmelnyk).
//
// В версии 2018 для обработки отдельных файлов добавлен останов по отсутствию запроса, с выбором варианта -- продолжить или остановить работу.
// Для обработки всех файлов такого варианта нет.
//
//#target indesign
#targetengine "DoQueryList"

app.scriptPreferences.version = 12;


////  
myFastHelp = true; // true - выводится подсказка при наведении курсора на кнопку;  false -- если эти подсказки раздражают, их можно отключить.
mySavePosition = true; 
myOwnQueriesInAppFolder = false; 
// myOwnQueriesInAppFolder = false в этом случае для хранения очередного исполняемого запроса будет использоваться UserTextFolder или UserGrepFolder
// myOwnQueriesInAppFolder =true в этом случае для хранения очередного исполняемого запроса будет использоваться AppTextFolder или AppGrepFolder
defSelColor = [.65,.65,.65, 1]; // цвет фона кнопки, когда в её пространстве окажется курсор. Первые три числа: RGB, 0 - мин, 1 - макс.
defBgColor = [.9,.9,.9, 1]; // цвет, который приобретёт фон кнопки, когда курсор покинет её пространство. 
myFirstLockX = 177;
myFirstLockY= 177; 
var myLockX = myFirstLockX;
var myLockY = myFirstLockY;
var myLngInd = 0;
var myNamberOfLanguages = 5;
var showBritainFlag = true; //  showBritainFlag = true - британский флаг.  showBritainFlag = false -- американский флаг
var mySetQFile = "";
var myScrQFolder = "";
var mySpecFolderName = ""; // каталог, в котором хранится созданный или загруженный список запросов и папки с запросами
var myCurrentFileQName = "";
var myLastFileName = "";
var myFilePathQSave = "";
var myOwnTextQueryFolder = "";
var myOwnGrepQueryFolder = "";
var myNumberOfPendingQueries = 0;
var myAsteriskInQueryName;
var myRightWindowSaved = false;
var myQueryList;
var myQueInfo;
var firstCharIsPlus = false;
/*
индексы языка
0 - русский
1 - английский
2 - немецкий
3 - французский
4 - украинский

language indices
0 - russian language
1 - english language
2 - german language
3 - french language
4 - ukrainian language
*/ 

DataRF = "06.02.2020";
myCurrentEditionData_xx_xx_xxR = DataRF;
myCurrentEditionData_xx_xx_xxE = "February 6, 2020";
myCurrentEditionData_xx_xx_xxD = "6. Februar 2020";
myCurrentEditionData_xx_xx_xxF = DataRF;
myCurrentEditionData_xx_xx_xxU = "30 лютого 2020";

myCurrentEditionData = new Array (myCurrentEditionData_xx_xx_xxR,myCurrentEditionData_xx_xx_xxE,myCurrentEditionData_xx_xx_xxD,myCurrentEditionData_xx_xx_xxD,myCurrentEditionData_xx_xx_xxU);

myStartSpace = "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
myMes01R = myStartSpace + "Подготовка списка запросов и обработка им текста " +"(" +myCurrentEditionData_xx_xx_xxR +")";
myMes01E = myStartSpace + "Create Query List " + "(" + myCurrentEditionData_xx_xx_xxE +")";
myMes01D = myStartSpace + "Abfrage List vorbereiten" + " (" + myCurrentEditionData_xx_xx_xxD + ")";
myMes01F = myStartSpace + "Créer une liste de requêtes" + " (" + myCurrentEditionData_xx_xx_xxF + ")";
myMes01U = myStartSpace + "Підготовка списку запитів та обробка тексту " +"(" +myCurrentEditionData_xx_xx_xxU +")";

myMes02R = "Перед запуском программы поставьте курсор в текст для подготовки всей статьи к верстке.\nВыделите часть текста для обработки только её.";
myMes02E = "To process a story, place the cursor in the text. To process part of a story, select that text.";
myMes02D = "Bevor das Programm startet, soll der Kursor im Text stehen, um den ganzen Artikel zu bearbeiten.\nUm nur einen Textteil zu bearbeiten, soll er markiert werden.";
myMes02F = "Placez le point d'insertion dans le texte pour rechercher dans un article ou sélectionnez la portion de texte voulue.";
myMes02U = "Перед запуском програми поставте курсор в текст для обробки усієї статі.\nДля обробки тільки частини тексту виділіть тільки її.";

myMes03R = "Нет открытых документов.";
myMes03E = "No open documents.";
myMes03D = "Keine Dokumente offen.";
myMes03F = "Aucun document ouvert.";
myMes03U = "Немає відкритих документів.";
myAllLangMes03 = myMes03R + "\n" + myMes03E + "\n" + myMes03D + "\n" + myMes03F + "\n" + myMes03U; // на случай первого запуска, когда язык еще не определён, а уже надо сообщить, что нет открытых документов.

myMes04R = "Операции поиска-замены текста"
myMes04E = "Find-Change Text Actions"
myMes04D = "Text suchen-verändern"
myMes04F = "Requêtes Rechercher/Remplacer au format Texte "
myMes04U = "Операції пошуку/заміни тексту";

myMes05R = "Обработка текста grep-запросами"
myMes05E = "Find-Change GREP Actions"
myMes05D = "GREP Abfrage-Textbearbeitung"
myMes05F = "Requêtes Rechercher/Remplacer au format GREP"
myMes05U = "Обробка тексту GREP-запитами";

myMes06R = "Обработать текст"
myMes06E = "Process text"
myMes06D = "Text bearbeiten"
myMes06F = "Exécutez la requête"
myMes06U = "Обробити текст";

myMes07R = "Выполняются запросы, выбранные в правом окне. Очерёдность обработки списка — сверху вниз.\nЕсли запрос выполнен, слева него появится плюс.\nПовторный запуск или любые действия с запросами удалят символы '+', добавленные в строки при предыдущем успешном исполнении запросов."
myMes07E = "Execute selected queries.\nQueries that ran successfully are marked by a plus sign."
myMes07D = "Markierte Abfragen im rechten Fenster in der Reihenfolge von oben nach unten bearbeiten.\nWenn Operation erfolgreich ist, erscheint links +. ";
myMes07F = "Requêtes exécutées.\nLes requêtes excécutées avec succès sont précédées du signe +.";
myMes07U = "Виконуються запити, вибрані в правому вікні. Порядок виконання — зверху вниз.\nЯкщо запит виконано, зліва з'явиться плюс.\nПовторний запуск чи будь-які інші дії з запитами видалять символи '+', додані в рядки при попередньому успішному виконанні запитів.";

myMes08R = "Поместить запрос в список.\nЗапросы добавляются только по одному.\nДругой вариант переноса строки запроса из левого окна в правое — двойной щелчок на ней."
myMes08E = "Add a query to the list.\nQueries can be added by double-clicking as well."
myMes08D = "Abfrage in die Liste aufnehmen.\nAbfragen werden nur einzeln hinzugefügt.\nMan kann die Abfrage aus dem linken ins rechte Fenster dadurch bewegen, dass man ein Doppelklick macht.";
myMes08F = "Ajouter une requête à la liste.\nLes requêtes peuvent également être ajoutées par double-clic.";
myMes08U = "Додати запит до списку.\nЗапити додаються лише по одному.\nІнший варіант переносу рядка запиту із лівого вікна в праве — подвійний клік по ньому.";

myMes09R = "Переместить в правом окне выделенную строку вверх";
myMes09E = "Move selected line up";
myMes09D = "Die markierte Zeile im rechten Fenster soll nach oben versetzt werden";
myMes09F = "Déplacer vers le haut la ligne sélectionnée";
myMes09U = "Перемістити виділений рядок вгору";

myMes10R = "Переместить в правом окне выделенную строку вниз"
myMes10E = "Move selected line down"
myMes10D = "Die markierte Zeile im rechten Fenster soll nach unten versetzt werden";
myMes10F = "Déplacer vers le bas la ligne sélectionnée"
myMes10U = "Перемістити виділений рядок вниз";

myMes11R = "Удалить выделенные строки.\nДвойной щелчок мышкой удаляет только одну выделенную строку, на которой сейчас курсор.\nЭта кнопка также удаляет символы '+' перед названиями выполненных запросов."
myMes11E = "Remove selected lines.\nDouble-click to remove single lines."
myMes11D = "Markierte Zeilen sollen entfernt werden.\nDoppelklick mit der Maus entfernt nur die Zeile, auf der sich der Kursor gerade befindet.\nDieser Knopf entfernt auch Symbole '+' vor den Namen der erfolgreichen Abfragen."
myMes11F = "Supprimer les lignes sélectionnées.\nDouble-clic pour supprimer une seule ligne."
myMes11U = "Видалити виділені рядки.\nПодвійний клік мишею видалить лише один виділений рядок.\nЦя кнопка також видаляє символи '+' перед назвами виконаних запитів.";

myMes12R = "Сохранить этот список, присвоив ему имя.\nЕсли в этом имени первый символ '+' — будет создан каталог с таким же названием,\nи в нём сохранятся этот список и xml-файлы запросов."
myMes12E = "Save the list of queries.\nIf the name of the saved list is marked by +, the script creates a directory with this name and stores the list and the text and grep queries in it."
myMes12D = "Diese Liste unter einem Namen speichern.\nWenn das 1. Symbol in diesem Namen '+'  ist, wird ein Ordner mit demselben Namen erschaffen, darin werden diese Liste und xml-Abfragen-Dateien gespeichert."
myMes12F = "Enregistrer la liste des requêtes.\nSi le nom de la liste enregistrée est marquée du signe +, le script enregistre la liste et crée un répertoire portant ce nom et contenant la liste ainsi que les requêtes Texte et Grep."
myMes12U = "Зберегти цей список.\nЯкщо в імені перший символ '+' — буде створено папку з такою ж назвою, і в ній збережеться цей список та xml-файли запитів.";

myMes13R = "Загрузить подготовленный ранее список"
myMes13E = "Load queries"
myMes13D = "Vorbereitete Liste soll geladen werden"
myMes13F = "Charger les requêtes"
myMes13U = "Завантажити список";

myMes14R = "Закончить"
myMes14E = "Close"
myMes14D = "Beenden"
myMes14F = "Fermer "
myMes14U = "Завершити";

myMes15R = "Содержимое правого окна будет сохранено в файле #DoQueryList.startque, и загрузится при следующем запуске программы."
myMes15E = "The list of queries is saved in #DoQueryList.startque and will be loaded in next session."
myMes15D = "Inhalt im rechten Fenster wird in der Datei unter #DoQueryList.startque gespeichert und wird beim nächsten Start des Programms geladen."
myMes15F = "La liste des requête est enregistrée dans #DoQueryList.startque et peut être chargée au prochain lancement du script."
myMes15U = "Вміст правого вікна буде збережено в файлі #DoQueryList.startque, і завантажиться при наступному запуску скрипта.";

myMes16R = "Михаил Иванюшин"
myMes16E = "Mikhail Ivanyushin"
myMes16D = "Mikhail Ivanyuschin"
myMes16F = "Mikhail Ivaniuchin"
myMes16U = "Михаил Иванюшин"

myMes17R = "Дайте списку запросов поиска/замены осмысленное имя.\nПредлагаемое имя содержит дату и время создания файла.\nДля отказа от сохранения списка нажмите кнопку 'Cancel'."
myMes17E = "Use a correct name.\nThe default name contains the file's creation date and time."
myMes17D = "Geben Sie dieser Suche-Ersetze-Abfragenliste einen vernünftigen Namen.\nDer vorgeschlagene Name enthält das Datum und die Uhrzeit ihrer Erschaffung. Wenn Sie die Liste nicht speichern möchten, drücken Sie auf 'Cancel'."
myMes17F = "Utilisez un nom correct.\nLe nom par défaut contient la date et l'heure de création du fichier."
myMes17U = "Дайте списку пошуку/замінити осмислену назву.\nЗа промовчуванням назва містить дату та час створення файла.\nДля відмови від збереження списку натисніть кнопку 'Cancel'.";

myMes18R = "Список запросов поиска/замены сохранён в файле\n"
myMes18E = "List of queries is saved in file\n"
myMes18D = "Suche-Ersetze-Abfragenliste wurde in der Datei gespeichert\n"
myMes18F = "La liste des requêtes est sauvegardée dans le dossier\n"
myMes18U = "Список пошуку/заміни збережено в файл\n";

myMes19R = "Ошибка в структуре данных списка запросов.\nПервая буква может быть только T или G."
myMes19E = "There is an error in the query line.\nFirst letter must be T or G."
myMes19D = "Fehler in der Struktur der Abfragenliste. Der erste Buchstabe kann nur T oder G sein."
myMes19F = "Erreur dans la ligne de la requête.\nLa première lettre doit être T ou G."
myMes19U = "Помилка в структурі даних списку запитів.\nПерша буква може бути лише T або G.";

myMes20R = "Нет файлов с запросами поиска/замены"
myMes20E = "File with list of queries not found"
myMes20D = "Es gibt keine Dateien mit Suche-Ersetze-Abfragen"
myMes20F = "Le dossier contenant la liste des requêtes n'a pas été trouvé"
myMes20U = "Немає файлів пошуку/заміни";

myMes21R = "Файлы запросов поиска/замены"
myMes21E = "Lists with queries"
myMes21D = "Dateien der Suche-Ersetze-Abfragen "
myMes21F = "Listes des requêtes"
myMes21U = "Файли пошуку/заміни";

myMes22R = "Не удалось прочитать выбранный файл с запросами поиска/замены"
myMes22E = "Can't read selected file"
myMes22D = "Markierte Datei mit Suche-Ersetze-Abfragen konnte nicht gelesen werden"
myMes22F = "Le fichier sélectionné ne peut pas être lu"
myMes22U = "Не вдалось прочитати вибраний файл";

myMes23R = "В правом окне не выбрано ни одного запроса"
myMes23E = "Please select some lines"
myMes23D = "Keine Abfrage wurde im rechten Fenster ausgewählt"
myMes23F = "Veuillez sélectionner une ligne"
myMes23U = "В правому вікні не вибрано жодного запиту";

myMes24R = "Перед запуском программы поставьте курсор в текст для подготовки всей статьи к верстке.\nВыделите часть текста для обработки только её."
myMes24E = "Before running the script, place the cursor in the text to process the whole story.\nTo process a part of text, select some text."
myMes24D = "Bevor das Programm startet, soll der Cursor im Text stehen, um den ganzen Artikel zu bearbeiten. Um nur einen Textteil zu bearbeiten, soll er markiert werden." 
myMes24F = "Avant de lancer le script, placez le point d'inserion dans le texte pour rechercher dans un article.\nOu sélectionnez la portion de texte voulue."
myMes24U = "Перед запуском програми поставте курсор в текст для обробки усієї статі.\nДля обробки тільки частини тексту виділіть тільки її.";

myMes25R = "Встречен неучтённый в программе вариант выделения текста.\n"
myMes25E = "Selection not recognised.\n"
myMes25D = "Unzulässige Textmarkierung.\n"
myMes25F = "Sélection non reconnue.\n"
myMes25U = "Некоректне виділення.\n";

myMes26R ="Не найден запрос: "
myMes26E ="Query not found: "
myMes26D ="Abfrage nicht gefunden: "
myMes26F ="Requête introuvable: "
myMes26U = "Не знайдено запит: ";

myMes27R = "У вас нет полномочий помещать файлы и создавать каталоги в папке, где размещён этот скрипт.\nПопросите администратора дать полный доступ."
myMes27E = "You have no rights to write in directory where placed this script.\nAsk admin to give you full access to this directory."
myMes27D = "Sie haben keine Berechtigung stellen Dateien, und erstellen Sie die Verzeichnisse, in dem Ordner, wo Sie platziert werden das Skript. Bitten Sie Ihren Administrator, geben vollen Zugriff."
myMes27F = "Vous n'êtes pas autorisé à écrire dans le répertoire contenant le script.\nVeuillez en demander l'autorisation à l'administrateur."
myMes27U = "У вас немає прав на створення/переміщення файлів в папці, де розміщено цей скрипт.\nПопросіть адміністратора дати вам повний доступ.";

myMes28R = "В правом окне ничего нет."
myMes28E = "Right window is empty"
myMes28D = "Im rechten Fenster gibt es nichts"
myMes28F = "La fenêtre droite est vide"
myMes28U = "В правому вікні порожньо.";

myMes29R = "Перечень операций, включающий пользовательские запросы, должeн быть сохранён в отдельном каталоге.\nДля этого имя файла списка запросов должно начинаться со знака '+'."
myMes29E = "List with users queries must be saved in separate folder.\nFor do this, the name of list must be started by '+'."
myMes29D = "Benutzer-Abfragenliste soll in einem separaten Ordner gespeichert werden.\nDie Ordnerbezeichnung soll mit einem  '+' anfangen."
myMes29F = "La liste des requêtes personnalisées doit être sauvegardée dans un dossier séparé. Pour ce faire, le nom de la liste doit commencer par le signe +."
myMes29U = "Перелік операцій, що включає користувацькі запити, потрібно зберегти в окремому каталозі.\nДля цього назва файлу списка запитів повинна починатись з символа '+'.";

myMes30R = "Не найден указанный в списке запросов файл\n"
myMes30E = "File specified in query list not found\n"
myMes30D = "Datei der Abfragen List ist nicht gefunden\n"
myMes30F = "Le fichier indiqué dans la requête n'a pas été trouvé\n"
myMes30U = "Не знайдено вказаний в списку запитів файл\n";

myMes31aR = "Не удалось перенести пользовательский файл запроса\n"
myMes31aE = "Attempt to move query file\n"
myMes31aD = "Der Versuch, die Datei\n"
myMes31aF = "Le fichier des requêtes personnalisées\n"
myMes31aU = "Не вдалось перенести користувацький файл запитів\n";

myMes31bR = "\nв каталог\n"
myMes31bE = "\nin folder\n"
myMes31bD = "\nzum Katalog\n"
myMes31bF = "\nn'a pas pu être déplacé dans le dossier\n"
myMes31bU = "\nв папку\n"

myMes31cR = "\nВозможно, пользователю не предоставлено право полного доступа ка этому каталогу."
myMes31cE = "\nwas unsuccessful.\nDo you have administrative right to write in this folder?"
myMes31cD = "\nzu verlegen ist nicht gelungen.\nHaben Sie Verwaltungsrechte der Aufzeichnung in diesen Katalog?"
myMes31cF = "\nAvez-vous les droits d'administrateur pour écrire dans ce dossier?"
myMes31cU = "\nМожливо, користувач не має прав доступу до цієї папки.";

myMes32R = "Число невыполненных запросов: "
myMes32E = "Number of unprocessed queries: "
myMes32D = "Die Zahl der unerfüllten Anfragen: "
myMes32F = "Nombre des requêtes ayant échoué: "
myMes32U = "Невиконаних запитів: ";

myMes33R = "Обработка"
myMes33E = "Processing"
myMes33D = "Verarbeitung"
myMes33F = "Traitement"
myMes33U = "Обробка"

var myMes01 = new Array ( myMes01R,myMes01E,myMes01D,myMes01F,myMes01U);
var myMes02 = new Array ( myMes02R,myMes02E,myMes02D,myMes02F,myMes02U);
var myMes03 = new Array ( myAllLangMes03);
var myMes04 = new Array ( myMes04R,myMes04E,myMes04D,myMes04F,myMes04U);
var myMes05 = new Array ( myMes05R,myMes05E,myMes05D,myMes05F,myMes05U);
var myMes06 = new Array ( myMes06R,myMes06E,myMes06D,myMes06F,myMes06U);
var myMes07 = new Array ( myMes07R,myMes07E,myMes07D,myMes07F,myMes07U);
var myMes08 = new Array ( myMes08R,myMes08E,myMes08D,myMes08F,myMes08U);
var myMes09 = new Array ( myMes09R,myMes09E,myMes09D,myMes09F,myMes09U);
var myMes10 = new Array ( myMes10R,myMes10E,myMes10D,myMes10F,myMes10U);
var myMes11 = new Array ( myMes11R,myMes11E,myMes11D,myMes11F,myMes11U);
var myMes12 = new Array ( myMes12R,myMes12E,myMes12D,myMes12F,myMes12U);
var myMes13 = new Array ( myMes13R,myMes13E,myMes13D,myMes13F,myMes13U);
var myMes14 = new Array ( myMes14R,myMes14E,myMes14D,myMes14F,myMes14U);
var myMes15 = new Array ( myMes15R,myMes15E,myMes15D,myMes15F,myMes15U);
var myMes16 = new Array ( myMes16R,myMes16E,myMes16D,myMes16F,myMes16U);
var myMes17 = new Array ( myMes17R,myMes17E,myMes17D,myMes17F,myMes17U);
var myMes18 = new Array ( myMes18R,myMes18E,myMes18D,myMes18F,myMes18U);
var myMes19 = new Array ( myMes19R,myMes19E,myMes19D,myMes19F,myMes19U);
var myMes20 = new Array ( myMes20R,myMes20E,myMes20D,myMes20F,myMes20U);
var myMes21 = new Array ( myMes21R,myMes21E,myMes21D,myMes21F,myMes21U);
var myMes22 = new Array ( myMes22R,myMes22E,myMes22D,myMes22F,myMes22U);
var myMes23 = new Array ( myMes23R,myMes23E,myMes23D,myMes23F,myMes23U);
var myMes24 = new Array ( myMes24R,myMes24E,myMes24D,myMes24F,myMes24U);
var myMes25 = new Array ( myMes25R,myMes25E,myMes25D,myMes25F,myMes25U);
var myMes26 = new Array ( myMes26R,myMes26E,myMes26D,myMes26F,myMes26U);
var myMes27 = new Array ( myMes27R,myMes27E,myMes27D,myMes27F,myMes27U);
var myMes28 = new Array ( myMes28R,myMes28E,myMes28D,myMes28F,myMes28U);
var myMes29 = new Array ( myMes29R,myMes29E,myMes29D,myMes29F,myMes29U);
var myMes30 = new Array ( myMes30R,myMes30E,myMes30D,myMes30F,myMes30U);
var myMes31a = new Array ( myMes31aR,myMes31aE,myMes31aD,myMes31aF,myMes31aU);
var myMes31b = new Array ( myMes31bR,myMes31bE,myMes31bD,myMes31bF,myMes31bU);
var myMes31c = new Array ( myMes31cR,myMes31cE,myMes31cD,myMes31cF,myMes31cU);
var myMes32 = new Array ( myMes32R,myMes32E,myMes32D,myMes32F,myMes32U); 
var myMes33 = new Array ( myMes33R,myMes33E,myMes33D,myMes33F,myMes33U);
///////////////////  

function main() { // main
var myProgramTitul = myMes01[myLngInd]; // " Подготовка списка запросов и обработка им текста " +"(версия " +myCurrentVersionData_xx_xx_xx +" )";
var myDefSetName = "#DoQueryList.startque" // это стандартный файл с установками предыдущего запуска скрипта
var mySpecialName;
var myStartOfFragment;
var myEndOfFragment;
var myText;
var mySearchMask;
var myQueIsProcessed = false;
///
var mySavedQueryList = new Array;
var myQueCntr;
/// шрифт диалогов
var dialogFont = File.fs == "Macintosh" ? "Lucida Grande" : "Verdana";
///
//  Выбор цвета информационной строки меню
blueClr =  [0.0,0.0,1.0]; // синий цвет
blackClr = [0.0,0.0,0.0]; // чёрный цвет
redClr = [1.0,0.0,0.0]; // красный цвет
greenClr = [0.0,1.0,0.0]; // зелёный цвет
whiteClr = [1.0,1.0,1.0]; // белый цвет
var myMenuColor = blackClr;  
///
defSelColor = [.65,.65,.65, 1]; // цвет фона кнопки, когда в её пространстве окажется курсор. Первые три числа: RGB, 0 - мин, 1 - макс.
//defBgColor = [.9,.9,.9, 1]; // цвет, который приобретёт фон кнопки, когда курсор покинет её пространство. [ до CC 2014 — светлый вариант интерфейса программы ]
defBgColor = [.29,.29,.29, 1]; // цвет, который приобретёт фон кнопки, когда курсор покинет её пространство.  [ CC 2015 — тёмный вариант интерфейса программы ]
// при необходимости их можно изменить
//*/

////>>>> темный экран / светлый экран >>>>>
// defSelColor: цвет фона кнопки, когда в её пространстве окажется курсор. Первые три числа: RGB, 0 - мин, 1 - макс.
// defBgColor:  цвет, который приобретёт фон кнопки, когда курсор покинет её пространство.
try {
    var uiBr = app.generalPreferences.uiBrightnessPreference;
    }
catch (e) {  // до СС темного варианта интерфейса не было
    uiBr = 0.6;
    }
if (uiBr > 0.67) {     
    defBgColor = [.95,.95,.95, 1];  defSelColor = [.25,.25,.25, 1];     
    }
else if (uiBr < 0.67 && uiBr >= 0.51) { 
    defBgColor = [.7,.7,.7, 1]; defSelColor = [.3,.3,.3, 1]; 
    }
else if (uiBr >= 0.33 && uiBr < 0.51) { 
    defBgColor = [.34,.34,.34, 1];  defSelColor = [.66,.66,.66, 1]; 
    }
else {
    /* if (uiBr == 0) */ defBgColor = [.2,.2,.2, 1];  defSelColor = [.8,.8,.8, 1];
    }
if (uiBr < 0.51) myMenuColor = whiteClr;  
////>>>> темный экран / светлый экран >>>>>

if(app.documents.length == 0) {
    alert(myMes03, myProgramTitul); // "Нет открытых документов."
    exit();    
    }
var mySelection = app.selection[0];
var myDocument = app.documents.item(0);

if (mySelection == undefined || ((mySelection.constructor.name != "InsertionPoint") && (mySelection.constructor.name != "Text") && (mySelection.constructor.name != "Paragraph") && (mySelection.constructor.name != "TextStyleRange"))) {
    alert(myMes02, myProgramTitul); // "Перед запуском программы поставьте курсор в текст для подготовки всей статьи к верстке.\nВыделите часть текста для обработки только её."	
    exit();
    }
var myScriptFile = myGetScriptPath();
var myScriptFolder = decodeURI(myScriptFile.path);
var myFilePath = decodeURI(myScriptFolder + "/" + myDefSetName);
var mySetFile = File (myFilePath);
if (mySetFile.exists) { //File.exists
mySetFile.open("r");
myLastFileName = mySetFile.readln(); // полный маршрут к myFilePathQSave
var myLngIndTry = mySetFile.readln(); //  язык диалога
myLockX = mySetFile.readln(); // координата Х
myLockY = mySetFile.readln(); //  // координата Y
mySetFile.close();
var mySetQFile = File (myLastFileName);
if (mySetQFile.exists) { // mySetQFile.exists
myGetQueryListFromFile(mySetQFile);    
} // mySetQFile.exists
if (myLngIndTry >= 0 && myLngIndTry < myNamberOfLanguages) myLngInd = myLngIndTry;
} // File exists
if (mySavePosition == true) {
    if (myLockX > 32767)  myLockX = -(65535 - myLockX); 
    else if (myLockX == 0)  myLockX = myFirstLockX;
    if (myLockY > 32767)  myLockY =  -(65535 - myLockY); 
    else if (myLockY == 0)  myLockY =  myFirstLockY;
}
///
function makeImageButton (myPngButton, buttonBorder, buttonInset, winLink, imageButtonAction) { // makeImageButton
// InDesign CC Flag
const CC_FLAG = +(9 <= parseFloat(app.version));
///
// ScriptUI Image Offset Fixer in InDesign CS6 and earlier
// (This bug has been solved in CC i.e. ScriptUI 6.2.x)
const FIX_OFFSET = CC_FLAG ? 0 : 1;
///
// Force an Image widget to repaint (= onDraw trigger)
// CS4-CS6  ->  just reassigning this.size
// CC             ->  we need to temporarily *change* the size
// Note: using layout.layout(1) would not work anymore in CC
// ---
// Create the UI
if (buttonBorder) var winImageButton = winLink.add("panel");
else var winImageButton = winLink.add("group");
imageButton = winImageButton.add('image', undefined, myPngButton);
imageSize = imageButton.image.size;
Image.prototype.refresh = CC_FLAG ?
	function() {
		var wh = this.size;
		this.size = [1+wh[0], 1+wh[1]];
		this.size = [wh[0], wh[1]];
		wh = null;
	}:
	function() { this.size = [this.size[0],this.size[1]]; };
// Window settings
winImageButton.margins = buttonInset;
winImageButton.alignChildren = ['center','center'];
imageButton.size = [imageSize[0], imageSize[1]];
imageButton.onDraw = function() {
     var dy = 0 + FIX_OFFSET;
	this.graphics.drawImage(this.image, 0,-dy);
    // winLink.graphics.backgroundColor = winLink.graphics.newBrush(0, [.92,.94,.96,1]);
    };
var mouseEventHandler = function(ev) { // mouseEventHandler
	if (ev.type == 'mouseover' )  winImageButton.graphics.backgroundColor = winImageButton.graphics.newBrush(0, defSelColor);
    //else winImageButton.graphics.backgroundColor = winImageButton.graphics.newBrush(0, [.92,.94,.96,1]); 
    else winImageButton.graphics.backgroundColor = winImageButton.graphics.newBrush(0, defBgColor);      
	this.refresh();
    } // mouseEventHandler
///
imageButton.addEventListener('mouseover', mouseEventHandler);
imageButton.addEventListener('mousedown', mouseEventHandler);
imageButton.addEventListener('mouseup', mouseEventHandler);
imageButton.addEventListener('mouseout', mouseEventHandler);
// Let's go!
imageButton.addEventListener('click', function() { imageButtonAction() } );
///
return imageButton;
} // makeImageButton
///
var myWin = myScriptWindow();
//=================
function myScriptWindow() { // myScriptWindow
//var w = new Window ("palette", myProgramTitul, undefined, {closeButton: true}); // myMes01
var w = new Window ("palette", myMes01[myLngInd], undefined, {closeButton: true}); // 
w.helpTip = decodeURI(myLastFileName); 
w.alignChildren = "right";
var myBtnAdd = File (decodeURI(myScriptFolder + "/Picts/" + "AddBtn.png"));
var myBtnUp = File (decodeURI(myScriptFolder + "/Picts/" + "ArrowUp.png"));
var myBtnDn = File (decodeURI(myScriptFolder + "/Picts/" + "ArrowDwn.png"));
var myBtnDel = File (decodeURI(myScriptFolder + "/Picts/" + "DelBtn.png"));
var mySaveBtn =  File (decodeURI(myScriptFolder + "/Picts/" + "DataOut.png"));
var myLoadBtn =  File (decodeURI(myScriptFolder + "/Picts/" + "DataIn.png"));
var myInfo16 = File (decodeURI(myScriptFolder + "/Picts/" + "InfoPict.png"));
var myRussiaFlag =  File (decodeURI(myScriptFolder + "/Picts/" + "Russian Federation.png"));
var myGreatBritainFlag =  File (decodeURI(myScriptFolder + "/Picts/" + "Great Britain.png"));
var myUSAFlag =  File (decodeURI(myScriptFolder + "/Picts/" + "USA.png"));
var myGermanyFlag =  File (decodeURI(myScriptFolder + "/Picts/" + "Germany.png"));
var myFranceFlag =  File (decodeURI(myScriptFolder + "/Picts/" + "France.png"));
var myUkraineFlag =  File (decodeURI(myScriptFolder + "/Picts/" + "Ukraine.png"));

myFlagArray = new Array (myRussiaFlag, myGreatBritainFlag, myGermanyFlag, myFranceFlag, myUkraineFlag);
myFlagInfo = new Array ("Русский язык", "English", "Deutsch", "Français", "Українська мова");
myWelcomeInfo = new Array ("youtube.com\nЗаходите! Тут много информации по работе в InDesign", "Welcome to my youtube channel!", "Willkommen in youtube.com!", "Bienvenue à youtube.com !", "adobeindesign.ru\nЗагляньте! Тут багато інформації по роботі в InDesign");

w.alignChildren = "left";
mySizeOfThreeButtons = [0,0,67,25];
var myTreeAndList =  w.add ("group");
myTreeAndList.orientation = "row";
var q_options = myTreeAndList.add ("group", undefined, "");
q_options.alignChildren = ["fill", "fill"];
var myTree = q_options.add ( "treeview", [0,0,390,350]);
var myUserTextFolder = Folder(app.scriptPreferences.scriptsFolder.parent.parent + "/Find-Change Queries/Text/");
var myUserGrepFolder = Folder(app.scriptPreferences.scriptsFolder.parent.parent + "/Find-Change Queries/Grep/");
if (parseInt (app.version) == 5) {
    var myAppTextFolder = Folder (app.filePath + "/Presets/Find-Change Queries/Text/");
    var myAppGrepFolder = Folder (app.filePath + "/Presets/Find-Change Queries/Grep/");
}
else {
    var myAppTextFolder = Folder (app.filePath + "/Presets/Find-Change Queries/Text/" + $.locale);
    var myAppGrepFolder = Folder (app.filePath + "/Presets/Find-Change Queries/Grep/" + $.locale);
}
var myTQ = myTree.add("node", myMes04[myLngInd]); // "Операции поиска-замены текста"
myTextQueSources = [decodeURI(myAppTextFolder) + "/", decodeURI(myUserTextFolder) + "/"];
myGrepQueSources = [decodeURI(myAppGrepFolder) + "/", decodeURI(myUserGrepFolder) + "/"];
if (myTextQueSources.length > 0) { // myTextQueSources.length > 0
for (i = 0;  i < myTextQueSources.length;  i++) { // i < myTextQueSources.length
var myNodeT = myTQ.add("node", myTextQueSources[i]);
var myTxtDir = new Folder(myTextQueSources[i]);
var myListQ1 = myTxtDir.getFiles("*.xml");
var myArrT = [];
for (t = 0; t < myListQ1.length; t++) { // t < myListQ1.length
     myArrT = decodeURI(myListQ1[t]).split("/");
     myNodeT.add("item",myArrT[myArrT.length-1]);    
    } // t < myListQ1.length
} // i < myTextQueSources.length
} // myTextQueSources.length > 0
myQueryList = myTreeAndList.add ("listbox", [0,0,255,350],undefined,{multiselect: true});
for (i = 0; i < myQueCntr; i++)  {
    myQueryList.add("item",mySavedQueryList[i]);
    myQueryList.selection = myQueryList.items[i]; // выделяем вставленную строку
    }
if (myGrepQueSources.length > 0) { // myGrepQueSources.length
var myGQ = myTree.add("node", myMes05[myLngInd]); // "Обработка текста grep-запросами"
for (i = 0;  i < myGrepQueSources.length;  i++) { // i < myGrepQueSources.length
var myNodeG = myGQ.add("node", myGrepQueSources[i]);
var myGrpDir = new Folder(myGrepQueSources[i]);
var myListQ2 = myGrpDir.getFiles("*.xml");
var myArrG = [];
for (t = 0; t < myListQ2.length; t++) { // t < myListQ2.length
     myArrG = decodeURI(myListQ2[t]).split("/");
     myNodeG.add("item",myArrG[myArrG.length-1]);    
    } // t < myListQ2.length
} //  i < myGrepQueSources.length
} // myGrepQueSources.length
///
myTree.onDoubleClick = function() { // myTree.onDoubleClick
myQueryList.selection = null;
try { 
    if (myTree.selection.type == "node") return; 
    } 
catch (e) {return;}
myRemovePlusMarkersInRightList(myQueryList);
var mySelectedLine = String(myTree.selection.parent);
if (mySelectedLine.indexOf("/Find-Change Queries/GREP/") != -1 || mySelectedLine.indexOf("/Find-Change Queries/Grep/") != -1) { 
    myQueryList.add("item","G: " + String(myTree.selection));
    return; 
    }
if (mySelectedLine.indexOf("/Find-Change Queries/Text/") != -1) {
    myQueryList.add("item", "T: " + String(myTree.selection)); 
    return; 
    }
return;
} // myTree.onDoubleClick
///
//===========================
var myAllButtonsAndCopyrightInfo = w.add ("panel");
myAllButtonsAndCopyrightInfo.orientation = "row";
var myFlag = makeImageButton (myFlagArray[myLngInd], true, 4, myAllButtonsAndCopyrightInfo, myFlagOnClick);
myFlag.helpTip = myFlagInfo[myLngInd];
var myWelcomeToSiteInfo = makeImageButton (myInfo16, true, 4, myAllButtonsAndCopyrightInfo, myWelcomeToSiteInfOnClick);

var myOkAndCancelButtons = myAllButtonsAndCopyrightInfo.add ("group");
myOkAndCancelButtons.orientation = "row";
myOkAndCancelButtons.alignChildren = ["fill", "fill"];
myEmptySpace = [0,0,0,25];
myButtonOKSize = [0,0,145,25];
myButtonCancelSize = [0,0,126,25];

myOkAndCancelButtons.add ("statictext",undefined,"\u00A0\u00A0\u00A0");
//myWelcomeToSiteInfo.helpTip = myWelcomeInfo[myLngInd];
myOKButton = myOkAndCancelButtons.add ("button",myButtonOKSize , myMes06[myLngInd], {name: "ok"}); // "Обработать текст"
myOKButton.helpTip = (myFastHelp == true) ? myMes07[myLngInd] : ""; // "Выполняются запросы, выбранные в правом окне. Очерёдность обработки списка — сверху вниз.\nЕсли запрос выполнен, слева него появится плюс.\nПовторный запуск или любые действия с запросами удалят символы '+', добавленные в строки при предыдущем успешном исполнении запросов."
myOkAndCancelButtons.add ("statictext",myEmptySpace,"");
var myGetQueriesButton = makeImageButton (myBtnAdd, true, 4, myAllButtonsAndCopyrightInfo, myGetQueriesButtonOnClick);
myGetQueriesButton.helpTip = (myFastHelp == true) ? myMes08[myLngInd] : ""; // "Поместить запрос в список.\nЗапросы добавляются только по одному.\nДругой вариант переноса строки запроса из левого окна в правое — двойной щелчок на ней."
var myUpButton = makeImageButton (myBtnUp, true, 4, myAllButtonsAndCopyrightInfo, myUpButtonOnClick);
myUpButton.helpTip = (myFastHelp == true) ? myMes09[myLngInd] : ""; //"Переместить в правом окне выделенную строку вверх."
var myDnButton = makeImageButton (myBtnDn, true, 4, myAllButtonsAndCopyrightInfo, myDnButtonOnClick);
myDnButton.helpTip = (myFastHelp == true) ? myMes10[myLngInd] : ""; //"Переместить в правом окне выделенную строку вниз."
var myDelButton = makeImageButton (myBtnDel, true, 4, myAllButtonsAndCopyrightInfo, myDelButtonOnClick);
myDelButton.helpTip = (myFastHelp == true) ? myMes11[myLngInd] : ""; // "Удалить выделенные строки.\nДвойной щелчок мышкой удаляет только одну выделенную строку, на которой сейчас курсор.\nЭта кнопка также удаляет символы '+' перед названиями выполненных запросов."

var mySaveSetButton = makeImageButton (mySaveBtn, true, 4, myAllButtonsAndCopyrightInfo, mySaveSetButtonOnClick);
mySaveSetButton.helpTip = (myFastHelp == true) ? myMes12[myLngInd] : ""; // "Сохранить этот список, присвоив ему имя.\nЕсли в этом имени первый символ '+'  — кроме сохранения списка будет создан каталог с таким же названием,\nи в нём сохранятся этот список и xml-файлы запросов."

var myLoadSetButton = makeImageButton (myLoadBtn, true, 4, myAllButtonsAndCopyrightInfo, myLoadSetButtonOnClick);
myLoadSetButton.helpTip = (myFastHelp == true) ? myMes13[myLngInd] : ""; //"Загрузить подготовленный ранее список."

myOkAndCancelButtons.add ("statictext",myEmptySpace,"");
myCancelButton = myOkAndCancelButtons.add ("button", myButtonCancelSize, myMes14[myLngInd], {name: "cancel"}); // "Закончить работу"
myCancelButton.helpTip = (myFastHelp == true) ? myMes15[myLngInd] : ""; //"Содержимое правого окна будет сохранено в файле #DoQueryList.startque, и загрузится при следующем запуске программы."
var myButtonAndInfo = w.add("group");
myButtonAndInfo.orientation = "row";
var myMessage = myButtonAndInfo.add ("statictext",[0,0,500,15]);
//myMessage.alignChildren = "right";
myMessage.text = "DoQueryList (" + myCurrentEditionData[myLngInd] + ") | © " + myMes16[myLngInd] + " | adobeindesign.ru"; // Михаил Иванюшин
myMessage.graphics.font = dialogFont + ":9";
////
function myWelcomeToSiteInfOnClick () { // mySiteButton.onClick
openInBrowser("www.youtube.com/channel/UCtczfbU05JhqYGRoYwoLJgg");
} // mySiteButton.onClick    
////

function myFlagOnClick () { // myFlag.onClick
myLngInd++;
myLngInd = myLngInd%myNamberOfLanguages;
if (myLngInd == 1) { // myLngInd == 1
    if (showBritainFlag == true) {
        myFlag.icon = myGreatBritainFlag;
        showBritainFlag = false;
        }
    else {
        myFlag.icon = myUSAFlag;
        showBritainFlag = true; 
        }
    } //myLngInd == 1
else myFlag.icon = myFlagArray[myLngInd];
myFlag.helpTip = myFlagInfo[myLngInd];
myWelcomeToSiteInfo.helpTip = myWelcomeInfo[myLngInd]; 
myProgramTitul = myMes01[myLngInd];
w.text = myMes01[myLngInd];
myTQ.text = myMes04[myLngInd];
myGQ.text = myMes05[myLngInd];
myOKButton.text = myMes06[myLngInd];
myOKButton.helpTip = (myFastHelp == true) ? myMes07[myLngInd] : "";
myGetQueriesButton.helpTip = (myFastHelp == true) ? myMes08[myLngInd] : "";
myUpButton.helpTip = (myFastHelp == true) ? myMes09[myLngInd] : "";
myDnButton.helpTip = (myFastHelp == true) ? myMes10[myLngInd] : "";
myDelButton.helpTip = (myFastHelp == true) ? myMes11[myLngInd] : "";
mySaveSetButton.helpTip = (myFastHelp == true) ? myMes12[myLngInd] : "";
myLoadSetButton.helpTip = (myFastHelp == true) ? myMes13[myLngInd] : "";
myCancelButton.text = myMes14[myLngInd];
myCancelButton.helpTip = (myFastHelp == true) ? myMes15[myLngInd] : "";
myMessage.text = "DoQueryList (" + myCurrentEditionData[myLngInd]  + ") | © " + myMes16[myLngInd] + " | adobeindesign.ru";
} // myFlag.onClick
/////
myCancelButton.onClick = function() { // myCancelButton.onClick
myRemovePlusMarkersInRightList(myQueryList);
var myFilePathQuSave= decodeURI(myScriptFolder + "/" + myDefSetName);
var myQueSetSave = new File (myFilePathQuSave);
tt = myQueSetSave.open("w");
if (tt == false) { alert(myMes27[myLngInd] +" [1]", myProgramTitul); exit(); }
myQueSetSave.writeln(myFilePathQSave);
var myCurWinLock = new Array;
myCurWinLock = w.location;
myQueSetSave.writeln(myLngInd);
myQueSetSave.writeln(myCurWinLock[0]);
myQueSetSave.writeln(myCurWinLock[1]);
//myQueSetSave.writeln(mySetQFile);
myQueSetSave.close();
w.close();
exit();
} // myCancelButton.onClick
///
myQueryList.onDoubleClick = function() { // myQueryList.onDoubleClick # Remove
if (myQueryList.selection == null) return; // ничего не выбрано, а кнопка нажата
myRemovePlusMarkersInRightList(myQueryList);
if (myQueryList.selection.length > 1) return; // удаляем только по одной строке
myQueryList.remove (myQueryList.selection[0]);
} // myQueryList.onDoubleClick # Remove
///
function myDelButtonOnClick () { // myDelButton.onClick
if (myQueIsProcessed == true)  { myRemovePlusMarkersInRightList(myQueryList); return; }
if (myQueryList.selection == null) return; // ничего не выбрано, а кнопка нажата
myRemovePlusMarkersInRightList(myQueryList);
for (k = myQueryList.selection.length-1; k >= 0; k--) { // k = myQueryList.selection.length
    myQueryList.remove (myQueryList.selection[k]);
    } // k = myQueryList.selection.length
}  // myDelButton.onClick
///
function myGetQueriesButtonOnClick () { // myGetQueriesButton.onClick
myRemovePlusMarkersInRightList(myQueryList);
myQueryList.selection = null;
try { if (myTree.selection.type == "node") return; } catch (e) {return;}    
var mySelectedLine = String(myTree.selection.parent);
if (mySelectedLine.indexOf("/Find-Change Queries/GREP/") != -1 || mySelectedLine.indexOf("/Find-Change Queries/Grep/") != -1) { 
    myQueryList.add("item","G: " + String(myTree.selection));
    return; 
    }
if (mySelectedLine.indexOf("/Find-Change Queries/Text/") != -1) {
    myQueryList.add("item", "T: " + String(myTree.selection)); 
    return; 
    }
return;
} // myGetQueriesButton.onClick
////
function myUpButtonOnClick () { // myUpButton.onClick
if (myQueryList.selection == null) return; // ничего не выбрано, а кнопка нажата  
myRemovePlusMarkersInRightList(myQueryList);
if (myQueryList.selection.length > 1) return; // перемещается только одна строка
var mySelIndex = myQueryList.selection[0].index;
if (mySelIndex == 0) return;
var myPrevIndex = mySelIndex;
myPrevIndex--;
myQueryList.selection = null; // снимем выделение, иначе в списке из-за активной опции multiselect: true будут две выделенных строки
var myTmpL = myQueryList.items[myPrevIndex].text;
myQueryList.items[myPrevIndex].text = myQueryList.items[mySelIndex].text;
myQueryList.items[mySelIndex].text = myTmpL;
myQueryList.selection = [myPrevIndex];
} //  myUpButton.onClick
///
function myDnButtonOnClick () { // myDnButton.onClick
if (myQueryList.selection == null) return; // ничего не выбрано, а кнопка нажата    
myRemovePlusMarkersInRightList(myQueryList);
if (myQueryList.selection.length > 1) return; // перемещается только одна строка
var mySelIndex = myQueryList.selection[0].index;
if (mySelIndex == myQueryList.items.length - 1) return;
var myNextIndex = mySelIndex;
myNextIndex++;
myQueryList.selection = null;
var myTmpL = myQueryList.items[myNextIndex].text;
myQueryList.items[myNextIndex].text = myQueryList.items[mySelIndex].text;
myQueryList.items[mySelIndex].text = myTmpL;
myQueryList.selection = [myNextIndex];
} //  myDnButton.onClick
///
function mySaveSetButtonOnClick () { // mySaveSetButton.onClick 
if (myQueryList.items.length == 0) {
    alert (myMes28[myLngInd], myProgramTitul); // "В правом окне ничего нет"
    return;
} //  myQueList.length == 0
myRemovePlusMarkersInRightList(myQueryList);
var myDateF = new Date;
var myDayF = myDateF.getDate();
if (myDayF <10) myDayF = "0" + myDayF;
var myMonthF = myDateF.getMonth();
myMonthF++; // январь имеет индекс 0
if (myMonthF <10) myMonthF = "0" + myMonthF;
var myHourF = myDateF.getHours();
if (myHourF <10) myHourF = "0" + myHourF;
var myMinuteF = myDateF.getMinutes();
if (myMinuteF <10) myMinuteF = "0" + myMinuteF;
var mySecondeF = myDateF.getSeconds();
if (mySecondeF <10) mySecondeF = "0" + mySecondeF;
///	
// indique -- такое расширение будет у файлов со перечнями запросов
mySpecialQName = "QueryList" + "@"+ myDayF + "." + myMonthF + "-" + myHourF + "." + myMinuteF + "." + mySecondeF + ".indique";
var myNameTmpQ = prompt (myMes17[myLngInd], mySpecialQName, myProgramTitul);
if (myNameTmpQ == null || myNameTmpQ.length == 0) return;
myAsteriskInQueryName = false;
for (ii = 0; ii < myQueryList.items.length; ii++) if (myQueryList.items[ii].text[3] == "*")  myAsteriskInQueryName = true;
if (myAsteriskInQueryName == true && myNameTmpQ[0] != "+") {
    alert(myMes29[myLngInd], myProgramTitul); /// alert("Перечень операций, включающий пользовательские запросы, должeн быть сохранён в отдельном каталоге.\nДля этого имя файла списка запросов должно начинаться со знака '+'.", myProgramTitul);
    return; 
   }
if (myNameTmpQ.indexOf('.indique') == -1) myNameTmpQ += '.indique';
mySpecialQName = myNameTmpQ;
// плюс в начале названия означает, что сохраняется не только файл запроса, но и все запросы тоже.
// сохраним список запросов    
myFilePathQSave= decodeURI(myScriptFolder + "/" + mySpecialQName);  // полное имя к созданному indique-файлу
if (myFilePathQSave.length != 0) w.helpTip = decodeURI(myFilePathQSave);
var myQueSetSave = new File (myFilePathQSave);
tt = myQueSetSave.open("w");
if (tt == false) { alert(myMes27[myLngInd] +" [2]", myProgramTitul); return; }
myQueSetSave.writeln(myQueryList.items.length);
for (i = 0; i < myQueryList.items.length; i++)  myQueSetSave.writeln(myQueryList.items[i]);
myQueSetSave.close();
if (myNameTmpQ[0] != "+") { // тут, видимо, будет ещё операция удаления указателей на grep- и текстовые папки пользовательских каталогов
    mySpecFolderName = myScriptFolder; 
    //myAsteriskInQueryName = false;
    return; 
    } 
else { // myNameTmpQ[0] == "+"
// В отдельном каталоге сохраним список запросов и сами запросы
myFilePathQSave= decodeURI(myScriptFolder + "/" + mySpecialQName);
if (myFilePathQSave.length != 0) w.helpTip = decodeURI(myFilePathQSave);
var myStringPrevSpecFolderName = decodeURI(mySetQFile).replace(/\.indique$/,"");
myPrevSpecFolderName = Folder(myStringPrevSpecFolderName).parent;
mySpecFolderName = decodeURI(myFilePathQSave).replace(/\.indique$/,""); // каталог, в котором хранится созданный список запросов и папки с запросами
ff = Folder(mySpecFolderName).create();
myFilePathQSave = mySpecFolderName + "/" + mySpecialQName; // полное имя к созданному indique-файлу
if (myFilePathQSave.length != 0) w.helpTip = decodeURI(myFilePathQSave);
if (ff == false) { alert(myMes27[myLngInd] +" [5]", myProgramTitul); return; }
myQueSetSave.copy(mySpecFolderName + "/" + mySpecialQName);
myQueSetSave.remove();
mySpecTextFolder = mySpecFolderName + "/" + "Text" + "/";
ff = Folder(mySpecTextFolder).create();
if (ff == false) { alert(myMes27[myLngInd] +" [6]", myProgramTitul); return; }
mySpecGrepFolder = mySpecFolderName + "/" + "Grep" + "/";
ff = Folder(mySpecGrepFolder).create();
if (ff == false) { alert(myMes27[myLngInd] +" [7]", myProgramTitul); return; }
// разносим запросы по каталогам /Text и /Grep
// после этого зпросы в правом окне будут со звёздочками, что означает, что это пользовательские наборы
var myCurQueName;
var myCurQueRezName;
for (jj = 0; jj < myQueryList.items.length; jj++) { // jj < myQueryList.items.length
    if (myQueryList.items[jj].text[0] == "T" && myQueryList.items[jj].text[3] != "*") { // myQueryList.items[jj].text[0] == "T" 
        myCurQueName = myQueryList.items[jj].text.replace("T: ","");
        myCurQueRezName = "";
        myCurQueRezName = myTextQueSources[0] + "/" + myCurQueName;
        myTxtFile = File (myCurQueRezName);
        myTxtFile.copy(mySpecTextFolder + myCurQueName);
        myCurQueRezName = "";
        myCurQueRezName = myTextQueSources[1] + "/" + myCurQueName;
        myTxtFile = File (myCurQueRezName);
        myTxtFile.copy(mySpecTextFolder + myCurQueName);
        continue;
       } // myQueryList.items[jj].text[0] == "T"
    if (myQueryList.items[jj].text[0] == "T" && myQueryList.items[jj].text[3] == "*") { //  == "T"  & == "*" 
        myCurQueName = myQueryList.items[jj].text.replace("T: *","");
        myCurQueRezName = "";
        myCurQueRezName = myPrevSpecFolderName + "/Text/" + myCurQueName;
        myTxtFile = File (myCurQueRezName);
        myTxtFile.copy(mySpecTextFolder + myCurQueName);
        continue;
       } //  //  == "T"  & == "*" 
    if (myQueryList.items[jj].text[0] == "G" && myQueryList.items[jj].text[3] != "*") { // myQueryList.items[jj].text[0] == "G"
        myCurQueName = myQueryList.items[jj].text.replace("G: ","");
        myCurQueRezName = "";
        myCurQueRezName = myGrepQueSources[0] + myCurQueName;
        myTxtFile = File (myCurQueRezName);
        myTxtFile.copy(mySpecGrepFolder + myCurQueName);
        myCurQueRezName = "";
        myCurQueRezName = myGrepQueSources[1] + myCurQueName;
        myTxtFile = File (myCurQueRezName);
        myTxtFile.copy(mySpecGrepFolder + myCurQueName);     
        continue;
        } // myQueryList.items[jj].text[0] == "G"
    if (myQueryList.items[jj].text[0] == "G" && myQueryList.items[jj].text[3] == "*") { // == "G" & == "*" 
        myCurQueName = myQueryList.items[jj].text.replace("G: *","");
        myCurQueRezName = "";
        myCurQueRezName = myPrevSpecFolderName + "/Grep/" + myCurQueName;
        myTxtFile = File (myCurQueRezName);
        myTxtFile.copy(mySpecGrepFolder + myCurQueName);
        continue;
        } //  // == "G" & == "*" 
    alert(myMes19[myLngInd], myProgramTitul); // "Ошибка в структуре данных списка запросов.\nПервая буква может быть только T или G."
} // jj < myQueryList.items.length
} // myNameTmpQ[0] == "+"
} // mySaveSetButton.onClick
///
function myLoadSetButtonOnClick () { // myLoadSetButton.onClick 
a=0;    
myScrQFolder = new Folder (decodeURI(myScriptFile.path));
mySearchQMask = "*.indique";
var myQueList = myScrQFolder.getFiles(mySearchQMask);
/*
if (myQueList.length == 0) { // myQueList.length == 0
    alert (myMes20[myLngInd], myProgramTitul); // "Нет файлов с запросами поиска/замены"
    return;
} //  myQueList.length == 0
*/
mySetQFile = File(decodeURI(myScrQFolder + "/")).openDlg(myMes21[myLngInd], 'indique: *.indique'); // "Файлы запросов поиска/замены"
if (mySetQFile == null)  return;
var myArrForQSplit = [];
myArrForQSplit = decodeURI(mySetQFile).split("/");
myCurrentFileQName = myArrForQSplit[myArrForQSplit.length-1];
if (!mySetQFile.exists) { alert (myMes22[myLngInd], myProgramTitul); return; }   // "Не удалось прочитать выбранный файл с запросами поиска/замены"
else { //File.exists
firstCharIsPlus = false;
var myTmpArrPlus = new Array;
myFilePathQSave = String (mySetQFile);
if (myFilePathQSave.length != 0) w.helpTip = decodeURI(myFilePathQSave);
if (myArrForQSplit[myArrForQSplit.length - 1][0] == "+") { // == "+"
    firstCharIsPlus = true; 
  } // == "+"
//else ( myAsteriskInQueryName = false ) // при загрузке списка без плюсика надо забыть о том, что до этого в правом окне были запросы из пользовательских каталогов
myGetQueryListFromFile(mySetQFile);
} //File.exists
// удалим имеющийся сейчас список запросов...
var myQueListCounter = myQueryList.items.length;
for (k = 0; k < myQueListCounter; k++) { myQueryList.remove(myQueryList.items[0]); }
// ... и поместим сюда новый
for (i = 0; i < myQueCntr; i++) { 
    myQueryList.add("item",mySavedQueryList[i]); 
    myQueryList.selection = myQueryList.items[i];  // выделяем вставленную строку
    }
} // myLoadSetButton.onClick 
////
///-- http://forums.adobe.com/message/3462710#3462710
w.addEventListener('mouseout', leaveTestPalette);
function leaveTestPalette(/*MouseEvent*/mev)
    {
    if( mev.target instanceof Window ) app.activate();
    }
///--
//////
myOKButton.onClick = function() { // myOKButton.onClick 
try { if (myQueryList.selection.length == 0) } catch (e)  {
    alert(myMes23[myLngInd], myProgramTitul);  // "В правом окне не выбрано ни одного запроса."
    return;
    }
mySelection = app.selection[0];
if (mySelection == undefined ) {
    alert(myMes24[myLngInd], myProgramTitul); // "Перед запуском программы поставьте курсор в текст для подготовки всей статьи к верстке.\nВыделите часть текста для обработки только её."	
    return;
    }
myRemovePlusMarkersInRightList(myQueryList);
var mySel = -1;
mySelection.parentStory.recompose();
switch(mySelection.constructor.name) { // switch
    case "Text":
    case "TextColumn":
	case "Character":
	case "Word":
	case "Paragraph":
    case "Table":
	case "Cell":
        mySel = 0; break;
	case "TextFrame":
        mySel = 1;  break;
	case "InsertionPoint":
        if (mySelection.parent.constructor.name == "Cell") {mySelection.parent.select(); mySel = 0; } else mySel = 1;
} // switch
if (mySel == -1) { // mySel == -1
    alert(myMes25[myLngInd] + "mySelection.constructor.name = " + mySelection.constructor.name + "\nmySelection.parent.constructor.name = " + mySelection.parent.constructor.name, myProgramTitul);	
    return;
} // mySel == -1
for (j = 0; j < myQueryList.selection.length; j++) { // < myQueryList.selection.length
myOKButton.text = myMes33[myLngInd]; // Замена сообщения на время обработки
var myDate = new Date;
// имя исполняемого запроса состоит из текущего времени в секундах и текущего значения индекса
var mySpecialNameForUserQuery = String(myDate.getTime()); // это время...
mySelection = app.selection[0];
mySelection.parentStory.recompose(); // после выполнения каждого запроса обновляем статью    
var myArrayXML = new Array;
myArrayXML = myQueryList.selection[j].text.split(".xml");
mySelection = app.selection[0];
var myQ =myArrayXML[0];
myArrayXML = myQ.split(": ");
myQ =myArrayXML[1];
if  (myQueryList.selection[j].text[0] == "T") { //  == "T"
        myQueIsProcessed = true;
        if (myQ[0] == "*") { //  == "*"
            myQueArrPlus = myQ.split("");
            myQueArrPlus.shift();
            myQ = myQueArrPlus.join("");
            myOwnTextQueryFolder = mySetQFile.path  + "/Text/";
            myFileObj = File (myOwnTextQueryFolder + myQ + ".xml");
        //    if (!myFileObj.exists) { alert(myMes30 + decodeURI(myFileObj), myProgramTitul); continue;} // "Не найден указанный в списке запросов файл\n" 
            if (!myFileObj.exists) { if (prompt(myMes30  + decodeURI(myFileObj), "+", myProgramTitul) == null) exit(); else continue;} // "Не найден указанный в списке запросов файл\n"                
            myFolderForExecuteThisQuery = myOwnQueriesInAppFolder== true ? myAppTextFolder : myUserTextFolder;
            mySpecialNameForUserQuery = mySpecialNameForUserQuery + String(j); // ... добпавляем индекс
            myTarget = File (myFolderForExecuteThisQuery + "/" + mySpecialNameForUserQuery + ".xml");
             if (myFileObj.copy(myTarget) == false) { // (myTarget) == false
                alert (myMes31a[myLngInd] + decodeURI(myFileObj) + myMes31b[myLngInd] + decodeURI(myFolderForExecuteThisQuery) + myMes31c[myLngInd],myProgramTitul); //"Не удалось перенести пользовательский файл запроса\n" + decodeURI(myFileObj) + "\nв каталог\n" + decodeURI(myFolderForExecuteThisQuery) + "\nВозможно, пользователю не предоставлено право полного доступа ка этому каталогу."                
                continue; 
              } // (myTarget) == false
            myQ = String(mySpecialNameForUserQuery);
        } //  == "*"
      // try { app.loadFindChangeQuery(myQ,SearchModes.textSearch); } catch (e) { myQueIsProcessed = false; alert(myMes26[myLngInd] + myQueryList.selection[j].text , myProgramTitul); continue;} // "Не найден запрос: "
       try { app.loadFindChangeQuery(myQ,SearchModes.textSearch); } catch (e) { myQueIsProcessed = false; if (prompt(myMes26[myLngInd] + myQueryList.selection[j].text, "+", myProgramTitul) == null) exit(); else continue;}       
       try { mySel == 0 ? mySelection.changeText() : mySelection.parentStory.changeText(); } catch (e) { myQueIsProcessed = false; myNumberOfPendingQueries++; }
       if (myArrayXML[1][0] == "*") myTarget.remove();
       if (myQueIsProcessed == true) {
           var tString = "+" + myQueryList.selection[j].text;
         //  myQueryList.selection[j].text = "+" + myQueryList.selection[j].text;
           myQueryList.selection[j].text = tString;           
           }
       //w.text = myMes01[myLngInd]; // для обновления окна
      // w.show();
      refresh(myQueryList);
      mySelection.parentStory.recompose();
     //  w.layout.layout();
       w.update(); // 6.2.2020
       continue;
      } //  == "T"
if  (myQueryList.selection[j].text[0] == "G") { //  == "G"
        myQueIsProcessed = true;
        if (myQ[0] == "*") { //  == "*"
            myQueArrPlus = myQ.split("");
            myQueArrPlus.shift();
            myQ = myQueArrPlus.join("");
            myOwnGrepQueryFolder = mySetQFile.path + "/GREP/";
            myFileObj = File (myOwnGrepQueryFolder + myQ + ".xml");
           // if (!myFileObj.exists) { alert(myMes30  + decodeURI(myFileObj), myProgramTitul); continue;} // "Не найден указанный в списке запросов файл\n"
            if (!myFileObj.exists) { if (prompt(myMes30  + decodeURI(myFileObj), "+", myProgramTitul) == null) exit(); else continue;} // "Не найден указанный в списке запросов файл\n"               
            myFolderForExecuteThisQuery = myOwnQueriesInAppFolder== true ? myAppGrepFolder : myUserGrepFolder;
            mySpecialNameForUserQuery = mySpecialNameForUserQuery + String(j); // ... добпавляем индекс
            myTarget = File (myFolderForExecuteThisQuery + "/" + mySpecialNameForUserQuery + ".xml");
             if (myFileObj.copy(myTarget) == false) { // (myTarget) == false
                alert (myMes31a[myLngInd] + decodeURI(myFileObj) + myMes31b[myLngInd] + decodeURI(myFolderForExecuteThisQuery) + myMes31c[myLngInd],myProgramTitul); //"Не удалось перенести пользовательский файл запроса\n" + decodeURI(myFileObj) + "\nв каталог\n" + decodeURI(myFolderForExecuteThisQuery) + "\nВозможно, пользователю не предоставлено право полного доступа ка этому каталогу."                                
                continue; 
              } // (myTarget) == false
            myQ = String(mySpecialNameForUserQuery);
        } //  == "*"
        //try { app.loadFindChangeQuery(myQ,SearchModes.grepSearch); } catch (e) { myQueIsProcessed = false; alert(myMes26[myLngInd] + myQueryList.selection[j].text , myProgramTitul); continue;} // "Не найден запрос: "
        try { 
            a=0;
            app.loadFindChangeQuery(myQ,SearchModes.grepSearch); 
            } 
        catch (e) { 
            myQueIsProcessed = false; 
            if (prompt(myMes26[myLngInd] + myQueryList.selection[j].text, "+", myProgramTitul) == null) exit(); 
            else continue;
            } ;
        try { 
            mySel == 0 ? mySelection.changeGrep() : mySelection.parentStory.changeGrep(); 
            } 
        catch (e) {
            myQueIsProcessed = false;  
            myNumberOfPendingQueries++; 
            } ;
        a=0;
        if (myQueIsProcessed == true) {
            var gString = "+" + myQueryList.selection[j].text;
           // myQueryList.selection[j].text = "+" + myQueryList.selection[j].text;
            myQueryList.selection[j].text = gString;            
            }
        if (myArrayXML[1][0] == "*") myTarget.remove();
      //  w.text = myMes01[myLngInd]; // для обновления окна
     //  w.show();
      // w.layout.layout();
     //  w.update();      
        refresh(myQueryList);  
        w.update(); // 6.2.2020
        mySelection.parentStory.recompose();
        continue;
      }  //  == "G"
  alert(myMes19[myLngInd], myProgramTitul); // "Ошибка формата: встречена строка, не начинающаяся с буквы T или G."
} // < myQueryList.selection.length
myOKButton.text = myMes06[myLngInd]; // "Обработать текст" снова на кнопке
myQueIsProcessed = true;
if (myNumberOfPendingQueries != 0) alert(myMes32 + myNumberOfPendingQueries , myProgramTitul); // "Число невыполненных запросов: "
myNumberOfPendingQueries = 0;
refresh(myQueryList);
///
function refresh (control) { // refresh
var wh = control.size;
control.size = [1+wh[0], 1+wh[1]];
control.size = [wh[0], wh[1]];
} // refresh
///
} // myOKButton.onClick
if (mySavePosition == true) w.location = [myLockX, myLockY];
w.show();
} // myScriptWindow
//////
function myFile(myFileName) {
var myScriptFile = myGetScriptPath();
var myScriptFolder = decodeURI(myScriptFile.path);
var myFilePath = decodeURI(myScriptFolder + "/" +myFileName);
return myFilePath;
} //myFile
//
function myGetScriptPath() { // myGetScriptPath
	try{
		return app.activeScript;
	}
	catch(myError){
		return File(myError.fileName);
	}
} //myGetScriptPath()
////////
function myRemovePlusMarkersInRightList(myQueryList) { // myRemovePlusMarkersInRightList
if (myQueIsProcessed == false) return;
var myArrPlus = [];
for (i = 0; i < myQueryList.items.length; i++) { //  i < myQueryList.selection.length
    if (myQueryList.items[i].text[0] != "+") continue;
    myQ = myQueryList.items[i].text;
    myArrPlus = myQ.split("");
    myArrPlus.shift();
    myQueryList.items[i].text = myArrPlus.join("");
    } //  i < myQueryList.selection.length
myQueIsProcessed = false;
} // myRemovePlusMarkersInRightList
////
function openInBrowser(/*str*/url)
//--  http://forums.adobe.com/message/3181041#3181041
{
var isMac = (File.fs == "Macintosh"), fName = 'tmp' + (+new Date()) + (isMac ? '.webloc' : '.url'), fCode = isMac ?
        ('<?xml version="1.0" encoding="UTF-8"?>\r'+
        '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" '+
        '"http://www.apple.com/DTDs/PropertyList-1.0.dtd">\r'+'<plist version="1.0">\r'+'<dict>\r'+
        '\t<key>URL</key>\r'+
        '\t<string>%url%</string>\r'+
        '</dict>\r'+
        '</plist>') :
        '[InternetShortcut]\rURL=%url%\r';
    var f = new File(Folder.temp.absoluteURI + '/' + fName);
    if(! f.open('w') ) return false;
    f.write(fCode.replace('%url%',url));
    f.close();
    f.execute();
    $.sleep(500);   // 500 ms timer
    f.remove();
    return true;
}
////
function myGetQueryListFromFile(mySetQFile) { // myGetQueryListFromFile
mySetQFile.open("r");
myQueCntr = mySetQFile.readln();
mySavedQueryList = new Array;
var myTempQueString;
for (i = 0; i < myQueCntr; i++)  { //  i < myQueCntr
    myTempQueString = mySetQFile.readln();
    if (firstCharIsPlus == true) { // firstCharIsPlus == true
    myTmpArrPlus = myTempQueString.split("");
    myTmpArrPlusLength = myTmpArrPlus.length;
    // Формат записи предполагает, что после буквы T/G и двоеточия стоит пробел. 
    // Если запрос берется из созданного, а не стандартного каталога, для сохранения пробела после двоеточия сдвигаем строку  на один знак, чтобы добавить '*" -- указатель, что это запрос из пользовательского каталога.
    // Но возможна ситуация, когда в сохраненном перечне запросов уже стоит звёздочка перед названием файла, например, сохраняется последовательность запросов, в которой ипользуются запросы из пользовательского каталога
    // Поэтому перед выполнением сдвига на один знак проверим, нет ли уже звёздочки перед названием запроса.
    if (myTmpArrPlus[3] != "*") { //  != "*"
        for (f = myTmpArrPlusLength; f > 2; f--) { //  f > 2
            myTmpArrPlus[f] = myTmpArrPlus[f-1];
            } //  f > 2
            myTmpArrPlus[3] = "*";
            //myAsteriskInQueryName = true;
        } //  != "*"
        myTempQueString = myTmpArrPlus.join("");    
    } // firstCharIsPlus == true
    mySavedQueryList[i] = myTempQueString;
} //  i < myQueCntr
mySetQFile.close();  
a=0;
} // myGetQueryListFromFile
///////
} // main

main();
///==
