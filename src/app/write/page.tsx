import { Metadata } from "next";

import WritePage from "@/components/pages/WritePage";

export const metadata: Metadata = {
  title: "리뷰 작성",
};

const Write = () => <WritePage />;

export default Write;