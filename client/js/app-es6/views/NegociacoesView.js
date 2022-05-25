import {View} from "./View.js";
import { DateHelper } from "../helpers/DateHelper.js";
import { currentInstanced } from "../controllers/NegociacaoController.js";

export class NegociacoesView extends View {

    constructor(elemento){
        super(elemento)

        elemento.addEventListener('click', e => {
            if(e.target.nodeName == "TH"){
                currentInstanced().ordena(e.target.textContent.toLowerCase())
            }
        })
    }

    template(model) {
        return `
        <table class="table table-hover table-bordered" data-table>
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
                ${model.negociacao.map(n => `
                    <tr>
                        <td>${DateHelper.dataParaTexto(n.data)}</td>
                        <td>${n.quantidade}</td>
                        <td>${n.valor}</td>
                        <td>${n.volume}</td>
                    </tr>
                `).join(" ")}
            </tbody>
                    <td colspan="3">Total:</td>
                    <td>${model.volumeTotal}</td>
            <tfoot>
            </tfoot>
        </table>
    `}
}
