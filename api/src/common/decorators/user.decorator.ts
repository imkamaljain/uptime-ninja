import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator(
  (field: string | undefined, ctx: ExecutionContext) => {
    const request: any = ctx.switchToHttp().getRequest();
    const user: any = request.user;
    return field ? user?.[field] : user;
  },
);
