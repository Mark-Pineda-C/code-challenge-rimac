import { useUser } from "~/context";
import type { Route } from "../+types/root";
import { Header } from "~/components/header";
import {
  AddUserIcon,
  CheckIcon,
  CircleChevronLeft,
  HomeIcon,
  HospitalIcon,
  ProtectionIcon,
} from "~/components/icons";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

type Plan = {
  name: string;
  price: number;
  description: string[];
  age: number;
  svg?: React.ReactNode;
};

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
  const navigate = useNavigate();
  const [quoteFor, setQuoteFor] = useState<"personal" | "other" | undefined>();
  const { userData, setPlanData } = useUser();

  const {
    data: plans,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const response = await fetch(
        "https://rimac-front-end-challenge.netlify.app/api/plans.json"
      );
      if (!response.ok) {
        throw new Error("Error al obtener los planes");
      }
      const data = await response.json();
      return data.list as Plan[];
    },
    select: (data) =>
      data
        .filter((plan) => plan.age >= userData.age)
        .map((plan) => ({
          ...plan,
          svg: plan.name.includes("Clínica") ? <HospitalIcon /> : <HomeIcon />,
        })),
    enabled: !!quoteFor,
  });

  return (
    <div className="container mx-auto max-w-6xl px-4 pt-6 md:flex md:flex-col md:items-center">
      <div className="w-full hidden md:block mb-10">
        <Link to="/" className="flex items-center gap-2 text-[#4f4fff]">
          <CircleChevronLeft className="size-4" />
          <p>Volver</p>
        </Link>
      </div>
      <hgroup className="space-y-2">
        <h1 className="text-3xl font-medium md:text-4xl md:text-balance">
          {userData.name} ¿Para quién deseas cotizar?
        </h1>
        <p className="text-base text-gray-500 md:text-sm md:text-center">
          Selecciona la opción que se ajuste más a tus necesidades.
        </p>
      </hgroup>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="flex items-center gap-2 relative md:max-w-[300px] bg-white rounded-2xl">
          <input
            type="radio"
            name="quoteFor"
            id="personal"
            value="personal"
            className="peer absolute appearance-none w-full h-full rounded-2xl checked:border-2 checked:border-[#03050f]"
            style={{ boxShadow: "0 0 16px 0px rgba(0,0,0,0.1)" }}
            onChange={(e) =>
              setQuoteFor(e.target.value as "personal" | "other")
            }
          />
          <span className="absolute top-2 right-2 border border-gray-400 peer-checked:border-none peer-checked:bg-green-500 size-6 rounded-full grid place-items-center">
            <CheckIcon className="text-[#f8f9ff]" />
          </span>
          <label htmlFor="personal" className="text-base p-4 space-y-2">
            <div className="flex items-center gap-2 md:flex-col md:items-start">
              <ProtectionIcon />
              <p className="font-semibold">Para mí</p>
            </div>
            <p className="text-xs text-gray-500">
              Cotiza tu seguro de salud y agrega familiares si así lo deseas.
            </p>
          </label>
        </div>
        <div className="flex items-center gap-2 relative md:max-w-[300px] bg-white rounded-2xl">
          <input
            type="radio"
            name="quoteFor"
            id="other"
            value="other"
            className="peer absolute appearance-none w-full h-full rounded-2xl checked:border-2 checked:border-[#03050f]"
            style={{ boxShadow: "0 0 16px 0px rgba(0,0,0,0.1)" }}
            onChange={(e) =>
              setQuoteFor(e.target.value as "personal" | "other")
            }
          />
          <span className="absolute top-2 right-2 border border-gray-400 peer-checked:border-none peer-checked:bg-green-500 size-6 rounded-full grid place-items-center">
            <CheckIcon className="text-[#f8f9ff]" />
          </span>
          <label htmlFor="other" className="text-base p-4 space-y-2">
            <div className="flex items-center gap-2 md:flex-col md:items-start">
              <AddUserIcon />
              <p className="font-semibold">Para otra persona</p>
            </div>
            <p className="text-xs text-gray-500">
              Realiza una cotización para uno de tus familiares o cualquier
              persona.
            </p>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {isLoading && (
          <div className="col-span-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        )}
        {quoteFor &&
          isSuccess &&
          plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-white rounded-lg p-4"
              style={{ boxShadow: "0 0 16px 0px rgba(0,0,0,0.1)" }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{plan.name}</h2>
                  {plan.svg}
                </div>
                <div>
                  <p className="text-sm text-gray-500">COSTO DEL PLAN</p>
                  <p className="font-medium">${plan.price} al mes</p>
                </div>
              </div>
              <div className="h-px w-full bg-gray-300 my-4" />
              <ul className="mb-4 md:h-[200px] lg:h-[180px] space-y-2">
                {plan.description.map((description) => (
                  <li key={description} className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 min-w-1.5 rounded-full bg-[#03050f] mt-2" />
                    <p className="text-sm text-gray-500">{description}</p>
                  </li>
                ))}
              </ul>
              <button onClick={() => {
                setPlanData({
                  selectedPlanName: plan.name,
                  selectedPlanCost: plan.price,
                });
                navigate("/step-two");
              }} className="w-full bg-[#F7052D] text-white py-2 rounded-full justify-self-end cursor-pointer hover:bg-[#F7052D]/80 transition-colors duration-200">
                Seleccionar plan
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
