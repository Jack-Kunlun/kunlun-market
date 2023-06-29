import { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import type { AttributifyAttributes } from "@unocss/preset-attributify";

declare global {
  declare type Nullable<T> = T | undefined | null;

  declare namespace React {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface, no-unused-vars, @typescript-eslint/no-unused-vars
    interface HTMLAttributes<T> extends AttributifyAttributes {}
  }

  declare namespace Vi {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    interface JestAssertion<T = any> extends jest.Matchers<void, T>, TestingLibraryMatchers<T, void> {}
  }
}

export {};
