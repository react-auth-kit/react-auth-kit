'use client'

import { useAuth } from "@auth-kit/next/useAuth"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return useAuth({ fallbackPath: '/login'}) && children;
  }