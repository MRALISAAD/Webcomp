declare module "../components/ComparisonTable.jsx" {
  interface ComparisonTableRow {
    label: string;
    values: Array<boolean | string | number>;
  }
  interface Props {
    columns: string[];
    rows: ComparisonTableRow[];
  }
  const ComparisonTable: (props: Props) => JSX.Element | null;
  export default ComparisonTable;
}


