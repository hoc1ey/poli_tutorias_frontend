'use client';

import React from 'react'
import { useForm } from 'react-hook-form';
import { LoginFormInputs } from '@/interfaces';
import { handleLogin } from '@/actions';
import { useAppModal } from '@/hooks';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/store';
import { FormInput, FormSelect, FormPasswordInput } from '@/components';

export const LoginForm = () => {

  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>();

  const { login } = useSessionStore();

  const router = useRouter();

  const { openError } = useAppModal();

  const onSubmit = async (data: LoginFormInputs) => {

    const loginData = {
      email: data.email,
      password: data.password,
      role: data.role
    }

    const result = await handleLogin(loginData);

    if (!result.success) {

      const { statusCode, message } = result;

      if (statusCode !== 401) {

        openError({
          message,
          btnText: 'Aceptar'
        })

        return;

      }

      openError({
        message: 'Correo, contraseña o tipo de usuario incorrectos',
        btnText: 'Aceptar'
      })

      return
    }

    const { data: user } = result;

    const route = user.role[0] === 'tutor' ? ' /tutor/offers' : '/student';

    login(user);
    router.push(route)

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col align-middle justify-center items-center">

      <FormInput
        id="email"
        label="Correo electrónico"
        type="email"
        register={register}
        errors={errors}
        className="container-responsive-full"
        inputClassName="input-responsive-full input-default-text"
        validation={{
          required: 'Campo obligatorio',
        }}
      />

      <FormPasswordInput
        id="password"
        label="Contraseña"
        register={register}
        errors={errors}
        className="container-responsive-full"
        containerClassName="password-wrapper-default w-full"
        validation={{
          required: 'Campo obligatorio',
        }}
      />

      <FormSelect
        id="role"
        label="Tipo de Usuario"
        options={[
          { value: 'tutor', label: 'Tutor' },
          { value: 'student', label: 'Estudiante' }
        ]}
        register={register}
        errors={errors}
        className="container-responsive-full"
        selectClassName="select-full-width input-default-text"
        validation={{
          required: 'Campo obligatorio',
        }}
      />


      <button
        className={`font-lato font-bold text-[20px] btn-dark-blue px-[36px] py-[5px] mt-[66px] mb-[25px]`}
        type="submit"
        disabled={isSubmitting}
      >
        {
          isSubmitting ? (
            <div className="h-5 w-5 border-2 border-(--dark-blue) spin-animation"></div>
          ) :
            'Iniciar sesión'
        }

      </button>

      <div className="flex items-center w-full mb-[46px]">
        <div className="flex-1 border-t border-black"></div>
        <p className="mx-[24px] font-ibm text-[16px]">o</p>
        <div className="flex-1 border-t border-black"></div>
      </div>

    </form>
  )
}
