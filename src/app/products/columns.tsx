"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ColumnHeader } from "../_components/colounmHeader"

import { Product } from '@/domain/product/model';

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <ColumnHeader column={column} title="Title" />
            )
        },
        footer: "Title"
    },
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <ColumnHeader column={column} title="Description" />
            )
        }, footer: "Description",
    }
]