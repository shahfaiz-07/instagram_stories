const cardHeader = document.getElementById("card-header");
const fullStoryCard = document.querySelector(".full-story");
const fullStoryImg = document.querySelector(".full-story img");
const closeBtn = document.querySelector(".close-story");
const storyDp = document.querySelector(".story-dp");
const loader = document.querySelector(".loader");
let timeoutId = '', intervalId = '';


function updateFeed() {
    let clutter = "";

    user_arr.forEach((card, index) => {
    clutter += `<div class="stories ${(card.viewed) ? 'viewed-story' : ''}">
                    <img src="${card.dp}" alt="DP" id="${index}">
                </div>`;
    });
    cardHeader.innerHTML = clutter;
}
updateFeed();

cardHeader.addEventListener("click", (evt) => {
    fullStoryImg.src = user_arr[evt.target.id].image;
    user_arr[evt.target.id].viewed = true;
    fullStoryCard.style.display = "initial";
    storyDp.style.backgroundImage = `url(${user_arr[evt.target.id].dp})`;
    // loader.style.width = "0";
    let width = 80;
    intervalId = setInterval(() => {
        loader.style.width = `${width}%`;
        width -= 10;
    }, 1000);
    timeoutId = setTimeout(() => {
        fullStoryCard.style.display = "none";
        clearInterval(intervalId);
    }, 10000);
    loader.style.width = "100%";
    updateFeed();
});

closeBtn.addEventListener("click", () => {
    if(timeoutId)
        clearTimeout(timeoutId);
    if (intervalId) {
        clearInterval(intervalId);
        loader.style.width = '100%';
    }
  fullStoryCard.style.display = "none";
});
