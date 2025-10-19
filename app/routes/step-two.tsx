import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Seguro Salud Flexible - Resumen" },
    { name: "description", content: "Seguro Salud Flexible - Resumen" },
  ];
}

export default function StepTwo() {
  return <div>Step Two</div>;
}