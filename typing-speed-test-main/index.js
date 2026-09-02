const textbox = document.querySelector("textarea");
const difficultyLevel = document.getElementById("difficulty")


const getData = async () => {
    const response = await fetch("/data.json")

    const data = await response.json()
    return data? JSON.parse(data): {}
}



const renderText = () => {
    const data = getData();
    const level = difficultyLevel.textContent.toLowerCase();

    const fullText = ``;

    data[level].forEach((textObject) => {
        fullText += textObject.text
    })

    console.log(fullText)


}