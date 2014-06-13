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