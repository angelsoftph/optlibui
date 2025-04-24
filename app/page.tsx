"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/shared/header";
import Image from "next/image";

const HomePage: React.FC = () => {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const loadFluidSimulation = async () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const fluidOptions = {
          TRIGGER: "hover",
          IMMEDIATE: false,
          SPLAT_RADIUS: 0.2,
          BLOOM: false,
          SUNRAYS: false,
          COLORFUL: true,
          CUSTOM_COLOR: false,
          COLOR: "#e6b2be",
          TEXTURE: "/dithering_texture.webp",
        };

        const options = {
          canvas: canvas,
          eventsContainer: canvas.parentElement?.parentElement,
          fluidOptions: fluidOptions,
        };

        try {
          const { UeWebglFluid } = await import(
            "@/assets/js/ue_webgl_fluid.js"
          );
          new UeWebglFluid(options);
        } catch (error) {
          console.log("Unable to load UeWebglFluid", error);
        }
      }
    };

    loadFluidSimulation();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("optlib_auth_token");

    if (token) {
      router.push("/home");
    }
  }, [router]);

  return (
    <div className="flex flex-col h-screen">
      <Header isLoggedIn={false} />
      <main className="flex flex-col h-screen bg-gradient-to-r from-slate-500 to-slate-800 items-center justify-center">
        <div className="flex flex-col h-screen w-full p-5 items-center justify-center relative overflow-hidden">
          <div data-forid="e5a20e0" data-location="back">
            <canvas
              className="absolute inset-0 w-full h-full"
              ref={canvasRef}
            />
          </div>
          <h1 className="text-xl text-white font-semibold">
            Welcome to Optumus Galactic Library Management System
          </h1>
          <Image
            src="/logo.png"
            height={300}
            width={300}
            alt="Optumus Galactic Library Management System"
            priority
          />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
