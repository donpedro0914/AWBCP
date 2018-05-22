$(document).ready(function(){

	App.initHelper('datepicker');
	App.initHelper('tags-inputs');
  App.initHelper('appear-countTo');
  App.initHelper('slimscroll');
  $('.jsselect2').select2();

	var baseurl=window.location.protocol + "//" + window.location.host + "/"; 
	
	toastr.options = {
    "closeButton": true,
    "debug": true,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-center",
    "preventDuplicates": true,
    "showDuration": "300",
    "hideDuration": "800",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  //Position Functions
  $(".alljobfilescheck").change(function(){
      if ($(this).is(':checked') || $('.alljobfilescheck').is(':checked')) {
          $('.alljobfiles').prop('checked', true).attr("disabled","disabled");
      }else{
          $('.alljobfiles').removeAttr("disabled");
      }
  });
  $(".ownjobfilescheck").change(function(){
      if ($(this).is(':checked') || $('.ownjobfilescheck').is(':checked')) {
          $('.ownjobfiles').prop('checked', true).attr("disabled","disabled");
      }else{
          $('.ownjobfiles').removeAttr("disabled");
      }
  });
  $(".campaignmeasurecheck").change(function(){
      if ($(this).is(':checked') || $('.campaignmeasurecheck').is(':checked')) {
          $('.campaignmeasure').prop('checked', true).attr("disabled","disabled");
      }else{
          $('.campaignmeasure').removeAttr("disabled");
      }
  });
  $(".staffcheck").change(function(){
      if ($(this).is(':checked') || $('.staffcheck').is(':checked')) {
          $('.staff').prop('checked', true).attr("disabled","disabled");
      }else{
          $('.staff').removeAttr("disabled");
      }
  });
  $("#checkall").click(function(){
    $('input:checkbox').not(this).prop('checked', this.checked);
    if($(this).is(":checked")){
        $('.alljobfiles', '.ownjobfiles', '.campaignmeasure', '.staff').prop('checked', true).attr("disabled","disabled");
    }else{
        $('.alljobfiles', '.ownjobfiles', '.campaignmeasure', '.staff').removeAttr("disabled");
    }
  });

  //PCDB
  $('#pcdb_select').on('change', function() {
    var pcdb = $('#pcdb_select').val();

    if(pcdb == 'No') {
      $('#pcdb_fields').hide();
    } else {
      $('#pcdb_fields').show();
    }
  });

  //Delete Attachment
  $('.filesli').on('click', '.deletefiles', function(e){

   $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    e.preventDefault();
    var image = $(this).attr('data-id');
    var slug = $('#lead_slug').val();
    if(confirm('Are you sure you want to delete this attachment?')) {
      $.ajax({
        url: baseurl + 'job_files/deleteattachment',
        type: "POST",
        data: {'filename':image, 'lead_slug':slug},
        success: function(data) {
          setTimeout(function() {
            toastr["success"]('Attachment has been deleted.', 'Success');
            $('.ql1').load(document.URL + ' .ql1');
          },500);
        }
      });
    }
  });

  $('.filesli').on('click', '.deletefiles2', function(e){

   $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    e.preventDefault();
    var image = $(this).attr('data-id');
    var slug = $('#lead_slug').val();
    if(confirm('Are you sure you want to delete this attachment?')) {
      $.ajax({
        url: baseurl + 'job_files/deleteattachment2',
        type: "POST",
        data: {'filename':image, 'lead_slug':slug},
        success: function(data) {
          setTimeout(function() {
            toastr["success"]('Attachment has been deleted.', 'Success');
            $('.ql2').load(document.URL + ' .ql2');
          },500);
        }
      });
    }
  });

  $('.filesli').on('click', '.energycompany', function(e){

   $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    e.preventDefault();
    var image = $(this).attr('data-id');
    var slug = $('#lead_slug').val();
    if(confirm('Are you sure you want to delete this attachment?')) {
      $.ajax({
        url: baseurl + 'job_files/energycompany',
        type: "POST",
        data: {'filename':image, 'lead_slug':slug},
        success: function(data) {
          setTimeout(function() {
            toastr["success"]('Attachment has been deleted.', 'Success');
            $('.energycomplist').load(document.URL + ' .energycomplist');
          },500);
        }
      });
    }
  });

  //Delete Note
  $('.notes.well').on('click', '.deleteleadcomment', function(e) {

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    e.preventDefault();
    var comment = $(this).attr('data-content');
    if(confirm('Are you sure you want to delete this note?')) {
      $.ajax({
        url: baseurl + 'job_files/deletecomment',
        type: "POST",
        data: {'lead_note':comment, 'lead_slug': $('#lead_slug').val()},
        success: function(data) {
          setTimeout(function() {
            toastr["success"]('Notes has been deleted.', 'Success');
            $('.notes.well').load(document.URL + ' .notes.well');
          },500);
        }
      });
    }
  });

  //Delete Function
  setTimeout(function(){
    $('.dataTable tbody').on('click',".js-swal-confirm", function(e){

      $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover this information!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d26a5c',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: "Cancel",
          closeOnConfirm: false,
          closeOnCancel: true
      },
      function(isConfirm) {
        if(isConfirm) {
          var id = $(e.currentTarget).attr('id');
          var module = $(e.currentTarget).attr('data-module');
          var name = $(e.currentTarget).attr('data-name');

          if(module == 'product') {
            var url = document.location.origin + "/product/delete/" + id;
            var datatable = "ajax-table-department";
          } else if(module == 'position') {
            var url = document.location.origin + "/position/delete/" + id;
            var datatable = "ajax-table-position";
          } else if(module == 'job-file') {
            var url = document.location.origin + "/job-file/jobfile_update/" + id;
            var datatable = "ajax-table-leads-infinity"; 
          }

          var data = "id="+id;
          $.ajax({
            type: "DELETE",
            url: url,
            data: data,
            success: function(data) {
              $('.' + datatable).DataTable().row($(e.currentTarget).parents('tr')).remove().draw(false);
            }
          });

          swal('Deleted!', name + ' has been deleted', 'success');
        }
      }
    );
  });
  })
  
  //Installer Functions
  $('#employeePosition').on('change', function() {
    var position = $('#employeePosition').val();
    if(position == 'Installer Operative') {
      $('#installer_manager').show();
      $('#installer_manager select').attr('name', 'installer_manager');
      $('#installer_operation').hide();
    } else if(position =='Installer Manager') {
      $('#installer_manager').hide();
      $('#installer_operation').show();
      $('#installer_manager select').RemoveAttr('name');
    } else {
      $('#installer_manager').hide();
      $('#installer_operation').hide();
    }
  });

  $('#campaignDropDown').on('change', function() {
  	var campaignType = $('#campaignDropDown').val();
    var campaignID = $('option:selected', this).attr('data-id');
  	if(campaignType == '1') {
  		$('#esh').show();
  		$('#esh #c_id').attr('value', campaignID)
  		$('#cavity').hide();
  		$('#boiler').hide();
  	} else if(campaignType == '2') {
  		$('#esh').hide();
  		$('#cavity').hide();
      $('#boiler').show();
  		$('#boiler #c_id').attr('value', campaignID);    		
  	} else if(campaignType == '4') {
      $('#esh').hide();
      $('#cavity').show();
      $('#cavity #c_id').attr('value', campaignID); 
      $('#boiler').hide(); 
    } else if(campaignType == '5') {
      $('#esh').hide();
      $('#cavity').hide();
      $('#boiler').hide();
      $('#sw').show();
      $('#sw #c_id').attr('value', campaignID);
    } else {
  		$('#esh').hide();
  		$('#cavity').hide();
  		$('#boiler').hide();  
      $('#sw').hide();
  	}
  });

  $('#property_type_esh').on('change', function() {
    var propertyType = $('#property_type_esh').val();
    if(propertyType == 'House' || propertyType == 'Bungalow') {
      $('#house_bungalow_esh').show();
      $('#house_bungalow_esh select').attr('name', 'property_type2');
      $('#flat_maisonette_esh').hide();
      $('#flat_maisonette_esh select').removeAttr('name');
    } else if(propertyType == 'Flat' || propertyType == 'Maisonette') {
      $('#house_bungalow_esh').hide();
      $('#house_bungalow_esh select').removeAttr('name');
      $('#flat_maisonette_esh').show();
      $('#flat_maisonette_esh select').attr('name', 'property_type2');
    } else {
      $('#house_bungalow_esh').hide();
      $('#house_bungalow_esh select').removeAttr('name');
      $('#flat_maisonette_esh').hide();
      $('#flat_maisonette_esh select').removeAttr('name');
    }
  });

  $('#property_type_cavity').on('change', function() {
    var propertyType = $('#property_type_cavity').val();
    if(propertyType == 'House' || propertyType == 'Bungalow') {
      $('#house_bungalow_cavity').show();
      $('#house_bungalow_cavity select').attr('name', 'property_type2');
      $('#flat_maisonette_cavity').hide();
      $('#flat_maisonette_cavity select').removeAttr('name');
    } else if(propertyType == 'Flat' || propertyType == 'Maisonette') {
      $('#house_bungalow_cavity').hide();
      $('#house_bungalow_cavity select').removeAttr('name');
      $('#flat_maisonette_cavity').show();
      $('#flat_maisonette_cavity select').attr('name', 'property_type2');
    } else {
      $('#house_bungalow_cavity').hide();
      $('#house_bungalow_cavity select').removeAttr('name');
      $('#flat_maisonette_cavity').hide();
      $('#flat_maisonette_cavity select').removeAttr('name');
    }
  });

  $('#property_type_boiler').on('change', function() {
    var propertyType = $('#property_type_boiler').val();
    if(propertyType == 'House' || propertyType == 'Bungalow') {
      $('#house_bungalow_boiler').show();
      $('#house_bungalow_boiler select').attr('name', 'property_type2');
      $('#flat_maisonette_boiler').hide();
      $('#flat_maisonette_boiler select').removeAttr('name');
    } else if(propertyType == 'Flat' || propertyType == 'Maisonette') {
      $('#house_bungalow_boiler').hide();
      $('#house_bungalow_boiler select').removeAttr('name');
      $('#flat_maisonette_boiler').show();
      $('#flat_maisonette_boiler select').attr('name', 'property_type2');
    } else {
      $('#house_bungalow_boiler').hide();
      $('#house_bungalow_boiler select').removeAttr('name');
      $('#flat_maisonette_boiler').hide();
      $('#flat_maisonette_boiler select').removeAttr('name');
    }
  });

  $('#property_type_sw').on('change', function() {
  	var propertyType = $('#property_type_sw').val();
  	if(propertyType == 'House' || propertyType == 'Bungalow') {
  		$('#house_bungalow_sw').show();
  		$('#house_bungalow_sw select').attr('name', 'property_type2');
  		$('#flat_maisonette_sw').hide();
  		$('#flat_maisonette_sw select').removeAttr('name');
  	} else if(propertyType == 'Flat' || propertyType == 'Maisonette') {
  		$('#house_bungalow_sw').hide();
  		$('#house_bungalow_sw select').removeAttr('name');
  		$('#flat_maisonette_sw').show();
  		$('#flat_maisonette_sw select').attr('name', 'property_type2');
  	} else {
  		$('#house_bungalow_sw').hide();
  		$('#house_bungalow_sw select').removeAttr('name');
  		$('#flat_maisonette_sw').hide();
  		$('#flat_maisonette_sw select').removeAttr('name');
  	}
  });

  $('#1fault').click(function() {
    if($(this).prop('checked')) {
        $('#fault1').show();
        $('#fault1 input').attr('name', 'fault1');
    } else {
        $('#fault1').hide();
        $('#fault1 input').removeAttr('name', 'fault1');
        $(this).attr('name', 'fault1');     
        $(this).attr('value', 'No');
    }
 });

 $('#2fault').click(function() {
    if($(this).prop('checked')) {
        $('#fault2').show();
        $('#fault2 input').attr('name', 'fault2');
    } else {
        $('#fault2').hide();
        $('#fault2 input').removeAttr('name', 'fault2');
        $(this).attr('name', 'fault2');     
        $(this).attr('value', 'No');
    }
 });

 $('#3fault').click(function() {
    if($(this).prop('checked')) {
        $('#fault3').show();
        $('#fault3 input').attr('name', 'fault3');
    } else {
        $('#fault3').hide();
        $('#fault3 input').removeAttr('name', 'fault3');
        $(this).attr('name', 'fault3');     
        $(this).attr('value', 'No');
    }
 });

 $('#4fault').click(function() {
    if($(this).prop('checked')) {
        $('#fault4').show();
        $('#fault4 input').attr('name', 'fault4');
    } else {
        $('#fault4').hide();
        $('#fault4 input').removeAttr('name', 'fault4');
        $(this).attr('name', 'fault4');     
        $(this).attr('value', 'No');
    }
 });

 $('#5fault').click(function() {
    if($(this).prop('checked')) {
        $('#fault5').show();
        $('#fault5 input').attr('name', 'fault5');
    } else {
        $('#fault5').hide();
        $('#fault5 input').removeAttr('name', 'fault5');
        $(this).attr('name', 'fault5');     
        $(this).attr('value', 'No');
    }
 });

 $('#6fault').click(function() {
    if($(this).prop('checked')) {
        $('#fault6').show();
        $('#fault6 input').attr('name', 'fault6');
    } else {
        $('#fault6').hide();
        $('#fault6 input').removeAttr('name', 'fault6');
        $(this).attr('name', 'fault6');     
        $(this).attr('value', 'No');
    }
 });

 $('#7fault').click(function() {
    if($(this).prop('checked')) {
        $('#fault7').show();
        $('#fault7 input').attr('name', 'fault7');
    } else {
        $('#fault7').hide();
        $('#fault7 input').removeAttr('name', 'fault7');
        $(this).attr('name', 'fault7');     
        $(this).attr('value', 'No');
    }
 });

 $('#8fault').click(function() {
    if($(this).prop('checked')) {
        $('#fault8').show();
        $('#fault8 input').attr('name', 'fault8');
    } else {
        $('#fault8').hide();
        $('#fault8 input').removeAttr('name', 'fault8');
        $(this).attr('name', 'fault8');     
        $(this).attr('value', 'No');
    }
 });

 $('#9fault').click(function() {
    if($(this).prop('checked')) {
        $('#fault9').show();
        $('#fault9 input').attr('name', 'fault9');
    } else {
        $('#fault9').hide();
        $('#fault9 input').removeAttr('name', 'fault9');
        $(this).attr('name', 'fault9');     
        $(this).attr('value', 'No');
    }
 });

 $('#10fault').click(function() {
    if($(this).prop('checked')) {
        $('#fault10').show();
        $('#fault10 input').attr('name', 'fault10');
    } else {
        $('#fault10').hide();
        $('#fault10 input').removeAttr('name', 'fault10');
        $(this).attr('name', 'fault10');     
        $(this).attr('value', 'No');
    }
 });

 $('#11fault').click(function() {
    if($(this).prop('checked')) {
        $('#fault11').show();
        $('#fault11 input').attr('name', 'fault11');
    } else {
        $('#fault11').hide();
        $('#fault11 input').removeAttr('name', 'fault11');
        $(this).attr('name', 'fault11');     
        $(this).attr('value', 'No');
    }
 });

 $('#12fault').click(function() {
    if($(this).prop('checked')) {
        $('#fault12').show();
        $('#fault12 input').attr('name', 'fault12');
    } else {
        $('#fault12').hide();
        $('#fault12 input').removeAttr('name', 'fault12');
        $(this).attr('name', 'fault12');     
        $(this).attr('value', 'No');
    }
 });

 $('#13fault').click(function() {
    if($(this).prop('checked')) {
        $('#fault13').show();
        $('#fault13 input').attr('name', 'fault13');
    } else {
        $('#fault13').hide();
        $('#fault13 input').removeAttr('name', 'fault13');
        $(this).attr('name', 'fault13');     
        $(this).attr('value', 'No');
    }
 });

  // Send Email
  $('#sendEmailForm').on('submit', function(e) {

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    e.preventDefault();
    var sendto = $('#sendto').val();
    var subject = $('#subject').val();
    var sendnotes = $('#sendnotes').val();
    var name = $('#name').val();
    var leadurl = $('#url').val();
    var username = $('#userid').attr('data-name');

    var url = $(this).attr('action');

    $.ajax({
      type: "POST",
      url: url,
      async: true,
      data: {'sendto':sendto,'subject':subject,'sendnotes':sendnotes, 'name':name,'leadurl':leadurl,'username':username},
      beforeSend:function() {
        $('#sendEmailBtn').html('<img src="'+baseurl+'/img/ajax-loader.gif">').attr("disabled","disabled");
      },
      success: function(data) {
        $('#sendEmailBtn').html('Send').removeAttr("disabled");
        $('#sendEmail').modal('hide');
        $('#sendEmailForm')[0].reset();
        toastr["success"]("Email sent.", "Success");
      },
    });

  });


  // Add Campaign
	$('#addCampaignForm').on('submit', function(e){

		$.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

		e.preventDefault();
		var formData = new FormData($('#addCampaignForm')[0]);
		var url = $(this).attr('action');
		var post = $(this).attr('method');

		$.ajax({
			type: post,
			url: url,
      async: true,
			data: formData,
			beforeSend:function() {
				$('#AddCampaignBtn').html('<img src="../img/ajax-loader.gif">').attr("disabled","disabled");
			},
			success:function(data) {
        $('#AddCampaignBtn').html('Add Campaign').removeAttr("disabled");
        $('.ajax-table-campaigns').DataTable().ajax.reload();
				$('#addcampaignmodal').modal('hide');
				$('#addCampaignForm')[0].reset();
				toastr["success"]("Your Campaign has been successfully added.", "Success");
				console.log(data)
			},
			error: function(xhr, status, error) {
        console.log(xhr);
        console.log(status);
        console.log(error);
			},
        cache: false,
        contentType: false,
        processData: false
		});
	});

  //Add Department
  $('#addDepartmentForm').on('submit', function(e){

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    e.preventDefault();
    var formData = new FormData($('#addDepartmentForm')[0]);
    var url = $(this).attr('action');
    var post = $(this).attr('method');

    $.ajax({
      type: post,
      url: url,
            async: true,
      data: formData,
      beforeSend:function() {
        $('#AddDepartmentBtn').html('<img src="../img/ajax-loader.gif">').attr("disabled","disabled");
      },
      success:function(data) {
        $('#AddDepartmentBtn').html('Add Department').removeAttr("disabled");
        $('.ajax-table-department').DataTable().ajax.reload();
        $('#addemployeemodal').modal('hide');
        $('#addDepartmentForm')[0].reset();
        toastr["success"]("Your Department has been successfully added.", "Success");
        console.log(data)
      },
      error: function(xhr, status, error) {
        console.log(xhr);
        console.log(status);
        console.log(error);
      },
        cache: false,
        contentType: false,
        processData: false
    });
  });

  //Add Position
  $('#addPositionForm').on('submit', function(e){

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    e.preventDefault();
    var formData = new FormData($('#addPositionForm')[0]);
    var url = $(this).attr('action');
    var post = $(this).attr('method');

    $.ajax({
      type: post,
      url: url,
      async: true,
      data: formData,
      beforeSend:function() {
        $('#AddPositionBtn').html('<img src="../img/ajax-loader.gif">').attr("disabled","disabled");
      },
      success:function(data) {
        $('#AddPositionBtn').html('Add Position').removeAttr("disabled");
        $('.ajax-table-position').DataTable().ajax.reload();
        $('#addpositionmodal').modal('hide');
        $('#addPositionForm')[0].reset();
        toastr["success"]("Your Position has been successfully added.", "Success");
        console.log(data)
      },
      error: function(xhr, status, error) {
        console.log(xhr);
        console.log(status);
        console.log(error);
      },
        cache: false,
        contentType: false,
        processData: false
    });
  });

  //Update Lead Information
  $('.stage-container').on('click','.stagestrip:not(.dd)',function(){

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var lead_status2 = $(this).attr('data-stage');
    var lead_slug = $('#lead_slug').val();
    $.ajax({
      url:  baseurl+'leads/updateleadstage/update',
      type: 'POST',
      data: {'lead_status2':lead_status2,'lead_slug':lead_slug},
      success: function (data) {
        if(lead_status2=='Uploaded by Installer'){
          $('.stagestrip[data-stage="Uploaded by Installer"]').addClass('active').removeClass('lost');
          $('.stagestrip[data-stage="Action Needed by Installer"]').removeClass('active lost');
          $('.stagestrip[data-stage="Currently with JFC"]').removeClass('active lost');
          $('.stagestrip[data-stage="Level 1 QA"]').removeClass('active lost');
          $('.stagestrip[data-stage="Level 2 QA"]').removeClass('active lost');
          $('.stagestrip[data-stage="Sent to Energy Company"]').removeClass('active lost');
          $('.dd').removeClass('active lost');
          $('.dd').html('Won/Lost <i class="fa fa-caret-down" aria-hidden="true"></i>');
        }else if(lead_status2=='Action Needed by Installer'){
          $('.stagestrip[data-stage="Uploaded by Installer"]').addClass('active').removeClass('lost');
          $('.stagestrip[data-stage="Action Needed by Installer"]').addClass('active').removeClass('lost');
          $('.stagestrip[data-stage="Currently with JFC"]').removeClass('active lost');
          $('.stagestrip[data-stage="Level 1 QA"]').removeClass('active lost');
          $('.stagestrip[data-stage="Level 2 QA"]').removeClass('active lost');
          $('.stagestrip[data-stage="Sent to Energy Company"]').removeClass('active lost');
          $('.jfc, .level1qa, .level2qa').hide();
          $('.dd').removeClass('active lost');
          $('.dd').html('Won/Lost <i class="fa fa-caret-down" aria-hidden="true"></i>');
        }else if(lead_status2=='Currently with JFC'){
          $('.stagestrip[data-stage="Uploaded by Installer"]').addClass('active').removeClass('lost');
          $('.stagestrip[data-stage="Action Needed by Installer"]').addClass('active').removeClass('lost');
          $('.stagestrip[data-stage="Currently with JFC"]').addClass('active').removeClass('lost');
          $('.stagestrip[data-stage="Level 1 QA"]').removeClass('active lost');
          $('.stagestrip[data-stage="Level 2 QA"]').removeClass('active lost');
          $('.stagestrip[data-stage="Sent to Energy Company"]').removeClass('active lost');
          $('.dd').removeClass('active lost');
          $('.dd').html('Won/Lost <i class="fa fa-caret-down" aria-hidden="true"></i>');
        }else if(lead_status2=='Level 1 QA'){
          $('.stagestrip[data-stage="Uploaded by Installer"]').addClass('active').removeClass('lost');
          $('.stagestrip[data-stage="Action Needed by Installer"]').addClass('active').removeClass('lost');
          $('.stagestrip[data-stage="Currently with JFC"]').addClass('active').removeClass('lost');
          $('.stagestrip[data-stage="Level 1 QA"]').addClass('active').removeClass('lost');
          $('.stagestrip[data-stage="Level 2 QA"]').removeClass('active lost');
          $('.stagestrip[data-stage="Sent to Energy Company"]').removeClass('active lost');
          $('.dd').removeClass('active lost');
          $('.dd').html('Won/Lost <i class="fa fa-caret-down" aria-hidden="true"></i>');
        }else if(lead_status2=='Level 2 QA'){
          $('.stagestrip[data-stage="Uploaded by Installer"]').addClass('active').removeClass('lost');
          $('.stagestrip[data-stage="Action Needed by Installer"]').addClass('active').removeClass('lost');
          $('.stagestrip[data-stage="Currently with JFC"]').addClass('active').removeClass('lost');
          $('.stagestrip[data-stage="Level 1 QA"]').addClass('active').removeClass('lost');
          $('.stagestrip[data-stage="Level 2 QA"]').addClass('active').removeClass('lost');
          $('.stagestrip[data-stage="Sent to Energy Company"]').removeClass('active lost');          
          $('.dd').removeClass('active lost');
          $('.dd').html('Won/Lost <i class="fa fa-caret-down" aria-hidden="true"></i>');
        }else if(lead_status2=='Sent to Energy Company') {
          $('.stagestrip[data-stage="Uploaded by Installer"]').addClass('active').removeClass('lost');
          $('.stagestrip[data-stage="Action Needed by Installer"]').addClass('active').removeClass('lost');
          $('.stagestrip[data-stage="Currently with JFC"]').addClass('active').removeClass('lost');
          $('.stagestrip[data-stage="Level 1 QA"]').addClass('active').removeClass('lost');
          $('.stagestrip[data-stage="Level 2 QA"]').addClass('active').removeClass('lost');
          $('.stagestrip[data-stage="Sent to Energy Company"]').addClass('active').removeClass('lost');
        }
        toastr["success"]("Success");
      }
   });

  });

  //Add Department AJAX
  $('#save_department').click(function() {

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var department = $('#add_department').val();
    $('#save_department').attr('disabled', 'disabled');

    $.ajax({
      url: baseurl + "department/add",
      type: 'POST',
      data: {'department_name':department},
      beforeSend: function() {
        $('#save_department').html('<img src="/img/ajax-loader.gif">');
      },
      success: function(data) {
        setTimeout(function() {
          $('#save_department').html('<i class="glyphicon glyphicon-floppy-saved"></i>');
          $('#employeeDepartment').empty();
          $('#department_001').html('<span class="label label-success">Department has been added</span>');
          $('#add_department').val('');
          $('#employeeDepartment').append($('<option value="'+data['department_name']+'">'+data['department_name']+'</option>'));
        },500);
      }
    });
  });

  //Add Position AJAX
  $('#save_position').click(function() {

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var position = $('#add_position').val();
    $('#save_position').attr('disabled', 'disabled');

    $.ajax({
      url: baseurl + "position/add",
      type: 'POST',
      data: {'position_name':position},
      beforeSend: function() {
        $('#save_position').html('<img src="/img/ajax-loader.gif">');
      },
      success: function(data) {
        setTimeout(function() {
          $('#save_position').html('<i class="glyphicon glyphicon-floppy-saved"></i>');
          $('#employeePosition').empty();
          $('#position_001').html('<span class="label label-success">Position has been added</span>');
          $('#add_position').val('');
          $('#employeePosition').append($('<option value="'+data['position_name']+'">'+data['position_name']+'</option>'));
        },500);
      }
    });
  });

  //Update JFC Operator
  $('#SaveLeadJFC').on('click', function() {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var jfcID = $('option:selected', '#jfcList').val();
    var lead_slug = $('#lead_slug').val();
    $.ajax({
      type:"POST",
      url: baseurl + "leads/leadcloser/update",
      data: {'lead_jfc':jfcID,'lead_slug':lead_slug},
      beforeSend: function() {
        $('#SaveLeadJFC').html('<img src="/img/ajax-loader.gif">').attr("disabled","disabled");
      },
      success:function(data) {
        setTimeout(function() {
          $('#SaveLeadJFC').html('Save').removeAttr("disabled");
          toastr["success"]('Lead closer has been saved.', "Success");
        }, 500);

        $('.jfc').load(document.URL + ' .jfc');
      }
    });
  });

  //Update QA Level 1
  $('#SaveLeadCloser').on('click', function() {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var closerID = $('option:selected', '#closerList').val();
    var lead_slug = $('#lead_slug').val();
    $.ajax({
      type:"POST",
      url: baseurl + "leads/leadqa1/update",
      data: {'lead_closer':closerID,'lead_slug':lead_slug},
      beforeSend: function() {
        $('#SaveLeadJFC').html('<img src="/img/ajax-loader.gif">').attr("disabled","disabled");
      },
      success:function(data) {
        setTimeout(function() {
          $('#SaveLeadJFC').html('Save').removeAttr("disabled");
          toastr["success"]('Lead closer has been saved.', "Success");
        }, 500);
        $('.level1qa').load(document.URL + ' .level1qa');
      }
    });
  });

  //Update QA Level 1
  $('#SaveLeadCloser2').on('click', function() {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var closerID = $('option:selected', '#closerList2').val();
    var lead_slug = $('#lead_slug').val();
    $.ajax({
      type:"POST",
      url: baseurl + "leads/leadqa2/update",
      data: {'lead_qc2':closerID,'lead_slug':lead_slug},
      beforeSend: function() {
        $('#SaveLeadJFC').html('<img src="/img/ajax-loader.gif">').attr("disabled","disabled");
      },
      success:function(data) {
        setTimeout(function() {
          $('#SaveLeadJFC').html('Save').removeAttr("disabled");
          toastr["success"]('Lead closer has been saved.', "Success");
        }, 500);
        $('.level2qa').load(document.URL + ' .level2qa');
      }
    });
  });


	$('[data-toggle="filter"]').on('click', function(e) {
      $('#page-container').addClass('filter-overlay-o');
  });
  $('[data-action="filter_overlay_close"]').on('click', function(e) {
      $('#page-container').removeClass('filter-overlay-o');
  });

  // Filter
  // $('#leads-filter').on('submit', function(e){
  //   e.preventDefault();
  //   var datas = $('#leads-filter').serialize();
  //   var url = document.location.origin + "leads/lead_list?" + datas;

  //   $('#btn-filter').html('<img src="/img/ajax-loader.gif">').attr("disabled","disabled");

  //   setTimeout(function() {
  //     $('.ajax-table-leads-infinity').DataTable().ajax.url(url).load();
  //     $('#btn-filter').html('Submit Filter').removeAttr("disabled");
  //     $('#page-container').removeClass('filter-overlay-o');
  //   }, 500);
  // });

  $('#leads-filter').on('click', '#btn-clear', function(e) {
    // var url = baseurl + "leads/lead_list";
    $('.ajax-table-leads-infinity').DataTable().ajax.reload();
    $('#leads-filter')[0].reset();
    $('#page-container').removeClass('filter-overlay-o');
  });

  /* image upload preview */
  function readURL(input,attrid) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
        
      reader.onload = function (e) {
          $('#'+attrid).attr('src', e.target.result);
      }
        
      reader.readAsDataURL(input.files[0]);
    }
  }

  $('#employeeaddpicavatar').on('change',function(){
      readURL(this,'addavataremp');
  });
  /* end image upload preview */

  //view password
  $('.reveal').click(function(event) {
    event.preventDefault();
    if ($('.pwd').attr('type') === 'password') {
        $('.pwd').attr('type', 'text');
        $(".reveal i").attr('class', 'glyphicon glyphicon-eye-close');
        //$('.show-password').text('Hide password');
    } else {
        $('.pwd').attr('type', 'password');
        $(".reveal i").attr('class', 'glyphicon glyphicon-eye-open');
        //$('.show-password').text('Show password');
    }
  }); //end view password

  //Generate Password
  $('#generate-pasword').click(function(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_@!?$%^&*()[]{}";
    var lengthnum = Math.floor(Math.random() * 16) + 7;
    for( var i=0; i < lengthnum; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    $('.password').val( text );
  });
  //End Generate Password

  $('.leadtransferowner').click(function(e){
      e.stopPropagation();
  });

  //Email Notification on new lead
$('#leadnote').on('keyup keypress', function(e) {
  if($(this).val().length >= 1) {
    $('#sendToEmail').show();
  }
});

$('#leadnote').on('keyup', function() {
  if($(this).val().length == 0) {
    $('#sendToEmail').hide();
  }
});

$('#sendToEmail').on('click', function() {
  var leadnote = $('#leadnote').val();
  $('#sendnotes').text(leadnote);
});

  //Upload Completed Job File for QA Level 1
  $('#qalevel1').dropzone({
    paramName: 'completed_qa1',
    dictDefaultMessage: "Upload files for QA Level 1 here",
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function(file) {
        $('#qalvl1').load(document.URL + ' #qalvl1');
        toastr["success"]('Files uploaded.', "Success");
      })
    },
  });
  //Upload Completed Job File for QA Level 2
  $('#qalevel2').dropzone({
    paramName: 'completed_qa2',
    dictDefaultMessage: "Upload files for QA Level 2 here",
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function(file) {
        $('#qalvl2').load(document.URL + ' #qalvl2');
        toastr["success"]('Files uploaded.', "Success");
      })
    },
  });
  //Upload Completed Job File for Energy Company
  $('#energy_company').dropzone({
    paramName: 'energy_company',
    dictDefaultMessage: "Upload files for Energy Company here",
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function(file) {
        $('#ec').load(document.URL + ' #ec');
        toastr["success"]('Files uploaded.', "Success");
      })
    },
  });

  //DOM ESH Upload
  $('#dropzone_esh_dom').dropzone({
    paramName: 'dom',
    dictDefaultMessage: "Upload DOM files here",
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> DOM</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_esh_dom').hide();
        toastr["success"]('DOM files uploaded.', "Success");
      })
    },
  });

  //Pibi ESH Upload
  $('#dropzone_esh_pibi').dropzone({
    paramName: 'pibi',
    dictDefaultMessage: "Upload PIBI files here",
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> PIBI</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_esh_pibi').hide();
        toastr["success"]('PIBI files uploaded.', "Success");
      })
    },
  });

  //DSSY_A ESH Upload
  $('#dropzone_esh_dssya').dropzone({
    paramName: 'dssy_a',
    dictDefaultMessage: "Upload DSSY_A files here",
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> DSSY_A</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_esh_dssya').hide();
        toastr["success"]('DSSY_A files uploaded.', "Success");
      })
    },
  });

  //DSSY_C ESH Upload
  $('#dropzone_esh_dssyc').dropzone({
    paramName: 'dssy_c',
    dictDefaultMessage: "Upload DSSY_C files here",
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> DSSY_C</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_esh_dssyc').hide();
        toastr["success"]('DSSY_C files uploaded.', "Success");
      })
    },
  });

  //PICS ESH Upload
  $('#dropzone_esh_pics').dropzone({
    dictDefaultMessage: "Upload PICS files here",
    paramName: 'pics',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> PICS</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_esh_pics').hide();
        toastr["success"]('PICS files uploaded.', "Success");
      })
    },
  });

  //PICA ESH Upload
  $('#dropzone_esh_pica').dropzone({
    dictDefaultMessage: "Upload PICA files here",
    paramName: 'pica',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> PICA</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_esh_pica').hide();
        toastr["success"]('PICA files uploaded.', "Success");
      })
    },
  });

  //EOOC ESH Upload
  $('#dropzone_esh_eooc').dropzone({
    dictDefaultMessage: "Upload EOOC files here",
    paramName: 'eooc',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> EOOC</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_esh_eooc').hide();
        toastr["success"]('EOOC files uploaded.', "Success");
      })
    },
  });

  //Land Registry ESH Upload
  $('#dropzone_esh_land_registry').dropzone({
    dictDefaultMessage: "Upload LAND REGISTRY files here",
    paramName: 'land_registry',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LAND REGISTRY</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_esh_land_registry').hide();
        toastr["success"]('LAND REGISTRY files uploaded.', "Success");
      })
    },
  });

  //Ubil ESH Upload
  $('#dropzone_esh_ubil').dropzone({
    dictDefaultMessage: "Upload UBIL files here",
    paramName: 'ubil',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> UBIL</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_esh_ubil').hide();
        toastr["success"]('UBIL files uploaded.', "Success");
      })
    },
  });

  //DWP ESH Upload
  $('#dropzone_esh_dwp').dropzone({
    dictDefaultMessage: "Upload DWP MATCH CONFIRMATION files here",
    paramName: 'dwp',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> DWP</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_esh_ubil').hide();
        toastr["success"]('DWP files uploaded.', "Success");
      })
    },
  });

  //ENGINEER SIGNATURE ESH Upload
  $('#dropzone_esh_eng_sig').dropzone({
    dictDefaultMessage: "Upload ENGINEER SIGNATURE files here",
    paramName: 'eng_sig',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> ENGINEER SIGNATURE</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_esh_eng_sig').hide();
        toastr["success"]('ENGINEER SIGNATURE files uploaded.', "Success");
      })
    },
  });

  //PPES ESH Upload
  $('#dropzone_esh_ppes').dropzone({
    dictDefaultMessage: "Upload PPES files here",
    paramName: 'ppes',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> PPES</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_esh_ppes').hide();
        toastr["success"]('PPES files uploaded.', "Success");
      })
    },
  });

  //ESH MANUFACTURE GUARANTEE ESH Upload
  $('#dropzone_esh_esh_manufacture').dropzone({
    dictDefaultMessage: "Upload ESH MANUFACTURE GUARANTEE files here",
    paramName: 'esh_manufacture',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> ESH MANUFACTURE GUARANTEE</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_esh_esh_manufacture').hide();
        toastr["success"]('ESH MANUFACTURE GUARANTEE files uploaded.', "Success");
      })
    },
  });

  //ESH TECHNICAL SURVEY ESH Upload
  $('#dropzone_esh_esh_technical').dropzone({
    dictDefaultMessage: "Upload ESH TECHNICAL SURVEY files here",
    paramName: 'esh_technical',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> ESH TECHNICAL SURVEY</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_esh_esh_technical').hide();
        toastr["success"]('ESH TECHNICAL SURVEY files uploaded.', "Success");
      })
    },
  });

  //PASC ESH Upload
  $('#dropzone_esh_pasc').dropzone({
    dictDefaultMessage: "Upload PASC files here",
    paramName: 'pasc',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> PASC</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_esh_pasc').hide();
        toastr["success"]('PASC files uploaded.', "Success");
      })
    },
  });

  //BREG ESH Upload
  $('#dropzone_esh_breg').dropzone({
    dictDefaultMessage: "Upload BREG files here",
    paramName: 'breg',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> BREG</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_esh_breg').hide();
        toastr["success"]('BREG files uploaded.', "Success");
      })
    },
  });

  //FLOOR PLAN ESH Upload
  $('#dropzone_esh_floor_plan').dropzone({
    dictDefaultMessage: "Upload FLOOR PLAN files here",
    paramName: 'floor_plan',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> FLOOR PLAN</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_esh_floor_plan').hide();
        toastr["success"]('FLOOR PLAN files uploaded.', "Success");
      })
    },
  });

  //TENANCY AGREEMENT ESH Upload
  $('#dropzone_esh_tenancy').dropzone({
    dictDefaultMessage: "Upload TENANCY AGREEMENT files here",
    paramName: 'tenancy',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> TENANCY AGREEMENT</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_esh_tenancy').hide();
        toastr["success"]('TENANCY AGREEMENT files uploaded.', "Success");
      })
    },
  });

  //LANDLORD PERMISSION ESH Upload
  $('#dropzone_esh_landlord').dropzone({
    dictDefaultMessage: "Upload LANDLORD PERMISSION files here",
    paramName: 'landlord',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_esh_landlord').hide();
        toastr["success"]('LANDLORD PERMISSION files uploaded.', "Success");
      })
    },
  });

  //Bedroom1 ESH Upload
  $('#dropzone_esh_bedroom1').dropzone({
    dictDefaultMessage: "Upload BEDROOM 1 files here",
    paramName: 'bedroom1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_bedroom1').hide();
        toastr["success"]('BEDROOM 1 files uploaded.', "Success");
      })
    },
  });

  //Bedroom2 ESH Upload
  $('#dropzone_esh_bedroom2').dropzone({
    dictDefaultMessage: "Upload BEDROOM 2 files here",
    paramName: 'bedroom2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_bedroom2').hide();
        toastr["success"]('BEDROOM 2 files uploaded.', "Success");
      })
    },
  });

  //Bedroom3 ESH Upload
  $('#dropzone_esh_bedroom3').dropzone({
    dictDefaultMessage: "Upload BEDROOM 3 files here",
    paramName: 'bedroom3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_bedroom3').hide();
        toastr["success"]('BEDROOM 3 files uploaded.', "Success");
      })
    },
  });

  //Bedroom4 ESH Upload
  $('#dropzone_esh_bedroom4').dropzone({
    dictDefaultMessage: "Upload BEDROOM 4 files here",
    paramName: 'bedroom4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_bedroom4').hide();
        toastr["success"]('BEDROOM 4 files uploaded.', "Success");
      })
    },
  });

  //Bedroom2 ESH Upload
  $('#dropzone_esh_bedroom5').dropzone({
    dictDefaultMessage: "Upload BEDROOM 5 files here",
    paramName: 'bedroom5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_bedroom5').hide();
        toastr["success"]('BEDROOM 5 files uploaded.', "Success");
      })
    },
  });

  //Kitchen1 ESH Upload
  $('#dropzone_esh_kitchen1').dropzone({
    dictDefaultMessage: "Upload Kitchen 1 files here",
    paramName: 'kitchen1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_kitchen1').hide();
        toastr["success"]('KITCHEN 1 files uploaded.', "Success");
      })
    },
  });

  //Kitchen2 ESH Upload
  $('#dropzone_esh_kitchen2').dropzone({
    dictDefaultMessage: "Upload Kitchen 2 files here",
    paramName: 'kitchen2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_kitchen2').hide();
        toastr["success"]('KITCHEN 2 files uploaded.', "Success");
      })
    },
  });

  //Dining1 ESH Upload
  $('#dropzone_esh_dining_room1').dropzone({
    dictDefaultMessage: "Upload Dining Room 1 files here",
    paramName: 'dining_room1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_dining_room1').hide();
        toastr["success"]('DINING ROOM 1 files uploaded.', "Success");
      })
    },
  });

  //Dining2 ESH Upload
  $('#dropzone_esh_dining_room2').dropzone({
    dictDefaultMessage: "Upload Dining Room 2 files here",
    paramName: 'dining_room2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_dining_room2').hide();
        toastr["success"]('DINING ROOM 2 files uploaded.', "Success");
      })
    },
  });

  //Living1 ESH Upload
  $('#dropzone_esh_living_room1').dropzone({
    dictDefaultMessage: "Upload Living Room 1 files here",
    paramName: 'living_room1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_living_room1').hide();
        toastr["success"]('LIVING ROOM 1 files uploaded.', "Success");
      })
    },
  });

  //Living2 ESH Upload
  $('#dropzone_esh_living_room2').dropzone({
    dictDefaultMessage: "Upload Living Room 2 files here",
    paramName: 'living_room2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_living_room2').hide();
        toastr["success"]('LIVING ROOM 2 files uploaded.', "Success");
      })
    },
  });

  //Hallway1 ESH Upload
  $('#dropzone_esh_hallway1').dropzone({
    dictDefaultMessage: "Upload Hallway 1 files here",
    paramName: 'hallway1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_hallway1').hide();
        toastr["success"]('HALLWAY 1 files uploaded.', "Success");
      })
    },
  });

  //Hallway2 ESH Upload
  $('#dropzone_esh_hallway2').dropzone({
    dictDefaultMessage: "Upload Hallway 2 files here",
    paramName: 'hallway2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_hallway2').hide();
        toastr["success"]('HALLWAY 2 files uploaded.', "Success");
      })
    },
  });

  //Hallway3 ESH Upload
  $('#dropzone_esh_hallway3').dropzone({
    dictDefaultMessage: "Upload Hallway 3 files here",
    paramName: 'hallway3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_hallway3').hide();
        toastr["success"]('HALLWAY 3 files uploaded.', "Success");
      })
    },
  });

  //Hallway4 ESH Upload
  $('#dropzone_esh_hallway4').dropzone({
    dictDefaultMessage: "Upload Hallway 4 files here",
    paramName: 'hallway4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_hallway4').hide();
        toastr["success"]('HALLWAY 4 files uploaded.', "Success");
      })
    },
  });

  //Hallway5 ESH Upload
  $('#dropzone_esh_hallway5').dropzone({
    dictDefaultMessage: "Upload Hallway 5 files here",
    paramName: 'hallway5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_hallway5').hide();
        toastr["success"]('HALLWAY 5 files uploaded.', "Success");
      })
    },
  });

  //Landing1 ESH Upload
  $('#dropzone_esh_landing1').dropzone({
    dictDefaultMessage: "Upload Landing 1 files here",
    paramName: 'landing1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_landing1').hide();
        toastr["success"]('LANDING 1 files uploaded.', "Success");
      })
    },
  });

  //Landing2 ESH Upload
  $('#dropzone_esh_landing2').dropzone({
    dictDefaultMessage: "Upload Landing 2 files here",
    paramName: 'landing2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_landing2').hide();
        toastr["success"]('LANDING 2 files uploaded.', "Success");
      })
    },
  });

  //Landing3 ESH Upload
  $('#dropzone_esh_landing3').dropzone({
    dictDefaultMessage: "Upload Landing 3 files here",
    paramName: 'landing3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_landing3').hide();
        toastr["success"]('LANDING 3 files uploaded.', "Success");
      })
    },
  });

  //Landing4 ESH Upload
  $('#dropzone_esh_landing4').dropzone({
    dictDefaultMessage: "Upload Landing 4 files here",
    paramName: 'landing4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_landing4').hide();
        toastr["success"]('LANDING 4 files uploaded.', "Success");
      })
    },
  });

  //Landing5 ESH Upload
  $('#dropzone_esh_landing5').dropzone({
    dictDefaultMessage: "Upload Landing 5 files here",
    paramName: 'landing5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_landing5').hide();
        toastr["success"]('LANDING 5 files uploaded.', "Success");
      })
    },
  });

  //Front Elevation ESH Upload
  $('#dropzone_esh_fort_elevation').dropzone({
    dictDefaultMessage: "Upload Front Elevation files here",
    paramName: 'fort_elevation',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_fort_elevation').hide();
        toastr["success"]('Front Elevation files uploaded.', "Success");
      })
    },
  });

  //Side Elevation ESH Upload
  $('#dropzone_esh_side_elevation1').dropzone({
    dictDefaultMessage: "Upload Side Elevation 1 files here",
    paramName: 'side_elevation1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_side_elevation1').hide();
        toastr["success"]('SIDE ELEVATION 1 files uploaded.', "Success");
      })
    },
  });

  //Side Elevation ESH Upload
  $('#dropzone_esh_side_elevation2').dropzone({
    dictDefaultMessage: "Upload Side Elevation 2 files here",
    paramName: 'side_elevation2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_side_elevation2').hide();
        toastr["success"]('SIDE ELEVATION 2 files uploaded.', "Success");
      })
    },
  });

  //Rear Elevation ESH Upload
  $('#dropzone_esh_rear_elevation').dropzone({
    dictDefaultMessage: "Upload Rear Elevation files here",
    paramName: 'rear_elevation',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_rear_elevation').hide();
        toastr["success"]('REAR ELEVATION files uploaded.', "Success");
      })
    },
  });

  //Water Closet 1 ESH Upload
  $('#dropzone_esh_water_closet1').dropzone({
    dictDefaultMessage: "Upload Water Closet 1 files here",
    paramName: 'water_closet1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_water_closet1').hide();
        toastr["success"]('CLOSET 1 files uploaded.', "Success");
      })
    },
  });

  //Water Closet 2 ESH Upload
  $('#dropzone_esh_water_closet2').dropzone({
    dictDefaultMessage: "Upload Water Closet 2 files here",
    paramName: 'water_closet2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_water_closet2').hide();
        toastr["success"]('CLOSET 2 files uploaded.', "Success");
      })
    },
  });

  //Water Closet 3 ESH Upload
  $('#dropzone_esh_water_closet3').dropzone({
    dictDefaultMessage: "Upload Water Closet 3 files here",
    paramName: 'water_closet3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_water_closet3').hide();
        toastr["success"]('CLOSET 3 files uploaded.', "Success");
      })
    },
  });

  //Water Closet 4 ESH Upload
  $('#dropzone_esh_water_closet4').dropzone({
    dictDefaultMessage: "Upload Water Closet 4 files here",
    paramName: 'water_closet4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_water_closet4').hide();
        toastr["success"]('CLOSET 4 files uploaded.', "Success");
      })
    },
  });

  //Water Closet 5 ESH Upload
  $('#dropzone_esh_water_closet5').dropzone({
    dictDefaultMessage: "Upload Water Closet 5 files here",
    paramName: 'water_closet5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_water_closet5').hide();
        toastr["success"]('CLOSET 5 files uploaded.', "Success");
      })
    },
  });

  //Utility ESH Upload
  $('#dropzone_esh_utility').dropzone({
    dictDefaultMessage: "Upload Utility files here",
    paramName: 'utility',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_utility').hide();
        toastr["success"]('UTILITY files uploaded.', "Success");
      })
    },
  });

  //Lounge 1 ESH Upload
  $('#dropzone_esh_lounge1').dropzone({
    dictDefaultMessage: "Upload Lounge 1 files here",
    paramName: 'lounge1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_lounge1').hide();
        toastr["success"]('LOUNGE 1 files uploaded.', "Success");
      })
    },
  });

  //Lounge 2 ESH Upload
  $('#dropzone_esh_lounge2').dropzone({
    dictDefaultMessage: "Upload Lounge 2 files here",
    paramName: 'lounge2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_lounge2').hide();
        toastr["success"]('LOUNGE 2 files uploaded.', "Success");
      })
    },
  });

  //Lounge 3 ESH Upload
  $('#dropzone_esh_lounge3').dropzone({
    dictDefaultMessage: "Upload Lounge 3 files here",
    paramName: 'lounge3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_lounge3').hide();
        toastr["success"]('LOUNGE 3 files uploaded.', "Success");
      })
    },
  });

  //bathroom1 ESH Upload
  $('#dropzone_esh_bathroom1').dropzone({
    dictDefaultMessage: "Upload Bathroom 1 files here",
    paramName: 'bathroom1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_bathroom1').hide();
        toastr["success"]('BATHROOM 1 files uploaded.', "Success");
      })
    },
  });

  //bathroom2 ESH Upload
  $('#dropzone_esh_bathroom2').dropzone({
    dictDefaultMessage: "Upload Bathroom 2 files here",
    paramName: 'bathroom2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_bathroom2').hide();
        toastr["success"]('BATHROOM 2 files uploaded.', "Success");
      })
    },
  });

  //bathroom3 ESH Upload
  $('#dropzone_esh_bathroom3').dropzone({
    dictDefaultMessage: "Upload Bathroom 3 files here",
    paramName: 'bathroom3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_bathroom3').hide();
        toastr["success"]('BATHROOM 3 files uploaded.', "Success");
      })
    },
  });

  //bathroom4 ESH Upload
  $('#dropzone_esh_bathroom4').dropzone({
    dictDefaultMessage: "Upload Bathroom 4 files here",
    paramName: 'bathroom4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_bathroom4').hide();
        toastr["success"]('BATHROOM 4 files uploaded.', "Success");
      })
    },
  });

  //bathroom5 ESH Upload
  $('#dropzone_esh_bathroom5').dropzone({
    dictDefaultMessage: "Upload Bathroom 5 files here",
    paramName: 'bathroom5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_bathroom5').hide();
        toastr["success"]('BATHROOM 5 files uploaded.', "Success");
      })
    },
  });

    //cupboard1 ESH Upload
  $('#dropzone_esh_cupboard1').dropzone({
    dictDefaultMessage: "Upload Cupboard 1 files here",
    paramName: 'cupboard1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_cupboard1').hide();
        toastr["success"]('CUPBOARD 1 files uploaded.', "Success");
      })
    },
  });

  //cupboard2 ESH Upload
  $('#dropzone_esh_cupboard2').dropzone({
    dictDefaultMessage: "Upload Cupboard 2 files here",
    paramName: 'cupboard2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_cupboard2').hide();
        toastr["success"]('CUPBOARD 2 files uploaded.', "Success");
      })
    },
  });

  //cupboard3 ESH Upload
  $('#dropzone_esh_cupboard3').dropzone({
    dictDefaultMessage: "Upload Cupboard 3 files here",
    paramName: 'cupboard3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_cupboard3').hide();
        toastr["success"]('CUPBOARD 3 files uploaded.', "Success");
      })
    },
  });

  //cupboard4 ESH Upload
  $('#dropzone_esh_cupboard4').dropzone({
    dictDefaultMessage: "Upload Cupboard 4 files here",
    paramName: 'cupboard4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_cupboard4').hide();
        toastr["success"]('CUPBOARD 4 files uploaded.', "Success");
      })
    },
  });

  //cupboard5 ESH Upload
  $('#dropzone_esh_cupboard5').dropzone({
    dictDefaultMessage: "Upload Cupboard 5 files here",
    paramName: 'cupboard5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_cupboard5').hide();
        toastr["success"]('CUPBOARD 5 files uploaded.', "Success");
      })
    },
  });

  //Conservatory ESH Upload
  $('#dropzone_esh_conservatory').dropzone({
    dictDefaultMessage: "Upload Conservatory files here",
    paramName: 'conservatory',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_conservatory').hide();
        toastr["success"]('CONSERVATORY files uploaded.', "Success");
      })
    },
  });

  //stairs1 ESH Upload
  $('#dropzone_esh_stairs1').dropzone({
    dictDefaultMessage: "Upload Stairs 1 files here",
    paramName: 'stairs1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_stairs1').hide();
        toastr["success"]('STAIRS 1 files uploaded.', "Success");
      })
    },
  });

  //stairs2 ESH Upload
  $('#dropzone_esh_stairs2').dropzone({
    dictDefaultMessage: "Upload Stairs 2 files here",
    paramName: 'stairs2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_stairs2').hide();
        toastr["success"]('STAIRS 2 files uploaded.', "Success");
      })
    },
  });

  //stairs3 ESH Upload
  $('#dropzone_esh_stairs3').dropzone({
    dictDefaultMessage: "Upload Stairs 3 files here",
    paramName: 'stairs3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_stairs3').hide();
        toastr["success"]('STAIRS 3 files uploaded.', "Success");
      })
    },
  });

    //garage1 ESH Upload
  $('#dropzone_esh_garage1').dropzone({
    dictDefaultMessage: "Upload Garage 1 files here",
    paramName: 'garage1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_garage1').hide();
        toastr["success"]('GARAGE 1 files uploaded.', "Success");
      })
    },
  });

  //garage2 ESH Upload
  $('#dropzone_esh_garage2').dropzone({
    dictDefaultMessage: "Upload Garage 2 files here",
    paramName: 'garage2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_garage2').hide();
        toastr["success"]('GARAGE 2 files uploaded.', "Success");
      })
    },
  });

//wall_thickness1 ESH Upload
  $('#dropzone_esh_wall_thickness1').dropzone({
    dictDefaultMessage: "Upload Wall Thickness 1 files here",
    paramName: 'wall_thickness1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_wall_thickness1').hide();
        toastr["success"]('WALL THICKNESS 1 files uploaded.', "Success");
      })
    },
  });

  //wall_thickness2 ESH Upload
  $('#dropzone_esh_wall_thickness2').dropzone({
    dictDefaultMessage: "Upload Wall Thickness 2 files here",
    paramName: 'wall_thickness2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_wall_thickness2').hide();
        toastr["success"]('WALL THICKNESS 2 files uploaded.', "Success");
      })
    },
  });

  //wall_thickness3 ESH Upload
  $('#dropzone_esh_wall_thickness3').dropzone({
    dictDefaultMessage: "Upload Wall Thickness 3 files here",
    paramName: 'wall_thickness3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_wall_thickness3').hide();
        toastr["success"]('WALL THICKNESS 3 files uploaded.', "Success");
      })
    },
  });

  //wall_thickness4 ESH Upload
  $('#dropzone_esh_wall_thickness4').dropzone({
    dictDefaultMessage: "Upload Wall Thickness 4 files here",
    paramName: 'wall_thickness4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_wall_thickness4').hide();
        toastr["success"]('WALL THICKNESS 4 files uploaded.', "Success");
      })
    },
  });

  //wall_thickness5 ESH Upload
  $('#dropzone_esh_wall_thickness5').dropzone({
    dictDefaultMessage: "Upload Wall Thickness 5 files here",
    paramName: 'wall_thickness5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_wall_thickness5').hide();
        toastr["success"]('WALL THICKNESS 5 files uploaded.', "Success");
      })
    },
  });

    //fused_spur1 ESH Upload
  $('#dropzone_esh_fused_spur1').dropzone({
    dictDefaultMessage: "Upload Fused Spur 1 files here",
    paramName: 'fused_spur1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_fused_spur1').hide();
        toastr["success"]('FUSED SPUR 1 files uploaded.', "Success");
      })
    },
  });

  //fused_spur2 ESH Upload
  $('#dropzone_esh_fused_spur2').dropzone({
    dictDefaultMessage: "Upload Fused Spur 2 files here",
    paramName: 'fused_spur2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_fused_spur2').hide();
        toastr["success"]('FUSED SPUR 2 files uploaded.', "Success");
      })
    },
  });

  //fused_spur3 ESH Upload
  $('#dropzone_esh_fused_spur3').dropzone({
    dictDefaultMessage: "Upload Fused Spur 3 files here",
    paramName: 'fused_spur3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_fused_spur3').hide();
        toastr["success"]('FUSED SPUR 3 files uploaded.', "Success");
      })
    },
  });

    //room_stat1 ESH Upload
  $('#dropzone_esh_room_stat1').dropzone({
    dictDefaultMessage: "Upload Room Stat 1 files here",
    paramName: 'room_stat1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_room_stat1').hide();
        toastr["success"]('ROOM STAT 1 files uploaded.', "Success");
      })
    },
  });

  //room_stat2 ESH Upload
  $('#dropzone_esh_room_stat2').dropzone({
    dictDefaultMessage: "Upload Room Stat 2 files here",
    paramName: 'room_stat2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_room_stat2').hide();
        toastr["success"]('ROOM STAT 2 files uploaded.', "Success");
      })
    },
  });

  //room_stat3 ESH Upload
  $('#dropzone_esh_room_stat3').dropzone({
    dictDefaultMessage: "Upload Room Stat 3 files here",
    paramName: 'room_stat3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_room_stat3').hide();
        toastr["success"]('ROOM STAT 3 files uploaded.', "Success");
      })
    },
  });

    //programmer1 ESH Upload
  $('#dropzone_esh_programmer1').dropzone({
    dictDefaultMessage: "Upload Programmer 1 files here",
    paramName: 'programmer1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_programmer1').hide();
        toastr["success"]('PROGRAMMER 1 files uploaded.', "Success");
      })
    },
  });

  //programmer2 ESH Upload
  $('#dropzone_esh_programmer2').dropzone({
    dictDefaultMessage: "Upload Programmer 2 files here",
    paramName: 'programmer2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_programmer2').hide();
        toastr["success"]('PROGRAMMER 2 files uploaded.', "Success");
      })
    },
  });

  //programmer3 ESH Upload
  $('#dropzone_esh_programmer3').dropzone({
    dictDefaultMessage: "Upload Programmer 3 files here",
    paramName: 'programmer3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_esh_programmer3').hide();
        toastr["success"]('PROGRAMMER 3 files uploaded.', "Success");
      })
    },
  });

    //Pibi BOILER Upload
  $('#dropzone_boiler_pibi').dropzone({
    paramName: 'pibi',
    dictDefaultMessage: "Upload PIBI files here",
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> PIBI</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_boiler_pibi').hide();
        toastr["success"]('PIBI files uploaded.', "Success");
      })
    },
  });

  //PICS BOILER Upload
  $('#dropzone_boiler_pics').dropzone({
    dictDefaultMessage: "Upload PICS files here",
    paramName: 'pics',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> PICS</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_boiler_pics').hide();
        toastr["success"]('PICS files uploaded.', "Success");
      })
    },
  });

  //PICA BOILER Upload
  $('#dropzone_boiler_pica').dropzone({
    dictDefaultMessage: "Upload PICA files here",
    paramName: 'pica',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> PICA</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_boiler_pica').hide();
        toastr["success"]('PICA files uploaded.', "Success");
      })
    },
  });

  //EOOC BOILER Upload
  $('#dropzone_boiler_eooc').dropzone({
    dictDefaultMessage: "Upload EOOC files here",
    paramName: 'eooc',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> EOOC</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_boiler_eooc').hide();
        toastr["success"]('EOOC files uploaded.', "Success");
      })
    },
  });

  //Land Registry BOILER Upload
  $('#dropzone_boiler_land_registry').dropzone({
    dictDefaultMessage: "Upload LAND REGISTRY files here",
    paramName: 'land_registry',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LAND REGISTRY</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_boiler_land_registry').hide();
        toastr["success"]('LAND REGISTRY files uploaded.', "Success");
      })
    },
  });

  //Ubil BOILER Upload
  $('#dropzone_boiler_ubil').dropzone({
    dictDefaultMessage: "Upload UBIL files here",
    paramName: 'ubil',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> UBIL</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_boiler_ubil').hide();
        toastr["success"]('UBIL files uploaded.', "Success");
      })
    },
  });

  //DWP BOILER Upload
  $('#dropzone_boiler_dwp').dropzone({
    dictDefaultMessage: "Upload DWP MATCH CONFIRMATION files here",
    paramName: 'dwp',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> DWP</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_boiler_ubil').hide();
        toastr["success"]('DWP files uploaded.', "Success");
      })
    },
  });

  //ENGINEER SIGNATURE BOILER Upload
  $('#dropzone_boiler_eng_sig').dropzone({
    dictDefaultMessage: "Upload ENGINEER SIGNATURE files here",
    paramName: 'eng_sig',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> ENGINEER SIGNATURE</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_boiler_eng_sig').hide();
        toastr["success"]('ENGINEER SIGNATURE files uploaded.', "Success");
      })
    },
  });

  //CUSTOMER SIGNATURE BOILER Upload
  $('#dropzone_boiler_cus_sig').dropzone({
    dictDefaultMessage: "Upload CUSTOMER SIGNATURE files here",
    paramName: 'cus_sig',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> CUSTOMER SIGNATURE</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_boiler_cus_sig').hide();
        toastr["success"]('CUSTOMER SIGNATURE files uploaded.', "Success");
      })
    },
  });

  //BOILER MANUFACTURE GUARANTEE BOILER Upload
  $('#dropzone_boiler_boiler_manufacture').dropzone({
    dictDefaultMessage: "Upload BOILER MANUFACTURE GUARANTEE files here",
    paramName: 'boiler_manufacture',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> BOILER MANUFACTURE GUARANTEE</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_boiler_boiler_manufacture').hide();
        toastr["success"]('BOILER MANUFACTURE GUARANTEE files uploaded.', "Success");
      })
    },
  });

  //PPES BOILER Upload
  $('#dropzone_boiler_ppes').dropzone({
    dictDefaultMessage: "Upload PPES files here",
    paramName: 'ppes',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> PPES</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_boiler_ppes').hide();
        toastr["success"]('PPES files uploaded.', "Success");
      })
    },
  });

  //BACL B BOILER Upload
  $('#dropzone_boiler_bacl_b').dropzone({
    dictDefaultMessage: "Upload BACL B files here",
    paramName: 'bacl_b',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> BACL B</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_boiler_bacl_b').hide();
        toastr["success"]('BACL_B files uploaded.', "Success");
      })
    },
  });

  //PASC BOILER Upload
  $('#dropzone_boiler_pasc').dropzone({
    dictDefaultMessage: "Upload PASC files here",
    paramName: 'pasc',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> PASC</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_boiler_pasc').hide();
        toastr["success"]('PASC files uploaded.', "Success");
      })
    },
  });

  //FLOOR PLAN BOILER Upload
  $('#dropzone_boiler_floor_plan').dropzone({
    dictDefaultMessage: "Upload FLOOR PLAN files here",
    paramName: 'floor_plan',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> FLOOR PLAN</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_boiler_floor_plan').hide();
        toastr["success"]('FLOOR PLAN files uploaded.', "Success");
      })
    },
  });

  //NO TAG PRE BOILER BOILER Upload
  $('#dropzone_boiler_tag').dropzone({
    dictDefaultMessage: "Upload NO TAG PRE BOILER files here",
    paramName: 'tag',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> NO TAG PRE BOILER</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_boiler_tag').hide();
        toastr["success"]('NO TAG PRE BOILER files uploaded.', "Success");
      })
    },
  });

  //PCDB A BOILER Upload
  $('#dropzone_boiler_pcdb_a').dropzone({
    dictDefaultMessage: "Upload PCDB A files here",
    paramName: 'pcdb_a',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> PCDB A</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_boiler_pcdb_a').hide();
        toastr["success"]('PCDB A files uploaded.', "Success");
      })
    },
  });

  //BACL_C AND BACL_D (COST OF REPAIR AND REPLACEMENT) BOILER Upload
  $('#dropzone_boiler_crr').dropzone({
    dictDefaultMessage: "Upload BACL_C AND BACL_D (COST OF REPAIR AND REPLACEMENT) files here",
    paramName: 'crr',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> BACL_C AND BACL_D (COST OF REPAIR AND REPLACEMENT)</li>');
        $('#dropzone_boiler_crr').hide();
        $('.success_list').load(document.URL + ' .success_list');
        toastr["success"]('BACL_C AND BACL_D (COST OF REPAIR AND REPLACEMENT) files uploaded.', "Success");
      })
    },
  });

  //BCOM BOILER Upload
  $('#dropzone_boiler_bcom').dropzone({
    dictDefaultMessage: "Upload BCOM files here",
    paramName: 'bcom',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> BCOM</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_boiler_bcom').hide();
        toastr["success"]('BCOM files uploaded.', "Success");
      })
    },
  });

  //GASE FORM(HTSC) BOILER Upload
  $('#dropzone_boiler_gase').dropzone({
    dictDefaultMessage: "Upload GASE FORM(HTSC) files here",
    paramName: 'gase',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> GASE FORM(HTSC)</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_boiler_gase').hide();
        toastr["success"]('GASE files uploaded.', "Success");
      })
    },
  });

  //CD10 BOILER Upload
  $('#dropzone_boiler_cd10').dropzone({
    dictDefaultMessage: "Upload CD10 files here",
    paramName: 'cd10',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> CD10</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_boiler_cd10').hide();
        toastr["success"]('CD10 files uploaded.', "Success");
      })
    },
  });

  //CD11 BOILER Upload
  $('#dropzone_boiler_cd11').dropzone({
    dictDefaultMessage: "Upload CD11 files here",
    paramName: 'cd11',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> CD11</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_boiler_cd11').hide();
        toastr["success"]('CD11 files uploaded.', "Success");
      })
    },
  });

  //TENANCY AGREEMENT BOILER Upload
  $('#dropzone_boiler_tenancy').dropzone({
    dictDefaultMessage: "Upload TENANCY AGREEMENT files here",
    paramName: 'tenancy',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> TENANCY AGREEMENT</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_boiler_tenancy').hide();
        toastr["success"]('TENANCY AGREEMENT files uploaded.', "Success");
      })
    },
  });

  //LANDLORD PERMISSION BOILER Upload
  $('#dropzone_boiler_landlord').dropzone({
    dictDefaultMessage: "Upload LANDLORD PERMISSION files here",
    paramName: 'landlord',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_boiler_landlord').hide();
        toastr["success"]('LANDLORD PERMISSION files uploaded.', "Success");
      })
    },
  });

  //Bedroom1 BOILER Upload
  $('#dropzone_boiler_bedroom1').dropzone({
    dictDefaultMessage: "Upload BEDROOM 1 files here",
    paramName: 'bedroom1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_bedroom1').hide();
        toastr["success"]('BEDROOM 1 files uploaded.', "Success");
      })
    },
  });

  //Bedroom2 BOILER Upload
  $('#dropzone_boiler_bedroom2').dropzone({
    dictDefaultMessage: "Upload BEDROOM 2 files here",
    paramName: 'bedroom2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_bedroom2').hide();
        toastr["success"]('BEDROOM 2 files uploaded.', "Success");
      })
    },
  });

  //Bedroom3 BOILER Upload
  $('#dropzone_boiler_bedroom3').dropzone({
    dictDefaultMessage: "Upload BEDROOM 3 files here",
    paramName: 'bedroom3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_bedroom3').hide();
        toastr["success"]('BEDROOM 3 files uploaded.', "Success");
      })
    },
  });

  //Bedroom4 BOILER Upload
  $('#dropzone_boiler_bedroom4').dropzone({
    dictDefaultMessage: "Upload BEDROOM 4 files here",
    paramName: 'bedroom4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_bedroom4').hide();
        toastr["success"]('BEDROOM 4 files uploaded.', "Success");
      })
    },
  });

  //Bedroom2 BOILER Upload
  $('#dropzone_boiler_bedroom5').dropzone({
    dictDefaultMessage: "Upload BEDROOM 5 files here",
    paramName: 'bedroom5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_bedroom5').hide();
        toastr["success"]('BEDROOM 5 files uploaded.', "Success");
      })
    },
  });

  //Kitchen1 BOILER Upload
  $('#dropzone_boiler_kitchen1').dropzone({
    dictDefaultMessage: "Upload Kitchen 1 files here",
    paramName: 'kitchen1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_kitchen1').hide();
        toastr["success"]('KITCHEN 1 files uploaded.', "Success");
      })
    },
  });

  //Kitchen2 BOILER Upload
  $('#dropzone_boiler_kitchen2').dropzone({
    dictDefaultMessage: "Upload Kitchen 2 files here",
    paramName: 'kitchen2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_kitchen2').hide();
        toastr["success"]('KITCHEN 2 files uploaded.', "Success");
      })
    },
  });

  //Dining1 BOILER Upload
  $('#dropzone_boiler_dining_room1').dropzone({
    dictDefaultMessage: "Upload Dining Room 1 files here",
    paramName: 'dining_room1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_dining_room1').hide();
        toastr["success"]('DINING ROOM 1 files uploaded.', "Success");
      })
    },
  });

  //Dining2 BOILER Upload
  $('#dropzone_boiler_dining_room2').dropzone({
    dictDefaultMessage: "Upload Dining Room 2 files here",
    paramName: 'dining_room2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_dining_room2').hide();
        toastr["success"]('DINING ROOM 2 files uploaded.', "Success");
      })
    },
  });

  //Living1 BOILER Upload
  $('#dropzone_boiler_living_room1').dropzone({
    dictDefaultMessage: "Upload Living Room 1 files here",
    paramName: 'living_room1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_living_room1').hide();
        toastr["success"]('LIVING ROOM 1 files uploaded.', "Success");
      })
    },
  });

  //Living2 BOILER Upload
  $('#dropzone_boiler_living_room2').dropzone({
    dictDefaultMessage: "Upload Living Room 2 files here",
    paramName: 'living_room2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_living_room2').hide();
        toastr["success"]('LIVING ROOM 2 files uploaded.', "Success");
      })
    },
  });

  //Hallway1 BOILER Upload
  $('#dropzone_boiler_hallway1').dropzone({
    dictDefaultMessage: "Upload Hallway 1 files here",
    paramName: 'hallway1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_hallway1').hide();
        toastr["success"]('HALLWAY 1 files uploaded.', "Success");
      })
    },
  });

  //Hallway2 BOILER Upload
  $('#dropzone_boiler_hallway2').dropzone({
    dictDefaultMessage: "Upload Hallway 2 files here",
    paramName: 'hallway2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_hallway2').hide();
        toastr["success"]('HALLWAY 2 files uploaded.', "Success");
      })
    },
  });

  //Hallway3 BOILER Upload
  $('#dropzone_boiler_hallway3').dropzone({
    dictDefaultMessage: "Upload Hallway 3 files here",
    paramName: 'hallway3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_hallway3').hide();
        toastr["success"]('HALLWAY 3 files uploaded.', "Success");
      })
    },
  });

  //Hallway4 BOILER Upload
  $('#dropzone_boiler_hallway4').dropzone({
    dictDefaultMessage: "Upload Hallway 4 files here",
    paramName: 'hallway4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_hallway4').hide();
        toastr["success"]('HALLWAY 4 files uploaded.', "Success");
      })
    },
  });

  //Hallway5 BOILER Upload
  $('#dropzone_boiler_hallway5').dropzone({
    dictDefaultMessage: "Upload Hallway 5 files here",
    paramName: 'hallway5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_hallway5').hide();
        toastr["success"]('HALLWAY 5 files uploaded.', "Success");
      })
    },
  });

  //Landing1 BOILER Upload
  $('#dropzone_boiler_landing1').dropzone({
    dictDefaultMessage: "Upload Landing 1 files here",
    paramName: 'landing1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_landing1').hide();
        toastr["success"]('LANDING 1 files uploaded.', "Success");
      })
    },
  });

  //Landing2 BOILER Upload
  $('#dropzone_boiler_landing2').dropzone({
    dictDefaultMessage: "Upload Landing 2 files here",
    paramName: 'landing2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_landing2').hide();
        toastr["success"]('LANDING 2 files uploaded.', "Success");
      })
    },
  });

  //Landing3 BOILER Upload
  $('#dropzone_boiler_landing3').dropzone({
    dictDefaultMessage: "Upload Landing 3 files here",
    paramName: 'landing3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_landing3').hide();
        toastr["success"]('LANDING 3 files uploaded.', "Success");
      })
    },
  });

  //Landing4 BOILER Upload
  $('#dropzone_boiler_landing4').dropzone({
    dictDefaultMessage: "Upload Landing 4 files here",
    paramName: 'landing4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_landing4').hide();
        toastr["success"]('LANDING 4 files uploaded.', "Success");
      })
    },
  });

  //Landing5 BOILER Upload
  $('#dropzone_boiler_landing5').dropzone({
    dictDefaultMessage: "Upload Landing 5 files here",
    paramName: 'landing5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_landing5').hide();
        toastr["success"]('LANDING 5 files uploaded.', "Success");
      })
    },
  });

  //Front Elevation BOILER Upload
  $('#dropzone_boiler_fort_elevation').dropzone({
    dictDefaultMessage: "Upload Front Elevation files here",
    paramName: 'fort_elevation',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_fort_elevation').hide();
        toastr["success"]('Front Elevation files uploaded.', "Success");
      })
    },
  });

  //Side Elevation BOILER Upload
  $('#dropzone_boiler_side_elevation1').dropzone({
    dictDefaultMessage: "Upload Side Elevation 1 files here",
    paramName: 'side_elevation1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_side_elevation1').hide();
        toastr["success"]('SIDE ELEVATION 1 files uploaded.', "Success");
      })
    },
  });

  //Side Elevation BOILER Upload
  $('#dropzone_boiler_side_elevation2').dropzone({
    dictDefaultMessage: "Upload Side Elevation 2 files here",
    paramName: 'side_elevation2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_side_elevation2').hide();
        toastr["success"]('SIDE ELEVATION 2 files uploaded.', "Success");
      })
    },
  });

  //Rear Elevation BOILER Upload
  $('#dropzone_boiler_rear_elevation').dropzone({
    dictDefaultMessage: "Upload Rear Elevation files here",
    paramName: 'rear_elevation',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_rear_elevation').hide();
        toastr["success"]('REAR ELEVATION files uploaded.', "Success");
      })
    },
  });

  //Water Closet 1 BOILER Upload
  $('#dropzone_boiler_water_closet1').dropzone({
    dictDefaultMessage: "Upload Water Closet 1 files here",
    paramName: 'water_closet1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_water_closet1').hide();
        toastr["success"]('WATER CLOSET 1 files uploaded.', "Success");
      })
    },
  });

  //Water Closet 2 BOILER Upload
  $('#dropzone_boiler_water_closet2').dropzone({
    dictDefaultMessage: "Upload Water Closet 2 files here",
    paramName: 'water_closet2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_water_closet2').hide();
        toastr["success"]('WATER CLOSET 2 files uploaded.', "Success");
      })
    },
  });

  //Water Closet 3 BOILER Upload
  $('#dropzone_boiler_water_closet3').dropzone({
    dictDefaultMessage: "Upload Water Closet 3 files here",
    paramName: 'water_closet3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_water_closet3').hide();
        toastr["success"]('WATER CLOSET 3 files uploaded.', "Success");
      })
    },
  });

  //Water Closet 4 BOILER Upload
  $('#dropzone_boiler_water_closet4').dropzone({
    dictDefaultMessage: "Upload Water Closet 4 files here",
    paramName: 'water_closet4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_water_closet4').hide();
        toastr["success"]('WATER CLOSET 4 files uploaded.', "Success");
      })
    },
  });

  //Water Closet 5 BOILER Upload
  $('#dropzone_boiler_water_closet5').dropzone({
    dictDefaultMessage: "Upload Water Closet 5 files here",
    paramName: 'water_closet5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_water_closet5').hide();
        toastr["success"]('WATER CLOSET 5 files uploaded.', "Success");
      })
    },
  });

  //Utility BOILER Upload
  $('#dropzone_boiler_utility').dropzone({
    dictDefaultMessage: "Upload Utility files here",
    paramName: 'utility',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_utility').hide();
        toastr["success"]('UTILITY files uploaded.', "Success");
      })
    },
  });

  //Lounge 1 BOILER Upload
  $('#dropzone_boiler_lounge1').dropzone({
    dictDefaultMessage: "Upload Lounge 1 files here",
    paramName: 'lounge1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_lounge1').hide();
        toastr["success"]('LOUNGE 1 files uploaded.', "Success");
      })
    },
  });

  //Lounge 2 BOILER Upload
  $('#dropzone_boiler_lounge2').dropzone({
    dictDefaultMessage: "Upload Lounge 2 files here",
    paramName: 'lounge2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_lounge2').hide();
        toastr["success"]('LOUNGE 2 files uploaded.', "Success");
      })
    },
  });

  //Lounge 3 BOILER Upload
  $('#dropzone_boiler_lounge3').dropzone({
    dictDefaultMessage: "Upload Lounge 3 files here",
    paramName: 'lounge3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_lounge3').hide();
        toastr["success"]('LOUNGE 3 files uploaded.', "Success");
      })
    },
  });

  //bathroom1 BOILER Upload
  $('#dropzone_boiler_bathroom1').dropzone({
    dictDefaultMessage: "Upload Bathroom 1 files here",
    paramName: 'bathroom1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_bathroom1').hide();
        toastr["success"]('BATHROOM 1 files uploaded.', "Success");
      })
    },
  });

  //bathroom2 BOILER Upload
  $('#dropzone_boiler_bathroom2').dropzone({
    dictDefaultMessage: "Upload Bathroom 2 files here",
    paramName: 'bathroom2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_bathroom2').hide();
        toastr["success"]('BATHROOM 2 files uploaded.', "Success");
      })
    },
  });

  //bathroom3 BOILER Upload
  $('#dropzone_boiler_bathroom3').dropzone({
    dictDefaultMessage: "Upload Bathroom 3 files here",
    paramName: 'bathroom3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_bathroom3').hide();
        toastr["success"]('BATHROOM 3 files uploaded.', "Success");
      })
    },
  });

  //bathroom4 BOILER Upload
  $('#dropzone_boiler_bathroom4').dropzone({
    dictDefaultMessage: "Upload Bathroom 4 files here",
    paramName: 'bathroom4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_bathroom4').hide();
        toastr["success"]('BATHROOM 4 files uploaded.', "Success");
      })
    },
  });

  //bathroom5 BOILER Upload
  $('#dropzone_boiler_bathroom5').dropzone({
    dictDefaultMessage: "Upload Bathroom 5 files here",
    paramName: 'bathroom5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_bathroom5').hide();
        toastr["success"]('BATHROOM 5 files uploaded.', "Success");
      })
    },
  });

    //cupboard1 BOILER Upload
  $('#dropzone_boiler_cupboard1').dropzone({
    dictDefaultMessage: "Upload Cupboard 1 files here",
    paramName: 'cupboard1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_cupboard1').hide();
        toastr["success"]('CUPBOARD 1 files uploaded.', "Success");
      })
    },
  });

  //cupboard2 BOILER Upload
  $('#dropzone_boiler_cupboard2').dropzone({
    dictDefaultMessage: "Upload Cupboard 2 files here",
    paramName: 'cupboard2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_cupboard2').hide();
        toastr["success"]('CUPBOARD 2 files uploaded.', "Success");
      })
    },
  });

  //cupboard3 BOILER Upload
  $('#dropzone_boiler_cupboard3').dropzone({
    dictDefaultMessage: "Upload Cupboard 3 files here",
    paramName: 'cupboard3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_cupboard3').hide();
        toastr["success"]('CUPBOARD 3 files uploaded.', "Success");
      })
    },
  });

  //cupboard4 BOILER Upload
  $('#dropzone_boiler_cupboard4').dropzone({
    dictDefaultMessage: "Upload Cupboard 4 files here",
    paramName: 'cupboard4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_cupboard4').hide();
        toastr["success"]('CUPBOARD 4 files uploaded.', "Success");
      })
    },
  });

  //cupboard5 BOILER Upload
  $('#dropzone_boiler_cupboard5').dropzone({
    dictDefaultMessage: "Upload Cupboard 5 files here",
    paramName: 'cupboard5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_cupboard5').hide();
        toastr["success"]('CUPBOARD 5 files uploaded.', "Success");
      })
    },
  });

  //Conservatory BOILER Upload
  $('#dropzone_boiler_conservatory').dropzone({
    dictDefaultMessage: "Upload Conservatory files here",
    paramName: 'conservatory',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_conservatory').hide();
        toastr["success"]('CONSERVATORY files uploaded.', "Success");
      })
    },
  });

  //stairs1 BOILER Upload
  $('#dropzone_boiler_stairs1').dropzone({
    dictDefaultMessage: "Upload Stairs 1 files here",
    paramName: 'stairs1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_stairs1').hide();
        toastr["success"]('STAIRS 1 files uploaded.', "Success");
      })
    },
  });

  //stairs2 BOILER Upload
  $('#dropzone_boiler_stairs2').dropzone({
    dictDefaultMessage: "Upload Stairs 2 files here",
    paramName: 'stairs2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_stairs2').hide();
        toastr["success"]('STAIRS 2 files uploaded.', "Success");
      })
    },
  });

  //stairs3 BOILER Upload
  $('#dropzone_boiler_stairs3').dropzone({
    dictDefaultMessage: "Upload Stairs 3 files here",
    paramName: 'stairs3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_stairs3').hide();
        toastr["success"]('STAIRS 3 files uploaded.', "Success");
      })
    },
  });

    //garage1 BOILER Upload
  $('#dropzone_boiler_garage1').dropzone({
    dictDefaultMessage: "Upload Garage 1 files here",
    paramName: 'garage1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_garage1').hide();
        toastr["success"]('GARAGE 1 files uploaded.', "Success");
      })
    },
  });

  //garage2 BOILER Upload
  $('#dropzone_boiler_garage2').dropzone({
    dictDefaultMessage: "Upload Garage 2 files here",
    paramName: 'garage2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_garage2').hide();
        toastr["success"]('GARAGE 2 files uploaded.', "Success");
      })
    },
  });

//wall_thickness1 BOILER Upload
  $('#dropzone_boiler_wall_thickness1').dropzone({
    dictDefaultMessage: "Upload Wall Thickness 1 files here",
    paramName: 'wall_thickness1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_wall_thickness1').hide();
        toastr["success"]('WALL THICKNESS 1 files uploaded.', "Success");
      })
    },
  });

  //wall_thickness2 BOILER Upload
  $('#dropzone_boiler_wall_thickness2').dropzone({
    dictDefaultMessage: "Upload Wall Thickness 2 files here",
    paramName: 'wall_thickness2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_wall_thickness2').hide();
        toastr["success"]('WALL THICKNESS 2 files uploaded.', "Success");
      })
    },
  });

  //wall_thickness3 BOILER Upload
  $('#dropzone_boiler_wall_thickness3').dropzone({
    dictDefaultMessage: "Upload Wall Thickness 3 files here",
    paramName: 'wall_thickness3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_wall_thickness3').hide();
        toastr["success"]('WALL THICKNESS 3 files uploaded.', "Success");
      })
    },
  });

  //wall_thickness4 BOILER Upload
  $('#dropzone_boiler_wall_thickness4').dropzone({
    dictDefaultMessage: "Upload Wall Thickness 4 files here",
    paramName: 'wall_thickness4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_wall_thickness4').hide();
        toastr["success"]('WALL THICKNESS 4 files uploaded.', "Success");
      })
    },
  });

  //wall_thickness5 BOILER Upload
  $('#dropzone_boiler_wall_thickness5').dropzone({
    dictDefaultMessage: "Upload Wall Thickness 5 files here",
    paramName: 'wall_thickness5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_wall_thickness5').hide();
        toastr["success"]('WALL THICKNESS 5 files uploaded.', "Success");
      })
    },
  });

    //fused_spur1 BOILER Upload
  $('#dropzone_boiler_fused_spur1').dropzone({
    dictDefaultMessage: "Upload Fused Spur 1 files here",
    paramName: 'fused_spur1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_fused_spur1').hide();
        toastr["success"]('FUSED SPUR 1 files uploaded.', "Success");
      })
    },
  });

  //fused_spur2 BOILER Upload
  $('#dropzone_boiler_fused_spur2').dropzone({
    dictDefaultMessage: "Upload Fused Spur 2 files here",
    paramName: 'fused_spur2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_fused_spur2').hide();
        toastr["success"]('FUSED SPUR 2 files uploaded.', "Success");
      })
    },
  });

  //fused_spur3 BOILER Upload
  $('#dropzone_boiler_fused_spur3').dropzone({
    dictDefaultMessage: "Upload Fused Spur 3 files here",
    paramName: 'fused_spur3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_fused_spur3').hide();
        toastr["success"]('FUSED SPUR 3 files uploaded.', "Success");
      })
    },
  });

    //room_stat1 BOILER Upload
  $('#dropzone_boiler_room_stat1').dropzone({
    dictDefaultMessage: "Upload Room Stat 1 files here",
    paramName: 'room_stat1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_room_stat1').hide();
        toastr["success"]('ROOM STAT 1 files uploaded.', "Success");
      })
    },
  });

  //room_stat2 BOILER Upload
  $('#dropzone_boiler_room_stat2').dropzone({
    dictDefaultMessage: "Upload Room Stat 2 files here",
    paramName: 'room_stat2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_room_stat2').hide();
        toastr["success"]('ROOM STAT 2 files uploaded.', "Success");
      })
    },
  });

  //room_stat3 BOILER Upload
  $('#dropzone_boiler_room_stat3').dropzone({
    dictDefaultMessage: "Upload Room Stat 3 files here",
    paramName: 'room_stat3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_room_stat3').hide();
        toastr["success"]('ROOM STAT 3 files uploaded.', "Success");
      })
    },
  });

    //programmer1 BOILER Upload
  $('#dropzone_boiler_programmer1').dropzone({
    dictDefaultMessage: "Upload Programmer 1 files here",
    paramName: 'programmer1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_programmer1').hide();
        toastr["success"]('PROGRAMMER 1 files uploaded.', "Success");
      })
    },
  });

  //programmer2 BOILER Upload
  $('#dropzone_boiler_programmer2').dropzone({
    dictDefaultMessage: "Upload Programmer 2 files here",
    paramName: 'programmer2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_programmer2').hide();
        toastr["success"]('PROGRAMMER 2 files uploaded.', "Success");
      })
    },
  });

  //programmer3 BOILER Upload
  $('#dropzone_boiler_programmer3').dropzone({
    dictDefaultMessage: "Upload Programmer 3 files here",
    paramName: 'programmer3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_boiler_programmer3').hide();
        toastr["success"]('PROGRAMMER 3 files uploaded.', "Success");
      })
    },
  });

      //Pibi CAVITY Upload
  $('#dropzone_cavity_efgm').dropzone({
    paramName: 'efgm',
    dictDefaultMessage: "Upload EFGM files here",
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> EFGM</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_cavity_efgm').hide();
        toastr["success"]('EFGM files uploaded.', "Success");
      })
    },
  });

  //Pibi CAVITY Upload
  $('#dropzone_cavity_pree').dropzone({
    paramName: 'pree',
    dictDefaultMessage: "Upload PREE files here",
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> PREE</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_cavity_pree').hide();
        toastr["success"]('PREE files uploaded.', "Success");
      })
    },
  });

  //PSTE CAVITY Upload
  $('#dropzone_cavity_pste').dropzone({
    paramName: 'pste',
    dictDefaultMessage: "Upload PSTE files here",
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> PSTE</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_cavity_pste').hide();
        toastr["success"]('PSTE files uploaded.', "Success");
      })
    },
  });

  //STNS CAVITY Upload
  $('#dropzone_cavity_stns').dropzone({
    paramName: 'stns',
    dictDefaultMessage: "Upload STNS files here",
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> STNS</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_cavity_stns').hide();
        toastr["success"]('STNS files uploaded.', "Success");
      })
    },
  });

  //PHHS CAVITY Upload
  $('#dropzone_cavity_phhs').dropzone({
    paramName: 'phhs',
    dictDefaultMessage: "Upload PHHS files here",
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> PHHS</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_cavity_phhs').hide();
        toastr["success"]('PHHS files uploaded.', "Success");
      })
    },
  });

  //CWSA CAVITY Upload
  $('#dropzone_cavity_cwsa').dropzone({
    paramName: 'cwsa',
    dictDefaultMessage: "Upload CWSA files here",
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> CWSA</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_cavity_cwsa').hide();
        toastr["success"]('CWSA files uploaded.', "Success");
      })
    },
  });

  //PIBI CAVITY Upload
  $('#dropzone_cavity_pibi').dropzone({
    paramName: 'pibi',
    dictDefaultMessage: "Upload PIBI files here",
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> PIBI</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_cavity_pibi').hide();
        toastr["success"]('PIBI files uploaded.', "Success");
      })
    },
  });

  //DSSY_A CAVITY Upload
  $('#dropzone_cavity_dssy_a').dropzone({
    dictDefaultMessage: "Upload DSSY_A files here",
    paramName: 'dssy_a',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> DSSY A</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_cavity_dssy_a').hide();
        toastr["success"]('DSSY_A files uploaded.', "Success");
      })
    },
  });

  //DSSY_C CAVITY Upload
  $('#dropzone_cavity_dssy_c').dropzone({
    dictDefaultMessage: "Upload DSSY_C files here",
    paramName: 'dssy_c',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> DSSY C</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_cavity_dssy_c').hide();
        toastr["success"]('DSSY_C files uploaded.', "Success");
      })
    },
  });

  //PICP CAVITY Upload
  $('#dropzone_cavity_picp').dropzone({
    dictDefaultMessage: "Upload PICP files here",
    paramName: 'picp',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> PICP</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_cavity_picp').hide();
        toastr["success"]('PICP files uploaded.', "Success");
      })
    },
  });

  //PICA CAVITY Upload
  $('#dropzone_cavity_pica').dropzone({
    dictDefaultMessage: "Upload PICA files here",
    paramName: 'pica',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> PICA</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_cavity_pica').hide();
        toastr["success"]('PICA files uploaded.', "Success");
      })
    },
  });

  //EOOC CAVITY Upload
  $('#dropzone_cavity_eooc').dropzone({
    dictDefaultMessage: "Upload EOOC files here",
    paramName: 'eooc',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> EOOC</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_cavity_eooc').hide();
        toastr["success"]('EOOC files uploaded.', "Success");
      })
    },
  });

  //Land Registry CAVITY Upload
  $('#dropzone_cavity_land_registry').dropzone({
    dictDefaultMessage: "Upload LAND REGISTRY files here",
    paramName: 'land_registry',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LAND REGISTRY</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_cavity_land_registry').hide();
        toastr["success"]('LAND REGISTRY files uploaded.', "Success");
      })
    },
  });

  //Ubil CAVITY Upload
  $('#dropzone_cavity_ubil').dropzone({
    dictDefaultMessage: "Upload UBIL files here",
    paramName: 'ubil',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> UBIL</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_cavity_ubil').hide();
        toastr["success"]('UBIL files uploaded.', "Success");
      })
    },
  });

  //CIGA WARRANTY CAVITY Upload
  $('#dropzone_cavity_ciga').dropzone({
    dictDefaultMessage: "Upload CIGA WARRANTY files here",
    paramName: 'ciga',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> CIGA WARRANTY</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_cavity_ciga').hide();
        toastr["success"]('CIGA files uploaded.', "Success");
      })
    },
  });

  //ENGINEER SIGNATURE CAVITY Upload
  $('#dropzone_cavity_eng_sig').dropzone({
    dictDefaultMessage: "Upload ENGINEER SIGNATURE files here",
    paramName: 'eng_sig',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> ENGINEER SIGNATURE</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_cavity_eng_sig').hide();
        toastr["success"]('ENGINEER SIGNATURE files uploaded.', "Success");
      })
    },
  });

  //PASC CAVITY Upload
  $('#dropzone_cavity_pasc').dropzone({
    dictDefaultMessage: "Upload PASC files here",
    paramName: 'pasc',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> PASC</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_cavity_pasc').hide();
        toastr["success"]('PASC files uploaded.', "Success");
      })
    },
  });

  //BREG CAVITY Upload
  $('#dropzone_cavity_breg').dropzone({
    dictDefaultMessage: "Upload BREG files here",
    paramName: 'breg',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> BREG</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_cavity_breg').hide();
        toastr["success"]('BREG files uploaded.', "Success");
      })
    },
  });

  //PICM CAVITY Upload
  $('#dropzone_cavity_picm').dropzone({
    dictDefaultMessage: "Upload PICM files here",
    paramName: 'picm',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> PICM</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_cavity_picm').hide();
        toastr["success"]('PICM files uploaded.', "Success");
      })
    },
  });

  //TENANCY AGREEMENT CAVITY Upload
  $('#dropzone_cavity_tenancy').dropzone({
    dictDefaultMessage: "Upload TENANCY AGREEMENT files here",
    paramName: 'tenancy',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> TENANCY AGREEMENT</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_cavity_tenancy').hide();
        toastr["success"]('TENANCY AGREEMENT files uploaded.', "Success");
      })
    },
  });

  //LANDLORD PERMISSION CAVITY Upload
  $('#dropzone_cavity_landlord').dropzone({
    dictDefaultMessage: "Upload LANDLORD PERMISSION files here",
    paramName: 'landlord',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('.success_list').load(document.URL + ' .success_list');
        $('#dropzone_cavity_landlord').hide();
        toastr["success"]('LANDLORD PERMISSION files uploaded.', "Success");
      })
    },
  });

  //Bedroom1 CAVITY Upload
  $('#dropzone_cavity_bedroom1').dropzone({
    dictDefaultMessage: "Upload BEDROOM 1 files here",
    paramName: 'bedroom1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_bedroom1').hide();
        toastr["success"]('BEDROOM 1 files uploaded.', "Success");
      })
    },
  });

  //Bedroom2 CAVITY Upload
  $('#dropzone_cavity_bedroom2').dropzone({
    dictDefaultMessage: "Upload BEDROOM 2 files here",
    paramName: 'bedroom2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_bedroom2').hide();
        toastr["success"]('BEDROOM 2 files uploaded.', "Success");
      })
    },
  });

  //Bedroom3 CAVITY Upload
  $('#dropzone_cavity_bedroom3').dropzone({
    dictDefaultMessage: "Upload BEDROOM 3 files here",
    paramName: 'bedroom3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_bedroom3').hide();
        toastr["success"]('BEDROOM 3 files uploaded.', "Success");
      })
    },
  });

  //Bedroom4 CAVITY Upload
  $('#dropzone_cavity_bedroom4').dropzone({
    dictDefaultMessage: "Upload BEDROOM 4 files here",
    paramName: 'bedroom4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_bedroom4').hide();
        toastr["success"]('BEDROOM 4 files uploaded.', "Success");
      })
    },
  });

  //Bedroom2 CAVITY Upload
  $('#dropzone_cavity_bedroom5').dropzone({
    dictDefaultMessage: "Upload BEDROOM 5 files here",
    paramName: 'bedroom5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_bedroom5').hide();
        toastr["success"]('BEDROOM 5 files uploaded.', "Success");
      })
    },
  });

  //Kitchen1 CAVITY Upload
  $('#dropzone_cavity_kitchen1').dropzone({
    dictDefaultMessage: "Upload Kitchen 1 files here",
    paramName: 'kitchen1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_kitchen1').hide();
        toastr["success"]('KITCHEN 1 files uploaded.', "Success");
      })
    },
  });

  //Kitchen2 CAVITY Upload
  $('#dropzone_cavity_kitchen2').dropzone({
    dictDefaultMessage: "Upload Kitchen 2 files here",
    paramName: 'kitchen2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_kitchen2').hide();
        toastr["success"]('KITCHEN 2 files uploaded.', "Success");
      })
    },
  });

  //Dining1 CAVITY Upload
  $('#dropzone_cavity_dining_room1').dropzone({
    dictDefaultMessage: "Upload Dining Room 1 files here",
    paramName: 'dining_room1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_dining_room1').hide();
        toastr["success"]('DINING ROOM 1 files uploaded.', "Success");
      })
    },
  });

  //Dining2 CAVITY Upload
  $('#dropzone_cavity_dining_room2').dropzone({
    dictDefaultMessage: "Upload Dining Room 2 files here",
    paramName: 'dining_room2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_dining_room2').hide();
        toastr["success"]('DINING ROOM 2 files uploaded.', "Success");
      })
    },
  });

  //Living1 CAVITY Upload
  $('#dropzone_cavity_living_room1').dropzone({
    dictDefaultMessage: "Upload Living Room 1 files here",
    paramName: 'living_room1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_living_room1').hide();
        toastr["success"]('LIVING ROOM 1 files uploaded.', "Success");
      })
    },
  });

  //Living2 CAVITY Upload
  $('#dropzone_cavity_living_room2').dropzone({
    dictDefaultMessage: "Upload Living Room 2 files here",
    paramName: 'living_room2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_living_room2').hide();
        toastr["success"]('LIVING ROOM 2 files uploaded.', "Success");
      })
    },
  });

  //Hallway1 CAVITY Upload
  $('#dropzone_cavity_hallway1').dropzone({
    dictDefaultMessage: "Upload Hallway 1 files here",
    paramName: 'hallway1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_hallway1').hide();
        toastr["success"]('HALLWAY 1 files uploaded.', "Success");
      })
    },
  });

  //Hallway2 CAVITY Upload
  $('#dropzone_cavity_hallway2').dropzone({
    dictDefaultMessage: "Upload Hallway 2 files here",
    paramName: 'hallway2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_hallway2').hide();
        toastr["success"]('HALLWAY 2 files uploaded.', "Success");
      })
    },
  });

  //Hallway3 CAVITY Upload
  $('#dropzone_cavity_hallway3').dropzone({
    dictDefaultMessage: "Upload Hallway 3 files here",
    paramName: 'hallway3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_hallway3').hide();
        toastr["success"]('HALLWAY 3 files uploaded.', "Success");
      })
    },
  });

  //Hallway4 CAVITY Upload
  $('#dropzone_cavity_hallway4').dropzone({
    dictDefaultMessage: "Upload Hallway 4 files here",
    paramName: 'hallway4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_hallway4').hide();
        toastr["success"]('HALLWAY 4 files uploaded.', "Success");
      })
    },
  });

  //Hallway5 CAVITY Upload
  $('#dropzone_cavity_hallway5').dropzone({
    dictDefaultMessage: "Upload Hallway 5 files here",
    paramName: 'hallway5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_hallway5').hide();
        toastr["success"]('HALLWAY 5 files uploaded.', "Success");
      })
    },
  });

  //Landing1 CAVITY Upload
  $('#dropzone_cavity_landing1').dropzone({
    dictDefaultMessage: "Upload Landing 1 files here",
    paramName: 'landing1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_landing1').hide();
        toastr["success"]('LANDING 1 files uploaded.', "Success");
      })
    },
  });

  //Landing2 CAVITY Upload
  $('#dropzone_cavity_landing2').dropzone({
    dictDefaultMessage: "Upload Landing 2 files here",
    paramName: 'landing2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_landing2').hide();
        toastr["success"]('LANDING 2 files uploaded.', "Success");
      })
    },
  });

  //Landing3 CAVITY Upload
  $('#dropzone_cavity_landing3').dropzone({
    dictDefaultMessage: "Upload Landing 3 files here",
    paramName: 'landing3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_landing3').hide();
        toastr["success"]('LANDING 3 files uploaded.', "Success");
      })
    },
  });

  //Landing4 CAVITY Upload
  $('#dropzone_cavity_landing4').dropzone({
    dictDefaultMessage: "Upload Landing 4 files here",
    paramName: 'landing4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_landing4').hide();
        toastr["success"]('LANDING 4 files uploaded.', "Success");
      })
    },
  });

  //Landing5 CAVITY Upload
  $('#dropzone_cavity_landing5').dropzone({
    dictDefaultMessage: "Upload Landing 5 files here",
    paramName: 'landing5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_landing5').hide();
        toastr["success"]('LANDING 5 files uploaded.', "Success");
      })
    },
  });

  //Front Elevation CAVITY Upload
  $('#dropzone_cavity_fort_elevation').dropzone({
    dictDefaultMessage: "Upload Front Elevation files here",
    paramName: 'fort_elevation',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_fort_elevation').hide();
        toastr["success"]('FRONT ELEVATION files uploaded.', "Success");
      })
    },
  });

  //Side Elevation CAVITY Upload
  $('#dropzone_cavity_side_elevation1').dropzone({
    dictDefaultMessage: "Upload Side Elevation 1 files here",
    paramName: 'side_elevation1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_side_elevation1').hide();
        toastr["success"]('SIDE ELEVATION 1 files uploaded.', "Success");
      })
    },
  });

  //Side Elevation CAVITY Upload
  $('#dropzone_cavity_side_elevation2').dropzone({
    dictDefaultMessage: "Upload Side Elevation 2 files here",
    paramName: 'side_elevation2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_side_elevation2').hide();
        toastr["success"]('SIDE ELEVATION 2 files uploaded.', "Success");
      })
    },
  });

  //Rear Elevation CAVITY Upload
  $('#dropzone_cavity_rear_elevation').dropzone({
    dictDefaultMessage: "Upload Rear Elevation files here",
    paramName: 'rear_elevation',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_rear_elevation').hide();
        toastr["success"]('REAR ELEVATION files uploaded.', "Success");
      })
    },
  });

  //Water Closet 1 CAVITY Upload
  $('#dropzone_cavity_water_closet1').dropzone({
    dictDefaultMessage: "Upload Water Closet 1 files here",
    paramName: 'water_closet1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_water_closet1').hide();
        toastr["success"]('WATER CLOSET 1 files uploaded.', "Success");
      })
    },
  });

  //Water Closet 2 CAVITY Upload
  $('#dropzone_cavity_water_closet2').dropzone({
    dictDefaultMessage: "Upload Water Closet 2 files here",
    paramName: 'water_closet2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_water_closet2').hide();
        toastr["success"]('WATER CLOSET 2 files uploaded.', "Success");
      })
    },
  });

  //Water Closet 3 CAVITY Upload
  $('#dropzone_cavity_water_closet3').dropzone({
    dictDefaultMessage: "Upload Water Closet 3 files here",
    paramName: 'water_closet3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_water_closet3').hide();
        toastr["success"]('WATER CLOSET 3 files uploaded.', "Success");
      })
    },
  });

  //Water Closet 4 CAVITY Upload
  $('#dropzone_cavity_water_closet4').dropzone({
    dictDefaultMessage: "Upload Water Closet 4 files here",
    paramName: 'water_closet4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_water_closet4').hide();
        toastr["success"]('WATER CLOSET 4 files uploaded.', "Success");
      })
    },
  });

  //Water Closet 5 CAVITY Upload
  $('#dropzone_cavity_water_closet5').dropzone({
    dictDefaultMessage: "Upload Water Closet 5 files here",
    paramName: 'water_closet5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_water_closet5').hide();
        toastr["success"]('WATER CLOSET 5 files uploaded.', "Success");
      })
    },
  });

  //Utility CAVITY Upload
  $('#dropzone_cavity_utility').dropzone({
    dictDefaultMessage: "Upload Utility files here",
    paramName: 'utility',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_utility').hide();
        toastr["success"]('UTILITY files uploaded.', "Success");
      })
    },
  });

  //Lounge 1 CAVITY Upload
  $('#dropzone_cavity_lounge1').dropzone({
    dictDefaultMessage: "Upload Lounge 1 files here",
    paramName: 'lounge1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_lounge1').hide();
        toastr["success"]('LOUNGE 1 files uploaded.', "Success");
      })
    },
  });

  //Lounge 2 CAVITY Upload
  $('#dropzone_cavity_lounge2').dropzone({
    dictDefaultMessage: "Upload Lounge 2 files here",
    paramName: 'lounge2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_lounge2').hide();
        toastr["success"]('LOUNGE 2 files uploaded.', "Success");
      })
    },
  });

  //Lounge 3 CAVITY Upload
  $('#dropzone_cavity_lounge3').dropzone({
    dictDefaultMessage: "Upload Lounge 3 files here",
    paramName: 'lounge3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_lounge3').hide();
        toastr["success"]('LOUNGE 3 files uploaded.', "Success");
      })
    },
  });

  //bathroom1 CAVITY Upload
  $('#dropzone_cavity_bathroom1').dropzone({
    dictDefaultMessage: "Upload Bathroom 1 files here",
    paramName: 'bathroom1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_bathroom1').hide();
        toastr["success"]('BATHROOM 1 files uploaded.', "Success");
      })
    },
  });

  //bathroom2 CAVITY Upload
  $('#dropzone_cavity_bathroom2').dropzone({
    dictDefaultMessage: "Upload Bathroom 2 files here",
    paramName: 'bathroom2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_bathroom2').hide();
        toastr["success"]('BATHROOM 2 files uploaded.', "Success");
      })
    },
  });

  //bathroom3 CAVITY Upload
  $('#dropzone_cavity_bathroom3').dropzone({
    dictDefaultMessage: "Upload Bathroom 3 files here",
    paramName: 'bathroom3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_bathroom3').hide();
        toastr["success"]('BATHROOM 3 files uploaded.', "Success");
      })
    },
  });

  //bathroom4 CAVITY Upload
  $('#dropzone_cavity_bathroom4').dropzone({
    dictDefaultMessage: "Upload Bathroom 4 files here",
    paramName: 'bathroom4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_bathroom4').hide();
        toastr["success"]('BATHROOM 4 files uploaded.', "Success");
      })
    },
  });

  //bathroom5 CAVITY Upload
  $('#dropzone_cavity_bathroom5').dropzone({
    dictDefaultMessage: "Upload Bathroom 5 files here",
    paramName: 'bathroom5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_bathroom5').hide();
        toastr["success"]('BATHROOM 5 files uploaded.', "Success");
      })
    },
  });

    //cupboard1 CAVITY Upload
  $('#dropzone_cavity_cupboard1').dropzone({
    dictDefaultMessage: "Upload Cupboard 1 files here",
    paramName: 'cupboard1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_cupboard1').hide();
        toastr["success"]('CUPBOARD 1 files uploaded.', "Success");
      })
    },
  });

  //cupboard2 CAVITY Upload
  $('#dropzone_cavity_cupboard2').dropzone({
    dictDefaultMessage: "Upload Cupboard 2 files here",
    paramName: 'cupboard2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_cupboard2').hide();
        toastr["success"]('CUPBOARD 2 files uploaded.', "Success");
      })
    },
  });

  //cupboard3 CAVITY Upload
  $('#dropzone_cavity_cupboard3').dropzone({
    dictDefaultMessage: "Upload Cupboard 3 files here",
    paramName: 'cupboard3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_cupboard3').hide();
        toastr["success"]('CUPBOARD 3 files uploaded.', "Success");
      })
    },
  });

  //cupboard4 CAVITY Upload
  $('#dropzone_cavity_cupboard4').dropzone({
    dictDefaultMessage: "Upload Cupboard 4 files here",
    paramName: 'cupboard4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_cupboard4').hide();
        toastr["success"]('CUPBOARD 4 files uploaded.', "Success");
      })
    },
  });

  //cupboard5 CAVITY Upload
  $('#dropzone_cavity_cupboard5').dropzone({
    dictDefaultMessage: "Upload Cupboard 5 files here",
    paramName: 'cupboard5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_cupboard5').hide();
        toastr["success"]('CUPBOARD 5 files uploaded.', "Success");
      })
    },
  });

  //Conservatory CAVITY Upload
  $('#dropzone_cavity_conservatory').dropzone({
    dictDefaultMessage: "Upload Conservatory files here",
    paramName: 'conservatory',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_conservatory').hide();
        toastr["success"]('CONSERVATORY files uploaded.', "Success");
      })
    },
  });

  //stairs1 CAVITY Upload
  $('#dropzone_cavity_stairs1').dropzone({
    dictDefaultMessage: "Upload Stairs 1 files here",
    paramName: 'stairs1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_stairs1').hide();
        toastr["success"]('STAIRS 1 files uploaded.', "Success");
      })
    },
  });

  //stairs2 CAVITY Upload
  $('#dropzone_cavity_stairs2').dropzone({
    dictDefaultMessage: "Upload Stairs 2 files here",
    paramName: 'stairs2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_stairs2').hide();
        toastr["success"]('STAIRS 2 files uploaded.', "Success");
      })
    },
  });

  //stairs3 CAVITY Upload
  $('#dropzone_cavity_stairs3').dropzone({
    dictDefaultMessage: "Upload Stairs 3 files here",
    paramName: 'stairs3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_stairs3').hide();
        toastr["success"]('STAIRS 3 files uploaded.', "Success");
      })
    },
  });

    //garage1 CAVITY Upload
  $('#dropzone_cavity_garage1').dropzone({
    dictDefaultMessage: "Upload Garage 1 files here",
    paramName: 'garage1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_garage1').hide();
        toastr["success"]('GARAGE 1 files uploaded.', "Success");
      })
    },
  });

  //garage2 CAVITY Upload
  $('#dropzone_cavity_garage2').dropzone({
    dictDefaultMessage: "Upload Garage 2 files here",
    paramName: 'garage2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_garage2').hide();
        toastr["success"]('GARAGE 2 files uploaded.', "Success");
      })
    },
  });

//wall_thickness1 CAVITY Upload
  $('#dropzone_cavity_wall_thickness1').dropzone({
    dictDefaultMessage: "Upload Wall Thickness 1 files here",
    paramName: 'wall_thickness1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_wall_thickness1').hide();
        toastr["success"]('WALL THICKNESS 1 files uploaded.', "Success");
      })
    },
  });

  //wall_thickness2 CAVITY Upload
  $('#dropzone_cavity_wall_thickness2').dropzone({
    dictDefaultMessage: "Upload Wall Thickness 2 files here",
    paramName: 'wall_thickness2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_wall_thickness2').hide();
        toastr["success"]('WALL THICKNESS 2 files uploaded.', "Success");
      })
    },
  });

  //wall_thickness3 CAVITY Upload
  $('#dropzone_cavity_wall_thickness3').dropzone({
    dictDefaultMessage: "Upload Wall Thickness 3 files here",
    paramName: 'wall_thickness3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_wall_thickness3').hide();
        toastr["success"]('WALL THICKNESS 3 files uploaded.', "Success");
      })
    },
  });

  //wall_thickness4 CAVITY Upload
  $('#dropzone_cavity_wall_thickness4').dropzone({
    dictDefaultMessage: "Upload Wall Thickness 4 files here",
    paramName: 'wall_thickness4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_wall_thickness4').hide();
        toastr["success"]('WALL THICKNESS 4 files uploaded.', "Success");
      })
    },
  });

  //wall_thickness5 CAVITY Upload
  $('#dropzone_cavity_wall_thickness5').dropzone({
    dictDefaultMessage: "Upload Wall Thickness 5 files here",
    paramName: 'wall_thickness5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_wall_thickness5').hide();
        toastr["success"]('WALL THICKNESS 5 files uploaded.', "Success");
      })
    },
  });

    //fused_spur1 CAVITY Upload
  $('#dropzone_cavity_fused_spur1').dropzone({
    dictDefaultMessage: "Upload Fused Spur 1 files here",
    paramName: 'fused_spur1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_fused_spur1').hide();
        toastr["success"]('FUSED SPUR 1 files uploaded.', "Success");
      })
    },
  });

  //fused_spur2 CAVITY Upload
  $('#dropzone_cavity_fused_spur2').dropzone({
    dictDefaultMessage: "Upload Fused Spur 2 files here",
    paramName: 'fused_spur2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_fused_spur2').hide();
        toastr["success"]('FUSED SPUR 2 files uploaded.', "Success");
      })
    },
  });

  //fused_spur3 CAVITY Upload
  $('#dropzone_cavity_fused_spur3').dropzone({
    dictDefaultMessage: "Upload Fused Spur 3 files here",
    paramName: 'fused_spur3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_fused_spur3').hide();
        toastr["success"]('FUSED SPUR 3 files uploaded.', "Success");
      })
    },
  });

    //room_stat1 CAVITY Upload
  $('#dropzone_cavity_room_stat1').dropzone({
    dictDefaultMessage: "Upload Room Stat 1 files here",
    paramName: 'room_stat1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_room_stat1').hide();
        toastr["success"]('ROOM STAT 1 files uploaded.', "Success");
      })
    },
  });

  //room_stat2 CAVITY Upload
  $('#dropzone_cavity_room_stat2').dropzone({
    dictDefaultMessage: "Upload Room Stat 2 files here",
    paramName: 'room_stat2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_room_stat2').hide();
        toastr["success"]('ROOM STAT 2 files uploaded.', "Success");
      })
    },
  });

  //room_stat3 CAVITY Upload
  $('#dropzone_cavity_room_stat3').dropzone({
    dictDefaultMessage: "Upload Room Stat 3 files here",
    paramName: 'room_stat3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_room_stat3').hide();
        toastr["success"]('ROOM STAT 3 files uploaded.', "Success");
      })
    },
  });

    //programmer1 CAVITY Upload
  $('#dropzone_cavity_programmer1').dropzone({
    dictDefaultMessage: "Upload Programmer 1 files here",
    paramName: 'programmer1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_programmer1').hide();
        toastr["success"]('PROGRAMMER 1 files uploaded.', "Success");
      })
    },
  });

  //programmer2 CAVITY Upload
  $('#dropzone_cavity_programmer2').dropzone({
    dictDefaultMessage: "Upload Programmer 2 files here",
    paramName: 'programmer2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_programmer2').hide();
        toastr["success"]('PROGRAMMER 2 files uploaded.', "Success");
      })
    },
  });

  //programmer3 CAVITY Upload
  $('#dropzone_cavity_programmer3').dropzone({
    dictDefaultMessage: "Upload Programmer 3 files here",
    paramName: 'programmer3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_cavity_programmer3').hide();
        toastr["success"]('PROGRAMMER 3 files uploaded.', "Success");
      })
    },
  });

  //Cavity
  //Upload More EFG
  $('#dropzone_cavity_success_efg').dropzone({
    dictDefaultMessage: "Add more EFGM files here",
    paramName: 'efgm',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('EFG files uploaded.', "Success");
      })
    },
  });
  //Upload More PREE
  $('#dropzone_cavity_success_pree').dropzone({
    dictDefaultMessage: "Add more PREE files here",
    paramName: 'pree',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PREE files uploaded.', "Success");
      })
    },
  });
  //Upload More PSTE
  $('#dropzone_cavity_success_pste').dropzone({
    dictDefaultMessage: "Add more PSTE files here",
    paramName: 'pste',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PSTE files uploaded.', "Success");
      })
    },
  });
  //Upload More STNS
  $('#dropzone_cavity_success_stns').dropzone({
    dictDefaultMessage: "Add more STNS files here",
    paramName: 'stns',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('STNS files uploaded.', "Success");
      })
    },
  });
  //Upload More PHHS
  $('#dropzone_cavity_success_phhs').dropzone({
    dictDefaultMessage: "Add more PHHS files here",
    paramName: 'phhs',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PHHS files uploaded.', "Success");
      })
    },
  });
  //Upload More CWSA
  $('#dropzone_cavity_success_cwsa').dropzone({
    dictDefaultMessage: "Add more CWSA files here",
    paramName: 'cwsa',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('CWSA files uploaded.', "Success");
      })
    },
  });
  //Upload More DSSY_A
  $('#dropzone_cavity_success_dssy_a').dropzone({
    dictDefaultMessage: "Add more DSSY_A files here",
    paramName: 'dssy_a',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('DSSY_A files uploaded.', "Success");
      })
    },
  });
  //Upload More DSSY_C
  $('#dropzone_cavity_success_dssy_c').dropzone({
    dictDefaultMessage: "Add more DSSY_C files here",
    paramName: 'dssy_c',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('DSSY_C files uploaded.', "Success");
      })
    },
  });
  //Upload More PICP
  $('#dropzone_cavity_success_picp').dropzone({
    dictDefaultMessage: "Add more PICP files here",
    paramName: 'picp',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PICP files uploaded.', "Success");
      })
    },
  });
  //Upload More PICA
  $('#dropzone_cavity_success_pica').dropzone({
    dictDefaultMessage: "Add more PICA files here",
    paramName: 'pica',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PICA files uploaded.', "Success");
      })
    },
  });
  //Upload More EOOC
  $('#dropzone_cavity_success_eooc').dropzone({
    dictDefaultMessage: "Add more EOOC files here",
    paramName: 'eooc',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('EOOC files uploaded.', "Success");
      })
    },
  });
  //Upload More LAND REGISTRY
  $('#dropzone_cavity_success_land_registry').dropzone({
    dictDefaultMessage: "Add more LAND REGISTRY files here",
    paramName: 'land_registry',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('LAND REGISTRY files uploaded.', "Success");
      })
    },
  });
  //Upload More UBIL
  $('#dropzone_cavity_success_ubil').dropzone({
    dictDefaultMessage: "Add more UBIL files here",
    paramName: 'ubil',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('UBIL files uploaded.', "Success");
      })
    },
  });
  //Upload More CIGA
  $('#dropzone_cavity_success_ciga').dropzone({
    dictDefaultMessage: "Add more CIGA files here",
    paramName: 'ciga',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('CIGA files uploaded.', "Success");
      })
    },
  });
  //Upload More ENGINEER SIGNATURE
  $('#dropzone_cavity_success_eng_sig').dropzone({
    dictDefaultMessage: "Add more ENGINEER SIGNATURE files here",
    paramName: 'eng_sig',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('ENGINEER SIGNATURE files uploaded.', "Success");
      })
    },
  });
  //Upload More PASC
  $('#dropzone_cavity_success_pasc').dropzone({
    dictDefaultMessage: "Add more PASC files here",
    paramName: 'pasc',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PASC files uploaded.', "Success");
      })
    },
  });
  //Upload More BREG
  $('#dropzone_cavity_success_breg').dropzone({
    dictDefaultMessage: "Add more BREG files here",
    paramName: 'breg',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('BREG files uploaded.', "Success");
      })
    },
  });
  //Upload More PICM
  $('#dropzone_cavity_success_picm').dropzone({
    dictDefaultMessage: "Add more PICM files here",
    paramName: 'picm',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PICM files uploaded.', "Success");
      })
    },
  });
  //Upload More TENANCY AGREEMENT
  $('#dropzone_cavity_success_tenancy').dropzone({
    dictDefaultMessage: "Add more TENANCY AGREEMENT files here",
    paramName: 'picm',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('TENANCY AGREEMENT files uploaded.', "Success");
      })
    },
  });
  //Upload More LANDLORD PERMISSION
  $('#dropzone_cavity_success_landlord').dropzone({
    dictDefaultMessage: "Add more LANDLORD PERMISSION files here",
    paramName: 'landlord',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('LANDLORD PERMISSION files uploaded.', "Success");
      })
    },
  });

  //Boiler
  $('#dropzone_boiler_success_pibi').dropzone({
    dictDefaultMessage: "Add more PIBI files here",
    paramName: 'pibi',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PIBI files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_boiler_success_pics').dropzone({
    dictDefaultMessage: "Add more PICS files here",
    paramName: 'pics',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PICS files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_boiler_success_pica').dropzone({
    dictDefaultMessage: "Add more PICA files here",
    paramName: 'pica',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PICA files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_boiler_success_eooc').dropzone({
    dictDefaultMessage: "Add more EOOC files here",
    paramName: 'eooc',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('EOOC files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_boiler_success_land_registry').dropzone({
    dictDefaultMessage: "Add more LAND REGISTRY files here",
    paramName: 'land_registry',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('LAND REGISTRY files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_boiler_success_ubil').dropzone({
    dictDefaultMessage: "Add more UBIL files here",
    paramName: 'ubil',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('UBIL files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_boiler_success_dwp').dropzone({
    dictDefaultMessage: "Add more DWP files here",
    paramName: 'dwp',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('DWP files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_boiler_success_eng_sig').dropzone({
    dictDefaultMessage: "Add more ENGINEER SIGNATURE files here",
    paramName: 'eng_sig',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('ENGINEER SIGNATURE files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_boiler_success_cus_sig').dropzone({
    dictDefaultMessage: "Add more CUSTOMER SIGNATURE files here",
    paramName: 'cus_sig',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('CUSTOMER SIGNATURE files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_boiler_success_boiler_manufacture').dropzone({
    dictDefaultMessage: "Add more BOILER MANUFACTURE files here",
    paramName: 'boiler_manufacture',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('BOILER MANUFACTURE files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_boiler_success_ppes').dropzone({
    dictDefaultMessage: "Add more PPES files here",
    paramName: 'ppes',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PPES files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_boiler_success_bacl_b').dropzone({
    dictDefaultMessage: "Add more BACL_B files here",
    paramName: 'bacl_b',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('BACL_B files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_boiler_success_pasc').dropzone({
    dictDefaultMessage: "Add more PASC files here",
    paramName: 'pasc',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PASC files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_boiler_success_floor_plan').dropzone({
    dictDefaultMessage: "Add more FLOOR PLAN files here",
    paramName: 'floor_plan',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('FLOOR PLAN files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_boiler_success_tag').dropzone({
    dictDefaultMessage: "Add more NO TAG PRE BOILER files here",
    paramName: 'tag',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('NO TAG PRE BOILER files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_boiler_success_pcdb_a').dropzone({
    dictDefaultMessage: "Add more PCDB_A files here",
    paramName: 'pcdb_a',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PCDB_A files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_boiler_success_crr').dropzone({
    dictDefaultMessage: "Add more BACL_C AND BACL_D (COST OF REPAIR AND REPLACEMENT) files here",
    paramName: 'crr',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('BACL_C AND BACL_D (COST OF REPAIR AND REPLACEMENT) files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_boiler_success_bcom').dropzone({
    dictDefaultMessage: "Add more BCOM files here",
    paramName: 'bcom',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('BCOM files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_boiler_success_gase').dropzone({
    dictDefaultMessage: "Add more GASE files here",
    paramName: 'gase',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('GASE files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_boiler_success_cd10').dropzone({
    dictDefaultMessage: "Add more CD10 files here",
    paramName: 'cd10',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('CD10 files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_boiler_success_cd11').dropzone({
    dictDefaultMessage: "Add more CD11 files here",
    paramName: 'cd11',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('CD11 files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_boiler_success_tenancy').dropzone({
    dictDefaultMessage: "Add more TENANCY AGREEMENT files here",
    paramName: 'tenancy',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('TENANCY AGREEMENT files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_boiler_success_landlord').dropzone({
    dictDefaultMessage: "Add more LANDLORD PERMISSION files here",
    paramName: 'landlord',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('LANDLORD PERMISSION files uploaded.', "Success");
      })
    },
  });

  //ESH Add File
  $('#dropzone_esh_success_dom').dropzone({
    dictDefaultMessage: "Add more DOM files here",
    paramName: 'dom',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('DOM files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_esh_success_pibi').dropzone({
    dictDefaultMessage: "Add more PIBI files here",
    paramName: 'pibi',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PIBI files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_esh_success_dssy_a').dropzone({
    dictDefaultMessage: "Add more DSSY_A files here",
    paramName: 'dssy_a',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('DSSY_A files uploaded.', "Success");
      })
    },
  });
  $('#esh_success_dssy_c').dropzone({
    dictDefaultMessage: "Add more DSSY_C files here",
    paramName: 'dssy_c',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('DSSY_C files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_esh_success_pics').dropzone({
    dictDefaultMessage: "Add more PICS files here",
    paramName: 'pics',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PICS files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_esh_success_pica').dropzone({
    dictDefaultMessage: "Add more PICA files here",
    paramName: 'pica',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PICA files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_esh_success_eooc').dropzone({
    dictDefaultMessage: "Add more EOOC files here",
    paramName: 'eooc',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('EOOC files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_esh_success_land_registry').dropzone({
    dictDefaultMessage: "Add more LAND REGISTRY files here",
    paramName: 'land_registry',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('LAND REGISTRY files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_esh_success_ubil').dropzone({
    dictDefaultMessage: "Add more UBIL files here",
    paramName: 'ubil',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('UBIL files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_esh_success_dwp').dropzone({
    dictDefaultMessage: "Add more DWP files here",
    paramName: 'dwp',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('DWP files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_esh_success_eng_sig').dropzone({
    dictDefaultMessage: "Add more ENGINEER SIGNATURE files here",
    paramName: 'eng_sig',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('ENGINEER SIGNATURE files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_esh_success_ppes').dropzone({
    dictDefaultMessage: "Add more PPES files here",
    paramName: 'ppes',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PPES files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_esh_success_esh_manufacture').dropzone({
    dictDefaultMessage: "Add more ESH MANUFACTURE GUARANTEE files here",
    paramName: 'esh_manufacture',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('ESH MANUFACTURE GUARANTEE files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_esh_success_esh_technical').dropzone({
    dictDefaultMessage: "Add more ESH TECHNICAL SURVEY here",
    paramName: 'esh_technical',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('ESH TECHNICAL SURVEY files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_esh_success_pasc').dropzone({
    dictDefaultMessage: "Add more PASC here",
    paramName: 'pasc',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PASC files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_esh_success_breg').dropzone({
    dictDefaultMessage: "Add more BREG here",
    paramName: 'breg',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('BREG files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_esh_success_floor_plan').dropzone({
    dictDefaultMessage: "Add more FLOOR PLAN here",
    paramName: 'floor_plan',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('FLOOR PLAN files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_esh_success_tenancy').dropzone({
    dictDefaultMessage: "Add more TENANCY AGREEMENT here",
    paramName: 'tenancy',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('TENANCY AGREEMENT files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_esh_success_landlord').dropzone({
    dictDefaultMessage: "Add more LANDLORD PERMISSION here",
    paramName: 'landlord',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('LANDLORD PERMISSION files uploaded.', "Success");
      })
    },
  });

  $('#dropzone_sw_pibi').dropzone({
    dictDefaultMessage: "Upload PIBI files here",
    paramName: 'pibi',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PIBI files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_sw_pasc').dropzone({
    dictDefaultMessage: "Upload PASC files here",
    paramName: 'pasc',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PASC files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_sw_dssy_a').dropzone({
    dictDefaultMessage: "Upload DSSY_A files here",
    paramName: 'dssy_a',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('DSSY_A files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_sw_picp').dropzone({
    dictDefaultMessage: "Upload PICP files here",
    paramName: 'picp',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PICP files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_sw_picm').dropzone({
    dictDefaultMessage: "Upload PICM files here",
    paramName: 'picm',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PICM files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_sw_pica').dropzone({
    dictDefaultMessage: "Upload PICA files here",
    paramName: 'pica',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PICA files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_sw_pmhs').dropzone({
    dictDefaultMessage: "Upload PMHS files here",
    paramName: 'pmhs',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('PMHS files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_sw_eooc').dropzone({
    dictDefaultMessage: "Upload EOOC files here",
    paramName: 'eooc',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('EOOC files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_sw_land_registry').dropzone({
    dictDefaultMessage: "Upload LAND REGISTRY files here",
    paramName: 'land_registry',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('LAND REGISTRY files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_sw_ubil').dropzone({
    dictDefaultMessage: "Upload UBIL files here",
    paramName: 'ubil',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('UBIL files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_sw_dwp').dropzone({
    dictDefaultMessage: "Upload DWP MATCH CONFIRMATION files here",
    paramName: 'dwp',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('DWP MATCH CONFIRMATION files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_sw_eng_sig').dropzone({
    dictDefaultMessage: "Upload ENGINEER SIGNATURE files here",
    paramName: 'eng_sig',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('ENGINEER SIGNATURE files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_sw_cus_sig').dropzone({
    dictDefaultMessage: "Upload CUSTOMER SIGNATURE files here",
    paramName: 'cus_sig',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('CUSTOMER SIGNATURE files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_sw_id_vents').dropzone({
    dictDefaultMessage: "Upload IDENTIFICATION OF VENTS AND FLUES files here",
    paramName: 'id_vents',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('IDENTIFICATION OF VENTS AND FLUES files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_sw_floor_plan').dropzone({
    dictDefaultMessage: "Upload FLOOR PLAN files here",
    paramName: 'floor_plan',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('FLOOR PLAN files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_sw_breg').dropzone({
    dictDefaultMessage: "Upload BREG files here",
    paramName: 'breg',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('BREG files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_sw_cusg').dropzone({
    dictDefaultMessage: "Upload CUSG files here",
    paramName: 'cusg',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('CUSG files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_sw_weather').dropzone({
    dictDefaultMessage: "Upload WEATHER - EWI DAILY CHECKS files here",
    paramName: 'weather',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('WEATHER - EWI DAILY CHECKS files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_sw_method_statement').dropzone({
    dictDefaultMessage: "Upload METHOD STATEMENT files here",
    paramName: 'method_statement',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('METHOD STATEMENT files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_sw_risk_assessment').dropzone({
    dictDefaultMessage: "Upload RISK ASSESSMENT files here",
    paramName: 'risk_assessment',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('RISK ASSESSMENT files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_sw_tenancy').dropzone({
    dictDefaultMessage: "Upload TENANCY AGREEMENT files here",
    paramName: 'tenancy',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('TENANCY AGREEMENT files uploaded.', "Success");
      })
    },
  });
  $('#dropzone_sw_landlord').dropzone({
    dictDefaultMessage: "Upload LANDLORD PERMISSION files here",
    paramName: 'landlord',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        toastr["success"]('LANDLORD PERMISSION files uploaded.', "Success");
      })
    },
  });

    //Bedroom1 CAVITY Upload
  $('#dropzone_sw_bedroom1').dropzone({
    dictDefaultMessage: "Upload BEDROOM 1 files here",
    paramName: 'bedroom1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_bedroom1').hide();
        toastr["success"]('BEDROOM 1 files uploaded.', "Success");
      })
    },
  });

  //Bedroom2 CAVITY Upload
  $('#dropzone_sw_bedroom2').dropzone({
    dictDefaultMessage: "Upload BEDROOM 2 files here",
    paramName: 'bedroom2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_bedroom2').hide();
        toastr["success"]('BEDROOM 2 files uploaded.', "Success");
      })
    },
  });

  //Bedroom3 CAVITY Upload
  $('#dropzone_sw_bedroom3').dropzone({
    dictDefaultMessage: "Upload BEDROOM 3 files here",
    paramName: 'bedroom3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_bedroom3').hide();
        toastr["success"]('BEDROOM 3 files uploaded.', "Success");
      })
    },
  });

  //Bedroom4 CAVITY Upload
  $('#dropzone_sw_bedroom4').dropzone({
    dictDefaultMessage: "Upload BEDROOM 4 files here",
    paramName: 'bedroom4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_bedroom4').hide();
        toastr["success"]('BEDROOM 4 files uploaded.', "Success");
      })
    },
  });

  //Bedroom2 CAVITY Upload
  $('#dropzone_sw_bedroom5').dropzone({
    dictDefaultMessage: "Upload BEDROOM 5 files here",
    paramName: 'bedroom5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_bedroom5').hide();
        toastr["success"]('BEDROOM 5 files uploaded.', "Success");
      })
    },
  });

  //Kitchen1 CAVITY Upload
  $('#dropzone_sw_kitchen1').dropzone({
    dictDefaultMessage: "Upload Kitchen 1 files here",
    paramName: 'kitchen1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_kitchen1').hide();
        toastr["success"]('KITCHEN 1 files uploaded.', "Success");
      })
    },
  });

  //Kitchen2 CAVITY Upload
  $('#dropzone_sw_kitchen2').dropzone({
    dictDefaultMessage: "Upload Kitchen 2 files here",
    paramName: 'kitchen2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_kitchen2').hide();
        toastr["success"]('KITCHEN 2 files uploaded.', "Success");
      })
    },
  });

  //Dining1 CAVITY Upload
  $('#dropzone_sw_dining_room1').dropzone({
    dictDefaultMessage: "Upload Dining Room 1 files here",
    paramName: 'dining_room1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_dining_room1').hide();
        toastr["success"]('DINING ROOM 1 files uploaded.', "Success");
      })
    },
  });

  //Dining2 CAVITY Upload
  $('#dropzone_sw_dining_room2').dropzone({
    dictDefaultMessage: "Upload Dining Room 2 files here",
    paramName: 'dining_room2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_dining_room2').hide();
        toastr["success"]('DINING ROOM 2 files uploaded.', "Success");
      })
    },
  });

  //Living1 CAVITY Upload
  $('#dropzone_sw_living_room1').dropzone({
    dictDefaultMessage: "Upload Living Room 1 files here",
    paramName: 'living_room1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_living_room1').hide();
        toastr["success"]('LIVING ROOM 1 files uploaded.', "Success");
      })
    },
  });

  //Living2 CAVITY Upload
  $('#dropzone_sw_living_room2').dropzone({
    dictDefaultMessage: "Upload Living Room 2 files here",
    paramName: 'living_room2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_living_room2').hide();
        toastr["success"]('LIVING ROOM 2 files uploaded.', "Success");
      })
    },
  });

  //Hallway1 CAVITY Upload
  $('#dropzone_sw_hallway1').dropzone({
    dictDefaultMessage: "Upload Hallway 1 files here",
    paramName: 'hallway1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_hallway1').hide();
        toastr["success"]('HALLWAY 1 files uploaded.', "Success");
      })
    },
  });

  //Hallway2 CAVITY Upload
  $('#dropzone_sw_hallway2').dropzone({
    dictDefaultMessage: "Upload Hallway 2 files here",
    paramName: 'hallway2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_hallway2').hide();
        toastr["success"]('HALLWAY 2 files uploaded.', "Success");
      })
    },
  });

  //Hallway3 CAVITY Upload
  $('#dropzone_sw_hallway3').dropzone({
    dictDefaultMessage: "Upload Hallway 3 files here",
    paramName: 'hallway3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_hallway3').hide();
        toastr["success"]('HALLWAY 3 files uploaded.', "Success");
      })
    },
  });

  //Hallway4 CAVITY Upload
  $('#dropzone_sw_hallway4').dropzone({
    dictDefaultMessage: "Upload Hallway 4 files here",
    paramName: 'hallway4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_hallway4').hide();
        toastr["success"]('HALLWAY 4 files uploaded.', "Success");
      })
    },
  });

  //Hallway5 CAVITY Upload
  $('#dropzone_sw_hallway5').dropzone({
    dictDefaultMessage: "Upload Hallway 5 files here",
    paramName: 'hallway5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_hallway5').hide();
        toastr["success"]('HALLWAY 5 files uploaded.', "Success");
      })
    },
  });

  //Landing1 CAVITY Upload
  $('#dropzone_sw_landing1').dropzone({
    dictDefaultMessage: "Upload Landing 1 files here",
    paramName: 'landing1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_landing1').hide();
        toastr["success"]('LANDING 1 files uploaded.', "Success");
      })
    },
  });

  //Landing2 CAVITY Upload
  $('#dropzone_sw_landing2').dropzone({
    dictDefaultMessage: "Upload Landing 2 files here",
    paramName: 'landing2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_landing2').hide();
        toastr["success"]('LANDING 2 files uploaded.', "Success");
      })
    },
  });

  //Landing3 CAVITY Upload
  $('#dropzone_sw_landing3').dropzone({
    dictDefaultMessage: "Upload Landing 3 files here",
    paramName: 'landing3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_landing3').hide();
        toastr["success"]('LANDING 3 files uploaded.', "Success");
      })
    },
  });

  //Landing4 CAVITY Upload
  $('#dropzone_sw_landing4').dropzone({
    dictDefaultMessage: "Upload Landing 4 files here",
    paramName: 'landing4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_landing4').hide();
        toastr["success"]('LANDING 4 files uploaded.', "Success");
      })
    },
  });

  //Landing5 CAVITY Upload
  $('#dropzone_sw_landing5').dropzone({
    dictDefaultMessage: "Upload Landing 5 files here",
    paramName: 'landing5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_landing5').hide();
        toastr["success"]('LANDING 5 files uploaded.', "Success");
      })
    },
  });

  //Front Elevation CAVITY Upload
  $('#dropzone_sw_fort_elevation').dropzone({
    dictDefaultMessage: "Upload Front Elevation files here",
    paramName: 'fort_elevation',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_fort_elevation').hide();
        toastr["success"]('FRONT ELEVATION files uploaded.', "Success");
      })
    },
  });

  //Side Elevation CAVITY Upload
  $('#dropzone_sw_side_elevation1').dropzone({
    dictDefaultMessage: "Upload Side Elevation 1 files here",
    paramName: 'side_elevation1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_side_elevation1').hide();
        toastr["success"]('SIDE ELEVATION 1 files uploaded.', "Success");
      })
    },
  });

  //Side Elevation CAVITY Upload
  $('#dropzone_sw_side_elevation2').dropzone({
    dictDefaultMessage: "Upload Side Elevation 2 files here",
    paramName: 'side_elevation2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_side_elevation2').hide();
        toastr["success"]('SIDE ELEVATION 2 files uploaded.', "Success");
      })
    },
  });

  //Rear Elevation CAVITY Upload
  $('#dropzone_sw_rear_elevation').dropzone({
    dictDefaultMessage: "Upload Rear Elevation files here",
    paramName: 'rear_elevation',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_rear_elevation').hide();
        toastr["success"]('REAR ELEVATION files uploaded.', "Success");
      })
    },
  });

  //Water Closet 1 CAVITY Upload
  $('#dropzone_sw_water_closet1').dropzone({
    dictDefaultMessage: "Upload Water Closet 1 files here",
    paramName: 'water_closet1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_water_closet1').hide();
        toastr["success"]('WATER CLOSET 1 files uploaded.', "Success");
      })
    },
  });

  //Water Closet 2 CAVITY Upload
  $('#dropzone_sw_water_closet2').dropzone({
    dictDefaultMessage: "Upload Water Closet 2 files here",
    paramName: 'water_closet2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_water_closet2').hide();
        toastr["success"]('WATER CLOSET 2 files uploaded.', "Success");
      })
    },
  });

  //Water Closet 3 CAVITY Upload
  $('#dropzone_sw_water_closet3').dropzone({
    dictDefaultMessage: "Upload Water Closet 3 files here",
    paramName: 'water_closet3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_water_closet3').hide();
        toastr["success"]('WATER CLOSET 3 files uploaded.', "Success");
      })
    },
  });

  //Water Closet 4 CAVITY Upload
  $('#dropzone_sw_water_closet4').dropzone({
    dictDefaultMessage: "Upload Water Closet 4 files here",
    paramName: 'water_closet4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_water_closet4').hide();
        toastr["success"]('WATER CLOSET 4 files uploaded.', "Success");
      })
    },
  });

  //Water Closet 5 CAVITY Upload
  $('#dropzone_sw_water_closet5').dropzone({
    dictDefaultMessage: "Upload Water Closet 5 files here",
    paramName: 'water_closet5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_water_closet5').hide();
        toastr["success"]('WATER CLOSET 5 files uploaded.', "Success");
      })
    },
  });

  //Utility CAVITY Upload
  $('#dropzone_sw_utility').dropzone({
    dictDefaultMessage: "Upload Utility files here",
    paramName: 'utility',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_utility').hide();
        toastr["success"]('UTILITY files uploaded.', "Success");
      })
    },
  });

  //Lounge 1 CAVITY Upload
  $('#dropzone_sw_lounge1').dropzone({
    dictDefaultMessage: "Upload Lounge 1 files here",
    paramName: 'lounge1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_lounge1').hide();
        toastr["success"]('LOUNGE 1 files uploaded.', "Success");
      })
    },
  });

  //Lounge 2 CAVITY Upload
  $('#dropzone_sw_lounge2').dropzone({
    dictDefaultMessage: "Upload Lounge 2 files here",
    paramName: 'lounge2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_lounge2').hide();
        toastr["success"]('LOUNGE 2 files uploaded.', "Success");
      })
    },
  });

  //Lounge 3 CAVITY Upload
  $('#dropzone_sw_lounge3').dropzone({
    dictDefaultMessage: "Upload Lounge 3 files here",
    paramName: 'lounge3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_lounge3').hide();
        toastr["success"]('LOUNGE 3 files uploaded.', "Success");
      })
    },
  });

  //bathroom1 CAVITY Upload
  $('#dropzone_sw_bathroom1').dropzone({
    dictDefaultMessage: "Upload Bathroom 1 files here",
    paramName: 'bathroom1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_bathroom1').hide();
        toastr["success"]('BATHROOM 1 files uploaded.', "Success");
      })
    },
  });

  //bathroom2 CAVITY Upload
  $('#dropzone_sw_bathroom2').dropzone({
    dictDefaultMessage: "Upload Bathroom 2 files here",
    paramName: 'bathroom2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_bathroom2').hide();
        toastr["success"]('BATHROOM 2 files uploaded.', "Success");
      })
    },
  });

  //bathroom3 CAVITY Upload
  $('#dropzone_sw_bathroom3').dropzone({
    dictDefaultMessage: "Upload Bathroom 3 files here",
    paramName: 'bathroom3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_bathroom3').hide();
        toastr["success"]('BATHROOM 3 files uploaded.', "Success");
      })
    },
  });

  //bathroom4 CAVITY Upload
  $('#dropzone_sw_bathroom4').dropzone({
    dictDefaultMessage: "Upload Bathroom 4 files here",
    paramName: 'bathroom4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_bathroom4').hide();
        toastr["success"]('BATHROOM 4 files uploaded.', "Success");
      })
    },
  });

  //bathroom5 CAVITY Upload
  $('#dropzone_sw_bathroom5').dropzone({
    dictDefaultMessage: "Upload Bathroom 5 files here",
    paramName: 'bathroom5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_bathroom5').hide();
        toastr["success"]('BATHROOM 5 files uploaded.', "Success");
      })
    },
  });

    //cupboard1 CAVITY Upload
  $('#dropzone_sw_cupboard1').dropzone({
    dictDefaultMessage: "Upload Cupboard 1 files here",
    paramName: 'cupboard1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_cupboard1').hide();
        toastr["success"]('CUPBOARD 1 files uploaded.', "Success");
      })
    },
  });

  //cupboard2 CAVITY Upload
  $('#dropzone_sw_cupboard2').dropzone({
    dictDefaultMessage: "Upload Cupboard 2 files here",
    paramName: 'cupboard2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_cupboard2').hide();
        toastr["success"]('CUPBOARD 2 files uploaded.', "Success");
      })
    },
  });

  //cupboard3 CAVITY Upload
  $('#dropzone_sw_cupboard3').dropzone({
    dictDefaultMessage: "Upload Cupboard 3 files here",
    paramName: 'cupboard3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_cupboard3').hide();
        toastr["success"]('CUPBOARD 3 files uploaded.', "Success");
      })
    },
  });

  //cupboard4 CAVITY Upload
  $('#dropzone_sw_cupboard4').dropzone({
    dictDefaultMessage: "Upload Cupboard 4 files here",
    paramName: 'cupboard4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_cupboard4').hide();
        toastr["success"]('CUPBOARD 4 files uploaded.', "Success");
      })
    },
  });

  //cupboard5 CAVITY Upload
  $('#dropzone_sw_cupboard5').dropzone({
    dictDefaultMessage: "Upload Cupboard 5 files here",
    paramName: 'cupboard5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_cupboard5').hide();
        toastr["success"]('CUPBOARD 5 files uploaded.', "Success");
      })
    },
  });

  //Conservatory CAVITY Upload
  $('#dropzone_sw_conservatory').dropzone({
    dictDefaultMessage: "Upload Conservatory files here",
    paramName: 'conservatory',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_conservatory').hide();
        toastr["success"]('CONSERVATORY files uploaded.', "Success");
      })
    },
  });

  //stairs1 CAVITY Upload
  $('#dropzone_sw_stairs1').dropzone({
    dictDefaultMessage: "Upload Stairs 1 files here",
    paramName: 'stairs1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_stairs1').hide();
        toastr["success"]('STAIRS 1 files uploaded.', "Success");
      })
    },
  });

  //stairs2 CAVITY Upload
  $('#dropzone_sw_stairs2').dropzone({
    dictDefaultMessage: "Upload Stairs 2 files here",
    paramName: 'stairs2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_stairs2').hide();
        toastr["success"]('STAIRS 2 files uploaded.', "Success");
      })
    },
  });

  //stairs3 CAVITY Upload
  $('#dropzone_sw_stairs3').dropzone({
    dictDefaultMessage: "Upload Stairs 3 files here",
    paramName: 'stairs3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_stairs3').hide();
        toastr["success"]('STAIRS 3 files uploaded.', "Success");
      })
    },
  });

    //garage1 CAVITY Upload
  $('#dropzone_sw_garage1').dropzone({
    dictDefaultMessage: "Upload Garage 1 files here",
    paramName: 'garage1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_garage1').hide();
        toastr["success"]('GARAGE 1 files uploaded.', "Success");
      })
    },
  });

  //garage2 CAVITY Upload
  $('#dropzone_sw_garage2').dropzone({
    dictDefaultMessage: "Upload Garage 2 files here",
    paramName: 'garage2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_garage2').hide();
        toastr["success"]('GARAGE 2 files uploaded.', "Success");
      })
    },
  });

//wall_thickness1 CAVITY Upload
  $('#dropzone_sw_wall_thickness1').dropzone({
    dictDefaultMessage: "Upload Wall Thickness 1 files here",
    paramName: 'wall_thickness1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_wall_thickness1').hide();
        toastr["success"]('WALL THICKNESS 1 files uploaded.', "Success");
      })
    },
  });

  //wall_thickness2 CAVITY Upload
  $('#dropzone_sw_wall_thickness2').dropzone({
    dictDefaultMessage: "Upload Wall Thickness 2 files here",
    paramName: 'wall_thickness2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_wall_thickness2').hide();
        toastr["success"]('WALL THICKNESS 2 files uploaded.', "Success");
      })
    },
  });

  //wall_thickness3 CAVITY Upload
  $('#dropzone_sw_wall_thickness3').dropzone({
    dictDefaultMessage: "Upload Wall Thickness 3 files here",
    paramName: 'wall_thickness3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_wall_thickness3').hide();
        toastr["success"]('WALL THICKNESS 3 files uploaded.', "Success");
      })
    },
  });

  //wall_thickness4 CAVITY Upload
  $('#dropzone_sw_wall_thickness4').dropzone({
    dictDefaultMessage: "Upload Wall Thickness 4 files here",
    paramName: 'wall_thickness4',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_wall_thickness4').hide();
        toastr["success"]('WALL THICKNESS 4 files uploaded.', "Success");
      })
    },
  });

  //wall_thickness5 CAVITY Upload
  $('#dropzone_sw_wall_thickness5').dropzone({
    dictDefaultMessage: "Upload Wall Thickness 5 files here",
    paramName: 'wall_thickness5',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_wall_thickness5').hide();
        toastr["success"]('WALL THICKNESS 5 files uploaded.', "Success");
      })
    },
  });

    //fused_spur1 CAVITY Upload
  $('#dropzone_sw_fused_spur1').dropzone({
    dictDefaultMessage: "Upload Fused Spur 1 files here",
    paramName: 'fused_spur1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_fused_spur1').hide();
        toastr["success"]('FUSED SPUR 1 files uploaded.', "Success");
      })
    },
  });

  //fused_spur2 CAVITY Upload
  $('#dropzone_sw_fused_spur2').dropzone({
    dictDefaultMessage: "Upload Fused Spur 2 files here",
    paramName: 'fused_spur2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_fused_spur2').hide();
        toastr["success"]('FUSED SPUR 2 files uploaded.', "Success");
      })
    },
  });

  //fused_spur3 CAVITY Upload
  $('#dropzone_sw_fused_spur3').dropzone({
    dictDefaultMessage: "Upload Fused Spur 3 files here",
    paramName: 'fused_spur3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_fused_spur3').hide();
        toastr["success"]('FUSED SPUR 3 files uploaded.', "Success");
      })
    },
  });

    //room_stat1 CAVITY Upload
  $('#dropzone_sw_room_stat1').dropzone({
    dictDefaultMessage: "Upload Room Stat 1 files here",
    paramName: 'room_stat1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_room_stat1').hide();
        toastr["success"]('ROOM STAT 1 files uploaded.', "Success");
      })
    },
  });

  //room_stat2 CAVITY Upload
  $('#dropzone_sw_room_stat2').dropzone({
    dictDefaultMessage: "Upload Room Stat 2 files here",
    paramName: 'room_stat2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_room_stat2').hide();
        toastr["success"]('ROOM STAT 2 files uploaded.', "Success");
      })
    },
  });

  //room_stat3 CAVITY Upload
  $('#dropzone_sw_room_stat3').dropzone({
    dictDefaultMessage: "Upload Room Stat 3 files here",
    paramName: 'room_stat3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_room_stat3').hide();
        toastr["success"]('ROOM STAT 3 files uploaded.', "Success");
      })
    },
  });

    //programmer1 CAVITY Upload
  $('#dropzone_sw_programmer1').dropzone({
    dictDefaultMessage: "Upload Programmer 1 files here",
    paramName: 'programmer1',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_programmer1').hide();
        toastr["success"]('PROGRAMMER 1 files uploaded.', "Success");
      })
    },
  });

  //programmer2 CAVITY Upload
  $('#dropzone_sw_programmer2').dropzone({
    dictDefaultMessage: "Upload Programmer 2 files here",
    paramName: 'programmer2',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_programmer2').hide();
        toastr["success"]('PROGRAMMER 2 files uploaded.', "Success");
      })
    },
  });

  //programmer3 CAVITY Upload
  $('#dropzone_sw_programmer3').dropzone({
    dictDefaultMessage: "Upload Programmer 3 files here",
    paramName: 'programmer3',
    maxFilesize: 700,
    addRemoveLinks: true,
    thumbnail: false,
    createImageThumbnails: false,
    uploadMultiple: true,
    acceptedFiles:"audio/*,image/*,application/zip,.zip,.rar,application/rar,.xlsm, .psd,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv",
    init: function() {
      this.on("complete", function(file) {
        this.removeFile(file);
      }),
      this.on("queuecomplete", function() {
        // $('.fa-ul').append('<li><i class="fa fa-check fa-li text-success"></i> LANDLORD PERMISSION</li>');
        $('#dropzone_sw_programmer3').hide();
        toastr["success"]('PROGRAMMER 3 files uploaded.', "Success");
      })
    },
  });

});