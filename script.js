let btn = document.querySelector("#btn")
let content = document.querySelector("#content")
let logo = document.querySelector("#logo")
let voice = document.querySelector("#voice")
let text = document.querySelector("#text")

//function to speak
function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="hi-GB"
    window.speechSynthesis.speak(text_speak)
}

//function to wish me according to time while moving cursor to the logo(kali image)
function wishMe(){
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12){
        speak("Good morning sir")
    }
    else if(hours>=12 && hours<16){
        speak("Good afternoon sir")
    }
    else{
        speak("Good evening sir")
    }
}
logo.addEventListener('click',()=>{
    wishMe()
})

//speech recognition
let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.onresult = (event)=>{
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText=transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>{
    recognition.start()
    btn.style.display="none"
    voice.style.display="block"
})

//api function to get weather data
const getWeather = async (latitude, longitude) => {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const data = await response.json();
        
        if (data.current_weather) {
            speak(`Temperature: ${data.current_weather.temperature}°C`);
            speak(`Wind Speed: ${data.current_weather.windspeed} km/h`);
            speak(`Location: Latitude ${latitude}, Longitude ${longitude}`);
            text.innerText = `Temperature: ${data.current_weather.temperature}°C
                             Wind Speed: ${data.current_weather.windspeed} km/h
                             Location: Latitude ${latitude}, Longitude ${longitude}`
            text.style.display="block"
            audio.play()
        } else {
            console.log("Weather data not found!");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

//function to take command 
function takeCommand(message){
    btn.style.display="flex"
    voice.style.display="none"

    if(message.includes("hello")||message.includes("hey")||message.includes("hi")){
        speak("hello sir,what can i help you?")
    }
    else if(message.includes("who are you")||message.includes("what is your name")||message.includes("hu r u")){
        speak("i am virtual assistant kaali ,created by Tilak raj mandal sir")
    }
    else if(message.includes("who created you")){
        speak("i am created by Tilak raj mandal sir")
    }
    else if(message.includes("open youtube")){
        speak("opening youtube...")
        window.open("https://www.youtube.com/","_blank")
    }
    else if(message.includes("open google")){
        speak("opening google...")
        window.open("https://www.google.com/","_blank")
    }
    else if(message.includes("open facebook")){
        speak("opening facebook...")
        window.open("https://www.facebook.com/","_blank")
    }
    else if(message.includes("open chat gpt")){
        speak("opening chatgpt...")
        window.open("https://www.chatgpt.com/","_blank")
    }
    else if(message.includes("time")){
        let time= new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time)
        text.innerText = time
        text.style.display="block"
        audio.play()
    }
    else if(message.includes("date")){
        let date= new Date().toLocaleString(undefined,{year:"numeric",day:"numeric",month:"short"})
        speak(date)
        text.innerText = date
        text.style.display="block"
        audio.play()
    }
    else if (message.toLowerCase().includes("search youtube")) {
        speak("searching in youtube...")
        let query = message.toLowerCase().replace("search youtube", "").trim();
        let searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
        window.open(searchUrl, "_blank"); // Opens in a new tab
    }
    else if(message.includes("weather")){
        getWeather(26.4525, 87.2718);
    }
    else{
        let finalText="this is what i found on internet regarding" + message.replace("kali","") || message.replace("kaali","")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("kali","")}`,"_blank")
    }
}