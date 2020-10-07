async function get(url) {
    const response = await fetch(url);
    
    return response.json()
}

const conditions = {
    "Ensoleillé": "wi-day-sunny",
    "Nuit claire": "wi-night-clear",
    "Ciel voilé": "wi-day-cloudy",
    "Nuit légèrement voilée": "wi-night-alt-cloudy",
    "Faibles passages nuageux": "wi-cloud",
    "Nuit bien dégagée": "wi-night-clear",
    "Brouillard": "wi-fog",
    "Stratus": "wi-day-cloudy",
    "Stratus se dissipant": "wi-day-cloudy",
    "Nuit claire et stratus": "wi-night-alt-cloudy",
    "Eclaircies": "wi-day-cloudy",
    "Nuit nuageuse": "wi-night-cloudy",
    "Faiblement nuageux": "wi-cloud",
    "Fortement nuageux": "wi-cloudy",
    "Averses de pluie faible": "wi-showers",
    "Nuit avec averses": "wi-night-alt-showers",
    "Averses de pluie modérée": "rain-mix",
    "Averses de pluie forte": "wi-rain",
    "Couvert avec averses": "wi-sleet",
    "Pluie faible": "wi-sleet",
    "Pluie forte": "wi-rain",
    "Pluie modérée": "wi-hail",
    "Développement nuageux": "wi-cloud",
    "Nuit avec développement nuageux": "wi-night-alt-cloudy",
    "Faiblement orageux": "wi-storm-showers",
    "Nuit faiblement orageuse": "wi-night-alt-sleet-storm",
    "Orage modéré": "wi-storm-showers",
    "Fortement orageux": "wi-lightning",
    "Averses de neige faible": "wi-snow",
    "Nuit avec averses de neige faible": "wi-night-snow",
    "Neige faible": "wi-snow",
    "Neige modérée": "wi-snow",
    "Neige forte": "wi-snow",
    "Pluie et neige mêlée faible": "wi-snow",
    "Pluie et neige mêlée modérée": "wi-snow",
    "Pluie et neige mêlée forte": "wi-snow"
}
