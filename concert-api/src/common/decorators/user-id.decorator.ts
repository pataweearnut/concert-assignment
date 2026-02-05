import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserId = createParamDecorator(
    (_, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        return req.headers['x-user-id'];
    },
);
