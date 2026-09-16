"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, Send } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { cn } from "@/lib/utils";

type Labels = Dictionary["contact"]["form"];

type Props = {
  labels: Labels;
  email: string;
  /** Formspree form id. When empty the form falls back to a mailto: link. */
  formspreeId: string;
  locale: Locale;
};

type Status = "idle" | "sending" | "success" | "error";

function buildSchema(errors: Labels["errors"]) {
  return z.object({
    name: z.string().trim().min(1, errors.nameRequired).max(80, errors.nameMax),
    email: z.email(errors.emailInvalid),
    message: z.string().trim().min(20, errors.messageMin).max(2000, errors.messageMax),
    // Honeypot: real users never fill this. Formspree also drops submissions with `_gotcha` set.
    _gotcha: z.string().max(0).optional(),
  });
}

type FormValues = z.infer<ReturnType<typeof buildSchema>>;

const fieldClasses =
  "w-full rounded-md border border-border bg-bg px-3 py-2.5 text-sm text-fg placeholder:text-muted/70 transition-colors duration-200 hover:border-muted/60 focus:border-accent";

export function ContactForm({ labels, email, formspreeId, locale }: Props) {
  const schema = useMemo(() => buildSchema(labels.errors), [labels.errors]);
  const [status, setStatus] = useState<Status>("idle");
  const idPrefix = useId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: "onTouched" });

  const onSubmit = async (values: FormValues) => {
    if (!formspreeId) {
      const subject = encodeURIComponent(`[Portfolio] ${values.name}`);
      const body = encodeURIComponent(`${values.message}\n\n— ${values.name} <${values.email}>`);
      window.location.assign(`mailto:${email}?subject=${subject}&body=${body}`);
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, _language: locale }),
      });
      if (!response.ok) throw new Error(`Formspree responded ${response.status}`);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const nameId = `${idPrefix}-name`;
  const emailId = `${idPrefix}-email`;
  const messageId = `${idPrefix}-message`;
  const busy = isSubmitting || status === "sending";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-labelledby={`${idPrefix}-title`}
      className="relative rounded-lg border border-border bg-surface p-6"
    >
      <h3 id={`${idPrefix}-title`} className="text-base font-semibold">
        {labels.title}
      </h3>

      {!formspreeId ? <p className="mt-2 text-xs text-muted">{labels.notConfigured}</p> : null}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field id={nameId} label={labels.name} error={errors.name?.message}>
          <input
            id={nameId}
            type="text"
            autoComplete="name"
            placeholder={labels.namePlaceholder}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            className={cn(fieldClasses, errors.name && "border-red-500")}
            {...register("name")}
          />
        </Field>

        <Field id={emailId} label={labels.email} error={errors.email?.message}>
          <input
            id={emailId}
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder={labels.emailPlaceholder}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
            className={cn(fieldClasses, errors.email && "border-red-500")}
            {...register("email")}
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field id={messageId} label={labels.message} error={errors.message?.message}>
          <textarea
            id={messageId}
            rows={5}
            placeholder={labels.messagePlaceholder}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? `${messageId}-error` : undefined}
            className={cn(fieldClasses, "resize-y", errors.message && "border-red-500")}
            {...register("message")}
          />
        </Field>
      </div>

      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${idPrefix}-gotcha`}>Leave this field empty</label>
        <input
          id={`${idPrefix}-gotcha`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("_gotcha")}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={busy}>
          <Send aria-hidden="true" className="h-4 w-4" />
          {busy ? labels.sending : labels.send}
        </Button>
        <p role="status" aria-live="polite" className="text-sm">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.span
                key="success"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-1.5 text-accent"
              >
                <CircleCheck aria-hidden="true" className="h-4 w-4" />
                {labels.success}
              </motion.span>
            ) : null}
            {status === "error" ? (
              <motion.span
                key="error"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-500"
              >
                {labels.error}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-mono text-xs text-muted">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      ) : null}
    </div>
  );
}
