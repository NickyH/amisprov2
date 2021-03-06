var topOffset = 140;
var position_array = {}

change_selectpicker_values();
disable_datepickers();
disable_timepickers();
$('.datepicker').pickadate();

$( '.form-horizontal .container' ).parsley( 'validate');
$('.selectpicker').selectpicker({ size: 5 });
$('table.row-children tbody tr').on('click', open_current_contact_row);
$('.form-button.save').on('click', show_saving_form); // use this when user saves form and form is saving
$('.form-button.cancel').on('click', warn_exit_form); // use this when user exits form without saving
// $('.form-button.save').on('click', alert_errors_form); // use this when user presses save but there are errors on form
$('.input-group-addon .glyphicon-calendar').on('click', calendar_icon_click); //activate calendar on icon click
$('.input-group-addon .glyphicon-time').on('click', clock_icon_click); //activate timepicker on icon click
$('.icon-raise').on('click', show_raise_qtip);
$('.filename-delete').on('click', delete_selected_file);
$('.form-container').on('DOMMouseScroll mousewheel', get_bookmark_positions);
$('.form-container').bind('swipemove', get_bookmark_positions);

$('#contact-reference-table .glyphicon-edit').on('click', show_edit_contact_qtip);
$('#cr-new-contact').on('click', show_edit_contact_qtip);


function calendar_icon_click() {
  $(this).parent().parent().children('input').trigger('click');
}

function toggle_top_bar() {
  if ($(this).hasClass('top-bar-is-down')) {
    top_bar_slide_up();
    $('.form-buttons').addClass('top');
  }
  else if ($(this).hasClass('top-bar-is-up')) {
    top_bar_slide_down();
    $('.form-buttons').removeClass('top');
  }
  $(this).toggleClass('top-bar-is-up').toggleClass('top-bar-is-down');
}

function unhide_top_toggle() {
  $('#insert-top-toggle').removeClass('hidden');
}

function hide_top_toggle() {
  $('#insert-top-toggle').addClass('hidden');
}

function top_bar_slide_up() {
  $('#insert-top').hide();
  $('.left-nav').addClass('up');
}

function top_bar_slide_down() {
  $('#insert-top').show();
  $('.left-nav').removeClass('up');
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
    $(this).after("<tr class='reference-details'><td colspan='8'><span>Show Notes Description " +
      "here, and show any attachments included in note.</span></td></tr>");
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
        target: $(this)
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
          my: 'top right',
          at: 'bottom left',
          target: $(this)
      },
  });
  $('#raise-buttons').removeClass('invisible');
}

function show_edit_contact_qtip() {
  $(this).qtip({
      content: {
        text: $('#cr-contact-history-edit'),
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
          classes: 'qtip-cr-edit-contact qtip-rounded qtip-shadow qtip-light'
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
              $('#cr-contact-history-edit').addClass('invisible');
          }
      },
      overwrite: false,
      position: {
          my: 'center',
          at: 'center',
          target: $(this)
      },
  });
  $('#cr-contact-history-edit').removeClass('invisible');
}

function open_edit_task_qtip() {
  $(this).qtip({
      content: {
        text: $('#timesheet-edit-task-content').clone(),
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
          classes: 'qtip-timesheet-edit-task qtip-rounded qtip-shadow qtip-light'
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
              $('#timesheet-edit-task-content').addClass('invisible');
          }
      },
      overwrite: false,
      position: {
          my: 'center',
          at: 'center',
          target: $(window)
      },
  });
  $('#timesheet-edit-task-content').removeClass('invisible');
}

function open_add_item_qtip() {
  $(this).qtip({
      content: {
        text: $('#timesheet-add-item-content').clone(),
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
          classes: 'qtip-timesheet-add-item qtip-rounded qtip-shadow qtip-light'
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
              $('#timesheet-add-item-content').addClass('invisible');
          }
      },
      overwrite: false,
      position: {
          my: 'center',
          at: 'center',
          target: $(window)
      },
  });
  $('#timesheet-add-item-content').removeClass('invisible');
}

function open_add_new_break_qtip() {
  $(this).qtip({
      content: {
        text: $('#timesheet-add-new-break-content').clone(),
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
          classes: 'qtip-timesheet-add-new-break qtip-rounded qtip-shadow qtip-light'
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
              $('#timesheet-add-new-break-content').addClass('invisible');
          }
      },
      overwrite: false,
      position: {
          my: 'center',
          at: 'center',
          target: $(window)
      },
  });
  $('#timesheet-add-new-break-content').removeClass('invisible');
}

function open_review_task_qtip() {
  $(this).qtip({
      content: {
        text: $('#timesheet-review-task-content').clone(),
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
          classes: 'qtip-timesheet-review-task qtip-rounded qtip-shadow qtip-light'
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
              $('#timesheet-review-task-content').addClass('invisible');
          }
      },
      overwrite: false,
      position: {
          my: 'center',
          at: 'center',
          target: $(this)
      },
  });
  $('#timesheet-review-task-content').removeClass('invisible');
}

function open_review_member_qtip() {
  $(this).qtip({
      content: {
        text: $('#timesheet-review-member-content').clone(),
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
        classes: 'qtip-timesheet-review-member qtip-rounded qtip-shadow qtip-light'
      },
      hide: {
        event: 'click',
        effect: function () {
          $(this).slideUp(300);
          $('#timesheet-review-member-content').addClass('invisible');
        }
      },
      overwrite: false,
      position: {
        my: 'center',
        at: 'center',
        target: $(this)
      },
  });
  $('#timesheet-review-member-content').removeClass('invisible');
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
  hide_top_toggle();
}

function map_navbar() {
  $('.icon-map').removeClass('hidden');
  $('.icon-form').addClass('hidden');
  $('#bookmark_nav li a').addClass('hidden');
  $('.oval-text').addClass('hidden');
  $('.detail-icon').removeClass('hidden');
  $('.map-icon').addClass('hidden');
}