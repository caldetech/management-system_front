"use client";

import { getBlingTokens } from "@/http/get-bling-tokens";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

export default function BlingPage() {
  const [loading, setLoading] = useState(true);
  const params = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    async function handleBlingTokens() {
      if (code) {
        await getBlingTokens({ code });
      }
    }

    handleBlingTokens();
  }, [code]);

  return (
    <div className="abosolute top-1/2 left-1/2 flex h-screen w-screen items-center justify-center">
      {loading && (
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col">
            <h2 className="mt-6 text-3xl font-bold text-foreground">
              Por favor, aguarde
            </h2>

            <p className="mt-2 text-sm text-foreground">
              Estamos conectando sua conta ao Bling
            </p>
          </div>

          <BeatLoader />
        </div>
      )}
    </div>
  );
}
