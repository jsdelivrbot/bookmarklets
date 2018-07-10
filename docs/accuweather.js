//http://realtek.accu-weather.com/widget/realtek/weather-data.asp?location=cityId:349727&metric=1
//http://realtek.accu-weather.com/widget/realtek/city-find.asp?location=london
	
	var weatherurl = "http://realtek.accu-weather.com/widget/realtek/weather-data.asp?location=";
	var locationurl = "http://realtek.accu-weather.com/widget/realtek/city-find.asp?location=";

	var unit=0; // 0  C  1  F

	var recentcity_name_array = new Array(); //recent city name 
	var recentcity_id_array = new Array();   //recent city id 
	var recentcity_num;		 //maxmum 3
	var currentcity_index=0;
	var recentcitystring; //jason format


	var locationlist_name_array = new Array();//location search result list array
	var locationlist_id_array = new Array();
	var location_list_count=0;
	var location_list_lastindex=5;

	var ads_string; //json format
	var ads_resource;
	var ads_clickurl;

	var weather_xml;
	var location_xml;
	var city;
	var observationtime;
	var obsdate;
	var temperature;
	var weathertext;
	var weathericon;
	var humidity;
	var realfeel;
	var windspeed;
	var winddirection;
	var uvindex;
	var radarurl;
	var current_index = 0;
	var prev_index = 0;
	var selected_index = -1;
	var keyStrategy = "MENU";
	var content_index = -1;
	var needrefresh = 0;
	
	var locationtable_index=0; // 0 location   1 select loccation         2 location list
	var content1_index  = 0;	//select location index
	var content2_index = 0;     // locaion list index

	
	var location_total_index=3;  //location +setting + Unit select  number


	//var forecast_obsdate = new Array();
	
	
	var commonutil = new CommonUtil;
	
	var fgheight;
	$(document).keydown(function(event)
    {
		//alert(event.keyCode);
		event.preventDefault();
		if(keyStrategy == "ADS")
		{
			if ((event.keyCode==13) ||(event.keyCode==27))
			{
				$("#coverdiv").remove();
				keyStrategy = "MENU";
				
				window.history.replaceState("{quit: 0}","accuweather","");
			}
		}
		else if(keyStrategy == "MENU")
		{
			if (event.keyCode==38) //up
			{
				current_index--;
				if(current_index < 0)
					current_index = 0;
			}
			else if (event.keyCode==40) //down
			{
				current_index++;
				if(current_index >= 4)
					current_index = 4;
			}
			//else if (event.keyCode==37) //left
			//{
			//}

			else if ((event.keyCode==39)|| (event.keyCode==13))//right enter
			{
				

				if(needrefresh == 1)
				{
					$("#content").empty();
					setfocus(current_index);
					prev_index = current_index;
					needrefresh = 0;
				}
				else
					content_index = 0;
				
				if((current_index == 4) &&(event.keyCode==13))
				{
					if(ads_clickurl != null){
					//popup ads window
					$("body").append("<div id='coverdiv'><div id='adspopupdiv'><iframe id='adspopup' src=''></iframe></div></div>");
					$("#adspopup").attr("src",ads_clickurl);
					//$("#adspopup").attr("src","http://www.baidu.com");
					keyStrategy = "ADS";
					window.history.replaceState("{page: 4}","title4","?page4");
					}

				}
				else if((current_index == 3) &&(event.keyCode==13))
				{
					$("#content").empty();
					setfocus(current_index);
					prev_index = current_index;
					selected_index = current_index;
					setselected(selected_index);
					locationtable_index = 0;
					content_index = location_total_index-2;
					keyStrategy = "LOCATION";
					setcontentfocus(content_index);
					
				}
				else if((current_index <= 3) &&(current_index != 2))
				{
					selected_index = current_index;
					setselected(selected_index);
					if(current_index == 0)
					{
						keyStrategy = "HOME";
						setcontentfocus(content_index);
					}
					else if(current_index == 1)
					{
						keyStrategy = "FORCAST";
						setcontentfocus(content_index);
					}
					//else if(current_index == 2)
					//	keyStrategy = "MAPS";
					else if(current_index == 3)
					{
						if(locationtable_index==0)
						{
							content_index = location_total_index-2;
							keyStrategy = "LOCATION";
							setcontentfocus(content_index);
						}
						else if(locationtable_index==1)
						{	
							content1_index = 0;
							keyStrategy = "LOCATION_1";
							setcontent1focus(content1_index);
						}
						else if(locationtable_index==2)
						{	
							content2_index = 0;
							location_list_lastindex = 5;
							keyStrategy = "LOCATION_2";
							setcontent2focus(content2_index);
							
						}
					}

					
					
					//return;
				}

			}
		}
		else if(keyStrategy == "HOME")
		{
			if (event.keyCode==38) //up
			{
				content_index--;
				if(content_index < 0)
					content_index = 0;
				setcontentfocus(content_index);
			}
			else if (event.keyCode==40) //down
			{
				content_index++;
				if(content_index >= 2)
					content_index = 2;
				setcontentfocus(content_index);
			}
			else if (event.keyCode==37) //left
			{
				$("#home").attr("class","navList_focus");
				keyStrategy = "MENU";
				content_index = -1;
				setcontentfocus(content_index);
			}
			else if (event.keyCode==39) //right
			{
			}
			else if (event.keyCode==13) //enter
			{
				getdetail();
				$("#home").attr("class","navList_focus");
				keyStrategy = "MENU";
				needrefresh = 1;
				return;
			}

		}
		else if(keyStrategy == "FORCAST")
		{
			if (event.keyCode==38) //up
			{
				content_index--;
				if(content_index < 0)
					content_index = 0;
				setcontentfocus(content_index);
			}
			else if (event.keyCode==40) //down
			{
				content_index++;
				if(content_index >= 6)
					content_index = 6;
				setcontentfocus(content_index);
			}
			else if (event.keyCode==37) //left
			{
				$("#forcast").attr("class","navList_focus");
				keyStrategy = "MENU";
				content_index = -1;
				setcontentfocus(content_index);
			}
			else if (event.keyCode==39) //right
			{
			}
			else if (event.keyCode==13) //enter
			{
				getdetail();
				$("#forcast").attr("class","navList_focus");
				keyStrategy = "MENU";
				
				needrefresh = 1;
				return;
			}

		}
		else if(keyStrategy == "LOCATION")
		{
			if (event.keyCode==38) //up
			{
				content_index--;
				if(content_index < 0)
					content_index = 0;
				setcontentfocus(content_index);
			}
			else if (event.keyCode==40) //down
			{
				content_index++;
				if(content_index >= location_total_index-1)
					content_index = location_total_index-1;
				setcontentfocus(content_index);
			}
			else if (event.keyCode==37) //left
			{
				$("#location").attr("class","navList_focus");
				keyStrategy = "MENU";
				content_index = -1;
				setcontentfocus(content_index);
			}
			else if (event.keyCode==39) //right
			{
			}
			else if (event.keyCode==13) //enter
			{
				if(content_index < location_total_index-2)
				{
					if(currentcity_index != content_index)
					{
						currentcity_index = content_index;
						reloadweatherxml(content_index);
						writerecentcity(currentcity_index);
					}
					current_index = 0;
				}
				else if(content_index == location_total_index-2)
				{
					getlocation1();
					locationtable_index = 1;
					keyStrategy = "LOCATION_1";
					content1_index = 0;
					setcontent1focus(content1_index);
					window.history.replaceState("{page: 2}","title2","?page2");
				}
			
				else
					setunit();

			}
		}
		else if(keyStrategy == "LOCATION_1")
		{
			if (event.keyCode==38) //up
			{
				
			}
			else if (event.keyCode==40) //down
			{
				
			}
			else if (event.keyCode==37) //left
			{
				content1_index--;
				setcontent1focus(content1_index);
				if(content1_index < 0)
				{
				$("#location").attr("class","navList_focus");
				keyStrategy = "MENU";
				content1_index = -1;
				setcontent1focus(content1_index);
				}
			}
			else if (event.keyCode==39) //right
			{
				content1_index++;
				if(content1_index >= 1)
					content1_index = 1;
				setcontent1focus(content1_index);
			}
			else if (event.keyCode==13) //enter
			{
				if(content1_index == 0)
				{
					//launch virtual keyboard
				}
				else
				{
					var searchcity=$("#Keyboard").val();
					getlocationlist(searchcity);
					locationtable_index = 2;
					keyStrategy = "LOCATION_2";
					content2_index = 0;
					location_list_lastindex = 5;
					setcontent2focus(content2_index);
					window.history.replaceState("{page: 3}","title3","?page3");
				}
			}
			else if (event.keyCode==27) //return
			{
				$("#content").empty();
				setfocus(3);
				setselected(3);
				locationtable_index = 0;	
				content_index = location_total_index-2;
				keyStrategy = "LOCATION";
				setcontentfocus(content_index);
				window.history.replaceState("{quit: 0}","accuweather","");
				return;
			}
		}
		else if(keyStrategy == "LOCATION_2")
		{
			if (event.keyCode==38) //up
			{
				content2_index--;
				if(content2_index < 0)
					content2_index = 0;
				setcontent2focus(content2_index);
			}
			else if (event.keyCode==40) //down
			{
				content2_index++;
				if(content2_index >= location_list_count)
					content2_index = location_list_count-1;
				setcontent2focus(content2_index);
			}
			else if (event.keyCode==37) //left
			{
				$("#location").attr("class","navList_focus");
				keyStrategy = "MENU";
				content2_index = -1;
				setcontent2focus(content2_index);
			}
			else if (event.keyCode==39) //right
			{
			}
			else if (event.keyCode==27) //return
			{
					getlocation1();
					locationtable_index = 1;
					keyStrategy = "LOCATION_1";
					content1_index = 0;
					setcontent1focus(content1_index);
					window.history.replaceState("{page: 2}","title2","?page2");
			}
			else if (event.keyCode==13) //enter
			{
				current_index = 0;

				if(location_list_count == 0)//when search not found treat enter as return
				{
					getlocation1();
					locationtable_index = 1;
					keyStrategy = "LOCATION_1";
					content1_index = 0;
					setcontent1focus(content1_index);
					window.history.replaceState("{page: 2}","title2","?page2");
					return;
				}
				var flag=0;
				//window.console.debug("recentcity_num="+recentcity_num);
				var i;
				for(i=0;i<recentcity_num;i++)
				{
					if( (recentcity_name_array[i] == locationlist_name_array[content2_index])&&
						(recentcity_id_array[i] == locationlist_id_array[content2_index]))
					{
						if(currentcity_index != i){
							currentcity_index = i;
							reloadweatherxml(i);
							flag  = 2;
						}
						else 
							flag = 1;
						
					}
				}
		
				if(flag == 0)
				{
					for(i=recentcity_num-1;i>=0;i--)
					{
						
						recentcity_name_array[i+1] = recentcity_name_array[i];
						recentcity_id_array[i+1] = recentcity_id_array[i];
					}

					recentcity_name_array[0] = locationlist_name_array[content2_index];
					recentcity_id_array[0] = locationlist_id_array[content2_index];

					if(recentcity_num < 3)
						recentcity_num = recentcity_num+1;

					location_total_index = recentcity_num+2;
					currentcity_index = 0;
					reloadweatherxml(currentcity_index);
				}

					/*
					recentcityxml = //"<?xml version=\"1.0\"  encoding=\"utf-8\" ?>\r\n"+
							"<cities>";
					for(i=0;i<recentcity_num;i++)
					{
						recentcityxml +="<entry><name>"+recentcity_name_array[i]+
							"</name><id>"+recentcity_id_array[i]+
							"</id></entry>";
					}
					
							
					recentcityxml += "</cities>\r\n"
					*/
				if(flag != 1)
				{
					writerecentcity(currentcity_index);
				}	
			}	
		}
		if(prev_index != current_index)
		{
			if(current_index != 4)
				$("#content").empty();
			
			setfocus(current_index);
			prev_index = current_index;
			locationtable_index=0;
			keyStrategy = "MENU";
		}
		
	});


	function writerecentcity(index)
	{
		/* //Since Can Parse XML ,using XML instead of JSON
		var i;
		recentcitystring = "{\"cities\": [";
		for(i=0;i<recentcity_num;i++)
		{
			recentcitystring += "{\"name\": \""+ recentcity_name_array[i]+
				"\", \"id\": \""+recentcity_id_array[i]+
				"\"}";
			if(i != recentcity_num-1)
				recentcitystring += ",";
		}
		recentcitystring +="], ";

		recentcitystring +=  "\"currentcity\":{\"name\":\""+ recentcity_name_array[index]+
			"\", \"id\":\"" + recentcity_id_array[index]+"\"},";
		
		if(unit == 0)
			recentcitystring +=  "\"unit\":\"0\"}";
		else
			recentcitystring +=  "\"unit\":\"1\"}";

		

		//alert(recentcitystring);
		
		commonutil.execCmd("writeStringToFile",
			"/usr/local/etc/dvdplayer/accucity",
			recentcitystring);
		*/

		recentcityxml = "<?xml version=\"1.0\"  encoding=\"utf-8\" ?>\r\n"+"<cities>\r\n"+
							"<currentcity>"+recentcity_id_array[index]+"</currentcity>\r\n";
					
		if(unit == 0)
			recentcityxml += "<unit>0</unit>\r\n";			
		else						
			recentcityxml += "<unit>1</unit>\r\n";	


		var i;
		
		for(i=0;i<recentcity_num;i++)
		{
			recentcityxml += "<city>\r\n";
			recentcityxml += ("<name>"+recentcity_name_array[i]+"</name>\r\n");
			recentcityxml += ("<id>"+recentcity_id_array[i]+"</id>\r\n");
			recentcityxml += "</city>\r\n";	
		}
		recentcityxml += "</cities>";



		commonutil.execCmd("writeStringToFile",
			"/usr/local/etc/dvdplayer/accucity.xml",
			recentcityxml);
	}

	function reloadweatherxml(index)
	{
		var arg;
		if(unit==0)
			arg = weatherurl+recentcity_id_array[index]+"&metric=1"
		else 
			arg = weatherurl+recentcity_id_array[index];

		
		weather_xml = commonutil.execCmd("getURL",arg);
		parseXml(weather_xml);
	}


	function setselected(index)
	{
		if(index==0)
			$("#home").attr("class","navList_selected");
		else if(index==1)
			$("#forcast").attr("class","navList_selected");
		else if(index==2)
			$("#maps").attr("class","navList_selected");
		else if(index==3)
			$("#location").attr("class","navList_selected");
	}


	function setcontent1focus(index)
	{
		if(index == 0)
		{
			$("#Keyboard").attr("class","input_focus");
			$("#Keyboard").focus();
			$("#Search").attr("class","search_unfocus");
		}
		else if(index == 1)
		{
			$("#Keyboard").attr("class","input_unfocus");
			$("#Search").attr("class","search_focus");
			$("#Keyboard").blur();
			
		}
		else{
			$("#Keyboard").attr("class","input_unfocus");
			$("#Search").attr("class","search_unfocus");
			$("#Keyboard").blur();
		}
	}

	function setcontent2focus(index)
	{
		
		var i;
		if(location_list_count <= 5)
		{
			for(i=0;i<location_list_count;i++)
			{
				var id = "#table_td"+i;
				if(index == i)
					$(id).attr("class","list_focus");
				else
					$(id).attr("class","list_unfocus");
			}

			/*
			for(i=location_list_count;i<6;i++)
			{
				var id = "#table_td"+i;
				$(id).attr("class","list_unfocus");
			}
			*/

			/*
			var top = 58+index*fgheight;
			if(index == -1)
				top = 58;
			var toppx = top+"px";
			
			$("#scrollfg").css("top",toppx);
			*/

		}
		else
		{
			if (index >location_list_lastindex)
			{
				location_list_lastindex = index;
			}

			if((index < location_list_lastindex -4) && (index != -1))
			{
				location_list_lastindex--;
			}

			for(i=0;i<5;i++)
			{
				var id = "#table_td"+i;
				if(index == i+location_list_lastindex -4)
					$(id).attr("class","list_focus");
				else
					$(id).attr("class","list_unfocus");

				var locationid  = "#location"+i;
				var tmp = i+ location_list_lastindex -4;
				var locationtext = locationlist_name_array[tmp];
				$(locationid).text(locationtext);
			}
			
			
			var delta = 317*index/location_list_count;
			var top = 56+ delta;

			if(index == -1)
				top = 56;

			var toppx = top+"px";
			$("#scrollfg").css("top",toppx);
		}
		

	}


	function setunit()
	{
		if(unit ==0)
		{
			unit = 1;
			$("#unit").text("буF");
			reloadweatherxml(currentcity_index);
			writerecentcity(currentcity_index);

		}
		else{
			unit = 0;
			$("#unit").text("буC");
			reloadweatherxml(currentcity_index);
			writerecentcity(currentcity_index);
		}
	}

	function getlocation1()
	{
		$("#content").empty();
		$("#content").append("<table border='0' id='locationbgtable'></table>");
		$("#locationbgtable").append("<p id='locationtitle'>Location/Settings > Select Location</p>");
		$("#locationbgtable").append("<table border='0' id='selecttable'></table>");

		$("#locationbgtable").append("<div id='hint_return'></div><p id='hint_textreturn'>RETURN</p>");

		$("#selecttable").append("<tr><td id='table_td0' class='locationtd2'><div>"+
			"<p id='EnterLocation'>Enter Location</p>"+
			"<input type=text id='Keyboard' class='input_unfocus' value='Launch Virtual Keyboard'></input>"+
			"<p id='Search' class='search_unfocus'>Search</p>"+
			"</div></td></tr>");


	}


	function getlocationlist(searchcity)
	{

		var url =  locationurl + searchcity;

		var location_xml = commonutil.execCmd("getURL",url);
		
		var i=0;
		$(location_xml).find("citylist").find("location").each(function()
		{
			locationlist_name_array[i] = $(this).attr("city")+" "+
										 $(this).attr("adminArea")+" "+
										 $(this).attr("countryCode");
			locationlist_id_array[i]= $(this).attr("location");
			i++;
		});
		location_list_count = i;



		$("#content").empty();
		$("#content").append("<table border='0' id='locationbgtable'></table>");
		$("#locationbgtable").append("<p id='locationtitle'>Location/Settings > Select Location > Location List</p>");
		$("#locationbgtable").append("<table border='0' id='listtable'></table>");
		$("#locationbgtable").append("<div id='listtablebg' class='scrollbg'></div>");
		$("#locationbgtable").append("<div id='scrollfg'></div>");

		$("#scrollfg").css("top","56px");
		
		$("#locationbgtable").append("<div id='hint_return'></div><p id='hint_textreturn'>RETURN</p>");
		$("#locationbgtable").append("<div id='hint_ok'></div><p id='hint_textok'>OK</p>");

		$("#locationtitle").text("Search Result: " + searchcity);
		var i = 0;

		if(location_list_count == 0)
		{
		$("#locationbgtable").append("<div id='hint_search'></div><p id='hint_textsearch'>Search not found</p>");
		}

		//location_list_count = 15;
		if(location_list_count <= 5)
		{
			for(i=0;i<location_list_count;i++)
			{
				var locationid = "location"+i; 
				var tdid ="table_td"+i;
				$("#listtable").append("<tr><td id='"+tdid+
				"'>"+
				"<p id='"+locationid+ 
				"'>"+locationlist_name_array[i]+
				"</p>"+
				"</td></tr>");
			}
			//fgheight = 317/location_list_count;
			fgheight = 0;	
			$("#scrollfg").css("height", fgheight+"px");
			
			/*
			for(i=location_list_count;i<6;i++)
			{
				var tdid ="table_td"+i;
				$("#listtable").append("<tr><td id='"+tdid+
				"'>"+
				"</td></tr>");
			}
			*/
		}
		else{

			for(i=0;i<5;i++)
			{
				var locationid = "location"+i; 
				var tdid ="table_td"+i;
				$("#listtable").append("<tr><td id='"+tdid+
				"'>"+
				"<p id='"+locationid+ 
				"'>"+locationlist_name_array[i]+
				"</p>"+
				"</td></tr>");
			}
			fgheight = 317/location_list_count;
				
			$("#scrollfg").css("height", fgheight+"px");
		}
		
		$("#hint_return").attr("src","images/hint_return.png");
	}



	function setcontentfocus(index)
	{
		if(current_index == 0)
		{
			if(index == 0)
			{
				$("#table_td0").attr("class","curtd_focus");
				$("#table_td1").attr("class","curtd_unfocus");
				$("#table_td2").attr("class","curtd_unfocus");
			}
			else if(index == 1)
			{
				$("#table_td0").attr("class","curtd_unfocus");
				$("#table_td1").attr("class","curtd_focus");
				$("#table_td2").attr("class","curtd_unfocus");
			}
			else if(index == 2)
			{
				$("#table_td0").attr("class","curtd_unfocus");
				$("#table_td1").attr("class","curtd_unfocus");
				$("#table_td2").attr("class","curtd_focus");
			}
			else
			{
				$("#table_td0").attr("class","curtd_unfocus");
				$("#table_td1").attr("class","curtd_unfocus");
				$("#table_td2").attr("class","curtd_unfocus");
			}
		}
		else if(current_index == 1)
		{
			if(index == 0)
			{
				$("#table_td0").attr("class","forcasttd_focus");
				$("#table_td1").attr("class","forcasttd_unfocus");
				$("#table_td2").attr("class","forcasttd_unfocus");
				$("#table_td3").attr("class","forcasttd_unfocus");
				$("#table_td4").attr("class","forcasttd_unfocus");
				$("#table_td5").attr("class","forcasttd_unfocus");
				$("#table_td6").attr("class","forcasttd_unfocus");
				
			}
			else if(index == 1)
			{
				$("#table_td0").attr("class","forcasttd_unfocus");
				$("#table_td1").attr("class","forcasttd_focus");
				$("#table_td2").attr("class","forcasttd_unfocus");
				$("#table_td3").attr("class","forcasttd_unfocus");
				$("#table_td4").attr("class","forcasttd_unfocus");
				$("#table_td5").attr("class","forcasttd_unfocus");
				$("#table_td6").attr("class","forcasttd_unfocus");
			}
			else if(index == 2)
			{
				$("#table_td0").attr("class","forcasttd_unfocus");
				$("#table_td1").attr("class","forcasttd_unfocus");
				$("#table_td2").attr("class","forcasttd_focus");
				$("#table_td3").attr("class","forcasttd_unfocus");
				$("#table_td4").attr("class","forcasttd_unfocus");
				$("#table_td5").attr("class","forcasttd_unfocus");
				$("#table_td6").attr("class","forcasttd_unfocus");
			}
			else if(index == 3)
			{
				$("#table_td0").attr("class","forcasttd_unfocus");
				$("#table_td1").attr("class","forcasttd_unfocus");
				$("#table_td2").attr("class","forcasttd_unfocus");
				$("#table_td3").attr("class","forcasttd_focus");
				$("#table_td4").attr("class","forcasttd_unfocus");
				$("#table_td5").attr("class","forcasttd_unfocus");
				$("#table_td6").attr("class","forcasttd_unfocus");
			}
			else if(index == 4)
			{
				$("#table_td0").attr("class","forcasttd_unfocus");
				$("#table_td1").attr("class","forcasttd_unfocus");
				$("#table_td2").attr("class","forcasttd_unfocus");
				$("#table_td3").attr("class","forcasttd_unfocus");
				$("#table_td4").attr("class","forcasttd_focus");
				$("#table_td5").attr("class","forcasttd_unfocus");
				$("#table_td6").attr("class","forcasttd_unfocus");
			}
			else if(index == 5)
			{
				$("#table_td0").attr("class","forcasttd_unfocus");
				$("#table_td1").attr("class","forcasttd_unfocus");
				$("#table_td2").attr("class","forcasttd_unfocus");
				$("#table_td3").attr("class","forcasttd_unfocus");
				$("#table_td4").attr("class","forcasttd_unfocus");
				$("#table_td5").attr("class","forcasttd_focus");
				$("#table_td6").attr("class","forcasttd_unfocus");
			}
			else if(index == 6)
			{
			$("#table_td0").attr("class","forcasttd_unfocus");
				$("#table_td1").attr("class","forcasttd_unfocus");
				$("#table_td2").attr("class","forcasttd_unfocus");
				$("#table_td3").attr("class","forcasttd_unfocus");
				$("#table_td4").attr("class","forcasttd_unfocus");
				$("#table_td5").attr("class","forcasttd_unfocus");
				$("#table_td6").attr("class","forcasttd_focus");
			}
			else
			{
				$("#table_td0").attr("class","forcasttd_unfocus");
				$("#table_td1").attr("class","forcasttd_unfocus");
				$("#table_td2").attr("class","forcasttd_unfocus");
				$("#table_td3").attr("class","forcasttd_unfocus");
				$("#table_td4").attr("class","forcasttd_unfocus");
				$("#table_td5").attr("class","forcasttd_unfocus");
				$("#table_td6").attr("class","forcasttd_unfocus");
			}
		}
		else if(current_index == 3)
		{
			if(index == 0)
			{
				$("#table_td0").attr("class","locationtd_focus");
				$("#table_td1").attr("class","locationtd_unfocus");
				$("#table_td2").attr("class","locationtd_unfocus");
				$("#table_td3").attr("class","locationtd_unfocus");	
				$("#table_td4").attr("class","locationtd_unfocus");	
			}
			else if(index == 1)
			{
				$("#table_td0").attr("class","locationtd_unfocus");
				$("#table_td1").attr("class","locationtd_focus");
				$("#table_td2").attr("class","locationtd_unfocus");
				$("#table_td3").attr("class","locationtd_unfocus");	
				$("#table_td4").attr("class","locationtd_unfocus");	
			}
			else if(index == 2)
			{
				$("#table_td0").attr("class","locationtd_unfocus");
				$("#table_td1").attr("class","locationtd_unfocus");
				$("#table_td2").attr("class","locationtd_focus");
				$("#table_td3").attr("class","locationtd_unfocus");	
				$("#table_td4").attr("class","locationtd_unfocus");	
			}
			else if(index == 3)
			{
				$("#table_td0").attr("class","locationtd_unfocus");
				$("#table_td1").attr("class","locationtd_unfocus");
				$("#table_td2").attr("class","locationtd_unfocus");
				$("#table_td3").attr("class","locationtd_focus");	
				$("#table_td4").attr("class","locationtd_unfocus");	
			}
			else if(index == 4)
			{
				$("#table_td0").attr("class","locationtd_unfocus");
				$("#table_td1").attr("class","locationtd_unfocus");
				$("#table_td2").attr("class","locationtd_unfocus");
				$("#table_td3").attr("class","locationtd_unfocus");	
				$("#table_td4").attr("class","locationtd_focus");	
			}
			else
			{
				$("#table_td0").attr("class","locationtd_unfocus");
				$("#table_td1").attr("class","locationtd_unfocus");
				$("#table_td2").attr("class","locationtd_unfocus");
				$("#table_td3").attr("class","locationtd_unfocus");	
				$("#table_td4").attr("class","locationtd_unfocus");	
			}
			
		}
	}

	$(document).ready(function()
	{
	  /*$.ajax({
		url: "aaa.xml",
		type: "GET",
		dataType: "xml",
		error: function() { alert("error");},
		success: function(xml) { 
			weather_xml = xml;parseXml(weather_xml); 
			setfocus(current_index);
		}
	  });*/

		var arg;

		/*
		recentcitystring =  commonutil.execCmd("readStringFromFile","/usr/local/etc/dvdplayer/accucity");
		
		if(!recentcitystring)
		{
			recentcity_num = 1;
			recentcity_name_array[0] = "New York";
			recentcity_id_array[0] =  "cityId:349727";
			currentcity_index = 0;
			unit = 0;
		}
		else
		{
			var i;
			recentcity_num = 0;

			//var aaa = {"cities": [{"name": "new york", "id": "aaa"},{"name": "bei jing", "id": "bbb"},{"name": "london", "id": "ccc"}]};

			//var myJSONObject =eval('(' + recentcitystring + ')');

			var myJSONObject =jQuery.parseJSON(recentcitystring);
			var currentcity_id = myJSONObject.currentcity.id;
			
			if(myJSONObject.unit == "0")
				unit = 0;
			else if(myJSONObject.unit == "1")
				unit = 1;

			for(i=0;i<myJSONObject.cities.length;i++)
			{
				recentcity_name_array[i] = myJSONObject.cities[i].name;
				recentcity_id_array[i] =  myJSONObject.cities[i].id;
				//alert(recentcity_name_array[i]);
				//alert(recentcity_id_array[i]);
				if(recentcity_id_array[i] == currentcity_id)
					currentcity_index = i;
			}
			recentcity_num = myJSONObject.cities.length;
	

		}
		*/

		recentcitystring =  commonutil.execCmd("readStringFromFile","/usr/local/etc/dvdplayer/accucity.xml");
		if(!recentcitystring)
                        recentcitystring =  commonutil.execCmd("readStringFromFile","/system/rtk_rootfs/usr/local/bin/accuweather/defaultcity.xml");
		
		if(!recentcitystring)
		{
			recentcity_num = 1;
			recentcity_name_array[0] = "New York";
			recentcity_id_array[0] =  "cityId:349727";
			currentcity_index = 0;
			unit = 0;
		}
		else
		{
			recentcity_num = 0;

			var xmlobj =$.parseXML(recentcitystring);

			var currentcity_id = $(xmlobj).find("cities").find("currentcity").text();
			
			var currentunit = $(xmlobj).find("cities").find("unit").text();
			
			if(currentunit == "0")
				unit = 0;
			else if(currentunit == "1")
				unit = 1;

			$(xmlobj).find("cities").find("city").each(function()
			{
			
				recentcity_name_array[recentcity_num] = $(this).find("name").text();
				recentcity_id_array[recentcity_num] =  $(this).find("id").text();
				//alert(recentcity_name_array[recentcity_num]);
				//alert(recentcity_id_array[recentcity_num]);

				if(recentcity_id_array[recentcity_num] == currentcity_id)
					currentcity_index = recentcity_num;

				recentcity_num++;
			});
			
		}

		if(unit==0)
			arg = weatherurl+recentcity_id_array[currentcity_index]+"&metric=1";
		else 
			arg = weatherurl+recentcity_id_array[currentcity_index];


		weather_xml = commonutil.execCmd("getURL",arg);
		parseXml(weather_xml);
		setfocus(current_index);

		ads_resource = "images/adsfeed_error.jpg";
		ads_clickurl = null;	
		$("#adsimg").attr("src",ads_resource);

		ads_string = commonutil.execCmd("getURL","http://ad.doubleclick.net/adx/accuwx.products/tv-apps/realtek-v1;dcmt=application/json;sz=300x250;");
	
		if(ads_string)
		{	
			var ads_json =jQuery.parseJSON(ads_string);
			if(ads_json != null){
				ads_resource = ads_json.resource;
				ads_clickurl = ads_json.clickurl;
				$("#adsimg").attr("src",ads_resource);
			}
		}
		//$.getJSON("http://ad.doubleclick.net/adx/accuwx.products/tv-apps/realtek-v1;dcmt=application/json;sz=300x250;ord=[INSERT_RANDOM_NUMBER_HERE]&callback=?",ADSJsonCallback);
		

	});
	
	//function ADSJsonCallback(jason)
	//{
	//	alert(jason.resource);
	//}


	function parseXml(xml)
	{
		city = $(xml).find("local").find("city").text();
		observationtime = $(xml).find("currentconditions").find("observationtime").text();
		temperature = $(xml).find("currentconditions").find("temperature").text();
		weathertext = $(xml).find("currentconditions").find("weathertext").text();
		weathericon = $(xml).find("currentconditions").find("weathericon").text();
		humidity = $(xml).find("currentconditions").find("humidity").text();
		realfeel = $(xml).find("currentconditions").find("realfeel").text();
		windspeed = $(xml).find("currentconditions").find("windspeed").text();
		winddirection = $(xml).find("currentconditions").find("winddirection").text();
		uvindex = $(xml).find("currentconditions").find("uvindex").attr("index");
		radarurl = $(xml).find("images").find("radar").text();
	
		$(xml).find("forecast").find("day").each(function()
		{
				var daynumber = $(this).attr("number");
				if(daynumber == "1")
					obsdate = $(this).find("obsdate").text();
		});

		var iconfilename="images/icons/"+weathericon+".png";
		$("#wicon").attr("src",iconfilename);
		$("#ShortText").text(weathertext);
		$("#Temperature").text(temperature+ "бу");
		$("#RealFeel").text("RealFeel "+ realfeel+ "бу");

		$("#City").text(city);
		$("#Date").text(obsdate+"  "+ observationtime);
	}

	function getdetail()
	{
		//alert("Get Detail");
		$("#content").empty();
		$("#content").append("<table border='0' id='detailtable'></table>");
		$("#detailtable").append("<tr><td id='table_td0' class='detailtd'><div>"+
					"<p id='title'>Details For Today</p>"+
					"<img id='detaildayicon' src=''></img>"+
					"<p id='detaillowhigh0'>Hi</p>"+
					"<p id='detailtemp0'>50бу</p>"+
					"<p id='detailrealfeel0'>RealFeel </p>"+
					"<p id='daylongtext'>A little afternoon rain  </p>"+
					"<div class='weatherdetail0'>"+
					"<p id='realfeel0'>RealFeel:</p>"+
					"<p id='wind0'>Winds:(dir/Speed)</p>"+
					"<p id='uv0'>Max UV Index:</p>"+
					"<p id='storm0'>Thunderstorm Probility:</p>"+
					"<p id='rain0'>Amount of Rain:</p>"+
					"<p id='snow0'>Amount of Snow:</p>"+
					"</div>"+
					"<img id='detailnighticon' src=''></img>"+
					"<p id='detaillowhigh1'>Lo</p>"+
					"<p id='detailtemp1'>50бу</p>"+
					"<p id='detailrealfeel1'>RealFeel 60бу</p>"+
					"<p id='nightlongtext'>A little afternoon rain</p>"+
					"<div class='weatherdetail1'>"+
					"<p id='realfeel1'>RealFeel:</p>"+
					"<p id='wind1'>Winds:(dir/Speed)</p>"+
					"<p id='storm1'>Thunderstorm Probility:</p>"+
					"<p id='rain1'>Amount of Rain:</p>"+
					"<p id='snow1'>Amount of Snow:</p>"+
					"</div>"+
					"<div class='day'>"+
					"<p id='sunrise'>Sunrise:</p>"+
					"<p id='sunset'>Sunset:</p>"+
					"<p id='daylight'>Hours of Daylight:</p>"+
					"</div>"+
					"</div></td></tr>");

		


		$(weather_xml).find("forecast").find("day").each(function()
		{
				var daynumber = $(this).attr("number");
				var dayindex;
				if(daynumber == "1")
					dayindex = 0;
				else if(daynumber == "2")
					dayindex = 1;
				else if(daynumber == "3")
					dayindex = 2;
				else if(daynumber == "4")
					dayindex = 3;
				else if(daynumber == "5")
					dayindex = 4;
				else if(daynumber == "6")
					dayindex = 5;
				else if(daynumber == "7")
					dayindex = 6;

				if(dayindex == content_index)
				{
					
					

					var obsdate = $(this).find("obsdate").text();
					var daycode = $(this).find("daycode").text();
					var sunrise = $(this).find("sunrise").text();
					var sunset = $(this).find("sunset").text();
					
					if(current_index != 0)
					{
						$("#title").text("Details For "+obsdate);
					}else
					{
						if(dayindex ==1)
							$("#title").text("Details For Tomorrow");
						else if(dayindex ==2)
							$("#title").text("Details For "+daycode);

					}


					var txtshort = $(this).find("daytime").find("txtshort").text();
					var txtlong = $(this).find("daytime").find("txtlong").text();
					var weathericon = $(this).find("daytime").find("weathericon").text();
					var iconfilename="images/icons/"+weathericon+".png";
					var hightemperature = $(this).find("daytime").find("hightemperature").text();
					var lowtemperature = $(this).find("daytime").find("lowtemperature").text();
					var realfeelhigh = $(this).find("daytime").find("realfeelhigh").text();
					var realfeellow = $(this).find("daytime").find("realfeellow").text();
					var windspeed = $(this).find("daytime").find("windspeed").text();
					var winddirection = $(this).find("daytime").find("winddirection").text();
					var maxuv = $(this).find("daytime").find("maxuv").text();
					var rainamount = $(this).find("daytime").find("rainamount").text();
					var snowamount = $(this).find("daytime").find("snowamount").text();
					var tstormprob = $(this).find("daytime").find("tstormprob").text();

					
					$("#detaildayicon").attr("src",iconfilename);
					$("#detailtemp0").text(hightemperature+"бу");
					$("#detailrealfeel0").text("RealFeel "+realfeelhigh+"бу");
					$("#daylongtext").text(txtshort+"   ");
					$("#realfeel0").text("RealFeel: "+realfeelhigh+"бу");
					$("#wind0").text("Winds:(dir/Speed): "+winddirection+"/"+windspeed);
					$("#uv0").text("Max UV Index: "+maxuv);
					$("#storm0").text("Thunderstorm Probility: "+tstormprob);
					$("#rain0").text("Amount of Rain: "+rainamount);
					$("#snow0").text("Amount of Snow: "+snowamount);


					txtshort = $(this).find("nighttime").find("txtshort").text();
					txtlong = $(this).find("nighttime").find("txtlong").text();
					weathericon = $(this).find("nighttime").find("weathericon").text();
					iconfilename="images/icons/"+weathericon+".png";
					hightemperature = $(this).find("nighttime").find("hightemperature").text();
					lowtemperature = $(this).find("nighttime").find("lowtemperature").text();
					realfeelhigh = $(this).find("nighttime").find("realfeelhigh").text();
					realfeellow = $(this).find("nighttime").find("realfeellow").text();
					windspeed = $(this).find("nighttime").find("windspeed").text();
					winddirection = $(this).find("nighttime").find("winddirection").text();
					maxuv = $(this).find("nighttime").find("maxuv").text();
					rainamount = $(this).find("nighttime").find("rainamount").text();
					snowamount = $(this).find("nighttime").find("snowamount").text();
					tstormprob = $(this).find("nighttime").find("tstormprob").text();

					$("#detailnighticon").attr("src",iconfilename);
					$("#detailtemp1").text(lowtemperature+"бу");
					$("#detailrealfeel1").text("RealFeel "+realfeellow+"бу");
					$("#nightlongtext").text(txtshort+"   ");
					$("#realfeel1").text("RealFeel: "+realfeellow+"бу");
					$("#wind1").text("Winds:(dir/Speed): "+winddirection+"/"+windspeed);
					$("#uv1").text("Max UV Index: "+maxuv);
					$("#storm1").text("Thunderstorm Probility: "+tstormprob);
					$("#rain1").text("Amount of Rain: "+rainamount);
					$("#snow1").text("Amount of Snow: "+snowamount);

					$("#sunrise").text("Sunrise:"+sunrise);
					$("#sunset").text("Sunset:"+sunset);

					var sunrisearray  = sunrise.split(":");
					var sunrisehour = null;
					var sunriseminute = null;
					if(sunrisearray.length == 2)
					{
						sunrisehour =  Number(sunrisearray[0]);
						//alert(sunrisehour);
						var sunriseminutearray = sunrisearray[1].split(" ");
						if((sunriseminutearray.length == 2) &&(sunriseminutearray[1] == "AM"))
						{
							sunriseminute = Number(sunriseminutearray[0]);
							//alert(sunriseminute);
						}
					}

					var sunsetarray  = sunset.split(":");
					var sunsethour = null;
					var sunsetminute = null;
					if(sunsetarray.length == 2)
					{
						sunsethour =  Number(sunsetarray[0]);
						//alert(sunsethour);
						var sunsetminutearray = sunsetarray[1].split(" ");
						if((sunsetminutearray.length == 2) &&(sunsetminutearray[1] == "PM"))
						{
							sunsetminute = Number(sunsetminutearray[0]);
							//alert(sunriseminute);
						}
						sunsethour =  sunsethour + 12;
					}

					var daylighthour;
					var daylightminute;
					if(sunrisehour && sunriseminute && sunsethour && sunsetminute)
					{
						if(sunsetminute < sunriseminute)
						{
							sunsethour = sunsethour -1;
							sunsetminute = sunsetminute + 60;
						}
						daylighthour = sunsethour - sunrisehour;
						daylightminute = sunsetminute - sunriseminute;
						$("#daylight").text("Hours of Daylight:"+daylighthour+":"+daylightminute);

					}


				}
		});

		


		
	}





	function setfocus(index)
	{
		if(index==0)
		{
			$("#home").attr("class","navList_focus");
			$("#forcast").attr("class","navList_unfocus");
			$("#maps").attr("class","navList_unfocus");
			$("#location").attr("class","navList_unfocus");
			$("#ads").attr("class","ads_unfocus");

			
			$("#content").append("<table border='0' id='currenttable'></table>");

			$("#currenttable").append("<tr><td id='table_td0' class='curtd_unfocus'><div>" +
			"<img id='wicon1' src='' alt='' name='weather icon' width='64' height='40'></img>" +
			"<p id='day1' class='day'>Today</p>" +
			"<p id='date1' class='date'>Tue Apr 19</p>" +
			"<p id='longtext1' class='longtext'>A Little Afternoon Rain</p>" +
			"<p id='hightemp1' class='hightemp'>60бу</p>"+
			"<p id='lowtemp1' class='lowtemp'>/50бу</p>"+
			"<p class='more'>More</p>"+
			"</div></td></tr>");
		
			$("#currenttable").append("<tr><td id='table_td1' class='curtd_unfocus'><div>"+
			"<img id='wicon2' src='' alt='' name='weather icon' width='64' height='40'></img>"+
			"<p id='day2' class='day'>Tomorrow</p>"+
			"<p id='date2' class='date'>Tue Apr 19</p>"+
			"<p id='longtext2' class='longtext'>A Little Afternoon Rain</p>"+
			"<p id='hightemp2' class='hightemp'>60бу</p>"+
			"<p id='lowtemp2' class='lowtemp'>/50бу</p>"+
			"<p class='more'>More</p>"+
			"</div></td></tr>");

			$("#currenttable").append("<tr><td id='table_td2' class='curtd_unfocus'><div>"+
			"<img id='wicon3' src='' alt='' name='weather icon' width='64' height='40'></img>"+
			"<p id='day3' class='day'>After Tomorrow</p>"+
			"<p id='date3' class='date'>Tue Apr 19</p>"+
			"<p id='longtext3' class='longtext'>A Little Afternoon Rain</p>"+
			"<p id='hightemp3' class='hightemp'>60бу</p>"+
			"<p id='lowtemp3' class='lowtemp'>/50бу</p>"+
			"<p class='more'>More</p>"+
			"</div></td></tr>");	

			
			$(weather_xml).find("forecast").find("day").each(function()
			{
				var daynumber = $(this).attr("number");
				if((daynumber == "1")||(daynumber == "2")||(daynumber == "3"))
				{
					var obsdate = $(this).find("obsdate").text();
					var daycode = $(this).find("daycode").text();
					var sunrise = $(this).find("sunrise").text();
					var sunset = $(this).find("sunset").text();

					if(daynumber == "3")
						$("#day3").text(daycode);

					var txtshort = $(this).find("daytime").find("txtshort").text();
					var txtlong = $(this).find("daytime").find("txtlong").text();
					var weathericon = $(this).find("daytime").find("weathericon").text();
					var hightemperature = $(this).find("daytime").find("hightemperature").text();
					var lowtemperature = $(this).find("daytime").find("lowtemperature").text();
					var realfeelhigh = $(this).find("daytime").find("realfeelhigh").text();
					var realfeellow = $(this).find("daytime").find("realfeellow").text();
					var windspeed = $(this).find("daytime").find("windspeed").text();
					var winddirection = $(this).find("daytime").find("winddirection").text();
					var maxuv = $(this).find("daytime").find("maxuv").text();
					var rainamount = $(this).find("daytime").find("rainamount").text();
					var snowamount = $(this).find("daytime").find("snowamount").text();
					var tstormprob = $(this).find("daytime").find("tstormprob").text();


					var wicon = "#wicon"+daynumber;
					var iconfilename="images/icons/"+weathericon+".png";
					$(wicon).attr("src",iconfilename);
					var date = "#date" + daynumber;
					$(date).text(obsdate);
					var longtext = "#longtext"+daynumber;
					$(longtext).text(txtshort);

					var hightemp = "#hightemp"+daynumber;
					$(hightemp).text(hightemperature+"бу");

					var lowtemp = "#lowtemp"+daynumber;
					$(lowtemp).text("/"+lowtemperature+"бу");
				}
			});
	
		}
	
		
		else if(index==1)
		{
			$("#home").attr("class","navList_unfocus");
			$("#forcast").attr("class","navList_focus");
			$("#maps").attr("class","navList_unfocus");
			$("#location").attr("class","navList_unfocus");
			$("#ads").attr("class","ads_unfocus");

			$("#content").append("<table border='0' id='forcasttable'></table>");
			
			$("#forcasttable").append("<tr><td id='table_td0' class='forcasttd_unfocus'><div>"+
			"<img id='wicon1' src='' alt='' name='weather icon' width='64' height='40'></img>"+
			"<p id='date1' class='date'>Apr 20(THU)</p>"+
			//"<p id='longtext1' class='longtext'>A Little Afternoon Rain</p>"+
			"<p id='lowhigh1' class='lowhigh'>Hi</p>"+
			"<p id='temp1' class='temp'>50бу</p>"+
			"<p id='realfeel1' class='realfeel'>RealFeel 60бу</p>"+
			"<p class='more'>More</p>"+
			"</div></td></tr>");

			$("#forcasttable").append("<tr><td id='table_td1' class='forcasttd_unfocus'><div>"+
			"<img id='wicon2' src='' alt='' name='weather icon' width='64' height='40'></img>"+
			"<p id='date2' class='date'>Apr 20(THU)</p>"+
			//"<p id='longtext2' class='longtext'>A Little Afternoon Rain</p>"+
			"<p id='lowhigh2' class='lowhigh'>Hi</p>"+
			"<p id='temp2' class='temp'>50бу</p>"+
			"<p id='realfeel2' class='realfeel'>RealFeel 60бу</p>"+
			"<p class='more'>More</p>"+
			"</div></td></tr>");

			$("#forcasttable").append("<tr><td id='table_td2' class='forcasttd_unfocus'><div>"+
			"<img id='wicon3' src='' alt='' name='weather icon' width='64' height='40'></img>"+
			"<p id='date3' class='date'>Apr 20(THU)</p>"+
			//"<p id='longtext3' class='longtext'>A Little Afternoon Rain</p>"+
			"<p id='lowhigh3' class='lowhigh'>Hi</p>"+
			"<p id='temp3' class='temp'>50бу</p>"+
			"<p id='realfeel3' class='realfeel'>RealFeel 60бу</p>"+
			"<p class='more'>More</p>"+
			"</div></td></tr>");

			$("#forcasttable").append("<tr><td id='table_td3' class='forcasttd_unfocus'><div>"+
			"<img id='wicon4' src='' alt='' name='weather icon' width='64' height='40'></img>"+
			"<p id='date4' class='date'>Apr 20(THU)</p>"+
			//"<p id='longtext4' class='longtext'>A Little Afternoon Rain</p>"+
			"<p id='lowhigh4' class='lowhigh'>Hi</p>"+
			"<p id='temp4' class='temp'>50бу</p>"+
			"<p id='realfeel4' class='realfeel'>RealFeel 60бу</p>"+
			"<p class='more'>More</p>"+
			"</div></td></tr>");

			$("#forcasttable").append("<tr><td id='table_td4' class='forcasttd_unfocus'><div>"+
			"<img id='wicon5' src='' alt='' name='weather icon' width='64' height='40'></img>"+
			"<p id='date5' class='date'>Apr 20(THU)</p>"+
			//"<p id='longtext5' class='longtext'>A Little Afternoon Rain</p>"+
			"<p id='lowhigh5' class='lowhigh'>Hi</p>"+
			"<p id='temp5' class='temp'>50бу</p>"+
			"<p id='realfeel5' class='realfeel'>RealFeel 60бу</p>"+
			"<p class='more'>More</p>"+
			"</div></td></tr>");

			$("#forcasttable").append("<tr><td id='table_td5' class='forcasttd_unfocus'><div>"+
			"<img id='wicon6' src='' alt='' name='weather icon' width='64' height='40'></img>"+
			"<p id='date6' class='date'>Apr 20(THU)</p>"+
			//"<p id='longtext6' class='longtext'>A Little Afternoon Rain</p>"+
			"<p id='lowhigh6' class='lowhigh'>Hi</p>"+
			"<p id='temp6' class='temp'>50бу</p>"+
			"<p id='realfeel6' class='realfeel'>RealFeel 60бу</p>"+
			"<p class='more'>More</p>"+
			"</div></td></tr>");

			$("#forcasttable").append("<tr><td id='table_td6' class='forcasttd_unfocus'><div>"+
			"<img id='wicon7' src='' alt='' name='weather icon' width='64' height='40'></img>"+
			"<p id='date7' class='date'>Apr 20(THU)</p>"+
			//"<p id='longtext7' class='longtext'>A Little Afternoon Rain</p>"+
			"<p id='lowhigh7' class='lowhigh'>Hi</p>"+
			"<p id='temp7' class='temp'>50бу</p>"+
			"<p id='realfeel7' class='realfeel'>RealFeel 60бу</p>"+
			"<p class='more'>More</p>"+
			"</div></td></tr>");

			
			$(weather_xml).find("forecast").find("day").each(function()
			{
				var daynumber = $(this).attr("number");
				
				var obsdate = $(this).find("obsdate").text();
				//var daycode = $(this).find("daycode").text();
				//var sunrise = $(this).find("sunrise").text();
				//var sunset = $(this).find("sunset").text();


				var txtshort = $(this).find("daytime").find("txtshort").text();
				//var txtlong = $(this).find("daytime").find("txtlong").text();
				var weathericon = $(this).find("daytime").find("weathericon").text();
				var hightemperature = $(this).find("daytime").find("hightemperature").text();
				//var lowtemperature = $(this).find("daytime").find("lowtemperature").text();
				var realfeelhigh = $(this).find("daytime").find("realfeelhigh").text();
				//var realfeellow = $(this).find("daytime").find("realfeellow").text();
				//var windspeed = $(this).find("daytime").find("windspeed").text();
				//var winddirection = $(this).find("daytime").find("winddirection").text();
				//var maxuv = $(this).find("daytime").find("maxuv").text();
				//var rainamount = $(this).find("daytime").find("rainamount").text();
				//var snowamount = $(this).find("daytime").find("snowamount").text();
				//var tstormprob = $(this).find("daytime").find("tstormprob").text();


				var wicon = "#wicon"+daynumber;
				var iconfilename="images/icons/"+weathericon+".png";
				$(wicon).attr("src",iconfilename);
				var date = "#date" + daynumber;
				$(date).text(obsdate);
				//var longtext = "#longtext"+daynumber;
				//$(longtext).text(txtshort);

				var temp = "#temp"+daynumber;
				$(temp).text(hightemperature+"бу");

				var realfeel = "#realfeel"+daynumber;
				$(realfeel).text("RealFeel "+realfeelhigh+"бу");
				
			});
			


		}
		else if(index==2)
		{
			$("#home").attr("class","navList_unfocus");
			$("#forcast").attr("class","navList_unfocus");
			$("#maps").attr("class","navList_focus");
			$("#location").attr("class","navList_unfocus");
			$("#ads").attr("class","ads_unfocus");

			$("#content").append("<table border='0' id='maptable'></table>");
			$("#maptable").append("<tr><td id='maptable_td0' class='maptd'><div>"+
			"<img id='radar' src='' alt='' name='weather icon' width='400' height='334'></img>"+
			"<p>Satellite</p>"+
			"</div></td></tr>");
			
			$("#radar").attr("src",radarurl);

		}
		else if(index==3)
		{
			$("#home").attr("class","navList_unfocus");
			$("#forcast").attr("class","navList_unfocus");
			$("#maps").attr("class","navList_unfocus");
			$("#location").attr("class","navList_focus");
			$("#ads").attr("class","ads_unfocus");

			$("#content").append("<table border='0' id='locationbgtable'></table>");
			$("#locationbgtable").append("<p id='locationtitle'>Location/Settings</p>");
			$("#locationbgtable").append("<table border='0' id='locationtable'></table>");
			
	
			location_total_index = recentcity_num +2;


			var i;
			for(i=0;i<location_total_index-2;i++)
			{
				var tableid="table_td"+i;
				var locationid="location"+i;
				$("#locationtable").append("<tr><td id="+tableid+
				" class='locationtd_unfocus'><div>"+
				"<p id="+locationid+
				" class='location'>"+recentcity_name_array[i]+
				"</p>"+
				"</div></td></tr>");
			}

			var index = location_total_index-2;
			var tableid = "table_td"+index;

			$("#locationtable").append("<tr><td id="+tableid+
			" class='locationtd_unfocus'><div>"+
			"<p class='location'>Select Location</p>"+
			"</div></td></tr>");

			index = location_total_index-1;
			tableid = "table_td"+index;

			$("#locationtable").append("<tr><td id="+tableid+
			" class='locationtd_unfocus'><div>"+
			"<p class='location'>буF/буC</p>"+
			"<div id='unit'>буC</div>"+
			"</div></td></tr>");

			if(unit==0)
				$("#unit").text("буC");
			else
				$("#unit").text("буF");

		}
		else if(index==4)
		{
			$("#home").attr("class","navList_unfocus");
			$("#forcast").attr("class","navList_unfocus");
			$("#maps").attr("class","navList_unfocus");
			$("#location").attr("class","navList_unfocus");
			$("#ads").attr("class","ads_focus");
		}

		window.history.replaceState("{quit: 0}","accuweather","");
	}



	
	 
