import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";// retorna os statuses code do http
import * as yup from 'yup';// validação de campos


interface ICidade {
  nome  : string,
  estado: string
}

const bodyValidation: yup.Schema<ICidade> = yup.object({
  nome: yup.string().required().min(3),
  estado: yup.string().required().min(2).max(2)
});
// const bodyValidation: yup.Schema<ICidade> = yup.object({
//   nome: yup.string()
//            .required('O campo nome é obirgatório')
//            .min(3, 'O campo nome deve ter no mínimo 3 caracteres!'),
//   estado: yup.string()
//            .required('O campo estado é obirgatório')
//            .min(2, 'O campo nome deve ter no mínimo 2 caracteres!')
//            .max(2, 'O campo nome deve ter no máximo 2 caracteres!')
// });

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  let validatedData: ICidade | undefined = undefined;

  try {
    validatedData = await bodyValidation.validate(req.body, {abortEarly: false});
  } catch (err) {
    const yupError = err as yup.ValidationError;
    // const ValidationErrors: Record<string, string> = {};
    const errors: Record<string, string> = {};

    yupError.inner.forEach(error => {
      if (!error.path) return;

      errors[error.path] = error.message;
    })

    // return res.status(StatusCodes.BAD_REQUEST).json({ errors:  ValidationErrors})
    return res.status(StatusCodes.BAD_REQUEST).json({ errors});
  }


console.log(validatedData);


  return res.send('Create!');
}
