var addNewTask = document.getElementById('addtask');
var inputTask = document.getElementById("newtask");
var listTasks = document.getElementById("listOfTasks");
var targetElem, elementToEdit, checkElem, delElem, editInput, elemId, oldValue;

var addTasks = function(){
	if(inputTask.value !== ""){
		listTasks.style.display = "block";
		var newTask = document.createElement("div");
		newTask.className = "taskWrapper";
		newTask.innerHTML = '<input id="checkedTask'+(listTasks.childNodes.length+1) +'" class="taskContent" type="checkbox" />'+ 
							'<span id="taskContent'+(listTasks.childNodes.length+1) +'" class="taskContent">' + inputTask.value +
							'</span>'+
							'<input id="deletetask' + (listTasks.childNodes.length+1) +'" class="deletetask" type="button" value="x" />';
		listTasks.appendChild(newTask);
		inputTask.value = '';
	}

};

inputTask.addEventListener('keyup', function(e){
	if(e.keyCode == 13){
		addTasks();
	}
}, false);

listTasks.addEventListener('click', function(e) {
	if(e.target.id.indexOf('checkedTask') != -1) {
		var contentToCross = e.target.parentNode.getElementsByTagName("span");
		if(e.target.checked) {
			contentToCross[0].style.textDecoration = "line-through";
		} else {
			contentToCross[0].style.textDecoration = "none";

		}
	} else if(e.target.id.indexOf('deletetask') != -1) {
		targetElem = document.getElementById(e.target.id);
		var elementToRemove = targetElem.parentNode;
		elementToRemove.parentNode.removeChild(elementToRemove);
		if(listOfTasks.children.length == 0){
				listTasks.style.display = "none";
			}
	} else if(e.target.id.indexOf('taskContent') != -1) {
		var listInputs = listTasks.getElementsByTagName('input');

		for (var i = 0; i < listInputs.length; i++) {
			if(listInputs[i].type == "text"){
				listInputs[i] = origElem;
				return listInputs[i];
			} else if(document.getElementById('newValue') < 1  ){
				targetElem = document.getElementById(e.target.id);
				elemId = e.target.id;
				origElem = targetElem.parentNode;
				elementToEdit = targetElem.parentNode;
				oldValue = e.target.textContent;
				checkElem = elementToEdit.firstChild;
				delElem = elementToEdit.lastChild;
				editInput = '<input id ="newValue" class="newtask edittask" type="text" value="' + elementToEdit.textContent +'" />' +
								'<input id="confirmEdit" class="confirmtask" type="button" value="+" />' +
								'<input id ="cancelEdit" class="deletetask" type="button" value="-" />' ;

		
				elementToEdit.innerHTML = editInput;

				elementToEdit.addEventListener('keyup', function(ev){
					if(ev.keyCode == 13){
						confirmEdit(ev);
					}
				}, false);
				return elementToEdit;
			}
		};
			
		
	} else if(e.target.id == "confirmEdit") {
		confirmEdit (e);
	} else if(e.target.id == "cancelEdit") {
		cancelEdit(e);
	}

	function confirmEdit (ev) {
		var newValue = ev.target.parentNode.querySelector("#newValue").value
		elementToEdit.innerHTML = '<span id="'+ elemId + '" class="taskContent">'+ newValue +'</span>'
		elementToEdit.insertBefore(checkElem, elementToEdit.firstChild);
		elementToEdit.appendChild(delElem);
		elementToEdit = '';
	}
			
	function cancelEdit (ev) {	
		elementToEdit.innerHTML = '<span id="'+ elemId + '" class="taskContent">'+ oldValue +'</span>'
		elementToEdit.insertBefore(checkElem, elementToEdit.firstChild);
		elementToEdit.appendChild(delElem);			
	}

},false	)