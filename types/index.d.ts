import { AttributifyAttributes } from "windicss/types/jsx";

declare global {
  declare type Nullable<T> = T | undefined | null;

  declare namespace React {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface, no-unused-vars, @typescript-eslint/no-unused-vars
    interface HTMLAttributes<T> extends AttributifyAttributes {}
  }
}

export {};
