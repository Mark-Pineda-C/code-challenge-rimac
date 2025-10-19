import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { Header } from "~/components/header";
import { CircleChevronLeft } from "~/components/icons";

export default function StepsLayout() {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const currentStep = pathname === "/step-one" ? 1 : 2;

    return (<>
    <div className="relative container mx-auto max-w-6xl px-4">
        <Header />
      </div>
      <div className="border-b border-gray-300 md:border-none md:bg-gray-200">
        <div className="relative container mx-auto max-w-6xl p-4 flex items-center justify-between gap-4 md:justify-center">
          <button className="md:hidden" onClick={() => navigate(-1)}>
            <CircleChevronLeft className="size-6 text-gray-400" />
          </button>
          <div className="flex items-center gap-2 flex-1 md:hidden">
            <p className="text-sm">PASO {currentStep} DE 2</p>
            <div className="h-3 rounded-full bg-gray-200 flex-1">
              <div className="h-full rounded-full bg-[#4f4fff] duration-200" style={{ width: `${(currentStep / 2) * 100}%` }}></div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`rounded-full text-sm size-7 flex items-center justify-center ${currentStep === 1 ? "bg-[#4f4fff] text-white" : "border-2 border-gray-400 text-gray-400"}`}>
                1
              </div>
              <p className={`text-sm ${currentStep === 1 ? "font-semibold" : "text-gray-400"}`}>Planes y coberturas</p>
            </div>
            <div className="h-px w-10 border-t-2 border-[#4f4fff] border-dashed" />
            <div className="flex items-center gap-2">
              <div className={`rounded-full text-sm size-7 flex items-center justify-center ${currentStep === 2 ? "bg-[#4f4fff] text-white" : "border-2 border-gray-400 text-gray-400"}`}>
                2
              </div>
              <p className={`text-sm ${currentStep === 2 ? "font-semibold" : "text-gray-400"}`}>Resumen</p>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>)
}