import { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import type { AttributifyAttributes } from "@unocss/preset-attributify";

declare global {
  declare type Nullable<T> = T | undefined | null;

  declare type Override<P, S> = Omit<P, keyof S> & S;

  declare namespace React {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface, no-unused-vars, @typescript-eslint/no-unused-vars
    interface HTMLAttributes<T> extends AttributifyAttributes {}
  }

  declare namespace Vi {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    interface JestAssertion<T = any> extends jest.Matchers<void, T>, TestingLibraryMatchers<T, void> {}
  }

  declare interface PagingParameter {
    /**
     * 页码
     */
    current: number;
    /**
     * 每一页的数量
     */
    pageSize: number;
  }

  // Redecalare forwardRef
  declare module "react" {
    function forwardRef<T, P = object>(
      render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
    ): (props: P & React.RefAttributes<T>) => React.ReactNode | null;
  }
}

export {};
