/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {
  $('.errors').hide()

  const data = []

  // function that protects from xss attacks
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}
  
  // html used when prepending form submissions to data
  const createTweetElement = function(tweet) {
    let output = `
    <section class="list-tweet">
    <article>
    <header>
      <div class="logo">           
        <img style="margin-right: 10px" src=${tweet.user.avatars}> </img>
        <p>${tweet.user.name}</p>
      </div>
      <div  class="username">
        <p>${tweet.user.handle}</p>
    </div>
    </header>
    <div class="post">
      ${escape(tweet.content.text)}
    </div>
    <footer>
      <div>
        ${moment(tweet.created_at).fromNow()}
      </div>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>
  </section>
    `;
    return output;
  }

  // function to load and display previous tweets
  const loadTweets = function(){
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
    .then(function (results) {
      renderTweets(results)
    })
  }
  
  loadTweets(data)

  // function to render the tweets use the createTweetElement() function
  const renderTweets = function(arr) {
    $("#tweets-container").empty()
    for (let obj of arr) {
      let tweet = createTweetElement(obj)
      $("#tweets-container").prepend(tweet)
    }
  }  

  // jQuery and ajax used to load form submissions in real time

  $("form").submit(function(event) {
    event.preventDefault();
    if ($('#tweet-text').val() === '') {
      $('.errors').html('You can not post and empty tweet.');
      return $(".errors").hide().slideDown(400)
    } else if ($('#tweet-text').val().length > 140) {
      $('.errors').html('Your tweet is too long.');
      return $(".errors").hide().slideDown(400)
    }
    $.ajax({
      url: '/tweets',
      method: "POST",
      data: $(this).serialize(),
    })
    .then((result) => {
      loadTweets(data)
      $(".errors").slideUp()
      $('#tweet-text').val('')
      $('#counter').text(140)
    }).catch(err => {
      console.log('error caught')
      console.log(err)
    })
  })

});
