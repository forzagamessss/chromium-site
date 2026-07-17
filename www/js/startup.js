    (function () {
      try {
        const startupAnim = localStorage.getItem('p_e621_startup_anim') !== 'false';
        const ecoMode = localStorage.getItem('p_e621_set_eco') === 'true';
        if (startupAnim && !ecoMode) {
          document.documentElement.classList.add('startup-loading');
        }
        const eulaAccepted = localStorage.getItem('p_e621_eula_accepted') === 'true';
        if (!eulaAccepted) {
          document.documentElement.classList.add('eula-loading');
        } else {
          const pinEnabled = localStorage.getItem('p_e621_pin_enabled') === 'true';
          if (pinEnabled) {
            document.documentElement.classList.add('pin-loading');
          }
        }
      } catch (e) { }
    })();
  
