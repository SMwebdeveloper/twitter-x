"use client";

import useRegisterModal from "@/hooks/useRegisterModal";
import React, { useCallback, useState } from "react";
import Modal from "../ui/Modal";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerStep1Scheme, registerStep2Scheme } from "@/lib/validation";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";
import Button from "../ui/Button";
import useLoginModal from "@/hooks/useLoginModal";

const RegisterModal = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ name: "", email: "" });
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);
  const bodyContent =
    step === 1 ? (
      <RegisterStep1 setData={setData} setStep={setStep} />
    ) : (
      <RegisterStep2 />
    );
  const footer = (
    <div className="text-neutral-400 text-center mb-4">
      <p>
        Already have an account?{" "}
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          Sign in
        </span>
      </p>
    </div>
  );
  return (
    <Modal
      body={bodyContent}
      footer={footer}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      step={step}
      totalStep={2}
    />
  );
};

export default RegisterModal;

function RegisterStep1({
  setData,
  setStep,
}: {
  setData: Dispatch<SetStateAction<{ name: string; email: string }>>;
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const form = useForm<z.infer<typeof registerStep1Scheme>>({
    resolver: zodResolver(registerStep1Scheme),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerStep1Scheme>) {
    setData({ ...values });
    setStep(2);
  }

  const { isSubmitting } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
        <h1 className="text-3xl font-semibold text-white">Create an account</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          label={"Next"}
          type="submit"
          secondary
          fullWidth
          large
          disabled={isSubmitting}
        />
      </form>
    </Form>
  );
}

function RegisterStep2() {
  const form = useForm<z.infer<typeof registerStep2Scheme>>({
    resolver: zodResolver(registerStep2Scheme),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerStep2Scheme>) {
    console.log(values);
  }

  const { isSubmitting } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          label={"Register"}
          type="submit"
          secondary
          fullWidth
          large
          disabled={isSubmitting}
        />
      </form>
    </Form>
  );
}
