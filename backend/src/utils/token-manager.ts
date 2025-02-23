import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the signed cookies
  const token = req.signedCookies[`${process.env.COOKIE_NAME}`];

  // If no token is found, return Unauthorized error
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user data to res.locals for further use
    res.locals.jwtData = decoded;

    // Continue to the next middleware or route handler
    return next();
  } catch (err) {
    // If token verification fails (expired or invalid), return Unauthorized error
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ message: "Token Expired or Invalid" });
  }
};