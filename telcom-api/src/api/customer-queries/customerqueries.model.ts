import * as z from 'zod';
import { db } from '../../db';
import { WithId } from 'mongodb';

export const CustomerQuery = z.object({
    connectionNumber: z.string(),
    message: z.string(),
    type: z.string(),
});

export type CustomerQuery = z.infer<typeof CustomerQuery>;
export type CustomerQueryWithId = WithId<CustomerQuery>;
export const CustomerQuerys = db.collection<CustomerQuery>('customer-queries');

