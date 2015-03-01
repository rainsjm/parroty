/*global define*/

define(['hbs!./templates/photo.upload', 
   './lib/jquery-fileupload/js/jquery.fileupload', 
   './lib/jquery-fileupload/js/jquery.fileupload-validate'], function(Template) {
  
  var params; 
  return {

    type: 'Backbone.View',

      initialize: function() {
        this.sandbox.on('user.status', this.render, this);
        params = this.sandbox.s42.getBaseTemplateParams();
        params.uploadUrl =  this.sandbox.s42.getDomain() + '/api/photo/v0/photos';
        params.logged = !this.sandbox.s42.isGuest();

        if(params.user.isLoaded)
            this.render(params);
      },

      render: function() {
        params.user = this.sandbox.s42.getBaseTemplateParams().user;
        this.$el.html(Template(params));

        var albumName = 'default'
        if($(this.$el).data('album-id'))
          albumName= $(this.$el).data('album-id')
        $('#fileupload').fileupload({
          url: this.sandbox.s42.getDomain() + '/api/photo/v0/photos',
          formData: {'userId': this.sandbox.s42.getUser()._id, 'albumName': albumName },
          maxFileSize: 1000000,
          done: function (e, data) {
            $('#upload-wrapper').hide();
            $('#fileupload-message').html('Upload succesfully')  
          },
          fail: function () {
             $('#upload-wrapper').hide();
             $('#fileupload-message').html('Ops somethings when wrong')
            },
          add: function (e, data) {
             data.submit();
             $('#upload-wrapper').hide();
             $('#fileupload-message').html('...uploading')
          }
        });
      },
   };

});
