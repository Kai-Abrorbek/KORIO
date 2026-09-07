/* 약관·개인정보 페이지 공용 렌더러.
 *
 * 두 페이지 모두 DOC (언어별 본문) 만 정의하고 나머지는 여기서 그린다.
 * 언어를 URL 이 아니라 JS 로 바꾸는 이유: Caddy 가 정적 파일만 주는 구조라
 * 서버에서 언어를 고를 수 없고, 플레이 심사에 넣는 URL 은 하나여야 한다. */
(function () {
  var LANGS = [
    ["uz", "O'zbekcha"],
    ["en", "English"],
    ["ru", "Русский"],
    ["ko", "한국어"],
  ];
  var KEY = "korio-legal-lang";

  function pick() {
    try {
      var saved = localStorage.getItem(KEY);
      if (saved && DOC[saved]) return saved;
    } catch (e) {
      /* 사파리 프라이빗 등에서 접근 자체가 던진다 */
    }
    var nav = (navigator.language || "uz").slice(0, 2).toLowerCase();
    return DOC[nav] ? nav : "uz";
  }

  function table(rows) {
    var head = rows[0];
    var out = '<div class="tablewrap"><table><thead><tr>';
    for (var i = 0; i < head.length; i++) out += "<th>" + head[i] + "</th>";
    out += "</tr></thead><tbody>";
    for (var r = 1; r < rows.length; r++) {
      out += "<tr>";
      for (var c = 0; c < rows[r].length; c++) out += "<td>" + rows[r][c] + "</td>";
      out += "</tr>";
    }
    return out + "</tbody></table></div>";
  }

  function render(lang) {
    var d = DOC[lang];
    document.documentElement.lang = lang;
    document.getElementById("h1").textContent = d.title;
    document.getElementById("updated").textContent = d.updated;

    var html = "";
    for (var i = 0; i < d.s.length; i++) {
      var sec = d.s[i];
      html += "<h2>" + sec[0] + "</h2>";
      // [제목, 본문, 표?, 본문뒤?] — 표가 있는 절만 길이가 늘어난다
      for (var j = 1; j < sec.length; j++) {
        html += Array.isArray(sec[j]) ? table(sec[j]) : sec[j];
      }
    }
    document.getElementById("body").innerHTML = html;
    document.getElementById("foot").innerHTML = d.foot;

    var btns = document.querySelectorAll("#langs button");
    for (var k = 0; k < btns.length; k++) {
      btns[k].setAttribute(
        "aria-current",
        btns[k].dataset.lang === lang ? "true" : "false",
      );
    }
    try {
      localStorage.setItem(KEY, lang);
    } catch (e) {}
  }

  var bar = document.getElementById("langs");
  for (var i = 0; i < LANGS.length; i++) {
    (function (code, label) {
      var b = document.createElement("button");
      b.textContent = label;
      b.dataset.lang = code;
      b.onclick = function () {
        render(code);
        window.scrollTo(0, 0);
      };
      bar.appendChild(b);
    })(LANGS[i][0], LANGS[i][1]);
  }

  render(pick());
})();
