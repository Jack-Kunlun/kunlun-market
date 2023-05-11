import { SetMetadata } from "@nestjs/common";
import { ADMIN_ROLE_KEY, AdminRole } from "src/const";

export const Roles = (role: AdminRole) => SetMetadata(ADMIN_ROLE_KEY, role);
