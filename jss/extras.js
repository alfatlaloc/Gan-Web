function show_login() {//Muestra el Login 
    document.getElementById("form").style.display="flex";
}

function hide_login(){//OCulta el Login
    let formulalrio = document.getElementById("form");
    formulalrio.style.display="none";
}

function reset_login(){ //LImpia los campos del formulario
    document.getElementById("Name_Task").value="";// Obtiene id y pone el caracter vacio
    document.getElementById("S_Task").value="";
    document.getElementById("E_Task").value="";
}

function popup(id_popup) {
  var popup = document.getElementById(id_popup);
  popup.classList.toggle("show");
}