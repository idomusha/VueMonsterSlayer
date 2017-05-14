new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack: function() {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= Math.min(damage, this.monsterHealth);
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster for ' + damage,
      });
      if (this.checkWin()) {
        return;
      }

      damage = this.calculateDamage(5, 12);
      this.playerHealth -= Math.min(damage, this.playerHealth);
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for ' + damage,
      });
      this.checkWin();
    },
    specialAttack: function() {
      var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= Math.min(damage, this.monsterHealth);
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster for ' + damage,
      });
      if (this.checkWin()) {
        return;
      }

      damage = this.calculateDamage(5, 12);
      this.playerHealth -= Math.min(damage, this.playerHealth);
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for ' + damage,
      });
      this.checkWin();
    },
    heal: function() {
      if (this.playerHealth <= 90) this.playerHealth += 10;
      else this.playerHealth = 100;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heals for ' + 10,
      });
      
      damage = this.calculateDamage(5, 12);
      this.playerHealth -= Math.min(damage, this.playerHealth);
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for ' + damage,
      });
      this.checkWin();
    },
    giveUp: function() {
      this.gameIsRunning = false;
    },
    calculateDamage: function(min, max) {
      return Math.floor(Math.random() * (max + 1 - min)) + min;
    },
    checkWin: function() {
      if (this.monsterHealth === 0) {
        if (confirm('You won! New game?')) this.startGame();
        else this.gameIsRunning = false;
        return true;
      } else if (this.playerHealth === 0) {
        if (confirm('You lost! New game?')) this.startGame();
        else this.gameIsRunning = false;
        return true;
      }
      return false;
    }
  }
});
