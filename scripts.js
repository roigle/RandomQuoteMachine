$(document).ready(function() {
  
  getQuote();
  
  $("#new-quote").click(function() {
    getQuote();
  });
  
}); // end of document.ready


function getQuote() {
  
  // get the current quote
  // trim is used to remove the extra space at the beggining of the string
  const currentQuote = $('#text').text().trim();  
  
  // get the quotes
  $.getJSON("https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json", function(result){
    const jsonQuotes = result;
    
    // pick a random quote
    const quoteIndex = 1 + Math.floor(Math.random() * jsonQuotes["quotes"].length);
    const quote = jsonQuotes["quotes"][quoteIndex - 1];
    
    // fill the card with the quote and the author
    // checking is first load or not  
    if(currentQuote == '') {
      $('#text').html('<i class="fas fa-quote-left fa-xs"></i>&nbsp' + quote["quote"]);
      $('#text').fadeIn();

      $('#author').text('- ' + quote["author"]);
      $('#author').fadeIn();
      
    }
    else {
      
      $('#quote-box').hide(400)
      .animate({opacity: 0}, 400, function() {
        $('#text').html('<i class="fas fa-quote-left fa-xs"></i>&nbsp' + quote["quote"]);
        $('#author').text('- ' + quote["author"]);
      })
      .animate({opacity: 1, queue: false}, 400)
      .show(400);
    }

    // configure the twtitter button
    $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + quote["quote"] + '" - ' + quote["author"]))
  });
  
}
