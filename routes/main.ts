
import { NextFunction, Request, Response, Router } from "express";
import prisma from "../client";
const router = Router();

/**
 * POST /
 * Users 
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

/**
 * GET /
 * Users 
 * The GET Route.
 */
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

/**
 * GET /
 * Users :id
 * The GET Route.
 */
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

/**
 * DELETE /
 * Users :id
 * The DELETE Route.
 */

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
// Creating the PUT Route.
/**
 * PUT /
 * Users :id
 * The PUT Route.
 */
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedUser = await prisma.user.update({
      select:{
        id: true,
        name: true
      },
      where: {
        id: String(id),
      },
      data: {
        name: String(name),
      },
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

module.exports = {
  Users: router,
};
