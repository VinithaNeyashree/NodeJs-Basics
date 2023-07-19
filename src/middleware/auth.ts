import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user: string; 
}

module.exports = function (req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Auth Error" });

  const split_token = token.split(" ");
  const bearer_token = split_token[1];
  if (!bearer_token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded: JwtPayload = jwt.verify(bearer_token, "SECRET_STRONG_PASS_FIND") as JwtPayload;
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ status: "false", message: "Invalid Token" });
  }
};
