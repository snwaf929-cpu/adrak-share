// Adrak's share page. A share link is this page with the share itself after the "#": Adrak's share.json, compressed
// with zlib, in base64url (src/Adrak/Services/Sharing/ShareLink.cs makes it). A browser never sends what follows a "#",
// so the share reaches no server: it is read here and shown as text. Nothing on this page is ever drawn from the share
// as HTML, and nothing is sent anywhere.
"use strict";

(() => {
  // The same numbers as Adrak's ShareLink and SharePackage.
  const LINK_VERSION = 1;
  const SHARE_FORMAT = "adrak-share";
  const SHARE_VERSION = 1;
  const MAX_UNPACKED = 4 * 1024 * 1024;
  const GET_ADRAK = "https://github.com/snwaf929-cpu/adrak-releases/releases/latest";
  const SHOWN = 8;

  // Adrak's own words (src/Adrak/Views/SaudiArabic.cs): Riyadh Arabic.
  const WORDS = {
    en: {
      page: "A share from Adrak",
      other: "عربي",
      otherLang: "ar",
      kinds: { subject: "A whole subject", topic: "A topic", lesson: "A lesson", practice: "A practice", exam: "An exam", summary: "A summary" },
      sharedWithYou: "Shared with you",
      from: "From {0}",
      shared: "Shared {0}",
      inside: "Inside",
      nameOnly: "Its name only.",
      more: "...and {0} more.",
      readOne: "Read it here",
      readMany: "Summaries you can read here",
      wholeSubject: "The whole subject",
      madeByAdrak: "Made by Adrak",
      writtenBy: "Written by {0}",
      writtenBySender: "Written by the one who sent it",
      lesson: "Lesson",
      download: "Download for Adrak",
      getAdrak: "Get Adrak",
      downloadHint: "Then open the file: Adrak shows what's inside before it adds anything, and marks nothing as learned.",
      pasteHint: "Is this link on the computer with Adrak? Copy it, then press Ctrl+V in Adrak.",
      notWindows: "Adrak runs on Windows computers: open this link on yours to add it.",
      about: "Adrak is a learning app: lessons, practices, exams and summaries made from your own material.",
      privacy: "The share is inside this link. This page reads it in your browser and never sends it anywhere.",
      landingTitle: "Adrak share links open here",
      landingText: "When someone sends you a link from Adrak, this page shows what's inside: lessons, practices, summaries and exams.",
      cutTitle: "This link is cut short or damaged",
      cutText: "Some chat apps cut long messages. Ask for the file instead.",
      notLinkTitle: "This isn't an Adrak share link",
      notLinkText: "Check that you opened the whole link.",
      newerTitle: "This was shared from a newer Adrak",
      newerText: "Update Adrak to open it.",
      browserTitle: "This browser can't read the link",
      browserText: "Open it in a newer browser, or on your computer.",
      date: "en-GB",
      nouns: {
        topic: ["topic", "topics"],
        lesson: ["lesson", "lessons"],
        practice: ["practice", "practices"],
        summary: ["summary", "summaries"],
        exam: ["exam", "exams"],
        step: ["step", "steps"],
        question: ["question", "questions"]
      }
    },
    ar: {
      page: "مشاركة من أدراك",
      other: "English",
      otherLang: "en",
      kinds: { subject: "مادة كاملة", topic: "موضوع", lesson: "درس", practice: "تمرين", exam: "اختبار", summary: "ملخص" },
      sharedWithYou: "أحد شاركه معك",
      from: "من {0}",
      shared: "تشاركت {0}",
      inside: "وش فيها",
      nameOnly: "اسمه بس.",
      more: "...وكمان {0}.",
      readOne: "اقراه هنا",
      readMany: "ملخصات تقدر تقراها هنا",
      wholeSubject: "المادة كلها",
      madeByAdrak: "سوّاه أدراك",
      writtenBy: "من كتابة {0}",
      writtenBySender: "من كتابة اللي أرسله",
      lesson: "درس",
      download: "نزّلها لأدراك",
      getAdrak: "حمّل أدراك",
      downloadHint: "بعدين افتح الملف: أدراك يوريك وش فيها قبل ما يضيف أي شي، وما ينحسب شي إنك تعلّمته.",
      pasteHint: "الرابط عندك في الكمبيوتر اللي فيه أدراك؟ انسخه، وبعدين اضغط Ctrl+V في أدراك.",
      notWindows: "أدراك يشتغل على كمبيوترات ويندوز: افتح هالرابط في كمبيوترك عشان تضيفها.",
      about: "أدراك تطبيق للتعلّم: دروس وتمارين واختبارات وملخصات من ملفاتك انت.",
      privacy: "المشاركة داخل هالرابط نفسه. هالصفحة تقراها في متصفحك، وما ترسلها لأي مكان.",
      landingTitle: "روابط مشاركات أدراك تنفتح هنا",
      landingText: "لما أحد يرسل لك رابط من أدراك، هالصفحة توريك وش فيه: دروس وتمارين وملخصات واختبارات.",
      cutTitle: "هالرابط ناقص أو خربان",
      cutText: "بعض برامج المحادثة تقص الرسايل الطويلة. اطلب الملف بداله.",
      notLinkTitle: "هذا مو رابط مشاركة من أدراك",
      notLinkText: "تأكد إنك فتحت الرابط كامل.",
      newerTitle: "هذي تشاركت من نسخة أحدث من أدراك",
      newerText: "حدّث أدراك عشان تفتحها.",
      browserTitle: "هالمتصفح ما يقدر يقرا الرابط",
      browserText: "افتحه في متصفح أحدث، أو في كمبيوترك.",
      date: "ar-SA-u-ca-gregory-nu-latn",
      // Singular (11 and more), one, two, plural (3 to 10), as Adrak counts them.
      nouns: {
        topic: ["موضوع", "موضوع واحد", "موضوعين", "مواضيع"],
        lesson: ["درس", "درس واحد", "درسين", "دروس"],
        practice: ["تمرين", "تمرين واحد", "تمرينين", "تمارين"],
        summary: ["ملخص", "ملخص واحد", "ملخصين", "ملخصات"],
        exam: ["اختبار", "اختبار واحد", "اختبارين", "اختبارات"],
        step: ["خطوة", "خطوة وحدة", "خطوتين", "خطوات"],
        question: ["سؤال", "سؤال واحد", "سؤالين", "أسئلة"]
      }
    }
  };

  let language = chooseLanguage();
  let read = null;

  function chooseLanguage() {
    try {
      const kept = localStorage.getItem("adrak-share-language");
      if (kept === "ar" || kept === "en") return kept;
    } catch (error) {
      // No storage here (a private window): the device's language decides.
    }

    const wanted = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"];
    return String(wanted[0] || "en").toLowerCase().startsWith("ar") ? "ar" : "en";
  }

  const words = () => WORDS[language];
  const format = (text, value) => text.replace("{0}", value);

  function count(n, noun) {
    const forms = words().nouns[noun];
    if (language !== "ar") return n === 1 ? `1 ${forms[0]}` : `${n} ${forms[1]}`;
    if (n === 1) return forms[1];
    if (n === 2) return forms[2];
    if (n >= 3 && n <= 10) return `${n} ${forms[3]}`;
    return n === 0 ? `0 ${forms[3]}` : `${n} ${forms[0]}`;
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  // A block of the share's own words (a note, a summary's paragraph) may be in either language: it finds its own direction.
  function content(tag, className, text) {
    const node = el(tag, className, text);
    node.dir = "auto";
    return node;
  }

  // A line of the page's words holding the share's (a title, a name): the line keeps the page's direction, as Adrak's
  // windows do, and the share's words keep theirs.
  function line(tag, className, ...pieces) {
    const node = el(tag, className);
    node.append(...pieces.flat(Infinity));
    return node;
  }

  const isolate = (text) => el("bdi", null, text);

  function formatted(template, value) {
    const [before, after] = template.split("{0}");
    return [before, isolate(value), after || ""];
  }

  // ---- Reading the link ----

  async function readLink(hash) {
    const match = /^#([0-9]{1,4})\.([A-Za-z0-9_-]+)$/.exec(hash);
    if (!match) return { error: "notLink" };
    if (Number(match[1]) > LINK_VERSION) return { error: "newer" };
    if (typeof DecompressionStream === "undefined" || typeof TextDecoder === "undefined") return { error: "browser" };

    let text;
    try {
      text = await inflate(fromBase64Url(match[2]));
    } catch (error) {
      return { error: "cut" };
    }

    let share;
    try {
      share = JSON.parse(text);
    } catch (error) {
      return { error: "cut" };
    }

    if (!share || typeof share !== "object" || String(share.format || "").toLowerCase() !== SHARE_FORMAT) return { error: "notLink" };
    if (Number(share.version) > SHARE_VERSION) return { error: "newer" };
    return { share, text };
  }

  function fromBase64Url(text) {
    const binary = atob(text.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((text.length + 3) % 4));
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index++) bytes[index] = binary.charCodeAt(index);
    return bytes;
  }

  // zlib, checked to its last byte (a link cut short or changed fails here), and never more than MAX_UNPACKED.
  async function inflate(bytes) {
    const reader = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate")).getReader();
    const chunks = [];
    let size = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > MAX_UNPACKED) {
        reader.cancel();
        throw new Error("Too big");
      }

      chunks.push(value);
    }

    const all = new Uint8Array(size);
    let at = 0;
    for (const chunk of chunks) {
      all.set(chunk, at);
      at += chunk.length;
    }

    return new TextDecoder("utf-8", { fatal: true }).decode(all);
  }

  // ---- What the share holds ----

  const list = (value) => (Array.isArray(value) ? value.filter((item) => item && typeof item === "object") : []);
  const text = (value) => (typeof value === "string" ? value.trim() : "");

  function lessonTitle(lesson) {
    return text(lesson.title) || text(lesson.sceneLesson && lesson.sceneLesson.title) || words().lesson;
  }

  function lessonSteps(lesson) {
    if (lesson.sceneLesson && Array.isArray(lesson.sceneLesson.steps)) return lesson.sceneLesson.steps.length;
    return Array.isArray(lesson.steps) ? lesson.steps.length : 0;
  }

  function parts(share) {
    const subject = share.subject && typeof share.subject === "object" ? share.subject : {};
    const topics = list(subject.topics);
    const lessons = topics.flatMap((topic) => list(topic.lessons));
    const practices = topics.flatMap((topic) => list(topic.practices).map((practice) => ({ practice, topic })));
    return { subject, topics, lessons, practices, summaries: list(subject.summaries), exams: list(share.exams) };
  }

  // ---- Showing it ----

  function render() {
    const w = words();
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    const toggle = document.getElementById("language");
    toggle.textContent = w.other;
    toggle.lang = w.otherLang;
    toggle.hidden = false;

    const card = document.getElementById("card");
    card.replaceChildren();
    const foot = document.getElementById("foot");
    foot.replaceChildren(el("p", null, w.about), el("p", null, w.privacy));

    if (!read || read.empty) {
      document.title = w.page;
      card.append(el("p", "label", w.page), el("h1", null, w.landingTitle), el("p", "muted", w.landingText), actions(false));
      return;
    }

    if (read.error) {
      const [title, body] = {
        cut: [w.cutTitle, w.cutText],
        newer: [w.newerTitle, w.newerText],
        browser: [w.browserTitle, w.browserText],
        notLink: [w.notLinkTitle, w.notLinkText]
      }[read.error];
      document.title = w.page;
      card.append(el("p", "label problem", w.page), el("h1", null, title), el("p", "muted", body), actions(false));
      return;
    }

    const share = read.share;
    const all = parts(share);
    const title = text(share.title) || text(all.subject.name) || w.page;
    document.title = `${title} · ${w.page}`;

    const meta = [w.kinds[String(share.kind || "").toLowerCase()] || w.kinds.subject];
    if (text(share.sharedBy)) meta.push(" · ", formatted(w.from, text(share.sharedBy)));
    const day = new Date(share.sharedAt);
    if (!Number.isNaN(day.getTime())) {
      meta.push(" · ", format(w.shared, new Intl.DateTimeFormat(w.date, { day: "numeric", month: "short", year: "numeric" }).format(day)));
    }

    card.append(el("p", "label", w.sharedWithYou), line("h1", null, isolate(title)), line("p", "meta", meta));
    if (text(share.note)) card.append(content("p", "note", text(share.note)));

    const counts = [];
    if (all.topics.length) counts.push(count(all.topics.length, "topic"));
    if (all.lessons.length) counts.push(count(all.lessons.length, "lesson"));
    if (all.practices.length) counts.push(count(all.practices.length, "practice"));
    if (all.summaries.length) counts.push(count(all.summaries.length, "summary"));
    if (all.exams.length) counts.push(count(all.exams.length, "exam"));
    card.append(el("h2", null, w.inside), el("p", "counts", counts.length ? counts.join(" · ") : w.nameOnly));

    // Each item: its title (in its own direction), and how long it is in the page's words.
    const items = [
      ...all.lessons.map((lesson) => [lessonTitle(lesson), lessonSteps(lesson) ? count(lessonSteps(lesson), "step") : ""]),
      ...all.practices.map(({ practice, topic }) => [text(practice.title) || text(topic.title), ""]),
      ...all.summaries.map((summary) => [text(summary.title), ""]),
      ...all.exams.map((exam) => [text(exam.title), list(exam.questions).length ? count(list(exam.questions).length, "question") : ""])
    ].filter(([title]) => title);
    if (items.length) {
      const shown = el("ul", "items");
      items.slice(0, SHOWN).forEach(([title, size]) => shown.append(line("li", null, isolate(title), size ? ` · ${size}` : "")));
      if (items.length > SHOWN) shown.append(el("li", null, format(w.more, items.length - SHOWN)));
      card.append(shown);
    }

    if (all.summaries.length) card.append(summaries(share, all));
    card.append(actions(true, title));

    const hints = [w.downloadHint, w.pasteHint];
    if (!/Windows/i.test(navigator.userAgent)) hints.unshift(w.notWindows);
    hints.forEach((hint) => card.append(el("p", "hint", hint)));
  }

  function summaries(share, all) {
    const w = words();
    const section = el("section", "summaries");
    section.append(el("h2", null, all.summaries.length === 1 ? w.readOne : w.readMany));
    all.summaries.slice(0, 20).forEach((summary) => {
      const topic = all.topics.find((item) => summary.topicId && item.id === summary.topicId);
      const by = String(summary.author || "").toLowerCase() === "adrak"
        ? w.madeByAdrak
        : text(share.sharedBy) ? formatted(w.writtenBy, text(share.sharedBy)) : w.writtenBySender;
      const details = el("details", "summary");
      details.open = all.summaries.length === 1;
      const head = line("summary", null, isolate(text(summary.title) || w.kinds.summary));
      head.append(line("small", null, topic ? isolate(text(topic.title)) : w.wholeSubject, " · ", by));
      const body = el("div", "md");
      body.append(markdown(typeof summary.text === "string" ? summary.text : ""));
      details.append(head, body);
      section.append(details);
    });
    return section;
  }

  function actions(withShare, title) {
    const w = words();
    const row = el("div", "actions");
    if (withShare) {
      const download = el("button", "button main", w.download);
      download.type = "button";
      download.addEventListener("click", () => save(read.text, title));
      row.append(download);
    }

    const get = el("a", withShare ? "button" : "button main", w.getAdrak);
    get.href = GET_ADRAK;
    get.rel = "noopener noreferrer";
    get.target = "_blank";
    row.append(get);
    return row;
  }

  // The share as a .adrak file: share.json as it came, which Adrak opens as it opens the zip.
  function save(json, title) {
    let name = String(title || "").replace(/[<>:"/\\|?*\u0000-\u001f]/g, " ").replace(/\s+/g, " ").trim().replace(/^[. ]+|[. ]+$/g, "");
    if (name.length > 80) name = name.slice(0, 80).replace(/[. ]+$/, "");
    const url = URL.createObjectURL(new Blob([json], { type: "application/octet-stream" }));
    const link = el("a");
    link.href = url;
    link.download = `${name || "Adrak share"}.adrak`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }

  // ---- A summary's Markdown, built as elements (never as HTML) ----

  const FENCE = /^\s*(```|~~~)/;
  const HEADING = /^\s{0,3}(#{1,6})\s+(.*?)\s*#*\s*$/;
  const RULE = /^\s{0,3}([-*_])(\s*\1){2,}\s*$/;
  const QUOTE = /^\s{0,3}>/;
  const ITEM = /^(\s*)([-*+]|[0-9]{1,3}[.)])\s+(.*)$/;
  const DIVIDER = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;

  const blank = (line) => line.trim() === "";
  const isTable = (lines, index) => lines[index].includes("|") && index + 1 < lines.length && DIVIDER.test(lines[index + 1]);
  const startsBlock = (lines, index) =>
    FENCE.test(lines[index]) || HEADING.test(lines[index]) || RULE.test(lines[index]) || QUOTE.test(lines[index]) ||
    ITEM.test(lines[index]) || isTable(lines, index);

  function markdown(source) {
    const root = document.createDocumentFragment();
    const lines = String(source).replace(/\r\n?/g, "\n").split("\n");
    let index = 0;
    while (index < lines.length) {
      const line = lines[index];
      if (blank(line)) {
        index++;
        continue;
      }

      const fence = FENCE.exec(line);
      if (fence) {
        const body = [];
        index++;
        while (index < lines.length && !lines[index].trim().startsWith(fence[1])) body.push(lines[index++]);
        index++;
        const pre = el("pre");
        pre.append(el("code", null, body.join("\n")));
        root.append(pre);
        continue;
      }

      const heading = HEADING.exec(line);
      if (heading) {
        const node = content(`h${Math.min(heading[1].length + 2, 6)}`);
        inline(node, heading[2]);
        root.append(node);
        index++;
        continue;
      }

      if (RULE.test(line)) {
        root.append(el("hr"));
        index++;
        continue;
      }

      if (isTable(lines, index)) {
        const rows = [cells(line)];
        index += 2;
        while (index < lines.length && lines[index].includes("|") && !blank(lines[index])) rows.push(cells(lines[index++]));
        root.append(table(rows));
        continue;
      }

      if (QUOTE.test(line)) {
        const body = [];
        while (index < lines.length && QUOTE.test(lines[index])) body.push(lines[index++].replace(/^\s{0,3}>\s?/, ""));
        const quote = content("blockquote");
        quote.append(markdown(body.join("\n")));
        root.append(quote);
        continue;
      }

      const first = ITEM.exec(line);
      if (first) {
        const ordered = /[0-9]/.test(first[2]);
        const items = content(ordered ? "ol" : "ul");
        if (ordered && parseInt(first[2], 10) !== 1) items.start = parseInt(first[2], 10);
        while (index < lines.length) {
          const item = ITEM.exec(lines[index]);
          const nested = item && item[1].length >= 2;
          if (item && (nested || /[0-9]/.test(item[2]) === ordered)) {
            const node = el("li", nested ? "nested" : null);
            inline(node, item[3]);
            items.append(node);
            index++;
          } else if (!item && !blank(lines[index]) && /^\s{2,}/.test(lines[index]) && items.lastChild) {
            items.lastChild.append(" ");
            inline(items.lastChild, lines[index++].trim());
          } else {
            break;
          }
        }

        root.append(items);
        continue;
      }

      const body = [line.trim()];
      index++;
      while (index < lines.length && !blank(lines[index]) && !startsBlock(lines, index)) body.push(lines[index++].trim());
      const paragraph = content("p");
      inline(paragraph, body.join(" "));
      root.append(paragraph);
    }

    return root;
  }

  function cells(line) {
    let row = line.trim();
    if (row.startsWith("|")) row = row.slice(1);
    if (row.endsWith("|")) row = row.slice(0, -1);
    return row.split("|").map((cell) => cell.trim());
  }

  function table(rows) {
    const frame = el("div", "table");
    const grid = content("table");
    const head = el("thead");
    const headRow = el("tr");
    rows[0].forEach((cell) => {
      const node = el("th");
      inline(node, cell);
      headRow.append(node);
    });
    head.append(headRow);
    const body = el("tbody");
    rows.slice(1).forEach((row) => {
      const line = el("tr");
      row.forEach((cell) => {
        const node = el("td");
        inline(node, cell);
        line.append(node);
      });
      body.append(line);
    });
    grid.append(head, body);
    frame.append(grid);
    return frame;
  }

  // Code, bold, struck and slanted words. A link shows its words only: a link in someone's share isn't followed.
  function inline(parent, source) {
    const pattern = /(`+)([^`]+?)\1|\*\*(.+?)\*\*|__(.+?)__|~~(.+?)~~|\*(?=\S)(.+?)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
    let last = 0;
    let match;
    while ((match = pattern.exec(source))) {
      if (match.index > last) parent.append(source.slice(last, match.index));
      if (match[2] !== undefined) parent.append(el("code", null, match[2]));
      else if (match[3] !== undefined || match[4] !== undefined) {
        const strong = el("strong");
        inline(strong, match[3] !== undefined ? match[3] : match[4]);
        parent.append(strong);
      } else if (match[5] !== undefined) {
        const struck = el("del");
        inline(struck, match[5]);
        parent.append(struck);
      } else if (match[6] !== undefined) {
        const slanted = el("em");
        inline(slanted, match[6]);
        parent.append(slanted);
      } else if (match[7] !== undefined) {
        parent.append(match[7]);
      }

      last = pattern.lastIndex;
    }

    if (last < source.length) parent.append(source.slice(last));
  }

  // ---- Start ----

  async function load() {
    const hash = location.hash;
    read = hash.length <= 1 ? { empty: true } : await readLink(hash);
    render();
  }

  document.getElementById("language").addEventListener("click", () => {
    language = language === "ar" ? "en" : "ar";
    try {
      localStorage.setItem("adrak-share-language", language);
    } catch (error) {
      // Kept for this visit only.
    }

    render();
  });
  window.addEventListener("hashchange", load);
  load();
})();
