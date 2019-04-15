
function getInstances(){
    return Task.prototype.getContador();
}

const proj = new Proyect("alfa");

const Task = (function() {
    const _Name = new WeakMap(); //Nombre de la Tarea
    const _Father = Symbol();  //Tipo de tarea
    const _Start_Day = new WeakMap(); //Dia de incio
    const _End_Day = new WeakMap(); //Dia termino
    const _ID = new WeakMap(); // Identificador
    const _Progress = new WeakMap(); // Progreso de la tarea [0, 100]
    // const _children = Symbol();
    var contador = 0;

  class Task {

      constructor(T_Name,T_Father,T_SD,T_ED,T_ID) { //Construye el objeto con los valores definidos
          _Name.set(this, T_Name);
          let _children = [];
          this.addChildren = function(son){
              _children.push(son)
          };
          this.getchildrencount = function(){
              return _children.length;
          };
          if(T_Father === "none"){
              console.log("no padre");
              this[_Father] = null;
          }
          else{
              /**
               Se añade la tarea al padre
               */
              console.log("padre es " + T_Father);
              this[_Father] = TaskbyId(T_Father);

              this[_Father].addChildren(this);

          }
          _ID.set(this,T_ID);
          _Start_Day.set(this, T_SD);
          _End_Day.set(this, T_ED);
          _Progress.set(this, 0);
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

      getProgress(){
          return _Progress.get(this);
      }
      setProgress(number){
          _Progress.set(this, number);
      }
      addProgress(progress){
          console.log("progreso: " + progress);
          _Progress.set(this, parseInt(this.getProgress()) + parseInt(progress));
          let progress_bar = document.getElementById("barra"+this.getID());
          progress_bar.value = this.getProgress();
      }

      getFather(){
          return this[_Father];
      }


  }
return Task;
}());

// Funciones NO son partede la clase Task
function New_Task(T_Name,T_Father,T_SD,T_ED,T_Id){
    let N_Task = new Task(T_Name,T_Father,T_SD,T_ED,T_Id); //Constructor de nueva Tarea
    proj.add_Task_to_Proyect(N_Task);
    console.log("Nombre: " + N_Task.getName());
    if(T_Father==="none")
    {
        Draw_Task(N_Task.getName(),N_Task.getStart_Day(),N_Task.getEnd_Day(),N_Task.getID()); //Dibuja la tarea en el documento
    }else
    {
        /**
         Se dibuja la tarea hija dentro de la tarea padre
         */
        Draw_Child(T_Father,T_SD,T_ED,T_Name,N_Task.getID());
    }
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
    add_text_to_Draw_Task(art,T_SD);
    art.appendChild(document.createElement("br"));
    add_text_to_Draw_Task(art,T_ED);
    add_Progress_Bar(art);
    add_Button_to_Task(art,'Advance','Advance');
    id=id+"childs";
    let c = add_div(art,id);  //Agrega la divison de las subtareas
    HoD_subTask(c,id);
}

function add_Progress_Bar(Task){ //Añade una barra de progreso al elemento indicado
    Task.appendChild(document.createElement("br"));
    let progress_bar = document.createElement("progress"); //Barra de progreso
    progress_bar.id =  "barra"+Task.id;
    progress_bar.max=100;     //Valor maximo 100%
    progress_bar.value=0;      //Valor inicial a 0
    Task.appendChild(progress_bar);
}

function add_div(art,id){ //Agrega una división a un elemento
    let C_div = document.createElement("div");
    art.appendChild(C_div);
    C_div.id=id;
    C_div.className="TASK_Child";
/*    let test = document.createElement("h3");
    test.innerText="SubTasks";
    C_div.appendChild(test); */
    C_div.setAttribute("style","display:none");   
    return C_div;
}

function HoD_subTask(art,id_st){ //Para mostrar/ocultar las subtareas
    let b = document.createElement("button"); //Crea un nuevo boton
    let div_c =document.getElementById(id_st);  //Obtiene el div de subtareas 
    b.type="button";    //Tipo Button
    b.innerText="Show STasks";  //El estado inicial
    b.className='Advance';      //Para el css
    b.onclick=function(){s_tasks(this,div_c)}; //Asigna la funcion que cambia el estado
    art.parentNode.insertBefore(b,art);
//    art.previousSibling.append(b); //Agrega al articulo de la Tarea
}

function s_tasks(button,div_c){ //Cambia el botun de Mostrar/Ocultar Tareas
    if(button.innerText==='Show STasks'){ //SI se preciono Mostrar tareas
        div_c.setAttribute("style","display:inherit"); //Se muestra el div de las subtareas
        button.innerText='Hide STasks'; //El boton cambia a Ocultar tareas
    }else if(button.innerText==="Hide STasks"){ // Si se preciono Ocultar tareas
                div_c.setAttribute("style","display:none"); //Se oculta el div de las subtareas
                button.innerText='Show STasks'; //Se cambia por Mostrar tareas
             }
}

function add_Button_to_Task(Task_of_button,text_b,class_b){
    let boton_de_progreso = document.createElement("button");
    boton_de_progreso.type = "button";
    boton_de_progreso.innerText = text_b;
    boton_de_progreso.className = class_b;
    boton_de_progreso.onclick = function() {advance(this,10)};
    //Task_of_button.appendChild(document.createElement("br"));
    Task_of_button.appendChild(boton_de_progreso);
}

function add_text_to_Draw_Task(art,text) {// Agrega un texto a la tarea, Recibe el id de la tarea y el texto
    let texto = document.createElement("span"); //Guarda el texto dentro de un span
    let t = document.createTextNode(text);
    texto.appendChild(t);
    art.appendChild(texto); //Agrega texto al articulo
}


function Draw_Child(Father,T_SD,T_ED,Name,_id){ //DIbuja al hjo dentro de la tarea
    //console.log(Father+'childs');    
    let div_c = document.getElementById(Father+'childs'); //Obtiene el Div de los hijos de la tarea padre
    //div_c.setAttribute("style","display:inherit");  //Lo muestra al agregar una nueva subtarea
    let Task_Div = document.createElement("div");   //Crea una nueva division individual para cada tarea
    let test = document.createElement("h5");        //Crea el titulo de la subtarea
    test.innerText=Name;//Agrega el Texto = Name
    Task_Div.id=_id;
    Task_Div.appendChild(test); 
    add_text_to_Draw_Task(Task_Div,T_SD);           //Agrega Fecha de incio
    Task_Div.appendChild(document.createElement("br"));
    add_text_to_Draw_Task(Task_Div,T_ED);           //Agrega fecha de Final
    add_Progress_Bar(Task_Div);                     //Agrega la barra de progreso de la subtarea
    add_Button_to_Task(Task_Div,'Advance','Advance');   //Agrega el boton de avance
    div_c.appendChild(Task_Div);                    //Agrega la subtarea al espacio de subtareas
}
