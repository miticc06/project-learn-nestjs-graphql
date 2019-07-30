import { createParamDecorator, ReflectMetadata } from '@nestjs/common';
import { Request } from 'express';
// export const UserId = createParamDecorator((data: any, req: any) => {
//     console.log(data);
//     console.log(req);
//     return req.userId;
// });


export const UserId = createParamDecorator(
    (
        req: Request & { userId: any },
    ) => {

        console.log(req);


        return req.userId;
    },
);
