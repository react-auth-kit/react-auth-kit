'use client';

import NextAuth from '@auth-kit/next';
import {ReactNode} from "react";

export default function DashboardLayout({
  children,
}: {
    children: ReactNode
  }) {
  return <NextAuth>{children}</NextAuth>;
}
