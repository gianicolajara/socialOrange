import Router, { Response } from "express";

const notFoundRouter = Router();

// 404
notFoundRouter.get("*", (_, res: Response) => {
  return res.status(404).json({
    message: "page not found",
  });
});

export default notFoundRouter;
