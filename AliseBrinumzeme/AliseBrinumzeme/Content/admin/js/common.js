$(function () {
    $(document).on('click', '.dataTable .confirm', function (e) {
        e.preventDefault();
        var href = $(this)[0];
        var msg = $(this).attr('data-msg');
        bootbox.confirm(msg, function (r) {
            if (r) {
                window.location = href;
            }
        });
    });

    //Simple section list
    $('.table-section-list').dataTable({
        'bDeferRender': true,
        'bProcessing': true,
        'sAjaxSource': '/admin/section/list',
        'sAjaxDataProp': '',
        "aaSorting": [],
        'oLanguage': {
            "sProcessing": "Please wait...",
            "sLengthMenu": "Show _MENU_ records",
            "sZeroRecords": "No records found",
            "sInfo": "Showing _START_ to _END_  fromt total _TOTAL_ ierakstiem",
            "sInfoEmpty": "Nav ierakstu",
            "sInfoFiltered": "(filtered from _MAX_ records)",
            "sInfoPostFix": "",
            "sSearch": "Search:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "First",
                "sPrevious": "Previous",
                "sNext": "Next",
                "sLast": "Last"
            }
        },
        'aoColumns': [
            {
                'mData': 'SectionTitle',
                'sTitle': 'Section Title'
            },
            {
                'mData': 'Date',
                'sTitle': 'Date Modified'
            },
            {
                'mData': 'ID',
                'sWidth': '87px',
                'mRender': function (data, type, full) {
                    return '<a class="confirm" href="/admin/section/delete/' + data + '" data-msg="Are you sure you want to delete this Section?"><button class="btn btn-mini btn-danger">Delete</button></a> ' + '<a href="/admin/section/edit/' + data + '"><button class="btn btn-mini btn-primary">Edit</button></a>';
                },
                'bSortable': false
            }]
    });
    
    //Simple image list
    $('.table-image-list').dataTable({
        'bDeferRender': true,
        'bProcessing': true,
        'sAjaxSource': '/admin/image/list',
        'sAjaxDataProp': '',
        "aaSorting": [],
        'oLanguage': {
            "sProcessing": "Please wait...",
            "sLengthMenu": "Show _MENU_ records",
            "sZeroRecords": "No records found",
            "sInfo": "Showing _START_ to _END_  fromt total _TOTAL_ ierakstiem",
            "sInfoEmpty": "Nav ierakstu",
            "sInfoFiltered": "(filtered from _MAX_ records)",
            "sInfoPostFix": "",
            "sSearch": "Search:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "First",
                "sPrevious": "Previous",
                "sNext": "Next",
                "sLast": "Last"
            }
        },
        'aoColumns': [
            {
                'mData': 'ImageTitle',
                'sTitle': 'Image Title'
            },
            {
                'mData': 'Date',
                'sTitle': 'Date Created'
            },
            {
                'mData': 'ID',
                'sWidth': '87px',
                'mRender': function (data, type, full) {
                    return '<a class="confirm" href="/admin/image/delete/' + data + '" data-msg="Are you sure you want to delete this Image?"><button class="btn btn-mini btn-danger">Delete</button></a> ' + '<a href="/admin/image/edit/' + data + '"><button class="btn btn-mini btn-primary">Edit</button></a>';
                },
                'bSortable': false
            }]
    });
});