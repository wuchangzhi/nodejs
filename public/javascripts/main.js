/**
 * Created by ckt on 15-12-4.
 */
$(document).ready(function () {
	$('#tabs').tabs({
		fit : true,
		border : false
	});

	$('#stu-manager').click(function(node) {
		console.log($(this).text());
		if($('#tabs').tabs("exists",$(this).text())) {
			$('#tabs').tabs("select" ,$(this).text())
		}else {
			$('#tabs').tabs('add', {
				title: $(this).text(),
				closable: true,
				href: "/users/"
			});
		}
	});
	$('#stu-manager1').click(function(node) {
		console.log($(this).text());
		if($('#tabs').tabs("exists",$(this).text())) {
			$('#tabs').tabs("select" ,$(this).text())
		}else {
			$('#tabs').tabs('add', {
				title: $(this).text(),
				closable: true,
				href: "/users/"
			});
		}
	});
	//$('#stu-manager').trigger("click");


});