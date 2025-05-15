import { HeaderPods } from "./_components/header";
import { Pods } from "./_components/pods";

export default function page() {
  return (
    <>
      <HeaderPods
        text="Application"
        textClassName="font-semibold text-4xl"
        className="border-b-3 border-black p-3 w-full"
      />
      <Pods />
    </>
  );
}
