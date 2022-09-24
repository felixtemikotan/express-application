"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.getSingleCourse = exports.getCourse = exports.createCourse = void 0;
const uuid_1 = require("uuid");
const course_1 = require("../model/course");
const user_1 = require("../model/user");
const utils_1 = require("../utils/utils");
async function createCourse(req, res, next) {
    const id = (0, uuid_1.v4)();
    // let course = {...req.body, id}
    try {
        const verified = req.user;
        const validationResult = utils_1.createCourseSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const record = await course_1.CourseInstance.create({
            id,
            ...req.body,
            userId: verified.id,
        });
        res.status(201).json({
            msg: "You have successfully created a course",
            record,
        });
    }
    catch (err) {
        res.status(500).json({
            msg: "failed to create",
            route: "/create",
        });
    }
}
exports.createCourse = createCourse;
async function getCourse(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        //  const record = await CourseInstance.findAll({where: {},limit, offset})
        const record = await course_1.CourseInstance.findAll({
            limit,
            offset,
            include: [
                {
                    model: user_1.UserInstance,
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
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read",
            route: "/read",
        });
    }
}
exports.getCourse = getCourse;
async function getSingleCourse(req, res, next) {
    try {
        const { id } = req.params;
        const record = await course_1.CourseInstance.findOne({ where: { id } });
        res.render("index", { record });
        // return res.status(200).json({
        //   msg: "Successfully gotten user information",
        //   record,
        // });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read single course",
            route: "/read/:id",
        });
    }
}
exports.getSingleCourse = getSingleCourse;
async function updateCourse(req, res, next) {
    try {
        const { id } = req.params;
        const { title, description, image, price } = req.body;
        const validationResult = utils_1.updateCourseSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const record = await course_1.CourseInstance.findOne({ where: { id } });
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
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to update",
            route: "/update/:id",
        });
    }
}
exports.updateCourse = updateCourse;
async function deleteCourse(req, res, next) {
    try {
        const { id } = req.params;
        const record = await course_1.CourseInstance.findOne({ where: { id } });
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
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to delete",
            route: "/delete/:id",
        });
    }
}
exports.deleteCourse = deleteCourse;
