import classNames from "classnames";

export type StockLevel = "IN_STOCK" | "OUT_OF_STOCK" | "LOW_STOCK";

interface StockLevelLabelProps {
  stockLevel: string | undefined;
}

export function StockLevelLabel({ stockLevel }: StockLevelLabelProps) {
  let stockLevelLabel = "";
  let textStyle = "text-gray-800";
  switch (stockLevel as StockLevel) {
    case "IN_STOCK":
      stockLevelLabel = "Em estoque";
      textStyle = "text-green";
      break;
    case "OUT_OF_STOCK":
      stockLevelLabel = "Fora de estoque";
      textStyle = "text-secondary";
      break;
    case "LOW_STOCK":
      stockLevelLabel = "Últimas unidades";
      textStyle = "text-gray-600";
      break;
  }
  return (
    <span className={classNames("font-medium", textStyle)}>
      {stockLevelLabel}
    </span>
  );
}
