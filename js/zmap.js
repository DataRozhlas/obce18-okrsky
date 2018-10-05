var hst = 'https://data.irozhlas.cz/obce18-okrsky/';
if (window.location.hostname == 'localhost') {
  hst = './scratch/'
};

var isFirefox = typeof InstallTrigger !== 'undefined';
var isIE = /*@cc_on!@*/false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia;

var partyCols = {
  'ČSSD': '#ff7f00',
  'ODS': '#1f78b4',
  'KSČM': '#e31a1c',
  'Piráti': 'black',
  'SPD': '#a6cee3',
  'KDU-ČSL': '#ffff99',
  'STAN': 'darkgray',
  'ANO': '#cab2d6',
  'TOP 09': '#6a3d9a',
  'Ostatní': 'lightgray'
};

var selCont = '<select><option value="HL_OKRS">Vítězové v okrscích</option>' 
            + '<option value="UCAST">Účast</option>'
Object.keys(partyCols).forEach(function(e) {
  selCont += '<option value="HL_' + e + '">' + e + '</option>'
});
selCont += '</select>'
$('#select').html(selCont)

function orderWinners(props) {
  var out = {};
  Object.keys(props).forEach(function(key) {
    if (partyCols.hasOwnProperty(key.split('_')[1])) {
      out[key.split('_')[1]] = props[key];
    };
  });
  return Object.keys(out).sort(function(a, b) {
    return out[b] - out[a]
  });
};

function getColor(props, party) {
  var col;
  if (party == 'HL_OKRS') {
    var win = orderWinners(props);
    col = partyCols[win[0]] || 'rgba(242,240,247, 1';
  } else if (party == 'UCAST') {
    var val = props['PLATNE_HLASY'] / props['ZAPSANI_VOLICI']
    if (val <= breaks[party][0]) { col = 'rgba(242,240,247, 0.7)' } else
    if (val <= breaks[party][1]) { col = 'rgba(203,201,226, 0.7)' } else
    if (val <= breaks[party][2]) { col = 'rgba(158,154,200, 0.7)' } else
    if (val <= breaks[party][3]) { col = 'rgba(117,107,177, 0.7)' } else
    if (val > breaks[party][3]) { col = 'rgba(84,39,143, 0.7)' } else
      {col = 'rgba(242,240,247, 1'}
  } else {
    var val = props[party] / props['PLATNE_HLASY']
    if (val <= breaks[party][0]) { col = 'rgba(254,240,217, 0.7)' } else
    if (val <= breaks[party][1]) { col = 'rgba(253,204,138, 0.7)' } else
    if (val <= breaks[party][2]) { col = 'rgba(252,141,89, 0.7)' } else
    if (val <= breaks[party][3]) { col = 'rgba(215,48,31, 0.7)' } else
    if (val > breaks[party][3]) { col = 'rgba(215,48,31, 0.7)' } else
      {col = 'rgba(242,240,247, 1'}
  }  
 
  var style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "lightgray",
      width: 0.3
    }),
    fill: new ol.style.Fill({
      color: col
    })
  })
  return style;
};

function makeTooltip(party, evt) {
  var blabol = '<b>Okrsek č. ' + evt['Cislo'] + ', ' + (evt['Momc'] || evt['Obec']) + '</b>, okres ' + evt['Okres'] + '<br>'
  if (typeof evt['PLATNE_HLASY'] == 'undefined') {
    blabol += 'Ve vojenských újezdech volby neprobíhají.'
  } else if (party == 'UCAST') {
    blabol += 'Účast zde byla ' + Math.round((evt['ODEVZDANE_OBALKY'] / evt['ZAPSANI_VOLICI']) * 1000 ) / 10 + ' %.'
  } else if (party == 'HL_OKRS') {
    var win = orderWinners(evt);
    for (var key in win) {
      if (evt['HL_' + win[key]] > 0) {
        blabol += '<b><span style="color: ' + partyCols[win[key]].replace('.7', '1') + ';">' + win[key] + '</span></b> (' + evt['HL_' + win[key]] + ' hl., ' 
        + Math.round((evt['HL_' + win[key]] / evt['PLATNE_HLASY']) * 1000 ) / 10 + ' %); '
      }
    }
  } else {
    blabol += 'Strana ' + party.split('_')[1] + ' zde získala ' + Math.round((evt[party] / evt['PLATNE_HLASY']) * 1000 ) / 10 + ' % hlasů (z celkem ' 
    + evt['PLATNE_HLASY'] + ').'
  }
  document.getElementById('tooltip').innerHTML = blabol
};

var tilegrid = ol.tilegrid.createXYZ({tileSize: 512, maxZoom: 15});

var background = new ol.layer.Tile({
  source: new ol.source.TileImage({
    url: 'https://interaktivni.rozhlas.cz/tiles/ton_b1/{z}/{x}/{y}.png',
    attributions: [
      new ol.Attribution({ html: 'obrazový podkres <a target="_blank" href="http://stamen.com">Stamen</a>, <a target="_blank" href="https://samizdat.cz">Samizdat</a>, data <a target="_blank" href="https://www.czso.cz/csu/czso/uchazeci-o-zamestnani-dosazitelni-a-podil-nezamestnanych-osob-podle-obci">ČSÚ</a>'})
    ]
  })
})

var labels = new ol.layer.Tile({
  source: new ol.source.TileImage({
    url: 'https://interaktivni.rozhlas.cz/tiles/ton_l1/{z}/{x}/{y}.png',
    maxZoom: 15
   })
})

function drawMap(party, mustMomc) {
  $('#map').empty()
  var layer = new ol.layer.VectorTile({
    source: new ol.source.VectorTile({
      format: new ol.format.MVT(),
      tileGrid: tilegrid,
      tilePixelRatio: 8,
      url: hst + 'tiles/{z}/{x}/{y}.pbf'
    }),
    style: function(feature) {
      if (mustMomc & (feature.properties_.isMomc == false)) {
        return null
      } else {
        return getColor(feature.properties_, party)
      }
    }
  });

  var initZoom;

  if (window.innerWidth < 768) {
    initZoom = 6;
    document.getElementById('tooltip').innerHTML = 'Kliknutím vyberte obec.'
  } else {
    initZoom = 7;
  }

  var map = new ol.Map({
    interactions: ol.interaction.defaults({mouseWheelZoom:false}),
    target: 'map',
    view: new ol.View({
      center: ol.proj.transform([15.3350758, 49.7417517], 'EPSG:4326', 'EPSG:3857'), //Číhošť
      zoom: initZoom,
      minZoom: 6,
      maxZoom: 15
    })
  });

  map.addLayer(background);
  map.addLayer(layer);
  map.addLayer(labels);

  if (!(isEdge | isFirefox | isIE)) {
    map.on('pointermove', function(evt) {
      if (evt.dragging) {
        return;
      }
      var pixel = map.getEventPixel(evt.originalEvent);
      if (map.hasFeatureAtPixel(pixel)){
        map.forEachFeatureAtPixel(pixel, function(feature, layer) {
          makeTooltip(party, feature.properties_);
        });
      } else {
        document.getElementById('tooltip').innerHTML = 'Myší vyberte obec.'
      }
    });
    map.on('singleclick', function(evt) {
      var pixel = map.getEventPixel(evt.originalEvent);
      if (map.hasFeatureAtPixel(pixel)) {
        map.forEachFeatureAtPixel(pixel, function(feature) {
          window.open('https://volby.cz/pls/kv2018/kv1111?xjazyk=CZ&xid=1&xdz=1&xnumnuts='
          + okresy[feature.properties_.Okres]
          + '&xobec='
          + feature.properties_.okid.split('_')[0]
          + '&xokrsek='
          + feature.properties_.okid.split('_')[1]
          + '&xstat=0&xvyber=0', '_blank');
        });
      }
    });
  };

  //mobil
  map.on('singleclick', function(evt) {
    var pixel = map.getEventPixel(evt.originalEvent);
    if (map.hasFeatureAtPixel(pixel)){
      map.forEachFeatureAtPixel(pixel, function(feature) {
        makeTooltip(party, feature.properties_);
      });
    } else {
      document.getElementById('tooltip').innerHTML = 'Kliknutím vyberte obec.'
    }
  });

var form = document.getElementById("frm-geocode");
var geocoder = null;
var geocodeMarker = null;
form.onsubmit = function(event) {
  event.preventDefault();
  var text = document.getElementById("inp-geocode").value;
  if (text == '') {
    map.getView().setCenter(ol.proj.transform([15.3350758, 49.7417517], 'EPSG:4326', 'EPSG:3857'))
    map.getView().setZoom(8)
  } else {
    $.get( "https://api.mapy.cz/geocode?query=" + text, function(data) {
      if (typeof $(data).find('item').attr('x') == 'undefined') {
        alert("Bohužel, danou adresu nebylo možné najít");
        return;
      }
      var x = parseFloat($(data).find('item').attr('x'))
      var y = parseFloat($(data).find('item').attr('y'))
      map.getView().setCenter(ol.proj.transform([x, y], 'EPSG:4326', 'EPSG:3857'))
      map.getView().setZoom(12)
    }, 'xml');
  } 
};
};

drawMap('HL_OKRS', false)

var selMcmo = false;
var selType = 'HL_OKRS';

$('#select').on('change', function() {
  selType = $(this).find(":selected").val();
  drawMap(selType, selMcmo);
});

$('.zasttype').change(function() {
  selMcmo = document.getElementById('zastcheck').checked;
  drawMap(selType, selMcmo);
});

