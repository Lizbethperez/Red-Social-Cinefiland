/*
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });
//USANDO FIREBASE PARA INICIAR SESION

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

  var userEmail=document.getElementById("icon_prefix");
  var password=document.getElementById("icon_telephone");
  var btnLogin=document.getElementById("btn-login");
  var btnSignUp=document.getElementById("btn-signUp");
  var newEmail=document.getElementById("new-email");
  var newPassword=document.getElementById("new-password");

  //Creando un evento para el boton de login
  btnLogin.addEventListener("click", e => {
      var userEmailValue=userEmail.value;
      var passwordValue=password.value;
      var auth=firebase.auth();
      var promise=auth.signInWithEmailAndPassword(userEmailValue,passwordValue);
      promise.catch( e => alert(e.message));
  });
  btnSignUp.addEventListener("click", e => {
    var userEmailValue=newEmail.value;
    var passwordValue=newPassword.value;
    var auth=firebase.auth();
    var promise=auth.createUserWithEmailAndPassword(userEmailValue,passwordValue);
    promise.catch( e => alert(e.message));
    });

    firebase.auth().onAuthStateChanged(firebaseUser =>{
        if(firebaseUser){
            console.log("logeado");
            location.href="index.html"
        }else{
            console.log("not loged in");
        }
    });

} ());
*/

//Comentarios
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
