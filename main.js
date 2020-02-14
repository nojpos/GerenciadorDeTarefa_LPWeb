class LStorage{
    constructor() {
        //testes
        window.localStorage.setItem("teste", "aaa");
        window.localStorage.setItem("teste2", "aaa2");
    }

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
function renderTask(data, titulo, status) {
    //renderiza não completada
    if(status=="false" || status==false) {
        tasks.insertAdjacentHTML("afterBegin", `<tr id='itensTabela'><th>${data}</th><td>${titulo}</td><td class='text-right'><button id="btnConcluir" type="button" class="btn btn-success">Conluir</button>
        <button id="btnExcluir" type="button" class="btn btn-danger" onClick="removeTask(this)">Excluir</button></td></td></tr>`);
    } else { //renderiza os completados tracejado e sem o botão concluir.
        tasks.insertAdjacentHTML("afterBegin", `<tr id='itensTabela'><th><strike>${data}</strike></th><td><strike>${titulo}</strike></td><td class='text-right'> <button id="btnExcluir" type="button" class="btn btn-danger" onClick="removeTask(this)">Excluir</button></td></td></tr>`);
    }
}

//Função para remover do DOM
function removeTask(ele) { //Exlui a task do DOM
    ele.parentElement.parentElement.parentElement.removeChild(ele.parentElement.parentElement);
}
