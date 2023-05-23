import { Public } from "@decorator/public.decorator";
import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { PagingParameterDto } from "src/dto/pagingParameter.dto";
import { AuthService } from "../auth/auth.service";
import { LoginDto, RegisterInfoDto } from "./user.dto";
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
  register(@Body() body: RegisterInfoDto) {
    return { code: 200, data: body };
  }

  @Post("login")
  @Public()
  async login(@Body() body: LoginDto) {
    try {
      const authResult = await this.authService.validateUser(body.username, body.password);

      if (authResult.code === 200) {
        return await this.authService.certificate(authResult.data);
      }

      return authResult;
    } catch (error) {
      return error;
    }
  }

  @Get("getUser")
  @Public()
  async getUserPage(@Query() query: PagingParameterDto) {
    try {
      const users = await this.userService.getUserPage(query);

      return users;
    } catch (error) {
      return error;
    }
  }
}
