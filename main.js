<<<<<<< HEAD
class Tarefa{
    constructor() {}
}



 


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
=======
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
>>>>>>> 4769bfbc4966a26d61472a5d3e1c6786668c82f7
