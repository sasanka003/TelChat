import { NextFunction, Request, Response } from "express";
import { InsertOneResult , ObjectId} from "mongodb";
import { ZodError } from "zod";
import { CustomerQuery, CustomerQueryWithId, CustomerQuerys } from "./customerqueries.model";

export async function createCustomerQuery(req: Request, res: Response, next: NextFunction) {
    const customerQuery = CustomerQuery.parse(req.body);
    try {
        const result = await CustomerQuerys.insertOne(customerQuery);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function getCustomerQueries(req: Request, res: Response, next: NextFunction) {
    try {
        const customerQueries = await CustomerQuerys.find().toArray();
        res.json(customerQueries);
    } catch (error) {
        next(error);
    }
}

export async function getCustomerQuery(req: Request, res: Response, next: NextFunction) {
    const id = new ObjectId(req.params.id);
    try {
        const customerQuery = await CustomerQuerys.findOne({ _id: id });
        if (!customerQuery) {
            res.status(404).json({ message: 'Customer query not found' });
            return;
        }
        res.json(customerQuery);
    } catch (error) {
        next(error);
    }
}

export async function getCustomerQueryByType(req: Request, res: Response, next: NextFunction) {
    const type = req.params.type;
    try {
        const customerQueries = await CustomerQuerys.find({ type }).toArray();
        res.json(customerQueries);
    } catch (error) {
        next(error);
    }
}