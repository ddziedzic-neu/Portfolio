async function getDailyQuote() {
try {
    // ZenQuotes does not allow direct calls from client side JS like this, so I had to first reroute through a CORS proxy like allorigins. 
    // ChatGPT provided the solution to the CORS issue.
    const response = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://zenquotes.io/api/random"));
    const data = await response.json();
    const parsed = JSON.parse(data.contents);

    // API returns an array with one object: [{q:quote, a:author}]
    const quoteText = parsed[0].q;
    const quoteAuthor = parsed[0].a;

    document.getElementById("quote").innerText = `"${quoteText}" — ${quoteAuthor}`;
} catch (error) {
    console.error("Error fetching quote:", error);
    document.getElementById("quote").innerText = "Could not load quote.";
    }
}

const slides = document.querySelectorAll("#slideshow img");
let currentIndex = 0;

function showNextSlide() {
// hide current
    slides[currentIndex].classList.remove("active");
// move to next index
    currentIndex = (currentIndex + 1) % slides.length;
// show next
    slides[currentIndex].classList.add("active");
}

// changes the image every 3 seconds
setInterval(showNextSlide, 3000);

//runs every time on page load
getDailyQuote();