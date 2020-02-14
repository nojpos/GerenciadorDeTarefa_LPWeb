class Tarefa{
    constructor() {}
}






class LStorage{
    constructor(data, titulo, status) {
        this.data = data;
        this.titulo = titulo;
        this.status = status;
        //testes
        window.localStorage.setItem("teste", "aaa");
        window.localStorage.setItem("teste2", "aaa2");
    }

    //salvar no localStorage.
    salvar(){
        window.localStorage.setItem(this.titulo, {"data": this.data, "titulo": this.titulo, "status": this.status});
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