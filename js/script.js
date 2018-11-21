var app = {
	inicio:function(){
		this.iniciarFastClick();
	},

	iniciarFastClick: function(){
		FastClick.attach(document.body);
	},

	dispositivoListo: function(){
		navigator.geolocation.getCurrentPosition(app.pintaCoordenadasEnMapa, app.errorAlSolicitarLocalizacion);
	},

	pintaCoordenadasEnMapa: function(position){
		var miMapa = L.map('map').setView([position.coords.latitude,position.coords.longitude],13);

		L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibHVpc2tyMDQiLCJhIjoiY2pvcWZmenBhMDByYzNwdDdhaDBjcjV5OCJ9.nUBQPz2v9f09W0G1y0X6IA',{
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18
		}).addTo(miMapa);

		/*Funcion que permite pintar el marcador*/
		app.pintaMarcador([position.coords.latitude, position.coords.longitude], '¡Estoy Aqui!', miMapa);
		
		/*Funcion para seleccionar un favorito*/
		miMapa.on('click', function(){
			var texto = 'Marcador en l(' + evento.latlng.lat.toFixed(2) + ') y L(' + evento.latlng.lng.toFixed(2) + ')';
			app.pintaMarcador(evento.latlng, texto, miMapa);
		});
		
	},

	/*Funcion que pinta el marcador en el mapa*/
	pintaMarcador: function(latlng, texto, mapa){
		var marcador = L.marker(latlng).addTo(mapa);
		marcador.bindPopup(texto).openPopup();
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

