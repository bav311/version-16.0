/*
Название: ImageInfo.js
Язык реализации: JavaScript
Версия: 1.1
Условия распространения: Freeware; On your own risk
Операционная система: Windows XP SP2.
Описание: Скрипт для использования в программе Adobe InDesign CS или CS2
Назначение: Отображение информации о выделенном изображении
Техническая поддержка: Sergei-Anosov@yandex.ru
*/
if(app.documents.length == 0){// Выход если нет открытых документов
	alert("Нет открытых документов!");exit();
}
if(app.selection.length == 0){// Выход если нет выделенных объектов
	alert("Нет выделенных объектов!");exit();
}
if(app.selection.length > 1){// Выход если выделено больше 1 объекта
	alert("Требуется выделить только один объект!");exit();
}
var object_in = app.selection[0];
var object_out
var result
CHECK_SELECTION ( );
if(!result){
	alert("                 Выделенный объект не является изображением!\n"+
              "      Возможно, следует использовать инструмент белая стрелка");exit();
}
var the_object =  object_out;
var the_object_name =  object_out.constructor.name;
//
// сохранение старых единиц измерения
//
old_vertical_units = app.activeDocument.viewPreferences.verticalMeasurementUnits;
old_horizontal_units = app.activeDocument.viewPreferences.horizontalMeasurementUnits;
//
// назначение новых единиц измерения - миллиметры
//
app.activeDocument.viewPreferences.verticalMeasurementUnits = 2053991795;
app.activeDocument.viewPreferences.horizontalMeasurementUnits = 2053991795;
//
// сбор информации об изображении
//
// исходный файл изображения
//
the_link = the_object.itemLink; // ссылка на файл
if(version_CS())  the_link_file = the_link.filePath.fsName;// путь+имя файла CS
else	           the_link_file = the_link.filePath;  	       // путь+имя файла CS2
the_link_size = the_link.size;// размер файла в байтах
the_link_type = the_link.linkType;// тип файла
//
// состояние связи с файлом
//
the_link_status = the_link.status;
stat = "OK";
if(the_link_status == 1852797549) stat = "OK";
if(the_link_status == 1819242340) stat = "Не обновлена";
if(the_link_status == 1819109747) stat = "Потеряна";
if(the_link_status == 1282237028) stat = "Файл внедрен";
//
// цветовая модель
//
if(the_object_name == "Image") color_space = the_object.space;// растр. изобр.
if(the_object_name == "PDF") color_space = "PDF"
if(the_object_name == "EPS") {
	try { // пытаемся определить цветовую модель EPS 
	       // если нет ошибки, считаем изображение Photoshop EPS
		color_space = the_object.space;
		the_link_type = "Photoshop EPS";
		//alert(the_object.profile)
	}
	catch ( error ) { // если есть ошибка, считаем изображение Illustrator EPS
		color_space = "EPS";
		the_link_type = "Illustrator EPS";
	}
}
//
// исправляем Greyscale на  Grayscale для CS
//
if( version_CS() && color_space == "Greyscale" ) color_space = "Grayscale";
//
//
// Clipping Path
//
PATH_TYPE = "Отсутствует";
if( the_object.clippingPath.clippingType == 1685349735) 	PATH_TYPE = "Detect Edges";
if( the_object.clippingPath.clippingType == 1634756707)	PATH_TYPE = "Alpha Channel";
if( the_object.clippingPath.clippingType == 1886613620)	PATH_TYPE = "Photoshop Path";
if( the_object.clippingPath.clippingType == 1970106484)	PATH_TYPE = "User-Modified Path";
//
// геометрия
//
T = the_object.visibleBounds[0];
B = the_object.visibleBounds[2];
L = the_object.visibleBounds[3];
R = the_object.visibleBounds[1];
H = B - T; // высота
W = L - R; // ширина
AHS = the_object.horizontalScale; // масшт. по горизонтали
AVS = the_object.verticalScale; // масшт. по вертикали

var H_0 =  (H / AVS) * 100. ;  // нач. высота
var W_0 = (W / AHS)* 100. ;  // нач. ширина
//alert(color_space);
//alert("H_0= "+H_0+" W_0= "+W_0)

if(the_object_name == "Image"){
	APPI_H = the_object.actualPpi[0]; // нач. разреш. по горизонтали
	APPI_V = the_object.actualPpi[1]; // нач. разреш. по вертикали
	EPPI_H = the_object.effectivePpi[0]; // конеч. разреш. по горизонтали
	EPPI_V = the_object.effectivePpi[1]; // конеч. разреш. по вертикали
	//
	// профиль
	//
	the_profile = the_object.profile
	if  (the_profile == "None") the_profile = "Отсутствует"
	else the_profile = "Внедрен"
}
//
//вывод информации
//
if(the_object_name == "Image") S0 = "Цветовой профиль: " +the_profile+"\n"
else S0 =""
S = 
"Информация об изображении"+"\n"+
"\n"+
"Тип: "+the_link_type+"\n"+
"Файл: "+the_link_file+"\n"+
"Размер: "+the_link_size+" байт\n"+
"Состояние связи: "+stat+"\n"+
"Цветовая модель: " +color_space+"\n"+
S0+
"Clipping Path: "+PATH_TYPE+"\n"+
"\n"+
"Ширина: "+W.toFixed(2)+" mm\n"+
"Высота: "+H.toFixed(2)+" mm\n"+
"Масшт. по гориз.: "+Math.abs(AHS.toFixed(2))+" %\n"+
"Масшт. по верт. : "+Math.abs(AVS.toFixed(2))+" %\n"
if(the_object_name == "Image" ){
	S = S+
"Нач. разреш. по гориз. : "+Math.abs(APPI_H.toFixed(2))+" dpi\n"+
"Нач. разреш. по верт.  : "+Math.abs(APPI_V.toFixed(2))+" dpi\n"+
"\n"+
"Конеч. разреш. по гориз. : "+Math.abs(EPPI_H.toFixed(2))+" dpi\n"+
"Конеч. разреш. по верт.  : "+Math.abs(EPPI_V.toFixed(2))+" dpi"
}
alert(S);
//
// возврат старых единиц измерения
//
app.activeDocument.viewPreferences.verticalMeasurementUnits = old_vertical_units;
app.activeDocument.viewPreferences.horizontalMeasurementUnits = old_horizontal_units;
exit();
//
//*************** подпрограмма проверки выделенного объекта
//
function CHECK_SELECTION( ) {
var obj_name = object_in.constructor.name;
result= true;
//
// если черной стрелкой выделен фрейм
//
if(obj_name == "Rectangle" || obj_name == "Oval" || obj_name == "Polygon" ) {
	var N_G = object_in.allGraphics.length;
	if(  N_G == 1) {
		object_out = object_in.allGraphics[0];
		result = true;
		return;
	}
	else {
		object_out = object_in;
		result =  false;
		return;
	}
}
//
// если белой стрелкой выделено содержимое фрейма
//
if(obj_name == "Image" ||  obj_name == "EPS" || obj_name == "PDF") {
	object_out = object_in;
	result = true;
	return;
}
result =  false;
return
}
//
// ******** ПОДПРОГРАММА ПОЛУЧЕНИЯ версии InDesign
//
function version_CS() {
var VERSION = app.version +"";
if(VERSION.substr(0,1) == "3") { return true;}
return false;
}
	
