import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [item, setItem] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [userName, setUserName] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [bidAmount, setBidAmount] = useState(0);
  const [coins, setCoins] = useState(1000);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  const handleBid = () => {
    socket.emit('PLACE_BID', { 
      amount: parseInt(bidAmount), 
      playerName: userName 
    }, (response) => {
      if (response.status === "ERROR") {
        alert(response.message);
      } else {
        console.log("Enchère acceptée !");
      }
    });
  };

  const handleCoinClick = () => {
    socket.emit('EARN_COIN', { playerName: userName });
  };

  useEffect(() => {
    socket.on('NEW_ITEM', (data) => {
      setItem(data);
      setTimeLeft(15);
    });

    socket.on('TICK', (time) => {
      setTimeLeft(time);
    });

    socket.on('BID_UPDATED', (data) => {
      setItem(prev => ({ ...prev, ...data }));
    });

    socket.on('UPDATE_COINS', (amount) => setCoins(amount));
    
    socket.on('REFRESH_ALL_COINS', (allPlayers) => {
      // Solde mis à jour
      const myName = localStorage.getItem('auction_name'); 
      if (allPlayers[myName] !== undefined) setCoins(allPlayers[myName]);
    });

    socket.on('WINNER_ANNOUNCED', (data) => {
      alert(`Félicitations à ${data.winner} qui gagne ${data.item} pour ${data.price} pièces !`);
      setPurchaseHistory(prev => [...prev, { 
        winner: data.winner, 
        item: data.item, 
        price: data.price,
        timestamp: new Date().toLocaleTimeString()
      }]);
    });

    return () => {
      socket.off('NEW_ITEM');
      socket.off('TICK');
      socket.off('BID_UPDATED');
      socket.off('UPDATE_COINS');
      socket.off('REFRESH_ALL_COINS');
      socket.off('WINNER_ANNOUNCED');
    };
  }, []);

  const handleJoin = () => {
    fetch('http://localhost:5000/api/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName })
    }).then(() => {
      localStorage.setItem('auction_name', userName);
      socket.emit('REGISTER_PLAYER', userName); 
      setIsJoined(true);
    });
  };

  if (!isJoined) {
    return (
      <div style={{ 
        padding: '20px',
        backgroundImage: 'url("https://images6.alphacoders.com/130/thumb-1920-1303360.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '30px',
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <h2>Donnez votre nom pour entrer dans la forge de Ornn</h2>
          <input 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
            placeholder="Votre Pseudo" 
          />
          <button onClick={handleJoin}>Join</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      backgroundImage: 'url("https://images6.alphacoders.com/130/thumb-1920-1303360.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      position: 'relative'
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
        borderRadius: '15px',
        margin: '20px auto',
        maxWidth: '800px'
      }}>
        <h1> Magasin de Ornn </h1>
        <div style={{ marginBottom: '20px' }}>
          <h3>Votre solde: <strong>{coins} pièces</strong></h3>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={handleCoinClick}
            
          >
             +1 Pièce
          </button>
        </div>
        <div style={{ border: '2px solid black', padding: '20px', borderRadius: '10px' }}>
          {item && (
            <>
              <h2>Objet : {item.name}</h2>
              <h3>Temps restant : {timeLeft}s</h3>
              <p>Enchère actuelle : <strong>{item.highestBid} pièces</strong></p>
              <p>Meilleur offrant : {item.highestBidder || "Aucun"}</p>
              <input 
                type="number" 
                value={bidAmount} 
                onChange={(e) => setBidAmount(e.target.value)} 
              />
              <button onClick={handleBid}>Enchérir</button>
            </>
          )}
        </div>
        
        <div style={{ marginTop: '20px', border: '2px solid black', padding: '20px', borderRadius: '10px', maxHeight: '300px', overflowY: 'auto' }}>
          <h3>Historique des achats</h3>
          {purchaseHistory.length === 0 ? (
            <p>Aucun achat effectué pour le moment</p>
          ) : (
            <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left' }}>
              {purchaseHistory.map((purchase, index) => (
                <li key={index} style={{ 
                  marginBottom: '10px', 
                  padding: '8px', 
                  backgroundColor: '#f0f0f0', 
                  borderRadius: '5px',
                  borderLeft: purchase.winner === userName ? '4px solid green' : '4px solid gray'
                }}>
                  <strong>{purchase.winner}</strong> a acheté <strong>{purchase.item}</strong> pour <strong>{purchase.price} pièces</strong>
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                    {purchase.timestamp}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;



