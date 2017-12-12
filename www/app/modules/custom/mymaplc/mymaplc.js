var _mymap_user_latitude = null;
var _mymap_user_longitude = null;
var _mymap_map = null;
var _mymap_buscar = 0;
var directions = {};
var contactsWithAddress = [];
var contactAddresses = [];
var compassWatchId = -1;
var locationWatchId = -1;
var map_with_pos = {};
var previous_pos_marker = {};


function mymaplc_menu() {
  try {
    var items = {};
    items['mfront'] = {
      title: 'Innova Spaces',
      page_callback: 'mymaplc_mfront'
//      pageshow: 'mymaplc_mfront_pageshow'
    };
    return items;
  }
  catch (error) { console.log('mymaplc_menu - ' + error);}
   }
   
 function mymaplc_mfront() {
  try {    
   var content = {};
    content['mymaplc_mfront_radio_buttons'] = {
    theme: 'radios',
    options: {
      0: 'Desde mi ubicación',
      1: 'Desde Otra ubicación'
    },
    value: 0,
    attributes: {
      onclick: "mymaplc_mfront_radio_handler(this)";
//	  onclick: "mymaps_front_pageshow(this)"
    }
  };
  return content;
}
}


//The Click Handler
function mymaplc_mfront_radio_handler(radio) {
  _mymap_buscar=$(radio).val();
  drupalgap_alert('Seleccionado: ' + $(radio).val());
 }

/*function mymaplocations_mapsfront_pageshow(_mymap_buscar) {
  drupalgap_alert('mymaplocations_mapsfront_pageshow ha sido llamada! con opción:' + $(radio).val());
}*/