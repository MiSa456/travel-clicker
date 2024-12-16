import { useState } from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import items from './config/items.js';
import round from './utils/round';
import getPurchasableItems from './utils/getPurchasableItems';
import useLocalStorage from './utils/useLocalStorage';

function App() {
  const initialstats = {
    clicks: 0,
    balance: 0,
    increase: 1,
    itemstobuy: 0,
    upgrades: 0,
    collected: 0,
    countriesVisited: 0,
    visitedCountries: []
  };

  const countBuyableItems = (items, balance) => {
    let total = 0;
    getPurchasableItems(items).forEach(item => {
      if (item.price <= balance) total++;
    });
    return total;
  };

  const [stats, setStats, resetStats] = useLocalStorage('travel-stats', initialstats);
  const [storeitems, setStoreitems, resetStoreitems] = useLocalStorage('travel-items', items);

  const handleClick = () => {
    let newstats = { ...stats };
    newstats.clicks = newstats.clicks + 1;
    newstats.balance = round(newstats.balance + newstats.increase, 1);
    newstats.itemstobuy = countBuyableItems(storeitems, newstats.balance);
    newstats.collected = round(newstats.collected + newstats.increase, 1);

    setStats(newstats);
  };

  const handlePurchase = (id) => {
    const index = storeitems.findIndex(storeitem => storeitem.id === id);
    if (stats.balance >= storeitems[index].price) {
      let newstoreitems = JSON.parse(JSON.stringify(storeitems));
      let newstats = { ...stats };

      newstoreitems[index].qty++;
      newstats.balance = round(newstats.balance - newstoreitems[index].price, 1);
      newstoreitems[index].price = Math.floor(newstoreitems[index].baseprice * Math.pow(1.15, newstoreitems[index].qty));

      let increase = 1;
      let upgrades = 0;

      for (let i = 0; i < newstoreitems.length; i++) {
        upgrades += newstoreitems[i].qty;
        increase += newstoreitems[i].multiplier * newstoreitems[i].qty;

        if (i >= 4 && newstoreitems[i].qty === 1) {
          const country = newstoreitems[i].name;
          if (!Array.isArray(newstats.visitedCountries)) {
            newstats.visitedCountries = []; // Alustetaan, jos ei ole taulukko
          }
          if (!newstats.visitedCountries.includes(country)) {
            newstats.visitedCountries.push(country); // Lisätään vain, jos ei ole jo listassa
          }
        }
        
      }

      newstats.increase = increase;
      newstats.upgrades = upgrades;
      newstats.countriesVisited = newstats.visitedCountries.length;
      newstats.itemstobuy = countBuyableItems(newstoreitems, newstats.balance);
      setStoreitems(newstoreitems);
      setStats(newstats);

    }
  };

  const handleReset = () => {
    resetStats();
    resetStoreitems();
  };

  return (
    <AppRouter
      stats={stats}
      storeitems={storeitems}
      handleClick={handleClick}
      handlePurchase={handlePurchase}
      handleReset={handleReset}
    />
  );
}

export default App;
