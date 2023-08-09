import prisma from "../services/prisma";
import { Request, Response } from "express";
import { CustomRequest } from "./user.controller";

export const kitchenController = {

    async createKitchen(req: Request, res: Response) {
        const email = (req as CustomRequest).email
        const {name, address, contact, cuisineType} = req.body; 

        if (email) {
            const kitchen = await prisma.kitchen.create({
                data: {
                    name: name,
                    address: address,
                    contactNumber: contact,
                    cuisineType: cuisineType,
                    email: email
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
    
}