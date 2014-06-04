//dom ready functions
$(function(){
  $('ul[id^="accordion-"]').dcAccordion();
  //prototype only functions - Benito can delete in Visual Studio??
  insert_map();
  insert_top();
});

function toggle_radio() {
  if ($(this).children('input[type="radio"]').prop('checked') === false ) {
    $(this).parents('.panel-body').children('.radio-button').children('input[type="radio"]').prop('checked', false);
    $(this).parents('.panel-body').children('.radio-button').removeClass('checked');
    $(this).children('input[type="radio"]').prop("checked", true);
    $(this).addClass('checked');
  }
}

function toggle_active_layer() {
  if ($(this).prop('checked')) {
    $('input[name="layer-select"]').parents('.pull-right').removeClass('select');
    $(this).parents('.pull-right').addClass('select');
    $('input[name="layer-select"]').parents('.layers').removeClass('current-active');
    $(this).parents('.layers').addClass('current-active');
  }
}

function toggle_layer_selection() {
  $(this).toggleClass('checked');
}

function show_meta2_panel() {
  $('.asset-select-panel.panel-2').removeClass('hidden');
}

function show_meta3_panel() {
  $('.asset-select-panel.panel-3').removeClass('hidden');
}

  //prototype only functions - Benito can delete?

function insert_map() {
  $.get('MapLayer.html', function(data) {
    $('#insert-map').html(data);
    });
  $('#insert-map').trigger('create');
}

function insert_left() {
  $('#insert-left').empty();
  $.get('left_bar.html', function(data) {
    $('#insert-left').html(data);
  });
}

function insert_top() {
  $.get('top_bar.html', function(data) {
    $('#insert-top').html(data);
  });
}

function refresh_map()
{
  window.location = ('index.html');
}

$(function() {
  $("#map-link").on('click', refresh_map);
});

function show_fake_map() {
  $('#mapstatic').attr('src', "Content/images/OsmMap_Feature.png")
  $('.qtip-layers-panel').qtip('api').hide();
}

// inserts the first form into the form page on initial load of details page
function show_first_form() {
  $.get('forms/form_cr.html', function(data) {
    $('#insert-form').html(data);
    });
  window.location = ('form.html'); //initial refresh
}