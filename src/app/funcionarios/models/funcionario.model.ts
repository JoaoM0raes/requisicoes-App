import { Departamento } from 'src/app/departamentos/modules/departamento.model';

export class Funcionario{
  id:string
  nome:string;
  email:string
  funcao:string
  departamentoId:string
  Departamento?:Departamento
}
