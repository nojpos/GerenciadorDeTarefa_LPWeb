class LStorage{
    //salvar no localStorage.
    salvar(data, titulo, status){
        window.localStorage.setItem(titulo, [data, titulo, status]);
        console.log("task salva localmente.");
    }

    //excluir do localStorage.
    excluir(id){
        window.localStorage.removeItem(id);
        console.log(`Task de id: "${id}" removida.`);
    }

    concluir(id) {
        let task = JSON.parse(window.localStorage.getItem(id));
        task["status"] = true;
        const task_converted = JSON.stringify(task);
        window.localStorage.setItem(id, task_converted);
        console.log(`Task de id: "${id}" concluída."`);
    }

    //retorna a tarefa salva localmente.
    getTask(chave){
        return window.localStorage.getItem(chave);
    }

    //retorna uma array com todas as keys armazenadas para serem acessadas.
    getKeys() {
        this.keys = [];
        for(let b in Object.entries(localStorage)){
            //pegando as chaves e salvando na lista.
            this.keys.push(window.localStorage.key(b));
        };
        return this.keys;
    }
}

g_tasks = new LStorage();
console.log("keys salvas no storage: " + g_tasks.getKeys());

class Tarefa {
    constructor(data, titulo, status) {
        this.date = data;
        this.title = titulo;
        this.status = status;

    }

    
    adicionarTarefa(data, titulo) {

        t1 = new Tarefa('12/02/2020', 'lavar o carro', 'false')
        console.log(t1)
    }
}

//variavel global da estrutura de tarefas
let tasks = document.querySelectorAll('tbody')[0];
//Adiciona no DOM as tasks
function renderTask(id, data, titulo, status) {
    //renderiza não completada
    if(status=="false" || status==false) {
        tasks.insertAdjacentHTML("afterBegin", `<tr id='itensTabela'><th>${data}</th><td>${titulo}</td><td class='text-right'><button id="btnConcluir" type="button" onClick="concluiTask(this)" name="${id}" class="btn btn-success">Conluir</button>
        <button id="btnExcluir" type="button" class="btn btn-danger" onClick="removeTask(this)" name="${id}">Excluir</button></td></td></tr>`);
    } else { //renderiza os completados tracejado e sem o botão concluir.
        tasks.insertAdjacentHTML("afterEnd", `<tr id='itensTabela'><th class="completo">${data}</th><td class="completo"><strike>${titulo}</strike></td><td class='text-right completo'>Concluído!</td></td></tr>`);
    }
}

//Função para remover do DOM e excluir do localStorage
function removeTask(ele, id=undefined) { //Exlui a task do DOM
    if(id==undefined) {
        g_tasks.excluir(ele['name']);
        ele.parentElement.parentElement.remove();
    } else {
        ele.parentElement.parentElement.remove();
    }
}

function concluiTask(ele, id=undefined) {
    let id_salva = ele['name'];
    g_tasks.concluir(ele['name']);
    let tarefa = JSON.parse(localStorage.getItem(ele['name']));
    removeTask(ele, false);
    renderTask(id_salva, tarefa['date'].split("em"), tarefa['title'], tarefa['status']);
}

//retorna um número aleatorio entre 0-1024
function random() {
    return Math.floor(Math.random()*1024);
}

function formatDate(date){
    return date.replace(/\/[0-9]*$/,"");
}


function lerTarefa(){
    let tarefa = document.getElementById("tituloTarefa").value
    a =tarefa.split("em")
    t = new Tarefa(formatDate(a[1]), a[0], "false")

    const userString = JSON.stringify(t);

    
    let tarefa_id = random();

    localStorage.setItem(tarefa_id,userString);
    a = JSON.parse(userString)

    let tarefa_atual = JSON.parse(localStorage.getItem(tarefa_id));
    renderTask(tarefa_id, tarefa_atual["date"], tarefa_atual["title"], tarefa_atual["status"]);

    document.getElementById("tituloTarefa").value = ""
}

//renderiza todas as tasks salvas localmente
for(task in g_tasks.getKeys()) {
    let tarefa = JSON.parse(localStorage.getItem(g_tasks.getKeys()[task]));
    renderTask(g_tasks.getKeys()[task], tarefa["date"], tarefa["title"], tarefa["status"]);
}

