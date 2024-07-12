import * as z from 'zod';
import { db } from '../../db';
import { WithId } from 'mongodb';

export const VoicePackage = z.object({
    name: z.string(),
    price: z.number().min(0),
    validity: z.number(),
    x2x: z.number().optional(),
    anyNet : z.number().optional(),
    smsx2x: z.number().optional(),
    smsAnyNet: z.number().optional(),
});

export type VoicePackage = z.infer<typeof VoicePackage>;
export type VoicePackageWithId = WithId<VoicePackage>;
export const VoicePackages = db.collection<VoicePackage>('voice-packages');

