"use client";
import React, { ReactNode, CSSProperties } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { useWriteContract } from "wagmi";
import { Check, Cross } from "lucide-react";
import BookMarketplace from "../config/BookMarketplaceAbi.json";
import { ARB_MARKETPLACE } from "@/config/constants";
import useCheckSubscription from "./useCheckSubscription";

export const DarkGradientPricing = () => {
  const { balance1, balance2, balance3 } = useCheckSubscription();

  const {
    writeContract,
    data,
    isPending,
    isPaused,
    isIdle,
    isSuccess,
    isError,
    error,
  } = useWriteContract();

  async function buyBasicPlan() {
    writeContract({
      abi: BookMarketplace,
      address: ARB_MARKETPLACE,
      functionName: "buyListToken",
      args: [0],
      value: 100n,
    });
  }

  async function buyMiddlePlan() {
    writeContract({
      abi: BookMarketplace,
      address: ARB_MARKETPLACE,
      functionName: "buyListToken",
      args: [1],
      value: 1000n,
    });
  }

  async function buyProPlan() {
    writeContract({
      abi: BookMarketplace,
      address: ARB_MARKETPLACE,
      functionName: "buyListToken",
      args: [2],
      value: 10000n,
    });
  }
  return (
    <section
      style={{
        backgroundImage:
          "radial-gradient(100% 100% at 50% 0%, rgba(13,13,17,1), rgba(9,9,11,1))",
      }}
      className="relative overflow-hidden bg-zinc-950 text-zinc-200 selection:bg-zinc-600"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 md:px-8">
        <div className="mb-12 space-y-3">
          <h2 className="text-center text-3xl font-semibold leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
            Pricing
          </h2>
          <p className="text-center text-base text-zinc-400 md:text-lg">
            Use it for free for yourself, upgrade when your team needs advanced
            control.
          </p>
          {/* <div>{balance1}</div>
          <div>{balance2}</div>
          <div>{balance3}</div>
          <p>Pending : {isPending ? "true" : "false"}</p>
          <p>Error : {isError ? error.message : "false"}</p> */}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <PriceCard
            tier="Basic"
            price="100 gwi arb"
            bestFor="Best for basic readers"
            CTA={
              <GhostButton
                onClick={buyBasicPlan}
                className="w-full bg-zinc-50 text-zinc-950 hover:bg-zinc-200 hover:text-zinc-900"
              >
                Buy Now
              </GhostButton>
            }
            benefits={[
              { text: "One workspace", checked: true },
              { text: "Email support", checked: true },
              { text: "1 day data retention", checked: false },
              { text: "Custom roles", checked: false },
              { text: "Priority support", checked: false },
              { text: "SSO", checked: false },
            ]}
          />
          <PriceCard
            tier="Pro"
            price="1000 gwi arb"
            bestFor="Best for daily readers"
            CTA={
              <GhostButton
                onClick={buyMiddlePlan}
                className="w-full bg-zinc-50 text-zinc-950 hover:bg-zinc-200 hover:text-zinc-900"
              >
                Buy Now
              </GhostButton>
            }
            benefits={[
              { text: "Five workspaces", checked: true },
              { text: "Email support", checked: true },
              { text: "7 day data retention", checked: true },
              { text: "Custom roles", checked: true },
              { text: "Priority support", checked: false },
              { text: "SSO", checked: false },
            ]}
          />
          <PriceCard
            tier="Enterprise"
            price="10000 gwi arb"
            bestFor="Best for enterprices readers"
            CTA={
              <GhostButton
                onClick={buyProPlan}
                className="w-full bg-zinc-50 text-zinc-950 hover:bg-zinc-200 hover:text-zinc-900"
              >
                Buy Now
              </GhostButton>
            }
            benefits={[
              { text: "Unlimited workspaces", checked: true },
              { text: "Email support", checked: true },
              { text: "30 day data retention", checked: true },
              { text: "Custom roles", checked: true },
              { text: "Priority support", checked: true },
              { text: "SSO", checked: true },
            ]}
          />
        </div>
      </div>
    </section>
  );
};

const PriceCard = ({ tier, price, bestFor, CTA, benefits }: PriceCardProps) => {
  return (
    <Card>
      <div className="flex flex-col items-center border-b border-zinc-700 pb-6">
        <span className="mb-6 inline-block text-zinc-50">{tier}</span>
        <span className="mb-3 inline-block text-4xl font-medium ">{price}</span>
        <span className="bg-gradient-to-br from-zinc-200 to-zinc-500 bg-clip-text text-center text-transparent">
          {bestFor}
        </span>
      </div>

      <div className="space-y-4 py-9">
        {benefits.map((b, i) => (
          <Benefit {...b} key={i} />
        ))}
      </div>

      {CTA}
    </Card>
  );
};

const Benefit = ({ text, checked }: BenefitType) => {
  return (
    <div className="flex items-center gap-3">
      {checked ? (
        <span className="grid size-5 place-content-center rounded-full bg-blue-600 text-sm text-zinc-50">
          <Check />
        </span>
      ) : (
        <span className="grid size-5 place-content-center rounded-full bg-zinc-800 text-sm text-zinc-400">
          <Cross />
        </span>
      )}
      <span className="text-sm text-zinc-300">{text}</span>
    </div>
  );
};

const Card = ({ className, children, style = {} }: CardProps) => {
  return (
    <motion.div
      initial={{
        filter: "blur(2px)",
      }}
      whileInView={{
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        delay: 0.25,
      }}
      style={style}
      className={twMerge(
        "relative h-full w-full overflow-hidden rounded-2xl border border-zinc-700 bg-gradient-to-br from-zinc-950/50 to-zinc-900/80 p-6",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

const GhostButton = ({ children, className, ...rest }: GhostButtonProps) => {
  return (
    <button
      className={twMerge(
        "rounded-md px-4 py-2 text-lg text-zinc-100 transition-all hover:scale-[1.02] hover:bg-zinc-800 hover:text-zinc-50 active:scale-[0.98]",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

type PriceCardProps = {
  tier: string;
  price: string;
  bestFor: string;
  CTA: ReactNode;
  benefits: BenefitType[];
};

type CardProps = {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
};

type BenefitType = {
  text: string;
  checked: boolean;
};

type GhostButtonProps = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
