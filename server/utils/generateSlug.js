export const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-").trim();
}