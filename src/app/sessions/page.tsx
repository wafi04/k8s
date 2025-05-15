"use client";
import { Wrapper } from "@/components/layouts/Wrapper";
import { JUPYTER_URL } from "@/constants";

export default function page() {
  return (
    <Wrapper>
      <div className="h-screen w-full">
        <iframe
          src={JUPYTER_URL}
          title="JupyterLab"
          className="w-full h-full border-0"
        />
      </div>
    </Wrapper>
  );
}
