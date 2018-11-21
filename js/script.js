var app = {
	inicio:function(){
		this.iniciarFastClick();
	},

	iniciarFastClick: function(){
		FastClick.attach(document.body);
	},

	dispositivoListo: function(){
		navigator.geolocation.getCurrentPosition(app.dibujaCoordenadas, app.errorAlSolicitarLocalizacion);
	},

	pintaCoordenadasEnMapa: function(position){
		var miMapa = L.map('map').setView([position.coords.latitude,position.coords.longitude],13);

		L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibHVpc2tyMDQiLCJhIjoiY2pvcWZmenBhMDByYzNwdDdhaDBjcjV5OCJ9.nUBQPz2v9f09W0G1y0X6IA',{
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18
		}).addTo(miMapa);

		/*coordsDiv.innerHTML = 'Latitud: ' + position.coords.latitude + 'Longitud: ' + position.coords.longitude;*/
	},

	errorAlSolicitarLocalizacion: function(error){
		console.log(error.code + ': ' + error.message);
	},
};

if('addEventListener' in document)
{
	document.addEventListener('DOMContentLoaded', function(){
		app.inicio();
	}, false);
	document.addEventListener('deviceready', function(){
		app.dispositivoListo();
	}, false);
}

