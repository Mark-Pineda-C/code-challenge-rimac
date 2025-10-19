import { useUser } from "~/context";
import type { Route } from "../+types/root";
import { Header } from "~/components/header";
import { CircleChevronLeft } from "~/components/icons";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Seguro Salud Flexible - Planes y coberturas" },
    {
      name: "description",
      content: "Seguro Salud Flexible - Planes y coberturas",
    },
  ];
}

export default function StepOne() {
  const { userData } = useUser();

  return (
    <>
      Step One
      <Link to="/step-two">Step Two</Link>
    </>
  );
}
