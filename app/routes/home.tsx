import { Logo } from "~/components/logo";
import type { Route } from "./+types/home";
import familyImage from "~/assets/family.png";
import { useForm } from "@tanstack/react-form";
import { useUser } from "~/context";
import { useNavigate } from "react-router";
import { Header } from "~/components/header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Seguro Salud Flexible" },
    { name: "description", content: "Seguro Salud Flexible" },
  ];
}

export default function Home() {
  const { setPersonalData } = useUser();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      documentType: "DNI",
      documentNumber: "",
      phone: "",
      privacyCheck: false,
      comercyCheck: false,
    },
    onSubmit: async ({ value }) => {
      const response = await fetch(
        "https://rimac-front-end-challenge.netlify.app/api/user.json"
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos del usuario");
      }
      const data = await response.json();
      const payload = {
        documentType: value.documentType,
        documentNumber: value.documentNumber,
        phone: value.phone,
        name: data.name,
        lastname: data.lastName,
        age: Math.floor(
          (new Date().getTime() - new Date(data.birthDay).getTime()) /
            (365.25 * 24 * 60 * 60 * 1000)
        ),
      };
      setPersonalData(payload);
      navigate("/step-one");
    },
  });

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      <div className="absolute z-0 -top-16 -right-16 size-32 bg-[#00ff83] -rotate-45 blur-3xl md:h-1/2 md:-rotate-5 md:top-32 md:-right-32 md:blur-[128px]"></div>
      <div className="absolute z-0 bottom-16 -left-16 size-32 bg-[#8e2cb7] -rotate-45 blur-3xl md:h-1/2 md:-rotate-5 md:bottom-32 md:-left-32 md:blur-[128px]"></div>
      <div className="relative container mx-auto max-w-6xl px-4 flex-1 z-10">
        <Header />
        <main className="py-4 grid grid-cols-1 md:grid-cols-2 md:gap-20">
          <div className="col-span-1 hidden md:block">
            <img
              src={familyImage}
              alt="Seguro Salud Flexible"
              className="w-full h-full rounded-lg object-center object-cover"
            />
          </div>
          <div className="col-span-1">
            <div className=" grid grid-cols-4 gap-4 items-center">
              <hgroup className="col-span-2 space-y-2 md:col-span-full">
                <p className="bg-gradient-to-l from-[#00f5de] to-[#00ff83] rounded-lg px-2 py-1 text-xs w-fit">
                  Seguro Salud Flexible
                </p>
                <h1 className="text-3xl font-bold text-balance">
                  Creado para ti y tu familia
                </h1>
              </hgroup>
              <div className="col-span-2 md:hidden">
                <img
                  src={familyImage}
                  alt="Seguro Salud Flexible"
                  className="w-full h-full rounded-lg max-h-48 object-center object-cover sm:object-[50%_20%]"
                />
              </div>
            </div>
            <div className="h-px w-full bg-gray-300 my-4 md:hidden" />
            <p className="text-balance">
              Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
              asesoría, 100% online.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="my-6 space-y-2"
            >
              <div className="flex w-full items-start">
                <form.Field name="documentType">
                  {({ state, handleChange, name }) => (
                    <select
                      id={name}
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      className="h-16 w-28 md:w-40 border-2 border-gray-400 rounded-l-lg px-4 outline-none focus:border-[#03050f] duration-150"
                    >
                      <option value="DNI">DNI</option>
                      <option value="RUC">RUC</option>
                      <option value="CE">CE</option>
                    </select>
                  )}
                </form.Field>
                <form.Subscribe selector={(state) => state.values.documentType}>
                  {(type) => (
                    <form.Field
                      name="documentNumber"
                      validators={{
                        onSubmit: ({ value }) => {
                          if (!value) {
                            return `El ${type} es requerido`;
                          }
                          if (type === "DNI" && value.length < 8) {
                            return "El DNI debe tener 8 dígitos";
                          }
                          if (type === "RUC" && value.length < 11) {
                            return "El RUC debe tener 11 dígitos";
                          }
                          if (type === "CE" && value.length < 10) {
                            return "El CE debe tener 10 dígitos";
                          }
                          return undefined;
                        },
                      }}
                    >
                      {({ state, handleChange, name }) => (
                        <div className="space-y-1 flex-1">
                          <div className="relative">
                            <input
                              type="text"
                              id={name}
                              value={state.value}
                              onChange={(e) => handleChange(e.target.value)}
                              maxLength={
                                type === "DNI" ? 8 : type === "RUC" ? 11 : 10
                              }
                              placeholder=""
                              className="peer h-16 w-full border-2 border-gray-400 rounded-r-lg px-4 pt-4 outline-none focus:border-[#03050f] duration-150 border-l-0"
                            />
                            <label
                              htmlFor={name}
                              className="absolute text-gray-500 text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-98 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[#03050f]"
                            >
                              Nro. de documento
                            </label>
                          </div>
                          {state.meta.errorMap["onSubmit"] && (
                            <p className="text-red-500 text-xs -ml-28 md:-ml-40">
                              {state.meta.errorMap["onSubmit"]}
                            </p>
                          )}
                        </div>
                      )}
                    </form.Field>
                  )}
                </form.Subscribe>
              </div>
              <form.Field
                name="phone"
                validators={{
                  onSubmit: ({ value }) => {
                    if (!value) {
                      return "El número de celular es requerido";
                    }
                    if (value.length !== 9) {
                      return "El número de celular debe tener 9 dígitos";
                    }
                    return undefined;
                  },
                }}
              >
                {({ state, handleChange, name }) => (
                  <>
                    <div className="relative">
                      <input
                        type="text"
                        id={name}
                        value={state.value}
                        onChange={(e) => handleChange(e.target.value)}
                        className="peer w-full h-16 rounded-lg border-2 border-gray-400 px-4 pt-4 outline-none focus:border-[#03050f] duration-150"
                        maxLength={9}
                        placeholder=""
                      />
                      <label
                        htmlFor={name}
                        className="absolute text-gray-500 text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-98 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[#03050f]"
                      >
                        Celular
                      </label>
                    </div>
                    {state.meta.errorMap["onSubmit"] && (
                      <p className="text-red-500 text-xs">
                        {state.meta.errorMap["onSubmit"]}
                      </p>
                    )}
                  </>
                )}
              </form.Field>
              <form.Field
                name="privacyCheck"
                validators={{
                  onSubmit: ({ value }) => {
                    if (!value) {
                      return "Es necesario aceptar la Política de Privacidad";
                    }
                    return undefined;
                  },
                }}
              >
                {({ state, handleChange, name }) => (
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      name={name}
                      id={name}
                      checked={state.value}
                      onChange={(e) => handleChange(e.target.checked)}
                      className="mt-1"
                    />
                    <div className="space-y-1">
                      <label htmlFor={name}>
                        Acepto la Política de Privacidad
                      </label>
                      {state.meta.errorMap["onSubmit"] && (
                        <p className="text-red-500 text-xs">
                          {state.meta.errorMap["onSubmit"]}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </form.Field>
              <form.Field
                name="comercyCheck"
                validators={{
                  onSubmit: ({ value }) => {
                    if (!value) {
                      return "Es necesario aceptar la Política de Comunicaciones Comerciales";
                    }
                    return undefined;
                  },
                }}
              >
                {({ state, handleChange, name }) => (
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      name={name}
                      id={name}
                      checked={state.value}
                      onChange={(e) => handleChange(e.target.checked)}
                      className="mt-1"
                    />
                    <div className="space-y-1">
                      <label htmlFor={name}>
                        Acepto la Política de Comunicaciones Comerciales
                      </label>
                      {state.meta.errorMap["onSubmit"] && (
                        <p className="text-red-500 text-xs">
                          {state.meta.errorMap["onSubmit"]}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </form.Field>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-xs text-gray-500 underline"
              >
                Aplican Términos y Condiciones
              </a>
              <br />
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <button
                    type="submit"
                    onClick={() => form.handleSubmit()}
                    disabled={!canSubmit || isSubmitting}
                    className="w-full md:w-auto px-8 mt-6 bg-[#03050f] font-semibold py-2 rounded-full text-lg text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed duration-150"
                  >
                    {isSubmitting ? "Validando Información..." : "Cotiza aquí"}
                  </button>
                )}
              />
            </form>
          </div>
        </main>
      </div>
      <div className="bg-[#03050f] relative z-10">
        <div className="container mx-auto max-w-6xl p-4 flex flex-col items-center md:flex-row md:justify-between">
          <div className="md:hidden">
            <Logo horizontal altColor />
          </div>
          <div className="hidden md:block">
            <Logo altColor />
          </div>
          <div className="h-px w-full bg-gray-500 my-4 md:hidden" />
          <p className="text-xs text-white">
            © {new Date().getFullYear()} RIMAC Seguros y Reaseguros.
          </p>
        </div>
      </div>
    </div>
  );
}
