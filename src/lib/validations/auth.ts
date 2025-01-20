import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Por favor insira um e-mail válido"),
});

export const signupSchema = z.object({
  email: z.string().email("Por favor insira um e-mail válido"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Senha inválida"
    ),
  firstName: z.string().min(2, "Por favor insira um nome válido"),
  lastName: z.string().min(2, "Por favor insira um nome válido"),
  plan: z.enum(["basic", "business"]),
  cardNumber: z.string().regex(/^\d{16}$/, "Número de Cartão inválido"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Data inválida"),
  cvc: z.string().regex(/^\d{3,4}$/, "Número inválido"),
});
