//dom ready functions
$(function(){
  $('#details-link').on('click', form_navbar);
  $("#insert-left").on('click', '#tools-button', tools_options_qtip);
  $("#insert-top").on('click', '#search-by-address-button', searchByAddress_qtip);
});

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

function goto_forms() {
  form_navbar();
  $('#insert-map').empty();
  $.get('forms/form_cr.html', function(data) {
    $('#insert-form').html(data);
    });
  insert_left();
  var formName = 'request'
  show_correct_ovals(formName);
}

function insert_inspection_form() {
  $('#insert-form').empty();
  $.get('forms/form_inspect.html', function(data) {
    $('#insert-form').html(data);
    });
  var formName = 'inspection'
  show_correct_ovals(formName);
  $('#insert-form').on('change', skip_to_details);
  oval_border_highlight('#tab2');
}

function insert_scaffold_form() {
  $('#insert-form').empty();
  $.get('forms/form_scaffold.html', function(data) {
    $('#insert-form').html(data);
  });
  $('html body').animate({ scrollTop: 0 });
}

function insert_CR_form() {
  $('#insert-form').empty();
  $.get('forms/form_cr.html', function(data) {
    $('#insert-form').html(data);
  });
  var formName = 'request'
  show_correct_ovals(formName);
  $('#insert-form').on('change', skip_to_details);
  oval_border_highlight('#tab2');
}

function insert_defect_form() {
  $('#insert-form').empty();
  $.get('forms/form_defect.html', function(data) {
    $('#insert-form').html(data);
  });
  var formName = 'defect'
  show_correct_ovals(formName);
  $('#insert-form').on('change', skip_to_details);
  oval_border_highlight('#tab2');
}

function insert_task_form() {
  $('#insert-form').empty();
  $.get('forms/form_task.html', function(data) {
    $('#insert-form').html(data);
  });
  var formName = 'task'
  show_correct_ovals(formName);
}

function insert_timesheet_form() {
  $('#insert-form').empty();
  $.get('forms/form_timesheet.html', function(data) {
    $('#insert-form').html(data);
  });
  var formName = 'timesheet'
  show_correct_ovals(formName);
  $('html body').animate({ scrollTop: 0 });
}

function show_correct_ovals(formName) {
  if (formName === 'request') {
    console.log('request');
    $('a[data-href="#bookmark_condition"]').parent('li').hide();

    $('a[data-href="#bookmark_contact"]').parent('li').show();
    $('a[data-href="#bookmark_details"]').parent('li').show();
    $('a[data-href="#bookmark_location"]').parent('li').show();
    $('a[data-href="#bookmark_notes"]').parent('li').show();
    $('a[data-href="#bookmark_closeout"]').parent('li').show();

    $('a[data-href="#bookmark_start"]').parent('li').hide();
    $('a[data-href="#bookmark_work"]').parent('li').hide();
    $('a[data-href="#bookmark_breaks"]').parent('li').hide();
    $('a[data-href="#bookmark_end"]').parent('li').hide();
    $('a[data-href="#bookmark_review"]').parent('li').hide();
    hide_timesheet_ovals();
    hide_task_ovals();
  }
  if (formName === 'defect') {
    $('a[data-href="#bookmark_contact"]').parent('li').hide();

    $('a[data-href="#bookmark_condition"]').parent('li').show();
    $('a[data-href="#bookmark_details"]').parent('li').show();
    $('a[data-href="#bookmark_location"]').parent('li').show();
    $('a[data-href="#bookmark_notes"]').parent('li').show();
    $('a[data-href="#bookmark_closeout"]').parent('li').show();

    $('a[data-href="#bookmark_start"]').parent('li').hide();
    $('a[data-href="#bookmark_work"]').parent('li').hide();
    $('a[data-href="#bookmark_breaks"]').parent('li').hide();
    $('a[data-href="#bookmark_end"]').parent('li').hide();
    $('a[data-href="#bookmark_review"]').parent('li').hide();
    hide_timesheet_ovals();
    hide_task_ovals();
  }
  if (formName === 'inspection') {
    $('a[data-href="#bookmark_condition"]').parent('li').hide();
    $('a[data-href="#bookmark_contact"]').parent('li').show();

    $('a[data-href="#bookmark_details"]').parent('li').show();
    $('a[data-href="#bookmark_location"]').parent('li').show();
    $('a[data-href="#bookmark_notes"]').parent('li').show();
    $('a[data-href="#bookmark_closeout"]').parent('li').show();

    $('a[data-href="#bookmark_start"]').parent('li').hide();
    $('a[data-href="#bookmark_work"]').parent('li').hide();
    $('a[data-href="#bookmark_breaks"]').parent('li').hide();
    $('a[data-href="#bookmark_end"]').parent('li').hide();
    $('a[data-href="#bookmark_review"]').parent('li').hide();
    hide_timesheet_ovals();
    hide_task_ovals();
  }
  if (formName === 'task') {
    $('a[data-href="#bookmark_condition"]').parent('li').hide();
    $('a[data-href="#bookmark_contact"]').parent('li').hide();
    $('a[data-href="#bookmark_location"]').parent('li').hide();
    $('a[data-href="#bookmark_details"]').parent('li').hide();
    $('a[data-href="#bookmark_notes"]').parent('li').hide();
    $('a[data-href="#bookmark_closeout"]').parent('li').hide();
    hide_timesheet_ovals();
    show_task_ovals();
  }
  if (formName === 'timesheet') {
    $('a[data-href="#bookmark_condition"]').parent('li').hide();
    $('a[data-href="#bookmark_contact"]').parent('li').hide();
    $('a[data-href="#bookmark_location"]').parent('li').hide();
    $('a[data-href="#bookmark_details"]').parent('li').hide();
    $('a[data-href="#bookmark_notes"]').parent('li').hide();
    $('a[data-href="#bookmark_closeout"]').parent('li').hide();
    show_timesheet_ovals();
    hide_task_ovals();
  }
}

function hide_task_ovals() {
  $('a[data-href="#bookmark_taskdetails"]').parent('li').hide();
  $('a[data-href="#bookmark_extdetails"]').parent('li').hide();
  $('a[data-href="#bookmark_loe"]').parent('li').hide();
  $('a[data-href="#bookmark_wip"]').parent('li').hide();
  $('a[data-href="#bookmark_traffic"]').parent('li').hide();
  $('a[data-href="#bookmark_tasknotes"]').parent('li').hide();
}

function show_task_ovals() {
  $('a[data-href="#bookmark_taskdetails"]').parent('li').show();
  $('a[data-href="#bookmark_extdetails"]').parent('li').show();
  $('a[data-href="#bookmark_loe"]').parent('li').show();
  $('a[data-href="#bookmark_wip"]').parent('li').show();
  $('a[data-href="#bookmark_traffic"]').parent('li').show();
  $('a[data-href="#bookmark_tasknotes"]').parent('li').show();
}

function show_timesheet_ovals() {
  $('a[data-href="#bookmark_start"]').parent('li').show();
  $('a[data-href="#bookmark_work"]').parent('li').show();
  $('a[data-href="#bookmark_breaks"]').parent('li').show();
  $('a[data-href="#bookmark_end"]').parent('li').show();
  $('a[data-href="#bookmark_review"]').parent('li').show();
}

function hide_timesheet_ovals() {
  $('a[data-href="#bookmark_start"]').parent('li').hide();
  $('a[data-href="#bookmark_work"]').parent('li').hide();
  $('a[data-href="#bookmark_breaks"]').parent('li').hide();
  $('a[data-href="#bookmark_end"]').parent('li').hide();
  $('a[data-href="#bookmark_review"]').parent('li').hide();
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