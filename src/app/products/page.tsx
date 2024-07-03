'use client';

import { ProductsResponse } from "@/domain/product/model";
import { fetchProducts } from "@/domain/product/service";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns"
import { DataTable } from "./data-table"

interface DemoPageProp {
    searchParams: { [key: string]: string }
}

export default function DemoPage({ searchParams }: DemoPageProp) {
    if (Object.keys(searchParams).length === 0) {
        searchParams['skip'] = '0';
        searchParams['limit'] = '20';
    }
    const searchStr = Object.keys(searchParams).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`).join('&');

    const { data, error, isLoading } = useQuery<ProductsResponse>({ queryKey: ['fetchProducts'], queryFn: () => fetchProducts(searchStr) });

    const products = data?.products ?? [];
    const total = data?.total ?? 0;

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={products} total={total} />
        </div>
    )
}