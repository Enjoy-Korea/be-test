import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";
import { UserService } from "../user.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService: UserService) { }

    async intercept(context: ExecutionContext, handler: CallHandler) {
        const request = context.switchToHttp().getRequest();
        if (request.user === undefined) {
            return handler.handle();
        }

        const userId = request.user.sub;
        if (userId) {
            const user = await this.userService.findById(userId);
            request.currentUser = user;
        }

        return handler.handle();
    }
}