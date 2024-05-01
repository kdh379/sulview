"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RouterRewriteProps {
  whiskyId: number;
  whiskyName: string;
}

export default function RouterRewrite({ whiskyId, whiskyName}: RouterRewriteProps) {

  const router = useRouter();

  useEffect(() => {
    router.replace(`/whiskies/${whiskyId}/${encodeURIComponent(whiskyName)}`);
  }, [router, whiskyId, whiskyName]);

  return (
    <></>
  );
}