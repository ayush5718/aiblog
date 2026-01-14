import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogsApi } from "../features/blog/blogApi";
import { setBlogs, setLoading, setError } from "../features/blog/blogSlice";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";

const Home = () => {
    const dispatch = useDispatch();
    const { blogs, loading, error } = useSelector((state) => state.blog);

    useEffect(() => {
        const fetchBlogs = async () => {
            dispatch(setLoading(true));
            try {
                const data = await getBlogsApi();
                dispatch(setBlogs(data.blogs));
            } catch (err) {
                dispatch(setError(err.message || "Failed to fetch blogs"));
            }
        };
        fetchBlogs();
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            <main className="p-8 max-w-3xl mx-auto">
                <h1 className="mb-8 text-3xl font-bold">Latest Blogs</h1>

                {loading && <div className="p-4">Loading blogs...</div>}
                {error && <div className="p-4 text-red-500">Error: {error}</div>}

                {!loading && !error && blogs.length === 0 && (
                    <div className="p-4 text-gray-500">
                        No blogs found.
                    </div>
                )}

                <div className="grid gap-6">
                    {blogs.map((blog) => (
                        <BlogCard key={blog.slug} blog={blog} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Home;
