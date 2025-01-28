import type { Request, Response } from "express";

type ApiController = (req: Request, res: Response) => Promise<Response>;

export type { ApiController };
