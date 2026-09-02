const formElement = document.querySelector(".js-form");
const inputElement = document.querySelector(".js-input-element");
const submitButton = document.querySelector(".js-submit-button");
const listElement = document.querySelector(".js-results");

const apikeyCode = "at_v5GQYlvAHkVmH2JzFXbmJHsrncDNp";
let ipData = JSON.parse( localStorage.getItem("ipDetails")) || [];
//render data from local storage fi exists
renderHtml();


async function getIpDetails(searchParameter) {
    try {
        const response = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=${apikeyCode}&domain=${searchParameter}`);
        //error handling
      
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
         saveIpData(data);
           renderHtml();
           console.log(data)
        

        
        
    } catch (error) {
        console.error(error.message);
        
    }
};

formElement.addEventListener("submit", (e) => {//prevent page reloading 
    e.preventDefault();
    

});
submitButton.addEventListener("click", () => {
      getIpDetails(extractInputText());
   
     inputElement.value = " ";


});

function extractInputText() {
    const inputText = inputElement.value;
return inputText.trim();



}
//save ipdata
let detailsExits;
function saveIpData(ipDetails) {
    //check if ipdata exist if it does dont add
    ipData.forEach((data) => {
        if (ipDetails.ip === data.ip) {
            detailsExits = data;
        }

    })
    if(!detailsExits) {
        ipData.push(
            {
            ip: ipDetails.ip,
            region: ipDetails.location.region,
            timezone: ipDetails.location.timezone,
            isp: ipDetails.isp,
            asn: ipDetails.as.asn,
            country: ipDetails.location.country
        }
    );
    localStorage.setItem("ipDetails", JSON.stringify(ipData));
    }
 
}

function renderHtml() {
    let ipDetailsHtml = " ";
    ipData.forEach((ipdetail) => {
        ipDetailsHtml +=`<ul class="ipdata flex ">
        <li>
          IP Address
          <p class="details">${ipdetail.ip}</p>
        </li>
        <li>
          Location
          <p class="details location">${ipdetail.region} ${ipdetail.country} ${ipdetail.asn}</p>
        </li>
        <li>
          Timezone
          <p class="details">UTC_${ipdetail.timezone}</p>
        </li>
        <li>
          ISP
          <p class="details isp">${ipdetail.isp}</p>
        </li>
      </ul>
`

    }); 
     listElement.innerHTML = ipDetailsHtml;

  

}
//keyboard accessibility
inputElement.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        getIpDetails(extractInputText());
    }
});
showIpLocationOnMap();
function showIpLocationOnMap() {
const map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('Location')
    .openPopup(); 
   
}



