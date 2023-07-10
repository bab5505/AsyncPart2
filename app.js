document.addEventListener('DOMContentLoaded', () => {
  const baseURL = 'https://deckofcardsapi.com/api/deck';

  // 1.
  async function part1() {
    try {
      const response = await fetch(`${baseURL}/new/draw/`);
      const data = await response.json();
      const { suit, value } = data.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    } catch (error) {
      console.error(error);
    }
  }
  part1();

  // 2.
  async function part2() {
    try {
      const firstCardResponse = await fetch(`${baseURL}/new/draw/`);
      const firstCardData = await firstCardResponse.json();
      const deckId = firstCardData.deck_id;
      const secondCardResponse = await fetch(`${baseURL}/${deckId}/draw/`);
      const secondCardData = await secondCardResponse.json();
      [firstCardData, secondCardData].forEach(card => {
        const { suit, value } = card.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
      });
    } catch (error) {
      console.error(error);
    }
  }
  part2();

  // 3.
  async function setup() {
    const btn = document.querySelector('button');
    const cardArea = document.getElementById('card-area');

    try {
      const deckResponse = await fetch(`${baseURL}/new/shuffle/`);
      const deckData = await deckResponse.json();
      btn.style.display = 'block';
      btn.addEventListener('click', async () => {
        try {
          const cardResponse = await fetch(`${baseURL}/${deckData.deck_id}/draw/`);
          const cardData = await cardResponse.json();
          const cardSrc = cardData.cards[0].image;
          const angle = Math.random() * 90 - 45;
          const randomX = Math.random() * 40 - 20;
          const randomY = Math.random() * 40 - 20;
          const img = document.createElement('img');
          img.src = cardSrc;
          img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;
          cardArea.appendChild(img);
          if (cardData.remaining === 0) {
            btn.remove();
          }
        } catch (error) {
          console.error(error);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  setup();
});
