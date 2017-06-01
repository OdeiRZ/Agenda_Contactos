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
function anadirContacto(nom, tel, cor) {
    if(typeof db !== "undefined") {
        var errorValidacion = validar(nom, tel, cor);
        if(errorValidacion == ""){
            var request = obtenerObjetos('readwrite').add({nombre: nom.value, telefono: tel.value, correo: cor.value}); //var obj = {nombre: nom.value, telefono: tel.value, correo: cor.value};
            request.onsuccess = function (e) {
                document.getElementById("bloque").innerHTML = "<i>" + nom.value + "</i> Insertado en BBDD";
            };
            request.onerror = function (e) {//document.getElementById("bloque").innerHTML = "Error de Inserción en BBDD: " + e;
                document.getElementById("bloque").innerHTML = "Error - <i>" + cor.value + "</i> ya existe en BBDD";
            };
        } else {
            document.getElementById("bloque").innerHTML = errorValidacion;
        }
    } else {
        document.getElementById("bloque").innerHTML = "No Existe BBDD";
    }
}
function listarContactos() {
    if(typeof db !== "undefined") {
		var sw = false;
        document.getElementById("bloque").innerHTML = "";
        var contactos = obtenerObjetos('readonly');
        contactos.openCursor().onsuccess = function(e) {
			var cursor = e.target.result;   //Objeto que contiene cada una de las tuplas de la bbdd
			if (cursor) {
				sw = true;
				document.getElementById("bloque").innerHTML += "Id: " + cursor.key + "<br/>";
				document.getElementById("bloque").innerHTML += "Nombre: " + cursor.value.nombre + "<br/>";
				document.getElementById("bloque").innerHTML += "Teléfono: " + cursor.value.telefono + "<br/>";
				document.getElementById("bloque").innerHTML += "Correo: " + cursor.value.correo + "<br/><br/>";
				cursor.continue();
			} //else {	alert("No hay mas registros");	}
		};
        setTimeout(function(){ (sw) ? "" : document.getElementById("bloque").innerHTML = "No Existen Contactos en BBDD"; },100);    //Despues de 100 milisegundos se comprueba si hay errores
    } else {
        document.getElementById("bloque").innerHTML = "No Existe BBDD";
    }
}