/**
 * Created by ckt on 15-12-4.
 */
$(document).ready(function () {
	$('#tabs').tabs({
		fit : true,
		border : false,
		cache:false
	});

	$('#stu-manager').click(function(node) {
		console.log($(this).text());
		//addTab($(this).text(),"/users");
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
		//addTab($(this).text(),"/users");
		//if($('#tabs').tabs("exists",$(this).text())) {
		//	$('#tabs').tabs("select" ,$(this).text())
		//}else {
		//	$('#tabs').tabs('add', {
		//		title: $(this).text(),
		//		closable: true,
		//		href: "/users/"
		//	});
		//}
	});
	//$('#stu-manager').trigger("click");

	//function addTab(title, href){
	//	if ($('#tabs').tabs('exists', title)){//如果tab已经存在,则选中并刷新该tab
	//		$('#tabs').tabs('select', title);
	//	} else {
	//		var content = '<iframe scrolling="auto" frameborder="0"  src="'+href+'" style="width:100%;height:100%;"></iframe>';
	//		$('#tabs').tabs('add',{
	//			title:title,
	//			content:content,
	//			closable:true
	//		});
	//	}
	//}
});