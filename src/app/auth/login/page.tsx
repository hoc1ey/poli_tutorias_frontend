import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "../../../components";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Ingreso',
  description: 'Ingresa tus credenciales para crear o visualizar ofertas.',
};

export default function LoginPage() {

  return (
    <div className="flex h-screen">

      <div className="relative w-5/6">
        <Image src={"/mock-rol-selector-v2.webp"} alt={"Imagen de login"} fill style={{ objectFit: "cover" }} />
      </div>

      <div className="bg-white w-2/6 h-full flex flex-col align-middle justify-center items-center px-[66px]">

        <h1 className={`font-lato text-[32px] font-extrabold text-(--dark-blue) pb-[66px]`}>Inicio de sesión</h1>

        <LoginForm />

        <Link href={'/auth/new-account'}>
          <button
            className={`font-lato font-bold text-[20px] btn-dark-blue px-[36px] py-[5px]`}
            type='button'
          >
            Crear una nueva cuenta
          </button>
        </Link>

      </div>
    </div>
  );
}