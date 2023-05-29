import { SetMetadata } from "@nestjs/common";

export function CheckRole(...roles: string[]) {
  return SetMetadata("roles", roles);
}
