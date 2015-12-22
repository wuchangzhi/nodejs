/**
 * Created by ckt on 15-12-3.
 */
var editRow = undefined;
var IsCheckFlag = true;
$(document).ready(function () {
	$('#maintable').datagrid({
		url: "/users/data",
		singleSelect: false,
		fit: true,
		fitColumns: true,
		sortName: "name",
		columns: [[
			{field: 'id',checkbox: true, width: 10},
			{
				field: 'name', title: 'name', sortable: true, width: 150, align: 'center',
				editor: {type: 'validatebox', options: {required: true}}
			},
			{
				field: 'age', title: 'age', sortable: true, width: 50, align: 'center',
				editor: {type: 'text', options: {required: true}}
			},
			{
				field: 'email', title: 'email', width: 200, align: 'center',
				editor: {type: 'validatebox', options: {required: true, validType: 'email'}}
			},
			{
				field:'operation',title : '操作',width:50,align :'center',
				formatter : function(value, rowData,rowIndex){
					var btn = "<a class='editcls' onclick='viewRow();'></a>";
					return btn;
				}
			}
		]],
		toolbar: '#tb',
		pagination: true,
		pageList: [10, 20, 30],
		//
		//onClickRow: function (rowIndex, rowData) {
		//	//alert(rowData  + rowIndex);
		//	if (flag) {
		//
		//	} else {
		//		console.log(rowData);
		//	}
		//},
		onLoadSuccess: function (data) {
			$('.editcls').linkbutton({text: '查看', plain: true});
			$('#maintable').datagrid("resize");
			$('#save').hide();
			$('#redo').hide();
		},
		onBeforeEdit: function (index, row) {

		},
		//onDblClickRow : function(rowIndex, rowData){
		//	if (editRow != undefined) {
		//		$("#maintable").datagrid('endEdit', editRow);
		//		editRow = undefined;
		//	}else{
		//		$("#maintable").datagrid('beginEdit',rowIndex);
		//		editRow = rowIndex;
		//	}
		//},
		onAfterEdit: function (rowIndex, rowData, changes) {
			editRow = undefined;
			console.log(rowData);
			$.post('/users/data/save', rowData, function (data, status) {
				console.log(data + " " + status);
				$('#save').hide();
				$('#redo').hide();
			});

		},
		onSelect: function (rowIndex, rowData) {
			console.log("onSelect" + rowIndex);
			if (!IsCheckFlag) {
				IsCheckFlag = true;
				$("#maintable").datagrid("unselectRow", rowIndex);
			}
		}
	});
	var p = $('#maintable').datagrid('getPager');
	$(p).pagination({
		pageList : [10,20,30],
		beforePageText : "第",
		afterPageText : "页",
		displayMsg : "共{total}条",
		buttons:"#footer"
	});
});
function viewRow() {
	console.log("viewRow");
	IsCheckFlag = false;
	//$("#maintable").datagrid("unselectRow");
}
function doSearch() {
	$('#maintable').datagrid('load', {
		name: $('#name').val()
	});
}

obj = {
	add: function () {
		$('#save').show();
		$('#redo').show();
		if (editRow != undefined) {
			$("#maintable").datagrid('endEdit', editRow);
		} else {
			$("#maintable").datagrid('insertRow', {
				index: 0,
				row: {}
			});
			$("#maintable").datagrid('beginEdit', 0);
			editRow = 0;
		}
	},
	delete: function(){
		var rows = $("#maintable").datagrid('getSelections');
		var ids = [];
		rows.forEach(function(data){
			ids.push(data._id);
		});

		$.post('/users/data/delete', {ids:ids.join(",")}, function (data, status) {
			$("#maintable").datagrid('load');
		});

	},
	update: function () {
		var row = $("#maintable").datagrid('getSelected');
		if (row != null) {
			if (editRow != undefined) {
				$('#save').hide();
				$('#redo').hide();
				$("#maintable").datagrid('endEdit', editRow);
			} else {
				$('#save').show();
				$('#redo').show();
				var index = $("#maintable").datagrid('getRowIndex', row);
				$("#maintable").datagrid('beginEdit', index);
				editRow = index;
				//$("#maintable").datagrid('unselectAll');
			}
		}
	},
	save: function () {
		$("#maintable").datagrid('endEdit', editRow);
	},
	redo: function () {
		editRow = undefined;
		$("#maintable").datagrid('rejectChanges');
		$("#maintable").datagrid('unselectAll');
	}
};
