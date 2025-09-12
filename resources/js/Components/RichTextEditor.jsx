import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ value, onChange }) => {
    return (
        <ReactQuill
            value={value} // controlled value
            onChange={onChange} // updates parent's state
            modules={{
                toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline"],
                    ["image", "link"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["clean"],
                ],
            }}
            formats={[
                "header",
                "bold",
                "italic",
                "underline",
                "image",
                "link",
                "list",
                "bullet",
            ]}
            theme="snow"
        />
    );
};

export default RichTextEditor;
