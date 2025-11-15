export const revalidate = 15552000;

import Image from "next/image";
import { NewAccountForm } from "../../../components";
import { getFacultiesAndCareers } from "../../../actions";

export const metadata = {
  title: 'Crear Cuenta',
  description: 'Regístrate en PoliTutorías para crear o visualizar ofertas.',
};

export default async function NewAccountPage() {

  const { data } = await getFacultiesAndCareers();

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