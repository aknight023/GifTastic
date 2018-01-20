$(document).ready(function(){

    var topics = ['apple', 'pizza', 'chips', 'candy', 'cheeseburgers', 'cherrys', 'strawberry', 'soda', 'hot wings'];

    function displayImg () {
    
    $(".display-images").empty();
    var input = $(this).attr("data-name");
    var limit = 10;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + encodeURIComponent(input) + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC";


        $.ajax({
          url: queryURL,
          method: 'GET'
        }).then(function(response) {
            console.log(response);

            for(var j = 0; j < limit; j++) {    

                    var displayDiv = $("<div>");
                    displayDiv.addClass("imagesGif");

                    var image = $("<img>");

                    image.attr("src", response.data[j].images.fixed_height_still.url);
                    image.attr("data-still", response.data[j].images.fixed_height_still.url);
                    image.attr("data-animate", response.data[j].images.fixed_height.url);
                    
                    image.addClass('gif'); 
                   
                    displayDiv.append(image);

                    var gifRating = response.data[j].rating;
                
                    var pElmRating = $("<p class='rating'>").text("GIF Rating: " + gifRating);
                    displayDiv.append(pElmRating);

                $(".display-images").append(displayDiv);

            }

        });

    }

    function renderButtons() {
        
        $("#display-buttons").empty();

        for (var i = 0; i < topics.length; i++) {

          var buttonElm = $("<button>");
          buttonElm.addClass("btn btn-success food-btn m-2");
          buttonElm.attr("data-name", topics[i]);
          buttonElm.text(topics[i]);
          $("#display-buttons").append(buttonElm);
        }
    }

    function changeState() {

        var imgObj = $(this);

        var still = imgObj.attr('data-still');
        var animate = imgObj.attr('data-animate');

        if (imgObj.attr('src') == still) {
            imgObj.attr('src', animate);

        } else if (imgObj.attr('src') == animate) {

            imgObj.attr('src', still);
        }

    }

    $("#submitButton").on("click", function(){

        var input = $("#inputFromUser").val().trim();
        document.getElementById("form-box").reset();
        if (input == '') {
        alert("Please enter a search topic!");
        return;
        }
        topics.push(input);
                
        renderButtons();        
    });   
 
    renderButtons();

    $(document).on("click", '.food-btn', displayImg); 
    $(document).on('click', 'img', changeState);

});
   