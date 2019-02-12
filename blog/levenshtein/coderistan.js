// @coderistan - 2019
var kelime1 = "kitap";
var kelime2 = "katip";
var satir = 1,sutun = 1;
var i_ = 1, k_ = 1;

//https://stackoverflow.com/a/39914235
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// koordinatı verilen kutunun arkaplanını renklendirme
function blink_box(x,y,finish){
	if(finish == null){

		if(x == 0){
			document.getElementById(x+"_"+y).style.backgroundColor = "orange";
		}else if(y == 0){
			document.getElementById(x+"_"+y).style.backgroundColor = "orange";
		}else{
			document.getElementById(x+"_"+y).style.backgroundColor = "yellow";
		}
	}else{
		document.getElementById(x+"_"+y).style.backgroundColor = "green";
	}
}

function deblink_box(x,y){
	if(x == 0){
		document.getElementById(x+"_"+y).style.backgroundColor = "rgb(0,138,255)";
	}else if(y == 0){
		document.getElementById(x+"_"+y).style.backgroundColor = "rgb(0,138,255)";
	}else{
		document.getElementById(x+"_"+y).style.backgroundColor = "inherit";
	}
	
}

function fill_row(){
	for(var i = 1;i<=kelime2.length;i++){
		var nesne = document.getElementById(0+"_"+i);
		nesne.innerHTML = kelime2.charAt(i-1);
		nesne.style.backgroundColor = "rgb(0,138,255)";

		var nesne = document.getElementById(1+"_"+i);
		nesne.innerHTML = i-1;
	}

}

function fill_column(){
	for(var i = 1;i<=kelime1.length;i++){
		var nesne = document.getElementById(i+"_"+0);
		nesne.innerHTML = kelime1.charAt(i-1);
		nesne.style.backgroundColor = "rgb(0,138,255)";

		var nesne = document.getElementById(i+"_"+1);
		nesne.innerHTML = i-1;
	}	
}

function add_td(i,k){
	return "<td id = '"+i+"_"+k+"' class = 'td_'></td>";
}

// tablonun temelini ekrana çizme
function draw_table(){
	var alan = document.getElementById("alan");
	var html = "";
	html += "<table id = 'tablo'>";
	for(var i = 0;i<kelime1.length+1;i++){
		html += "<tr class = 'tr_'>"
		for(var k = 0;k<kelime2.length+1;k++){
			html += add_td(i,k);
		}
		html += "</tr>";
	}
	html += "</table>";
	alan.innerHTML = html;

	fill_row(); // kelime2'nin arkaplanını renklendirme ve harfleri-numaraları yerleştirme işlemi
	fill_column(); // kelime1'in arkaplanını renklendirme ve harfleri-numaraları yerleştirme işlemi

	algorithm();
}

function compare(x,y){
	if(x == y){
		return true;
	}else{
		return false;
	}
}

async function algorithm(){
	for(var i = 2;i<=kelime1.length;i++){
		blink_box(i,0);

		for(var k = 2;k<=kelime2.length;k++){
			blink_box(i,k);
			blink_box(0,k);

			// burada kelimelerin ilgili harfini alıp kontrol edeceğiz
			var harf_1 = document.getElementById(i+"_"+0);
			var harf_2 = document.getElementById(0+"_"+k);

			// eğer eşitse
			if(compare(harf_1.innerHTML,harf_2.innerHTML)){
				// sol üst köşedeki değeri, kesişim kutusuna koyuyoruz
				document.getElementById(i+"_"+k).innerHTML = document.getElementById((i-1)+"_"+(k-1)).innerHTML
			}else{
				// eşit değilse, kenar kutulardaki en küçük değeri alıp kesişim kutusuna koyuyoruz
				var sol = parseInt(document.getElementById(i+"_"+(k-1)).innerHTML)+1;
				var ust = parseInt(document.getElementById((i-1)+"_"+k).innerHTML)+1;
				var sol_ust = parseInt(document.getElementById((i-1)+"_"+(k-1)).innerHTML)+1;

				document.getElementById(i+"_"+k).innerHTML = Math.min(sol,ust,sol_ust);
			}

			await sleep(500);
			deblink_box(i,k);
			deblink_box(0,k);
		}

		deblink_box(i,0);
	}

	blink_box(kelime1.length,kelime2.length,true);

}

window.onload = function(event){
	document.getElementById("aciklama").innerHTML += "<br/>"+"<font class = 'word'>"+kelime1+"</font>"+" vs "+"<font class = 'word'>"+kelime2+"</font>";
	setTimeout(draw_table,2000);
}
