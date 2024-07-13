import { NextFunction, Request, Response } from "express";
import { InsertOneResult , ObjectId} from "mongodb";
import { ZodError } from "zod";
import { VoicePackage, VoicePackageWithId, VoicePackages } from "./voicepackages.model";

export async function findAll(req: Request, res: Response<VoicePackageWithId[]>, next: NextFunction) {
    try {
        const result = await VoicePackages.find();
        const voicepackages = await result.toArray();
        res.json(voicepackages);
    } catch (error) {
        next(error);
    }
}

export async function findById(req: Request<{ id: string }, VoicePackageWithId, {}, {}>, res: Response<VoicePackageWithId>, next: NextFunction) {
    try {
        const result = await VoicePackages.findOne({ _id: new ObjectId(req.params.id) });
        if (result) {
            res.json(result);
        } else {
            res.status(404);
            next(new Error(`VoicePackage with id ${req.params.id} not found`));
        }
    }
    catch (error) {
        next(error);
    }
}

export async function createOne(req: Request<{}, InsertOneResult<VoicePackage>, VoicePackage>, res: Response<InsertOneResult<VoicePackage>>, next: NextFunction) {
    const voicepackage = req.body;
    try {
        const validateResult = await VoicePackage.parseAsync(req.body);
        const insertResult = await VoicePackages.insertOne(validateResult);
        res.json(insertResult);
    }
    catch (error) {
        if (error instanceof ZodError) {
            res.status(422);
        }
        next(error);
    }
}

export async function findIdByName(req: Request<any, any, VoicePackage>, res: Response<any>, next: NextFunction) {
    const { name } = req.body;

    try {
        const result = await VoicePackages.findOne({ name });

        if (result) {
            // Convert MongoDB _id to string and return
            res.json({ _id: result._id.toString() });
        } else {
            res.status(404).json({ error: `Voice Package with name '${name}' not found` });
        }
    } catch (error) {
        next(error);
    }
}