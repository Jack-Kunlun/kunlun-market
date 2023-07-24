import { SetMetadata } from "@nestjs/common";
import { ROLE_KEY, RoleType } from "src/const";

export const Roles = (serviceType: ServiceType, role?: number) =>
  SetMetadata<string, RoleType>(ROLE_KEY, [serviceType, role]);
