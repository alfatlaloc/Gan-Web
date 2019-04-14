
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
    if(T_Father=="none")
    {
    Draw_Task(N_Task.getName(),N_Task.getStart_Day(),N_Task.getEnd_Day(),N_Task.getID());      //Dibuja la tarea en el documento
    console.log("El nombre: " + N_Task.getName());
    console.log(proj.getArray.length);
    console.log(proj);
    proj.add_Task_to_Proyect(N_Task);
    console.log(proj.getArray.length);
    }else
    {
        Draw_Child(T_Father,T_SD,T_ED,T_Name);
    }
    hide_login();
    reset_login();
}

function Draw_Task(T_Name,T_SD,T_ED, id){
    let art = document.createElement("article"); //Crea un articulo para la TASK y sus sub Task
    art.className="TASK"; //Clase TASK - CSS
    art.id=T_Name;    //Asigna el id de la tarea principal al articulo
    let titulo = document.createElement("h2");
    let tnode = document.createTextNode(T_Name);
    titulo.appendChild(tnode);
    art.appendChild(titulo);
    document.getElementById("TASK_area").appendChild(art);//Agrega el articulo a body
    add_text_to_Draw_Task(art,T_SD);
    art.appendChild(document.createElement("br"));
    add_text_to_Draw_Task(art,T_ED);
    add_Progress_Bar(art);
    add_Button_to_Task(art,'Advance','Advance');
    id=T_Name+"childs";
    add_div(art,id);  //Agrega la divison de las subtareas
    HoD_subTask(art,id);

}

function add_Progress_Bar(art){ //Añade una barra de progreso al elemento indicado
    art.appendChild(document.createElement("br"));
    let t = document.createElement("progress"); //Barra de progreso
    t.max=100;     //Valor maximo 100%
    t.value=0;      //Valor inicial a 0
    art.appendChild(t);
}

function add_div(art,id){ //Agrega una divion a un elemento
    let C_div = document.createElement("div");
    C_div.id=id;
    C_div.className="TASK_Child";
    let test = document.createElement("h3");
    test.innerText="SubTasks";
    C_div.appendChild(test);
    C_div.setAttribute("style","display:none");   
    art.appendChild(C_div);
}

function HoD_subTask(art,id_st){ //Para mostrar/ocultar las subtareas
    let b = document.createElement("button"); //Crea un nuevo boton
    let div_c =document.getElementById(id_st);  //Obtiene el div de subtareas 
    b.type="button";    //Tipo Button
    b.innerText="Show STasks";  //El estado inicial
    b.className='Advance';      //Para el css
    b.onclick=function(){s_tasks(this,div_c)}; //Asigna la funcion que cambia el estado
    art.appendChild(b); //Agrega al articulo de la Tarea
}

function s_tasks(button,div_c){ //Cambia el botun de Mostrar/Ocultar Tareas
    if(button.innerText=='Show STasks'){ //SI se preciono Mostrar tareas
        div_c.setAttribute("style","display:inherit"); //Se muestra el div de las subtareas
        button.innerText='Hide STasks'; //El boton cambia a Ocultar tareas
    }else if(button.innerText=="Hide STasks"){ // Si se preciono Ocultar tareas
                div_c.setAttribute("style","display:none"); //Se oculta el div de las subtareas
                button.innerText='Show STasks'; //Se cambia por Mostrar tareas
             }
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

function add_text_to_Draw_Task(art,text){// Agrega un texto a la tarea, Recibe el id de la tarea y el texto
    let texto=document.createElement("span"); //Guarda el texto dentro de un span
    let t = document.createTextNode(text);
    texto.appendChild(t);
    art.appendChild(texto); //Agrega texto al articulo
}


function Draw_Child(Father,T_SD,T_ED,Name){ //DIbuja al hjo dentro de la tarea
    let div_c = document.getElementById(Father+"childs"); //Obtiene el Div de los hijos de la tarea padre
    div_c.setAttribute("style","display:inherit");  //Lo muestra al agregar una nueva subtarea
    let Task_Div = document.createElement("div");   //Crea una nueva division individual para cada tarea
    let test = document.createElement("h5");        //Crea el titulo de la subtarea
    test.innerText=Name;                            //Agrega el Texto = Name
    Task_Div.appendChild(test); 
    add_text_to_Draw_Task(Task_Div,T_SD);           //Agrega Fecha de incio
    Task_Div.appendChild(document.createElement("br"));
    add_text_to_Draw_Task(Task_Div,T_ED);           //Agrega fecha de Final
    add_Progress_Bar(Task_Div);                     //Agrega la barra de progreso de la subtarea
    add_Button_to_Task(Task_Div,'Advance','Advance');   //Agrega el boton de avance
    div_c.appendChild(Task_Div);                    //Agrega la subtarea al espacio de subtareas
    
}
