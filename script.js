window.onload = function(){
	if("indexedDB" in window) { //indexedDB soportada por Navegador
        var nom = document.getElementById("nombre");
        var tel = document.getElementById("telefono");
        var cor = document.getElementById("email");
        document.getElementById("crearBBDD").addEventListener("click",crearBBDD);   //document.getElementById("crearBBDD").addEventListener("click",function(){crearBBDD();});
		document.getElementById("listarBBDD").addEventListener("click",function(){listarBBDD();});
		document.getElementById("borrarBBDD").addEventListener("click",function(){borrarBBDD();});
		document.getElementById("anadirContacto").addEventListener("click",function(){anadirContacto(nom, tel, cor);});
		document.getElementById("listarContactos").addEventListener("click",function(){listarContactos();});
		document.getElementById("consultarContacto").addEventListener("click",function(){consultarContacto(cor);});
		document.getElementById("modificarContacto").addEventListener("click",function(){consultarContacto(cor, nom, tel);});
		document.getElementById("borrarContacto").addEventListener("click",function(){consultarContacto(cor, true);});  //crearBBDD();  //document.getElementById("contenedor").style.display = "none";
	} else {
		alert("Su Navegador no soporta indexedDB");
	}
};
var nombreBBDD = "Agenda", db, ver = 1;
function crearBBDD() {
	var request = indexedDB.open(nombreBBDD, ver);
    request.onsuccess = function(e) {
        document.getElementById("bloque").innerHTML = "Apertura Correcta de BBDD";
        db = this.result;
    }
    request.onerror = function(e) {
        document.getElementById("bloque").innerHTML = "Error al Crear BBDD: " + e;
    }
    request.onupgradeneeded = function(e) {
        document.getElementById("bloque").innerHTML = "Actualizando BBDD...";
        var tabla = e.currentTarget.result.createObjectStore(nombreBBDD, {keyPath: 'id', autoIncrement: true});
        tabla.createIndex('nombre', 'nombre', {unique: false});
        tabla.createIndex('telefono', 'telefono', {unique: false});
        tabla.createIndex('correo', 'correo', {unique: true});
    }
}
function listarBBDD() {
    var cadena = "No Existe BBDD";
    if(typeof db !== "undefined") {
        var request = obtenerObjetos("readonly").count();
        request.onsuccess = function() {
            cadena = "Nombre de BBDD: " + db.name + ".<br/>";
            cadena += "Versión de BBDD: " + db.version + ".<br/>";
            cadena += "Contactos en BBDD: " + request.result + ".";
            document.getElementById("bloque").innerHTML = cadena;
        };
    } else {
        document.getElementById("bloque").innerHTML = cadena;
    }
}
function borrarBBDD() {
    if(typeof db !== "undefined") {
        db.close();
        var request = indexedDB.deleteDatabase(nombreBBDD);
        request.onsuccess = function(e) {
            document.getElementById("bloque").innerHTML = "Borrado Correcto de BBDD";
            alert("Se procederá a recargar la página");
            location.reload(true);
        }
        request.onerror = function(e) {
            document.getElementById("bloque").innerHTML = "Error al Borrar BBDD: " + e;
        }
    } else {
        document.getElementById("bloque").innerHTML = "No Existe BBDD";
    }
}