import { useEffect } from "react";

export default function AulaColorProvider({ color }) {
  useEffect(() => {
    document.documentElement.style.setProperty("--class-accent-color-rgb", color);

    // Si quieres restaurar el valor anterior al salir del aula:
    return () => {
      document.documentElement.style.removeProperty("--class-accent-color-rgb");
    };
  }, [color]);

  return null; // No renderiza nada
}
