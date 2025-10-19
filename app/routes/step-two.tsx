import { useUser } from "~/context";
import type { Route } from "../+types/root";
import { Link } from "react-router";
import { CircleChevronLeft, FamilyIcon } from "~/components/icons";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Seguro Salud Flexible - Resumen" },
    { name: "description", content: "Seguro Salud Flexible - Resumen" },
  ];
}

export default function StepTwo() {
  const { userData } = useUser();
  return (
    <div className="container mx-auto max-w-6xl px-4 pt-6">
      <div className="w-full hidden md:block mb-10">
        <Link to="/step-one" className="flex items-center gap-2 text-[#4f4fff]">
          <CircleChevronLeft className="size-4" />
          <p>Volver</p>
        </Link>
      </div>
      <h1 className="text-3xl font-medium md:text-4xl md:text-balance">
        Resumen del seguro
      </h1>
      <div className="bg-white rounded-lg p-4 mt-6" style={{ boxShadow: "0 0 16px 0px rgba(0,0,0,0.1)" }}>
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xs md:text-sm font-medium text-gray-500">PRECIOS CALCULADOS PARA:</h2>
            <div className="flex items-center gap-2">
              <FamilyIcon />
              <p className="md:text-lg font-medium">{userData.name} {userData.lastname}</p>
            </div>
          </div>
          <div className="h-px w-full bg-gray-300 my-4"/>
          <div className="space-y-2">
          <h3 className="text-sm md:text-base font-medium">Responsable de pago</h3>
          <p className="text-xs md:text-sm">{userData.documentType}: {userData.documentNumber}</p>
          <p className="text-xs md:text-sm">Celular: {userData.phone}</p>
          </div>
          <div className="space-y-2">
          <h3 className="text-sm md:text-base font-medium">Plan elegido</h3>
          <p className="text-xs md:text-sm">{userData.selectedPlanName}</p>
          <p className="text-xs md:text-sm">Costo del plan: ${userData.selectedPlanCost} al mes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
