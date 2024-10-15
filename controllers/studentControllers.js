const Stu = require('../models/student');
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
// register Student (POST)
exports.registerstd = async (req, res) => {
    const {
        name,
        email,
        username,
        password,
        phone,
        faculty,
        program,
        sex,
        yearofstudy
    } = req.body;

    try {
        // เข้ารหัสรหัสผ่าน
        const hashedPassword = await bcrypt.hash(password, 10);

        // สร้าง object สำหรับ Student ใหม่
        const stu = new Stu({
            name,
            email,
            username,
            password : hashedPassword,
            phone,
            faculty,
            program,
            sex,
            yearofstudy
        });

        // บันทึกข้อมูลนักเรียนในฐานข้อมูล
        await stu.save();
        res.status(201).send("student registered");
        console.log({
            stu
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// login Student (POST)
exports.loginstd = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    try {
        const tmpstu = await Stu.findOne({
            username
        });

        if (!tmpstu) return res.status(400).send("User not found");
        const isMatch = await bcrypt.compare(password, tmpstu.password);
        if (!isMatch) return res.status(400).send("Invalid credentials");
        const stu = await Stu.findOne({
            username
        }).select("-password");

        const accessToken = jwt.sign({
                stuId: stu._id
            },
            process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "2h"
            }
        );

        const refreshToken = jwt.sign({
                stuId: stu._id
            },
            process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: "2h"
            }
        );

        res.json({
            stu,
            accessToken,
            refreshToken
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.refreshstd = async (req, res) => {
    const {
        token
    } = req.body;
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, stu) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign({
                stuId: stu._id
            },
            process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "45m"
            }
        );
        res.json({
            accessToken
        });
    });
};