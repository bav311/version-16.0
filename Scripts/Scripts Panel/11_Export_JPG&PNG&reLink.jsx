    // var targetFolder = new Folder("E:/Tempnamber");
    
	(function() {
    if (app.documents.length === 0) return alert("Откройте документ!");
    
    var doc = app.activeDocument;
    var targetFolder = new Folder("E:/Tempnamber");
    if (!targetFolder) return;

    var links = doc.links;
    var countCopied = 0;
    var countRelinked = 0;

    for (var i = links.length - 1; i >= 0; i--) {
        var link = links[i];
        
        if (link.name.match(/\.(jpg|jpeg|png)$/i)) {
            var sourceFile = new File(link.filePath);
            var destFile = new File(targetFolder + "/" + link.name);
            
            // Если файла в целевой папке НЕТ — копируем его
            if (!destFile.exists) {
                if (sourceFile.exists) {
                    sourceFile.copy(destFile);
                    countCopied++;
                }
            }
            
            // В любом случае перепривязываем к файлу в целевой папке (если он там теперь есть)
            if (destFile.exists) {
                link.relink(destFile);
                try {
                    link.update();
                } catch(e) {}
                countRelinked++;
            }
        }
    }

    alert("Результат:\nСкопировано новых файлов: " + countCopied + 
          "\nВсего перепривязано связей: " + countRelinked);
})();
