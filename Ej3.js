

const champs = [
    {
      "id": 1,
      "name": "Humano",
      "avatar": "./public/images/humano.jpg",
      "icon": "./public/images/faceHuman.png",
      "damage": [
        "6d6",
        "2d10",
        "1d20"
      ],
      "critic": 10,
      "defense": 10,
      "vitality": 250
    },
    {
      "id": 2,
      "name": "Enano",
      "avatar": "./public/images/enano.jpg",
      "icon": "./public/images/faceDwarf.jpg",
      "damage": [
        "8d4",
        "3d10"
      ],
      "critic": 9,
      "defense": 15,
      "vitality": 325
    },
    {
      "id": 3,
      "name": "Licántropo",
      "avatar": "./public/images/licantropo.jpg",
      "icon": "./public/images/faceWerewolf.jpg",
      "damage": [
        "4d10",
        "2d20"
      ],
      "critic": 10,
      "defense": 4,
      "vitality": 250
    },
    {
      "id": 4,
      "name": "Orco",
      "avatar": "./public/images/orco.jpg",
      "icon": "./public/images/faceOrc.png",
      "damage": [
        "3d20"
      ],
      "critic": 15,
      "defense": 12,
      "vitality": 300
    },
    {
      "id": 5,
      "name": "Elfo",
      "avatar": "./public/images/elfo.jpg",
      "icon": "./public/images/faceElf.png",
      "damage": [
        "12d6"
      ],
      "critic": 6,
      "defense": 8,
      "vitality": 225
    }
  ]




// ------------------------------------------------------------------------------------

const champList$$ = document.querySelector("[data-function='fn-champList']");
const champSelect$$ = document.querySelector("[data-function='fn-champSelect']");
const gameBoard$$ = document.querySelector("[data-function='fn-gameBoard']");
const rollingDice$$ = document.querySelector("[data-function='fn-rollingDice']");



async function displayChampions() {
  // const champs = await fetch("http://localhost:3000/characters").then(res => res.json());

  for (const c of champs) {
    const div$$ = document.createElement("div");

    div$$.innerHTML = 
      ` <img src='${c.avatar}' class='champAvatar'>
        <h3 class='champListHeading'>${c.name}</h3>
        <p><img src='./public/images/iconHP.png'> HP: ${c.vitality}</p>
        <p><img src='./public/images/iconDef.png'> Def: ${c.defense}</p>
        <p><img src='./public/images/iconCrit.png'> Crit: ${c.critic}</p>
        <p><img src='./public/images/iconAD.png'> Dmg: ${c.damage.join(' ')}</p>
      `
    
      champList$$.appendChild(div$$);
  }
  displayChampSelect(champs);
}


function displayChampSelect(champs) {

  function displayPlayer(n) {

    const outer$$ = document.createElement("div");
    outer$$.classList.add("champSelect-outer")
    if (n === 2) {
      outer$$.classList.add("player2");
      outer$$.classList.add("rowReverse");
    } else {outer$$.classList.add("player1")};
    const heading$$ = document.createElement("h2");
    heading$$.textContent = "Jugador " + n;
    outer$$.appendChild(heading$$);

    const inner$$ = document.createElement("div");
    inner$$.classList.add("champSelect-inner");
    if (n === 2) {inner$$.classList.add("rowReverse")};
    outer$$.appendChild(inner$$);

    const selector$$ = document.createElement("div");
    selector$$.setAttribute("data-playerNum", n);
    selector$$.classList.add("champSelect-selector");
    inner$$.appendChild(selector$$);

    for (const c of champs) {

      const avatar$$ = document.createElement("img");
      avatar$$.setAttribute("src", c.avatar);
      avatar$$.setAttribute("data-champId", c.id);
      avatar$$.classList.add("champSelect-avatar");
      avatar$$.classList.add("displayNone", "hidden");
      inner$$.appendChild(avatar$$);

      const btn$$ = document.createElement("button");
      btn$$.innerHTML = `<img src=${c.icon}> ${c.name}`
      btn$$.setAttribute("data-champId", c.id)
      selector$$.appendChild(btn$$);
      btn$$.addEventListener("click", () => {
        const avatarList = inner$$.querySelectorAll(".champSelect-avatar");
        const buttonList = selector$$.querySelectorAll("button");
        for (let i = 0; i < buttonList.length; i++) {
          avatarList[i].classList.add("displayNone", "hidden");
          buttonList[i].classList.remove("selectedChamp");
          if (buttonList[i].getAttribute("data-champId") == c.id) {
            buttonList[i].classList.add("selectedChamp");
          }
          if (avatarList[i].getAttribute("data-champId") == c.id) {
            avatarList[i].classList.remove("displayNone");
            setTimeout( () => avatarList[i].classList.remove("hidden") , 50); 
          }
          
        }

      });

      
    }

    champSelect$$.appendChild(outer$$);
  }

  const playBtnWrap$$ = document.createElement("div");
  const playBtn$$ = document.createElement("a");
  playBtn$$.setAttribute("href", "#champSelect");
  playBtn$$.classList.add('playBtn');
  playBtn$$.innerHTML = "<img src='./public/images/Fight-300x146.png'>"

  playBtnWrap$$.innerHTML =
    `<p class='errorMsg displayNone' data-function='fn-p1error'>J1 no ha elegido campeón</p>
     <p class='errorMsg displayNone' data-function='fn-p2error'>J2 no ha elegido campeón</p>
    `
  playBtnWrap$$.prepend(playBtn$$);

  displayPlayer(1);
  champSelect$$.appendChild(playBtnWrap$$);
  displayPlayer(2);

  playBtn$$.addEventListener("click", () => startGame(champs));

}

function resetGame() {
  gameBoard$$.innerHTML = "";
  p1error$$ = document.querySelector("[data-function='fn-p1error']");
  p2error$$ = document.querySelector("[data-function='fn-p2error']");
  p1error$$.classList.add("displayNone");
  p2error$$.classList.add("displayNone");
}

function startGame(champs) {

  resetGame();

  const p1List = document.querySelector("[data-playerNum='1']").querySelectorAll("button");
  const p2List = document.querySelector("[data-playerNum='2']").querySelectorAll("button");

  let p1ChampId = 0;
  let p2ChampId = 0;

  for (const x of p1List) {
    if (x.classList.contains("selectedChamp")) {
      p1ChampId = x.getAttribute("data-champId");
      break;
    }
  }
  for (const x of p2List) {
    if (x.classList.contains("selectedChamp")) {
      p2ChampId = x.getAttribute("data-champId");
      break;
    }
  }

  p1error$$ = document.querySelector("[data-function='fn-p1error']");
  p2error$$ = document.querySelector("[data-function='fn-p2error']");

  if (p1ChampId == 0) {
    p1error$$.classList.remove("displayNone");
  }
  if (p2ChampId == 0) {
    p2error$$.classList.remove("displayNone");
  }

  if (p1ChampId != 0 && p2ChampId != 0) {
    rollingDice$$.classList.remove("displayNone");
    playGame(champs.find(c => c.id == p1ChampId), champs.find(c => c.id == p2ChampId));
    setTimeout(() => rollingDice$$.classList.add("displayNone"), 2500);
  }

}


function playGame(p1,p2) {
  
  const firstPlayer = Math.random() < 0.5 ? 1 : 2;
  let vit1 = p1.vitality;
  let vit2 = p2.vitality;
  let turn = firstPlayer;
  let round = 1;

  while (vit1 > 0 && vit2 > 0) {
    const battleRes = battle(turn, vit1, vit2, p1, p2);
    displayBattle(round, turn, battleRes);
    vit1 = battleRes[0];
    vit2 = battleRes[1];
    round += 1;
    turn = turn === 1 ? 2 : 1;
  }

  displayGameResult(round, vit1, vit2, p1.name, p2.name);
}


function battle(turn, vit1, vit2, p1, p2) {
  const dmg  = turn === 1 ? p1.damage  : p2.damage;
  const crit = turn === 1 ? p1.critic  : p2.critic;
  const def  = turn === 1 ? p2.defense : p1.defense;
  let totalDmg = 0;
  let dmgList = [];

  const rollDice = max => Math.floor(Math.random() * max ) + 1;

  for (const damage of dmg) {
    const d = damage.split('d');
    for (let i = 0; i < d[0]; i++) {
      const roll = rollDice(d[1]);
      if (roll == crit) {
        totalDmg += roll*2;
        dmgList.push(roll + " x2");
      }
      else {
        totalDmg += roll;
        dmgList.push(roll);
      }
      
    }
  }

  const leftVit1 = turn === 1 ? vit1 : vit1 - (totalDmg - def);
  const leftVit2 = turn === 2 ? vit2 : vit2 - (totalDmg - def);

  return [leftVit1, leftVit2, totalDmg, totalDmg - def, dmgList];

}


function displayBattle(round, turn, battleRes) {

  const wrapper$$ = document.createElement("div");
  wrapper$$.classList.add("battle");
  wrapper$$.classList.add("player" + turn);

  wrapper$$.innerHTML = 
    `<h6>Ronda nº ${round}</h6>
     <h4>¡J${turn} ataca!</h4>
     <span>Daño:</span>
     <ul></ul>
     <p>Daño total: ${battleRes[2]}</p>
     <p>Daño mitigado: ${battleRes[3]}</p>
     <p>Vit restante del J1: ${battleRes[0]}</p>
     <p>Vit restante del J2: ${battleRes[1]}</p>
    `

  dmg$$ = wrapper$$.querySelector("ul");
  for (const d of battleRes[4]) {
    const d$$ = document.createElement("li");
    d$$.innerHTML = d;
    dmg$$.appendChild(d$$);
  }

  gameBoard$$.appendChild(wrapper$$);

}


function displayGameResult(round, vit1, vit2, p1, p2) {

  const gameResult$$ = document.createElement("div");
  gameResult$$.classList.add("gameResult");
  gameBoard$$.appendChild(gameResult$$);

  const winner = vit1 > 0 ? 1 : 2;
  const loser = vit1 > 0 ? 2 : 1;
  const winnerRace = winner === 1 ? p1 : p2;
  const loserRace = loser === 1 ? p1 : p2;
  const winnerVit = winner === 1 ? vit1 : vit2
  const loserVit  = loser === 1 ? vit1 : vit2

  gameResult$$.innerHTML =
    `<h2>Resultado</h2>
     <p class='winner'>Ganador: J${winner} <br/> (${winnerVit}vit, ${winnerRace})</p>
     <p class='loser'>Perdedor: J${loser} <br/> (${loserVit}vit, ${loserRace})</p>
     <p>Rondas: ${round - 1}</p>
    `

}
 

displayChampions();