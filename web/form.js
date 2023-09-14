import {server} from "./server.js"

const form = document.querySelector("#form")
const input= document. querySelector("#url")
const content= document.querySelector("#content")

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    content.classList.add("placeholder")

    const videoURL= input.value
    if(!videoURL.includes("shorts")){
       
        return content.textContent= "Esse vídeo não parece ser um short."
    }

    const [_, element2]= videoURL.split("/shorts/") //_ omite a primeira posição, pois queremos só a 2ª
    const [videoID]= element2.split("?si") //videoID pega apenas a 1ª posição
  

    content.textContent= "Obtendo o texto do áudio..."

    const transcription= await server.get("/summary/" + videoID)

    content.textContent= "Realizando o resumo..."

    const summary= await server.post("/summary", {
        text: transcription.data.result,
    })

    content.textContent= summary.data.result
    content.classList.remove("placeholder")



})