layui.use('form', function() {
	var form = layui.form;
		
	var country = $("#country"),
		city = $("#city"),
		province = $("#province");
	
	//初始将省份数据赋予
	for (var i in address) {
		addEle(country, address[i].n);
	}
	
	//赋予完成 重新渲染select
	form.render('select');
	
	//向select中 追加内容
	function addEle(ele, value) {
		var optionStr = "";
		optionStr = "<option value=" + value + " >" + value + "</option>";
		ele.append(optionStr);
	}

	//移除select中所有项 赋予初始值
	function removeEle(ele) {
		ele.find("option").remove();
		var optionStar = "<option value=" + "0" + ">" + "请选择" + "</option>";
		ele.append(optionStar);
	}

	var countryText,
		countryIndex,  //国家索引
		provinceText,
		provinceItem, //省索引
		cityIndex; //市索引
	//选定国家后 将该省份的数据读取追加上
	form.on('select(country)', function(data) {
		countryText = data.value;
		$.each(address, function(i, item) {
			if(!item.n)return 
			if (countryText == item.n) {
				countryIndex = i;
				return countryIndex;
			}
		});
		removeEle(city);
		removeEle(province);
	
		$.each(address[countryIndex], function(i, item) {
			if(!item.n)return
			addEle(province, item.n);
		})
		//重新渲染select 
		form.render('select');
	})

	////选定省份后 将对应的数据读取追加上
	form.on('select(province)', function(data) {
		provinceText = data.value;
		// removeEle(country);
		$.each(address[countryIndex], function(i, item) {
			if(!item.n)return
			if (provinceText == item.n) {
				provinceItem = i;
				return provinceItem;
			}
		});
		removeEle(city);
		$.each(address[countryIndex][provinceItem], function(i, item) {

			if(!item.n)return
			for (var n in item) {
				addEle(city, item[n]);
			}
			
		})
		//重新渲染select 
		form.render('select');
	})



})