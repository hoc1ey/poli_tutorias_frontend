export const revalidate = 15552000;

import Image from "next/image";
import { NewAccountForm } from "../../../components";
import { getFacultiesAndCareers } from "../../../actions";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { PiSmileySad } from "react-icons/pi";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Crear Cuenta',
  description: 'Regístrate en PoliTutorías para crear o visualizar ofertas.',
};

export default async function NewAccountPage() {

  const { data } = await getFacultiesAndCareers();

  if (!data || data.length === 0) {
    return (
      <div className="flex h-full">

        <div className="relative w-1/2">
          <Image src={"/mock-rol-selector-v2.webp"} alt={"Imagen de login"} fill style={{ objectFit: "cover" }} />
        </div>

        <div className="bg-white w-1/2 h-screen flex flex-col align-middle justify-center items-center px-[80px] py-[41px]">

          <PiSmileySad size={200} className="text-(--grey)" />

          <p className="font-montserrat font-medium text-2xl text-(--grey-blue) text-center py-[20px]">Error al obtener las Facultades y Carreras, intenta de nuevo más tarde</p>

          <Link href={'/auth/login'} className="btn-dark-blue px-[20px] py-[10px] mt-[10px] text-l font-bold font-montserrat">
            <div className="flex gap-[7px] items-center align-middle justify-center cursor-pointer">
              <IoArrowBack size={20} />
              <button className="cursor-pointer">Ir a Inicio</button>
            </div>
          </Link>

        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full">

      <div className="relative w-1/2">
        <Image src={"/mock-rol-selector-v2.webp"} alt={"Imagen de login"} fill style={{ objectFit: "cover" }} />
      </div>

      <div className="bg-white w-1/2 h-full flex flex-col align-middle items-center px-[40px] py-[41px]">

        <h1 className={`font-lato text-[32px] font-extrabold text-(--dark-blue) pb-[66px]`}>Registro</h1>

        <NewAccountForm faculties={data} />

      </div>
    </div>
  )
}