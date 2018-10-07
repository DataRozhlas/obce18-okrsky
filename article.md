title: "Jak se volilo ve vašem okrsku? Prohlédněte si nejpodrobnější mapu výsledků komunálních voleb"
perex: "Detailní mapa volebních výsledků ukazuje úspěch hnutí ANO na okrajích Prahy, bašty sociálních demokratů a lidovců i to, jak si velká města dělá ANO s ODS."
authors: ["Jan Cibulka", "Michal Zlatkovský"]
published: "7. října 2018"
styles: ["https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.6.4/ol.css"]
libraries: ["https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js", "https://ft-polyfill-service.herokuapp.com/v2/polyfill.min.js?features=Object.values,String.prototype.startsWith", "https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.6.4/ol-debug.js"]
options: "noheader, nopic" #wide, noheader (+nopic)
---

Kvůli přehlednosti jsme zvolili pohled pouze na devět celostátních stran. 

U hnutí ANO je patrný větší podíl hlasů na sídlištních a okrajových částech Prahy oproti jejímu středu. Právě na tyto části se marketing ANO zaměřoval, například skrze takzvané sousedské večeře.
<wide>
<div id="mapdiv">
	<div id="select"></div>
	<form class="mcmo_sel">
		<div class="radiob"><input type="radio" class="zasttype" name="zasttype" value="obce" checked="checked">Zastupitelstva obcí a magistráty</div>
		<div class="radiob"><input type="radio" class="zasttype" name="zasttype" id="zastcheck" value="mcmo">Zastupitelstva městských částí</div>
		</form>
	<div id="tooltip">Myší vyberte obec.</div>
	<div id="map" class="map"></div>
	 <form action="?" id='frm-geocode'>
	  <label for="inp-geocode">Najít adresu</label>
	  <div class="inputs">
	    <input type="text" id="inp-geocode" placeholder="Bruntál">
	    <input type="submit" value="Najít">
	  </div>
	</form>
</div>
</wide>