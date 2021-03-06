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

function advance(element,avance){
    console.log(element.parentNode.id);
    let tarea_a_avanzar = TaskbyId(element.parentNode.id.toString());
    let progress_bar = element.previousSibling;
    if(tarea_a_avanzar.getFather() == null){
        progress_bar.value = progress_bar.value+avance;
        tarea_a_avanzar.setProgress(progress_bar.value);
    }else{
        console.log("tarea a avanzar " + tarea_a_avanzar.getName() + " " + tarea_a_avanzar.getFather().getName() + " es el padre");
        let padre = TaskbyId(tarea_a_avanzar.getFather().getID());
        let no_hijos = padre.getchildrencount();
        if(padre.getProgress() <100){
            padre.addProgress(avance/no_hijos);
            tarea_a_avanzar.addProgress(avance);
            console.log(avance/no_hijos);
        }

    }
}

function changeFather_NewProgres(tareaPadre) {
        let nuevo_progreso = 0;
        let arreglo_de_hijos = tareaPadre.getChildren();
        for(let x=0; x<tareaPadre.getchildrencount(); x++){
            console.log('progreso hijo '+ x + ': '+  arreglo_de_hijos[x].getProgress());
            nuevo_progreso += arreglo_de_hijos[x].getProgress();
        }
        if(tareaPadre.getchildrencount()!==0)
            nuevo_progreso /= tareaPadre.getchildrencount();
        tareaPadre.setProgress(nuevo_progreso);

}

function fillSelect() {
    let tareas = document.getElementById("father"); // caja de opciones
    // llena las tareas que existen para añadir tareas hijas
    clean_select(tareas);
    let none = document.createElement("option");
    let _task_array = proj.getArray();
    none.value = "none";
    none.innerText = "none";
    tareas.appendChild(none);
    if(getInstances() !== 0){
        for(let i=0; i<getInstances(); i++) {
            let opcion = document.createElement("option");

            if(_task_array[i].getFather() === null) {
                opcion.value = _task_array[i].getID();
                opcion.innerText = _task_array[i].getName();
                tareas.appendChild(opcion);
            }
        }
    }

}
function clean_select(tareas){
    while(tareas.firstChild)
        tareas.removeChild(tareas.firstChild);
}
function TaskbyId(ID) {
    let arreglo_de_tarea = proj.getArray();
    let tarea;
    for(let i=0; i<arreglo_de_tarea.length; i++){
        if(arreglo_de_tarea[i].getID().toString() === ID.toString()){
            tarea = arreglo_de_tarea[i];
            break;
        }
    }
    return tarea;
}
