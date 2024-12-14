import { useState } from 'react';
import './App.css'
import AppRouter from './components/AppRouter';
import items from './config/items.js';
import round from './utils/round';
import getPurchasableItems from './utils/getPurchasableItems';

function App() {

  // Laskee niiden tuotteiden lukumäärän, joiden ostamiseen on varaa.
  const countBuyableItems = (items, balance) => {
    let total = 0;
    getPurchasableItems(items).forEach(item => {
      if (item.price <= balance) total++;
    });
    return total;
  }

  // Luodaan tilamuuttuja, johon tallennetaan tuotelista.
  const [storeitems,setStoreitems] = useState(items);
 
  // Esitellään pelin laskennalliset alkuarvot.
  const initialstats = {
    clicks: 0,
    balance: 0,
    increase: 1,
    itemstobuy: 0,
    upgrades: 0,
    collected: 0,
    countriesVisited: 0
  };

  // Luodaan tilamuuttuja, johon tallennetaan pelin laskennalliset tiedot.
  const [stats, setStats] = useState(initialstats);


  const handleClick = () => {
    // Tehdään kopio stats-tilamuuttujasta.
    let newstats = {...stats}
    // Kasvatetaan napautusten lukumäärää yhdellä.
    newstats.clicks = newstats.clicks + 1;
      // Kasvataan matkalaukkujen määrää kasvatusarvolla.
      newstats.balance = round(newstats.balance + newstats.increase, 1);
      // Lasketaan ostettavissa olevien tuotteiden lukumäärä.
      newstats.itemstobuy = countBuyableItems(storeitems,newstats.balance);
      // Kasvatetaan matkapisteiden keräysmäärää.
       newstats.collected = round(newstats.collected + newstats.increase,1);
      // Tallennetaan päivitetty stats-muuttuja.
    setStats(newstats); 
  }

  const handlePurchase = (id) => {
    const index = storeitems.findIndex(storeitem => storeitem.id === id);
    if (stats.balance >= storeitems[index].price) {
      let newstoreitems = [...storeitems];
      let newstats = { ...stats };
  
      // Kasvatetaan tuotteiden määrää
      newstoreitems[index].qty++;
      // Päivitetään pelaajan saldo
      newstats.balance = round(newstats.balance - newstoreitems[index].price, 1);
      // Päivitetään tuotteen uusi hinta
      newstoreitems[index].price =
        Math.floor(newstoreitems[index].baseprice * Math.pow(1.15, newstoreitems[index].qty));
  
      // Päivitetään kasvatusarvo ja päivitysten määrä
      let increase = 1;
      let upgrades = 0;
  
      for (let i = 0; i < storeitems.length; i++) {
        upgrades += storeitems[i].qty;
        increase += storeitems[i].multiplier * storeitems[i].qty;
  
        // Tarkistetaan, onko ostettu tuote matkakohde (index >= 4)
        if (i >= 4 && storeitems[i].qty === 1) {
          newstats.countriesVisited++; // Lisätään vieraillut maa
        }
      }
  
      // Päivitetään stats-tilamuuttuja
      newstats.increase = increase;
      newstats.upgrades = upgrades;
      newstats.itemstobuy = countBuyableItems(newstoreitems, newstats.balance);
      setStoreitems(newstoreitems);
      setStats(newstats);
    }
  };  

  return (
    <AppRouter stats={stats} 
               storeitems={storeitems} 
               handleClick={handleClick} 
               handlePurchase={handlePurchase} />
  )

}

export default App