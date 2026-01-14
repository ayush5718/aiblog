import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAdminSingleBlogApi, editBlogApi } from "../../features/blog/blogApi";
import { generateImageApi } from "../../features/ai/aiApi";
import Navbar from "../../components/Navbar";
import Markdown from "react-markdown";

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blogData, setBlogData] = useState({
        title: "",
        slug: "",
        blog_content: "",
        image_url: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getAdminSingleBlogApi(id);
                const blog = data.blog;
                if (blog) {
                    setBlogData({
                        title: blog.title,
                        slug: blog.slug,
                        blog_content: blog.blog_content,
                        image_url: blog.image_url || ""
                    });
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchBlog();
    }, [id]);

    const handleGenImage = async () => {
        if (!blogData.title) return alert("Title is required for image generation");
        setLoading(true);
        try {
            const data = await generateImageApi(id);
            setBlogData({ ...blogData, image_url: data.imageUrl });
        } catch (err) {
            alert("Failed to generate image");
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editBlogApi(id, blogData);
            alert("Blog updated!");
            navigate("/admin/dashboard");
        } catch (err) {
            alert("Failed to update blog");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="p-8 max-w-5xl mx-auto">
                <h1 className="mb-8 text-2xl font-bold">Edit Blog</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Side: Forms */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Title</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded"
                                value={blogData.title}
                                onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Slug</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded"
                                value={blogData.slug}
                                onChange={(e) => setBlogData({ ...blogData, slug: e.target.value })}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Content (Markdown)</label>
                            <textarea
                                className="w-full h-96 p-3 border border-gray-300 rounded font-mono"
                                value={blogData.blog_content}
                                onChange={(e) => setBlogData({ ...blogData, blog_content: e.target.value })}
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block mb-1 font-medium">Image URL</label>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    className="flex-1 p-3 border border-gray-300 rounded"
                                    value={blogData.image_url}
                                    onChange={(e) => setBlogData({ ...blogData, image_url: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={handleGenImage}
                                    disabled={loading}
                                    className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-orange-400 cursor-pointer"
                                >
                                    Gen AI
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400 cursor-pointer"
                        >
                            {loading ? "Saving..." : "Update Blog"}
                        </button>
                    </form>

                    {/* Right Side: Preview */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Real-time Preview</h3>
                        <div className="border border-gray-200 p-6 rounded-lg bg-gray-50 min-h-[600px]">
                            <h1 className="text-2xl font-bold mb-6">{blogData.title}</h1>
                            {blogData.image_url && (
                                <img
                                    src={blogData.image_url}
                                    alt="Preview"
                                    className="w-full mb-4 rounded"
                                />
                            )}
                            <div className="prose max-w-none">
                                <Markdown>{blogData.blog_content}</Markdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBlog;
