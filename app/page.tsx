"use client";

import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

import Live from "@/components/Live";
import Navbar from "@/components/Navbar";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { handleCanvasMouseDown, handleResize } from "@/lib/canvas";
import { ActiveElement } from "@/types/type";

interface InitializeFabricProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  fabricRef: React.RefObject<fabric.Canvas | null>;
}

function initializeFabric({
  canvasRef,
  fabricRef,
}: InitializeFabricProps): fabric.Canvas {
  // Your implementation of initializeFabric function
  const canvas = new fabric.Canvas(canvasRef.current!); // Example, make sure to adjust as needed
  // ... other initialization logic
  return canvas;
}

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef(false);
  const shapeRef = useRef<fabric.Object | null>(null);
  const selectedShapeRef = useRef<string | null>(null);

  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: "",
    value: "",
    icon: "",
  });

  useEffect(() => {
    // initialize the fabric canvas
    const canvas = initializeFabric({
      canvasRef,
      fabricRef,
    });

    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        selectedShapeRef,
        isDrawing,
        shapeRef,
      });
    });

    window.addEventListener("resize", () => {
      handleResize({ fabricRef });
    });
  }, []);

  const handleActiveElement = (elem: ActiveElement) => {
    setActiveElement(elem);

    selectedShapeRef.current = elem?.value as string;
  };

  return (
    <main className="h-screen overflow-hidden">
      <Navbar
        activeElement={activeElement}
        handleActiveElement={handleActiveElement}
      />

      <section className="flex h-full flex-row">
        <LeftSidebar />
        <Live canvasRef={canvasRef} />
        <RightSidebar />
      </section>
    </main>
  );
}
