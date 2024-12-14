import { Request, Response } from "express";

import { ApiController } from "@/server/types/common/index.js";

const requestErrorHandler = (controller: ApiController) =>{
  return async (req: Request, res: Response) => {
    try {
      return await controller(req, res);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export { requestErrorHandler };