"use client";

import { useState } from "react";

export default function PopupComponent({ onClose }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        aim: "",
        estimatedHours: "", // ✅ Added
        preferredYouTuber: "", // ✅ Added
        preferredLanguage: "english", // ✅ Added default value
        skills: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading spinner

        console.log("Form Data:", formData); // ✅ Log form data before sending

        const prompt = `Please provide the complete, unabridged response to full DSA roadmap. I have learned C++. I want this roadmap in the perspective of YouTube search, so give me searches accordingly, divided into 30-minute spans.  
        Divide the whole plan into days, with 2 hours per day.  
        You can break topics as needed—there is no requirement to complete a topic in 30 minutes or one day. If a topic requires more time, allocate it accordingly. If a topic doesn't require 30 minutes, you may reduce its time.  
        Provide the entire response in one go without truncating.  
        
        **Format:**  
        Day: [Day Number]  
        Topic Name:
        Time allotted: 30 MIN  
        To search: "[Search Query]"  
        Time allotted: 30 MIN  
        To search: "[Search Query]"  
        ...`;

        try {
            const response = await fetch("/api/gemini", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: prompt }),
            });

            const data = await response.json();
            console.log("Gemini Response:", data);

            localStorage.setItem("geminiData", JSON.stringify(data));

            // extracting queries form the reponse 

            const responseString = JSON.stringify(data); // ✅ Convert object to string (if needed)


            // Step 1: Convert \" to normal "
            const cleanedString = responseString.replace(/\\"/g, '"');

            console.log(JSON.stringify(cleanedString));
            const fixedString = cleanedString.replace(/\\n/g, '\n');
            // Step 2: Extract topic names using regex
            const topicMatches = [...fixedString.matchAll(/Topic Name:\s*(.*?)\n/g)];
            const topics = topicMatches.map(match => match[1].trim());

            const searchQueries = cleanedString.match(/To search: "(.*?)"/g)?.map(item => item.slice(12, -1)) || [];
            console.log("Extracted Queries:", searchQueries);
            let results = [];
            let queryIndex = 0;

            topics.forEach((topic, i) => {
                let queries = [];

                // Collect all queries **until the next topic appears** or end of the list
                while (queryIndex < searchQueries.length) {
                    if (i < topics.length - 1 && fixedString.indexOf(topics[i + 1]) < fixedString.indexOf(searchQueries[queryIndex])) {
                        break; // Stop collecting queries when the next topic starts
                    }
                    queries.push(searchQueries[queryIndex]);
                    queryIndex++;
                }

                results.push({ name: topic, queries });
            });
            const outputString = JSON.stringify(results, null, 2);

            // Store it in local storage
            localStorage.setItem("structuredOutput", outputString);

// fetching from youtube 
const storedOutput = localStorage.getItem("structuredOutput");
const topicsData = storedOutput ? JSON.parse(storedOutput) : [];

// Replace with your API key
async function fetchYouTubeLink(query) {
    const apiKey = "AIzaSyARjEHDfb4VdEpGE00zXYJqlmNzSsidKn4"; // Replace with your API key
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${apiKey}&maxResults=5`;

    try {
        const response = await fetch(searchUrl);
        const data = await response.json();

        if (data.items.length === 0) return [];

        // Extract video IDs from the search response
        const videoIds = data.items.map(item => item.id.videoId).join(",");

        // Fetch video details to get duration
        const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${apiKey}`;
        const detailsResponse = await fetch(detailsUrl);
        const detailsData = await detailsResponse.json();

        let validVideos = [];

        // Filter videos that are 20 minutes or longer
        for (const video of detailsData.items) {
            const duration = video.contentDetails.duration; // Example: "PT21M45S"
            const match = duration.match(/PT(\d+)M(\d+)?S?/); 

            if (!match) continue;

            const minutes = parseInt(match[1]) || 0;
            if (minutes >= 5) { // Change here for 20 min filter
                validVideos.push(`https://www.youtube.com/watch?v=${video.id}`);
            }
        }

        return validVideos; // Return all matching videos
    } catch (error) {
        console.error("Error fetching YouTube links:", error);
    }
    return []; // Return empty array if no valid videos are found
}

    
async function processTopics() {
    const newFormat = [];

    for (const topic of topicsData) {
        const topicName = topic.name;
        const queries = topic.queries;
        const links = [];

        // Fetch YouTube links for each query
        for (const query of queries) {
            const link = await fetchYouTubeLink(query);
            if (link) {
                links.push(link);
            }
        }

        // Push formatted data
        newFormat.push({
            name: topicName,
            queries: queries,
            link: links
        });
    }

    // Store the new structured format in localStorage
    localStorage.setItem("structuredOutputWithLinks", JSON.stringify(newFormat, null, 2));
    console.log("Updated Structured Output:", newFormat);
}

// Run the function to process topics
processTopics();




            alert("Form submitted successfully! 🚀"); // ✅ Show success only if API works
            onClose(); // ✅ Close form after successful submission
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong! ❌");
        } finally {
            setLoading(false); // Hide loading spinner
        }
    };


    return (
        <div className="fixed top-0  backdrop-blur-2xl min-h-screen w-full">
            <div className="min-h-screen flex items-center justify-center text-white">
                { loading ? (
                    // Loading Screen
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-white"></div>
                        <p className="ml-3">Submitting...</p>
                    </div>
                ) : (
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 relative">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Course Recommendation Form</h2>
                        <button
                            onClick={ onClose }
                            className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
                        > <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6"
                        >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg></button>

                        <form onSubmit={ handleSubmit }>
                            {/* Aim */ }
                            <div className="mb-4">
                                <label className="block text-gray-300">What is your goal/aim?</label>
                                <input
                                    type="text"
                                    name="aim"
                                    value={ formData.aim }
                                    onChange={ handleChange }
                                    className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring focus:ring-blue-500"
                                    placeholder="e.g., Become a Full Stack Developer"
                                    required
                                />
                            </div>

                            {/* Estimated Completion Date */ }
                            <div className="mb-4">
                                <label className="block text-gray-300">Daily study time  (in hours)</label>
                                <input
                                    type="number"
                                    name="estimatedHours"
                                    value={ formData.estimatedHours }
                                    onChange={ handleChange }
                                    className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring focus:ring-blue-500"
                                    min="1"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-300">Your Preferred YouTuber</label>
                                <textarea
                                    name="preferredYouTuber"
                                    value={ formData.preferredYouTuber }
                                    onChange={ handleChange }
                                    className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring focus:ring-blue-500"
                                    rows="3"
                                    placeholder="Enter your favorite YouTuber..."
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-300">Select Language</label>
                                <select
                                    name="preferredLanguage"
                                    value={ formData.preferredLanguage }
                                    onChange={ handleChange }
                                    className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring focus:ring-blue-500"
                                >
                                    <option value="english">English</option>
                                    <option value="hindi">Hindi</option>
                                </select>
                            </div>


                            {/* Previous Skills */ }
                            <div className="mb-4">
                                <label className="block text-gray-300">Any skills you have previously?</label>
                                <textarea
                                    name="skills"
                                    value={ formData.skills }
                                    onChange={ handleChange }
                                    className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring focus:ring-blue-500"
                                    placeholder="e.g., Basic HTML, Python, Data Structures"
                                ></textarea>
                            </div>

                            {/* Submit Button */ }
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium"
                            >
                                Submit
                            </button>
                        </form>
                    </div>) }
            </div>  

        </div>
    );
}
