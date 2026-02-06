const items = [
  { id: 1, name: "Lame d'Infini", startingBid: 3400 },
  { id: 2, name: "Lame du Roi Déchu", startingBid: 3200 },
  { id: 3, name: "Salutations de Dominik", startingBid: 3000 },
  { id: 4, name: "Danseur Fantôme", startingBid: 2800 },
  { id: 5, name: "Percepteur", startingBid: 3000 },
  { id: 6, name: "Tueur de Krakens", startingBid: 3000 },
  { id: 7, name: "Arc-Bouclier Immortel", startingBid: 3000 },
  { id: 8, name: "Soif-de-Sang", startingBid: 3400 },
  { id: 9, name: "Épée Sanglante", startingBid: 3200 },
  { id: 10, name: "Rancune de Serylda", startingBid: 3200 },
  { id: 11, name: "Cyclosabre Voltaïque", startingBid: 2900 },
  { id: 12, name: "Opportunité", startingBid: 2700 },
  { id: 13, name: "Manteau de la Nuit", startingBid: 2800 },
  { id: 14, name: "Hydre Profane", startingBid: 3400 },
  { id: 15, name: "Lame Spectre de Youmuu", startingBid: 2700 },
  { id: 16, name: "Coiffe de Rabadon", startingBid: 3600 },
  { id: 17, name: "Sablier de Zhonya", startingBid: 3250 },
  { id: 18, name: "Bâton du Vide", startingBid: 3000 },
  { id: 19, name: "Compagnon de Luden", startingBid: 3000 },
  { id: 20, name: "Tourment de Liandry", startingBid: 3000 },
  { id: 21, name: "Éclat de Glace Noire", startingBid: 2900 },
  { id: 22, name: "Fléau de Liche", startingBid: 3100 },
  { id: 23, name: "Créateur de Failles", startingBid: 3100 },
  { id: 24, name: "Flamme-ombre", startingBid: 3200 },
  { id: 25, name: "Sceptre de Rylai", startingBid: 2600 },
  { id: 26, name: "Bâton des Ages", startingBid: 2600 },
  { id: 27, name: "Abyssal Mask", startingBid: 2400 },
  { id: 28, name: "Onde Orageuse", startingBid: 2900 },
  { id: 29, name: "Voleur d'Âmes de Mejai", startingBid: 1500 },
  { id: 30, name: "Sablier de Zhonya", startingBid: 3000 },
  { id: 31, name: "Cœur d'Acier", startingBid: 3000 },
  { id: 32, name: "Égide de la Flamme Solaire", startingBid: 2700 },
  { id: 33, name: "Cœur Gelé", startingBid: 2500 },
  { id: 34, name: "Présage de Randuin", startingBid: 2700 },
  { id: 35, name: "Armure de Warmog", startingBid: 3100 },
  { id: 36, name: "Visage Spirituel", startingBid: 2800 },
  { id: 37, name: "Force de la Nature", startingBid: 2800 },
  { id: 38, name: "Plaque du Mort", startingBid: 2900 },
  { id: 39, name: "Gantelet Givrant", startingBid: 2600 },
  { id: 40, name: "Rayonnement du Vide", startingBid: 2800 },
  { id: 41, name: "Désespoir Indéfini", startingBid: 2800 },
  { id: 42, name: "Rookern Kaenic", startingBid: 2900 },
  { id: 43, name: "Cotte d'Épines", startingBid: 2700 },
  { id: 44, name: "Force de la Trinité", startingBid: 3333 },
  { id: 45, name: "Couperet Noir", startingBid: 3000 },
  { id: 46, name: "Gage de Sterak", startingBid: 3100 },
  { id: 47, name: "Danse de la Mort", startingBid: 3200 },
  { id: 48, name: "Hydre Titanesque", startingBid: 3300 },
  { id: 49, name: "Hydre Vorace", startingBid: 3300 },
  { id: 50, name: "Ciel Éventré", startingBid: 3100 },
  { id: 51, name: "Encensoir Ardent", startingBid: 2300 },
  { id: 52, name: "Bâton des Flots", startingBid: 2300 },
  { id: 53, name: "Rédemption", startingBid: 2300 },
  { id: 54, name: "Vœu du Chevalier", startingBid: 2200 },
  { id: 55, name: "Convergence de Zeke", startingBid: 2200 },
  { id: 56, name: "Médaillon de l'Iron Solari", startingBid: 2200 },
  { id: 57, name: "Rêve Éveillé", startingBid: 800 },
  { id: 58, name: "Chant de Guerre de Shurelya", startingBid: 2200 },
  { id: 59, name: "Mikael's Blessing", startingBid: 2300 },
  { id: 60, name: "Ange Gardien", startingBid: 3000 }
];


let currentItemIndex = 0;
let currentAuction = {
  ...items[0],
  highestBid: items[0].startingBid,
  highestBidder: null,
  timeLeft: 15
};

let players = {};







const express = require('express');
const app = express();
app.use(express.json());
app.use(require('cors')());

// API REST (rejoindre)
app.post('/api/join', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Nom requis" });
  
  //  joueur temp
  const newPlayer = {
    name: name,
    coins: 15000 
  };
  
  res.status(201).json(newPlayer);
});





const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" }
});


function startAuction() {
  currentAuction.timeLeft = 15;
  
  const timer = setInterval(() => {
    currentAuction.timeLeft--;

    if (currentAuction.timeLeft <= 0) {
      clearInterval(timer);
      finalizeAuction();
    } else {
      // Temps restant @everyone
      io.emit('TICK', currentAuction.timeLeft);
    }
  }, 1000);
}

function finalizeAuction() {
  if (currentAuction.highestBidder) {
    const winner = currentAuction.highestBidder;
    const price = currentAuction.highestBid;

    // Déductio pièces
    players[winner] -= price;
    io.emit('WINNER_ANNOUNCED', { winner, price, item: currentAuction.name });
    io.emit('REFRESH_ALL_COINS', players);
  }

  // Boucle continue : Objet suivant
  currentItemIndex = (currentItemIndex + 1) % items.length;
  const nextItem = items[currentItemIndex];
  
  currentAuction = {
    ...nextItem,
    highestBid: nextItem.startingBid,
    highestBidder: null,
    timeLeft: 15
  };

  io.emit('NEW_ITEM', currentAuction);
  startAuction(); 
}

io.on('connection', (socket) => {
  console.log(`Joueur connecté : ${socket.id}`);
  
  socket.emit('NEW_ITEM', currentAuction);

  socket.on('REGISTER_PLAYER', (name) => {
    players[name] = players[name] || 15000; 
    socket.emit('UPDATE_COINS', players[name]);
    console.log(`${name} a rejoint avec ${players[name]} pièces`);
  });

  socket.on('PLACE_BID', (data, callback) => {
    const { amount, playerName } = data;
    const playerCoins = players[playerName] || 0;

    if (amount <= currentAuction.highestBid) {
      return callback({ status: "ERROR", message: "L'enchère doit être strictement supérieure." });
    }
    if (playerCoins < amount) {
      return callback({ status: "ERROR", message: "Vous n'avez pas assez de pièces." });
    }

    currentAuction.highestBid = amount;
    currentAuction.highestBidder = playerName;

    callback({ status: "SUCCESS" });
    io.emit('BID_UPDATED', {
      highestBid: currentAuction.highestBid,
      highestBidder: currentAuction.highestBidder
    });
  });

  socket.on('EARN_COIN', (data) => {
    const { playerName } = data;
    if (players[playerName] !== undefined) {
      players[playerName] += 1;
      socket.emit('UPDATE_COINS', players[playerName]);
      console.log(`${playerName} a gagné 1 pièce (total: ${players[playerName]})`);
    }
  });

  socket.on('disconnect', () => {
    console.log("Joueur déconnecté");
  });
});

server.listen(5000, () => {
  console.log("Serveur REST + Socket.IO = port 5000");
  startAuction();
});




