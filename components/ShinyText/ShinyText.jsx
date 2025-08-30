import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import AnimatedShinyText from "../ui/animated-shiny-text";

export const ShinyText = () => {
  return (
    <div className="z-10 flex items-center justify-center">
      <div
        className={cn(
          "group rounded-full border border-black/5 bg-neutral-100 text-base transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        )}
      >
        <div className="inline-flex items-center justify-center px-4 py-1">
          <AnimatedShinyText>
            ✨ Introducing UnchainedGPT
          </AnimatedShinyText>
          <ArrowRightIcon className="ml-2 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );
};

export default ShinyText;