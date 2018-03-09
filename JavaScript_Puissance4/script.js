(function($){
  $.fn.puissance4 = function(options){

    var paramGame = {
      grid : {"ROWS": 6, "COLS": 7},
      player_1 : { "jetonR":"red"},
      player_2 : { "jetonJ":"yellow"},
    }
    var parameters = $.extend(paramGame, options);
    return this.each(function(){
      getLayout(this); 
      getGrid(parameters, this);
      reset(this);
      newGame(this);
      getPlay(this, parameters);
    });
  }
})(jQuery);
function getLayout(mydiv){  
  $(mydiv).append($("<div>", {  class: "score" }));
  $(mydiv).append($("<div>", {  class: "grid" }));
}
function reset(mydiv){
  var reset = $(mydiv).children(".score").prepend($("<div>", {  class: "infos" }));
  reset.prepend($("<button  margin='1%'>Reset score</button><br>", { class: "reset", type:"reset" }));
  reset.click(function(){
    location.reload();
  })
}
function newGame(mydiv){
  var newGame = $(mydiv).children(".score").prepend($("<div>", {  class: "infos1" }));
  newGame.prepend($("<button  margin='1%'>Nouvelle partie</button><br>", { class: "newplay", type:"newplay" }));
  newGame.click(function(){
    $( ".grid" ).empty();
  })
}
/*function getscores(mydiv){
  var savewin = $(mydiv).children(".score").children(".infos1" }).prepend($("<div>", {  class: "affichescores" }));


}*/
function getGrid(parameters, mydiv){
  var grid = [];
  var row = []
  $(mydiv).children(".grid").append($("<table>", { class: "table" }));
  for (i = 1 ; i <= parameters["grid"]["ROWS"] ; i++) {
    $(mydiv).children(".grid").children(".table").append($("<tr>", {
      class: i
    }));  

  } 
  for (j = 0 ; j < parameters["grid"]["COLS"]; j++) {
    $(mydiv).children(".grid").children(".table").children($(".tbody")).children($("tr")).append($("<td>", {
      class: j
    })); 
    $("td").slice(0).val("true");
  }
}
function getPlay(mydiv, parameters){
  var count = 0;
  var mytd =  $(mydiv).children(".grid").children(".table").children($(".tbody")).children($("tr")).children($("<td>"))
  mytd.click(function(){
    var x = $(this).parent().index(); // index du parent sur l'element cliqué
    var y = $(this).index(); // index tout court
    var position = $(this).offset(); 
    var posleft = Math.ceil(position.left);
    if($(this).val() == "true"){
      if (count%2 == 0) {
        $(mydiv).children(".score").children(".infos1").text( "Au joueur 2 de jouer." ); 
      }
      else { 
        $(mydiv).children(".score").children(".infos1").text( "Au joueur 1 de jouer." );
      }
      if ($(this).val() == "true") {
        var arrayA = ($('tbody')).children($('<tr>'));
        var lenght = parameters["grid"]["ROWS"] - 1;
        for (var i = lenght; i >= x ; i--) {
          var myCoinsLove = arrayA[i].children[y];
          if(myCoinsLove.value == "true"){
            if (count%2 == 0) {
              $(myCoinsLove).css('background-color', parameters["player_1"]["jetonR"]);
              var player = parameters["player_1"]["jetonR"];
              $(myCoinsLove).addClass('perso1');
            }
            else{
              $(myCoinsLove).css('background-color', parameters["player_2"]["jetonJ"]);
              $(myCoinsLove).addClass('perso2');
              var player = parameters["player_2"]["jetonJ"];
            }
            var backcoin = $(myCoinsLove).offset();
            var posback = Math.ceil(backcoin.top);
            $(myCoinsLove).val(player); 
            checkrows(mydiv,parameters);
            checkcols(mydiv, parameters);
            count++
            break;
          }
        }
      } 
    }
  });
}
function checkrows(mydiv, parameters){
  var ok = $(mydiv).children(".grid").children(".table").children($(".tbody")).children($("tr"))
  var pos = 0;
  var A = 0;
  var B = 0;
  var maxA = 0;
  var maxB = 0;
  for (var i = 0; i < parameters["grid"]["ROWS"] ; i++){
    for (var idx = 0 ; idx < parameters["grid"]["COLS"] ; idx++){
      pos = parameters["grid"]["COLS"] * i + idx;
      var name = ok.children($("td"))[pos];
      if (name.className.indexOf("perso1") != -1){
        A++;
        B = 0;
        if (A > maxA) {
          maxA = A;
        }
      }
      else if (name.className.indexOf("perso2") != -1){
        B++;
        A = 0;
        if (B > maxB) {
        maxB = B;
        }
      }
      else {
        A = 0;
        B = 0;
      }
    }
  }
  if (maxA == 4) {
    alert("Victoire du joueur 1");
  }
  if (maxB == 4) {
    alert("Victoire du joueur 2");
  }
}
function checkcols(mydiv, parameters){
  var ok = $(mydiv).children(".grid").children(".table").children($(".tbody")).children($("tr"))
  var pos = 0;
  var A = 0;
  var B = 0;
  var maxA = 0;
  var maxB = 0;
  var idx = 0;
  for (var idx = 0; idx < parameters["grid"]["COLS"]; idx++) {
    for (var i = 0; i < parameters["grid"]["COLS"]; i++){
      pos = parameters["grid"]["COLS"] * i + idx ;
      if (pos >= 42)
        break;
      var name = ok.children($("td"))[pos];
      if (name.className.indexOf("perso1") != -1){
        A++;
        B = 0;
        if (A > maxA) {
          maxA = A;
        }
      }
      else if (name.className.indexOf("perso2") != -1){
        B++;
        A = 0;
        if (B > maxB) {
          maxB = B;
        }
      }
      else {
        A = 0;
        B = 0;
      }
    }
  }
  if (maxA == 4) {
    alert("Victoire du joueur 1");
  }
  if (maxB == 4) {
    alert("Victoire du joueur 2");
  }
}
