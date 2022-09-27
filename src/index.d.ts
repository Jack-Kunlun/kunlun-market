import { AttributifyAttributes } from "windicss/types/jsx";

declare type Nullable<T> = T | undefined | null;

declare module "react" {
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface, no-unused-vars, @typescript-eslint/no-unused-vars
    interface HTMLAttributes<T> extends AttributifyAttributes {}
  }
}
