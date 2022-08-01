import { NextFunction, Request, Response } from 'express';

const properties = ['productsIds'];

function validateProperties(productIds: []): [boolean, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(productIds, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

function validateLength(productIds: []): [boolean, string | null] {
  if (productIds.length === 0) {
    return [false, 'productsIds'];
  }
  return [true, null];
}

function validateArray(productIds: []): [boolean, string | null] {
  if (typeof productIds !== 'object') {
    return [false, 'array'];
  }
  return [true, null];
}

function validationProductsIds(req: Request, res: Response, next: NextFunction) {
  const requerement = req.body;
  let [valid, property] = validateProperties(requerement);
  if (!valid) return res.status(400).json({ message: `"${property}" is required` });
  const [valide, propriedade] = validateArray(requerement.productsIds);
  if (!valide) {
    return res.status(422).json({
      message: `"productsIds" must be an ${propriedade}` });
  }
  [valid, property] = validateLength(requerement.productsIds);
  if (!valid) {
    return res.status(422).json({ message: `"${property}" must include only numbers` });
  }
  next();
}

export default validationProductsIds;
