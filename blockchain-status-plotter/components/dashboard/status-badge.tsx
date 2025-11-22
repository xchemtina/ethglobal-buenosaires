import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "Confirmed" | "Pending" | "Failed"
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        status === "Confirmed" && "bg-green-500/10 text-green-400 border-green-500/20",
        status === "Pending" && "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        status === "Failed" && "bg-red-500/10 text-red-400 border-red-500/20",
      )}
    >
      <span
        className={cn(
          "mr-1.5 h-1.5 w-1.5 rounded-full",
          status === "Confirmed" && "bg-green-400 animate-pulse",
          status === "Pending" && "bg-yellow-400",
          status === "Failed" && "bg-red-400",
        )}
      />
      {status}
    </div>
  )
}
