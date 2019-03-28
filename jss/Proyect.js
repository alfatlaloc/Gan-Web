const Proyect = (function() {
  const _Name = new WeakMap(); //Nombre de la Tarea
  const _Type = new WeakMap();  //Tipo de tarea
  const _Start_Day = new WeakMap(); //Dia de incio
    const _End_Day = new WeakMap(); //Dia termino

  class Task {
  
    constructor(T_Name,T_Type,T_SD,T_ED) { //Construye el objeto con los valores definidos 

_Name.set(this, T_Name);
      _Type.set(this, T_Type);
      _Start_Day.set(this, T_SD);
        _End_Day.set(this, T_ED);
    } //End Constructor

    /*addDays3(nDays) {
    	let dia=_days3.get(this);
    	dia=dia+nDays;
      _days3.set(this, dia );
    }*/

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
return Proyect;
}());
