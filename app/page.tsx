"use client";
import { Caveat_Brush, Patrick_Hand } from "next/font/google";
import { motion } from "framer-motion";
import WizardSurvey from "./icons/WizardSurvey";
import Link from "next/link";

const caveatBrush = Caveat_Brush({ subsets: ["latin"], weight: "400", variable: "--font-caveat-brush", display: "fallback" });
const patrickHand = Patrick_Hand({ subsets: ["latin"], weight: "400", variable: "--font-patrick-hand", display: "fallback" });

export default function Home() {
  return (<motion.main
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1, duration: 0.7 }}
    className={`h-screen flex flex-col items-center justify-center gap-y-6`}
  >
    <section className="flex flex-col md:flex-row gap-x-3 items-center justify-center">
      <WizardSurvey width="200" height="200" color="#3e4782" />
      <h1 className={`${patrickHand.className} text-5xl md:text-7xl lg:text-8xl 2xl:text-9xl text-[#3e4782] main-title`}>WIZARD SURVEY</h1>
    </section>
    <section className="flex flex-col md:flex-row justify-center gap-x-10 gap-y-4 flex-wrap w-1/2 xl:w-1/3 2xl:w-1/5">
      <Link className="btn-primary" href="/create-survey">Create Manually</Link>
      <Link className="btn-gradient" href="/generate-with-ai">Generate with AI</Link>
      <Link className="btn-primary flex justify-center gap-x-2" href="https://github.com/visrut-at-incubyte/thinkless.tech" target="_blank">
        <img src="/github-mark.svg" width={20} height={30} alt="" />
        <span>Source Code</span>
      </Link>
    </section>
  </motion.main >);
}
