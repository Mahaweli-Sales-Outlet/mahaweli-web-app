import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ExportButtonProps {
  products: any[];
}

export default function ExportButton({ products }: ExportButtonProps) {
  const handleExportCSV = () => {
    // Convert products to CSV
    const headers = ["ID", "Name", "Brand", "Category", "Price", "Stock", "Status"];
    const csvData = products.map((p) => [
      p.id,
      p.name,
      p.brand || "",
      p.category || "",
      p.price,
      p.stock_quantity,
      p.in_stock ? "In Stock" : "Out of Stock",
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => 
        row.map((cell) => 
          typeof cell === "string" && cell.includes(",") 
            ? `"${cell}"` 
            : cell
        ).join(",")
      ),
    ].join("\n");

    // Download CSV
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `products_export_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      variant="outline"
      onClick={handleExportCSV}
      className="gap-2"
    >
      <Download className="w-4 h-4" />
      Export CSV
    </Button>
  );
}
