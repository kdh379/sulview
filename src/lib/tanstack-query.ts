import { QueryClient, isServer } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR(서버사이드 렌더링)에서는 기본 staleTime을
        // 0보다 높게 설정하여 클라이언트에서 즉시 재요청하는 것을 방지합니다.
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // 서버: 항상 새로운 쿼리 클라이언트를 생성합니다
    return makeQueryClient();
  } else {
    // 브라우저: 이미 query client가 없으면 새로 만듭니다.
    // 이는 React가 초기 렌더링 중에 suspend될 경우 새로운 client를 다시 만드는 것을 방지하기 위해 매우 중요합니다.
    // query client 생성 아래에 suspense 경계가 있는 경우 필요하지 않을 수 있습니다.
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}