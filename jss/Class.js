function show_login(){//Muestra el Login
    document.getElementById("form").style.display="flex";
}

function hide_login(){//Muestra el Login
    document.getElementById("form").style.display="none";
}

const task = (function() {
  const _Name = new WeakMap(); //Nombre de la Tarea
  const _Father = new WeakMap();  //Tipo de tarea
  const _Start_Day = new WeakMap(); //Dia de incio
    const _End_Day = new WeakMap(); //Dia termino
    const _ID = new WeakMap(); //Dia termino


  class Task {
  
    constructor(T_Name,T_Father,T_SD,T_ED,T_ID) { //Construye el objeto con los valores definidos 

    _Name.set(this, T_Name);
      _Father.set(this, T_Father);
    _ID.set(this,T_ID);
      _Start_Day.set(this, T_SD);
    _End_Day.set(this, T_ED);
    } //End Constructor

    getName() {
      return _Name.get(this);
    }

    setName(n){
    	_Name.set(this,n);
    }
      
    getStart_Day(){
    	return _Start_Day.get(this);
    }
      
    setStart_Day(n){
    	_Start_Day.set(this,n);
    }
  }
return Task;
}());


function New_Task(T_Name,T_Father,T_SD,T_ED,T_Id){
    let N_Task = new task(T_Name,T_Father,T_SD,T_ED,T_Id); //Constructor de nueva Tarea
    Draw_Task(T_Name,T_Father,T_SD,T_ED,T_Id);      //Dibuja la tarea en el documento

    console.log("El nombre: " + N_Task.getName());
}


function Draw_Task(T_Name,T_Father,T_SD,T_ED){

    let art = document.createElement("article"); //Crea un articulo para la TASK y sus sub Task
    art.className="TASK"; //Clase TASK
    art.id=T_Name;    //Asigna el id de la tarea principal al articulo
    let titulo = document.createElement("h2");
    let tnode = document.createTextNode(T_Name);
    titulo.appendChild(tnode);
    art.appendChild(titulo);
    let t = document.createElement("progress"); //Barra de progreso
    t.max=100;     //Valor maximo 100%
    t.value=0;      //Valor inicial a 0
    art.appendChild(t);     
    document.body.appendChild(art);//Agrega el articulo a body

}
