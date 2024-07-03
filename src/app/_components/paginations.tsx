// "use client"
// import {
//     Pagination,
//     PaginationContent,
//     PaginationEllipsis,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious,
// } from "@/components/ui/pagination";
// import React from "react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// interface paginationProps {
//     count: number
// }

// export function PaginationTemplate({ count = 100 }: paginationProps) {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const search = Object.fromEntries(searchParams)
//     const pathname = usePathname();
//     const pageSize = 20;
//     const numPages = Math.ceil(count / pageSize);
//     const pagination = [];
//     for (let i = 0; i < numPages; i++) {
//         pagination.push({
//             page: i + 1,
//             limit: pageSize,
//             skip: ((((i + 1)) * pageSize) - pageSize) > 0 ? (((i + 1) * pageSize) - pageSize) : 0,
//         });
//     }

//     return (
//         <Pagination>
//             <PaginationContent>
//                 <PaginationItem>
//                     <PaginationPrevious className="cursor-pointer" onClick={() => {
//                         if (Number(search.skip) > 0) {
//                             router.push(`${pathname}?skip=${Number(search.skip) - pageSize}&limit=${search.limit}`)
//                         }
//                     }} />
//                 </PaginationItem>
//                 {pagination.map((itm) => {
//                     // if (itm.page === 3) {
//                     //   return(
//                     //     <PaginationItem>
//                     //       <PaginationEllipsis />
//                     //     </PaginationItem>
//                     //   )
//                     // }

//                     // if(itm.page >= 4) {
//                     //   return(<></>)
//                     // }

//                     return (
//                         <PaginationItem key={itm.page}>
//                             <PaginationLink className="cursor-pointer" onClick={() => router.push(`${pathname}?skip=${itm.skip}&limit=${itm.limit}`)}>{itm.page}</PaginationLink>
//                         </PaginationItem>
//                     )
//                 })}
//                 <PaginationItem>
//                     <PaginationNext className="cursor-pointer" onClick={() => {
//                         if (Number(search.skip) < (count - pageSize)) {
//                             router.push(`${pathname}?skip=${Number(search.skip) + pageSize}&limit=${search.limit}`)
//                         }
//                     }} />
//                 </PaginationItem>
//             </PaginationContent>
//         </Pagination>
//     )
// }


import {
    FiChevronDown,
    FiChevronLeft,
    FiChevronRight,
    FiChevronsLeft,
    FiChevronsRight,
    FiChevronUp,
} from "react-icons/fi";
import { Table } from "@tanstack/react-table";

import { Button } from "../../components/ui/button";

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
}

export function DataTablePagination<TData>({
    table,
}: Readonly<DataTablePaginationProps<TData>>) {
    return (
        <>
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>

            <div className="flex items-center space-x-6 lg:space-x-8 text-muted-foreground">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <p>{`${table.getState().pagination.pageSize}`}</p>
                    <div className="flex-col">
                        {/* Stop rows per page count if there is no more data */}
                        <FiChevronUp
                            onClick={
                                !table.getCanNextPage()
                                    ? undefined
                                    : () => {
                                        table.getState().pagination.pageSize <= 1
                                            ? table.setPageSize(5)
                                            : table.setPageSize(
                                                table.getState().pagination.pageSize + 5
                                            );
                                    }
                            }
                        ></FiChevronUp>
                        <FiChevronDown
                            onClick={() => {
                                table.setPageSize(table.getState().pagination.pageSize - 5);
                            }}
                        ></FiChevronDown>
                    </div>
                    { }
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to first page</span>
                        <FiChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <FiChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        <FiChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to last page</span>
                        <FiChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </>
    );
}