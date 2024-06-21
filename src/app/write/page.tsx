import { Metadata } from "next";

import WritePage from "@/components/write/write-page";

export const metadata: Metadata = {
  title: "노트쓰기",
};

function Write() {
  return (
    <WritePage />
  );
}

export default Write;