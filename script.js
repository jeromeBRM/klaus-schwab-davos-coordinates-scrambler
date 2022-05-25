const baseCoordinates = "461331061130";
const format = "Klaus Schwab coordinates : +46°13'31'' +06°11'30''";

document.querySelector('button').onclick = () => {
	createLinks();
}

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const valid = (c) => {
	const nc_y_r1 = c[0] + c[1];
	const nc_y_r2 = c[2] + c[3];
	const nc_y_r3 = c[4] + c[5];
	
	const nc_x_r1 = c[6] + c[7];
	const nc_x_r2 = c[8] + c[9];
	const nc_x_r3 = c[10] + c[11];
	
	const fail = parseInt(nc_x_r2, 10) > 60 || parseInt(nc_x_r3, 10) > 60 || parseInt(nc_y_r2, 10) > 60 || parseInt(nc_y_r3, 10) > 60;
	
	return fail;
}

var markers = new Array();

const linkToMap = (c) => {
	const gowest = getRandomInt(2) == 0 ? "+" : "-";
	const gosouth = getRandomInt(2) == 0 ? "+" : "-";
	
	const nc_y_r1 = c[0] + c[1];
	const nc_y_r2 = c[2] + c[3];
	const nc_y_r3 = c[4] + c[5];
	
	const nc_x_r1 = c[6] + c[7];
	const nc_x_r2 = c[8] + c[9];
	const nc_x_r3 = c[10] + c[11];
	
	const a = document.createElement('a');
	const li = document.createElement('li');
	
	markers.push(createmarker(c, gowest === "+", gosouth === "-"));
	
	const formatted = gosouth + nc_y_r1 + "°" + nc_y_r2 + "'" + nc_y_r3 + "'' " + gowest + nc_x_r1 + "°" + nc_x_r2 + "'" + nc_x_r3 + "''";
	a.innerText = formatted;
	
	a.setAttribute('href', "https://maps.google.com/maps?q=" + gosouth + nc_y_r1 + "%C2%B0+" + nc_y_r2 + "'+" + nc_y_r3 + ".00%22," + gowest + nc_x_r1 + "%C2%B0+" + nc_x_r2 + "'+" + nc_x_r3 + ".00&ie=UTF-8");
	
	a.setAttribute('target', '_blank');
	li.append(a);
	return li;
}

document.querySelector('b.base-coordinates').innerText = format;

const createLinks = () => {
	
	markers = new Array();
	clearl();
	
	document.querySelector('ul.list').innerHTML = '';
	
	let newCoordinates = new Array();

	for (let i = 0; i < document.querySelector("input#dddd").value; i++){
		let n = baseCoordinates;
		n = n.shuffle();
		while (valid(n)) {
			n = n.shuffle();
		}
		newCoordinates.push(n);
	}

	newCoordinates.forEach(x => {
		const newE = linkToMap(x);
		document.querySelector('ul.list').append(newE);
	});
	
	markers.forEach(m => {
	markerLayer.getSource().addFeature(m);
});
}

const x_dms2dd = (dms, neg) => {
	const first = dms[0] + dms[1] + ".";
	const second = (parseFloat(dms[2] + dms[3]) + (parseFloat(dms[4] + dms[5]) / 60)) / 60;
	const isneg = (neg === true ? -1 : 1);
	return parseFloat(first + second) * isneg;
}

const y_dms2dd = (dms, neg) => {
	const first = dms[6] + dms[7] + ".";
	const second = (parseFloat(dms[8] + dms[9]) + (parseFloat(dms[10] + dms[11]) / 60)) / 60;
	const isneg = (neg === true ? -1 : 1);
	return parseFloat(first + second) * -isneg;
}

const createmarker = (c, gw, gs) => {
	return new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([y_dms2dd(c, gw), x_dms2dd(c, gs)])));
}

var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([0, 20]),
    zoom: 1
  })
});

var markerLayer = new ol.layer.Vector({
  source: new ol.source.Vector(),
  style: new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      src: 'marker.png'
    })
  })
});

const clearl = () => {
	markerLayer.getSource().clear();
}

map.addLayer(markerLayer);