// Script by Ivan Tolstikov @dmtrvk.ru

try {
    if (!app.selection[0]) {
        throw ("You need to select some text first.");
        exit();
    }
    placeNumbers();
    //alert ("user entered" + userResponse);
} catch (e) {
    alert(e);
}

function placeNumbers() {
    for (i = 0; i < (app.selection.length); i++) {
        //app.selection[0].characters[i] = i; 
	str = i+1;
	app.selection[i].contents=str.toString();
    }
}


