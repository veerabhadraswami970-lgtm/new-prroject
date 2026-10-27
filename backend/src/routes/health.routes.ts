import { Router, Request, Response } from "express";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      status: "ok",
      service: "feedback-api",
    },
  });
});

export default router;
