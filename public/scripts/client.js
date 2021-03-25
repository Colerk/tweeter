/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {

  

  const data = [
    // {
    //   "user": {
    //     "name": "Newton",
    //     "avatars": "https://i.imgur.com/73hZDYK.png"
    //     ,
    //     "handle": "@SirIsaac"
    //   },
    //   "content": {
    //     "text": "If I have seen further it is by standing on the shoulders of giants"
    //   },
    //   "created_at": 1461116232227
    // },
    // {
    //   "user": {
    //     "name": "Descartes",
    //     "avatars": "https://i.imgur.com/nlhLi3I.png",
    //     "handle": "@rd" },
    //   "content": {
    //     "text": "Je pense , donc je suis"
    //   },
    //   "created_at": 1461113959088
    // }
  ]
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  
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

  $("form").submit(function(event) {
    event.preventDefault();
    if ($('#tweet-text').val() === '') {
      return alert('No empty submissions please');
    } else if ($('#tweet-text').val().length > 140) {
      return alert('Too long I am afraid')
    }
    $.ajax({
      url: '/tweets',
      method: "POST",
      data: $(this).serialize(),
    })
    .then((result) => {
      loadTweets(data)
      $('#tweet-text').val('')
      $('#counter').text(140)
    }).catch(err => {
      console.log('error caught')
      console.log(err)
    })
  })

  const loadTweets = function(){
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
    .then(function (results) {
      // console.log('results', JSON.stringify(results))
      renderTweets(results)
    })
  }
  
  loadTweets(data)


  const renderTweets = function(arr) {
    for (let obj of arr) {
      let tweet = createTweetElement(obj)
      $("#tweets-container").prepend(tweet)
    }
  }  
  
  renderTweets(data);
  


});
