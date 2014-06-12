var owlLayersHtml;
//dom ready functions
$(function(){
  $('#details-link').on('click', form_navbar);
  $("#insert-left").on('click', '#tools-button', tools_options_qtip);
  $("#insert-top").on('click', '#search-by-address-button', searchByAddress_qtip);

  $('ul[id^="accordion-"]').dcAccordion();
  //prototype only functions - Benito can delete in Visual Studio??
  insert_map();
  insert_top();
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

function show_asset_select_qtip() {
  $(this).addClass('active');
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

function show_layer_select_qtip() {
  $(this).addClass('active');
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
          classes: 'qtip-forms-raise qtip-bootstrap qtip-shadow qtip-light'
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

function tools_options_qtip() {
  $(this).qtip({
      content: {
        text: $('#tools-options').clone(),
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
              $('.tools-options-icons').removeClass('hidden');
          }
      },
      style: {
          classes: 'qtip-tools-options qtip-rounded qtip-shadow qtip-light',
          tip: {
            width: 25,
            height: 15,
        }
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
              $('.tools-options-icons').addClass('hidden');
          }
      },
      overwrite: false,
      position: {
          my: 'center left',
          at: 'center right',
          target: $(this)
      },
  });
  $('#tools-options').removeClass('invisible');
}

function searchByAddress_qtip() {
  $(this).qtip({
      content: {
        text: $('#search-address'),
        button: 'Close'
      },
      render: function (event, api) {
          // Grab the content
          var content = api.elements.content;
          // Now it's is rendered, we can...
          content.otherPlugin(); // ...Call our other plugins to act on its contents
          $(this, content).otherPlugin(); // ...or a subset of it's contents!
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
          classes: 'qtip-address-panel qtip-rounded qtip-shadow qtip-light',
          tip: {
            corner: 'top center',
            width: 50,
            height: 30
        }
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
          }
      },
      overwrite: false,
      position: {
          my: 'top center',
          at: 'bottom center',
          target: $('#search-by-address-button')
      }
  });
  $('#address-search').removeClass('invisible');
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
  insert_left();
  close_current_qtip();
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
    items : 4,
    itemsDesktop : [1199,4],
    itemsDesktopSmall : [980,4],
    itemsTablet: [800,4],
    itemsTabletSmall: [400,3],
    itemsMobile : [479,2],
    singleItem : false,
    itemsScaleUp : false,

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
    pagination : true,
    paginationNumbers: true,

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