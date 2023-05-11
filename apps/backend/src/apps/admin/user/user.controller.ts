import { Public } from "@decorator/public.decorator";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { RegisterInfoDTO } from "./user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Get("user")
  findUser() {
    return this.userService.find();
  }

  @Get("user/:id")
  findOne(@Param("id") id: string) {
    return this.userService.findOneById(+id);
  }

  @Post("register")
  @Public()
  register(@Body() body: RegisterInfoDTO) {
    return { code: 200, data: body };
  }

  @Post("login")
  @Public()
  async login(@Body() { username, password }: { username: string; password: string }) {
    try {
      const authResult = await this.authService.validateUser(username, password);

      if (authResult.code === 200) {
        return await this.authService.certificate(authResult.data);
      }

      return authResult;
    } catch (error) {
      return error;
    }
  }
}
