const Post = require("../models/Post");
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

class PostController {

    // Add a new post
    static async addPost(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, content, owner } = req.body;
        try {
            const post = new Post({ title, content, owner });
            await post.save();
            res.status(201).json(post);
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    };

    // Get all posts
    static async getAllPosts(req, res) {
        try {
            const posts = await Post.find();
            res.status(200).json(posts);
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    }

    // Get a post by ID
    static async getPostById(req, res) {
        const { id } = req.params;
        try {
            const post = await Post.findById(id);
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }
            res.status(200).json(post);
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    }

    // Get post by Sender ID
    static async getPostBySenderId(req, res) {
        const { sender } = req.query;
        try {
            const posts = await Post.find({ owner: sender });
            res.status(200).json(posts);
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    }

    // Update post
    static async updatePost(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { title, content, owner } = req.body;

        try {
            const post = await Post.findByIdAndUpdate(
                id,
                { title, content, owner },
                { new: true, runValidators: true }
            );
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }
            res.status(200).json(post);
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    }
}

module.exports = PostController;