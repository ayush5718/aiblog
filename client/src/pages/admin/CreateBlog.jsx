import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlogApi } from "../../features/blog/blogApi";
import { generateTitleApi, generateContentApi, generateImageApi } from "../../features/ai/aiApi";
import Navbar from "../../components/Navbar";
import Markdown from "react-markdown";

const CreateBlog = () => {
    const navigate = useNavigate();

    // Step tracking
    const [step, setStep] = useState(1);

    // Data
    const [topic, setTopic] = useState("");
    const [titles, setTitles] = useState([]);
    const [selectedTitle, setSelectedTitle] = useState("");
    const [content, setContent] = useState("");
    const [savedBlogId, setSavedBlogId] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    // Loading states
    const [loading, setLoading] = useState(false);

    // STEP 1 Generate Titles from Topic
    const handleGenerateTitles = async () => {
        if (!topic.trim()) return alert("Please enter a topic first");
        setLoading(true);
        try {
            const data = await generateTitleApi(topic);
            setTitles(data.titles || []);
            setStep(2);
        } catch (err) {
            alert("Failed to generate titles");
        }
        setLoading(false);
    };

    // STEP 2 Select Title
    const handleSelectTitle = (title) => {
        setSelectedTitle(title);
    };

    // STEP 3 Generate Content from Selected Title
    const handleGenerateContent = async () => {
        if (!selectedTitle) return alert("Please select a title first");
        setLoading(true);
        try {
            const data = await generateContentApi(selectedTitle);
            setContent(data.content || "");
            setStep(3);
        } catch (err) {
            alert("Failed to generate content");
        }
        setLoading(false);
    };

    // STEP 4 Save Blog (no image yet, not published)
    const handleSaveBlog = async () => {
        if (!selectedTitle || !content) return alert("Title and content are required");
        setLoading(true);
        try {
            const data = await createBlogApi({
                title: selectedTitle,
                blog_content: content,
                image_url: null // No image yet
            });
            setSavedBlogId(data.blog.id);
            setStep(4);
            alert("Blog saved successfully!");
        } catch (err) {
            alert("Failed to save blog");
        }
        setLoading(false);
    };

    // STEP 5 Generate Image (after save)
    const handleGenerateImage = async () => {
        if (!savedBlogId) {
            setLoading(false);
            return alert("Save the blog first");
        }

        setLoading(true);
        try {
            const data = await generateImageApi(savedBlogId);
            setImageUrl(data.imageUrl);
            alert("Image generated successfully!");
        } catch (err) {
            alert("Failed to generate image");
        }
        finally {
            setLoading(false);
        }
    };

    // Final Go to Dashboard
    const handleFinish = () => {
        navigate("/admin/dashboard");
    };

    return (
        <div>
            <Navbar />
            <div className="p-8 max-w-3xl mx-auto">
                <h1 className="mb-8 text-2xl font-bold">Create New Blog</h1>

                {/* STEP 1 Topic Input */}
                <section className="mb-8 p-6 border border-gray-300 rounded-lg">
                    <h3 className="mb-4 text-lg font-semibold">Step 1: Enter Topic</h3>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded mb-4"
                        placeholder="e.g. Parenting in the digital age"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        disabled={step > 1}
                    />
                    <button
                        onClick={handleGenerateTitles}
                        disabled={loading || step > 1}
                        className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-400 cursor-pointer"
                    >
                        {loading && step === 1 ? "Generating..." : "Generate Titles"}
                    </button>
                </section>

                {/* STEP 2 Select Title */}
                {step >= 2 && (
                    <section className="mb-8 p-6 border border-gray-300 rounded-lg">
                        <h3 className="mb-4 text-lg font-semibold">Step 2: Select a Title</h3>
                        {titles.map((title, i) => (
                            <div key={i} className="mb-3">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="title"
                                        checked={selectedTitle === title}
                                        onChange={() => handleSelectTitle(title)}
                                        disabled={step > 2}
                                        className="mr-3"
                                    />
                                    {title}
                                </label>
                            </div>
                        ))}
                        <button
                            onClick={handleGenerateContent}
                            disabled={loading || !selectedTitle || step > 2}
                            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400 cursor-pointer"
                        >
                            {loading && step === 2 ? "Generating..." : "Generate Content"}
                        </button>
                    </section>
                )}

                {/* STEP 3 Edit Content */}
                {step >= 3 && (
                    <section className="mb-8 p-6 border border-gray-300 rounded-lg">
                        <h3 className="mb-4 text-lg font-semibold">Step 3: Edit Content</h3>
                        <textarea
                            className="w-full h-96 p-3 border border-gray-300 rounded font-mono mb-4"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={step > 3}
                        />

                        <h4 className="mb-2 font-medium">Preview:</h4>
                        <div className="border border-gray-200 p-4 bg-gray-50 max-h-72 overflow-auto mb-4 rounded">
                            <Markdown>{content}</Markdown>
                        </div>

                        <button
                            onClick={handleSaveBlog}
                            disabled={loading || step > 3}
                            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400 cursor-pointer"
                        >
                            {loading && step === 3 ? "Saving..." : "Save Blog"}
                        </button>
                    </section>
                )}

                {/* STEP 4 Generate Image (After Save) */}
                {step >= 4 && (
                    <section className="mb-8 p-6 border border-gray-300 rounded-lg">
                        <h3 className="mb-4 text-lg font-semibold">Step 4 Generate Featured Image (Optional)</h3>
                        <p className="mb-4 text-gray-600">
                            The image will be generated based on this blog title <strong>{selectedTitle}</strong>
                        </p>

                        {imageUrl && (
                            <div className="mb-4">
                                <img src={imageUrl} alt="Blog cover" className="w-full rounded-lg" />
                            </div>
                        )}

                        <button
                            onClick={handleGenerateImage}
                            disabled={loading}
                            className="px-5 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-orange-400 mr-4 cursor-pointer"
                        >
                            {loading ? "Generating..." : imageUrl ? "Regenerate Image" : "Generate Image"}
                        </button>

                        <button
                            onClick={handleFinish}
                            className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                        >
                            Finish & Go to Dashboard
                        </button>
                    </section>
                )}

            </div>
        </div>
    );
};

export default CreateBlog;
