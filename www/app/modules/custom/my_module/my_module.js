// Create global variables to hold coordinates and the map.
  var _my_module_user_latitude = null;
  var _my_module_user_longitude = null;
  var _my_module_map = null;

  function my_module_menu() {
  try {
    var items = {};
    items['map'] = {
      title: 'Mapa de Localidades',
      page_callback: 'my_module_map',
      pageshow: 'my_module_map_pageshow'
    };
    return items;
  }
  catch (error) { console.log('my_module_menu - ' + error); }
  }
  function my_module_map() {
  try {
    var content = {};
    var map_attributes = {
      id: 'my_module_map',
      style: 'width: 100%; height: 400px;'
    };
    content['map'] = {
      markup: '<div ' + drupalgap_attributes(map_attributes) + '></div>'
    };
   content['map_location'] = {
    theme: 'button',
   text: 'Localidades de interés en el área',
   attributes: {
    onclick: "_my_module_map_button_click()",
    'data-theme': 'b'
   }
  };
  content['location_results'] = {
  theme: 'jqm_item_list',
  items: [],
  attributes: {
    id: 'location_results_list'
   }
   };
    return content;
   }
  catch (error) { console.log('my_module_map - ' + error); }
 }
 
 
  function my_module_map_pageshow() {
  try {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        _my_module_user_latitude = position.coords.latitude;
        _my_module_user_longitude = position.coords.longitude;
        
        // Build the lat lng object from the user's position.
        var myLatlng = new google.maps.LatLng(
          _my_module_user_latitude,
          _my_module_user_longitude
        );
        
        // Set the map's options.
        var mapOptions = {
          center: myLatlng,
          zoom: 14,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
          },
          zoomControl: true,
          zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL
          }
        };
        
        // Initialize the map, and set a timeout to resize properly.
        _my_module_map = new google.maps.Map(
          document.getElementById("my_module_map"),
          mapOptions
        );
        setTimeout(function() {
            google.maps.event.trigger(_my_module_map, 'resize');
            _my_module_map.setCenter(myLatlng);
        }, 500);
        
        // Add a marker for the user's current position.
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: _my_module_map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });
        
      },
      // Error
      function(error) {
        
        // Provide debug information to developer and user.
        console.log(error);
        drupalgap_alert(error.message);
        
        // Process error code.
        switch (error.code) {

          // PERMISSION_DENIED
          case 1:
            break;

          // POSITION_UNAVAILABLE
          case 2:
            break;

          // TIMEOUT
          case 3:
            break;
        }
      },
      // Options
      { enableHighAccuracy: true }
      
    );
  }
  catch (error) {
    console.log('my_module_map_pageshow - ' + error);
  }
 }

function _my_module_map_button_click() {
  try {

    var range = 20; // Search within a 4 mile radius, for illustration purposes.
    var path = 'nearby-location.json/' + _my_module_user_latitude + ',' + _my_module_user_longitude + '_' + range;
    // Call the server.
    views_datasource_get_view_result(path, {
        success: function(data) {
          if (data.nodes.length === 0) {
            drupalgap_alert('Lo sentimos, no se encuentran localidades de interés cercanas!');
            return;
          }

          // Iterate over each spot, add it to the list and place a marker on the map.
          var items = [];
          $.each(data.nodes, function(index, object) {
              
              // Render a nearby location, and add it to the item list.
              var row = object.node;
              //var image_html = theme('image', { path: row.field_image.src });
              var distance =
                row.field_geofield_distance + ' ' +
                drupalgap_format_plural(row.field_geofield_distance, 'mile', 'miles');
              var description =
                '<h2>' + distance + '</h2>' +
                '<p>' + row.title + '</p>';
              var link = l(description, 'node/' + row.nid);
              items.push(link);
              
              // Add a marker on the map for the location.
              var locationLatlng = new google.maps.LatLng(row.latitude, row.longitude);
              var marker = new google.maps.Marker({
                  position: locationLatlng,
                  map: _my_module_map,
                  data: row
              });
              
          });
          drupalgap_item_list_populate("#location_results_list", items);
        }
    });
  }
  catch (error) { console.log('_my_module_map_button_click - ' + error); }
 }