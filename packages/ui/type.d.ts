import { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare global {
  declare type Nullable<T> = T | undefined | null;

  declare namespace Vi {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    interface JestAssertion<T = any> extends jest.Matchers<void, T>, TestingLibraryMatchers<T, void> {}
  }
}

export {};
