import { Sparkles } from "lucide-react";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
import Image from "next/image";
export function SignInLeftPanel() {
  return (
    <div className="relative hidden h-full flex-col bg-navy p-10 text-white lg:flex">
      <div className="flex items-center gap-2">
        <Link href="/"><ArrowBigLeft className="h-6 transition-all duration-300 hover:fill-primary text-card hover:text-primary fill-white w-6 font-bold" /></Link>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>``
        <span className="text-xl md:text-3xl font-bold">
          <span className="font-display text-card">Brain<span className="text-primary">Spark</span></span>
        </span>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center">
        <div className="relative">
          <Image src={"/mascot/wave_mascot.svg"} alt="wave mascot" width={300} height={300} className=""></Image>
          <div className="absolute left-0 top-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg">
            ⭐
          </div>
          <div className="absolute right-6 top-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl">
            🏆
          </div>
          <div className="absolute left-2 top-52 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg">
            🎮
          </div>

          <div className="absolute left-32 top-0">
            <div className="relative rounded-2xl bg-white px-4 py-2 shadow-md">
              <span className="text-sm font-bold text-navy">Welcome back! 👋</span>
              <div className="absolute -bottom-2 left-6 h-0 w-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl bg-white/10 p-4">
          <div className="flex gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-cta">
              <span className="text-xs font-bold text-navy">?</span>
            </div>
            <div>
              <p className="text-sm font-bold text-yellow-cta">Did you know?</p>
              <p className="mt-1 text-xs text-white/70">
                The brain can process images that the eye sees for as little as 13 milliseconds! That&apos;s faster than a blink.
              </p>
            </div>
          </div>
        </div>
        {/* <Link
          href="/auth/sign-up"
          className="block text-center text-sm font-semibold text-accent hover:text-accent/80"
        >
          New here? Create Account
        </Link> */}
      </div>
    </div>
  );
}
