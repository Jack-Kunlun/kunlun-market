import { Menu } from "@entity/menu.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MenuService } from "./menu.service";

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  controllers: [],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
