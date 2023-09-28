import { Menu } from "@entity/menu.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { formatResponse } from "@utils/formatResponse";
import { Repository } from "typeorm";

const formatMenu = (menu: Menu[]) => {
  const topLevelList: (Menu & { children?: Menu[] })[] = menu.filter((item) => !item.parentId);

  menu.forEach((item) => {
    if (item.parentId) {
      const index = topLevelList.findIndex((m) => m.id === item.parentId);

      if (index > -1) {
        const children = topLevelList[index].children || [];

        children.push(item);

        topLevelList[index].children = children;
      }
    }
  });

  return topLevelList;
};

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>
  ) {}

  async getMenuList() {
    try {
      const menuList = await this.menuRepository.find();

      return formatResponse({ data: formatMenu(menuList) });
    } catch (error) {
      throw error;
    }
  }
}
