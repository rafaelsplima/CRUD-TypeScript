import { NegociacaoController } from './controllers/NegociacaoController';

const controller = new NegociacaoController();
$('.form').submit(controller.adiciona.bind(controller));

const apagarNegociacao = (id: number) => {
    controller.apagar(id);
}

$(document).on("click", '#apagar', function() {
    apagarNegociacao(parseInt($(this).val()));
});