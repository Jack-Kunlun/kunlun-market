import { Roles } from "@decorator/roles.decorator";
import { Controller, Get } from "@nestjs/common";
import { MenuService } from "./menu.service";

@Controller("menu")
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get("list")
  @Roles("admin")
  async getMenuList() {
    try {
      return this.menuService.getMenuList();
    } catch (error) {
      throw error;
    }
  }
}
