// https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=alisha
// https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=34145937
const sportsPlayerNameLoad = (id) => {
  //   const searchPlayer = document.getElementById("search-player");
  //   const inputValue = searchPlayer.value;
  const searchId = id;
  const URL = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchId}`;
  console.log(URL);
  fetch(URL)
    .then((res) => res.json())
    .then((data) => displayData(data.player));
};

const displayData = (data) => {
  const playersContainer = document.getElementById("players-container");
  playersContainer.innerHTML = "";
  //   display no result found
  const noResult = document.getElementById("no-result");
  if (!data) {
    noResult.classList.remove("d-none");
    return;
  } else {
    noResult.classList.add("d-none");
  }
  //   console.log(data);
  data.forEach((singleData) => {
    // console.log(singleData);
    const { strPlayer, strNationality, strThumb, idPlayer } = singleData;
    const createDiv = document.createElement("div");
    createDiv.classList.add("col");
    createDiv.innerHTML = `
   <div class="card">
   <img src="${
     strThumb ? strThumb : "Not Image found"
   }" class="card-img-top" alt="${strThumb ? strThumb : "Not Image found"}" />
   <div class="card-body">
     <h5 class="card-title">${strPlayer}</h5>
     <p class="card-text">
        ${strNationality}
     </p>
     <button onclick="showDetails('${idPlayer}')" class="btn btn-primary">Details</button>
   </div>
 </div>

   `;
    playersContainer.appendChild(createDiv);
  });
};

const showDetails = (id) => {
  const URL = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => displayShowDetails(data.players[0]));
};

const displayShowDetails = (data) => {
  console.log(data);
  const {
    strDescriptionEN,
    strWeight,
    strNumber,
    strHeight,
    strGender,
    strBirthLocation,
    strTeam,
    dateBorn,
    strThumb,
  } = data;
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
  <h2>About</h2>
  <img src="${
    strThumb ? strThumb : "Not Image found"
  }" class="card-img-top w-50" alt="${
    strThumb ? strThumb : "Not Image found"
  }" />
  <p class="mt-2">${
    strDescriptionEN ? strDescriptionEN.slice(0, 510) : "no description"
  }...</p>
  <p>Born: ${dateBorn} </p>
  <p>Birth Location: ${strBirthLocation}</p>
  <p>Gender: ${strGender} </p>
  <p>Height: ${strHeight ? strHeight : "No Height"}</p>
  <p>Weight: ${strWeight ? strWeight : "No Weight"}</p>
  <p>Club: ${strTeam ? strTeam : "No Team"}</p>
  <p>Number: ${strNumber}</p>


  `;
};

// search player
const searchPlayers = () => {
  document.getElementById("details-container").innerHTML = "";
  const searchPlayer = document.getElementById("search-player");
  const inputValue = searchPlayer.value;
  if (!inputValue) {
    alert("please type your value");
    return;
  }

  sportsPlayerNameLoad(inputValue);
};

// keypress search
document
  .getElementById("search-player")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchPlayers();
    }
  });

// search button
document.getElementById("search-btn").addEventListener("click", function () {
  searchPlayers();
});

sportsPlayerNameLoad("messi");
