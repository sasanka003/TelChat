import * as z from 'zod';
import { db } from '../../db';
import { WithId } from 'mongodb';

const dateStringSchema = z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), { message: "Must be a valid date string in YYYY-MM-DD format" });

export const User = z.object({
    connectionNumber: z.string(),
    userDetails: z.object({
        name: z.string(),
        email: z.string().optional(),
        nic: z.string(),
        address: z.object({
            line_1: z.string(),
            line_2: z.string(),
            city: z.string(),
            province: z.string(),
        }).optional(),
    }),

    type: z.enum(['prepaid', 'postpaid']),
    balance: z.number().default(0),

    on_loan: z.boolean().optional(),
    loan_amount: z.number().optional(),
    loan_balance: z.number().optional(),

    DataPackages: z.array(z.object({
        packageId: z.string(),
        packageType: z.string(),
        packageDetails: z.object({
            name: z.string(),
            activated_price: z.number(),
            activated_date: dateStringSchema,
            isUnlimited: z.boolean().optional(),
            allowedSites: z.array(z.object({
                site: z.string(),
                url: z.string()
            })).optional(),
            blockedSites: z.array(z.object({
                site: z.string(),
                url: z.string()
            })).optional(),
            description: z.string().optional(),
            anyTimeData: z.number().optional(), // in MB
            remainningAnyTimeData: z.number().optional(),
            nightData: z.number().optional(),
            remainningNightData: z.number().optional(),
            _4gBonus: z.number().optional(),
            remainning4gBonus: z.number().optional(),
            validity: z.number(),
            valid_till: dateStringSchema,
        }),
        isRecurring: z.boolean().optional(),
    })).optional(),
    
    VoicePackages: z.array(z.object({
        packageId: z.string(),
        packageDetails: z.object({
            name: z.string(),
            activated_price: z.number(),
            activated_date: dateStringSchema,
            validity: z.number(),
            validTill: dateStringSchema,
            x2x: z.number().optional(),
            remainningX2X: z.number().optional(),
            anyNet: z.number().optional(),
            remainningAnyNet: z.number().optional(),
            smsX2X: z.number().optional(),
            remainningSmsX2X: z.number().optional(),
            smsAnyNet: z.number().optional(),
            remainningSmsAnyNet: z.number().optional(),
        }),
        isRecurring: z.boolean().optional(),
    })).optional(),
});



export type User = z.infer<typeof User>;
export type UserWithId = WithId<User>;
export const Users = db.collection<User>('User');

