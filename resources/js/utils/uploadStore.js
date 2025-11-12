// Temporary in-memory storage for uploaded outlines (videos/files)
let uploadedOutlines = [];

export function setUploadedOutlines(outlines) {
    uploadedOutlines = outlines;
}

export function getUploadedOutlines() {
    return uploadedOutlines;
}
