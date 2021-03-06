function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;

	}else{
		window.onload = function (argument) {
			oldonload();
			func();
		}
	}
}
function insertAfter (newElemnet, targetElement) {
	var parent = targetElement.parentNode;
	
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElemnet);
	}
	else{
		parent.insertBefore(newElemnet,targetElement.nextSibling);
	}
}
function addClass (elemnet,value) {
	if (elemnet.className) {
		elemnet.className = value;
		
	}else{
		newClassName = elemnet.className;
		newClassName += ' ';
		newClassName+=value;
		elemnet.className = newClassName;
	}
	
}
function highlightPage () {
	var navs = document.getElementsByTagName("nav");
//	console.log(navs)
	var links = navs[0].getElementsByTagName("a");
	var linkurl;
	for (var i = 0; i<links.length; i++) {
		linkurl = links[i].getAttribute("href");
		if (window.location.href.indexOf(linkurl)!= -1) {
			links[i].className = "here";
			//给nav页面添加id
			var text = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id",text);
		}
	}
}
addLoadEvent(highlightPage);

function moveElement (elementID,final_x,final_y,interval) {
	var elem = document.getElementById(elementID);
	if (elem.movement) {
		clearTimeout(elem.movement);	
	}
	if (!elem.style.left) {
		elem.style.left = "0px";
	}
	if (!elem.style.top) {
		elem.style.top = "0px";
	}
	var xops= parseInt(elem.style.left);
	var yops= parseInt(elem.style.top);
	if (xops ==final_x && yops==final_y) {
		return true;
	}
	if (xops < final_x) {
		var dist = Math.ceil((final_x - xops)/10);
		xops = xops + dist;
	}
	if (xops > final_x) {
		var dist = Math.ceil((xops - final_x)/10);
		xops = xops - dist;
	}
	if (yops < final_y) {
		var dist = Math.ceil((final_y - yops)/10);
		yops = yops + dist;
	}
	if (yops > final_y) {
		var dist = Math.ceil((yops - final_y)/10);
		yops = yops + dist;
	}
	elem.style.left = xops +"px";
	elem.style.top = yops + 'px';
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,interval);
}

function prepareSlideshow () {
	if (!document.getElementById("intro")) {
		return false;
	}
	var intro = document.getElementById("intro");
	var slidshow = document.createElement("div");
	slidshow.setAttribute("id","slidshow");
	slidshow.style.borderRadius = "10px";
	var preview = document.createElement("img");
	preview.setAttribute("src","./images/slideshow.gif");
	preview.setAttribute("id","preview");
	slidshow.appendChild(preview);
	insertAfter(slidshow,intro);
	// intro 换成 documnet 就可以实现所有的a标签都能触发 动画
	var links = document.getElementsByTagName("a");
	var destination;
	for (var i = 0;i<links.length; i++ ) {
		links[i].onmouseover = function(){
			destination = this.getAttribute("href");
			if (destination.indexOf("index.html") != -1) {
				moveElement("preview",0,0,5);
			}
			if (destination.indexOf("about.html") != -1) {
				moveElement("preview",-150,0,5);	
			}
			if (destination.indexOf("photos.html") != -1) {
				moveElement("preview",-300,0,5);
			}
			if (destination.indexOf("live.html") != -1) {
				moveElement("preview",-450,0,5);
			}
			if (destination.indexOf("contact.html") != -1) {
				moveElement("preview",-600,0,5);
			}
		}
	}
}
addLoadEvent(prepareSlideshow);

function showSection (id) {
	var sections = document.getElementsByTagName("section");
	for (var i=0; i<sections.length;i++) {
		if (sections[i].getAttribute("id")!=id) {
			sections[i].style.display = "none";
		}else{
			sections[i].style.display = "block";
		}
	}
}

function preparInternalnav () {
	var articles = document.getElementsByTagName("article");
	var navs = articles[0].getElementsByTagName("nav");
	if (navs.length == 0) return false;
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	
	for (var i =0 ; i<links.length;i++) {
		var sectionId = links[i].getAttribute("href").split("#")[1];
		document.getElementById(sectionId).style.display = "none";
		links[i].destination = sectionId;
		links[i].onclick = function  () {
			showSection(this.destination);
			return false;
		}
		
	}
}
addLoadEvent(preparInternalnav);

//photos
function showPic (whichpic) {
	if (!document.getElementById("placeholder")) {
		return false;
	}
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src",source);
	if (whichpic.getAttribute("title")) {
		var text = whichpic.getAttribute("title");
	} else{
		var text = "";
	}
	var description = document.getElementById("description");
	if (description.firstChild.nodeType == 3) {
		description.firstChild.nodeValue == text;
	}
	return false;
}

function  preparePlaceholder() {
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/logo.gif");
	placeholder.setAttribute("alt","buguanle andasda");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var desctext = document.createTextNode("chose one pic");
	description.appendChild(desctext);
	var  gallery = document.getElementById("imagegallery");
	insertAfter(description,gallery);
	insertAfter(placeholder,description);
}

function prepareGallery () {
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for (var i = 0;i<links.length;i++) {
		links[i].onclick = function  () {
			return showPic(this);
		}
	}
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

//table
function stripeTables() {
  if (!document.getElementsByTagName) return false;
  var tables = document.getElementsByTagName("table");
  for (var i=0; i<tables.length; i++) {
    var odd = false;
    var rows = tables[i].getElementsByTagName("tr");
    for (var j=0; j<rows.length; j++) {
      if (odd == true) {
        addClass(rows[j],"odd");
        odd = false;
      } else {
        odd = true;
      }
    }
  }
}

function highlightRows() {
  if(!document.getElementsByTagName) return false;
  var rows = document.getElementsByTagName("tr");
  for (var i=0; i<rows.length; i++) {
    rows[i].oldClassName = rows[i].className
    rows[i].onmouseover = function() {
      addClass(this,"highlight");
    }
    rows[i].onmouseout = function() {
      this.className = this.oldClassName
    }
  }
}

function displayAbbreviations() {
  if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
  	var abbreviations = document.getElementsByTagName("abbr");
  	if (abbreviations.length < 1) return false;
  	var defs = new Array();
	for (var i=0; i<abbreviations.length; i++) {
	    var current_abbr = abbreviations[i];
	    if (current_abbr.childNodes.length < 1) continue;
	    var definition = current_abbr.getAttribute("title");
	    var key = current_abbr.lastChild.nodeValue;
	    defs[key] = definition;
  	}
  var dlist = document.createElement("dl");
  for (key in defs) {
    var definition = defs[key];
    var dtitle = document.createElement("dt");
    var dtitle_text = document.createTextNode(key);
    dtitle.appendChild(dtitle_text);
    var ddesc = document.createElement("dd");
    var ddesc_text = document.createTextNode(definition);
    ddesc.appendChild(ddesc_text);
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }
  if (dlist.childNodes.length < 1) return false;
  var header = document.createElement("h3");
  var header_text = document.createTextNode("Abbreviations");
  header.appendChild(header_text);
  var articles = document.getElementsByTagName("article");
  if(articles.length==0)return false;
  var container = articles[0];
  container.appendChild(header);
  container.appendChild(dlist);
}

addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);

//ajax
function getHTTPObject() {
	if (typeof XMLHttpRequest == 'undefined') {
		XMLHttpRequest = function(){
			try{
				return new ActiveXObject("Msxml2.XMLHTTP.6.0");
			}catch(e){}
			try{
				return new ActiveXObject("Msxml2.XMLHTTP.3.0");
			}catch(e){}
			try{
				return new ActiveXObject("Msxml2.XMLHTTP");
			}catch(e){}
			return false;
		}
	}
		return new XMLHttpRequest();
}

function displayAjaxLoading (element) {
	
	while (element.hasChildNodes()){
		element.removeChild(element.lastChild);
	}
	var content = document.createElement("img");
	content.setAttribute("src","./images/loading.gif");
	content.setAttribute("alt","loading...");
	console.log(element);
	element.appendChild(content);
	
}
function submitFormWithAjax (whichform,thetarget) {
	var request = getHTTPObject();
	if (!request) {
		return false;
	}
	displayAjaxLoading(thetarget);
	var dataParts = [];
	var element;
	for (var i = 0;i<whichform.elements.length;i++) {
		element= whichform.elements[i];
		dataParts[i]= element.name + '=' +encodeURIComponent(element.value);
	}
	var data = dataParts.join("&");
	request.open('GET',whichform.getAttribute("action"),true);
	request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	request.onreadystatechange= function  () {
		if (request.readyState == 4) {
			if (request.status ==200 ||request.status ==0) {
				var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if (matches.length > 0) {
					thetarget.innerHTML = matches[1];
				}else{
					thetarget.innerHTML = '<p>' + oops +'<p>';
				}
			}else{
				console.log("status error");
			}
		}
	};
	request.send(data);
	console.log("成功了");
	return true;
}

function preparForms () {
	for (var i=0; i<document.forms.length;i++) {
		var thisform = document.forms[i];

//		resetFields(thisform);
		thisform.onsubmit = function  () {
			var article = document.getElementsByTagName("article")[0];
			if (submitFormWithAjax(this,article)) {

				return false;
			}
			return true;
		}
	}
}
addLoadEvent(preparForms);