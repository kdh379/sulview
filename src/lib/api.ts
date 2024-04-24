import { distillery } from "@/db/schema";

type HttpReqRes<T_Req, T_Res> = {
  res: T_Res;
  req?: T_Req;
};

type APIInfo = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
}

type APIInterface = {
  "create-distillery": HttpReqRes<{}, {}>;
  "distilleries": HttpReqRes<{}, typeof distillery.$inferSelect[]>;
}

type ErrorRes = {
  status: number;
  message: string;
}

const URLDict: Record<keyof APIInterface, APIInfo> = {
  "create-distillery": {
    url: "/api/distillery",
    method: "POST",
  },
  "distilleries": {
    url: "/api/distillery",
    method: "GET",
  },
};

export default async function api<T extends keyof APIInterface>(
  key: T,
  req?: APIInterface[T]["req"]
): Promise<APIInterface[T]["res"]> {
  const { url, method } = URLDict[key];

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: req && method !== "GET" ? JSON.stringify(req) : undefined,
  });

  if (!response.ok) {
    const errorRes: ErrorRes = await response.json();
    const message = "message" in errorRes ? errorRes.message : response.statusText;
    
    throw {
      message,
      status: response.status,
    };
    
  }

  return response.json();
}

export function getReactQueryArgs<T extends keyof APIInterface>(
  key: T,
  req: APIInterface[T]["req"]
): [string, () => Promise<APIInterface[T]["res"]>] {
  return [
    key,
    () => api(key, req),
  ];
}

