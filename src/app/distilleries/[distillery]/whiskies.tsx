import { SearchParamsType } from "@/app/distilleries/[distillery]/page";

interface WhiskiesProps extends SearchParamsType {
  distilleryId: number;
}

export default async function Whiskies({ distilleryId, q }: WhiskiesProps) {
  return (
    <></>
  );
}