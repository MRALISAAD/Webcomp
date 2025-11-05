import clsx from "clsx";
import { motion } from "framer-motion";
import Container from "../Container";
import { sectionVariants } from "../../utils/animations.js";

export default function PackComparison({ data, isRTL }) {
  if (!data) return null;

  const renderCell = (cell) => {
    if (cell === "✓") {
      return (
        <span className="font-semibold text-secondary" aria-label="Included">
          ✓
        </span>
      );
    }
    if (cell === "—") {
      return (
        <span className="text-slate-400 dark:text-slate-500" aria-label="Not available">
          —
        </span>
      );
    }
    return cell;
  };

  return (
    <motion.section
      id="packs-comparison"
      aria-label={data.title}
      className="bg-white py-20 dark:bg-slate-950 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <Container>
        <h2 className={clsx("text-2xl font-semibold text-primary", isRTL && "text-right")}>{data.title}</h2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-beige bg-beige/70 shadow-md dark:border-slate-800 dark:bg-slate-900">
          <table className="min-w-full border-collapse text-center text-sm" dir={isRTL ? "rtl" : "ltr"}>
            <thead className="bg-beige text-grayText dark:bg-slate-900/70 dark:text-slate-200">
              <tr>
                {data.headers?.map((header) => (
                  <th key={header} className="px-4 py-3 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows?.map((row, rowIndex) => (
                <tr key={`${row[0]}-${rowIndex}`} className="border-t border-white/40 dark:border-slate-800/80">
                  {row.map((cell, cellIndex) => (
                    <td key={`${rowIndex}-${cellIndex}`} className="px-4 py-4 text-gray-800 dark:text-slate-100">
                      {renderCell(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </motion.section>
  );
}
