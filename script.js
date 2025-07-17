const form = document.getElementById("task-form"); //form
const taskName = document.getElementById("task"); //input type text
const levelTask = document.getElementById("level-task"); //select
const taskList = document.getElementById("task-list"); //section

form.addEventListener("submit", function(event){
    event.preventDefault(); //evita recargar la pagina

    const taskInfo = {
        name: taskName.value,
        level: levelTask.value
    };

    //crear div contenedor
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-item");

    // Texto de la tarea
    const taskContent = document.createElement("span");
    taskContent.classList.add("task-text");
    taskContent.innerHTML= (`<strong>${taskInfo.name}</strong> ➤ Importancia: <i>${taskInfo.level}</i>`);
    taskDiv.style.color = "#131255";
    taskDiv.appendChild(taskContent); //permite insertar un nuevo elemento dentro de otro elemento existente en el DOM

    // Grupo de botones
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");

    const states = ["proceso", "detenida", "terminada"];
    const colors = {
        proceso: "#06FA54",
        detenida: "#FAB103",
        terminada: "#9624BC"
    };

    const editBtn = document.createElement("button");
    editBtn.innerHTML = (`<img src="./assets/editar.png" alt="Editar tarea" width="20" height="20">`);
    editBtn.classList.add("edit-button");

    editBtn.addEventListener("click", function(){
        // Convertir el contenido actual a un input para edición
        const currentText = taskInfo.name;
        const currentLevel = taskInfo.level;

        const newText = prompt("Editar nombre de la tarea:", currentText);
        if(newText !== null && newText.trim() !== ""){
            const newLevel = prompt("Editar nivel de importancia:",currentLevel);
            if(newLevel !== null && newLevel.trim() !== ""){
                taskContent.innerHTML = (`<strong>${newText}</strong> ➤ Importancia: <i>${newLevel}</i>`);
                taskInfo.name = newText;
                taskInfo.level = newLevel;
            };
        };
    });
    buttonGroup.appendChild(editBtn);

    // variable para guardar el estado actual (solo uno activo)
    let activeState = null;

    states.forEach((state) =>{
        const stateBtn = document.createElement("button");
        stateBtn.classList.add("state-button");
        stateBtn.style.border =(`2px solid ${colors[state]}`);
        stateBtn.style.backgroundColor = "transparent"; 

        stateBtn.addEventListener("click", function(){
            if(activeState === state){
                // Si ya estaba activo, lo deseleccionamos
                activeState = null;

                //Resetear todos los botones
                buttonGroup.querySelectorAll(".state-button").forEach(btn => {
                    btn.style.backgroundColor = "transparent";
                });

                //resetar estilos de tarea
                taskDiv.style.opacity = "1";
                taskDiv.style.textDecoration = "none";
            }else{
                // Si no estaba activo, activamos este
                activeState = state;

                // Limpiar todos primero
                buttonGroup.querySelectorAll(".state-button").forEach(btn => {
                    btn.style.backgroundColor = "transparent";
                });

                //Activar el boton seleccionado (actual)
                stateBtn.style.backgroundColor = colors[state];

                // Estilos según estado
                taskDiv.style.opacity = "1";
                taskDiv.style.textDecoration = "none";

                if(state === "terminada"){
                    taskDiv.style.opacity = "0.9";
                    taskDiv.style.textDecoration = "line-through";
                };
            };  
        });

        buttonGroup.appendChild(stateBtn);
    });

    const delBtn = document.createElement("button");
    delBtn.innerHTML = (`<img src="./assets/borrar.png" alt="Eliminar tarea" width="20" height="20">`);
    delBtn.classList.add("delete-button"); //classList: Es un objeto que representa la lista de clases CSS que tiene un elemento HTML. en este caso solo la clase delete-button

    delBtn.addEventListener("click", function(){
        taskList.removeChild(taskDiv); // ← lo elimina del HTML y desaparece
    });

    buttonGroup.appendChild(delBtn);
    taskDiv.appendChild(buttonGroup); //agrega el btn al div que se crea cuando se agrega una tarea
    taskList.appendChild(taskDiv); //crea el div y lo muestra dentro de la section con id="task-list"

    form.reset();
});