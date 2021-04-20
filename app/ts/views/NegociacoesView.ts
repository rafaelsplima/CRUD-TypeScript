import { View } from './View';
import { Negociacoes } from '../models/Negociacoes';
export class NegociacoesView extends View<Negociacoes> {

    template(model: Negociacoes): string {

        return `
            <style>
                .buttom-apagar {
                    background-color: transparent;
                    border: none;
                    text-decoration: none;
                }

                .icon-apagar {
                    cursor: pointer;
                }

                .icon-apagar:hover {
                    color: red;
                }
            </style>
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>AÇÃO</th>
                        <th>ID</th>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>

                <tbody>
                ${model.paraArray().map(negociacao => 
                    `
                        <tr>
                            <td>
                                <button type="button" id="apagar" class="buttom-apagar" value="${negociacao.id}">
                                    <input type="hidden" id="apagarId"/>
                                    <span class="glyphicon glyphicon-trash icon-apagar"></span>  
                                </button>
                            </td>
                            <td>${negociacao.id}</td>
                            <td>${negociacao.data.getDate()}/${negociacao.data.getMonth()+1}/${negociacao.data.getFullYear()}</td>
                            <td>${negociacao.quantidade}</td>
                            <td>${negociacao.valor}</td>
                            <td>${negociacao.volume}</td>
                        </tr>                        
                    `).join('')}
                </tbody>
                <tfoot>
                </tfoot>
            </table>
        `
    }
}