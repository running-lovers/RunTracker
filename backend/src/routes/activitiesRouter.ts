import { Request, Response, Router } from "express";

export const router = Router();

router.get('/',(req: Request, res: Response) => {
    res.send("hello, activities")
})

router.get('/:id', (req: Request, res: Response) => {
    res.send("hello, eachActivities")
})

router.post('/', )
