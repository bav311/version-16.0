(function() {
    if (app.documents.length === 0) return alert("Откройте документ!");
    if (app.selection.length === 0) return alert("Ничего не выделено!");
    
    var targetFolder = new Folder("E:/Работа/Рисунки/Будущие полосы фото");
     if (!targetFolder.exists) {
        if (!targetFolder.create()) return alert("Не удалось создать папку: " + targetFolder.fullName);
    }

    var countCopied = 0;
    var countRelinked = 0;

    // Глубокий поиск линков в любых объектах
    function findLinksRecursively(item, foundLinks) {
        if (!item) return;

        // Если это изображение/графика напрямую
        if (item.hasOwnProperty("itemLink") && item.itemLink) {
            foundLinks.push(item.itemLink);
            return;
        }

        // Если у объекта есть вложенная графика (прямоугольные фреймы и т.д.)
        if (item.hasOwnProperty("graphics") && item.graphics.length > 0) {
            for (var g = 0; g < item.graphics.length; g++) {
                if (item.graphics[g].itemLink) foundLinks.push(item.graphics[g].itemLink);
            }
        }

        // Если это группа объектов — заходим внутрь
        if (item.constructor.name === "Group" && item.pageItems && item.pageItems.length > 0) {
            for (var i = 0; i < item.pageItems.length; i++) {
                findLinksRecursively(item.pageItems[i], foundLinks);
            }
        }

        // Если это текстовый фрейм — ищем картинки, привязанные к тексту (Inline/Anchored objects)
        if (item.constructor.name === "TextFrame" && item.allPageItems && item.allPageItems.length > 0) {
            for (var t = 0; t < item.allPageItems.length; t++) {
                findLinksRecursively(item.allPageItems[t], foundLinks);
            }
        }
    }

    // Собираем все линки из выделения
    var selectedLinks = [];
    for (var s = 0; s < app.selection.length; s++) {
        findLinksRecursively(app.selection[s], selectedLinks);
    }
    
    // Удаляем дубликаты линков, если они попались дважды
    var uniqueLinks = [];
    var linkIds = {};
    for (var l = 0; l < selectedLinks.length; l++) {
        var currentLink = selectedLinks[l];
        if (!linkIds[currentLink.id]) {
            linkIds[currentLink.id] = true;
            uniqueLinks.push(currentLink);
        }
    }

    if (uniqueLinks.length === 0) {
        return alert("В выделенных объектах не найдено подходящих изображений!");
    }

    // Обработка файлов
    for (var i = uniqueLinks.length - 1; i >= 0; i--) {
        var link = uniqueLinks[i];
        
        if (link.name.match(/\.(tiff|eps|psd|jpeg|jpg|png)$/i)) {
            var sourceFile = new File(link.filePath);
            var destFile = new File(targetFolder + "/" + link.name);
            
            if (!destFile.exists) {
                if (sourceFile.exists) {
                    sourceFile.copy(destFile);
                    countCopied++;
                }
            }
            
            if (destFile.exists) {
                link.relink(destFile);
                try {
                    link.update();
                } catch(e) {}
                countRelinked++;
            }
        }
    }

    alert("Результат:\nНайдено картинок в выделении: " + uniqueLinks.length +
          "\nСкопировано новых файлов: " + countCopied + 
          "\nВсего перепривязано связей: " + countRelinked);
})();