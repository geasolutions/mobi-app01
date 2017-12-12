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


function mymaplocations_menu() {
  try {
    var items = {};
    items['mapsfront'] = {
      title: 'Innova Spaces',
      page_callback: 'mymaps_front',
      pageshow: 'mymaps_front_pageshow'
    };
    return items;
  }
  catch (error) { console.log('mymaplocations_menu - ' + error);}
   }
   
 function mymaps_front() {
  try {    
   var content = {};
    content['mymf_radio_buttons'] = {
    theme: 'radios',
    options: {
      0: 'Desde mi ubicación',
      1: 'Desde Otra ubicación'
    },
    value: 0,
    attributes: {
      /*onclick: "mymf_radio_handler(this)"*/
	  onclick: "mymaps_front_pageshow(this)"
    }
  };
  return content;
}
}
//The Click Handler
function mymf_radio_handler(radio) {
  _mymap_buscar=$(radio).val();
  drupalgap_alert('Seleccionado: ' + $(radio).val());
 }

function mymaps_front_pageshow(_mymap_buscar) {
  drupalgap_alert('mymaps_front_pageshow ha sido llamada! con opción:' + $(radio).val());
} 
	  
  /* content['locationBt'] = {
   theme: 'button',
   text: 'Lugares de interés',
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
 }*/




