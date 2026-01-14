import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleBlogApi } from "../features/blog/blogApi";
import { setCurrentBlog, setLoading, setError } from "../features/blog/blogSlice";
import Navbar from "../components/Navbar";
import Markdown from "react-markdown";

const BlogDetails = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { currentBlog, loading, error } = useSelector((state) => state.blog);

    useEffect(() => {
        const fetchBlog = async () => {
            dispatch(setLoading(true));
            try {
                const data = await getSingleBlogApi(slug);
                dispatch(setCurrentBlog(data.blogs));
            } catch (err) {
                dispatch(setError(err.message || "Blog not found"));
            }
        };
        fetchBlog();
    }, [slug, dispatch]);

    if (loading) return (
        <div className="text-center mt-20">
            Loading...
        </div>
    );

    if (error) return (
        <div className="p-8 text-red-500 text-center">Error: {error}</div>
    );

    if (!currentBlog) return null;

    return (
        <div>
            <Navbar />
            <article className="p-8 max-w-3xl mx-auto">
                <div className=" pt-8  ">
                    <Link to="/" className="text-blue-600 hover:underline">&larr; Back to Home</Link>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                    Published on {new Date(currentBlog.created_at).toLocaleDateString()}
                </p>

                <h1 className="text-4xl font-bold mb-6">{currentBlog.title}</h1>

                {currentBlog.image_url && (
                    <img
                        src={currentBlog.image_url}
                        alt={currentBlog.title}
                        className="w-full h-auto mb-8 rounded-lg"
                    />
                )}

                <div className="prose prose-lg max-w-none">
                    <Markdown>{currentBlog.blog_content}</Markdown>
                </div>


            </article>
        </div>
    );
};

export default BlogDetails;
