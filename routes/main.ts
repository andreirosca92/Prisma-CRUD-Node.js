
import { NextFunction, Request, Response, Router } from "express";
import prisma from "../client";
const router = Router();

/**
 * GET /
 * Post :id
 */

router.post("/", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        posts: {
          create: {
            title: "My Second post",
            body: "Lots of really interesting stuff",
            slug: "my-second-post",
            comments: {
              create:{
                comment: "Hello Baby!!!"
              }
            }
          },
        },
      },
    });

    
    
    res.json( newUser);
  } catch (error:any) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: {
          include: {
            comments: true,
          },
        },
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});
router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const users = await prisma.user.findFirst({
      where:{
        id: id,
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    const deletedUser = await prisma.user.delete({
      where: {
        id: String(id),
      },
    
    });

    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});



module.exports = {
  Users: router,
};
