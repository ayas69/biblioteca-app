$(document).ready(function(){
	$("ul li a[href='#page3']").click(function(){
		$(".listalibros").text("");
		$.getJSON("http://www.ayas.hol.es/server/listartodos.php", function(data){
			$.each(data, function(i, val){
				$(".listalibros").append("<tr><td class='titulo'>"+val['TITULO']+"</td><td>"+val['AUTOR']+"</td><td>"+val['ANOPUBLICACION']+"</td><td>"+val['EDITORIAL']+"</td><td>"+val['PAGINAS']+"</td><td>"+val['ISBN']+"</td></tr>");
			});
		}
	)});

	$("a[href='#page1']").click(function(){
		$("#tablaautor, #tablaeditorial").css("visibility", "hidden");
	});

	$("#insertar").click(function(){
		var cdu = $("#cdu").val();
		var titulo = $("#titulo").val();
		var autor = $("#autor").val();
		var anio = $("#anio").val();
		var editorial = $("#editorial").val();
		var paginas = $("#paginas").val();
		var isbn = $("#isbn").val();

		$.ajax({
			type: "POST",
			url : "http://www.ayas.hol.es/server/insertar.php",
			data: ({CDU:cdu, TITULO:titulo, AUTOR:autor, ANOPUBLICACION:anio,EDITORIAL:editorial,PAGINAS:paginas,ISBN:isbn}),
			dataType: "text",
			success: onSuccess
		});

	});
	function onSuccess(){
       	alert("Libro insertado correctamente");
    }
    $("ul li a[href='#page4']").click(listarautores);
    function listarautores(){
    	$("select[name='autores']").text("");
    	$.getJSON("http://www.ayas.hol.es/server/listarautores.php", function(data){
    		$.each(data, function(i, val){
    			var auxiliar = val['AUTOR'];
    			$("select[name='autores']").append("<option value='"+auxiliar+"'>"+auxiliar+"</option>");
    		});
    	});
    }
    $("select[name='autores']").change(librosautor);
    function librosautor(){
    	$("tbody.librosautor").text("");
    	var autor = $("select[name='autores']").val();
    	$.ajax({
    		type: "POST",
    		url: "http://www.ayas.hol.es/server/librosautor.php",
    		data: ({AUTOR:autor}),
    		success: function(data){
    			$("#tablaautor").css("visibility", "visible");
    			$.each(data, function(i, val){
    				$("tbody.librosautor").append("<tr><td class='titulo'>"+val.TITULO+"</td><td>"+val.ANOPUBLICACION+"</td><td>"+val.EDITORIAL+"</td><td>"+val.PAGINAS+"</td><td>"+val.ISBN+"</td></tr>");
    			});
    		}
    	});
    }
    $("input[name='editorialbusqueda']").keyup(libroseditorial);
    function libroseditorial(){
    	var editorial = $("input[name='editorialbusqueda']").val();
    	$.ajax({
    		type: "POST",
    		url: "http://www.ayas.hol.es/server/libroseditorial.php",
    		data: ({EDITORIAL:editorial}),
    		success: function(data){
    			$("tbody.libroseditorial").text("");
    			$("#tablaeditorial").css("visibility", "visible");
    			$.each(data, function(i, val){
    				$("tbody.libroseditorial").append("<tr><td class='titulo'>"+val.TITULO+"</td><td>"+val.AUTOR+"</td><td>"+val.ANOPUBLICACION+"</td><td>"+val.PAGINAS+"</td><td>"+val.ISBN+"</td></tr>");
    			});
    		}
    	});

    }


	
});