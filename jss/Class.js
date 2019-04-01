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
      
      getEnd_Day(){
    	return _End_Day.get(this);
    }
      
    setEnd_Day(n){
    	_End_Day.set(this,n);
    }  

            getID(){
    	return _ID.get(this);
    }
      
    setID(n){
    	_ID.set(this,n);
    }  
      
  }
return Task;
}());


function New_Task(T_Name,T_Father,T_SD,T_ED,T_Id){
    let N_Task = new task(T_Name,T_Father,T_SD,T_ED,T_Id); //Constructor de nueva Tarea
    Draw_Task(N_Task.getName(),N_Task.getStart_Day(),N_Task.getEnd_Day(),N_Task.getID());      //Dibuja la tarea en el documento
    console.log("El nombre: " + N_Task.getName());
}


function Draw_Task(T_Name,T_SD,T_ED){
    let art = document.createElement("article"); //Crea un articulo para la TASK y sus sub Task
    art.className="TASK"; //Clase TASK
    art.id=T_Name;    //Asigna el id de la tarea principal al articulo
    let titulo = document.createElement("h2");
    let tnode = document.createTextNode(T_Name);
    titulo.appendChild(tnode);
    art.appendChild(titulo);
    document.getElementById("TASK_area").appendChild(art);//Agrega el articulo a body
    add_text_to_Draw_Task(art.id,T_SD);
    art.appendChild(document.createElement("br"));
    add_text_to_Draw_Task(art.id,T_ED);
    let t = document.createElement("progress"); //Barra de progreso
    t.max=100;     //Valor maximo 100%
    t.value=25;      //Valor inicial a 0
    art.appendChild(t);

}


function add_text_to_Draw_Task(art_id,text){
    let texto=document.createElement("span");
    let t = document.createTextNode(text);
    texto.appendChild(t);
    let art = document.getElementById(art_id);
    art.appendChild(texto);
}





