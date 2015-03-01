/* 
 * PARSLEY JS CUSTOM VALIDATOR
 * verify if the email is already taken
 * 
 * @return boolean
*/

window.ParsleyValidator.addValidator('email_validate', function (value, requirement) {
  var result = false;
  $.ajax({
    url : '/api/auth/v0/validate/email',
    method : 'POST',
    async : false,
    data : {email : $('#reg-email').val()},
    success : function(res, obj, xhr){
      result = (xhr.status === 200) ? true : false;
    }
  })
  return result;
}, 32)
.addMessage('en', 'email_validate', 'Email already in use')


/*
 * AJAX REGISTRATION CALL
 * if the registration form is valid the password is encrypted and the user is registered 
*/
$('#reg-button').on('click', function(e){
    e.preventDefault();
    var isValid = $('#reg-form').parsley().validate();
    if (isValid){
      var user = {};
      user.email = $('#reg-email').val();
      user.password = $('#reg-password').val();
      $.ajax({
        url : '/api/user/v0/users',
        method : 'POST',
        data : user,
        success : function(){
          window.location.href = window.location.href;
        }
      })
    }
  })