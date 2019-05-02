const Proyect = (function() {
  const _Name = new WeakMap(); //Nombre de la Tarea
  const _Tasks = [];//Arreglo de Objetos
    // const _Task_Array = [];
  class Proyect {

    constructor(Proyect_Name) { //Construye el objeto con los valores definidos
        _Name.set(this, Proyect_Name);
    } //End Constructor

    getName() {
      return _Name.get(this);
    }

    setName(n){
    	_Name.set(this,n);
    }

    getArray(){
        return _Tasks;
    }

    add_Task_to_Proyect(n_task){ //Agrega un objeto al arreglo 
        _Tasks.push(n_task);
    }
  }
    
    
return Proyect;
}());

function Tasks_Info(){
    console.log("Corri");

}
