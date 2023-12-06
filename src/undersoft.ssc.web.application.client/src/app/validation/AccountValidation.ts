import { AccountGroup } from "../../domain/enums/accountGroup";
import * as z from "zod";

export const CredentialValidation = z.object({
    email: z.string().email(),
});

export const PasswordValidation = CredentialValidation.extend({
    password: z.string().min(8), // Minimum password length
});

export const SignInValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const ProfileValidation = CredentialValidation.extend({
    picture: z.object({
        fileUrl: z.string().url(),
        fileKey: z.string(),
    }),
    accountGroup: z.enum([
        AccountGroup.Subcontractor,
        AccountGroup.Customer,
    ]),
});

// an Example of how to use refine

// const profile = z.object({
//   firstName: z.string({
//     required_error: "First name is required",
//     invalid_type_error: "First name must be a string",
//   }),

//   lastName: z.string({
//     required_error: "Last name is required",
//     invalid_type_error: "Last name must be a string",
//   }),

//   mobileNumber: z.number({
//     required_error: "Mobile number is required",
//     invalid_type_error: "Mobile number must be a number",
//   }),

//   confirmMobileNumber: z.number({}),
// })
// .refine((data) => data.mobileNumber === data.confirmMobileNumber, {
//   message: "Oops! Phone numbers doesnt match",
// });
