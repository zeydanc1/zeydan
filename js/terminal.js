/* ==========================================================
 * ZEYDAN — ENHANCED INTERACTIVE TERMINAL v2.0
 * ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const termInput = document.getElementById("cmd-input");
    const termOutput = document.getElementById("term-history");
    const termForm = document.getElementById("term-form");
    const terminalBody = document.querySelector(".terminal-body");
    const terminalWrapper = document.querySelector(".terminal-wrapper");
    const toggleBtn = document.getElementById("term-toggle-btn");
    const closeDot = document.querySelector(".term-btn.red");
    const minimizeDot = document.querySelector(".term-btn.yellow");
    const maximizeDot = document.querySelector(".term-btn.green");

    if (!termInput || !termOutput || !termForm) return;

    const isEnglish = document.documentElement.lang === "en";
    const cmdHistory = [];
    let historyIndex = -1;

    // --- Section Map for Navigation ---
    const sectionMap = isEnglish ? {
        "home": { id: "hero", label: "🏠 Home" },
        "about": { id: "ozet", label: "👤 About Me" },
        "projects": { id: "calismalar", label: "💼 Projects" },
        "posts": { id: "gonderilerim", label: "📝 Posts" },
        "skills": { id: "skills", label: "⚡ Skills" },
        "achievements": { id: "basarilar", label: "🏆 Achievements" },
        "contact": { id: "iletisim", label: "📧 Contact" },
        "cv": { id: "cv", label: "📄 Resume (CV)" }
    } : {
        "anasayfa": { id: "hero", label: "🏠 Anasayfa" },
        "hakkimda": { id: "ozet", label: "👤 Hakkımda" },
        "projeler": { id: "calismalar", label: "💼 Projeler" },
        "gonderiler": { id: "gonderilerim", label: "📝 Gönderiler" },
        "yetenekler": { id: "skills", label: "⚡ Yetkinlikler" },
        "basarilar": { id: "basarilar", label: "🏆 Başarılar" },
        "iletisim": { id: "iletisim", label: "📧 İletişim" },
        "cv": { id: "cv", label: "📄 Özgeçmiş (CV)" }
    };

    // --- All Available Commands ---
    const allCommands = isEnglish
        ? ["help","about","skills","projects","contact","clear","menu","goto","ls","banner",
           "neofetch","date","whoami","sudo","history","social","cv","matrix","echo","open",
           "gallery","ping","exit","reboot","hack","rm"]
        : ["help","about","skills","projects","contact","clear","menu","goto","ls","banner",
           "neofetch","date","whoami","sudo","history","social","cv","matrix","echo","open",
           "galeri","ping","exit","reboot","hack","rm"];

    // --- Command Catalog ---
    const commands = isEnglish ? {
        "help": [
            "<span class='term-accent'> ═══════════════════════════════════════</span>",
            " <span class='term-success'>AVAILABLE COMMANDS</span>",
            "<span class='term-accent'> ═══════════════════════════════════════</span>",
            "",
            " <span class='term-accent'>Navigation</span>",
            "  <span class='cmd-name'>menu</span>      Interactive section menu",
            "  <span class='cmd-name'>goto</span> <span class='term-muted'>[section]</span>  Navigate to section",
            "  <span class='cmd-name'>ls</span>        List all page sections",
            "  <span class='cmd-name'>gallery</span>   Open gallery page",
            "",
            " <span class='term-accent'>Information</span>",
            "  <span class='cmd-name'>about</span>     Short bio",
            "  <span class='cmd-name'>skills</span>    Technical proficiencies",
            "  <span class='cmd-name'>projects</span>  Selected works",
            "  <span class='cmd-name'>contact</span>   Contact info",
            "  <span class='cmd-name'>social</span>    Social media links",
            "  <span class='cmd-name'>cv</span>        Download resume",
            "",
            " <span class='term-accent'>System</span>",
            "  <span class='cmd-name'>banner</span>    Show ASCII banner",
            "  <span class='cmd-name'>neofetch</span>  System info",
            "  <span class='cmd-name'>date</span>      Current date & time",
            "  <span class='cmd-name'>whoami</span>    Who are you?",
            "  <span class='cmd-name'>history</span>   Command history",

            "  <span class='cmd-name'>clear</span>     Clear terminal",
            "",
            " <span class='term-accent'>Fun</span>",
            "  <span class='cmd-name'>matrix</span>    Matrix rain effect",
            "  <span class='cmd-name'>ping</span>      Ping zeydan.dev",
            "  <span class='cmd-name'>hack</span>      ???",
            "",
            " <span class='term-muted'>TIP: Use ↑↓ arrows for history, Tab for autocomplete</span>"
        ],
        "about": [
            "Hello, I'm <span class='term-accent'>Zeydan Çalışkan</span>. (Based in Nicosia, TRNC)",
            "Pursuing my undergraduate in Software Engineering at CIU.",
            "I develop practical projects in cyber security, network analysis, and penetration testing;",
            "While simultaneously researching emotional intelligence and cultural psychology."
        ],
        "skills": [
            "<span class='term-success'>[Programming]</span> JavaScript, PHP, C++, Python",
            "<span class='term-success'>[Web & UI/UX]</span> HTML5 & CSS3, Responsive Design, SQL/MySQL",
            "<span class='term-success'>[Research]</span> Emotional Intelligence, Intercultural Communication, Ethics",
            "<span class='term-success'>[Cyber Security]</span> Network Analysis, Penetration Testing, OSINT"
        ],
        "projects": [
            "=> <span class='term-accent'>Emotional Intelligence (EQ) Platform</span> (TEKNOFEST 2025 Finalist)",
            "=> <span class='term-accent'>Mehmet Pınar Ticaret</span> (Corporate Web Design)",
            "=> <span class='term-accent'>Eagle's Nest Restaurant</span> (Restaurant Management)",
            "=> <span class='term-accent'>Network Security & Pentesting</span> (Penetration Research)",
            "=> <span class='term-accent'>Vulnerability Scan & Phishing</span> (Phishing Simulation)"
        ],
        "contact": [
            "Email:     <a href='mailto:caliskanzeydan9@gmail.com' class='term-link'>caliskanzeydan9@gmail.com</a>",
            "LinkedIn:  <a href='https://www.linkedin.com/in/zeydan-%C3%A7al%C4%B1%C5%9Fkan-41b4b9153' target='_blank' class='term-link'>Zeydan Çalışkan</a>",
            "Instagram: <a href='https://www.instagram.com/zeydancalisk' target='_blank' class='term-link'>@zeydancalisk</a>",
            "Facebook:  <a href='https://www.facebook.com/cls.zeydan' target='_blank' class='term-link'>cls.zeydan</a>"
        ],
        "whoami": ["<span class='term-accent'>guest@zeydan.dev</span> — Welcome! You don't seem authorized, but feel free to explore my portfolio :)"],
        "sudo": ["<span class='term-error'>⛔ Access Denied. This event has been logged. :)</span>"]
    } : {
        "help": [
            "<span class='term-accent'> ═══════════════════════════════════════</span>",
            " <span class='term-success'>KULLANILABILIR KOMUTLAR</span>",
            "<span class='term-accent'> ═══════════════════════════════════════</span>",
            "",
            " <span class='term-accent'>Navigasyon</span>",
            "  <span class='cmd-name'>menu</span>      İnteraktif bölüm menüsü",
            "  <span class='cmd-name'>goto</span> <span class='term-muted'>[bölüm]</span>  Bölüme git",
            "  <span class='cmd-name'>ls</span>        Sayfa bölümlerini listele",
            "  <span class='cmd-name'>galeri</span>    Galeri sayfasını aç",
            "",
            " <span class='term-accent'>Bilgi</span>",
            "  <span class='cmd-name'>about</span>     Hakkımda kısa bilgi",
            "  <span class='cmd-name'>skills</span>    Teknik yetkinlikler",
            "  <span class='cmd-name'>projects</span>  Seçili projeler",
            "  <span class='cmd-name'>contact</span>   İletişim bilgileri",
            "  <span class='cmd-name'>social</span>    Sosyal medya linkleri",
            "  <span class='cmd-name'>cv</span>        CV indir",
            "",
            " <span class='term-accent'>Sistem</span>",
            "  <span class='cmd-name'>banner</span>    ASCII banner göster",
            "  <span class='cmd-name'>neofetch</span>  Sistem bilgisi",
            "  <span class='cmd-name'>date</span>      Tarih ve saat",
            "  <span class='cmd-name'>whoami</span>    Kimsiniz?",
            "  <span class='cmd-name'>history</span>   Komut geçmişi",

            "  <span class='cmd-name'>clear</span>     Ekranı temizle",
            "",
            " <span class='term-accent'>Eğlence</span>",
            "  <span class='cmd-name'>matrix</span>    Matrix yağmuru efekti",
            "  <span class='cmd-name'>ping</span>      zeydan.dev'e ping at",
            "  <span class='cmd-name'>hack</span>      ???",
            "",
            " <span class='term-muted'>İPUCU: ↑↓ oklar = geçmiş, Tab = otomatik tamamlama</span>"
        ],
        "about": [
            "Merhaba, Ben <span class='term-accent'>Zeydan Çalışkan</span>. (Lefkoşa, KKTC)",
            "UKÜ Yazılım Mühendisliği bölümünde lisans öğrenimine devam ediyorum.",
            "Siber güvenlik, ağ analizi ve sızma testleri alanlarında pratik projeler yürütürken;",
            "Eş zamanlı olarak duygusal zeka ve kültürel psikoloji üzerine akademik araştırmalar yapıyorum."
        ],
        "skills": [
            "<span class='term-success'>[Programlama]</span> JavaScript, PHP, C++, Python",
            "<span class='term-success'>[Web & UI/UX]</span> HTML5 & CSS3, Responsive Tasarım, SQL/MySQL",
            "<span class='term-success'>[Araştırma]</span> Duygusal Zeka, Kültürlerarası İletişim, Etik",
            "<span class='term-success'>[Siber Güvenlik]</span> Ağ Analizi, Penetrasyon & MITM, OSINT"
        ],
        "projects": [
            "=> <span class='term-accent'>Duygusal Zeka Geliştirme Platformu</span> (TEKNOFEST 2025 Finalisti)",
            "=> <span class='term-accent'>Mehmet Pınar Ticaret</span> (Kurumsal Web Tasarım)",
            "=> <span class='term-accent'>Eagle's Nest Restaurant</span> (Restoran Yönetimi)",
            "=> <span class='term-accent'>Ağ Güvenliği ve Sızma Testi</span> (Penetrasyon Araştırması)",
            "=> <span class='term-accent'>Zafiyet Tarama ve Oltalama Simülasyonu</span> (Oltalama Simülasyonu)"
        ],
        "contact": [
            "E-Posta:   <a href='mailto:caliskanzeydan9@gmail.com' class='term-link'>caliskanzeydan9@gmail.com</a>",
            "LinkedIn:  <a href='https://www.linkedin.com/in/zeydan-%C3%A7al%C4%B1%C5%9Fkan-41b4b9153' target='_blank' class='term-link'>Zeydan Çalışkan</a>",
            "Instagram: <a href='https://www.instagram.com/zeydancalisk' target='_blank' class='term-link'>@zeydancalisk</a>",
            "Facebook:  <a href='https://www.facebook.com/cls.zeydan' target='_blank' class='term-link'>cls.zeydan</a>"
        ],
        "whoami": ["<span class='term-accent'>guest@zeydan.dev</span> - Hoş geldiniz! Yetkili görünmüyorsunuz ama portfolyomu gezmekte özgürsünüz :)"],
        "sudo": ["<span class='term-error'>⛔ Erişim Reddedildi. Bu olay loglandı. :)</span>"]
    };

    // --- Toggle terminal ---
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            terminalWrapper.classList.toggle("show-terminal");
            if (terminalWrapper.classList.contains("show-terminal")) termInput.focus();
        });
    }
    if (closeDot) { closeDot.addEventListener("click", () => terminalWrapper.classList.remove("show-terminal")); closeDot.style.cursor = "pointer"; }
    if (minimizeDot) { minimizeDot.addEventListener("click", () => terminalWrapper.classList.toggle("term-minimized")); minimizeDot.style.cursor = "pointer"; }
    if (maximizeDot) { maximizeDot.addEventListener("click", () => terminalWrapper.classList.toggle("term-maximized")); maximizeDot.style.cursor = "pointer"; }

    // --- Helper: print output ---
    function printOutput(html, cls) {
        const div = document.createElement("div");
        div.classList.add("terminal-output");
        if (cls) div.classList.add(cls);
        div.innerHTML = html;
        termOutput.appendChild(div);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function printLines(lines, delay) {
        if (!delay) { printOutput(lines.join("<br>")); return; }
        let i = 0;
        const iv = setInterval(() => {
            if (i >= lines.length) { clearInterval(iv); return; }
            printOutput(lines[i]);
            i++;
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }, delay);
    }

    // --- Smooth scroll to section ---
    function scrollToSection(sectionId) {
        const el = document.getElementById(sectionId);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            el.classList.add("term-highlight-section");
            setTimeout(() => el.classList.remove("term-highlight-section"), 2000);
            return true;
        } else {
            // Not on the main page, redirect
            const targetPage = isEnglish ? "indexen.html" : "index.html";
            window.location.href = targetPage + "#" + sectionId;
            return true; 
        }
    }

    // --- Tab Autocomplete ---
    termInput.addEventListener("keydown", function(e) {
        if (e.key === "Tab") {
            e.preventDefault();
            const val = termInput.value.trim().toLowerCase();
            if (!val) return;
            const matches = allCommands.filter(c => c.startsWith(val));
            if (matches.length === 1) { termInput.value = matches[0]; }
            else if (matches.length > 1) {
                printOutput(`<span class='term-prompt'>guest<span>@</span>zeydan.dev:~$</span> ${val}`);
                printOutput("<span class='term-muted'>" + matches.join("  ") + "</span>");
            }
        }
        // Command history with up/down
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (cmdHistory.length === 0) return;
            if (historyIndex < cmdHistory.length - 1) historyIndex++;
            termInput.value = cmdHistory[cmdHistory.length - 1 - historyIndex];
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex > 0) { historyIndex--; termInput.value = cmdHistory[cmdHistory.length - 1 - historyIndex]; }
            else { historyIndex = -1; termInput.value = ""; }
        }
    });

    // --- MAIN FORM SUBMIT ---
    termForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const rawCmd = termInput.value.trim();
        const cmd = rawCmd.toLowerCase();
        if (cmd === "") return;

        // Log the prompt
        printOutput(`<span class="term-prompt">guest<span>@</span>zeydan.dev:~$</span> ${rawCmd}`);
        cmdHistory.push(rawCmd);
        historyIndex = -1;
        termInput.value = "";

        // --- clear ---
        if (cmd === "clear") { termOutput.innerHTML = ""; return; }

        // --- Static commands ---
        if (commands[cmd]) { printOutput(commands[cmd].join("<br>")); return; }

        // --- menu ---
        if (cmd === "menu") {
            const keys = Object.keys(sectionMap);
            let menuHtml = isEnglish
                ? "<div class='term-menu-box'><span class='term-success'>📋 QUICK NAVIGATION MENU</span><br><span class='term-accent'>─────────────────────────</span><br>"
                : "<div class='term-menu-box'><span class='term-success'>📋 HIZLI NAVİGASYON MENÜSÜ</span><br><span class='term-accent'>─────────────────────────</span><br>";
            keys.forEach((key, i) => {
                menuHtml += `<span class='term-menu-item' data-section='${sectionMap[key].id}'> <span class='term-menu-num'>[${i+1}]</span> ${sectionMap[key].label}</span><br>`;
            });
            menuHtml += `<br><span class='term-muted'>${isEnglish ? "Click an item or type: goto [name]" : "Bir öğeye tıklayın veya yazın: goto [isim]"}</span></div>`;
            printOutput(menuHtml);
            // Make menu items clickable
            setTimeout(() => {
                document.querySelectorAll(".term-menu-item").forEach(item => {
                    item.addEventListener("click", () => {
                        const sid = item.getAttribute("data-section");
                        scrollToSection(sid);
                        printOutput(`<span class='term-success'>➜ ${isEnglish ? "Navigating to" : "Gidiliyor:"} #${sid}</span>`);
                    });
                });
            }, 50);
            return;
        }

        // --- goto ---
        if (cmd.startsWith("goto ") || cmd.startsWith("git ") || cmd.startsWith("go ")) {
            const target = cmd.replace(/^(goto|git|go)\s+/, "").trim();
            // Check by number
            const num = parseInt(target);
            const keys = Object.keys(sectionMap);
            if (!isNaN(num) && num >= 1 && num <= keys.length) {
                const sec = sectionMap[keys[num - 1]];
                scrollToSection(sec.id);
                printOutput(`<span class='term-success'>➜ ${sec.label}</span>`);
                return;
            }
            // Check by name
            if (sectionMap[target]) {
                scrollToSection(sectionMap[target].id);
                printOutput(`<span class='term-success'>➜ ${sectionMap[target].label}</span>`);
                return;
            }
            // Try direct ID
            if (scrollToSection(target)) {
                printOutput(`<span class='term-success'>➜ #${target}</span>`);
                return;
            }
            printOutput(`<span class='term-error'>${isEnglish ? "Section not found:" : "Bölüm bulunamadı:"} '${target}'. ${isEnglish ? "Type 'ls' to see sections." : "'ls' yazarak bölümleri görün."}</span>`);
            return;
        }

        // --- ls ---
        if (cmd === "ls" || cmd === "dir") {
            let out = `<span class='term-success'>${isEnglish ? "📂 Available Sections:" : "📂 Mevcut Bölümler:"}</span><br>`;
            Object.keys(sectionMap).forEach(key => {
                out += `  <span class='cmd-name'>${key}</span> <span class='term-muted'>→ ${sectionMap[key].label}</span><br>`;
            });
            printOutput(out);
            return;
        }

        // --- banner ---
        if (cmd === "banner") {
            printOutput(`<pre class='term-banner'>
 ███████╗███████╗██╗   ██╗██████╗  █████╗ ███╗   ██╗
 ╚══███╔╝██╔════╝╚██╗ ██╔╝██╔══██╗██╔══██╗████╗  ██║
   ███╔╝ █████╗   ╚████╔╝ ██║  ██║███████║██╔██╗ ██║
  ███╔╝  ██╔══╝    ╚██╔╝  ██║  ██║██╔══██║██║╚██╗██║
 ███████╗███████╗   ██║   ██████╔╝██║  ██║██║ ╚████║
 ╚══════╝╚══════╝   ╚═╝   ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝
  <span class='term-accent'>Software Engineer | Cyber Security | EQ</span></pre>`);
            return;
        }

        // --- neofetch ---
        if (cmd === "neofetch") {
            printOutput(`<div class='term-neofetch'>
<span class='term-accent'>        ██████</span>        <span class='term-accent'>guest</span>@<span class='term-accent'>zeydan.dev</span>
<span class='term-accent'>      ██░░░░░░██</span>      ─────────────────
<span class='term-accent'>    ██░░░░░░░░░░██</span>    <span class='cmd-name'>OS:</span> zeydanOS v2.0
<span class='term-accent'>   ██░░░░░░░░░░░░██</span>   <span class='cmd-name'>Host:</span> zeydan.dev
<span class='term-accent'>   ██░░░░░░░░░░░░██</span>   <span class='cmd-name'>Kernel:</span> Portfolio 4.2
<span class='term-accent'>   ██░░░░██░░░░░░██</span>   <span class='cmd-name'>Uptime:</span> ${isEnglish ? "Since 2000" : "2000'den beri"}
<span class='term-accent'>    ██░░░░░░░░░░██</span>    <span class='cmd-name'>Shell:</span> zeydan-sh 2.0
<span class='term-accent'>      ██░░░░░░██</span>      <span class='cmd-name'>Lang:</span> JS, PHP, C++, Python
<span class='term-accent'>        ██████</span>        <span class='cmd-name'>DE:</span> ${isEnglish ? "Responsive UI" : "Responsive Arayüz"}
                      <span class='cmd-name'>Theme:</span> Dark Slate
                      <span class='cmd-name'>Location:</span> ${isEnglish ? "Nicosia, TRNC" : "Lefkoşa, KKTC"}
</div>`);
            return;
        }

        // --- date ---
        if (cmd === "date") {
            const now = new Date();
            printOutput(`<span class='term-accent'>${now.toLocaleDateString(isEnglish ? 'en-US' : 'tr-TR', {weekday:'long',year:'numeric',month:'long',day:'numeric'})} ${now.toLocaleTimeString(isEnglish ? 'en-US' : 'tr-TR')}</span>`);
            return;
        }

        // --- history ---
        if (cmd === "history") {
            if (cmdHistory.length === 0) { printOutput(`<span class='term-muted'>${isEnglish ? "No commands in history." : "Geçmişte komut yok."}</span>`); return; }
            let h = "";
            cmdHistory.forEach((c, i) => { h += `  <span class='term-muted'>${i+1}</span>  ${c}<br>`; });
            printOutput(h);
            return;
        }

        // --- social ---
        if (cmd === "social") {
            printOutput([
                `<span class='term-success'>${isEnglish ? "🌐 Social Media" : "🌐 Sosyal Medya"}</span>`,
                `  <span class='cmd-name'>LinkedIn</span>  <a href='https://www.linkedin.com/in/zeydan-%C3%A7al%C4%B1%C5%9Fkan-41b4b9153' target='_blank' class='term-link'>linkedin.com/in/zeydan</a>`,
                `  <span class='cmd-name'>Instagram</span> <a href='https://www.instagram.com/zeydancalisk' target='_blank' class='term-link'>@zeydancalisk</a>`,
                `  <span class='cmd-name'>Facebook</span>  <a href='https://www.facebook.com/cls.zeydan' target='_blank' class='term-link'>cls.zeydan</a>`,
                `  <span class='cmd-name'>Website</span>   <a href='https://duygusalzekaplatformu.com/' target='_blank' class='term-link'>duygusalzekaplatformu.com</a>`
            ].join("<br>"));
            return;
        }

        // --- cv ---
        if (cmd === "cv" || cmd === "resume") {
            printOutput(`<span class='term-success'>${isEnglish ? "📥 Downloading CV..." : "📥 CV indiriliyor..."}</span>`);
            setTimeout(() => { if (typeof downloadPDF === "function") downloadPDF(); }, 500);
            return;
        }

        // --- gallery / galeri ---
        if (cmd === "galeri" || cmd === "gallery") {
            printOutput(`<span class='term-success'>${isEnglish ? "🖼️ Opening Gallery..." : "🖼️ Galeri açılıyor..."}</span>`);
            setTimeout(() => { window.location.href = isEnglish ? "galerien.html" : "galeri.html"; }, 600);
            return;
        }



        // --- ping ---
        if (cmd === "ping" || cmd.startsWith("ping ")) {
            const target = cmd === "ping" ? "zeydan.dev" : cmd.replace("ping ", "");
            printOutput(`<span class='term-muted'>PING ${target}...</span>`);
            let count = 0;
            const iv = setInterval(() => {
                const ms = Math.floor(Math.random() * 30 + 5);
                count++;
                printOutput(`<span class='term-success'>64 bytes from ${target}: icmp_seq=${count} ttl=64 time=${ms}ms</span>`);
                terminalBody.scrollTop = terminalBody.scrollHeight;
                if (count >= 4) {
                    clearInterval(iv);
                    printOutput(`<span class='term-muted'>--- ${target} ping statistics ---</span>`);
                    printOutput(`<span class='term-muted'>4 packets transmitted, 4 received, 0% packet loss</span>`);
                }
            }, 600);
            return;
        }

        // --- matrix ---
        if (cmd === "matrix") {
            const canvas = document.createElement("canvas");
            canvas.classList.add("term-matrix-canvas");
            canvas.width = terminalBody.clientWidth - 30;
            canvas.height = 200;
            termOutput.appendChild(canvas);
            const ctx = canvas.getContext("2d");
            const cols = Math.floor(canvas.width / 14);
            const drops = Array(cols).fill(1);
            const chars = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶ0123456789ABCDEF";
            let frames = 0;
            const draw = () => {
                ctx.fillStyle = "rgba(15, 23, 42, 0.05)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#10b981";
                ctx.font = "14px 'JetBrains Mono', monospace";
                for (let i = 0; i < drops.length; i++) {
                    const ch = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillText(ch, i * 14, drops[i] * 14);
                    if (drops[i] * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
                    drops[i]++;
                }
                frames++;
                terminalBody.scrollTop = terminalBody.scrollHeight;
                if (frames < 150) requestAnimationFrame(draw);
                else { printOutput(`<span class='term-success'>${isEnglish ? "Wake up, Neo..." : "Uyan, Neo..."}</span>`); }
            };
            draw();
            return;
        }

        // --- echo ---
        if (cmd.startsWith("echo ")) {
            printOutput(rawCmd.substring(5));
            return;
        }

        // --- open ---
        if (cmd.startsWith("open ")) {
            let url = rawCmd.substring(5).trim();
            if (!url.startsWith("http")) url = "https://" + url;
            printOutput(`<span class='term-accent'>🔗 ${isEnglish ? "Opening:" : "Açılıyor:"} ${url}</span>`);
            setTimeout(() => window.open(url, "_blank"), 500);
            return;
        }

        // --- hack ---
        if (cmd === "hack") {
            const msgs = isEnglish
                ? ["[▓▓▓▓░░░░░░] 20% Connecting to mainframe...","[▓▓▓▓▓▓░░░░] 50% Bypassing firewall...","[▓▓▓▓▓▓▓▓░░] 80% Accessing database...","[▓▓▓▓▓▓▓▓▓▓] 100% Access Denied 😂","<span class='term-error'>Nice try! This is a portfolio, not a server 😄</span>"]
                : ["[▓▓▓▓░░░░░░] %20 Ana sunucuya bağlanılıyor...","[▓▓▓▓▓▓░░░░] %50 Güvenlik duvarı aşılıyor...","[▓▓▓▓▓▓▓▓░░] %80 Veritabanına erişiliyor...","[▓▓▓▓▓▓▓▓▓▓] %100 Erişim Reddedildi 😂","<span class='term-error'>Güzel deneme! Bu bir portfolyo, sunucu değil 😄</span>"];
            printLines(msgs, 700);
            return;
        }

        // --- rm ---
        if (cmd.startsWith("rm ")) {
            printOutput(`<span class='term-error'>⚠️ ${isEnglish ? "Permission denied. You can't delete my portfolio!" : "İzin reddedildi. Portfolyomu silemezsin!"} 😎</span>`);
            return;
        }

        // --- exit / reboot ---
        if (cmd === "exit") {
            printOutput(`<span class='term-muted'>${isEnglish ? "Goodbye! 👋" : "Hoşça kalın! 👋"}</span>`);
            setTimeout(() => terminalWrapper.classList.remove("show-terminal"), 1000);
            return;
        }
        if (cmd === "reboot") {
            printOutput(`<span class='term-warning'>🔄 ${isEnglish ? "Rebooting zeydanOS..." : "zeydanOS yeniden başlatılıyor..."}</span>`);
            setTimeout(() => { termOutput.innerHTML = ""; printOutput(`<span class='term-success'>zeydanOS v2.0 ${isEnglish ? "loaded successfully." : "başarıyla yüklendi."}</span><br>${isEnglish ? "Type" : "Komutları görmek için"} <span class='term-accent'>help</span> ${isEnglish ? "to see commands." : "yazabilirsiniz."}`); }, 1500);
            return;
        }

        // --- Not found ---
        printOutput(`<span class='term-warning'>${isEnglish ? "Command not found:" : "Komut bulunamadı:"} ${rawCmd}. ${isEnglish ? "Type" : "Yazın:"} '<span class='term-accent'>help</span>' ${isEnglish ? "to see available commands." : "komutları görmek için."}</span>`);
    });

    // Focus input on terminal click
    terminalBody.addEventListener("click", () => termInput.focus());
});
