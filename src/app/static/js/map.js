function getColor(d) {
    
    if(map_coloring == 'capacity_map'){
        return d < legend_labels[0]  ? '#FF0000' :
        d < legend_labels[1]  ? '#FF4400' :
        d < legend_labels[2]  ? '#FF9900' :
        d < legend_labels[3]  ? '#FFDD00' :
        d < legend_labels[4]  ? '#FFFF00' :
        d < legend_labels[5]  ? '#99FF00' :
        d < legend_labels[6]  ? '#44FF00' :
        d >= legend_labels[6]  ? '#00FF00' :
                 '#d3d3d3'; //'#FFEDA0';
    }
    else if(map_coloring == 'prediction_map'){
        return d > legend_labels[5]  ? '#FF0000' :
        d > legend_labels[4]  ? '#FF4400' :
        d > legend_labels[3]  ? '#FF9900' :
        d > legend_labels[2]  ? '#FFDD00' :
        d > legend_labels[1]  ? '#FFFF00' :
        d > legend_labels[0]  ? '#99FF00' :
        d <= legend_labels[0]  ? '#00FF00' :
                '#d3d3d3';
    } 
    else if(map_coloring == 'age_map'){
        return d > legend_labels[4]  ? '#FF0000' :
        d > legend_labels[3]  ? '#FF4400' :
        d > legend_labels[2]  ? '#FF9900' :
        d > legend_labels[1]  ? '#FFFF00' :
        d > legend_labels[0]  ? '#99FF00' :
        d <= legend_labels[0]  ? '#00FF00' :
                 '#d3d3d3'; //'#FFEDA0';
    }

}

function getColorByName(n) {
    var d = data[n]
    return getColor(d);
}


function style(feature) {
    return {
        fillColor: getColorByName(feature.properties.name),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
    };
}

  
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);

}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        // click: zoomToFeature
    });
}


var map = L.map("map").setView([49.85, 15.0], 8);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

geojson = L.geoJson(regionData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);


var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {  
    this._div.innerHTML = '<h4>'+map_title +'</h4>'+  (props ?
        '<b>' + normalized_names[props.name] + '</b><br/>' + (data[props.name] ? data[props.name]:0) + ratio_label
        : 'Najeďte kurzorem na okres');
};

info.addTo(map);


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = legend_labels,
        labels = ['<strong>'+legend_title+'</strong><br>'];
    
        div.innerHTML += labels.join('<br>');

        div.innerHTML +=
        '<i style="background:' + getColor(grades[0]-1) + '"></i> < ' +
        grades[0] +'<br>';

    for (var i = 1; i < grades.length-1; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]-0.01) + '"></i> ' +
            grades[i-1] + (grades[i-1] == grades[i] ? '' : '-' + ((grades[i]-0.01).toFixed(2))) + '<br>';
    }

    div.innerHTML +=
    '<i style="background:' + getColor(grades[grades.length-2]+0.01) + '"></i> > ' +
    grades[grades.length-2] +'<br>';


    div.innerHTML +=
    '<i style="background:' + getColor(grades[grades.length-1]) + '"></i> ' +
    grades[grades.length-1] + '<br>';


    return div;
};

legend.addTo(map);
