(function() {
  $(document).on('ready page:load', function() {
    $('#signup_form').submit(function(event) {
      $.ajax({
        url: $(this).attr('action'),
        type: 'POST',
        data: $(this).serialize(),
        dataType: "json",
        error: function(jqXHR, textStatus, errorThrown) {
          return console.error("AJAX Error: " + textStatus);
        },
        success: function(data, textStatus, jqXHR) {
          var errors, field_name, messages, results;
          console.log(data);
          if (data && data['success']) {
            $('#signup_form').bsHide();
            $('#signup_form_container .success-block #email-placeholder').text(data['email']);
            return $('#signup_form_container .success-block').bsShow();
          } else if (data['error']) {
            errors = data['error'];
            results = [];
            for (field_name in errors) {
              messages = errors[field_name];
              $("#signup_form .form-group-" + field_name).addClass('has-error');
              results.push($("#signup_form .form-group-" + field_name + " .help-block").text(messages.join('<br>')).bsShow());
            }
            return results;
          } else {
            return console.error('Unable to process response');
          }
        }
      });
      return event.preventDefault();
    });
    return $('#signup_form input').focus(function() {
      var input_group;
      input_group = $(this).parents().closest('.form-group');
      input_group.removeClass('has-error');
      return input_group.find('.help-block').bsHide();
    });
  });

}).call(this);
