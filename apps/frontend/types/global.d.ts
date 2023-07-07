declare global {
  declare type Nullable<T> = T | undefined | null;
}

declare module "*.vue" {
  import Vue from "vue";

  // eslint-disable-next-line import/no-default-export
  export default Vue;
}

export {};
