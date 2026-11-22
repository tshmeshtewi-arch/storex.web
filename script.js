// ============================================
// 𝐒𝐓𝐎𝐑𝐄 𝐗 — جميع الوظائف
// ============================================

// ===== المنتجات (مع ربط كل منتج بصورته + إضافة Ly coins) =====
const SHOP_PRODUCTS = [
  {
    name: 'Ly coins',
    description: 'عملات Ly coins بسعر مميز',
    price: 1,
    image: 'images/lycoins.png'
  },
  {
    name: 'SAMP Host 100 Players',
    description: 'هوست سامب 100 لاعب بأداء مستقر',
    price: 20,
    image: 'images/storex.png'
  },
  {
    name: 'Netflix',
    description: 'حسابات واشتراكات نتفلكس Netflix',
    price: 0,
    image: 'images/netflix.png'
  },
  {
    name: 'Discord Nitro',
    description: 'اشتراك ديسكورد نيترو Discord Nitro',
    price: 0,
    image: 'images/nitro.png'
  },
  {
    name: 'Snapchat',
    description: 'خدمات وشحن سناب شات Snapchat',
    price: 0,
    image: 'images/snapchat.jpg'
  },
  {
    name: 'Credit',
    description: 'شحن رصيد وكردت Credit',
    price: 0,
    image: 'images/credit.gif'
  },
  {
    name: 'PUBG Mobile UC',
    description: 'شحن شدات ببجي موبايل UC',
    price: 0,
    image: 'images/cod.jpg'
  },
  {
    name: 'Telegram Stars',
    description: 'شحن نجوم تليجرام Telegram Stars',
    price: 0,
    image: 'images/icon.png'
  },
  {
    name: 'TikTok Followers',
    description: 'زيادة متابعين حساب تيك توك',
    price: 0,
    image: 'images/bost.jpg'
  },
  {
    name: 'Instagram Followers',
    description: 'زيادة متابعين حساب انستغرام',
    price: 0,
    image: 'images/bost.jpg'
  },
  {
    name: 'ROBLOX Robux',
    description: 'شحن عملات روبلوكس Robux',
    price: 0,
    image: 'images/Forza.jpg'
  },
  {
    name: 'TikTok Coins',
    description: 'شحن عملات تيك توك TikTok Coins',
    price: 0,
    image: 'images/credit.gif'
  }
];

function renderShopProducts() {
  const grid = document.getElementById('shopProductsGrid');
  if (!grid) return;

  grid.innerHTML = SHOP_PRODUCTS.map(product => {
    const safeName = product.name.replace(/'/g, "\\'");
    const numericPrice = Number(product.price) || 0;
    return `
      <div class="product-card">
        <div class="card-img">
          <img src="${product.image}" alt="${product.name}">
          <div class="card-overlay"></div>
        </div>
        <div class="card-body">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="card-footer">
            <span class="card-price">💰 ${numericPrice} LYD</span>
            <button class="btn-glow" type="button" onclick="addToCart('${safeName}', ${numericPrice})">➕ أضف</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ===== الجسيمات =====
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 40; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: absolute;
      width: ${2 + Math.random() * 3}px;
      height: ${2 + Math.random() * 3}px;
      background: rgba(0, 230, 118, ${0.1 + Math.random() * 0.25});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      box-shadow: 0 0 ${4 + Math.random() * 6}px rgba(0, 230, 118, ${0.05 + Math.random() * 0.15});
      animation: particleDrift ${8 + Math.random() * 10}s ease-in-out infinite alternate;
      animation-delay: ${Math.random() * 6}s;
    `;
    container.appendChild(dot);
  }
})();

// ===== نظام المحافظ والدفع (ليبيانا والبطاقة المصرفية) =====
const WALLETS_KEY = 'storex_wallets';
const SELECTED_WALLET_KEY = 'storex_selected_wallet';

function getWallets() {
  try {
    const saved = JSON.parse(localStorage.getItem(WALLETS_KEY));
    return {
      libyana: Number(saved?.libyana) || 0,
      bank_card: Number(saved?.bank_card) || 0
    };
  } catch {
    return { libyana: 0, bank_card: 0 };
  }
}

function saveWallets(wallets) {
  localStorage.setItem(WALLETS_KEY, JSON.stringify({
    libyana: Number(wallets.libyana) || 0,
    bank_card: Number(wallets.bank_card) || 0
  }));
}

let currentPaymentMethod = localStorage.getItem(SELECTED_WALLET_KEY) || 'libyana';

function updateWalletBalancesUI() {
  const wallets = getWallets();
  const libyanaEl = document.getElementById('balance-libyana');
  const bankEl = document.getElementById('balance-bank');

  if (libyanaEl) libyanaEl.textContent = wallets.libyana.toFixed(3);
  if (bankEl) bankEl.textContent = wallets.bank_card.toFixed(3);
}

function selectPaymentMethod(method) {
  if (method !== 'libyana' && method !== 'bank_card') return;
  currentPaymentMethod = method;
  localStorage.setItem(SELECTED_WALLET_KEY, method);

  document.querySelectorAll('.wallet-card').forEach(card => {
    card.classList.toggle('is-selected', card.dataset.wallet === method);
  });

  document.querySelectorAll('.payment-option-card').forEach(btn => {
    btn.classList.toggle('active-method', btn.dataset.method === method);
  });

  const labelEl = document.getElementById('activeWalletLabel');
  if (labelEl) {
    labelEl.textContent = method === 'libyana'
      ? 'المحفظة النشطة: محفظة ليبيانا'
      : 'المحفظة النشطة: المحفظة الرئيسية (البطاقة المصرفية)';
  }
}

function addWalletBalance() {
  const input = document.getElementById('topupAmount');
  if (!input) return;

  const amount = parseFloat(input.value);
  if (isNaN(amount) || amount <= 0) {
    showToast('⚠️ أدخل مبلغاً صحيحاً أكبر من 0');
    return;
  }

  const wallets = getWallets();
  wallets[currentPaymentMethod] = (Number(wallets[currentPaymentMethod]) || 0) + amount;
  saveWallets(wallets);
  updateWalletBalancesUI();
  input.value = '';

  const walletName = currentPaymentMethod === 'libyana' ? 'محفظة ليبيانا' : 'المحفظة الرئيسية';
  showToast(`✅ تم إضافة ${amount.toFixed(3)} د.ل إلى ${walletName}`);
}

function processWalletPayment() {
  const cart = getCart();
  if (!cart || cart.length === 0) {
    showToast('⚠️ السلة فارغة');
    return;
  }

  const total = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const wallets = getWallets();
  const currentBalance = Number(wallets[currentPaymentMethod]) || 0;

  if (currentBalance < total) {
    const walletName = currentPaymentMethod === 'libyana' ? 'محفظة ليبيانا' : 'المحفظة الرئيسية (البطاقة المصرفية)';
    showToast(`⚠️ رصيد ${walletName} غير كافٍ (${currentBalance.toFixed(3)} د.ل)`);
    return;
  }

  const methodText = currentPaymentMethod === 'libyana' ? 'ليبيانا' : 'البطاقة المصرفية';

  wallets[currentPaymentMethod] = currentBalance - total;
  saveWallets(wallets);
  updateWalletBalancesUI();
  localStorage.removeItem('cart');
  loadCart();
  loadCheckout();

  showToast(`✅ تم إتمام الدفع بنجاح بقيمة ${total} LYD عبر ${methodText}`);
}

function initWalletsCarousel() {
  const carousel = document.getElementById('walletsCarousel');
  const dots = Array.from(document.querySelectorAll('#walletsDots .wallet-dot'));
  const cards = Array.from(document.querySelectorAll('#walletsCarousel .wallet-card'));

  if (!carousel || cards.length === 0) return;

  function syncByIndex(index) {
    const clamped = Math.max(0, Math.min(index, cards.length - 1));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === clamped));
    const walletType = cards[clamped].dataset.wallet;
    selectPaymentMethod(walletType);
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      const targetCard = cards[idx];
      if (!targetCard) return;
      carousel.scrollTo({
        left: targetCard.offsetLeft - carousel.offsetLeft,
        behavior: 'smooth'
      });
      syncByIndex(idx);
    });
  });

  let scrollTimer = null;
  carousel.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const center = carousel.scrollLeft + carousel.clientWidth / 2;
      let closestIdx = 0;
      let minDist = Infinity;

      cards.forEach((card, idx) => {
        const cardCenter = card.offsetLeft - carousel.offsetLeft + card.clientWidth / 2;
        const dist = Math.abs(center - cardCenter);
        if (dist < minDist) {
          minDist = dist;
          closestIdx = idx;
        }
      });

      syncByIndex(closestIdx);
    }, 60);
  });

  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      syncByIndex(idx);
    });
  });

  updateWalletBalancesUI();
  selectPaymentMethod(currentPaymentMethod);
}

function scrollWallets(direction) {
  const carousel = document.getElementById('walletsCarousel');
  const cards = Array.from(document.querySelectorAll('#walletsCarousel .wallet-card'));
  if (!carousel || cards.length === 0) return;

  const currentIdx = cards.findIndex(c => c.dataset.wallet === currentPaymentMethod);
  const nextIdx = Math.max(0, Math.min(cards.length - 1, (currentIdx < 0 ? 0 : currentIdx) + direction));
  const targetCard = cards[nextIdx];

  if (targetCard) {
    carousel.scrollTo({
      left: targetCard.offsetLeft - carousel.offsetLeft,
      behavior: 'smooth'
    });
    document.querySelectorAll('#walletsDots .wallet-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === nextIdx);
    });
    selectPaymentMethod(targetCard.dataset.wallet);
  }
}

// ===== نظام تسجيل الدخول (بدون تأكيد رمز مؤقتاً + تسجيل Google) =====
const USERS_KEY = 'storex_users';
const SESSION_KEY = 'storex_session';

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function goToAuthStep(step) {
  const login = document.getElementById('loginForm');
  const signup = document.getElementById('signupForm');
  const verify = document.getElementById('verifyScreen');

  if (login) login.style.display = step === 'login' ? 'block' : 'none';
  if (signup) signup.style.display = step === 'signup' ? 'block' : 'none';
  if (verify) verify.style.display = 'none';
}

function showSignup() { goToAuthStep('signup'); }
function showLogin() { goToAuthStep('login'); }

function handleSignup() {
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value.trim();

  if (!name || !email || !password) {
    showToast('⚠️ يرجى ملء جميع الحقول');
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    showToast('⚠️ البريد الإلكتروني غير صحيح');
    return;
  }

  if (password.length < 6) {
    showToast('⚠️ كلمة السر يجب أن تكون 6 أحرف على الأقل');
    return;
  }

  const users = getUsers();
  if (users[email]) {
    showToast('⚠️ هذا البريد مسجل مسبقاً');
    return;
  }

  users[email] = { name, email, password, verified: true, provider: 'email' };
  saveUsers(users);
  completeLogin(email);
}

function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if (!email || !password) {
    showToast('⚠️ يرجى ملء جميع الحقول');
    return;
  }

  const users = getUsers();
  const user = users[email];

  if (!user) {
    showToast('⚠️ البريد غير مسجل');
    return;
  }

  if (user.password && user.password !== password) {
    showToast('⚠️ كلمة السر خطأ');
    return;
  }

  user.verified = true;
  saveUsers(users);
  completeLogin(email);
}

function handleGoogleLogin() {
  const googleEmail = 'google.user@storex.ly';
  const googleName = 'مستخدم Google';
  const users = getUsers();

  if (!users[googleEmail]) {
    users[googleEmail] = {
      name: googleName,
      email: googleEmail,
      password: '',
      verified: true,
      provider: 'google'
    };
    saveUsers(users);
  }

  completeLogin(googleEmail);
}

function handleVerify() {
  const email = localStorage.getItem('pending_email');
  if (email) {
    completeLogin(email);
  }
}

function completeLogin(email) {
  const users = getUsers();
  const user = users[email];
  if (!user) return;

  localStorage.setItem(SESSION_KEY, JSON.stringify(user));

  const authScreen = document.getElementById('authScreen');
  const mainSite = document.getElementById('mainSite');
  if (authScreen) authScreen.style.display = 'none';
  if (mainSite) mainSite.style.display = 'block';

  const set = (id, v) => { const el = document.getElementById(id); if (el) el.innerText = v; };
  set('userDisplayName', user.name);
  set('dropdownName', user.name);
  set('dropdownEmail', user.email);
  set('settingsName', user.name);
  set('settingsEmail', user.email);

  updateWalletBalancesUI();
  showToast(`👋 مرحباً ${user.name}`);
}

function handleLogout() {
  localStorage.removeItem(SESSION_KEY);
  const authScreen = document.getElementById('authScreen');
  const mainSite = document.getElementById('mainSite');
  if (authScreen) authScreen.style.display = 'flex';
  if (mainSite) mainSite.style.display = 'none';

  const clear = (id) => { const el = document.getElementById(id); if (el) el.value = ''; };
  clear('loginEmail');
  clear('loginPassword');
  clear('verifyCode');

  goToAuthStep('login');
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) dropdown.classList.remove('show');
  closeMobileMenu();
  showToast('🚪 تم تسجيل الخروج');
}

// التحقق من الجلسة
(function checkSession() {
  const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  if (session) {
    const authScreen = document.getElementById('authScreen');
    const mainSite = document.getElementById('mainSite');
    if (authScreen) authScreen.style.display = 'none';
    if (mainSite) mainSite.style.display = 'block';

    const set = (id, v) => { const el = document.getElementById(id); if (el) el.innerText = v; };
    set('userDisplayName', session.name);
    set('dropdownName', session.name);
    set('dropdownEmail', session.email);
    set('settingsName', session.name);
    set('settingsEmail', session.email);
  }
})();

// ===== قائمة المستخدم =====
function toggleUserMenu() {
  const dropdown = document.getElementById('userDropdown');
  dropdown.classList.toggle('show');
  document.querySelector('.user-profile')?.classList.toggle('active');
}

// ===== القائمة الجانبية =====
function toggleMobileNav() {
  const menu = document.getElementById('mobileMenu');
  if (menu.classList.contains('open')) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function openMobileMenu() {
  document.getElementById('mobileMenu').classList.add('open');
  document.getElementById('mobileMenuOverlay').classList.add('open');
  document.documentElement.classList.add('menu-open');
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('mobileMenuOverlay').classList.remove('open');
  document.documentElement.classList.remove('menu-open');
}

// ===== السلة =====
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(name, price) {
  const cart = getCart();
  cart.push({ name, price: Number(price) || 0 });
  saveCart(cart);
  showToast(`✅ تمت إضافة "${name}" إلى السلة`);
  showPage('cart');
  loadCart();
}

function loadCart() {
  const container = document.getElementById('cart-container');
  const cart = getCart();
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty">🛒 السلة فارغة</div>';
    const actions = document.querySelector('#cart .cart-actions');
    if (actions) actions.style.display = 'none';
    return;
  }

  const actions = document.querySelector('#cart .cart-actions');
  if (actions) actions.style.display = 'flex';

  let html = '';
  let total = 0;
  cart.forEach(item => {
    const itemPrice = Number(item.price) || 0;
    total += itemPrice;
    html += `<div class="cart-item"><h4>${item.name}</h4><span class="price">💰 ${itemPrice} LYD</span></div>`;
  });
  html += `<div class="cart-total">💵 الإجمالي: ${total} LYD</div>`;
  container.innerHTML = html;
}

function clearCart() {
  localStorage.removeItem('cart');
  loadCart();
  showToast('🗑️ تم تصفير السلة');
}

// ===== التنقل بين الصفحات =====
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
  const target = document.getElementById(page);
  if (target) target.classList.add('active-page');

  document.querySelectorAll('.mobile-link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll(`.mobile-link[onclick*="'${page}'"]`).forEach(l => l.classList.add('active'));

  if (page === 'cart') loadCart();
  if (page === 'checkout') loadCheckout();
  if (page === 'wallets') updateWalletBalancesUI();

  document.getElementById('userDropdown')?.classList.remove('show');
  document.querySelector('.user-profile')?.classList.remove('active');
  closeMobileMenu();
}

function loadCheckout() {
  const cart = getCart();
  const summary = document.getElementById('checkoutSummary');
  if (!summary) return;

  if (!cart || cart.length === 0) {
    summary.innerHTML = '<p style="color: rgba(240,244,255,0.3);">⚠️ لا توجد منتجات في السلة</p>';
    return;
  }

  let html = '<h3>🛍️ منتجاتك:</h3>';
  let total = 0;
  cart.forEach(item => {
    const itemPrice = Number(item.price) || 0;
    total += itemPrice;
    html += `<p>• ${item.name} — <strong>${itemPrice} LYD</strong></p>`;
  });
  html += `<div class="total-row">💵 الإجمالي: ${total} LYD</div>`;
  summary.innerHTML = html;
  selectPaymentMethod(currentPaymentMethod);
}

// ===== إغلاق القوائم عند الضغط خارجها =====
document.addEventListener('click', function(e) {
  const dropdown = document.getElementById('userDropdown');
  const profile = document.querySelector('.user-profile');
  if (dropdown && profile && !profile.contains(e.target)) {
    dropdown.classList.remove('show');
    profile.classList.remove('active');
  }
});

// ===== Toast =====
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// ===== تهيئة عند تحميل الصفحة =====
document.addEventListener('DOMContentLoaded', () => {
  renderShopProducts();
  initWalletsCarousel();
});
