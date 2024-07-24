const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const API = {
    GetChatbotResponse: async message => {
        return new Promise(function (resolve, reject) {
            if (message === "hi") {
                resolve("Welcome to chatbot!");
            } else {
                const raw = JSON.stringify({
                    "contents": [
                        {
                            "parts": [
                                {
                                    "text": message
                                }
                            ]
                        }
                    ]
                });

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                };

                fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAjs5t0vlMQmRtU_vFV9QcGvADMOwRLHB0", requestOptions)
                    .then(response => response.json())
                    .then(result => {

                        console.log("resultresultresult", result.candidates[0].content.parts[0].text)
                        resolve(result.candidates[0].content.parts[0].text); // Adjust this based on the actual structure of the API response
                    })
                    .catch(error => {
                        console.error(error);
                        reject("Failed to fetch chatbot response");
                    });
            }
        });


    },
    getDialogFlow: async (message) => {





        return new Promise(function (resolve, reject) {
            const raw = JSON.stringify({
                "text": message,
                "userId": "dh-22-j3-"
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch("/api/chatbot", requestOptions)
                .then(response => response.json())
                .then(result => {

                    console.log("resultresultresult", result.fulfillmentMessages[0].text.text[0])
                    resolve(result.fulfillmentMessages[0].text.text[0]); // Adjust this based on the actual structure of the API response
                })
                .catch(error => {
                    console.error(error);
                    reject("Failed to fetch chatbot response");
                });
        });

    }
};

export default API;
