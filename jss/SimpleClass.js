class SimpleDate {
  
  constructor(year, month, day) {
    // Check that (year, month, day) is a valid date
    // ...

    // If it is, use it to initialize "this" date's ordinary variables
    let _year = year;
    let _month = month;
    let _day = day;


this._day=function(nDays) {
      let dias=_day+nDays-30;
      if(dias>=0){
      	_day=dias;
      } else {
      	_day=_day+nDays;
      }
  }
this.getDay=function() {
      return _day;
    }
}
}
  

function ejemploOO1(yy,mm,dd){
	
	console.log("año: "+ yy);
	console.log("mes: "+ mm);
	console.log("dia: "+ dd);
	let constructor1=new SimpleDate(2019,03,21);
	constructor1._day(2);
	
	let constructor2=new SimpleDate(2019,03,25);
	console.log("El día 1es: " + constructor1.getDay());
	console.log("El día 2es: " + constructor2.getDay());
	constructor1._day(3);
	console.log("El día 1es: " + constructor1.getDay());
}

/*
Este ejemplo declara los atributos como constantes y les asociua la 
función Symbol();
*/

const SimpleDate2 = (function() {
	const _yearKey = Symbol();
  	const _monthK ey = Symbol();
  	const _dayKey = Symbol();

  class SimpleDate2 {
    constructor(year, month, day) {
      // Check that (year, month, day) is a valid date
      // ...

      // If it is, use it to initialize "this" date
      this[_yearKey] = year;
      this[_monthKey] = month;
      this[_dayKey] = day;
     }

    addDays2(nDays) {
      this[_dayKey] =nDays+this[_dayKey];
    }

    getDay2() {
      return this[_dayKey];
    }

}

  return SimpleDate2;
}());

function ejemploOO2(yy,mm,dd){
	
	console.log("año: "+ yy);
	console.log("mes: "+ mm);
	console.log("dia: "+ dd);
	let constructor3=new SimpleDate2(2019,03,21);
	constructor3.addDays2(2);
	
	let constructor4=new SimpleDate2(2019,03,25);
	
	console.log("El día 2es: " + constructor4.getDay2());
	console.log("El día 1es: " + constructor3.getDay2());
	constructor3._dayKey=3;
	console.log("El día 1es: " + constructor3.getDay2());
}

/*
Weak map

Weak maps are also a new feature of JavaScript. 
We can store private object properties in key/value 
pairs using our instance as the key, 
and our class can capture those key/value maps in a closure:

*/
 
 const SimpleDate3 = (function() {
  const _years3 = new WeakMap();
  const _months3 = new WeakMap();
  const _days3 = new WeakMap();
  

  class SimpleDate3 {
  
    constructor(year, month, day) {
      // Check that (year, month, day) is a valid date
      // ...

      // If it is, use it to initialize "this" date

_years3.set(this, year);
      _months3.set(this, month);
      _days3.set(this, day);
    }

    addDays3(nDays) {
    	let dia=_days3.get(this);
    	dia=dia+nDays;
      _days3.set(this, dia );
    }

    getDay3() {
      return _days3.get(this);
    }

    setValor(v){
    	_valor.set(this,v);
    }
    getValor(){
    	return _valor.get();
    }
  

  }

  return SimpleDate3;
}());

function ejemploOO3(yy,mm,dd){
	
	console.log("año: "+ yy);
	console.log("mes: "+ mm);
	console.log("dia: "+ dd);
	let constructor5=new SimpleDate3(2019,03,21);
	constructor5.addDays3(3);
	
	let constructor6=new SimpleDate3(2019,03,25);
	
	console.log("El día 2es: " + constructor6.getDay3());
	console.log("El día 1es: " + constructor5.getDay3());
	constructor5._dayKey=3;
	console.log("El día 1es: " + constructor5.getDay3());
	

}
