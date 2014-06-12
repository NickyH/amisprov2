var topOffset = 140;
var position_array = {}

add_cross_to_required_forms();
change_selectpicker_values();
disable_datepickers();
disable_timepickers();
$('.datepicker').pickadate();

$('.form-horizontal').on('keyup', this, check_panel_valid);
$('.form-horizontal').on('change', this, check_panel_valid);
$( '.form-horizontal .container' ).parsley( 'validate');
$('.selectpicker').selectpicker({ size: 5 });
$('table.row-children tbody tr').on('click', open_current_contact_row);
$('.form-button.save').on('click', show_saving_form); // use this when user saves form and form is saving
// $('.form-button.save').on('click', alert_errors_form); // use this when user presses save but there are errors on form
$('.input-group-addon .glyphicon-calendar').on('click', calendar_icon_click); //activate calendar on icon click
$('.input-group-addon .glyphicon-time').on('click', clock_icon_click); //activate timepicker on icon click
$('.icon-raise').on('click', show_raise_qtip);
$('.filename-delete').on('click', delete_selected_file);
$('.form-container').on('DOMMouseScroll mousewheel', get_bookmark_positions);
$('.form-container').bind('swipemove', get_bookmark_positions);

//use function warn_exit_form() when users moves away from form without saving...

function calendar_icon_click() {
  $(this).parent().parent().children('input').trigger('click');
}

function add_filename() {
  // get filename when file is attached and display it in the next form-group
  $in=$(this);
  var filename = $in.val().split('\\').pop();
  if (filename === "No files added" || filename === "" ) {
    filename = recentfile;
  }
  $in.parents('.form-group').next('.filename').children().find('.filename-text').html(filename);
  $in.parents('.form-group').next('.filename').children().find('.filename-delete').html('x');
  var recentfile = filename
}

function delete_selected_file() {
  $(this).parent('div').children('.filename-text').html("No files added");
  $(this).parent('div').children('.filename-delete').html("");
}

function clock_icon_click() {
  $(this).parent().parent('.input-group').children('.insert-time-picker').trigger('focus');
}

$('.select-all').on('click', function() {
  $(this).parent('.col-sm-8').children('.selectpicker').selectpicker('selectAll');
});

$('.select-none').on('click', function() {
  $(this).parent('.col-sm-8').children('.selectpicker').selectpicker('deselectAll');
});

function select_all() {
  $(this).parent().children('.selectpicker').selectpicker('selectAll');
}

function select_none() {
  $(this).parent().children('.selectpicker').selectpicker('deselectAll');
}

$("input[type='text']").on("click", function () {
  $(this).select();
});

$(".checkbox label input").change(function() {
    var boxes = $(".action-checkbox").click(function(){
      boxes.not(this).attr('checked', false);
    });
    if(this.checked) {
      $('#referralNotesCR').parent('div').parent('div').removeClass('hidden');
      $('#referral-to').parent('.form-group').removeClass('hidden');
      $(this).attr('checked', 'checked');
    }
    else if($(this).prop('checked', 'false')) {
      $('#referralNotesCR').parent('div').parent('div').addClass('hidden');
      $('#referral-to').parent('.form-group').addClass('hidden');
      $(this).removeAttr('checked');
    }
});

function add_cross_to_required_forms() {
  var required;
  var ovalName;
  var change_oval_colour;
  var allPanels = $('.form-horizontal');
  $(allPanels).each(function() {
    required = false
      $(this).find('.form-control').each(function() {
        if ($(this).attr('data-required')) {
          required = true
        }
      });
    if (required) {
      $(this).find('.insert-cross-icon').addClass('glyphicon-remove panel-cross');
      toggle_oval_colour( $(this), 'incomplete' );
    }
  });
}

function check_panel_valid() {
  if ($(this).children('.form-group').find('.search')) {
    var tableID = $(this).children('.form-group').find('.search').parents('.form-horizontal').children('table').attr('id');
    var thisObj = $(this).children('.form-group').find('.search');
    table_search(thisObj, tableID);
  }
  var icon = $(this).children().last();
  var rowValid = false;
  var panelValid = $(this).parsley( 'isValid' );
  var required = check_this_panel_required( $(this) );
  if (panelValid && required ) {
    $(icon).removeClass('glyphicon-remove panel-remove glyphicon-ok panel-ok').addClass('glyphicon-ok panel-ok');
    $(this).parent().parent().parent().find('.form-panel').each(function() {
      if (!$(this).children('form').parsley('isValid')) {
        rowValid = false;
        return rowValid
      }
      else {
        rowValid = true;
      }
    });
    if (rowValid) {
      toggle_oval_colour( (this), 'complete' );
    }
  }
  if (panelValid === false) {
    $(icon).removeClass('glyphicon-remove panel-remove glyphicon-ok panel-ok').addClass('glyphicon-remove panel-remove');
  }
}

function toggle_oval_colour( thisObj, className) {
  $(thisObj).parent().find('.text-circle').removeClass('incomplete complete').addClass(className);
  ovalName = '#' + $(thisObj).parents("div[id^='bookmark_']" ).attr('id');
  change_oval_colour = $("[data-href=" + ovalName + "]");
  if ($(change_oval_colour).attr('data-href') === ovalName ) {
    $(change_oval_colour).children('div').removeClass('incomplete complete').addClass(className);
  }
}

function change_selectpicker_values() {
  $('.selectpicker').each(function() {
    var selectValue = $(this).attr('value');
    $(this).next().children('.btn').children('.filter-option').html(selectValue);
  });
}

function disable_datepickers() {
  $('.input-group-addon').each( function() {
    var disabled = $(this).parents('.input-group').children('.datepicker').attr('disabled');
    if (disabled === 'disabled') {
      $(this).parents('.input-group').children('.input-group-addon').css('pointer-events', 'none');
      $(this).parents('.input-group').children('.date').removeClass('datepicker picker__input');
    }
  });
}

function disable_timepickers() {
  $('.input-group-addon').each( function() {
    var disabled = $(this).parents('.input-group').children('.timepicker').attr('disabled');
    if (disabled === 'disabled') {
      $(this).parents('.input-group').children('.input-group-addon').css('pointer-events', 'none');
      $(this).parents('.input-group').children('.time').removeClass('timepicker picker__input');
    }
  });
}

function form_navbar() {
  $('.icon-map').addClass('hidden');
  $('.icon-form').removeClass('hidden');
  $('.left-bar-icons').addClass('hidden');
  $('#bookmark_nav li a').removeClass('hidden');
  $('.oval-text').removeClass('hidden');
  $('.map-icon').removeClass('hidden');
  $('.detail-icon').addClass('hidden');
}

function open_current_contact_row() {
  if ($(this).hasClass('row-open')) {
    $(this).removeClass('row-open');
    $(this).next('tr').remove();
  } else if (!$(this).hasClass('row-open')) {
    $(this).addClass('row-open');
    $(this).after("<tr class='reference-details'><td colspan='8'><span>Vivamus ut arcu" +
      "posuere, molestie quam et, rhoncus diam. Nunc suscipit porta urna, tincidunt" +
      "vehicula libero elementum sed. Aliquam vestibulum blandit tortor. Curabitur" +
      "dolor eget odio ultricies adipiscing et vel ante.</span></td></tr>");
  }
}

function history_qtip() {
  $(this).addClass('active');
  $(this).qtip({
      content: {
        text: $('#process-history'),
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
          classes: 'qtip-process-history qtip-rounded qtip-shadow qtip-light'
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
              $('#process-history').addClass('hidden');
              $('#history-select').removeClass('active');
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
  $('#process-history').removeClass('hidden');
}

function show_raise_qtip() {
  $(this).qtip({
      content: {
        text: $('#raise-buttons').clone(),
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
              $('.raise-buttons').removeClass('invisible');
          }
      },
      style: {
          classes: 'qtip-raise-buttons qtip-rounded qtip-shadow qtip-light',
          tip: {
            width: 25,
            height: 15,
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
          my: 'top left',
          at: 'bottom right',
          target: $(this)
      },
  });
  $('#raise-buttons').removeClass('invisible');
}

function warn_exit_form() {
  bootbox.dialog({
    message: "You are about to exit this form without saving. Save changes before leaving this form?",
    buttons: {
      success: {
        label: "Save",
        className: "btn-success",
        callback: function() {
          window.location = '/';
        }
      },
      main: {
        label: "Don't Save",
        className: "btn-danger",
        callback: function() {
          window.location = '/';
        }
      },
      danger: {
        label: "Cancel",
        className: "btn-primary",
        callback: function() {
          return false;
        }
      }
    }
  });
}

function show_saving_form() {
  bootbox.dialog({
    message: "<div class='spinner'><span class='mask'></span></div> Saving Changes...",
    className: 'save-modal',
    closeButton: false
  });
  setTimeout(close_save_form_dialog, 4000);
}

function alert_errors_form() {
  bootbox.dialog({
    message: "Sorry, there are errors on the page. Please fix the errors and save again.",
    className: 'errors-modal'
  });
}

function close_save_form_dialog() {
  $('.bootbox.modal.save-modal').modal('hide');
}

function table_search(thisObj, tableID) {
  var $rows = $("#"+tableID+" tr");
  var val = '^(?=.*\\b' + $.trim($(thisObj).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
      reg = RegExp(val, 'i'),
      text;

  $rows.show().filter(function() {
      text = $(this).text().replace(/\s+/g, ' ');
      return !reg.test(text);
  }).hide();
  $('thead tr').show();
}

function get_bubbles() {
  $('.row[data-oval-name]').each(function() {
    var ovalNameValue = this.dataset.ovalName;
    var ovalNameText = this.dataset.ovalName.replace(/([a-z])([A-Z])/g, '$1 $2');
    $('#bookmark-nav ul').last().append('<li><div class="oval" data-oval-name=' + ovalNameValue + '><span>' + ovalNameText + '</span></div></li>');
  });
  $('#bookmark-nav .oval[data-oval-name="Details"]').addClass('current');
}

function bubble_click() {
  var ovalName = $(this).data('oval-name');
  var href = ($('.row[data-oval-name='+ovalName+']'));
  var scrollAmount = ($(href).offset().top) - topOffset;
  $('html, body').animate({ scrollTop: scrollAmount }, 1000);
  update_current_bubble(ovalName);
}

function get_bookmark_positions() {
  $('.row[data-oval-name]').each(function() {
    position_array[$(this).attr('data-oval-name')] = $(this).offset().top;
    var top = $(window).scrollTop() + topOffset + 150;
    var current_bubble;
    var previous_value = 0;
    $.each( position_array, function( key, value ) {
      if ( value < top && top - previous_value > 250 ) {
        current_bubble = key;
        previous_value = value;
      }
    });
    update_current_bubble(current_bubble);
  });
}

function update_current_bubble(current_bubble) {
  if (typeof current_bubble === "undefined" ) {
    return;
  }
  else {
    var ovalNameValue = current_bubble.replace(/\s/g, '');
    $('#bookmark-nav .oval').removeClass('current');
    $('#bookmark-nav .oval[data-oval-name='+ovalNameValue+']').addClass('current');
  }
}

function skip_to_details() {
  var details = $('.row.first').offset().top;
  $(window).scrollTop((details - topOffset));
}

function check_this_panel_required(thisObj) {
  var thisPanel = $(thisObj);
  var required = false
  $(thisPanel).each(function() {
    $(this).find('.form-control').each(function() {
      if ($(this).attr('data-required')) {
        required = true
        }
      });
    });
  return required;
}

// datetimepicker
$('.insert-time-picker').datetimepicker({
  pickDate: false,
  language:'en'
});

//task form functions

$('td a span.glyphicon-play').on('click', highlight_current_task);
$('td a span.glyphicon-play.breaks').on('click', highlight_current_break);
$('.glyphicon-picture').on('click', show_task_map);
$('.member-timesheet-row').on('click', show_member_timesheet);

function highlight_current_break() {
  $('.breaks-row.current-break').removeClass('current-break');
  $(this).parents('.breaks-row').addClass('current-break');
}

function highlight_current_task() {
  $('.task-row.current-task').removeClass('current-task');
  $(this).parents('.task-row').addClass('current-task');
}

function show_task_map() {
  bootbox.confirm('<img class="temp-task-map" src="../../Content/images/OsmMap_Feature.PNG">', function (response) {});
}

function show_member_timesheet() {
  $('.member-timesheet-panel').toggleClass('hidden');
}

function goto_map() {
  map_navbar();
  $('#insert-left').empty();
  $('#insert-form').empty();
  $.get('MapLayer.html', function(data) {
    $('#insert-map').html(data);
    });
  close_current_qtip();
}

function map_navbar() {
  $('.icon-map').removeClass('hidden');
  $('.icon-form').addClass('hidden');
  $('#bookmark_nav li a').addClass('hidden');
  $('.oval-text').addClass('hidden');
  $('.detail-icon').removeClass('hidden');
  $('.map-icon').addClass('hidden');
}