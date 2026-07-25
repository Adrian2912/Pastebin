let isEditorEnabled = false, isDeletionEnabled = false;

function enableEditor() {
    if(!isEditorEnabled) {
        isEditorEnabled = true;
        document.getElementById("editorSquare").style.display = "block";
    }
}

function enableDeletion() {
    if (!isDeletionEnabled) {
        isDeletionEnabled = true;
        document.getElementById("deletionSquare").style.display = "block";
    }
}

function returnToThePage() {
    if (isDeletionEnabled) {
        isDeletionEnabled = false;
        document.getElementById("deletionSquare").style.display = "none";
    }
}