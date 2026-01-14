import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAdminBlogsApi, deleteBlogApi, togglePublishApi } from "../../features/blog/blogApi";
import { setBlogs, setLoading, setError } from "../../features/blog/blogSlice";
import Navbar from "../../components/Navbar";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { blogs, loading, error } = useSelector((state) => state.blog);

    const fetchAdminBlogs = async () => {
        dispatch(setLoading(true));
        try {
            const data = await getAdminBlogsApi();
            dispatch(setBlogs(data.blogs));
        } catch (err) {
            dispatch(setError(err.message || "Failed to fetch blogs"));
            dispatch(setBlogs([]));
        }
    };

    useEffect(() => {
        fetchAdminBlogs();
    }, [dispatch]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                await deleteBlogApi(id);
                fetchAdminBlogs();
            } catch (err) {
                alert("Deleting blog failed");
            }
        }
    };

    const handleToggle = async (id, currentStatus) => {
        try {
            await togglePublishApi(id, !currentStatus);
            fetchAdminBlogs();
        } catch (err) {
            alert("Update failed");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="p-8 max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <Link
                        to="/admin/create-blog"
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                    >
                        Create New Blog
                    </Link>
                </div>

                {loading && <div className="mb-4">Loading...</div>}

                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3 border border-gray-300">Title</th>
                            <th className="p-3 border border-gray-300">Status</th>
                            <th className="p-3 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map(blog => (
                            <tr key={blog.id}>
                                <td className="p-3 border border-gray-300">{blog.title}</td>
                                <td className="p-3 border border-gray-300">
                                    <span className={`px-2 py-1 rounded text-sm ${blog.is_published
                                        ? "bg-green-100 text-green-700 border border-green-300"
                                        : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                                        }`}>
                                        {blog.is_published ? "Published" : "Draft"}
                                    </span>
                                </td>
                                <td className="p-3 border border-gray-300">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleToggle(blog.id, blog.is_published)}
                                            className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
                                        >
                                            {blog.is_published ? "Unpublish" : "Publish"}
                                        </button>
                                        <Link
                                            to={`/admin/edit-blog/${blog.id}`}
                                            className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(blog.id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
