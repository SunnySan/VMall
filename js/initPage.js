/**********這個檔案是頁面 header/footer的初始化設定 **********/

var i = 0;
$(document).find("div[data-role='page']").each(function(){
	var pageid="";
	var sEval = "";
	
	pageid=$(this).attr('id');
	//產生頁面上方的回上頁/首頁按鈕
	$('#' + pageid).on('pagebeforecreate', function () {
		generateHeaderGoHomeButton(pageid);
	});

	//產生頁面下方的滑動選單
	if (i==0){	//第0頁的GA追蹤已經在initPhoneGap.js或ga.js執行過了，這裡不執行
		$('#' + pageid).one('pageshow', function () {
			//generateFooterMenu();
		});
	}else{
		$('#' + pageid).one('pageshow', function () {
			//generateFooterMenu();	//產生頁面下方的滑動選單
			GATrackPageView(pageid);//GA追蹤
		});
	}

	//設定navbar的高亮項目
	if (pageid.startsWith('rbt')){
		sEval = "hightlightNavbarItem(" + i + ");";
		$('#' + pageid).on('pageshow', function () {
			eval(sEval);	//將頁面上方navbar中的某個項目設為已選取(active)
		});
	}
	if (pageid.indexOf('myQuery')==0){	//查詢頁面，有上下兩個navbar
		if (i<2){	//門市查詢
			sEval = "hightlightNavbarItem(0, " + i + ");";
			$('#' + pageid).on('pageshow', function () {
				eval(sEval);	//將頁面上方navbar中的某個項目設為已選取(active)
			});
		}else{	//只有一個navbar
			sEval = "hightlightNavbarItem(" + parseInt(i-1) + ");";
			$('#' + pageid).on('pageshow', function () {
				eval(sEval);	//將頁面上方navbar中的某個項目設為已選取(active)
			});
		}
	}	//if (pageid.indexOf('myQuery')==0){	//查詢頁面，有上下兩個navbar
	
	i++;
});

//若<a> 中有 "class=external"，點取連結時連到OS的 browser
$(document).on('click', ".external", function (e) {
	if (isRunInApp()){
		e.preventDefault();
		var targetURL = $(this).attr("href");
		window.open(targetURL, "_system");
	}
});
