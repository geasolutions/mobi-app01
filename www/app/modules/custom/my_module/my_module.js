/**
 * Implements hook_menu().
 */
function my_module_menu() {
  var items = {};
  items['hello_world'] = {
    title: 'DrupalGap',
    page_callback: 'my_module_hello_world_page'
  };
  return items;
}

/**
 * The callback for the "Hello World" page.
 */
function my_module_hello_world_page() {
  var content = {};
  content['my_button'] = {
    theme: 'button',
    text: 'Hello World',
    attributes: {
      onclick: "drupalgap_alert('Esta es una prueba de que todo funciona bien cuando está en el lugar apropiado en el momento apropiado!')"
    }
  };
  return content;
}