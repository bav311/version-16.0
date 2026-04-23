function getLanguageOptions(){
   languageOptions = new Array( 'English', 
                                'Arabic (عربي)',
                                'Azerbaijani',
                                'Bosnian',                                             
                                'Bulgarian',
                                'Catalan',
                                'Chinese (繁體中文)',
                                'Croatian',
                                'Czech',
                                'Basque',
                                'Danish',
                                'Dutch', 
                                'Estonian', 
                                'Fulah',
                                'Finnish',
                                'French', 
                                'German', 
                                'Greek',
                                'Hungarian', 
                                'Icelandic',
                                'Italian', 
                                'Latvian',                                              
                                'Lithuanian',
                                'Norwegian', 
                                'Polish', 
                                'Portuguese',
                                'Romanian',
                                'Russian',
                                'Serbian Latin',
                                'Serbian Cyrillic',
                                'Slovak',
                                'Slovenian',
                                'Spanish', 
                                'Swedish',
                                'Turkish'
                              );
   return languageOptions;
}
// --------------------------------------------------------------- //
function selectLanguage( settings, selector )
{
   if( settings.languageOptions[ selector.Language.selectedIndex ] == "Arabic (عربي)" )
   {
      settings.months    = new Array( 'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر');
      settings.daysLong  = new Array( 'الأحد', 'الأثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت' );
      settings.daysMid   = new Array( 'أحد', 'أثن', 'ثلا', 'أرب', 'خمس', 'جمع', 'سبت' );
      settings.daysShort = new Array( 'ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Azerbaijani" )
   {
      settings.months    = new Array( 'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
                                      'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr');
      settings.daysLong  = new Array( 'Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 
                                      'Cümə axşamı', 'Cümə', 'Şənbə' );
      settings.daysMid   = new Array( 'Bzr', 'Bzr ert', 'Çar axş', 'Çar', 'Cüm axş', 'Cüm', 'Şnb' );
      settings.daysShort = new Array( 'B', 'Be', 'Ça', 'Ç', 'Ca', 'C', 'Ş' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Bosnian" )
   {
      settings.months    = new Array( 'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
                                      'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar');
      settings.daysLong  = new Array( 'Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 
                                      'Četvrtak', 'Petak', 'Subota' );
      settings.daysMid   = new Array( 'Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub' );
      settings.daysShort = new Array( 'N', 'P', 'U', 'S', 'Č', 'P', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Bulgarian" )
   {
      settings.months    = new Array( 'Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни',
                                      'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември');
      settings.daysLong  = new Array( 'Неделя', 'Понеделник', 'Вторник', 'Сряда', 
                                      'Четвъртък', 'Петък', 'Събота' );
      settings.daysMid   = new Array( 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд' );
      settings.daysShort = new Array( 'П', 'В', 'С', 'Ч', 'П', 'С', 'Н' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Catalan" )
   {
      settings.months    = new Array( 'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny',
                                      'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre');
      settings.daysLong  = new Array( 'Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 
                                      'Dijous', 'Divendres', 'Dissabte' );
      settings.daysMid   = new Array( 'Dg', 'Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds' );
      settings.daysShort = new Array( 'Dg', 'Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds' );
   }  
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Chinese (繁體中文)" )
   {
      settings.months    = new Array( '一月', '二月', '三月', '四月', '五月', '六月',
                                      '七月', '八月', '九月', '十月', '十一月', '十二月');
      settings.daysLong  = new Array( '星期日', '星期一', '星期二', '星期三',
                                      '星期四', '星期五', '星期六' );
      settings.daysMid   = new Array( '週日', '週一', '週二', '週三', '週四', '週五', '週六');
      settings.daysShort = new Array( '日', '一', '二', '三', '四', '五', '六' );
   }   
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Croatian" )
   {
      settings.months    = new Array( 'Siječanj', 'Veljača', 'Ožujak', 'Travanj', 'Svibanj', 'Lipanj',
                                      'Srpanj', 'Kolovoz', 'Rujan', 'Listopad', 'Studeni', 'Prosinac');
      settings.daysLong  = new Array( 'Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda',
                                      'Četvrtak', 'Petak', 'Subota' );
      settings.daysMid   = new Array( 'Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub' );
      settings.daysShort = new Array( 'N', 'P', 'U', 'S', 'Č', 'P', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Czech" )
   {
      settings.months    = new Array( 'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
                                      'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec');
      settings.daysLong  = new Array( 'Neděle', 'Pondělí', 'Úterý', 'Středa', 
                                      'Čtvrtek', 'Pátek', 'Sobota' );
      settings.daysMid   = new Array( 'Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So' );
      settings.daysShort = new Array( 'N', 'P', 'Ú', 'S', 'Č', 'P', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Basque" )
   {
      settings.months    = new Array( 'Urtarrila', 'Otsaila', 'Martxoa', 'Apirila', 'Maiatza', 'Ekaina',
                                      'Uztaila', 'Abuztua', 'Iraila', 'Urria', 'Azaroa', 'Abendua');
      settings.daysLong  = new Array( 'Igandea', 'Astelehena', 'Asteartea', 'Asteazkena',
                                      'Osteguna', 'Ostirala','Larunbata');
      settings.daysMid   = new Array( 'Ig', 'Al', 'As', 'Az', 'Og', 'Or', 'Lr' );
      settings.daysShort = new Array( 'Ig', 'Al', 'As', 'Az', 'Og', 'Or', 'Lr' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Danish" )
   {
      settings.months    = new Array( 'Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 
                                      'Juli', 'August', 'September', 'Oktober', 'November', 'December');
      settings.daysLong  = new Array( 'Søndag', 'Mandag', 'Tirsdag','Onsdag',
                                      'Torsdag', 'Fredag', 'Lørdag' );
      settings.daysMid   = new Array( 'Søn', 'Man', 'Tir', 'Ons', 'Tor','Fre', 'Lør' );
      settings.daysShort = new Array( 'S', 'M', 'T', 'O', 'T', 'F', 'L' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Dutch" )
   {
      settings.months    = new Array( 'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
                                      'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December');
      settings.daysLong  = new Array( 'Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 
                                      'Donderdag', 'Vrijdag', 'Zaterdag' );
      settings.daysMid   = new Array( 'Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za');
      settings.daysShort = new Array( 'Z', 'M', 'D', 'W', 'D', 'V', 'Z' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Estonian" )
   {
      settings.months    = new Array( 'Jaanuar', 'Veebruar', 'Märts', 'Aprill', 'Mai', 'Juuni',
                                      'Juuli', 'August', 'September', 'Oktoober', 'November', 'Detsember');
      settings.daysLong  = new Array( 'Pühapäev', 'Esmaspäev', 'Teisipäev', 'Kolmapäev',
                                      'Neljapäev', 'Reede', 'Laupäev' );
      settings.daysMid   = new Array( 'Pühap', 'Esmasp', 'Teisip', 'Kolmap', 'Neljap', 'Reede', 'Laup' );
      settings.daysShort = new Array( 'P', 'E', 'T', 'K', 'N', 'R', 'L' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Fulah" )
   {
      settings.months    = new Array( 'Siilo', 'Colte', 'MBooy', 'Seeɗto', 'Duujal', 'Korse',
                                      'Morso', 'Juko', 'Siilto', 'Yarkomaa', 'Jolal', 'Bowte');
      settings.daysLong  = new Array( 'Dewo', 'Aaɓnde', 'Mawbaare', 'NJeslaare',
                                      'Naasaande', 'Mande', 'Hoore-Biir' );
      settings.daysMid   = new Array( 'Dew', 'Aaɓ', 'Maw', 'NJe', 'Naa', 'Mde', 'Hbi' );
      settings.daysShort = new Array( 'D', 'A', 'M', 'N', 'N', 'M', 'H' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Finnish" )
   {
      settings.months    = new Array( 'Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu',
                                      'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu');
      settings.daysLong  = new Array( 'Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko',
                                      'Torstai', 'Perjantai', 'Lauantai' );
      settings.daysMid   = new Array( 'Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La' );
      settings.daysShort = new Array( 'S', 'M', 'T', 'K', 'T', 'P', 'L' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "French" )
   {
      settings.months    = new Array( 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                                      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre');
      settings.daysLong  = new Array( 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 
                                      'Jeudi', 'Vendredi', 'Samedi' );
      settings.daysMid   = new Array( 'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam' );
      settings.daysShort = new Array( 'D', 'L', 'M', 'M', 'J', 'V', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "German" )
   {
      settings.months    = new Array( 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
                                      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember');
      settings.daysLong  = new Array( 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 
                                      'Donnerstag', 'Freitag', 'Samstag' );
      settings.daysMid   = new Array( 'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa' );
      settings.daysShort = new Array( 'S', 'M', 'D', 'M', 'D', 'F', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Greek" )
   {
      settings.months    = new Array( 'Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος',
                                      'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος');
      settings.daysLong  = new Array( 'Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη',
                                      'Πέμπτη', 'Παρασκευή', 'Σάββατο' );
      settings.daysMid   = new Array( 'Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ' );
      settings.daysShort = new Array( 'Κ', 'Δ', 'Τρ', 'Τε', 'Πε', 'Πα', 'Σ' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Hungarian" )
   {
      settings.months    = new Array( 'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
                                      'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December');
      settings.daysLong  = new Array( 'Vasárnap', 'Hétfő', 'Kedd', 'Szerda',
                                      'Csütörtök', 'Péntek', 'Szombat' );
      settings.daysMid   = new Array( 'V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo' );
      settings.daysShort = new Array( 'V', 'H', 'K', 'Sz', 'Cs', 'P', 'Sz' ); 
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Icelandic" )
   {
      settings.months    = new Array( 'Janúar', 'Febrúar', 'Mars', 'Apríl', 'Maí', 'Júni',
                                      'Júli', 'Águst', 'September', 'Október', 'Nóvember', 'Desember');
      settings.daysLong  = new Array( 'Sunnudagur', 'Mánudagur', 'Þriðjudagur','Miðvikudagur',
                                      'Fimmtudagur', 'Föstudagur', 'Laugardagur' );
      settings.daysMid   = new Array( 'Sun', 'Mán', 'Þri', 'Mið', 'Fim','Fös', 'Lau' );
      settings.daysShort = new Array( 'S', 'M', 'Þ', 'M', 'F', 'F', 'L' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Italian" )
   {
      settings.months    = new Array( 'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
                                      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre');
      settings.daysLong  = new Array( 'Domenica', 'Lunedì', 'Martedì', 'Mercoledì',
                                      'Giovedì', 'Venerdì', 'Sabato' );
      settings.daysMid   = new Array( 'Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab' );
      settings.daysShort = new Array( 'D', 'L', 'M', 'M', 'G', 'V', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Latvian" )
   {
      settings.months    = new Array( 'Janvāris', 'Februāris', 'Marts', 'Aprīlis', 'Maijs', 'Jūnijs',
                                      'Jūlijs', 'Augusts', 'Septembris', 'Oktobris', 'Novembris', 'Decembris');
      settings.daysLong  = new Array( 'Svētdiena', 'Pirmdiena', 'Otrdiena', 'Trešdiena', 
                                      'Ceturtdiena', 'Piektdiena', 'Sestdiena' );
      settings.daysMid   = new Array( 'Svētd.', 'Pirmd.', 'Otrd.', 'Trešd.', 'Ceturtd.', 'Piektd.', 'Sestd.' );
      settings.daysShort = new Array( 'Sv', 'P', 'O', 'T', 'C', 'P', 'S' );
   }   
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Lithuanian" )
   {
      settings.months    = new Array( 'Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis',
                                      'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis');
      settings.daysLong  = new Array( 'Sekmadienis', 'Pirmadienis', 'Antradienis', 'Trečiadienis', 
                                      'Ketvirtadienis', 'Panktadienis', 'Šeštadienis' );
      settings.daysMid   = new Array( 'Sk', 'Pr', 'An', 'Tr', 'Kt', 'Pe', 'Št' );
      settings.daysShort = new Array( 'S', 'P', 'A', 'T', 'K', 'Pe', 'Š' );
   }   
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Norwegian" )
   {
      settings.months    = new Array( 'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
                                      'Juli', 'August', 'September', 'Oktober', 'November', 'Desember');
      settings.daysLong  = new Array( 'Søndag', 'Mandag', 'Tirsdag', 'Onsdag',
                                      'Torsdag', 'Fredag', 'Lørdag' );
      settings.daysMid   = new Array( 'Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør' );
      settings.daysShort = new Array( 'S', 'M', 'T', 'O', 'T', 'F', 'L' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Polish" )
   {
      settings.months    = new Array( 'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
                                      'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień');
      settings.daysLong  = new Array( 'Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 
                                      'Czwartek', 'Piątek', 'Sobota' );
      settings.daysMid   = new Array( 'Niedz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob' );
      settings.daysShort = new Array( 'N', 'P', 'W', 'Ś', 'C', 'P', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Portuguese" )
   {
      settings.months    = new Array( 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                                      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro');
      settings.daysLong  = new Array( 'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
                                      'Quinta-feira', 'Sexta-feira', 'Sábado' );
      settings.daysMid   = new Array( 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab' );
      settings.daysShort = new Array( 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Romanian" )
   {
      settings.months     = new Array( 'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
                                       'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie');
      settings.daysLong   = new Array( 'Duminică', 'Luni', 'Marţi', 'Miercuri',
                                       'Joi', 'Vineri', 'Sâmbătă' );
      settings.daysMid    = new Array( 'Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ' );
      settings.daysShort  = new Array( 'D', 'L', 'M', 'M', 'J', 'V', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Russian" )
   {
      settings.months     = new Array( 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                                       'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь');
      settings.daysLong   = new Array( 'Воскресенье', 'Понедельник', 'Вторник', 'Среда',
                                       'Четверг', 'Пятница', 'Суббота' );
      settings.daysMid    = new Array( 'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' );
      settings.daysShort  = new Array( 'В', 'П', 'В', 'С', 'Ч', 'П', 'С' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Serbian Latin" )
   {
      settings.months    = new Array( 'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
                                      'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar');
      settings.daysLong  = new Array( 'Nedelja', 'Ponedeljak', 'Utorak', 'Sreda',
                                      'Četvrtak', 'Petak', 'Subota' );
      settings.daysMid   = new Array( 'Ned', 'Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub' );
      settings.daysShort = new Array( 'N', 'P', 'U', 'S', 'Č', 'P', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Serbian Cyrillic" )
   {
      settings.months    = new Array( 'Јануар', 'Фебруар', 'Март', 'Април', 'Мај', 'Јун',
                                      'Јул', 'Август', 'Септембар', 'Октобар', 'Новембар', 'Децембар');
      settings.daysLong  = new Array( 'Недеља', 'Понедељак', 'Уторак', 'Среда',
                                      'Четвртак', 'Петак', 'Субота' );
      settings.daysMid   = new Array( 'Нед', 'Пон', 'Уто', 'Сре', 'Чет', 'Пет', 'Суб' );
      settings.daysShort = new Array( 'Н', 'П', 'У', 'С', 'Ч', 'П', 'С' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Slovak" )
   {
      settings.months    = new Array( 'Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún',
                                      'Júl', 'August', 'September', 'Október', 'November', 'Decemeber');
      settings.daysLong  = new Array( 'Nedeľa', 'Pondelok', 'Utorok', 'Streda',
                                      'Štvrtok', 'Piatok', 'Sobota' );
      settings.daysMid   = new Array( 'Ne', 'Po', 'Ut', 'Str', 'Štv', 'Pi', 'So' );
      settings.daysShort = new Array( 'N', 'P', 'U', 'S', 'Š', 'P', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Slovenian" )
   {
      settings.months    = new Array( 'Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij',
                                      'Julij', 'Avgust', 'September', 'Oktober', 'November', 'Decemeber');
      settings.daysLong  = new Array( 'Nedelja', 'Ponedeljek', 'Torek', 'Sreda',
                                      'Četrtek', 'Petek', 'Sobota' );
      settings.daysMid   = new Array( 'Ned', 'Pon', 'Tor', 'Sre', 'Čet', 'Pet', 'Sob' );
      settings.daysShort = new Array( 'N', 'P', 'T', 'S', 'Č', 'P', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Spanish" )
   {
      settings.months   = new Array( 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                                      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
      settings.daysLong  = new Array( 'Domingo', 'Lunes', 'Martes', 'Miércoles', 
                                      'Jueves', 'Viernes', 'Sábado' );
      settings.daysMid   = new Array( 'Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb' );
      settings.daysShort = new Array( 'D', 'L', 'M', 'X', 'J', 'V', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Swedish" )
   {
      settings.months    = new Array( 'Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni',
                                      'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December');
      settings.daysLong  = new Array( 'Söndag', 'Måndag', 'Tisdag', 'Onsdag',
                                      'Torsdag', 'Fredag', 'Lördag' );
      settings.daysMid   = new Array( 'Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör' );
      settings.daysShort = new Array( 'S', 'M', 'T', 'O', 'T', 'F', 'L' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Turkish" )
   {
      settings.months    = new Array( 'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                                      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık');
      settings.daysLong  = new Array( 'Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 
                                      'Perşembe', 'Cuma', 'Cumartesi' );
      settings.daysMid   = new Array( 'Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt');
      settings.daysShort = new Array( 'P', 'Pt', 'S', 'Ç', 'P', 'C', 'Ct' );
   }
   else //English
   {
      settings.months    = settings.monthOptions;
      settings.daysLong  = new Array( 'Sunday', 'Monday', 'Tuesday', 'Wednesday',
                                      'Thursday', 'Friday', 'Saturday' );
      settings.daysMid   = new Array( 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' );
      settings.daysShort = new Array( 'S', 'M', 'T', 'W', 'T', 'F', 'S' );
   }

   return;
}
