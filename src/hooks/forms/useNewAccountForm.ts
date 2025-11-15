import { Career, Faculty, NewAccountFormInputs } from "@/interfaces";
import { useAppModal } from "@/hooks";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { handleRegister } from "@/actions";

export const useNewAccountForm = (faculties: Faculty[]) => {
  const { openError } = useAppModal();
  const router = useRouter();
  const { login } = useSessionStore();

  const [availableCareers, setAvailableCareers] = useState<Career[]>(
    faculties[0].careers || []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewAccountFormInputs>();

  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const faculty = faculties.find((f) => f.facultyId === e.target.value);
    setAvailableCareers(faculty?.careers || []);
  };

  const onSubmit = async (data: NewAccountFormInputs) => {
    const userData = {
      name: data.name,
      lastName: data.lastName,
      dni: data.dni,
      uniqueCode: data.uniqueCode,
      primaryPhone: data.primaryPhone,
      optionalPhone: data.optionalPhone,
      faculty: data.faculty,
      career: data.career,
      email: data.email,
      password: data.password,
      role: [data.role],
      bio: data.bio,
      image:
        data.role === "tutor"
          ? "https://iili.io/KQQN11f.jpg"
          : "https://iili.io/KQQOQt9.jpg",
    };

    const result = await handleRegister(userData);

    if (!result.success) {
      if (result.statusCode === 409) {
        const formattedRole = data.role === "tutor" ? " Tutor" : "Estudiante";
        openError({
          message: `Ya existe una cuenta de ${formattedRole} para este usuario`,
          btnText: "Iniciar Sesión",
          onConfirm: () => {
            router.push("/auth/login");
          },
        });
        return;
      }

      const { message } = result;

      openError({
        message,
        btnText: "Aceptar",
      });

      return;
    }

    const { data: user } = result;

    const route = user.role[0] === "tutor" ? " /tutor/schedule" : "/student";

    login(user);
    router.push(route);
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
    handleFacultyChange,
    availableCareers,
    isSubmitting,
  };
};
