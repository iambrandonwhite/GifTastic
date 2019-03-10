$(document).ready(function () {

  /// GLOBAL VARIABLES
  // ================================================================================================================================

  // Initial array of topics: movies
  var topics = [
      'Star Wars',
      'Scarface',
      'The Big Lebowskie',
      'Weekend at Bernies',
      'Commando',
      'Predator',
      'Aliens',
      'The Professional',
      'Blade Runner',
      'Forrest Gump',
  ];


  /// FUNCTIONS
  // ================================================================================================================================

  // Function for dumping JSON content for each button into div
  function displayGifs() {
      var movies = $(this).attr('data-name');

      // Setup URL query for search property, api key, limit and rating
      var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + movies + '&api_key=p50DfQwFy598v5gant96LlGRrffnWVTO&limit=10&rating=pg-13';

      // Make the AJAX call to GIPHY API
      $.ajax({ url: queryURL, method: 'GET' }).done(function (response) {
          console.log(response);

          // Grabs data
          var results = response.data;

          // Loop through results data
          for (var i = 0; i < results.length; i++) {
              var newDiv = $('<div>');
              
              // Display ratings
              var newRating = $('<h3>').html('Rating: ' + results[i].rating);

              // Display states of images
              var newImg = $('<img>');
              newImg.attr('src', results[i].images.fixed_height_still.url);
              newImg.attr('data-still', results[i].images.fixed_height_still.url);
              newImg.attr('data-animate', results[i].images.fixed_height.url);
              newImg.attr('data-state', 'still');
              newImg.addClass('gif');

              // Append new rating to div
              newDiv.append(newRating);

              // Append new image to div
              newDiv.append(newImg);

              // Append new gifs to the gifContainer
              $('#gifContainer').append(newDiv);
          }

          // Function for when animating gif and stop moving gif
          $('.gif').on('click', function () {
              event.preventDefault();
              var state = $(this).attr('data-state');

              // Make gif either animated or still depending on 'data-state' value
              if (state === 'still') {
                  $(this).attr('src', $(this).attr('data-animate'));
                  $(this).attr('data-state', 'animate');
              } else {
                  $(this).attr('src', $(this).attr('data-still'));
                  $(this).attr('data-state', 'still');
              }
          });
      });
  }

  // Function for displaying movie data
  function renderButtons() {

      // Delete buttons prior to adding new movies
      $('#moviesGroup').empty();

      // Looping through the array of movies
      for (var i = 0; i < topics.length; i++) {

          // Dynamically generate buttons for each movie in array
          var button = $('<button>');

          // Adding a class of movies to buttons
          button.addClass('movies');

          // Adding a data-attribute
          button.attr('data-name', topics[i]);

          // Providing the initial button text
          button.text(topics[i]);

          // Adding the button to the moviesGroup div
          $('#moviesGroup').append(button);
      }
  }

  // Function for when events button is clicked
  $("#addMoviesBtn").on("click", function (event) {
      event.preventDefault();

      // Alert textbox cannot be blank
      if ($('#newMoviesInput').val().trim().toLowerCase() == '') {
          window.alert('Please enter a movie name. Textbox cannot be left blank.');
      } else {

          // Grabs input from textbox
          var movies = $('#newMoviesInput').val().trim();

          // Add item to topics array
          topics.push(movies);

          // Call renderButtons to handle processing of topics array
          renderButtons();
      }
  });

  // On click movies button and run displayGifs function 
  $(document).on("click", ".movies", displayGifs);

  // Display all buttons on load
  renderButtons();

});
