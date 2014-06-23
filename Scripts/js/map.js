var owlLayersHtml;
var owlLayers;
var lastScrollTop = 0,
    st,
    direction;
//dom ready functions
$(function(){
  $('#details-link').on('click', form_navbar);

  $('ul[id^="accordion-"]').dcAccordion();
  //prototype only functions - Benito can delete in Visual Studio??
  insert_map();
  insert_top();
  $('#insert-top-toggle.toggle').on('click', toggle_top_bar);
  $('#insert-map').on('click', map_select_qtip);
});

function toggle_layer_select_colour() {
  var checkbox = $(this).children('.input-group').children('input');
  $(checkbox).each(function() {
    if ((checkbox).prop('checked')) {
      layer_select_colour($(this).closest('li'));
    }
    else if (checkbox.closest('span make-active').hasClass('active')){
      return false;
    }
    else {
      layer_deselect_colour($(this).closest('li'));
    }
  });
}

function toggle_select_all_layers() {
  $(this).toggleClass('selected');
  var selected = $(this).hasClass('selected');
  var list = $(this).closest('li').children('ul').children('li');
  if (selected) {
    $(list).each(function() {
      $(this).children('.input-group').children('input').prop('checked', true);
      layer_select_colour(this);
    });
  }
  else {
    $(list).each(function() {
      $(this).children('.input-group').children('input').prop('checked', false);
      layer_deselect_colour(this);
      // if select none but one in the list is no-deselect (eg active-layer) then keep it checked and green
      if ($(this).children('.input-group').hasClass('no-deselect')) {
        $(this).children('.input-group').children('input').prop('checked', true);
        layer_select_colour(this);
      }
    });
  }
}

function layer_select_colour(layer) {
  $(layer).each(function() {
    $(this).addClass('selected');
  });
}

function layer_deselect_colour(layer) {
  $(layer).each(function() {
    $(this).removeClass('selected');
  });
}

function checkbox_when_clicked() {
  var checkbox = $(this).children().first().children().first();
  if ($(checkbox).parent().hasClass('no-deselect')) {
    return false;
  }
  $(checkbox).prop('checked', !checkbox.prop("checked"));
}

function layer_active_clicked() {
  var activate = $(this);
  if ($(activate).hasClass('active')) {
    return false;
  }
  else {
    $('.make-active').removeClass('active');
    $('.input-group').removeClass('no-deselect');
    $(activate).toggleClass('active');
    $(this).parent().children().first().addClass('no-deselect');
    var checkbox = $(this).parent().children().first().children().first();
    $(checkbox).prop('checked', true);
  }
}

function map_select_qtip() {
  console.log('hello');
  $(this).addClass('active');
  $('html, body').animate({ scrollTop: 0 }, 0 );
  $(this).qtip({
      content: {
        text: $('#map-popup-content'),
        button: 'Close'
      },
      show: {
          modal: {
              on: true,
              solo: true
          },

          ready: true,
          event: 'click',
          effect: function (offset) {
              $(this).slideDown(300);
          }
      },
      style: {
          classes: 'qtip-map-popup qtip-bootstrap qtip-shadow qtip-light'
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
          }
      },
      overwrite: false,
      position: {
          my: 'center',
          at: 'center',
          target: $(this),
          adjust: {
            scroll: true // Can be ommited (e.g. default behaviour)
        }
      }
  });
  $('#map-popup-content').removeClass('invisible');
}

function show_layer_select_qtip() {
  $(this).addClass('active');
  $('html, body').animate({ scrollTop: 0 }, 0 );
  $(this).qtip({
      content: {
        text: $('#layer-select-content'),
        button: 'Close'
      },
      show: {
          modal: {
              on: true,
              solo: true
          },

          ready: true,
          event: 'click',
          effect: function (offset) {
              $(this).slideDown(300);
          }
      },
      style: {
          classes: 'qtip-layer-select qtip-bootstrap qtip-shadow qtip-light'
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
              $('#layer-select').removeClass('active');
          }
      },
      overwrite: false,
      position: {
          my: 'center',
          at: 'center',
          target: $(this),
          adjust: {
            scroll: true // Can be ommited (e.g. default behaviour)
        }
      }
  });
  $('#layer-select-content').removeClass('invisible');
}

function show_asset_select_qtip() {
  $(this).addClass('active');
  $('html, body').animate({ scrollTop: 0 }, 0 );
  $(this).qtip({
      content: {
        text: $('#asset-select-content'),
        button: 'Close'
      },
      show: {
          modal: {
              on: true,
              solo: true
          },

          ready: true,
          event: 'click',
          effect: function (offset) {
              $(this).slideDown(300);
          }
      },
      style: {
          classes: 'qtip-asset-select qtip-bootstrap qtip-shadow qtip-light'
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
              $('#asset-select').removeClass('active');
          }
      },
      overwrite: false,
      position: {
          my: 'center',
          at: 'center',
          target: $(this),
          adjust: {
            scroll: true // Can be ommited (e.g. default behaviour)
        }
      }
  });
  $('#asset-select-content').removeClass('invisible');
  is_asset_meta1_data_selected();
}

function is_asset_meta1_data_selected() {
  var asset_meta1_select = $('.radio-button input[type="radio"]').is(":checked");
  if (asset_meta1_select) {
    show_meta2_panel();
  }
}

function show_map_tools_select_qtip() {
  $(this).addClass('active');
  $(this).qtip({
      content: {
        text: $('#map-tools-select-content'),
        button: 'Close'
      },
      show: {
          modal: {
              on: true,
              solo: true
          },

          ready: true,
          event: 'click',
          effect: function (offset) {
              $(this).slideDown(300);
          }
      },
      style: {
          classes: 'qtip-map-tools-select qtip-bootstrap qtip-shadow qtip-light'
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
              $('#map-tools-select').removeClass('active');
          }
      },
      overwrite: false,
      position: {
          my: 'top right',
          at: 'bottom left',
          target: $(this),
          adjust: {
            scroll: true // Can be ommited (e.g. default behaviour)
        }
      }
  });
  $('#map-tools-select-content').removeClass('invisible');
}

function show_module_qtip() {
  $(this).addClass('active');
  $(this).qtip({
      content: {
        text: $('#modules-select-content'),
        button: 'Close'
      },
      show: {
          modal: {
              on: true,
              solo: true
          },

          ready: true,
          event: 'click',
          effect: function (offset) {
              $(this).slideDown(300);
          }
      },
      style: {
          classes: 'qtip-module-select qtip-bootstrap qtip-shadow qtip-light'
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
              $('#module-select-1').removeClass('active');
              $('#module-select-2').removeClass('active');
          }
      },
      overwrite: false,
      position: {
          my: 'top right',
          at: 'bottom left',
          target: $(this),
          adjust: {
            scroll: true // Can be ommited (e.g. default behaviour)
        }
      }
  });
  $('#modules-select-content').removeClass('invisible');
}

function show_forms_raise_select_qtip() {
  $(this).addClass('active');
  $(this).qtip({
      content: {
        text: $('#forms-raise-content'),
        button: 'Close'
      },
      show: {
          modal: {
              on: true,
              solo: true
          },

          ready: true,
          event: 'click',
          effect: function (offset) {
              $(this).slideDown(300);
          }
      },
      style: {
          classes: 'qtip-map-tools-select qtip-bootstrap qtip-shadow qtip-light'
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
              $('#forms-raise-select').removeClass('active');
          }
      },
      overwrite: false,
      position: {
          my: 'top right',
          at: 'bottom left',
          target: $(this),
          adjust: {
            scroll: true // Can be ommited (e.g. default behaviour)
        }
      }
  });
  $('#forms-raise-content').removeClass('invisible');
}

function show_search_address_qtip() {
  close_current_qtip();
  $(this).addClass('active');
  $(this).qtip({
      content: {
        text: $('#search-address-content'),
        button: 'Close'
      },
      show: {
          modal: {
              on: true,
              solo: true
          },

          ready: true,
          event: 'click',
          effect: function (offset) {
              $(this).slideDown(300);
          }
      },
      style: {
          classes: 'qtip-search-address qtip-bootstrap qtip-shadow qtip-light'
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
          }
      },
      overwrite: false,
      position: {
          my: 'center',
          at: 'center',
          target: $(window),
          adjust: {
            scroll: true // Can be ommited (e.g. default behaviour)
        }
      }
  });
  $('#search-address-content').removeClass('invisible');
}

function close_current_qtip() {
  $('.qtip').qtip('hide');
}

function goto_forms() {
  form_navbar();
  $('#insert-map').empty();
  $.get('forms/form_cr.html', function(data) {
    $('#insert-form').html(data);
    });
  close_current_qtip();
  unhide_top_toggle();
  insert_left();
}

function insert_form() {
  close_current_qtip();
  var filename = $(this).children('a').attr('data-filename');
  $('#insert-form').empty();
  $.get(filename, function(data) {
    $('#insert-form').html(data);
  });
  insert_left();
}

// add current class to image pages-icons class on click
function show_active_tab() {
  $(this).children('img').addClass("current");
  event.stopPropagation();
  show_form();
}

// change content on tab click
function change_tab_content() {
  $('.pages-icons').removeClass("current");
  $(this).addClass('current');
}

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

function refresh_map() {
  window.location = ('index.html');
}

$(function() {
  $("#map-link").on('click', refresh_map);
});

function create_layers_carousel() {
  owlLayersHtml = $("#owl-layers").owlCarousel({

    // Most important owl features
    itemsCustom : [
        [0, 1],
        [450, 4],
        [600, 4],
        [700, 6],
        [1000, 8],
        [1200, 8],
        [1400, 8],
        [1600, 8]
      ],
    singleItem : false,
    itemsScaleUp : true,

    //Basic Speeds
    slideSpeed : 200,
    paginationSpeed : 800,
    rewindSpeed : 1000,

    //Autoplay
    autoPlay : false,
    stopOnHover : false,

    // Navigation
    navigation : true,
    navigationText : false,
    rewindNav : true,
    scrollPerPage : false,

    //Pagination
    pagination : false,
    // paginationNumbers: true,

    // Responsive
    responsive: true,
    responsiveRefreshRate : 100,
    responsiveBaseWidth: window,

    // CSS Styles
    baseClass : "owl-carousel",

    //Auto height
    autoHeight : false,

    //Transitions
    transitionStyle : false,
    })
  $('.owl-prev').addClass('arrow-left');
  $('.owl-next').addClass('arrow-right');

  owlLayers = $('#owl-layers').data('owlCarousel');
}

function goto_owl_pagination() {
  var page = $(this).data('pagination');
  owlLayers.goTo(parseInt(page)-1);
}

function checkbox_when_clicked() {
  var checkbox = $(this).children().first().children().first();
  if ($(checkbox).parent().hasClass('no-deselect')) {
    return false;
  }
  $(checkbox).prop('checked', !checkbox.prop("checked"));
  make_tag_selected($(checkbox), checkbox.prop('checked'));
}

function layer_active_clicked() {
  var activate = $(this);
  if ($(activate).hasClass('active')) {
    return false;
  }
  else {
    $('.make-active').removeClass('active');
    $('.input-group').removeClass('no-deselect');
    $(activate).toggleClass('active');
    $(this).parent().children().first().addClass('no-deselect');
    var checkbox = $(this).parent().children().first().children().first();
    $(checkbox).prop('checked', true);
    make_tag_active($(checkbox));
  }
}

function make_tag_selected(checkbox, selected) {
  var item_num = $(checkbox).parents('.item').data('item-number');
  var tag = $('.pagination-container .pagination[data-pagination='+item_num+']');
  if (selected) {
    $(tag).addClass('selected');
  }
  else if ($(checkbox).parents('.item').find('input[type="checkbox"]').filter(':checked').length < 1) {
    $(tag).removeClass('selected');
  }
}

function make_tag_active(checkbox) {
  var item_num = $(checkbox).parents('.item').data('item-number');
  $('.pagination-container .pagination').removeClass('active'); // remove active from all tags before adding new active
  var tag = $('.pagination-container .pagination[data-pagination='+item_num+']');
  $(tag).addClass('active');
}