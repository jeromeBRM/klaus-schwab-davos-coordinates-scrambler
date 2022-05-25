const baseCoordinates = "461331061130";
const format = "+46°13'31'' +06°11'30''";

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

const linkToMap = (c) => {
	const a = document.createElement('a');
	const li = document.createElement('li');
	
	const gowest = getRandomInt(2) == 0 ? "+" : "-";
	const gosouth = getRandomInt(2) == 0 ? "+" : "-";
	
	const nc_y_r1 = c[0] + c[1];
	const nc_y_r2 = c[2] + c[3];
	const nc_y_r3 = c[4] + c[5];
	
	const nc_x_r1 = c[6] + c[7];
	const nc_x_r2 = c[8] + c[9];
	const nc_x_r3 = c[10] + c[11];
	
	const formatted = gosouth + nc_y_r1 + "°" + nc_y_r2 + "'" + nc_y_r3 + "'' " + gowest + nc_x_r1 + "°" + nc_x_r2 + "'" + nc_x_r3 + "''";
	a.innerText = formatted;
	
	a.setAttribute('href', "https://maps.google.com/maps?q=" + gosouth + nc_y_r1 + "%C2%B0+" + nc_y_r2 + "'+" + nc_y_r3 + ".00%22," + gowest + nc_x_r1 + "%C2%B0+" + nc_x_r2 + "'+" + nc_x_r3 + ".00&ie=UTF-8");
	
	a.setAttribute('target', '_blank');
	li.append(a);
	return li;
}

document.querySelector('h1.base-coordinates').innerText = format;

const createLinks = () => {
	
	document.querySelector('ul').innerHTML = '';
	
	let newCoordinates = new Array();

	for (let i = 0; i < 10; i++){
		let n = baseCoordinates;
		n = n.shuffle();
		newCoordinates.push(n);
	}

	newCoordinates.forEach(x => {
		const newE = linkToMap(x);
		document.querySelector('ul').append(newE);
	});
}