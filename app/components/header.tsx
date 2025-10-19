import { PhoneIcon } from "./icons";
import { Logo } from "./logo";

export function Header() {
  return (
    <header className="flex items-center justify-between py-4">
      <Logo />
      <div className="flex items-center gap-2">
        <p className="text-sm hidden md:block">¡Compra por este medio!</p>
        <PhoneIcon />
        <span className="font-semibold">(01) 411 6001</span>
      </div>
    </header>
  );
}
