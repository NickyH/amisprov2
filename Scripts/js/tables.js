// cr tables
// contact reference table
$('#contact-reference-table').dataTable({
  "columns": [
    {
      "class": "remove-sort",
      "orderable": false,
      "defaultContent": ""
    },
    { "class": "text" },
    { "class": "text" },
    { "class": "text" },
    {
      "class": "text",
      "sSortDataType": "dom-data-order",
      "sType": "numeric"
     },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    }
  ]
});

// notes reference table cr
$('#note-reference-table').dataTable({
  "columns": [
    { "class": "remove-sort details-control" },
    { "class": "text" },
    { "class": "text" },
    { "class": "text" },
    { "class": "text" },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    }
  ]
});

// inspection tables
// contact reference table
$('#contact-reference-table2').dataTable({
  "columns": [
    {
      "class": "remove-sort",
      "orderable": false,
      "defaultContent": ""
    },
    { "class": "text" },
    { "class": "text" },
    { "class": "text" },
    {
      "class": "text",
      "sSortDataType": "dom-data-order",
      "sType": "numeric"
    },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    }
  ]
});

// notes reference table
$('#note-reference-table2').dataTable({
  "columns": [
    { "class": "text" },
    { "class": "text" },
    { "class": "text" },
    {
      "class": "text",
      "sSortDataType": "dom-data-order",
      "sType": "numeric"
    },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    }
  ]
});

// defect tables
// notes reference table
$('#note-reference-table3').dataTable({
  "columns": [
    { "class": "text" },
    { "class": "text" },
    { "class": "text" },
    {
      "class": "text",
      "sSortDataType": "dom-data-order",
      "sType": "numeric"
    },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    }
  ]
});


//timesheet tables

// start equipment
$('#timesheet-start-equipment-table').dataTable({
  paging: false,
  "columns": [
    { "class": "remove-sort details-control" },
    { "class": "text" },
    { "class": "text" },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    }
  ]
});

//start members
$('#timesheet-start-member-table').dataTable({
  paging: false,
  "columns": [
    { "class": "remove-sort details-control" },
    { "class": "text" },
    { "class": "text" },
    { "class": "text" },
    {
      "class": "remove-sort",
      "orderable": false
    }
  ]
});

//prestart checklist
$('#timesheet-checklist-table').dataTable({
  paging: false,
  "columns": [
    { "class": "remove-sort details-control" },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    }
  ]
});

//worklist
$('#timesheet-worklist-table').dataTable({
  paging: false,
  "columns": [
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    }
  ]
});

//edit task
$('#timesheet-edit-task-table').dataTable({
  paging: false,
  "columns": [
    { "class": "remove-sort details-control" },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    }
  ]
});

//breaks
$('#timesheet-breaks-table').dataTable({
  paging: false,
  "columns": [
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    }
  ]
});

// end equipment
$('#timesheet-end-equipment-table').dataTable({
  paging: false,
  "columns": [
    { "class": "remove-sort details-control" },
    { "class": "text" },
    { "class": "text" },
    {
      "class": "remove-sort",
      "orderable": false
    },
    {
      "class": "remove-sort",
      "orderable": false
    }
  ]
});

//end members
$('#timesheet-end-member-table').dataTable({
  paging: false,
  "columns": [
    { "class": "remove-sort details-control" },
    { "class": "text" },
    { "class": "text" },
    { "class": "text" },
    {
      "class": "remove-sort",
      "orderable": false
    }
  ]
});