/**
	 *  cells size setter (with cals)
	 *
	 */
	if(app.documents.length == 0 || app.selection.length == 0){exit();}
	 
	var cellColumn, cellRow;
	selObj = app.selection[0];
	switch(selObj.constructor.name){
	    case "Table":
	        cellColumn = selObj.columnCount;
	        cellRow = selObj.bodyRowCount + selObj.headerRowCount + selObj.footerRowCount;
	        break;
	    case "Cell":
	        cellColumn = selObj.columnSpan;
	        cellRow = selObj.rowSpan;
	        break;
	    default :// Table Cell
	        alert("choose table or cells");
	        break;
	}
	//
	var eachCellW = selObj.columns.everyItem().width;
	var eachCellH = selObj.rows.everyItem().height;
	 
	//edittext
	var editbox = {'w': 60, 'h': 20}; //edittext????
	var startPt; //edittext??????
	var pnlMargin = [10,10,10,15]; //????????
	var gutter = 5; //edittext???
	var wArr = [];
	var hArr = [];
	 
	var dlg = new Window('dialog',"cells size setter",undefined);
	dlg.pnl = dlg.add('panel',undefined);
	 
	//???edittext
	startPt = [pnlMargin[0], pnlMargin[1]];
	startPt[0] += editbox['w'] + gutter;
	 
	for (var ic=0; ic < cellColumn; ic++) {
	    var wValue = dlg.pnl.add('edittext',[startPt[0], startPt[1], startPt[0]+editbox['w'], startPt[1]+editbox['h']],eachCellW[ic]);
	    startPt[0] = startPt[0] + editbox['w'] + gutter;
	    wArr.push(wValue);
	}
	var pnlW = startPt[0]+pnlMargin[2];//
	 
	//????edittext
	startPt = [pnlMargin[0], pnlMargin[1]];
	startPt[1] += editbox['h'] + gutter;//
	 
	for (var ir=0; ir < cellRow; ir++) {
	    var hValue = dlg.pnl.add('edittext',[startPt[0], startPt[1], startPt[0]+editbox['w'], startPt[1]+editbox['h']],eachCellH[ir]);
	    startPt[1] = startPt[1] + editbox['h'] + gutter;
	    hArr.push(hValue);
	}
	var pnlH = startPt[1]+pnlMargin[3];//dlg.pnl height
	 
	dlg.pnl.bounds = [0, 0, pnlW, pnlH];//
	 
	dlg.grp = dlg.add('group')
	dlg.okButton = dlg.grp.add('button',undefined,'ok',{name: 'ok'});
	dlg.cancelButton = dlg.grp.add('button',undefined,'cancel',{name: 'cancel'});
	 
	dlg.okButton.onClick = function(){
	    dlg.close();
	    flg = true;
	}
	dlg.cancelButton.onClick = function(){
	    dlg.close();
	    flg = false;
	}
	dlg.center();
	dlg.show();
	 
	if(flg == true){
	    for (var iw=0; iw < wArr.length; iw++) {
	        if (eval(wArr[iw].text)*1 > 1) {
	            selObj.columns[iw].width = eval(wArr[iw].text) * 1;
	        }
	    }
	    for (var ih=0; ih < hArr.length; ih++) {
	        if (eval(hArr[ih].text)*1 > 1) {
	            selObj.rows[ih].height = eval(hArr[ih].text) * 1;
	        }
	    }
	}