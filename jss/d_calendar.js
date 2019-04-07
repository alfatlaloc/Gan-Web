var d = new Date(); 
var meses = ["Enero", "Febrero", "Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
var meses_dias=[31,28,31,30,31,30,31,31,30,31,30,31];
var day_name= ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
var yyyy=d.getFullYear();
var mm=d.getMonth();

//Cambia el año segun se pulsen las flechas
function new_year(a){
    yyyy+=a;
}

//cambia el mes segun se pulsen las flechas, si llega a diciembre este vuelve a enero pero mantiene el año
function new_month(a){
    if(mm==11 && a == 1){
        mm=0;
    }else if(mm<11 && a==1){
    mm+=a;
        }else if(mm==0 && a==0){
            mm=11;
        }else if(mm>0 && a==0){
            mm--;
        }
}

//Rellena el titulo de la tabla con las flechas y el año
function rellenar_titulo(tit,year,month,id_picker){
        var flecha = document.createElement("span");//Genera las flechas y el titulo
    var t = document.createTextNode("<  ");
    flecha.appendChild(t);
    flecha.className="arrow";
    flecha.onclick=function() {new_year(-1) ; calendar_w(year,month,id_picker)};//Funcion que cambia el año
    var flecha2 = document.createElement("span");
    t = document.createTextNode("  >");
    flecha2.appendChild(t); 
    flecha2.className="arrow";
    flecha2.onclick=function() { new_year(1) ; calendar_w(year,month,id_picker)};//Cambia el año
    var annio = document.createElement("span");//Imprime el año
    t = document.createTextNode(year);
    annio.appendChild(t); 
    annio.id="annio";
    tit.appendChild(flecha);
    tit.appendChild(annio);
    tit.appendChild(flecha2);//agrega elementos al caption
}

//Rellena el apartado del mes
function rellenar_mes(celda,year,month,id_picker){
    var f1=document.createElement("span");
    t = document.createTextNode("<  ");
    f1.appendChild(t); 
    f1.className="arrow";
    f1.onclick=function() { new_month(0) ; calendar_w(year,month,id_picker)};
    celda.appendChild(f1);
    var mes_name = document.createElement("span");
    t = document.createTextNode(meses[month]);
    mes_name.appendChild(t);
    mes_name.id="mesino";
    celda.appendChild(mes_name);
    var f2=document.createElement("span");
    t = document.createTextNode("  >");
    f2.appendChild(t); 
    f2.className="arrow";
    f2.onclick=function() { new_month(1) ; calendar_w(year,month,id_picker)};
    celda.appendChild(f2);
}
//Crea los renglones y celdas en el tbody
function llenar_tbody(tbo){
        for(var i=0;i<6;i++){
            var renglon = document.createElement("tr");
        for(var j=0;j<7;j++){
                    var c = document.createElement("td");
        t = document.createTextNode("-");
        c.appendChild(t);
        renglon.appendChild(c);
        }
            tbo.append(renglon);
    }
}//Crea la tabla y la agrega al HTML Usando el DOM
function add_dayName(cab){
        for(var i=0;i<7;i++){
        var celda = document.createElement("td");
        t = document.createTextNode(day_name[i]);
        celda.appendChild(t);
        cab.appendChild(celda);
    }//Agrega los nombres en orden
}
function calendar(year,month,id_picker){
    var calendar = document.createElement("table");
    calendar.id = "calendar";//Establece el id de la tabla a calendario
    var tit = document.createElement("caption");//Titulo de la tabla, muestra el año
    rellenar_titulo(tit,year,month,id_picker);
    var te =document.createElement("thead");//Crea las cabeceras de la tabla (Nombre_dias)
    var cab = document.createElement("tr");
    cab.className="days";
    add_dayName(cab);
    te.appendChild(cab);//Agrega la cabecera
    var tbo = document.createElement("tbody");//Rellena el tbody con celdas
    llenar_tbody(tbo);
    var mmmm = document.createElement("tr");//Lo mismo que para año
    mmmm.id="change_mes";
    var celda =document.createElement("th");
    celda.colSpan="7";
    rellenar_mes(celda,year,month,id_picker);
    mmmm.appendChild(celda);
    tbo.append(mmmm);//Agrega esto ultimo al tbody
    calendar.appendChild(tit);//Agrega los elementos creados al calendario
    calendar.appendChild(te);
    calendar.append(tbo);
    //document.body.appendChild(calendar);
    document.getElementById(id_picker).parentNode.insertBefore( calendar, this.nextSibling );
    calendar_w(yyyy,mm,id_picker);  //Llama a la funcion que rellena la tabla conforme cambia  
}

//agrega evento al dia seleccionado
function add_event(day,month,asunto){
    var calendar = document.getElementById("calendar");
    for(var i=0;i<7;i++){
        for(var j=0;j<7;j++){
            if(calendar.rows[i].cells[j].innerText==day && month==mm){
                var evento = document.createElement("div");
                evento.innerText=asunto;
                calendar.rows[i].cells[j].appendChild(evento);
            }
        }
        
    }
    
}
//Cambia el año y mes mostrado en el calendario
function data_display(){
        document.getElementById("annio").innerHTML=String(yyyy);//Cambia en año mostrado en la tabla
        document.getElementById("mesino").innerHTML=meses[mm];//Cambia el mes mostrado en la tabla
}

function calendar_w(year,month,id_picker){//Cambia los elementos en el calendario previamente creado, recibe los parametros mes y año 
    data_display();
    var table=document.getElementById("calendar");//Obtiene calendario
    var count=0,dia=1;
    biciesto();        //Determina si es biciesto y cambia los dias a febrero
   var start= m_start(yyyy,mm);//Obtiene en que dia empieza el mes segun el año
        for(var i = 1;i<7;i++){//Rellena el calendario a partir del dia de la semana en que incia
        for(var j=0;j<7;j++){
            count++;//Empieza la cuenta de las celdas en 1 posicion 0.0
            if(dia==d.getDate() && yyyy==d.getFullYear() && mm==d.getMonth()){//Si la celda actual es hoy le da nuevo formato
                table.rows[i].cells[j].innerText=" ";
                var tt = document.createElement("span");
                tt.innerText=String(dia);
                tt.id="hoy";
                table.rows[i].cells[j].appendChild(tt);
                table.rows[i].cells[j].onclick=function() { pick(this.innerText,id_picker);h_table()};//agrega funcion al span creado
                dia++;
            }else if(count>=start &&  (dia <= meses_dias[mm])){   
                table.rows[i].cells[j].innerText=String(dia);
                table.rows[i].cells[j].onclick=function() { pick(this.innerText,id_picker) ; h_table()};//Coloca el dia y la funcion al daypicker
                table.rows[i].cells[j].onmousedown = function(event) {
                if (event.which == 2) { ev(this.id);}};
                dia++;
            }else if(count>start+meses_dias[mm] || count<start){
                                table.rows[i].cells[j].innerText="-";
            }
        }
    }
}

function biciesto(){
    if(yyyy%4==0 && yyyy%100!=0 || yyyy%400==0 ){
        meses_dias[1]=29;
    }else{
        meses_dias[1]=28;
    }
}

function m_start(anio,mes){//Calcula el dia del año segun la congruencia de Zeller
    var new_meses =[0,3,3,6,1,4,6,2,5,0,3,5];
    var d;
    anio=yyyy-2000;
    d=(1 + new_meses[mes] + anio + (anio/4) + 6) % 7; 
    return d;
}

function pick(a,id_picker){ //Pone la fecha seleccionada en el daypicker
    document.getElementById(id_picker).value=a+"/"+ meses[mm] + "/" + yyyy;
}

//muestra la tabla
function d_table(){
    document.getElementById("calendar").setAttribute("style","display:inline-block");
    
}

//Crea un evento con el texto aa
function ev(a){
openForm();
    celda=document.getElementById(a);
                var evento = document.createElement("div");
                evento.innerText=document.getElementById("evento").value;
                celda.appendChild(evento);

}

//oculta la tabla
function h_table(){
    document.getElementById("calendar").setAttribute("style","display:none");    
}
//Arranca todo
function start(id_picker){
 calendar(yyyy,mm,id_picker);
};

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
