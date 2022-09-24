import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { CourseInstance } from "../model/course";
import { UserInstance } from "../model/user";
import {
  createCourseSchema,
  options,
  updateCourseSchema,
} from "../utils/utils";

export async function createCourse(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  // let course = {...req.body, id}
  try {
    const verified = req.user;
    const validationResult = createCourseSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const record = await CourseInstance.create({
      id,
      ...req.body,
      userId: verified.id,
    });
    res.status(201).json({
      msg: "You have successfully created a course",
      record,
    });
  } catch (err) {
    res.status(500).json({
      msg: "failed to create",
      route: "/create",
    });
  }
}

export async function getCourse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    //  const record = await CourseInstance.findAll({where: {},limit, offset})
    const record = await CourseInstance.findAll({
      limit,
      offset,
      include: [
        {
          model: UserInstance,
          attributes: [
            "id",
            "firstname",
            "lastname",
            "email",
            "phonenumber",
            "address",
          ],
          as: "user",
        },
      ],
    });
    res.render("index", { record });
    // res.status(200).json({
    //   msg: "You have successfully fetch all courses",
    //   count: record,
    //   record: record,
    // });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read",
      route: "/read",
    });
  }
}

export async function getSingleCourse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await CourseInstance.findOne({ where: { id } });
    res.render("index", { record });
    // return res.status(200).json({
    //   msg: "Successfully gotten user information",
    //   record,
    // });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read single course",
      route: "/read/:id",
    });
  }
}

export async function updateCourse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { title, description, image, price } = req.body;
    const validationResult = updateCourseSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }

    const record = await CourseInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        Error: "Cannot find existing course",
      });
    }
    const updatedrecord = await record.update({
      title: title,
      description: description,
      image: image,
      price: price,
    });
    res.status(200).json({
      msg: "You have successfully updated your course",
      updatedrecord,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to update",
      route: "/update/:id",
    });
  }
}

export async function deleteCourse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await CourseInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        msg: "Cannot find course",
      });
    }
    const deletedRecord = await record.destroy();
    return res.status(200).json({
      msg: "Course deleted successfully",
      deletedRecord,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to delete",
      route: "/delete/:id",
    });
  }
}
