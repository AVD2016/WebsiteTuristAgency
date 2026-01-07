
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        const content = `Ім'я: ${name}\nEmail: ${email}\nТелефон: ${phone}`;

        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'contact-data.txt';
        link.click();

        alert('Дякуємо! Ваші дані збережено.');
        this.reset();
    });
}

let currentIndex = 0;
const heroImage = document.getElementById("heroImage");

const images = [
    "Img/beach.jpg",
    "Img/mountaines.jpg",
    "Img/river.jpeg"
];

setInterval(() => {
    // зсув картинки вліво + зникнення
    heroImage.style.transform = "translateX(-100%)";
    heroImage.style.opacity = "0";

    setTimeout(() => {
        // міняємо зображення
        currentIndex = (currentIndex + 1) % images.length;
        heroImage.src = images[currentIndex];

        // повертаємо з правого боку
        heroImage.style.transform = "translateX(100%)";

        // даємо браузеру застосувати transform
        setTimeout(() => {
            heroImage.style.opacity = "1";
            heroImage.style.transform = "translateX(0)";
        }, 50);

    }, 1000); // має збігатися з transition у CSS

}, 5000);


// ====== КУРСИ ВАЛЮТ (БАЗА — ГРИВНЯ) ======
const ratesBox = document.querySelector(".ratesBox");

if (ratesBox) {
    const proxy = "https://api.allorigins.win/get?url=";
    const apiUrl =
        "https://api.exchangerate.host/live?access_key=44c865a204793b36031466e8614b9797&currencies=EUR,CHF,GBP,PLN,UAH";

    fetch(proxy + encodeURIComponent(apiUrl))
        .then(res => res.json())
        .then(res => JSON.parse(res.contents))
        .then(data => {
            if (!data.success) {
                ratesBox.textContent = "Не вдалося отримати курси валют.";
                return;
            }

            const q = data.quotes;

            // 1 USD у гривнях
            const usdToUah = q.USDUAH;

            // Перерахунок у гривні
            const eurToUah = usdToUah / q.USDEUR;
            const chfToUah = usdToUah / q.USDCHF;
            const gbpToUah = usdToUah / q.USDGBP;
            const plnToUah = usdToUah / q.USDPLN;

            ratesBox.innerHTML = `
                <p>🇺🇸 1 USD ≈ ${usdToUah.toFixed(2)} UAH</p>
                <p>🇪🇺 1 EUR ≈ ${eurToUah.toFixed(2)} UAH</p>
                <p>🇨🇭 1 CHF ≈ ${chfToUah.toFixed(2)} UAH</p>
                <p>🇬🇧 1 GBP ≈ ${gbpToUah.toFixed(2)} UAH</p>
                <p>🇵🇱 1 PLN ≈ ${plnToUah.toFixed(2)} UAH</p>
                <p><small>Оновлено: ${new Date(data.timestamp * 1000).toLocaleString()}</small></p>
            `;
        })
        .catch(err => {
            console.error(err);
            ratesBox.textContent = "Не вдалося завантажити курси валют.";
        });
}




