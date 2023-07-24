export interface JwtPayload {
  id: number;
  username: string;
  realName: string;
  roleId: number;
  serviceType: ServiceType;
}
