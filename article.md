title: "Jak se volilo ve vašem okrsku? Prohlédněte si nejpodrobnější mapu výsledků komunálních voleb"
perex: "Detailní mapa volebních výsledků ukazuje úspěch hnutí ANO na okrajích Prahy, bašty sociálních demokratů a lidovců, i to, jak si velká města dělí ANO s ODS."
authors: ["Jan Cibulka", "Michal Zlatkovský"]
published: "8. října 2018"
coverimg: https://data.irozhlas.cz/obce18-okrsky/media/cover.png
coverimg_note: ""
styles: ["https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.6.4/ol.css"]
libraries: ["https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js", "https://ft-polyfill-service.herokuapp.com/v2/polyfill.min.js?features=Object.values,String.prototype.startsWith", "https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.6.4/ol-debug.js"]
options: "" #wide, noheader (+nopic)
---

Z mapy je patrné rozložení stranických sil v celé republice. Malé obce na Moravě, Vysočině a ve východních Čechách patří lidovcům. Ti mají mají ze zobrazených stran vůbec nejvíc zastupitelů, 3,6 tisíce. ČSSD, považovaná za poraženého komunálních voleb, obhájila některé tradiční bašty - mezi nimi Nový Jičín, Karvinou nebo Bohumín. 

<wide>
<div>_Mapa ukazuje <b>volební okrsky</b>, tedy nejmenší možné rozčlenění volebních výsledků. Větší obce se dělí na více okrsků. Je možné přepnout mezi zisky hlavních politických stran v zastupitelstvech obcích i městských částí. Kvůli přehlednosti zvolil server iROZHLAS.cz pohled na devět sněmovních stran s celorepublikovou působností a nejvyšším počtem kandidátů. <b>Strana je zobrazená jen pokud kandidovala za sebe, nikoli v koalici s někým dalším</b>. Pro přesnější vykreslení situace v hlavním městě Praze jsme mezi ně přidali také iniciativu Praha sobě._</div><br>
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

U hnutí ANO je patrný větší podíl hlasů na sídlištních a okrajových částech Prahy oproti jejímu středu. Právě na tyto části se marketing ANO zaměřoval, například skrze takzvané sousedské večeře. ANO slavilo úspěchy v mnoha okrscích velkých měst mimo Prahu.

Hlavní město, zejména jeho východní část, se stalo baštou ODS. Strana se setkala s úspěchem i v Trutnově nebo v některých částech jižních Čech.

Žádná ze stran ale zdaleka nedosahuje počtu zastupitelských mandátů získaných nezávislými kandidáty - těch je 44,4 tisíce. Nezávislí kandidáti a sdružení bodovali v malých obcích, menších městech i v některých částech Prahy a dalších statutárních měst.