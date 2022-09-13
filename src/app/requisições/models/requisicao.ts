import { Departamento } from "src/app/departamentos/modules/departamento.model";
import { equipamento } from "src/app/equipamentos/modules/equipamento.module";
import { Funcionario } from 'src/app/funcionarios/models/funcionario.model';
export class requisiscao{
   id:string;
   descricao:string;
   departamento?:Departamento;
   departamentoId:string;
   funcionario?:Funcionario
   funcionarioId:string;
   equipamento?:equipamento;
   equipamentoId:string;
   data:Date | any;

}
