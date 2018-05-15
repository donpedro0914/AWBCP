/*
 *  Document   : base_forms_validation.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Form Validation Page
 */

var BaseFormValidation = function() {
    // Init Bootstrap Forms Validation, for more examples you can check out https://github.com/jzaefferer/jquery-validation
    var initValidationBootstrap = function(){
        jQuery('.js-validation-bootstrap').validate({
            ignore: [],
            errorClass: 'help-block animated fadeInDown',
            errorElement: 'div',
            errorPlacement: function(error, e) {
                jQuery(e).parents('.form-group > div').append(error);
            },
            highlight: function(e) {
                var elem = jQuery(e);

                elem.closest('.form-group').removeClass('has-error').addClass('has-error');
                elem.closest('.help-block').remove();
            },
            success: function(e) {
                var elem = jQuery(e);

                elem.closest('.form-group').removeClass('has-error');
                elem.closest('.help-block').remove();
            },
            rules: {
                'date_of_survey': {
                    required: true
                },
                'name_of_operative': {
                    required: true
                },
                'full_name_customer': {
                    required: true
                },
                'phone': {
                    required: true
                },
                'email': {
                    required: true
                },
                'dob': {
                    required: true
                },
                'address_install': {
                    required: true
                },
                'age_property': {
                    required: true
                },
                'post_code': {
                    required: true
                },
                'customer_type': {
                    required: true
                },
                'property_type': {
                    required: true
                },
                'bedrooms': {
                    required: true
                },
                'heating_source': {
                    required: true
                },
                'construction_type': {
                    required: true
                },
                'existing_heating': {
                    required: true
                },
                'radiators': {
                    required: true
                },
                'trv': {
                    required: true
                },
                'esh_assessment': {
                    required: true
                },
                'esh_premises': {
                    required: true
                },
                'esh_replace': {
                    required: true
                },
                'electricity_tarrif': {
                    required: true
                },
                'tenure': {
                    required: true
                },
                'date_installed': {
                    required: true
                },
                'date_handover': {
                    required: true
                },
                'pomi': {
                    required: true
                },
                'popt': {
                    required: true
                },
                'name_of_assesor': {
                    required: true
                },
                'material': {
                    required: true
                },
                'bba': {
                    required: true
                }
            },
            messages: {
                'name_of_operative': {
                    required: 'Please enter the name of operative'
                },
                'date_of_survey': {
                    required: 'Please enter the date of survey'
                },
                'full_name_customer': {
                    required: 'Please enter the full name of customer'
                },
                'phone': {
                    required: 'Please enter valid phone number'
                },
                'email': {
                    required: 'Please enter valid email address'
                },
                'dob': {
                    required: 'Please enter date of birth'
                },
                'address_install': {
                    required: 'Please enter address of install'
                },
                'age_property': {
                    required: 'Please enter age of property'
                },
                'post_code': {
                    required: 'Please enter post code'
                },
                'customer_type': {
                    required: 'Please choose customer type'
                },
                'property_type': {
                    required: 'Please select property type'
                },
                'bedrooms': {
                    required: 'Please enter number of bedrooms'
                },
                'heating_source': {
                    required: 'Please select your pre-main heating source'
                },
                'construction_type': {
                    required: 'Please choose main wall construction type'
                },
                'existing_heating': {
                    required: 'Please choose your pre existing heating controls'
                },
                'radiators': {
                    required: 'Please enter number of radiators'
                },
                'trv': {
                    required: 'Please enter number of trv'
                },
                'esh_assessment': {
                    required: 'Please enter date of esh assessment'
                },
                'esh_premises': {
                    required: 'Please select total number of esh in the premises'
                },
                'esh_replace': {
                    required: 'Please select total number of esh being replaced'
                },
                'electricity_tarrif': {
                    required: 'Please choose electricity tarrif'
                },
                'tenure': {
                    required: 'Please choose tenure'
                },
                'date_installed': {
                    required: 'Please enter date of install'
                },
                'date_handover': {
                    required: 'Please enter date of handover'
                },
                'pomi': {
                    required: 'Please enter the percentage of measure installed'
                },
                'popt': {
                    required: 'Please enter the percentage of property treated'
                },
                'name_of_assesor': {
                    required: 'Please enter the name of assesor'
                },
                'material': {
                    required: 'Please enter the name of material used'
                },
                'bba': {
                    required: 'Please enter the material bba code'
                }
            }
        });
    };

    var initValidationBootstrapCavity = function(){
        jQuery('.cavity-validation').validate({
            ignore: [],
            errorClass: 'help-block animated fadeInDown',
            errorElement: 'div',
            errorPlacement: function(error, e) {
                jQuery(e).parents('.form-group > div').append(error);
            },
            highlight: function(e) {
                var elem = jQuery(e);

                elem.closest('.form-group').removeClass('has-error').addClass('has-error');
                elem.closest('.help-block').remove();
            },
            success: function(e) {
                var elem = jQuery(e);

                elem.closest('.form-group').removeClass('has-error');
                elem.closest('.help-block').remove();
            },
            rules: {
                'date_of_survey': {
                    required: true
                },
                'name_of_operative': {
                    required: true
                },
                'full_name_customer': {
                    required: true
                },
                'phone': {
                    required: true
                },
                'email': {
                    required: true
                },
                'dob': {
                    required: true
                },
                'address_install': {
                    required: true
                },
                'post_code': {
                    required: true
                },
                'customer_type': {
                    required: true
                },
                'property_type': {
                    required: true
                },
                'bedrooms': {
                    required: true
                },
                'heating_source': {
                    required: true
                },
                'construction_type': {
                    required: true
                },
                'electricity_tarrif': {
                    required: true
                },
                'tenure': {
                    required: true
                },
                'date_installed': {
                    required: true
                },
                'date_handover': {
                    required: true
                },
                'pomi': {
                    required: true
                },
                'popt': {
                    required: true
                },
                'name_of_assesor': {
                    required: true
                },
                'material': {
                    required: true
                },
                'bba': {
                    required: true
                }
            },
            messages: {
                'date_of_survey': {
                    required: 'Please enter the date of survey'
                },
                'name_of_operative': {
                    required: 'Please enter the name of operative'
                },
                'full_name_customer': {
                    required: 'Please enter the full name of customer'
                },
                'phone': {
                    required: 'Please enter valid phone number'
                },
                'email': {
                    required: 'Please enter valid email address'
                },
                'dob': {
                    required: 'Please enter date of birth'
                },
                'address_install': {
                    required: 'Please enter address of install'
                },
                'post_code': {
                    required: 'Please enter post code'
                },
                'customer_type': {
                    required: 'Please choose customer type'
                },
                'property_type': {
                    required: 'Please select property type'
                },
                'bedrooms': {
                    required: 'Please enter number of bedrooms'
                },
                'heating_source': {
                    required: 'Please select your pre-main heating source'
                },
                'construction_type': {
                    required: 'Please choose main wall construction type'
                },
                'electricity_tarrif': {
                    required: 'Please choose electricity tarrif'
                },
                'tenure': {
                    required: 'Please choose tenure'
                },
                'date_installed': {
                    required: 'Please enter date of install'
                },
                'date_handover': {
                    required: 'Please enter date of handover'
                },
                'pomi': {
                    required: 'Please enter the percentage of measure installed'
                },
                'popt': {
                    required: 'Please enter the percentage of property treated'
                },
                'name_of_assesor': {
                    required: 'Please enter the name of assesor'
                },
                'material': {
                    required: 'Please enter the name of material used'
                },
                'bba': {
                    required: 'Please enter the material bba code'
                }
            }
        });
    };

    var initValidationBootstrapBoiler = function(){
        jQuery('.boiler-validation').validate({
            ignore: [],
            errorClass: 'help-block animated fadeInDown',
            errorElement: 'div',
            errorPlacement: function(error, e) {
                jQuery(e).parents('.form-group > div').append(error);
            },
            highlight: function(e) {
                var elem = jQuery(e);

                elem.closest('.form-group').removeClass('has-error').addClass('has-error');
                elem.closest('.help-block').remove();
            },
            success: function(e) {
                var elem = jQuery(e);

                elem.closest('.form-group').removeClass('has-error');
                elem.closest('.help-block').remove();
            },
            rules: {
                'date_of_survey': {
                    required: true
                },
                'name_of_operative': {
                    required: true
                },
                'full_name_customer': {
                    required: true
                },
                'phone': {
                    required: true
                },
                'email': {
                    required: true
                },
                'dob': {
                    required: true
                },
                'address_install': {
                    required: true
                },
                'post_code': {
                    required: true
                },
                'customer_type': {
                    required: true
                },
                'property_type': {
                    required: true
                },
                'bedrooms': {
                    required: true
                },
                'heating_source': {
                    required: true
                },
                'construction_type': {
                    required: true
                },
                'electricity_tarrif': {
                    required: true
                },
                'tenure': {
                    required: true
                },
                'date_installed': {
                    required: true
                },
                'date_handover': {
                    required: true
                },
                'pomi': {
                    required: true
                },
                'popt': {
                    required: true
                },
                'name_of_assesor': {
                    required: true
                },
                'material': {
                    required: true
                },
                'bba': {
                    required: true
                }
            },
            messages: {
                'date_of_survey': {
                    required: 'Please enter the date of survey'
                },
                'name_of_operative': {
                    required: 'Please enter the name of operative'
                },
                'full_name_customer': {
                    required: 'Please enter the full name of customer'
                },
                'phone': {
                    required: 'Please enter valid phone number'
                },
                'email': {
                    required: 'Please enter valid email address'
                },
                'dob': {
                    required: 'Please enter date of birth'
                },
                'address_install': {
                    required: 'Please enter address of install'
                },
                'post_code': {
                    required: 'Please enter post code'
                },
                'customer_type': {
                    required: 'Please choose customer type'
                },
                'property_type': {
                    required: 'Please select property type'
                },
                'bedrooms': {
                    required: 'Please enter number of bedrooms'
                },
                'heating_source': {
                    required: 'Please select your pre-main heating source'
                },
                'construction_type': {
                    required: 'Please choose main wall construction type'
                },
                'electricity_tarrif': {
                    required: 'Please choose electricity tarrif'
                },
                'tenure': {
                    required: 'Please choose tenure'
                },
                'date_installed': {
                    required: 'Please enter date of install'
                },
                'date_handover': {
                    required: 'Please enter date of handover'
                },
                'pomi': {
                    required: 'Please enter the percentage of measure installed'
                },
                'popt': {
                    required: 'Please enter the percentage of property treated'
                },
                'name_of_assesor': {
                    required: 'Please enter the name of assesor'
                },
                'material': {
                    required: 'Please enter the name of material used'
                },
                'bba': {
                    required: 'Please enter the material bba code'
                }
            }
        });
    };

    // Init Material Forms Validation, for more examples you can check out https://github.com/jzaefferer/jquery-validation
    var initValidationMaterial = function(){
        jQuery('.js-validation-material').validate({
            ignore: [],
            errorClass: 'help-block text-right animated fadeInDown',
            errorElement: 'div',
            errorPlacement: function(error, e) {
                jQuery(e).parents('.form-group > div').append(error);
            },
            highlight: function(e) {
                var elem = jQuery(e);

                elem.closest('.form-group').removeClass('has-error').addClass('has-error');
                elem.closest('.help-block').remove();
            },
            success: function(e) {
                var elem = jQuery(e);

                elem.closest('.form-group').removeClass('has-error');
                elem.closest('.help-block').remove();
            },
            rules: {
                'val-username2': {
                    required: true,
                    minlength: 3
                },
                'val-email2': {
                    required: true,
                    
                },
                'val-password2': {
                    required: true,
                    minlength: 5
                },
                'val-confirm-password2': {
                    required: true,
                    equalTo: '#val-password2'
                },
                'val-select22': {
                    required: true
                },
                'val-select2-multiple2': {
                    required: true,
                    minlength: 2
                },
                'val-suggestions2': {
                    required: true,
                    minlength: 5
                },
                'val-skill2': {
                    required: true
                },
                'val-currency2': {
                    required: true,
                    currency: ['$', true]
                },
                'val-website2': {
                    required: true,
                    url: true
                },
                'val-phoneus2': {
                    required: true,
                    phoneUS: true
                },
                'val-digits2': {
                    required: true,
                    digits: true
                },
                'val-number2': {
                    required: true,
                    number: true
                },
                'val-range2': {
                    required: true,
                    range: [1, 5]
                },
                'val-terms2': {
                    required: true
                }
            },
            messages: {
                'val-username2': {
                    required: 'Please enter a username',
                    minlength: 'Your username must consist of at least 3 characters'
                },
                'val-email2': 'Please enter a valid email address',
                'val-password2': {
                    required: 'Please provide a password',
                    minlength: 'Your password must be at least 5 characters long'
                },
                'val-confirm-password2': {
                    required: 'Please provide a password',
                    minlength: 'Your password must be at least 5 characters long',
                    equalTo: 'Please enter the same password as above'
                },
                'val-select22': 'Please select a value!',
                'val-select2-multiple2': 'Please select at least 2 values!',
                'val-suggestions2': 'What can we do to become better?',
                'val-skill2': 'Please select a skill!',
                'val-currency2': 'Please enter a price!',
                'val-website2': 'Please enter your website!',
                'val-phoneus2': 'Please enter a US phone!',
                'val-digits2': 'Please enter only digits!',
                'val-number2': 'Please enter a number!',
                'val-range2': 'Please enter a number between 1 and 5!',
                'val-terms2': 'You must agree to the service terms!'
            }
        });
    };

    return {
        init: function () {
            // Init Bootstrap Forms Validation
            initValidationBootstrap();
            initValidationBootstrapCavity();
            initValidationBootstrapBoiler();

            // Init Material Forms Validation
            // initValidationMaterial();

            // Init Validation on Select2 change
            jQuery('.js-select2').on('change', function(){
                jQuery(this).valid();
            });
        }
    };
}();

// Initialize when page loads
jQuery(function(){ BaseFormValidation.init(); });
