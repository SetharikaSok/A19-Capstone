import prisma from "../services/prisma";
import { Request, Response } from "express";
import { CustomRequest } from "./user.controller";
import { imageController } from "./image.controller";

export const kitchenController = {

    async createKitchen(req: Request, res: Response) {
        const email = (req as CustomRequest).email
        const {name, address, contact, cuisineType, imgUrl} = req.body; 

        //file
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const image_location = await imageController.upload(req.file);

        if (email) {
            const kitchen = await prisma.kitchen.create({
                data: {
                    name: name,
                    address: address,
                    contactNumber: contact,
                    cuisineType: cuisineType,
                    email: email,
                    imgUrl: image_location
                },
                include: {
                    menuItems: true,
                    orders: true
                }
            });
    
            return res.json({ kitchen:kitchen })
        }
        else {
            return res.status(404).json({"message": "Kitchen not found"})
        }
    },

    async findUniqueKitchen(req: Request, res: Response) {
        const paramId = req.params.id;

        const uniqueKitchen = await prisma.kitchen.findUnique({
            where: {
                id: paramId,
            }
        });

        return res.json({ uniqueKitchen: uniqueKitchen });
    },

    async findAllKitchens(req: Request, res: Response) {
        const kitchens = await prisma.kitchen.findMany();
        return res.json(kitchens);
    },

    // async deleteUser(req: Request, res: Response) {
    //     const paramId = req.params.id;

    //     const deletedUser = await prisma.user.delete({
    //         where: {
    //             id: paramId,
    //         }
    //     }); 

    //     return res.json({ deletedUser: deletedUser });
    // }

    
}