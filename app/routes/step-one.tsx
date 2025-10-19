import { useUser } from "~/context";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Seguro Salud Flexible - Planes y coberturas" },
    { name: "description", content: "Seguro Salud Flexible - Planes y coberturas" },
  ];
}

export default function StepOne() {
  const { userData } = useUser();
  return <div>Step One</div>;
}
