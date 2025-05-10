const salaBowling = {
    "giocatori": [], 
    "setScores": function(){
        if(this.giocatori[0].punteggio.length < 10){
            this.giocatori.forEach( (player)=> {
                let tiro = Math.floor( Math.random()* (11-0)+0);
                if(tiro == 10){
                    let imgS = document.createElement("img")
                    imgS.src = "https://cdn.dribbble.com/users/1833200/screenshots/18034163/media/4474eda0cec6fbb576f3c0f3290e5faa.gif"
                    imgS.classList.add("imgStrike")
                    document.body.appendChild(imgS)
                    setTimeout(()=>{
                        imgS.remove()
                    },3000)
                }
                player.punteggio.push(tiro)
                player.punteggioFinale = player.punteggio.reduce( (acc, num)=> acc + num, 0)
            })
        }
    },
    "nuovoGiocatore": function(nomeGiocatore) {
        this.giocatori.push({"name": nomeGiocatore, "punteggio": [], "punteggioFinale": 0} )
    },
    "setWinner": function(){
        this.giocatori.sort( (a, b)=> b.punteggioFinale - a.punteggioFinale )
        let vincitore = this.giocatori[0]
        let textWinner = document.createElement("h2")
        setTimeout(()=>{
        textWinner.classList.add("winner")
        textWinner.innerHTML= `Il vincitore è: ${vincitore.name}`
        document.body.appendChild(textWinner)
        },800)
        setTimeout(()=>{
            textWinner.remove()
        },4000)
        
        
        // console.log(`Il vincitore di questa partita è: ${vincitore.name}, al secondo posto ${this.giocatori[1].name} e al terzo posto ${this.giocatori[2].name}`)
    },
    "createPlayerRow":function() {
        trWrapper.innerHTML = ""
        this.giocatori.forEach( (player, index)=> {
            let tr = document.createElement("tr")
            tr.innerHTML = `
            <th scope = "row">${index+1}</th>
            <td>${player.name}</td>
            <td>${player.punteggio[0] ? player.punteggio[0] : 0}</td>
            <td>${player.punteggio[1] ? player.punteggio[1] : 0}</td>
            <td>${player.punteggio[2] ? player.punteggio[2] : 0}</td>
            <td>${player.punteggio[3] ? player.punteggio[3] : 0}</td>
            <td>${player.punteggio[4] ? player.punteggio[4] : 0}</td>
            <td>${player.punteggio[5] ? player.punteggio[5] : 0}</td>
            <td>${player.punteggio[6] ? player.punteggio[6] : 0}</td>
            <td>${player.punteggio[7] ? player.punteggio[7] : 0}</td>
            <td>${player.punteggio[8] ? player.punteggio[8] : 0}</td>
            <td>${player.punteggio[9] ? player.punteggio[9] : 0}</td>
            <td>${player.punteggioFinale}</td>
        `
            trWrapper.appendChild(tr) 
            
        })
    },
    "resetPunteggi": function() {
        this.giocatori.forEach((giocatore)=> {
            giocatore.punteggio = []
            giocatore.punteggioFinale = 0
        })
    },
    "resetPlayers": function() {
        this.giocatori = []
        
    },

    
}

// CREAZIONE ROW GIOCATORE
let trWrapper = document.querySelector("#trWrapper")

salaBowling.createPlayerRow()

// CREAZIONE MODALE MIN. 2 GIOCATORI

let modalAlert = new bootstrap.Modal(document.getElementById('modalAlert'), {
    keyboard: false
  });


// BOTTONE INIZIA PARTITA
let btnStart = document.querySelector("#btnStart")

btnStart.addEventListener("click", ()=> {
    if(salaBowling.giocatori.length <= 1) {
        modalAlert.show();
        // alert("Minimo due giocatori")
    }else {
        modalAlert.hide();
        btnStart.classList.add("d-none")
        btnPlay.classList.remove("d-none")
        btnSubmit.classList.add("d-none")
        btnResetPlayers.classList.add("d-none")
    }
})

// INSERISCI GIOCATORE

let inputName = document.querySelector("#inputNewPlayer")
let btnSubmit = document.querySelector("#btnSubmit")

btnSubmit.addEventListener("click", ()=> {
    if(inputNewPlayer.value.length >= 2){
        salaBowling.nuovoGiocatore(inputNewPlayer.value)
        salaBowling.createPlayerRow()
        inputNewPlayer.value = ""
    }else{
        alert("Nome non valido")
    }
})


// GIOCA TURNO

let btnPlay = document.querySelector("#btnPlay")

btnPlay.addEventListener("click", ()=> {
    salaBowling.setScores()
    salaBowling.createPlayerRow()
    if(salaBowling.giocatori[0].punteggio.length == 10){
        btnPlay.classList.add("d-none")
        btnLadder.classList.remove("d-none")
        
    }
})

// CLASSIFICA 
let btnLadder = document.querySelector("#btnLadder")

btnLadder.addEventListener("click", ()=>{
    salaBowling.setWinner()
    salaBowling.createPlayerRow()
    btnLadder.classList.add("d-none")
    btnResetPunti.classList.remove("d-none")
    btnResetPlayers.classList.remove("d-none")
    
})

//RESET PUNTEGGI
let btnResetPunti = document.querySelector("#btnResetPunti")

btnResetPunti.addEventListener( "click", ()=> {
    salaBowling.resetPunteggi()
    salaBowling.createPlayerRow()
    btnResetPunti.classList.add("d-none")
    btnSubmit.classList.remove("d-none")
    btnStart.classList.remove("d-none")
    
})

//RESET PLAYERS
let btnResetPlayers = document.querySelector("#btnResetPlayers")

btnResetPlayers.addEventListener("click",()=>{
    salaBowling.resetPlayers()
    salaBowling.createPlayerRow()
    btnResetPlayers.classList.add("d-none")
    btnResetPunti.classList.add("d-none")
    btnSubmit.classList.remove("d-none")
    btnStart.classList.remove("d-none")
})
