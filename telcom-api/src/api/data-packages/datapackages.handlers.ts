import { NextFunction, Request, Response } from "express";
import { DataPackage, DataPackageWithId, DataPackages } from "./datapackages.model";
import { InsertOneResult, ObjectId } from "mongodb";
import { ZodError } from "zod";

export async function findAll(req: Request, res: Response<DataPackageWithId[]>, next: NextFunction) {
    try {
        const result = await DataPackages.find();
        const datapackages = await result.toArray();
        res.json(datapackages);
    } catch (error) {
        next(error);
    }
}

export async function findById(req: Request<{ id: string }, DataPackageWithId, {}, {}>, res: Response<DataPackageWithId>, next: NextFunction) {
    try {
        const result = await DataPackages.findOne({ _id: new ObjectId(req.params.id) });
        if (result) {
            res.json(result);
        } else {
            res.status(404);
            next(new Error(`DataPackage with id ${req.params.id} not found`));
        }
    } catch (error) {
        next(error);
    }
}


export async function findByType(req: Request<{ type: string }, DataPackageWithId[], {}, {}>, res: Response<DataPackageWithId[]>, next: NextFunction) {
    try {
        const result = await DataPackages.find({ type: req.params.type });
        const datapackages = await result.toArray();
        res.json(datapackages);
    } catch (error) {
        next(error);
    }
}

export async function createOne(req: Request<{}, InsertOneResult<DataPackage>, DataPackage>, res: Response<InsertOneResult<DataPackage>>, next: NextFunction) {
    const datapackage = req.body;
    try {
        const validateResult = DataPackage.parse(req.body);
        const insertResult = await DataPackages.insertOne(validateResult);
        res.json(insertResult);
    }
    catch (error) {
        if (error instanceof ZodError) {
            res.status(422);
        }
        next(error);
    }
}

export async function findIdByName(req: Request<any, any, DataPackage>, res: Response<any>, next: NextFunction) {
    const { name } = req.body;

    try {
        const result = await DataPackages.findOne({ name });

        if (result) {
            // Convert MongoDB _id to string and return
            res.json({ _id: result._id.toString() });
        } else {
            res.status(404).json({ error: `Data Package with name '${name}' not found` });
        }
    } catch (error) {
        next(error);
    }
}



