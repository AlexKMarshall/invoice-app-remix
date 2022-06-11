import type { ClassValue } from "clsx";
import clsx from "clsx";

type Status = "pending" | "paid" | "draft";

const statusClassNameMap: Record<Status, ClassValue> = {
  paid: "text-emerald-400 bg-emerald-400/5 before:bg-emerald-400",
  pending: "text-amber-500 bg-amber-500/5 before:bg-amber-500",
  draft: "text-zinc-700 bg-zinc-700/5 before:bg-zinc-700",
};

type Props = { status: Status };
export function StatusBadge({ status }: Props): JSX.Element {
  return (
    <p
      className={clsx(
        "inline-flex items-baseline justify-center gap-2 rounded px-4 py-3 font-bold capitalize",
        "min-w-[9em]", // hack until sub-grid
        "before:aspect-square before:w-2 before:rounded-full",
        statusClassNameMap[status]
      )}
    >
      {status}
    </p>
  );
}
