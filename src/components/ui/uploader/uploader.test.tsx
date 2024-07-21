import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, act } from "@testing-library/react";
import * as React from "react";

import { Uploader } from "@/components/ui/uploader";
import { toast } from "@/components/ui/use-toast";

vi.mock("@/components/ui/use-toast", () => ({
  toast: vi.fn(),
}));

vi.mock("@/lib/upload", () => ({
  convertURLtoImage: vi.fn(() => Promise.resolve({ preview: "/mocked-url.jpg" })),
  createPreviewMedia: vi.fn((file) => ({ ...file, preview: "/mocked-preview.jpg" })),
}));

describe("Uploader", () => {
  it("사진 드래그 앤 드롭", async () => {
    const onChange = vi.fn();
    render(<Uploader onChange={onChange} />);

    // Mock file
    const file = new File(["test"], "test.png", { type: "image/png" });

    // Mock 드래그 앤 드롭 이벤트
    const dropzone = screen.getByTestId("dropzone");
    const mockEvent = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
      type: "drop",
      dataTransfer: {
        files: [file],
        items: [
          {
            kind: "file",
            type: file.type,
            getAsFile: () => file,
          },
        ],
        types: ["Files"],
      },
    };

    await act(async () => {
      fireEvent.drop(dropzone, mockEvent);
    });

    expect(onChange).toHaveBeenCalled();
    const onChangeArg = onChange.mock.calls[0][0];
    expect(Array.isArray(onChangeArg)).toBe(true);
    expect(onChangeArg.length).toBe(1);
    expect(onChangeArg[0]).toEqual(expect.objectContaining({
      path: "test.png",
      preview: "/mocked-preview.jpg",
    }));
  });

  it("최대 파일 개수 초과", async () => {
    const onChange = vi.fn();
    render(<Uploader onChange={onChange} />);

    const dropzone = screen.getByTestId("dropzone");

    // 6개의 파일을 생성 (최대 허용 개수인 5개를 초과)
    const files = Array.from({ length: 6 }, (_, i) =>
      new File(["test"], `test${i+1}.png`, { type: "image/png" })
    );

    const mockEvent = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
      type: "drop",
      dataTransfer: {
        files: files,
        items: files.map((file) => ({
          kind: "file",
          type: file.type,
          getAsFile: () => file,
        })),
        types: ["Files"],
      },
    };

    await act(async () => {
      fireEvent.drop(dropzone, mockEvent);
    });

    // toast 함수가 에러 메시지와 함께 호출되었는지 확인
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      variant: "destructive",
      title: "파일을 가져오는 중 오류가 발생했습니다.",
      description: expect.stringContaining("최대 5개의 파일까지 업로드할 수 있습니다."),
    }));

    // onChange 함수가 호출되지 않았는지 확인
    expect(onChange).not.toHaveBeenCalled();

    // 파일이 추가되지 않았는지 확인
    const renderedFiles = screen.queryAllByTestId(/^file-/);
    expect(renderedFiles.length).toBe(0);
  });
});