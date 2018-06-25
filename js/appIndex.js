
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  //Mandando llamar el sidenav
  
    var elems2 = document.querySelectorAll('.sidenav');
    var instances2 = M.Sidenav.init(elems2);
  
  //Se manda a llamar la barra de opciones del perfil
  
  var elems3 = document.querySelectorAll('.collapsible');
  var instances3 = M.Collapsible.init(elems3);

  //Ejecutar botones floating sección comentarios 

  var elems4 = document.querySelectorAll('.fixed-action-btn');
  var instances4 = M.FloatingActionButton.init(elems4,{
    direction:"right"
  });
  
  });
  
  (function(){
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
        $("#peliculasVistas").append("<div id='addmovie' class='col s4 friendElement'><a href='#add-watchedMovie' class='modal-trigger'> <i class='material-icons'>add_circle_outline </i>Anadir Pelicula </a></div>");
          $(".movieElement").addClass("collapsible-body");
        var watchList = snap.child("watchList").val();
        for(peli in watchList)
        {
          $("#watchList").append("<div class='movieElement'><span>"+watchList[peli]+"</span></div>");
          $(".movieElement").addClass("collapsible-body");
        }
        $("#watchList").append("<div id='addmovie' class='col s4 friendElement'><a href='#add-movieWatchList' class='modal-trigger'> <i class='material-icons'>add_circle_outline </i>Anadir Pelicula </a></div>");
          $(".movieElement").addClass("collapsible-body");
        var Amigos = snap.child("Amigos").val();
        for(amigo in Amigos)
        {
          //$("#Amigos").append("<div class='friendElement'><span>"+Amigos[amigo]+"</span></div>");
          //$(".friendElement").addClass("collapsible-body row");
          $("#Amigos").append("<div class='friendElement'><div class='chip col s6'><img src='assets/images/user.jpg' alt='Contact Person'>"+Amigos[amigo]+"</div></div>");
          $(".friendElement").addClass("collapsible-body"); 
        }
        $("#Amigos").append("<div id='addfriends' class='col s4 friendElement'><a href='#add-friend' class='modal-trigger'> <i class='material-icons'>add_circle_outline </i>Anadir Amigos </a></div>");
          $(".friendElement").addClass("collapsible-body");
        /*  
          function writeUserData(userId, name) {
            if(name!=""){
              var amigos = snap.child("Amigos").val();
              var amigonumero= Object.keys(Amigos).length+1;
              var amigonext = "amigo"+ amigonumero.toString();
              firebase.database().ref(userId).update({
                amigonext: name
              });
            }
          }
          var valueNameFriend = $("#icon_prefix2").val();
          $("#add-friend-btn").click(writeUserData(userName, valueNameFriend));
      */
     document.getElementById("email").innerHTML = user.email;
        var profileData = snap.child("ProfileData").val();
        document.getElementById("name").innerHTML = profileData.Nombre;
        document.getElementById("profile-age").innerHTML = profileData.Edad;
        document.getElementById("profile-city").innerHTML = profileData.Ciudad;
        document.getElementById("profile-job").innerHTML = profileData.Ocupacion;
        document.getElementById("profile-status").innerHTML = profileData.estadoCivil;
        });
        $("#personal-data").append("<div id='addfriends' class='col s4 dataElement'><a href='#change-Info' class='modal-trigger'> <i class='material-icons'>add_circle_outline </i>Cambiar Infomacion </a></div>");
        $(".dataElement").addClass("collapsible-body");

  });
  } ());
  function writeUserData() {
   // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAtdoJpgCIo3WvZb2vlXg48Qu-IE-Rwkkc",
      authDomain: "mi-p-d4a76.firebaseapp.com",
      databaseURL: "https://mi-p-d4a76.firebaseio.com",
      projectId: "mi-p-d4a76",
      storageBucket: "mi-p-d4a76.appspot.com",
      messagingSenderId: "163277132167"
    };
    //firebase.initializeApp(config);
    var cont = 0;
    firebase.auth().onAuthStateChanged(firebaseUser =>{
      if(firebaseUser){
          console.log("logeado");
          //location.href="index.html"
      }else{
          console.log("not loged in");
          alert("your session expired, please log in again");
          location.href="login.html";
      }
  
    var input_text = document.getElementById("icon_prefix2");
    var input_text_value = input_text.value;
  
      var user = firebase.auth().currentUser;
      var userName = user.email.match(/^([^@]*)@/)[1];
    var rootRef = firebase.database().ref(userName);
    rootRef.on("value", snap => {
    if(cont>0)
      return;
              var amigos = snap.child("Amigos").val();
              var amigonumero= Object.keys(amigos).length+1;
        var amigo_index= Object.keys(amigos).length;
        var amigoindexValue = "amigo"+ amigo_index.toString();
              var amigonext = "amigo"+ amigonumero.toString();
        cont++;
              firebase.database().ref(userName+"/Amigos").update({
                [amigonext]: input_text_value
              });
      //return;
        //    }
  
      //var rootRef = firebase.database().ref().child(userName);
      console.log(userName);
   
          $("#addfriends").remove();
          //$("#Amigos").append("<div class='friendElement'><span>"+Amigos[amigo]+"</span></div>");
          //$(".friendElement").addClass("collapsible-body row");
          $("#Amigos").append("<div class='friendElement'><div class='chip col s6'><img src='assets/images/user.jpg' alt='Contact Person'>"+input_text_value+"</div></div>");
          $(".friendElement").addClass("collapsible-body"); 
        
        $("#Amigos").append("<div id='addfriends' class='col s4 friendElement'><a href='#add-friend' class='modal-trigger'> <i class='material-icons'>add_circle_outline </i>Anadir Amigos </a></div>");
          $(".friendElement").addClass("collapsible-body");
  
        });
        location.href="index.html";
  });
  }
  
  var selectedFile;
  
  $("#file").on("change", function(event){
    //$("#uploadButton").show()
    selectedFile = event.target.files[0];
    uploadFile();
  });
  
  function uploadFile() {
   var user = firebase.auth().currentUser;
      var userName = user.email.match(/^([^@]*)@/)[1];
  var filename = userName;
  var storageRef = firebase.storage().ref('/profileImages/' + filename);
  //var fileRef = storage.child(filename);
  var upLoadTask = storageRef.put(selectedFile);
  upLoadTask.on('state_changed', function(snapshot){
  }, function(error) {
  }, function() {
    var downloadURL = upLoadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log('File available at', downloadURL);
    });
  var user = firebase.auth().currentUser;
      var userName = user.email.match(/^([^@]*)@/)[1];
    var rootRef = firebase.database().ref(userName);
    //var starsRef = storageRef.child('/profileImages/' + filename)getDownloadURL().then(function(url) {});
    //var downloadURL = upLoadTask.snapshot.downloadURL;
    rootRef.on("value", snap => {
    /*if(cont>0)
      return;
              var amigos = snap.child("Amigos").val();
              var amigonumero= Object.keys(amigos).length+1;
        var amigo_index= Object.keys(amigos).length;
        var amigoindexValue = "amigo"+ amigo_index.toString();
              var amigonext = "amigo"+ amigonumero.toString();
        cont++;
        */
              firebase.database().ref().update({
               profileImage: downloadURL
              });
  });
  });
  }

function Logout(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
          location.href="login.html";
  }, function(error) {
    // An error happened.
  });
}

function writeMovies() {
  // Initialize Firebase
   var config = {
     apiKey: "AIzaSyAtdoJpgCIo3WvZb2vlXg48Qu-IE-Rwkkc",
     authDomain: "mi-p-d4a76.firebaseapp.com",
     databaseURL: "https://mi-p-d4a76.firebaseio.com",
     projectId: "mi-p-d4a76",
     storageBucket: "mi-p-d4a76.appspot.com",
     messagingSenderId: "163277132167"
   };
   //firebase.initializeApp(config);
   var cont = 0;
   firebase.auth().onAuthStateChanged(firebaseUser =>{
     if(firebaseUser){
         console.log("logeado");
         //location.href="index.html"
     }else{
         console.log("not loged in");
         alert("your session expired, please log in again");
         location.href="login.html";
     }
 
   var input_text = document.getElementById("watched-movie-value");
   var input_text_value = input_text.value;
 
     var user = firebase.auth().currentUser;
     var userName = user.email.match(/^([^@]*)@/)[1];
   var rootRef = firebase.database().ref(userName);
   rootRef.on("value", snap => {
   if(cont>0)
     return;
             var amigos = snap.child("PeliculasVistas").val();
             var amigonumero= Object.keys(amigos).length+1;
       var amigo_index= Object.keys(amigos).length;
       var amigoindexValue = "titulo"+ amigo_index.toString();
             var amigonext = "titulo"+ amigonumero.toString();
       cont++;
             firebase.database().ref(userName+"/PeliculasVistas").update({
               [amigonext]: input_text_value
             });
     //return;
       //    }
 
     //var rootRef = firebase.database().ref().child(userName);
     console.log(userName);
      /*
         $("#addmovie").remove();
         //$("#Amigos").append("<div class='friendElement'><span>"+Amigos[amigo]+"</span></div>");
         //$(".friendElement").addClass("collapsible-body row");
         $("#peliculasVistas").append("<div class='addmovie'><div class='chip col s6'><img src='assets/images/user.jpg' alt='Contact Person'>"+input_text_value+"</div></div>");
         $(".addmovie").addClass("collapsible-body"); 
       
       $("#peliculasVistas").append("<div id='addmovie' class='col s4 addmovie'><a href='#add-friend' class='modal-trigger'> <i class='material-icons'>add_circle_outline </i>Anadir Pelicula </a></div>");
         $(".addmovie").addClass("collapsible-body");
         */
         location.href="index.html";
       });
       
 });
 }

 function writeWatchlistItem() {
  // Initialize Firebase
   var config = {
     apiKey: "AIzaSyAtdoJpgCIo3WvZb2vlXg48Qu-IE-Rwkkc",
     authDomain: "mi-p-d4a76.firebaseapp.com",
     databaseURL: "https://mi-p-d4a76.firebaseio.com",
     projectId: "mi-p-d4a76",
     storageBucket: "mi-p-d4a76.appspot.com",
     messagingSenderId: "163277132167"
   };
   //firebase.initializeApp(config);
   var cont = 0;
   firebase.auth().onAuthStateChanged(firebaseUser =>{
     if(firebaseUser){
         console.log("logeado");
         //location.href="index.html"
     }else{
         console.log("not loged in");
         alert("your session expired, please log in again");
         location.href="login.html";
     }
 
   var input_text = document.getElementById("value-watch-list");
   var input_text_value = input_text.value;
 
     var user = firebase.auth().currentUser;
     var userName = user.email.match(/^([^@]*)@/)[1];
   var rootRef = firebase.database().ref(userName);
   rootRef.on("value", snap => {
   if(cont>0)
     return;
      var watchlist = snap.child("watchList").val();
      var pelinumero= Object.keys(watchlist).length+1;
       var peli_index= Object.keys(watchlist).length;
       var peliindexValue = "titulo"+ peli_index.toString();
             var pelinext = "titulo"+ pelinumero.toString();
       cont++;
             firebase.database().ref(userName+"/watchList").update({
               [pelinext]: input_text_value
             });
     //return;
       //    }
 
     //var rootRef = firebase.database().ref().child(userName);
     console.log(userName);
  /*
         $("#addmovie").remove();
         //$("#Amigos").append("<div class='friendElement'><span>"+Amigos[amigo]+"</span></div>");
         //$(".friendElement").addClass("collapsible-body row");
         $("#peliculasVistas").append("<div class='addmovie'><div class='chip col s6'><img src='assets/images/user.jpg' alt='Contact Person'>"+input_text_value+"</div></div>");
         $(".addmovie").addClass("collapsible-body"); 
       
       $("#peliculasVistas").append("<div id='addmovie' class='col s4 addmovie'><a href='#add-friend' class='modal-trigger'> <i class='material-icons'>add_circle_outline </i>Anadir Pelicula </a></div>");
         $(".addmovie").addClass("collapsible-body");
 */
       location.href="index.html";
       });
       
 });
 }

 function changeProfileInfo() {
  // Initialize Firebase
   var config = {
     apiKey: "AIzaSyAtdoJpgCIo3WvZb2vlXg48Qu-IE-Rwkkc",
     authDomain: "mi-p-d4a76.firebaseapp.com",
     databaseURL: "https://mi-p-d4a76.firebaseio.com",
     projectId: "mi-p-d4a76",
     storageBucket: "mi-p-d4a76.appspot.com",
     messagingSenderId: "163277132167"
   };
   //firebase.initializeApp(config);
   var cont = 0;
   firebase.auth().onAuthStateChanged(firebaseUser =>{
     if(firebaseUser){
         console.log("logeado");
         //location.href="index.html"
     }else{
         console.log("not loged in");
         alert("your session expired, please log in again");
         location.href="login.html";
     }
 
   var input_text1 = document.getElementById("cityValue");
   var input_text_value1 = input_text1.value;
   
   var input_text2 = document.getElementById("ageValue");
   var input_text_value2 = input_text2.value;

   var input_text3 = document.getElementById("Ocupacion");
   var input_text_value3 = input_text3.value;

   var input_text4 = document.getElementById("estado-civil");
   var input_text_value4 = input_text4.value;

     var user = firebase.auth().currentUser;
     var userName = user.email.match(/^([^@]*)@/)[1];
   var rootRef = firebase.database().ref(userName);
   rootRef.on("value", snap => {
   if(cont>0)
     return;
      var watchlist = snap.child("ProfileData").val();
       cont++;
             firebase.database().ref(userName+"/ProfileData").update({
               Ciudad: input_text_value1,
               Edad: input_text_value2,
               Ocupacion: input_text_value3,
               estadoCivil: input_text_value4,
             });
     //return;
       //    }
 
     //var rootRef = firebase.database().ref().child(userName);
     console.log(userName);
  /*
         $("#addmovie").remove();
         //$("#Amigos").append("<div class='friendElement'><span>"+Amigos[amigo]+"</span></div>");
         //$(".friendElement").addClass("collapsible-body row");
         $("#peliculasVistas").append("<div class='addmovie'><div class='chip col s6'><img src='assets/images/user.jpg' alt='Contact Person'>"+input_text_value+"</div></div>");
         $(".addmovie").addClass("collapsible-body"); 
       
       $("#peliculasVistas").append("<div id='addmovie' class='col s4 addmovie'><a href='#add-friend' class='modal-trigger'> <i class='material-icons'>add_circle_outline </i>Anadir Pelicula </a></div>");
         $(".addmovie").addClass("collapsible-body");
 */
       location.href="index.html";
       });
       
 });
 }

   //FUNCIONALIDAD DE SECCIÓN DE COMENTARIOS (TEXT AREA)

   function getCard() {
    var inptComment = $("#comment").val();
    //console.log(inptComment);

    //Limpiar input
    $("#comment").val("");

    addCommentCard(inptComment);
  }
var card = '<div class="row">' + 
                 '<div>' +
                    '<div class="col s6 offset-s2">' +
                        '<div class="card">' +
                            '<div class="card-content">' +
                                '<h5>__inptComment__</h5>' +
                                '<i class="material-icons left like" onclick= "addLike()">thumb_up</i>' +
                                '<i class="material-icons left comment">insert_comment</i>' +
                                '<a class="waves-effect waves-light btn modal-trigger delete-bttn btn-small right" onclick = "deleteComment()">Delete</a>' +
                                '<br>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                 '</div>' +
            '</div>'



function addCommentCard(comment) {

  var finalCard = ""; //declarar variable

  finalCard = card.replace("__inptComment__", comment) //primero lo que se a quitar, segundo por lo que se va a reemplazar

  $("main").append(finalCard);
}


function addLike() {

  var likes = document.getElementsByClassName("like");

  for (var i = 0; i < likes.length; i++) {
    document.getElementsByClassName("like")[i].classList.toggle("color");
  }
}


function deleteComment() {

  var eventCurrent = $(event.currentTarget);
  var parent = eventCurrent.parent();
  var parent1 = parent.parent();
  var parent2 = parent1.parent();
  parent2.remove();
}


//INICIALIZAR JQUERY CUANDO EL DOM SE ENCUENTRE CARGADO

$(document).ready(function () {
  $(".dropdown-trigger").dropdown();
  // $('.carousel').carousel();
  $('.sidenav').sidenav();
  $("#bttn-send").click(getCard);  
});
