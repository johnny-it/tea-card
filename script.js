const PACKAGES = [
  { weight: '100', label: '100 г', article: '01306', oldPrice: '349,20 ₽', price: '326,40 ₽' },
  { weight: '500', label: '500 г', article: '01307', oldPrice: '1 646 ₽', price: '1 432 ₽' },
  { weight: '1000', label: '1000 г', article: '01308', oldPrice: '2 592 ₽', price: '2 064 ₽' },
  { weight: '5000', label: '5000 г', article: '01309', oldPrice: '8 710 ₽', price: '6 320 ₽' },
];

/**
 * Возвращает данные товара для выбранной фасовки.
 *
 * @param {string} weight - Вес фасовки в граммах без указания единицы измерения.
 * @returns {{weight: string, label: string, article: string, oldPrice: string, price: string}}
 * Объект с весом, подписью, артикулом и ценами выбранной фасовки.
 * @throws {Error} Если фасовка с переданным весом отсутствует в списке.
 */
function getPackageByWeight(weight) {
  const packageItem = PACKAGES.find((item) => item.weight === weight);

  if (!packageItem) {
    throw new Error(`Неизвестная фасовка: ${weight}`);
  }

  return packageItem;
}

/**
 * Находит элементы карточки и подключает переключение фасовок после загрузки DOM.
 *
 * @returns {void}
 */
function initProductCard() {
  const packageButtons = document.querySelectorAll('.js-package-weight');
  const article = document.querySelector('.js-product-article');
  const oldPrice = document.querySelector('.js-product-old-price');
  const currentPrice = document.querySelector('.js-product-price');

  packageButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedPackage = getPackageByWeight(button.dataset.packageWeight);

      packageButtons.forEach((packageButton) => {
        const isSelected = packageButton === button;
        packageButton.classList.toggle('product-card__package--active', isSelected);
        packageButton.setAttribute('aria-pressed', String(isSelected));
      });

      article.textContent = selectedPackage.article;
      oldPrice.textContent = selectedPackage.oldPrice;
      currentPrice.textContent = selectedPackage.price;
    });
  });
}

document.addEventListener('DOMContentLoaded', initProductCard);
