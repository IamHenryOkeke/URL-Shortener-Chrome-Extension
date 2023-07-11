const formContainer = document.getElementById("url-form");
const shortUrlContainer = document.getElementById("short-url");
const longUrlContainer = document.getElementById("long-url");
const errorContainer = document.getElementById("error");

const copyLink = () => {
    // navigator.clipboard.writeText(`${window.location}`);
    navigator.clipboard.writeText(shortUrlContainer.textContent);
    alert("Copied link: " + shortUrlContainer.textContent);
}

document.querySelector("#input_url").value = window.location.href;

formContainer.addEventListener("submit", async (e) => {
    e.preventDefault();

    shortUrlContainer.textContent = "";
    longUrlContainer.textContent = "";
    errorContainer.textContent = "";

    const urlInputValue = document.querySelector("#input_url").value;
    
    if (urlInputValue === "" || urlInputValue === null) {
        alert("Please enter a link")
    } else {
        const apiUrl = `https://api.shrtco.de/v2/shorten?url=${urlInputValue}`
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data);
            const longLink = data.result.original_link;
            const shortLink = data.result.full_short_link;
            // display the generated link in UI
            shortUrlContainer.textContent = `Short link: ${shortLink}`;
            longUrlContainer.textContent = `Long link: ${longLink}`;
        } 
        catch (error) {
            const response = await fetch(apiUrl);
            const data = await response.json();
            errorContainer.textContent = data.error;
        }
    }
    
})