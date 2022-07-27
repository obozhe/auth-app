import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { AuthErrorCodes } from '../core/consts/error-codes.js';
import { AuthErrorMessages } from '../core/consts/error-messages.js';
import {
    ApiError400,
    ApiError404,
} from '../core/error-handler/models/client-errors.js';
import User from '../core/models/user.js';

const jwtMaxAge = 3 * 60 * 60; // 3h is sec

const createJWTToken = (user) =>
    jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
            lastName: user.lastName,
            firstName: user.firstName,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: jwtMaxAge,
        }
    );

const authorizeUser = (res, user) => {
    console.log(process.env.JWT_SECRET);

    const token = createJWTToken(user);

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: jwtMaxAge * 1000,
    });
    return res.status(200).send();
};

const findUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError404(
            AuthErrorCodes.USER_NOT_FOUND,
            AuthErrorMessages[AuthErrorCodes.USER_NOT_FOUND]
        );
    }

    return user;
};

const createUser = async ({ email, password, lastName, firstName }) => {
    const user = await User.create({ email, password, lastName, firstName });

    if (!user) {
        throw new ApiError400(
            AuthErrorCodes.USER_CREATION_FAILED,
            AuthErrorMessages[AuthErrorCodes.USER_CREATION_FAILED]
        );
    }

    return user;
};

const checkPasswordValidity = async (password, userPassword) => {
    const isValid = await bcrypt.compare(password, userPassword);
    if (!isValid) {
        throw new ApiError400(
            AuthErrorCodes.INVALID_PASSWORD,
            AuthErrorMessages[AuthErrorCodes.INVALID_PASSWORD]
        );
    }

    return isValid;
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        await checkPasswordValidity(password, user.password);
        authorizeUser(res, user);
    } catch (error) {
        next(error);
    }
};

const register = async (req, res, next) => {
    const { password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const user = await createUser({ ...req.body, password: hash });
        authorizeUser(res, user);
    } catch (error) {
        next(error);
    }
};

// const adminAuth = (req, res, next) => {
//     const token = req.cookies.jwt;
//     if (token) {
//         jwt.verify(token, process.env.JWT_SECRET, null, (err, decodedToken) => {
//             if (err) {
//                 return res.status(401).json({ message: 'Not authorized' });
//             } else {
//                 if (decodedToken.role !== Roles.Admin) {
//                     return res.status(401).json({ message: 'Not authorized' });
//                 } else {
//                     next();
//                 }
//             }
//         });
//     } else {
//         return res
//             .status(401)
//             .json({ message: 'Not authorized, token not available' });
//     }
// };
//
// const userAuth = (req, res, next) => {
//     const token = req.cookies.jwt;
//     if (token) {
//         jwt.verify(token, process.env.JWT_SECRET, null, (err, decodedToken) => {
//             if (err) {
//                 return res.status(401).json({ message: 'Not authorized' });
//             } else {
//                 if (decodedToken.role !== Roles.Basic) {
//                     return res.status(401).json({ message: 'Not authorized' });
//                 } else {
//                     next();
//                 }
//             }
//         });
//     } else {
//         return res
//             .status(401)
//             .json({ message: 'Not authorized, token not available' });
//     }
// };

export { login, register };
