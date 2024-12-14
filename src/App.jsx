import { useState } from 'react';
import './App.css'
import AppRouter from './components/AppRouter';
import items from './config/items.js';
import round from './utils/round';
import getPurchasableItems from './utils/getPurchasableItems';
import useLocalStorage from './utils/useLocalStorage';

function App() {

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

  // Laskee niiden tuotteiden lukumäärän, joiden ostamiseen on varaa.
  const countBuyableItems = (items, balance) => {
    let total = 0;
    getPurchasableItems(items).forEach(item => {
      if (item.price <= balance) total++;
    });
    return total;
  }

  // Luodaan taltio, johon tallennetaan pelin laskennalliset tiedot.
  const [stats, setStats, resetStats] = useLocalStorage('travel-stats',initialstats);

  // Luodaan taltio, johon tallennetaan tuotelista.
  const [storeitems,setStoreitems, resetStoreitems] = useLocalStorage('travel-items',items);


  const handleClick = () => {
    // Tehdään kopio stats-tilamuuttujasta.
    let newstats = {...stats}
    // Kasvatetaan napautusten lukumäärää yhdellä.
    newstats.clicks = newstats.clicks + 1;
      // Kasvataan matkapisteiden määrää kasvatusarvolla.
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
      // Tehdään kopiot tilamuuttujista.
      let newstoreitems = JSON.parse(JSON.stringify(storeitems));
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
  
      for (let i = 0; i < newstoreitems.length; i++) {
        upgrades += newstoreitems[i].qty;
        increase += newstoreitems[i].multiplier * newstoreitems[i].qty;
  
        // Tarkistetaan, onko ostettu tuote matkakohde (index >= 4)
        if (i >= 4 && newstoreitems[i].qty === 1) {
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

  const handleReset = () => {
    // Palautetaan taltiot alkuarvoihin.
    resetStats();
    resetStoreitems();
  }

  return (
    <AppRouter stats={stats}
               storeitems={storeitems}
               handleClick={handleClick}
               handlePurchase={handlePurchase}
               handleReset={handleReset} />

  )

}

export default App