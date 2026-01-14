import { pool } from "../db/index.js";
import { generateSlug } from "../utils/generateSlug.js";


// for creating new blog        
export const createBlog = async (req, res) => {


    try {
        const { title, blog_content, image_url } = req.body;
        if (!title || !blog_content) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }
        const slug = generateSlug(title);

        // checking for unique slug
        const findSlug = await pool.query("SELECT * FROM blogs WHERE slug=$1", [slug])

        if (findSlug.rows.length > 0) {
            return res.status(401).json({
                success: false,
                message: "blog with same title already exists"
            })
        }

        // creating blog
        const createBlog = await pool.query("INSERT INTO blogs (title,slug,blog_content,image_url) VALUES ($1, $2, $3, $4) RETURNING *", [title, slug, blog_content, image_url])

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog: createBlog.rows[0]
        })
    } catch (error) {
        console.error("Error in creating blog:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

// for editing existing blog
export const editBlog = async (req, res) => {

    try {
        const blogId = req.params.id;
        const { title, blog_content, image_url } = req.body;

        if (!title || !blog_content) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }

        const slug = generateSlug(title);

        // checking if blog exists 
        const findBlog = await pool.query("SELECT * FROM blogs WHERE id=$1", [blogId]);
        if (findBlog.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            })
        }

        // for updating the content in table
        const result = await pool.query(`
        UPDATE blogs 
        SET title=$1, slug=$2, blog_content=$3,image_url=$4
        WHERE id=$5 RETURNING *`, [title, slug, blog_content, image_url || null, blogId])

        res.json({
            success: true,
            message: "Blog updated successfully",
            blog: result.rows[0]
        })
    } catch (error) {
        console.error("Error editing blogs", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        })

    }
}

//for deleting existing blog
export const deleteBlog = async (req, res) => {

    try {
        const blogId = req.params.id;

        const result = await pool.query(`DELETE FROM blogs WHERE id=$1 RETURNING *`, [blogId]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            })
        }
        res.json({
            success: true,
            message: "Blog deleted successfully",
            blog: result.rows[0]
        })
    } catch (error) {
        console.error("Error in deleting blog:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

// toogle published or unpublished blog
export const tooglePublished = async (req, res) => {
    try {
        const blogId = req.params.id;
        const { is_published } = req.body;

        const result = await pool.query(`UPDATE blogs
            SET is_published=$1
            WHERE id=$2
            RETURNING *`, [is_published, blogId]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            })
        }

        res.json({
            success: true,
            message: "Blog published status updated Successfully",
            blog: result.rows[0]
        })
    } catch (error) {
        console.error("Error updating published status", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        })

    }
}

//get all blog by admin 
export const getAllBlogByAdmin = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM blogs ORDER BY created_at DESC`);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No blogs found"
            })
        }
        res.json({
            success: true,
            message: "All blogs fetched successfully",
            blogs: result.rows
        })
    } catch (error) {
        console.error("Error blogs fetching", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

// get a single blog by admin
export const getSingleBlogByAdmin = async (req, res) => {
    try {
        const blogId = req.params.id;
        const result = await pool.query(`SELECT * FROM blogs WHERE id=$1`, [blogId]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            })
        }
        res.json({
            success: true,
            message: "Blog fetched successfully",
            blog: result.rows[0]
        })
    } catch (error) {
        console.error("Error fetching single blog", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        })

    }
}

// get all published blog by 
export const getAllBlogByUser = async (req, res) => {
    try {
        const result = await pool.query(`SELECT title,slug,image_url,created_at FROM blogs WHERE is_published=true ORDER BY created_at DESC`);
        res.json({
            success: true,
            message: result.rows.length > 0 ? "All blogs fetched successfully" : "No blogs found",
            blogs: result.rows
        })
    } catch (error) {
        console.error("Error blogs fetching", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

// get single blog by user(slug)
export const getSingleBlogByUser = async (req, res) => {
    try {
        const { slug } = req.params;
        const result = await pool.query(`SELECT * FROM blogs WHERE slug=$1 AND is_published=true`, [slug])
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            })
        }

        res.json({
            success: true,
            blogs: result.rows[0]
        })
    } catch (error) {
        console.error("Error fetching blogs");
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }

}