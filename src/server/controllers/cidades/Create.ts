import { Request, Response } from "express";
import * as yup from 'yup';// validação de campos
import { validation } from "../../shared/middleware";// importa as validações do index na pasta middleare 


interface ICidade {
  nome  : string,
  estado: string
}

export const createValidation = validation((getSchema) =>({
  body: getSchema<ICidade>(yup.object({
          nome: yup.string().required().min(3),
          estado: yup.string().required().min(2).max(2)
        }))
  }));

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {

  console.log(req.body);

  return res.send('Create!');
}
