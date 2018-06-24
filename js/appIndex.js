//USANDO FIREBASE PARA INICIAR SESION

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  //Mandando llamar el sidenav
  
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  
  //Se manda a llamar la barra de opciones del perfil
  
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems);
  
  });
  
  //(function(){
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAtdoJpgCIo3WvZb2vlXg48Qu-IE-Rwkkc",
      authDomain: "mi-p-d4a76.firebaseapp.com",
      databaseURL: "https://mi-p-d4a76.firebaseio.com",
      projectId: "mi-p-d4a76",
      storageBucket: "mi-p-d4a76.appspot.com",
      messagingSenderId: "163277132167"
    };
    firebase.initializeApp(config);
  
    firebase.auth().onAuthStateChanged(firebaseUser =>{
      if(firebaseUser){
          console.log("logeado");
          //location.href="index.html"
      }else{
          console.log("not loged in");
          alert("your session expired, please log in again");
          location.href="login.html";
      }
  
  
  
      var user = firebase.auth().currentUser;
      var userName = user.email.match(/^([^@]*)@/)[1];
  
      //var rootRef = firebase.database().ref().child(userName);
      var rootRef = firebase.database().ref(userName);
      console.log(userName);
      rootRef.on("value", snap => {
  
        var PeliculasVistas = snap.child("PeliculasVistas").val();
        for(peli in PeliculasVistas)
        {
          $("#peliculasVistas").append("<div class='movieElement'><span>"+PeliculasVistas[peli]+"</span></div>");
          $(".movieElement").addClass("collapsible-body");
        }
  
        var watchList = snap.child("watchList").val();
        for(peli in watchList)
        {
          $("#watchList").append("<div class='movieElement'><span>"+watchList[peli]+"</span></div>");
          $(".movieElement").addClass("collapsible-body");
        }
  
        var Amigos = snap.child("Amigos").val();
        for(amigo in Amigos)
        {
          //$("#Amigos").append("<div class='friendElement'><span>"+Amigos[amigo]+"</span></div>");
          //$(".friendElement").addClass("collapsible-body row");
          $("#Amigos").append("<div class='friendElement'><div class='chip col s6'><img src='assets/images/user.jpg' alt='Contact Person'>"+Amigos[amigo]+"</div></div>");
          $(".friendElement").addClass("collapsible-body"); 
        }
        $("#Amigos").append("<div class='col s4 friendElement'><a href='#add-friend' class='modal-trigger'> <i class='material-icons'>add_circle_outline </i>Anadir Amigos </a></div>");
          $(".friendElement").addClass("collapsible-body");
          
          function writeUserData(userId, name) {
            if(name!=""){
              var amigos = snap.child("amigos").val();
              var amigonumero= Object.keys(Amigos).length+1;
              var amigonext = "amigo"+ amigonumero.toString();
              firebase.database().ref(userId).update({
                amigonext: name
              });
            }
          }
          var valueNameFriend = $("#icon_prefix2").val();
          $("#add-friend-btn").click(writeUserData(userName, valueNameFriend));
  
        });
        
  });

  function getCard() {
    var inptComment = $("#comment").val();
    //console.log(inptComment);
    
    //Limpiar input
    $("#comment").val("");

    addCommentCard(inptComment);
}


var card = '<div class="row">' +
                    '<div class="col s6 offset-s2">' +
                        '<div class="card">' +
                            '<div class="card-content">' +
                                '<h5>__inptComment__</h5>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>'


function addCommentCard(comment) {
    var finalCard = ""; //declarar variable
    finalCard = card.replace("__inptComment__", comment) //primero lo que se a quitar, segundo por lo que se va a reemplazar
                
    
    var container = document.createElement("div");
    container.classList = "row";
    

    var likeIcon = document.createElement("i");
    likeIcon.innerHTML = "thumb_up";
    likeIcon.classList.add("material-icons", "like");
    

    var answerComment = document.createElement("i");
    answerComment.innerHTML = "insert_comment";
    answerComment.classList.add("material-icons", "commentIcon");

    container.append(likeIcon, answerComment);
    
    //Se agregan comentarios en pantalla
    $("main").append(finalCard, container); 

    $(".like").click(addLike);    
}


function addLike() {
    var likes = document.getElementsByClassName("like");

    for(var i = 0; i < likes.length; i++) {
        document.getElementsByClassName("like")[i].classList.toggle("color");
    }  
}


$(document).ready(function(){
  $(".dropdown-trigger").dropdown();
  $('.carousel').carousel();
  $('.sidenav').sidenav();
  $("#bttn-send").click(getCard);  
});
