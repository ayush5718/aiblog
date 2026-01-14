This project is a backend API for a blog generation with admin controlled blogs and AI powered content generation

## Authentication 

### POST /api/auth/login
Logs in an admin and returns a JWT token
Request Body:
{
    "email": "admin@example.com",
    "password": "password"
}

Response:
{
    "success": true,
    "message": "Login successful",
    "token": "etuigjting..."
}

## Blogs API 

### GET /api/blogs
Returns a list of all published blogs
Response:
{
    "success": true,
    "message": "Blogs fetched successfully",
    "blogs": [
        {
            "title": "Blog Title",
            "slug": "blog-slug",
            "image_url": "image_url",
            "created_at": "time_created"
        }
    ]
}

### GET /api/blogs/:slug
Returns a single blog by slug
Request Parameters:
    slug: string
Response:
{
    "success": true,
    "message": "Blog fetched successfully",
    "blog": {
        "title": "Blog Title",
        "slug": "blog-slug",
        "blog_content": "Blog content",
        "image_url": "image_url",
        "created_at": "time_created"
    }
}

### GET /api/blogs/:slug    
Returns a single blog by slug
Request Parameters:
    slug: string
Response:
{
    "success": true,
    "message": "Blog fetched successfully",
    "blog": {
        "title": "Blog Title",
        "slug": "blog-slug",
        "blog_content": "Blog content",
        "image_url": "image_url",
        "created_at": "time_created"
    }
}

### POST /api/blogs/create-blog
Creates a new blog (draft by default)
Request Body:
{
    "title": "Blog Title",
    "blog_content": "Blog content",
    "image_url": "image_url"
}
Response:
{
    "success": true,
    "message": "Blog created successfully",
    "blog": {
        "title": "Blog Title",
        "slug": "blog-slug",
        "blog_content": "Blog content",
        "image_url": "image_url",
        "created_at": "time_created"
    }
}


### PUT /api/blogs/:id
Updates an existing blog
Request Parameters:
    id: string
Request Body:
{
    "title": "Blog Title",
    "blog_content": "Blog content",
    "image_url": "image_url"
}
Response:
{
    "success": true,
    "message": "Blog updated successfully",
    "blog": {
        "title": "Blog Title",
        "slug": "blog-slug",
        "blog_content": "Blog content",
        "image_url": "image_url",
        "created_at": "time_created"
    }
}



### PUT /api/blogs/:id
Updates title or content of a blog
Request Parameters:
    id: string
Request Body:
{
    "title": "Blog Title",
    "blog_content": "Blog content"
}
Response:
{
    "success": true,
    "message": "Blog updated successfully",
    "blog": {
        "title": "Blog Title",
        "slug": "blog-slug",
        "blog_content": "Blog content",
        "image_url": "image_url",
        "created_at": "time_created"
    }
}


### DELETE /api/blogs/:id
Deletes a blog permanently
Request Parameters:
    id: string
Response:
{
    "success": true,
    "message": "Blog deleted successfully",
    "blog": {
        "title": "Blog Title",
        "slug": "blog-slug",
        "blog_content": "Blog content",
        "image_url": "image_url",
        "created_at": "time_created"
    }
}



### PATCH /api/blogs/:id/publish
Toggles blog publish status

Request Parameters:
    id: string
Response:
{
    "success": true,
    "message": "Blog publish status updated successfully",
    "blog": {
        "title": "Blog Title",
        "slug": "blog-slug",
        "blog_content": "Blog content",
        "image_url": "image_url",
        "created_at": "time_created"
    }
}



### GET /api/blogs/
Returns all blogs including drafts and published ones (for admin)

Response:
{
    "success": true,
    "message": "Blogs fetched successfully",
    "blogs": [
        {
            "title": "Blog Title",
            "slug": "blog-slug",
            "blog_content": "Blog content",
            "image_url": "image_url",
            "created_at": "time_created"
        }
    ]
}


### GET /api/blogs/
Returns all blogs including drafts and published (for admin)

Response:
{
    "success": true,
    "message": "Blogs fetched successfully",
    "blogs": [
        {
            "title": "Blog Title",
            "slug": "blog-slug",
            "blog_content": "Blog content",
            "image_url": "image_url",
            "created_at": "time_created"
        }
    ]
}




## AI apis (Proctected route and rate limited)

### POST /api/ai/generate-content
Generates blog content using AI
Request Body:
{
    "title": "Blog Title"
}
Response:
{
    "success": true,
    "message": "Blog content generated successfully",
    "content": "Generated blog content"
}

### POST /api/ai/generate-image/:id
Generates blog image using AI
Request parameters:
    id: string
Response:
{
    "success": true,
    "message": "Blog image generated successfully",
    "image_url": "Generated blog image url"
}

### POST /api/ai/generate-title
Generates blog title using AI (5 titles each request)
Request body:
{
    "topic": "Blog Topic"
}
Response:
{
    "success": true,
    "message": "Blog title generated successfully",
    "titles": ["Generated blog title 1", "Generated blog title 2", "Generated blog title 3", "Generated blog title 4", "Generated blog title 5"]
}