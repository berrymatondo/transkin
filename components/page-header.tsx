"use client";

import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

type PageHeaderProps = {
  title: string;
  onSubmit?: () => void;
};
const PageHeader = ({ title, onSubmit }: PageHeaderProps) => {
  const router = useRouter();
  return (
    <header className="flex items-center justify-between pr-4 py-6 animate-slide-down w-full">
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/10"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      <h1 className=" text-xl font-bold text-white">{title}</h1>
      {onSubmit ? (
        <Button
          variant="ghost"
          size="icon"
          className="text-yellow-400 hover:bg-yellow-400/10 border border-yellow-400/30 rounded-full"
          onClick={onSubmit}
        >
          <Plus className="h-6 w-6" />
        </Button>
      ) : (
        <div className="w-10" />
      )}
    </header>
  );
};

export default PageHeader;
