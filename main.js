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