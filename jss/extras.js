function show_login() {//Muestra el Login
    document.getElementById("form").style.display="flex";
    fillSelect();
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

function fillSelect() {
    let tareas = document.getElementById("father"); // caja de opciones
    // llena las tareas que existen para añadir tareas hijas
    clean_select(tareas);
    let none = document.createElement("option");
    let _task_array;
    none.value = "none";
    none.innerText = "none";
    tareas.appendChild(none);
    for(let i=0; i<getInstances()-1; i++) {
        _task_array = proj.getArray();
        let opcion = document.createElement("option");
        opcion.value = _task_array[i].getName();
        opcion.innerText =  _task_array[i].getName();
        tareas.appendChild(opcion);
    }
}
function clean_select(tareas){
    while(tareas.firstChild)
        tareas.removeChild(tareas.firstChild);
}
