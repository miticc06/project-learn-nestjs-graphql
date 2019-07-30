import { Injectable, NestMiddleware, Headers } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../user/user.service'
import { AuthenticationError } from 'apollo-server-core';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private readonly userService: UserService) {
    }


    use(req: Request & { userId: any }, res: Response, next: Function) {

        try {
            let token = req.get("token");
            if (!token || token.length === 0) {
                throw new AuthenticationError('Khong co token!');
            }

            let decodedToken = jwt.verify(token, "SECRECT_KEY");

            if (!decodedToken) {
                throw new Error("Token khong hop le!");
            }
            req.userId = decodedToken.userId;

        } catch (error) {
            req.userId = null;
        }

        //console.log('Set request userId: ', req.userId);
        next();
    }
}
