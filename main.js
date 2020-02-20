class LStorage {
    //salvar no localStorage.
    salvar(data, titulo, status) {
        window.localStorage.setItem(titulo, [data, titulo, status]);
        console.log("task salva localmente.");
    }

    //excluir do localStorage.
    excluir(id) {
        window.localStorage.removeItem(id);
        console.log(`Task de id: "${id}" removida.`);
    }

    //altera o status da tarefa para true
    concluir(id) {
        let task = JSON.parse(window.localStorage.getItem(id));
        task["status"] = true;
        const task_converted = JSON.stringify(task);
        window.localStorage.setItem(id, task_converted);
        console.log(`Task de id: "${id}" concluída."`);
    }

    //retorna a tarefa salva localmente.
    getTask(chave) {
        return window.localStorage.getItem(chave);
    }

    //retorna uma array com todas as keys armazenadas para serem acessadas.
    getKeys() {
        this.keys = [];
        for (let b in Object.entries(localStorage)) {
            //pegando as chaves e salvando na lista.
            this.keys.push(window.localStorage.key(b));
        };
        return this.keys;
    }
}

g_tasks = new LStorage();
console.log("keys salvas no storage: " + g_tasks.getKeys());

//classe Tarefa
class Tarefa {
    constructor(data, titulo, status) {
        this.date = data;
        this.title = titulo;
        this.status = status;

    }
}

//variavel global da estrutura de tarefas
let tasks = document.querySelectorAll('tbody')[0];

//Adiciona no DOM as tasks
function renderTask(id, data, titulo, status) {
    //renderiza não completada
    if (status == "false" || status == false) {
        tasks.insertAdjacentHTML("afterBegin", `<tr id='itensTabela'><th>${data}</th><td>${titulo}</td><td class='text-right'><button id="btnConcluir" type="button" onClick="concluiTask(this)" name="${id}" class="btn btn-success">Conluir</button>
        <button id="btnExcluir" type="button" class="btn btn-danger" onClick="removeTask(this)" name="${id}">Excluir</button></td></td></tr>`);
    } else { //renderiza os completados tracejado e sem o botão concluir.
        tasks.insertAdjacentHTML("afterEnd", `<tr id='itensTabela'><th class="completo">${data}</th><td class="completo"><strike>${titulo}</strike></td><td class='text-right completo'>Concluído!</td></td></tr>`);
    }
}

//Função para remover do DOM e excluir do localStorage
function removeTask(ele, id = undefined) { //Exlui a task do DOM
    if (id == undefined) {
        g_tasks.excluir(ele['name']);
        ele.parentElement.parentElement.remove();
    } else {
        ele.parentElement.parentElement.remove();
    }
}

//conclui a tarefa e chama as funções removeTask e renderTask
function concluiTask(ele, id = undefined) {
    let id_salva = ele['name'];
    g_tasks.concluir(ele['name']);
    let tarefa = JSON.parse(localStorage.getItem(ele['name']));
    removeTask(ele, false);
    renderTask(id_salva, tarefa['date'].split("em"), tarefa['title'], tarefa['status']);
}

//retorna um número aleatorio entre 0-1024
function random() {
    return Math.floor(Math.random() * 1024);
}

//formata a data
function formatDate(date) {
    return date.replace(/\/[0-9]*$/, "");
}

//ler a tarefa, popula um objeto de Tarefa, adiciona no LocalStorage, chama a função renderTask e limpa o campo input
function lerTarefa() {
    let tarefa = document.getElementById("tituloTarefa").value
    listaTarefa = tarefa.split("em")
    objetoTarefa = new Tarefa(formatDate(listaTarefa[1]), listaTarefa[0], "false")

    const userString = JSON.stringify(objetoTarefa);
    let tarefa_id = random();

    localStorage.setItem(tarefa_id, userString);

    let tarefa_atual = JSON.parse(localStorage.getItem(tarefa_id));
    renderTask(tarefa_id, tarefa_atual["date"], tarefa_atual["title"], tarefa_atual["status"]);

    document.getElementById("tituloTarefa").value = ""
}

//renderiza todas as tasks salvas localmente
for (task in g_tasks.getKeys()) {
    let tarefa = JSON.parse(localStorage.getItem(g_tasks.getKeys()[task]));
    renderTask(g_tasks.getKeys()[task], tarefa["date"], tarefa["title"], tarefa["status"]);
}