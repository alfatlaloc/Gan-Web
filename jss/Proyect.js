const Proyect = (function() {
  const _Name = new WeakMap(); //Nombre de la Tarea
    const _Tasks = new WeakMap([]);//Arreglo de Objetos

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
      
      getarray(){
          return _Tasks;
      }
      
    add_Task_to_Proyect(){
        
    }
      
  }
return Proyect;
}());

function Tasks_Info(){
    console.log("Corri");

}