'use client'

import { useAuth } from "@auth-kit/next/useAuth"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    if(useAuth({ fallbackPath: '/login'})){
        return <section>{children}</section>
    }
  }