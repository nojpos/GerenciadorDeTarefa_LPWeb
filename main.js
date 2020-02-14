class Tarefa{
    constructor() {}
}






class LStorage{
    constructor(data, titulo, status) {
        this.data = data;
        this.titulo = titulo;
        this.status = status;
        window.localStorage.setItem("teste", "aaa");
        window.localStorage.setItem("teste2", "aaa2");
    }

    salvar(){
        window.localStorage.setItem(this.titulo, {"data": this.data, "titulo": this.titulo, "status": this.status});
        console.log("task salva localmente.");
    }

    //retorna uma array com todas as keys armazenadas para serem acessadas
    getKeys() {
        this.keys = [];
        for(let b in Object.entries(localStorage)){
            //pegando as chaves e salvando na lista.
            this.keys.push(window.localStorage.getItem(Object.entries(localStorage)[b][0]))
        };
    }
}

global_tasks = new LStorage()
console.log("keys salvas no storage: " + global_tasks.getKeys())