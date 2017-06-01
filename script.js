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