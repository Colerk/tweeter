// This creates the counter on the tweet form.

$(document).ready(function() {
  len = 140
  $('#counter').html(len)
  $('textarea').keyup(function() {
    if ($(this).val().length > len) {
      $('#counter').html(len-$(this).val().length).css("color", "red");
    } else {
      $('#counter').html(len-$(this).val().length).css("color", "#545149");
    }
  })
});
