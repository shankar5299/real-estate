import { Loader2 } from "lucide-react";
import React from 'react'

export const LoadingPage = () => {
    return (
        <div className="fixed inset-0 flex gap-2 items-center justify-center bg-background/50">
            <Loader2 className=" h-6 w-6 text-primary-700 animate-spin" />
            <span className="text-sm font-medium text-primary-700">Loading...</span>
        </div>
    )
}

