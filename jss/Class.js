
function getInstances(){
    return Task.prototype.getContador();
}

const proj = new Proyect("alfa");

const Task = (function() {
  const _Name = new WeakMap(); //Nombre de la Tarea
  const _Father = new WeakMap();  //Tipo de tarea
  const _Start_Day = new WeakMap(); //Dia de incio
    const _End_Day = new WeakMap(); //Dia termino
    const _ID = new WeakMap(); // Identificador
    var contador = 1;


  class Task {

      constructor(T_Name,T_Father,T_SD,T_ED,T_ID) { //Construye el objeto con los valores definidos
          _Name.set(this, T_Name);
          if(T_Father === "none")
              _Father.set(this, null);
          else{
              _Father.set(this, T_Father);
              let arreglo = proj.getArray();
              // let padre = arreglo.find(T_Father);
              console.log(arreglo);
          }
          _ID.set(this,T_ID);
          _Start_Day.set(this, T_SD);
          _End_Day.set(this, T_ED);
          contador++;
      } //End Constructor

      getName() {
          return _Name.get(this);
      }

      setName(n){
          _Name.set(this,n);
      }

      getContador(){
          return contador;
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

// Funciones NO son partede la clase Task
function New_Task(T_Name,T_Father,T_SD,T_ED,T_Id){



    let N_Task = new Task(T_Name,T_Father,T_SD,T_ED,T_Id); //Constructor de nueva Tarea
    Draw_Task(N_Task.getName(),N_Task.getStart_Day(),N_Task.getEnd_Day(),N_Task.getID());      //Dibuja la tarea en el documento
    console.log("El nombre: " + N_Task.getName());
    console.log(proj.getArray.length);
    console.log(proj);
    proj.add_Task_to_Proyect(N_Task);
    console.log(proj.getArray.length);
    hide_login();
    reset_login();
}

function Draw_Task(T_Name,T_SD,T_ED, id){
    let art = document.createElement("article"); //Crea un articulo para la TASK y sus sub Task
    art.className="TASK"; //Clase TASK - CSS
    art.id=id;    //Asigna el id de la tarea principal al articulo
    let titulo = document.createElement("h2");
    let tnode = document.createTextNode(T_Name);
    titulo.appendChild(tnode);
    art.appendChild(titulo);
    document.getElementById("TASK_area").appendChild(art);//Agrega el articulo a body
    add_text_to_Draw_Task(art.id,T_SD);
    art.appendChild(document.createElement("br"));
    add_text_to_Draw_Task(art.id,T_ED);
    art.appendChild(document.createElement("br"));
    let t = document.createElement("progress"); //Barra de progreso
    t.max=100;     //Valor maximo 100%
    t.value=0;      //Valor inicial a 0
    art.appendChild(t);
    add_Button_to_Task(art,'Advance','Advance');
}


function add_Button_to_Task(Task_id,text_b,class_b){
    let b =document.createElement("button");
    b.type="button";
    b.innerText=text_b;
    b.className=class_b;
    b.onclick=function() {advance(this,10)};
    Task_id.appendChild(document.createElement("br"));
    Task_id.appendChild(b);
}

function add_text_to_Draw_Task(art_id,text){// Agrega un texto a la tarea, Recibe el id de la tarea y el texto
    let texto=document.createElement("span"); //Guarda el texto dentro de un span
    let t = document.createTextNode(text);
    texto.appendChild(t);
    let art = document.getElementById(art_id);
    art.appendChild(texto);
}


