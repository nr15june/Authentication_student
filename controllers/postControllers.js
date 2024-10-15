const mongoose = require("mongoose");
const Post = require('../models/poststudent');

exports.getPostStudent = async (req, res) => {
    try {
        // ดึงข้อมูลโพสต์ทั้งหมดจากฐานข้อมูล
        const posts = await Post.find();
        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.postPostStudent = async (req, res) => {
    const { stskill, stability, stworktime } = req.body;
    const post = new Post({ stskill, stability, stworktime });
    try {
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ฟังก์ชันแก้ไขโพสต์นักศึกษา
exports.editPostStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        const update = {$set : req.body};
        await Post.findByIdAndUpdate(id,update);
        res.status(200).json({ message: 'Post updated' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deletePostStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        await Post.findByIdAndDelete(id);
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
