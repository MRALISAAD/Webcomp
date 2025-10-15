import { cn } from "../../lib/utils";

const Table = ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="relative w-full overflow-x-auto">
    <table
      className={cn(
        "w-full border-collapse rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900",
        className
      )}
      {...props}
    />
  </div>
);

const TableHeader = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn("bg-zinc-50/80 dark:bg-zinc-800/50", className)} {...props} />
);

const TableBody = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn("", className)} {...props} />
);

const TableRow = ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={cn(
      "border-b border-zinc-100 last:border-none hover:bg-zinc-50/50 dark:border-zinc-800 dark:hover:bg-zinc-800/50",
      className
    )}
    {...props}
  />
);

const TableHead = ({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={cn("px-4 py-3 text-left text-sm font-semibold text-zinc-700 dark:text-zinc-200", className)}
    {...props}
  />
);

const TableCell = ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn("px-4 py-3 text-sm text-zinc-600 dark:text-zinc-300", className)} {...props} />
);

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
