// typing
var typeText = document.querySelector('.typing');
var textToBeTypedArr = ['북마크 세이버', 'Book Mark Saver'];
var index = 0,
    isAdding = true,
    textToBeTypedIndex = 0;

(function playAnim() {
    setTimeout(
        function () {
            typeText.innerText = textToBeTypedArr[textToBeTypedIndex].slice(
                0,
                index
            );
            if (isAdding) {
                if (index > textToBeTypedArr[textToBeTypedIndex].length) {
                    isAdding = false;
                    typeText.classList.add('showAnim');

                    setTimeout(function () {
                        typeText.classList.remove('showAnim');
                        playAnim();
                    }, 3000);
                    return;
                } else {
                    index++;
                }
            } else {
                if (index === 0) {
                    isAdding = true;
                    textToBeTypedIndex =
                        (textToBeTypedIndex + 1) % textToBeTypedArr.length;
                } else {
                    index--;
                }
            }

            playAnim();
        },
        isAdding ? 90 : 30
    );
})();
