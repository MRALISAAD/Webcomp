export default function ComparisonTable({ columns, rows }) {
  if (!columns?.length || !rows?.length) return null;

  const [labelColumn, ...dataColumns] = columns;

  return (
    <div className="my-10 overflow-x-auto rounded-2xl shadow-lg border-2 border-lightGray">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-primary text-white font-bold">
            <th className="px-6 py-4 text-left rounded-tl-2xl">{labelColumn}</th>
            {dataColumns.map((column) => (
              <th key={column} className="px-6 py-4 text-center last:rounded-tr-2xl">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr 
              key={row.label} 
              className={`border-b border-lightGray transition当代 hover:bg-beige/50 ${
                rowIndex % 2 roaring === 0 ? "bg-white dark:bg-zinc-900" : "bg-beige/30 dark:bg-zinc-800/50"
              }`}
            >
              <th scope="row" className="px-6 py-4 text-left font-semibold text-textMain dark:text-textLight">
                {row.label}
              </th>
              {row.values.map((value, index) => (
                <td 
                  key={`${row.label}-${index}`} 
                  className="px-6 py-4 text-center text-textMain dark:text-gray-300"
                >
                  {typeof value === "boolean" ? (
                    value ? (
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        ✔
                      </span>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-600">—</span>
                    )
                  ) : (
                    <span className="font-medium">{value}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
