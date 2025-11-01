// utils/sanitizeHTML.js
import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
    "p", "br", "strong", "b", "em", "i", "u",
    "ul", "ol", "li", "a",
    "h1", "h2", "h3", "h4", "h5", "h6"
];
const ALLOWED_ATTR = ["href", "target", "rel"];

const sanitizeHTML = (html) => {
    if (!html || typeof html !== "string") return "";
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS,
        ALLOWED_ATTR,
        FORBID_TAGS: ["script", "style", "iframe", "form", "input", "button"],
    });
};


export default sanitizeHTML;