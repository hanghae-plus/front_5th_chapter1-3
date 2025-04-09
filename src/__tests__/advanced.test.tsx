import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import * as utils from "../utils";

const renderLogMock = vi.spyOn(utils, "renderLog");
const generateItemsSpy = vi.spyOn(utils, "generateItems");

describe("최적화된 App 컴포넌트 테스트", () => {
  beforeEach(() => {
    renderLogMock.mockClear();
    generateItemsSpy.mockClear();
  });

  it("초기 렌더링 시 모든 컴포넌트가 한 번씩 렌더링되어야 한다", () => {
    render(<App />);
    expect(renderLogMock).toHaveBeenCalledWith("Header rendered");
    expect(renderLogMock).toHaveBeenCalledWith("ItemList rendered");
    expect(renderLogMock).toHaveBeenCalledWith("ComplexForm rendered");
    expect(renderLogMock).toHaveBeenCalledWith("NotificationSystem rendered");
    expect(renderLogMock).toHaveBeenCalledTimes(4);
  });

  it("테마 변경 시 Header, ItemList만 리렌더링되어야 한다", async () => {
    render(<App />);
    renderLogMock.mockClear();

    const themeButton = await screen.findByText(/다크 모드|라이트 모드/);
    await fireEvent.click(themeButton);

    expect(renderLogMock).toHaveBeenCalledWith("Header rendered");
    expect(renderLogMock).toHaveBeenCalledWith("ItemList rendered");
    expect(renderLogMock).toHaveBeenCalledTimes(2);
  });

  it("로그인/로그아웃 시 Header, ComplexForm, NotificationSystem만 리렌더링되어야 한다", async () => {
    render(<App />);
    renderLogMock.mockClear();

    const loginButton = await screen.findByText("로그인");
    await fireEvent.click(loginButton);

    // Header가 변경 되면 알림이 발생하고, 알림 정보를 CompleteForm과 NotificationSystem이 가져다 사용 중
    expect(renderLogMock).toHaveBeenCalledWith("Header rendered");
    expect(renderLogMock).toHaveBeenCalledWith("ComplexForm rendered");
    expect(renderLogMock).toHaveBeenCalledWith("NotificationSystem rendered");
    expect(renderLogMock).toHaveBeenCalledTimes(3);
    renderLogMock.mockClear();

    const logoutButton = await screen.findByText("로그아웃");
    await fireEvent.click(logoutButton);

    expect(renderLogMock).toHaveBeenCalledWith("Header rendered");
    expect(renderLogMock).toHaveBeenCalledWith("ComplexForm rendered");
    expect(renderLogMock).toHaveBeenCalledWith("NotificationSystem rendered");
    expect(renderLogMock).toHaveBeenCalledTimes(3);
  });

  it("아이템 검색 시 ItemList만 리렌더링되어야 한다", async () => {
    render(<App />);
    renderLogMock.mockClear();

    const searchInput = await screen.findByPlaceholderText("상품 검색...");
    await fireEvent.change(searchInput, { target: { value: "검색어" } });

    expect(renderLogMock).toHaveBeenCalledWith("ItemList rendered");
    expect(renderLogMock).toHaveBeenCalledTimes(1);
  });

  it("폼 입력 시 ComplexForm만 리렌더링되어야 한다", async () => {
    render(<App />);
    renderLogMock.mockClear();

    const nameInput = await screen.findByPlaceholderText("이름");
    await fireEvent.change(nameInput, { target: { value: "홍길동" } });

    expect(renderLogMock).toHaveBeenCalledWith("ComplexForm rendered");
    expect(renderLogMock).toHaveBeenCalledTimes(1);
  });

  it("알림 추가 및 닫기시 ComplexForm, NotificationSystem만 리렌더링되어야 한다", async () => {
    render(<App />);
    renderLogMock.mockClear();

    const submitButton = await screen.findByText("제출");
    await fireEvent.click(submitButton);

    expect(renderLogMock).toHaveBeenCalledWith("NotificationSystem rendered");
    expect(renderLogMock).toHaveBeenCalledWith("ComplexForm rendered");
    expect(renderLogMock).toHaveBeenCalledTimes(2);
    renderLogMock.mockClear();

    // 알림 닫기 버튼 찾기 및 클릭
    const closeButton = await screen.findByText("닫기");
    await fireEvent.click(closeButton);

    expect(renderLogMock).toHaveBeenCalledWith("NotificationSystem rendered");
    expect(renderLogMock).toHaveBeenCalledWith("ComplexForm rendered");
    expect(renderLogMock).toHaveBeenCalledTimes(2);
  });

  it("여러 작업을 연속으로 수행해도 각 컴포넌트는 필요한 경우에만 리렌더링되어야 한다", async () => {
    render(<App />);
    renderLogMock.mockClear();

    // 테마 변경
    const themeButton = await screen.findByText(/다크 모드|라이트 모드/);
    await fireEvent.click(themeButton);
    expect(renderLogMock).toHaveBeenCalledWith("Header rendered");
    expect(renderLogMock).toHaveBeenCalledWith("ItemList rendered");
    expect(renderLogMock).toHaveBeenCalledTimes(2);
    renderLogMock.mockClear();

    // 로그인
    const loginButton = await screen.findByText("로그인");
    await fireEvent.click(loginButton);
    expect(renderLogMock).toHaveBeenCalledWith("Header rendered");
    expect(renderLogMock).toHaveBeenCalledWith("ComplexForm rendered");
    expect(renderLogMock).toHaveBeenCalledWith("NotificationSystem rendered");
    expect(renderLogMock).toHaveBeenCalledTimes(3);
    renderLogMock.mockClear();

    // 알림 닫기 버튼 찾기 및 클릭
    await fireEvent.click(await screen.findByText("닫기"));
    expect(renderLogMock).toHaveBeenCalledWith("NotificationSystem rendered");
    expect(renderLogMock).toHaveBeenCalledWith("ComplexForm rendered");
    expect(renderLogMock).toHaveBeenCalledTimes(2);
    renderLogMock.mockClear();

    // 아이템 검색
    const searchInput = await screen.findByPlaceholderText("상품 검색...");
    await userEvent.type(searchInput, "검색어입력");
    expect(renderLogMock).toHaveBeenCalledWith("ItemList rendered");
    expect(renderLogMock).toHaveBeenCalledTimes(5);
    renderLogMock.mockClear();

    // 폼 입력
    const nameInput = await screen.findByPlaceholderText("이름");
    await userEvent.type(nameInput, "홍길동");
    expect(renderLogMock).toHaveBeenCalledWith("ComplexForm rendered");
    expect(renderLogMock).toHaveBeenCalledTimes(3);
    renderLogMock.mockClear();

    // 폼 제출
    const submitButton = await screen.findByText("제출");
    await fireEvent.click(submitButton);
    expect(renderLogMock).toHaveBeenCalledWith("ComplexForm rendered");
    expect(renderLogMock).toHaveBeenCalledWith("NotificationSystem rendered");
    expect(renderLogMock).toHaveBeenCalledTimes(2);
    renderLogMock.mockClear();

    // 알림 닫기 버튼 찾기 및 클릭
    await fireEvent.click(await screen.findByText("닫기"));
    expect(renderLogMock).toHaveBeenCalledWith("NotificationSystem rendered");
    expect(renderLogMock).toHaveBeenCalledWith("ComplexForm rendered");
    expect(renderLogMock).toHaveBeenCalledTimes(2);

    expect(generateItemsSpy).toHaveBeenCalledTimes(1);
  });
});
