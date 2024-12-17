import { Request, Response, NextFunction } from 'express';

// Función para manejar funciones asíncronas y pasar errores al siguiente middleware
const asyncController = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);  // Captura cualquier error y lo pasa al siguiente middleware
};

export default asyncController;
