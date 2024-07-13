import * as z from 'zod';
import { db } from '../../db';
import { WithId } from 'mongodb';

export const DataPackage = z.object({
    // package_id: z.number(),
    name: z.string(),
    type: z.string(),
    price: z.number().min(0),
    is_unlimited: z.boolean().optional(),
    allowedSites: z.array(z.object({
        site: z.string(),
        url: z.string()
    })).optional(),
    blockedSites: z.array(z.object({
        site: z.string(),
        url: z.string()
    })).optional(),
    description: z.string().optional(),
    available_for: z.string().optional(),
    // is_recurring: z.boolean().optional(),
    any_time_data: z.number().optional(), // in MB
    night_data: z.number().optional(),
    _4g_bonus: z.number().optional(),
    validity: z.number(),
});

export type DataPackage = z.infer<typeof DataPackage>;
export type DataPackageWithId = WithId<DataPackage>;
export const DataPackages = db.collection<DataPackage>('data-packages');

