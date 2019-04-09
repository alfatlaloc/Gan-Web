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

function advance(element,v){
    //let padrex = element.parentNode.id;
    let p = element.previousSibling.previousSibling;
    p.value=p.value+v;
    if(parseInt(p.value)>=100){
        p.className="Task_F";
        element.remove();
    }

}