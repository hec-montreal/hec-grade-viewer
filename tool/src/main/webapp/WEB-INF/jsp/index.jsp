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
	</head>
	
	<body id="body" class="portletBody">
		<input type="text" id="matricule" />
		
		<button id="btnTest" onclick="javascript:test();">Test</button>
	
		<textarea id="log" style="width: 600px; height: 400px;"></textarea>
		
		<script>
			function test() {
				$.get($("#matricule").val() + "/grades", function (data) {
					$("#log").val(data);
					
					console.log(JSON.parse(data));
				});
			}
		</script>
	</body>
</html>
