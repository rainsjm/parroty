/*
 * API CALL TO LOGIN A USER
 *
 * The endpoint want the following parameters in the body request
 *
 * @param email    (String) required
 * @param password (String) required
 */

$('#login-button').on('click', function(e){
    e.preventDefault();
    var isValid = $('#login-form').parsley().validate();
    if (isValid){
      var data = {};
      data.email = $('#login-email').val();
      data.password = $('#login-password').val();

      $.ajax({
        url : '/auth/v0/local/login',
        method : 'POST',
        data : data,
        success : function(res, obj, xhr){
          window.location.href = window.location.href;
        },
        error : function(){
          $('#error-login').fadeIn();
        }
      })
    }
  })

/*
 * PASSWORD ENCRYPT BEFORE SEND SYNCHRONOUS FORM
 */
$('#login-password').on('focusout', function(e){
  e.preventDefault();
  var hash_pass = $('#login-password').val();
  $('#login-password').val(hash_pass);
})