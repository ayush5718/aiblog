import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
    return (
        <div className="border border-gray-400 p-4 rounded-lg mb-6">
            {blog.image_url && (
                <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full h-52 object-cover mb-3 rounded"
                />
            )}
            <h3 className="my-3 text-xl font-semibold">{blog.title}</h3>
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                    {new Date(blog.created_at).toLocaleDateString()}
                </span>
                <Link to={`/blog/${blog.slug}`} className="text-blue-600 hover:underline">
                    Read More
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
