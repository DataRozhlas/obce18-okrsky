title: "Koho volili vaši sousedi? Prohlédněte si nejpodrobnější mapu výsledků prvního kola prezidentské volby"
perex: "Miloš Zeman zvítězil ve všech krajích s výjimkou Prahy. Detailnější pohled na volební mapu ovšem ukazuje pestřejší obrázek: Jiří Drahoš výrazně bodoval v centrech větších měst, ale také v okolí rodného Jablunkova nebo v horských střediscích. A jak to dopadlo u vás?"
authors: ["Jan Cibulka", "Petr Kočí"]
published: "13. ledna 2018"
coverimg: https://dev.datarozhlas.cz/prez18-okrsky/media/mapa.jpg
coverimg_note: "Foto <a href='#'>ČTK</a>"
styles: ["https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.6.4/ol.css"]
libraries: ["https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js", "https://ft-polyfill-service.herokuapp.com/v2/polyfill.min.js?features=Object.values,String.prototype.startsWith", "https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.6.4/ol-debug.js"]
options: "noheader, nopic" #wide, noheader (+nopic)
---


<wide>
<div id="mapdiv">
	<div id="select"></div>
	<form>
		<input type="radio" class="zasttype" name="zasttype" value="obce" checked="checked">Zastupitelstva obcí a magistráty
		<input type="radio" class="zasttype" name="zasttype" id="zastcheck" value="mcmo">Zastupitelstva městských částí
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