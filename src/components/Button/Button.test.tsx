// 引入测试库函数，用来 mocking
import { render, fireEvent, screen } from "@testing-library/react";
// 引入测试 api ，用来编写用例的逻辑
import { describe, it, expect, vi } from "vitest";
// 引入被测试组件
import { Button } from ".";

describe("Button", () => {
  it("test button content", () => {
    const button = render(<Button>test</Button>);

    console.log(screen.getByText("test"));

    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("test button click event", () => {
    // 模拟一个函数
    const handleCallback = vi.fn();

    // 通过 render 来渲染 Button 组件到 jsdom 中
    const button = render(<Button onClick={handleCallback}></Button>);

    // 组件被渲染之后，通过 getByRole 查询到组件的 dom 节点
    const element = button.getByRole("button");

    // fireEvent 用来模拟触发 click 点击
    fireEvent.click(element);

    // expect 就是期望，toHaveBeenCalled 是一个断言，表示函数被执行
    expect(handleCallback).toHaveBeenCalled();
  });

  // Button 的尺寸
  const defineSize = [
    { size: "lg", expected: "h-lg" },
    { size: "md", expected: "h-md" },
    { size: "sm", expected: "h-sm" },
  ];

  describe.each(defineSize)("test the size of button", ({ size, expected }) => {
    it(`${size} size button`, () => {
      const button = render(<Button size={size as any}>{expected}</Button>);
      const element = button.getByRole("button");
      expect(element.classList.contains(expected)).toBeTruthy();
    });
  });

  it.each(defineSize)(`test the size of button`, ({ size, expected }) => {
    const button = render(<Button size={size as any}>{expected}</Button>);
    const element = button.getByRole("button");
    expect(element.classList.contains(expected)).toBeTruthy();
  });
});
