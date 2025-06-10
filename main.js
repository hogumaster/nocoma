let btc = 0; // 기본머니
let minerPower = 1;
let speedBonus = 1;
let fans = 0;
let shields = 0;
let hackers = 0;
let upgradeCost = 10.00;
let fanCost = 2.40;
let shieldCost = 3.60;
let hackerCost = 5.00;

function updateDisplay(msg) {
  const log = document.getElementById("console-log");
  const entry = `<div>[${new Date().toLocaleTimeString()}] ${msg}</div>`;
  log.innerHTML = entry + log.innerHTML;
  if (log.children.length > 100) log.removeChild(log.children[0]);
  document.getElementById("btc-count").textContent = `$${btc.toFixed(2)}`;
}

function mineBTC() {
  const earned = minerPower * speedBonus * 0.3;
  btc += earned;
  updateDisplay(`📱 앱 수익 발생: +$${earned.toFixed(2)}`);
}

function upgradeMinerPower() {
  if (btc >= upgradeCost) {
    btc -= upgradeCost;
    minerPower++;
    upgradeCost *= 1.25;
    document.getElementById("upgradeBtn").innerText = `⛏ 수익성 업그레이드 ($${upgradeCost.toFixed(2)} USD)`;
    updateDisplay("수익성이 증가했습니다.");
  }
}

function buyFan() {
  if (btc >= fanCost) {
    btc -= fanCost;
    fans++;
    speedBonus += 0.1;
    fanCost *= 1.25;
    document.getElementById("fanBtn").innerText = `❄ 스마트폰 구매 ($${fanCost.toFixed(2)} USD)`;
    updateDisplay("스마트폰을 구매해 수익 속도가 향상되었습니다.");
  }
}

function buyShield() {
  if (btc >= shieldCost) {
    btc -= shieldCost;
    shields++;
    shieldCost *= 1.25;
    document.getElementById("shieldBtn").innerText = `🛡 계정 보안 구매 ($${shieldCost.toFixed(2)} USD)`;
    updateDisplay("계정 보안이 강화되었습니다.");
  }
}

function buyHacker() {
  if (btc >= hackerCost) {
    btc -= hackerCost;
    hackers++;
    hackerCost *= 1.25;
    document.getElementById("hackerBtn").innerText = `💻 마케팅 팀 고용 ($${hackerCost.toFixed(2)} USD)`;
    updateDisplay("마케팅 팀이 자동 수익을 창출하기 시작했습니다.");
  }
}

const countries = [
  { name: "🇯🇵 일본", cost: 2000, unlocked: false, successRate: 0.4, bonus: () => { btc += 10; }, desc: "USD 보너스 $10 획득" },
  { name: "🇩🇪 독일", cost: 30000, unlocked: false, successRate: 0.35, bonus: () => { minerPower += 2; }, desc: "수익성 +2" },
  { name: "🇧🇷 브라질", cost: 40000, unlocked: false, successRate: 0.3, bonus: () => { speedBonus += 1; }, desc: "수익 속도 +100%" },
  { name: "🇰🇷 대한민국", cost: 25000, unlocked: false, successRate: 0.5, bonus: () => { minerPower += 1; }, desc: "수익성 +1" },
  { name: "🇺🇸 미국", cost: 35000, unlocked: false, successRate: 0.45, bonus: () => { speedBonus += 0.5; }, desc: "수익 속도 +50%" }
];

function updateCountries() {
  const ul = document.getElementById("country-list");
  const bonusDiv = document.getElementById("bonuses");
  ul.innerHTML = "";
  countries.forEach((c, i) => {
    if (!c.unlocked) {
      const li = document.createElement("li");
      li.innerHTML = `<button class='upgrade-btn' onclick='conquer(${i})'>${c.name} 정복 ($${c.cost}) - ${c.desc}</button>`;
      ul.appendChild(li);
    }
  });
  const activeBonuses = countries.filter(c => c.unlocked).map(c => `${c.name}: ${c.desc}`);
  bonusDiv.innerHTML = activeBonuses.join("<br>");
}

function conquer(index) {
  const c = countries[index];
  if (c.unlocked) return;
  if (btc >= c.cost) {
    btc -= c.cost;
    const roll = Math.random();
    const reducedLoss = shields > 0 ? c.cost * 0.3 : 0;
    if (roll <= c.successRate) {
      c.unlocked = true;
      c.bonus();
      updateDisplay(`🌍 ${c.name} 정복 완료! 특별 혜택 적용됨.`);
      if (countries.every(country => country.unlocked)) {
        updateDisplay(`
██    ██ ██ ████████  ██████  ██████  ██    ██
██    ██ ██    ██    ██    ██ ██   ██  ██  ██ 
██    ██ ██    ██    ██    ██ ██████    ████  
 ██  ██  ██    ██    ██    ██ ██   ██    ██   
  ████   ██    ██     ██████  ██   ██    ██   
🎉 전 세계 정복 완료! 축하합니다!`);
      }
    } else {
      btc += reducedLoss;
      updateDisplay(`❌ ${c.name} 정복 실패. 보안 덕분에 손실 일부 방지됨.`);
    }
    updateCountries();
  }
}

setInterval(() => {
  if (hackers > 0) {
    const autoEarn = hackers * speedBonus;
    btc += autoEarn;
    updateDisplay(`💰 자동 수익 발생: +$${autoEarn.toFixed(2)}`);
  }
}, 5000);

setInterval(() => {
  const now = new Date();
  const clock = document.getElementById("clock");
  clock.textContent = now.toLocaleTimeString();
}, 1000);

updateCountries();
