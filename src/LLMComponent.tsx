import React, { useState } from 'react';

interface ApiResponse {
    response: string;
}

const preprompt_case = "Foreslå mig 5 relevante keywords for den følgende projekt case på et sygehus. Formatér svaret sådan her: keyword, keyword, keyword, keyword, keyword. Svar intet andet end det.\n\n"

const LLMComponent: React.FC = () => {
    const [inputText, setInputText] = useState("")
    const [responseText, setResponseText] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [keywords, setKeywords] = useState([])
    const [fetching, setFetching] = useState(false)

    const fetchData = async (): Promise<void> => {
        const url = "http://localhost:11434/api/generate";
        const headers = { "Content-Type": "application/json" };
        const data = {
            model: "llama3.1:latest",
            // prompt: "Why is the sky blue?",
            prompt: preprompt_case + inputText,
            stream: false
        };

        try {
            setFetching(true)
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data),
            });

            setFetching(false)
            
            if (response.ok) {
                const jsonResponse: ApiResponse = await response.json(); 
                const actualResponse: string = jsonResponse.response;
                setResponseText(actualResponse);
            } else {
                const errorText: string = await response.text();
                setError(`Error: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            setError(`Fetch Error: ${(error as Error).message}`);
            setFetching(false)
        }
    };

    return (
        <div>
            <h1>AI-forslag til keywords</h1>
            <textarea 
                value={inputText} 
                onChange={e => setInputText(e.target.value)} 
                style={{ width: '600px', height: '200px', fontSize: '16px', padding: '10px' }}
            />
            <br/>
            <button onClick={fetchData}>Foreslå keywords</button>
            {fetching && <div>Henter foreslåede keywords...</div>}
            {responseText && <div><b>Foreslåede keywords:</b> <br/>
                {responseText}</div>}
            {error && <div>Error: {error}</div>}
        </div>
    );
};

export default LLMComponent;
