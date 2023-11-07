"use client";

import { Button } from "@/components/ui/button";
import { Teacher } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";

export const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "approved",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Approved
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isPublished = row.getValue("approved") || false;

      return (
        <Badge className={cn("bg-red-500 ", isPublished && "bg-emerald-700")}>
          {isPublished ? "Approved" : "Not Approved"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => {
      return <Button variant={"ghost"}>Action</Button>;
    },
    cell: ({ row }) => {
      const { id } = row.original;

      const isPublished = row.getValue("approved") || false;

      const handleApply = async () => {
        toast.promise(axios.patch("/api/teacher/" + id), {
          loading: "Approving Teacher",
          success: "Teacher Approved Successfully",
          error: "Something went wrong",
        });
        window.location.reload();
      };

      return (
        <Button
          onClick={handleApply}
          variant="outline"
          disabled={isPublished as boolean}
          size={"sm"}
        >
          Approve Now
        </Button>
      );
    },
  },
];
