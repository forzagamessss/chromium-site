    const safeLocalStorage = {
      getItem(key) {
        try { return localStorage.getItem(key); } catch (e) { return this.fallbackStore[key] || null; }
      },
      setItem(key, value) {
        try { localStorage.setItem(key, value); } catch (e) { this.fallbackStore[key] = String(value); }
      },
      removeItem(key) {
        try { localStorage.removeItem(key); } catch (e) { delete this.fallbackStore[key]; }
      },
      fallbackStore: {}
    };

    function safeJSONParse(str, fallback) {
      try { return str ? JSON.parse(str) : fallback; } catch (e) { return fallback; }
    }

    function normalizeStoredOption(value, allowedValues, fallback) {
      return allowedValues.includes(value) ? value : fallback;
    }

    function readStoredOption(key, allowedValues, fallback) {
      return normalizeStoredOption(safeLocalStorage.getItem(key), allowedValues, fallback);
    }

    function safeText(id, text) {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    }

    function safePlaceholder(id, text) {
      const el = document.getElementById(id);
      if (el) el.placeholder = text;
    }

    function safeHTML(id, html) {
      const el = document.getElementById(id);
      if (el) el.innerHTML = html;
    }

    const APP_ID = 'pocket-chromium-v1';

    const translations = {
      ru: {
        greetingMorning: "Доброе утро",
        greetingDay: "Добрый день",
        greetingEvening: "Добрый вечер",
        greetingNight: "Доброй ночи",
        greetingAnon: "аноним",
        gallery: "Галерея",
        bookmarks: "Избранное",
        recommendations: "Для вас",
        settings: "Настройки",
        random: "Рандом",
        searchPlaceholder: "Поиск тегов...",
        traffic: "Трафик",
        loading: "Загрузка",
        feed: "Лента",
        day: "День",
        week: "Неделя",
        month: "Месяц",
        allTime: "Всё время",
        localFavs: "Избранные закладки",
        recDesc: "Алгоритм анализирует закладки, строит карту интересов по тегам и выдает рекомендации.",
        noBookmarks: "Закладок пока нет.",
        langTitle: "Язык интерфейса",
        statsTitle: "Индивидуальная статистика просмотра",
        statViewed: "Просмотрено",
        statLiked: "В закладках",
        statTime: "Общее время в приложении",
        statFrequent: "Частые категории",
        statLoadedMb: "Загружено данных",
        statVideos: "Проиграно видео",
        statFavRating: "Частый рейтинг",
        statAvgScore: "Средний рейтинг (Score)",
        authDesc: "Введите имя пользователя и API-ключ. Персональные данные хранятся локально в зашифрованном виде.",
        username: "Имя пользователя",
        apiKey: "API Ключ",
        saveConnect: "Сохранить и подключить",
        reg: "Регистрация",
        accent: "Цвет темы",
        roundingTitle: "Скругление интерфейса",
        feedFitTitle: "Масштабирование картинок",
        feedFitDesc: "Обрезать миниатюры или вписывать в оригинальный размер",
        fitCover: "Обрезать (1:1)",
        fitContain: "Оригинальный размер (Contain)",
        filterTitle: "Фильтры контента",
        trafficTitle: "Трафик и производительность",
        budget: "Лимит трафика",
        ram: "Оптимизация памяти",
        layoutTitle: "Разметка ленты",
        blacklistTitle: "Локальный Чёрный Список тегов",
        comments: "Комментарии",
        noComments: "Комментариев пока нет.",
        downloadMedia: "Скачать",
        detailClose: "Закрыть",
        bookmarksLimit: "Добавьте хотя бы 2 поста в закладки для работы ИИ-рекомендаций.",
        layoutSquare: "Квадраты",
        layoutMasonry: "Мозаика",
        layoutStory: "Истории",
        eulaTitle: "Предупреждение о контенте",
        eulaCheckbox: "Я подтверждаю, что мне исполнилось 18 лет, и я полностью принимаю условия пользовательского соглашения.",
        eulaConfirm: "Подтвердить и Продолжить",
        quickPanicActive: "Экстренный режим защиты включен! 18+ скрыто.",
        quickPanicDeactive: "Экстренный режим защиты выключен.",
        panicActiveText: "Экстренная маскировка активна! Контент 18+ временно скрыт.",
        disablePanicBtn: "Отключить режим паники",
        backupTitle: "Резервное копирование",
        backupDesc: "Вы можете заархивировать локальные закладки, блэклисты и кастомные стили в компактный код.",
        legalInfo: "Правовая информация",
        legalDesc: "Юридические положения, конфиденциальность, использование файлов cookie и контактные данные.",
        btnViewLegal: "Читать соглашение",
        proxyTitle: "Настройки прокси",
        "sum-security-suite": "Безопасность и PIN-код",
        "sum-appearance": "Внешний вид и фон",
        "sum-backup-suite": "Резервное копирование",
        mediaAll: "Все",
        mediaPhoto: "Фото",
        mediaVideo: "Видео",
        favoriteTagsTitle: "Избранные теги",
        searchHistoryTitle: "История поиска",
        accountTitle: "Аккаунт e621.net",
        r34AccountTitle: "Аккаунт Rule34.xxx",
        r34AuthDesc: "Для работы Rule34 требуется авторизация. По умолчанию используется встроенный системный ключ. Вы можете указать собственный User ID и API Key.",
        r34UserIdLabel: "User ID (опционально)",
        r34ApiKeyLabel: "API Key (опционально)",
        r34SaveBtn: "Сохранить",
        backupGenerate: "Сгенерировать код бэкапа",
        backupCopy: "Копировать код",
        backupImport: "Импорт бэкапа",
        backupPlaceholder: "Вставьте код бэкапа...",
        backupRestore: "Восстановить из кода",
        apiBaseLabel: "Базовый адрес e621",
        proxyModeLabel: "Режим подключения",
        proxyDirect: "Прямое подключение",
        proxyFallback: "CORS-прокси",
        proxyCustom: "Свой прокси-префикс",
        customProxyLabel: "Префикс прокси",
        saveProxy: "Сохранить прокси",
        panicDescription: "Взрослый контент (18+) скрыт в целях защиты конфиденциальности. Отключить этот режим можно кнопкой ниже.",
        changePin: "Изменить PIN",
        roundingDesc: "Кнопки, карточки, панели",
        radiusNone: "Без скругления",
        radiusStandard: "Стандартное (8px)",
        radiusExtreme: "Экстремальное (16px)",
        accentDesc: "Цветовая гамма приложения",
        customBackground: "Собственные фоновые обои",
        backgroundOpacity: "Плотность затемнения фона",
        clearBackground: "Сбросить фоновые обои",
        gridFormat: "Формат сетки",
        legalHeader: "Пользовательское соглашение",
        eulaSubtitle: "Проверка возраста и пользовательское соглашение",
        slideshow: "Слайдшоу",
        slideshowStop: "Стоп",
        slideshowFinished: "Слайдшоу завершено",
        slideshowStopped: "Слайдшоу остановлено",
        slideshowStarted: "Слайдшоу запущено",
        detailFill: "Заполнить",
        detailContain: "Сжать",
        previousPhoto: "Предыдущее фото",
        nextPhoto: "Следующее фото",
        bookmark: "В закладки",
        bookmarked: "В закладках",
        analyzingRecommendations: "Анализ ваших предпочтений...",
        commentsLoading: "Загрузка комментариев...",
        commentsAuthRequired: "Сначала подключите аккаунт в Настройках.",
        favoriteSearchAdded: "Комбинация добавлена в избранное!",
        favoriteSearchRemoved: "Комбинация удалена из избранного",
        emptySearchHistory: "История поиска пуста",
        searchHistoryHeading: "История поиска:",
        clear: "Очистить",
        searchHistoryCleared: "История поиска очищена!",
        backupCreated: "Бэкап успешно создан!",
        backupCreateError: "Ошибка при создании бэкапа.",
        backupCodeRequired: "Пожалуйста, введите код!",
        backupRestored: "Резервная копия восстановлена! Перезапуск...",
        backupDecodeError: "Ошибка декодирования бэкапа!",
        codeCopied: "Код скопирован!",
        proxySaved: "Настройки прокси сохранены!",
        languageChanged: "Язык изменен на русский!",
        roundingUpdated: "Скругление интерфейса обновлено!",
        accentUpdated: "Цветовая гамма обновлена!",
        pinConfigured: "PIN-код успешно настроен!",
        pinDisabled: "PIN-код отключен",
        backgroundApplied: "Фон успешно установлен!",
        backgroundReset: "Фоновые обои сброшены.",
        authSaved: "Аккаунт успешно сохранен!",
        authSignedOut: "Вы вышли из аккаунта.",
        randomFailed: "Не удалось запустить случайный пост.",
        createPin: "Придумайте PIN-код",
        enterPin: "Введите PIN-код",
        repeatPin: "Повторите PIN-код для подтверждения",
        pinMismatch: "Не совпадает! Попробуйте заново",
        invalidPin: "Неверный PIN-код",
        holdToDownload: "(Зажмите для скачивания)",
        openingMedia: "Открываем файл. Зажмите для скачивания!",
        downloadingMedia: "Скачивание файла...",
        downloadComplete: "Скачивание начато. Файл появится в Download/Chromium E621",
        downloadFailed: "Не удалось сохранить файл",
        panicSettingsOnly: "Выключение режима паники доступно только в Настройках!",
        connectionError: "Ошибка подключения",
        debugReady: "[SYSTEM] Консоль отладчика chrom24 готова...",
        eulaText: `<b>ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ И ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ (EULA)</b><br><br>
1. <b>Возрастной ценз (18+):</b> Данный клиент предоставляет доступ к графическим материалам сексуального характера, предназначенным исключительно для совершеннолетних пользователей. Продолжая использование приложения, вы безоговорочно подтверждаете, что достигли возраста 18 лет (или возраста совершеннолетия в вашей юрисдикции).<br><br>
2. <b>Отказ от ответственности за контент:</b> Настоящее приложение является неофициальным сторонним программным продуктом с открытым исходным кодом. Разработчик приложения <b>не загружает, не размещает (хостит), не модерирует, не владеет и не контролирует</b> контент, отображаемый на экране. Все медиаданные извлекаются в реальном времени с использованием открытых API-интерфейсов стороннего ресурса e621.net.<br><br>
3. <b>Интеллектуальная собственность:</b> Все иллюстрации, персонажи и связанные медиаресурсы принадлежат их соответствующим правообладателям и авторам. В соответствии с Законом об авторском праве в цифровую эпоху (DMCA), любые запросы по поводу удаления или нарушения авторских прав должны направляться напрямую владельцам сторонней платформы e621.net, на которой физически расположены файлы.<br><br>
4. <b>Локальное шифрование данных:</b> Приложение использует локальное хранилище браузера (LocalStorage) для сохранения закладок, черных списков и настроек авторизации. Ваши учетные данные шифруются на вашем устройстве с помощью симметричных алгоритмов и не отправляются на сервера разработчика. Без PIN-кода доступ к этим локаным данным невозможен.<br><br>
5. <b>Ограничение правовой ответственности:</b> Разработчик освобождается от любой ответственности за прямые, косвенные или сопутствующие убытки, юридические споры, моральный вред или технические неисправности, возникшие в ходе эксплуатации данного программного продукта.`
      },
      en: {
        greetingMorning: "Good morning",
        greetingDay: "Good afternoon",
        greetingEvening: "Good evening",
        greetingNight: "Good night",
        greetingAnon: "anonymous",
        gallery: "Gallery",
        bookmarks: "Bookmarks",
        recommendations: "For You",
        settings: "Settings",
        random: "Random",
        searchPlaceholder: "Search tags...",
        traffic: "Traffic",
        loading: "Loading",
        feed: "Feed",
        day: "Day",
        week: "Week",
        month: "Month",
        allTime: "All-time",
        localFavs: "Bookmarked Arts",
        recDesc: "Algorithm analyzes your bookmarks, builds an interest map, and suggests recommendations.",
        noBookmarks: "No bookmarks yet.",
        langTitle: "App Language",
        statsTitle: "Viewing Statistics Dashboard",
        statViewed: "Artworks Viewed",
        statLiked: "Liked / Bookmarked",
        statTime: "Total App Active Time",
        statFrequent: "Frequent Bookmark Tags",
        statLoadedMb: "Total Loaded Data",
        statVideos: "Videos Played",
        statFavRating: "Frequent Rating",
        statAvgScore: "Average Score",
        authDesc: "Enter your username and API key. Data is saved locally in encrypted form.",
        username: "Username",
        apiKey: "API Key",
        saveConnect: "Save & Connect",
        reg: "Register",
        accent: "Accent Theme Color",
        roundingTitle: "UI Corners Smoothness",
        feedFitTitle: "Feed Fit Mode",
        feedFitDesc: "How images scale in the feed",
        fitCover: "Crop to square (1:1)",
        fitContain: "Fit original size (No crop)",
        filterTitle: "Content Classification Filter",
        trafficTitle: "Traffic and Performance Safety",
        budget: "Data Budget Limit",
        ram: "RAM Safe Guard",
        layoutTitle: "Layout Mode",
        blacklistTitle: "Local Tags Blacklist",
        comments: "Comments Feed",
        noComments: "No comments found.",
        downloadMedia: "Download",
        detailClose: "Close",
        bookmarksLimit: "Please add at least 2 artworks to bookmarks to enable recommendations.",
        layoutSquare: "Squares",
        layoutMasonry: "Masonry",
        layoutStory: "Stories",
        eulaTitle: "Content Warning",
        eulaCheckbox: "I verify that I am 18 years of age or older, and I fully accept terms.",
        eulaConfirm: "Confirm & Continue",
        quickPanicActive: "Emergency protection triggered! 18+ content hidden.",
        quickPanicDeactive: "Emergency protection deactivated.",
        panicActiveText: "Panic mode active! Explicit content is temporarily locked.",
        disablePanicBtn: "Disable panic mode",
        backupTitle: "Data Backup",
        backupDesc: "You can archive your local bookmarks, blacklist tags, and styles into a compact code string.",
        legalInfo: "Legal Information",
        legalDesc: "Legal agreements, user privacy, cookies policy and communication contact support emails.",
        btnViewLegal: "Read Documents",
        proxyTitle: "Proxy & API Settings",
        "sum-security-suite": "Security & PIN Code",
        "sum-appearance": "Appearance & Background",
        "sum-backup-suite": "Backup Settings",
        mediaAll: "All",
        mediaPhoto: "Photos",
        mediaVideo: "Videos",
        favoriteTagsTitle: "Favorite tags",
        searchHistoryTitle: "Search history",
        accountTitle: "e621.net Account",
        r34AccountTitle: "Rule34.xxx Account",
        r34AuthDesc: "Rule34 requires authentication. By default, a built-in system key is used. You can specify your own User ID and API Key.",
        r34UserIdLabel: "User ID (optional)",
        r34ApiKeyLabel: "API Key (optional)",
        r34SaveBtn: "Save",
        backupGenerate: "Generate backup code",
        backupCopy: "Copy code",
        backupImport: "Import backup",
        backupPlaceholder: "Paste backup code...",
        backupRestore: "Restore from code",
        apiBaseLabel: "e621 base URL",
        proxyModeLabel: "Connection mode",
        proxyDirect: "Direct connection",
        proxyFallback: "CORS proxy",
        proxyCustom: "Custom proxy prefix",
        customProxyLabel: "Proxy prefix",
        saveProxy: "Save proxy settings",
        panicDescription: "Adult content (18+) is hidden for privacy. You can disable this mode with the button below.",
        changePin: "Change PIN",
        roundingDesc: "Buttons, cards, and panels",
        radiusNone: "Square corners",
        radiusStandard: "Standard (8px)",
        radiusExtreme: "Extra rounded (16px)",
        accentDesc: "Application color scheme",
        customBackground: "Custom background wallpaper",
        backgroundOpacity: "Background dimming",
        clearBackground: "Reset background wallpaper",
        gridFormat: "Grid format",
        legalHeader: "User Agreement",
        eulaSubtitle: "Age verification and user agreement",
        slideshow: "Slideshow",
        slideshowStop: "Stop",
        slideshowFinished: "Slideshow finished",
        slideshowStopped: "Slideshow stopped",
        slideshowStarted: "Slideshow started",
        detailFill: "Fill",
        detailContain: "Contain",
        previousPhoto: "Previous post",
        nextPhoto: "Next post",
        bookmark: "Bookmark",
        bookmarked: "Bookmarked",
        analyzingRecommendations: "Analyzing your preferences...",
        commentsLoading: "Loading comments...",
        commentsAuthRequired: "Connect your account in Settings first.",
        favoriteSearchAdded: "Search combination added to favorites!",
        favoriteSearchRemoved: "Search combination removed from favorites",
        emptySearchHistory: "Search history is empty",
        searchHistoryHeading: "Search history:",
        clear: "Clear",
        searchHistoryCleared: "Search history cleared!",
        backupCreated: "Backup created successfully!",
        backupCreateError: "Could not create the backup.",
        backupCodeRequired: "Enter a backup code first.",
        backupRestored: "Backup restored! Restarting...",
        backupDecodeError: "Could not decode the backup.",
        codeCopied: "Code copied!",
        proxySaved: "Proxy settings saved!",
        languageChanged: "Language changed to English!",
        roundingUpdated: "Interface rounding updated!",
        accentUpdated: "Color scheme updated!",
        pinConfigured: "PIN configured successfully!",
        pinDisabled: "PIN disabled",
        backgroundApplied: "Background wallpaper applied!",
        backgroundReset: "Background wallpaper reset.",
        authSaved: "Account saved successfully!",
        authSignedOut: "You signed out.",
        randomFailed: "Could not load a random post.",
        createPin: "Create a PIN",
        enterPin: "Enter your PIN",
        repeatPin: "Repeat the PIN to confirm",
        pinMismatch: "PINs do not match. Try again",
        invalidPin: "Invalid PIN",
        holdToDownload: "(Hold to download)",
        openingMedia: "Opening the file. Hold it to download!",
        downloadingMedia: "Downloading file...",
        downloadComplete: "Download started. The file will appear in Download/Chromium E621",
        downloadFailed: "Could not save the file",
        panicSettingsOnly: "Panic mode can only be disabled from Settings!",
        connectionError: "Connection error",
        debugReady: "[SYSTEM] chrom24 debug console is ready...",
        eulaText: `<b>USER AGREEMENT & END-USER LICENSE AGREEMENT (EULA)</b><br><br>
1. <b>Age Attestation (18+):</b> This software client provides direct portal access to adult-oriented visual media. Continued entry strictly certifies that you are at least 18 years old or have reached the legal age of maturity under your local jurisdiction.<br><br>
2. <b>Disclaimer of Content Ownership:</b> This mobile wrapper is an unofficial, community-built, open-source API portal. The developer of this app <b>does not host, store, moderate, upload, or own</b> any of the displayed files. All digital materials are retrieved dynamically via public API queries from e621.net servers.<br><br>
3. <b>Intellectual Property & DMCA Compliance:</b> All artworks and character designs remain the exclusive property of their respective creators. In compliance with the Digital Millennium Copyright Act (DMCA), all formal copyright complaints or takedown actions must be directed directly to e621.net administrators where files physically reside.<br><br>
4. <b>Local Security Protocols:</b> The application retains settings, bookmarks, and authorization keys securely using the device browser's LocalStorage. Credentials are securely encrypted inside the client sandbox and never transmitted to developer servers. Access is physically restricted without your PIN.<br><br>
5. <b>Liability Indemnity:</b> The developer is completely indemnified from any direct or indirect civil liability, legal dispute, system crash, or damages arising from the use of this technical tool.`
      }
    };

    const cryptoCore = {
      getSalt(customPin) {
        const baseSeed = "ChromiumE621MobileClientSymmetricKey2026!";
        if (!customPin) return baseSeed;
        let hash = 0;
        for (let i = 0; i < customPin.length; i++) {
          hash = (hash << 5) - hash + customPin.charCodeAt(i);
          hash |= 0;
        }
        return baseSeed + "_" + Math.abs(hash);
      },
      encrypt(text, customPin) {
        if (!text) return "";
        const salt = this.getSalt(customPin);
        let output = "";
        for (let i = 0; i < text.length; i++) {
          const charCode = text.charCodeAt(i) ^ salt.charCodeAt(i % salt.length);
          output += String.fromCharCode(charCode);
        }
        return btoa(encodeURIComponent(output));
      },
      decrypt(cipherText, customPin) {
        if (!cipherText) return "";
        try {
          const salt = this.getSalt(customPin);
          const raw = decodeURIComponent(atob(cipherText));
          let output = "";
          for (let i = 0; i < raw.length; i++) {
            const charCode = raw.charCodeAt(i) ^ salt.charCodeAt(i % salt.length);
            output += String.fromCharCode(charCode);
          }
          return output;
        } catch (e) {
          console.error("Decryption failed.", e);
          return "";
        }
      }
    };

    let state = {
      language: safeLocalStorage.getItem('p_e621_lang') || 'ru',
      bookmarks: safeJSONParse(safeLocalStorage.getItem('p_e621_bookmarks'), []),
      bookmarksR34: safeJSONParse(safeLocalStorage.getItem('p_rule34_bookmarks'), []),
      blacklist: safeJSONParse(safeLocalStorage.getItem('p_e621_blacklist'), ["scat", "goregasm", "guffy"]),
      blacklistR34: safeJSONParse(safeLocalStorage.getItem('p_rule34_blacklist'), []),
      apiProvider: safeLocalStorage.getItem('p_api_provider') || 'e621',
      trafficUsed: parseFloat(safeLocalStorage.getItem('p_e621_traffic') || '0.0'),
      trafficUsedR34: parseFloat(safeLocalStorage.getItem('p_rule34_traffic') || '0.0'),
      settings: {
        dataBudget: safeLocalStorage.getItem('p_e621_set_budget') !== 'false',
        ramSafeguard: safeLocalStorage.getItem('p_e621_set_ram') !== 'false',
        ecoMode: safeLocalStorage.getItem('p_e621_set_eco') === 'true',
        layout: safeLocalStorage.getItem('p_e621_layout') || 'squares',
        ratings: safeJSONParse(safeLocalStorage.getItem('p_e621_ratings'), ["0+", "16+"]),
        feedFit: safeLocalStorage.getItem('p_e621_feed_fit') || 'cover',
        apiBaseUrl: safeLocalStorage.getItem('p_e621_api_base') || 'https://e621.net',
        proxyMode: safeLocalStorage.getItem('p_e621_proxy_mode') || 'fallback',
        customProxyPrefix: safeLocalStorage.getItem('p_e621_custom_proxy') || '',
        pinEnabled: safeLocalStorage.getItem('p_e621_pin_enabled') === 'true',
        nsfwBlur: safeLocalStorage.getItem('p_e621_nsfw_blur') !== 'false',
        startupAnim: safeLocalStorage.getItem('p_e621_startup_anim') !== 'false'
      },
      filterAI: safeLocalStorage.getItem('p_e621_filter_ai') === 'true',
      filterAIR34: safeLocalStorage.getItem('p_rule34_filter_ai') === 'true',
      panicActive: safeLocalStorage.getItem('p_e621_panic_active') === 'true',
      prePanicRatings: safeJSONParse(safeLocalStorage.getItem('p_e621_pre_panic_ratings'), ["0+", "16+"]),
      encryptedAuth: safeLocalStorage.getItem('p_e621_auth_enc') || '',
      auth: { "username": "", "apiKey": "" },
      authR34: {
        userId: safeLocalStorage.getItem('p_rule34_userid') || '',
        apiKey: safeLocalStorage.getItem('p_rule34_apikey') || ''
      },
      customization: safeJSONParse(safeLocalStorage.getItem('p_e621_customization'), { "accent": "#2563eb", "radius": "8px" }),
      customizationR34: safeJSONParse(safeLocalStorage.getItem('p_rule34_customization'), { "accent": "#2563eb" }),
      tagFreq: safeJSONParse(safeLocalStorage.getItem('p_e621_tag_freq'), {}),
      favSearches: safeJSONParse(safeLocalStorage.getItem('p_e621_fav_searches'), []),
      searchHistory: safeJSONParse(safeLocalStorage.getItem('p_e621_search_history'), []),
      history: safeJSONParse(safeLocalStorage.getItem('p_e621_history'), []),
      historyR34: safeJSONParse(safeLocalStorage.getItem('p_rule34_history'), []),
      totalTime: parseInt(safeLocalStorage.getItem('p_e621_total_time') || '0'),
      customBg: safeLocalStorage.getItem('p_e621_custom_bg') || '',
      bgOpacity: safeLocalStorage.getItem('p_e621_bg_opacity') || '0.9',
      lastSearchTags: safeLocalStorage.getItem('p_e621_last_search') || '',
      popularPeriod: readStoredOption('p_e621_popular_period', ['all', '1d', '7d', '30d', 'alltime'], 'all'),

      tempPinInput: "",
      setupPinMode: false,
      newPinRegister: "",

      currentPostPool: [],
      debugDelayActive: false,
      debugErrorMock: false,
      debugRequestLog: false,
      debugPostLimit: 30,

      videoPlays: parseInt(safeLocalStorage.getItem('p_e621_stat_videos') || '0'),
      videoPlaysR34: parseInt(safeLocalStorage.getItem('p_rule34_stat_videos') || '0'),
      searchCounter: parseInt(safeLocalStorage.getItem('p_e621_stat_searches') || '0'),
      searchCounterR34: parseInt(safeLocalStorage.getItem('p_rule34_stat_searches') || '0'),

      slideshowActive: false,
      slideshowIntervalId: null,
      slideshowDuration: 4000,
      randomModeActive: false,

      detailFitZoom: 'contain',
      mediaTypeFilter: readStoredOption('p_e621_media_type', ['all', 'photo', 'video'], 'all')
    };

    function getProviderState() {
      if (state.apiProvider === 'rule34') {
        return {
          bookmarks: state.bookmarksR34,
          history: state.historyR34,
          trafficUsed: state.trafficUsedR34,
          videoPlays: state.videoPlaysR34,
          searchCounter: state.searchCounterR34,
          customization: state.customizationR34
        };
      }

      return {
        bookmarks: state.bookmarks,
        history: state.history,
        trafficUsed: state.trafficUsed,
        videoPlays: state.videoPlays,
        searchCounter: state.searchCounter,
        customization: state.customization
      };
    }

    function getActiveAccent() {
      return getProviderState().customization?.accent || '#2563eb';
    }

    function t(key) {
      const activeLang = state.language || 'ru';
      return translations[activeLang][key] || translations['ru'][key] || key;
    }

    function localized(ruText, enText) {
      return state.language === 'ru' ? ruText : enText;
    }

    const DOM = {
      galleryGrid: document.getElementById('gallery-grid'),
      bookmarksGrid: document.getElementById('bookmarks-grid'),
      recsGrid: document.getElementById('recs-grid'),
      detailOverlay: document.getElementById('detail-overlay'),
      legalOverlay: document.getElementById('legal-overlay'),
      detailMediaWrapper: document.getElementById('detail-media-wrapper'),
      detailTagsContainer: document.getElementById('detail-tags-container'),
      pinOverlayScreen: document.getElementById('pin-overlay-screen'),
      customBgInput: document.getElementById('custom-bg-input'),
      ratingSafe: document.getElementById('rating-safe'),
      ratingQuestionable: document.getElementById('rating-questionable'),
      ratingExplicit: document.getElementById('rating-explicit'),
      blacklistChips: document.getElementById('blacklist-chips'),
      blacklistInput: document.getElementById('blacklist-input'),
      settingsRadius: document.getElementById('setting-radius'),
      settingFeedFit: document.getElementById('setting-feed-fit'),
      ecoModeCheckbox: document.getElementById('setting-eco-mode'),
      blurNsfwCheckbox: document.getElementById('setting-nsfw-blur'),
      pinCheckbox: document.getElementById('setting-pin-enabled'),
      bgOpacityRange: document.getElementById('bg-opacity-range'),
      detailPrevBtn: document.getElementById('detail-prev-btn'),
      detailNextBtn: document.getElementById('detail-next-btn'),
      detailDownloadBtn: document.getElementById('detail-download-btn'),
      loadingIndicator: document.getElementById('loading-indicator'),
      appHeader: document.getElementById('app-header')
    };

    function isAdmin() {
      return state.auth.username === 'chrom24' && state.auth.apiKey === 'hX487Mv3CFxENX3nsFL8ZEEf';
    }

    function toggleAdminPanelVisibility() {
      const panel = document.getElementById('group-admin-debug');
      if (panel) {
        if (isAdmin()) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      }
    }

    function addDebugLog(msg) {
      const logger = document.getElementById('admin-debug-log');
      if (logger) {
        logger.dataset.hasActivity = 'true';
        const time = new Date().toLocaleTimeString();
        logger.innerHTML += `\n[${time}] ${msg}`;
        logger.scrollTop = logger.scrollHeight;
      }
    }

    function debugAction(id) {
      if ('vibrate' in navigator) navigator.vibrate(25);
      switch (id) {
        case 1:
          document.querySelectorAll('img, video').forEach(media => {
            if (media.src) media.src = '';
          });
          const grid = document.getElementById('gallery-grid');
          if (grid) grid.innerHTML = '';
          addDebugLog("Изображения выгружены из памяти (DOM).");
          showToast("Кэш очищен!");
          break;
        case 2:
          state.searchHistory = [];
          state.lastSearchTags = '';
          safeLocalStorage.setItem('p_e621_search_history', '[]');
          safeLocalStorage.setItem('p_e621_last_search_tags', '');
          addDebugLog("История поисков и последние теги удалены.");
          showToast("История очищена!");
          break;
        case 3:
          const turboId = 'turbo-mode-style';
          let turbo = document.getElementById(turboId);
          if (turbo) {
            turbo.remove();
            showToast("Турбо отключен");
            addDebugLog("Турбо-режим отключен.");
          } else {
            turbo = document.createElement('style');
            turbo.id = turboId;
            turbo.innerHTML = '* { box-shadow: none !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }';
            document.head.appendChild(turbo);
            showToast("Турбо-режим активирован!");
            addDebugLog("Активирован Турбо-режим (выключены тени и блюры).");
          }
          break;
        case 4:
          switchView('gallery');
          const gallery = document.getElementById('gallery-grid');
          if (gallery) {
            for (let i = 0; i < 20; i++) {
              const el = document.createElement('div');
              el.className = 'post-card';
              el.style.backgroundColor = `hsl(${Math.random() * 360}, 60%, 20%)`;
              el.style.minHeight = '150px';
              el.innerHTML = `<div class="p-2 text-xs font-bold text-white/50 text-center mt-10">Dummy ${Math.floor(Math.random() * 1000)}</div>`;
              gallery.appendChild(el);
            }
          }
          addDebugLog("Добавлено 20 визуальных Dummy-постов в галерею.");
          showToast("Посты сгенерированы!");
          break;
        case 5:
          state.blacklist = [];
          safeLocalStorage.setItem('p_e621_blacklist', '[]');
          if (typeof renderBlacklistChips === 'function') renderBlacklistChips();
          addDebugLog("Черный список тегов обнулен.");
          showToast("Черный список пуст!");
          break;
        case 6:
          state.customization.accent = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
          state.bgOpacity = Math.floor(Math.random() * 80) + 10;
          safeLocalStorage.setItem('p_e621_customization', JSON.stringify(state.customization));
          safeLocalStorage.setItem('p_e621_bg_opacity', state.bgOpacity);
          applyCustomStyles();
          applyBgOpacity(state.bgOpacity);
          addDebugLog("Применена случайная тема и прозрачность фона.");
          showToast("Тема изменена!");
          break;
        case 7:
          showToast("Успех: База обновлена", false);
          setTimeout(() => showToast("Внимание: Низкий заряд", false), 1000);
          setTimeout(() => showToast("Ошибка: Нет сети", true), 2000);
          addDebugLog("Тестовые уведомления отправлены.");
          break;
        case 8:
          state.trafficUsed = 0.0;
          safeLocalStorage.setItem('p_e621_traffic', '0.0');
          const tVal = document.getElementById('traffic-val');
          if (tVal) tVal.textContent = '0.0';
          addDebugLog("Счетчик скачанных мегабайт сброшен.");
          showToast("Трафик 0.0 MB");
          break;
        case 9:
          state.totalTime = 0;
          safeLocalStorage.setItem('p_e621_total_time', '0');
          if (typeof updateStatsUI === 'function') updateStatsUI();
          addDebugLog("Время сессии обнулено.");
          showToast("Время сброшено!");
          break;
        case 10:
          if (confirm(localized("Вы уверены? Это удалит ВСЕ локальные данные.", "Are you sure? This deletes ALL local data."))) {
            localStorage.clear();
            addDebugLog("Очистка завершена. Перезагрузка...");
            setTimeout(() => window.location.reload(), 500);
          }
          break;
      }
    }

    function generateBackupCode() {
      try {
        const payload = {
          bookmarks: state.bookmarks,
          bookmarksR34: state.bookmarksR34,
          authR34: state.authR34,
          blacklist: state.blacklist,
          blacklistR34: state.blacklistR34,
          filterAI: state.filterAI,
          filterAIR34: state.filterAIR34,
          customization: state.customization,
          customizationR34: state.customizationR34,
          favSearches: state.favSearches,
          searchHistory: state.searchHistory,
          history: state.history,
          historyR34: state.historyR34,
          totalTime: state.totalTime,
          customBg: state.customBg,
          bgOpacity: state.bgOpacity,
          trafficUsed: state.trafficUsed,
          trafficUsedR34: state.trafficUsedR34,
          videoPlays: state.videoPlays,
          videoPlaysR34: state.videoPlaysR34,
          searchCounter: state.searchCounter,
          searchCounterR34: state.searchCounterR34,
          lastSearchTags: state.lastSearchTags,
          pinCode: safeLocalStorage.getItem('p_e621_pin_code') || '',
          encryptedAuth: safeLocalStorage.getItem('p_e621_auth_enc') || '',
          settings: {
            dataBudget: state.settings.dataBudget,
            ramSafeguard: state.settings.ramSafeguard,
            ecoMode: state.settings.ecoMode,
            layout: state.settings.layout,
            ratings: state.settings.ratings,
            feedFit: state.settings.feedFit,
            apiBaseUrl: state.settings.apiBaseUrl,
            proxyMode: state.settings.proxyMode,
            customProxyPrefix: state.settings.customProxyPrefix,
            pinEnabled: state.settings.pinEnabled,
            nsfwBlur: state.settings.nsfwBlur,
            mediaTypeFilter: state.mediaTypeFilter,
            popularPeriod: state.popularPeriod
          }
        };
        const jsonStr = JSON.stringify(payload);

        const encoded = btoa(encodeURIComponent(jsonStr).replace(/%[0-9A-F]{2}/g, function (match) {
          return String.fromCharCode(parseInt(match.slice(1), 16));
        }));

        const codeArea = document.getElementById('backup-code-area');
        const outputWrap = document.getElementById('backup-output-wrap');

        if (codeArea && outputWrap) {
          codeArea.value = encoded;
          outputWrap.classList.remove('hidden');
          showToast(t('backupCreated'));
        }
      } catch (err) {
        showToast(t('backupCreateError'));
      }
    }

    function restoreBackupFromCode(code) {
      if (!code) {
        showToast(t('backupCodeRequired'));
        return;
      }
      try {
        const decoded = decodeURIComponent(atob(code.trim()).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const payload = JSON.parse(decoded);

        if (payload.bookmarks) state.bookmarks = payload.bookmarks;
        if (payload.bookmarksR34) {
          state.bookmarksR34 = payload.bookmarksR34;
          safeLocalStorage.setItem('p_rule34_bookmarks', JSON.stringify(state.bookmarksR34));
        }
        if (payload.blacklistR34) {
          state.blacklistR34 = payload.blacklistR34;
          safeLocalStorage.setItem('p_rule34_blacklist', JSON.stringify(state.blacklistR34));
        }
        if (payload.authR34) {
          state.authR34 = payload.authR34;
          safeLocalStorage.setItem('p_rule34_userid', state.authR34.userId || '');
          safeLocalStorage.setItem('p_rule34_apikey', state.authR34.apiKey || '');
        }
        if (payload.blacklist) state.blacklist = payload.blacklist;
        if (payload.blacklistR34) state.blacklistR34 = payload.blacklistR34;
        if (typeof payload.filterAI === 'boolean') state.filterAI = payload.filterAI;
        if (typeof payload.filterAIR34 === 'boolean') state.filterAIR34 = payload.filterAIR34;
        if (payload.customization) state.customization = payload.customization;
        if (payload.customizationR34) state.customizationR34 = payload.customizationR34;
        if (payload.favSearches) state.favSearches = payload.favSearches;
        if (payload.searchHistory) state.searchHistory = payload.searchHistory;
        if (payload.history) state.history = payload.history;
        if (payload.historyR34) state.historyR34 = payload.historyR34;
        if (payload.totalTime) state.totalTime = payload.totalTime;
        if (payload.customBg) state.customBg = payload.customBg;
        if (payload.bgOpacity) state.bgOpacity = payload.bgOpacity;
        if (payload.trafficUsed) state.trafficUsed = payload.trafficUsed;
        if (payload.trafficUsedR34) state.trafficUsedR34 = payload.trafficUsedR34;
        if (Number.isFinite(payload.videoPlays)) state.videoPlays = payload.videoPlays;
        if (Number.isFinite(payload.videoPlaysR34)) state.videoPlaysR34 = payload.videoPlaysR34;
        if (Number.isFinite(payload.searchCounter)) state.searchCounter = payload.searchCounter;
        if (Number.isFinite(payload.searchCounterR34)) state.searchCounterR34 = payload.searchCounterR34;
        if (typeof payload.lastSearchTags === 'string') {
          state.lastSearchTags = payload.lastSearchTags;
          currentSearchTags = payload.lastSearchTags;
        }

        if (payload.settings) {
          state.settings.ratings = payload.settings.ratings || ["0+", "16+"];
          state.settings.feedFit = payload.settings.feedFit || "cover";
          state.settings.layout = payload.settings.layout || "squares";
          state.settings.nsfwBlur = payload.settings.nsfwBlur !== false;
          state.settings.pinEnabled = payload.settings.pinEnabled === true;
          state.settings.dataBudget = payload.settings.dataBudget !== false;
          state.settings.ramSafeguard = payload.settings.ramSafeguard !== false;
          state.settings.ecoMode = payload.settings.ecoMode === true;
          state.settings.apiBaseUrl = payload.settings.apiBaseUrl || "https://e621.net";
          state.settings.proxyMode = payload.settings.proxyMode || "fallback";
          state.settings.customProxyPrefix = payload.settings.customProxyPrefix || "";
          state.mediaTypeFilter = normalizeStoredOption(payload.settings.mediaTypeFilter, ['all', 'photo', 'video'], 'all');
          state.popularPeriod = normalizeStoredOption(payload.settings.popularPeriod, ['all', '1d', '7d', '30d', 'alltime'], 'all');
          currentPopularPeriod = state.popularPeriod;
        }

        safeLocalStorage.setItem('p_e621_bookmarks', JSON.stringify(state.bookmarks));
        safeLocalStorage.setItem('p_e621_blacklist', JSON.stringify(state.blacklist));
        safeLocalStorage.setItem('p_e621_filter_ai', String(state.filterAI));
        safeLocalStorage.setItem('p_rule34_filter_ai', String(state.filterAIR34));
        safeLocalStorage.setItem('p_e621_customization', JSON.stringify(state.customization));
        safeLocalStorage.setItem('p_rule34_customization', JSON.stringify(state.customizationR34));
        safeLocalStorage.setItem('p_e621_fav_searches', JSON.stringify(state.favSearches));
        safeLocalStorage.setItem('p_e621_search_history', JSON.stringify(state.searchHistory));
        safeLocalStorage.setItem('p_e621_history', JSON.stringify(state.history));
        safeLocalStorage.setItem('p_rule34_history', JSON.stringify(state.historyR34));
        safeLocalStorage.setItem('p_e621_total_time', state.totalTime);
        safeLocalStorage.setItem('p_e621_custom_bg', state.customBg);
        safeLocalStorage.setItem('p_e621_bg_opacity', state.bgOpacity);
        safeLocalStorage.setItem('p_e621_traffic', state.trafficUsed);
        safeLocalStorage.setItem('p_rule34_traffic', state.trafficUsedR34);
        safeLocalStorage.setItem('p_e621_stat_videos', state.videoPlays);
        safeLocalStorage.setItem('p_rule34_stat_videos', state.videoPlaysR34);
        safeLocalStorage.setItem('p_e621_stat_searches', state.searchCounter);
        safeLocalStorage.setItem('p_rule34_stat_searches', state.searchCounterR34);
        safeLocalStorage.setItem('p_e621_last_search', state.lastSearchTags);

        safeLocalStorage.setItem('p_e621_ratings', JSON.stringify(state.settings.ratings));
        safeLocalStorage.setItem('p_e621_feed_fit', state.settings.feedFit);
        safeLocalStorage.setItem('p_e621_layout', state.settings.layout);
        safeLocalStorage.setItem('p_e621_nsfw_blur', state.settings.nsfwBlur);
        safeLocalStorage.setItem('p_e621_pin_enabled', state.settings.pinEnabled);
        safeLocalStorage.setItem('p_e621_set_budget', state.settings.dataBudget);
        safeLocalStorage.setItem('p_e621_set_ram', state.settings.ramSafeguard);
        safeLocalStorage.setItem('p_e621_set_eco', state.settings.ecoMode);
        safeLocalStorage.setItem('p_e621_api_base', state.settings.apiBaseUrl);
        safeLocalStorage.setItem('p_e621_proxy_mode', state.settings.proxyMode);
        safeLocalStorage.setItem('p_e621_custom_proxy', state.settings.customProxyPrefix);
        safeLocalStorage.setItem('p_e621_media_type', state.mediaTypeFilter);
        safeLocalStorage.setItem('p_e621_popular_period', state.popularPeriod);

        if (payload.pinCode) {
          safeLocalStorage.setItem('p_e621_pin_code', payload.pinCode);
        } else {
          safeLocalStorage.removeItem('p_e621_pin_code');
        }

        if (payload.encryptedAuth) {
          safeLocalStorage.setItem('p_e621_auth_enc', payload.encryptedAuth);
        } else {
          safeLocalStorage.removeItem('p_e621_auth_enc');
        }

        showToast(t('backupRestored'));
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } catch (err) {
        showToast(t('backupDecodeError'));
      }
    }

    function resolveEncryptedCredentials(pinAttempt = "") {
      const storedEnc = safeLocalStorage.getItem('p_e621_auth_enc');
      if (storedEnc) {
        try {
          const rawDecrypted = cryptoCore.decrypt(storedEnc, pinAttempt);
          const parsed = JSON.parse(rawDecrypted);
          if (parsed && parsed.username) {
            state.auth = parsed;
            toggleAdminPanelVisibility();
            return true;
          }
        } catch (e) {
          console.warn("Неверная дешифровка API-ключей.");
        }
      }

      const legacyAuth = safeLocalStorage.getItem('p_e621_auth');
      if (legacyAuth) {
        state.auth = safeJSONParse(legacyAuth, { "username": "", "apiKey": "" });
        reEncryptCredentials(pinAttempt);
        safeLocalStorage.removeItem('p_e621_auth');
        toggleAdminPanelVisibility();
        return true;
      }
      return false;
    }

    function reEncryptCredentials(pinCode) {
      if (state.auth.username && state.auth.apiKey) {
        const payloadString = JSON.stringify(state.auth);
        const ciphertext = cryptoCore.encrypt(payloadString, pinCode);
        safeLocalStorage.setItem('p_e621_auth_enc', ciphertext);
        safeLocalStorage.removeItem('p_e621_auth');
      } else {
        safeLocalStorage.removeItem('p_e621_auth_enc');
        safeLocalStorage.removeItem('p_e621_auth');
      }
    }

    function toggleAccordion(id) {
      const group = document.getElementById(id);
      if (!group) return;

      const wrapper = group.querySelector('.settings-content-wrapper');
      if (!wrapper) return;

      const isOpen = group.classList.contains('active');

      if (isOpen) {
        wrapper.style.maxHeight = wrapper.scrollHeight + 'px';
        wrapper.offsetHeight;
        wrapper.style.maxHeight = '0px';
        group.classList.remove('active');
      } else {
        wrapper.style.maxHeight = wrapper.scrollHeight + 'px';
        group.classList.add('active');

        const handler = () => {
          if (group.classList.contains('active')) {
            wrapper.style.maxHeight = 'none';
          }
          wrapper.removeEventListener('transitionend', handler);
        };
        wrapper.addEventListener('transitionend', handler);
      }
    }

    function updateGreeting() {
      const el = document.getElementById('user-greeting');
      if (!el) return;
      const hour = new Date().getHours();
      let timeKey = '';
      if (hour >= 6 && hour < 12) timeKey = 'greetingMorning';
      else if (hour >= 12 && hour < 18) timeKey = 'greetingDay';
      else if (hour >= 18 && hour < 23) timeKey = 'greetingEvening';
      else timeKey = 'greetingNight';

      let greeting = 'Добрый день';
      let anon = 'аноним';
      if (typeof t === 'function') {
        greeting = t(timeKey);
        anon = t('greetingAnon');
      } else if (typeof translations !== 'undefined') {
        const lang = state.language || 'ru';
        greeting = translations[lang][timeKey];
        anon = translations[lang].greetingAnon;
      }

      const nick = (state.auth && state.auth.username) ? state.auth.username : anon;
      el.textContent = greeting + ", " + nick;
    }

    function translateUI() {
      updateGreeting();
      document.documentElement.lang = state.language;
      safePlaceholder('search-input', t('searchPlaceholder'));
      safePlaceholder('blacklist-input', state.language === 'ru' ? 'Введите тег...' : 'Enter tag...');
      safeText('media-type-label-all', t('mediaAll'));
      safeText('media-type-label-photo', t('mediaPhoto'));
      safeText('media-type-label-video', t('mediaVideo'));

      const favoriteTagsBtn = document.getElementById('fav-search-btn');
      const searchHistoryBtn = document.getElementById('history-search-btn');
      if (favoriteTagsBtn) favoriteTagsBtn.title = t('favoriteTagsTitle');
      if (searchHistoryBtn) searchHistoryBtn.title = t('searchHistoryTitle');

      safeText('p-feed', t('feed'));
      safeText('p-day', t('day'));
      safeText('p-week', t('week'));
      safeText('p-month', t('month'));
      safeText('p-alltime', t('allTime'));

      safeText('lbl-local-favs', t('localFavs'));
      safeText('lbl-rec-desc', t('recDesc'));
      safeText('lbl-recs-title', t('recommendations'));

      safeText('sum-security-suite', t('sum-security-suite'));
      safeText('sum-appearance', t('sum-appearance'));
      safeText('sum-safety', state.language === 'ru' ? 'Фильтры и черный список' : 'Filters & Blacklist');
      safeHTML('lbl-filter-ai', state.language === 'ru'
        ? 'Скрывать AI-посты<span>Фильтровать изображения, созданные или обработанные генеративным ИИ</span>'
        : 'Hide AI posts<span>Filter images created or modified with generative AI</span>');
      safeText('sum-traffic', state.language === 'ru' ? 'Трафик и производительность' : 'Traffic & Performance');
      safeText('sum-backup-suite', t('sum-backup-suite'));
      safeText('sum-legal-info', t('legalInfo'));
      safeText('sum-proxy', t('proxyTitle'));
      safeText('sum-account', t('accountTitle'));
      safeText('sum-account-r34', t('r34AccountTitle'));
      safeText('lbl-r34-auth-desc', t('r34AuthDesc'));
      safePlaceholder('auth-r34-userid', t('r34UserIdLabel'));
      safePlaceholder('auth-r34-apikey', t('r34ApiKeyLabel'));
      const saveR34BtnEl = document.getElementById('save-r34-auth-btn');
      if (saveR34BtnEl) saveR34BtnEl.textContent = t('r34SaveBtn');
      safeText('sum-dev-panel', state.language === 'ru' ? 'Панель разработчика' : 'Developer Control Room');

      const debugLabels = t('debugActions');
      document.querySelectorAll('#admin-debug-grid button').forEach((button, index) => {
        if (debugLabels[index]) button.textContent = debugLabels[index];
      });
      const debugLogger = document.getElementById('admin-debug-log');
      if (debugLogger && debugLogger.dataset.hasActivity !== 'true') {
        debugLogger.textContent = t('debugReady');
      }

      safeText('lbl-lang-title', t('langTitle'));
      safeText('lbl-custom-bg-section', t('customBackground'));
      safeText('lbl-bg-opacity', t('backgroundOpacity'));
      safeText('clear-bg-btn', t('clearBackground'));

      ['lang-btn-ru', 'eula-lang-ru'].forEach(id => {
        document.getElementById(id)?.classList.toggle('is-active', state.language === 'ru');
      });
      ['lang-btn-en', 'eula-lang-en'].forEach(id => {
        document.getElementById(id)?.classList.toggle('is-active', state.language === 'en');
      });

      safeText('lbl-stats-title', t('statsTitle'));
      safeText('lbl-stat-viewed', t('statViewed'));
      safeText('lbl-stat-liked', t('statLiked'));
      safeText('lbl-stat-loaded-mb', t('statLoadedMb'));
      safeText('lbl-stat-videos', t('statVideos'));
      safeText('lbl-stat-fav-rating', t('statFavRating'));
      safeText('lbl-stat-avg-score', t('statAvgScore'));
      safeText('lbl-stat-time', t('statTime'));
      safeText('lbl-stat-frequent', t('statFrequent'));

      safeText('lbl-auth-desc', t('authDesc'));
      safePlaceholder('auth-username', t('username'));
      safePlaceholder('auth-api-key', t('apiKey'));
      safeText('save-auth-btn', t('saveConnect'));
      safeText('btn-reg', t('reg'));

      safeText('lbl-backup-desc', t('backupDesc'));
      safeText('btn-generate-backup', t('backupGenerate'));
      safeText('btn-copy-backup-code', t('backupCopy'));
      safeText('lbl-import-code', t('backupImport'));
      safePlaceholder('import-backup-input', t('backupPlaceholder'));
      safeText('btn-restore-backup', t('backupRestore'));

      safeText('lbl-api-base', t('apiBaseLabel'));
      safeText('lbl-proxy-mode', t('proxyModeLabel'));
      safeText('opt-proxy-direct', t('proxyDirect'));
      safeText('opt-proxy-fallback', t('proxyFallback'));
      safeText('opt-proxy-custom', t('proxyCustom'));
      safeText('lbl-custom-proxy', t('customProxyLabel'));
      safeText('save-proxy-btn', t('saveProxy'));

      safeHTML('lbl-rounding', t('roundingTitle') + "<span>" + t('roundingDesc') + "</span>");
      safeText('opt-radius-none', t('radiusNone'));
      safeText('opt-radius-standard', t('radiusStandard'));
      safeText('opt-radius-extreme', t('radiusExtreme'));
      safeHTML('lbl-feed-fit', t('feedFitTitle') + "<span>" + t('feedFitDesc') + "</span>");
      safeText('opt-fit-cover', t('fitCover'));
      safeText('opt-fit-contain', t('fitContain'));
      safeHTML('lbl-accent', t('accent') + "<span>" + t('accentDesc') + "</span>");

      safeHTML('lbl-rate-safe', state.language === 'ru' ? '0+ (Safe / Безопасно)<span>Подходит для всех</span>' : '0+ (Safe)<span>For all audiences</span>');
      safeHTML('lbl-rate-quest', state.language === 'ru' ? '16+ (Questionable / Сомнительно)<span>Легкая эротика / намеки</span>' : '16+ (Questionable)<span>Suggestive themes</span>');
      safeHTML('lbl-rate-expl', state.language === 'ru' ? '18+ (Explicit / Откровенно)<span>Контент для взрослых</span>' : '18+ (Explicit)<span>Adult content only</span>');

      safeHTML('lbl-budget', t('budget') + "<span>" + (state.language === 'ru' ? "Снижать качество при > 50 МБ" : "Restrict scale over 50 MB") + "</span>");
      safeHTML('lbl-ram', t('ram') + "<span>" + (state.language === 'ru' ? "Выгружать невидимые картинки" : "Clear card memories when invisible") + "</span>");
      safeHTML('lbl-eco-mode', (state.language === 'ru' ? "Энергосберегающий режим<span>Отключает размытия и эффекты</span>" : "Eco Save Mode<span>Disables heavy blurs & transitions</span>"));
      safeHTML('lbl-startup-anim', (state.language === 'ru' ? "Анимация запуска<span>Плавное появление интерфейса при старте</span>" : "Startup Animation<span>Smooth interface reveal on launch</span>"));
      safeHTML('lbl-pin-toggle', (state.language === 'ru' ? "Защита четырехзначным PIN<span>Запрашивать при запуске и выходе</span>" : "4-Digit PIN Protection<span>Request code on startup</span>"));
      safeHTML('lbl-nsfw-blur-toggle', (state.language === 'ru' ? "Размывать 18+ контент<span>Скрывать превью до клика</span>" : "NSFW Blur Protection<span>Blur explicit feeds until clicked</span>"));
      safeText('set-pin-btn', t('changePin'));

      safeText('lbl-layout-title', t('layoutTitle'));
      safeText('lbl-grid-format', t('gridFormat'));
      safeText('shuffler-square', t('layoutSquare'));
      safeText('shuffler-masonry', t('layoutMasonry'));
      safeText('shuffler-story', t('layoutStory'));

      safeText('lbl-blacklist-title', t('blacklistTitle'));
      safeText('lbl-comments-title', t('comments'));
      safeText('lbl-legal-desc', t('legalDesc'));
      safeText('lbl-btn-view-legal', t('btnViewLegal'));
      safeText('lbl-legal-header-title', t('legalHeader'));

      safeText('lbl-loading-indicator-text', t('loading'));

      safeText('panic-warning-text', t('panicActiveText'));
      safeText('panic-description', t('panicDescription'));
      safeText('disable-panic-settings-btn', t('disablePanicBtn'));
      safeText('banner-text', state.language === 'ru' ? "БЕТА ТЕСТ: Приложение в стадии тестирования" : "BETA TEST: Client currently inside public testing stages");

      const downloadBtnSpan = document.getElementById('detail-download-btn')?.querySelector('span');
      if (downloadBtnSpan) downloadBtnSpan.textContent = t('downloadMedia');
      safeText('detail-fit-toggle', state.detailFitZoom === 'cover' ? t('detailContain') : t('detailFill'));
      safeText('detail-slideshow-label', state.slideshowActive ? `■ ${t('slideshowStop')}` : `▶ ${t('slideshow')}`);

      const detailPrevBtn = document.getElementById('detail-prev-btn');
      const detailNextBtn = document.getElementById('detail-next-btn');
      if (detailPrevBtn) detailPrevBtn.title = t('previousPhoto');
      if (detailNextBtn) detailNextBtn.title = t('nextPhoto');

      safeText('ind-like', state.language === 'ru' ? 'СОХРАНЕНО' : 'SAVED');
      safeText('ind-skip', state.language === 'ru' ? 'ПРОПУСК' : 'SKIP');

      safeText('tab-gallery', t('gallery'));
      safeText('tab-bookmarks', t('bookmarks'));
      safeText('tab-recs', t('recommendations'));
      safeText('tab-settings', t('settings'));
      safeText('tab-random', t('random'));

      const panicBtn = document.getElementById('quick-panic-btn');
      if (panicBtn) {
        panicBtn.title = state.language === 'ru' ? "Режим паники" : "Panic Mode";
      }

      renderLegalContent();
      updateAuthUI();
      updateBookmarkBtnState();
      updateStatsUI();
    }

    function applyCustomBackground(bgUrl) {
      if (bgUrl && !state.settings.ecoMode) {
        document.documentElement.style.setProperty('--custom-bg', `url('${bgUrl}')`);
      } else {
        document.documentElement.style.setProperty('--custom-bg', 'none');
      }
    }

    function applyBgOpacity(opacity) {
      document.documentElement.style.setProperty('--bg-opacity', opacity);
    }

    async function directFetch(baseUrl, params = {}, useAuth = true, signal = null) {
      if (state.debugErrorMock) {
        throw new Error("[MOCK SERVER ERROR 500]");
      }
      if (state.debugDelayActive) {
        await new Promise(r => setTimeout(r, 2000));
      }
      if (signal?.aborted) {
        throw new DOMException('Request aborted', 'AbortError');
      }

      let targetUrl = baseUrl;
      const customBase = state.settings.apiBaseUrl || 'https://e621.net';
      if (baseUrl.startsWith('https://e621.net')) {
        targetUrl = baseUrl.replace('https://e621.net', customBase);
      }

      const urlObj = new URL(targetUrl);

      Object.keys(params).forEach(key => {
        urlObj.searchParams.append(key, params[key]);
      });

      if (useAuth && state.auth.username && state.auth.apiKey) {
        urlObj.searchParams.append('login', state.auth.username);
        urlObj.searchParams.append('api_key', state.auth.apiKey);
      }

      const finalUrl = urlObj.toString();
      const mode = state.settings.proxyMode || 'fallback';
      const isRule34Url = finalUrl.includes('rule34.xxx');
      const headers = { 'Accept': isRule34Url ? '*/*' : 'application/json', 'User-Agent': 'ChromiumClient/3.0' };

      if (state.debugRequestLog) {
        addDebugLog(`[API REQ] ${finalUrl}`);
      }

      if (mode === 'direct') {
        return await performRawFetch(finalUrl, headers, signal);
      } else if (mode === 'custom' && state.settings.customProxyPrefix) {
        const proxiedUrl = `${state.settings.customProxyPrefix}${encodeURIComponent(finalUrl)}`;
        return await performRawFetch(proxiedUrl, headers, signal);
      } else {
        try {
          return await performRawFetch(finalUrl, headers, signal);
        } catch (directErr) {
          if (directErr.name === 'AbortError') throw directErr;
          try {
            const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(finalUrl)}`;
            return await performRawFetch(proxyUrl, headers, signal);
          } catch (proxyErr1) {
            if (proxyErr1.name === 'AbortError') throw proxyErr1;
            const allOriginsUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(finalUrl)}`;
            return await performRawFetch(allOriginsUrl, headers, signal);
          }
        }
      }
    }

    async function performRawFetch(url, headers, signal = null) {
      const response = await fetch(url, { method: 'GET', headers: headers, signal });
      if (response.ok) {
        return await response.text();
      }
      throw new Error(`${t('connectionError')}: ${response.status}`);
    }

    let activeView = 'gallery';
    let activePage = 0;
    let currentSearchTags = state.lastSearchTags;
    let isFetching = false;
    let galleryRequestId = 0;
    let activeGalleryRequest = null;
    const loadedPostIds = new Set();
    let detailCurrentPost = null;
    let currentPopularPeriod = state.popularPeriod;

    const searchInput = document.getElementById('search-input');
    const suggestionsBox = document.getElementById('suggestions');
    const clearInputBtn = document.getElementById('clear-input-btn');
    let autocompleteDebounceTimer;
    let autocompleteRequestController = null;
    const tagSuggestionCache = new Map();

    function resizeSearchInput() {
      if (!searchInput) return;
      if (!window.matchMedia('(max-width: 640px)').matches) {
        searchInput.style.height = '';
        searchInput.style.overflowY = 'hidden';
        searchInput.classList.remove('search-expanded');
        return;
      }

      searchInput.style.height = 'auto';
      const baseHeight = 40;
      const maxHeight = 96;
      const nextHeight = Math.min(maxHeight, Math.max(baseHeight, searchInput.scrollHeight));
      searchInput.style.height = `${nextHeight}px`;
      searchInput.style.overflowY = searchInput.scrollHeight > maxHeight ? 'auto' : 'hidden';
      searchInput.classList.toggle('search-expanded', nextHeight > baseHeight + 4);
    }

    function toggleClearBtn() {
      clearInputBtn.style.display = searchInput.value ? 'flex' : 'none';
      requestAnimationFrame(resizeSearchInput);
    }

    clearInputBtn.addEventListener('click', () => {
      searchInput.value = '';
      toggleClearBtn();
      suggestionsBox.style.display = 'none';
      searchInput.focus();
    });

    function formatCompactCount(value) {
      const count = Number(value);
      if (!Number.isFinite(count)) return '0';

      const units = ['', 'K', 'M', 'B', 'T'];
      let unitIndex = 0;
      let compactValue = Math.abs(count);

      while (compactValue >= 1000 && unitIndex < units.length - 1) {
        compactValue /= 1000;
        unitIndex += 1;
      }

      if (unitIndex === 0) return String(Math.trunc(count));

      if (Number(compactValue.toFixed(1)) >= 1000 && unitIndex < units.length - 1) {
        compactValue /= 1000;
        unitIndex += 1;
      }

      const sign = count < 0 ? '-' : '';
      return `${sign}${compactValue.toFixed(1)}${units[unitIndex]}`;
    }

    function parseRule34TagSuggestions(textData) {
      const payload = String(textData || '').trim();
      if (!payload) return [];

      let data;
      try {
        data = JSON.parse(payload);
      } catch (jsonError) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(payload, 'text/xml');
        if (xmlDoc.querySelector('parsererror')) return [];

        return Array.from(xmlDoc.getElementsByTagName('tag')).map(node => ({
          name: node.getAttribute('name') || '',
          post_count: parseInt(node.getAttribute('count') || '0', 10) || 0
        })).filter(item => item.name);
      }

      let items = Array.isArray(data)
        ? data
        : (Array.isArray(data?.tags) ? data.tags : []);

      if (items.length === 0 && data && typeof data === 'object'
        && (data.name || data.value || data.tag || data.label)) {
        items = [data];
      }

      if (items.length === 0 && data && typeof data === 'object') {
        items = Object.entries(data).map(([name, value]) => {
          if (value && typeof value === 'object') return { name, ...value };
          return { name, label: String(value || name) };
        });
      }

      return items.map(item => {
        if (typeof item === 'string') {
          return { name: item, post_count: 0 };
        }

        const label = String(item?.label || '');
        const labelName = label.replace(/\s*\([^)]*\)\s*$/, '');
        const rawName = item?.name || item?.tag || labelName || item?.value;
        const explicitCount = item?.post_count ?? item?.postCount ?? item?.count;
        const labelCount = label.match(/\(([\d,\s]+)\)\s*$/);
        const postCount = explicitCount != null
          ? parseInt(String(explicitCount).replace(/[^\d]/g, ''), 10)
          : parseInt((labelCount?.[1] || '0').replace(/[^\d]/g, ''), 10);

        return {
          name: String(rawName || '').trim(),
          post_count: Number.isFinite(postCount) ? postCount : 0
        };
      }).filter(item => item.name);
    }

    function getRule34ApiCredentials() {
      return {
        userId: state.authR34.userId || atob("NjUxNDE0MA=="),
        apiKey: state.authR34.apiKey || atob("YTYwNTllZmVmMTlhNmVhZTQ0Yjk4YzZjM2ZjOThkYjhhYzdlMmVjNjk1ZWM0ODBhOTZmMmE5OTA3MzU2OTVmOGJkZjNmNDk2YjgzNWNkNGFkYzIzMjA2MmMwMTRjNjhmZWY2NDJkYzE5YzU2MmI2ZjM2ZmNiZTljNDEwOGM3YWE=")
      };
    }

    function filterRule34TagSuggestions(suggestions, searchQuery) {
      const prefix = String(searchQuery || '')
        .trim()
        .replace(/^[-~]+/, '')
        .toLowerCase()
        .replace(/\s+/g, '_');
      const uniqueNames = new Set();

      return suggestions.filter(item => {
        const normalizedName = String(item?.name || '').trim().toLowerCase();
        if (!normalizedName
          || !normalizedName.startsWith(prefix)
          || uniqueNames.has(normalizedName)) {
          return false;
        }
        uniqueNames.add(normalizedName);
        return true;
      }).sort((a, b) => {
        const aExact = String(a.name).toLowerCase() === prefix ? 1 : 0;
        const bExact = String(b.name).toLowerCase() === prefix ? 1 : 0;
        return bExact - aExact;
      });
    }

    async function performCapacitorHttpGet(url, signal = null) {
      const capacitorHttp = window.Capacitor?.Plugins?.CapacitorHttp;
      if (!capacitorHttp?.get) throw new Error('CapacitorHttp unavailable');
      if (signal?.aborted) throw new DOMException('Request aborted', 'AbortError');

      const response = await capacitorHttp.get({
        url,
        headers: { Accept: 'application/json' },
        connectTimeout: 8000,
        readTimeout: 8000
      });

      if (signal?.aborted) throw new DOMException('Request aborted', 'AbortError');
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`${t('connectionError')}: ${response.status}`);
      }

      return typeof response.data === 'string'
        ? response.data
        : JSON.stringify(response.data);
    }

    async function fetchRule34Autocomplete(searchQuery, signal = null) {
      const endpoint = 'https://api.rule34.xxx/autocomplete.php';
      const url = new URL(endpoint);
      url.searchParams.set('q', searchQuery);

      try {
        return await performCapacitorHttpGet(url.toString(), signal);
      } catch (nativeError) {
        if (nativeError.name === 'AbortError') throw nativeError;
      }

      return await directFetch(endpoint, { q: searchQuery }, false, signal);
    }

    async function fetchTagSuggestions(searchQuery) {
      if (!searchQuery) return [];
      const provider = state.apiProvider;
      const normalizedQuery = searchQuery.toLowerCase();
      const providerQuery = provider === 'rule34'
        ? normalizedQuery.replace(/^[-~]+/, '')
        : normalizedQuery;
      if (!providerQuery) return [];
      const cacheKey = provider + '_' + normalizedQuery;
      if (tagSuggestionCache.has(cacheKey)) return tagSuggestionCache.get(cacheKey);

      if (autocompleteRequestController) autocompleteRequestController.abort();
      const controller = new AbortController();
      autocompleteRequestController = controller;

      try {
        let suggestions = [];
        if (provider === 'rule34') {
          const textData = await fetchRule34Autocomplete(providerQuery, controller.signal);
          suggestions = filterRule34TagSuggestions(
            parseRule34TagSuggestions(textData),
            providerQuery
          );
        } else {
          const textData = await directFetch(
            `https://e621.net/tags/autocomplete.json`,
            { 'search[name_matches]': searchQuery },
            true,
            controller.signal
          );
          const data = JSON.parse(textData);
          suggestions = Array.isArray(data) ? data : [];
        }
        if (provider !== 'rule34') {
          suggestions.sort((a, b) => (b.post_count || 0) - (a.post_count || 0));
        }
        if (suggestions.length > 0) {
          tagSuggestionCache.set(cacheKey, suggestions);
          if (tagSuggestionCache.size > 40) {
            tagSuggestionCache.delete(tagSuggestionCache.keys().next().value);
          }
        }
        return suggestions;
      } catch (err) {
        if (err.name === 'AbortError') return [];
        return [];
      } finally {
        if (autocompleteRequestController === controller) autocompleteRequestController = null;
      }
    }

    function toggleFavoriteSearch(query) {
      if (!query) return;
      const idx = state.favSearches.indexOf(query);
      if (idx === -1) {
        state.favSearches.push(query);
        showToast(t('favoriteSearchAdded'));
      } else {
        state.favSearches.splice(idx, 1);
        showToast(t('favoriteSearchRemoved'));
      }
      safeLocalStorage.setItem('p_e621_fav_searches', JSON.stringify(state.favSearches));
      renderFavoriteSearchesBar();
    }

    function renderFavoriteSearchesBar() {
      const bar = document.getElementById('favorite-searches-bar');
      if (!bar) return;
      if (state.favSearches.length === 0) {
        bar.style.display = 'none';
        return;
      }
      bar.style.display = 'flex';
      bar.innerHTML = '';
      state.favSearches.forEach(q => {
        const btn = document.createElement('button');
        btn.className = 'op-btn and flex items-center gap-1 active:scale-95 transition-all duration-150';
        btn.innerHTML = `<span>★ ${q}</span>`;
        btn.addEventListener('click', (e) => {
          if (e.target.classList.contains('del-fav-search')) {
            e.stopPropagation();
            toggleFavoriteSearch(q);
            return;
          }
          searchInput.value = q;
          triggerSearch(q);
        });
        const delSpan = document.createElement('span');
        delSpan.className = 'del-fav-search ml-1 text-red-400 hover:text-red-600 font-bold px-1';
        delSpan.textContent = '×';
        btn.appendChild(delSpan);
        bar.appendChild(btn);
      });
    }

    function renderSearchHistoryInSuggestions() {
      if (state.searchHistory.length === 0) {
        suggestionsBox.innerHTML = `<div style="padding: 12px; text-align:center; font-size: 0.8rem; color: var(--text-muted);">
          ${t('emptySearchHistory')}
        </div>`;
        suggestionsBox.style.display = 'block';
        return;
      }
      suggestionsBox.innerHTML = `<div style="padding: 8px 12px; font-size: 0.75rem; color: var(--accent); border-bottom: 1px solid var(--border); font-weight: bold; display: flex; align-items: center; justify-content: space-between;">
        <span>${t('searchHistoryHeading')}</span>
        <button id="clear-all-history-btn" class="text-xs text-red-400 hover:text-red-500 font-normal">
          ${t('clear')}
        </button>
      </div>`;

      const clearAllBtn = suggestionsBox.querySelector('#clear-all-history-btn');
      if (clearAllBtn) {
        clearAllBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          state.searchHistory = [];
          safeLocalStorage.setItem('p_e621_search_history', JSON.stringify([]));
          renderSearchHistoryInSuggestions();
          showToast(t('searchHistoryCleared'));
        });
      }

      state.searchHistory.forEach(query => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.innerHTML = `<span>${query}</span><button class="clear-hist-btn" style="background:none; border:none; color:var(--danger); font-size: 0.75rem; cursor:pointer; padding: 4px;">✕</button>`;

        item.addEventListener('click', (e) => {
          if (e.target.classList.contains('clear-hist-btn')) {
            e.stopPropagation();
            removeSearchHistoryItem(query);
            renderSearchHistoryInSuggestions();
            return;
          }
          searchInput.value = query;
          suggestionsBox.style.display = 'none';
          triggerSearch(query);
        });
        suggestionsBox.appendChild(item);
      });
      suggestionsBox.style.display = 'block';
    }

    function removeSearchHistoryItem(query) {
      state.searchHistory = state.searchHistory.filter(h => h !== query);
      safeLocalStorage.setItem('p_e621_search_history', JSON.stringify(state.searchHistory));
    }

    searchInput.addEventListener('focus', () => {
      if (!searchInput.value.trim()) renderSearchHistoryInSuggestions();
    });

    searchInput.addEventListener('input', () => {
      clearTimeout(autocompleteDebounceTimer);
      const value = searchInput.value;
      toggleClearBtn();
      if (!value) {
        renderSearchHistoryInSuggestions();
        return;
      }

      const words = value.split(/\s+/);
      const lastWord = words[words.length - 1];

      if (!lastWord || lastWord.length < 2) {
        suggestionsBox.style.display = 'none';
        return;
      }

      autocompleteDebounceTimer = setTimeout(async () => {
        const suggestions = await fetchTagSuggestions(lastWord);
        const currentLastWord = searchInput.value.split(/\s+/).pop();
        if (currentLastWord !== lastWord) return;
        renderSuggestions(suggestions, words);
      }, 300);
    });

    function renderSuggestions(data, words) {
      if (!data || data.length === 0) {
        suggestionsBox.style.display = 'none';
        return;
      }

      suggestionsBox.innerHTML = '';
      data.slice(0, 10).forEach(item => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        const count = item.post_count;
        const formattedCount = formatCompactCount(count);

        suggestionItem.innerHTML = `<span>${item.name}</span><span class="text-zinc-500 text-xs">${formattedCount}</span>`;

        suggestionItem.addEventListener('click', () => {
          const operatorPrefix = String(words[words.length - 1] || '').match(/^[-~]+/)?.[0] || '';
          words[words.length - 1] = operatorPrefix + item.name;
          searchInput.value = words.join(' ') + ' ';
          toggleClearBtn();
          suggestionsBox.style.display = 'none';
          searchInput.focus();
        });
        suggestionsBox.appendChild(suggestionItem);
      });
      suggestionsBox.style.display = 'block';
    }

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container') && !e.target.closest('.suggestions')) {
        suggestionsBox.style.display = 'none';
      }
    });

    function triggerSearch(query) {
      currentSearchTags = query;
      state.lastSearchTags = query;
      safeLocalStorage.setItem('p_e621_last_search', query);
      if (state.apiProvider === 'rule34') {
        state.searchCounterR34++;
        safeLocalStorage.setItem('p_rule34_stat_searches', state.searchCounterR34);
      } else {
        state.searchCounter++;
        safeLocalStorage.setItem('p_e621_stat_searches', state.searchCounter);
      }
      if (query && !state.searchHistory.includes(query)) {
        state.searchHistory.unshift(query);
        state.searchHistory = state.searchHistory.slice(0, 15);
        safeLocalStorage.setItem('p_e621_search_history', JSON.stringify(state.searchHistory));
      }
      toggleClearBtn();
      loadGallery(true);
    }

    const POPULAR_PERIODS = Object.freeze({
      all: Object.freeze({}),
      '1d': Object.freeze({ order: 'score', date: 'day' }),
      '7d': Object.freeze({ order: 'score', date: 'week' }),
      '30d': Object.freeze({ order: 'score', date: 'month' }),
      alltime: Object.freeze({ order: 'favcount' })
    });

    const MEDIA_TYPE_TAGS = Object.freeze({
      all: [],
      photo: ['-filetype:webm', '-filetype:mp4'],
      video: ['~filetype:webm', '~filetype:mp4']
    });

    window.addEventListener('resize', () => {
      requestAnimationFrame(resizeSearchInput);
    }, { passive: true });

    const AI_FILTER_TAGS = Object.freeze({
      e621: Object.freeze(['ai_generated', 'ai_assisted', 'machine_generated', 'stable_diffusion']),
      rule34: Object.freeze(['ai_generated', 'ai_art', 'ai-created', 'ai-generated', 'stable_diffusion'])
    });

    function isAiFilterEnabled() {
      return state.apiProvider === 'rule34' ? state.filterAIR34 : state.filterAI;
    }

    function getActiveAiTags() {
      return AI_FILTER_TAGS[state.apiProvider] || AI_FILTER_TAGS.e621;
    }

    function hasAiGeneratedTag(tagsString) {
      if (!isAiFilterEnabled()) return false;
      const postTags = new Set(String(tagsString || '').toLowerCase().split(/\s+/).filter(Boolean));
      return getActiveAiTags().some(tag => postTags.has(tag));
    }

    function removePopularityMetatags(tags) {
      return String(tags || '')
        .split(/\s+/)
        .filter(tag => tag && !/^order:/i.test(tag) && !/^date:/i.test(tag))
        .join(' ');
    }

    function removeRule34PopularityMetatags(tags) {
      return String(tags || '')
        .split(/\s+/)
        .filter(tag => tag
          && !/^sort:score(?::(?:asc|desc))?$/i.test(tag)
          && !/^order:score(?::(?:asc|desc))?$/i.test(tag)
          && !/^date:/i.test(tag))
        .join(' ');
    }

    function getRule34PeriodTags(period) {
      if (period === 'alltime') return ['sort:score'];
      const periodStart = getRule34PeriodStart(period);
      if (periodStart) {
        const date = new Date(periodStart);
        const dateTag = [
          date.getFullYear(),
          String(date.getMonth() + 1).padStart(2, '0'),
          String(date.getDate()).padStart(2, '0')
        ].join('-');
        return [`date:>${dateTag}`, 'sort:score'];
      }
      return [];
    }

    function removeRule34DateMetatags(tags) {
      return String(tags || '')
        .split(/\s+/)
        .filter(tag => tag && !/^date:/i.test(tag) && !/^sort:score(?::(?:asc|desc))?$/i.test(tag))
        .join(' ');
    }

    function getRule34PeriodStart(period, now = new Date()) {
      const daysByPeriod = { '1d': 1, '7d': 7, '30d': 30 };
      const days = daysByPeriod[period];
      if (!days) return null;

      const startDate = new Date(now);
      startDate.setHours(0, 0, 0, 0);
      startDate.setDate(startDate.getDate() - (days - 1));
      return startDate.getTime();
    }

    function getRule34PostTimestamp(item) {
      const createdAt = Date.parse(item?.created_at || item?.createdAt || '');
      if (Number.isFinite(createdAt)) return createdAt;
      return null;
    }

    function buildFeedQueryTags(tags, period = currentPopularPeriod, mediaType = state.mediaTypeFilter) {
      const queryParts = [];

      if (state.apiProvider === 'rule34') {
        const baseTags = period === 'all'
          ? String(tags || '').trim()
          : removeRule34PopularityMetatags(tags);
        if (baseTags) queryParts.push(baseTags);
        queryParts.push(...getRule34PeriodTags(period));

        if (mediaType === 'video') queryParts.push('video');
        else if (mediaType === 'photo') queryParts.push('-video');
        if (isAiFilterEnabled()) {
          getActiveAiTags().forEach(tag => queryParts.push(`-${tag}`));
        }

        return queryParts.join(' ').trim();
      }

      const baseTags = period === 'all' ? String(tags || '').trim() : removePopularityMetatags(tags);
      const periodConfig = POPULAR_PERIODS[period] || POPULAR_PERIODS.all;
      if (baseTags) queryParts.push(baseTags);
      if (!state.settings.ratings.includes('18+')) queryParts.push('-rating:explicit');
      if (!state.settings.ratings.includes('16+')) queryParts.push('-rating:questionable');
      if (!state.settings.ratings.includes('0+')) queryParts.push('-rating:safe');

      const mediaTags = MEDIA_TYPE_TAGS[mediaType] || MEDIA_TYPE_TAGS.all;
      queryParts.push(...mediaTags);
      if (isAiFilterEnabled()) {
        getActiveAiTags().forEach(tag => queryParts.push(`-${tag}`));
      }

      state.blacklist.forEach(blocked => {
        const blockedTag = String(blocked || '').trim();
        if (blockedTag) queryParts.push(`-${blockedTag}`);
      });

      if (periodConfig.order) queryParts.push(`order:${periodConfig.order}`);
      if (periodConfig.date) queryParts.push(`date:${periodConfig.date}`);

      return queryParts.join(' ');
    }

    async function fetchFromE621(tags, page = 0, signal = null, period = currentPopularPeriod) {
      let url, params;
      if (state.apiProvider === 'rule34') {
        url = `https://api.rule34.xxx/index.php`;
        const credentials = getRule34ApiCredentials();
        params = {
          page: 'dapi', s: 'post', q: 'index', json: 1,
          limit: state.settings.dataBudget && getProviderState().trafficUsed > 50 ? 15 : state.debugPostLimit,
          pid: page, tags: buildFeedQueryTags(tags, period)
        };
        params.user_id = credentials.userId;
        params.api_key = credentials.apiKey;
      } else {
        url = `https://e621.net/posts.json`;
        params = {
          limit: state.settings.dataBudget && getProviderState().trafficUsed > 50 ? 15 : state.debugPostLimit,
          page: page + 1, tags: buildFeedQueryTags(tags, period)
        };
      }

      try {
        const hasRule34Period = state.apiProvider === 'rule34'
          && Boolean(getRule34PeriodStart(period));

        const fetchRule34PeriodFallback = async () => {
          const fallbackPages = [];
          const fallbackTags = removeRule34DateMetatags(params.tags);
          const firstPage = page * 4;

          for (let offset = 0; offset < 4; offset++) {
            if (signal?.aborted) throw new DOMException('Request aborted', 'AbortError');
            const fallbackText = await directFetch(url, {
              ...params,
              pid: firstPage + offset,
              tags: fallbackTags
            }, false, signal);
            registerTraffic(fallbackText.length);
            const fallbackData = JSON.parse(fallbackText);
            if (!Array.isArray(fallbackData) || fallbackData.length === 0) break;
            fallbackPages.push(...fallbackData);
          }

          return fallbackPages;
        };

        let data;
        try {
          const textData = await directFetch(url, params, state.apiProvider !== 'rule34', signal);
          registerTraffic(textData.length);
          data = JSON.parse(textData);
        } catch (primaryError) {
          if (primaryError.name === 'AbortError' || !hasRule34Period) throw primaryError;
          data = await fetchRule34PeriodFallback();
        }

        if (hasRule34Period && (!Array.isArray(data) || data.length === 0)) {
          data = await fetchRule34PeriodFallback();
        }

        let rawPosts = state.apiProvider === 'rule34' ? (Array.isArray(data) ? data : []) : (data.posts || []);
        if (state.apiProvider === 'rule34') {
          const periodStart = getRule34PeriodStart(period);
          if (periodStart) {
            rawPosts = rawPosts.filter(item => {
              const timestamp = getRule34PostTimestamp(item);
              return timestamp === null || timestamp >= periodStart;
            });
          }
        }

        const mapped = rawPosts.map(item => {
          if (state.apiProvider === 'rule34') {
            if (!item.file_url) return null;
            if (state.blacklistR34 && state.blacklistR34.length > 0) {
              const postTags = (item.tags || '').toLowerCase().split(' ');
              if (state.blacklistR34.some(bTag => postTags.includes(bTag))) return null;
            }
            return {
              id: item.id, file_url: item.file_url, preview_url: item.preview_url || item.file_url,
              sample_url: item.sample_url || item.file_url, tags: { general: (item.tags || '').split(' ') },
              tagsString: item.tags || '', ext: item.file_url.split('.').pop() || 'jpg',
              rating: item.rating === 's' ? 's' : (item.rating === 'q' ? 'q' : 'e'),
              score: item.score || 0, isVideo: item.file_url.includes('.mp4') || item.file_url.includes('.webm'),
              width: item.width, height: item.height
            };
          }
          if (!item.file || !item.file.url) return null;
          return {
            id: item.id,
            file_url: item.file.url,
            preview_url: item.preview ? item.preview.url : item.file.url,
            sample_url: (item.sample && item.sample.has) ? item.sample.url : item.file.url,
            tags: item.tags || {},
            tagsString: Object.values(item.tags || {}).flat().join(' '),
            ext: item.file.ext,
            rating: item.rating,
            score: item.score ? item.score.total : 0,
            isVideo: ['mp4', 'webm'].includes(item.file.ext),
            width: item.file.width,
            height: item.file.height
          };
        }).filter(p => p !== null && !hasAiGeneratedTag(p.tagsString));

        if (state.apiProvider === 'rule34'
          && period !== 'all'
          && period !== 'alltime') {
          mapped.sort((a, b) => (b.score || 0) - (a.score || 0));
        }

        return mapped;
      } catch (err) {
        if (err.name === 'AbortError') throw err;
        addDebugLog(`[FEED ERROR] ${err.message}`);
        return [];
      }
    }

    function registerTraffic(bytes) {
      if (!bytes) return;
      const mb = bytes / (1024 * 1024);
      if (state.apiProvider === 'rule34') {
        state.trafficUsedR34 += mb;
        safeLocalStorage.setItem('p_rule34_traffic', state.trafficUsedR34.toFixed(2));
      } else {
        state.trafficUsed += mb;
        safeLocalStorage.setItem('p_e621_traffic', state.trafficUsed.toFixed(2));
      }
      const valSpan = document.getElementById('traffic-val');
      if (valSpan) valSpan.textContent = getProviderState().trafficUsed.toFixed(2);
      updateStatsUI();
    }

    function triggerImageLoadAnimation(card) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.classList.add('image-loaded');
        });
      });
    }

    function createCardImage(card, src) {
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      const markResolved = () => triggerImageLoadAnimation(card);
      img.addEventListener('load', markResolved, { once: true });
      img.addEventListener('error', markResolved, { once: true });
      return img;
    }

    function createPostCard(post) {
      const card = document.createElement('div');
      card.className = `post-card ${state.settings.ramSafeguard ? 'unloaded' : ''}`;
      card.dataset.id = post.id;
      card.dataset.tags = post.tagsString;
      card.dataset.src = post.preview_url;

      if (state.settings.layout === 'squares') {
        card.style.aspectRatio = "1 / 1";
      } else if (state.settings.layout === 'stories') {
        card.style.aspectRatio = "9 / 16";
      } else if (state.settings.layout === 'masonry') {
        if (post.width && post.height) {
          card.style.aspectRatio = `${post.width} / ${post.height}`;
        } else {
          card.style.aspectRatio = "1 / 1";
        }
      }

      if (post.rating === 'e' || post.rating === 'q') {
        card.classList.add('is-nsfw');
      }

      let imgUrl = state.settings.layout === 'stories'
        ? (post.sample_url || post.file_url)
        : ((state.settings.dataBudget && getProviderState().trafficUsed > 50) ? post.preview_url : (post.sample_url || post.preview_url));

      if (post.isVideo) {
        const badge = document.createElement('div');
        badge.className = 'post-type-badge';
        badge.textContent = 'VIDEO';
        badge.style.color = 'var(--accent)';
        card.appendChild(badge);
      }

      const rateBadge = document.createElement('div');
      rateBadge.className = 'post-rating-badge';
      rateBadge.textContent = post.rating ? post.rating.toUpperCase() : 'S';
      rateBadge.style.color = post.rating === 'e' ? 'var(--danger)' : (post.rating === 'q' ? 'var(--warning)' : 'var(--success)');
      card.appendChild(rateBadge);

      const img = createCardImage(card, state.settings.ramSafeguard ? PLACEHOLDER_SRC : imgUrl);
      if (state.settings.ramSafeguard) {
        card.dataset.realSrc = imgUrl;
      }
      card.appendChild(img);

      card.addEventListener('click', (e) => {
        if (e.target.closest('.post-type-badge') || e.target.closest('.post-rating-badge')) return;

        if (state.settings.nsfwBlur && card.classList.contains('is-nsfw') && !card.classList.contains('unblurred')) {
          card.classList.add('unblurred');
          if ('vibrate' in navigator) navigator.vibrate(25);
          return;
        }

        state.randomModeActive = false;
        openDetailView(post);
      });

      return card;
    }

    const PLACEHOLDER_SRC = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";

    const ramObserver = new IntersectionObserver((entries) => {
      if (!state.settings.ramSafeguard) return;
      entries.forEach(entry => {
        const card = entry.target;
        const img = card.querySelector('img');
        if (!img) return;
        if (entry.isIntersecting) {
          card.classList.remove('unloaded');
          const realSrc = card.dataset.realSrc;
          if (realSrc && img.src !== realSrc) {
            card.classList.remove('image-loaded');
            img.onload = () => {
              triggerImageLoadAnimation(card);
              img.onload = null;
              img.onerror = null;
            };
            img.onerror = () => {
              triggerImageLoadAnimation(card);
              img.onload = null;
              img.onerror = null;
            };
            img.src = realSrc;
          } else {
            triggerImageLoadAnimation(card);
          }
        } else {
          card.classList.add('unloaded');
          card.classList.remove('image-loaded');
          img.onload = null;
          img.onerror = null;
          if (img.src !== PLACEHOLDER_SRC) {
            img.src = PLACEHOLDER_SRC;
          }
        }
      });
    }, { root: null, rootMargin: '400px' });

    function applyRamSafeguard(cards) {
      if (!state.settings.ramSafeguard || !cards) return;
      cards.forEach(card => ramObserver.observe(card));
    }

    function clearPostContainer(container) {
      if (!container) return;
      container.querySelectorAll('.post-card').forEach(card => ramObserver.unobserve(card));
      container.replaceChildren();
    }

    async function loadGallery(reset = false) {
      if (isFetching && !reset) return;
      const indicator = DOM.loadingIndicator;
      const grid = DOM.galleryGrid;

      if (reset) {
        if (activeGalleryRequest) activeGalleryRequest.abort();
        activePage = 0;
        clearPostContainer(grid);
        loadedPostIds.clear();
        state.currentPostPool = [];
      }

      const requestId = ++galleryRequestId;
      const requestPage = activePage;
      const controller = new AbortController();
      activeGalleryRequest = controller;
      isFetching = true;

      if (indicator) {
        indicator.classList.remove('hidden');
        indicator.style.display = 'flex';
      }

      try {
        const posts = await fetchFromE621(currentSearchTags, requestPage, controller.signal);
        if (controller.signal.aborted || requestId !== galleryRequestId) return;

        if (posts && posts.length > 0) {
          const blArr = (state.apiProvider === 'rule34') ? state.blacklistR34 : state.blacklist;
          const blockedTags = new Set(blArr.map(tag => String(tag).toLowerCase()));
          const fragment = document.createDocumentFragment();
          const renderedCards = [];
          const acceptedPosts = [];

          posts.forEach(post => {
            if (loadedPostIds.has(post.id)) return;
            const hasBlockedTag = post.tagsString.split(' ').some(tag => blockedTags.has(tag.toLowerCase()));
            if (hasBlockedTag) return;

            const card = createPostCard(post);
            loadedPostIds.add(post.id);
            acceptedPosts.push(post);
            renderedCards.push(card);
            fragment.appendChild(card);
          });

          if (grid && renderedCards.length > 0) grid.appendChild(fragment);
          state.currentPostPool.push(...acceptedPosts);
          applyRamSafeguard(renderedCards);
        }

        activePage = requestPage + 1;
      } catch (err) {
        if (err.name !== 'AbortError') {
          addDebugLog(`[GALLERY ERROR] ${err.message}`);
        }
      } finally {
        if (requestId === galleryRequestId) {
          isFetching = false;
          activeGalleryRequest = null;
          if (indicator) {
            indicator.classList.add('hidden');
            indicator.style.display = 'none';
          }
        }
      }
    }

    function updateMediaTypeControl(mode) {
      const container = document.getElementById('media-type-container');
      const backplane = document.getElementById('media-type-backplane');
      if (!container || !backplane) return;

      container.querySelectorAll('.media-type-btn').forEach(button => {
        const isActive = button.dataset.mode === mode;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });

      backplane.className = `media-type-slider state-${mode}`;
    }

    function setMediaTypeFilter(mode) {
      if (!Object.prototype.hasOwnProperty.call(MEDIA_TYPE_TAGS, mode)) return;
      if (state.mediaTypeFilter === mode) return;

      state.mediaTypeFilter = mode;
      safeLocalStorage.setItem('p_e621_media_type', mode);
      updateMediaTypeControl(mode);
      if ('vibrate' in navigator) navigator.vibrate(15);
      loadGallery(true);
    }

    function updatePopularPeriodControl(period) {
      document.querySelectorAll('.period-btn').forEach(button => {
        button.classList.toggle('active', button.dataset.period === period);
      });
    }

    function syncProviderPeriodControls() {
      const isRule34 = state.apiProvider === 'rule34';
      ['p-day', 'p-week', 'p-month'].forEach(id => {
        const button = document.getElementById(id);
        if (!button) return;
        button.hidden = isRule34;
        button.setAttribute('aria-hidden', String(isRule34));
      });

      if (isRule34 && ['1d', '7d', '30d'].includes(currentPopularPeriod)) {
        currentPopularPeriod = 'all';
        state.popularPeriod = 'all';
        safeLocalStorage.setItem('p_e621_popular_period', 'all');
      }

      updatePopularPeriodControl(currentPopularPeriod);
    }

    function setPopularPeriod(period) {
      if (state.apiProvider === 'rule34' && ['1d', '7d', '30d'].includes(period)) return;
      if (!Object.prototype.hasOwnProperty.call(POPULAR_PERIODS, period) || currentPopularPeriod === period) return;

      currentPopularPeriod = period;
      state.popularPeriod = period;
      safeLocalStorage.setItem('p_e621_popular_period', period);
      updatePopularPeriodControl(period);
      loadGallery(true);
    }

    const scrollObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetching && activeView === 'gallery') {
        loadGallery();
      }
    }, { rootMargin: '400px' });

    const infiniteTrigger = document.getElementById('infinite-scroll-trigger');
    if (infiniteTrigger) scrollObserver.observe(infiniteTrigger);

    function toggleDetailScaleMode() {
      const wrapper = document.getElementById('detail-media-wrapper');
      const toggleBtn = document.getElementById('detail-fit-toggle');
      if (!wrapper || !toggleBtn) return;

      if (state.detailFitZoom === 'contain') {
        state.detailFitZoom = 'cover';
        wrapper.style.maxHeight = '90vh';
        wrapper.style.maxWidth = '100%';
        wrapper.classList.remove('rounded-lg');
        const img = wrapper.querySelector('img');
        if (img) img.style.maxHeight = '90vh';
        toggleBtn.textContent = t('detailContain');
      } else {
        state.detailFitZoom = 'contain';
        wrapper.style.maxHeight = '75vh';
        wrapper.style.maxWidth = '95%';
        wrapper.classList.add('rounded-lg');
        const img = wrapper.querySelector('img');
        if (img) img.style.maxHeight = '75vh';
        toggleBtn.textContent = t('detailFill');
      }
    }

    function openDetailView(post) {
      detailCurrentPost = post;

      const activeHistory = state.apiProvider === 'rule34' ? state.historyR34 : state.history;
      if (!activeHistory.some(h => h.id === post.id)) {
        activeHistory.push({ id: post.id, rating: post.rating || 's', score: post.score || 0 });
        const historyKey = state.apiProvider === 'rule34' ? 'p_rule34_history' : 'p_e621_history';
        safeLocalStorage.setItem(historyKey, JSON.stringify(activeHistory));
      }

      if (post.isVideo) {
        if (state.apiProvider === 'rule34') {
          state.videoPlaysR34++;
          safeLocalStorage.setItem('p_rule34_stat_videos', state.videoPlaysR34);
        } else {
          state.videoPlays++;
          safeLocalStorage.setItem('p_e621_stat_videos', state.videoPlays);
        }
      }

      const activePanel = document.querySelector('.view-panel.active');
      let currentPool = state.currentPostPool;

      if (activePanel && activePanel.id === 'panel-bookmarks') {
        currentPool = getProviderState().bookmarks;
      }

      const currentIndex = currentPool.findIndex(p => p.id === post.id);

      const overlay = document.getElementById('detail-overlay');
      overlay.scrollTop = 0;
      const wrapper = document.getElementById('detail-media-wrapper');
      wrapper.innerHTML = '';
      const tagsContainer = document.getElementById('detail-tags-container');
      tagsContainer.innerHTML = '';

      state.detailFitZoom = 'contain';
      wrapper.style.maxHeight = '75vh';
      wrapper.style.maxWidth = '95%';
      const toggleBtn = document.getElementById('detail-fit-toggle');
      if (toggleBtn) toggleBtn.textContent = t('detailFill');

      const downloadBtnSpan = document.getElementById('detail-download-btn')?.querySelector('span');
      if (downloadBtnSpan) {
        downloadBtnSpan.textContent = t('downloadMedia');
      }

      updateBookmarkBtnState();
      loadPostComments(post.id);

      if (post.isVideo) {
        const video = document.createElement('video');
        video.src = post.file_url;
        video.controls = true;
        video.autoplay = true;
        video.loop = true;
        wrapper.appendChild(video);
      } else {
        const img = document.createElement('img');
        img.src = post.file_url;
        img.onload = () => extractAmbientColor(img);
        wrapper.appendChild(img);
      }

      const categories = {
        artist: { title: state.language === 'ru' ? 'Художники' : 'Artists', class: 'artist' },
        character: { title: state.language === 'ru' ? 'Персонажи' : 'Characters', class: 'character' },
        general: { title: state.language === 'ru' ? 'Теги' : 'Tags', class: 'general' }
      };

      const tagsObj = post.tags || {};
      Object.entries(categories).forEach(([key, value]) => {
        const tagsList = tagsObj[key] || [];
        if (tagsList.length > 0) {
          const groupDiv = document.createElement('div');
          groupDiv.className = 'tag-category-group';
          const title = document.createElement('h4');
          title.className = 'category-title';
          title.textContent = value.title;
          groupDiv.appendChild(title);

          const chipsWrap = document.createElement('div');
          chipsWrap.className = 'detail-tags';

          tagsList.forEach(tag => {
            const span = document.createElement('span');
            span.className = `tag-badge ${value.class}`;
            span.textContent = tag;
            span.addEventListener('click', () => {
              closeDetailView();
              switchView('gallery');
              const searchInput = document.getElementById('search-input');
              if (searchInput) searchInput.value = tag;
              triggerSearch(tag);
            });
            chipsWrap.appendChild(span);
          });
          groupDiv.appendChild(chipsWrap);
          tagsContainer.appendChild(groupDiv);
        }
      });

      const prevBtn = document.getElementById('detail-prev-btn');
      const nextBtn = document.getElementById('detail-next-btn');

      if (state.randomModeActive) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'flex';
      } else {
        if (prevBtn) prevBtn.style.display = currentIndex > 0 ? 'flex' : 'none';
        if (nextBtn) nextBtn.style.display = currentIndex < currentPool.length - 1 ? 'flex' : 'none';
      }

      if (prevBtn) {
        prevBtn.onclick = (e) => {
          e.stopPropagation();
          if (state.randomModeActive) return;
          if (currentIndex > 0) {
            openDetailView(currentPool[currentIndex - 1]);
          }
        };
      }

      if (nextBtn) {
        nextBtn.onclick = (e) => {
          e.stopPropagation();
          handleForwardNavigation(currentIndex, currentPool);
        };
      }

      overlay.style.display = 'flex';
      updateStatsUI();
    }

    function handleForwardNavigation(currentIndex, currentPool) {
      if (state.randomModeActive) {
        rollLuckyPost();
      } else {
        if (currentIndex < currentPool.length - 1) {
          openDetailView(currentPool[currentIndex + 1]);
        } else if (state.slideshowActive) {
          stopSlideshow();
          showToast(t('slideshowFinished'));
        }
      }
    }

    function toggleSlideshow() {
      const btn = document.getElementById('detail-slideshow-btn');
      if (!btn) return;

      if (state.slideshowActive) {
        stopSlideshow();
        showToast(t('slideshowStopped'));
      } else {
        state.slideshowActive = true;
        btn.innerHTML = `<span id="detail-slideshow-label" class="text-amber-400">■ ${t('slideshowStop')}</span>`;
        btn.classList.add('border-amber-500');
        showToast(t('slideshowStarted'));

        state.slideshowIntervalId = setInterval(() => {
          const activePanel = document.querySelector('.view-panel.active');
          let currentPool = state.currentPostPool;
          if (activePanel && activePanel.id === 'panel-bookmarks') {
            currentPool = getProviderState().bookmarks;
          }
          const currentIndex = currentPool.findIndex(p => p.id === detailCurrentPost?.id);
          handleForwardNavigation(currentIndex, currentPool);
        }, state.slideshowDuration);
      }
    }

    function stopSlideshow() {
      state.slideshowActive = false;
      const btn = document.getElementById('detail-slideshow-btn');
      if (btn) {
        btn.innerHTML = `<span id="detail-slideshow-label">▶ ${t('slideshow')}</span>`;
        btn.classList.remove('border-amber-500');
      }
      if (state.slideshowIntervalId) {
        clearInterval(state.slideshowIntervalId);
        state.slideshowIntervalId = null;
      }
    }

    function extractAmbientColor(imgEl) {
      if (state.settings.ecoMode) return;
      const canvas = document.getElementById('ambient-canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 10;
      canvas.height = 10;
      try {
        ctx.drawImage(imgEl, 0, 0, 10, 10);
        canvas.style.opacity = '0.35';
      } catch (e) {
        canvas.style.opacity = '0';
      }
    }

    function closeDetailView() {
      stopSlideshow();
      const overlay = document.getElementById('detail-overlay');
      if (overlay) overlay.style.display = 'none';
      const wrapper = document.getElementById('detail-media-wrapper');
      if (wrapper) wrapper.innerHTML = '';
    }

    function isElementVisible(element) {
      if (!element) return false;
      const style = window.getComputedStyle(element);
      return style.display !== 'none' && style.visibility !== 'hidden';
    }

    function handleAppBackAction() {
      const promoModal = document.getElementById('promo-modal');
      if (isElementVisible(promoModal)) {
        promoModal.style.display = 'none';
        return;
      }

      const legalOverlay = document.getElementById('legal-overlay');
      if (isElementVisible(legalOverlay)) {
        legalOverlay.style.display = 'none';
        return;
      }

      const detailOverlay = document.getElementById('detail-overlay');
      if (isElementVisible(detailOverlay)) {
        closeDetailView();
        return;
      }

      const suggestions = document.getElementById('suggestions');
      if (isElementVisible(suggestions)) {
        suggestions.style.display = 'none';
        document.getElementById('search-input')?.blur();
        return;
      }

      if (activeView !== 'gallery') {
        switchView('gallery');
        return;
      }

      if (window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    function installAppBackNavigation() {
      const sentinel = { chromiumAppRoot: true };
      history.replaceState(sentinel, '', location.href);
      history.pushState(sentinel, '', location.href);

      window.addEventListener('popstate', () => {
        handleAppBackAction();
        history.pushState(sentinel, '', location.href);
      });

      const capacitorApp = window.Capacitor?.Plugins?.App;
      if (window.Capacitor?.isNativePlatform?.() && capacitorApp?.addListener) {
        capacitorApp.addListener('backButton', () => {
          handleAppBackAction();
        });
      }
    }

    installAppBackNavigation();

    function renderLegalContent() {
      const legalBody = document.getElementById('legal-content-body');
      if (!legalBody) return;

      const isRu = state.language === 'ru';

      legalBody.innerHTML = `
        <section class="space-y-4">
          <h2 class="text-sm font-bold text-[var(--accent)] flex items-center gap-1.5 border-b border-zinc-800 pb-1.5 uppercase">
            <span>1. ${isRu ? 'Ограничение ответственности и юридический статус' : 'Limitation of Liability & Legal Status'}</span>
          </h2>
          <p class="text-[11px] leading-relaxed text-zinc-400">
            ${isRu
          ? 'Настоящий клиент представляет собой функциональный программный интерфейс (программную оболочку) для визуализации данных. Разработчик программного продукта категорически отказывается от каких-либо притязаний на владение, модерирование, создание, хостинг, распространение или хранение медиафайлов, представленных в результатах поиска. Весь контент загружается сторонними пользователями на публичные сервера e621.net. Разработчик клиента не имеет обратной связи с загрузчиками, не модерирует базу данных и не несет за нее правовую, моральную или материальную ответственность.'
          : 'This application acts strictly as an open-source visual rendering tool. The software architect fully disclaims all liability, custody, authorship or responsibility for any of the graphics, files, or information processed through API requests. All digital files are uploaded by third-party individuals directly onto e621.net public file hostings.'}
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-sm font-bold text-[var(--accent)] flex items-center gap-1.5 border-b border-zinc-800 pb-1.5 uppercase">
            <span>2. ${isRu ? 'Политика DMCA и защита авторских прав' : 'DMCA Compliance & Intellectual Property'}</span>
          </h2>
          <p class="text-[11px] leading-relaxed text-zinc-400">
            ${isRu
          ? 'Данный клиент полностью подчиняется стандартам добросовестного использования и транзита трафика. Программа не создает зеркала баз данных. Все товарные знаки, оригинальные персонажи, иллюстрации и прочие объекты интеллектуального права принадлежат их правообладателям и авторам. Если вы являетесь автором изображения и считаете, что ваши права нарушены, официальный юридический запрос на удаление (Takedown Notice) в соответствии с Законом об авторском праве в цифровую эпоху (DMCA) должен быть направлен напрямую хостинг-провайдеру e621.net. Приложение не кэширует медиафайлы на собственных серверах и мгновенно перестает отображать файлы, как только они удаляются на первоисточнике.'
          : 'The client behaves inside strict standards of technical pipeline transit. All legal and copyright complaints under the Digital Millennium Copyright Act (DMCA) must be issued directly to e621.net administration. Once a file is processed or purged on the database side, it instantly becomes inaccessible on this layout client.'}
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-sm font-bold text-[var(--accent)] flex items-center gap-1.5 border-b border-zinc-800 pb-1.5 uppercase">
            <span>3. ${isRu ? 'Политика конфиденциальности и локальное хранилище' : 'Privacy Protection & Local Storage Limits'}</span>
          </h2>
          <p class="text-[11px] leading-relaxed text-zinc-400">
            ${isRu
          ? 'Приложение разработано на принципах "Privacy by Design". У разработчика полностью отсутствуют удаленные сервера для сбора логов, аналитики или метаданных пользователей. Вся ваша персональная статистика (время сессии, история поиска, локальные закладки и зашифрованные учетные данные API e621.net) хранится исключительно на вашем физическом устройстве в песочнице LocalStorage веб-браузера. Использование PIN-кода активирует криптографическое шифрование учетных записей локально. Передача этих данных третьим лицам исключена технической структурой приложения.'
          : 'Our client uses client-side offline rendering architecture. We do not operate databases or backend servers. Your personal information, preferences, cookies, bookmarks and logs are stored inside your device browser local sandbox.'}
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-sm font-bold text-[var(--accent)] flex items-center gap-1.5 border-b border-zinc-800 pb-1.5 uppercase">
            <span>4. ${isRu ? 'Правила использования API-интерфейсов' : 'API Usage Terms'}</span>
          </h2>
          <p class="text-[11px] leading-relaxed text-zinc-400">
            ${isRu
          ? 'Пользователь обязуется использовать свои собственные ключи доступа e621 API в соответствии с правилами оригинального сайта e621.net. Использование прокси-серверов или обходных шлюзов осуществляется пользователем на свой собственный страх и риск. Разработчик не гарантирует бесперебойную доступность стороннего API и стабильность CORS прокси.'
          : 'Users must access e621 API parameters strictly abiding by the standard platform guidelines of e621.net. Third-party proxy paths are established at user discretion and risk.'}
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-sm font-bold text-[var(--accent)] flex items-center gap-1.5 border-b border-zinc-800 pb-1.5 uppercase">
            <span>5. ${isRu ? 'Обратная связь' : 'Contact Support'}</span>
          </h2>
          <p class="text-[11px] leading-relaxed text-zinc-400">
            ${isRu
          ? 'По любым вопросам технического характера, предложениям по оптимизации разметки или сообщениям о багах вы можете обратиться напрямую по электронному адресу:'
          : 'If you experience system crashes, require software optimization, or have layout improvement proposals, contact support directly at:'}
          </p>
          <div class="bg-zinc-900 border border-zinc-800 p-3 rounded-lg text-center mt-2">
            <a href="mailto:chromiumeo@gmail.com" class="text-sm font-extrabold text-[var(--accent)] hover:underline select-text">chromiumeo@gmail.com</a>
          </div>
        </section>
      `;
    }

    function toggleBookmark(post) {
      const isR34 = state.apiProvider === 'rule34';
      const bookmarksArr = isR34 ? state.bookmarksR34 : state.bookmarks;
      const idx = bookmarksArr.findIndex(p => p.id === post.id);
      if (idx === -1) {
        bookmarksArr.push(post);
      } else {
        bookmarksArr.splice(idx, 1);
      }
      if (isR34) safeLocalStorage.setItem('p_rule34_bookmarks', JSON.stringify(state.bookmarksR34));
      else safeLocalStorage.setItem('p_e621_bookmarks', JSON.stringify(state.bookmarks));
      updateBookmarkBtnState();
      updateStatsUI();
      const bookmarksPanel = document.getElementById('panel-bookmarks');
      if (bookmarksPanel && bookmarksPanel.classList.contains('active')) {
        renderBookmarks();
      }
    }

    function updateBookmarkBtnState() {
      const btn = document.getElementById('detail-bookmark-btn');
      if (!btn || !detailCurrentPost) return;
      const currentBookmarks = state.apiProvider === 'rule34' ? state.bookmarksR34 : state.bookmarks;
      const isSaved = currentBookmarks.some(p => p.id === detailCurrentPost.id);
      btn.textContent = isSaved ? t('bookmarked') : t('bookmark');
      btn.style.backgroundColor = isSaved ? "var(--success)" : "var(--accent)";
    }

    async function renderBookmarks() {
      const container = document.getElementById('bookmarks-grid');
      if (!container) return;
      clearPostContainer(container);
      const isR34 = state.apiProvider === 'rule34';
      const bookmarksArr = isR34 ? state.bookmarksR34 : state.bookmarks;
      
      if (!document.getElementById('bookmark-source-tabs')) {
         const tabsHtml = `<div id="bookmark-source-tabs" class="flex gap-2 mb-4" style="grid-column: span 3; overflow-x: auto;">
           <button id="bm-tab-e621" class="op-btn ${!isR34 ? 'and' : ''}">e621</button>
           <button id="bm-tab-r34" class="op-btn ${isR34 ? 'and' : ''}">rule34</button>
         </div>`;
         container.innerHTML = tabsHtml;
         
         requestAnimationFrame(() => {
             document.getElementById('bm-tab-e621')?.addEventListener('click', () => {
                 if (state.apiProvider !== 'e621') document.getElementById('prov-e621')?.click();
             });
             document.getElementById('bm-tab-r34')?.addEventListener('click', () => {
                 if (state.apiProvider !== 'rule34') document.getElementById('prov-r34')?.click();
             });
         });
      }

      if (bookmarksArr.length === 0) {
        const noBm = document.createElement('div');
        noBm.style.cssText = "grid-column: span 3; text-align:center; padding: 40px; color:var(--text-muted);";
        noBm.textContent = t('noBookmarks');
        container.appendChild(noBm);
        return;
      }

      const fragment = document.createDocumentFragment();
      const renderedCards = [];
      bookmarksArr.forEach(post => {
        const card = createPostCard(post);
        renderedCards.push(card);
        fragment.appendChild(card);
      });
      container.appendChild(fragment);
      applyRamSafeguard(renderedCards);
    }

    function triggerTabAnimation(viewNameOrAction) {
      document.querySelectorAll('.tab-bar .tab-btn svg').forEach(svg => {
        svg.classList.remove('animate-gallery-tab', 'animate-bookmarks-tab', 'animate-random-tab', 'animate-recs-tab', 'animate-settings-tab');
        void svg.offsetHeight;
      });

      requestAnimationFrame(() => {
        let btn;
        if (viewNameOrAction === 'random') {
          btn = document.getElementById('tab-btn-random');
        } else {
          btn = document.querySelector(`[data-view="${viewNameOrAction}"]`);
        }
        if (!btn) return;
        const svg = btn.querySelector('svg');
        if (!svg) return;

        void svg.offsetHeight;

        requestAnimationFrame(() => {
          if (viewNameOrAction === 'gallery') svg.classList.add('animate-gallery-tab');
          else if (viewNameOrAction === 'bookmarks') svg.classList.add('animate-bookmarks-tab');
          else if (viewNameOrAction === 'random') svg.classList.add('animate-random-tab');
          else if (viewNameOrAction === 'recommendations') svg.classList.add('animate-recs-tab');
          else if (viewNameOrAction === 'settings') svg.classList.add('animate-settings-tab');
        });
      });
    }

    function generateSmartRecommendations() {
      const container = document.getElementById('recs-grid');
      if (!container) return;
      const providerBookmarks = getProviderState().bookmarks;
      clearPostContainer(container);
      container.innerHTML = `<div style="grid-column: span 3; text-align:center; padding: 40px; color:var(--text-muted);">${t('analyzingRecommendations')}</div>`;

      if (providerBookmarks.length < 2) {
        container.innerHTML = `<div style="grid-column: span 3; text-align:center; padding: 20px; color:var(--text-muted);">${t('bookmarksLimit')}</div>`;
        return;
      }

      const tagWeights = {};
      providerBookmarks.forEach(post => {
        const allTags = post.tagsString || '';
        allTags.split(' ').forEach(tag => {
          if (!tag) return;
          tagWeights[tag] = (tagWeights[tag] || 0) + 1;
        });
      });

      const topTags = Object.entries(tagWeights)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(entry => entry[0]);

      const bestTag = topTags[0];

      fetchFromE621(bestTag, 0).then(posts => {
        clearPostContainer(container);
        if (!posts || posts.length === 0) {
          container.innerHTML = `<div style="grid-column: span 3; text-align:center; padding: 20px; color:var(--text-muted);">Failed.</div>`;
          return;
        }

        const scoredPosts = posts.map(post => {
          let score = 0;
          post.tagsString.split(' ').forEach(tag => {
            if (tagWeights[tag]) {
              score += tagWeights[tag];
            }
          });
          return { post, score };
        });

        scoredPosts.sort((a, b) => b.score - a.score);

        const fragment = document.createDocumentFragment();
        const renderedCards = [];
        scoredPosts.forEach(item => {
          const card = createPostCard(item.post);
          renderedCards.push(card);
          fragment.appendChild(card);
        });
        container.appendChild(fragment);
        applyRamSafeguard(renderedCards);
      });
    }

    function updateAuthUI() {
      updateGreeting();
      const usernameInput = document.getElementById('auth-username');
      const apiKeyInput = document.getElementById('auth-api-key');
      const authStatus = document.getElementById('auth-status');

      if (!usernameInput || !apiKeyInput || !authStatus) return;

      if (state.auth.username && state.auth.apiKey) {
        usernameInput.value = state.auth.username;
        apiKeyInput.value = state.auth.apiKey;
        authStatus.textContent = state.language === 'ru' ? `Статус: Подключен как ${state.auth.username}` : `Status: Integrated as ${state.auth.username}`;
        authStatus.style.color = 'var(--success)';
      } else {
        usernameInput.value = '';
        apiKeyInput.value = '';
        authStatus.textContent = state.language === 'ru' ? `Статус: Не подключен (Анонимный режим)` : `Status: Not connected (Anonymous mode)`;
        authStatus.style.color = 'var(--text-muted)';
      }
      const r34User = document.getElementById('auth-r34-userid');
      const r34Key = document.getElementById('auth-r34-apikey');
      const r34Status = document.getElementById('r34-auth-status');
      if (r34User && r34Key && r34Status) {
        r34User.value = '';
        r34Key.value = '';
        if (state.authR34.userId && state.authR34.apiKey) {
          r34Status.textContent = state.language === 'ru' ? `Статус: Подключен` : `Status: Connected`;
          r34Status.style.color = 'var(--success)';
        } else {
          r34Status.textContent = state.language === 'ru' ? `Статус: Подключен (Ключ по умолчанию)` : `Status: Connected (Default Key)`;
          r34Status.style.color = 'var(--success)';
        }
      }
      toggleAdminPanelVisibility();
    }

    async function rollLuckyPost() {
      try {
        const randomTag = state.apiProvider === 'rule34' ? 'sort:random' : 'order:random';
        const posts = await fetchFromE621(randomTag, 0, null, 'all');
        if (posts.length > 0) {
          openDetailView(posts[Math.floor(Math.random() * posts.length)]);
          return;
        }
        throw new Error('No random posts');
      } catch (e) {
        showToast(t('randomFailed'));
      }
    }

    function updateElapsedTimeUI(timeElement = document.getElementById('stat-val-time')) {
      if (!timeElement) return;
      const mins = Math.floor(state.totalTime / 60);
      const secs = state.totalTime % 60;
      timeElement.textContent = state.language === 'ru' ? `${mins}м ${secs}с` : `${mins}m ${secs}s`;
    }

    function updateStatsUI() {
      const providerState = getProviderState();
      const providerHistory = providerState.history;
      const providerBookmarks = providerState.bookmarks;
      const statsTitle = document.getElementById('lbl-stats-title');
      const viewed = document.getElementById('stat-val-viewed');
      const liked = document.getElementById('stat-val-liked');
      const timeVal = document.getElementById('stat-val-time');
      const tagsBox = document.getElementById('stat-val-tags');
      const loadedMb = document.getElementById('stat-val-loaded-mb');
      const videosVal = document.getElementById('stat-val-videos');
      const ratingVal = document.getElementById('stat-val-fav-rating');
      const avgScoreVal = document.getElementById('stat-val-avg-score');

      if (statsTitle) {
        const providerLabel = state.apiProvider === 'rule34' ? 'rule34' : 'e621';
        statsTitle.textContent = `${t('statsTitle')} · ${providerLabel}`;
      }
      if (viewed) viewed.textContent = providerHistory.length;
      if (liked) liked.textContent = providerBookmarks.length;
      if (loadedMb) loadedMb.textContent = providerState.trafficUsed.toFixed(2) + ' MB';
      if (videosVal) videosVal.textContent = providerState.videoPlays;

      updateElapsedTimeUI(timeVal);

      if (ratingVal) ratingVal.textContent = '...';
      if (ratingVal && providerHistory.length > 0) {
        const ratingsMap = {};
        providerHistory.forEach(h => {
          if (h.rating) ratingsMap[h.rating] = (ratingsMap[h.rating] || 0) + 1;
        });
        const topRating = Object.entries(ratingsMap).sort((a, b) => b[1] - a[1])[0][0];
        const ratingLabels = { 's': 'S (Safe)', 'q': 'Q (Questionable)', 'e': 'E (Explicit)' };
        ratingVal.textContent = ratingLabels[topRating] || 'S (Safe)';
      }

      if (avgScoreVal) avgScoreVal.textContent = '0';
      if (avgScoreVal && providerHistory.length > 0) {
        const sumScore = providerHistory.reduce((acc, curr) => acc + (curr.score || 0), 0);
        const avg = Math.round(sumScore / providerHistory.length);
        avgScoreVal.textContent = avg;
      }

      if (tagsBox) {
        const tagWeights = {};
        providerBookmarks.forEach(post => {
          if (post.tags && post.tags.general) {
            post.tags.general.forEach(t => {
              tagWeights[t] = (tagWeights[t] || 0) + 1;
            });
          }
        });

        const sortedTags = Object.entries(tagWeights).sort((a, b) => b[1] - a[1]).slice(0, 5);
        tagsBox.innerHTML = '';
        if (sortedTags.length === 0) {
          tagsBox.textContent = '...';
        } else {
          sortedTags.forEach(([tag, num]) => {
            const badge = document.createElement('span');
            badge.className = 'bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-[10px] text-zinc-300';
            badge.textContent = `${tag} (${num})`;
            tagsBox.appendChild(badge);
          });
        }
      }
    }

    function applyCustomStyles() {
      const root = document.documentElement;
      const activeAccent = getActiveAccent();
      root.style.setProperty('--accent', activeAccent);
      root.style.setProperty('--accent-hover', activeAccent + 'dd');
      root.style.setProperty('--radius', state.customization.radius);

      document.querySelectorAll('.color-dot').forEach(dot => {
        if (dot.getAttribute('data-color') === activeAccent) {
          dot.classList.add('active');
          dot.style.borderColor = '#ffffff';
        } else {
          dot.classList.remove('active');
          dot.style.borderColor = 'transparent';
        }
      });

      const radiusSelect = document.getElementById('setting-radius');
      if (radiusSelect) radiusSelect.value = state.customization.radius;

      const bottomBar = document.getElementById('bottom-tab-bar');
      if (bottomBar) bottomBar.style.borderColor = activeAccent;

      document.querySelectorAll('.tab-bar .tab-btn').forEach(b => {
        if (b.classList.contains('active')) {
          b.style.color = activeAccent;
        } else {
          b.style.color = 'var(--text-muted)';
        }
      });
    }

    function applyFeedFitStyle() {
      document.body.classList.remove('feed-fit-cover', 'feed-fit-contain');
      document.body.classList.add(`feed-fit-${state.settings.feedFit || 'cover'}`);
      const select = document.getElementById('setting-feed-fit');
      if (select) select.value = state.settings.feedFit || 'cover';
    }

    function initRatingsCheckboxes() {
      const safeCheck = document.getElementById('rating-safe');
      const questCheck = document.getElementById('rating-questionable');
      const explCheck = document.getElementById('rating-explicit');

      if (!safeCheck || !questCheck || !explCheck) return;

      safeCheck.checked = state.settings.ratings.includes('0+');
      questCheck.checked = state.settings.ratings.includes('16+');
      explCheck.checked = state.settings.ratings.includes('18+');

      if (state.panicActive) {
        safeCheck.disabled = true;
        questCheck.disabled = true;
        explCheck.disabled = true;
      } else {
        safeCheck.disabled = false;
        questCheck.disabled = false;
        explCheck.disabled = false;
      }
    }

    function renderBlacklistChips() {
      const chipsContainer = document.getElementById('blacklist-chips');
      if (!chipsContainer) return;
      chipsContainer.innerHTML = '';
      const isR34 = state.apiProvider === 'rule34';
      const blArr = isR34 ? state.blacklistR34 : state.blacklist;
      blArr.forEach(tag => {
        const chip = document.createElement('div');
        chip.className = 'tag-chip';
        chip.innerHTML = `<span>${tag}</span><button onclick="removeBlacklistTag('${tag}')">✕</button>`;
        chipsContainer.appendChild(chip);
      });
    }

    window.removeBlacklistTag = function (tag) {
      const isR34 = state.apiProvider === 'rule34';
      if (isR34) {
          state.blacklistR34 = state.blacklistR34.filter(t => t !== tag);
          safeLocalStorage.setItem('p_rule34_blacklist', JSON.stringify(state.blacklistR34));
      } else {
          state.blacklist = state.blacklist.filter(t => t !== tag);
          safeLocalStorage.setItem('p_e621_blacklist', JSON.stringify(state.blacklist));
      }
      renderBlacklistChips();
      loadGallery(true);
    };

    function changeLayout(type, reloadGallery = true) {
      state.settings.layout = type;
      safeLocalStorage.setItem('p_e621_layout', type);

      const grids = [
        document.getElementById('gallery-grid'),
        document.getElementById('bookmarks-grid'),
        document.getElementById('recs-grid')
      ];

      grids.forEach(grid => {
        if (!grid) return;
        grid.className = 'grid-container';
        if (type === 'squares') {
          grid.classList.add('grid-squares');
        } else if (type === 'masonry') {
          grid.classList.add('grid-masonry');
        } else if (type === 'stories') {
          grid.classList.add('grid-stories');
        }
      });

      if (reloadGallery) loadGallery(true);
    }

    function switchView(viewName) {
      activeView = viewName;
      document.querySelectorAll('.tab-bar .tab-btn').forEach(b => {
        b.classList.remove('active');
        b.style.color = 'var(--text-muted)';
      });
      const activeBtn = document.querySelector(`[data-view="${viewName}"]`);
      if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.style.color = getActiveAccent();
      }

      document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
      const activePanel = document.getElementById(`panel-${viewName}`);
      if (activePanel) activePanel.classList.add('active');

      const header = DOM.appHeader;
      if (header) {
        header.style.display = viewName === 'gallery' ? 'flex' : 'none';
      }

      if (viewName === 'bookmarks') {
        renderBookmarks();
      } else if (viewName === 'recommendations') {
        generateSmartRecommendations();
      }
    }

    function showToast(text) {
      const toast = document.getElementById('custom-toast');
      if (!toast) return;
      toast.textContent = text;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 2000);
    }

    function checkFirstLaunchEULA() {
      const accepted = safeLocalStorage.getItem('p_e621_eula_accepted');
      if (accepted !== 'true') {
        document.body.classList.add('modal-open');
        const overlay = document.getElementById('eula-overlay');
        if (overlay) overlay.classList.remove('hidden');
        renderEULALanguage(state.language);
      } else {
        evaluateSecurityCheckpoints();
      }
    }

    function renderEULALanguage(lang) {
      const termsBox = document.getElementById('eula-terms-box');
      if (!termsBox) return;
      state.language = lang;
      safeText('eula-sub-title', t('eulaSubtitle'));
      ['lang-btn-ru', 'eula-lang-ru'].forEach(id => {
        document.getElementById(id)?.classList.toggle('is-active', lang === 'ru');
      });
      ['lang-btn-en', 'eula-lang-en'].forEach(id => {
        document.getElementById(id)?.classList.toggle('is-active', lang === 'en');
      });
      if (lang === 'ru') {
        document.getElementById('eula-main-title').textContent = "ВНИМАНИЕ";
        document.getElementById('lbl-eula-checkbox-text').textContent = translations.ru.eulaCheckbox;
        document.getElementById('eula-confirm-btn').textContent = translations.ru.eulaConfirm;
        termsBox.innerHTML = translations.ru.eulaText;
      } else {
        document.getElementById('eula-main-title').textContent = "WARNING";
        document.getElementById('lbl-eula-checkbox-text').textContent = translations.en.eulaCheckbox;
        document.getElementById('eula-confirm-btn').textContent = translations.en.eulaConfirm;
        termsBox.innerHTML = translations.en.eulaText;
      }
    }

    function triggerStartupAnimation() {
      if (state.settings.startupAnim && !state.settings.ecoMode) {
        document.documentElement.classList.remove('startup-loading');
        document.body.classList.add('do-startup-anim');
        setTimeout(() => {
          document.body.classList.remove('do-startup-anim');
        }, 1500);
      } else {
        document.documentElement.classList.remove('startup-loading');
      }
    }

    function evaluateSecurityCheckpoints() {
      if (state.settings.pinEnabled) {
        openSecurePinScreen(false, () => {
          loadGallery();
          triggerStartupAnimation();
        });
      } else {
        resolveEncryptedCredentials("");
        updateAuthUI();
        loadGallery();
        triggerStartupAnimation();
      }
    }

    function openSecurePinScreen(isSetup = false, successCallback = null, cancelCallback = null) {
      state.tempPinInput = "";
      state.setupPinMode = isSetup;
      state.newPinRegister = "";
      pinVerificationCallback = successCallback;
      pinCancelCallback = cancelCallback;

      const promptText = document.getElementById('pin-screen-prompt');
      if (promptText) {
        promptText.textContent = isSetup ? t('createPin') : t('enterPin');
      }

      resetPinVisualDots();
      const screen = document.getElementById('pin-overlay-screen');
      if (screen) screen.classList.remove('hidden');
    }

    function resetPinVisualDots() {
      const dots = document.getElementById('pin-visual-dots').children;
      for (let i = 0; i < dots.length; i++) {
        dots[i].className = "w-3.5 h-3.5 rounded-full border-2 border-zinc-700 bg-transparent transition-all duration-150";
      }
    }

    function updatePinVisualDots(len) {
      const dots = document.getElementById('pin-visual-dots').children;
      for (let i = 0; i < dots.length; i++) {
        if (i < len) {
          dots[i].className = "w-3.5 h-3.5 rounded-full border-2 bg-white transition-all duration-150";
          dots[i].style.borderColor = getActiveAccent();
        } else {
          dots[i].className = "w-3.5 h-3.5 rounded-full border-2 border-zinc-700 bg-transparent transition-all duration-150";
        }
      }
    }

    function processPinEntry() {
      const promptText = document.getElementById('pin-screen-prompt');

      if (state.setupPinMode) {
        if (!state.newPinRegister) {
          state.newPinRegister = state.tempPinInput;
          state.tempPinInput = "";
          resetPinVisualDots();
          if (promptText) promptText.textContent = t('repeatPin');
        } else {
          if (state.tempPinInput === state.newPinRegister) {
            safeLocalStorage.setItem('p_e621_pin_code', state.tempPinInput);
            safeLocalStorage.setItem('p_e621_pin_enabled', 'true');
            state.settings.pinEnabled = true;

            reEncryptCredentials(state.tempPinInput);
            const screen = document.getElementById('pin-overlay-screen');
            if (screen) screen.classList.add('hidden');
            document.documentElement.classList.remove('pin-loading');
            const wrap = document.getElementById('pin-actions-wrap');
            if (wrap) wrap.classList.remove('hidden');
            showToast(t('pinConfigured'));

            if (pinVerificationCallback) pinVerificationCallback(state.tempPinInput);
          } else {
            state.tempPinInput = "";
            state.newPinRegister = "";
            resetPinVisualDots();
            if (promptText) promptText.textContent = t('pinMismatch');
            if ('vibrate' in navigator) navigator.vibrate([80, 80]);
          }
        }
      } else {
        const activePin = safeLocalStorage.getItem('p_e621_pin_code') || "";
        if (state.tempPinInput === activePin) {
          const screen = document.getElementById('pin-overlay-screen');
          if (screen) screen.classList.add('hidden');
          document.documentElement.classList.remove('pin-loading');
          resolveEncryptedCredentials(state.tempPinInput);
          updateAuthUI();
          if (pinVerificationCallback) pinVerificationCallback(state.tempPinInput);
        } else {
          state.tempPinInput = "";
          resetPinVisualDots();
          if (promptText) promptText.textContent = t('invalidPin');
          if ('vibrate' in navigator) navigator.vibrate(120);
        }
      }
    }

    function sanitizeDownloadFilename(filename) {
      return String(filename || 'media')
        .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '_')
        .replace(/[. ]+$/g, '')
        .slice(0, 180) || 'media';
    }

    async function downloadMediaLocal(url, filename) {
      const dlBtn = document.getElementById('detail-download-btn');
      const dlBtnSpan = dlBtn?.querySelector('span');
      const safeFilename = sanitizeDownloadFilename(filename);

      if (dlBtnSpan) {
        dlBtnSpan.textContent = t('downloadingMedia');
      }
      if (dlBtn) dlBtn.disabled = true;

      showToast(t('downloadingMedia'));

      try {
        const isNative = window.Capacitor?.isNativePlatform?.();
        const mediaDownloader = window.Capacitor?.Plugins?.MediaDownloader
          || window.Capacitor?.registerPlugin?.('MediaDownloader');

        if (isNative) {
          if (!mediaDownloader?.download) {
            throw new Error('Native download plugin is unavailable');
          }

          await mediaDownloader.download({
            url,
            filename: safeFilename
          });

          showToast(t('downloadComplete'));
          return;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = objectUrl;
        a.download = safeFilename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
        showToast(t('downloadComplete'));
      } catch (err) {
        console.error('Media download failed:', err);
        showToast(`${t('downloadFailed')}: ${err?.message || err}`);
      } finally {
        if (dlBtn) dlBtn.disabled = false;
        if (dlBtnSpan) dlBtnSpan.textContent = t('downloadMedia');
      }
    }

    function triggerInstantPanicAction() {
      state.prePanicRatings = [...state.settings.ratings];
      safeLocalStorage.setItem('p_e621_pre_panic_ratings', JSON.stringify(state.prePanicRatings));
      state.settings.ratings = ["0+"];
      safeLocalStorage.setItem('p_e621_ratings', JSON.stringify(["0+"]));
      state.panicActive = true;
      safeLocalStorage.setItem('p_e621_panic_active', 'true');

      const grid = document.getElementById('gallery-grid');
      if (grid) grid.innerHTML = '';
      closeDetailView();

      syncPanicUIState();
      showToast(t('quickPanicActive'));
      loadGallery(true);
    }

    function syncPanicUIState() {
      const pBtn = document.getElementById('quick-panic-btn');
      const pWrap = document.getElementById('panic-disable-wrap');
      const safeCheck = document.getElementById('rating-safe');
      const questCheck = document.getElementById('rating-questionable');
      const explCheck = document.getElementById('rating-explicit');

      if (state.panicActive) {
        if (pBtn) pBtn.classList.add('panic-active-btn');
        if (pWrap) pWrap.classList.remove('hidden');
        if (safeCheck) safeCheck.disabled = true;
        if (questCheck) questCheck.disabled = true;
        if (explCheck) {
          explCheck.disabled = true;
          explCheck.checked = false;
        }
      } else {
        if (pBtn) pBtn.classList.remove('panic-active-btn');
        if (pWrap) pWrap.classList.add('hidden');
        if (safeCheck) safeCheck.disabled = false;
        if (questCheck) questCheck.disabled = false;
        if (explCheck) explCheck.disabled = false;
      }
      initRatingsCheckboxes();
    }

    function performDisablePanic() {
      state.panicActive = false;
      safeLocalStorage.setItem('p_e621_panic_active', 'false');
      state.settings.ratings = [...state.prePanicRatings];
      safeLocalStorage.setItem('p_e621_ratings', JSON.stringify(state.settings.ratings));

      syncPanicUIState();
      showToast(t('quickPanicDeactive'));
      loadGallery(true);
    }

    let lastScrollY = window.scrollY;
    let accumulatedDelta = 0;
    let scrollFramePending = false;

    window.addEventListener('scroll', () => {
      if (activeView !== 'gallery' || scrollFramePending) return;

      scrollFramePending = true;
      requestAnimationFrame(() => {
        scrollFramePending = false;
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;
        lastScrollY = currentScrollY;

        const header = DOM.appHeader;
        if (currentScrollY <= 60) {
          header?.classList.remove('header-hidden');
          accumulatedDelta = 0;
          return;
        }

        accumulatedDelta += delta;

        if (accumulatedDelta > 150) {
          header?.classList.add('header-hidden');
          accumulatedDelta = 0;
        } else if (accumulatedDelta < -80) {
          header?.classList.remove('header-hidden');
          accumulatedDelta = 0;
        }
      });
    }, { passive: true });

    document.addEventListener("DOMContentLoaded", () => {
      const mediaSwitchContainer = document.getElementById('media-type-container');
      if (mediaSwitchContainer) {
        updateMediaTypeControl(state.mediaTypeFilter);
        
        function syncProviderUI() {
          const btnE621 = document.getElementById('prov-e621');
          const btnR34 = document.getElementById('prov-r34');
          if (!btnE621 || !btnR34) return;
          const providerBrand = state.apiProvider === 'rule34' ? 'R34' : 'E621';
          document.querySelectorAll('.provider-brand-suffix').forEach(suffix => {
            suffix.textContent = providerBrand;
          });
          document.title = `Chromium ${providerBrand} Mobile Client`;
          applyCustomStyles();
          if (state.apiProvider === 'e621') {
            btnE621.style.backgroundColor = 'var(--accent)';
            btnE621.style.color = '#fff';
            btnR34.style.backgroundColor = 'transparent';
            btnR34.style.color = 'var(--text-muted)';
          } else {
            btnR34.style.backgroundColor = 'var(--accent)';
            btnR34.style.color = '#fff';
            btnE621.style.backgroundColor = 'transparent';
            btnE621.style.color = 'var(--text-muted)';
          }
          const ratingFilters = document.getElementById('rating-filters-block');
          if (ratingFilters) ratingFilters.hidden = state.apiProvider === 'rule34';
          const aiFilter = document.getElementById('filter-ai-posts');
          if (aiFilter) aiFilter.checked = isAiFilterEnabled();
          const trafficVal = document.getElementById('traffic-val');
          if (trafficVal) trafficVal.textContent = getProviderState().trafficUsed.toFixed(2);
          syncProviderPeriodControls();
          updateStatsUI();
        }
        if (document.getElementById('api-provider-switch')) syncProviderUI();
        
        const provSwitch = document.getElementById('api-provider-switch');
        if (provSwitch) {
          provSwitch.addEventListener('click', (e) => {
            let newProv;
            if (e.target.closest('#prov-r34')) newProv = 'rule34';
            else if (e.target.closest('#prov-e621')) newProv = 'e621';
            else return;
            if (state.apiProvider === newProv) return;
            state.apiProvider = newProv;
            safeLocalStorage.setItem('p_api_provider', newProv);
            syncProviderUI();
            if (autocompleteRequestController) autocompleteRequestController.abort();
            if (suggestionsBox) suggestionsBox.style.display = 'none';
            const blacklistSuggestions = document.getElementById('blacklist-suggestions');
            if (blacklistSuggestions) blacklistSuggestions.style.display = 'none';
            if (typeof renderBlacklistChips === 'function') renderBlacklistChips();
            const searchInput = document.getElementById('search-input');
            if (searchInput) searchInput.value = '';
            currentSearchTags = '';
            
            const grid = document.getElementById('gallery-grid');
            if(grid) clearPostContainer(grid);
            loadGallery(true);
            
            if (activeView === 'bookmarks') renderBookmarks();
          });
        }
        mediaSwitchContainer.addEventListener('click', event => {
          const button = event.target.closest('.media-type-btn');
          if (button && mediaSwitchContainer.contains(button)) {
            setMediaTypeFilter(button.dataset.mode);
          }
        });
      }
      syncProviderPeriodControls();
      if (searchInput) {
        searchInput.value = currentSearchTags;
        toggleClearBtn();
      }

      const generateBackupBtn = document.getElementById('btn-generate-backup');
      if (generateBackupBtn) {
        generateBackupBtn.addEventListener('click', () => {
          generateBackupCode();
        });
      }

      const copyBackupBtn = document.getElementById('btn-copy-backup-code');
      if (copyBackupBtn) {
        copyBackupBtn.addEventListener('click', () => {
          const codeArea = document.getElementById('backup-code-area');
          if (codeArea) {
            codeArea.select();
            document.execCommand('copy');
            showToast(t('codeCopied'));
          }
        });
      }

      const restoreBackupBtn = document.getElementById('btn-restore-backup');
      if (restoreBackupBtn) {
        restoreBackupBtn.addEventListener('click', () => {
          const code = document.getElementById('import-backup-input').value;
          restoreBackupFromCode(code);
        });
      }

      document.querySelectorAll('.tab-bar .tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const action = btn.getAttribute('data-action');
          const view = btn.getAttribute('data-view');
          const targetTrigger = action === 'random' ? 'random' : view;

          triggerTabAnimation(targetTrigger);

          if (action === 'random') {
            state.randomModeActive = true;
            rollLuckyPost();
          } else {
            state.randomModeActive = false;
            switchView(view);
          }
        });
      });

      const panicBtn = document.getElementById('quick-panic-btn');
      if (panicBtn) {
        panicBtn.addEventListener('click', () => {
          if (state.panicActive) {
            showToast(t('panicSettingsOnly'));
            if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
          } else {
            triggerInstantPanicAction();
          }
        });
      }

      const closePanicBtn = document.getElementById('disable-panic-settings-btn');
      if (closePanicBtn) {
        closePanicBtn.addEventListener('click', () => {
          if (state.settings.pinEnabled) {
            openSecurePinScreen(false, () => {
              performDisablePanic();
            });
          } else {
            performDisablePanic();
          }
        });
      }

      const favSearchBtn = document.getElementById('fav-search-btn');
      if (favSearchBtn) {
        favSearchBtn.addEventListener('click', () => {
          const query = searchInput.value.trim();
          toggleFavoriteSearch(query);
        });
      }

      const historySearchBtn = document.getElementById('history-search-btn');
      if (historySearchBtn) {
        historySearchBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (suggestionsBox.style.display === 'block') {
            suggestionsBox.style.display = 'none';
          } else {
            renderSearchHistoryInSuggestions();
          }
        });
      }

      const searchBtn = document.getElementById('search-btn');
      if (searchBtn) {
        searchBtn.addEventListener('click', () => {
          const query = searchInput.value.trim();
          suggestionsBox.style.display = 'none';
          searchInput.blur();
          triggerSearch(query);
        });
      }

      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const query = searchInput.value.trim();
          suggestionsBox.style.display = 'none';
          searchInput.blur();
          triggerSearch(query);
        }
      });

      const openLegalBtn = document.getElementById('open-legal-btn');
      const legalOverlay = document.getElementById('legal-overlay');
      const legalCloseBtn = document.getElementById('legal-close-btn');

      if (openLegalBtn && legalOverlay) {
        openLegalBtn.addEventListener('click', () => {
          legalOverlay.style.display = 'flex';
          legalOverlay.scrollTop = 0;
        });
      }

      if (legalCloseBtn && legalOverlay) {
        legalCloseBtn.addEventListener('click', () => {
          legalOverlay.style.display = 'none';
        });
      }

      const detailScaleBtn = document.getElementById('detail-fit-toggle');
      if (detailScaleBtn) {
        detailScaleBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleDetailScaleMode();
        });
      }

      const slideshowToggleBtn = document.getElementById('detail-slideshow-btn');
      if (slideshowToggleBtn) {
        slideshowToggleBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleSlideshow();
        });
      }

      const apiBaseInput = document.getElementById('setting-api-base');
      const proxyModeSelect = document.getElementById('setting-proxy-mode');
      const customProxyInput = document.getElementById('setting-custom-proxy');
      const customProxyWrap = document.getElementById('custom-proxy-wrap');
      const saveProxyBtn = document.getElementById('save-proxy-btn');

      if (proxyModeSelect) {
        proxyModeSelect.value = state.settings.proxyMode || 'fallback';
        if (proxyModeSelect.value === 'custom') {
          customProxyWrap.classList.remove('hidden');
        }
        proxyModeSelect.addEventListener('change', (e) => {
          if (e.target.value === 'custom') {
            customProxyWrap.classList.remove('hidden');
          } else {
            customProxyWrap.classList.add('hidden');
          }
        });
      }
      if (apiBaseInput) apiBaseInput.value = state.settings.apiBaseUrl || 'https://e621.net';
      if (customProxyInput) customProxyInput.value = state.settings.customProxyPrefix || '';

      if (saveProxyBtn) {
        saveProxyBtn.addEventListener('click', () => {
          state.settings.apiBaseUrl = apiBaseInput.value.trim() || 'https://e621.net';
          state.settings.proxyMode = proxyModeSelect.value;
          state.settings.customProxyPrefix = customProxyInput.value.trim();

          safeLocalStorage.setItem('p_e621_api_base', state.settings.apiBaseUrl);
          safeLocalStorage.setItem('p_e621_proxy_mode', state.settings.proxyMode);
          safeLocalStorage.setItem('p_e621_custom_proxy', state.settings.customProxyPrefix);

          showToast(t('proxySaved'));
          loadGallery(true);
        });
      }

      document.querySelectorAll('.pin-key-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const num = btn.getAttribute('data-num');
          const action = btn.getAttribute('data-action');

          if ('vibrate' in navigator) navigator.vibrate(15);

          if (num !== null) {
            if (state.tempPinInput.length < 4) {
              state.tempPinInput += num;
              updatePinVisualDots(state.tempPinInput.length);

              if (state.tempPinInput.length === 4) {
                setTimeout(processPinEntry, 180);
              }
            }
          } else if (action === 'clear') {
            state.tempPinInput = "";
            updatePinVisualDots(0);
          } else if (action === 'backspace') {
            state.tempPinInput = state.tempPinInput.slice(0, -1);
            updatePinVisualDots(state.tempPinInput.length);
          }
        });
      });

      const langRuBtn = document.getElementById('lang-btn-ru');
      const langEnBtn = document.getElementById('lang-btn-en');
      const eulaLangRu = document.getElementById('eula-lang-ru');
      const eulaLangEn = document.getElementById('eula-lang-en');

      if (langRuBtn) {
        langRuBtn.addEventListener('click', () => {
          state.language = 'ru';
          safeLocalStorage.setItem('p_e621_lang', 'ru');
          translateUI();
          showToast(t('languageChanged'));
        });
      }
      if (langEnBtn) {
        langEnBtn.addEventListener('click', () => {
          state.language = 'en';
          safeLocalStorage.setItem('p_e621_lang', 'en');
          translateUI();
          showToast(t('languageChanged'));
        });
      }
      if (eulaLangRu) {
        eulaLangRu.addEventListener('click', () => {
          state.language = 'ru';
          safeLocalStorage.setItem('p_e621_lang', 'ru');
          translateUI();
          renderEULALanguage('ru');
        });
      }
      if (eulaLangEn) {
        eulaLangEn.addEventListener('click', () => {
          state.language = 'en';
          safeLocalStorage.setItem('p_e621_lang', 'en');
          translateUI();
          renderEULALanguage('en');
        });
      }

      const blacklistBtn = document.getElementById('add-blacklist-btn');
      const blacklistInput = document.getElementById('blacklist-input');
      const blacklistSuggestionsBox = document.getElementById('blacklist-suggestions');
      let blacklistDebounceTimer;

      if (blacklistInput && blacklistSuggestionsBox) {
        blacklistInput.addEventListener('input', () => {
          clearTimeout(blacklistDebounceTimer);
          const value = blacklistInput.value;

          if (!value.trim() || value.trim().length < 2) {
            blacklistSuggestionsBox.style.display = 'none';
            return;
          }

          blacklistDebounceTimer = setTimeout(async () => {
            const suggestions = await fetchTagSuggestions(value.trim());
            if (blacklistInput.value !== value) return;

            if (!suggestions || suggestions.length === 0) {
              blacklistSuggestionsBox.style.display = 'none';
              return;
            }

            blacklistSuggestionsBox.innerHTML = '';
            suggestions.slice(0, 10).forEach(item => {
              const suggestionItem = document.createElement('div');
              suggestionItem.className = 'suggestion-item';
              const count = item.post_count;
              const formattedCount = formatCompactCount(count);
              suggestionItem.innerHTML = `<span>${item.name}</span><span class="text-zinc-500 text-xs">${formattedCount}</span>`;

              suggestionItem.addEventListener('click', () => {
                blacklistInput.value = item.name;
                blacklistSuggestionsBox.style.display = 'none';
                blacklistInput.focus();
              });
              blacklistSuggestionsBox.appendChild(suggestionItem);
            });
            blacklistSuggestionsBox.style.display = 'block';
          }, 300);
        });

        document.addEventListener('click', (e) => {
          if (!blacklistInput.contains(e.target) && !blacklistSuggestionsBox.contains(e.target)) {
            blacklistSuggestionsBox.style.display = 'none';
          }
        });
      }

      if (blacklistBtn) {
        blacklistBtn.addEventListener('click', () => {
          const input = document.getElementById('blacklist-input');
          const tag = input.value.trim().toLowerCase();
          const isR34 = state.apiProvider === 'rule34';
          const blArr = isR34 ? state.blacklistR34 : state.blacklist;
          if (tag && !blArr.includes(tag)) {
            blArr.push(tag);
            if (isR34) safeLocalStorage.setItem('p_rule34_blacklist', JSON.stringify(blArr));
            else safeLocalStorage.setItem('p_e621_blacklist', JSON.stringify(blArr));
            renderBlacklistChips();
            input.value = '';
            if (blacklistSuggestionsBox) blacklistSuggestionsBox.style.display = 'none';
            loadGallery(true);
          }
        });
      }


      const radiusSelect = document.getElementById('setting-radius');
      if (radiusSelect) {
        radiusSelect.addEventListener('change', (e) => {
          state.customization.radius = e.target.value;
          safeLocalStorage.setItem('p_e621_customization', JSON.stringify(state.customization));
          applyCustomStyles();
          showToast(t('roundingUpdated'));
        });
      }

      const feedFitSelect = document.getElementById('setting-feed-fit');
      if (feedFitSelect) {
        feedFitSelect.addEventListener('change', (e) => {
          state.settings.feedFit = e.target.value;
          safeLocalStorage.setItem('p_e621_feed_fit', e.target.value);
          applyFeedFitStyle();
        });
      }

      document.querySelectorAll('.color-dot').forEach(dot => {
        dot.addEventListener('click', () => {
          const color = dot.getAttribute('data-color');
          if (state.apiProvider === 'rule34') {
            state.customizationR34.accent = color;
            safeLocalStorage.setItem('p_rule34_customization', JSON.stringify(state.customizationR34));
          } else {
            state.customization.accent = color;
            safeLocalStorage.setItem('p_e621_customization', JSON.stringify(state.customization));
          }
          applyCustomStyles();
          translateUI();
          showToast(t('accentUpdated'));
        });
      });

      const ecoModeBox = document.getElementById('setting-eco-mode');
      if (ecoModeBox) {
        ecoModeBox.addEventListener('change', (e) => {
          state.settings.ecoMode = e.target.checked;
          safeLocalStorage.setItem('p_e621_set_eco', e.target.checked);
          applyEcoMode(e.target.checked);
        });
      }

      const startupAnimBox = document.getElementById('setting-startup-anim');
      if (startupAnimBox) {
        startupAnimBox.addEventListener('change', (e) => {
          state.settings.startupAnim = e.target.checked;
          safeLocalStorage.setItem('p_e621_startup_anim', e.target.checked);
        });
      }

      const dataBudgetBox = document.getElementById('setting-data-budget');
      if (dataBudgetBox) {
        dataBudgetBox.checked = state.settings.dataBudget;
        dataBudgetBox.addEventListener('change', (e) => {
          state.settings.dataBudget = e.target.checked;
          safeLocalStorage.setItem('p_e621_set_budget', e.target.checked);
          loadGallery(true);
        });
      }

      const ramSafeguardBox = document.getElementById('setting-ram-safeguard');
      if (ramSafeguardBox) {
        ramSafeguardBox.checked = state.settings.ramSafeguard;
        ramSafeguardBox.addEventListener('change', (e) => {
          state.settings.ramSafeguard = e.target.checked;
          safeLocalStorage.setItem('p_e621_set_ram', e.target.checked);
          loadGallery(true);
        });
      }

      const nsfwBox = document.getElementById('setting-nsfw-blur');
      if (nsfwBox) {
        nsfwBox.addEventListener('change', (e) => {
          state.settings.nsfwBlur = e.target.checked;
          safeLocalStorage.setItem('p_e621_nsfw_blur', e.target.checked);
          applyNsfwBlurState(e.target.checked);
        });
      }

      const aiFilterBox = document.getElementById('filter-ai-posts');
      if (aiFilterBox) {
        aiFilterBox.checked = isAiFilterEnabled();
        aiFilterBox.addEventListener('change', (e) => {
          if (state.apiProvider === 'rule34') {
            state.filterAIR34 = e.target.checked;
            safeLocalStorage.setItem('p_rule34_filter_ai', String(state.filterAIR34));
          } else {
            state.filterAI = e.target.checked;
            safeLocalStorage.setItem('p_e621_filter_ai', String(state.filterAI));
          }
          loadGallery(true);
        });
      }

      const bindRatingToggle = (checkboxId, ratingTag) => {
        const checkbox = document.getElementById(checkboxId);
        if (checkbox) {
          checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
              if (!state.settings.ratings.includes(ratingTag)) {
                state.settings.ratings.push(ratingTag);
              }
            } else {
              state.settings.ratings = state.settings.ratings.filter(r => r !== ratingTag);
            }
            safeLocalStorage.setItem('p_e621_ratings', JSON.stringify(state.settings.ratings));
            loadGallery(true);
          });
        }
      };

      bindRatingToggle('rating-safe', '0+');
      bindRatingToggle('rating-questionable', '16+');
      bindRatingToggle('rating-explicit', '18+');

      const pinBox = document.getElementById('setting-pin-enabled');
      if (pinBox) {
        pinBox.addEventListener('change', (e) => {
          const active = e.target.checked;
          if (active) {
            openSecurePinScreen(true);
          } else {
            openSecurePinScreen(false, () => {
              state.settings.pinEnabled = false;
              safeLocalStorage.setItem('p_e621_pin_enabled', 'false');
              safeLocalStorage.removeItem('p_e621_pin_code');
              reEncryptCredentials("");
              const wrap = document.getElementById('pin-actions-wrap');
              if (wrap) wrap.classList.add('hidden');
              showToast(t('pinDisabled'));
            }, () => {
              pinBox.checked = true;
            });
          }
        });
      }

      const gridBtn1 = document.getElementById('shuffler-square');
      const gridBtn2 = document.getElementById('shuffler-masonry');
      const gridBtn3 = document.getElementById('shuffler-story');
      if (gridBtn1) gridBtn1.addEventListener('click', () => changeLayout('squares'));
      if (gridBtn2) gridBtn2.addEventListener('click', () => changeLayout('masonry'));
      if (gridBtn3) gridBtn3.addEventListener('click', () => changeLayout('stories'));

      const bgInput = document.getElementById('custom-bg-input');
      if (bgInput) {
        bgInput.addEventListener('change', function (e) {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = function (event) {
            const dataUrl = event.target.result;
            state.customBg = dataUrl;
            safeLocalStorage.setItem('p_e621_custom_bg', dataUrl);
            applyCustomBackground(dataUrl);
            showToast(t('backgroundApplied'));
          };
          reader.readAsDataURL(file);
        });
      }

      const opacityRange = document.getElementById('bg-opacity-range');
      if (opacityRange) {
        opacityRange.addEventListener('input', function (e) {
          state.bgOpacity = e.target.value;
          safeLocalStorage.setItem('p_e621_bg_opacity', e.target.value);
          applyBgOpacity(e.target.value);
        });
      }

      const clearBgBtn = document.getElementById('clear-bg-btn');
      if (clearBgBtn) {
        clearBgBtn.addEventListener('click', () => {
          state.customBg = '';
          safeLocalStorage.removeItem('p_e621_custom_bg');
          applyCustomBackground('');
          showToast(t('backgroundReset'));
        });
      }

      const periodBar = document.getElementById('popularity-period-bar');
      if (periodBar) {
        periodBar.addEventListener('click', event => {
          const button = event.target.closest('.period-btn');
          if (button && periodBar.contains(button)) {
            setPopularPeriod(button.dataset.period);
          }
        });
      }

      const bookmarkBtn = document.getElementById('detail-bookmark-btn');
      if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', () => {
          if (detailCurrentPost) toggleBookmark(detailCurrentPost);
        });
      }

      const downloadBtn = document.getElementById('detail-download-btn');
      if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
          if (detailCurrentPost) {
            const url = detailCurrentPost.file_url;
            const ext = detailCurrentPost.ext || 'jpg';
            const filename = `e621_${detailCurrentPost.id}.${ext}`;
            downloadMediaLocal(url, filename);
          }
        });
      }

      const eulaConfirmBtn = document.getElementById('eula-confirm-btn');
      if (eulaConfirmBtn) {
        eulaConfirmBtn.addEventListener('click', () => {
          safeLocalStorage.setItem('p_e621_eula_accepted', 'true');
          const overlay = document.getElementById('eula-overlay');
          if (overlay) overlay.classList.add('hidden');
          document.body.classList.remove('modal-open');
          document.documentElement.classList.remove('eula-loading');
          evaluateSecurityCheckpoints();
        });
      }
      const eulaCheckbox = document.getElementById('eula-checkbox');
      if (eulaCheckbox) {
        eulaCheckbox.addEventListener('change', (e) => {
          if (eulaConfirmBtn) eulaConfirmBtn.disabled = !e.target.checked;
        });
      }

      const saveR34Btn = document.getElementById('save-r34-auth-btn');
      if (saveR34Btn) {
        saveR34Btn.addEventListener('click', () => {
          const userVal = document.getElementById('auth-r34-userid').value.trim();
          const apiVal = document.getElementById('auth-r34-apikey').value.trim();
          if (userVal && apiVal) {
            state.authR34.userId = userVal;
            state.authR34.apiKey = apiVal;
            safeLocalStorage.setItem('p_rule34_userid', userVal);
            safeLocalStorage.setItem('p_rule34_apikey', apiVal);
            showToast(state.language === 'ru' ? 'Настройки Rule34 сохранены' : 'Rule34 credentials saved');
            updateAuthUI();
            loadGallery(true);
          } else {
            state.authR34.userId = '';
            state.authR34.apiKey = '';
            safeLocalStorage.removeItem('p_rule34_userid');
            safeLocalStorage.removeItem('p_rule34_apikey');
            showToast(state.language === 'ru' ? 'Кастомные ключи сброшены. Используется системный ключ.' : 'Custom keys removed. Default system key used.');
            updateAuthUI();
            loadGallery(true);
          }
        });
      }

      const saveAuthBtn = document.getElementById('save-auth-btn');
      if (saveAuthBtn) {
        saveAuthBtn.addEventListener('click', () => {
          const userVal = document.getElementById('auth-username').value.trim();
          const apiVal = document.getElementById('auth-api-key').value.trim();
          if (userVal && apiVal) {
            state.auth.username = userVal;
            state.auth.apiKey = apiVal;
            const activePin = safeLocalStorage.getItem('p_e621_pin_code') || "";
            reEncryptCredentials(activePin);
            showToast(t('authSaved'));
            updateAuthUI();
            loadGallery(true);
          } else {
            state.auth = { username: "", apiKey: "" };
            reEncryptCredentials("");
            showToast(t('authSignedOut'));
            updateAuthUI();
            loadGallery(true);
          }
        });
      }

      const closeDetailBtn = document.getElementById('detail-close-btn');
      if (closeDetailBtn) {
        closeDetailBtn.addEventListener('click', () => {
          closeDetailView();
        });
      }
    });

    async function loadPostComments(postId) {
      const container = document.getElementById('comments-feed');
      if (!container) return;
      if (!state.auth.username || !state.auth.apiKey) {
        container.innerHTML = `<div class="text-zinc-500 py-1">${t('commentsAuthRequired')}</div>`;
        return;
      }
      container.innerHTML = `<div class="text-zinc-500 py-1">${t('commentsLoading')}</div>`;
      try {
        const textData = await directFetch(`https://e621.net/comments.json`, { 'group_by': 'comment', 'search[post_id]': postId }, true);
        const data = JSON.parse(textData);
        container.innerHTML = '';
        if (data.length === 0) {
          container.innerHTML = `<div class="text-zinc-600 italic py-1">${t('noComments')}</div>`;
          return;
        }
        data.forEach(c => {
          const block = document.createElement('div');
          block.className = 'border-b border-zinc-800 pb-1 mb-1';
          block.innerHTML = `<div class="flex justify-between font-bold text-zinc-300">
            <span>${c.creator_name}</span>
            <span class="text-[10px] text-zinc-500">${new Date(c.created_at).toLocaleDateString()}</span>
          </div>
          <div class="text-zinc-400 text-xs mt-0.5">${c.body}</div>`;
          container.appendChild(block);
        });
      } catch (e) {
        container.innerHTML = `<div class="text-zinc-600 italic py-1">${t('noComments')}</div>`;
      }
    }

    function applyNsfwBlurState(isEnabled) {
      if (isEnabled) {
        document.body.classList.add('nsfw-blur-enabled');
      } else {
        document.body.classList.remove('nsfw-blur-enabled');
      }
    }

    function applyEcoMode(isEnabled) {
      document.body.classList.toggle('eco-mode', Boolean(isEnabled));
      const ambientCanvas = document.getElementById('ambient-canvas');
      if (isEnabled && ambientCanvas) ambientCanvas.style.opacity = '0';
      applyCustomBackground(state.customBg);
    }

    let elapsedTimePersistTicks = 0;

    function persistElapsedTime() {
      safeLocalStorage.setItem('p_e621_total_time', state.totalTime);
      elapsedTimePersistTicks = 0;
    }

    setInterval(() => {
      state.totalTime += 1;
      updateElapsedTimeUI();
      elapsedTimePersistTicks++;
      if (elapsedTimePersistTicks >= 15) persistElapsedTime();
    }, 1000);

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') persistElapsedTime();
    });
    window.addEventListener('pagehide', persistElapsedTime);

    function togglePromoMode() {
      const modal = document.getElementById('promo-modal');
      if (modal) modal.style.display = 'flex';
    }

    function applyPromoMode() {
      const hideUi = document.getElementById('promo-hide-ui').checked;
      const noAnim = document.getElementById('promo-no-anim').checked;
      const blurImg = document.getElementById('promo-blur-img').checked;
      const greenBg = document.getElementById('promo-green-bg').checked;
      const customCss = document.getElementById('promo-custom-css').value;

      let styleEl = document.getElementById('promo-mode-styles');
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'promo-mode-styles';
        document.head.appendChild(styleEl);
      }

      let css = '';
      if (hideUi) {
        css += 'header, .tab-bar, .tag-operator-bar, #traffic-badge { display: none !important; } ';
        css += 'main { padding-top: 10px !important; padding-bottom: 10px !important; } ';
      }
      if (noAnim) {
        css += '* { transition: none !important; animation: none !important; } ';
      }
      if (blurImg) {
        css += 'img, video { filter: blur(20px) !important; transform: scale(1.1); } ';
      }
      if (greenBg) {
        css += 'body { background: #00FF00 !important; } .post-card { background: #00FF00 !important; } ';
      }

      if (customCss.trim()) {
        css += customCss;
      }

      styleEl.innerHTML = css;
      document.getElementById('promo-modal').style.display = 'none';

      addDebugLog("Режим Промо применен.");
      showToast("Промо-режим активен!");
    }

    window.onload = function () {
      applyCustomStyles();
      applyFeedFitStyle();
      applyEcoMode(state.settings.ecoMode);
      applyBgOpacity(state.bgOpacity);
      renderBlacklistChips();
      renderFavoriteSearchesBar();
      changeLayout(state.settings.layout, false);
      updateAuthUI();
      initRatingsCheckboxes();
      syncPanicUIState();

      const radSelect = document.getElementById('setting-radius');
      if (radSelect) radSelect.value = state.customization.radius;
      const opRange = document.getElementById('bg-opacity-range');
      if (opRange) opRange.value = state.bgOpacity;
      const ecoBox = document.getElementById('setting-eco-mode');
      if (ecoBox) ecoBox.checked = state.settings.ecoMode;
      const nsfwBox = document.getElementById('setting-nsfw-blur');
      if (nsfwBox) nsfwBox.checked = state.settings.nsfwBlur;
      applyNsfwBlurState(state.settings.nsfwBlur);
      const pinBox = document.getElementById('setting-pin-enabled');
      if (pinBox) pinBox.checked = state.settings.pinEnabled;
      const saBox = document.getElementById('setting-startup-anim');
      if (saBox) saBox.checked = state.settings.startupAnim;

      translateUI();

      // Trigger startup animation immediately ONLY if EULA accepted and PIN screen not showing.
      // Otherwise, the animation is triggered when the overlays are resolved.
      const accepted = safeLocalStorage.getItem('p_e621_eula_accepted');
      if (accepted === 'true' && !state.settings.pinEnabled) {
        triggerStartupAnimation();
      }

      checkFirstLaunchEULA();
    };
  
