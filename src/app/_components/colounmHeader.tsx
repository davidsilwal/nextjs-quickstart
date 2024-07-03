import { Button } from "@/components/ui/button";
import { type Column } from "@tanstack/react-table";
import { ArrowUpDown, ArrowDownUp } from "lucide-react";


interface ColumnProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
}

export function ColumnHeader<TData, TValue>({ column, title }: Readonly<ColumnProps<TData, TValue>>) {
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {title}
            {(column.getIsSorted() === "asc") ? (<ArrowUpDown className="ml-2 h-4 w-4" />) : (<ArrowDownUp className="ml-2 h-4 w-4" />)}
        </Button>
    )
}