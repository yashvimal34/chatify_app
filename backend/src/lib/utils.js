import jwt from "jsonwebtoken";

export const generateToken = (userID, res) => {
    const token = jwt.sign({userID}, process.env.JWT_SECRET,{
        expiresIn: "7d"
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "development" ? false : true,
        // This secure works when you are creating projects for production ready. Eg.
        // http:locahost:3000 => This link works when you are in devlopemnt.
        // https:chatifyapp.com => This link works when you are in production.
        // The only difference is :- "http => for development" & "https => for production".
    });
    return token;
};