import { NextFunction, Request, Response } from "express";
import { InsertOneResult, UpdateResult, ObjectId } from "mongodb";
import { ZodError } from "zod";
import { User, UserWithId, Users } from "./users.model";
import { DataPackages } from "../data-packages/datapackages.model";
import { VoicePackage, VoicePackages } from "../voice-packages/voicepackages.model";

export async function findAll(req: Request, res: Response<UserWithId[]>, next: NextFunction) {
    try {
        const result = await Users.find();
        const users = await result.toArray();
        res.json(users);
    } catch (error) {
        next(error);
    }
}

export async function findById(req: Request<{ id: string }, UserWithId, {}, {}>, res: Response<UserWithId>, next: NextFunction) {
    try {
        const result = await Users.findOne({ _id: new ObjectId(req.params.id) });
        if (result) {
            res.json(result);
        } else {
            res.status(404);
            next(new Error(`User with id ${req.params.id} not found`));
        }
    }
    catch (error) {
        next(error);
    }
}


export async function createOne(req: Request<{}, InsertOneResult<User>, User>, res: Response<InsertOneResult<User>>, next: NextFunction) {
    const user = req.body;
    try {
        const validateResult = await User.parseAsync(req.body);
        const insertResult = await Users.insertOne(validateResult);
        res.json(insertResult);
    }
    catch (error) {
        if (error instanceof ZodError) {
            res.status(422);
        }
        next(error);
    }
}


export async function findByConnectionNumber(req: Request<{ connectionNumber: string }, UserWithId[], {}, {}>, res: Response<UserWithId[]>, next: NextFunction) {
    try {
        const result = await Users.find({ connectionNumber: req.params.connectionNumber });
        const users = await result.toArray();
        res.json(users);
    } catch (error) {
        next(error);
    }
}

export async function updateByConnectionNumber(req: Request<{ connectionNumber: string }, {}, User>, res: Response<UpdateResult>, next: NextFunction) {
    try {
        const connectionNumber = req.params.connectionNumber;
        const updateData = req.body;

        // Validate the partial user data
        const validateResult = await User.partial().parseAsync(updateData);

        // Perform the update operation
        const updateResult = await Users.updateOne(
            { connectionNumber: connectionNumber },
            { $set: validateResult }
        );

        if (updateResult.matchedCount === 0) {
            res.status(404);
            next(new Error(`User with connection number ${connectionNumber} not found`));
        }

        res.json(updateResult);
    }
    catch (error) {
        if (error instanceof ZodError) {
            res.status(422);
        }
        next(error);
    }
}

export async function getBalance(req: Request<{ connectionNumber: string }, {}, {}, {}>, res: Response<number>, next: NextFunction) {
    try {
        const result = await Users.find({ connectionNumber: req.params.connectionNumber });
        const users = await result.toArray();

        const balance: number = users[0]?.balance ?? 0;
        res.json(balance);

    } catch (error) {
        next(error);
    }
}

export async function rechargeBalance(req: Request<{ connectionNumber: string }, {}, { amount: number }, {}>, res: Response<UpdateResult>, next: NextFunction) {
    try {
        const connectionNumber = req.params.connectionNumber;
        const amount = req.body.amount;

        if (amount <= 0) {
            res.status(400);
            next(new Error("Recharge amount must be greater than 0"));
        }

        const updateResult = await Users.updateOne(
            { connectionNumber: connectionNumber },
            { $inc: { balance: amount } }
        );

        if (updateResult.matchedCount === 0) {
            res.status(404);
            next(new Error(`User with connection number ${connectionNumber} not found`));
        }

        res.json(updateResult);
    } catch (error) {
        next(error);
    }
}

export async function getDataPackages(req: Request<{ connectionNumber: string }, {}, {}, {}>, res: Response<any>, next: NextFunction) {
    try {
        const result = await Users.find({ connectionNumber: req.params.connectionNumber });
        const users = await result.toArray();
        const data_packages = users[0].DataPackages;

        if (!data_packages) {
            res.json(["No data packages found!"]);
            return;
        }
        res.json(data_packages);
    } catch (error) {
        next(error);
    }
}

export async function getVoicePackages(req: Request<{ connectionNumber: string }, {}, {}, {}>, res: Response<any>, next: NextFunction) {
    try {
        const result = await Users.find({ connectionNumber: req.params.connectionNumber });
        const users = await result.toArray();
        const voice_packages = users[0].VoicePackages;

        if (!voice_packages) {
            res.json(["No voice packages found!"]);
            return;
        }
        res.json(voice_packages);
    } catch (error) {
        next(error);
    }
}

export async function getActiveDataPackages(req: Request<{ connectionNumber: string }, {}, {}, {}>, res: Response<any>, next: NextFunction) {
    try {
        const result = await Users.find({ connectionNumber: req.params.connectionNumber });
        const users = await result.toArray();
        const data_packages = users[0].DataPackages;

        // valid till
        const currentDate = new Date();

        if (!data_packages) {
            res.json(["No active data packages found!"]);
            return;
        }
        const validDataPackages = data_packages.filter((data_package: any) => {
            return new Date(data_package.packageDetails.valid_till) > currentDate;
        });

        if (validDataPackages.length === 0) {
            res.json(["No active data packages found!"]);
            return;
        }

        res.json(validDataPackages);
    } catch (error) {
        next(error);
    }
}

export async function getActiveVoicePackages(req: Request<{ connectionNumber: string }, {}, {}, {}>, res: Response<any>, next: NextFunction) {
    try {
        const result = await Users.find({ connectionNumber: req.params.connectionNumber });
        const users = await result.toArray();
        const voice_packages = users[0].VoicePackages;

        const currentDate = new Date();

        if (!voice_packages) {
            res.json(["No active voice packages found!"]);
            return;
        }
        const validVoicePackages = voice_packages.filter((voice_package: any) => {
            return new Date(voice_package.packageDetails.validTill) > currentDate;
        });

        if (validVoicePackages.length === 0) {
            res.json(["No active voice packages found!"]);
            return;
        }

        res.json(validVoicePackages);
    } catch (error) {
        next(error);
    }
}

export async function getExpiredDataPackages(req: Request<{ connectionNumber: string }, {}, {}, {}>, res: Response<any>, next: NextFunction) {
    try {
        const result = await Users.find({ connectionNumber: req.params.connectionNumber });
        const users = await result.toArray();
        const data_packages = users[0].DataPackages;

        const currentDate = new Date();

        if (!data_packages) {
            res.json(["No expired data packages found!"]);
            return;
        }
        const expiredDataPackages = data_packages.filter((data_package: any) => {
            return new Date(data_package.packageDetails.valid_till) < currentDate;
        });

        res.json(expiredDataPackages);
    } catch (error) {
        next(error);
    }
}

export async function getExpiredVoicePackages(req: Request<{ connectionNumber: string }, {}, {}, {}>, res: Response<any>, next: NextFunction) {
    try {
        const result = await Users.find({ connectionNumber: req.params.connectionNumber });
        const users = await result.toArray();
        const voice_packages = users[0].VoicePackages;

        const currentDate = new Date();

        if (!voice_packages) {
            res.json(["No expired voice packages found!"]);
            return;
        }
        const expiredVoicePackages = voice_packages.filter((voice_package: any) => {
            return new Date(voice_package.packageDetails.validTill) < currentDate;
        });

        res.json(expiredVoicePackages);
    } catch (error) {
        next(error);
    }
}

export async function activateDataPackage(req: Request<{ connectionNumber: string }, {}, { dataPackageId: string, fromAccBalance: boolean }, {}>, res: Response<any>, next: NextFunction) {
    try {
        const connectionNumber = req.params.connectionNumber;
        const dataPackageId = req.body.dataPackageId;
        const fromAccBalance = req.body.fromAccBalance;

        const dataPackage = await DataPackages.findOne({ _id: new ObjectId(dataPackageId) });

        let pkg, result;
        if (!dataPackage) {
            res.status(404);
            next(new Error(`Data Package with id ${dataPackageId} not found`));
        }
        else {
            if (fromAccBalance) {
                const result = await Users.find({ connectionNumber: connectionNumber });
                const user = await result.toArray();

                const balance = user[0].balance??0;

                if (dataPackage.price > 0 && dataPackage.price > balance) {
                    res.status(400);
                    next(new Error(`Insufficient balance to activate this package`));
                }
                else {
                    const result = await Users.updateOne(
                        { connectionNumber: connectionNumber },
                        {
                            $inc: {
                                balance: -dataPackage.price
                            }
                        }
                    );
                    if (result.matchedCount === 0) {
                        res.status(404);
                        next(new Error(`User with connection number ${connectionNumber} not found`));
                    }
                }
            }


            pkg = {
                packageId: dataPackageId,
                packageType: dataPackage.type,
                packageDetails: {
                    name: dataPackage.name,
                    activated_price: dataPackage.price,
                    activated_date: new Date().toISOString(),
                    isUnlimited: dataPackage.is_unlimited,
                    allowedSites: dataPackage.allowedSites,
                    blockedSites: dataPackage.blockedSites,
                    description: dataPackage.description,
                    anyTimeData: dataPackage.any_time_data,
                    remainningAnyTimeData: dataPackage.any_time_data,
                    nightData: dataPackage.night_data,
                    remainningNightData: dataPackage.night_data,
                    _4gBonus: dataPackage._4g_bonus,
                    remainning4gBonus: dataPackage._4g_bonus,
                    validity: dataPackage.validity,
                    valid_till: new Date(new Date().getTime() + dataPackage.validity * 24 * 60 * 60 * 1000).toISOString(),
                },
            }

            result = await Users.updateOne(
                { connectionNumber: connectionNumber },
                {
                    $push: {
                        DataPackages: pkg
                    }
                }
            );
            if (result.matchedCount === 0) {
                res.status(404);
                next(new Error(`User with connection number ${connectionNumber} not found`));
            }
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function activateVoicePackage(req: Request<{ connectionNumber: string }, {}, { voicePackageId: string, fromAccBalance: boolean }, {}>, res: Response<any>, next: NextFunction) {
    try {
        const connectionNumber = req.params.connectionNumber;
        const voicePackageId = req.body.voicePackageId;
        const fromAccBalance = req.body.fromAccBalance;

        const voicePackage = await VoicePackages.findOne({ _id: new ObjectId(voicePackageId) });

        let pkg, result;
        if (!voicePackage) {
            res.status(404);
            next(new Error(`Voice Package with id ${voicePackageId} not found`));
        }
        else {
            if (fromAccBalance) {
                const result = await Users.find({ connectionNumber: connectionNumber });
                const user = await result.toArray();

                const balance = user[0].balance??0;

                if (voicePackage.price > 0 && voicePackage.price > balance) {
                    res.status(400);
                    next(new Error(`Insufficient balance to activate this package`));
                }
                else {
                    const result = await Users.updateOne(
                        { connectionNumber: connectionNumber },
                        {
                            $inc: {
                                balance: -voicePackage.price
                            }
                        }
                    );
                    if (result.matchedCount === 0) {
                        res.status(404);
                        next(new Error(`User with connection number ${connectionNumber} not found`));
                    }
                }
            }

            pkg = {
                packageId: voicePackageId,
                packageDetails: {
                    name: voicePackage.name,
                    activated_price: voicePackage.price,
                    activated_date: new Date().toISOString(),
                    validity: voicePackage.validity,
                    validTill: new Date(new Date().getTime() + voicePackage.validity * 24 * 60 * 60 * 1000).toISOString(),
                    x2x: voicePackage.x2x,
                    remainningX2X: voicePackage.x2x,
                    anyNet: voicePackage.anyNet,
                    remainningAnyNet: voicePackage.anyNet,
                    smsX2X: voicePackage.smsx2x,
                    remainningSmsX2X: voicePackage.smsx2x,
                    smsAnyNet: voicePackage.smsAnyNet,
                    remainningSmsAnyNet: voicePackage.smsAnyNet,

                },
            }

            result = await Users.updateOne(
                { connectionNumber: connectionNumber },
                {
                    $push: {
                        VoicePackages: pkg
                    }
                }
            );
            if (result.matchedCount === 0) {
                res.status(404);
                next(new Error(`User with connection number ${connectionNumber} not found`));
            }
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}

export async function checkIsOnLoan(req: Request<{ connectionNumber: string }, {}, {}, {}>, res: Response<any>, next: NextFunction) {
    try {
        const result = await Users.find({ connectionNumber: req.params.connectionNumber });
        const users = await result.toArray();
        const on_loan = users[0].on_loan ?? false;

        if (!on_loan) {
            res.json("Not on loan");
            return;
        }
        else {
            const loan_amount = users[0].loan_amount;
            const loan_balance = users[0].loan_balance;
            res.json({ "on_loan": on_loan, "loan_amount": loan_amount, "loan_balance": loan_balance});
            return;
        }
    } catch (error) {
        next(error);
    }
}

export async function getLoan(req: Request<{ connectionNumber: string }, {}, {}, {}>, res: Response<any>, next: NextFunction) {
    try {
        const result = await Users.find({ connectionNumber: req.params.connectionNumber });
        const users = await result.toArray();

        const on_loan = users[0].on_loan;
        const balance = users[0].balance;

        if (on_loan) {
            res.json("Already on loan");
            return;
        }

        if (balance >= 30) {
            res.json("Cannot get loan. Balance is greater than 30");
            return;
        }

        const result2 = await Users.updateOne(
            { connectionNumber: req.params.connectionNumber },
            {
                $set: {
                    on_loan: true,
                    loan_amount: 30,
                    loan_balance: 30
                }
            }
        );

        if (result2.matchedCount === 0) {
            res.status(404);
            next(new Error(`User with connection number ${req.params.connectionNumber} not found`));
        }

        res.json(result2);

    } catch (error) {
        next(error);
    }
}








