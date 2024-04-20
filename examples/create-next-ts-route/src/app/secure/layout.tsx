'use client';

import NextAuth from '@auth-kit/next';

export default function DashboardLayout({
  children,
}: {
    children: React.ReactNode
  }) {
  return <NextAuth>{children}</NextAuth>;
}
