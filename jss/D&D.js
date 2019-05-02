
function drag(ev) {
     console.log("dragStart");
     // Set the drag's format and data. Use the event target's id for the data
     ev.dataTransfer.setData("text/plain", ev.target.id);
}

function allowDrop(ev) {
    console.log("dragOver");
    ev.preventDefault();
}

function drop(ev) {
     console.log("Drop");
     ev.preventDefault();
     // Get the data, which is the id of the drop target
     let data = ev.dataTransfer.getData("text/plain");
     
     let elemento = document.getElementById(data); //Obtiene el elemento que sera movido

     ev.target.appendChild(document.getElementById(data));
     // Clear the drag data cache (for all formats/types)
    if(ev.target.id=="TASK_area"){          //Si se lleva a TaskArea
        TaskbyId(elemento.id).setFather(null);
        elemento.className="TASK"; //Cambio de clase a Tarea Padre
        fillSelect();
    }else{
        elemento.className="";
    }
     ev.dataTransfer.clearData();
}
