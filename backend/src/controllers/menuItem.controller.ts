import prisma from "../services/prisma";
import { Request, Response } from "express";
import { CustomRequest } from "./user.controller";

export const menuItemController = {

    async createMenuItem(req: Request, res: Response) {
        const email = (req as CustomRequest).email
        const {name, description, price, category} = req.body;

        const kitchen = await prisma.kitchen.findUnique({
            where: {
                email: email
            }
        })
        
        if (kitchen) {
            const menuItem = await prisma.menuItem.create({
                data: {
                    name: name,
                    description: description,
                    price: parseFloat(price+""),
                    category: category,
                    kitchenId: kitchen?.id
                },
                include: {
                    kitchen: true,
                    orderItem: true,
                }
            });
            return res.json({ menuItem: menuItem }) 
        }
        else {
            return res.status(404).json({"message": "MenuItem not found"})
        }
    },

    async findUniqueMenuItem(req: Request, res: Response) {
        const paramId = req.params.id;

        const uniqueMenuItem = await prisma.menuItem.findUnique({
            where: {
                id: paramId,
            }
        });
        return res.json({ uniqueMenuItem: uniqueMenuItem });
    },
}