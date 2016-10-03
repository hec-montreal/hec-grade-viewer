<%@page contentType="text/html; charset=UTF-8" %>

<!DOCTYPE html>
<html> 
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1"> 
		<title>HEC Grade Viewer</title>
	
		<%= request.getAttribute("sakai.html.head.js") %>  
		<%= request.getAttribute("sakai.html.head") %>
		<%= request.getAttribute("sakai.html.head.css.skin") %>

		<script src="lib/shim.min.js"></script>
		<script src="lib/zone.js"></script>
		<script src="lib/Reflect.js"></script>
		<script src="lib/system.src.js"></script>
		<script src="lib/systemjs.config.js"></script>

		<script>
			System.import('app').catch(function(err){ console.error(err); });
		</script>
	</head>
	
	<body id="body" class="portletBody" >
		<grade-viewer>Load...</grade-viewer>
	</body>
</html>
