import  { MensagemView, NegociacoesView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index';
import { DiaDaSemana } from '../Enums/index';
import { domInject } from '../helpers/decorators/index';
import { NegociacaoService } from '../services/index';
import {imprime } from '../helpers/index';

export class NegociacaoController {
    
    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;
    
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    private _service = new NegociacaoService();

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    private _ehDiaUtil(data: Date) {
        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }

    editar(event: Event, id: number) : void {
        event.preventDefault();
        console.log('EDITAR:', id);
    }

    apagar(id: number) : void {

        const arrayItems : Negociacao[] = this._negociacoes.paraArray().filter(negociacao => negociacao.id !== id);
        console.log(arrayItems);

        this._negociacoes.setNegociacoes(arrayItems);

        console.log('Aki');
        this._negociacoesView.update(this._negociacoes);
    }

    adiciona(event: Event): void {
        event.preventDefault();

        let id = Math.floor(Math.random() * (100000 - 1)) + 1;
        let data =  new Date(this._inputData.val().replace(/-/g, ', '));


        if(!this._ehDiaUtil(data)) {
            this._mensagemView.update('Somente negociações em dias úteis, por favor!');
            return;
        }
        
        const negociacao = new Negociacao(
            id,
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        )

        this._negociacoes.adiciona(negociacao);

        imprime(negociacao, this._negociacoes);

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação incluída com sucesso');
    }

}