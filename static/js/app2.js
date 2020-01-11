var numberRecipes =  d3.select("#number-recipes");

function sayhi(input) {
    console.log(input);
};

function docsearch() {

  var inputElement1 = d3.select("#word-search2");
  var js_search_term = inputElement1.property("value");
  console.log(js_search_term);

  d3.json(`/readfull/${js_search_term}`).then((response) => {
      console.log('ran search.');
      console.log(response);
      console.log(response.length);

      numberRecipes.html("");
      numberRecipes.text(response.length);

       var tbody = d3.select(".table").select("tbody");
       tbody.html("");
       
       response.forEach((x) => {
        
        var row = tbody.append("tr");

        Object.entries(x).forEach(([key, value]) => {
            if(key == '_id'){

              url = 'localhost:5000'
              var newbutton = row.append("button")
                .text("view")
                .attr("id", "buttonCentre")
                .attr("data-toggle", "modal")
                .attr("data-target", "#myModal")
                .classed("Button", true)
                .on('click',  function(){
                      
                      console.log(value)
                    
                      var myOid = JSON.stringify(value);
                      myOid = myOid.replace('{"$oid":"', '');
                      myOid = myOid.replace('"}', '');
                      console.log(myOid);

                      d3.json(`/detail/${myOid}`).then((response) => {
                        
                      var modal = document.getElementById("myModal");
                      var span = document.getElementsByClassName("close")[0];
                      span.onclick = function() {
                        modal.style.display = "none";
                      };
                      modal.style.display = "block"
                      window.onclick = function(event) {
                        if (event.target == modal) {
                          modal.style.display = "none";
                        }
                      };
                        
                        
                        d3.select('#mPar').text("");
                        Object.entries(x).forEach(([key, value]) => {
                          if(key == 'name'){
                            dispValue = value;
                            dispValue = dispValue.replace(/\s+/g, ' ')
                            dispValue = dispValue.replace(" s ", "'s ");
                            function titleCase(str) {
                              var splitStr = str.toLowerCase().split(' ');
                              for (var i = 0; i < splitStr.length; i++) {
                                  splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);};
                                return splitStr.join(' ');};
                            dispValue = titleCase(dispValue);
                            d3.select('#mRecipe').text(dispValue);
                          };

                          if(key == 'desc'){
                            dispValue = value
                            dispValue = dispValue.replace(/\s+/g, ' ')                     
                            dispValue = dispValue.replace(/ ,/g, ','); 
                            dispValue = dispValue[0].toUpperCase() + dispValue.slice(1);
                            d3.select('#mDesc').text(dispValue);
                          };

                          if(key == 'ingredients'){
                            dispValue = value
                            dispValue = dispValue.replace(/\s+/g, ' '); 
                            dispValue = dispValue.replace(/ ,/g, ',');                           
                            dispValue = dispValue.replace("[", "");
                            dispValue = dispValue.replace("]", "");
                            dispValue = dispValue.replace(" , ", ", ");
                            dispValue = dispValue.replace(/'/g, '');
                            dispValue = dispValue[0].toUpperCase() + dispValue.slice(1);
                            d3.select('#mIngreds').text(dispValue);
                          };

                          if(key == 'steps'){
                            dispValue = value
                            dispValue = dispValue.replace(/\s+/g, ' '); 
                            dispValue = dispValue.replace(/ ,/g, ',');
                            // dispValue = dispValue.replace(" ,", ",");
                            //dispValue = dispValue.replace(" , ", ", ");
                            dispValue = dispValue.replace("[", "");
                            dispValue = dispValue.replace("]", "");

                            dispValue = dispValue.replace(/'/g, '');
                            dispValue = dispValue[0].toUpperCase() + dispValue.slice(1);
                            d3.select('#mSteps').text(dispValue);
                          };

                        });

                      });
                    
                    });

              // newbutton = row.append("button");
              // newbutton.text('View');

              // newbutton.onclick = sayhi('1')
              // newbutton.addEventListener('click', sayhi())
              // console.log(value);
            };

            if(key == 'name' ){
                var cell = row.append("td");
                cell.text(value);
            };

         });
      });


      // $("tr:not(:has(th))").mouseover(function () {
      //   $(this).addClass("hover");
      //   });
 
      // $("tr:not(:has(th))").mouseleave(function () {
      //   $(this).removeClass("hover");
      //   });

    });
};

function objectLength(obj) {
  var result = 0;
  for(var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      result++;
    }
  }
  return result;
}

// jQuery script
$(document).ready(function(){
  $( function() {
    $( "#tabs" ).tabs();
    plistsetup();
  } );

  // $("div.docsList table").delegate('tr', 'click', function() {
  //     var currentRow=$(this).closest("tr"); // get the current row
  //     var fp1=currentRow.find("td:eq(0)").text(); // get current row 1st TD value
  //     var fp2=currentRow.find("td:eq(2)").text();
  //     var js_filepath = fp1.concat('/', fp2, '.txt')


  //     $.ajax({
  //       url : js_filepath,
  //       dataType: "text",
  //       success : function (data) {
  //           //$(".gfg").html(data);
  //           // var text = d3.select(".gfg").select("p");
  //           // text.html("")
  //           document.getElementById("fulltext").innerHTML = ""
  //           $("#fulltext").append(`${data}`)
  //       }
  //     });

  //   });
  
  // Get the modal
  
  
  // Get the <span> element that closes the modal
  
  
  // When the user clicks on <span> (x), close the modal

  
  // When the user clicks anywhere outside of the modal, close it

      




});











// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}



















