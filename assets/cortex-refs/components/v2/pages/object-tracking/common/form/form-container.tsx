'use client';

import { ReactNode } from 'react';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import FormHeader, { FormHeaderProps } from './form-header';

interface FormContainerProps<TData extends FieldValues> {
  methods: UseFormReturn<TData>;
  headerProps: FormHeaderProps;
  children: ReactNode;
  onSubmit: (data: TData) => void;
}

const FormContainer = <TData extends FieldValues>({
  methods,
  headerProps,
  children,
  onSubmit,
}: FormContainerProps<TData>) => {
  const { handleSubmit } = methods;

  return (
    <div className="mx-auto w-full max-w-[600px]">
      <FormProvider {...methods}>
        <FormHeader {...headerProps} />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-9">
          {children}
        </form>
      </FormProvider>
    </div>
  );
};

export default FormContainer;
