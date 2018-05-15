// DataTables
function getDate(date) {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var date = new Date(date);
    var year = date.getFullYear();
    var month = (date.getMonth()).toString();
    //month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return months[month] + ' ' + day + ', ' + year;
}
var BaseTableDatatables = function() {
    // Init full DataTable, for more examples you can check out https://www.datatables.net/
    var initDataTableFull = function() {
        jQuery('.js-dataTable-full').dataTable({
            columnDefs: [ { orderable: false, targets: [ 2 ] } ],
            pageLength: 10,
            lengthMenu: [[5, 10, 15, 20], [5, 10, 15, 20]]
        });
    };

    // Init full extra DataTable, for more examples you can check out https://www.datatables.net/
    var initDataTableFullPagination = function() {
        jQuery('.js-dataTable-full-pagination').dataTable({
            pagingType: "full_numbers",
            columnDefs: [ { orderable: false, targets: [ 2 ] } ],
            pageLength: 20,
            bSort: false,
            lengthMenu: [[5, 10, 15, 20], [5, 10, 15, 20]]
        });
    };

    var initDataTableCampaigns = function() {
        $('.ajax-table-campaigns').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "{{ route('campaigns.get_campaignlist') }}",
        "columns" :[
            { data: "c_campaign_name", name: "c_campaign_name" },
            { data: "c_id", name: "c_id" },
            { data: "c_id", name: "c_id" },
        ]
        });
    }

    // Init simple DataTable, for more examples you can check out https://www.datatables.net/
    var initDataTableSimple = function() {
        jQuery('.js-dataTable-simple').dataTable({
            columnDefs: [ { orderable: false, targets: [ 2 ] } ],
            pageLength: 10,
            lengthMenu: [[5, 10, 15, 20], [5, 10, 15, 20]],
            searching: false,
            oLanguage: {
                sLengthMenu: ""
            },
            dom:
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-6'i><'col-sm-6'p>>"
        });
    };

    // DataTables Bootstrap integration
    var bsDataTables = function() {
        var $DataTable = jQuery.fn.dataTable;
        // Set the defaults for DataTables init
        jQuery.extend( true, $DataTable.defaults, {
            dom:
                "<'row'<'col-sm-6'l><'col-sm-6'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-6'i><'col-sm-6'p>>",
            renderer: 'bootstrap',
            oLanguage: {
                sLengthMenu: "_MENU_",
                sInfo: "Showing <strong>_START_</strong>-<strong>_END_</strong> of <strong>_TOTAL_</strong>",
                oPaginate: {
                    sPrevious: '<i class="fa fa-angle-left"></i>',
                    sNext: '<i class="fa fa-angle-right"></i>'
                }
            }
        });

        // Default class modification
        jQuery.extend($DataTable.ext.classes, {
            sWrapper: "dataTables_wrapper form-inline dt-bootstrap",
            sFilterInput: "form-control",
            sLengthSelect: "form-control"
        });

        // Bootstrap paging button renderer
        $DataTable.ext.renderer.pageButton.bootstrap = function (settings, host, idx, buttons, page, pages) {
            var api     = new $DataTable.Api(settings);
            var classes = settings.oClasses;
            var lang    = settings.oLanguage.oPaginate;
            var btnDisplay, btnClass;

            var attach = function (container, buttons) {
                var i, ien, node, button;
                var clickHandler = function (e) {
                    e.preventDefault();
                    if (!jQuery(e.currentTarget).hasClass('disabled')) {
                        api.page(e.data.action).draw(false);
                    }
                };

                for (i = 0, ien = buttons.length; i < ien; i++) {
                    button = buttons[i];

                    if (jQuery.isArray(button)) {
                        attach(container, button);
                    }
                    else {
                        btnDisplay = '';
                        btnClass = '';

                        switch (button) {
                            case 'ellipsis':
                                btnDisplay = '&hellip;';
                                btnClass = 'disabled';
                                break;

                            case 'first':
                                btnDisplay = lang.sFirst;
                                btnClass = button + (page > 0 ? '' : ' disabled');
                                break;

                            case 'previous':
                                btnDisplay = lang.sPrevious;
                                btnClass = button + (page > 0 ? '' : ' disabled');
                                break;

                            case 'next':
                                btnDisplay = lang.sNext;
                                btnClass = button + (page < pages - 1 ? '' : ' disabled');
                                break;

                            case 'last':
                                btnDisplay = lang.sLast;
                                btnClass = button + (page < pages - 1 ? '' : ' disabled');
                                break;

                            default:
                                btnDisplay = button + 1;
                                btnClass = page === button ?
                                        'active' : '';
                                break;
                        }

                        if (btnDisplay) {
                            node = jQuery('<li>', {
                                'class': classes.sPageButton + ' ' + btnClass,
                                'aria-controls': settings.sTableId,
                                'tabindex': settings.iTabIndex,
                                'id': idx === 0 && typeof button === 'string' ?
                                        settings.sTableId + '_' + button :
                                        null
                            })
                            .append(jQuery('<a>', {
                                    'href': '#'
                                })
                                .html(btnDisplay)
                            )
                            .appendTo(container);

                            settings.oApi._fnBindAction(
                                node, {action: button}, clickHandler
                            );
                        }
                    }
                }
            };

            attach(
                jQuery(host).empty().html('<ul class="pagination"/>').children('ul'),
                buttons
            );
        };

        // TableTools Bootstrap compatibility - Required TableTools 2.1+
        if ($DataTable.TableTools) {
            // Set the classes that TableTools uses to something suitable for Bootstrap
            jQuery.extend(true, $DataTable.TableTools.classes, {
                "container": "DTTT btn-group",
                "buttons": {
                    "normal": "btn btn-default",
                    "disabled": "disabled"
                },
                "collection": {
                    "container": "DTTT_dropdown dropdown-menu",
                    "buttons": {
                        "normal": "",
                        "disabled": "disabled"
                    }
                },
                "print": {
                    "info": "DTTT_print_info"
                },
                "select": {
                    "row": "active"
                }
            });

            // Have the collection use a bootstrap compatible drop down
            jQuery.extend(true, $DataTable.TableTools.DEFAULTS.oTags, {
                "collection": {
                    "container": "ul",
                    "button": "li",
                    "liner": "a"
                }
            });
        }
    };

    return {
        init: function() {
            // Init Datatables
            bsDataTables();
            initDataTableSimple();
            initDataTableFull();
            initDataTableFullPagination();
            initDataTableCampaigns();
        }
    };
}();

// Initialize when page loads
jQuery(function(){ BaseTableDatatables.init(); });