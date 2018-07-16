// Google api's: geometry and drawing

function initMap() {
    var selectedShape;

    // to clear the selected polygon
    function clearSelection() {
        if (selectedShape) {
            selectedShape.setEditable(false);
            selectedShape = null;
        }
    }

    function setSelection(shape) {
        clearSelection();
        selectedShape = shape;
        shape.setEditable(true);

    }

    function deleteSelectedShape() {
        if (selectedShape) {
            selectedShape.setMap(null);

        }
    }

// initial setup of the map when page loads.

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: {lat: 42.361145, lng: -71.057083}
    });

    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    var countries = document.getElementById('country-selector');



    var autocomplete = new google.maps.places.Autocomplete(input);

    //Auto complete with country = united states only
    // Set initial restrict to the greater list of countries.
    autocomplete.setComponentRestrictions(
        {'country': ['us']});

    // Specify only the data fields that are needed.
    autocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name']);
    // drawing polygon with google api
    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
        },
        markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
        circleOptions: {
            fillColor: '#7c9199',
            fillOpacity: 1,
            strokeWeight: 5,
            editable: true,
            zIndex: 1
        }
    });
    drawingManager.setMap(map);

// place the marker on the search location
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {

        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
            map.setZoom(20);// Why 18? Because it looks good for drawing.
        } else {
            map.setCenter(place.geometry.location);

        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

    });


    // Using geometry google API


//addListener

    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
        if (e.type != google.maps.drawing.OverlayType.MARKER) {
            // trigger to non drawing mode
            drawingManager.setDrawingMode(null);

            // Add an event listener that selects the newly-drawn shape when the user
            // mouses down on it.
            var newShape = e.overlay;
            newShape.type = e.type;
            google.maps.event.addListener(newShape, 'click', function() {
                setSelection(newShape);
            });
            //compute area
            var area = google.maps.geometry.spherical.computeArea(newShape.getPath());

            //converting area from long float to 2 decimal points.
            var twoPlacedFloat = parseFloat(area).toFixed(2);
            area = twoPlacedFloat;
            document.getElementById("area").innerHTML = "Area =" +area +" Square Metres";
            setSelection(newShape);
        }
    });
    // Clear the current selection when the drawing mode is changed, or when the
    // map is clicked.
    google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);
    google.maps.event.addListener(map, 'click', clearSelection);
    google.maps.event.addDomListener(document.getElementById('delete-button'), 'click', deleteSelectedShape);

}


