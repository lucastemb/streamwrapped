import Image from "next/image";
import localFont from "next/font/local";
import Task from "../components/task";
import { useState, useEffect } from "react";
import axios from "axios";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

interface DashboardProps {
  email: string
  steamId: string
  steamUrl: string
}
export default function Dashboard({email, steamId, steamUrl}: DashboardProps) {
  return (
    <>
      <div className="bg-slate-700 min-h-screen text-white p-4">
        {/* Title */}
        <div className="flex flex-col items-center mb-8">
          <Image 
            src="/images/Steam_icon_logo.png"
            alt="Steam Logo"
            width={70}
            height={70}
            className="mb-4"
          />
          <h1 className="text-3xl font-bold">Steam Wrapped</h1>
        </div>
        <Task steamId={steamId} steamUrl={steamUrl}/>
        <Task steamId={steamId} steamUrl={steamUrl}/>
      </div>
    </>
  );
}
